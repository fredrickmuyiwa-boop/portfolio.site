#!/usr/bin/env node
// Generates themed SVG project preview images matching the purple/glassmorphism aesthetic.
const fs = require('fs');
const path = require('path');

const dir = (sub) => path.join(__dirname, '..', 'public', 'images', sub);

const projects = [
  { slug: 'executive-business-dashboard', title: 'Executive Dashboard', accent: '#8B5CF6', accent2: '#6D28D9', type: 'dashboard' },
  { slug: 'recruitment-automation-platform', title: 'Recruitment Platform', accent: '#6366F1', accent2: '#4338CA', type: 'pipeline' },
  { slug: 'ai-business-website', title: 'AI Business Website', accent: '#A855F7', accent2: '#7C3AED', type: 'website' },
  { slug: 'sales-funnel-automation', title: 'Sales Funnel', accent: '#C026D3', accent2: '#9333EA', type: 'funnel' },
  { slug: 'analytics-reporting-dashboard', title: 'Analytics Reporting', accent: '#7C3AED', accent2: '#5B21B6', type: 'charts' },
];

function barChart(x, y, w, h, accent) {
  const bars = [0.4, 0.65, 0.5, 0.8, 0.6, 0.9, 0.7];
  return bars.map((bh, i) => {
    const bw = w / bars.length - 6;
    const bx = x + i * (bw + 6);
    const by = y + h - h * bh;
    return `<rect x="${bx}" y="${by}" width="${bw}" height="${h * bh}" rx="4" fill="${accent}" opacity="${0.5 + bh * 0.4}"/>`;
  }).join('');
}

function lineChart(x, y, w, h, accent) {
  const pts = [0.3, 0.45, 0.35, 0.6, 0.55, 0.75, 0.7, 0.85];
  const points = pts.map((p, i) => `${x + (i / (pts.length - 1)) * w},${y + h - p * h}`).join(' ');
  const area = `${x},${y + h} ${points} ${x + w},${y + h}`;
  return `
    <defs><linearGradient id="area-${accent.replace('#','')}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </linearGradient></defs>
    <polygon points="${area}" fill="url(#area-${accent.replace('#','')})"/>
    <polyline points="${points}" fill="none" stroke="${accent}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  `;
}

function donut(cx, cy, r, accent, accent2) {
  const circ = 2 * Math.PI * r;
  return `
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#1a1a2e" stroke-width="14"/>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${accent}" stroke-width="14"
      stroke-dasharray="${circ * 0.72} ${circ}" stroke-linecap="round"
      transform="rotate(-90 ${cx} ${cy})"/>
    <circle cx="${cx}" cy="${cy}" r="${r * 0.55}" fill="none" stroke="${accent2}" stroke-width="10"
      stroke-dasharray="${circ * 0.55 * 0.55} ${circ * 0.55}" stroke-linecap="round"
      transform="rotate(-90 ${cx} ${cy})"/>
  `;
}

