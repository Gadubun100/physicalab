const fs = require('fs');
let c = fs.readFileSync('src/App.jsx', 'utf8');

const chemSims = `
function drawAtomic(ctx, W, H, t, controls) {
  const protons = controls.protons || 6;
  const neutrons = controls.neutrons || 6;
  const cx = W / 2, cy = H / 2;
  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 20);
  grad.addColorStop(0, "#f09b79");
  grad.addColorStop(1, "#D85A30");
  ctx.beginPath(); ctx.arc(cx, cy, 20, 0, Math.PI * 2);
  ctx.fillStyle = grad; ctx.fill();
  ctx.fillStyle = "#fff"; ctx.font = "10px monospace"; ctx.textAlign = "center";
  ctx.fillText(protons + "p", cx, cy - 3);
  ctx.fillText(neutrons + "n", cx, cy + 10);
  const shells = [{ r: 60, max: 2 }, { r: 110, max: 8 }, { r: 160, max: 8 }];
  let remaining = protons;
  shells.forEach(function(shell, si) {
    const electrons = Math.min(remaining, shell.max);
    remaining -= electrons;
    if (electrons <= 0) return;
    ctx.beginPath(); ctx.arc(cx, cy, shell.r, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255,255,255,0.1)"; ctx.lineWidth = 1; ctx.stroke();
    for (let i = 0; i < electrons; i++) {
      const angle = (i / electrons) * Math.PI * 2 + t * (1 - si * 0.3);
      const ex = cx + shell.r * Math.cos(angle);
      const ey = cy + shell.r * Math.sin(angle);
      ctx.beginPath(); ctx.arc(ex, ey, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#378ADD"; ctx.fill();
    }
  });
  const elements = ["H","He","Li","Be","B","C","N","O","F","Ne","Na","Mg","Al","Si","P","S","Cl","Ar"];
  const symbol = elements[protons - 1] || "?";
  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText("Element: " + symbol + "  Z=" + protons + "  A=" + (protons+neutrons) + "  Electrons: " + protons, W/2, H-8);
  ctx.textAlign = "left";
}

function drawBonding(ctx, W, H, t, controls) {
  const z1 = controls.element1 || 11;
  const z2 = controls.element2 || 17;
  const elements = ["H","He","Li","Be","B","C","N","O","F","Ne","Na","Mg","Al","Si","P","S","Cl","Ar"];
  const sym1 = elements[z1-1] || "?";
  const sym2 = elements[z2-1] || "?";
  const outerElectrons = function(z) {
    if (z <= 2) return z;
    if (z <= 10) return z - 2;
    if (z <= 18) return z - 10;
    return z - 18;
  };
  const e1 = outerElectrons(z1), e2 = outerElectrons(z2);
  const cx1 = W * 0.3, cx2 = W * 0.7, cy = H / 2;
  const r = 50;
  [{ cx: cx1, sym: sym1, e: e1, col: "#E85D24" },
   { cx: cx2, sym: sym2, e: e2, col: "#378ADD" }].forEach(function(atom) {
    ctx.beginPath(); ctx.arc(atom.cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = atom.col; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = atom.col + "22"; ctx.fill();
    ctx.fillStyle = atom.col; ctx.font = "bold 16px monospace"; ctx.textAlign = "center";
    ctx.fillText(atom.sym, atom.cx, cy + 5);
    ctx.fillStyle = "rgba(255,255,255,0.5)"; ctx.font = "11px monospace";
    ctx.fillText(atom.e + " outer e-", atom.cx, cy + r + 18);
    for (let i = 0; i < atom.e; i++) {
      const angle = (i / Math.max(atom.e, 1)) * Math.PI * 2;
      const ex = atom.cx + (r + 12) * Math.cos(angle);
      const ey = cy + (r + 12) * Math.sin(angle);
      ctx.beginPath(); ctx.arc(ex, ey, 4, 0, Math.PI * 2);
      ctx.fillStyle = atom.col; ctx.fill();
    }
  });
  const enDiff = Math.abs(e1 - e2);
  const bondType = enDiff > 4 ? "Ionic" : enDiff > 1 ? "Polar Covalent" : "Covalent";
  const bondCol = enDiff > 4 ? "#E85D24" : enDiff > 1 ? "#F2C94C" : "#1D9E75";
  ctx.strokeStyle = bondCol; ctx.lineWidth = 3; ctx.setLineDash([6, 4]);
  ctx.beginPath(); ctx.moveTo(cx1 + r, cy); ctx.lineTo(cx2 - r, cy); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = bondCol; ctx.font = "bold 13px monospace"; ctx.textAlign = "center";
  ctx.fillText(bondType, W/2, cy - 20);
  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace";
  ctx.fillText(sym1 + "(Z=" + z1 + ")  +  " + sym2 + "(Z=" + z2 + ")  =  " + bondType, W/2, H-8);
  ctx.textAlign = "left";
}

function drawReactions(ctx, W, H, t, controls) {
  const moles = controls.moles || 2;
  const phase = (t * 0.3) % 1;
  const cx = W / 2, cy = H / 2;
  for (let i = 0; i < moles * 3; i++) {
    const startX = 80 + (i % 3) * 30;
    const startY = cy - 40 + Math.floor(i / 3) * 30;
    const endX = W - 120 + (i % 2) * 20;
    const endY = cy - 20 + Math.floor(i / 2) * 20;
    const px = startX + (endX - startX) * Math.min(phase * 2, 1);
    const py = startY + (endY - startY) * Math.min(phase * 2, 1);
    ctx.beginPath(); ctx.arc(px, py, 8, 0, Math.PI * 2);
    ctx.fillStyle = phase < 0.5 ? "#E85D24" : "#1D9E75"; ctx.fill();
  }
  ctx.strokeStyle = "rgba(255,255,255,0.3)"; ctx.lineWidth = 1; ctx.setLineDash([4,4]);
  ctx.beginPath(); ctx.moveTo(cx, 20); ctx.lineTo(cx, H - 20); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = "#E85D24"; ctx.font = "13px monospace"; ctx.textAlign = "center";
  ctx.fillText("Reactants", cx * 0.5, 30);
  ctx.fillStyle = "#1D9E75"; ctx.fillText("Products", cx * 1.5, 30);
  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace";
  ctx.fillText(moles + " mol reactant -> " + moles + " mol product | Mass conserved", W/2, H-8);
  ctx.textAlign = "left";
}

function drawThermochem(ctx, W, H, t, controls) {
  const deltaH = controls.deltaH || -200;
  const exothermic = deltaH < 0;
  const ox = 80, oy = H * 0.7, gw = W - 160, gh = H * 0.5;
  ctx.strokeStyle = "rgba(255,255,255,0.2)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(ox, oy - gh); ctx.lineTo(ox, oy); ctx.stroke();
  const reactantH = oy - gh * 0.7;
  const productH = exothermic ? oy - gh * 0.3 : oy - gh * 0.9;
  const tsH = exothermic ? oy - gh * 0.85 : oy - gh * 0.95;
  ctx.strokeStyle = "#378ADD"; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(ox, reactantH); ctx.lineTo(ox + gw * 0.25, reactantH); ctx.stroke();
  ctx.fillStyle = "#378ADD"; ctx.font = "12px monospace"; ctx.textAlign = "left";
  ctx.fillText("Reactants", ox + 4, reactantH - 8);
  ctx.strokeStyle = "#1D9E75"; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(ox + gw * 0.75, productH); ctx.lineTo(ox + gw, productH); ctx.stroke();
  ctx.fillStyle = "#1D9E75"; ctx.fillText("Products", ox + gw * 0.75 + 4, productH - 8);
  ctx.strokeStyle = "#E85D24"; ctx.lineWidth = 1.5; ctx.setLineDash([4,4]);
  ctx.beginPath();
  ctx.moveTo(ox + gw * 0.25, reactantH);
  ctx.bezierCurveTo(ox + gw*0.35, tsH, ox + gw*0.5, tsH, ox + gw*0.6, tsH);
  ctx.bezierCurveTo(ox + gw*0.65, tsH, ox + gw*0.7, productH, ox + gw*0.75, productH);
  ctx.stroke(); ctx.setLineDash([]);
  if (Math.abs(productH - reactantH) > 5) {
    ctx.strokeStyle = exothermic ? "#E85D24" : "#1D9E75"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(ox + gw*0.85, reactantH); ctx.lineTo(ox + gw*0.85, productH); ctx.stroke();
    ctx.fillStyle = exothermic ? "#E85D24" : "#1D9E75"; ctx.textAlign = "center";
    ctx.fillText("dH=" + deltaH + "kJ", ox + gw*0.85 + 35, (reactantH + productH)/2);
  }
  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText((exothermic ? "Exothermic" : "Endothermic") + "  dH=" + deltaH + " kJ/mol", W/2, H-8);
  ctx.textAlign = "left";
}

function drawKinetics(ctx, W, H, t, controls) {
  const temp = controls.temperature || 50;
  const conc = controls.concentration || 5;
  const rate = (conc * 0.1) * Math.exp((temp - 20) * 0.07);
  const speed = temp / 30;
  const particleCount = Math.floor(conc * 3);
  ctx.strokeStyle = "rgba(255,255,255,0.15)"; ctx.lineWidth = 1;
  ctx.strokeRect(40, 40, W - 80, H - 80);
  for (let i = 0; i < particleCount; i++) {
    const px = 40 + ((Math.sin(t * speed + i * 1.3) + 1) / 2) * (W - 80);
    const py = 40 + ((Math.cos(t * speed * 0.7 + i * 2.1) + 1) / 2) * (H - 80);
    ctx.beginPath(); ctx.arc(px, py, 8, 0, Math.PI * 2);
    ctx.fillStyle = i % 3 === 0 ? "#378ADD" : "#E85D24"; ctx.fill();
    ctx.fillStyle = "#fff"; ctx.font = "9px monospace"; ctx.textAlign = "center";
    ctx.fillText(i % 3 === 0 ? "B" : "A", px, py + 3);
  }
  const rateBarH = Math.min(rate * 20, H * 0.6);
  ctx.fillStyle = "#1D9E75";
  ctx.fillRect(W - 35, H - 45 - rateBarH, 20, rateBarH);
  ctx.fillStyle = "rgba(255,255,255,0.3)"; ctx.font = "10px monospace"; ctx.textAlign = "center";
  ctx.fillText("rate", W - 25, H - 30);
  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace";
  ctx.fillText("T=" + temp + "C  conc=" + conc + "mol/L  rate=" + rate.toFixed(3) + "mol/L/s", W/2, H-8);
  ctx.textAlign = "left";
}
`;

const algStart = c.indexOf('function drawAlgebra');
c = c.substring(0, algStart) + chemSims + '\n' + c.substring(algStart);
fs.writeFileSync('src/App.jsx', c);
console.log('Chemistry simulations added cleanly!');