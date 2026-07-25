#!/usr/bin/env node
/**
 * Renders assets/<locale>/github-stats.svg from the GitHub GraphQL API.
 *
 * This exists because the community stats services this profile used to point
 * at kept returning 503 / 402. Owning the render means the panel matches the
 * rest of the profile and cannot break because somebody else's quota ran out.
 *
 *   GITHUB_TOKEN=... node scripts/stats.mjs
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { content, site, LOCALES } from './content.mjs';
import { W, PAD, C, SANS, text, rect, monoW, r } from './lib/svg.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
const LOGIN = site.user;

if (!TOKEN) {
  console.error('GITHUB_TOKEN is required');
  process.exit(1);
}

async function gql(query, variables) {
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `bearer ${TOKEN}`,
      'Content-Type': 'application/json',
      'User-Agent': `${LOGIN}-profile-stats`,
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`GitHub API ${res.status}: ${await res.text()}`);
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data;
}

const PROFILE_QUERY = `query($login:String!){
  user(login:$login){
    followers { totalCount }
    contributionsCollection { contributionYears }
    repositories(first:100, ownerAffiliations:OWNER, isFork:false, privacy:PUBLIC){
      totalCount
      nodes {
        stargazerCount
        languages(first:8, orderBy:{field:SIZE, direction:DESC}){
          edges { size node { name color } }
        }
      }
    }
  }
}`;

const YEAR_QUERY = `query($login:String!, $from:DateTime!, $to:DateTime!){
  user(login:$login){
    contributionsCollection(from:$from, to:$to){
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount } }
      }
    }
  }
}`;

/**
 * Contribution calendars overlap at year boundaries and run to Dec 31, so the
 * raw day list has duplicates and future dates. Both would corrupt a streak
 * count, hence the dedupe-and-trim before walking the series.
 */
function normalizeDays(days) {
  const today = new Date().toISOString().slice(0, 10);
  const byDate = new Map();
  for (const d of days) {
    if (d.date > today) continue;
    byDate.set(d.date, Math.max(byDate.get(d.date) ?? 0, d.count));
  }
  return [...byDate.entries()]
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => (a.date < b.date ? -1 : 1));
}

function streaks(sorted) {
  let longest = 0;
  let run = 0;
  for (const day of sorted) {
    run = day.count > 0 ? run + 1 : 0;
    if (run > longest) longest = run;
  }
  // current streak: walk backwards, tolerating an empty day today
  let current = 0;
  for (let i = sorted.length - 1; i >= 0; i -= 1) {
    if (sorted[i].count > 0) current += 1;
    else if (i === sorted.length - 1) continue; // today may not have landed yet
    else break;
  }
  return { current, longest };
}

async function collect() {
  const profile = await gql(PROFILE_QUERY, { login: LOGIN });
  const user = profile.user;
  const years = [...user.contributionsCollection.contributionYears].sort();

  const days = [];
  let total = 0;
  let thisYear = 0;
  const currentYear = new Date().getUTCFullYear();

  for (const year of years) {
    const data = await gql(YEAR_QUERY, {
      login: LOGIN,
      from: `${year}-01-01T00:00:00Z`,
      to: `${year}-12-31T23:59:59Z`,
    });
    const cal = data.user.contributionsCollection.contributionCalendar;
    total += cal.totalContributions;
    if (year === currentYear) thisYear = cal.totalContributions;
    for (const week of cal.weeks) {
      for (const d of week.contributionDays) {
        days.push({ date: d.date, count: d.contributionCount });
      }
    }
  }

  const langBytes = new Map();
  let stars = 0;
  for (const repo of user.repositories.nodes) {
    stars += repo.stargazerCount;
    for (const edge of repo.languages.edges) {
      const prev = langBytes.get(edge.node.name) || { size: 0, color: edge.node.color };
      langBytes.set(edge.node.name, { size: prev.size + edge.size, color: prev.color || edge.node.color });
    }
  }
  const langTotal = [...langBytes.values()].reduce((a, b) => a + b.size, 0) || 1;
  const languages = [...langBytes.entries()]
    .map(([name, v]) => ({ name, share: v.size / langTotal, color: v.color || '#64748B' }))
    .sort((a, b) => b.share - a.share)
    .slice(0, 6);

  const series = normalizeDays(days);
  const busiest = series.reduce((best, d) => (d.count > (best?.count ?? -1) ? d : best), null);

  return {
    total,
    thisYear,
    ...streaks(series),
    repos: user.repositories.totalCount,
    stars,
    followers: user.followers.totalCount,
    busiest: busiest ? busiest.count : 0,
    languages,
    firstYear: years[0],
  };
}

