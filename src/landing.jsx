export default function LandingPage({ onStart }) {
  return (
    <div style={{ minHeight: '100vh', background: '#0f1117', color: '#e8eaf0', fontFamily: 'system-ui, sans-serif', display: 'flex', flexDirection: 'column' }}>
      
      <div style={{ padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '0.5px solid rgba(255,255,255,0.08)' }}>
        <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: -0.5 }}>
          Physica<span style={{ color: '#378ADD' }}>Lab</span>
        </div>
        <button onClick={onStart} style={{ padding: '8px 20px', borderRadius: 8, border: 'none', background: '#378ADD', color: '#fff', fontSize: 14, cursor: 'pointer', fontFamily: 'system-ui, sans-serif' }}>
          Start Learning
        </button>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 13, color: '#378ADD', fontWeight: 500, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 16 }}>
          Free STEM Learning Platform
        </div>
        <h1 style={{ fontSize: 48, fontWeight: 700, letterSpacing: -1, marginBottom: 20, lineHeight: 1.1, maxWidth: 700, margin: '0 auto 20px' }}>
          Learn Physics, Maths and Science with AI
        </h1>
        <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.6)', maxWidth: 560, lineHeight: 1.7, marginBottom: 40 }}>
          Interactive simulations, step-by-step lessons, and an AI tutor available 24/7. Study entirely on your own — no teacher needed.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <button onClick={onStart} style={{ padding: '14px 36px', borderRadius: 10, border: 'none', background: '#378ADD', color: '#fff', fontSize: 16, cursor: 'pointer', fontFamily: 'system-ui, sans-serif', fontWeight: 500 }}>
            Start Learning Free
          </button>
          <button onClick={onStart} style={{ padding: '14px 36px', borderRadius: 10, border: '0.5px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#fff', fontSize: 16, cursor: 'pointer', fontFamily: 'system-ui, sans-serif' }}>
            Explore Modules
          </button>
        </div>
        <div style={{ marginTop: 16, fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>
          No account required. Completely free.
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 60, padding: '40px 24px', borderTop: '0.5px solid rgba(255,255,255,0.06)', borderBottom: '0.5px solid rgba(255,255,255,0.06)', flexWrap: 'wrap' }}>
        {[
          { num: '10', label: 'Modules' },
          { num: '50', label: 'Lessons' },
          { num: '30+', label: 'Simulations' },
          { num: '24/7', label: 'AI Tutor' },
        ].map((s, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 36, fontWeight: 700, color: '#378ADD' }}>{s.num}</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: '60px 24px', maxWidth: 900, margin: '0 auto', width: '100%' }}>
        <h2 style={{ fontSize: 28, fontWeight: 600, textAlign: 'center', marginBottom: 8 }}>10 Complete Courses</h2>
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', marginBottom: 40, fontSize: 15 }}>Each with interactive simulations, worked examples, practice problems, and quizzes</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
          {[
            { icon: '⚙', title: 'Classical Mechanics', color: '#378ADD' },
            { icon: '〜', title: 'Waves & Optics', color: '#1D9E75' },
            { icon: '🌡', title: 'Thermodynamics', color: '#BA7517' },
            { icon: '⚡', title: 'Electromagnetism', color: '#7F77DD' },
            { icon: '◇', title: 'Quantum Physics', color: '#D85A30' },
            { icon: '∞', title: 'Special Relativity', color: '#D4537E' },
            { icon: '◎', title: 'Nuclear Physics', color: '#639922' },
            { icon: '∫', title: 'Mathematics', color: '#9B59B6' },
            { icon: 'E', title: 'Engineering', color: '#E67E22' },
            { icon: 'C', title: 'Chemistry', color: '#27AE60' },
          ].map((m, i) => (
            <div key={i} onClick={onStart} style={{ padding: '16px 20px', borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.08)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 20 }}>{m.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: '#fff' }}>{m.title}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>5 lessons</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '60px 24px', background: 'rgba(255,255,255,0.02)', borderTop: '0.5px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ fontSize: 28, fontWeight: 600, textAlign: 'center', marginBottom: 40 }}>Built for Self-Study</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
            {[
              { icon: '🎮', title: 'Interactive Simulations', desc: 'Drag sliders and see physics happen in real time. Over 30 unique animations.' },
              { icon: '🤖', title: 'AI Tutor 24/7', desc: 'Ask any question at any time. The AI tutor knows exactly what lesson you are studying.' },
              { icon: '📝', title: 'Practice Problems', desc: '5 AI-generated problems per lesson with hints and instant grading.' },
              { icon: '🏆', title: 'Progress and Badges', desc: 'Track your progress across all 50 lessons. Earn badges when you complete modules.' },
              { icon: '📖', title: 'Worked Examples', desc: 'Every lesson includes a fully solved example with step-by-step working.' },
              { icon: '✓', title: 'Instant Quizzes', desc: 'Test your understanding with AI-generated quizzes graded immediately.' },
            ].map((f, i) => (
              <div key={i} style={{ padding: '24px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.07)' }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 8 }}>{f.title}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: '80px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 16 }}>Start Learning Today</h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 32, fontSize: 16 }}>Free forever. No account needed. Just open and learn.</p>
        <button onClick={onStart} style={{ padding: '16px 48px', borderRadius: 10, border: 'none', background: '#378ADD', color: '#fff', fontSize: 18, cursor: 'pointer', fontFamily: 'system-ui, sans-serif', fontWeight: 500 }}>
          Start Learning Free
        </button>
      </div>

      <div style={{ padding: '24px 40px', borderTop: '0.5px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ fontSize: 14, fontWeight: 600 }}>Physica<span style={{ color: '#378ADD' }}>Lab</span></div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>Free STEM learning for everyone</div>
      </div>
    </div>
  );
}