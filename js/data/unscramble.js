/* 품사 탭 끝(마무리)에 나오는 “단어 순서 맞히기” 문제
   [우리말 뜻, 정답 문장, (다른 정답들)]
   단어 카드는 정답 문장을 쪼개서 매번 같은 순서로 섞어 만들어요.
   (명사 탭 a/an 챕터 다음 문제는 01-noun.js에 직접 적혀 있어요) */
(function () {
const Q = {
  noun: [['엄마가 주스 세 병을 사셨어요.', 'Mom bought three bottles of juice.'], ['탁자 위에 상자가 세 개 있어요.', 'There are three boxes on the table.'], ['오늘 밤 달이 밝아요.', 'The moon is bright tonight.', 'Tonight the moon is bright.']],
  pronoun: [['이 연필 네 거야?', 'Is this pencil yours?'], ['밖에 비가 오고 있어요.', 'It is raining outside.'], ['나는 제주에 사는 친구가 있어요.', 'I have a friend who lives in Jeju.']],
  adjective: [['나는 차가운 마실 것을 원해요.', 'I want something cold to drink.'], ['냉장고에 우유가 거의 없어요.', 'There is little milk in the fridge.'], ['코끼리는 말보다 더 커요.', 'An elephant is bigger than a horse.']],
  adverb: [['거북이는 천천히 걸었어요.', 'The turtle walked slowly.'], ['그는 항상 일찍 일어나요.', 'He always gets up early.'], ['부산은 우리 할머니가 사시는 도시예요.', 'Busan is the city where my grandma lives.']],
  verb: [['그녀는 스마트폰이 없어요.', "She doesn't have a smartphone.", 'She does not have a smartphone.'], ['나는 눈을 한 번도 본 적이 없어요.', 'I have never seen snow.'], ['한글은 세종대왕이 만드셨어요.', 'Hangeul was created by King Sejong.']],
  preposition: [['내 생일은 10월에 있어요.', 'My birthday is in October.'], ['벽에 시계가 있어요.', 'There is a clock on the wall.'], ['아이들이 교실 안으로 뛰어 들어갔어요.', 'The kids ran into the classroom.']],
  conjunction: [['비가 와서 우리는 안에 있었어요.', 'It was raining, so we stayed inside.'], ['나는 눈사람을 만들 수 있어서 겨울이 좋아요.', 'I like winter because I can make a snowman.'], ['내일 비가 오면 나는 집에 있을 거야.', 'If it rains tomorrow, I will stay home.', 'I will stay home if it rains tomorrow.']],
  interjection: [['와! 무지개 좀 봐!', 'Wow! Look at the rainbow!'], ['음, 잘 모르겠어.', "Well, I'm not sure."], ['정말 아름다운 날이구나!', 'What a beautiful day!']],
};

/* 첫 단어가 이름이거나 I로 시작하는 말이면 대문자를 그대로 둬요 */
const KEEP = /^(I|I'm|I'll|I've|I'd|Busan|Hangeul|Mina|Minho|Jimin|Jeju|Mom)$/;
function words(answer, keepComma) {
  /* 문장 첫 단어(맨 앞, 또는 . ! ? 바로 뒤)는 소문자로 바꿔서 대문자가 순서 힌트가 되지 않게 해요 */
  const raw = answer.split(/\s+/).filter(Boolean);
  const toks = raw.map((w, i) => {
    const starts = i === 0 || /[.!?]$/.test(raw[i - 1]);
    let t = w.replace(keepComma ? /[.!?]+$/ : /[.,!?]+$/, '');
    if (starts && !KEEP.test(t)) t = t.toLowerCase();
    return t;
  });
  /* 정답 문장으로 정해지는 “고정된” 섞기: 새로고침해도 같은 순서 */
  let seed = 0;
  for (const ch of answer) seed = (seed * 31 + ch.charCodeAt(0)) >>> 0;
  const rnd = () => (seed = (seed * 1103515245 + 12345) >>> 0) / 4294967296;
  const out = toks.slice();
  for (let n = 0; n < 6; n++) {
    for (let i = out.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [out[i], out[j]] = [out[j], out[i]]; }
    if (out.join(' ') !== toks.join(' ')) break;
  }
  return out;
}

GRAMMAR.forEach(t => {
  if (!Q[t.id]) return;
  t.unscrambleEnd = Q[t.id].map(([ko, answer, ...rest]) => {
    const opts = rest.find(r => typeof r === 'object') || {};
    const alt = rest.filter(r => typeof r === 'string');
    return { ko, answer, alt, keepComma: !!opts.keepComma, words: words(answer, opts.keepComma) };
  });
});
})();
