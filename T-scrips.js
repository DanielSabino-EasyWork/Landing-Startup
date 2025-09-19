// Helpers
    const $ = (sel, root=document) => root.querySelector(sel);
    const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];

    // Dynamic year
    $('#year').textContent = new Date().getFullYear();

    // Mobile menu open/close + scroll lock (robust + resize-safe)
    const htmlEl = document.documentElement;
    const menuBtn = $('#menuBtn');
    const menuOverlay = $('#mobileMenu');
    const menuClose = $('#menuClose');
    let isMenuOpen = false;
    function setMenu(open){
      isMenuOpen = open;
      menuOverlay.classList.toggle('hidden', !open);
      menuOverlay.toggleAttribute('inert', !open);
      menuOverlay.setAttribute('aria-hidden', String(!open));
      htmlEl.classList.toggle('overflow-hidden', open);
      menuBtn?.setAttribute('aria-expanded', String(open));
      menuBtn?.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      if(open){
        const first = menuOverlay.querySelector('a, button');
        first?.focus();
      }
    }
    menuBtn?.addEventListener('click', ()=> setMenu(!isMenuOpen));
    menuOverlay?.addEventListener('click', (e)=>{ if(e.target === menuOverlay) setMenu(false); });
    menuClose?.addEventListener('click', ()=> setMenu(false));
    document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') setMenu(false); });

    // Auto-close when resizing to desktop (>= md)
    const mql = window.matchMedia('(min-width: 768px)');
    const onBp = (e)=>{ if(e.matches) setMenu(false); };
    try { mql.addEventListener('change', onBp); } catch(_) { mql.addListener(onBp); }
    let rto; window.addEventListener('resize', ()=>{ clearTimeout(rto); rto = setTimeout(()=>{ if(window.innerWidth >= 768) setMenu(false); }, 150); });
    // Close menu when any nav link is clicked (so content is visible immediately)
    menuOverlay?.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', () => setMenu(false));
    });

    // Testimonials slider
    const slides = $('#slides');
    const dots = $('#dots');
    let idx = 0;
    const total = $$('.min-w-full', slides).length;
    const renderDots = () => { dots.innerHTML = ''; for(let i=0;i<total;i++){ const b=document.createElement('button'); b.className='w-2.5 h-2.5 rounded-full bg-white/40'; b.addEventListener('click', ()=>{ idx=i; update(); }); dots.appendChild(b);} };
    const update = () => { slides.style.transform = `translateX(-${idx*100}%)`; $$('#dots button').forEach((d,i)=> d.classList.toggle('bg-brand-500', i===idx)); };
    renderDots(); update(); setInterval(()=>{ idx=(idx+1)%total; update(); }, 5000);

    // Contact form validation
    const form = $('#contactForm');
    const showError = (name, msg) => { const el = document.querySelector(`[data-error-for="${name}"]`); if(el) el.textContent = msg || ''; };
    form?.addEventListener('submit', (e)=>{
      e.preventDefault(); let ok = true;
      const name = $('#name'); if(!name.value || name.value.trim().length < 2){ ok=false; showError('name','Enter your name (min. 2 characters)'); } else showError('name');
      const email = $('#email'); const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value); if(!emailOk){ ok=false; showError('email','Enter a valid email'); } else showError('email');
      const msg = $('#message'); if(!msg.value || msg.value.trim().length < 10){ ok=false; showError('message','Please add more details (min. 10 characters)'); } else showError('message');
      if(ok){ form.reset(); $('#formSuccess').textContent = 'Thanks! We will get back to you shortly.'; setTimeout(()=> $('#formSuccess').textContent = '', 6000); }
    });