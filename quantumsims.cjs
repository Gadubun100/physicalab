const code = `
function drawDoubleslit(ctx, W, H, t, controls) {
  const cx = W / 2, cy = H / 2;
  const slitX = cx - 80;
  const slitGap = 20;

  // Incoming wave
  for (let i = 0; i < 4; i++) {
    const phase = ((t * 0.8) + i / 4) % 1;
    const r = phase * (slitX - 60);
    ctx.beginPath(); ctx.arc(60, cy, r, -Math.PI/2, Math.PI/2);
    ctx.strokeStyle = "rgba(127,119,221," + (1-phase) * 0.6 + ")";
    ctx.lineWidth = 1.5; ctx.stroke();
  }

  // Barrier
  ctx.fillStyle = "rgba(255,255,255,0.2)";
  ctx.fillRect(slitX - 4, 20, 8, cy - slitGap/2 - 20);
  ctx.fillRect(slitX - 4, cy + slitGap/2, 8, H - 40 - cy - slitGap/2);

  // Two slit waves
  const slits = [cy - slitGap/2 - 5, cy + slitGap/2 + 5];
  slits.forEach(function(sy) {
    for (let i = 0; i < 4; i++) {
      const phase = ((t * 0.8) + i / 4) % 1;
      const r = phase * (W - slitX - 60);
      ctx.beginPath(); ctx.arc(slitX, sy, r, -Math.PI/2, Math.PI/2);
      ctx.strokeStyle = "rgba(127,119,221," + (1-phase) * 0.4 + ")";
      ctx.lineWidth = 1; ctx.stroke();
    }
  });

  // Interference pattern on screen
  const screenX = W - 50;
  for (let y = 20; y < H - 20; y++) {
    const d1 = Math.sqrt(Math.pow(screenX - slitX, 2) + Math.pow(y - slits[0], 2));
    const d2 = Math.sqrt(Math.pow(screenX - slitX, 2) + Math.pow(y - slits[1], 2));
    const diff = d1 - d2;
    const intensity = Math.pow(Math.cos(diff * 0.15), 2);
    ctx.fillStyle = "rgba(127,119,221," + intensity * 0.9 + ")";
    ctx.fillRect(screenX, y, 12, 1);
  }

  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "10px monospace"; ctx.textAlign = "center";
  ctx.fillText("Screen", W - 44, H - 8);
  ctx.fillText("Slits", slitX, H - 8);
  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace";
  ctx.fillText("Double slit: waves interfere creating bright and dark bands", W/2, H - 8);
  ctx.textAlign = "left";
}

function drawUncertainty2(ctx, W, H, t, controls) {
  const cx = W / 2, cy = H / 2;

  // Position space (left)
  const lx = 60, lw = W * 0.4, lh = H - 80;
  ctx.strokeStyle = "rgba(255,255,255,0.2)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(lx, 30); ctx.lineTo(lx, 30 + lh); ctx.lineTo(lx + lw, 30 + lh); ctx.stroke();

  const spread = Math.sin(t * 0.5) * 0.3 + 0.5;
  ctx.beginPath(); ctx.strokeStyle = "#7F77DD"; ctx.lineWidth = 2;
  for (let x = lx; x < lx + lw; x++) {
    const xn = (x - lx - lw/2) / (lw * spread * 0.3);
    const y = 30 + lh - Math.exp(-xn*xn) * lh * 0.7;
    x === lx ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.fillStyle = "#7F77DD"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText("Position (Δx)", lx + lw/2, 30 + lh + 16);
  ctx.fillText("narrow = precise", lx + lw/2, 22);

  // Momentum space (right)
  const rx = W * 0.55, rw = W * 0.4;
  ctx.strokeStyle = "rgba(255,255,255,0.2)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(rx, 30); ctx.lineTo(rx, 30 + lh); ctx.lineTo(rx + rw, 30 + lh); ctx.stroke();

  const mSpread = 1 - spread * 0.8;
  ctx.beginPath(); ctx.strokeStyle = "#E85D24"; ctx.lineWidth = 2;
  for (let x = rx; x < rx + rw; x++) {
    const xn = (x - rx - rw/2) / (rw * mSpread * 0.3);
    const y = 30 + lh - Math.exp(-xn*xn) * lh * 0.7;
    x === rx ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.fillStyle = "#E85D24"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText("Momentum (Δp)", rx + rw/2, 30 + lh + 16);
  ctx.fillText("wide = uncertain", rx + rw/2, 22);

  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace";
  ctx.fillText("DeltaX x DeltaP >= hbar/2  |  More precise position = less precise momentum", W/2, H - 8);
  ctx.textAlign = "left";
}

function drawSchrodinger(ctx, W, H, t, controls) {
  const n = controls.n || 2;
  const L = W - 80, ox = 40, midY = H / 2;

  ctx.strokeStyle = "rgba(255,255,255,0.25)"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(ox, midY - 80); ctx.lineTo(ox, midY + 80); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(ox + L, midY - 80); ctx.lineTo(ox + L, midY + 80); ctx.stroke();

  // Energy levels
  for (let i = 1; i <= n; i++) {
    const energy = i * i * 20;
    const levelY = midY + 60 - energy;
    ctx.strokeStyle = "rgba(255,255,255,0.15)"; ctx.lineWidth = 1; ctx.setLineDash([4,4]);
    ctx.beginPath(); ctx.moveTo(ox, levelY); ctx.lineTo(ox + L, levelY); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "rgba(255,255,255,0.3)"; ctx.font = "10px monospace"; ctx.textAlign = "left";
    ctx.fillText("E" + i, ox + L + 5, levelY + 4);
  }

  // Wave function
  ctx.beginPath(); ctx.strokeStyle = "#7F77DD"; ctx.lineWidth = 2.5;
  for (let i = 0; i <= 200; i++) {
    const x = ox + (i / 200) * L;
    const psi = 55 * Math.sin((n * Math.PI * i) / 200) * Math.cos(t * 1.5);
    i === 0 ? ctx.moveTo(x, midY - psi) : ctx.lineTo(x, midY - psi);
  }
  ctx.stroke();

  // Probability density
  ctx.beginPath(); ctx.strokeStyle = "rgba(232,93,36,0.8)"; ctx.lineWidth = 1.5;
  for (let i = 0; i <= 200; i++) {
    const x = ox + (i / 200) * L;
    const psi = Math.sin((n * Math.PI * i) / 200);
    i === 0 ? ctx.moveTo(x, midY + psi * psi * 40) : ctx.lineTo(x, midY + psi * psi * 40);
  }
  ctx.stroke();

  ctx.fillStyle = "#7F77DD"; ctx.font = "10px monospace"; ctx.textAlign = "left";
  ctx.fillText("psi(x)", ox + 4, midY - 60);
  ctx.fillStyle = "rgba(232,93,36,0.8)";
  ctx.fillText("|psi|2", ox + 4, midY + 55);

  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText("n=" + n + "  |  " + n + " antinodes  |  En = n2 x E1", W/2, H - 8);
  ctx.textAlign = "left";
}

function drawTunnelling(ctx, W, H, t, controls) {
  const cx = W / 2, cy = H / 2;
  const barrierX = cx - 20, barrierW = 40, barrierH = 120;

  // Potential energy barrier
  ctx.fillStyle = "rgba(232,93,36,0.2)";
  ctx.fillRect(barrierX, cy - barrierH/2, barrierW, barrierH);
  ctx.strokeStyle = "#E85D24"; ctx.lineWidth = 2;
  ctx.strokeRect(barrierX, cy - barrierH/2, barrierW, barrierH);
  ctx.fillStyle = "#E85D24"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText("Barrier", barrierX + barrierW/2, cy - barrierH/2 - 8);
  ctx.fillText("V0", barrierX + barrierW/2, cy + 5);

  // Incoming wave
  const wavePhase = t * 1.2;
  ctx.beginPath(); ctx.strokeStyle = "#7F77DD"; ctx.lineWidth = 2;
  for (let x = 40; x < barrierX; x++) {
    const y = cy + 30 * Math.sin((x * 0.15) - wavePhase);
    x === 40 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.stroke();

  // Decaying wave inside barrier
  ctx.beginPath(); ctx.strokeStyle = "rgba(127,119,221,0.5)"; ctx.lineWidth = 2;
  for (let x = barrierX; x < barrierX + barrierW; x++) {
    const decay = Math.exp(-(x - barrierX) * 0.06);
    const y = cy + 30 * decay * Math.sin((x * 0.15) - wavePhase);
    x === barrierX ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.stroke();

  // Transmitted wave (tunnelled)
  const transmission = 0.15;
  ctx.beginPath(); ctx.strokeStyle = "#1D9E75"; ctx.lineWidth = 2;
  for (let x = barrierX + barrierW; x < W - 40; x++) {
    const y = cy + 30 * transmission * Math.sin((x * 0.15) - wavePhase);
    x === barrierX + barrierW ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.stroke();

  // Labels
  ctx.fillStyle = "#7F77DD"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText("Incident", 120, cy - 45);
  ctx.fillStyle = "#1D9E75";
  ctx.fillText("Tunnelled", W - 80, cy - 45);

  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace";
  ctx.fillText("Quantum tunnelling: wave function penetrates classically forbidden barrier", W/2, H - 8);
  ctx.textAlign = "left";
}

function drawOrbitals(ctx, W, H, t, controls) {
  const n = controls.n || 2;
  const cx = W / 2, cy = H / 2;

  // Draw nucleus
  const nucGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 12);
  nucGrad.addColorStop(0, "#f09b79");
  nucGrad.addColorStop(1, "#D85A30");
  ctx.beginPath(); ctx.arc(cx, cy, 12, 0, Math.PI * 2);
  ctx.fillStyle = nucGrad; ctx.fill();

  // Draw orbital shells
  for (let shell = 1; shell <= n; shell++) {
    const r = shell * 55;
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255,255,255,0.1)"; ctx.lineWidth = 1; ctx.stroke();

    // Electrons in this shell
    const numElectrons = Math.min(shell * 2, 8);
    for (let e = 0; e < numElectrons; e++) {
      const speed = 1 / shell;
      const angle = (e / numElectrons) * Math.PI * 2 + t * speed;
      const ex = cx + r * Math.cos(angle);
      const ey = cy + r * Math.sin(angle);

      // Electron glow
      const eGrad = ctx.createRadialGradient(ex, ey, 0, ex, ey, 8);
      eGrad.addColorStop(0, "rgba(127,119,221,0.9)");
      eGrad.addColorStop(1, "rgba(127,119,221,0)");
      ctx.beginPath(); ctx.arc(ex, ey, 8, 0, Math.PI * 2);
      ctx.fillStyle = eGrad; ctx.fill();

      ctx.beginPath(); ctx.arc(ex, ey, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#7F77DD"; ctx.fill();
    }

    // Shell label
    ctx.fillStyle = "rgba(255,255,255,0.3)"; ctx.font = "10px monospace"; ctx.textAlign = "center";
    ctx.fillText("n=" + shell, cx + r + 12, cy + 4);
  }

  // Orbital shape hint for current shell
  const orbitalTypes = ["s", "p", "d", "f", "g"];
  const orbType = orbitalTypes[Math.min(n-1, 4)];

  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText("n=" + n + "  orbital type: " + orbType + "  |  electrons: " + (n <= 4 ? [2,8,18,32][n-1] : "32+"), W/2, H - 8);
  ctx.textAlign = "left";
}
`;

module.exports = code;