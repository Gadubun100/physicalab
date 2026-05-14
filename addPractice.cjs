const fs = require('fs');
const c = fs.readFileSync('src/App.jsx', 'utf8');
console.log('mobile.css:', c.includes('mobile.css'));
console.log('app-container:', c.includes('app-container'));
console.log('app-sidebar:', c.includes('className="app-sidebar"'));
console.log('app-main:', c.includes('app-main'));
console.log('app-header:', c.includes('app-header'));
console.log('app-step-tabs:', c.includes('app-step-tabs'));
console.log('app-sidebar-modules:', c.includes('app-sidebar-modules'));