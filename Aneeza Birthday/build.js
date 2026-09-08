// Regenerates aneeza-birthday.html (a single self-contained file for
// drag-and-drop static hosting) by inlining style.css and script.js into
// index.html. Run this after editing index.html/style.css/script.js.
const fs = require('fs');
const path = require('path');

const dir = __dirname;
const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(dir, 'style.css'), 'utf8');
const js = fs.readFileSync(path.join(dir, 'script.js'), 'utf8');

const out = html
  .replace('<link rel="stylesheet" href="style.css">', `<style>\n${css}</style>`)
  .replace('<script src="script.js"></script>', `<script>\n${js}</script>`);

fs.writeFileSync(path.join(dir, 'aneeza-birthday.html'), out);
console.log('Built aneeza-birthday.html');
