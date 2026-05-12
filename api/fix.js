const fs = require('fs');
let c = fs.readFileSync('src/App.jsx', 'utf8');

const first = c.indexOf('function drawCircuits');
const second = c.indexOf('function drawCircuits', first + 1);

if (second !== -1) {
  c = c.substring(0, second) + c.substring(c.indexOf('function drawAlgebra', second));
  fs.writeFileSync('src/App.jsx', c);
  console.log('Duplicate removed!');
} else {
  console.log('No duplicate found');
}