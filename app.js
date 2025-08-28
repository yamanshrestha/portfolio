// Theme toggle persistence
(function(){
  const root = document.documentElement;
  const themeBtn = document.getElementById('theme');
  const saved = localStorage.getItem('theme') || 'dark';
  if(saved==='light') root.classList.add('light');
  themeBtn.addEventListener('click', ()=>{
    root.classList.toggle('light');
    localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
  });
})();

// Filter + search
(function(){
  const chips = Array.from(document.querySelectorAll('.chip'));
  const cards = Array.from(document.querySelectorAll('.card'));
  const search = document.getElementById('search');
  let active = 'all';

  function apply(){
    const q = (search.value||'').toLowerCase();
    cards.forEach(c=>{
      const type = c.getAttribute('data-type');
      const tags = (c.getAttribute('data-tags')||'').toLowerCase();
      const text = c.textContent.toLowerCase();
      const matchType = (active==='all' || type===active);
      const matchText = (!q || text.includes(q) || tags.includes(q));
      c.style.display = (matchType && matchText) ? '' : 'none';
    });
  }

  chips.forEach(ch=>ch.addEventListener('click', ()=>{
    chips.forEach(c=>c.classList.remove('active'));
    ch.classList.add('active');
    active = ch.getAttribute('data-filter');
    ch.setAttribute('aria-selected', 'true');
    apply();
  }));

  search.addEventListener('input', apply);
  apply();
})();

// Footer dates
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('updated').textContent = new Date(document.lastModified).toLocaleDateString();

// Demo log streamer with auto-scroll
(function(){
  const box = document.getElementById('logs');
  if(!box) return;
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
  let i = 0;
  function add(text, cls){
    const div = document.createElement('div');
    div.className = 'logline ' + (cls||'');
    div.textContent = text;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight; // auto‑scroll
  }
  // seed
  lines.slice(0,3).forEach(t => add(t, ''));
  setInterval(()=>{
    i = (i + 1) % lines.length;
    const t = lines[i];
    const cls = t.startsWith('✓') ? 'ok' : (t.includes('warn') ? 'warn' : '');
    add(t, cls);
  }, 1400);
})();