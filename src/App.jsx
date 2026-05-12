import { useState, useEffect, useRef } from "react";

const BADGE_ICONS = {
  mechanics: "⚙", waves: "〜", thermo: "🌡",
  em: "⚡", quantum: "◇", relativity: "∞", nuclear: "◎", math: "∫"
};

          

    
const topics = {
  mechanics: {
    title: "Classical Mechanics", icon: "⚙", color: "#378ADD",
    badge: "Mechanics Master",
    lessons: [
      {
        id: "projectile", title: "Projectile Motion",
        introduction: "Projectile motion describes how objects move through the air under gravity alone. When you throw a ball, kick a football, or fire a cannon, the object follows a curved path called a parabola. The key insight is that horizontal and vertical motion are completely independent — gravity only affects the vertical direction while horizontal velocity stays constant throughout the flight.",
        keyConcepts: [
          "Horizontal velocity (vx) remains constant throughout the flight — no force acts horizontally",
          "Vertical velocity changes due to gravity (g = 9.8 m/s²) — the object accelerates downward",
          "The range is maximum at exactly 45° launch angle",
          "Time of flight depends only on the vertical component of velocity",
          "The path is always a perfect parabola",
        ],
        workedExample: {
          problem: "A ball is launched at 30 m/s at 45°. Find the range and maximum height.",
          steps: [
            "Find velocity components: vx = 30 × cos(45°) = 21.2 m/s, vy = 30 × sin(45°) = 21.2 m/s",
            "Find time of flight: t = 2vy/g = 2 × 21.2 / 9.8 = 4.33 seconds",
            "Find range: R = vx × t = 21.2 × 4.33 = 91.8 metres",
            "Find max height: H = vy²/2g = 21.2² / (2 × 9.8) = 22.9 metres",
          ],
          answer: "Range = 91.8m, Maximum Height = 22.9m"
        },
        equations: "x = v₀cosθ·t  |  y = v₀sinθ·t − ½gt²  |  R = v₀²sin2θ/g",
        controls: [
          { id: "angle", label: "Launch Angle", min: 10, max: 80, val: 45, unit: "°" },
          { id: "speed", label: "Initial Speed", min: 10, max: 50, val: 25, unit: " m/s" },
        ],
        simKey: "projectile",
      },
      {
        id: "newton", title: "Newton's Laws",
        introduction: "Newton's three laws of motion are the foundation of classical mechanics. They explain why objects move, why they stop, and how forces cause acceleration. Every moving object in everyday life — from a sliding book to a rocket — follows these three rules without exception.",
        keyConcepts: [
          "First Law: An object stays at rest or moves at constant velocity unless acted on by a net force",
          "Second Law: Force equals mass times acceleration (F = ma) — more force means more acceleration",
          "Third Law: Every action has an equal and opposite reaction",
          "Mass and weight are different — mass is the amount of matter, weight is the gravitational force on that mass",
          "Friction is a force that opposes motion between surfaces in contact",
        ],
        workedExample: {
          problem: "A 5kg box is pushed with 20N of force on a surface with 8N of friction. Find the acceleration.",
          steps: [
            "Identify all forces: Applied force = 20N forward, Friction = 8N backward",
            "Find net force: Fnet = 20 - 8 = 12N",
            "Apply Newton's second law: F = ma, so a = F/m",
            "Calculate: a = 12 / 5 = 2.4 m/s²",
          ],
          answer: "Acceleration = 2.4 m/s²"
        },
        equations: "F = ma  |  Fnet = ΣF  |  W = mg",
        controls: [
          { id: "mass", label: "Mass", min: 1, max: 20, val: 5, unit: " kg" },
          { id: "force", label: "Applied Force", min: 0, max: 50, val: 20, unit: " N" },
        ],
        simKey: "newton",
      },
      {
        id: "shm", title: "Simple Harmonic Motion",
        introduction: "Simple Harmonic Motion (SHM) describes any object that oscillates back and forth around an equilibrium position. Springs, pendulums, sound waves, and even atoms vibrate this way. The restoring force always points back toward the centre, which is what creates the rhythmic back-and-forth motion.",
        keyConcepts: [
          "The restoring force is always proportional to displacement and directed toward equilibrium",
          "Amplitude is the maximum displacement from equilibrium",
          "Period (T) is the time for one complete oscillation",
          "For a pendulum, the period depends on length and gravity — not on mass or amplitude",
          "Energy constantly converts between kinetic (motion) and potential (stored) energy",
        ],
        workedExample: {
          problem: "A pendulum is 2 metres long. Find its period on Earth (g = 9.8 m/s²).",
          steps: [
            "Use the pendulum period formula: T = 2π√(L/g)",
            "Substitute values: T = 2π√(2/9.8)",
            "Calculate inside square root: 2/9.8 = 0.204",
            "Take square root: √0.204 = 0.452",
            "Multiply: T = 2π × 0.452 = 2.84 seconds",
          ],
          answer: "Period = 2.84 seconds"
        },
        equations: "T = 2π√(L/g)  |  x = A·cos(ωt)  |  ω = √(k/m)",
        controls: [
          { id: "length", label: "Pendulum Length", min: 1, max: 10, val: 2, unit: " m" },
          { id: "amplitude", label: "Amplitude", min: 10, max: 60, val: 30, unit: "°" },
        ],
        simKey: "shm",
      },
      {
        id: "circular", title: "Circular Motion",
        introduction: "When an object moves in a circle at constant speed, it is constantly changing direction. This change in direction requires a force — called the centripetal force — always pointing toward the centre of the circle. Without this inward force, the object would fly off in a straight line. This is the physics behind orbiting satellites, cars on curved roads, and spinning rides.",
        keyConcepts: [
          "Centripetal force always points toward the centre of the circle",
          "The object's speed can be constant but velocity is always changing — direction changes",
          "Centrifugal force is not a real force — it is the sensation of inertia in a rotating frame",
          "Satellites orbit because gravity provides the centripetal force",
          "Greater speed or smaller radius requires greater centripetal force",
        ],
        workedExample: {
          problem: "A 1000kg car travels at 20 m/s around a bend of radius 50m. Find the centripetal force.",
          steps: [
            "Use the centripetal force formula: F = mv²/r",
            "Substitute values: F = 1000 × 20² / 50",
            "Calculate: F = 1000 × 400 / 50",
            "Simplify: F = 400000 / 50 = 8000N",
          ],
          answer: "Centripetal Force = 8000 N"
        },
        equations: "F = mv²/r  |  a = v²/r  |  v = 2πr/T",
        controls: [
          { id: "speed", label: "Speed", min: 1, max: 20, val: 8, unit: " m/s" },
          { id: "radius", label: "Radius", min: 20, max: 200, val: 80, unit: " m" },
        ],
        simKey: "circular",
      },
      {
        id: "momentum", title: "Momentum & Collisions",
        introduction: "Momentum is the quantity of motion an object has — it depends on both mass and velocity. The law of conservation of momentum states that in any collision, the total momentum before equals the total momentum after, provided no external forces act. This law explains everything from car crashes to rocket propulsion to billiard balls.",
        keyConcepts: [
          "Momentum = mass × velocity (p = mv)",
          "Total momentum is conserved in all collisions",
          "Elastic collisions conserve both momentum and kinetic energy",
          "Inelastic collisions conserve momentum but not kinetic energy — some energy becomes heat or sound",
          "Impulse is the change in momentum — equal to force multiplied by time",
        ],
        workedExample: {
          problem: "A 2kg ball moving at 5 m/s hits a stationary 3kg ball. They stick together. Find their final velocity.",
          steps: [
            "Calculate initial momentum: p = m₁v₁ + m₂v₂ = 2×5 + 3×0 = 10 kg·m/s",
            "After collision they move together with combined mass: m = 2 + 3 = 5kg",
            "Apply conservation of momentum: 10 = 5 × v",
            "Solve for v: v = 10/5 = 2 m/s",
          ],
          answer: "Final velocity = 2 m/s"
        },
        equations: "p = mv  |  p₁ + p₂ = p₁' + p₂'  |  J = FΔt",
        controls: [
          { id: "mass1", label: "Ball 1 Mass", min: 1, max: 10, val: 2, unit: " kg" },
          { id: "mass2", label: "Ball 2 Mass", min: 1, max: 10, val: 3, unit: " kg" },
        ],
        simKey: "momentum",
      },
    ],
  },
  waves: {
    title: "Waves & Optics", icon: "〜", color: "#1D9E75",
    badge: "Wave Wizard",
    lessons: [
      { id: "superposition", title: "Wave Superposition", introduction: "When two waves meet they combine — adding together where they overlap. This is called superposition. Where two peaks meet the amplitude doubles (constructive interference). Where a peak meets a trough they cancel out (destructive interference). This principle explains noise-cancelling headphones, musical harmonics, and the colours in soap bubbles.", keyConcepts: ["When waves meet they add together — this is superposition", "Constructive interference: peaks align, amplitude increases", "Destructive interference: peak meets trough, waves cancel", "The resulting wave pattern depends on the frequencies of both waves", "Beats occur when two similar frequencies interfere — you hear a throbbing sound"], workedExample: { problem: "Two waves have amplitudes of 3m and 4m. Find max and min combined amplitudes.", steps: ["Constructive interference — waves add: 3 + 4 = 7m maximum amplitude", "Destructive interference — waves cancel: 4 - 3 = 1m minimum amplitude"], answer: "Maximum = 7m, Minimum = 1m" }, equations: "y = A·sin(kx−ωt)  |  λ = v/f  |  I ∝ A²", controls: [{ id: "freq1", label: "Wave 1 Frequency", min: 1, max: 6, val: 2, unit: " Hz" }, { id: "freq2", label: "Wave 2 Frequency", min: 1, max: 6, val: 3, unit: " Hz" }], simKey: "waves" },
      { id: "sound", title: "Sound & Doppler", introduction: "Sound is a longitudinal wave — particles vibrate back and forth in the same direction the wave travels. The Doppler effect describes how the pitch of a sound changes when the source or observer is moving. An ambulance siren sounds higher as it approaches and lower as it moves away.", keyConcepts: ["Sound travels as compressions and rarefactions in a medium", "Speed of sound in air is approximately 343 m/s at room temperature", "Frequency determines pitch — higher frequency means higher pitch", "The Doppler effect: moving toward a source increases perceived frequency", "Sound cannot travel through a vacuum — it needs a medium"], workedExample: { problem: "An ambulance moving at 30 m/s emits a 500Hz siren. What frequency does a stationary observer hear as it approaches? (speed of sound = 343 m/s)", steps: ["Use Doppler formula: f' = f × v/(v - vs)", "Substitute: f' = 500 × 343/(343 - 30)", "Calculate: f' = 500 × 343/313", "Result: f' = 500 × 1.096 = 548 Hz"], answer: "Observed frequency = 548 Hz" }, equations: "f' = f(v±vo)/(v∓vs)  |  v = fλ  |  v_sound = 343 m/s", controls: [{ id: "vsource", label: "Source Speed", min: 0, max: 100, val: 30, unit: " m/s" }], simKey: "doppler" },
      { id: "refraction", title: "Reflection & Refraction", introduction: "When light hits a surface it can reflect (bounce back) or refract (bend as it passes through). Reflection follows a simple rule — angle in equals angle out. Refraction happens because light changes speed in different materials. This bending of light is what makes lenses work, why straws look bent in water, and how rainbows form.", keyConcepts: ["Angle of incidence equals angle of reflection", "Refraction occurs because light changes speed in different media", "Light bends toward the normal when entering a denser medium", "Snell's Law: n₁sinθ₁ = n₂sinθ₂", "Total internal reflection occurs when light cannot escape a denser medium — used in optical fibres"], workedExample: { problem: "Light travels from air (n=1.0) into glass (n=1.5) at 30°. Find the refracted angle.", steps: ["Apply Snell's Law: n₁sinθ₁ = n₂sinθ₂", "Substitute: 1.0 × sin(30°) = 1.5 × sinθ₂", "Calculate: 0.5 = 1.5 × sinθ₂", "Solve: sinθ₂ = 0.5/1.5 = 0.333, θ₂ = 19.5°"], answer: "Refracted angle = 19.5°" }, equations: "n₁sinθ₁ = n₂sinθ₂  |  n = c/v  |  θᵢ = θᵣ", controls: [{ id: "angle", label: "Incident Angle", min: 5, max: 85, val: 30, unit: "°" }, { id: "n2", label: "Glass Index", min: 10, max: 25, val: 15, unit: "/10" }], simKey: "refraction" },
      { id: "diffraction", title: "Diffraction", introduction: "Diffraction is the bending of waves around obstacles and through openings. When waves pass through a gap, they spread out on the other side — the narrower the gap relative to the wavelength, the more spreading occurs. This is why you can hear someone talking around a corner even though you cannot see them.", keyConcepts: ["Waves spread out after passing through a gap or around an obstacle", "Diffraction is most noticeable when the gap size is similar to the wavelength", "Light diffracts through narrow slits creating interference patterns", "Diffraction limits the resolution of microscopes and telescopes", "Sound diffracts more than light because its wavelength is much longer"], workedExample: { problem: "Light of wavelength 500nm passes through a slit of width 0.1mm. Find the angle of the first minimum.", steps: ["Use single slit formula: sinθ = λ/d", "Substitute: sinθ = 500×10⁻⁹ / 0.1×10⁻³", "Calculate: sinθ = 0.005", "Find angle: θ = sin⁻¹(0.005) = 0.29°"], answer: "First minimum at θ = 0.29°" }, equations: "sinθ = nλ/d  |  λ = v/f  |  d·sinθ = mλ", controls: [{ id: "slitwidth", label: "Slit Width", min: 1, max: 10, val: 3, unit: " units" }], simKey: "diffraction" },
      { id: "polarisation", title: "Polarisation", introduction: "Light normally vibrates in all directions perpendicular to its travel. Polarisation restricts this vibration to a single plane. Polaroid sunglasses use this to block glare from reflective surfaces. LCD screens, 3D cinema glasses, and photography filters all rely on polarisation.", keyConcepts: ["Transverse waves can be polarised — longitudinal waves cannot", "Unpolarised light vibrates in all planes perpendicular to travel direction", "A polarising filter only transmits light vibrating in one direction", "Two polarising filters at 90° block all light completely", "Reflected light is partially polarised — this is why polaroid sunglasses reduce glare"], workedExample: { problem: "Polarised light of intensity 100 W/m² passes through a filter at 60° to the polarisation axis. Find the transmitted intensity.", steps: ["Use Malus's Law: I = I₀cos²θ", "Substitute: I = 100 × cos²(60°)", "Calculate: cos(60°) = 0.5, cos²(60°) = 0.25", "Result: I = 100 × 0.25 = 25 W/m²"], answer: "Transmitted intensity = 25 W/m²" }, equations: "I = I₀cos²θ  |  Malus's Law  |  Brewster's angle: tanθ = n", controls: [{ id: "angle", label: "Filter Angle", min: 0, max: 90, val: 45, unit: "°" }], simKey: "polarisation" },
    ],
  },
  thermo: {
    title: "Thermodynamics", icon: "🌡", color: "#BA7517",
    badge: "Thermo Expert",
    lessons: [
      { id: "kinetic", title: "Kinetic Gas Theory", introduction: "All matter is made of constantly moving particles. In a gas, molecules zoom around randomly at high speeds, colliding with each other and with the walls of their container. Temperature is simply a measure of the average kinetic energy of these particles — hotter means faster moving molecules.", keyConcepts: ["Gas molecules are in constant random motion", "Temperature measures average kinetic energy of molecules", "Pressure is caused by molecules hitting the container walls", "Higher temperature means faster molecules and greater pressure", "Absolute zero (0K) is the temperature at which all molecular motion stops"], workedExample: { problem: "Find the average kinetic energy of gas molecules at 300K.", steps: ["Use formula: KE = (3/2)kT where k = 1.38×10⁻²³ J/K", "Substitute: KE = 1.5 × 1.38×10⁻²³ × 300", "Calculate: KE = 1.5 × 4.14×10⁻²¹", "Result: KE = 6.21×10⁻²¹ J"], answer: "Average KE = 6.21×10⁻²¹ J per molecule" }, equations: "PV = nRT  |  KE = ½mv²  |  KE_avg = (3/2)kT", controls: [{ id: "temp", label: "Temperature", min: 50, max: 500, val: 200, unit: " K" }], simKey: "thermo" },
      { id: "heat", title: "Heat Transfer", introduction: "Heat moves from hot objects to cold ones through three mechanisms — conduction (through direct contact), convection (through fluid movement), and radiation (through electromagnetic waves). Understanding heat transfer explains why metals feel cold, why the sun warms the Earth, and how insulation works.", keyConcepts: ["Conduction transfers heat through direct particle contact — metals conduct well", "Convection transfers heat through fluid movement — hot fluid rises, cold fluid sinks", "Radiation transfers heat through electromagnetic waves — requires no medium", "Rate of heat transfer depends on temperature difference, material, and surface area", "Good conductors of electricity are usually good conductors of heat"], workedExample: { problem: "Find the heat needed to raise 2kg of water from 20°C to 100°C. (specific heat of water = 4200 J/kg°C)", steps: ["Use formula: Q = mcΔT", "Identify values: m=2kg, c=4200 J/kg°C, ΔT=80°C", "Calculate: Q = 2 × 4200 × 80", "Result: Q = 672,000 J = 672 kJ"], answer: "Heat required = 672 kJ" }, equations: "Q = mcΔT  |  P = kA(ΔT/d)  |  P = σAT⁴", controls: [{ id: "temp", label: "Temperature", min: 50, max: 500, val: 200, unit: " K" }], simKey: "thermo" },
      { id: "entropy", title: "Entropy", introduction: "Entropy is a measure of disorder in a system. The second law of thermodynamics states that entropy always increases in a closed system — things naturally become more disordered over time. This is why heat flows from hot to cold, why a broken egg cannot reassemble itself, and why useful energy is always lost as waste heat.", keyConcepts: ["Entropy measures the degree of disorder or randomness in a system", "The second law: total entropy always increases in isolated systems", "Heat naturally flows from hot to cold — never the reverse spontaneously", "Energy can be converted but some is always lost as heat", "Entropy explains the direction of time — systems evolve toward greater disorder"], workedExample: { problem: "1000J of heat flows from a hot reservoir at 500K to a cold reservoir at 250K. Find the entropy change.", steps: ["Entropy change of hot reservoir: ΔS₁ = -Q/T₁ = -1000/500 = -2 J/K", "Entropy change of cold reservoir: ΔS₂ = +Q/T₂ = +1000/250 = +4 J/K", "Total entropy change: ΔStotal = -2 + 4 = +2 J/K", "Positive result confirms second law — entropy increased"], answer: "Total entropy change = +2 J/K" }, equations: "ΔS = Q/T  |  ΔS ≥ 0  |  S = k·ln(W)", controls: [{ id: "temp", label: "Temperature", min: 50, max: 500, val: 200, unit: " K" }], simKey: "thermo" },
      { id: "carnot", title: "Carnot Cycle", introduction: "The Carnot cycle is the most efficient possible heat engine — a theoretical machine that converts heat into work. No real engine can exceed its efficiency. It operates between two temperatures and consists of four steps — two isothermal and two adiabatic processes. Understanding Carnot efficiency tells us the fundamental limits of any engine.", keyConcepts: ["The Carnot engine is the most efficient possible heat engine", "Efficiency depends only on the temperatures of the hot and cold reservoirs", "No real engine can exceed Carnot efficiency", "The four stages: isothermal expansion, adiabatic expansion, isothermal compression, adiabatic compression", "Higher temperature difference means greater possible efficiency"], workedExample: { problem: "A Carnot engine operates between 600K and 300K. Find its efficiency.", steps: ["Use Carnot efficiency formula: η = 1 - Tc/Th", "Substitute values: η = 1 - 300/600", "Calculate: η = 1 - 0.5 = 0.5", "Convert to percentage: efficiency = 50%"], answer: "Carnot efficiency = 50%" }, equations: "η = 1 - Tc/Th  |  W = Qh - Qc  |  Qh/Th = Qc/Tc", controls: [{ id: "temp", label: "Hot Temperature", min: 200, max: 800, val: 500, unit: " K" }], simKey: "thermo" },
      { id: "idealgas", title: "Ideal Gas Law", introduction: "The ideal gas law combines three relationships — Boyle's Law (pressure and volume), Charles's Law (volume and temperature), and Gay-Lussac's Law (pressure and temperature) — into one powerful equation: PV = nRT. This equation predicts how a gas behaves when you change its pressure, volume, or temperature.", keyConcepts: ["PV = nRT where P=pressure, V=volume, n=moles, R=gas constant, T=temperature in Kelvin", "Boyle's Law: at constant temperature, pressure and volume are inversely proportional", "Charles's Law: at constant pressure, volume is proportional to temperature", "Temperature must always be in Kelvin for gas law calculations", "Real gases deviate from ideal behaviour at very high pressures or low temperatures"], workedExample: { problem: "2 moles of gas at 300K occupy 10L. Find the pressure. (R = 8.314 J/mol·K)", steps: ["Use ideal gas law: PV = nRT", "Rearrange for pressure: P = nRT/V", "Convert volume: 10L = 0.01 m³", "Calculate: P = 2 × 8.314 × 300 / 0.01 = 498,840 Pa"], answer: "Pressure = 498,840 Pa ≈ 4.93 atm" }, equations: "PV = nRT  |  P₁V₁/T₁ = P₂V₂/T₂  |  R = 8.314 J/mol·K", controls: [{ id: "temp", label: "Temperature", min: 50, max: 500, val: 200, unit: " K" }], simKey: "thermo" },
    ],
  },
  em: {
    title: "Electromagnetism", icon: "⚡", color: "#7F77DD",
    badge: "EM Champion",
    lessons: [
      { id: "efields", title: "Electric Fields", introduction: "An electric field is a region where a charged particle experiences a force. The field points in the direction a positive charge would move. Fields are created by charged objects and extend outward in all directions. Understanding electric fields explains how lightning works, how capacitors store energy, and how your phone's touchscreen detects your finger.", keyConcepts: ["Electric fields point from positive to negative charges", "Field strength is measured in Newtons per Coulomb (N/C)", "Like charges repel, unlike charges attract", "Electric field lines never cross each other", "The closer together the field lines, the stronger the field"], workedExample: { problem: "Find the electric force on a 2μC charge in a field of 5000 N/C.", steps: ["Use formula: F = qE", "Identify values: q = 2×10⁻⁶ C, E = 5000 N/C", "Calculate: F = 2×10⁻⁶ × 5000", "Result: F = 0.01 N = 10 mN"], answer: "Electric force = 0.01 N" }, equations: "F = kq₁q₂/r²  |  E = F/q  |  E = kq/r²", controls: [{ id: "charge", label: "Charge", min: -3, max: 3, val: 2, unit: "e" }], simKey: "em" },
      { id: "bfields", title: "Magnetic Fields", introduction: "Magnetic fields are created by moving charges and permanent magnets. They exert forces on other moving charges. The Earth has a magnetic field that protects us from solar wind. MRI machines, electric motors, and speakers all rely on magnetic fields. The magnetic force always acts perpendicular to the velocity of a moving charge.", keyConcepts: ["Magnetic fields are created by moving charges and permanent magnets", "Magnetic force acts perpendicular to both field and velocity", "Field lines form closed loops from North to South poles outside the magnet", "A current-carrying wire creates a circular magnetic field around it", "The right-hand rule determines the direction of magnetic force"], workedExample: { problem: "A proton moves at 10⁶ m/s perpendicular to a 0.5T magnetic field. Find the magnetic force.", steps: ["Use formula: F = qvB", "Identify values: q = 1.6×10⁻¹⁹ C, v = 10⁶ m/s, B = 0.5T", "Calculate: F = 1.6×10⁻¹⁹ × 10⁶ × 0.5", "Result: F = 8×10⁻¹⁴ N"], answer: "Magnetic force = 8×10⁻¹⁴ N" }, equations: "F = qvB  |  F = BIl  |  B = μ₀I/2πr", controls: [{ id: "charge", label: "Charge", min: -3, max: 3, val: 2, unit: "e" }], simKey: "em" },
      { id: "faraday", title: "Faraday's Law", introduction: "Faraday's Law states that a changing magnetic field induces an electric current. This is the principle behind every electrical generator — move a magnet near a coil of wire and electricity flows. Without Faraday's Law there would be no power stations, no transformers, and no wireless charging.", keyConcepts: ["A changing magnetic flux induces an EMF (voltage) in a conductor", "The faster the magnetic field changes, the greater the induced EMF", "Lenz's Law: the induced current opposes the change that caused it", "Generators convert mechanical energy to electrical energy using this principle", "Transformers use electromagnetic induction to change voltage levels"], workedExample: { problem: "A coil of 100 turns experiences a flux change of 0.5 Wb in 0.2 seconds. Find the induced EMF.", steps: ["Use Faraday's Law: EMF = -N × ΔΦ/Δt", "Identify values: N=100 turns, ΔΦ=0.5Wb, Δt=0.2s", "Calculate: EMF = 100 × 0.5/0.2", "Result: EMF = 250 V"], answer: "Induced EMF = 250 V" }, equations: "EMF = -NΔΦ/Δt  |  Φ = BA·cosθ  |  V₁/V₂ = N₁/N₂", controls: [{ id: "charge", label: "Field Strength", min: -3, max: 3, val: 2, unit: "e" }], simKey: "em" },
      { id: "circuits", title: "AC/DC Circuits", introduction: "Electric circuits are pathways for current to flow. DC (Direct Current) flows in one direction — like a battery. AC (Alternating Current) reverses direction many times per second — like the electricity in your home. Understanding circuits is the foundation of all electronics, from simple light switches to computer processors.", keyConcepts: ["Voltage drives current through a circuit — measured in Volts", "Resistance opposes current flow — measured in Ohms", "Ohm's Law: V = IR relates voltage, current and resistance", "In series circuits, current is the same throughout", "In parallel circuits, voltage is the same across each branch"], workedExample: { problem: "Three resistors of 2Ω, 3Ω, and 5Ω are connected in series to a 10V battery. Find the current.", steps: ["Total resistance in series: R = R₁ + R₂ + R₃ = 2 + 3 + 5 = 10Ω", "Apply Ohm's Law: I = V/R", "Calculate: I = 10/10 = 1A"], answer: "Current = 1 A" }, equations: "V = IR  |  P = IV  |  R_series = R₁+R₂+R₃", controls: [{ id: "charge", label: "Voltage", min: -3, max: 3, val: 2, unit: "e" }], simKey: "em" },
      { id: "maxwell", title: "Maxwell's Equations", introduction: "Maxwell's four equations are the complete description of all electromagnetic phenomena. They unify electricity and magnetism into one theory and predict the existence of electromagnetic waves — including light. Einstein called Maxwell's equations the most important discovery in physics since Newton.", keyConcepts: ["Maxwell unified electricity and magnetism into one theory", "His equations predict that changing electric fields create magnetic fields and vice versa", "This mutual creation of fields allows electromagnetic waves to propagate through space", "The speed of these waves is the speed of light — revealing that light is an EM wave", "Maxwell's equations underpin all of modern telecommunications"], workedExample: { problem: "An electromagnetic wave in vacuum has frequency 6×10¹⁴ Hz. Find its wavelength.", steps: ["Use wave equation: c = fλ where c = 3×10⁸ m/s", "Rearrange: λ = c/f", "Calculate: λ = 3×10⁸ / 6×10¹⁴", "Result: λ = 5×10⁻⁷ m = 500nm (visible green light)"], answer: "Wavelength = 500 nm (green light)" }, equations: "∇·E = ρ/ε₀  |  ∇×B = μ₀J  |  c = 1/√(μ₀ε₀)", controls: [{ id: "charge", label: "Charge", min: -3, max: 3, val: 2, unit: "e" }], simKey: "em" },
    ],
  },
  quantum: {
    title: "Quantum Physics", icon: "◇", color: "#D85A30",
    badge: "Quantum Scholar",
    lessons: [
      { id: "duality", title: "Wave-Particle Duality", introduction: "At the quantum level, particles like electrons and photons behave as both waves and particles. In the famous double-slit experiment, a single electron passes through two slits simultaneously — like a wave — yet is detected at a single point — like a particle. This duality is one of the most profound and strange discoveries in all of science.", keyConcepts: ["Quantum objects behave as waves when not observed and particles when measured", "The double-slit experiment demonstrates wave behaviour of single particles", "De Broglie wavelength: all matter has an associated wavelength λ = h/mv", "The act of measurement collapses the wave function to a definite state", "Wave-particle duality has no classical analogy — it is fundamentally quantum"], workedExample: { problem: "Find the de Broglie wavelength of an electron (m=9.1×10⁻³¹kg) moving at 10⁶ m/s.", steps: ["Use de Broglie formula: λ = h/mv where h = 6.63×10⁻³⁴ J·s", "Substitute: λ = 6.63×10⁻³⁴ / (9.1×10⁻³¹ × 10⁶)", "Calculate denominator: 9.1×10⁻²⁵", "Result: λ = 7.3×10⁻¹⁰ m = 0.73 nm"], answer: "de Broglie wavelength = 0.73 nm" }, equations: "λ = h/mv  |  E = hf  |  p = h/λ", controls: [{ id: "n", label: "Energy Level", min: 1, max: 5, val: 2, unit: "" }], simKey: "quantum" },
      { id: "uncertainty", title: "Uncertainty Principle", introduction: "Heisenberg's Uncertainty Principle states that you cannot simultaneously know both the exact position and exact momentum of a particle. The more precisely you know one, the less precisely you can know the other. This is not a limitation of measurement technology — it is a fundamental property of nature at the quantum scale.", keyConcepts: ["Position and momentum cannot both be known precisely at the same time", "ΔxΔp ≥ ℏ/2 — the product of uncertainties has a minimum value", "This is not due to imperfect instruments — it is a fundamental law", "Energy and time have a similar uncertainty relationship: ΔEΔt ≥ ℏ/2", "The uncertainty principle explains why electrons don't spiral into the nucleus"], workedExample: { problem: "An electron's position is known to within 10⁻¹⁰m. Find the minimum uncertainty in its momentum.", steps: ["Use uncertainty principle: ΔxΔp ≥ ℏ/2 where ℏ = 1.05×10⁻³⁴ J·s", "Rearrange: Δp ≥ ℏ/2Δx", "Substitute: Δp ≥ 1.05×10⁻³⁴ / (2 × 10⁻¹⁰)", "Result: Δp ≥ 5.25×10⁻²⁵ kg·m/s"], answer: "Minimum momentum uncertainty = 5.25×10⁻²⁵ kg·m/s" }, equations: "ΔxΔp ≥ ℏ/2  |  ΔEΔt ≥ ℏ/2  |  ℏ = h/2π", controls: [{ id: "n", label: "Energy Level", min: 1, max: 5, val: 2, unit: "" }], simKey: "quantum" },
      { id: "schrodinger", title: "Schrödinger Equation", introduction: "The Schrödinger equation describes how the quantum state of a system evolves over time. Its solution, the wave function ψ, contains all information about a particle. The square of the wave function |ψ|² gives the probability of finding the particle at a given location. This replaces the certainty of classical physics with probability.", keyConcepts: ["The wave function ψ contains all quantum information about a particle", "|ψ|² gives the probability density — where the particle is likely to be found", "The Schrödinger equation determines how ψ evolves over time", "Energy levels in atoms are quantised — only certain values are allowed", "The particle in a box model shows how confinement creates discrete energy levels"], workedExample: { problem: "An electron is in the n=3 energy level of a hydrogen atom. Find its energy.", steps: ["Use hydrogen energy formula: En = -13.6/n² eV", "Substitute n=3: E₃ = -13.6/9", "Calculate: E₃ = -1.51 eV", "Negative sign means the electron is bound to the nucleus"], answer: "Energy = -1.51 eV" }, equations: "iℏ∂ψ/∂t = Hψ  |  En = -13.6/n² eV  |  P = |ψ|²", controls: [{ id: "n", label: "Energy Level (n)", min: 1, max: 5, val: 2, unit: "" }], simKey: "quantum" },
      { id: "tunnelling", title: "Quantum Tunnelling", introduction: "In classical physics, a ball cannot pass through a wall. In quantum physics, a particle can tunnel through a barrier it classically should not be able to cross. The probability depends on the particle's energy and the barrier's height and thickness. Quantum tunnelling powers nuclear fusion in stars, enables scanning tunnelling microscopes, and is essential in modern transistors.", keyConcepts: ["Particles have a probability of passing through barriers they lack energy to overcome classically", "Tunnelling probability decreases exponentially with barrier thickness", "Lighter particles tunnel more easily than heavier ones", "Nuclear fusion in stars depends on tunnelling — protons tunnel through the Coulomb barrier", "Flash memory in computers uses quantum tunnelling to store data"], workedExample: { problem: "Explain why alpha decay (tunnelling) is possible even though the alpha particle lacks sufficient energy to escape classically.", steps: ["The alpha particle is trapped inside the nucleus by the nuclear strong force", "Classically it lacks energy to overcome the potential barrier at the nuclear surface", "Quantum mechanically its wave function extends beyond the barrier", "There is a non-zero probability of finding it outside the nucleus", "When detected outside, we say it has tunnelled through the barrier"], answer: "Tunnelling allows the alpha particle to escape despite insufficient classical energy" }, equations: "T ∝ e^(-2κd)  |  κ = √(2m(V-E))/ℏ", controls: [{ id: "n", label: "Energy Level", min: 1, max: 5, val: 2, unit: "" }], simKey: "quantum" },
      { id: "orbitals", title: "Atomic Orbitals", introduction: "Atomic orbitals are regions of space where an electron is most likely to be found. Unlike the simple circular orbits of the Bohr model, quantum mechanics describes orbitals as three-dimensional probability clouds with distinct shapes — s orbitals are spherical, p orbitals are dumbbell-shaped. The arrangement of electrons in orbitals determines all chemical properties.", keyConcepts: ["Orbitals are probability distributions — regions where electrons are likely to be found", "Each orbital is defined by three quantum numbers: n, l, and ml", "s orbitals are spherical, p orbitals are dumbbell-shaped, d orbitals are more complex", "Each orbital holds a maximum of 2 electrons with opposite spins", "Electron configuration determines the chemical behaviour of elements"], workedExample: { problem: "Write the electron configuration for oxygen (atomic number 8).", steps: ["Start filling from lowest energy: 1s orbital holds 2 electrons", "Next: 2s orbital holds 2 electrons — total so far: 4", "Next: 2p orbitals hold up to 6 electrons — oxygen needs 4 more", "Fill 2p with 4 electrons: 2p⁴", "Full configuration: 1s² 2s² 2p⁴"], answer: "Oxygen: 1s² 2s² 2p⁴" }, equations: "En = -13.6/n² eV  |  l = 0,1,...,n-1  |  ml = -l,...,+l", controls: [{ id: "n", label: "Principal Quantum n", min: 1, max: 5, val: 2, unit: "" }], simKey: "quantum" },
    ],
  },
  relativity: {
    title: "Special Relativity", icon: "∞", color: "#D4537E",
    badge: "Relativity Expert",
    lessons: [
      { id: "timedilation", title: "Time Dilation", introduction: "Einstein's special relativity shows that time passes at different rates for observers moving relative to each other. A clock on a fast-moving spaceship ticks more slowly than a clock at rest. This is not an illusion — the effect is real and measurable. GPS satellites must correct for time dilation to give accurate positions.", keyConcepts: ["Moving clocks tick more slowly than stationary clocks", "The effect becomes significant only at speeds close to the speed of light", "Time dilation has been confirmed by atomic clocks on aircraft and satellites", "The Lorentz factor γ = 1/√(1-v²/c²) quantifies the time dilation", "At v=0.87c, time passes twice as slowly for the moving observer"], workedExample: { problem: "A spaceship travels at 0.6c. How much time passes on the ship when Earth clocks show 10 years?", steps: ["Calculate Lorentz factor: γ = 1/√(1-v²/c²) = 1/√(1-0.36) = 1/√0.64 = 1/0.8 = 1.25", "Ship time = Earth time / γ", "Ship time = 10 / 1.25 = 8 years", "The ship's crew ages only 8 years while Earth ages 10 years"], answer: "8 years pass on the ship" }, equations: "t' = t/γ  |  γ = 1/√(1-v²/c²)  |  c = 3×10⁸ m/s", controls: [{ id: "velocity", label: "Velocity", min: 1, max: 99, val: 80, unit: "% c" }], simKey: "relativity" },
      { id: "lengthcontraction", title: "Length Contraction", introduction: "Moving objects appear shorter in the direction of motion. A spaceship travelling at 87% the speed of light would appear half its rest length to a stationary observer. Like time dilation, this is a real physical effect — not an optical illusion. The object itself is unaffected from its own reference frame.", keyConcepts: ["Moving objects are contracted in the direction of motion", "Length contraction only occurs in the direction of travel", "The contraction factor is the same Lorentz factor γ as time dilation", "In its own reference frame, the object's length is unchanged", "Length contraction and time dilation are two aspects of the same relativistic spacetime"], workedExample: { problem: "A spaceship of rest length 100m travels at 0.8c. Find its contracted length.", steps: ["Calculate Lorentz factor: γ = 1/√(1-0.8²) = 1/√(1-0.64) = 1/√0.36 = 1/0.6 = 1.667", "Contracted length: L = L₀/γ = 100/1.667", "Calculate: L = 60m"], answer: "Contracted length = 60 m" }, equations: "L = L₀/γ  |  γ = 1/√(1-v²/c²)  |  L₀ = rest length", controls: [{ id: "velocity", label: "Velocity", min: 1, max: 99, val: 80, unit: "% c" }], simKey: "relativity" },
      { id: "emc2", title: "E = mc²", introduction: "Einstein's most famous equation reveals that mass and energy are equivalent — mass is simply a very concentrated form of energy. A tiny amount of mass corresponds to an enormous amount of energy because c² is such a large number. This equivalence powers nuclear reactors and explains why stars shine for billions of years.", keyConcepts: ["Mass and energy are equivalent and interchangeable", "c² = 9×10¹⁶ m²/s² — a tiny mass releases enormous energy", "Nuclear reactions release energy by converting a small fraction of mass", "The sun loses 4 million tonnes of mass every second as radiated energy", "Pair production creates matter from pure energy, confirming the equivalence"], workedExample: { problem: "Find the energy equivalent of 1 gram of matter.", steps: ["Use E = mc²", "Convert mass: m = 1g = 0.001 kg", "Speed of light: c = 3×10⁸ m/s", "Calculate: E = 0.001 × (3×10⁸)² = 0.001 × 9×10¹⁶ = 9×10¹³ J"], answer: "E = 9×10¹³ J (equivalent to ~21 kilotons of TNT)" }, equations: "E = mc²  |  E = γmc²  |  KE = (γ-1)mc²", controls: [{ id: "velocity", label: "Velocity", min: 1, max: 99, val: 80, unit: "% c" }], simKey: "relativity" },
      { id: "spacetime", title: "Spacetime Diagrams", introduction: "Spacetime diagrams (Minkowski diagrams) are graphs that show the position of objects in space and time simultaneously. The vertical axis is time, the horizontal axis is space. Light always travels at 45° on these diagrams. They make it easy to visualise simultaneity, causality, and the twin paradox.", keyConcepts: ["Spacetime combines space and time into a single four-dimensional framework", "Events are points in spacetime — defined by both position and time", "Light cones define what events can causally influence each other", "The spacetime interval is invariant — the same for all observers", "Worldlines show the path of an object through spacetime"], workedExample: { problem: "On a spacetime diagram, explain why faster-than-light travel would allow time travel.", steps: ["On a spacetime diagram, light travels at 45° — the light cone boundary", "FTL travel would appear as a line less than 45° from horizontal", "Such a line exits the future light cone", "In another reference frame, this path goes backward in time", "FTL communication would therefore allow sending information to the past"], answer: "FTL travel crosses causality boundaries, enabling closed timelike curves" }, equations: "s² = c²t² - x²  |  ds² = c²dt² - dx²", controls: [{ id: "velocity", label: "Velocity", min: 1, max: 99, val: 80, unit: "% c" }], simKey: "relativity" },
      { id: "lorentz", title: "Lorentz Transformation", introduction: "The Lorentz transformations are the mathematical equations that convert measurements of space and time from one reference frame to another. They replace the simpler Galilean transformations of classical mechanics and correctly account for relativistic effects at high speeds.", keyConcepts: ["Lorentz transformations replace Galilean transformations at high speeds", "Space and time measurements depend on the observer's reference frame", "Events simultaneous in one frame may not be simultaneous in another", "The transformations reduce to Galilean form at speeds much less than c", "All relativistic effects — time dilation and length contraction — follow from these equations"], workedExample: { problem: "An event occurs at x=1000m, t=0 in frame S. Frame S' moves at 0.6c. Find x' and t'.", steps: ["γ = 1/√(1-0.36) = 1.25", "x' = γ(x - vt) = 1.25(1000 - 0) = 1250m", "t' = γ(t - vx/c²) = 1.25(0 - 0.6c×1000/c²)", "t' = 1.25 × (-2×10⁻⁶) = -2.5×10⁻⁶ s"], answer: "x' = 1250m, t' = -2.5μs" }, equations: "x' = γ(x-vt)  |  t' = γ(t-vx/c²)  |  γ = 1/√(1-β²)", controls: [{ id: "velocity", label: "Velocity", min: 1, max: 99, val: 80, unit: "% c" }], simKey: "relativity" },
    ],
  },
  nuclear: {
    title: "Nuclear Physics", icon: "◎", color: "#639922",
    badge: "Nuclear Expert",
    lessons: [
      { id: "decay", title: "Radioactive Decay", introduction: "Unstable atomic nuclei spontaneously emit radiation to become more stable. There are three main types — alpha particles (helium nuclei), beta particles (electrons or positrons), and gamma rays (high energy photons). Each type has different penetrating power and different effects on matter.", keyConcepts: ["Alpha decay emits a helium-4 nucleus — stopped by paper or skin", "Beta decay emits an electron or positron — stopped by thin aluminium", "Gamma decay emits high-energy photons — requires lead or thick concrete to stop", "Decay is random for individual atoms but predictable for large numbers", "Activity (decays per second) is measured in Becquerels (Bq)"], workedExample: { problem: "A sample has initial activity 8000 Bq and half-life 4 days. Find activity after 12 days.", steps: ["Number of half-lives: n = 12/4 = 3", "Activity after n half-lives: A = A₀ × (1/2)ⁿ", "Calculate: A = 8000 × (1/2)³ = 8000 × 1/8", "Result: A = 1000 Bq"], answer: "Activity after 12 days = 1000 Bq" }, equations: "N(t) = N₀e^(−λt)  |  T½ = ln2/λ  |  A = λN", controls: [{ id: "halflife", label: "Half-Life", min: 1, max: 10, val: 4, unit: " s" }], simKey: "nuclear" },
      { id: "halflife", title: "Half-Life", introduction: "The half-life of a radioactive substance is the time taken for half the nuclei to decay. It ranges from fractions of a second to billions of years depending on the element. Half-life is used in carbon dating to determine the age of ancient materials, and in medicine to choose radioactive tracers.", keyConcepts: ["Half-life is the time for half the radioactive nuclei to decay", "After each half-life the activity and number of nuclei halves", "Half-life is constant — it does not change with temperature, pressure, or chemical state", "Carbon-14 has a half-life of 5730 years — used for dating ancient materials", "Short half-life isotopes are used in medical imaging to minimise patient radiation exposure"], workedExample: { problem: "Carbon-14 has a half-life of 5730 years. A sample has 25% of its original C-14. How old is it?", steps: ["25% remaining means the sample has gone through 2 half-lives", "(100% → 50% → 25% = 2 half-lives)", "Age = 2 × 5730 = 11,460 years"], answer: "The sample is approximately 11,460 years old" }, equations: "T½ = ln2/λ  |  N = N₀(½)^(t/T½)  |  λ = 0.693/T½", controls: [{ id: "halflife", label: "Half-Life", min: 1, max: 10, val: 4, unit: " s" }], simKey: "nuclear" },
      { id: "fission", title: "Nuclear Fission", introduction: "Nuclear fission is the splitting of a heavy nucleus into two smaller nuclei, releasing enormous energy. When uranium-235 absorbs a neutron it splits into two medium-sized nuclei and releases 2-3 more neutrons — which can trigger further fissions. This chain reaction is the basis of nuclear power plants and atomic bombs.", keyConcepts: ["Fission splits heavy nuclei into lighter ones, releasing energy and neutrons", "The released neutrons can cause further fissions — creating a chain reaction", "Critical mass is the minimum amount of fissile material needed for a sustained chain reaction", "Nuclear power plants control the chain reaction using control rods", "Fission releases about a million times more energy per atom than chemical reactions"], workedExample: { problem: "A uranium-235 fission releases 200 MeV. Find the energy from 1kg of U-235.", steps: ["Moles of U-235 in 1kg: n = 1000/235 = 4.26 mol", "Number of atoms: N = 4.26 × 6.022×10²³ = 2.57×10²⁴ atoms", "Energy per fission: 200 MeV = 200 × 1.6×10⁻¹³ J = 3.2×10⁻¹¹ J", "Total energy: E = 2.57×10²⁴ × 3.2×10⁻¹¹ = 8.2×10¹³ J"], answer: "E ≈ 8.2×10¹³ J (equivalent to ~20 kilotons of TNT)" }, equations: "ΔE = Δmc²  |  ²³⁵U + n → fission products + 2-3n + energy", controls: [{ id: "halflife", label: "Half-Life", min: 1, max: 10, val: 4, unit: " s" }], simKey: "nuclear" },
      { id: "fusion", title: "Nuclear Fusion", introduction: "Nuclear fusion joins light nuclei together to form heavier ones, releasing even more energy per kilogram than fission. It powers the sun and all stars. Scientists are working to achieve controlled fusion on Earth — it would provide virtually unlimited clean energy using hydrogen from seawater as fuel.", keyConcepts: ["Fusion joins light nuclei together, releasing enormous energy", "Requires extreme temperatures (100 million degrees) to overcome electrostatic repulsion", "Powers all stars — the sun fuses 600 million tonnes of hydrogen per second", "Produces no long-lived radioactive waste — much cleaner than fission", "ITER in France is the world's largest experimental fusion reactor, aiming to achieve net energy gain"], workedExample: { problem: "In the sun's fusion reaction, 4 protons fuse to form helium-4. The mass difference is 4.8×10⁻²⁹ kg. Find the energy released.", steps: ["Use E = mc²", "Mass difference: Δm = 4.8×10⁻²⁹ kg", "Speed of light: c = 3×10⁸ m/s", "Energy: E = 4.8×10⁻²⁹ × (3×10⁸)² = 4.3×10⁻¹² J = 26.7 MeV"], answer: "Energy released = 26.7 MeV per fusion reaction" }, equations: "⁴×¹H → ⁴He + 2e⁺ + 2ν + energy  |  ΔE = Δmc²", controls: [{ id: "halflife", label: "Half-Life", min: 1, max: 10, val: 4, unit: " s" }], simKey: "nuclear" },
      { id: "binding", title: "Binding Energy", introduction: "The binding energy of a nucleus is the energy required to completely separate it into individual protons and neutrons. The higher the binding energy per nucleon, the more stable the nucleus. Iron-56 has the highest binding energy per nucleon — which is why both fission (of heavy elements) and fusion (of light elements) release energy, as both move toward iron on the binding energy curve.", keyConcepts: ["Binding energy holds the nucleus together against electrostatic repulsion", "Binding energy per nucleon peaks at iron-56 — the most stable nucleus", "Elements lighter than iron release energy through fusion", "Elements heavier than iron release energy through fission", "Mass defect: the nucleus is lighter than its constituent parts — the difference is the binding energy"], workedExample: { problem: "A helium-4 nucleus has mass 4.0015u. Find its binding energy. (proton=1.00728u, neutron=1.00867u, 1u=931.5 MeV)", steps: ["Mass of parts: 2×proton + 2×neutron = 2×1.00728 + 2×1.00867 = 4.0319u", "Mass defect: Δm = 4.0319 - 4.0015 = 0.0304u", "Binding energy: E = 0.0304 × 931.5 = 28.3 MeV", "Per nucleon: 28.3/4 = 7.07 MeV/nucleon"], answer: "Binding energy = 28.3 MeV (7.07 MeV per nucleon)" }, equations: "BE = Δmc²  |  Δm = Zm_p + Nm_n - M  |  1u = 931.5 MeV", controls: [{ id: "halflife", label: "Half-Life", min: 1, max: 10, val: 4, unit: " s" }], simKey: "nuclear" },
    ],
  },

math: {
    title: "Mathematics", icon: "∫", color: "#9B59B6",
    badge: "Maths Master",
    lessons: [
      {
        id: "algebra", title: "Algebra",
        introduction: "Algebra is the language of mathematics — it lets us describe relationships between quantities using symbols and equations. Every physics formula you use is algebra. When you rearrange F=ma to find acceleration, you are doing algebra. Mastering algebra means you can solve any equation, rearrange any formula, and find any unknown quantity.",
        keyConcepts: [
          "Variables represent unknown quantities — usually letters like x, y, or n",
          "An equation says two expressions are equal — what you do to one side you must do to the other",
          "To solve for a variable, isolate it by performing inverse operations",
          "Quadratic equations (ax²+bx+c=0) can be solved by factoring or the quadratic formula",
          "Simultaneous equations have two unknowns and require two equations to solve",
        ],
        workedExample: {
          problem: "Rearrange v² = u² + 2as to make s the subject.",
          steps: [
            "Start with: v² = u² + 2as",
            "Subtract u² from both sides: v² - u² = 2as",
            "Divide both sides by 2a: (v² - u²) / 2a = s",
            "Write neatly: s = (v² - u²) / 2a",
          ],
          answer: "s = (v² − u²) / 2a"
        },
        equations: "ax + b = c  |  x = (-b ± √(b²-4ac)) / 2a  |  s = (v²-u²)/2a",
        controls: [
          { id: "a", label: "Coefficient a", min: 1, max: 5, val: 2, unit: "" },
          { id: "b", label: "Coefficient b", min: -10, max: 10, val: -4, unit: "" },
        ],
        simKey: "algebra",
      },
      {
        id: "trigonometry", title: "Trigonometry",
        introduction: "Trigonometry describes the relationships between angles and sides in triangles. The three main functions — sine, cosine, and tangent — appear everywhere in physics: resolving forces, calculating wave equations, describing circular motion. If you can use sin, cos, and tan confidently, the mathematics of physics becomes dramatically easier.",
        keyConcepts: [
          "SOH CAH TOA: Sin = Opposite/Hypotenuse, Cos = Adjacent/Hypotenuse, Tan = Opposite/Adjacent",
          "Angles can be measured in degrees (0-360) or radians (0-2π)",
          "The unit circle connects angles to coordinates — cos gives x, sin gives y",
          "sin²θ + cos²θ = 1 always — the Pythagorean identity",
          "Inverse trig functions (sin⁻¹, cos⁻¹, tan⁻¹) find the angle from a ratio",
        ],
        workedExample: {
          problem: "A ramp is 5m long at 30° to the horizontal. Find the vertical height and horizontal length.",
          steps: [
            "The hypotenuse is 5m, angle is 30°",
            "Vertical height (opposite): h = 5 × sin(30°) = 5 × 0.5 = 2.5m",
            "Horizontal length (adjacent): d = 5 × cos(30°) = 5 × 0.866 = 4.33m",
            "Check with Pythagoras: 2.5² + 4.33² = 6.25 + 18.75 = 25 = 5² ✓",
          ],
          answer: "Vertical height = 2.5m, Horizontal length = 4.33m"
        },
        equations: "sinθ = O/H  |  cosθ = A/H  |  tanθ = O/A  |  sin²θ + cos²θ = 1",
        controls: [
          { id: "angle", label: "Angle θ", min: 0, max: 90, val: 30, unit: "°" },
        ],
        simKey: "trigonometry",
      },
      {
        id: "calculus", title: "Calculus",
        introduction: "Calculus is the mathematics of change. Differentiation finds the rate of change of a quantity — velocity is the derivative of position, acceleration is the derivative of velocity. Integration finds the total accumulated change — displacement is the integral of velocity. Every equation of motion in physics comes from calculus.",
        keyConcepts: [
          "Differentiation finds the gradient (rate of change) of a function at any point",
          "The derivative of xⁿ is nxⁿ⁻¹ — the power rule",
          "Velocity = dx/dt (rate of change of position), Acceleration = dv/dt",
          "Integration is the reverse of differentiation — it finds the area under a curve",
          "The integral of xⁿ is xⁿ⁺¹/(n+1) + c where c is the constant of integration",
        ],
        workedExample: {
          problem: "A particle's position is x = 3t² + 2t. Find its velocity and acceleration.",
          steps: [
            "Differentiate position to get velocity: v = dx/dt",
            "v = d(3t² + 2t)/dt = 6t + 2",
            "Differentiate velocity to get acceleration: a = dv/dt",
            "a = d(6t + 2)/dt = 6 m/s²",
          ],
          answer: "Velocity v = 6t + 2 m/s, Acceleration a = 6 m/s² (constant)"
        },
        equations: "v = dx/dt  |  a = dv/dt  |  d(xⁿ)/dx = nxⁿ⁻¹  |  ∫xⁿdx = xⁿ⁺¹/(n+1)",
        controls: [
          { id: "power", label: "Power n", min: 1, max: 4, val: 2, unit: "" },
          { id: "coeff", label: "Coefficient", min: 1, max: 5, val: 3, unit: "" },
        ],
        simKey: "calculus",
      },
      {
        id: "vectors", title: "Vectors",
        introduction: "Vectors have both magnitude and direction — unlike scalars which have only magnitude. Force, velocity, acceleration, and displacement are all vectors. Adding vectors is not as simple as adding numbers — direction matters. Understanding vectors is essential for resolving forces, analysing motion in 2D, and understanding fields.",
        keyConcepts: [
          "Vectors have magnitude (size) and direction — drawn as arrows",
          "Scalars have magnitude only — examples: speed, mass, temperature, energy",
          "Vectors are added tip-to-tail — the resultant goes from start to end",
          "A vector can be resolved into horizontal and vertical components using trig",
          "The magnitude of vector (x,y) is √(x²+y²) — Pythagoras in vector form",
        ],
        workedExample: {
          problem: "Two forces act on an object: 30N east and 40N north. Find the resultant force.",
          steps: [
            "Draw the vectors tip to tail — 30N east then 40N north",
            "These form a right-angled triangle",
            "Magnitude: R = √(30² + 40²) = √(900 + 1600) = √2500 = 50N",
            "Direction: θ = tan⁻¹(40/30) = tan⁻¹(1.333) = 53.1° north of east",
          ],
          answer: "Resultant = 50N at 53.1° north of east"
        },
        equations: "|v| = √(x²+y²)  |  vₓ = |v|cosθ  |  vᵧ = |v|sinθ  |  A·B = |A||B|cosθ",
        controls: [
          { id: "angle", label: "Vector angle", min: 0, max: 90, val: 53, unit: "°" },
          { id: "magnitude", label: "Magnitude", min: 10, max: 60, val: 50, unit: " N" },
        ],
        simKey: "vectors",
      },
      {
        id: "graphs", title: "Graphs & Functions",
        introduction: "Graphs are how mathematics communicates visually. In physics, graphs tell stories — a velocity-time graph shows acceleration as gradient, displacement as area. Being able to read and draw graphs, identify gradients, and understand what areas under curves represent is one of the most practical mathematical skills in all of science.",
        keyConcepts: [
          "Gradient (slope) = rise/run = change in y / change in x",
          "On a displacement-time graph, gradient = velocity",
          "On a velocity-time graph, gradient = acceleration and area = displacement",
          "A straight line graph has equation y = mx + c where m is gradient and c is y-intercept",
          "Curved graphs show non-constant rates of change — the gradient changes at every point",
        ],
        workedExample: {
          problem: "A velocity-time graph shows v=0 at t=0 and v=20m/s at t=4s in a straight line. Find acceleration and displacement.",
          steps: [
            "Acceleration = gradient = (v₂-v₁)/(t₂-t₁) = (20-0)/(4-0) = 5 m/s²",
            "Displacement = area under graph = area of triangle",
            "Area = ½ × base × height = ½ × 4 × 20 = 40m",
          ],
          answer: "Acceleration = 5 m/s², Displacement = 40m"
        },
        equations: "gradient = Δy/Δx  |  y = mx + c  |  area = displacement  |  gradient = acceleration",
        controls: [
          { id: "gradient", label: "Gradient", min: 1, max: 10, val: 5, unit: "" },
          { id: "intercept", label: "Y-intercept", min: -10, max: 10, val: 0, unit: "" },
        ],
        simKey: "graphs",
      },
    ],
  },
  engineering: {
    title: "Engineering", icon: "⚡", color: "#E67E22",
    badge: "Engineering Pro",
    lessons: [
      {
        id: "circuits", title: "Electric Circuits",
        introduction: "Electric circuits are pathways through which current flows. Every electronic device — from a light bulb to a smartphone — is built from circuits. Understanding how voltage, current, and resistance relate through Ohm's Law is the foundation of all electrical engineering. Series and parallel circuits behave differently and are used for different purposes.",
        keyConcepts: [
          "Voltage (V) is the electrical pressure that drives current — measured in Volts",
          "Current (I) is the flow of charge through a circuit — measured in Amperes",
          "Resistance (R) opposes current flow — measured in Ohms",
          "Ohm's Law: V = IR — the most important equation in electrical engineering",
          "Series circuits: same current everywhere, voltages add up",
          "Parallel circuits: same voltage everywhere, currents add up",
        ],
        workedExample: {
          problem: "Three resistors of 4Ω, 6Ω and 12Ω are connected in parallel to a 12V battery. Find the total resistance and current.",
          steps: [
            "For parallel: 1/R = 1/R₁ + 1/R₂ + 1/R₃ = 1/4 + 1/6 + 1/12",
            "1/R = 3/12 + 2/12 + 1/12 = 6/12 = 1/2",
            "Total resistance: R = 2Ω",
            "Total current: I = V/R = 12/2 = 6A",
          ],
          answer: "Total resistance = 2Ω, Total current = 6A"
        },
        equations: "V = IR  |  P = IV  |  1/R_parallel = 1/R₁ + 1/R₂  |  R_series = R₁+R₂",
        controls: [
          { id: "voltage", label: "Voltage", min: 1, max: 24, val: 12, unit: " V" },
          { id: "resistance", label: "Resistance", min: 1, max: 20, val: 6, unit: " Ω" },
        ],
        simKey: "circuits",
      },
      {
        id: "structures", title: "Structural Analysis",
        introduction: "Structural engineering ensures that buildings, bridges, and machines can support loads without failing. Every structure must be in equilibrium — the sum of all forces and moments must be zero. Understanding how forces distribute through a structure is what separates a safe bridge from a collapsing one.",
        keyConcepts: [
          "Equilibrium: sum of all forces = 0, sum of all moments = 0",
          "A moment (torque) is a force multiplied by its perpendicular distance from a pivot",
          "Tension pulls a member apart — compression pushes it together",
          "Beams deflect under load — the amount depends on material, shape, and load",
          "Factor of safety = maximum load / actual load — always greater than 1",
        ],
        workedExample: {
          problem: "A 4m beam is supported at both ends. A 500N load acts 1m from the left end. Find the reaction forces.",
          steps: [
            "Take moments about left support: R₂ × 4 = 500 × 1",
            "R₂ = 500/4 = 125N (right support reaction)",
            "Sum of vertical forces: R₁ + R₂ = 500",
            "R₁ = 500 - 125 = 375N (left support reaction)",
          ],
          answer: "Left reaction = 375N, Right reaction = 125N"
        },
        equations: "ΣF = 0  |  ΣM = 0  |  M = F × d  |  σ = F/A",
        controls: [
          { id: "load", label: "Load", min: 100, max: 1000, val: 500, unit: " N" },
          { id: "position", label: "Load Position", min: 10, max: 90, val: 25, unit: "%" },
        ],
        simKey: "structures",
      },
      {
        id: "fluid", title: "Fluid Mechanics",
        introduction: "Fluid mechanics studies how liquids and gases behave under forces. It explains why planes fly, why ships float, how blood flows through arteries, and how dams hold back water. Bernoulli's principle — that faster moving fluid has lower pressure — is one of the most useful and surprising results in all of engineering.",
        keyConcepts: [
          "Pressure in a fluid increases with depth: P = ρgh",
          "Archimedes' principle: a submerged object experiences upward buoyancy equal to the weight of fluid displaced",
          "Continuity equation: A₁v₁ = A₂v₂ — fluid speeds up through narrow sections",
          "Bernoulli's principle: faster fluid has lower pressure",
          "Viscosity is a fluid's resistance to flow — honey is more viscous than water",
        ],
        workedExample: {
          problem: "Water flows through a pipe that narrows from 0.1m² to 0.05m² cross section. If inlet speed is 2m/s, find the outlet speed.",
          steps: [
            "Apply continuity equation: A₁v₁ = A₂v₂",
            "Substitute values: 0.1 × 2 = 0.05 × v₂",
            "Solve: v₂ = 0.2/0.05 = 4 m/s",
            "The fluid doubles in speed as the pipe halves in area",
          ],
          answer: "Outlet speed = 4 m/s"
        },
        equations: "P = ρgh  |  A₁v₁ = A₂v₂  |  P + ½ρv² + ρgh = constant",
        controls: [
          { id: "area1", label: "Pipe Area 1", min: 5, max: 20, val: 10, unit: " cm²" },
          { id: "velocity1", label: "Inlet Speed", min: 1, max: 10, val: 2, unit: " m/s" },
        ],
        simKey: "fluid",
      },
      {
        id: "thermocycles", title: "Thermodynamic Cycles",
        introduction: "Thermodynamic cycles convert heat into useful work. Every engine — car, jet, steam turbine — operates on a thermodynamic cycle. The cycle takes a working fluid through a series of processes: heating, expansion, cooling, and compression. The efficiency of the cycle determines how much of the input heat becomes useful output work.",
        keyConcepts: [
          "A thermodynamic cycle returns the working fluid to its initial state",
          "Work output = area enclosed by the cycle on a P-V diagram",
          "Efficiency = work output / heat input — always less than 100%",
          "The Otto cycle powers petrol engines — four strokes: intake, compression, power, exhaust",
          "The Rankine cycle powers steam turbines — used in most power stations",
        ],
        workedExample: {
          problem: "A heat engine takes in 1000J of heat and exhausts 600J. Find the work output and efficiency.",
          steps: [
            "Work output = heat in - heat out = 1000 - 600 = 400J",
            "Efficiency = work output / heat input = 400/1000 = 0.4",
            "As percentage: efficiency = 40%",
            "Check: this is below Carnot efficiency as expected for a real engine",
          ],
          answer: "Work output = 400J, Efficiency = 40%"
        },
        equations: "W = Qh - Qc  |  η = W/Qh  |  η_Carnot = 1 - Tc/Th",
        controls: [
          { id: "heat_in", label: "Heat Input", min: 500, max: 2000, val: 1000, unit: " J" },
          { id: "efficiency", label: "Efficiency", min: 10, max: 60, val: 40, unit: "%" },
        ],
        simKey: "thermocycles",
      },
      {
        id: "signals", title: "Signal Processing",
        introduction: "Signal processing is the engineering discipline that deals with analysing, modifying, and synthesising signals — sound, images, sensor data, radio waves. Every time you make a phone call, stream music, or take a photo, signal processing is at work. The Fourier transform is the key mathematical tool that decomposes any signal into its frequency components.",
        keyConcepts: [
          "A signal is any quantity that varies with time — voltage, sound pressure, light intensity",
          "Frequency is how many times per second a signal repeats — measured in Hertz",
          "The Fourier transform decomposes any signal into sine waves of different frequencies",
          "Filtering removes unwanted frequencies — low-pass filters keep slow changes, high-pass keep rapid ones",
          "Sampling theorem: to digitise a signal you must sample at least twice its highest frequency",
        ],
        workedExample: {
          problem: "A signal contains frequencies up to 4kHz. What is the minimum sampling rate needed to digitise it correctly?",
          steps: [
            "Apply the Nyquist sampling theorem",
            "Minimum sampling rate = 2 × maximum frequency",
            "Minimum sampling rate = 2 × 4000 = 8000 Hz = 8 kHz",
            "This is why telephone audio is sampled at 8kHz — voice goes up to ~4kHz",
          ],
          answer: "Minimum sampling rate = 8 kHz"
        },
        equations: "f_sample ≥ 2f_max  |  F(ω) = ∫f(t)e^(-iωt)dt  |  SNR = signal/noise",
        controls: [
          { id: "freq1", label: "Signal Freq 1", min: 1, max: 8, val: 2, unit: " Hz" },
          { id: "freq2", label: "Signal Freq 2", min: 1, max: 8, val: 5, unit: " Hz" },
        ],
        simKey: "signals",
      },
    ],
  },
};

