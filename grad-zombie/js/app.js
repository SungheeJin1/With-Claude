/* 논문 좀비 — 화면 그리기와 동작 */
const S = {
  profile: { startDay: dayKey(), log: {} },
  papers: [],
  chunks: {},        // pid → [{i, orig, tr, truncated}]
  open: null,        // 펼쳐진 논문 id
  tab: {},           // pid → 탭 이름
  showOrig: {},      // `${pid}:${i}` → 원문 보기 여부
  jobs: {},          // pid → {kind, ctl, label, done, total, stream, error}
  calMonth: null,
  calDay: null,
  ready: false,
};
const main = $('#main');

/* ===== 출석 ===== */
async function checkin(type, title = '') {
  const today = dayKey();
  const log = S.profile.log;
  const list = log[today] || (log[today] = []);
  const first = list.length === 0;
  if (list.some(a => a.type === type && a.title === title)) return;
  list.push({ t: Date.now(), type, title: String(title).slice(0, 120) });
  if (list.length > 40) list.splice(0, list.length - 40);
  await Store.saveProfile(S.profile);
  updateTop();
  if (first) toast('🏃 오늘 출석 완료! 좀비에게서 도망쳤어요');
  if (currentView() === 'home') render();
}

function updateTop() {
  const st = Chase.compute(S.profile);
  const el = $('#topStreak');
  el.hidden = !S.ready;
  el.textContent = st.checkedToday ? `🔥 ${st.streak}일 연속` : `🧟 ${st.distance}칸`;
}

/* ===== 라우팅 ===== */
function currentView() { return (location.hash.slice(1).split('/')[0]) || 'home'; }
function go(view, arg) {
  const h = '#' + view + (arg ? '/' + arg : '');
  if (location.hash === h) render(); else location.hash = h;
}
window.addEventListener('hashchange', () => { render(); window.scrollTo(0, 0); });

function render() {
  closeDrawer();
  if (!S.ready) { main.innerHTML = `<div class="card empty"><div class="big">🧟</div><p class="soft">좀비 깨우는 중…</p></div>`; return; }
  const [view, arg] = location.hash.slice(1).split('/');
  $$('#drawer button').forEach(b => b.toggleAttribute('aria-current', b.dataset.go === (view || 'home')));
  switch (view) {
    case 'library': if (arg && arg !== S.open) openPaper(arg, false); main.innerHTML = viewLibrary(); afterLibrary(); break;
    case 'add': main.innerHTML = viewAdd(); afterAdd(); break;
    case 'history': main.innerHTML = viewHistory(); afterHistory(); break;
    case 'settings': main.innerHTML = viewSettings(); afterSettings(); break;
    default: main.innerHTML = viewHome(); afterHome();
  }
}

/* ===== 홈: 오늘의 추격 ===== */
function sceneHTML(st) {
  const shown = Chase.creep(st);
  const runnerX = 86;
  const zombieX = st.caught ? runnerX - 4 : runnerX - 6 - shown * 6.8;
  const cls = st.caught ? 'caught' : st.checkedToday ? 'safe' : '';
  return `
  <div class="scene ${cls}" role="img" aria-label="좀비와의 거리 ${st.distance}칸">
    <div class="ground"></div>
    ${st.caught ? '' : `<div class="gap" style="left:${zombieX + 4}%;width:${Math.max(0, runnerX - zombieX - 8)}%"></div>
    <div class="gap-label" style="left:${(zombieX + runnerX) / 2}%">${shown.toFixed(1).replace('.0', '')}칸</div>`}
    <div class="actor zombie" style="left:${zombieX}%">🧟</div>
    <div class="actor runner" style="left:${runnerX}%"><span>${st.caught ? '😵' : '🏃'}</span></div>
  </div>`;
}

