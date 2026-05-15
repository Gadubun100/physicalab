const fs = require('fs');
let c = fs.readFileSync('src/App.jsx', 'utf8');

const all = [...c.matchAll(/simKey === "doubleslit"/g)].map(m => m.index);
console.log('doubleslit simKey check positions:', all);
all.forEach(idx => console.log('context:', JSON.stringify(c.substring(idx-10, idx+60))));