const TOPIC_KEYS = Object.keys(topics);
function SimCanvas({ simKey, controls }) {
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
      if (simKey === "projectile") drawProjectile(ctx, W, H, t, controls);
      else if (simKey === "newton") drawNewton(ctx, W, H, t, controls);
      else if (simKey === "shm") drawSHM(ctx, W, H, t, controls);
      else if (simKey === "circular") drawCircular(ctx, W, H, t, controls);
      else if (simKey === "momentum") drawMomentum(ctx, W, H, t, controls);
      else if (simKey === "waves") drawWaves(ctx, W, H, t, controls);
      else if (simKey === "thermo") drawThermo(ctx, W, H, t, canvas, particlesRef, controls);
      else if (simKey === "em") drawEM(ctx, W, H, t, controls);
      else if (simKey === "quantum") drawQuantum(ctx, W, H, t, controls);
      else if (simKey === "relativity") drawRelativity(ctx, W, H, t, controls);
      else if (simKey === "nuclear") drawNuclear(ctx, W, H, t, controls);
      else if (simKey === "doppler") drawDoppler(ctx, W, H, t, controls);
      else if (simKey === "refraction") drawRefraction(ctx, W, H, t, controls);
      else if (simKey === "diffraction") drawDiffraction(ctx, W, H, t, controls);
      else if (simKey === "polarisation") drawPolarisation(ctx, W, H, t, controls);
      else if (simKey === "circuits") drawCircuits(ctx, W, H, t, controls);
else if (simKey === "structures") drawStructures(ctx, W, H, t, controls);
else if (simKey === "fluid") drawFluid(ctx, W, H, t, controls);
else if (simKey === "thermocycles") drawThermoCycles(ctx, W, H, t, controls);
else if (simKey === "signals") drawSignals(ctx, W, H, t, controls);else if (simKey === "algebra") drawAlgebra(ctx, W, H, t, controls);
      else if (simKey === "trigonometry") drawTrigonometry(ctx, W, H, t, controls);
      else if (simKey === "calculus") drawCalculus(ctx, W, H, t, controls);
      else if (simKey === "vectors") drawVectors(ctx, W, H, t, controls);
      else if (simKey === "graphs") drawGraphs(ctx, W, H, t, controls);
      animRef.current = requestAnimationFrame(loop);
    }
    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [simKey, controls]);

  return <canvas ref={canvasRef} width={620} height={260} style={{ width: "100%", height: "100%", display: "block" }} />;
}