function viewHome() {
  const st = Chase.compute(S.profile);
  const left = Chase.msUntilMidnight();
  const hh = Math.floor(left / 3600000), mm = Math.floor(left % 3600000 / 60000);
  const today = S.profile.log[dayKey()] || [];
  const did = t => today.some(a => a.type === t || (t === 'analyze' && a.type === 'translate'));
  let title, desc;
  if (st.caught) {
    title = '좀비에게 잡혔어요…';
    desc = '대학원 준비를 쉬는 사이 좀비가 따라잡았어요. 지금 논문 하나만 펼쳐도 다시 3칸 앞에서 도망칠 수 있어요.';
  } else if (st.checkedToday) {
    title = '오늘은 안전해요';
    desc = `오늘 출석해서 좀비와 <b>${st.distance}칸</b> 떨어져 있어요. 내일도 뭔가 하면 더 멀리 도망칠 수 있어요.`;
  } else {
    title = st.distance <= 3 ? '좀비가 바로 뒤에 있어요!' : '좀비가 다가오고 있어요';
    desc = `자정까지 <b>${hh}시간 ${mm}분</b>. 오늘 아무것도 안 하면 좀비가 ${st.ifMiss === 0 ? '<b>당신을 잡아요</b>' : `<b>${st.distance - st.ifMiss}칸</b> 다가와요 (→ ${st.ifMiss}칸)`}.`;
  }
  const danger = !st.checkedToday && st.distance <= 3;
  const recent = [...S.papers].sort((a, b) => (b.openedAt || b.createdAt) - (a.openedAt || a.createdAt))[0];

  return `
  <section class="card glow">
    <p class="eyebrow">Today · Zombie Chase</p>
    <h1 class="h1">${title}</h1>
    ${sceneHTML(st)}
    <div class="meter ${danger ? 'danger' : ''}" aria-hidden="true">${Array.from({ length: Chase.MAX }, (_, i) => `<i class="${i < st.distance ? 'on' : ''}"></i>`).join('')}</div>
    <div class="status-line">
      <span class="dim">좀비와의 거리</span>
      <span class="pill ${st.caught ? 'red' : danger ? 'red' : ''}">${st.distance} / ${Chase.MAX}칸</span>
      ${st.checkedToday ? '<span class="pill green">오늘 출석 ✓</span>' : '<span class="pill ghost">오늘 미출석</span>'}
    </div>
    <p class="soft" style="margin:12px 0 0">${desc}</p>
    <div class="stats">
      <div class="stat"><b>${st.streak}일</b><span>연속 출석</span></div>
      <div class="stat"><b>${st.best}일</b><span>최고 기록</span></div>
      <div class="stat"><b>${st.days}일</b><span>총 출석</span></div>
    </div>
  </section>

  <section class="card">
    <p class="eyebrow">Today's Mission</p>
    <h2 class="h2">하나만 해도 출석이에요</h2>
    <ul class="missions">
      <li class="${did('open') ? 'done' : ''}"><span class="chk">${did('open') ? '✓' : '1'}</span>서재에서 논문 하나 펼쳐 보기</li>
      <li class="${did('analyze') || did('add') ? 'done' : ''}"><span class="chk">${did('analyze') || did('add') ? '✓' : '2'}</span>새 논문 넣고 요약·전문 해석 받기</li>
      <li class="${did('ask') ? 'done' : ''}"><span class="chk">${did('ask') ? '✓' : '3'}</span>논문에 대해 Claude에게 질문하기</li>
    </ul>
    <button class="btn" type="button" data-go="${S.papers.length ? 'library' : 'add'}">${S.papers.length ? '논문 서재 열기' : '첫 논문 넣으러 가기'}</button>
  </section>

  ${recent ? `
  <section class="card glow">
    <p class="eyebrow">Next · Keep Reading</p>
    <h2 class="h2">${esc(recent.analysis?.titleKo || recent.title)}</h2>
    <p class="soft" style="margin:0">${esc(recent.analysis?.oneLine || '아직 분석 전이에요. 펼쳐서 분석을 시작해 보세요.')}</p>
    <p style="margin:14px 0 0">${progressPill(recent)}</p>
    <button class="btn" type="button" data-open="${recent.id}">이어서 읽기</button>
  </section>` : ''}

  <p class="notice">안내 · 논문을 펼치거나, 분석·해석하거나, Claude에게 질문하면 그날 출석이 돼요. 출석하면 좀비에게서 2칸 도망치고, 하루를 그냥 보내면 좀비가 3칸 다가와요. 날짜는 이 기기 시간 기준 자정에 바뀌어요.</p>`;
}
function afterHome() {
  // 출석 전에는 1분마다 좀비가 조금씩 다가와요
  clearInterval(S.homeTimer);
  S.homeTimer = setInterval(() => { if (currentView() === 'home') render(); else clearInterval(S.homeTimer); }, 60000);
}

function progressPill(p) {
  if (!p.analysis) return '<span class="pill ghost">분석 전</span>';
  const done = p.done || 0, total = p.chunkCount || 0;
  return done >= total
    ? '<span class="pill">요약 · 키워드 · 전문해석 완료</span>'
    : `<span class="pill">요약 완료</span> <span class="pill ghost">해석 ${done}/${total}</span>`;
}

/* ===== 서재 ===== */
function viewLibrary() {
  const list = [...S.papers].sort((a, b) => b.createdAt - a.createdAt);
  return `
  <section class="card glow">
    <p class="eyebrow">My Library</p>
    <h1 class="h1">논문 서재</h1>
    <p class="soft" style="margin:0">논문 ${list.length}편 · 펼치기만 해도 오늘 출석이에요.</p>
    <button class="btn" type="button" data-go="add">＋ 새 논문 넣기</button>
  </section>
  ${list.length ? list.map((p, i) => paperCard(p, list.length - i)).join('') : `
  <section class="card empty"><div class="big">📄</div><p class="soft">아직 논문이 없어요.<br>PDF를 올리거나 본문을 붙여 넣어 보세요.</p></section>`}`;
}

const CHEV = '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';

