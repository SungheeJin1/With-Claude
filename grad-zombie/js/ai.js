/* Claude 호출: claude.ai 아티팩트 안이면 내장 Claude(sample), 아니면 사용자가 넣은 API 키로 직접 호출 */
const AI = (() => {
  let sample = null;

  const MESSAGES = {
    not_granted: 'Claude 사용 권한이 없어요. 아티팩트 권한 메뉴에서 허용해 주세요.',
    sampling_disabled: '이 계정에서는 Claude를 쓸 수 없어요.',
    rate_limited: '요청이 많아요. 잠시 뒤 다시 시도해 주세요.',
    session_expired: '다시 로그인해 주세요.',
    prompt_too_large: '논문이 너무 길어요. 일부만 붙여 넣어 주세요.',
    refused: 'Claude가 이 내용에는 답하지 않았어요.',
    empty_completion: '답이 비어 있어요. 다시 시도해 주세요.',
    invalid_json: '분석 결과 형식이 깨졌어요. 다시 시도해 주세요.',
    no_ai: '분석하려면 설정에서 Claude API 키를 넣어 주세요.',
    bad_key: 'API 키가 올바르지 않아요. 설정에서 확인해 주세요.',
    cancelled: '멈췄어요.',
  };
  const errText = e => MESSAGES[e && e.code] || (e && e.message) || '잠시 문제가 생겼어요. 다시 시도해 주세요.';

  async function apiCall(input, { onText, signal, maxTokens = 8000, system }) {
    const key = Store.getKey();
    if (!key) throw { code: 'no_ai' };
    const messages = typeof input === 'string' ? [{ role: 'user', content: input }] : input;
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST', signal,
      headers: {
        'content-type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({ model: Store.getModel(), max_tokens: maxTokens, stream: true, messages, ...(system ? { system } : {}) }),
    }).catch(e => { throw e.name === 'AbortError' ? { code: 'cancelled' } : { code: 'upstream_error', message: '인터넷 연결을 확인해 주세요.' }; });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      if (res.status === 401) throw { code: 'bad_key' };
      if (res.status === 429) throw { code: 'rate_limited' };
      throw { code: 'upstream_error', message: body.error?.message || `오류 ${res.status}` };
    }
    const reader = res.body.getReader();
    const dec = new TextDecoder();
    let buf = '', text = '', stop = null;
    try {
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        let nl;
        while ((nl = buf.indexOf('\n')) >= 0) {
          const line = buf.slice(0, nl).trim();
          buf = buf.slice(nl + 1);
          if (!line.startsWith('data:')) continue;
          let ev; try { ev = JSON.parse(line.slice(5)); } catch { continue; }
          if (ev.type === 'content_block_delta' && ev.delta?.type === 'text_delta') {
            text += ev.delta.text;
            onText && onText({ text, delta: ev.delta.text });
          } else if (ev.type === 'message_delta') {
            stop = ev.delta?.stop_reason;
          } else if (ev.type === 'error') {
            throw { code: 'upstream_error', message: ev.error?.message, text };
          }
        }
      }
    } catch (e) {
      if (e && e.name === 'AbortError') throw { code: 'cancelled', text };
      throw e.code ? e : { code: 'upstream_error', text };
    }
    if (!text) throw { code: 'empty_completion' };
    return { text, truncated: stop === 'max_tokens' };
  }

  return {
    async init() {
      if (window.claude && typeof window.claude.use === 'function') {
        try { sample = await claude.use('sample'); } catch { sample = null; }
      }
    },
    get mode() { return sample ? 'claude' : Store.getKey() ? 'api' : null; },
    errText,
    /** 텍스트 답: {text, truncated} */
    async text(input, opts = {}) {
      if (sample) {
        const r = await sample(input, { onText: opts.onText, signal: opts.signal, modelTier: opts.tier || 'default', cache: false });
        return { text: r.text, truncated: !!r.truncated };
      }
      return apiCall(input, opts);
    },
    /** JSON 답 */
    async json(input, opts = {}) {
      if (sample && sample.json) {
        return sample.json(input, { onText: opts.onText, signal: opts.signal, modelTier: opts.tier || 'default' });
      }
      const r = sample ? await sample(input, { signal: opts.signal, modelTier: opts.tier || 'default' }) : await apiCall(input, opts);
      return parseLooseJSON(r.text);
    },
  };
})();
