/**
 * Minimal SVG layout primitives for the profile panels.
 *
 * Everything is monospace-first so text width is predictable: for the mono
 * stack we use, advance width is almost exactly 0.6em. That lets us wrap text
 * in the builder instead of hoping it fits, which is the whole reason these
 * panels are generated rather than hand-written.
 */

export const W = 1000; // canvas width for every generated panel
export const PAD = 40; // horizontal padding inside a panel

export const C = {
  bg0: '#020617',
  bg1: '#0B1120',
  bg2: '#0F172A',
  bg3: '#111827',
  line: '#1E293B',
  line2: '#334155',
  text: '#E2E8F0',
  text2: '#CBD5E1',
  dim: '#94A3B8',
  dim2: '#64748B',
  faint: '#475569',
  blue: '#38BDF8',
  blueDeep: '#3B82F6',
  cyan: '#22D3EE',
  violet: '#A78BFA',
  green: '#34D399',
  amber: '#FBBF24',
  red: '#F87171',
};

export const MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
export const SANS = 'Segoe UI, Helvetica Neue, Helvetica, Arial, sans-serif';

const MONO_RATIO = 0.6;
const SANS_RATIO = 0.545; // conservative average for the sans stack

export const monoW = (text, size) => text.length * size * MONO_RATIO;
export const sansW = (text, size) => text.length * size * SANS_RATIO;

/** XML-escape and force non-ASCII into entities so the files stay 7-bit clean. */
export function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/[\u0080-\uFFFF]/g, (ch) => `&#${ch.codePointAt(0)};`);
}

/** Greedy word wrap against a pixel budget, monospace metrics. */
export function wrap(text, size, maxWidth) {
  const max = Math.floor(maxWidth / (size * MONO_RATIO));
  const out = [];
  for (const paragraph of String(text).split('\n')) {
    if (!paragraph.trim()) {
      out.push('');
      continue;
    }
    let line = '';
    for (const word of paragraph.split(/\s+/)) {
      const candidate = line ? `${line} ${word}` : word;
      if (candidate.length <= max) {
        line = candidate;
      } else {
        if (line) out.push(line);
        line = word;
      }
    }
    if (line) out.push(line);
  }
  return out;
}

export function text(x, y, content, opts = {}) {
  const {
    size = 16,
    fill = C.dim,
    weight = null,
    family = MONO,
    anchor = null,
    opacity = null,
    letterSpacing = null,
  } = opts;
  const attrs = [
    `x="${r(x)}"`,
    `y="${r(y)}"`,
    `font-family="${family}"`,
    `font-size="${size}"`,
    `fill="${fill}"`,
  ];
  if (weight) attrs.push(`font-weight="${weight}"`);
  if (anchor) attrs.push(`text-anchor="${anchor}"`);
  if (opacity !== null) attrs.push(`opacity="${opacity}"`);
  if (letterSpacing) attrs.push(`letter-spacing="${letterSpacing}"`);
  return `<text ${attrs.join(' ')}>${esc(content)}</text>`;
}

/** Multi-line paragraph. Returns { svg, height }. */
export function paragraph(x, y, content, opts = {}) {
  const { size = 16, lineHeight = 27, maxWidth = W - PAD * 2, ...rest } = opts;
  const lines = wrap(content, size, maxWidth);
  const svg = lines
    .map((line, i) => (line ? text(x, y + i * lineHeight, line, { size, ...rest }) : ''))
    .join('\n');
  return { svg, height: lines.length * lineHeight, lines: lines.length };
}

export function rect(x, y, w, h, opts = {}) {
  const { rx = 0, fill = 'none', stroke = null, opacity = null, strokeWidth = null } = opts;
  const attrs = [`x="${r(x)}"`, `y="${r(y)}"`, `width="${r(w)}"`, `height="${r(h)}"`];
  if (rx) attrs.push(`rx="${rx}"`);
  attrs.push(`fill="${fill}"`);
  if (stroke) attrs.push(`stroke="${stroke}"`);
  if (strokeWidth) attrs.push(`stroke-width="${strokeWidth}"`);
  if (opacity !== null) attrs.push(`opacity="${opacity}"`);
  return `<rect ${attrs.join(' ')}/>`;
}

export const r = (n) => (Math.round(n * 100) / 100).toString();

/**
 * Section eyebrow + big heading, with an underline that draws itself in.
 * Returns { svg, height }.
 */
export function sectionHead(x, y, eyebrow, heading, accent = C.blue) {
  const parts = [];
  parts.push(text(x, y, eyebrow, { size: 12, fill: accent, letterSpacing: '1.6' }));
  parts.push(text(x, y + 40, heading, { size: 30, fill: C.text, family: SANS, weight: '700' }));
  const uw = Math.min(sansW(heading, 30) + 8, W - PAD * 2);
  parts.push(
    `<rect x="${r(x)}" y="${r(y + 52)}" width="${r(uw)}" height="3" rx="1.5" fill="${accent}" opacity="0.85">` +
      `<animate attributeName="width" values="0;${r(uw)}" dur="1.1s" fill="freeze"/></rect>`
  );
  return { svg: parts.join('\n'), height: 66 };
}