function drawProjectile(ctx, W, H, t, controls) {
  const g = 9.8, v0 = controls.speed || 25;
  const angle = ((controls.angle || 45) * Math.PI) / 180;
  const vx = v0 * Math.cos(angle), vy = v0 * Math.sin(angle);
  const maxRange = (v0 * v0 * Math.sin(2 * angle)) / g;
  const maxHeight = (vy * vy) / (2 * g);
  const totalTime = (2 * vy) / g;
  const sx = W * 0.06, sy = H - 40;
  const scaleX = (W - 80) / maxRange, scaleY = (H - 80) / Math.max(maxHeight, 1);
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
  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace";
  ctx.fillText(`Range: ${maxRange.toFixed(1)}m  Max H: ${maxHeight.toFixed(1)}m  θ=${controls.angle||45}°  v₀=${v0}m/s`, sx, H - 8);
}

function drawNewton(ctx, W, H, t, controls) {
  const mass = controls.mass || 5, force = controls.force || 20;
  const friction = Math.min(force * 0.4, 15);
  const netForce = Math.max(0, force - friction);
  const acc = netForce / mass;
  const cx = W / 2, cy = H / 2;
  const boxX = ((t * acc * 15) % (W - 80)) + 40;
  ctx.fillStyle = "rgba(255,255,255,0.1)"; ctx.fillRect(40, cy + 30, W - 80, 4);
  ctx.strokeStyle = "rgba(255,255,255,0.2)"; ctx.lineWidth = 1;
  ctx.strokeRect(40, cy + 30, W - 80, 4);
  const bw = 60, bh = 40;
  ctx.fillStyle = "#378ADD"; ctx.fillRect(boxX - bw/2, cy - bh/2, bw, bh);
  ctx.strokeStyle = "rgba(255,255,255,0.3)"; ctx.lineWidth = 1;
  ctx.strokeRect(boxX - bw/2, cy - bh/2, bw, bh);
  ctx.fillStyle = "#fff"; ctx.font = "12px monospace"; ctx.textAlign = "center";
  ctx.fillText(`${mass}kg`, boxX, cy + 5);
  ctx.strokeStyle = "#E85D24"; ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.moveTo(boxX + bw/2, cy);
  ctx.lineTo(boxX + bw/2 + force * 2, cy); ctx.stroke();
  ctx.fillStyle = "#E85D24"; ctx.fillText(`F=${force}N`, boxX + bw/2 + force + 10, cy - 8);
  ctx.strokeStyle = "#7F77DD"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(boxX - bw/2, cy);
  ctx.lineTo(boxX - bw/2 - friction * 2, cy); ctx.stroke();
  ctx.fillStyle = "#7F77DD"; ctx.fillText(`f=${friction.toFixed(0)}N`, boxX - bw/2 - friction - 10, cy - 8);
  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace";
  ctx.fillText(`a = ${acc.toFixed(2)} m/s²  |  F_net = ${netForce.toFixed(0)}N`, W/2, H - 10);
  ctx.textAlign = "left";
}

