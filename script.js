
(function(){
  const root = document.documentElement;
  const current = localStorage.getItem('theme') || 'dark';
  if(current === 'light') root.classList.add('light');

  const themeToggle = document.getElementById('themeToggle');
  if(themeToggle){
    themeToggle.addEventListener('click', ()=>{
      root.classList.toggle('light');
      localStorage.setItem('theme', root.classList.contains('light') ? 'light':'dark');
    });
  }

  const menuBtn = document.getElementById('menuBtn');
  const nav = document.getElementById('nav-menu');
  if(menuBtn && nav){
    menuBtn.addEventListener('click', ()=>{
      const visible = getComputedStyle(nav).display !== 'none';
      nav.style.display = visible ? 'none' : 'flex';
      nav.style.flexDirection='column';
      nav.style.gap='0.75rem';
      menuBtn.setAttribute('aria-expanded', String(!visible));
    });
  }

  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // --- Typing terminal ---
  const term = document.getElementById('term');
  if(term){
    const lines = [
      '$ whoami',
      '> Yaman Shrestha — Cybersecurity Researcher',
      '$ contact',
      '> email: yamanshrestha08@gmail.com',
      '> github: github.com/yamanshrestha',
      '> linkedin: linkedin.com/in/yaman-shrestha',
    ];

    const opts = {
      charDelay: 22,     // ms between characters
      lineDelay: 500,    // pause after each line
      cycleDelay: 1600,  // pause before restarting
      cursorChar: '▌'
    };

    let lineIdx = 0;
    let charIdx = 0;
    let cursor;

    function ensureCursor() {
      if (!cursor) {
        cursor = document.createElement('span');
        cursor.textContent = opts.cursorChar;
        cursor.style.marginLeft = '3px';
        cursor.style.opacity = '1';
        cursor.className = 'term-cursor';
        term.appendChild(cursor);
        setInterval(() => {
          if (cursor) cursor.style.opacity = cursor.style.opacity === '1' ? '0' : '1';
        }, 500);
      }
    }

    function newLine() {
      const div = document.createElement('div');
      term.appendChild(div);
      return div;
    }

    function typeNextLine() {
      if (lineIdx >= lines.length) {
        setTimeout(() => {
          term.innerHTML = '';
          cursor = null;
          lineIdx = 0;
          charIdx = 0;
          typeNextLine();
        }, opts.cycleDelay);
        return;
      }

      const text = lines[lineIdx];
      const row = newLine();
      charIdx = 0;

      (function typeChar(){
        row.textContent = text.slice(0, charIdx++);
        term.scrollTop = term.scrollHeight; // auto-scroll as we type
        ensureCursor();

        if (charIdx <= text.length) {
          setTimeout(typeChar, opts.charDelay);
        } else {
          setTimeout(() => {
            lineIdx++;
            typeNextLine();
          }, opts.lineDelay);
        }
      })();
    }

    typeNextLine();
  }

  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth', block:'start'}); }
    });
  });
})();
