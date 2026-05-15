const code = `
function drawHeat(ctx, W, H, t, controls) {
  const temp = controls.temp || 200;
  const cx = W / 2, cy = H / 2;

  // Three sections: hot, medium, cold
  const sectionW = (W - 80) / 3;

  const sections = [
    { x: 40, color1: "rgba(232,93,36,0.8)", color2: "rgba(232,93,36,0.1)", label: "Hot", temp: temp },
    { x: 40 + sectionW, color1: "rgba(242,201,76,0.6)", color2: "rgba(242,201,76,0.1)", label: "Medium", temp: temp * 0.6 },
    { x: 40 + sectionW * 2, color1: "rgba(59,139,212,0.8)", color2: "rgba(59,139,212,0.1)", label: "Cold", temp: temp * 0.2 },
  ];

  sections.forEach(function(s) {
    const grad = ctx.createLinearGradient(s.x, 0, s.x + sectionW, 0);
    grad.addColorStop(0, s.color1);
    grad.addColorStop(1, s.color2);
    ctx.fillStyle = grad;
    ctx.fillRect(s.x, 40, sectionW, H - 80);
    ctx.strokeStyle = "rgba(255,255,255,0.1)"; ctx.lineWidth = 1;
    ctx.strokeRect(s.x, 40, sectionW, H - 80);
    ctx.fillStyle = "rgba(255,255,255,0.6)"; ctx.font = "12px monospace"; ctx.textAlign = "center";
    ctx.fillText(s.label, s.x + sectionW/2, cy);
    ctx.fillText(s.temp.toFixed(0) + "K", s.x + sectionW/2, cy + 20);
  });

  // Heat flow arrows
  const arrowPhase = (t * 0.5) % 1;
  const arrowX = 40 + sectionW + arrowPhase * sectionW;
  ctx.strokeStyle = "#E85D24"; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(arrowX - 10, cy - 40); ctx.lineTo(arrowX + 10, cy - 40); ctx.stroke();
  ctx.fillStyle = "#E85D24";
  ctx.beginPath(); ctx.moveTo(arrowX + 18, cy - 40); ctx.lineTo(arrowX + 8, cy - 46); ctx.lineTo(arrowX + 8, cy - 34); ctx.fill();

  // Radiation waves from hot section
  for (let i = 0; i < 3; i++) {
    const wavePhase = ((t * 1.5) + i / 3) % 1;
    const wr = wavePhase * 60;
    const wx = 40 + sectionW / 2;
    ctx.beginPath(); ctx.arc(wx, cy, wr, -Math.PI/2, Math.PI/2);
    ctx.strokeStyle = "rgba(232,93,36," + (1 - wavePhase) * 0.5 + ")";
    ctx.lineWidth = 1.5; ctx.stroke();
  }

  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText("Heat flows from hot to cold  |  Q = mcDeltaT", W/2, H - 10);
  ctx.textAlign = "left";
}

function drawEntropy(ctx, W, H, t, controls) {
  const cx = W / 2, cy = H / 2;
  const phase = Math.min(1, (t % 8) / 4);

  // Left side - ordered
  ctx.strokeStyle = "rgba(255,255,255,0.2)"; ctx.lineWidth = 1;
  ctx.strokeRect(40, 40, cx - 60, H - 80);
  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText("Low Entropy", (40 + cx - 60) / 2, 35);

  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      const ox = 70 + col * 35;
      const oy = 70 + row * 35;
      const dx = phase * (Math.sin(row * 3 + col * 7) * 60);
      const dy = phase * (Math.cos(row * 5 + col * 3) * 40);
      ctx.beginPath(); ctx.arc(ox + dx, oy + dy, 8, 0, Math.PI * 2);
      ctx.fillStyle = phase < 0.5 ? "#378ADD" : "#E85D24";
      ctx.fill();
    }
  }

  // Right side - disordered
  ctx.strokeStyle = "rgba(255,255,255,0.2)"; ctx.lineWidth = 1;
  ctx.strokeRect(cx + 20, 40, cx - 60, H - 80);
  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText("High Entropy", cx + 20 + (cx - 60) / 2, 35);

  for (let i = 0; i < 16; i++) {
    const ox = cx + 40 + Math.sin(i * 2.3 + 1) * 80;
    const oy = cy + Math.cos(i * 1.7 + 2) * 60;
    ctx.beginPath(); ctx.arc(ox, oy, 8, 0, Math.PI * 2);
    ctx.fillStyle = i % 2 === 0 ? "#378ADD" : "#E85D24";
    ctx.fill();
  }

  // Arrow
  ctx.strokeStyle = "#1D9E75"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(cx - 50, cy); ctx.lineTo(cx + 10, cy); ctx.stroke();
  ctx.fillStyle = "#1D9E75";
  ctx.beginPath(); ctx.moveTo(cx + 18, cy); ctx.lineTo(cx + 8, cy - 5); ctx.lineTo(cx + 8, cy + 5); ctx.fill();
  ctx.fillStyle = "#1D9E75"; ctx.font = "10px monospace"; ctx.textAlign = "center";
  ctx.fillText("spontaneous", cx - 20, cy - 10);

  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace";
  ctx.fillText("Entropy always increases  |  DeltaS >= 0", W/2, H - 10);
  ctx.textAlign = "left";
}

function drawCarnot(ctx, W, H, t, controls) {
  const hotTemp = controls.temp || 500;
  const coldTemp = 300;
  const efficiency = 1 - coldTemp / hotTemp;
  const ox = 80, oy = H - 50, gw = W - 160, gh = H - 90;

  ctx.strokeStyle = "rgba(255,255,255,0.08)"; ctx.lineWidth = 0.5;
  for (let i = 0; i <= 4; i++) {
    ctx.beginPath(); ctx.moveTo(ox + i * gw/4, oy - gh); ctx.lineTo(ox + i * gw/4, oy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(ox, oy - i * gh/4); ctx.lineTo(ox + gw, oy - i * gh/4); ctx.stroke();
  }

  ctx.strokeStyle = "rgba(255,255,255,0.3)"; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(ox, oy - gh); ctx.lineTo(ox, oy); ctx.lineTo(ox + gw, oy); ctx.stroke();

  // Carnot cycle - rectangle on PV diagram
  const x1 = ox + gw * 0.15, x2 = ox + gw * 0.75;
  const y1 = oy - gh * 0.75, y2 = oy - gh * 0.25;

  // Isothermal expansion (top)
  ctx.beginPath(); ctx.strokeStyle = "#E85D24"; ctx.lineWidth = 2.5;
  ctx.moveTo(x1, y1); ctx.lineTo(x2, y1); ctx.stroke();

  // Adiabatic expansion (right)
  ctx.beginPath(); ctx.strokeStyle = "#F2C94C"; ctx.lineWidth = 2.5;
  ctx.moveTo(x2, y1); ctx.lineTo(x2, y2); ctx.stroke();

  // Isothermal compression (bottom)
  ctx.beginPath(); ctx.strokeStyle = "#378ADD"; ctx.lineWidth = 2.5;
  ctx.moveTo(x2, y2); ctx.lineTo(x1, y2); ctx.stroke();

  // Adiabatic compression (left)
  ctx.beginPath(); ctx.strokeStyle = "#1D9E75"; ctx.lineWidth = 2.5;
  ctx.moveTo(x1, y2); ctx.lineTo(x1, y1); ctx.stroke();

  // Fill cycle area
  ctx.fillStyle = "rgba(242,201,76,0.08)";
  ctx.fillRect(x1, y1, x2 - x1, y2 - y1);

  // Animated dot
  const cyclePhase = (t * 0.4) % 1;
  let dotX, dotY;
  if (cyclePhase < 0.25) { dotX = x1 + (x2-x1) * (cyclePhase/0.25); dotY = y1; }
  else if (cyclePhase < 0.5) { dotX = x2; dotY = y1 + (y2-y1) * ((cyclePhase-0.25)/0.25); }
  else if (cyclePhase < 0.75) { dotX = x2 - (x2-x1) * ((cyclePhase-0.5)/0.25); dotY = y2; }
  else { dotX = x1; dotY = y2 - (y2-y1) * ((cyclePhase-0.75)/0.25); }
  ctx.beginPath(); ctx.arc(dotX, dotY, 7, 0, Math.PI * 2);
  ctx.fillStyle = "#fff"; ctx.fill();

  // Labels
  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "10px monospace"; ctx.textAlign = "left";
  ctx.fillText("P", ox - 14, oy - gh + 10);
  ctx.textAlign = "center"; ctx.fillText("V", ox + gw + 10, oy);
  ctx.fillStyle = "#E85D24"; ctx.fillText("Th=" + hotTemp + "K", x1 + (x2-x1)/2, y1 - 8);
  ctx.fillStyle = "#378ADD"; ctx.fillText("Tc=" + coldTemp + "K", x1 + (x2-x1)/2, y2 + 14);

  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace";
  ctx.fillText("Carnot efficiency = " + (efficiency * 100).toFixed(1) + "%  |  eta = 1 - Tc/Th", W/2, H - 10);
  ctx.textAlign = "left";
}

function drawIdealgas(ctx, W, H, t, controls) {
  const temp = controls.temp || 200;
  const cx = W / 2, cy = H / 2;

  // Show 3 graphs: P vs V, P vs T, V vs T
  const graphs = [
    { ox: 50, label: "P vs V (const T)", xLabel: "V", yLabel: "P", curve: function(x) { return 1/x; }, color: "#E85D24" },
    { ox: W/3 + 20, label: "P vs T (const V)", xLabel: "T", yLabel: "P", curve: function(x) { return x; }, color: "#1D9E75" },
    { ox: 2*W/3 + 10, label: "V vs T (const P)", xLabel: "T", yLabel: "V", curve: function(x) { return x; }, color: "#378ADD" },
  ];

  const gw = W/3 - 40, gh = H - 100;

  graphs.forEach(function(g) {
    const gy = 40;

    // Axes
    ctx.strokeStyle = "rgba(255,255,255,0.3)"; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(g.ox, gy); ctx.lineTo(g.ox, gy + gh); ctx.lineTo(g.ox + gw, gy + gh); ctx.stroke();

    // Curve
    ctx.beginPath(); ctx.strokeStyle = g.color; ctx.lineWidth = 2;
    for (let i = 1; i <= 50; i++) {
      const x = i / 50;
      const y = Math.min(g.curve(x), 2);
      const px = g.ox + x * gw;
      const py = gy + gh - Math.min(y * gh * 0.45, gh - 5);
      i === 1 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Moving point
    const phase = (t * 0.3 + graphs.indexOf(g) * 0.3) % 1;
    const px = g.ox + (0.2 + phase * 0.6) * gw;
    const x = 0.2 + phase * 0.6;
    const y = Math.min(g.curve(x), 2);
    const py = gy + gh - Math.min(y * gh * 0.45, gh - 5);
    ctx.beginPath(); ctx.arc(px, py, 5, 0, Math.PI * 2);
    ctx.fillStyle = g.color; ctx.fill();

    // Labels
    ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "10px monospace"; ctx.textAlign = "center";
    ctx.fillText(g.label, g.ox + gw/2, gy - 8);
    ctx.fillText(g.xLabel, g.ox + gw + 8, gy + gh);
    ctx.textAlign = "right"; ctx.fillText(g.yLabel, g.ox - 4, gy + 8);
  });

  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText("PV = nRT  |  T=" + temp + "K  |  Ideal gas relationships", W/2, H - 10);
  ctx.textAlign = "left";
}
`;

module.exports = code;