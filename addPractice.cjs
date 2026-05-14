const fs = require('fs');
let c = fs.readFileSync('src/App.jsx', 'utf8');

const idx = c.indexOf('// 4: Practice Problems');
const idx5 = c.indexOf('// 5: Quiz');

const newStep4 = `// 4: Practice Problems
    <div style={{ height: "100%" }}>
      <PracticeProblems topic={topic} lesson={lesson} />
    </div>,

    `;

c = c.substring(0, idx) + newStep4 + c.substring(idx5);
fs.writeFileSync('src/App.jsx', c);
console.log('Done! Step 4 replaced.');