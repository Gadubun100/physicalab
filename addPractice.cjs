const fs = require('fs');
let c = fs.readFileSync('src/App.jsx', 'utf8');
const relSims = require('./relsims.cjs');
const nucSims = require('./nucsims.cjs');

// Add relativity sims before drawNuclear
const insertBefore = 'function drawNuclear(';
const idx = c.indexOf(insertBefore);
c = c.substring(0, idx) + relSims + '\n' + nucSims + '\n' + c.substring(idx);

// Add relativity routing
const oldRelRouting = 'else if (simKey === "relativity") drawRelativity(ctx, W, H, t, controls);';
const newRelRouting = oldRelRouting + '\n      else if (simKey === "timedilation") drawTimedilation(ctx, W, H, t, controls);\n      else if (simKey === "lengthcontraction") drawLengthcontraction(ctx, W, H, t, controls);\n      else if (simKey === "emc2") drawEmc2(ctx, W, H, t, controls);\n      else if (simKey === "spacetime") drawSpacetime(ctx, W, H, t, controls);\n      else if (simKey === "lorentz") drawLorentz(ctx, W, H, t, controls);';
c = c.replace(oldRelRouting, newRelRouting);

// Add nuclear routing
const oldNucRouting = 'else if (simKey === "nuclear") drawNuclear(ctx, W, H, t, controls);';
const newNucRouting = oldNucRouting + '\n      else if (simKey === "decay") drawDecay(ctx, W, H, t, controls);\n      else if (simKey === "halflife") drawHalflife(ctx, W, H, t, controls);\n      else if (simKey === "fission") drawFission(ctx, W, H, t, controls);\n      else if (simKey === "fusion") drawFusion(ctx, W, H, t, controls);\n      else if (simKey === "binding") drawBinding(ctx, W, H, t, controls);';
c = c.replace(oldNucRouting, newNucRouting);

fs.writeFileSync('src/App.jsx', c);
console.log('Relativity and Nuclear sims added!');
console.log('drawTimedilation:', c.includes('function drawTimedilation'));
console.log('drawFission:', c.includes('function drawFission'));
console.log('timedilation routing:', c.includes('drawTimedilation(ctx'));
console.log('fission routing:', c.includes('drawFission(ctx'));