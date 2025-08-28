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

  const lines = [
    '$ ingest indicators --source=OSINT',
    '✓ normalized 12,348 IOCs',
    '$ correlate --with=PCAP --window=24h',
    '✓ 7 high‑confidence matches (T1059, T1071)',
    '$ llm triage --policy=strict',
    '✓ GPT‑routed → summarize + prioritize',
    '$ export report --format=STIX',
    '✓ saved → ./out/incident-042.json'
  ];
  const term = document.getElementById('term');
  if(term){
    let i=0;
    setInterval(()=>{
      i=(i+1)%lines.length;
      const d=document.createElement('div');
      d.textContent=lines[i];
      term.appendChild(d);
      term.scrollTop=term.scrollHeight;
    }, 1400);
  }

  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth', block:'start'}); }
    });
  });
})();