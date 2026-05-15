const code = `
function drawDecay(ctx, W, H, t, controls) {
  const T12 = controls.halflife || 4, lambda = Math.log(2) / T12, N0 = 64;
  const cw = W * 0.5, ch = H - 70, ox = 40, oy = H - 40;

  ctx.strokeStyle = "rgba(255,255,255,0.08)"; ctx.lineWidth = 0.5;
  for (let i = 0; i <= 4; i++) {
    const y = oy - (i / 4) * ch;
    ctx.beginPath(); ctx.moveTo(ox, y); ctx.lineTo(ox + cw, y); ctx.stroke();
    ctx.fillStyle = "rgba(255,255,255,0.3)"; ctx.font = "10px monospace"; ctx.textAlign = "right";
    ctx.fillText(Math.round(N0 * (i / 4)), ox - 4, y + 4);
  }

  ctx.beginPath(); ctx.strokeStyle = "#E85D24"; ctx.lineWidth = 2;
  const maxT = T12 * 3.5;
  for (let i = 0; i <= 100; i++) {
    const x = ox + (i / 100) * cw, y = oy - Math.exp(-lambda * (i / 100) * maxT) * ch;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.stroke();

  const cT = t % (maxT + 1), cx2 = ox + (cT / maxT) * cw, cy2 = oy - Math.exp(-lambda * cT) * ch;
  ctx.beginPath(); ctx.arc(cx2, cy2, 6, 0, Math.PI * 2); ctx.fillStyle = "#E85D24"; ctx.fill();

  const Ncur = Math.round(N0 * Math.exp(-lambda * cT));
  const gx = W * 0.58, gy = 20;
  ctx.font = "10px monospace"; ctx.textAlign = "left"; ctx.fillStyle = "rgba(255,255,255,0.4)";
  ctx.fillText("Remaining: " + Ncur + " / " + N0, gx, gy);

  for (let i = 0; i < N0; i++) {
    const col = i % 8, row = Math.floor(i / 8);
    const nx = gx + col * 18 + 9, ny = gy + row * 18 + 12;
    ctx.beginPath(); ctx.arc(nx, ny, 6, 0, Math.PI * 2);
    if (i < Ncur) { ctx.fillStyle = "#7F77DD"; ctx.fill(); }
    else { ctx.strokeStyle = "rgba(255,255,255,0.12)"; ctx.lineWidth = 0.5; ctx.stroke(); }
  }

  ctx.strokeStyle = "rgba(255,255,255,0.2)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(ox, oy - ch - 10); ctx.lineTo(ox, oy); ctx.lineTo(ox + cw + 10, oy); ctx.stroke();
  ctx.fillStyle = "rgba(255,255,255,0.35)"; ctx.textAlign = "center";
  ctx.fillText("T1/2=" + T12 + "s  lambda=" + lambda.toFixed(3) + "/s  N=" + Ncur, ox + cw/2, H - 8);
  ctx.textAlign = "left";
}

function drawHalflife(ctx, W, H, t, controls) {
  const T12 = controls.halflife || 4, lambda = Math.log(2) / T12;
  const ox = 60, oy = H - 50, gw = W - 120, gh = H - 90;

  ctx.strokeStyle = "rgba(255,255,255,0.1)"; ctx.lineWidth = 0.5;
  for (let i = 0; i <= 4; i++) {
    ctx.beginPath(); ctx.moveTo(ox + i * gw/4, oy - gh); ctx.lineTo(ox + i * gw/4, oy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(ox, oy - i * gh/4); ctx.lineTo(ox + gw, oy - i * gh/4); ctx.stroke();
    ctx.fillStyle = "rgba(255,255,255,0.3)"; ctx.font = "9px monospace"; ctx.textAlign = "center";
    ctx.fillText(i * T12 + "s", ox + i * gw/4, oy + 12);
    ctx.textAlign = "right";
    ctx.fillText((100 - i * 25) + "%", ox - 4, oy - i * gh/4 + 4);
  }

  ctx.beginPath(); ctx.strokeStyle = "#E85D24"; ctx.lineWidth = 2.5;
  for (let i = 0; i <= 100; i++) {
    const x = ox + (i / 100) * gw;
    const timeVal = (i / 100) * T12 * 4;
    const y = oy - Math.exp(-lambda * timeVal) * gh;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.stroke();

  // Half-life markers
  for (let h = 1; h <= 4; h++) {
    const x = ox + (h / 4) * gw;
    const y = oy - Math.pow(0.5, h) * gh;
    ctx.strokeStyle = "rgba(242,201,76,0.4)"; ctx.lineWidth = 1; ctx.setLineDash([3,3]);
    ctx.beginPath(); ctx.moveTo(ox, y); ctx.lineTo(x, y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x, oy); ctx.lineTo(x, y); ctx.stroke();
    ctx.setLineDash([]);
    ctx.beginPath(); ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fillStyle = "#F2C94C"; ctx.fill();
    ctx.fillStyle = "#F2C94C"; ctx.font = "9px monospace"; ctx.textAlign = "center";
    ctx.fillText("T1/2 x" + h, x, y - 8);
  }

  ctx.strokeStyle = "rgba(255,255,255,0.3)"; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(ox, oy - gh); ctx.lineTo(ox, oy); ctx.lineTo(ox + gw, oy); ctx.stroke();
  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText("T1/2=" + T12 + "s  Each half-life halves the remaining nuclei", W/2, H - 8);
  ctx.textAlign = "left";
}

function drawFission(ctx, W, H, t, controls) {
  const cx = W / 2, cy = H / 2;
  const phase = (t * 0.4) % 1;

  if (phase < 0.3) {
    // Neutron approaching
    const nx = 60 + phase * (cx - 80) / 0.3;
    ctx.beginPath(); ctx.arc(cx, cy, 35, 0, Math.PI * 2);
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 35);
    grad.addColorStop(0, "rgba(232,93,36,0.6)"); grad.addColorStop(1, "rgba(232,93,36,0.1)");
    ctx.fillStyle = grad; ctx.fill();
    ctx.strokeStyle = "#E85D24"; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = "#fff"; ctx.font = "11px monospace"; ctx.textAlign = "center";
    ctx.fillText("U-235", cx, cy + 4);

    ctx.beginPath(); ctx.arc(nx, cy, 6, 0, Math.PI * 2);
    ctx.fillStyle = "#F2C94C"; ctx.fill();
    ctx.fillStyle = "#F2C94C"; ctx.font = "10px monospace";
    ctx.fillText("n", nx, cy - 10);

  } else if (phase < 0.5) {
    // Excited nucleus
    const wobble = Math.sin(t * 20) * 10;
    ctx.beginPath(); ctx.ellipse(cx, cy, 40 + wobble, 35 - wobble/2, 0, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(232,93,36,0.5)"; ctx.fill();
    ctx.strokeStyle = "#E85D24"; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = "#fff"; ctx.font = "11px monospace"; ctx.textAlign = "center";
    ctx.fillText("U-236*", cx, cy + 4);

  } else {
    // Fission products
    const spread = (phase - 0.5) / 0.5 * 120;
    [[-1, "Ba-141", "#378ADD"], [1, "Kr-92", "#1D9E75"]].forEach(function(p) {
      ctx.beginPath(); ctx.arc(cx + p[0] * spread, cy, 22, 0, Math.PI * 2);
      ctx.fillStyle = p[2] + "44"; ctx.fill();
      ctx.strokeStyle = p[2]; ctx.lineWidth = 2; ctx.stroke();
      ctx.fillStyle = "#fff"; ctx.font = "10px monospace"; ctx.textAlign = "center";
      ctx.fillText(p[1], cx + p[0] * spread, cy + 4);
    });

    for (let i = 0; i < 3; i++) {
      const angle = (i / 3) * Math.PI * 2;
      const nr = spread * 0.6;
      ctx.beginPath(); ctx.arc(cx + Math.cos(angle) * nr, cy + Math.sin(angle) * nr, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#F2C94C"; ctx.fill();
    }

    ctx.fillStyle = "#F2C94C"; ctx.font = "10px monospace"; ctx.textAlign = "center";
    ctx.fillText("3 neutrons", cx, cy - 60);
    ctx.fillStyle = "#E85D24"; ctx.font = "11px monospace";
    ctx.fillText("Energy: ~200 MeV", cx, cy + 60);
  }

  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText("U-235 + n -> Ba-141 + Kr-92 + 3n + 200 MeV", W/2, H - 8);
  ctx.textAlign = "left";
}

function drawFusion(ctx, W, H, t, controls) {
  const cx = W / 2, cy = H / 2;
  const phase = (t * 0.35) % 1;

  if (phase < 0.4) {
    // Two nuclei approaching
    const sep = 200 - phase * (200 / 0.4);
    [[-1, "H-2", "#378ADD"], [1, "H-3", "#1D9E75"]].forEach(function(p) {
      ctx.beginPath(); ctx.arc(cx + p[0] * sep/2, cy, 18, 0, Math.PI * 2);
      ctx.fillStyle = p[2] + "44"; ctx.fill();
      ctx.strokeStyle = p[2]; ctx.lineWidth = 2; ctx.stroke();
      ctx.fillStyle = "#fff"; ctx.font = "11px monospace"; ctx.textAlign = "center";
      ctx.fillText(p[1], cx + p[0] * sep/2, cy + 4);

      // Velocity arrows
      ctx.strokeStyle = p[2]; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(cx + p[0] * (sep/2 + 18), cy);
      ctx.lineTo(cx + p[0] * (sep/2 - 10), cy); ctx.stroke();
    });

  } else if (phase < 0.55) {
    // Fusion flash
    const flash = (phase - 0.4) / 0.15;
    const r = 20 + flash * 40;
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    grad.addColorStop(0, "rgba(255,255,200,0.9)");
    grad.addColorStop(0.5, "rgba(255,200,50,0.6)");
    grad.addColorStop(1, "rgba(255,100,0,0)");
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = grad; ctx.fill();
    ctx.fillStyle = "#fff"; ctx.font = "bold 14px monospace"; ctx.textAlign = "center";
    ctx.fillText("FUSION!", cx, cy + 5);

  } else {
    // Products
    const spread = (phase - 0.55) / 0.45 * 100;
    ctx.beginPath(); ctx.arc(cx, cy - spread * 0.3, 22, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(232,93,36,0.4)"; ctx.fill();
    ctx.strokeStyle = "#E85D24"; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = "#fff"; ctx.font = "11px monospace"; ctx.textAlign = "center";
    ctx.fillText("He-4", cx, cy - spread * 0.3 + 4);

    ctx.beginPath(); ctx.arc(cx + spread, cy + spread * 0.5, 6, 0, Math.PI * 2);
    ctx.fillStyle = "#F2C94C"; ctx.fill();
    ctx.fillStyle = "#F2C94C"; ctx.font = "10px monospace";
    ctx.fillText("n", cx + spread + 10, cy + spread * 0.5);

    ctx.fillStyle = "#E85D24"; ctx.font = "11px monospace";
    ctx.fillText("17.6 MeV", cx, cy + 60);
  }

  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText("H-2 + H-3 -> He-4 + n + 17.6 MeV  |  Powers the sun", W/2, H - 8);
  ctx.textAlign = "left";
}

function drawBinding(ctx, W, H, t, controls) {
  const ox = 60, oy = H - 50, gw = W - 120, gh = H - 90;

  const bindingData = [
    [1,0],[2,1.1],[4,7.07],[6,5.3],[8,7.06],[12,7.68],[16,7.98],[20,8.03],
    [28,8.45],[40,8.55],[56,8.79],[90,8.7],[120,8.5],[150,8.2],[180,7.9],[208,7.87],[235,7.59],[238,7.57]
  ];

  const maxA = 238, maxBE = 9;

  ctx.strokeStyle = "rgba(255,255,255,0.1)"; ctx.lineWidth = 0.5;
  for (let i = 0; i <= 4; i++) {
    ctx.beginPath(); ctx.moveTo(ox + i * gw/4, oy - gh); ctx.lineTo(ox + i * gw/4, oy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(ox, oy - i * gh/4); ctx.lineTo(ox + gw, oy - i * gh/4); ctx.stroke();
    ctx.fillStyle = "rgba(255,255,255,0.3)"; ctx.font = "9px monospace"; ctx.textAlign = "center";
    ctx.fillText(Math.round(i * maxA/4), ox + i * gw/4, oy + 12);
    ctx.textAlign = "right";
    ctx.fillText((i * maxBE/4).toFixed(1), ox - 4, oy - i * gh/4 + 4);
  }

  ctx.beginPath(); ctx.strokeStyle = "#7F77DD"; ctx.lineWidth = 2.5;
  bindingData.forEach(function(d, i) {
    const x = ox + (d[0] / maxA) * gw;
    const y = oy - (d[1] / maxBE) * gh;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.stroke();

  bindingData.forEach(function(d) {
    const x = ox + (d[0] / maxA) * gw;
    const y = oy - (d[1] / maxBE) * gh;
    ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fillStyle = "#7F77DD"; ctx.fill();
  });

  // Iron-56 peak marker
  const feX = ox + (56 / maxA) * gw;
  const feY = oy - (8.79 / maxBE) * gh;
  ctx.beginPath(); ctx.arc(feX, feY, 8, 0, Math.PI * 2);
  ctx.strokeStyle = "#F2C94C"; ctx.lineWidth = 2; ctx.stroke();
  ctx.fillStyle = "#F2C94C"; ctx.font = "10px monospace"; ctx.textAlign = "center";
  ctx.fillText("Fe-56 (most stable)", feX, feY - 14);

  // Fission/fusion arrows
  ctx.strokeStyle = "#E85D24"; ctx.lineWidth = 1.5; ctx.setLineDash([4,4]);
  ctx.beginPath(); ctx.moveTo(ox + (235/maxA)*gw, oy - (7.59/maxBE)*gh);
  ctx.lineTo(feX, feY); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = "#E85D24"; ctx.font = "9px monospace"; ctx.textAlign = "center";
  ctx.fillText("Fission ->", ox + (180/maxA)*gw, oy - (8/maxBE)*gh - 8);

  ctx.strokeStyle = "#1D9E75"; ctx.lineWidth = 1.5; ctx.setLineDash([4,4]);
  ctx.beginPath(); ctx.moveTo(ox + (4/maxA)*gw, oy - (7.07/maxBE)*gh);
  ctx.lineTo(feX, feY); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = "#1D9E75"; ctx.font = "9px monospace"; ctx.textAlign = "center";
  ctx.fillText("<- Fusion", ox + (25/maxA)*gw, oy - (8/maxBE)*gh - 8);

  ctx.strokeStyle = "rgba(255,255,255,0.3)"; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(ox, oy - gh); ctx.lineTo(ox, oy); ctx.lineTo(ox + gw, oy); ctx.stroke();

  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "10px monospace"; ctx.textAlign = "left";
  ctx.fillText("A (mass number)", ox + gw/2, oy + 22);
  ctx.textAlign = "center";
  ctx.fillText("Binding energy per nucleon (MeV)  |  Fe-56 is most stable  |  Both fission and fusion release energy", W/2, H - 8);
  ctx.textAlign = "left";
}
`;

module.exports = code;