#!/usr/bin/env node
/**
 * Builds every text panel as an SVG and assembles README.md / README.es.md.
 *
 * The profile is rendered entirely as images so it keeps one visual language,
 * which means the copy lives here (content.mjs) and the layout is computed
 * rather than eyeballed — that is what keeps text from overflowing its panel
 * and the two languages from drifting apart.
 *
 *   node scripts/build.mjs
 */

import { mkdirSync, writeFileSync, readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { content, site, LOCALES } from './content.mjs';
import {
  W,
  PAD,
  C,
  MONO,
  SANS,
  esc,
  text,
  paragraph,
  rect,
  sectionHead,
  chipRow,
  codeBlock,
  table,
  bullets,
  panel,
  button,
  monoW,
  wrap,
  r,
} from './lib/svg.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ACCENTS = { blue: C.blue, cyan: C.cyan, violet: C.violet, green: C.green, amber: C.amber };

const written = [];
function emit(locale, name, svg) {
  const dir = join(ROOT, 'assets', locale);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, name), svg);
  written.push(`assets/${locale}/${name}`);
}

/* ------------------------------------------------------------------ panels */

function whoamiPanel(t) {
  const body = [];
  let y = 56;
  const head = sectionHead(PAD, y, t.whoami.eyebrow, t.whoami.heading, C.blue);
  body.push(head.svg);
  y += head.height + 28;

  for (const p of t.whoami.paragraphs) {
    const par = paragraph(PAD, y, p, { size: 16, lineHeight: 27, fill: C.dim });
    body.push(par.svg);
    y += par.height + 20;
  }

  y += 6;
  const code = codeBlock(PAD, y, t.whoami.code, { size: 15, lineHeight: 26, accent: C.cyan });
  body.push(code.svg);
  y += code.height + 34;

  return panel(y, body.join('\n'), {
    id: 'wa',
    title: t.whoami.heading,
    label: `${t.whoami.heading}. ${t.whoami.paragraphs.join(' ')}`,
  });
}

function impactPanel(t) {
  const body = [];
  let y = 56;
  const head = sectionHead(PAD, y, t.impact.eyebrow, t.impact.heading, C.green);
  body.push(head.svg);
  y += head.height + 30;

  // metric cards
  const n = t.impact.cards.length;
  const gap = 14;
  const cw = (W - PAD * 2 - gap * (n - 1)) / n;
  const colors = [C.blue, C.cyan, C.violet, C.green, C.amber];
  // height driven by the longest card so no label ever collides with the bar
  const maxLabelLines = Math.max(...t.impact.cards.map((c) => wrap(c.label, 12.5, cw - 28).length));
  const maxSubLines = Math.max(...t.impact.cards.map((c) => c.sub.length));
  const ch = 84 + maxLabelLines * 17 + 10 + maxSubLines * 15 + 30;
  t.impact.cards.forEach((card, i) => {
    const cx = PAD + i * (cw + gap);
    body.push(rect(cx, y, cw, ch, { rx: 12, fill: C.bg2, stroke: C.line }));
    // value: shrink to fit the card
    let vs = 34;
    while (monoW(card.value, vs) > cw - 32 && vs > 18) vs -= 1;
    body.push(
      text(cx + 16, y + 56, card.value, { size: vs, fill: colors[i], weight: '700', family: SANS })
    );
    const labelLines = wrap(card.label, 12.5, cw - 28);
    labelLines.forEach((line, j) =>
      body.push(text(cx + 16, y + 84 + j * 17, line, { size: 12.5, fill: C.text2 }))
    );
    const subTop = y + 84 + maxLabelLines * 17 + 12;
    card.sub.forEach((line, j) => {
      const sub = wrap(line, 11, cw - 28)[0] || '';
      body.push(text(cx + 16, subTop + j * 15, sub, { size: 11, fill: C.dim2 }));
    });
    body.push(rect(cx + 16, y + ch - 22, cw - 32, 6, { rx: 3, fill: C.bg3 }));
    body.push(
      `<rect x="${r(cx + 16)}" y="${r(y + ch - 22)}" width="${r((cw - 32) * card.bar)}" height="6" rx="3" fill="${colors[i]}" opacity="0.85">` +
        `<animate attributeName="width" values="0;${r((cw - 32) * card.bar)}" dur="1.3s" begin="${0.2 + i * 0.15}s" fill="freeze"/></rect>`
    );
  });
  y += ch + 34;

  const bl = bullets(PAD, y, t.impact.bullets, { size: 15.5, lineHeight: 25, gap: 16 });
  body.push(bl.svg);
  y += bl.height + 34;

  return panel(y, body.join('\n'), {
    id: 'im',
    title: t.impact.heading,
    label: t.impact.bullets.map((b) => `${b.lead} ${b.text}`).join(' '),
  });
}

