const code = `function drawThermo(ctx, W, H, t, canvas, particlesRef, controls) {
  const temp = controls.temp || 200, N = 20;
  if (!particlesRef.current) {
    particlesRef.current = Array.from({ length: N }, function() {
      return {
        x: 44 + Math.random() * (W * 0.52 - 88),
        y: 34 + Math.random() * (H - 68),
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
      };
    });
  }
  const spd = temp / 150;
  particlesRef.current.forEach(function(p) {
    p.x += p.vx * spd; p.y += p.vy * spd;
    if (p.x < 44 || p.x > W * 0.52 - 44) p.vx *= -1;
    if (p.y < 34 || p.y > H - 34) p.vy *= -1;
  });
  ctx.strokeStyle = "rgba(255,255,255,0.25)"; ctx.lineWidth = 2;
  ctx.strokeRect(40, 30, W * 0.52 - 80, H - 60);
  const r = Math.min(255, Math.floor(temp * 0.5)), b = Math.max(0, 200 - Math.floor(temp * 0.4));
  particlesRef.current.forEach(function(p) {
    const g2 = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 7);
    g2.addColorStop(0, "rgba(" + r + ",120," + b + ",0.9)");
    g2.addColorStop(1, "rgba(" + r + ",60," + b + ",0)");
    ctx.beginPath(); ctx.arc(p.x, p.y, 7, 0, Math.PI * 2);
    ctx.fillStyle = g2; ctx.fill();
  });
  const gx = W * 0.58, gy = 30, gw = W * 0.36, gh = H - 70;
  ctx.strokeStyle = "rgba(255,255,255,0.15)"; ctx.lineWidth = 0.5;
  for (let i = 0; i <= 4; i++) {
    ctx.beginPath(); ctx.moveTo(gx, gy + i * gh/4); ctx.lineTo(gx + gw, gy + i * gh/4); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(gx + i * gw/4, gy); ctx.lineTo(gx + i * gw/4, gy + gh); ctx.stroke();
  }
  ctx.strokeStyle = "rgba(255,255,255,0.4)"; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx, gy + gh); ctx.lineTo(gx + gw, gy + gh); ctx.stroke();
  ctx.beginPath(); ctx.strokeStyle = "#E85D24"; ctx.lineWidth = 2;
  for (let i = 0; i <= 50; i++) {
    const vv = 0.2 + (i/50) * 0.8;
    const pp = (temp / 200) / vv;
    const px2 = gx + vv * gw;
    const py2 = gy + gh - Math.min(pp * gh * 0.6, gh - 5);
    i === 0 ? ctx.moveTo(px2, py2) : ctx.lineTo(px2, py2);
  }
  ctx.stroke();
  const stateV = 0.5;
  const stateP = (temp / 200) / stateV;
  const statePx = gx + stateV * gw;
  const statePy = gy + gh - Math.min(stateP * gh * 0.6, gh - 5);
  ctx.beginPath(); ctx.arc(statePx, statePy, 6, 0, Math.PI * 2);
  ctx.fillStyle = "#E85D24"; ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "10px monospace"; ctx.textAlign = "center";
  ctx.fillText("PV Diagram", gx + gw/2, gy - 8);
  ctx.fillText("V ->", gx + gw + 10, gy + gh);
  ctx.textAlign = "right"; ctx.fillText("P", gx - 4, gy + 8);
  ctx.fillStyle = "#E85D24"; ctx.textAlign = "left"; ctx.fillText("T=" + temp + "K", gx + 5, gy + 15);
  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText("T=" + temp + "K  |  PV=nRT  |  Higher T = faster particles + higher pressure", W * 0.28, H - 10);
  ctx.textAlign = "left";
}`;

module.exports = code;