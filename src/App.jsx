import { useState, useEffect, useRef } from "react";

const topics = {
  mechanics: {
    title: "Classical Mechanics", icon: "⚙", color: "#378ADD",
    subtopics: ["Projectile Motion", "Newton's Laws", "Simple Harmonic Motion", "Circular Motion", "Momentum & Collisions"],
    equations: "x = v₀cosθ·t  |  y = v₀sinθ·t − ½gt²  |  R = v₀²sin2θ/g",
    controls: [
      { id: "angle", label: "Launch Angle", min: 10, max: 80, val: 45, unit: "°" },
      { id: "speed", label: "Initial Speed", min: 10, max: 50, val: 25, unit: " m/s" },
    ],
  },
  waves: {
    title: "Waves & Optics", icon: "〜", color: "#1D9E75",
    subtopics: ["Wave Superposition", "Sound & Doppler", "Reflection & Refraction", "Diffraction", "Polarisation"],
    equations: "y = A·sin(kx−ωt)  |  λ = v/f  |  I ∝ A²",
    controls: [
      { id: "freq1", label: "Wave 1 Frequency", min: 1, max: 6, val: 2, unit: " Hz" },
      { id: "freq2", label: "Wave 2 Frequency", min: 1, max: 6, val: 3, unit: " Hz" },
    ],
  },
  thermo: {
    title: "Thermodynamics", icon: "🌡", color: "#BA7517",
    subtopics: ["Kinetic Gas Theory", "Heat Transfer", "Entropy", "Carnot Cycle", "Ideal Gas Law"],
    equations: "PV = nRT  |  KE = ½mv²  |  Q = mcΔT",
    controls: [{ id: "temp", label: "Temperature", min: 50, max: 500, val: 200, unit: " K" }],
  },
  em: {
    title: "Electromagnetism", icon: "⚡", color: "#7F77DD",
    subtopics: ["Electric Fields", "Magnetic Fields", "Faraday's Law", "AC/DC Circuits", "Maxwell's Equations"],
    equations: "F = kq₁q₂/r²  |  E = F/q  |  V = IR",
    controls: [{ id: "charge", label: "Charge", min: -3, max: 3, val: 2, unit: "e" }],
  },
  quantum: {
    title: "Quantum Physics", icon: "◇", color: "#D85A30",
    subtopics: ["Wave-Particle Duality", "Uncertainty Principle", "Schrödinger Equation", "Quantum Tunnelling", "Atomic Orbitals"],
    equations: "ψ(x,t)  |  P = |ψ|²  |  ΔxΔp ≥ ℏ/2",
    controls: [{ id: "n", label: "Energy Level (n)", min: 1, max: 5, val: 2, unit: "" }],
  },
  relativity: {
    title: "Special Relativity", icon: "∞", color: "#D4537E",
    subtopics: ["Time Dilation", "Length Contraction", "E = mc²", "Spacetime Diagrams", "Lorentz Transformation"],
    equations: "t' = t/√(1−v²/c²)  |  E = mc²  |  L' = L√(1−v²/c²)",
    controls: [{ id: "velocity", label: "Velocity", min: 1, max: 99, val: 80, unit: "% c" }],
  },
  nuclear: {
    title: "Nuclear Physics", icon: "◎", color: "#639922",
    subtopics: ["Radioactive Decay", "Half-Life", "Nuclear Fission", "Nuclear Fusion", "Binding Energy"],
    equations: "N(t) = N₀e^(−λt)  |  T½ = ln2/λ  |  ΔE = Δmc²",
    controls: [{ id: "halflife", label: "Half-Life", min: 1, max: 10, val: 4, unit: " s" }],
  },
};

const TOPIC_KEYS = Object.keys(topics);

