/* 좀비 추격 규칙
   - 처음 거리는 6칸, 최대 10칸
   - 출석한 날은 2칸 도망, 아무것도 안 한 날은 좀비가 3칸 다가옴
   - 0칸이 되면 잡힘 → 다음에 출석하면 3칸에서 다시 도망 시작 */
const Chase = (() => {
  const MAX = 10, START = 6, GAIN = 2, LOSS = 3, REVIVE = 3;

  const ACTIVITY = {
    open: '논문을 펼쳐 봤어요',
    add: '논문을 서재에 넣었어요',
    analyze: '논문을 분석했어요',
    translate: '전문 해석을 진행했어요',
    ask: 'Claude에게 논문 질문을 했어요',
  };

  function step(d, checked) {
    if (checked) return d <= 0 ? REVIVE : Math.min(MAX, d + GAIN);
    return Math.max(0, d - LOSS);
  }

  function compute(profile, today = dayKey()) {
    const log = profile.log || {};
    const start = profile.startDay || today;
    const has = k => (log[k] || []).length > 0;
    let d = START, caughtCount = 0, best = 0, run = 0;
    for (let k = start; k < today; k = addDays(k, 1)) {
      const before = d;
      d = step(d, has(k));
      if (before > 0 && d === 0) caughtCount++;
      run = has(k) ? run + 1 : 0;
      best = Math.max(best, run);
    }
    const checkedToday = has(today);
    const now = checkedToday ? step(d, true) : d;
    if (checkedToday) best = Math.max(best, run + 1);

    let streak = 0;
    for (let k = checkedToday ? today : addDays(today, -1); k >= start && has(k); k = addDays(k, -1)) streak++;

    const days = Object.keys(log).filter(has).length;
    return {
      distance: now,                       // 오늘 기준 거리
      morning: d,                          // 오늘 아침(출석 전) 거리
      ifMiss: step(now, false),            // 오늘 출석 안 하면 내일 아침 거리
      caught: now <= 0,
      checkedToday, streak, best, days, caughtCount,
      totalDays: daysBetween(start, today) + 1,
      max: MAX, gain: GAIN, loss: LOSS,
    };
  }

  /* 오늘 출석 전이면 시간이 갈수록 좀비가 슬금슬금 다가오는 모습을 보여 줘요 (표시용) */
  function creep(st, now = new Date()) {
    if (st.checkedToday || st.caught) return st.distance;
    const frac = (now.getHours() * 60 + now.getMinutes()) / 1440;
    return Math.max(0.15, st.distance - LOSS * frac);
  }

  function msUntilMidnight(now = new Date()) {
    const m = new Date(now); m.setHours(24, 0, 0, 0);
    return m - now;
  }

  return { compute, creep, msUntilMidnight, ACTIVITY, MAX };
})();
