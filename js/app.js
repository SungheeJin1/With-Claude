(function () {
  const tabsEl = document.getElementById('tabs');
  const main = document.getElementById('main');
  const data = window.GRAMMAR;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---------- 탭 ---------- */
  tabsEl.innerHTML = data.map(t => `
    <button class="tab" role="tab" id="tab-${t.id}" data-id="${t.id}" style="--c:${t.color}" aria-selected="false">
      <span class="tab-icon" aria-hidden="true">${t.icon}</span>${t.name}<small>${t.en}</small>
    </button>`).join('');
  tabsEl.addEventListener('click', e => {
    const b = e.target.closest('.tab');
    if (b) location.hash = b.dataset.id;
  });

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

  /* ---------- 탭 내용 ---------- */
  function render(t) {
    document.documentElement.style.setProperty('--tab-color', t.color);
    let n = 0, toc = '', body = '';
    t.sections.forEach((s, i) => {
      if (s.group) {
        n = 0;
        toc += `<span class="toc-group">${s.no}. ${s.group}</span>`;
        body += `<div class="group-banner" id="${t.id}-g${i}"><span class="group-num">${s.no}</span><div><h2>${s.group}</h2>${s.desc ? `<p>${s.desc}</p>` : ''}</div></div>`;
        return;
      }
      n++;
      const sid = `${t.id}-${s.id || i}`;
      toc += `<a href="#${t.id}/${s.id || i}" class="${s.toon ? 'has-toon' : ''}">${s.title}</a>`;
      body += `<section class="section" id="${sid}">
        <h3><span class="sec-no">${n}</span>${s.title}${s.en ? `<span class="sec-en">${s.en}</span>` : ''}</h3>
        ${s.html || ''}
        ${s.toonFirst && s.toon ? toonHTML(s.toon, sid + '-toon') : ''}
        ${exHTML(s.examples, s.exTitle)}
        ${!s.toonFirst && s.toon ? toonHTML(s.toon, sid + '-toon') : ''}
        ${s.after || ''}
      </section>`;
    });
    const quiz = t.quiz && t.quiz.length ? `<div class="quiz" id="${t.id}-quiz"><p class="eyebrow">Quiz · Check</p><h3>🧩 확인 퀴즈</h3>${t.quiz.map(([q, a], i) => `
      <div class="q"><div class="q-text">Q${i + 1}. ${q}</div>
      <button class="q-btn" type="button">정답 보기</button><div class="q-ans">${a}</div></div>`).join('')}</div>` : '';
    toc += quiz ? `<a href="#${t.id}/quiz">🧩 퀴즈</a>` : '';

    main.innerHTML = `
      <div class="hero" style="--tab-color:${t.color}" data-icon="${t.icon}">
        <p class="eyebrow">Part ${String(data.indexOf(t) + 1).padStart(2, '0')} · ${t.en}</p>
        <h2>${t.name}<span>${t.en}</span></h2><p>${t.intro}</p>
      </div>
      <nav class="toc" aria-label="목차"><span class="toc-title">📚 이 탭에서 배울 것 (🎞 = 웹툰 있음)</span>${toc}</nav>
      ${body}${quiz}`;
  }

  /* ---------- 라우팅 ---------- */
  let current = null;
  function route() {
    const [id, sub] = decodeURIComponent(location.hash.slice(1)).split('/');
    const t = data.find(d => d.id === id) || data[0];
    if (current !== t.id) {
      current = t.id;
      render(t);
      tabsEl.querySelectorAll('.tab').forEach(b => {
        const on = b.dataset.id === t.id;
        b.setAttribute('aria-selected', on);
        if (on) b.scrollIntoView({ block: 'nearest', inline: 'center' });
      });
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

  const toTop = document.getElementById('toTop');
  window.addEventListener('scroll', () => toTop.classList.toggle('show', window.scrollY > 600), { passive: true });
  toTop.addEventListener('click', () => window.scrollTo({ top: 0 }));
})();