function SimCanvas({ topicKey, controls }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const timeRef = useRef(0);
  const particlesRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    particlesRef.current = null;
    timeRef.current = 0;
    function loop() {
      timeRef.current += 0.016;
      const t = timeRef.current, W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      if (topicKey === "mechanics") drawMechanics(ctx, W, H, t, controls);
      else if (topicKey === "waves") drawWaves(ctx, W, H, t, controls);
      else if (topicKey === "thermo") drawThermo(ctx, W, H, t, canvas, particlesRef, controls);
      else if (topicKey === "em") drawEM(ctx, W, H, t, controls);
      else if (topicKey === "quantum") drawQuantum(ctx, W, H, t, controls);
      else if (topicKey === "relativity") drawRelativity(ctx, W, H, t, controls);
      else if (topicKey === "nuclear") drawNuclear(ctx, W, H, t, controls);
      animRef.current = requestAnimationFrame(loop);
    }
    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [topicKey, controls]);
  return <canvas ref={canvasRef} width={620} height={300} style={{ width: "100%", height: "100%", display: "block" }} />;
}

function drawMechanics(ctx, W, H, t, controls) {
  const g = 9.8, v0 = controls.speed || 25;
  const angle = ((controls.angle || 45) * Math.PI) / 180;
  const vx = v0 * Math.cos(angle), vy = v0 * Math.sin(angle);
  const maxRange = (v0 * v0 * Math.sin(2 * angle)) / g;
  const maxHeight = (vy * vy) / (2 * g);
  const totalTime = (2 * vy) / g;
  const sx = W * 0.06, sy = H - 50;
  const scaleX = (W - 80) / maxRange, scaleY = (H - 100) / Math.max(maxHeight, 1);
  ctx.strokeStyle = "rgba(59,139,212,0.2)"; ctx.lineWidth = 1.5; ctx.setLineDash([4, 4]);
  ctx.beginPath();
  for (let tt = 0; tt <= totalTime; tt += 0.02) {
    const px = sx + vx * tt * scaleX, py = sy - (vy * tt - 0.5 * g * tt * tt) * scaleY;
    tt === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
  }
  ctx.stroke(); ctx.setLineDash([]);
  ctx.strokeStyle = "rgba(255,255,255,0.15)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(sx - 10, sy); ctx.lineTo(W - 40, sy); ctx.stroke();
  const phase = t % (totalTime + 1.5), ballT = Math.max(0, Math.min(phase, totalTime));
  const bx = sx + vx * ballT * scaleX, by = sy - (vy * ballT - 0.5 * g * ballT * ballT) * scaleY;
  if (phase <= totalTime) {
    ctx.beginPath(); ctx.strokeStyle = "rgba(59,139,212,0.6)"; ctx.lineWidth = 2;
    for (let tt = 0; tt <= ballT; tt += 0.04) {
      const px = sx + vx * tt * scaleX, py = sy - (vy * tt - 0.5 * g * tt * tt) * scaleY;
      tt === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.stroke();
    const grad = ctx.createRadialGradient(bx - 2, by - 2, 1, bx, by, 10);
    grad.addColorStop(0, "#5ba8e8"); grad.addColorStop(1, "#185FA5");
    ctx.beginPath(); ctx.arc(bx, by, 10, 0, Math.PI * 2); ctx.fillStyle = grad; ctx.fill();
  }
  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "12px monospace";
  ctx.fillText(`Range: ${maxRange.toFixed(1)}m`, sx, H - 18);
  ctx.fillText(`Max Height: ${maxHeight.toFixed(1)}m`, sx + 160, H - 18);
  ctx.fillText(`θ=${controls.angle || 45}°  v₀=${v0}m/s`, sx + 360, H - 18);
}

function drawWaves(ctx, W, H, t, controls) {
  const f1 = controls.freq1 || 2, f2 = controls.freq2 || 3;
  const rows = [
    { y: H * 0.25, f: f1, col: "#378ADD", lbl: `Wave 1 (f=${f1}Hz)` },
    { y: H * 0.55, f: f2, col: "#1D9E75", lbl: `Wave 2 (f=${f2}Hz)` },
    { y: H * 0.82, f: null, col: "#E85D24", lbl: "Superposition" },
  ];
  const A = 28, pad = 50;
  rows.forEach((row) => {
    ctx.strokeStyle = "rgba(255,255,255,0.07)"; ctx.lineWidth = 0.5;
    ctx.beginPath(); ctx.moveTo(pad, row.y); ctx.lineTo(W - 20, row.y); ctx.stroke();
    ctx.beginPath(); ctx.strokeStyle = row.col; ctx.lineWidth = 2;
    for (let x = pad; x < W - 20; x++) {
      const xn = (x - pad) / (W - 20 - pad);
      const y = row.f
        ? row.y + A * Math.sin(2 * Math.PI * row.f * xn - t * row.f * 1.5)
        : row.y + A * (Math.sin(2 * Math.PI * f1 * xn - t * f1 * 1.5) + Math.sin(2 * Math.PI * f2 * xn - t * f2 * 1.5)) * 0.5;
      x === pad ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.font = "11px monospace"; ctx.fillStyle = row.col;
    ctx.fillText(row.lbl, pad + 4, row.y - A - 6);
  });
}

function drawThermo(ctx, W, H, t, canvas, particlesRef, controls) {
  const temp = controls.temp || 200, N = 28;
  if (!particlesRef.current) {
    particlesRef.current = Array.from({ length: N }, () => ({
      x: 44 + Math.random() * (W - 88), y: 34 + Math.random() * (H - 68),
      vx: (Math.random() - 0.5) * 2, vy: (Math.random() - 0.5) * 2,
    }));
  }
  const spd = temp / 150;
  particlesRef.current.forEach((p) => {
    p.x += p.vx * spd; p.y += p.vy * spd;
    if (p.x < 44 || p.x > W - 44) p.vx *= -1;
    if (p.y < 34 || p.y > H - 34) p.vy *= -1;
  });
  ctx.strokeStyle = "rgba(255,255,255,0.2)"; ctx.lineWidth = 1.5;
  ctx.strokeRect(40, 30, W - 80, H - 60);
  const r = Math.min(255, Math.floor(temp * 0.5)), b = Math.max(0, 200 - Math.floor(temp * 0.4));
  particlesRef.current.forEach((p) => {
    const g2 = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 7);
    g2.addColorStop(0, `rgba(${r},120,${b},0.9)`); g2.addColorStop(1, `rgba(${r},60,${b},0)`);
    ctx.beginPath(); ctx.arc(p.x, p.y, 7, 0, Math.PI * 2); ctx.fillStyle = g2; ctx.fill();
  });
  ctx.font = "12px monospace"; ctx.fillStyle = "rgba(255,255,255,0.45)"; ctx.textAlign = "center";
  ctx.fillText(`T = ${temp}K  |  Average KE = ${(1.5 * 1.38e-23 * temp * 6.022e23 / 1000).toFixed(2)} J/mol`, W / 2, H - 8);
  ctx.textAlign = "left";
}

function drawEM(ctx, W, H, t, controls) {
  const q = controls.charge !== undefined ? controls.charge : 2;
  const cx = W / 2, cy = H / 2, nLines = 12;
  if (q === 0) {
    ctx.fillStyle = "rgba(255,255,255,0.3)"; ctx.font = "14px monospace"; ctx.textAlign = "center";
    ctx.fillText("Charge = 0, no field", cx, cy); ctx.textAlign = "left"; return;
  }
  for (let i = 0; i < nLines; i++) {
    ctx.beginPath();
    ctx.strokeStyle = q > 0 ? "rgba(232,93,36,0.65)" : "rgba(59,139,212,0.65)";
    ctx.lineWidth = 1.2; let px = cx, py = cy; ctx.moveTo(px, py);
    for (let s = 0; s < 55; s++) {
      const dx = px - cx, dy = py - cy, r2 = dx * dx + dy * dy || 0.01;
      const fx = (q * dx) / r2, fy = (q * dy) / r2, fm = Math.sqrt(fx * fx + fy * fy);
      px += (fx / fm) * 6; py += (fy / fm) * 6;
      if (px < 5 || px > W - 5 || py < 5 || py > H - 5) break;
      ctx.lineTo(px, py);
    }
    ctx.stroke();
  }
  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 22);
  grad.addColorStop(0, q > 0 ? "#f09b79" : "#85b7eb");
  grad.addColorStop(1, q > 0 ? "#D85A30" : "#185FA5");
  ctx.beginPath(); ctx.arc(cx, cy, 22, 0, Math.PI * 2); ctx.fillStyle = grad; ctx.fill();
  ctx.font = "16px sans-serif"; ctx.fillStyle = "#fff"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillText(q > 0 ? "+" : "−", cx, cy); ctx.textBaseline = "alphabetic";
  ctx.font = "12px monospace"; ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.textAlign = "center";
  ctx.fillText(`q = ${q}e  |  ${q > 0 ? "Positive — field points outward" : "Negative — field points inward"}`, W / 2, H - 10);
  ctx.textAlign = "left";
}