function workPanel(t) {
  const body = [];
  let y = 56;
  const head = sectionHead(PAD, y, t.work.eyebrow, t.work.heading, C.violet);
  body.push(head.svg);
  y += head.height + 26;

  const noteLines = wrap(t.work.note, 14, W - PAD * 2 - 56);
  const noteH = noteLines.length * 24 + 34;
  body.push(rect(PAD, y, W - PAD * 2, noteH, { rx: 10, fill: C.bg2, stroke: C.line }));
  body.push(rect(PAD, y, 4, noteH, { fill: C.amber }));
  noteLines.forEach((line, i) =>
    body.push(text(PAD + 26, y + 28 + i * 24, line, { size: 14, fill: C.dim }))
  );
  y += noteH + 32;

  return panel(y, body.join('\n'), { id: 'wk', title: t.work.heading, label: t.work.note });
}

function casePanel(t, index) {
  const c = t.cases[index];
  const accent = ACCENTS[c.accent] || C.blue;
  const body = [];
  let y = 52;

  body.push(text(PAD, y, c.eyebrow, { size: 12, fill: accent, letterSpacing: '1.6' }));
  y += 34;
  const titleLines = wrap(c.title, 27, W - PAD * 2);
  titleLines.forEach((line, i) =>
    body.push(text(PAD, y + i * 36, line, { size: 27, fill: C.text, family: SANS, weight: '700' }))
  );
  y += titleLines.length * 36 + 4;
  body.push(
    `<rect x="${PAD}" y="${r(y)}" width="96" height="3" rx="1.5" fill="${accent}" opacity="0.85">` +
      `<animate attributeName="width" values="0;96" dur="1s" fill="freeze"/></rect>`
  );
  y += 30;

  const intro = paragraph(PAD, y, c.intro, { size: 16, lineHeight: 27, fill: C.dim });
  body.push(intro.svg);
  y += intro.height + 30;

  if (c.rows) {
    const tb = table(PAD, y, c.tableHeaders, c.rows, { accent });
    body.push(tb.svg);
    y += tb.height + 30;
  }
  if (c.bullets) {
    const bl = bullets(PAD, y, c.bullets, {
      size: 15.5,
      lineHeight: 25,
      gap: 15,
      dotColors: [accent],
    });
    body.push(bl.svg);
    y += bl.height + 30;
  }

  for (const [label, value] of [
    [c.stackLabel, c.stack],
    [c.shapeLabel, c.shape],
  ]) {
    if (!value) continue;
    const labelW = monoW(label, 11.5) + 26;
    body.push(rect(PAD, y - 14, labelW, 22, { rx: 11, fill: C.bg3, stroke: C.line }));
    body.push(text(PAD + 13, y + 1, label, { size: 11.5, fill: accent }));
    const val = paragraph(PAD + labelW + 12, y + 1, value, {
      size: 13.5,
      lineHeight: 21,
      fill: C.dim2,
      maxWidth: W - PAD * 2 - labelW - 12,
    });
    body.push(val.svg);
    y += Math.max(val.height, 22) + 12;
  }
  y += 20;

  return panel(y, body.join('\n'), {
    id: `c${index}`,
    title: c.title,
    label: `${c.title}. ${c.intro}`,
  });
}