/** Small pill/chip. Returns { svg, width }. */
export function chip(x, y, label, opts = {}) {
  const {
    size = 13,
    fill = C.bg2,
    stroke = C.line,
    color = C.dim,
    dot = null,
    h = 28,
    padX = 14,
  } = opts;
  const dotW = dot ? 16 : 0;
  const w = padX * 2 + dotW + monoW(label, size);
  const parts = [rect(x, y, w, h, { rx: h / 2, fill, stroke })];
  if (dot) parts.push(`<circle cx="${r(x + padX + 4)}" cy="${r(y + h / 2)}" r="3.5" fill="${dot}"/>`);
  parts.push(text(x + padX + dotW, y + h / 2 + size * 0.36, label, { size, fill: color }));
  return { svg: parts.join('\n'), width: w };
}

/** Row of chips that wraps. Returns { svg, height }. */
export function chipRow(x, y, items, opts = {}) {
  const { maxWidth = W - PAD * 2, gap = 10, rowGap = 10, h = 28 } = opts;
  const parts = [];
  let cx = x;
  let cy = y;
  for (const item of items) {
    const label = typeof item === 'string' ? item : item.label;
    const c = chip(cx, cy, label, { ...opts, ...(typeof item === 'object' ? item : {}), h });
    if (cx > x && cx - x + c.width > maxWidth) {
      cx = x;
      cy += h + rowGap;
      const again = chip(cx, cy, label, { ...opts, ...(typeof item === 'object' ? item : {}), h });
      parts.push(again.svg);
      cx += again.width + gap;
    } else {
      parts.push(c.svg);
      cx += c.width + gap;
    }
  }
  return { svg: parts.join('\n'), height: cy - y + h };
}

/** Terminal-style code block. Returns { svg, height }. */
export function codeBlock(x, y, lines, opts = {}) {
  const { size = 15, lineHeight = 25, width = W - PAD * 2, title = null, accent = C.green } = opts;
  const top = title ? 34 : 16;
  const h = top + lines.length * lineHeight + 16;
  const parts = [rect(x, y, width, h, { rx: 10, fill: C.bg0, stroke: C.line })];
  if (title) {
    parts.push(`<circle cx="${r(x + 18)}" cy="${r(y + 18)}" r="4" fill="${C.red}"/>`);
    parts.push(`<circle cx="${r(x + 32)}" cy="${r(y + 18)}" r="4" fill="${C.amber}"/>`);
    parts.push(`<circle cx="${r(x + 46)}" cy="${r(y + 18)}" r="4" fill="${C.green}"/>`);
    parts.push(text(x + 62, y + 22, title, { size: 12, fill: C.faint }));
  }
  lines.forEach((line, i) => {
    const ly = y + top + 16 + i * lineHeight;
    if (typeof line === 'string') {
      parts.push(text(x + 18, ly, line, { size, fill: C.dim }));
      return;
    }
    let lx = x + 18;
    if (line.key) {
      parts.push(text(lx, ly, line.key, { size, fill: line.keyColor || accent }));
      lx += monoW(line.key, size) + size * 0.6;
    }
    parts.push(text(lx, ly, line.value, { size, fill: line.color || C.dim }));
  });
  return { svg: parts.join('\n'), height: h };
}

/** Two-column table with wrapped cells. Returns { svg, height }. */
export function table(x, y, headers, rows, opts = {}) {
  const {
    width = W - PAD * 2,
    leftRatio = 0.42,
    size = 14,
    lineHeight = 22,
    padY = 14,
    padX = 16,
    accent = C.blue,
  } = opts;
  const lw = Math.round(width * leftRatio);
  const rw = width - lw;
  const parts = [];
  let cy = y;

  parts.push(text(x + padX, cy + 14, headers[0], { size: 11.5, fill: accent, letterSpacing: '1.2' }));
  parts.push(text(x + lw + padX, cy + 14, headers[1], { size: 11.5, fill: accent, letterSpacing: '1.2' }));
  cy += 26;
  parts.push(`<line x1="${r(x)}" y1="${r(cy)}" x2="${r(x + width)}" y2="${r(cy)}" stroke="${C.line}"/>`);

  rows.forEach((row, i) => {
    const left = wrap(row[0], size, lw - padX * 2);
    const right = wrap(row[1], size, rw - padX * 2);
    const rowH = Math.max(left.length, right.length) * lineHeight + padY * 2;
    if (i % 2 === 0) parts.push(rect(x, cy, width, rowH, { fill: C.bg2, opacity: 0.55 }));
    left.forEach((line, j) =>
      parts.push(text(x + padX, cy + padY + 14 + j * lineHeight, line, { size, fill: C.dim }))
    );
    right.forEach((line, j) =>
      parts.push(text(x + lw + padX, cy + padY + 14 + j * lineHeight, line, { size, fill: C.text2 }))
    );
    parts.push(
      `<line x1="${r(x + lw)}" y1="${r(cy)}" x2="${r(x + lw)}" y2="${r(cy + rowH)}" stroke="${C.line}"/>`
    );
    cy += rowH;
    parts.push(`<line x1="${r(x)}" y1="${r(cy)}" x2="${r(x + width)}" y2="${r(cy)}" stroke="${C.line}"/>`);
  });

  return { svg: parts.join('\n'), height: cy - y };
}