function render(stats, locale) {
  const L = content[locale].github.statLabels;
  const body = [];
  const accents = [C.blue, C.cyan, C.violet, C.green];

  const tiles = [
    { value: String(stats.total), label: L.contributions, sub: `${stats.firstYear} →` },
    { value: String(stats.thisYear), label: L.thisYear, sub: `${new Date().getUTCFullYear()}` },
    { value: String(stats.current), label: L.streak, sub: L.days },
    { value: String(stats.longest), label: L.longest, sub: L.days },
  ];

  const gap = 14;
  const tw = (W - PAD * 2 - gap * 3) / 4;
  const th = 112;
  let y = 32;

  tiles.forEach((tile, i) => {
    const x = PAD + i * (tw + gap);
    body.push(rect(x, y, tw, th, { rx: 12, fill: C.bg2, stroke: C.line }));
    let vs = 34;
    while (monoW(tile.value, vs) > tw - 90 && vs > 20) vs -= 1;
    body.push(text(x + 18, y + 50, tile.value, { size: vs, fill: accents[i], weight: '700', family: SANS }));
    body.push(text(x + 18, y + 76, tile.label, { size: 12.5, fill: C.text2 }));
    body.push(text(x + 18, y + 95, tile.sub, { size: 11, fill: C.dim2 }));
    body.push(
      `<circle cx="${r(x + tw - 22)}" cy="${r(y + 24)}" r="4" fill="${accents[i]}" opacity="0.7">` +
        `<animate attributeName="opacity" values="0.25;0.9;0.25" dur="2.6s" begin="${i * 0.3}s" repeatCount="indefinite"/></circle>`
    );
  });
  y += th + 34;

  body.push(text(PAD, y, L.languages, { size: 11.5, fill: C.faint, letterSpacing: '1.4' }));
  y += 16;

  const barW = W - PAD * 2;
  const barH = 14;
  body.push(rect(PAD, y, barW, barH, { rx: 7, fill: C.bg3 }));
  let cx = PAD;
  stats.languages.forEach((lang, i) => {
    const segW = Math.max(barW * lang.share, 3);
    body.push(
      `<rect x="${r(cx)}" y="${r(y)}" width="${r(segW)}" height="${barH}" fill="${lang.color}" opacity="0.9">` +
        `<animate attributeName="width" values="0;${r(segW)}" dur="1.1s" begin="${0.2 + i * 0.12}s" fill="freeze"/></rect>`
    );
    cx += segW;
  });
  y += barH + 26;

  let lx = PAD;
  for (const lang of stats.languages) {
    const label = `${lang.name} ${(lang.share * 100).toFixed(1)}%`;
    const cw = monoW(label, 12.5) + 30;
    body.push(`<circle cx="${r(lx + 6)}" cy="${r(y - 4)}" r="5" fill="${lang.color}"/>`);
    body.push(text(lx + 18, y, label, { size: 12.5, fill: C.dim }));
    lx += cw + 12;
  }
  y += 30;

  body.push(`<line x1="${PAD}" y1="${r(y)}" x2="${W - PAD}" y2="${r(y)}" stroke="${C.line}"/>`);
  y += 26;

  const footer = [
    [String(stats.repos), L.repos],
    [String(stats.stars), L.stars],
    [String(stats.followers), L.followers],
    [String(stats.busiest), L.busiest],
  ];
  let fx = PAD;
  for (const [value, label] of footer) {
    body.push(text(fx, y, value, { size: 15, fill: C.text, weight: '600' }));
    fx += monoW(value, 15) + 10;
    body.push(text(fx, y, label, { size: 13, fill: C.dim2 }));
    fx += monoW(label, 13) + 30;
  }
  const stamp = `${L.updated} ${new Date().toISOString().slice(0, 10)}`;
  body.push(text(W - PAD, y, stamp, { size: 12, fill: C.faint, anchor: 'end' }));
  y += 26;

  const height = y;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${r(height)}" width="${W}" height="${r(height)}" role="img" aria-label="${stats.total} contributions, ${stats.repos} public repositories, ${stats.followers} followers">
  <title>GitHub</title>
  <defs>
    <linearGradient id="gsBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${C.bg0}"/>
      <stop offset="100%" stop-color="#0A1524"/>
    </linearGradient>
    <clipPath id="gsClip"><rect width="${W}" height="${r(height)}" rx="16"/></clipPath>
  </defs>
  <g clip-path="url(#gsClip)">
    <rect width="${W}" height="${r(height)}" fill="url(#gsBg)"/>
${body.join('\n')}
    <rect x="0.5" y="0.5" width="${W - 1}" height="${r(height - 1)}" rx="16" fill="none" stroke="${C.line}"/>
  </g>
</svg>
`;
}

const stats = await collect();
for (const locale of LOCALES) {
  const dir = join(ROOT, 'assets', locale);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'github-stats.svg'), render(stats, locale));
}
console.log(
  `stats: ${stats.total} contributions, ${stats.thisYear} this year, ` +
    `streak ${stats.current}/${stats.longest}, ${stats.repos} repos, ${stats.stars} stars`
);