function drawQuantum(ctx, W, H, t, controls) {
  const n = controls.n || 2, L = W - 80, ox = 40, midY = H / 2;
  ctx.strokeStyle = "rgba(255,255,255,0.25)"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(ox, midY - 80); ctx.lineTo(ox, midY + 80); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(ox + L, midY - 80); ctx.lineTo(ox + L, midY + 80); ctx.stroke();
  ctx.beginPath(); ctx.strokeStyle = "#7F77DD"; ctx.lineWidth = 2;
  for (let i = 0; i <= 200; i++) {
    const x = ox + (i / 200) * L, psi = 60 * Math.sin((n * Math.PI * i) / 200);
    i === 0 ? ctx.moveTo(x, midY - psi) : ctx.lineTo(x, midY - psi);
  }
  ctx.stroke();
  ctx.beginPath(); ctx.strokeStyle = "rgba(232,93,36,0.7)"; ctx.lineWidth = 1.5;
  for (let i = 0; i <= 200; i++) {
    const x = ox + (i / 200) * L, psi = Math.sin((n * Math.PI * i) / 200);
    i === 0 ? ctx.moveTo(x, midY + psi * psi * 40) : ctx.lineTo(x, midY + psi * psi * 40);
  }
  ctx.stroke();
  const ptX = ox + ((Math.sin(t * 0.5) + 1) / 2) * L;
  const ptPsi = 60 * Math.sin((n * Math.PI * (ptX - ox)) / L);
  ctx.beginPath(); ctx.arc(ptX, midY - ptPsi, 5, 0, Math.PI * 2); ctx.fillStyle = "#7F77DD"; ctx.fill();
  ctx.font = "11px monospace";
  ctx.fillStyle = "#7F77DD"; ctx.fillText("ψ(x)", 8, midY - 50);
  ctx.fillStyle = "rgba(232,93,36,0.85)"; ctx.fillText("|ψ|²", 8, midY + 55);
  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.textAlign = "center";
  ctx.fillText(`n = ${n}  |  ${n} antinode${n > 1 ? "s" : ""}  |  Particle in a box`, W / 2, H - 10);
  ctx.textAlign = "left";
}