function drawSHM(ctx, W, H, t, controls) {
  const L = (controls.length || 2) * 30, amp = ((controls.amplitude || 30) * Math.PI) / 180;
  const g = 9.8, period = 2 * Math.PI * Math.sqrt((controls.length || 2) / g);
  const omega = 2 * Math.PI / period;
  const angle = amp * Math.cos(omega * t);
  const pivotX = W / 2, pivotY = 40;
  const bobX = pivotX + L * Math.sin(angle);
  const bobY = pivotY + L * Math.cos(angle);
  ctx.strokeStyle = "rgba(255,255,255,0.3)"; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(pivotX, pivotY); ctx.lineTo(bobX, bobY); ctx.stroke();
  ctx.beginPath(); ctx.arc(pivotX, pivotY, 5, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.fill();
  const grad = ctx.createRadialGradient(bobX - 3, bobY - 3, 1, bobX, bobY, 14);
  grad.addColorStop(0, "#5ba8e8"); grad.addColorStop(1, "#185FA5");
  ctx.beginPath(); ctx.arc(bobX, bobY, 14, 0, Math.PI * 2);
  ctx.fillStyle = grad; ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.1)"; ctx.lineWidth = 0.5; ctx.setLineDash([3, 3]);
  ctx.beginPath(); ctx.moveTo(pivotX, pivotY); ctx.lineTo(pivotX, pivotY + L); ctx.stroke();
  ctx.setLineDash([]);
  const KE = Math.abs(Math.sin(omega * t));
  const PE = Math.abs(Math.cos(omega * t));
  ctx.fillStyle = "#1D9E75"; ctx.fillRect(W - 80, H - 20 - KE * 60, 18, KE * 60);
  ctx.fillStyle = "#E85D24"; ctx.fillRect(W - 55, H - 20 - PE * 60, 18, PE * 60);
  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "10px monospace"; ctx.textAlign = "center";
  ctx.fillText("KE", W - 71, H - 8); ctx.fillText("PE", W - 46, H - 8);
  ctx.fillText(`T = ${period.toFixed(2)}s  |  L = ${controls.length||2}m`, W/2, H - 8);
  ctx.textAlign = "left";
}

