const code = `
function drawHeat(ctx, W, H, t, controls) {
  const temp = controls.temp || 200;
  const W3 = (W - 80) / 3;
  const sections = [
    { x: 40, label: "Hot", temp: temp, r: 232, g: 93, b: 36 },
    { x: 40 + W3, label: "Medium", temp: temp * 0.6, r: 242, g: 201, b: 76 },
    { x: 40 + W3*2, label: "Cold", temp: temp * 0.2, r: 59, g: 139, b: 212 },
  ];
  sections.forEach(function(s) {
    const grad = ctx.createLinearGradient(s.x, 0, s.x + W3, 0);
    grad.addColorStop(0, "rgba(" + s.r + "," + s.g + "," + s.b + ",0.7)");
    grad.addColorStop(1, "rgba(" + s.r + "," + s.g + "," + s.b + ",0.1)");
    ctx.fillStyle = grad;
    ctx.fillRect(s.x, 40, W3, H - 80);
    ctx.strokeStyle = "rgba(255,255,255,0.1)"; ctx.lineWidth = 1;
    ctx.strokeRect(s.x, 40, W3, H - 80);
    ctx.fillStyle = "rgba(255,255,255,0.7)"; ctx.font = "13px monospace"; ctx.textAlign = "center";
    ctx.fillText(s.label, s.x + W3/2, H/2);
    ctx.fillText(s.temp.toFixed(0) + "K", s.x + W3/2, H/2 + 20);
  });
  const arrowPhase = (t * 0.5) % 1;
  const arrowX = 40 + W3 + arrowPhase * W3;
  ctx.strokeStyle = "#E85D24"; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(arrowX - 10, H/2 - 40); ctx.lineTo(arrowX + 10, H/2 - 40); ctx.stroke();
  ctx.fillStyle = "#E85D24";
  ctx.beginPath(); ctx.moveTo(arrowX + 18, H/2 - 40); ctx.lineTo(arrowX + 8, H/2 - 46); ctx.lineTo(arrowX + 8, H/2 - 34); ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText("Heat flows hot to cold  |  Q = mcDeltaT", W/2, H - 10);
  ctx.textAlign = "left";
}

function drawEntropy(ctx, W, H, t, controls) {
  const cx = W / 2, cy = H / 2;
  ctx.strokeStyle = "rgba(255,255,255,0.2)"; ctx.lineWidth = 1;
  ctx.strokeRect(40, 40, cx - 60, H - 80);
  ctx.strokeRect(cx + 20, 40, cx - 60, H - 80);
  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText("Low Entropy", (40 + cx - 60) / 2, 35);
  ctx.fillText("High Entropy", cx + 20 + (cx - 60) / 2, 35);
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      const ox = 70 + col * 35, oy = 70 + row * 35;
      ctx.beginPath(); ctx.arc(ox, oy, 8, 0, Math.PI * 2);
      ctx.fillStyle = "#378ADD"; ctx.fill();
    }
  }
  for (let i = 0; i < 16; i++) {
    const ox = cx + 40 + Math.sin(i * 2.3 + t * 0.2) * 80;
    const oy = cy + Math.cos(i * 1.7 + t * 0.15) * 60;
    ctx.beginPath(); ctx.arc(ox, oy, 8, 0, Math.PI * 2);
    ctx.fillStyle = i % 2 === 0 ? "#378ADD" : "#E85D24"; ctx.fill();
  }
  ctx.strokeStyle = "#1D9E75"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(cx - 50, cy); ctx.lineTo(cx + 10, cy); ctx.stroke();
  ctx.fillStyle = "#1D9E75";
  ctx.beginPath(); ctx.moveTo(cx + 18, cy); ctx.lineTo(cx + 8, cy - 5); ctx.lineTo(cx + 8, cy + 5); ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText("Entropy always increases  |  DeltaS >= 0", W/2, H - 10);
  ctx.textAlign = "left";
}

function drawCarnot(ctx, W, H, t, controls) {
  const hotTemp = controls.temp || 500, coldTemp = 300;
  const efficiency = 1 - coldTemp / hotTemp;
  const ox = 80, oy = H - 50, gw = W - 160, gh = H - 90;
  ctx.strokeStyle = "rgba(255,255,255,0.08)"; ctx.lineWidth = 0.5;
  for (let i = 0; i <= 4; i++) {
    ctx.beginPath(); ctx.moveTo(ox + i * gw/4, oy - gh); ctx.lineTo(ox + i * gw/4, oy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(ox, oy - i * gh/4); ctx.lineTo(ox + gw, oy - i * gh/4); ctx.stroke();
  }
  ctx.strokeStyle = "rgba(255,255,255,0.3)"; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(ox, oy - gh); ctx.lineTo(ox, oy); ctx.lineTo(ox + gw, oy); ctx.stroke();
  const x1 = ox + gw * 0.15, x2 = ox + gw * 0.75;
  const y1 = oy - gh * 0.75, y2 = oy - gh * 0.25;
  ctx.fillStyle = "rgba(242,201,76,0.08)"; ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
  ctx.beginPath(); ctx.strokeStyle = "#E85D24"; ctx.lineWidth = 2.5; ctx.moveTo(x1, y1); ctx.lineTo(x2, y1); ctx.stroke();
  ctx.beginPath(); ctx.strokeStyle = "#F2C94C"; ctx.lineWidth = 2.5; ctx.moveTo(x2, y1); ctx.lineTo(x2, y2); ctx.stroke();
  ctx.beginPath(); ctx.strokeStyle = "#378ADD"; ctx.lineWidth = 2.5; ctx.moveTo(x2, y2); ctx.lineTo(x1, y2); ctx.stroke();
  ctx.beginPath(); ctx.strokeStyle = "#1D9E75"; ctx.lineWidth = 2.5; ctx.moveTo(x1, y2); ctx.lineTo(x1, y1); ctx.stroke();
  const cp = (t * 0.4) % 1;
  let dotX, dotY;
  if (cp < 0.25) { dotX = x1 + (x2-x1)*(cp/0.25); dotY = y1; }
  else if (cp < 0.5) { dotX = x2; dotY = y1 + (y2-y1)*((cp-0.25)/0.25); }
  else if (cp < 0.75) { dotX = x2 - (x2-x1)*((cp-0.5)/0.25); dotY = y2; }
  else { dotX = x1; dotY = y2 - (y2-y1)*((cp-0.75)/0.25); }
  ctx.beginPath(); ctx.arc(dotX, dotY, 7, 0, Math.PI * 2); ctx.fillStyle = "#fff"; ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText("Carnot efficiency = " + (efficiency * 100).toFixed(1) + "%  |  eta = 1 - Tc/Th", W/2, H - 10);
  ctx.textAlign = "left";
}

function drawIdealgas(ctx, W, H, t, controls) {
  const temp = controls.temp || 200;
  const gw = W/3 - 40, gh = H - 100;
  const graphs = [
    { ox: 45, label: "P vs V", color: "#E85D24", inverse: true },
    { ox: W/3 + 15, label: "P vs T", color: "#1D9E75", inverse: false },
    { ox: 2*W/3 - 10, label: "V vs T", color: "#378ADD", inverse: false },
  ];
  graphs.forEach(function(g, gi) {
    const gy = 40;
    ctx.strokeStyle = "rgba(255,255,255,0.3)"; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(g.ox, gy); ctx.lineTo(g.ox, gy + gh); ctx.lineTo(g.ox + gw, gy + gh); ctx.stroke();
    ctx.beginPath(); ctx.strokeStyle = g.color; ctx.lineWidth = 2;
    for (let i = 1; i <= 50; i++) {
      const x = i / 50;
      const y = g.inverse ? Math.min(1/x, 2) : x;
      const px = g.ox + x * gw;
      const py = gy + gh - Math.min(y * gh * 0.45, gh - 5);
      i === 1 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.stroke();
    const phase = (t * 0.3 + gi * 0.3) % 1;
    const x = 0.2 + phase * 0.6;
    const y = g.inverse ? Math.min(1/x, 2) : x;
    const px = g.ox + x * gw;
    const py = gy + gh - Math.min(y * gh * 0.45, gh - 5);
    ctx.beginPath(); ctx.arc(px, py, 5, 0, Math.PI * 2); ctx.fillStyle = g.color; ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "10px monospace"; ctx.textAlign = "center";
    ctx.fillText(g.label, g.ox + gw/2, gy - 8);
  });
  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText("PV = nRT  |  T=" + temp + "K", W/2, H - 10);
  ctx.textAlign = "left";
}
`;

module.exports = code;