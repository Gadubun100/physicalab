module.exports = `function drawNewton(ctx, W, H, t, controls) {
  const mass = controls.mass || 5, force = controls.force || 20;
  const friction = Math.min(force * 0.4, 15);
  const netForce = Math.max(0, force - friction);
  const acc = netForce / mass;
  const ground = H - 60;
  const boxW = 50 + mass * 3, boxH = 40 + mass * 2;
  const boxX = 60 + ((t * acc * 20) % (W - boxW - 80));
  const boxY = ground - boxH;
  ctx.fillStyle = "rgba(255,255,255,0.06)";
  ctx.fillRect(40, ground, W - 80, 4);
  ctx.strokeStyle = "rgba(255,255,255,0.1)"; ctx.lineWidth = 1;
  for (let x = 40; x < W - 40; x += 20) {
    ctx.beginPath(); ctx.moveTo(x, ground + 4); ctx.lineTo(x + 10, ground + 14); ctx.stroke();
  }
  ctx.fillStyle = "rgba(0,0,0,0.3)";
  ctx.fillRect(boxX + 4, ground, boxW, 6);
  const grad = ctx.createLinearGradient(boxX, boxY, boxX, ground);
  grad.addColorStop(0, "#4a9de8");
  grad.addColorStop(1, "#185FA5");
  ctx.fillStyle = grad;
  ctx.fillRect(boxX, boxY, boxW, boxH);
  ctx.strokeStyle = "rgba(255,255,255,0.2)"; ctx.lineWidth = 1;
  ctx.strokeRect(boxX, boxY, boxW, boxH);
  ctx.fillStyle = "#fff"; ctx.font = "bold 13px monospace"; ctx.textAlign = "center";
  ctx.fillText(mass + "kg", boxX + boxW/2, boxY + boxH/2 + 5);
  const cx = boxX + boxW/2, cy = boxY + boxH/2;
  if (force > 0) {
    const arrowLen = force * 3;
    ctx.strokeStyle = "#E85D24"; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(boxX + boxW, cy); ctx.lineTo(boxX + boxW + arrowLen, cy); ctx.stroke();
    ctx.fillStyle = "#E85D24";
    ctx.beginPath(); ctx.moveTo(boxX + boxW + arrowLen + 10, cy);
    ctx.lineTo(boxX + boxW + arrowLen, cy - 6); ctx.lineTo(boxX + boxW + arrowLen, cy + 6);
    ctx.fill();
    ctx.font = "11px monospace"; ctx.textAlign = "center";
    ctx.fillText("F=" + force + "N", boxX + boxW + arrowLen/2, cy - 10);
  }
  if (friction > 0 && netForce > 0) {
    const fLen = friction * 3;
    ctx.strokeStyle = "#7F77DD"; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(boxX, cy); ctx.lineTo(boxX - fLen, cy); ctx.stroke();
    ctx.fillStyle = "#7F77DD";
    ctx.beginPath(); ctx.moveTo(boxX - fLen - 10, cy);
    ctx.lineTo(boxX - fLen, cy - 6); ctx.lineTo(boxX - fLen, cy + 6);
    ctx.fill();
    ctx.font = "11px monospace"; ctx.textAlign = "center";
    ctx.fillText("f=" + friction.toFixed(0) + "N", boxX - fLen/2, cy - 10);
  }
  ctx.strokeStyle = "#1D9E75"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(cx, ground); ctx.lineTo(cx, ground + 30); ctx.stroke();
  ctx.fillStyle = "#1D9E75";
  ctx.beginPath(); ctx.moveTo(cx, ground + 38); ctx.lineTo(cx - 5, ground + 28); ctx.lineTo(cx + 5, ground + 28); ctx.fill();
  ctx.font = "10px monospace"; ctx.textAlign = "center";
  ctx.fillText("W=" + (mass * 9.8).toFixed(0) + "N", cx + 35, ground + 30);
  ctx.strokeStyle = "#F2C94C"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(cx, boxY); ctx.lineTo(cx, boxY - 30); ctx.stroke();
  ctx.fillStyle = "#F2C94C";
  ctx.beginPath(); ctx.moveTo(cx, boxY - 38); ctx.lineTo(cx - 5, boxY - 28); ctx.lineTo(cx + 5, boxY - 28); ctx.fill();
  ctx.font = "10px monospace"; ctx.textAlign = "center";
  ctx.fillText("N=" + (mass * 9.8).toFixed(0) + "N", cx + 35, boxY - 25);
  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText("F=" + force + "N  f=" + friction.toFixed(0) + "N  Fnet=" + netForce.toFixed(0) + "N  a=" + acc.toFixed(2) + "m/s2", W/2, H - 10);
  ctx.textAlign = "left";
}`;