const code = `function drawEM(ctx, W, H, t, controls) {
  const q = controls.charge !== undefined ? controls.charge : 2;
  const cx = W / 2, cy = H / 2, nLines = 16;
  if (q === 0) {
    ctx.fillStyle = "rgba(255,255,255,0.3)"; ctx.font = "14px monospace"; ctx.textAlign = "center";
    ctx.fillText("Charge = 0, no field", cx, cy); ctx.textAlign = "left"; return;
  }
  for (let p = 0; p < 3; p++) {
    const phase = ((t * 0.5) + p / 3) % 1;
    const r = phase * Math.min(W, H) * 0.4;
    const alpha = (1 - phase) * 0.15;
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = q > 0 ? "rgba(232,93,36," + alpha + ")" : "rgba(59,139,212," + alpha + ")";
    ctx.lineWidth = 2; ctx.stroke();
  }
  for (let i = 0; i < nLines; i++) {
    const startAngle = (i / nLines) * Math.PI * 2;
    const startR = 28;
    let px = cx + startR * Math.cos(startAngle);
    let py = cy + startR * Math.sin(startAngle);
    ctx.beginPath();
    ctx.strokeStyle = q > 0 ? "rgba(232,93,36,0.7)" : "rgba(59,139,212,0.7)";
    ctx.lineWidth = 1.5; ctx.moveTo(px, py);
    for (let s = 0; s < 60; s++) {
      const dx = px - cx, dy = py - cy;
      const r2 = dx * dx + dy * dy || 0.01;
      const fx = (q * dx) / r2, fy = (q * dy) / r2;
      const fm = Math.sqrt(fx * fx + fy * fy);
      px += (fx / fm) * 5; py += (fy / fm) * 5;
      if (px < 5 || px > W - 5 || py < 5 || py > H - 5) break;
      ctx.lineTo(px, py);
    }
    ctx.stroke();
  }
  const chargeGrad = ctx.createRadialGradient(cx - 5, cy - 5, 2, cx, cy, 24);
  chargeGrad.addColorStop(0, q > 0 ? "#f09b79" : "#85b7eb");
  chargeGrad.addColorStop(1, q > 0 ? "#D85A30" : "#185FA5");
  ctx.beginPath(); ctx.arc(cx, cy, 24, 0, Math.PI * 2);
  ctx.fillStyle = chargeGrad; ctx.fill();
  ctx.font = "18px sans-serif"; ctx.fillStyle = "#fff"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillText(q > 0 ? "+" : "-", cx, cy); ctx.textBaseline = "alphabetic";
  ctx.font = "11px monospace"; ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.textAlign = "center";
  ctx.fillText("q=" + q + "e  |  " + (q > 0 ? "Positive: field outward" : "Negative: field inward"), W/2, H - 8);
  ctx.textAlign = "left";
}`;

module.exports = code;