const fs = require('fs');
let c = fs.readFileSync('src/App.jsx', 'utf8');
c = c.replace(/React\.useState/g, 'useState');
c = c.replace(/React\.useEffect/g, 'useEffect');
c = c.replace(/React\.useRef/g, 'useRef');
fs.writeFileSync('src/App.jsx', c);
console.log('Done!');