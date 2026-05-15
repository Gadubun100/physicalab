const fs = require('fs');
let c = fs.readFileSync('src/App.jsx', 'utf8');

const quantumIdx = c.indexOf('quantum: {');
const relativityIdx = c.indexOf('relativity: {');
let qSection = c.substring(quantumIdx, relativityIdx);

const replacements = [
  ['id: "duality"', 'doubleslit'],
  ['id: "uncertainty"', 'uncertainty2'],
  ['id: "schrodinger"', 'schrodinger'],
  ['id: "tunnelling"', 'tunnelling'],
  ['id: "orbitals"', 'orbitals'],
];

replacements.forEach(function(r) {
  const lessonIdx = qSection.indexOf(r[0]);
  if (lessonIdx > -1) {
    const simKeyIdx = qSection.indexOf('simKey: "quantum"', lessonIdx);
    console.log('lesson:', r[0], 'at:', lessonIdx, 'simKey at:', simKeyIdx, 'diff:', simKeyIdx - lessonIdx);
    if (simKeyIdx > -1) {
      qSection = qSection.substring(0, simKeyIdx) + 'simKey: "' + r[1] + '"' + qSection.substring(simKeyIdx + 17);
      console.log('Updated:', r[1]);
    }
  }
});

c = c.substring(0, quantumIdx) + qSection + c.substring(relativityIdx);
fs.writeFileSync('src/App.jsx', c);
console.log('Done!');