function closingPanel(t, key, id, accent) {
  const s = t[key];
  const body = [];
  let y = 56;
  const head = sectionHead(PAD, y, s.eyebrow, s.heading, accent);
  body.push(head.svg);
  y += head.height + 26;
  const par = paragraph(PAD, y, s.closing, { size: 16, lineHeight: 27, fill: C.dim });
  body.push(par.svg);
  y += par.height + 34;
  return panel(y, body.join('\n'), { id, title: s.heading, label: `${s.heading}. ${s.closing}` });
}

function toolboxPanel(t) {
  const body = [];
  let y = 56;
  const head = sectionHead(PAD, y, t.toolbox.eyebrow, t.toolbox.heading, C.cyan);
  body.push(head.svg);
  y += head.height + 30;

  const labelW = 210;
  for (const group of t.toolbox.groups) {
    const accent = ACCENTS[group.color] || C.blue;
    body.push(text(PAD, y + 19, group.label, { size: 13.5, fill: accent, weight: '600' }));
    const row = chipRow(PAD + labelW, y, group.items, {
      maxWidth: W - PAD * 2 - labelW,
      size: 13,
      h: 28,
      color: C.text2,
      stroke: C.line2,
      fill: C.bg2,
      dot: accent,
    });
    body.push(row.svg);
    y += Math.max(row.height, 28) + 16;
  }
  y += 18;

  return panel(y, body.join('\n'), {
    id: 'tb',
    title: t.toolbox.heading,
    label: t.toolbox.groups.map((g) => `${g.label}: ${g.items.join(', ')}`).join('. '),
  });
}

function nowPanel(t) {
  const body = [];
  let y = 56;
  const head = sectionHead(PAD, y, t.now.eyebrow, t.now.heading, C.amber);
  body.push(head.svg);
  y += head.height + 26;

  const lines = t.now.lines.map((line) => ({
    key: line.startsWith(' ') ? '  ' : '▸ ',
    keyColor: C.amber,
    value: line.trimStart(),
    color: line.startsWith(' ') ? C.dim2 : C.text2,
  }));
  const cb = codeBlock(PAD, y, lines, { size: 15, lineHeight: 26, title: t.now.terminalTitle });
  body.push(cb.svg);
  y += cb.height + 34;

  return panel(y, body.join('\n'), {
    id: 'nw',
    title: t.now.heading,
    label: t.now.lines.join(' '),
  });
}

function githubHeadPanel(t) {
  const body = [];
  let y = 56;
  const head = sectionHead(PAD, y, t.github.eyebrow, t.github.heading, C.blue);
  body.push(head.svg);
  y += head.height + 22;
  const par = paragraph(PAD, y, t.github.note, { size: 13.5, lineHeight: 22, fill: C.dim2 });
  body.push(par.svg);
  y += par.height + 30;
  return panel(y, body.join('\n'), { id: 'gh', title: t.github.heading, label: t.github.note });
}

function contactPanel(t) {
  const body = [];
  let y = 60;
  body.push(
    text(W / 2, y, t.contact.eyebrow, { size: 12, fill: C.blue, anchor: 'middle', letterSpacing: '1.8' })
  );
  y += 44;
  const titleLines = wrap(t.contact.heading, 30, W - PAD * 2);
  titleLines.forEach((line, i) =>
    body.push(
      text(W / 2, y + i * 40, line, {
        size: 30,
        fill: C.text,
        family: SANS,
        weight: '700',
        anchor: 'middle',
      })
    )
  );
  y += titleLines.length * 40 + 14;

  const bodyLines = wrap(t.contact.body, 16, 780);
  bodyLines.forEach((line, i) =>
    body.push(text(W / 2, y + i * 27, line, { size: 16, fill: C.dim, anchor: 'middle' }))
  );
  y += bodyLines.length * 27 + 34;

  body.push(
    `<line x1="${W / 2 - 60}" y1="${r(y)}" x2="${W / 2 + 60}" y2="${r(y)}" stroke="${C.line2}"/>`
  );
  y += 34;
  body.push(
    text(W / 2, y, t.contact.quote, { size: 14, fill: C.faint, anchor: 'middle' })
  );
  y += 40;

  return panel(y, body.join('\n'), {
    id: 'ct',
    title: t.contact.heading,
    label: `${t.contact.heading}. ${t.contact.body}`,
  });
}