function drawCircular(ctx, W, H, t, controls) {
  const speed = controls.speed || 8, radius = controls.radius || 80;
  const cx = W / 2, cy = H / 2;
  const omega = speed / (radius * 0.4);
  const r = Math.min(radius * 0.4, Math.min(W, H) * 0.35);
  const angle = omega * t;
  const px = cx + r * Math.cos(angle), py = cy + r * Math.sin(angle);
  ctx.strokeStyle = "rgba(255,255,255,0.1)"; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
  ctx.strokeStyle = "#D4537E"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(px, py); ctx.stroke();
  const centF = 5, fx = -(px - cx) / r * centF * 8, fy = -(py - cy) / r * centF * 8;
  ctx.strokeStyle = "#E85D24"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + fx, py + fy); ctx.stroke();
  const vx = -Math.sin(angle) * 20, vy = Math.cos(angle) * 20;
  ctx.strokeStyle = "#1D9E75"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + vx, py + vy); ctx.stroke();
  const grad = ctx.createRadialGradient(px - 2, py - 2, 1, px, py, 12);
  grad.addColorStop(0, "#f09b79"); grad.addColorStop(1, "#D85A30");
  ctx.beginPath(); ctx.arc(px, py, 12, 0, Math.PI * 2); ctx.fillStyle = grad; ctx.fill();
  const F = (1 * speed * speed) / (radius * 0.01);
  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText(`v=${speed}m/s  r=${radius}m  F_c=${F.toFixed(0)}N`, W/2, H - 8);
  ctx.fillStyle = "#E85D24"; ctx.fillText("← Fc", px + fx - 10, py + fy - 8);
  ctx.fillStyle = "#1D9E75"; ctx.fillText("v→", px + vx + 5, py + vy - 5);
  ctx.textAlign = "left";
}

function drawMomentum(ctx, W, H, t, controls) {
  const m1 = controls.mass1 || 2, m2 = controls.mass2 || 3;
  const cy = H / 2;
  const collisionTime = 3;
  const phase = t % (collisionTime * 2 + 2);
  let x1, x2, v1after, v2after;
  const v1 = 5;
  v1after = ((m1 - m2) * v1) / (m1 + m2);
  v2after = (2 * m1 * v1) / (m1 + m2);
  if (phase < collisionTime) {
    x1 = 60 + (phase / collisionTime) * (W / 2 - 100);
    x2 = W - 80;
  } else if (phase < collisionTime + 0.3) {
    x1 = W / 2 - 40; x2 = W / 2 + 40;
  } else {
    const pt = phase - collisionTime - 0.3;
    x1 = W / 2 - 40 + v1after * pt * 30;
    x2 = W / 2 + 40 + v2after * pt * 20;
  }
  const r1 = 8 + m1 * 3, r2 = 8 + m2 * 3;
  const g1 = ctx.createRadialGradient(x1-3, cy-3, 1, x1, cy, r1);
  g1.addColorStop(0, "#5ba8e8"); g1.addColorStop(1, "#185FA5");
  ctx.beginPath(); ctx.arc(x1, cy, r1, 0, Math.PI * 2); ctx.fillStyle = g1; ctx.fill();
  ctx.fillStyle = "#fff"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText(`${m1}kg`, x1, cy + 4);
  const g2 = ctx.createRadialGradient(x2-3, cy-3, 1, x2, cy, r2);
  g2.addColorStop(0, "#f09b79"); g2.addColorStop(1, "#D85A30");
  ctx.beginPath(); ctx.arc(x2, cy, r2, 0, Math.PI * 2); ctx.fillStyle = g2; ctx.fill();
  ctx.fillStyle = "#fff"; ctx.fillText(`${m2}kg`, x2, cy + 4);
  const p_before = m1 * v1, p_after = m1 * v1after + m2 * v2after;
  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace";
  ctx.fillText(`p_before=${p_before.toFixed(1)}  p_after=${p_after.toFixed(1)} kg·m/s`, W/2, H - 8);
  ctx.textAlign = "left";
}

function drawWaves(ctx, W, H, t, controls) {
  const f1 = controls.freq1 || 2, f2 = controls.freq2 || 3;
  const rows = [
    { y: H * 0.22, f: f1, col: "#378ADD", lbl: `Wave 1 (f=${f1}Hz)` },
    { y: H * 0.52, f: f2, col: "#1D9E75", lbl: `Wave 2 (f=${f2}Hz)` },
    { y: H * 0.80, f: null, col: "#E85D24", lbl: "Superposition" },
  ];
  const A = 24, pad = 50;
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
    ctx.font = "10px monospace"; ctx.fillStyle = row.col;
    ctx.fillText(row.lbl, pad + 4, row.y - A - 4);
  });
}