function paperCard(p, n) {
  const open = S.open === p.id;
  const job = S.jobs[p.id];
  const sub = job ? `(${job.label}…)` : !p.analysis ? '(분석 전)' : (p.done || 0) >= p.chunkCount ? '(완료)' : `(해석 ${p.done || 0}/${p.chunkCount})`;
  return `
  <section class="card paper" id="paper-${p.id}">
    <button class="paper-head" type="button" data-toggle="${p.id}" aria-expanded="${open}">
      <span class="num">${n}</span>
      <span class="t"><b>${esc(p.analysis?.titleKo || p.title)}</b><small>${esc(sub)}</small></span>
      ${CHEV}
    </button>
    ${open ? `<div class="paper-body" id="body-${p.id}">${paperBody(p)}</div>` : ''}
  </section>`;
}

const TABS = [['summary', '요약'], ['keywords', '키워드'], ['full', '전문 해석'], ['ask', '질문하기']];

function paperBody(p) {
  const chunks = S.chunks[p.id];
  if (!chunks) return '<p class="dim">불러오는 중…</p>';
  const job = S.jobs[p.id];
  const tab = S.tab[p.id] || 'summary';
  const head = `<div class="tabs" role="tablist">${TABS.map(([k, l]) => `<button type="button" role="tab" data-tab="${p.id}:${k}" aria-selected="${tab === k}">${l}</button>`).join('')}</div>`;
  let body = '';
  if (!p.analysis && tab !== 'ask') {
    body = job?.kind === 'analyze' ? jobPanel(p, job) : `
      <div class="panel">
        <p style="margin:0 0 4px"><b>아직 분석하지 않았어요</b></p>
        <p class="soft" style="margin:0">Claude가 요약·키워드·핵심 문장을 뽑고, 이어서 전문을 한국어로 해석해 줘요.</p>
        ${job?.error ? `<p class="err">${esc(job.error)}</p>` : ''}
        <button class="btn" type="button" data-analyze="${p.id}">분석 시작하기</button>
      </div>`;
  } else if (tab === 'summary') body = summaryTab(p);
  else if (tab === 'keywords') body = keywordsTab(p);
  else if (tab === 'full') body = fullTab(p, chunks, job);
  else body = askTab(p, job);
  return head + body + `
    <div class="btn-row" style="margin-top:16px;justify-content:flex-end">
      <button class="btn ghost small" type="button" data-delete="${p.id}">논문 지우기</button>
    </div>`;
}

function jobPanel(p, job) {
  const pct = job.total ? Math.round(job.done / job.total * 100) : 0;
  return `
    <div class="panel">
      <p style="margin:0"><b>${esc(job.label)}…</b> ${job.total ? `<span class="dim">${job.done}/${job.total}</span>` : ''}</p>
      ${job.total ? `<div class="progress"><i style="width:${pct}%"></i></div>` : '<div class="progress"><i style="width:35%"></i></div>'}
      <div class="stream" id="stream-${p.id}">${esc(job.stream || '')}</div>
      <button class="btn ghost small" style="margin-top:10px" type="button" data-stop="${p.id}">멈추기</button>
    </div>`;
}