/* ----------------------------------------------------------------- buttons */

const ICONS = {
  globe: `<circle cx="{x}" cy="{y}" r="7" fill="none" stroke="#FFFFFF" stroke-width="1.4"/><path d="M{x} {y}" /><ellipse cx="{x}" cy="{y}" rx="3" ry="7" fill="none" stroke="#FFFFFF" stroke-width="1.2"/><line x1="{x}" y1="{y}" x2="{x}" y2="{y}" stroke="#FFFFFF"/>`,
  dot: `<circle cx="{x}" cy="{y}" r="4" fill="#FFFFFF" opacity="0.9"/>`,
};

function buildButtons(locale, t) {
  const defs = [
    ['btn-portfolio', t.buttons.portfolio, '#0F172A'],
    ['btn-linkedin', t.buttons.linkedin, '#2563EB'],
    ['btn-email', t.buttons.email, '#DC2626'],
    ['btn-connect', t.buttons.connect, '#2563EB'],
    ['btn-write', t.buttons.write, '#DC2626'],
    ['btn-more', t.buttons.more, '#0F172A'],
  ];
  for (const [name, label, color] of defs) {
    emit(locale, `${name}.svg`, button(label, { color, icon: ICONS.dot }));
  }
  emit(
    locale,
    'lang-active.svg',
    button(t.langLabel, { color: '#2563EB', size: 13, h: 32 })
  );
  emit(
    locale,
    'lang-other.svg',
    button(t.otherLangLabel, { color: '#111827', textColor: C.dim, size: 13, h: 32 })
  );
}

/* --------------------------------------------------------------- diagrams */

/** Diagram templates carry {{token}} placeholders resolved per locale. */
function buildDiagrams(locale) {
  const tplDir = join(ROOT, 'assets', 'templates');
  if (!existsSync(tplDir)) return [];
  const strings = JSON.parse(readFileSync(join(tplDir, `strings.${locale}.json`), 'utf8'));
  const names = readdirSync(tplDir).filter((f) => f.endsWith('.svg'));
  const problems = [];
  for (const name of names) {
    const raw = readFileSync(join(tplDir, name), 'utf8');
    const out = raw.replace(/\{\{([\w.]+)\}\}/g, (_, key) => {
      const value = strings[key];
      if (value === undefined) {
        problems.push(`${locale}/${name}: missing string "${key}"`);
        return key;
      }
      return esc(value);
    });
    emit(locale, name, out);
  }
  return problems;
}

/** Guard: every string that sits in a fixed-width box must fit inside it. */
function checkDiagramWidths(locale) {
  const tplDir = join(ROOT, 'assets', 'templates');
  const budgetPath = join(tplDir, 'budgets.json');
  if (!existsSync(budgetPath)) return [];
  const budgets = JSON.parse(readFileSync(budgetPath, 'utf8'));
  const strings = JSON.parse(readFileSync(join(tplDir, `strings.${locale}.json`), 'utf8'));
  const problems = [];
  for (const [key, spec] of Object.entries(budgets)) {
    const value = strings[key];
    if (value === undefined) continue;
    const width = monoW(value, spec.size);
    if (width > spec.max) {
      problems.push(
        `${locale}: "${key}" is ${Math.round(width)}px at ${spec.size}px, budget ${spec.max}px ` +
          `(${value.length} chars, max ~${Math.floor(spec.max / (spec.size * 0.6))})`
      );
    }
  }
  return problems;
}

/* ----------------------------------------------------------------- readme */

const img = (src, alt) => `<img width="100%" alt="${alt.replace(/"/g, "'")}" src="${src}"/>`;
const link = (href, src, alt) =>
  `<a href="${href}"><img alt="${alt.replace(/"/g, "'")}" src="${src}"/></a>`;

