 tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: { sans: ['Inter','ui-sans-serif','system-ui','Segoe UI','Roboto','Ubuntu','Helvetica Neue','Arial','Noto Sans','sans-serif'] },
          colors: {
            base: { 900: '#0b1020', 800:'#0f172a' },
            text: { DEFAULT:'#e6e8ee', muted:'#94a3b8' }
          },
          boxShadow: { soft: '0 10px 30px rgba(0,0,0,.35)' },
          borderRadius: { xl2: '16px' },
          backgroundImage: {
            'hero-grid': 'radial-gradient(1200px 600px at 80% -10%, rgba(34,211,238,.08), transparent 50%), radial-gradient(900px 500px at 0% 10%, rgba(14,165,233,.12), transparent 50%)'
          },
          keyframes: {
            float: { '0%,100%': { transform:'translateY(0)' }, '50%': { transform:'translateY(-6px)' } },
          },
          animation: { float: 'float 8s ease-in-out infinite' }
        }
      }
    }