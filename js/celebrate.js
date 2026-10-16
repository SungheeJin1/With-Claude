/* 정답 축하: 컨페티 + 불꽃놀이 + “정답!” 글자 (약 1초)
   celebrate(x, y): x, y는 화면 좌표(누른 버튼 근처). 다른 도구 없이 캔버스로 직접 그려요. */
(function () {
  const COLORS = ['#f7d74a', '#ff7a59', '#5fe3a1', '#8fb4ff', '#b79cff', '#ff8fc4', '#ffffff'];
  const reduce = () => window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rand = (a, b) => a + Math.random() * (b - a);
  let running = null;

  function badge() {
    const words = ['정답!', '최고예요!', '완벽해요!', '잘했어요!'];
    const el = document.createElement('div');
    el.className = 'cele-badge';
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML = `<span>🎉</span>${words[Math.floor(Math.random() * words.length)]}<span>🎉</span>`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1100);
  }

  window.celebrate = function (x, y) {
    badge();
    if (reduce()) return;
    if (running) running.stop();

    const W = innerWidth, H = innerHeight, dpr = Math.min(devicePixelRatio || 1, 2);
    const cv = document.createElement('canvas');
    cv.className = 'cele-canvas';
    cv.width = W * dpr; cv.height = H * dpr;
    document.body.appendChild(cv);
    const ctx = cv.getContext('2d');
    ctx.scale(dpr, dpr);

    const cx = x == null ? W / 2 : x, cy = y == null ? H * 0.6 : y;
    const parts = [];
    /* 컨페티: 누른 곳에서 위로 터져 올랐다가 떨어져요 */
    for (let i = 0; i < 110; i++) {
      const a = rand(-Math.PI * 0.95, -Math.PI * 0.05), sp = rand(7, 17);
      parts.push({ kind: 'paper', x: cx, y: cy, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
        w: rand(6, 11), h: rand(8, 15), rot: rand(0, Math.PI * 2), vr: rand(-0.35, 0.35),
        c: COLORS[i % COLORS.length], life: 1 });
    }
    /* 불꽃놀이: 화면 위쪽 세 군데에서 차례로 펑! */
    const bursts = [[W * 0.25, H * 0.28, 0], [W * 0.75, H * 0.22, 140], [W * 0.5, H * 0.14, 280]];
    bursts.forEach(([bx, by, delay]) => {
      const c = COLORS[Math.floor(rand(0, COLORS.length - 1))];
      for (let i = 0; i < 46; i++) {
        const a = (i / 46) * Math.PI * 2, sp = rand(2.5, 5.5);
        parts.push({ kind: 'spark', x: bx, y: by, px: bx, py: by, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
          c, delay, life: 1 });
      }
    });

    const start = performance.now(), DUR = 1150;
    let raf;
    function frame(now) {
      const t = now - start;
      ctx.clearRect(0, 0, W, H);
      for (const p of parts) {
        if (p.kind === 'spark') {
          if (t < p.delay) continue;
          p.px = p.x; p.py = p.y;
          p.vx *= 0.96; p.vy = p.vy * 0.96 + 0.06;
          p.x += p.vx; p.y += p.vy;
          p.life = Math.max(0, 1 - (t - p.delay) / 750);
          ctx.globalAlpha = p.life;
          ctx.strokeStyle = p.c; ctx.lineWidth = 2.4; ctx.lineCap = 'round';
          ctx.beginPath(); ctx.moveTo(p.px, p.py); ctx.lineTo(p.x, p.y); ctx.stroke();
          ctx.beginPath(); ctx.fillStyle = p.c; ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2); ctx.fill();
        } else {
          p.vx *= 0.985; p.vy += 0.35;
          p.x += p.vx; p.y += p.vy; p.rot += p.vr;
          p.life = t < DUR - 300 ? 1 : Math.max(0, (DUR - t) / 300);
          ctx.globalAlpha = p.life;
          ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
          ctx.fillStyle = p.c;
          ctx.fillRect(-p.w / 2, -p.h / 2 * Math.abs(Math.cos(p.rot * 2)), p.w, p.h * Math.abs(Math.cos(p.rot * 2)) + 1);
          ctx.restore();
        }
      }
      ctx.globalAlpha = 1;
      if (t < DUR) raf = requestAnimationFrame(frame); else stop();
    }
    function stop() { cancelAnimationFrame(raf); cv.remove(); running = null; }
    running = { stop };
    raf = requestAnimationFrame(frame);
  };
})();
