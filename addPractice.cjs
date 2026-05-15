const fs = require('fs');
let c = fs.readFileSync('src/App.jsx', 'utf8');
const newSims = require('./thermosims2.cjs');

const insertBefore = 'function drawEM(';
const idx = c.indexOf(insertBefore);
c = c.substring(0, idx) + newSims + '\n' + c.substring(idx);

fs.writeFileSync('src/App.jsx', c);
console.log('Done!');
console.log('drawHeat:', (c.match(/function drawHeat/g)||[]).length);
console.log('drawCarnot:', (c.match(/function drawCarnot/g)||[]).length);