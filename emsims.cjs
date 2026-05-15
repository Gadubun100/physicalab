const code = `
function drawBfield(ctx, W, H, t, controls) {
  const cx = W / 2, cy = H / 2;
  const wireY = cy;

  // Wire
  ctx.strokeStyle = "#F2C94C"; ctx.lineWidth = 6;
  ctx.beginPath(); ctx.moveTo(60, wireY); ctx.lineTo(W - 60, wireY); ctx.stroke();
  ctx.fillStyle = "#F2C94C"; ctx.font = "11px monospace"; ctx.textAlign = "left";
  ctx.fillText("Current I ->", 70, wireY - 12);

  // Circular field lines around wire
  const numRings = 5;
  for (let r = 1; r <= numRings; r++) {
    const radius = r * 30;
    const alpha = 1 - r * 0.18;
    ctx.beginPath(); ctx.arc(cx, wireY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(127,119,221," + alpha + ")"; ctx.lineWidth = 1.5; ctx.stroke();

    // Animated arrow showing field direction
    const arrowAngle = (t * 1.5 + r * 0.5) % (Math.PI * 2);
    const ax = cx + radius * Math.cos(arrowAngle);
    const ay = wireY + radius * Math.sin(arrowAngle);
    const tangentAngle = arrowAngle + Math.PI / 2;
    ctx.fillStyle = "rgba(127,119,221," + alpha + ")";
    ctx.beginPath();
    ctx.moveTo(ax + 8 * Math.cos(tangentAngle), ay + 8 * Math.sin(tangentAngle));
    ctx.lineTo(ax - 6 * Math.cos(tangentAngle - 0.5), ay - 6 * Math.sin(tangentAngle - 0.5));
    ctx.lineTo(ax - 6 * Math.cos(tangentAngle + 0.5), ay - 6 * Math.sin(tangentAngle + 0.5));
    ctx.fill();
  }

  // Right hand rule illustration
  ctx.fillStyle = "rgba(255,255,255,0.3)"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText("Right-hand rule: thumb = current, fingers = B field", W/2, H - 8);
  ctx.textAlign = "left";
}

function drawFaraday(ctx, W, H, t, controls) {
  const cx = W / 2, cy = H / 2;
  const magnetX = 80 + ((t * 40) % (W * 0.5));
  const coilX = W * 0.65;

  // Magnet
  const mW = 50, mH = 80;
  ctx.fillStyle = "#E85D24";
  ctx.fillRect(magnetX - mW/2, cy - mH/2, mW/2, mH);
  ctx.fillStyle = "#378ADD";
  ctx.fillRect(magnetX, cy - mH/2, mW/2, mH);
  ctx.fillStyle = "#fff"; ctx.font = "bold 14px monospace"; ctx.textAlign = "center";
  ctx.fillText("N", magnetX - mW/4, cy + 5);
  ctx.fillText("S", magnetX + mW/4, cy + 5);

  // Field lines from magnet
  for (let i = -2; i <= 2; i++) {
    const lineY = cy + i * 15;
    const lineAlpha = 1 - Math.abs(i) * 0.2;
    ctx.beginPath();
    ctx.moveTo(magnetX + mW/2, lineY);
    ctx.bezierCurveTo(
      magnetX + mW, lineY,
      coilX - 40, lineY,
      coilX - 20, lineY
    );
    ctx.strokeStyle = "rgba(242,201,76," + lineAlpha + ")";
    ctx.lineWidth = 1.5; ctx.stroke();
  }

  // Coil
  ctx.strokeStyle = "#7F77DD"; ctx.lineWidth = 3;
  for (let i = 0; i < 5; i++) {
    const x = coilX + i * 12;
    ctx.beginPath();
    ctx.ellipse(x, cy, 8, 35, 0, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Induced current indicator
  const emf = Math.sin(t * 2) * 30;
  const barH = Math.abs(emf);
  ctx.fillStyle = emf > 0 ? "#1D9E75" : "#E85D24";
  ctx.fillRect(W - 50, cy - barH, 20, barH * 2);
  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "10px monospace"; ctx.textAlign = "center";
  ctx.fillText("EMF", W - 40, cy + 50);

  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace";
  ctx.fillText("Moving magnet -> changing flux -> induced EMF", W/2, H - 8);
  ctx.textAlign = "left";
}

function drawCircuit(ctx, W, H, t, controls) {
  const cx = W / 2, cy = H / 2;
  const voltage = 12, resistance = 6;
  const current = voltage / resistance;

  const nodes = [
    { x: cx - 160, y: cy - 80 },
    { x: cx + 160, y: cy - 80 },
    { x: cx + 160, y: cy + 80 },
    { x: cx - 160, y: cy + 80 },
  ];

  // Wires
  ctx.strokeStyle = "#F2C94C"; ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(nodes[0].x, nodes[0].y);
  ctx.lineTo(nodes[1].x, nodes[1].y);
  ctx.lineTo(nodes[2].x, nodes[2].y);
  ctx.lineTo(nodes[3].x, nodes[3].y);
  ctx.lineTo(nodes[0].x, nodes[0].y);
  ctx.stroke();

  // Battery symbol
  ctx.strokeStyle = "#E85D24"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(nodes[3].x - 15, cy - 15); ctx.lineTo(nodes[3].x + 15, cy - 15); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(nodes[3].x - 8, cy); ctx.lineTo(nodes[3].x + 8, cy); ctx.stroke();
  ctx.fillStyle = "#E85D24"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText(voltage + "V", nodes[3].x - 28, cy);

  // Resistor symbol (zigzag)
  const ry = nodes[0].y;
  const rx1 = nodes[0].x + 30, rx2 = nodes[1].x - 30;
  ctx.strokeStyle = "#7F77DD"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(rx1, ry);
  for (let i = 0; i < 8; i++) {
    const x = rx1 + (i / 8) * (rx2 - rx1);
    const y = ry + (i % 2 === 0 ? -10 : 10);
    ctx.lineTo(x, y);
  }
  ctx.lineTo(rx2, ry); ctx.stroke();
  ctx.fillStyle = "#7F77DD"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText(resistance + " ohm", cx, ry - 18);

  // Electrons flowing
  const electronCount = 8;
  for (let i = 0; i < electronCount; i++) {
    const phase = ((t * current * 0.3) + i / electronCount) % 1;
    let ex, ey;
    if (phase < 0.25) { ex = nodes[0].x + (nodes[1].x - nodes[0].x) * (phase / 0.25); ey = nodes[0].y; }
    else if (phase < 0.5) { ex = nodes[1].x; ey = nodes[1].y + (nodes[2].y - nodes[1].y) * ((phase - 0.25) / 0.25); }
    else if (phase < 0.75) { ex = nodes[2].x + (nodes[3].x - nodes[2].x) * ((phase - 0.5) / 0.25); ey = nodes[2].y; }
    else { ex = nodes[3].x; ey = nodes[3].y + (nodes[0].y - nodes[3].y) * ((phase - 0.75) / 0.25); }
    ctx.beginPath(); ctx.arc(ex, ey, 5, 0, Math.PI * 2);
    ctx.fillStyle = "#378ADD"; ctx.fill();
  }

  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText("V=" + voltage + "V  R=" + resistance + "ohm  I=" + current.toFixed(1) + "A  P=" + (voltage*current) + "W", W/2, H - 8);
  ctx.textAlign = "left";
}

function drawMaxwell(ctx, W, H, t, controls) {
  const cx = W / 2, cy = H / 2;
  const wavelength = 160;
  const amplitude = 50;

  // E field (vertical)
  ctx.strokeStyle = "#E85D24"; ctx.lineWidth = 2;
  ctx.beginPath();
  for (let x = 40; x < W - 40; x++) {
    const phase = (x - t * 60) / wavelength * Math.PI * 2;
    const y = cy - amplitude * Math.sin(phase);
    x === 40 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.stroke();

  // B field (horizontal - shown as dots/crosses)
  for (let x = 40; x < W - 40; x += 20) {
    const phase = (x - t * 60) / wavelength * Math.PI * 2;
    const bStrength = Math.sin(phase);
    if (bStrength > 0.1) {
      ctx.fillStyle = "rgba(55,138,221," + bStrength + ")";
      ctx.beginPath(); ctx.arc(x, cy, 4, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(x, cy, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = "#378ADD"; ctx.fill();
    } else if (bStrength < -0.1) {
      ctx.strokeStyle = "rgba(55,138,221," + Math.abs(bStrength) + ")";
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(x, cy, 4, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x-3, cy-3); ctx.lineTo(x+3, cy+3); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x+3, cy-3); ctx.lineTo(x-3, cy+3); ctx.stroke();
    }
  }

  // Direction arrow
  ctx.strokeStyle = "#1D9E75"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(cx - 20, H - 30); ctx.lineTo(cx + 20, H - 30); ctx.stroke();
  ctx.fillStyle = "#1D9E75";
  ctx.beginPath(); ctx.moveTo(cx + 28, H - 30); ctx.lineTo(cx + 18, H - 35); ctx.lineTo(cx + 18, H - 25); ctx.fill();

  // Labels
  ctx.fillStyle = "#E85D24"; ctx.font = "11px monospace"; ctx.textAlign = "left";
  ctx.fillText("E field", W - 80, cy - amplitude - 8);
  ctx.fillStyle = "#378ADD"; ctx.fillText("B field", W - 80, cy + 20);
  ctx.fillStyle = "#1D9E75"; ctx.fillText("c ->", cx - 10, H - 38);

  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText("EM wave: E and B fields oscillate perpendicular to each other and to direction of travel", W/2, H - 8);
  ctx.textAlign = "left";
}
`;

module.exports = code;