/** Bullet list with wrapped text and an optional bold lead-in. */
export function bullets(x, y, items, opts = {}) {
  const {
    size = 16,
    lineHeight = 26,
    gap = 16,
    maxWidth = W - PAD * 2 - 46,
    color = C.dim,
    leadColor = C.text2,
    dotColors = [C.blue, C.cyan, C.violet, C.green, C.amber],
  } = opts;
  const parts = [];
  let cy = y;
  items.forEach((item, i) => {
    const lead = typeof item === 'object' ? item.lead : null;
    const body = typeof item === 'object' ? item.text : item;
    const full = lead ? `${lead} ${body}` : body;
    const lines = wrap(full, size, maxWidth);
    parts.push(`<circle cx="${r(x + 5)}" cy="${r(cy - 5)}" r="4" fill="${dotColors[i % dotColors.length]}"/>`);
    lines.forEach((line, j) => {
      if (j === 0 && lead) {
        // Draw the lead-in highlighted, then the rest of the first line.
        // SVG strips leading whitespace, so the gap has to be advanced
        // explicitly instead of relying on the space in the source string.
        const leadPart = line.slice(0, lead.length);
        const restPart = line.slice(lead.length).trimStart();
        parts.push(text(x + 30, cy, leadPart, { size, fill: leadColor, weight: '600' }));
        if (restPart) {
          const restX = x + 30 + monoW(`${leadPart} `, size);
          parts.push(text(restX, cy, restPart, { size, fill: color }));
        }
      } else {
        parts.push(text(x + 30, cy + j * lineHeight, line, { size, fill: color }));
      }
    });
    cy += lines.length * lineHeight + gap;
  });
  return { svg: parts.join('\n'), height: cy - y - gap };
}

/** Wrap the body of a panel in the shared frame + background. */
export function panel(height, body, opts = {}) {
  const { id = 'p', title = '', label = '', glow = true } = opts;
  const defs = `
  <defs>
    <linearGradient id="${id}Bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${C.bg0}"/>
      <stop offset="100%" stop-color="#0A1524"/>
    </linearGradient>
    ${
      glow
        ? `<radialGradient id="${id}Glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${C.blueDeep}" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="${C.blueDeep}" stop-opacity="0"/>
    </radialGradient>`
        : ''
    }
    <clipPath id="${id}Clip"><rect width="${W}" height="${r(height)}" rx="16"/></clipPath>
  </defs>`;

  const ambient = glow
    ? `<ellipse cx="${W * 0.78}" cy="-40" rx="420" ry="220" fill="url(#${id}Glow)">
      <animate attributeName="cx" values="${W * 0.78};${W * 0.5};${W * 0.78}" dur="19s" repeatCount="indefinite"/>
    </ellipse>`
    : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${r(height)}" width="${W}" height="${r(height)}" role="img" aria-label="${esc(label || title)}">
  <title>${esc(title)}</title>${defs}
  <g clip-path="url(#${id}Clip)">
    <rect width="${W}" height="${r(height)}" fill="url(#${id}Bg)"/>
    ${ambient}
${body}
    <rect x="0.5" y="0.5" width="${W - 1}" height="${r(height - 1)}" rx="16" fill="none" stroke="${C.line}"/>
  </g>
</svg>
`;
}

/** Small clickable button rendered as its own SVG. */
export function button(label, opts = {}) {
  const { color = C.blueDeep, textColor = '#FFFFFF', size = 14, h = 40, icon = null } = opts;
  const padX = 20;
  const iconW = icon ? 22 : 0;
  const w = Math.ceil(padX * 2 + iconW + monoW(label, size));
  const parts = [
    `<rect x="0.5" y="0.5" width="${w - 1}" height="${h - 1}" rx="${h / 2}" fill="${color}" stroke="${color}"/>`,
  ];
  if (icon) parts.push(icon.replace('{x}', String(padX)).replace('{y}', String(h / 2)));
  parts.push(
    text(padX + iconW, h / 2 + size * 0.36, label, { size, fill: textColor, weight: '600' })
  );
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${esc(label)}">
  <title>${esc(label)}</title>
${parts.join('\n')}
</svg>
`;
}
