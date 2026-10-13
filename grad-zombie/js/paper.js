/* 논문 텍스트 처리: PDF 읽기, 조각내기, 분석 프롬프트, 하이라이트 표시 */
const Paper = (() => {
  const PDFJS = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/';
  const CHUNK = 4500;          // 번역 한 번에 보낼 원문 길이(글자)
  const MAX_CONTEXT = 90000;   // 요약·질문에 함께 보내는 원문 최대 길이

  let pdfLoading;
  function loadPdfJs() {
    if (window.pdfjsLib) return Promise.resolve(window.pdfjsLib);
    return pdfLoading ||= new Promise((ok, fail) => {
      const s = document.createElement('script');
      s.src = PDFJS + 'pdf.min.js';
      s.onload = () => {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS + 'pdf.worker.min.js';
        ok(window.pdfjsLib);
      };
      s.onerror = () => { pdfLoading = null; fail(new Error('PDF 도구를 불러오지 못했어요. 인터넷 연결을 확인해 주세요.')); };
      document.head.appendChild(s);
    });
  }

  async function readPdf(file, onProgress) {
    const lib = await loadPdfJs();
    const pdf = await lib.getDocument({ data: await file.arrayBuffer() }).promise;
    const pages = [];
    for (let n = 1; n <= pdf.numPages; n++) {
      const page = await pdf.getPage(n);
      const tc = await page.getTextContent();
      let out = '', lastY = null;
      for (const it of tc.items) {
        const y = it.transform ? it.transform[5] : null;
        if (lastY !== null && y !== null && Math.abs(y - lastY) > 2 && !out.endsWith('\n')) out += '\n';
        out += it.str;
        if (it.hasEOL) out += '\n';
        lastY = y;
      }
      pages.push(out);
      onProgress && onProgress(n, pdf.numPages);
    }
    return pages.join('\n\n');
  }

  /* PDF 줄바꿈 정리: 하이픈 끊김 잇기, 문단 안의 줄바꿈은 공백으로 */
  function clean(text) {
    return text
      .replace(/\r/g, '')
      .replace(/[ \t]+/g, ' ')
      .replace(/(\w)-\n(\w)/g, '$1$2')
      .replace(/([^\n.!?:;])\n(?=[a-z0-9(,])/g, '$1 ')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }

  /* 참고문헌 뒤는 번역에서 빼요 (본문 절반 이후에 나오는 마지막 제목 기준) */
  function cutReferences(text) {
    const re = /\n\s*(?:\d+\.?\s*)?(References|REFERENCES|Bibliography|BIBLIOGRAPHY|Works Cited|참고\s*문헌)\s*\n/g;
    let m, last = -1;
    while ((m = re.exec(text))) if (m.index > text.length * 0.5) last = m.index;
    return last > 0 ? text.slice(0, last) : text;
  }

  /* 문단·문장 경계에서 대략 CHUNK 글자씩 자르기 */
  function chunk(text) {
    const paras = text.split(/\n\s*\n|\n(?=[A-Z0-9][^\n]{0,80}\n)/);
    const out = [];
    let cur = '';
    const push = () => { if (cur.trim()) out.push(cur.trim()); cur = ''; };
    for (const p of paras) {
      if (p.length > CHUNK) {
        push();
        const sentences = p.match(/[^.!?]+[.!?]+["')\]]*\s*|[^.!?]+$/g) || [p];
        for (const s of sentences) {
          if (cur.length + s.length > CHUNK) push();
          cur += s;
        }
        push();
      } else {
        if (cur.length + p.length > CHUNK) push();
        cur += (cur ? '\n\n' : '') + p;
      }
    }
    push();
    return out;
  }

  function contextOf(text) {
    return text.length > MAX_CONTEXT ? text.slice(0, MAX_CONTEXT) + '\n…(이하 생략)' : text;
  }

  function analysisPrompt(text) {
    return `당신은 대학원 진학을 준비하는 학생을 돕는 연구 조교입니다. 아래 논문을 읽고 한국어로 분석하세요.

반드시 아래 형식의 JSON 하나로만 답하세요. 설명 문장은 쓰지 마세요.
{
  "title": "논문 원제목",
  "titleKo": "제목 한국어 번역",
  "authors": "저자 (모르면 빈 문자열)",
  "year": "연도 (모르면 빈 문자열)",
  "field": "분야 (예: 자연어처리, 사회심리학)",
  "oneLine": "논문 전체를 한 문장으로 요약",
  "summary": ["핵심 내용 3~6개, 각 1~2문장"],
  "structure": {
    "problem": "연구 문제·동기",
    "method": "방법·데이터",
    "results": "주요 결과 (수치가 있으면 포함)",
    "contribution": "기여·의의",
    "limitations": "한계·후속 연구"
  },
  "keywords": [{"term": "원문 용어(영어면 영어 그대로)", "ko": "한국어 뜻", "desc": "이 논문에서 무슨 의미로 쓰였는지 1~2문장", "importance": 3}],
  "keySentences": [{"original": "원문에서 그대로 복사한 핵심 문장", "ko": "한국어 번역", "why": "왜 중요한지 한 줄"}],
  "questions": ["이 논문을 읽고 스스로 답해 볼 만한 질문 3개"]
}
keywords는 중요도(importance 1~3) 순으로 6~12개, keySentences는 원문 문장을 글자 그대로 3~6개 고르세요.

<논문>
${contextOf(text)}
</논문>`;
  }

  function translatePrompt(part, idx, total, analysis) {
    const kws = (analysis?.keywords || []).map(k => `${k.term}(${k.ko})`).join(', ');
    return `다음은 논문 "${analysis?.title || ''}"의 ${idx + 1}/${total}번째 부분입니다. 한국어로 빠짐없이 전문 번역하세요.

규칙
- 요약하거나 빼먹지 말고 문장 단위로 모두 번역합니다. 자연스러운 학술 한국어로 씁니다.
- 문단 사이는 빈 줄로 구분합니다. 원문의 절 제목은 "## 제목" 한 줄로 씁니다.
- 이 부분에서 논문의 핵심 주장·결론·기여를 말하는 문장은 ==문장== 으로 감쌉니다 (0~4개).
- 전문 용어(키워드)는 처음 나올 때 [[한국어 용어(원어)]], 그 뒤로는 [[한국어 용어]] 로 감쌉니다.
- 수치 결과, 정의, 중요한 조건 같은 핵심 구절은 **굵게** 표시합니다.
- 번역문만 출력하고 다른 말은 하지 마세요. PDF에서 생긴 머리글·쪽번호 같은 잡음은 생략합니다.
${kws ? `- 이 논문의 키워드: ${kws}` : ''}

<원문>
${part}
</원문>`;
  }

  function chatPrompt(meta, text, history, question) {
    const a = meta.analysis;
    const intro = `당신은 대학원 진학 준비생과 함께 논문을 읽는 친절한 연구 조교입니다. 아래 논문을 근거로 한국어로 답하세요. 논문에 없는 내용은 없다고 말하고, 일반 지식으로 보충할 때는 그렇다고 밝히세요. 답은 짧고 명확하게, 필요하면 목록으로 쓰세요.

<논문 요약>
${a ? JSON.stringify({ title: a.title, oneLine: a.oneLine, structure: a.structure }) : '(아직 분석 전)'}
</논문 요약>

<논문 원문>
${contextOf(text)}
</논문 원문>`;
    const turns = history.slice(-10).map(m => ({ role: m.role, content: m.content }));
    while (turns.length && turns[0].role !== 'user') turns.shift();
    turns.push({ role: 'user', content: question });
    turns[0] = { role: 'user', content: intro + '\n\n질문: ' + turns[0].content };
    return turns;
  }

  /* 번역문 표기(==핵심==, [[키워드]], **굵게**, ## 제목)를 HTML로 */
  function inline(s) {
    return esc(s)
      .replace(/==([\s\S]+?)==/g, '<mark class="key">$1</mark>')
      .replace(/\[\[([\s\S]+?)\]\]/g, '<span class="kwd">$1</span>')
      .replace(/\*\*([\s\S]+?)\*\*/g, '<strong>$1</strong>');
  }
  function renderTranslation(tr) {
    return tr.split(/\n\s*\n/).map(block => {
      const b = block.trim();
      if (!b) return '';
      const h = b.match(/^#{1,4}\s+(.+)$/m);
      if (h && b.split('\n').length === 1) return `<h3>${inline(h[1])}</h3>`;
      return b.split('\n').map(line => {
        const hh = line.match(/^#{1,4}\s+(.+)$/);
        return hh ? `<h3>${inline(hh[1])}</h3>` : `<p>${inline(line)}</p>`;
      }).join('');
    }).join('');
  }

  /* 원문 보기: 분석에서 고른 핵심 문장과 키워드를 원문에도 칠해요 */
  function renderOriginal(orig, analysis) {
    let html = esc(orig);
    const norm = s => esc(String(s || '').trim());
    for (const ks of analysis?.keySentences || []) {
      const s = norm(ks.original);
      if (s.length > 20 && html.includes(s)) html = html.split(s).join(`<mark class="key">${s}</mark>`);
    }
    const terms = (analysis?.keywords || []).map(k => String(k.term || '').trim()).filter(t => t.length > 2 && /^[\w\s\-]+$/.test(t));
    if (terms.length) {
      const re = new RegExp(`\\b(${terms.map(t => t.replace(/[-\s]/g, m => m === '-' ? '\\-' : '\\s+')).join('|')})\\b(?![^<]*>)`, 'gi');
      html = html.replace(re, '<span class="kwd">$1</span>');
    }
    return html;
  }

  return { readPdf, clean, cutReferences, chunk, analysisPrompt, translatePrompt, chatPrompt, renderTranslation, renderOriginal };
})();