function drawRelativity(ctx, W, H, t, controls) {
  const beta = (controls.velocity || 80) / 100, gamma = 1 / Math.sqrt(1 - beta * beta);
  const cx1 = W * 0.28, cx2 = W * 0.72, cy = H / 2;
  [{ cx: cx1, angle: t % (Math.PI * 2), col: "#1D9E75", label: "Stationary", sub: "" },
   { cx: cx2, angle: (t % (Math.PI * 2)) / gamma, col: "#378ADD", label: "Moving", sub: `×1/${gamma.toFixed(2)} slower` }
  ].forEach(({ cx, angle, col, label, sub }) => {
    ctx.beginPath(); ctx.arc(cx, cy, 55, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(20,20,30,0.85)"; ctx.fill();
    ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.stroke();
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(a) * 47, cy + Math.sin(a) * 47);
      ctx.lineTo(cx + Math.cos(a) * 52, cy + Math.sin(a) * 52);
      ctx.strokeStyle = "rgba(255,255,255,0.2)"; ctx.lineWidth = 1; ctx.stroke();
    }
    ctx.beginPath(); ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.sin(angle) * 42, cy - Math.cos(angle) * 42);
    ctx.strokeStyle = col; ctx.lineWidth = 2.5; ctx.stroke();
    ctx.font = "12px sans-serif"; ctx.fillStyle = col; ctx.textAlign = "center";
    ctx.fillText(label, cx, cy + 72);
    if (sub) { ctx.font = "11px monospace"; ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.fillText(sub, cx, cy + 88); }
  });
  ctx.font = "12px monospace"; ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.textAlign = "center";
  ctx.fillText(`v = ${controls.velocity || 80}% c  |  γ = ${gamma.toFixed(3)}  |  t' = t / ${gamma.toFixed(2)}`, W / 2, H - 10);
  ctx.textAlign = "left";
}

