(function () {
  const main = document.getElementById('main');
  const data = window.GRAMMAR;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---------- 시작 페이지: 품사 고르기 + 용어 검색 ---------- */
  const firstSentence = html => {
    const d = document.createElement('div'); d.innerHTML = html;
    return d.textContent.split(/(?<=[.!?])\s/)[0];
  };
  function renderHome() {
    document.body.classList.add('is-home');
    document.documentElement.style.setProperty('--tab-color', '#f7d74a');
    sideEl.innerHTML = '';
    document.getElementById('crumb').textContent = '';
    const cards = data.map((t, i) => {
      const secs = t.sections.filter(s => !s.group);
      const toons = secs.filter(s => s.toon).length;
      const us = secs.filter(s => s.unscramble).length + (t.unscrambleEnd ? 1 : 0);
      return `<a class="pos-card" href="#${t.id}" style="--c:${t.color}">
        <span class="pos-top"><span class="pos-icon" aria-hidden="true">${t.icon}</span><span class="pos-no">${String(i + 1).padStart(2, '0')}</span></span>
        <strong>${t.name}</strong><small>${t.en}</small>
        <span class="pos-desc">${esc(firstSentence(t.intro))}</span>
        <span class="pos-meta">챕터 ${secs.length} · 웹툰 ${toons} · 🧩 ${us}</span>
      </a>`;
    }).join('');
    main.innerHTML = `
      <section class="home">
        <div class="home-hero">
          <p class="eyebrow">English Grammar · 8 Parts of Speech</p>
          <h2>오늘은 어떤 품사를 탐험할까요?</h2>
          <p>품사를 골라 설명과 웹툰, 문제를 살펴보세요. 궁금한 용어가 있으면 검색해도 돼요.</p>
          <form class="search home-search" id="searchForm" data-search role="search" autocomplete="off">
            <label class="sr-only" for="searchInput">용어 검색</label>
            <input id="searchInput" type="search" placeholder="용어 검색 (예: 관계대명사, 현재완료)" enterkeyhint="search" spellcheck="false">
            <button type="submit">검색</button>
          </form>
        </div>
        <h3 class="home-sub">품사 고르기</h3>
        <nav class="pos-grid" aria-label="8품사">${cards}</nav>
      </section>`;
    document.title = '품사 탐험대';
  }

  /* ---------- 웹툰 ---------- */
  function castHTML(c) {
    if (c.arrow) return `<div class="arrow">${c.arrow}</div>`;
    const say = c.say ? `<div class="ch-say">${c.say}</div>`
      : c.think ? `<div class="ch-say think">${c.think}</div>`
      : c.shout ? `<div class="ch-say shout">${c.shout}</div>` : '';
    if (c.e) return `<div class="prop">${say}<span>${c.e}</span>${c.tag ? `<small>${c.tag}</small>` : ''}</div>`;
    const st = (c.st || '').split(' ').filter(Boolean).map(s => 'st-' + s).join(' ');
    const hold = c.hold ? `<div class="ch-hold">${c.hold}</div>` : c.holdL ? `<div class="ch-hold left">${c.holdL}</div>` : '';
    return `<div class="ch c-${c.c || 'blue'} m-${c.m || 'happy'} ${st}">
      ${say}
      <div class="ch-body">
        ${c.hat ? `<div class="ch-hat">${c.hat}</div>` : ''}
        <div class="ch-face"><span class="eye l"></span><span class="eye r"></span><span class="mouth"></span></div>
        <div class="ch-word">${c.w}</div>${hold}
      </div>
      ${c.tag ? `<div class="ch-tag">${c.tag}</div>` : '<div class="ch-tag">&nbsp;</div>'}
    </div>`;
  }
  function toonHTML(toon, key) {
    const panels = toon.panels.map((p, i) => {
      const line = p.line ? (typeof p.line === 'string'
        ? `<div class="wt-line">${p.line}</div>`
        : `<div class="wt-line ${p.line.ok ? 'ok' : 'no'}">${p.line.t}</div>`) : '';
      return `<div class="panel bg-${p.bg || 'paper'}${p.now ? ' now' : ''}">
        <span class="panel-no">${i + 1}</span>
        ${p.fx ? `<div class="wt-fx">${p.fx}</div>` : ''}
        ${p.narr ? `<div class="narr">${p.narr}</div>` : ''}
        <div class="stage">${(p.cast || []).map(castHTML).join('')}</div>
        ${line}
      </div>`;
    }).join('');
    return `<div class="webtoon" id="${key}">
      <div class="wt-head"><span class="wt-badge">웹툰</span>${toon.title}
        <button class="wt-toggle" type="button" aria-expanded="true">접기</button></div>
      <div class="wt-panels">${panels}</div>
    </div>`;
  }

  /* ---------- 예문 ---------- */
  function exHTML(list, title) {
    if (!list || !list.length) return '';
    return `<p class="examples-title">${title || '✏️ 예문으로 익혀요'}</p><ul class="examples">${list.map(([en, ko, flag]) => `
      <li class="ex${flag === 'x' ? ' wrong' : ''}">
        <div class="ex-body"><div class="ex-en">${en}</div><div class="ex-ko">${ko || ''}</div></div>
        ${flag === 'x' ? '' : `<button class="say-btn" type="button" aria-label="영어로 듣기" data-say="${esc(en.replace(/<[^>]+>/g, ''))}">🔊</button>`}
      </li>`).join('')}</ul>`;
  }

  /* ---------- 단어 순서 맞히기 (언스크램블) ---------- */
  /* 채점: 대문자와 문장부호까지 정확해야 정답이에요.
     봐주는 것은 띄어쓰기 개수, 문장부호 앞 빈칸, 휴대폰 키보드의 둥근 따옴표(’)뿐이에요. */
  const usStrict = v => v.replace(/[’‘`]/g, "'").replace(/\s+([.,!?])/g, '$1').replace(/\s+/g, ' ').trim();
  /* 힌트용: 대문자·문장부호를 빼고 단어 순서만 비교 */
  const usLoose = v => v.toLowerCase().replace(/[’‘`]/g, "'").replace(/[.,!?]/g, ' ').replace(/\s+/g, ' ').trim();
  const usData = {};
  function usHTML(tabId, s, bare) {
    if (!s.unscramble || !s.unscramble.length) return '';
    const items = s.unscramble.map((q, i) => {
      const key = `us-${tabId}-${s.id}-${i}`;
      usData[key] = q;
      return `<li class="us-item" data-key="${key}">
        <p class="us-ko"><span class="us-no">${i + 1}</span>${q.ko}</p>
        <div class="us-words" aria-label="섞인 단어">${q.words.map(w => `<span class="us-chip">${esc(w)}</span>`).join('')}</div>
        <div class="us-row">
          <label class="sr-only" for="${key}">${i + 1}번 답</label>
          <input id="${key}" class="us-input" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" enterkeyhint="done" placeholder="여기에 문장을 쓰세요">
          <button type="button" class="us-check">답 입력</button>
        </div>
        <div class="us-result" aria-live="polite"></div>
      </li>`;
    }).join('');
    return `<div class="unscramble${bare ? ' bare' : ''}">${bare ? '' : '<p class="us-title">🧩 단어 순서 맞히기</p>'}
      <p class="us-help">우리말에 맞게 단어를 순서대로 직접 써 보고 <b>엔터</b>를 누르세요. <b>문장 첫 글자는 대문자</b>로 쓰고, 쉼표와 <b>마침표(.)·물음표(?)·느낌표(!)</b>도 정확히 넣어야 정답이에요.</p>
      <ol class="us-list">${items}</ol></div>`;
  }
  function usGrade(item) {
    const q = usData[item.dataset.key];
    const input = item.querySelector('.us-input');
    const box = item.querySelector('.us-result');
    const given = usStrict(input.value);
    if (!given) { box.className = 'us-result'; box.textContent = '먼저 답을 써 주세요.'; input.focus(); return; }
    const answers = [q.answer, ...(q.alt || [])];
    const ok = answers.some(a => usStrict(a) === given);
    const orderOk = !ok && answers.some(a => usLoose(a) === usLoose(given));
    item.classList.toggle('us-ok', ok);
    item.classList.toggle('us-near', orderOk);
    item.classList.toggle('us-no-ok', !ok && !orderOk);
    box.className = 'us-result ' + (ok ? 'ok' : orderOk ? 'near' : 'no');
    box.innerHTML = ok
      ? `⭕ 정답이에요! <span class="en">${esc(q.answer)}</span>`
      : orderOk
        ? `<span>🟡 단어 순서는 맞았어요! <b>대문자</b>와 <b>문장부호(. , ? !)</b>를 다시 확인해 보세요.</span> <button`
        : `❌ 아쉬워요. 다시 해 보세요. <button type="button" class="us-show">정답 보기</button><span class="us-answer en" hidden>${esc(q.answer)}</span>`;
  }

  /* ---------- 탭 내용 ---------- */
  function render(t) {
    document.body.classList.remove('is-home');
    document.getElementById('crumb').innerHTML = `<span aria-hidden="true">${t.icon}</span> ${t.name}`;
    document.documentElement.style.setProperty('--tab-color', t.color);
    let n = 0, toc = '', body = '', side = '';
    t.sections.forEach((s, i) => {
      if (s.group) {
        n = 0;
        toc += `<span class="toc-group">${s.no}. ${s.group}</span>`;
        side += `<li class="side-group"><a href="#${t.id}.g${i}" data-target="${t.id}-g${i}">${s.no}. ${s.group}</a></li>`;
        body += `<div class="group-banner" id="${t.id}-g${i}"><span class="group-num">${s.no}</span><div><h2>${s.group}</h2>${s.desc ? `<p>${s.desc}</p>` : ''}</div></div>`;
        return;
      }
      n++;
      const sid = `${t.id}-${s.id || i}`;
      toc += `<a href="#${t.id}.${s.id || i}" class="${s.toon ? 'has-toon' : ''}${s.unscramble ? ' has-us' : ''}">${s.title}</a>`;
      side += `<li><a href="#${t.id}.${s.id || i}" data-target="${sid}"><span class="side-no">${n}</span><span>${s.title}${s.toon ? ' 🎞' : ''}${s.unscramble ? ' 🧩' : ''}</span></a></li>`;
      body += `<section class="section" id="${sid}">
        <h3><span class="sec-no">${n}</span>${s.title}${s.en ? `<span class="sec-en">${s.en}</span>` : ''}</h3>
        ${s.html || ''}
        ${s.toonFirst && s.toon ? toonHTML(s.toon, sid + '-toon') : ''}
        ${exHTML(s.examples, s.exTitle)}
        ${!s.toonFirst && s.toon ? toonHTML(s.toon, sid + '-toon') : ''}
        ${s.after || ''}
        ${usHTML(t.id, s)}
      </section>`;
    });
    if (t.unscrambleEnd && t.unscrambleEnd.length) {
      toc += `<a href="#${t.id}.review">🧩 단어 순서 맞히기</a>`;
      side += `<li class="side-quiz"><a href="#${t.id}.review" data-target="${t.id}-review">🧩 단어 순서 맞히기</a></li>`;
      body += `<section class="section review" id="${t.id}-review">
        <h3>🧩 단어 순서 맞히기<span class="sec-en">${t.name} 마무리</span></h3>
        ${usHTML(t.id, { id: 'review', unscramble: t.unscrambleEnd }, true)}
      </section>`;
    }
    const quiz = t.quiz && t.quiz.length ? `<div class="quiz" id="${t.id}-quiz"><p class="eyebrow">Quiz · Check</p><h3>🧩 확인 퀴즈</h3>${t.quiz.map(([q, a], i) => `
      <div class="q"><div class="q-text">Q${i + 1}. ${q}</div>
      <button class="q-btn" type="button">정답 보기</button><div class="q-ans">${a}</div></div>`).join('')}</div>` : '';
    toc += quiz ? `<a href="#${t.id}.quiz">🧩 퀴즈</a>` : '';
    if (quiz) side += `<li class="side-quiz"><a href="#${t.id}.quiz" data-target="${t.id}-quiz">🧩 확인 퀴즈</a></li>`;
    const others = data.map(o => o.id === t.id
      ? `<li><span class="side-other on" aria-current="page"><span aria-hidden="true">${o.icon}</span>${o.name} <small>${o.en}</small></span></li>`
      : `<li><a class="side-other" href="#${o.id}"><span aria-hidden="true">${o.icon}</span>${o.name} <small>${o.en}</small></a></li>`).join('');
    sideEl.innerHTML = `<p class="side-title"><span>${t.icon}</span>${t.name} <small>${t.en}</small></p><ol class="side-list">${side}</ol>
      <p class="side-title side-others-title">다른 품사</p><ul class="side-others">${others}</ul>`;

    main.innerHTML = `
      <div class="hero" style="--tab-color:${t.color}" data-icon="${t.icon}">
        <p class="eyebrow">Part ${String(data.indexOf(t) + 1).padStart(2, '0')} · ${t.en}</p>
        <h2>${t.name}<span>${t.en}</span></h2><p>${t.intro}</p>
      </div>
      <nav class="toc" aria-label="목차"><span class="toc-title">📚 이 탭에서 배울 것 (🎞 = 웹툰, 🧩 = 단어 순서 맞히기)</span>${toc}</nav>
      ${body}${quiz}`;
    watchSections();
  }

  /* ---------- 왼쪽 목차 ---------- */
  const sideEl = document.getElementById('side');
  const sideBtn = document.getElementById('sideBtn');
  const backdrop = document.getElementById('sideBackdrop');
  function setSide(open) {
    document.body.classList.toggle('side-open', open);
    sideBtn.setAttribute('aria-expanded', open);
  }
  sideBtn.addEventListener('click', () => setSide(!document.body.classList.contains('side-open')));
  backdrop.addEventListener('click', () => setSide(false));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setSide(false); });

  /* 목차 링크: 같은 항목을 다시 눌러도 이동하도록 직접 스크롤 */
  function jump(e) {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const [, sub] = a.getAttribute('href').slice(1).split('.');
    const el = sub && document.getElementById(`${current}-${sub}`);
    if (!el) { if (!sub) setSide(false); return; }  /* 다른 품사로 가는 링크는 그대로 이동, 목차만 닫기 */
    e.preventDefault();
    el.scrollIntoView();
    try { history.replaceState(null, '', a.getAttribute('href')); } catch (_) {}
    setSide(false);
  }
  sideEl.addEventListener('click', jump);
  main.addEventListener('click', e => { if (e.target.closest('.toc')) jump(e); });

  /* 지금 읽는 항목을 목차에서 표시 */
  let observer = null;
  function watchSections() {
    if (observer) observer.disconnect();
    if (!('IntersectionObserver' in window)) return;
    const links = [...sideEl.querySelectorAll('a[data-target]')];
    observer = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        links.forEach(l => l.classList.toggle('on', l.dataset.target === en.target.id));
        const on = sideEl.querySelector('a.on');
        if (on && !document.body.classList.contains('side-open')) on.scrollIntoView({ block: 'nearest' });
      });
    }, { rootMargin: '-35% 0px -60% 0px' });
    links.forEach(l => { const el = document.getElementById(l.dataset.target); if (el) observer.observe(el); });
  }

  /* 헤더 높이를 CSS에 알려 줘서 목차가 헤더 아래에 붙게 함 */
  const header = document.querySelector('.site-header');
  const setHeaderH = () => document.documentElement.style.setProperty('--header-h', header.offsetHeight + 'px');
  setHeaderH();
  if ('ResizeObserver' in window) new ResizeObserver(setHeaderH).observe(header);
  else window.addEventListener('resize', setHeaderH);

  /* ---------- 라우팅 ---------- */
  let current = null;
  function route() {
    const [id, sub] = decodeURIComponent(location.hash.slice(1)).split(/[./]/);
    const t = data.find(d => d.id === id);
    if (!t) {
      if (current !== 'home') { current = 'home'; renderHome(); window.scrollTo(0, 0); }
      return;
    }
    if (current !== t.id) {
      current = t.id;
      render(t);
      document.title = `${t.name} (${t.en}) · 품사 탐험대`;
      if (!sub) window.scrollTo(0, 0);
    }
    if (sub) {
      const el = document.getElementById(`${t.id}-${sub}`);
      if (el) el.scrollIntoView();
    }
  }
  window.addEventListener('hashchange', route);
  route();

  /* ---------- 상호작용 ---------- */
  main.addEventListener('click', e => {
    const item = e.target.closest('.us-item');
    if (item) {
      if (e.target.closest('.us-check')) { usGrade(item); return; }
      if (e.target.closest('.us-show')) {
        e.target.hidden = true;
        item.querySelector('.us-answer').hidden = false;
        return;
      }
    }
    const say = e.target.closest('.say-btn');
    if (say && 'speechSynthesis' in window) {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(say.dataset.say);
      u.lang = 'en-US'; u.rate = 0.85;
      speechSynthesis.speak(u);
      return;
    }
    const qb = e.target.closest('.q-btn');
    if (qb) {
      const q = qb.parentElement;
      q.classList.toggle('open');
      qb.textContent = q.classList.contains('open') ? '정답 숨기기' : '정답 보기';
      return;
    }
    const tg = e.target.closest('.wt-toggle');
    if (tg) {
      const w = tg.closest('.webtoon');
      w.classList.toggle('folded');
      const folded = w.classList.contains('folded');
      tg.textContent = folded ? '펼치기' : '접기';
      tg.setAttribute('aria-expanded', !folded);
    }
  });

  main.addEventListener('keydown', e => {
    if (e.key === 'Enter' && e.target.classList.contains('us-input')) {
      e.preventDefault();
      usGrade(e.target.closest('.us-item'));
    }
  });

  /* 휴대폰·태블릿: 아래로 읽어 내려가면 헤더를 숨기고, 위로 올리면 다시 보여 줘요 */
  let lastY = window.scrollY;
  window.addEventListener('scroll', () => {
    const y = window.scrollY, root = document.body;
    const can = window.innerWidth < 1000 && !root.classList.contains('is-home') && !root.classList.contains('side-open');
    if (!can || y < 80) root.classList.remove('header-hidden');
    else if (y > lastY + 6) root.classList.add('header-hidden');
    else if (y < lastY - 6) root.classList.remove('header-hidden');
    lastY = y;
  }, { passive: true });

  const toTop = document.getElementById('toTop');
  window.addEventListener('scroll', () => toTop.classList.toggle('show', window.scrollY > 600), { passive: true });
  toTop.addEventListener('click', () => window.scrollTo({ top: 0 }));
})();