function drawDoppler(ctx, W, H, t, controls) {
  const vs = controls.vsource || 30;
  const c = 343, cx = W / 2, cy = H / 2;
  const sourceX = (W * 0.1 + (t * vs * 0.8) % (W * 0.8));
  ctx.fillStyle = "#E85D24";
  ctx.beginPath(); ctx.arc(sourceX, cy, 10, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#fff"; ctx.font = "10px monospace"; ctx.textAlign = "center";
  ctx.fillText("🔊", sourceX, cy + 4);
  for (let i = 1; i <= 4; i++) {
    const age = (t * 0.5) % 2;
    const r = (i * 40 + age * 60) % 200;
    const waveSourceX = sourceX - vs * (r / c) * 2;
    ctx.beginPath(); ctx.arc(Math.max(20, Math.min(W-20, waveSourceX)), cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(59,139,212,${0.6 - r/300})`; ctx.lineWidth = 1.5; ctx.stroke();
  }
  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace";
  ctx.fillText(`Source speed: ${vs} m/s  |  Compressed ahead, stretched behind`, W/2, H - 8);
  ctx.textAlign = "left";
}

function drawRefraction(ctx, W, H, t, controls) {
  const angle = ((controls.angle || 30) * Math.PI) / 180;
  const n2 = (controls.n2 || 15) / 10;
  const n1 = 1.0;
  const sinR = (n1 * Math.sin(angle)) / n2;
  const refAngle = Math.asin(Math.min(1, sinR));
  const cx = W / 2, cy = H / 2;
  ctx.fillStyle = "rgba(59,139,212,0.08)";
  ctx.fillRect(0, cy, W, H - cy);
  ctx.strokeStyle = "rgba(255,255,255,0.15)"; ctx.lineWidth = 1; ctx.setLineDash([5, 5]);
  ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, H); ctx.stroke(); ctx.setLineDash([]);
  ctx.strokeStyle = "rgba(255,255,255,0.2)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(W, cy); ctx.stroke();
  const len = 160;
  const ix = cx - Math.sin(angle) * len, iy = cy - Math.cos(angle) * len;
  ctx.strokeStyle = "#F2C94C"; ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.moveTo(ix, iy); ctx.lineTo(cx, cy); ctx.stroke();
  const rx = cx + Math.sin(refAngle) * len, ry = cy + Math.cos(refAngle) * len;
  ctx.strokeStyle = "#F2C94C"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(rx, ry); ctx.stroke();
  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText(`n₁=${n1}  n₂=${n2}  θᵢ=${(angle*180/Math.PI).toFixed(0)}°  θᵣ=${(refAngle*180/Math.PI).toFixed(1)}°`, W/2, H-8);
  ctx.fillStyle = "rgba(255,255,255,0.3)"; ctx.font = "11px monospace";
  ctx.fillText("Air", W*0.15, cy - 20); ctx.fillText("Glass", W*0.15, cy + 25);
  ctx.textAlign = "left";
}

function drawDiffraction(ctx, W, H, t, controls) {
  const slitW = controls.slitwidth || 3;
  const cx = W / 2, slitX = cx - 60;
  ctx.fillStyle = "rgba(255,255,255,0.15)";
  ctx.fillRect(slitX - 5, 0, 10, H/2 - slitW*8);
  ctx.fillRect(slitX - 5, H/2 + slitW*8, 10, H/2 - slitW*8);
  ctx.strokeStyle = "#F2C94C"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(40, H/2); ctx.lineTo(slitX - 5, H/2); ctx.stroke();
  for (let i = -3; i <= 3; i++) {
    const spreadAngle = (i / slitW) * 0.8;
    const ex = W - 40, ey = H/2 + Math.tan(spreadAngle) * (W - 40 - slitX);
    if (ey > 0 && ey < H) {
      const intensity = Math.exp(-i*i / (slitW * 0.8));
      ctx.strokeStyle = `rgba(242,201,76,${intensity * 0.8})`;
      ctx.lineWidth = intensity * 3;
      ctx.beginPath(); ctx.moveTo(slitX + 5, H/2); ctx.lineTo(ex, ey); ctx.stroke();
    }
  }
  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText(`Slit width: ${slitW} units  |  Narrower slit = more diffraction`, W/2, H-8);
  ctx.textAlign = "left";
}

function drawPolarisation(ctx, W, H, t, controls) {
  const filterAngle = ((controls.angle || 45) * Math.PI) / 180;
  const intensity = Math.cos(filterAngle) * Math.cos(filterAngle);
  const cx = W / 3, cx2 = 2 * W / 3, cy = H / 2;
  for (let a = 0; a < Math.PI; a += Math.PI / 8) {
    const r = 35;
    ctx.strokeStyle = "rgba(242,201,76,0.5)"; ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
    ctx.lineTo(cx - Math.cos(a) * r, cy - Math.sin(a) * r);
    ctx.stroke();
  }
  ctx.strokeStyle = "#F2C94C"; ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(cx + 45, cy); ctx.lineTo(cx2 - 45, cy); ctx.stroke();
  ctx.strokeStyle = "#7F77DD"; ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(cx2 - 35, cy - 35); ctx.lineTo(cx2 + 35, cy + 35); ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx2 - 35, cy + 35); ctx.lineTo(cx2 + 35, cy - 35); ctx.stroke();
  const r2 = 35 * intensity;
  ctx.strokeStyle = `rgba(242,201,76,${intensity})`; ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(cx2 + 45, cy - r2); ctx.lineTo(cx2 + 45, cy + r2); ctx.stroke();
  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText(`Filter angle: ${controls.angle||45}°  |  Transmitted intensity: ${(intensity*100).toFixed(0)}%`, W/2, H-8);
  ctx.textAlign = "left";
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
  ctx.font = "11px monospace"; ctx.fillStyle = "rgba(255,255,255,0.45)"; ctx.textAlign = "center";
  ctx.fillText(`T = ${temp}K`, W / 2, H - 8); ctx.textAlign = "left";
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
  ctx.font = "11px monospace"; ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.textAlign = "center";
  ctx.fillText(`q = ${q}e`, W / 2, H - 8); ctx.textAlign = "left";
}

function drawQuantum(ctx, W, H, t, controls) {
  const n = controls.n || 2, L = W - 80, ox = 40, midY = H / 2;
  ctx.strokeStyle = "rgba(255,255,255,0.25)"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(ox, midY - 70); ctx.lineTo(ox, midY + 70); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(ox + L, midY - 70); ctx.lineTo(ox + L, midY + 70); ctx.stroke();
  ctx.beginPath(); ctx.strokeStyle = "#7F77DD"; ctx.lineWidth = 2;
  for (let i = 0; i <= 200; i++) {
    const x = ox + (i / 200) * L, psi = 55 * Math.sin((n * Math.PI * i) / 200);
    i === 0 ? ctx.moveTo(x, midY - psi) : ctx.lineTo(x, midY - psi);
  }
  ctx.stroke();
  ctx.beginPath(); ctx.strokeStyle = "rgba(232,93,36,0.7)"; ctx.lineWidth = 1.5;
  for (let i = 0; i <= 200; i++) {
    const x = ox + (i / 200) * L, psi = Math.sin((n * Math.PI * i) / 200);
    i === 0 ? ctx.moveTo(x, midY + psi * psi * 35) : ctx.lineTo(x, midY + psi * psi * 35);
  }
  ctx.stroke();
  const ptX = ox + ((Math.sin(t * 0.5) + 1) / 2) * L;
  const ptPsi = 55 * Math.sin((n * Math.PI * (ptX - ox)) / L);
  ctx.beginPath(); ctx.arc(ptX, midY - ptPsi, 5, 0, Math.PI * 2); ctx.fillStyle = "#7F77DD"; ctx.fill();
  ctx.font = "10px monospace";
  ctx.fillStyle = "#7F77DD"; ctx.fillText("ψ(x)", 4, midY - 45);
  ctx.fillStyle = "rgba(232,93,36,0.85)"; ctx.fillText("|ψ|²", 4, midY + 45);
  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.textAlign = "center";
  ctx.fillText(`n = ${n}  |  ${n} antinode${n > 1 ? "s" : ""}`, W / 2, H - 8);
  ctx.textAlign = "left";
}

function drawRelativity(ctx, W, H, t, controls) {
  const beta = (controls.velocity || 80) / 100, gamma = 1 / Math.sqrt(1 - beta * beta);
  const cx1 = W * 0.28, cx2 = W * 0.72, cy = H / 2;
  [{ cx: cx1, angle: t % (Math.PI * 2), col: "#1D9E75", label: "Stationary", sub: "" },
   { cx: cx2, angle: (t % (Math.PI * 2)) / gamma, col: "#378ADD", label: "Moving", sub: `×1/${gamma.toFixed(2)} slower` }
  ].forEach(({ cx, angle, col, label, sub }) => {
    ctx.beginPath(); ctx.arc(cx, cy, 50, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(20,20,30,0.85)"; ctx.fill();
    ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.stroke();
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(a) * 43, cy + Math.sin(a) * 43);
      ctx.lineTo(cx + Math.cos(a) * 48, cy + Math.sin(a) * 48);
      ctx.strokeStyle = "rgba(255,255,255,0.2)"; ctx.lineWidth = 1; ctx.stroke();
    }
    ctx.beginPath(); ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.sin(angle) * 38, cy - Math.cos(angle) * 38);
    ctx.strokeStyle = col; ctx.lineWidth = 2.5; ctx.stroke();
    ctx.font = "11px sans-serif"; ctx.fillStyle = col; ctx.textAlign = "center";
    ctx.fillText(label, cx, cy + 65);
    if (sub) { ctx.font = "10px monospace"; ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.fillText(sub, cx, cy + 80); }
  });
  ctx.font = "11px monospace"; ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.textAlign = "center";
  ctx.fillText(`v = ${controls.velocity||80}% c  |  γ = ${gamma.toFixed(3)}`, W / 2, H - 8);
  ctx.textAlign = "left";
}

function drawNuclear(ctx, W, H, t, controls) {
  const T12 = controls.halflife || 4, lambda = Math.log(2) / T12, N0 = 64;
  const cw = W * 0.5, ch = H - 60, ox = 40, oy = H - 30;
  ctx.strokeStyle = "rgba(255,255,255,0.08)"; ctx.lineWidth = 0.5;
  for (let i = 0; i <= 4; i++) {
    const y = oy - (i / 4) * ch;
    ctx.beginPath(); ctx.moveTo(ox, y); ctx.lineTo(ox + cw, y); ctx.stroke();
    ctx.fillStyle = "rgba(255,255,255,0.3)"; ctx.font = "9px monospace"; ctx.textAlign = "right";
    ctx.fillText(Math.round(N0 * (i / 4)), ox - 3, y + 3);
  }
  ctx.beginPath(); ctx.strokeStyle = "#E85D24"; ctx.lineWidth = 2;
  const maxT = T12 * 3.5;
  for (let i = 0; i <= 100; i++) {
    const x = ox + (i / 100) * cw, y = oy - Math.exp(-lambda * (i / 100) * maxT) * ch;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.stroke();
  const cT = t % (maxT + 1), cx2 = ox + (cT / maxT) * cw, cy2 = oy - Math.exp(-lambda * cT) * ch;
  ctx.beginPath(); ctx.arc(cx2, cy2, 5, 0, Math.PI * 2); ctx.fillStyle = "#E85D24"; ctx.fill();
  const Ncur = Math.round(N0 * Math.exp(-lambda * cT));
  const gx = W * 0.6, gy = 20;
  ctx.font = "10px monospace"; ctx.textAlign = "left"; ctx.fillStyle = "rgba(255,255,255,0.4)";
  ctx.fillText(`Remaining: ${Ncur} / ${N0}`, gx, gy);
  for (let i = 0; i < N0; i++) {
    const col = i % 8, row = Math.floor(i / 8);
    const nx = gx + col * 16 + 8, ny = gy + row * 16 + 10;
    ctx.beginPath(); ctx.arc(nx, ny, 5, 0, Math.PI * 2);
    if (i < Ncur) { ctx.fillStyle = "#7F77DD"; ctx.fill(); }
    else { ctx.strokeStyle = "rgba(255,255,255,0.12)"; ctx.lineWidth = 0.5; ctx.stroke(); }
  }
  ctx.strokeStyle = "rgba(255,255,255,0.2)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(ox, oy - ch - 8); ctx.lineTo(ox, oy); ctx.lineTo(ox + cw + 8, oy); ctx.stroke();
  ctx.fillStyle = "rgba(255,255,255,0.35)"; ctx.textAlign = "center";
  ctx.fillText(`T½=${T12}s`, ox + cw / 2, H - 8); ctx.textAlign = "left";
}

const STEPS = ["Introduction", "Simulation", "Key Concepts", "Worked Example", "Practice", "Quiz", "Summary"];

function Controls({ controls, values, onChange }) {
  return (
    <div style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "center" }}>
      {controls.map((ctrl) => (
        <div key={ctrl.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", minWidth: 90 }}>{ctrl.label}</span>
          <input type="range" min={ctrl.min} max={ctrl.max} value={values[ctrl.id] ?? ctrl.val}
            onChange={(e) => onChange(ctrl.id, Number(e.target.value))}
            style={{ width: 100, accentColor: "#378ADD", cursor: "pointer" }} />
          <span style={{ fontSize: 12, fontFamily: "monospace", color: "#fff", minWidth: 44 }}>{values[ctrl.id] ?? ctrl.val}{ctrl.unit}</span>
        </div>
      ))}
    </div>
  );
}

function drawCircuits(ctx, W, H, t, controls) {
  const voltage = controls.voltage || 12, resistance = controls.resistance || 6;
  const current = voltage / resistance;
  const cx = W / 2, cy = H / 2;
  const nodes = [
    { x: cx - 160, y: cy - 80 },
    { x: cx + 160, y: cy - 80 },
    { x: cx + 160, y: cy + 80 },
    { x: cx - 160, y: cy + 80 },
  ];
  ctx.strokeStyle = "#F2C94C"; ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(nodes[0].x, nodes[0].y);
  ctx.lineTo(nodes[1].x, nodes[1].y);
  ctx.lineTo(nodes[2].x, nodes[2].y);
  ctx.lineTo(nodes[3].x, nodes[3].y);
  ctx.lineTo(nodes[0].x, nodes[0].y);
  ctx.stroke();
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
  ctx.fillStyle = "#E85D24"; ctx.font = "bold 14px monospace"; ctx.textAlign = "center";
  ctx.fillText(voltage + "V", nodes[3].x, cy);
  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace";
  ctx.fillText("V=" + voltage + "V  R=" + resistance + "ohm  I=" + current.toFixed(2) + "A  P=" + (voltage*current).toFixed(1) + "W", W/2, H-8);
  ctx.textAlign = "left";
}

function drawStructures(ctx, W, H, t, controls) {
  const load = controls.load || 500;
  const pos = (controls.position || 25) / 100;
  const beamL = W - 120, beamX = 60, beamY = H / 2;
  const loadX = beamX + pos * beamL;
  const R1 = load * (1 - pos), R2 = load * pos;
  ctx.fillStyle = "rgba(255,255,255,0.15)";
  ctx.fillRect(beamX, beamY - 8, beamL, 16);
  ctx.strokeStyle = "rgba(255,255,255,0.4)"; ctx.lineWidth = 1;
  ctx.strokeRect(beamX, beamY - 8, beamL, 16);
  const deflection = (load * pos * (1 - pos) * beamL * 0.0001);
  ctx.beginPath(); ctx.strokeStyle = "#E85D24"; ctx.lineWidth = 2; ctx.setLineDash([4, 4]);
  for (let i = 0; i <= 100; i++) {
    const x = beamX + (i / 100) * beamL;
    const xn = i / 100;
    const def = deflection * Math.sin(xn * Math.PI) * 30;
    i === 0 ? ctx.moveTo(x, beamY + def) : ctx.lineTo(x, beamY + def);
  }
  ctx.stroke(); ctx.setLineDash([]);
  ctx.strokeStyle = "#E85D24"; ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.moveTo(loadX, beamY - 60); ctx.lineTo(loadX, beamY - 10); ctx.stroke();
  ctx.fillStyle = "#E85D24"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText(load + "N", loadX, beamY - 65);
  ctx.fillStyle = "#1D9E75"; ctx.fillText("R1=" + R1.toFixed(0) + "N", beamX, beamY + 65);
  ctx.fillStyle = "#378ADD"; ctx.fillText("R2=" + R2.toFixed(0) + "N", beamX + beamL, beamY + 65);
  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace";
  ctx.fillText("Load=" + load + "N at " + (pos*100).toFixed(0) + "% | R1=" + R1.toFixed(0) + "N | R2=" + R2.toFixed(0) + "N", W/2, H-8);
  ctx.textAlign = "left";
}

function drawFluid(ctx, W, H, t, controls) {
  const a1 = controls.area1 || 10, v1 = controls.velocity1 || 2;
  const a2 = a1 / 2;
  const v2 = (a1 * v1) / a2;
  const pipe1W = a1 * 4, pipe2W = a2 * 4;
  const pipeY = H / 2;
  const transX = W * 0.45;
  ctx.fillStyle = "rgba(59,139,212,0.15)";
  ctx.fillRect(40, pipeY - pipe1W/2, transX - 40, pipe1W);
  ctx.fillRect(transX, pipeY - pipe2W/2, W - transX - 40, pipe2W);
  ctx.strokeStyle = "rgba(255,255,255,0.3)"; ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(40, pipeY - pipe1W/2);
  ctx.lineTo(transX, pipeY - pipe1W/2);
  ctx.lineTo(transX, pipeY - pipe2W/2);
  ctx.lineTo(W - 40, pipeY - pipe2W/2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(40, pipeY + pipe1W/2);
  ctx.lineTo(transX, pipeY + pipe1W/2);
  ctx.lineTo(transX, pipeY + pipe2W/2);
  ctx.lineTo(W - 40, pipeY + pipe2W/2);
  ctx.stroke();
  const particleCount = 10;
  for (let i = 0; i < particleCount; i++) {
    const phase = ((t * v1 * 0.15) + i / particleCount) % 1;
    let px, py;
    if (phase < 0.5) {
      px = 40 + phase * 2 * (transX - 40);
      py = pipeY + (Math.sin(i * 2.1) * pipe1W * 0.3);
    } else {
      px = transX + (phase - 0.5) * 2 * (W - 40 - transX);
      py = pipeY + (Math.sin(i * 2.1) * pipe2W * 0.3);
    }
    ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(59,139,212,0.8)"; ctx.fill();
  }
  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText("A1=" + a1 + "cm2  v1=" + v1 + "m/s  ->  A2=" + a2 + "cm2  v2=" + v2.toFixed(1) + "m/s", W/2, H-8);
  ctx.textAlign = "left";
}

function drawThermoCycles(ctx, W, H, t, controls) {
  const heatIn = controls.heat_in || 1000;
  const eff = (controls.efficiency || 40) / 100;
  const work = heatIn * eff;
  const heatOut = heatIn - work;
  const ox = 60, oy = H - 50, gw = W * 0.45, gh = H - 90;
  ctx.strokeStyle = "rgba(255,255,255,0.1)"; ctx.lineWidth = 0.5;
  for (let i = 0; i <= 4; i++) {
    ctx.beginPath(); ctx.moveTo(ox + i * gw/4, oy - gh); ctx.lineTo(ox + i * gw/4, oy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(ox, oy - i * gh/4); ctx.lineTo(ox + gw, oy - i * gh/4); ctx.stroke();
  }
  ctx.strokeStyle = "rgba(255,255,255,0.3)"; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(ox, oy - gh); ctx.lineTo(ox, oy); ctx.lineTo(ox + gw, oy); ctx.stroke();
  const pts = [
    { x: ox + gw*0.1, y: oy - gh*0.2 },
    { x: ox + gw*0.2, y: oy - gh*0.7 },
    { x: ox + gw*0.7, y: oy - gh*0.8 },
    { x: ox + gw*0.8, y: oy - gh*0.25 },
    { x: ox + gw*0.1, y: oy - gh*0.2 },
  ];
  ctx.beginPath(); ctx.strokeStyle = "#E85D24"; ctx.lineWidth = 2.5;
  ctx.moveTo(pts[0].x, pts[0].y);
  pts.forEach(function(p) { ctx.lineTo(p.x, p.y); });
  ctx.stroke();
  ctx.fillStyle = "rgba(232,93,36,0.1)";
  ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y);
  pts.forEach(function(p) { ctx.lineTo(p.x, p.y); });
  ctx.fill();
  const animPt = Math.floor(t * 2) % 4;
  ctx.beginPath(); ctx.arc(pts[animPt].x, pts[animPt].y, 8, 0, Math.PI * 2);
  ctx.fillStyle = "#E85D24"; ctx.fill();
  const bx = W * 0.6, by = H * 0.15;
  ctx.fillStyle = "#E85D24"; ctx.font = "12px monospace"; ctx.textAlign = "left";
  ctx.fillText("Q_in = " + heatIn + "J", bx, by);
  ctx.fillStyle = "#1D9E75"; ctx.fillText("W = " + work.toFixed(0) + "J", bx, by + 24);
  ctx.fillStyle = "#378ADD"; ctx.fillText("Q_out = " + heatOut.toFixed(0) + "J", bx, by + 48);
  ctx.fillStyle = "#F2C94C"; ctx.fillText("eff = " + (eff*100).toFixed(0) + "%", bx, by + 72);
  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText("Heat in: " + heatIn + "J  Work: " + work.toFixed(0) + "J  Efficiency: " + (eff*100).toFixed(0) + "%", W/2, H-8);
  ctx.textAlign = "left";
}

function drawSignals(ctx, W, H, t, controls) {
  const f1 = controls.freq1 || 2, f2 = controls.freq2 || 5;
  const pad = 50, A = 35;
  const rows = [
    { y: H * 0.22, f: f1, col: "#E85D24", lbl: "Signal 1 (" + f1 + "Hz)" },
    { y: H * 0.52, f: f2, col: "#378ADD", lbl: "Signal 2 (" + f2 + "Hz)" },
    { y: H * 0.82, f: null, col: "#1D9E75", lbl: "Combined signal" },
  ];
  rows.forEach(function(row) {
    ctx.strokeStyle = "rgba(255,255,255,0.06)"; ctx.lineWidth = 0.5;
    ctx.beginPath(); ctx.moveTo(pad, row.y); ctx.lineTo(W - pad, row.y); ctx.stroke();
    ctx.beginPath(); ctx.strokeStyle = row.col; ctx.lineWidth = 2;
    for (let x = pad; x < W - pad; x++) {
      const xn = (x - pad) / (W - 2*pad);
      const y = row.f
        ? row.y + A * Math.sin(2 * Math.PI * row.f * xn - t * row.f * 1.5)
        : row.y + (A * 0.6) * (Math.sin(2 * Math.PI * f1 * xn - t * f1 * 1.5) + Math.sin(2 * Math.PI * f2 * xn - t * f2 * 1.5));
      x === pad ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.fillStyle = row.col; ctx.font = "10px monospace";
    ctx.fillText(row.lbl, pad + 4, row.y - A - 4);
  });
  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText("Signal 1: " + f1 + "Hz  +  Signal 2: " + f2 + "Hz  =  Combined", W/2, H-8);
  ctx.textAlign = "left";
}

function drawAlgebra(ctx, W, H, t, controls) {
  const a = controls.a || 2, b = controls.b || -4;
  const W2 = W, H2 = H;
  const ox = W2 / 2, oy = H2 / 2;
  const scaleX = 40, scaleY = 40;

  ctx.strokeStyle = "rgba(255,255,255,0.1)"; ctx.lineWidth = 0.5;
  for (let x = -8; x <= 8; x++) {
    ctx.beginPath(); ctx.moveTo(ox + x * scaleX, 20); ctx.lineTo(ox + x * scaleX, H2 - 20); ctx.stroke();
  }
  for (let y = -4; y <= 4; y++) {
    ctx.beginPath(); ctx.moveTo(20, oy + y * scaleY); ctx.lineTo(W2 - 20, oy + y * scaleY); ctx.stroke();
  }

  ctx.strokeStyle = "rgba(255,255,255,0.3)"; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(20, oy); ctx.lineTo(W2 - 20, oy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(ox, 20); ctx.lineTo(ox, H2 - 20); ctx.stroke();

  ctx.beginPath(); ctx.strokeStyle = "#9B59B6"; ctx.lineWidth = 2.5;
  for (let px = 20; px < W2 - 20; px++) {
    const x = (px - ox) / scaleX;
    const y = a * x * x + b * x;
    const py = oy - y * scaleY;
    px === 20 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
  }
  ctx.stroke();

  const root1 = (-b + Math.sqrt(b * b)) / (2 * a);
  const root2 = (-b - Math.sqrt(b * b)) / (2 * a);
  [root1, root2].forEach(r => {
    if (isFinite(r) && Math.abs(r) < 7) {
      ctx.beginPath(); ctx.arc(ox + r * scaleX, oy, 6, 0, Math.PI * 2);
      ctx.fillStyle = "#E85D24"; ctx.fill();
    }
  });

  const vertex_x = -b / (2 * a);
  const vertex_y = a * vertex_x * vertex_x + b * vertex_x;
  ctx.beginPath(); ctx.arc(ox + vertex_x * scaleX, oy - vertex_y * scaleY, 6, 0, Math.PI * 2);
  ctx.fillStyle = "#1D9E75"; ctx.fill();

  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText(`y = ${a}x² ${b >= 0 ? '+' : ''}${b}x  |  vertex at (${vertex_x.toFixed(1)}, ${vertex_y.toFixed(1)})`, W2 / 2, H2 - 8);
  ctx.textAlign = "left";
}

function drawTrigonometry(ctx, W, H, t, controls) {
  const angle = ((controls.angle || 30) * Math.PI) / 180;
  const cx = W * 0.35, cy = H * 0.5, r = Math.min(W, H) * 0.3;

  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(255,255,255,0.2)"; ctx.lineWidth = 1; ctx.stroke();

  ctx.strokeStyle = "rgba(255,255,255,0.1)"; ctx.lineWidth = 0.5;
  ctx.beginPath(); ctx.moveTo(cx - r - 10, cy); ctx.lineTo(cx + r + 10, cy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx, cy - r - 10); ctx.lineTo(cx, cy + r + 10); ctx.stroke();

  const px = cx + r * Math.cos(angle), py = cy - r * Math.sin(angle);

  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(px, py);
  ctx.strokeStyle = "#9B59B6"; ctx.lineWidth = 2.5; ctx.stroke();

  ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px, cy);
  ctx.strokeStyle = "#E85D24"; ctx.lineWidth = 2; ctx.setLineDash([4, 4]); ctx.stroke();
  ctx.setLineDash([]);

  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(px, cy);
  ctx.strokeStyle = "#1D9E75"; ctx.lineWidth = 2; ctx.setLineDash([4, 4]); ctx.stroke();
  ctx.setLineDash([]);

  ctx.beginPath(); ctx.arc(cx, cy, r * 0.25, 0, angle, false);
  ctx.strokeStyle = "#F2C94C"; ctx.lineWidth = 1.5; ctx.stroke();

  const grad = ctx.createRadialGradient(px - 2, py - 2, 1, px, py, 8);
  grad.addColorStop(0, "#b388d9"); grad.addColorStop(1, "#9B59B6");
  ctx.beginPath(); ctx.arc(px, py, 8, 0, Math.PI * 2); ctx.fillStyle = grad; ctx.fill();

  const sinVal = Math.sin(angle), cosVal = Math.cos(angle), tanVal = Math.tan(angle);

  ctx.font = "12px monospace"; ctx.textAlign = "left";
  ctx.fillStyle = "#E85D24"; ctx.fillText(`sin(${controls.angle||30}°) = ${sinVal.toFixed(3)}`, W * 0.62, H * 0.3);
  ctx.fillStyle = "#1D9E75"; ctx.fillText(`cos(${controls.angle||30}°) = ${cosVal.toFixed(3)}`, W * 0.62, H * 0.3 + 22);
  ctx.fillStyle = "#F2C94C"; ctx.fillText(`tan(${controls.angle||30}°) = ${Math.abs(tanVal) < 10 ? tanVal.toFixed(3) : "∞"}`, W * 0.62, H * 0.3 + 44);

  ctx.fillStyle = "#E85D24"; ctx.font = "11px monospace";
  ctx.fillText("sin", px + 6, (py + cy) / 2);
  ctx.fillStyle = "#1D9E75";
  ctx.fillText("cos", (cx + px) / 2, cy + 14);

  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.textAlign = "center";
  ctx.fillText("Unit circle — drag angle slider to explore", W / 2, H - 8);
  ctx.textAlign = "left";
}

function drawCalculus(ctx, W, H, t, controls) {
  const power = controls.power || 2, coeff = controls.coeff || 3;
  const ox = 60, oy = H - 50, scaleX = (W - 100) / 4, scaleY = 30;

  ctx.strokeStyle = "rgba(255,255,255,0.1)"; ctx.lineWidth = 0.5;
  for (let x = 0; x <= 4; x++) {
    ctx.beginPath(); ctx.moveTo(ox + x * scaleX, 20); ctx.lineTo(ox + x * scaleX, oy); ctx.stroke();
    ctx.fillStyle = "rgba(255,255,255,0.3)"; ctx.font = "10px monospace"; ctx.textAlign = "center";
    ctx.fillText(x, ox + x * scaleX, oy + 14);
  }

  ctx.strokeStyle = "rgba(255,255,255,0.3)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(W - 30, oy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(ox, 20); ctx.lineTo(ox, oy); ctx.stroke();

  ctx.beginPath(); ctx.strokeStyle = "#9B59B6"; ctx.lineWidth = 2.5;
  for (let px = ox; px < W - 30; px++) {
    const x = (px - ox) / scaleX;
    const y = coeff * Math.pow(x, power);
    const py = oy - Math.min(y * scaleY, oy - 25);
    px === ox ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
  }
  ctx.stroke();

  const tangentX = (t * 0.3) % 3.5 + 0.2;
  const tangentY = coeff * Math.pow(tangentX, power);
  const slope = coeff * power * Math.pow(tangentX, power - 1);
  const tx = ox + tangentX * scaleX, ty = oy - Math.min(tangentY * scaleY, oy - 25);

  const tlen = 60;
  const tdx = tlen / Math.sqrt(1 + slope * slope * (scaleY / scaleX) * (scaleY / scaleX));
  const tdy = slope * tdx * (scaleY / scaleX);

  ctx.beginPath(); ctx.strokeStyle = "#E85D24"; ctx.lineWidth = 2;
  ctx.moveTo(tx - tdx, ty + tdy); ctx.lineTo(tx + tdx, ty - tdy); ctx.stroke();

  ctx.beginPath(); ctx.arc(tx, ty, 5, 0, Math.PI * 2);
  ctx.fillStyle = "#E85D24"; ctx.fill();

  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText(`f(x) = ${coeff}x${power > 1 ? `^${power}` : ""}  |  f'(x) = ${coeff * power}x${power > 2 ? `^${power - 1}` : ""}  |  slope at x=${tangentX.toFixed(1)}: ${slope.toFixed(2)}`, W / 2, H - 10);
  ctx.fillStyle = "#9B59B6"; ctx.fillText(`f(x) = ${coeff}x^${power}`, ox + 10, 35);
  ctx.fillStyle = "#E85D24"; ctx.fillText(`f'(x) = ${coeff * power}x^${power - 1}`, ox + 10, 52);
  ctx.textAlign = "left";
}

function drawVectors(ctx, W, H, t, controls) {
  const angle = ((controls.angle || 53) * Math.PI) / 180;
  const mag = controls.magnitude || 50;
  const cx = W * 0.4, cy = H * 0.55;
  const scale = 3;

  const vx = mag * Math.cos(angle) * scale, vy = -mag * Math.sin(angle) * scale;

  ctx.strokeStyle = "rgba(255,255,255,0.1)"; ctx.lineWidth = 0.5;
  ctx.beginPath(); ctx.moveTo(cx - 200, cy); ctx.lineTo(cx + 200, cy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx, cy - 150); ctx.lineTo(cx, cy + 50); ctx.stroke();

  ctx.strokeStyle = "#9B59B6"; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + vx, cy + vy); ctx.stroke();
  ctx.beginPath(); ctx.arc(cx + vx, cy + vy, 6, 0, Math.PI * 2);
  ctx.fillStyle = "#9B59B6"; ctx.fill();

  ctx.strokeStyle = "#1D9E75"; ctx.lineWidth = 2; ctx.setLineDash([5, 5]);
  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + vx, cy); ctx.stroke();
  ctx.setLineDash([]);

  ctx.strokeStyle = "#E85D24"; ctx.lineWidth = 2; ctx.setLineDash([5, 5]);
  ctx.beginPath(); ctx.moveTo(cx + vx, cy); ctx.lineTo(cx + vx, cy + vy); ctx.stroke();
  ctx.setLineDash([]);

  ctx.beginPath(); ctx.arc(cx, cy, 30, -angle, 0);
  ctx.strokeStyle = "#F2C94C"; ctx.lineWidth = 1.5; ctx.stroke();

  ctx.font = "12px monospace";
  ctx.fillStyle = "#1D9E75"; ctx.textAlign = "center";
  ctx.fillText(`vₓ = ${(mag * Math.cos(angle)).toFixed(1)}`, cx + vx / 2, cy + 18);
  ctx.fillStyle = "#E85D24"; ctx.textAlign = "left";
  ctx.fillText(`vᵧ = ${(mag * Math.sin(angle)).toFixed(1)}`, cx + vx + 8, cy + vy / 2);
  ctx.fillStyle = "#9B59B6";
  ctx.fillText(`|v| = ${mag}`, cx + vx / 2 - 10, cy + vy / 2 - 10);

  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText(`Magnitude = ${mag}  |  Angle = ${controls.angle||53}°  |  Components: (${(mag*Math.cos(angle)).toFixed(1)}, ${(mag*Math.sin(angle)).toFixed(1)})`, W / 2, H - 8);
  ctx.textAlign = "left";
}

function drawGraphs(ctx, W, H, t, controls) {
  const m = controls.gradient || 5, c = controls.intercept || 0;
  const ox = 60, oy = H / 2, scaleX = (W - 100) / 10, scaleY = 20;

  ctx.strokeStyle = "rgba(255,255,255,0.08)"; ctx.lineWidth = 0.5;
  for (let x = 0; x <= 10; x++) {
    ctx.beginPath(); ctx.moveTo(ox + x * scaleX, 20); ctx.lineTo(ox + x * scaleX, H - 20); ctx.stroke();
  }
  for (let y = -5; y <= 5; y++) {
    ctx.beginPath(); ctx.moveTo(ox, oy + y * scaleY * 2); ctx.lineTo(W - 30, oy + y * scaleY * 2); ctx.stroke();
  }

  ctx.strokeStyle = "rgba(255,255,255,0.3)"; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(W - 30, oy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(ox, 20); ctx.lineTo(ox, H - 20); ctx.stroke();

  ctx.beginPath(); ctx.strokeStyle = "#9B59B6"; ctx.lineWidth = 2.5;
  for (let px = ox; px < W - 30; px++) {
    const x = (px - ox) / scaleX;
    const y = m * x + c;
    const py = oy - y * scaleY;
    if (py > 15 && py < H - 15) {
      px === ox ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
  }
  ctx.stroke();

  const animX = (t * 0.5) % 8 + 1;
  const animY = m * animX + c;
  const apx = ox + animX * scaleX, apy = oy - animY * scaleY;
  if (apy > 15 && apy < H - 15) {
    ctx.beginPath(); ctx.arc(apx, apy, 7, 0, Math.PI * 2);
    ctx.fillStyle = "#E85D24"; ctx.fill();

    ctx.strokeStyle = "rgba(232,93,36,0.4)"; ctx.lineWidth = 1; ctx.setLineDash([3, 3]);
    ctx.beginPath(); ctx.moveTo(apx, apy); ctx.lineTo(apx, oy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(apx, apy); ctx.lineTo(ox, apy); ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = "rgba(255,255,255,0.5)"; ctx.font = "11px monospace";
    ctx.fillText(`(${animX.toFixed(1)}, ${animY.toFixed(1)})`, apx + 8, apy - 8);
  }

  const gradTriX1 = ox + 2 * scaleX, gradTriX2 = ox + 4 * scaleX;
  const gradTriY1 = oy - (m * 2 + c) * scaleY, gradTriY2 = oy - (m * 4 + c) * scaleY;
  ctx.strokeStyle = "#1D9E75"; ctx.lineWidth = 1.5; ctx.setLineDash([4, 4]);
  ctx.beginPath(); ctx.moveTo(gradTriX1, gradTriY1); ctx.lineTo(gradTriX2, gradTriY1); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(gradTriX2, gradTriY1); ctx.lineTo(gradTriX2, gradTriY2); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = "#1D9E75"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText(`rise = ${(m * 2).toFixed(0)}`, (gradTriX1 + gradTriX2) / 2, gradTriY1 + 14);
  ctx.fillText(`run = 2`, gradTriX2 + 20, (gradTriY1 + gradTriY2) / 2);

  ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "11px monospace";
  ctx.fillText(`y = ${m}x ${c >= 0 ? '+' : ''}${c}  |  gradient = ${m}  |  y-intercept = ${c}`, W / 2, H - 8);
  ctx.textAlign = "left";
}
function AskAI({ topic, lesson }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  useEffect(() => {
    setMessages([{ role: "assistant", text: `Hi! I'm your physics tutor. Ask me anything about ${lesson.title} — concepts, equations, or how the simulation works.` }]);
  }, [lesson]);
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
          system: `You are a concise physics tutor. The student is studying "${lesson.title}" in ${topic.title}. Key equations: ${lesson.equations}. Answer in 2-3 short paragraphs. Be clear and use simple analogies. No markdown headers or bullet lists.`,
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
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "12px 0" }}>
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8, marginBottom: 10 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ padding: "8px 12px", borderRadius: 8, fontSize: 13, lineHeight: 1.6, maxWidth: "88%", alignSelf: m.role === "user" ? "flex-end" : "flex-start", background: m.role === "user" ? "#378ADD" : "rgba(255,255,255,0.07)", color: m.role === "user" ? "#fff" : "rgba(255,255,255,0.85)", borderLeft: m.role === "assistant" ? "2px solid #378ADD" : "none" }}>{m.text}</div>
        ))}
        {loading && <div style={{ padding: "8px 12px", borderRadius: 8, fontSize: 13, background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.4)", alignSelf: "flex-start", borderLeft: "2px solid #378ADD" }}>Thinking...</div>}
        <div ref={bottomRef} />
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Ask anything about this topic..." style={{ flex: 1, padding: "8px 12px", borderRadius: 8, border: "0.5px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.05)", color: "#fff", fontSize: 13, fontFamily: "system-ui, sans-serif", outline: "none" }} />
        <button onClick={send} disabled={loading} style={{ padding: "8px 16px", borderRadius: 8, border: "none", background: "#378ADD", color: "#fff", fontSize: 13, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1 }}>Ask</button>
      </div>
    </div>
  );
}

