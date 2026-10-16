/* 용어 검색: 입력한 말이 그대로 들어 있는 항목만 보여 줘요 (자동완성 없음) */
(function () {
  /* 검색창은 시작 페이지에만 있고 페이지를 오갈 때마다 새로 그려지므로, 그때그때 찾아 써요 */
  const getInput = () => document.getElementById('searchInput');
  const panel = document.getElementById('searchPanel');
  const title = document.getElementById('searchTitle');
  const list = document.getElementById('searchResults');
  const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const norm = s => s.replace(/\s+/g, ' ').trim();

  /* 검색할 글을 미리 모아 둬요: 항목마다 설명, 예문, 웹툰 대사, 퀴즈 */
  const tmp = document.createElement('div');
  /* 표 칸·줄이 서로 붙지 않도록 블록 태그 앞에 띄어쓰기를 넣고 글자만 꺼내요 */
  const plain = html => {
    tmp.innerHTML = String(html || '').replace(/<(td|th|tr|li|p|div|br|h\d|ol|ul)\b/gi, ' <$1');
    return tmp.textContent;
  };
  const index = [];
  GRAMMAR.forEach(t => {
    t.sections.forEach((s, i) => {
      if (s.group) return;
      const parts = [s.title, s.en, plain(s.html), plain(s.after)];
      (s.examples || []).forEach(([e, k]) => parts.push(plain(e), plain(k)));
      if (s.toon) {
        parts.push(s.toon.title);
        s.toon.panels.forEach(p => {
          parts.push(plain(p.narr), plain(typeof p.line === 'string' ? p.line : p.line && p.line.t));
          (p.cast || []).forEach(c => parts.push(c.w, c.say, c.think, c.shout, c.tag));
        });
      }
      index.push({ tab: t, key: s.id || String(i), title: s.title, text: norm(parts.filter(Boolean).map(plain).join(' · ')) });
    });
    if (t.quiz && t.quiz.length) {
      index.push({ tab: t, key: 'quiz', title: '확인 퀴즈', text: norm(t.quiz.map(([q, a]) => plain(q) + ' ' + plain(a)).join(' · ')) });
    }
  });

  function snippet(text, at, len) {
    const start = Math.max(0, at - 28), end = Math.min(text.length, at + len + 40);
    return (start > 0 ? '…' : '') + esc(text.slice(start, at)) + '<mark>' + esc(text.slice(at, at + len)) + '</mark>' + esc(text.slice(at + len, end)) + (end < text.length ? '…' : '');
  }

  let lastQuery = '';
  document.addEventListener('submit', e => {
    if (e.target.id !== 'searchForm') return;
    e.preventDefault();
    const input = getInput();
    const q = norm(input.value);
    if (!q) { input.focus(); return; }
    lastQuery = q;
    const lower = q.toLowerCase();
    const hits = index.map(it => {
      const at = it.text.toLowerCase().indexOf(lower);
      return at < 0 ? null : { ...it, at, inTitle: it.title.toLowerCase().includes(lower) };
    }).filter(Boolean).sort((a, b) => b.inTitle - a.inTitle);

    title.innerHTML = `‘${esc(q)}’ 검색 결과 <span>${hits.length}개</span>`;
    list.innerHTML = hits.length ? hits.map(h => `
      <li><a href="#${h.tab.id}.${h.key}">
        <span class="sr-tab" style="--c:${h.tab.color}">${h.tab.icon} ${h.tab.name}</span>
        <strong>${esc(h.title)}</strong>
        <span class="sr-snip">${snippet(h.text, h.at, q.length)}</span>
      </a></li>`).join('')
      : `<li class="sr-empty">‘${esc(q)}’이(가) 들어 있는 내용이 없어요.<br>용어를 정확히 입력했는지 확인해 주세요. 예: <b>관계대명사</b>, <b>현재완료</b>, <b>a few</b></li>`;
    panel.hidden = false;
    document.body.classList.add('search-open');
    const first = list.querySelector('a');
    (first || document.getElementById('searchClose')).focus();
  });

  function close() {
    panel.hidden = true;
    document.body.classList.remove('search-open');
  }
  document.getElementById('searchClose').addEventListener('click', close);
  panel.addEventListener('click', e => { if (e.target === panel) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) { close(); const i = getInput(); if (i) i.focus(); } });

  /* 결과를 누르면 그 항목으로 이동하고, 찾은 말을 노랗게 표시 */
  list.addEventListener('click', e => {
    const a = e.target.closest('a');
    if (!a) return;
    e.preventDefault();
    close();
    const href = a.getAttribute('href');
    const [tabId, key] = href.slice(1).split('.');
    if (location.hash !== href) location.hash = href;
    else window.dispatchEvent(new HashChangeEvent('hashchange'));
    setTimeout(() => {
      const el = document.getElementById(`${tabId}-${key}`);
      if (!el) return;
      highlight(el, lastQuery);
      const m = el.querySelector('mark.found');
      (m || el).scrollIntoView({ block: m ? 'center' : 'start' });
    }, 60);
  });

  function highlight(root, q) {
    document.querySelectorAll('mark.found').forEach(m => m.replaceWith(document.createTextNode(m.textContent)));
    const lower = q.toLowerCase();
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) if (walker.currentNode.nodeValue.toLowerCase().includes(lower)) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      const text = node.nodeValue, frag = document.createDocumentFragment();
      let i = 0, at;
      while ((at = text.toLowerCase().indexOf(lower, i)) >= 0) {
        frag.append(text.slice(i, at));
        const m = document.createElement('mark');
        m.className = 'found'; m.textContent = text.slice(at, at + q.length);
        frag.append(m);
        i = at + q.length;
      }
      frag.append(text.slice(i));
      node.replaceWith(frag);
    });
  }
})();