function drawNuclear(ctx, W, H, t, controls) {
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
  const gx = W * 0.58, gy = 28;
  ctx.font = "11px monospace"; ctx.textAlign = "left"; ctx.fillStyle = "rgba(255,255,255,0.4)";
  ctx.fillText(`Remaining: ${Ncur} / ${N0}`, gx, gy);
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
  ctx.fillText(`T½ = ${T12}s  |  λ = ${lambda.toFixed(3)}/s`, ox + cw / 2, H - 10);
  ctx.textAlign = "left";
}

function AskAI({ topic }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  useEffect(() => {
    setMessages([{ role: "assistant", text: `Hi! I'm your physics tutor. Ask me anything about ${topic.title} — concepts, equations, or how the simulation works.` }]);
  }, [topic]);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);
  async function send() {
    if (!input.trim() || loading) return;
    const question = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-5", max_tokens: 1000,
          system: `You are a concise physics tutor in an interactive learning app. The student is studying "${topic.title}". Key equations: ${topic.equations}. Answer in 2-3 short paragraphs. Be clear and use simple analogies. No markdown headers or bullet lists.`,
          messages: [{ role: "user", content: question }],
        }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", text: data.content?.[0]?.text || "Sorry, I couldn't get a response." }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", text: "Connection error. Please try again." }]);
    }
    setLoading(false);
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: 16 }}>
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10, marginBottom: 12 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ padding: "10px 14px", borderRadius: 10, fontSize: 13, lineHeight: 1.6, maxWidth: "85%", alignSelf: m.role === "user" ? "flex-end" : "flex-start", background: m.role === "user" ? "#378ADD" : "rgba(255,255,255,0.07)", color: m.role === "user" ? "#fff" : "rgba(255,255,255,0.85)", borderLeft: m.role === "assistant" ? "2px solid #378ADD" : "none" }}>{m.text}</div>
        ))}
        {loading && <div style={{ padding: "10px 14px", borderRadius: 10, fontSize: 13, background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.4)", alignSelf: "flex-start", borderLeft: "2px solid #378ADD" }}>Thinking...</div>}
        <div ref={bottomRef} />
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Ask a question about this topic..." style={{ flex: 1, padding: "9px 14px", borderRadius: 8, border: "0.5px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.05)", color: "#fff", fontSize: 13, fontFamily: "system-ui, sans-serif", outline: "none" }} />
        <button onClick={send} disabled={loading} style={{ padding: "9px 18px", borderRadius: 8, border: "none", background: "#378ADD", color: "#fff", fontSize: 13, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1 }}>Ask</button>
      </div>
    </div>
  );
}function Quiz({ topic, onComplete }) {
  const [stage, setStage] = useState("start");
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  async function startQuiz() {
    setStage("loading"); setScore(0); setResults([]); setCurrent(0);
    try {
      const res = await fetch("/api/chat", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-5", max_tokens: 1000,
          system: `You are a physics quiz generator. Generate exactly 3 short answer questions about ${topic.title}. Return ONLY a JSON array with this exact format, no other text: [{"question": "...", "answer": "...", "hint": "..."}]. Keep questions clear and answers concise (1-2 sentences).`,
          messages: [{ role: "user", content: `Generate 3 quiz questions about ${topic.title}. Topics include: ${topic.subtopics.join(", ")}. Key equations: ${topic.equations}` }],
        }),
      });
      const data = await res.json();
      const parsed = JSON.parse((data.content?.[0]?.text || "[]").replace(/```json|```/g, "").trim());
      setQuestions(parsed); setStage("quiz");
    } catch { setStage("error"); }
  }

  async function submitAnswer() {
    if (!answer.trim() || loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-5", max_tokens: 300,
          system: `You are a physics teacher grading a student answer. Be encouraging and fair. Reply with ONLY a JSON object: {"correct": true or false, "feedback": "brief feedback in 1-2 sentences"}`,
          messages: [{ role: "user", content: `Question: ${questions[current].question}\nCorrect answer: ${questions[current].answer}\nStudent answer: ${answer}\nIs the student correct?` }],
        }),
      });
      const data = await res.json();
      const result = JSON.parse((data.content?.[0]?.text || "{}").replace(/```json|```/g, "").trim());
      setFeedback(result.feedback);
      if (result.correct) setScore((s) => s + 1);
      setResults((prev) => [...prev, { question: questions[current].question, answer, correct: result.correct, feedback: result.feedback }]);
      setLoading(false);
      setTimeout(() => {
        if (current + 1 >= questions.length) { setStage("results"); onComplete(); }
        else { setCurrent((c) => c + 1); setAnswer(""); setFeedback(""); }
      }, 2000);
    } catch { setFeedback("Could not grade answer. Please try again."); setLoading(false); }
  }

  if (stage === "start") return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 16, padding: 24 }}>
      <div style={{ fontSize: 32 }}>{topic.icon}</div>
      <div style={{ fontSize: 16, fontWeight: 500, color: "#fff" }}>{topic.title} Quiz</div>
      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", textAlign: "center", maxWidth: 320 }}>Test your knowledge with 3 AI-generated questions. Your answers are graded instantly.</div>
      <button onClick={startQuiz} style={{ padding: "10px 28px", borderRadius: 8, border: "none", background: topic.color, color: "#fff", fontSize: 14, cursor: "pointer", fontFamily: "system-ui, sans-serif", marginTop: 8 }}>Start Quiz</button>
    </div>
  );

  if (stage === "loading") return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "rgba(255,255,255,0.4)", fontSize: 13 }}>Generating questions...</div>
  );

  if (stage === "error") return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 12 }}>
      <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>Could not generate questions. Check your connection.</div>
      <button onClick={() => setStage("start")} style={{ padding: "8px 20px", borderRadius: 8, border: "0.5px solid rgba(255,255,255,0.2)", background: "transparent", color: "#fff", cursor: "pointer", fontSize: 13 }}>Try Again</button>
    </div>
  );

  if (stage === "quiz") return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: 24, gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Question {current + 1} of {questions.length}</span>
        <span style={{ fontSize: 12, color: topic.color }}>Score: {score}/{current}</span>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ fontSize: 15, color: "#fff", lineHeight: 1.6, padding: 16, background: "rgba(255,255,255,0.05)", borderRadius: 10, borderLeft: `2px solid ${topic.color}` }}>{questions[current]?.question}</div>
        {questions[current]?.hint && <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", fontStyle: "italic" }}>Hint: {questions[current].hint}</div>}
        {feedback && (
          <div style={{ fontSize: 13, padding: "10px 14px", borderRadius: 8, lineHeight: 1.6, background: results[results.length - 1]?.correct ? "rgba(29,158,117,0.15)" : "rgba(232,93,36,0.15)", color: results[results.length - 1]?.correct ? "#1D9E75" : "#E85D24", border: `0.5px solid ${results[results.length - 1]?.correct ? "rgba(29,158,117,0.3)" : "rgba(232,93,36,0.3)"}` }}>
            {results[results.length - 1]?.correct ? "✓ Correct! " : "✗ Not quite. "}{feedback}
          </div>
        )}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <input value={answer} onChange={(e) => setAnswer(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submitAnswer()} placeholder="Type your answer..." disabled={!!feedback} style={{ flex: 1, padding: "9px 14px", borderRadius: 8, border: "0.5px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.05)", color: "#fff", fontSize: 13, fontFamily: "system-ui, sans-serif", outline: "none", opacity: feedback ? 0.5 : 1 }} />
        <button onClick={submitAnswer} disabled={!!feedback || loading} style={{ padding: "9px 18px", borderRadius: 8, border: "none", background: topic.color, color: "#fff", fontSize: 13, cursor: feedback || loading ? "not-allowed" : "pointer", opacity: feedback || loading ? 0.6 : 1 }}>
          {loading ? "Grading..." : "Submit"}
        </button>
      </div>
    </div>
  );

  if (stage === "results") return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: 24, gap: 16, overflowY: "auto" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>{score === questions.length ? "🎉" : score >= questions.length / 2 ? "👍" : "📚"}</div>
        <div style={{ fontSize: 20, fontWeight: 500, color: "#fff" }}>{score} / {questions.length}</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>{score === questions.length ? "Perfect score!" : score >= questions.length / 2 ? "Good effort!" : "Keep studying!"}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {results.map((r, i) => (
          <div key={i} style={{ padding: "12px 14px", borderRadius: 10, background: r.correct ? "rgba(29,158,117,0.1)" : "rgba(232,93,36,0.1)", border: `0.5px solid ${r.correct ? "rgba(29,158,117,0.25)" : "rgba(232,93,36,0.25)"}` }}>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>Q{i + 1}: {r.question}</div>
            <div style={{ fontSize: 12, color: r.correct ? "#1D9E75" : "#E85D24" }}>{r.correct ? "✓" : "✗"} Your answer: {r.answer}</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>{r.feedback}</div>
          </div>
        ))}
      </div>
      <button onClick={() => { setStage("start"); setAnswer(""); setFeedback(""); }} style={{ padding: "10px 28px", borderRadius: 8, border: "none", background: topic.color, color: "#fff", fontSize: 13, cursor: "pointer", fontFamily: "system-ui, sans-serif", alignSelf: "center" }}>Try Again</button>
    </div>
  );
}

