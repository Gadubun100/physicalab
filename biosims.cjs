const code = `
function drawCells(ctx, W, H, t, controls) {
  const divisions = controls.divisions || 3;
  const numCells = Math.pow(2, divisions);
  const cx = W / 2, cy = H / 2;

  const cols = Math.ceil(Math.sqrt(numCells));
  const rows = Math.ceil(numCells / cols);
  const cellW = Math.min((W - 80) / cols, 80);
  const cellH = Math.min((H - 80) / rows, 60);
  const startX = cx - (cols * cellW) / 2;
  const startY = cy - (rows * cellH) / 2;

  for (let i = 0; i < numCells; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = startX + col * cellW + cellW / 2;
    const y = startY + row * cellH + cellH / 2;
    const r = Math.min(cellW, cellH) * 0.35;

    // Cell membrane
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, "rgba(39,174,96,0.3)");
    grad.addColorStop(1, "rgba(39,174,96,0.05)");
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = grad; ctx.fill();
    ctx.strokeStyle = "#27AE60"; ctx.lineWidth = 1.5; ctx.stroke();

    // Nucleus
    ctx.beginPath(); ctx.arc(x, y, r * 0.35, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(39,174,96,0.5)"; ctx.fill();
    ctx.strokeStyle = "#1D8348"; ctx.lineWidth = 1; ctx.stroke();

    // Division animation
    if (i === numCells - 1 && numCells < 64) {
      const pulse = Math.sin(t * 3) * 0.1 + 1;
      ctx.beginPath(); ctx.arc(x, y, r * pulse, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(39,174,96,0.4)"; ctx.lineWidth = 1; ctx.stroke();
    }
  }

  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText("Divisions: " + divisions + "  |  Cells: " + numCells + "  |  2^" + divisions + " = " + numCells, W/2, H - 10);
  ctx.textAlign = "left";
}

function drawGenetics(ctx, W, H, t, controls) {
  const cx = W / 2, cy = H / 2;

  // DNA double helix
  const helixX = 80, helixW = 120;
  for (let i = 0; i < 40; i++) {
    const y = 30 + i * (H - 60) / 40;
    const angle = i * 0.4 + t * 0.5;
    const x1 = helixX + Math.sin(angle) * 30;
    const x2 = helixX + Math.sin(angle + Math.PI) * 30;

    ctx.beginPath(); ctx.arc(x1, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = i % 4 < 2 ? "#E85D24" : "#378ADD"; ctx.fill();

    ctx.beginPath(); ctx.arc(x2, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = i % 4 < 2 ? "#1D9E75" : "#F2C94C"; ctx.fill();

    if (i % 4 === 0) {
      ctx.strokeStyle = "rgba(255,255,255,0.2)"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2, y); ctx.stroke();
    }
  }
  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "10px monospace"; ctx.textAlign = "center";
  ctx.fillText("DNA", helixX, H - 10);

  // Punnett square
  const px = cx, py = 40, ps = 60;
  ctx.strokeStyle = "rgba(255,255,255,0.3)"; ctx.lineWidth = 1.5;
  for (let i = 0; i <= 2; i++) {
    ctx.beginPath(); ctx.moveTo(px + i * ps, py); ctx.lineTo(px + i * ps, py + ps * 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(px, py + i * ps); ctx.lineTo(px + ps * 2, py + i * ps); ctx.stroke();
  }

  const alleles = [["TT", "#1D9E75"], ["Tt", "#378ADD"], ["Tt", "#378ADD"], ["tt", "#E85D24"]];
  alleles.forEach(function(a, i) {
    const col = i % 2, row = Math.floor(i / 2);
    ctx.fillStyle = a[1]; ctx.font = "bold 14px monospace"; ctx.textAlign = "center";
    ctx.fillText(a[0], px + col * ps + ps/2, py + row * ps + ps/2 + 5);
  });

  ctx.fillStyle = "rgba(255,255,255,0.5)"; ctx.font = "11px monospace";
  ctx.fillText("T", px + ps * 0.5, py - 8); ctx.fillText("t", px + ps * 1.5, py - 8);
  ctx.fillText("T", px - 15, py + ps * 0.5 + 5); ctx.fillText("t", px - 15, py + ps * 1.5 + 5);

  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace";
  ctx.fillText("Tt x Tt: 25% TT  50% Tt  25% tt", W/2 + 40, py + ps * 2 + 20);

  // Base pair legend
  const lx = W - 140, ly = 40;
  [["A-T", "#E85D24"], ["G-C", "#378ADD"], ["Dominant", "#1D9E75"], ["Recessive", "#E85D24"]].forEach(function(l, i) {
    ctx.fillStyle = l[1]; ctx.font = "11px monospace"; ctx.textAlign = "left";
    ctx.fillText(l[0], lx, ly + i * 20);
  });

  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText("DNA bases: A-T, G-C  |  Punnett square shows offspring ratios", W/2, H - 10);
  ctx.textAlign = "left";
}

function drawEvolution(ctx, W, H, t, controls) {
  const generations = controls.generations || 5;
  const selection = controls.selection || 5;
  const cx = W / 2, cy = H / 2;

  let greenPct = 0.8;
  const history = [greenPct];
  for (let g = 0; g < generations; g++) {
    const greenSurvival = 1 - (selection * 0.02);
    const brownSurvival = 1 - (selection * 0.08);
    const newGreen = greenPct * greenSurvival;
    const newBrown = (1 - greenPct) * brownSurvival;
    greenPct = newGreen / (newGreen + newBrown);
    history.push(greenPct);
  }

  // Population bar chart
  const barW = Math.min((W - 100) / (generations + 1), 60);
  const maxH = H - 100;

  history.forEach(function(pct, i) {
    const x = 50 + i * barW;
    const greenH = pct * maxH;
    const brownH = (1 - pct) * maxH;

    ctx.fillStyle = "#1D9E75";
    ctx.fillRect(x, H - 50 - greenH, barW - 4, greenH);
    ctx.fillStyle = "#BA7517";
    ctx.fillRect(x, H - 50 - greenH - brownH, barW - 4, brownH);

    ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "9px monospace"; ctx.textAlign = "center";
    ctx.fillText("G" + i, x + barW/2 - 2, H - 35);
  });

  // Legend
  ctx.fillStyle = "#1D9E75"; ctx.fillRect(W - 120, 40, 14, 14);
  ctx.fillStyle = "rgba(255,255,255,0.6)"; ctx.font = "11px monospace"; ctx.textAlign = "left";
  ctx.fillText("Green (fit)", W - 100, 52);
  ctx.fillStyle = "#BA7517"; ctx.fillRect(W - 120, 62, 14, 14);
  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.fillText("Brown (less fit)", W - 100, 74);

  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText("Natural selection: green " + (history[history.length-1] * 100).toFixed(0) + "% after " + generations + " generations", W/2, H - 10);
  ctx.textAlign = "left";
}

function drawPhysiology(ctx, W, H, t, controls) {
  const heartRate = controls.heartrate || 72;
  const cx = W / 2, cy = H / 2;
  const beatPhase = (t * heartRate / 60) % 1;
  const heartSize = 40 + Math.sin(beatPhase * Math.PI * 2) * 8;

  // Heart
  ctx.fillStyle = "#E85D24";
  ctx.beginPath();
  ctx.arc(cx - heartSize/3, cy - heartSize/4, heartSize/2.5, Math.PI, 0);
  ctx.arc(cx + heartSize/3, cy - heartSize/4, heartSize/2.5, Math.PI, 0);
  ctx.lineTo(cx, cy + heartSize * 0.7);
  ctx.fill();

  // Blood flow circles
  for (let i = 0; i < 5; i++) {
    const phase = ((t * heartRate / 60) + i / 5) % 1;
    const angle = phase * Math.PI * 2 - Math.PI/2;
    const r = 80;
    const bx = cx + Math.cos(angle) * r;
    const by = cy + Math.sin(angle) * r;
    ctx.beginPath(); ctx.arc(bx, by, 6, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(232,93,36,0.8)"; ctx.fill();
  }

  // Arteries/veins
  ctx.strokeStyle = "rgba(232,93,36,0.3)"; ctx.lineWidth = 8;
  ctx.beginPath(); ctx.arc(cx, cy, 80, 0, Math.PI * 2); ctx.stroke();
  ctx.strokeStyle = "rgba(59,139,212,0.3)"; ctx.lineWidth = 6;
  ctx.beginPath(); ctx.arc(cx, cy, 95, 0, Math.PI * 2); ctx.stroke();

  // Heart rate display
  ctx.fillStyle = "#E85D24"; ctx.font = "bold 18px monospace"; ctx.textAlign = "center";
  ctx.fillText(heartRate + " bpm", cx, cy + heartSize + 30);

  // ECG line
  const ecgY = H - 50;
  ctx.strokeStyle = "#1D9E75"; ctx.lineWidth = 2;
  ctx.beginPath();
  for (let x = 40; x < W - 40; x++) {
    const xn = (x - 40) / (W - 80);
    const phase2 = (xn * 3 + t * heartRate / 60) % 1;
    let y = ecgY;
    if (phase2 < 0.1) y -= 5;
    else if (phase2 < 0.15) y -= 30;
    else if (phase2 < 0.2) y -= 5;
    else if (phase2 < 0.25) y += 10;
    else if (phase2 < 0.3) y -= 5;
    x === 40 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.stroke();

  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText("CO = " + heartRate + " x 70 = " + (heartRate * 70) + " ml/min = " + (heartRate * 70 / 1000).toFixed(1) + " L/min", W/2, H - 8);
  ctx.textAlign = "left";
}

function drawEcology(ctx, W, H, t, controls) {
  const producers = controls.producers || 500;
  const consumers = controls.consumers || 50;
  const cx = W / 2;

  // Energy pyramid
  const levels = [
    { label: "Producers", energy: producers * 10, color: "#1D9E75", y: H - 60 },
    { label: "Primary consumers", energy: producers, color: "#F2C94C", y: H - 110 },
    { label: "Secondary consumers", energy: producers * 0.1, color: "#E85D24", y: H - 160 },
    { label: "Tertiary consumers", energy: producers * 0.01, color: "#7F77DD", y: H - 210 },
  ];

  levels.forEach(function(level, i) {
    const width = Math.max(20, (level.energy / (producers * 10)) * (W - 100));
    ctx.fillStyle = level.color;
    ctx.fillRect(cx - width/2, level.y, width, 40);
    ctx.fillStyle = "rgba(255,255,255,0.8)"; ctx.font = "11px monospace"; ctx.textAlign = "center";
    ctx.fillText(level.label, cx, level.y + 24);
    ctx.fillStyle = "rgba(255,255,255,0.5)"; ctx.font = "10px monospace";
    ctx.fillText(level.energy.toFixed(0) + " kJ", cx + width/2 + 30, level.y + 24);
  });

  // 10% rule arrow
  ctx.strokeStyle = "rgba(255,255,255,0.2)"; ctx.lineWidth = 1; ctx.setLineDash([3,3]);
  ctx.beginPath(); ctx.moveTo(cx + 160, H - 60); ctx.lineTo(cx + 160, H - 210); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "10px monospace"; ctx.textAlign = "left";
  ctx.fillText("10% rule", cx + 165, H - 130);

  // Predator-prey cycle
  const pphase = t * 0.3;
  const predX = W - 120, predY = 50;
  const preyCurve = Math.sin(pphase) * 20 + 40;
  const predCurve = Math.sin(pphase - 1) * 15 + 30;
  ctx.fillStyle = "#1D9E75"; ctx.font = "10px monospace"; ctx.textAlign = "center";
  ctx.fillText("Prey: " + (preyCurve * 10).toFixed(0), predX, predY + 20);
  ctx.fillStyle = "#E85D24";
  ctx.fillText("Predator: " + (predCurve * 5).toFixed(0), predX, predY + 40);

  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText("Energy pyramid  |  10% transfers between levels", W/2, H - 10);
  ctx.textAlign = "left";
}
`;

module.exports = code;