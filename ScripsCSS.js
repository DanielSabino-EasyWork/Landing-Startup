tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter','ui-sans-serif','system-ui','Segoe UI','Roboto','Ubuntu','Helvetica Neue','Arial','Noto Sans','sans-serif'],
            display: ['Manrope','Inter','ui-sans-serif','system-ui']
          },
          colors: {
            // Trust palette: base (neutral/dark), brand (blue), support (green), neutral (slate)
            base: { 900:'#0b1220', 800:'#0e162b', 700:'#13203a' },
            text: { DEFAULT:'#e6edf5', muted:'#a9b4c7' },
            brand: { 300:'#7dd3fc', 400:'#38bdf8', 500:'#0ea5e9', 600:'#0284c7' },
            support:{ 300:'#6ee7b7', 400:'#34d399', 500:'#10b981' },
            neutral:{ 300:'#cbd5e1', 400:'#94a3b8', 500:'#64748b' }
          },
          borderRadius: { xl2:'16px' },
          boxShadow: { soft:'0 10px 30px rgba(0,0,0,.35)' },
          backgroundImage: {
            gridfade: 'radial-gradient(1100px 520px at 80% -10%, rgba(56,189,248,.12), transparent 50%), radial-gradient(900px 500px at 0% 10%, rgba(16,185,129,.10), transparent 50%)'
          }
        }
      }
    }