function summaryTab(p) {
  const a = p.analysis;
  const st = a.structure || {};
  const rows = [['연구 문제', st.problem], ['방법', st.method], ['결과', st.results], ['기여', st.contribution], ['한계', st.limitations]].filter(r => r[1]);
  return `
    <div class="panel">
      <p class="meta">${esc([a.title, a.authors, a.year, a.field].filter(Boolean).join(' · '))}</p>
      <p class="oneline">${esc(a.oneLine)}</p>
      <ul class="bul">${(a.summary || []).map(s => `<li>${esc(s)}</li>`).join('')}</ul>
    </div>
    ${rows.length ? `<div class="panel"><dl class="dl">${rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl></div>` : ''}
    ${(a.keySentences || []).length ? `<div class="panel">
      <p class="eyebrow">Key Sentences</p>
      ${a.keySentences.map(k => `<p style="margin:0 0 4px"><mark class="key">${esc(k.ko)}</mark></p>
        <p class="dim" style="margin:0 0 4px">${esc(k.original)}</p>
        ${k.why ? `<p class="soft" style="margin:0 0 14px;font-size:14px">→ ${esc(k.why)}</p>` : '<div style="height:10px"></div>'}`).join('')}
    </div>` : ''}`;
}

function keywordsTab(p) {
  const kws = [...(p.analysis.keywords || [])].sort((a, b) => (b.importance || 0) - (a.importance || 0));
  return `<div class="kw-grid">${kws.map(k => `
    <div class="kw"><span class="stars" aria-label="중요도 ${k.importance || 1}">${'★'.repeat(Math.max(1, Math.min(3, k.importance || 1)))}</span>
      <b>${esc(k.term)}</b><span class="ko">${esc(k.ko && k.ko !== k.term ? k.ko : '')}</span>
      <p>${esc(k.desc)}</p></div>`).join('')}</div>`;
}

function fullTab(p, chunks, job) {
  const done = chunks.filter(c => c && c.tr).length;
  const total = p.chunkCount;
  const running = job?.kind === 'translate';
  return `
    <p class="legend"><span><mark class="key">핵심 문장</mark></span><span><span class="kwd">키워드</span></span><span><strong style="color:#ffd88a">중요 구절</strong></span></p>
    ${running ? jobPanel(p, job) : done < total ? `
      <div class="panel" style="margin-bottom:12px">
        <p style="margin:0"><b>${done ? `${done}/${total} 부분까지 해석했어요` : `전문을 ${total}부분으로 나눠 해석해요`}</b></p>
        <div class="progress"><i style="width:${Math.round(done / total * 100)}%"></i></div>
        ${job?.error ? `<p class="err">${esc(job.error)}</p>` : ''}
        <button class="btn" type="button" data-translate="${p.id}">${done ? '이어서 해석하기' : '전문 해석 시작'}</button>
      </div>` : ''}
    <div class="panel tr">
      ${done ? chunks.map(c => c && c.tr ? `
        <div class="chunk">
          ${Paper.renderTranslation(c.tr)}
          ${c.truncated ? '<p class="err">이 부분은 길어서 끝이 잘렸을 수 있어요.</p>' : ''}
          <button class="link-btn" type="button" data-orig="${p.id}:${c.i}">${S.showOrig[p.id + ':' + c.i] ? '원문 접기 ▲' : '원문 보기 ▼'}</button>
          ${S.showOrig[p.id + ':' + c.i] ? `<div class="orig">${Paper.renderOriginal(c.orig, p.analysis)}</div>` : ''}
        </div>` : '').join('') : '<p class="dim" style="margin:0">해석된 내용이 여기에 나와요.</p>'}
    </div>`;
}

function askTab(p, job) {
  const chat = p.chat || [];
  const sugg = (p.analysis?.questions || []).concat(['이 논문의 한계는 뭐야?', '면접에서 이 논문을 설명한다면?', '후속 연구 아이디어 3개만']).slice(0, 5);
  const streaming = job?.kind === 'ask';
  return `
    <div class="chat" id="chat-${p.id}">
      ${chat.length || streaming ? '' : '<p class="dim" style="margin:0">논문에 대해 궁금한 걸 물어보세요. 질문하면 오늘 출석이 돼요.</p>'}
      ${chat.map(m => `<div class="msg ${m.role === 'user' ? 'user' : 'ai'}">${esc(m.content)}</div>`).join('')}
      ${streaming ? `<div class="msg user">${esc(job.question)}</div><div class="msg ai" id="stream-${p.id}">${esc(job.stream || '생각하는 중…')}</div>` : ''}
      ${job?.kind !== 'ask' && job?.askError ? `<p class="err">${esc(job.askError)}</p>` : ''}
    </div>
    ${streaming ? `<button class="btn ghost small" type="button" data-stop="${p.id}">멈추기</button>` : `
    <div class="chips">${sugg.map(q => `<button type="button" data-suggest="${p.id}">${esc(q)}</button>`).join('')}</div>
    <form class="ask-row" data-ask="${p.id}">
      <label class="sr" for="q-${p.id}">질문</label>
      <textarea id="q-${p.id}" name="q" rows="2" placeholder="예: 이 방법이 기존 연구와 뭐가 달라?" required></textarea>
      <button class="btn small" type="submit">묻기</button>
    </form>
    ${chat.length ? `<button class="link-btn" type="button" data-clearchat="${p.id}" style="margin-top:10px">대화 지우기</button>` : ''}`}`;
}

function afterLibrary() {
  if (S.open) {
    const el = $('#paper-' + S.open);
    if (el && S.scrollTo === S.open) { el.scrollIntoView({ block: 'start', behavior: 'smooth' }); S.scrollTo = null; }
  }
}

function refreshPaper(pid) {
  const card = $('#paper-' + pid);
  if (!card || currentView() !== 'library') return;
  const list = [...S.papers].sort((a, b) => b.createdAt - a.createdAt);
  const n = list.length - list.findIndex(p => p.id === pid);
  const p = S.papers.find(x => x.id === pid);
  if (!p) return card.remove();
  const ta = card.querySelector('textarea');
  const draft = ta && ta.value;
  card.outerHTML = paperCard(p, n);
  if (draft) { const t = $('#paper-' + pid + ' textarea'); if (t) t.value = draft; }
}
function streamTo(pid, text) {
  const el = $('#stream-' + pid);
  if (el) { el.textContent = text; el.scrollTop = el.scrollHeight; }
}

async function openPaper(pid, scroll = true) {
  const p = S.papers.find(x => x.id === pid);
  if (!p) return;
  S.open = pid;
  if (scroll) S.scrollTo = pid;
  p.openedAt = Date.now();
  Store.savePaper(p);
  checkin('open', p.analysis?.titleKo || p.title);
  if (!S.chunks[pid]) {
    S.chunks[pid] = await Store.loadChunks(pid);
    refreshPaper(pid);
  }
}

/* ===== 분석 · 해석 · 질문 ===== */
function needAI(pid) {
  if (AI.mode) return true;
  S.jobs[pid] = { error: AI.errText({ code: 'no_ai' }) };
  refreshPaper(pid);
  toast('설정에서 Claude API 키를 먼저 넣어 주세요');
  return false;
}
function fullText(pid) { return (S.chunks[pid] || []).filter(Boolean).map(c => c.orig).join('\n\n'); }

async function analyze(pid, thenTranslate = true) {
  const p = S.papers.find(x => x.id === pid);
  if (!p || S.jobs[pid]?.ctl || !needAI(pid)) return;
  if (!S.chunks[pid]) S.chunks[pid] = await Store.loadChunks(pid);
  const ctl = new AbortController();
  const job = S.jobs[pid] = { kind: 'analyze', ctl, label: '요약·키워드 뽑는 중', done: 0, total: 0, stream: '' };
  refreshPaper(pid);
  try {
    const a = await AI.json(Paper.analysisPrompt(fullText(pid)), {
      signal: ctl.signal, maxTokens: 6000,
      onText: ({ text }) => { job.stream = text.slice(-600); streamTo(pid, job.stream); },
    });
    if (!a || typeof a !== 'object' || !a.oneLine) throw { code: 'invalid_json' };
    p.analysis = a;
    await Store.savePaper(p);
    delete S.jobs[pid];
    checkin('analyze', a.titleKo || p.title);
    refreshPaper(pid);
    if (thenTranslate) translate(pid);
  } catch (e) {
    S.jobs[pid] = { error: e.code === 'cancelled' ? '' : AI.errText(e) };
    refreshPaper(pid);
  }
}

async function translate(pid) {
  const p = S.papers.find(x => x.id === pid);
  if (!p || S.jobs[pid]?.ctl || !needAI(pid)) return;
  const chunks = S.chunks[pid] || (S.chunks[pid] = await Store.loadChunks(pid));
  const ctl = new AbortController();
  const total = p.chunkCount;
  const job = S.jobs[pid] = { kind: 'translate', ctl, label: '전문 해석 중', done: chunks.filter(c => c && c.tr).length, total, stream: '' };
  if (!S.tab[pid] || S.tab[pid] === 'summary') S.tab[pid] = 'full';
  refreshPaper(pid);
  try {
    for (const c of chunks) {
      if (!c || c.tr) continue;
      job.stream = '';
      const r = await AI.text(Paper.translatePrompt(c.orig, c.i, total, p.analysis), {
        signal: ctl.signal, maxTokens: 12000,
        onText: ({ text }) => { job.stream = text.slice(-500); streamTo(pid, job.stream); },
      });
      c.tr = r.text.trim();
      c.truncated = r.truncated;
      await Store.saveChunk(pid, c);
      p.done = chunks.filter(x => x && x.tr).length;
      job.done = p.done;
      await Store.savePaper(p);
      checkin('translate', p.analysis?.titleKo || p.title);
      refreshPaper(pid);
    }
    delete S.jobs[pid];
    toast('전문 해석을 끝냈어요 📖');
  } catch (e) {
    S.jobs[pid] = { error: e.code === 'cancelled' ? '' : AI.errText(e) };
  }
  refreshPaper(pid);
}

async function ask(pid, question) {
  const p = S.papers.find(x => x.id === pid);
  question = question.trim();
  if (!p || !question || S.jobs[pid]?.ctl || !needAI(pid)) return;
  if (!S.chunks[pid]) S.chunks[pid] = await Store.loadChunks(pid);
  const ctl = new AbortController();
  const job = S.jobs[pid] = { kind: 'ask', ctl, question, stream: '' };
  S.tab[pid] = 'ask';
  refreshPaper(pid);
  checkin('ask', p.analysis?.titleKo || p.title);
  try {
    const r = await AI.text(Paper.chatPrompt(p, fullText(pid), p.chat || [], question), {
      signal: ctl.signal, maxTokens: 3000,
      onText: ({ text }) => { job.stream = text; streamTo(pid, text); },
    });
    p.chat = [...(p.chat || []), { role: 'user', content: question }, { role: 'assistant', content: r.text.trim() }].slice(-30);
    await Store.savePaper(p);
    delete S.jobs[pid];
  } catch (e) {
    if (e.text) p.chat = [...(p.chat || []), { role: 'user', content: question }, { role: 'assistant', content: e.text + ' …(중단됨)' }].slice(-30);
    S.jobs[pid] = { askError: e.code === 'cancelled' ? '' : AI.errText(e) };
  }
  refreshPaper(pid);
}

/* ===== 논문 추가 ===== */
function viewAdd() {
  return `
  <section class="card glow">
    <p class="eyebrow">New Paper</p>
    <h1 class="h1">논문 넣고 분석받기</h1>
    <p class="soft" style="margin:0">PDF를 올리거나 본문을 붙여 넣으면 Claude가 <b>전문 해석</b>(핵심 문장·키워드 하이라이트), <b>키워드</b>, <b>요약</b>을 만들어 줘요.</p>
  </section>
  <form class="card" id="addForm">
    <div class="field">
      <span>파일 (PDF · TXT)</span>
      <label class="drop" id="drop">
        <input type="file" id="file" accept=".pdf,.txt,.md,application/pdf,text/plain" hidden>
        <b id="dropText">📄 눌러서 파일 고르기</b>
        <span class="dim">또는 파일을 여기로 끌어다 놓기</span>
      </label>
    </div>
    <label class="field"><span>또는 본문 붙여 넣기</span>
      <textarea id="text" placeholder="논문 초록이나 본문을 붙여 넣어 주세요"></textarea></label>
    <label class="field"><span>제목 (비워 두면 자동)</span>
      <input type="text" id="title" placeholder="예: Attention Is All You Need"></label>
    <label class="check"><input type="checkbox" id="cutRefs" checked> 참고문헌 이후는 해석에서 빼기</label>
    <label class="check"><input type="checkbox" id="autoRun" checked> 넣자마자 요약 → 전문 해석까지 진행</label>
    <p class="err" id="addErr" hidden></p>
    <p class="dim" id="aiNote" ${AI.mode ? 'hidden' : ''}>※ 분석하려면 <a href="#settings">설정</a>에서 Claude API 키가 필요해요. 키 없이도 서재에 넣고 출석은 할 수 있어요.</p>
    <button class="btn" type="submit" id="addBtn">서재에 넣기</button>
  </form>`;
}

function afterAdd() {
  const file = $('#file'), drop = $('#drop'), text = $('#text'), err = $('#addErr');
  let fileText = '', fileName = '';
  const showErr = m => { err.hidden = !m; err.textContent = m || ''; };
  async function take(f) {
    if (!f) return;
    showErr('');
    $('#dropText').textContent = '⏳ 읽는 중…';
    try {
      if (/\.pdf$/i.test(f.name) || f.type === 'application/pdf') {
        fileText = await Paper.readPdf(f, (n, t) => { $('#dropText').textContent = `⏳ ${n}/${t}쪽 읽는 중…`; });
        if (fileText.replace(/\s/g, '').length < 200) throw new Error('글자를 거의 못 읽었어요. 스캔 이미지 PDF라면 본문을 복사해 붙여 넣어 주세요.');
      } else {
        fileText = await f.text();
      }
      fileName = f.name.replace(/\.[^.]+$/, '');
      $('#dropText').textContent = `✅ ${f.name} (${fileText.length.toLocaleString()}자)`;
    } catch (e) {
      fileText = '';
      $('#dropText').textContent = '📄 눌러서 파일 고르기';
      showErr(e.message || 'PDF를 읽지 못했어요.');
    }
  }
  file.addEventListener('change', () => take(file.files[0]));
  ['dragenter', 'dragover'].forEach(t => drop.addEventListener(t, e => { e.preventDefault(); drop.classList.add('over'); }));
  ['dragleave', 'drop'].forEach(t => drop.addEventListener(t, e => { e.preventDefault(); drop.classList.remove('over'); }));
  drop.addEventListener('drop', e => take(e.dataTransfer.files[0]));

  $('#addForm').addEventListener('submit', async e => {
    e.preventDefault();
    let raw = (fileText || text.value).trim();
    if (raw.replace(/\s/g, '').length < 100) return showErr('논문 내용이 너무 짧아요. 파일을 올리거나 본문을 더 붙여 넣어 주세요.');
    $('#addBtn').disabled = true;
    let body = Paper.clean(raw);
    if ($('#cutRefs').checked) body = Paper.cutReferences(body);
    const parts = Paper.chunk(body);
    const firstLine = body.split('\n').find(l => l.trim().length > 8) || '제목 없는 논문';
    const meta = {
      id: uid(), createdAt: Date.now(), openedAt: Date.now(),
      title: ($('#title').value.trim() || fileName || firstLine).slice(0, 160),
      chars: body.length, chunkCount: parts.length, done: 0, analysis: null, chat: [],
    };
    try {
      for (let i = 0; i < parts.length; i++) await Store.saveChunk(meta.id, { i, orig: parts[i], tr: '' });
      await Store.savePaper(meta);
    } catch (e2) {
      $('#addBtn').disabled = false;
      return showErr('저장하지 못했어요: ' + (e2.message || e2.code || ''));
    }
    S.papers.push(meta);
    S.chunks[meta.id] = parts.map((orig, i) => ({ i, orig, tr: '' }));
    S.open = meta.id; S.scrollTo = meta.id;
    checkin('add', meta.title);
    go('library', meta.id);
    if ($('#autoRun').checked && AI.mode) analyze(meta.id, true);
  });
}

/* ===== 출석 기록 ===== */
function viewHistory() {
  const today = dayKey();
  const month = S.calMonth || today.slice(0, 7);
  const sel = S.calDay || today;
  const [y, m] = month.split('-').map(Number);
  const first = new Date(y, m - 1, 1);
  const days = new Date(y, m, 0).getDate();
  const log = S.profile.log;
  const start = S.profile.startDay;
  let cells = '일월화수목금토'.split('').map(d => `<span class="dow">${d}</span>`).join('');
  cells += '<span></span>'.repeat(first.getDay());
  for (let d = 1; d <= days; d++) {
    const k = `${month}-${String(d).padStart(2, '0')}`;
    const on = (log[k] || []).length > 0;
    const cls = [on ? 'on' : k < today && k >= start ? 'miss' : '', k === today ? 'today' : '', k > today ? 'future' : ''].join(' ');
    cells += `<button type="button" class="d ${cls}" data-day="${k}" aria-label="${k}${on ? ' 출석' : ''}" ${k === sel ? 'aria-pressed="true"' : ''}>${on ? '✓' : k < today && k >= start ? '🧟' : d}</button>`;
  }
  const acts = (log[sel] || []).slice().sort((a, b) => a.t - b.t);
  const st = Chase.compute(S.profile);
  return `
  <section class="card glow">
    <p class="eyebrow">Attendance</p>
    <h1 class="h1">출석 기록</h1>
    <p class="soft" style="margin:0">시작한 지 ${st.totalDays}일째 · 출석 ${st.days}일 · 좀비에게 잡힌 횟수 ${st.caughtCount}번</p>
  </section>
  <section class="card">
    <div class="cal-nav">
      <button class="btn ghost small" type="button" data-month="-1" aria-label="이전 달">◀</button>
      <b>${y}년 ${m}월</b>
      <button class="btn ghost small" type="button" data-month="1" aria-label="다음 달">▶</button>
    </div>
    <div class="cal">${cells}</div>
    <p class="dim" style="margin:12px 0 0">✓ 출석 · 🧟 좀비가 다가온 날</p>
  </section>
  <section class="card">
    <p class="eyebrow">${sel === today ? 'Today' : sel.replace(/-/g, '.')}</p>
    ${acts.length ? `<ul class="log">${acts.map(a => `<li><time>${hhmm(a.t)}</time>${esc(Chase.ACTIVITY[a.type] || a.type)}${a.title ? ` · <span class="soft">${esc(a.title)}</span>` : ''}</li>`).join('')}</ul>`
      : `<p class="soft" style="margin:0">${sel > today ? '아직 오지 않은 날이에요.' : '이날은 아무것도 하지 않았어요.'}</p>`}
  </section>`;
}
function afterHistory() {}

/* ===== 설정 ===== */
function viewSettings() {
  const mode = AI.mode;
  return `
  <section class="card glow">
    <p class="eyebrow">Settings</p>
    <h1 class="h1">설정</h1>
    <p class="soft" style="margin:0">저장 위치: ${Store.kind === 'db' ? 'claude.ai 계정 (나만 볼 수 있어요)' : '이 기기의 브라우저'}</p>
  </section>
  <section class="card">
    <h2 class="h2">Claude 연결</h2>
    ${mode === 'claude' && !Store.getKey() ? `<p class="soft" style="margin:0">claude.ai 안에서 열려 있어서 API 키 없이 Claude로 분석해요. ✅</p>` : `
    <p class="soft" style="margin:0 0 14px">논문 분석에는 Claude API 키가 필요해요. 키는 <b>이 기기에만</b> 저장되고 Anthropic API로만 보내져요. <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener">키 발급받기</a></p>
    <form id="keyForm">
      <label class="field"><span>API 키</span>
        <input type="password" id="apiKey" autocomplete="off" placeholder="sk-ant-..." value="${esc(Store.getKey())}"></label>
      <label class="field"><span>모델</span>
        <select id="model">
          ${[['claude-sonnet-5-5', 'Claude Sonnet 5.5 (추천 · 빠르고 정확)'], ['claude-opus-5-5', 'Claude Opus 5.5 (가장 똑똑함 · 비쌈)'], ['claude-haiku-5-5', 'Claude Haiku 5.5 (가장 저렴)']]
            .map(([v, l]) => `<option value="${v}" ${Store.getModel() === v ? 'selected' : ''}>${l}</option>`).join('')}
        </select></label>
      <div class="btn-row">
        <button class="btn" type="submit">저장</button>
        ${Store.getKey() ? '<button class="btn ghost" type="button" id="keyDel">키 지우기</button>' : ''}
      </div>
    </form>`}
  </section>
  <section class="card">
    <h2 class="h2">추격 규칙</h2>
    <ul class="bul soft">
      <li>처음엔 좀비와 6칸 떨어져서 시작해요 (최대 10칸).</li>
      <li>논문 펼치기 · 분석 · 해석 · 질문 중 하나라도 하면 그날 출석 → 2칸 도망.</li>
      <li>하루를 그냥 보내면 좀비가 3칸 다가와요. 0칸이면 잡혀요.</li>
      <li>잡혀도 다시 출석하면 3칸 앞에서 다시 도망칠 수 있어요.</li>
    </ul>
  </section>
  <section class="card">
    <h2 class="h2">데이터</h2>
    <p class="soft" style="margin:0">출석 기록과 논문을 모두 지우고 처음부터 시작해요.</p>
    <button class="btn ghost" type="button" id="resetAll">모두 지우기</button>
  </section>`;
}
function afterSettings() {
  const f = $('#keyForm');
  if (f) f.addEventListener('submit', e => {
    e.preventDefault();
    Store.setKey($('#apiKey').value.trim());
    Store.setModel($('#model').value);
    toast('저장했어요');
    render();
  });
  const del = $('#keyDel');
  if (del) del.addEventListener('click', () => { Store.setKey(''); toast('키를 지웠어요'); render(); });
  $('#resetAll').addEventListener('click', async () => {
    if (!confirm('출석 기록과 논문을 모두 지울까요? 되돌릴 수 없어요.')) return;
    for (const p of S.papers) await Store.deletePaper(p.id);
    S.papers = []; S.chunks = {}; S.open = null;
    S.profile = { startDay: dayKey(), log: {} };
    await Store.saveProfile(S.profile);
    updateTop();
    toast('처음부터 다시 시작해요');
    go('home');
  });
}

/* ===== 클릭 처리 (위임) ===== */
document.addEventListener('click', async e => {
  const t = e.target.closest('button, a');
  if (!t) return;
  const d = t.dataset;
  if (d.go) return go(d.go);
  if (d.open) { await openPaper(d.open); return go('library', d.open); }
  if (d.toggle) {
    if (S.open === d.toggle) { S.open = null; refreshPaper(d.toggle); history.replaceState(null, '', '#library'); }
    else {
      const prev = S.open;
      S.open = d.toggle;
      if (prev) refreshPaper(prev);
      refreshPaper(d.toggle);
      history.replaceState(null, '', '#library/' + d.toggle);
      await openPaper(d.toggle, false);
    }
    return;
  }
  if (d.tab) { const [pid, k] = d.tab.split(':'); S.tab[pid] = k; return refreshPaper(pid); }
  if (d.analyze) return analyze(d.analyze, true);
  if (d.translate) return translate(d.translate);
  if (d.stop) { S.jobs[d.stop]?.ctl?.abort(); return; }
  if (d.orig) { S.showOrig[d.orig] = !S.showOrig[d.orig]; return refreshPaper(d.orig.split(':')[0]); }
  if (d.suggest) return ask(d.suggest, t.textContent);
  if (d.clearchat) {
    const p = S.papers.find(x => x.id === d.clearchat);
    if (p && confirm('이 논문과의 대화를 지울까요?')) { p.chat = []; await Store.savePaper(p); refreshPaper(p.id); }
    return;
  }
  if (d.delete) {
    const p = S.papers.find(x => x.id === d.delete);
    if (!p || !confirm(`"${p.analysis?.titleKo || p.title}"을(를) 지울까요?`)) return;
    S.jobs[p.id]?.ctl?.abort();
    await Store.deletePaper(p.id);
    S.papers = S.papers.filter(x => x.id !== p.id);
    delete S.chunks[p.id];
    S.open = null;
    return go('library');
  }
  if (d.month) {
    const [y, m] = (S.calMonth || dayKey().slice(0, 7)).split('-').map(Number);
    const dt = new Date(y, m - 1 + Number(d.month), 1);
    S.calMonth = dayKey(dt).slice(0, 7);
    return render();
  }
  if (d.day) { S.calDay = d.day; return render(); }
});
document.addEventListener('submit', e => {
  const f = e.target.closest('form[data-ask]');
  if (!f) return;
  e.preventDefault();
  ask(f.dataset.ask, f.q.value);
});
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey && !e.isComposing && e.target.matches('form[data-ask] textarea')) {
    e.preventDefault();
    e.target.form.requestSubmit();
  }
  if (e.key === 'Escape') closeDrawer();
});

