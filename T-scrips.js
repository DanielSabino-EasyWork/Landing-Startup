 // Helpers
    const $ = (sel, root=document) => root.querySelector(sel);
    const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];

    // Dynamic year
    $('#year').textContent = new Date().getFullYear();

    // Mobile menu toggle
    const menuBtn = $('#menuBtn');
    const mobileMenu = $('#mobileMenu');
    menuBtn?.addEventListener('click', () => {
      const open = !mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden', open);
      menuBtn.setAttribute('aria-expanded', String(!open));
    });

    // Slider (Testimonials)
    const slides = $('#slides');
    const dots = $('#dots');
    let idx = 0;
    const total = $$('.min-w-full', slides).length;

    const renderDots = () => {
      dots.innerHTML = '';
      for(let i=0;i<total;i++){
        const b = document.createElement('button');
        b.className = 'w-2 h-2 rounded-full bg-white/40';
        b.addEventListener('click', ()=>{ idx = i; update(); });
        dots.appendChild(b);
      }
    };

    const update = () => {
      slides.style.transform = `translateX(-${idx*100}%)`;
      // set active dot
      $$('#dots button').forEach((d,i)=> d.classList.toggle('bg-cyan-300', i===idx));
    };

    renderDots();
    update();
    setInterval(()=>{ idx = (idx+1)%total; update(); }, 5000);

    // Extra lazy-load observer (on top of native loading="lazy")
    if('IntersectionObserver' in window){
      const io = new IntersectionObserver((entries, obs)=>{
        entries.forEach(entry=>{
          if(entry.isIntersecting){
            const img = entry.target;
            if(img.dataset.src){ img.src = img.dataset.src; }
            obs.unobserve(img);
          }
        });
      }, { rootMargin: '200px' });
      $$('img[loading="lazy"]').forEach(img=> io.observe(img));
    }

    // Form validation
    const form = $('#contactForm');
    const showError = (name, msg) => { const el = document.querySelector(`[data-error-for="${name}"]`); if(el) el.textContent = msg || ''; };

    form?.addEventListener('submit', (e)=>{
      e.preventDefault();
      let ok = true;

      const name = $('#name');
      if(!name.value || name.value.trim().length < 2){ ok=false; showError('name','Enter your name (min. 2 characters)'); } else showError('name');

      const email = $('#email');
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value);
      if(!emailOk){ ok=false; showError('email','Enter a valid email'); } else showError('email');

      const plan = $('#plan');
      if(!plan.value){ ok=false; showError('plan','Select a plan'); } else showError('plan');

      const msg = $('#message');
      if(!msg.value || msg.value.trim().length < 10){ ok=false; showError('message','Please add a bit more detail (min. 10 characters)'); } else showError('message');

      const consent = $('#consent');
      if(!consent.checked){ ok=false; showError('consent','You must accept the privacy policy'); } else showError('consent');

      if(ok){
        form.reset();
        $('#formSuccess').textContent = 'Thanks! We will contact you shortly.';
        setTimeout(()=> $('#formSuccess').textContent = '', 6000);
      }
    });