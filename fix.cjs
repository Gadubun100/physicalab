const fs = require('fs');
let c = fs.readFileSync('src/App.jsx', 'utf8');

const engineeringSimulations = `
function drawCircuits(ctx, W, H, t, controls) {
  const voltage = controls.voltage || 12, resistance = controls.resistance || 6;
  const current = voltage / resistance;
  const cx = W / 2, cy = H / 2;
  const nodes = [
    { x: cx - 160, y: cy - 80 },
    { x: cx + 160, y: cy - 80 },
    { x: cx + 160, y: cy + 80 },
    { x: cx - 160, y: cy + 80 },
  ];
  ctx.strokeStyle = "#F2C94C"; ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(nodes[0].x, nodes[0].y);
  ctx.lineTo(nodes[1].x, nodes[1].y);
  ctx.lineTo(nodes[2].x, nodes[2].y);
  ctx.lineTo(nodes[3].x, nodes[3].y);
  ctx.lineTo(nodes[0].x, nodes[0].y);
  ctx.stroke();
  const electronCount = 8;
  for (let i = 0; i < electronCount; i++) {
    const phase = ((t * current * 0.3) + i / electronCount) % 1;
    let ex, ey;
    if (phase < 0.25) { ex = nodes[0].x + (nodes[1].x - nodes[0].x) * (phase / 0.25); ey = nodes[0].y; }
    else if (phase < 0.5) { ex = nodes[1].x; ey = nodes[1].y + (nodes[2].y - nodes[1].y) * ((phase - 0.25) / 0.25); }
    else if (phase < 0.75) { ex = nodes[2].x + (nodes[3].x - nodes[2].x) * ((phase - 0.5) / 0.25); ey = nodes[2].y; }
    else { ex = nodes[3].x; ey = nodes[3].y + (nodes[0].y - nodes[3].y) * ((phase - 0.75) / 0.25); }
    ctx.beginPath(); ctx.arc(ex, ey, 5, 0, Math.PI * 2);
    ctx.fillStyle = "#378ADD"; ctx.fill();
  }
  ctx.fillStyle = "#E85D24"; ctx.font = "bold 14px monospace"; ctx.textAlign = "center";
  ctx.fillText(voltage + "V", nodes[3].x, cy);
  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace";
  ctx.fillText("V=" + voltage + "V  R=" + resistance + "ohm  I=" + current.toFixed(2) + "A  P=" + (voltage*current).toFixed(1) + "W", W/2, H-8);
  ctx.textAlign = "left";
}

function drawStructures(ctx, W, H, t, controls) {
  const load = controls.load || 500;
  const pos = (controls.position || 25) / 100;
  const beamL = W - 120, beamX = 60, beamY = H / 2;
  const loadX = beamX + pos * beamL;
  const R1 = load * (1 - pos), R2 = load * pos;
  ctx.fillStyle = "rgba(255,255,255,0.15)";
  ctx.fillRect(beamX, beamY - 8, beamL, 16);
  ctx.strokeStyle = "rgba(255,255,255,0.4)"; ctx.lineWidth = 1;
  ctx.strokeRect(beamX, beamY - 8, beamL, 16);
  const deflection = (load * pos * (1 - pos) * beamL * 0.0001);
  ctx.beginPath(); ctx.strokeStyle = "#E85D24"; ctx.lineWidth = 2; ctx.setLineDash([4, 4]);
  for (let i = 0; i <= 100; i++) {
    const x = beamX + (i / 100) * beamL;
    const xn = i / 100;
    const def = deflection * Math.sin(xn * Math.PI) * 30;
    i === 0 ? ctx.moveTo(x, beamY + def) : ctx.lineTo(x, beamY + def);
  }
  ctx.stroke(); ctx.setLineDash([]);
  ctx.strokeStyle = "#E85D24"; ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.moveTo(loadX, beamY - 60); ctx.lineTo(loadX, beamY - 10); ctx.stroke();
  ctx.fillStyle = "#E85D24"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText(load + "N", loadX, beamY - 65);
  ctx.fillStyle = "#1D9E75"; ctx.fillText("R1=" + R1.toFixed(0) + "N", beamX, beamY + 65);
  ctx.fillStyle = "#378ADD"; ctx.fillText("R2=" + R2.toFixed(0) + "N", beamX + beamL, beamY + 65);
  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace";
  ctx.fillText("Load=" + load + "N at " + (pos*100).toFixed(0) + "% | R1=" + R1.toFixed(0) + "N | R2=" + R2.toFixed(0) + "N", W/2, H-8);
  ctx.textAlign = "left";
}

function drawFluid(ctx, W, H, t, controls) {
  const a1 = controls.area1 || 10, v1 = controls.velocity1 || 2;
  const a2 = a1 / 2;
  const v2 = (a1 * v1) / a2;
  const pipe1W = a1 * 4, pipe2W = a2 * 4;
  const pipeY = H / 2;
  const transX = W * 0.45;
  ctx.fillStyle = "rgba(59,139,212,0.15)";
  ctx.fillRect(40, pipeY - pipe1W/2, transX - 40, pipe1W);
  ctx.fillRect(transX, pipeY - pipe2W/2, W - transX - 40, pipe2W);
  ctx.strokeStyle = "rgba(255,255,255,0.3)"; ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(40, pipeY - pipe1W/2);
  ctx.lineTo(transX, pipeY - pipe1W/2);
  ctx.lineTo(transX, pipeY - pipe2W/2);
  ctx.lineTo(W - 40, pipeY - pipe2W/2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(40, pipeY + pipe1W/2);
  ctx.lineTo(transX, pipeY + pipe1W/2);
  ctx.lineTo(transX, pipeY + pipe2W/2);
  ctx.lineTo(W - 40, pipeY + pipe2W/2);
  ctx.stroke();
  const particleCount = 10;
  for (let i = 0; i < particleCount; i++) {
    const phase = ((t * v1 * 0.15) + i / particleCount) % 1;
    let px, py;
    if (phase < 0.5) {
      px = 40 + phase * 2 * (transX - 40);
      py = pipeY + (Math.sin(i * 2.1) * pipe1W * 0.3);
    } else {
      px = transX + (phase - 0.5) * 2 * (W - 40 - transX);
      py = pipeY + (Math.sin(i * 2.1) * pipe2W * 0.3);
    }
    ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(59,139,212,0.8)"; ctx.fill();
  }
  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText("A1=" + a1 + "cm2  v1=" + v1 + "m/s  ->  A2=" + a2 + "cm2  v2=" + v2.toFixed(1) + "m/s", W/2, H-8);
  ctx.textAlign = "left";
}

function drawThermoCycles(ctx, W, H, t, controls) {
  const heatIn = controls.heat_in || 1000;
  const eff = (controls.efficiency || 40) / 100;
  const work = heatIn * eff;
  const heatOut = heatIn - work;
  const ox = 60, oy = H - 50, gw = W * 0.45, gh = H - 90;
  ctx.strokeStyle = "rgba(255,255,255,0.1)"; ctx.lineWidth = 0.5;
  for (let i = 0; i <= 4; i++) {
    ctx.beginPath(); ctx.moveTo(ox + i * gw/4, oy - gh); ctx.lineTo(ox + i * gw/4, oy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(ox, oy - i * gh/4); ctx.lineTo(ox + gw, oy - i * gh/4); ctx.stroke();
  }
  ctx.strokeStyle = "rgba(255,255,255,0.3)"; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(ox, oy - gh); ctx.lineTo(ox, oy); ctx.lineTo(ox + gw, oy); ctx.stroke();
  const pts = [
    { x: ox + gw*0.1, y: oy - gh*0.2 },
    { x: ox + gw*0.2, y: oy - gh*0.7 },
    { x: ox + gw*0.7, y: oy - gh*0.8 },
    { x: ox + gw*0.8, y: oy - gh*0.25 },
    { x: ox + gw*0.1, y: oy - gh*0.2 },
  ];
  ctx.beginPath(); ctx.strokeStyle = "#E85D24"; ctx.lineWidth = 2.5;
  ctx.moveTo(pts[0].x, pts[0].y);
  pts.forEach(function(p) { ctx.lineTo(p.x, p.y); });
  ctx.stroke();
  ctx.fillStyle = "rgba(232,93,36,0.1)";
  ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y);
  pts.forEach(function(p) { ctx.lineTo(p.x, p.y); });
  ctx.fill();
  const animPt = Math.floor(t * 2) % 4;
  ctx.beginPath(); ctx.arc(pts[animPt].x, pts[animPt].y, 8, 0, Math.PI * 2);
  ctx.fillStyle = "#E85D24"; ctx.fill();
  const bx = W * 0.6, by = H * 0.15;
  ctx.fillStyle = "#E85D24"; ctx.font = "12px monospace"; ctx.textAlign = "left";
  ctx.fillText("Q_in = " + heatIn + "J", bx, by);
  ctx.fillStyle = "#1D9E75"; ctx.fillText("W = " + work.toFixed(0) + "J", bx, by + 24);
  ctx.fillStyle = "#378ADD"; ctx.fillText("Q_out = " + heatOut.toFixed(0) + "J", bx, by + 48);
  ctx.fillStyle = "#F2C94C"; ctx.fillText("eff = " + (eff*100).toFixed(0) + "%", bx, by + 72);
  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText("Heat in: " + heatIn + "J  Work: " + work.toFixed(0) + "J  Efficiency: " + (eff*100).toFixed(0) + "%", W/2, H-8);
  ctx.textAlign = "left";
}

function drawSignals(ctx, W, H, t, controls) {
  const f1 = controls.freq1 || 2, f2 = controls.freq2 || 5;
  const pad = 50, A = 35;
  const rows = [
    { y: H * 0.22, f: f1, col: "#E85D24", lbl: "Signal 1 (" + f1 + "Hz)" },
    { y: H * 0.52, f: f2, col: "#378ADD", lbl: "Signal 2 (" + f2 + "Hz)" },
    { y: H * 0.82, f: null, col: "#1D9E75", lbl: "Combined signal" },
  ];
  rows.forEach(function(row) {
    ctx.strokeStyle = "rgba(255,255,255,0.06)"; ctx.lineWidth = 0.5;
    ctx.beginPath(); ctx.moveTo(pad, row.y); ctx.lineTo(W - pad, row.y); ctx.stroke();
    ctx.beginPath(); ctx.strokeStyle = row.col; ctx.lineWidth = 2;
    for (let x = pad; x < W - pad; x++) {
      const xn = (x - pad) / (W - 2*pad);
      const y = row.f
        ? row.y + A * Math.sin(2 * Math.PI * row.f * xn - t * row.f * 1.5)
        : row.y + (A * 0.6) * (Math.sin(2 * Math.PI * f1 * xn - t * f1 * 1.5) + Math.sin(2 * Math.PI * f2 * xn - t * f2 * 1.5));
      x === pad ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.fillStyle = row.col; ctx.font = "10px monospace";
    ctx.fillText(row.lbl, pad + 4, row.y - A - 4);
  });
  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText("Signal 1: " + f1 + "Hz  +  Signal 2: " + f2 + "Hz  =  Combined", W/2, H-8);
  ctx.textAlign = "left";
}
`;

const algStart = c.indexOf('function drawAlgebra');
c = c.substring(0, algStart) + engineeringSimulations + '\n' + c.substring(algStart);
fs.writeFileSync('src/App.jsx', c);
console.log('Done! Engineering simulations added.');