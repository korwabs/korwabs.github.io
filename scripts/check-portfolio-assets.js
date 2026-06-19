const fs = require('fs');
const path = require('path');

const requiredFiles = [
  'portfolio/index.html',
  'portfolio/en.html',
  'portfolio/brochure.html',
  'portfolio/brochure_en.html',
  'portfolio/brochure_ko.pdf',
  'portfolio/brochure_en.pdf',
  'portfolio/wabs-logo.png',
  'portfolio/thumbnails/cxp-saas.jpg',
  'portfolio/thumbnails/dagen.jpg',
  'portfolio/thumbnails/enms.jpg',
  'portfolio/thumbnails/harness-monitor.jpg',
  'portfolio/thumbnails/lamda.jpg',
  'portfolio/thumbnails/meeting-assistant.jpg',
  'portfolio/thumbnails/multi-ai-agent-system.jpg',
  'portfolio/thumbnails/multi-ai-agent.jpg',
  'portfolio/thumbnails/wabs-logo-sm.png',
  'portfolio/videos/cxp-saas.mp4',
  'portfolio/videos/dagen.mp4',
  'portfolio/videos/enms.mp4',
  'portfolio/videos/harness-monitor.mp4',
  'portfolio/videos/lamda.mp4',
  'portfolio/videos/meeting-assistant.mp4',
  'portfolio/videos/multi-ai-agent.mp4',
];

const roots = ['public', 'out'];
const missing = [];

for (const root of roots) {
  for (const file of requiredFiles) {
    const fullPath = path.join(process.cwd(), root, file);
    if (!fs.existsSync(fullPath) || fs.statSync(fullPath).size === 0) {
      missing.push(path.join(root, file));
    }
  }
}

for (const htmlFile of ['public/portfolio/index.html', 'out/portfolio/index.html']) {
  const fullPath = path.join(process.cwd(), htmlFile);
  if (!fs.existsSync(fullPath)) {
    missing.push(htmlFile);
    continue;
  }
  const html = fs.readFileSync(fullPath, 'utf8');
  for (const video of [
    'videos/cxp-saas.mp4',
    'videos/dagen.mp4',
    'videos/enms.mp4',
    'videos/harness-monitor.mp4',
    'videos/lamda.mp4',
    'videos/meeting-assistant.mp4',
    'videos/multi-ai-agent.mp4',
  ]) {
    if (!html.includes(video)) {
      missing.push(`${htmlFile} reference to ${video}`);
    }
  }
}

if (missing.length > 0) {
  console.error('Portfolio deploy guard failed. Missing assets/references:');
  for (const item of missing) console.error(`- ${item}`);
  process.exit(1);
}

console.log(`Portfolio asset guard passed (${requiredFiles.length} required files checked in public/ and out/).`);
