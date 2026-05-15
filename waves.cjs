module.exports = `function drawWaves(ctx, W, H, t, controls) {
  const f1 = controls.freq1 || 2, f2 = controls.freq2 || 3;
  const A = 30, pad = 50;

  const rows = [
    { y: H * 0.22, f: f1, col1: "#378ADD", col2: "#1a5fa8", lbl: "Wave 1  f=" + f1 + "Hz  T=" + (1/f1).toFixed(2) + "s" },
    { y: H * 0.52, f: f2, col1: "#1D9E75", col2: "#0d6b4f", lbl: "Wave 2  f=" + f2 + "Hz  T=" + (1/f2).toFixed(2) + "s" },
    { y: H * 0.82, f: null, col1: "#E85D24", col2: "#a33d18", lbl: "Superposition" },
  ];

  rows.forEach(function(row) {
    // Axis line
    ctx.strokeStyle = "rgba(255,255,255,0.08)"; ctx.lineWidth = 0.5;
    ctx.beginPath(); ctx.moveTo(pad, row.y); ctx.lineTo(W - pad, row.y); ctx.stroke();

    // 3D effect - draw slightly offset shadow first
    ctx.beginPath(); ctx.strokeStyle = row.col2; ctx.lineWidth = 3;
    for (let x = pad; x < W - pad; x++) {
      const xn = (x - pad) / (W - 2*pad);
      const y = row.f
        ? row.y + A * Math.sin(2 * Math.PI * row.f * xn - t * row.f * 1.5) + 2
        : row.y + A * 0.6 * (Math.sin(2 * Math.PI * f1 * xn - t * f1 * 1.5) + Math.sin(2 * Math.PI * f2 * xn - t * f2 * 1.5)) + 2;
      x === pad ? ctx.moveTo(x + 2, y) : ctx.lineTo(x + 2, y);
    }
    ctx.stroke();

    // Main wave
    ctx.beginPath(); ctx.strokeStyle = row.col1; ctx.lineWidth = 2.5;
    for (let x = pad; x < W - pad; x++) {
      const xn = (x - pad) / (W - 2*pad);
      const y = row.f
        ? row.y + A * Math.sin(2 * Math.PI * row.f * xn - t * row.f * 1.5)
        : row.y + A * 0.6 * (Math.sin(2 * Math.PI * f1 * xn - t * f1 * 1.5) + Math.sin(2 * Math.PI * f2 * xn - t * f2 * 1.5));
      x === pad ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Amplitude markers
    if (row.f) {
      ctx.strokeStyle = "rgba(255,255,255,0.15)"; ctx.lineWidth = 0.5; ctx.setLineDash([3,3]);
      ctx.beginPath(); ctx.moveTo(pad, row.y - A); ctx.lineTo(W - pad, row.y - A); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(pad, row.y + A); ctx.lineTo(W - pad, row.y + A); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = "rgba(255,255,255,0.25)"; ctx.font = "9px monospace"; ctx.textAlign = "left";
      ctx.fillText("+A", pad + 2, row.y - A - 3);
      ctx.fillText("-A", pad + 2, row.y + A + 10);
    }

    // Label
    ctx.fillStyle = row.col1; ctx.font = "11px monospace"; ctx.textAlign = "right";
    ctx.fillText(row.lbl, W - pad - 4, row.y - A - 6);
  });

  // Wavelength indicator on wave 1
  const waveLen = (W - 2*pad) / f1;
  ctx.strokeStyle = "rgba(255,255,255,0.2)"; ctx.lineWidth = 1; ctx.setLineDash([2,2]);
  ctx.beginPath(); ctx.moveTo(pad, rows[0].y + A + 18); ctx.lineTo(pad + waveLen, rows[0].y + A + 18); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = "rgba(255,255,255,0.3)"; ctx.font = "10px monospace"; ctx.textAlign = "center";
  ctx.fillText("lambda", pad + waveLen/2, rows[0].y + A + 30);

  ctx.fillStyle = "rgba(255,255,255,0.35)"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText("v = f x lambda  |  f1=" + f1 + "Hz  f2=" + f2 + "Hz", W/2, H - 8);
  ctx.textAlign = "left";
}`;