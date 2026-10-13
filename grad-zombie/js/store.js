/* 저장소: claude.ai 아티팩트 안에서는 계정별 비공개 db, 그 밖(웹앱)에서는 이 기기의 localStorage */
const Store = (() => {
  const mem = {};
  const local = {
    get(k) {
      try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : (mem[k] ?? null); } catch { return mem[k] ?? null; }
    },
    set(k, v) {
      mem[k] = v;
      try { localStorage.setItem(k, JSON.stringify(v)); }
      catch (e) { if (e && e.name === 'QuotaExceededError') toast('기기 저장 공간이 꽉 찼어요. 오래된 논문을 지워 주세요.'); }
    },
    del(k) { delete mem[k]; try { localStorage.removeItem(k); } catch {} },
  };

  const LocalBackend = {
    kind: 'local',
    async loadProfile() { return local.get('gz:profile'); },
    async saveProfile(p) { local.set('gz:profile', p); },
    async listPapers() { return local.get('gz:papers') || []; },
    async savePaper(meta) {
      const list = local.get('gz:papers') || [];
      const i = list.findIndex(p => p.id === meta.id);
      if (i >= 0) list[i] = meta; else list.push(meta);
      local.set('gz:papers', list);
    },
    async loadChunks(pid) { return local.get('gz:chunks:' + pid) || []; },
    async saveChunk(pid, chunk) {
      const list = local.get('gz:chunks:' + pid) || [];
      list[chunk.i] = chunk;
      local.set('gz:chunks:' + pid, list);
    },
    async deletePaper(pid) {
      local.set('gz:papers', (local.get('gz:papers') || []).filter(p => p.id !== pid));
      local.del('gz:chunks:' + pid);
    },
  };

  function DbBackend(db, userId) {
    const profile = db.doc(`data/users/${userId}/profile`);
    const papers = profile.collection('papers');
    // 같은 문서에는 한 번에 하나씩만 써요
    const queues = {};
    const serial = (key, fn) => (queues[key] = (queues[key] || Promise.resolve()).catch(() => {}).then(fn));
    const clone = o => JSON.parse(JSON.stringify(o));
    return {
      kind: 'db',
      async loadProfile() { const s = await profile.get(); return s.exists ? clone(s.data()) : null; },
      saveProfile: p => serial('profile', () => profile.set(clone(p))),
      async listPapers() { const s = await papers.get(); return s.docs.map(d => clone(d.data())); },
      savePaper: meta => serial('p:' + meta.id, () => papers.doc(meta.id).set(clone(meta))),
      async loadChunks(pid) {
        const s = await papers.doc(pid).collection('chunks').get();
        const out = [];
        s.docs.forEach(d => { const c = d.data(); out[c.i] = clone(c); });
        return out;
      },
      saveChunk: (pid, chunk) => serial(`c:${pid}:${chunk.i}`, () =>
        papers.doc(pid).collection('chunks').doc('c' + chunk.i).set(clone(chunk))),
      async deletePaper(pid) {
        const s = await papers.doc(pid).collection('chunks').get();
        for (const d of s.docs) await papers.doc(pid).collection('chunks').doc(d.id).delete();
        await papers.doc(pid).delete();
      },
    };
  }

  let backend = LocalBackend;
  return {
    get kind() { return backend.kind; },
    async init() {
      if (!window.claude || typeof window.claude.use !== 'function') return;
      try {
        const [db, user] = await Promise.all([claude.use('db'), claude.use('user')]);
        const id = user && await user.id();
        if (db && id) backend = DbBackend(db, id);
      } catch { /* 계속 기기 저장소 사용 */ }
    },
    loadProfile: () => backend.loadProfile(),
    saveProfile: p => backend.saveProfile(p),
    listPapers: () => backend.listPapers(),
    savePaper: m => backend.savePaper(m),
    loadChunks: id => backend.loadChunks(id),
    saveChunk: (id, c) => backend.saveChunk(id, c),
    deletePaper: id => backend.deletePaper(id),
    // API 키는 비밀이라 공유 db에 절대 넣지 않고 이 기기에만 둬요
    getKey: () => local.get('gz:apikey') || '',
    setKey: k => (k ? local.set('gz:apikey', k) : local.del('gz:apikey')),
    getModel: () => local.get('gz:model') || 'claude-sonnet-5-5',
    setModel: m => local.set('gz:model', m),
  };
})();