function Controls({ controls, values, onChange }) {
  return (
    <div style={{ padding: "10px 24px", borderBottom: "0.5px solid rgba(255,255,255,0.08)", display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center", background: "#0d0f14" }}>
      {controls.map((ctrl) => (
        <div key={ctrl.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", minWidth: 100 }}>{ctrl.label}</span>
          <input type="range" min={ctrl.min} max={ctrl.max} value={values[ctrl.id] ?? ctrl.val} onChange={(e) => onChange(ctrl.id, Number(e.target.value))} style={{ width: 120, accentColor: "#378ADD", cursor: "pointer" }} />
          <span style={{ fontSize: 12, fontFamily: "monospace", color: "#fff", minWidth: 48 }}>{values[ctrl.id] ?? ctrl.val}{ctrl.unit}</span>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [activeTopic, setActiveTopic] = useState("mechanics");
  const [activeTab, setActiveTab] = useState("sim");
  const [controlValues, setControlValues] = useState({});
  const [completed, setCompleted] = useState(() => {
    try { return JSON.parse(localStorage.getItem("physicalab_progress") || "[]"); }
    catch { return []; }
  });
  const topic = topics[activeTopic];
  const completedCount = completed.length;
  const totalCount = TOPIC_KEYS.length;

  function markComplete(key) {
    setCompleted((prev) => {
      if (prev.includes(key)) return prev;
      const next = [...prev, key];
      localStorage.setItem("physicalab_progress", JSON.stringify(next));
      return next;
    });
  }

  function switchTopic(key) {
    setActiveTopic(key); setActiveTab("sim"); setControlValues({});
  }

  function handleControlChange(id, value) {
    setControlValues((prev) => ({ ...prev, [id]: value }));
  }

  const currentControls = {};
  topic.controls.forEach((c) => { currentControls[c.id] = controlValues[c.id] ?? c.val; });

  return (
    <div style={{ display: "flex", height: "100vh", background: "#0f1117", color: "#e8eaf0", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ width: 220, borderRight: "0.5px solid rgba(255,255,255,0.1)", display: "flex", flexDirection: "column", background: "#0d0f14" }}>
        <div style={{ padding: "16px 16px 12px" }}>
          <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: -0.3, marginBottom: 12 }}>
            Physica<span style={{ color: "#378ADD" }}>Lab</span>
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 6 }}>Progress: {completedCount} / {totalCount} modules</div>
          <div style={{ height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${(completedCount / totalCount) * 100}%`, background: "#1D9E75", borderRadius: 2, transition: "width .4s" }} />
          </div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "4px 0" }}>
          {TOPIC_KEYS.map((key) => {
            const val = topics[key];
            const done = completed.includes(key);
            return (
              <button key={key} onClick={() => switchTopic(key)} style={{
                width: "100%", display: "flex", alignItems: "center", gap: 10,
                padding: "8px 16px", border: "none",
                background: activeTopic === key ? "rgba(255,255,255,0.07)" : "transparent",
                color: activeTopic === key ? "#fff" : "rgba(255,255,255,0.5)",
                cursor: "pointer", fontSize: 13, fontFamily: "system-ui, sans-serif",
                borderLeft: activeTopic === key ? `2px solid ${val.color}` : "2px solid transparent",
                transition: "all .15s",
              }}>
                <span>{val.icon}</span>
                <span style={{ flex: 1, textAlign: "left" }}>{val.title}</span>
                {done && <span style={{ fontSize: 12, color: "#1D9E75" }}>✓</span>}
              </button>
            );
          })}
        </div>
        {completedCount > 0 && (
          <div style={{ padding: "12px 16px", borderTop: "0.5px solid rgba(255,255,255,0.08)" }}>
            <button onClick={() => { setCompleted([]); localStorage.removeItem("physicalab_progress"); }} style={{ width: "100%", padding: "6px", borderRadius: 6, border: "0.5px solid rgba(255,255,255,0.15)", background: "transparent", color: "rgba(255,255,255,0.35)", fontSize: 11, cursor: "pointer", fontFamily: "system-ui, sans-serif" }}>
              Reset Progress
            </button>
          </div>
        )}
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ padding: "14px 24px", borderBottom: "0.5px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <div style={{ fontSize: 17, fontWeight: 500 }}>{topic.title}</div>
            {completed.includes(activeTopic) && (
              <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 20, background: "rgba(29,158,117,0.15)", color: "#1D9E75", border: "0.5px solid rgba(29,158,117,0.3)" }}>Completed ✓</span>
            )}
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {topic.subtopics.map((s) => (
              <span key={s} style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.55)", border: "0.5px solid rgba(255,255,255,0.1)" }}>{s}</span>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", borderBottom: "0.5px solid rgba(255,255,255,0.08)", padding: "0 24px" }}>
          {["sim", "ask", "quiz"].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: "8px 16px", border: "none", background: "none", cursor: "pointer",
              fontSize: 13, fontFamily: "system-ui, sans-serif",
              color: activeTab === tab ? "#fff" : "rgba(255,255,255,0.4)",
              borderBottom: activeTab === tab ? `2px solid ${topic.color}` : "2px solid transparent",
              transition: "all .15s",
            }}>
              {tab === "sim" ? "Simulation" : tab === "ask" ? "Ask AI" : "Quiz"}
            </button>
          ))}
        </div>

        {activeTab === "sim" && <Controls controls={topic.controls} values={controlValues} onChange={handleControlChange} />}

        <div style={{ flex: 1, overflow: "hidden", background: "#080a0f" }}>
          {activeTab === "sim" ? (
            <SimCanvas key={activeTopic} topicKey={activeTopic} controls={currentControls} />
          ) : activeTab === "ask" ? (
            <AskAI key={activeTopic} topic={topic} />
          ) : (
            <Quiz key={activeTopic} topic={topic} onComplete={() => markComplete(activeTopic)} />
          )}
        </div>

        <div style={{ padding: "8px 24px", borderTop: "0.5px solid rgba(255,255,255,0.08)", background: "#0d0f14", fontSize: 11, color: "rgba(255,255,255,0.3)", fontFamily: "monospace" }}>
          {topic.equations}
        </div>
      </div>
    </div>
  );
}