/* ===== 햄버거 메뉴 ===== */
const drawer = $('#drawer'), burger = $('#burger'), backdrop = $('#drawerBackdrop');
function closeDrawer() { drawer.hidden = true; backdrop.hidden = true; burger.setAttribute('aria-expanded', 'false'); }
burger.addEventListener('click', () => {
  const open = drawer.hidden;
  drawer.hidden = !open; backdrop.hidden = !open;
  burger.setAttribute('aria-expanded', String(open));
});
backdrop.addEventListener('click', closeDrawer);

/* 자정이 지나면 화면을 새로 그려요 */
let lastDay = dayKey();
setInterval(() => { if (dayKey() !== lastDay) { lastDay = dayKey(); updateTop(); render(); } }, 30000);

/* ===== 시작 ===== */
(async function start() {
  render();
  await Promise.all([Store.init(), AI.init()]);
  try {
    const prof = await Store.loadProfile();
    if (prof && prof.log) S.profile = prof;
    else await Store.saveProfile(S.profile);
    S.papers = await Store.listPapers();
  } catch (e) {
    toast('저장된 기록을 불러오지 못했어요');
  }
  S.ready = true;
  updateTop();
  const [view, arg] = location.hash.slice(1).split('/');
  if (view === 'library' && arg) { S.open = null; S.scrollTo = arg; }
  render();
})();