function buildReadme(locale, t) {
  const a = `assets/${locale}`;
  const other = `${site.repo}/blob/main/${t.otherLangFile}`;
  const self = `${site.repo}/blob/main/${t.selfFile}`;

  const out = [];
  out.push('<div align="center">');
  out.push('');
  out.push(link(self, `${a}/lang-active.svg`, t.langLabel));
  out.push(link(other, `${a}/lang-other.svg`, t.otherLangLabel));
  out.push('');
  out.push(img(`${a}/hero.svg`, `Kevin Bayter — ${t.hero.roles[0]}`));
  out.push('');
  out.push(link(site.portfolio, `${a}/btn-portfolio.svg`, t.buttons.portfolio));
  out.push(link(site.linkedin, `${a}/btn-linkedin.svg`, t.buttons.linkedin));
  out.push(link(`mailto:${site.email}`, `${a}/btn-email.svg`, t.buttons.email));
  out.push('');
  out.push(img(`${a}/s-whoami.svg`, t.whoami.heading));
  out.push('');
  out.push(img(`${a}/s-impact.svg`, t.impact.heading));
  out.push('');
  out.push(img(`${a}/s-work.svg`, t.work.heading));
  out.push('');

  t.cases.forEach((c, i) => {
    out.push(img(`${a}/s-case-${i + 1}.svg`, c.title));
    const diagram = ['agent-loop', 'platform-flow', 'ai-fiscal'][i];
    if (diagram) {
      out.push('');
      out.push(img(`${a}/${diagram}.svg`, c.title));
    }
    out.push('');
  });

  out.push(img(`${a}/s-ai-stack.svg`, t.aiStack.heading));
  out.push('');
  out.push(img(`${a}/ai-stack.svg`, t.aiStack.heading));
  out.push('');
  out.push(img(`${a}/s-arch.svg`, t.arch.heading));
  out.push('');
  out.push(img(`${a}/hexagon.svg`, t.arch.heading));
  out.push('');
  out.push(img(`${a}/s-toolbox.svg`, t.toolbox.heading));
  out.push('');
  out.push(img(`${a}/s-now.svg`, t.now.heading));
  out.push('');
  out.push(img(`${a}/s-github.svg`, t.github.heading));
  out.push('');
  out.push(img(`${a}/github-stats.svg`, t.github.heading));
  out.push('');
  out.push(img(`${a}/s-contact.svg`, t.contact.heading));
  out.push('');
  out.push(link(site.linkedin, `${a}/btn-connect.svg`, t.buttons.connect));
  out.push(link(`mailto:${site.email}`, `${a}/btn-write.svg`, t.buttons.write));
  out.push(link(site.portfolio, `${a}/btn-more.svg`, t.buttons.more));
  out.push('');
  out.push('</div>');
  out.push('');

  writeFileSync(join(ROOT, t.selfFile), out.join('\n'));
  written.push(t.selfFile);
}

/* -------------------------------------------------------------------- run */

const problems = [];
for (const locale of LOCALES) {
  const t = content[locale];
  emit(locale, 's-whoami.svg', whoamiPanel(t));
  emit(locale, 's-impact.svg', impactPanel(t));
  emit(locale, 's-work.svg', workPanel(t));
  t.cases.forEach((_, i) => emit(locale, `s-case-${i + 1}.svg`, casePanel(t, i)));
  emit(locale, 's-ai-stack.svg', closingPanel(t, 'aiStack', 'as', C.violet));
  emit(locale, 's-arch.svg', closingPanel(t, 'arch', 'ar', C.green));
  emit(locale, 's-toolbox.svg', toolboxPanel(t));
  emit(locale, 's-now.svg', nowPanel(t));
  emit(locale, 's-github.svg', githubHeadPanel(t));
  emit(locale, 's-contact.svg', contactPanel(t));
  buildButtons(locale, t);
  problems.push(...checkDiagramWidths(locale));
  problems.push(...buildDiagrams(locale));
  buildReadme(locale, t);
}

console.log(`wrote ${written.length} files`);
if (problems.length) {
  console.error('\nPROBLEMS:');
  for (const p of problems) console.error(' - ' + p);
  process.exitCode = 1;
} else {
  console.log('all text fits its layout budget');
}