function Quiz({ topic, lesson, onComplete }) {
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
          system: `You are a physics quiz generator. Generate exactly 3 short answer questions about "${lesson.title}". Return ONLY a JSON array: [{"question": "...", "answer": "...", "hint": "..."}]. Keep answers concise (1-2 sentences).`,
          messages: [{ role: "user", content: `Generate 3 quiz questions about ${lesson.title}. Key equations: ${lesson.equations}` }],
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
          system: `You are a physics teacher grading answers. Be encouraging. Reply ONLY with JSON: {"correct": true or false, "feedback": "1-2 sentences"}`,
          messages: [{ role: "user", content: `Question: ${questions[current].question}\nCorrect answer: ${questions[current].answer}\nStudent answer: ${answer}` }],
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
    } catch { setFeedback("Could not grade. Please try again."); setLoading(false); }
  }

  if (stage === "start") return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 14 }}>
      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", textAlign: "center", maxWidth: 300 }}>Test your understanding of {lesson.title} with 3 AI-generated questions.</div>
      <button onClick={startQuiz} style={{ padding: "10px 28px", borderRadius: 8, border: "none", background: topic.color, color: "#fff", fontSize: 14, cursor: "pointer" }}>Start Quiz</button>
    </div>
  );

  if (stage === "loading") return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "rgba(255,255,255,0.4)", fontSize: 13 }}>Generating questions...</div>;

  if (stage === "error") return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 10 }}>
      <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>Could not generate questions.</div>
      <button onClick={() => setStage("start")} style={{ padding: "8px 20px", borderRadius: 8, border: "0.5px solid rgba(255,255,255,0.2)", background: "transparent", color: "#fff", cursor: "pointer", fontSize: 13 }}>Try Again</button>
    </div>
  );

  if (stage === "quiz") return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Question {current + 1} of {questions.length}</span>
        <span style={{ fontSize: 12, color: topic.color }}>Score: {score}/{current}</span>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ fontSize: 14, color: "#fff", lineHeight: 1.6, padding: 14, background: "rgba(255,255,255,0.05)", borderRadius: 8, borderLeft: `2px solid ${topic.color}` }}>{questions[current]?.question}</div>
        {questions[current]?.hint && <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", fontStyle: "italic" }}>Hint: {questions[current].hint}</div>}
        {feedback && (
          <div style={{ fontSize: 13, padding: "10px 12px", borderRadius: 8, lineHeight: 1.6, background: results[results.length-1]?.correct ? "rgba(29,158,117,0.15)" : "rgba(232,93,36,0.15)", color: results[results.length-1]?.correct ? "#1D9E75" : "#E85D24", border: `0.5px solid ${results[results.length-1]?.correct ? "rgba(29,158,117,0.3)" : "rgba(232,93,36,0.3)"}` }}>
            {results[results.length-1]?.correct ? "✓ Correct! " : "✗ Not quite. "}{feedback}
          </div>
        )}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <input value={answer} onChange={(e) => setAnswer(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submitAnswer()} placeholder="Type your answer..." disabled={!!feedback} style={{ flex: 1, padding: "8px 12px", borderRadius: 8, border: "0.5px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.05)", color: "#fff", fontSize: 13, fontFamily: "system-ui, sans-serif", outline: "none", opacity: feedback ? 0.5 : 1 }} />
        <button onClick={submitAnswer} disabled={!!feedback || loading} style={{ padding: "8px 16px", borderRadius: 8, border: "none", background: topic.color, color: "#fff", fontSize: 13, cursor: feedback || loading ? "not-allowed" : "pointer", opacity: feedback || loading ? 0.6 : 1 }}>
          {loading ? "Grading..." : "Submit"}
        </button>
      </div>
    </div>
  );

  if (stage === "results") return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: 12, overflowY: "auto" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 32, marginBottom: 6 }}>{score === questions.length ? "🎉" : score >= questions.length / 2 ? "👍" : "📚"}</div>
        <div style={{ fontSize: 18, fontWeight: 500, color: "#fff" }}>{score} / {questions.length}</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 3 }}>{score === questions.length ? "Perfect score!" : score >= questions.length / 2 ? "Good effort!" : "Keep studying!"}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {results.map((r, i) => (
          <div key={i} style={{ padding: "10px 12px", borderRadius: 8, background: r.correct ? "rgba(29,158,117,0.1)" : "rgba(232,93,36,0.1)", border: `0.5px solid ${r.correct ? "rgba(29,158,117,0.25)" : "rgba(232,93,36,0.25)"}` }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 3 }}>Q{i+1}: {r.question}</div>
            <div style={{ fontSize: 11, color: r.correct ? "#1D9E75" : "#E85D24" }}>{r.correct ? "✓" : "✗"} {r.answer}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 3 }}>{r.feedback}</div>
          </div>
        ))}
      </div>
      <button onClick={() => { setStage("start"); setAnswer(""); setFeedback(""); }} style={{ padding: "8px 20px", borderRadius: 8, border: "none", background: topic.color, color: "#fff", fontSize: 13, cursor: "pointer", alignSelf: "center" }}>Try Again</button>
    </div>
  );
}