function generateSVG(project) {
  const { slug, title, accent, accent2, type } = project;
  const bg = '#0B0B12';
  const cardBg = '#13131D';

  let content = '';

  if (type === 'dashboard') {
    content = `
      <rect x="40" y="80" width="170" height="80" rx="12" fill="${cardBg}" stroke="#2a2a3e" stroke-width="1"/>
      <text x="56" y="108" fill="#A1A1AA" font-size="11" font-family="sans-serif">Revenue</text>
      <text x="56" y="138" fill="#fff" font-size="22" font-weight="bold" font-family="sans-serif">$284K</text>
      <rect x="40" y="180" width="170" height="80" rx="12" fill="${cardBg}" stroke="#2a2a3e" stroke-width="1"/>
      <text x="56" y="208" fill="#A1A1AA" font-size="11" font-family="sans-serif">Customers</text>
      <text x="56" y="238" fill="#fff" font-size="22" font-weight="bold" font-family="sans-serif">12,847</text>
      <rect x="230" y="80" width="330" height="180" rx="12" fill="${cardBg}" stroke="#2a2a3e" stroke-width="1"/>
      ${lineChart(250, 110, 290, 130, accent)}
      <rect x="40" y="280" width="520" height="140" rx="12" fill="${cardBg}" stroke="#2a2a3e" stroke-width="1"/>
      ${barChart(60, 300, 480, 100, accent)}
    `;
  } else if (type === 'pipeline') {
    const stages = ['Applied', 'Screened', 'Interview', 'Offer', 'Hired'];
    content = stages.map((s, i) => {
      const x = 40 + i * 104;
      const count = [120, 80, 45, 20, 12][i];
      return `
        <rect x="${x}" y="100" width="88" height="280" rx="10" fill="${cardBg}" stroke="#2a2a3e" stroke-width="1"/>
        <text x="${x + 44}" y="124" fill="#A1A1AA" font-size="10" text-anchor="middle" font-family="sans-serif">${s}</text>
        <text x="${x + 44}" y="148" fill="#fff" font-size="16" font-weight="bold" text-anchor="middle" font-family="sans-serif">${count}</text>
        ${[0,1,2,3].map(j => `<rect x="${x + 8}" y="${168 + j * 50}" width="72" height="40" rx="6" fill="${accent}" opacity="${0.3 + j * 0.15}"/>`).join('')}
      `;
    }).join('');
  } else if (type === 'website') {
    content = `
      <rect x="40" y="80" width="520" height="340" rx="12" fill="${cardBg}" stroke="#2a2a3e" stroke-width="1"/>
      <rect x="40" y="80" width="520" height="48" rx="12" fill="#1a1a2e"/>
      <circle cx="64" cy="104" r="6" fill="${accent}"/>
      <rect x="80" y="98" width="80" height="12" rx="4" fill="#3a3a4e"/>
      <rect x="420" y="94" width="50" height="20" rx="6" fill="${accent}"/>
      <rect x="480" y="94" width="50" height="20" rx="6" fill="#2a2a3e"/>
      <text x="300" y="180" fill="#fff" font-size="28" font-weight="bold" text-anchor="middle" font-family="sans-serif">Transform Your</text>
      <text x="300" y="215" fill="${accent}" font-size="28" font-weight="bold" text-anchor="middle" font-family="sans-serif">Business with AI</text>
      <rect x="220" y="250" width="160" height="40" rx="8" fill="${accent}"/>
      <text x="300" y="275" fill="#fff" font-size="13" text-anchor="middle" font-family="sans-serif">Get Started Free</text>
      <rect x="100" y="330" width="120" height="60" rx="10" fill="#1a1a2e" stroke="#2a2a3e"/>
      <rect x="240" y="330" width="120" height="60" rx="10" fill="#1a1a2e" stroke="#2a2a3e"/>
      <rect x="380" y="330" width="120" height="60" rx="10" fill="#1a1a2e" stroke="#2a2a3e"/>
    `;
  } else if (type === 'funnel') {
    const stages = [
      { label: 'Leads', w: 480, count: '1,200' },
      { label: 'Qualified', w: 380, count: '740' },
      { label: 'Demo', w: 280, count: '420' },
      { label: 'Proposal', w: 180, count: '180' },
      { label: 'Closed', w: 100, count: '72' },
    ];
    content = stages.map((s, i) => {
      const x = 300 - s.w / 2;
      const y = 90 + i * 72;
      return `
        <rect x="${x}" y="${y}" width="${s.w}" height="56" rx="8" fill="${accent}" opacity="${0.25 + i * 0.15}"/>
        <text x="${x + 20}" y="${y + 34}" fill="#fff" font-size="14" font-weight="bold" font-family="sans-serif">${s.label}</text>
        <text x="${x + s.w - 20}" y="${y + 34}" fill="#fff" font-size="14" font-weight="bold" text-anchor="end" font-family="sans-serif">${s.count}</text>
      `;
    }).join('');
  } else if (type === 'charts') {
    content = `
      <rect x="40" y="80" width="280" height="160" rx="12" fill="${cardBg}" stroke="#2a2a3e" stroke-width="1"/>
      ${lineChart(60, 100, 240, 120, accent)}
      <rect x="340" y="80" width="220" height="160" rx="12" fill="${cardBg}" stroke="#2a2a3e" stroke-width="1"/>
      ${donut(450, 160, 55, accent, accent2)}
      <rect x="40" y="260" width="520" height="160" rx="12" fill="${cardBg}" stroke="#2a2a3e" stroke-width="1"/>
      ${barChart(60, 280, 480, 120, accent)}
    `;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420" width="600" height="420" role="img" aria-label="${title} preview">
  <defs>
    <linearGradient id="bg-${slug}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${bg}"/>
      <stop offset="100%" stop-color="#13131D"/>
    </linearGradient>
    <radialGradient id="glow-${slug}" cx="0.5" cy="0.3" r="0.6">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="600" height="420" fill="url(#bg-${slug})"/>
  <rect width="600" height="420" fill="url(#glow-${slug})"/>
  ${content}
</svg>`;
}

// Generate project images
projects.forEach((p) => {
  const svg = generateSVG(p);
  fs.writeFileSync(path.join(dir('projects'), `${p.slug}.svg`), svg);
});

// Generate hero background
const heroBg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800" role="img" aria-label="Abstract gradient background">
  <defs>
    <radialGradient id="g1" cx="0.2" cy="0.3" r="0.4">
      <stop offset="0%" stop-color="#6D28D9" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#6D28D9" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="g2" cx="0.8" cy="0.2" r="0.35">
      <stop offset="0%" stop-color="#A855F7" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#A855F7" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="g3" cx="0.5" cy="0.8" r="0.4">
      <stop offset="0%" stop-color="#8B5CF6" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#8B5CF6" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="800" fill="#0B0B12"/>
  <rect width="1200" height="800" fill="url(#g1)"/>
  <rect width="1200" height="800" fill="url(#g2)"/>
  <rect width="1200" height="800" fill="url(#g3)"/>
</svg>`;
fs.writeFileSync(path.join(dir('hero'), 'hero-bg.svg'), heroBg);

// Generate OG image
const ogImage = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630" role="img" aria-label="Fredrick Muyiwa portfolio">
  <defs>
    <linearGradient id="ogbg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0B0B12"/>
      <stop offset="100%" stop-color="#1a1a2e"/>
    </linearGradient>
    <linearGradient id="ogtext" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#8B5CF6"/>
      <stop offset="50%" stop-color="#A855F7"/>
      <stop offset="100%" stop-color="#6D28D9"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#ogbg)"/>
  <circle cx="200" cy="150" r="200" fill="#6D28D9" opacity="0.15"/>
  <circle cx="1000" cy="500" r="180" fill="#A855F7" opacity="0.12"/>
  <rect x="100" y="200" width="80" height="80" rx="20" fill="url(#ogtext)"/>
  <text x="100" y="350" fill="#fff" font-size="52" font-weight="bold" font-family="sans-serif">Fredrick Muyiwa</text>
  <text x="100" y="410" fill="#A1A1AA" font-size="24" font-family="sans-serif">Business Analyst • Web Developer • GHL Automation Expert</text>
  <text x="100" y="470" fill="url(#ogtext)" font-size="20" font-weight="600" font-family="sans-serif">Data • Technology • Automation</text>
</svg>`;
fs.writeFileSync(path.join(dir('hero'), 'og-image.svg'), ogImage);

console.log('Generated', projects.length + 2, 'SVG assets');
