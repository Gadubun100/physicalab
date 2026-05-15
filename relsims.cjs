const code = `
function drawTimedilation(ctx, W, H, t, controls) {
  const beta = (controls.velocity || 80) / 100;
  const gamma = 1 / Math.sqrt(1 - beta * beta);
  const cx1 = W * 0.28, cx2 = W * 0.72, cy = H / 2;

  [{ cx: cx1, speed: 1, col: "#1D9E75", label: "Stationary", sub: "t = t" },
   { cx: cx2, speed: 1/gamma, col: "#378ADD", label: "Moving v=" + (beta*100).toFixed(0) + "%c", sub: "t' = t/gamma" }
  ].forEach(function(clock) {
    const angle = (t * clock.speed) % (Math.PI * 2);
    ctx.beginPath(); ctx.arc(clock.cx, cy, 55, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(20,20,30,0.9)"; ctx.fill();
    ctx.strokeStyle = clock.col; ctx.lineWidth = 2.5; ctx.stroke();

    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(clock.cx + Math.cos(a) * 46, cy + Math.sin(a) * 46);
      ctx.lineTo(clock.cx + Math.cos(a) * 52, cy + Math.sin(a) * 52);
      ctx.strokeStyle = "rgba(255,255,255,0.3)"; ctx.lineWidth = 1; ctx.stroke();
    }

    ctx.strokeStyle = clock.col; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(clock.cx, cy);
    ctx.lineTo(clock.cx + Math.sin(angle) * 40, cy - Math.cos(angle) * 40); ctx.stroke();

    ctx.strokeStyle = "rgba(255,255,255,0.2)"; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(clock.cx, cy);
    ctx.lineTo(clock.cx + Math.sin(angle * 12) * 22, cy - Math.cos(angle * 12) * 22); ctx.stroke();

    ctx.fillStyle = clock.col; ctx.font = "12px monospace"; ctx.textAlign = "center";
    ctx.fillText(clock.label, clock.cx, cy + 70);
    ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "10px monospace";
    ctx.fillText(clock.sub, clock.cx, cy + 85);
  });

  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText("v=" + (beta*100).toFixed(0) + "%c  gamma=" + gamma.toFixed(3) + "  Moving clock ticks " + gamma.toFixed(2) + "x slower", W/2, H - 8);
  ctx.textAlign = "left";
}

function drawLengthcontraction(ctx, W, H, t, controls) {
  const beta = (controls.velocity || 80) / 100;
  const gamma = 1 / Math.sqrt(1 - beta * beta);
  const cy = H / 2;

  // Rest frame spaceship
  const restL = 200;
  const contractedL = restL / gamma;

  ctx.fillStyle = "rgba(255,255,255,0.1)";
  ctx.fillRect(W/2 - restL/2, cy - 60, restL, 30);
  ctx.strokeStyle = "#1D9E75"; ctx.lineWidth = 2;
  ctx.strokeRect(W/2 - restL/2, cy - 60, restL, 30);
  ctx.fillStyle = "#1D9E75"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText("Rest length L0 = " + restL + "m", W/2, cy - 35);
  ctx.fillText("Stationary frame", W/2, cy - 68);

  // Contracted spaceship
  ctx.fillStyle = "rgba(55,138,221,0.15)";
  ctx.fillRect(W/2 - contractedL/2, cy + 20, contractedL, 30);
  ctx.strokeStyle = "#378ADD"; ctx.lineWidth = 2;
  ctx.strokeRect(W/2 - contractedL/2, cy + 20, contractedL, 30);
  ctx.fillStyle = "#378ADD"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText("Contracted L = " + contractedL.toFixed(1) + "m", W/2, cy + 43);
  ctx.fillText("Moving frame v=" + (beta*100).toFixed(0) + "%c", W/2, cy + 14);

  // Measurement arrows
  ctx.strokeStyle = "#1D9E75"; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(W/2 - restL/2, cy - 15); ctx.lineTo(W/2 + restL/2, cy - 15); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(W/2 - restL/2, cy - 20); ctx.lineTo(W/2 - restL/2, cy - 10); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(W/2 + restL/2, cy - 20); ctx.lineTo(W/2 + restL/2, cy - 10); ctx.stroke();

  ctx.strokeStyle = "#378ADD"; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(W/2 - contractedL/2, cy + 58); ctx.lineTo(W/2 + contractedL/2, cy + 58); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(W/2 - contractedL/2, cy + 53); ctx.lineTo(W/2 - contractedL/2, cy + 63); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(W/2 + contractedL/2, cy + 53); ctx.lineTo(W/2 + contractedL/2, cy + 63); ctx.stroke();

  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText("L = L0/gamma = " + restL + "/" + gamma.toFixed(2) + " = " + contractedL.toFixed(1) + "m  (" + (100/gamma).toFixed(0) + "% of rest length)", W/2, H - 8);
  ctx.textAlign = "left";
}

function drawEmc2(ctx, W, H, t, controls) {
  const beta = (controls.velocity || 80) / 100;
  const gamma = 1 / Math.sqrt(1 - beta * beta);
  const cx = W / 2, cy = H / 2;

  // Energy diagram
  const restE = 100;
  const totalE = restE * gamma;
  const kineticE = totalE - restE;

  const barX = cx - 100, barW = 200;

  // Rest energy bar
  const restH = (restE / totalE) * (H - 120);
  ctx.fillStyle = "#378ADD";
  ctx.fillRect(barX, cy + 40 - restH, barW * 0.45, restH);
  ctx.fillStyle = "rgba(255,255,255,0.8)"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText("Rest", barX + barW * 0.22, cy + 55);
  ctx.fillText("E=mc2", barX + barW * 0.22, cy + 68);

  // Total energy bar
  const totalH = H - 120;
  ctx.fillStyle = "#E85D24";
  ctx.fillRect(barX + barW * 0.55, cy + 40 - totalH, barW * 0.45, kineticE / totalE * totalH);
  ctx.fillStyle = "#378ADD";
  ctx.fillRect(barX + barW * 0.55, cy + 40 - restH, barW * 0.45, restH);
  ctx.fillStyle = "rgba(255,255,255,0.8)"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText("Total", barX + barW * 0.77, cy + 55);
  ctx.fillText("E=ymc2", barX + barW * 0.77, cy + 68);

  // KE label
  ctx.fillStyle = "#E85D24"; ctx.font = "10px monospace";
  ctx.fillText("KE", barX + barW * 0.77, cy + 40 - totalH/2 - 10);

  // E=mc2 visual
  ctx.fillStyle = "#F2C94C"; ctx.font = "bold 28px monospace"; ctx.textAlign = "center";
  ctx.fillText("E = mc2", cx, 50);

  // Values
  ctx.fillStyle = "rgba(255,255,255,0.5)"; ctx.font = "12px monospace";
  ctx.fillText("gamma = " + gamma.toFixed(3), cx, 80);
  ctx.fillText("Total E = " + gamma.toFixed(2) + " x mc2", cx, 100);

  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace";
  ctx.fillText("v=" + (beta*100).toFixed(0) + "%c  KE = (gamma-1)mc2 = " + (kineticE/restE).toFixed(2) + "mc2", W/2, H - 8);
  ctx.textAlign = "left";
}

function drawSpacetime(ctx, W, H, t, controls) {
  const beta = (controls.velocity || 80) / 100;
  const cx = W * 0.35, cy = H * 0.7;
  const scale = Math.min(W, H) * 0.3;

  // Axes
  ctx.strokeStyle = "rgba(255,255,255,0.4)"; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(cx, 20); ctx.lineTo(cx, H - 20); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(20, cy); ctx.lineTo(W * 0.65, cy); ctx.stroke();
  ctx.fillStyle = "rgba(255,255,255,0.5)"; ctx.font = "12px monospace"; ctx.textAlign = "center";
  ctx.fillText("t (time)", cx + 15, 30);
  ctx.textAlign = "left"; ctx.fillText("x (space)", W * 0.6, cy - 8);

  // Light cone (45 degrees)
  ctx.strokeStyle = "#F2C94C"; ctx.lineWidth = 2; ctx.setLineDash([5,5]);
  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + scale, cy - scale); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx - scale, cy - scale); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = "#F2C94C"; ctx.font = "10px monospace"; ctx.textAlign = "left";
  ctx.fillText("light cone", cx + 5, cy - scale + 10);

  // Worldlines
  ctx.strokeStyle = "#1D9E75"; ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx, cy - scale); ctx.stroke();
  ctx.fillStyle = "#1D9E75"; ctx.fillText("stationary", cx + 5, cy - scale/2);

  const angle = Math.atan(beta);
  ctx.strokeStyle = "#378ADD"; ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + scale * Math.sin(angle), cy - scale * Math.cos(angle)); ctx.stroke();
  ctx.fillStyle = "#378ADD"; ctx.fillText("moving", cx + scale * Math.sin(angle) + 5, cy - scale * Math.cos(angle) + 10);

  // Future/past regions
  ctx.fillStyle = "rgba(29,158,117,0.05)";
  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + scale, cy - scale); ctx.lineTo(cx, cy - scale); ctx.lineTo(cx - scale, cy - scale); ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.2)"; ctx.font = "10px monospace"; ctx.textAlign = "center";
  ctx.fillText("Future", cx, cy - scale * 0.8);

  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace";
  ctx.fillText("Spacetime diagram  |  Worldlines show paths through spacetime  |  Light cone defines causality", W/2, H - 8);
  ctx.textAlign = "left";
}

function drawLorentz(ctx, W, H, t, controls) {
  const beta = (controls.velocity || 80) / 100;
  const gamma = 1 / Math.sqrt(1 - beta * beta);
  const cx = W / 2, cy = H / 2;

  // Grid showing Lorentz transformation
  const gridSize = 50;
  const cols = 5, rows = 5;

  // Original grid (S frame)
  ctx.strokeStyle = "rgba(29,158,117,0.3)"; ctx.lineWidth = 1;
  for (let i = -cols; i <= cols; i++) {
    ctx.beginPath();
    ctx.moveTo(cx + i * gridSize, cy - rows * gridSize);
    ctx.lineTo(cx + i * gridSize, cy + rows * gridSize);
    ctx.stroke();
  }
  for (let j = -rows; j <= rows; j++) {
    ctx.beginPath();
    ctx.moveTo(cx - cols * gridSize, cy + j * gridSize);
    ctx.lineTo(cx + cols * gridSize, cy + j * gridSize);
    ctx.stroke();
  }

  // Transformed grid (S' frame) - sheared
  ctx.strokeStyle = "rgba(55,138,221,0.4)"; ctx.lineWidth = 1;
  const shear = beta;
  for (let i = -cols; i <= cols; i++) {
    ctx.beginPath();
    ctx.moveTo(cx + i * gridSize / gamma, cy - rows * gridSize);
    ctx.lineTo(cx + i * gridSize / gamma + shear * rows * gridSize, cy + rows * gridSize);
    ctx.stroke();
  }
  for (let j = -rows; j <= rows; j++) {
    ctx.beginPath();
    ctx.moveTo(cx - cols * gridSize, cy + j * gridSize / gamma);
    ctx.lineTo(cx + cols * gridSize, cy + j * gridSize / gamma + shear * cols * gridSize * 0);
    ctx.stroke();
  }

  // Labels
  ctx.fillStyle = "#1D9E75"; ctx.font = "11px monospace"; ctx.textAlign = "left";
  ctx.fillText("S frame (green)", 20, 30);
  ctx.fillStyle = "#378ADD";
  ctx.fillText("S' frame (blue) v=" + (beta*100).toFixed(0) + "%c", 20, 48);

  // Moving event point
  const eventX = cx + Math.sin(t * 0.5) * 100;
  const eventY = cy - 50;
  ctx.beginPath(); ctx.arc(eventX, eventY, 7, 0, Math.PI * 2);
  ctx.fillStyle = "#F2C94C"; ctx.fill();
  ctx.fillStyle = "#F2C94C"; ctx.font = "10px monospace"; ctx.textAlign = "center";
  ctx.fillText("event", eventX, eventY - 12);

  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace";
  ctx.fillText("Lorentz: x'=gamma(x-vt)  t'=gamma(t-vx/c2)  gamma=" + gamma.toFixed(2), W/2, H - 8);
  ctx.textAlign = "left";
}
`;

module.exports = code;