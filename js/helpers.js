/* 콘텐츠 작성용 도우미 함수 */
window.GRAMMAR = [];

window.H = {
  /** 표: H.table(['머리1','머리2'], [['a','b'], ...]) */
  table(head, rows) {
    const th = head.map(h => `<th>${h}</th>`).join('');
    const tr = rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('');
    return `<div class="tbl-wrap"><table><thead><tr>${th}</tr></thead><tbody>${tr}</tbody></table></div>`;
  },
  /** 공식: H.formula('주어', '+', '*have/has', '+', 'p.p.')  — '*'로 시작하면 강조 */
  formula(...parts) {
    return `<div class="formula">${parts.map(p => {
      if (p === '+' || p === '/' || p === '→' || p === '=' || p === ',') return `<span class="op">${p}</span>`;
      if (p.startsWith('*')) return `<span class="fx k">${p.slice(1)}</span>`;
      return `<span class="fx">${p}</span>`;
    }).join('')}</div>`;
  },
  /** 박스: type = tip | warn | memo | more */
  box(type, html) { return `<div class="box ${type}">${html}</div>`; },
};