function LessonView({ topic, lesson, onComplete, completed }) {
  const [step, setStep] = useState(0);
  const [controlValues, setControlValues] = useState({});
  const isCompleted = completed.lessons?.includes(lesson.id);
  const controls = lesson.controls || [];
  const currentControls = {};
  controls.forEach((c) => { currentControls[c.id] = controlValues[c.id] ?? c.val; });

  const stepContent = [
    // 0: Introduction
    <div style={{ lineHeight: 1.8, fontSize: 14, color: "rgba(255,255,255,0.85)" }}>
      <p style={{ marginBottom: 16 }}>{lesson.introduction}</p>
      <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 8, padding: 14, borderLeft: `2px solid ${topic.color}` }}>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.5px" }}>Key equations</div>
        <div style={{ fontFamily: "monospace", fontSize: 13, color: topic.color }}>{lesson.equations}</div>
      </div>
    </div>,

    // 1: Simulation
    <div style={{ display: "flex", flexDirection: "column", gap: 10, height: "100%" }}>
      <div style={{ flex: 1, background: "#080a0f", borderRadius: 8, overflow: "hidden", minHeight: 260 }}>
        <SimCanvas simKey={lesson.simKey} controls={currentControls} />
      </div>
      {controls.length > 0 && (
        <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: "10px 14px" }}>
          <Controls controls={controls} values={controlValues} onChange={(id, val) => setControlValues(prev => ({ ...prev, [id]: val }))} />
        </div>
      )}
    </div>,

    // 2: Key Concepts
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {lesson.keyConcepts.map((concept, i) => (
        <div key={i} style={{ display: "flex", gap: 12, padding: "10px 14px", background: "rgba(255,255,255,0.04)", borderRadius: 8 }}>
          <span style={{ color: topic.color, fontWeight: 500, fontSize: 14, minWidth: 20 }}>{i + 1}.</span>
          <span style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", lineHeight: 1.6 }}>{concept}</span>
        </div>
      ))}
    </div>,

    // 3: Worked Example
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ padding: 14, background: "rgba(255,255,255,0.05)", borderRadius: 8, borderLeft: `2px solid ${topic.color}` }}>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.5px" }}>Problem</div>
        <div style={{ fontSize: 14, color: "#fff", lineHeight: 1.6 }}>{lesson.workedExample.problem}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Solution</div>
        {lesson.workedExample.steps.map((step, i) => (
          <div key={i} style={{ display: "flex", gap: 12, padding: "8px 12px", background: "rgba(255,255,255,0.04)", borderRadius: 8 }}>
            <span style={{ color: topic.color, fontFamily: "monospace", fontSize: 13, minWidth: 24 }}>Step {i+1}</span>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", lineHeight: 1.6 }}>{step}</span>
          </div>
        ))}
      </div>
      <div style={{ padding: 12, background: `${topic.color}18`, borderRadius: 8, border: `0.5px solid ${topic.color}44` }}>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.5px" }}>Answer</div>
        <div style={{ fontSize: 14, color: topic.color, fontWeight: 500 }}>{lesson.workedExample.answer}</div>
      </div>
    </div>,

    // 4: Practice (AI tutor)
    <div style={{ height: "100%" }}>
      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 10 }}>Practice by asking questions, working through problems, or requesting additional examples.</div>
      <div style={{ height: "calc(100% - 40px)" }}>
        <AskAI topic={topic} lesson={lesson} />
      </div>
    </div>,

    // 5: Quiz
    <div style={{ height: "100%" }}>
      <Quiz topic={topic} lesson={lesson} onComplete={() => onComplete(lesson.id)} />
    </div>,

    // 6: Summary
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ padding: 14, background: "rgba(255,255,255,0.05)", borderRadius: 8 }}>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.5px" }}>What you learned</div>
        {lesson.keyConcepts.slice(0, 3).map((c, i) => (
          <div key={i} style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, paddingLeft: 8 }}>• {c}</div>
        ))}
      </div>
      <div style={{ padding: 14, background: `${topic.color}12`, borderRadius: 8, border: `0.5px solid ${topic.color}33` }}>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.5px" }}>Key equations</div>
        <div style={{ fontFamily: "monospace", fontSize: 14, color: topic.color }}>{lesson.equations}</div>
      </div>
      {isCompleted && (
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: 14, background: "rgba(29,158,117,0.1)", borderRadius: 8, border: "0.5px solid rgba(29,158,117,0.3)" }}>
          <span style={{ fontSize: 20 }}>✓</span>
          <span style={{ fontSize: 14, color: "#1D9E75" }}>Lesson completed!</span>
        </div>
      )}
    </div>,
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Step tabs */}
      <div style={{ display: "flex", gap: 0, borderBottom: "0.5px solid rgba(255,255,255,0.08)", overflowX: "auto" }}>
        {STEPS.map((s, i) => (
          <button key={i} onClick={() => setStep(i)} style={{
            padding: "7px 12px", border: "none", background: "none", cursor: "pointer",
            fontSize: 12, fontFamily: "system-ui, sans-serif", whiteSpace: "nowrap",
            color: step === i ? "#fff" : "rgba(255,255,255,0.35)",
            borderBottom: step === i ? `2px solid ${topic.color}` : "2px solid transparent",
            transition: "all .15s",
          }}>{s}</button>
        ))}
      </div>

      {/* Step content */}
      <div style={{ flex: 1, overflow: "auto", padding: "16px 0" }}>
        {stepContent[step]}
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderTop: "0.5px solid rgba(255,255,255,0.08)" }}>
        <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}
          style={{ padding: "6px 16px", borderRadius: 6, border: "0.5px solid rgba(255,255,255,0.15)", background: "transparent", color: step === 0 ? "rgba(255,255,255,0.2)" : "#fff", cursor: step === 0 ? "not-allowed" : "pointer", fontSize: 13 }}>
          ← Previous
        </button>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{step + 1} / {STEPS.length}</span>
        <button onClick={() => setStep(s => Math.min(STEPS.length - 1, s + 1))} disabled={step === STEPS.length - 1}
          style={{ padding: "6px 16px", borderRadius: 6, border: "none", background: step === STEPS.length - 1 ? "rgba(255,255,255,0.1)" : topic.color, color: "#fff", cursor: step === STEPS.length - 1 ? "not-allowed" : "pointer", fontSize: 13 }}>
          Next →
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [activeTopic, setActiveTopic] = useState("mechanics");
  const [activeLesson, setActiveLesson] = useState(0);
  const [progress, setProgress] = useState(() => {
    try { return JSON.parse(localStorage.getItem("physicalab_v2") || "{}"); }
    catch { return {}; }
  });

  const topic = topics[activeTopic];
  const lesson = topic.lessons[activeLesson];
  const topicProgress = progress[activeTopic] || { lessons: [], badge: false };
  const completedLessons = topicProgress.lessons || [];
  const allDone = completedLessons.length >= topic.lessons.length;
  const totalCompleted = Object.values(progress).filter(p => p.badge).length;

  function markLessonComplete(lessonId) {
    setProgress(prev => {
      const tp = prev[activeTopic] || { lessons: [], badge: false };
      if (tp.lessons.includes(lessonId)) return prev;
      const newLessons = [...tp.lessons, lessonId];
      const newBadge = newLessons.length >= topic.lessons.length;
      const next = { ...prev, [activeTopic]: { lessons: newLessons, badge: newBadge } };
      localStorage.setItem("physicalab_v2", JSON.stringify(next));
      return next;
    });
  }

  function switchTopic(key) {
    setActiveTopic(key);
    setActiveLesson(0);
  }

  return (
    <div style={{ display: "flex", height: "100vh", background: "#0f1117", color: "#e8eaf0", fontFamily: "system-ui, sans-serif" }}>
      {/* Sidebar */}
      <div style={{ width: 230, borderRight: "0.5px solid rgba(255,255,255,0.1)", display: "flex", flexDirection: "column", background: "#0d0f14", overflowY: "auto" }}>
        {/* Logo */}
        <div style={{ padding: "14px 16px 10px" }}>
          <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: -0.3, marginBottom: 10 }}>
            Physica<span style={{ color: "#378ADD" }}>Lab</span>
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 5 }}>
            {totalCompleted} / {TOPIC_KEYS.length} modules complete
          </div>
          <div style={{ height: 3, background: "rgba(255,255,255,0.08)", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${(totalCompleted / TOPIC_KEYS.length) * 100}%`, background: "#1D9E75", borderRadius: 2, transition: "width .4s" }} />
          </div>
        </div>

        {/* Badges row */}
        {totalCompleted > 0 && (
          <div style={{ padding: "6px 16px 10px", display: "flex", flexWrap: "wrap", gap: 4 }}>
            {TOPIC_KEYS.filter(k => progress[k]?.badge).map(k => (
              <span key={k} title={topics[k].badge} style={{ fontSize: 16 }}>{BADGE_ICONS[k]}</span>
            ))}
          </div>
        )}

        {/* Modules */}
        {TOPIC_KEYS.map((key) => {
          const val = topics[key];
          const tp = progress[key] || { lessons: [], badge: false };
          const done = tp.badge;
          const partial = tp.lessons?.length > 0 && !done;
          return (
            <div key={key}>
              <button onClick={() => switchTopic(key)} style={{
                width: "100%", display: "flex", alignItems: "center", gap: 8,
                padding: "7px 16px", border: "none",
                background: activeTopic === key ? "rgba(255,255,255,0.07)" : "transparent",
                color: activeTopic === key ? "#fff" : "rgba(255,255,255,0.5)",
                cursor: "pointer", fontSize: 13, fontFamily: "system-ui, sans-serif",
                borderLeft: activeTopic === key ? `2px solid ${val.color}` : "2px solid transparent",
              }}>
                <span>{val.icon}</span>
                <span style={{ flex: 1, textAlign: "left" }}>{val.title}</span>
                {done && <span style={{ fontSize: 12, color: "#1D9E75" }}>✓</span>}
                {partial && <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>{tp.lessons.length}/{val.lessons.length}</span>}
              </button>

              {/* Lessons list */}
              {activeTopic === key && (
                <div style={{ paddingLeft: 8 }}>
                  {val.lessons.map((l, i) => {
                    const lDone = tp.lessons?.includes(l.id);
                    return (
                      <button key={l.id} onClick={() => setActiveLesson(i)} style={{
                        width: "100%", display: "flex", alignItems: "center", gap: 8,
                        padding: "5px 16px", border: "none",
                        background: activeLesson === i ? "rgba(255,255,255,0.05)" : "transparent",
                        color: activeLesson === i ? "#fff" : "rgba(255,255,255,0.4)",
                        cursor: "pointer", fontSize: 12, fontFamily: "system-ui, sans-serif",
                        borderLeft: activeLesson === i ? `2px solid ${val.color}66` : "2px solid transparent",
                      }}>
                        <span style={{ fontSize: 10, color: lDone ? "#1D9E75" : "rgba(255,255,255,0.2)", minWidth: 14 }}>{lDone ? "✓" : `${i+1}.`}</span>
                        <span style={{ textAlign: "left" }}>{l.title}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* Reset */}
        {totalCompleted > 0 && (
          <div style={{ padding: "10px 16px", marginTop: "auto", borderTop: "0.5px solid rgba(255,255,255,0.08)" }}>
            <button onClick={() => { setProgress({}); localStorage.removeItem("physicalab_v2"); }} style={{ width: "100%", padding: "5px", borderRadius: 6, border: "0.5px solid rgba(255,255,255,0.1)", background: "transparent", color: "rgba(255,255,255,0.3)", fontSize: 11, cursor: "pointer" }}>
              Reset Progress
            </button>
          </div>
        )}
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Header */}
        <div style={{ padding: "12px 20px", borderBottom: "0.5px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 12 }}>
          <div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 2 }}>{topic.title}</div>
            <div style={{ fontSize: 16, fontWeight: 500, display: "flex", alignItems: "center", gap: 8 }}>
              {lesson.title}
              {completedLessons.includes(lesson.id) && (
                <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 20, background: "rgba(29,158,117,0.15)", color: "#1D9E75", border: "0.5px solid rgba(29,158,117,0.3)" }}>Completed ✓</span>
              )}
            </div>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
            {topic.lessons.map((l, i) => (
              <button key={l.id} onClick={() => setActiveLesson(i)} title={l.title} style={{
                width: 8, height: 8, borderRadius: "50%", border: "none", cursor: "pointer",
                background: completedLessons.includes(l.id) ? "#1D9E75" : activeLesson === i ? topic.color : "rgba(255,255,255,0.15)",
              }} />
            ))}
          </div>
          {allDone && !topicProgress.badge && (
            <div style={{ padding: "4px 12px", borderRadius: 20, background: `${topic.color}22`, color: topic.color, fontSize: 12, border: `0.5px solid ${topic.color}44` }}>
              🏆 {topic.badge} earned!
            </div>
          )}
        </div>

        {/* Lesson content */}
        <div style={{ flex: 1, overflow: "hidden", padding: "0 20px 10px" }}>
          <LessonView
            key={`${activeTopic}-${activeLesson}`}
            topic={topic}
            lesson={lesson}
            completed={topicProgress}
            onComplete={markLessonComplete}
          />
        </div>
      </div>
    </div>
  );
}