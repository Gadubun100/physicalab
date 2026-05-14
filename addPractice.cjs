const fs = require('fs');
let c = fs.readFileSync('src/App.jsx', 'utf8');

c = c.replace(
  'const [showLanding, setShowLanding] = useState(true);',
  'const [showLanding, setShowLanding] = useState(() => !localStorage.getItem("physicalab_visited"));'
);

c = c.replace(
  'if (showLanding) return <LandingPage onStart={() => setShowLanding(false)} />;',
  'if (showLanding) return <LandingPage onStart={() => { localStorage.setItem("physicalab_visited", "1"); setShowLanding(false); }} />;'
);

fs.writeFileSync('src/App.jsx', c);
console.log('Done!');