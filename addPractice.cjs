const fs = require('fs');
let c = fs.readFileSync('src/App.jsx', 'utf8');

const routing = '\n      else if (simKey === "cells") drawCells(ctx, W, H, t, controls);\n      else if (simKey === "genetics") drawGenetics(ctx, W, H, t, controls);\n      else if (simKey === "evolution") drawEvolution(ctx, W, H, t, controls);\n      else if (simKey === "physiology") drawPhysiology(ctx, W, H, t, controls);\n      else if (simKey === "ecology") drawEcology(ctx, W, H, t, controls);';

c = c.replace(
  'else if (simKey === "graphs") drawGraphs(ctx, W, H, t, controls);',
  'else if (simKey === "graphs") drawGraphs(ctx, W, H, t, controls);' + routing
);

fs.writeFileSync('src/App.jsx', c);
console.log('Routing added!');
console.log('cells routing:', c.includes('simKey === "cells"'));