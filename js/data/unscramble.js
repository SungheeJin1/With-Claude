/* “단어 순서 맞히기” 문제
   after: 그 챕터 바로 다음에 나오는 문제 / end: 품사 탭 끝(마무리) 문제
   [우리말 뜻, 정답 문장, (다른 정답들)]
   단어 카드는 정답 문장을 쪼개서 매번 같은 순서로 섞어 만들어요.
   (명사 탭 a/an 챕터 다음 문제는 01-noun.js에 직접 적혀 있어요) */
(function () {
const Q = {
  noun: {
    end: [['엄마가 주스 세 병을 사셨어요.', 'Mom bought three bottles of juice.'], ['탁자 위에 상자가 세 개 있어요.', 'There are three boxes on the table.'], ['오늘 밤 달이 밝아요.', 'The moon is bright tonight.', 'Tonight the moon is bright.']],
  },
  pronoun: {
    after: {
      self: [['엄마가 나를 안아 주셨어요.', 'Mom hugged me.'], ['저 가방은 그녀의 것이에요.', 'That bag is hers.'], ['그녀는 거울 속 자신을 바라보았어요.', 'She looked at herself in the mirror.']],
      wh: [['저 자전거 진짜 멋지다!', 'That bike is really cool!'], ['하나는 내 거고, 나머지는 전부 네 거야.', 'One is mine, and the others are yours.'], ['이건 누구의 가방이야?', 'Whose bag is this?']],
    },
    end: [['밖에 비가 오고 있어요.', 'It is raining outside.'], ['나는 제주에 사는 친구가 있어요.', 'I have a friend who lives in Jeju.'], ['내가 원하는 것은 강아지야.', 'What I want is a puppy.']],
  },
  adjective: {
    after: {
      demonstrative: [['너 행복해 보여.', 'You look happy.'], ['그녀는 길고 검은 머리를 가졌어요.', 'She has long black hair.'], ['이 쿠키들은 너를 위한 거야.', 'These cookies are for you.']],
    },
    end: [['나는 차가운 마실 것을 원해요.', 'I want something cold to drink.'], ['냉장고에 우유가 거의 없어요.', 'There is little milk in the fridge.'], ['코끼리는 말보다 더 커요.', 'An elephant is bigger than a horse.']],
  },
  adverb: {
    after: {
      frequency: [['천천히 말해 주세요.', 'Please speak slowly.'], ['그는 공부를 거의 안 해요.', 'He hardly studies.'], ['나는 보통 학교에 걸어가요.', 'I usually walk to school.']],
    },
    end: [['이 상자는 나한테 너무 무거워요.', 'This box is too heavy for me.'], ['그는 운전할 수 있을 만큼 나이가 들었어요.', 'He is old enough to drive.'], ['부산은 우리 할머니가 사시는 도시예요.', 'Busan is the city where my grandma lives.']],
  },
  verb: {
    after: {
      'subject-number': [['우리 아빠는 버스를 운전하세요.', 'My dad drives a bus.'], ['너희 오빠는 기타를 치니?', 'Does your brother play the guitar?'], ['그녀는 스마트폰이 없어요.', "She doesn't have a smartphone.", 'She does not have a smartphone.']],
      would: [['펭귄은 날 수 없어요.', "Penguins can't fly.", 'Penguins cannot fly.'], ['복도에서 뛰면 안 돼요.', 'You must not run in the hallway.'], ['너는 좀 쉬는 게 좋겠어.', 'You should take a rest.']],
      future: [['아기가 자고 있어요.', 'The baby is sleeping.'], ['우리는 방과 후에 떡볶이를 먹었어요.', 'We ate tteokbokki after school.', 'After school we ate tteokbokki.'], ['내일은 맑을 거예요.', 'It will be sunny tomorrow.', 'Tomorrow it will be sunny.']],
      'subjunctive-past-perfect': [['나는 눈을 한 번도 본 적이 없어요.', 'I have never seen snow.'], ['영화는 이미 시작했었어요.', 'The movie had already started.'], ['내가 새라면, 너에게 날아갈 텐데.', 'If I were a bird, I would fly to you.', 'I would fly to you if I were a bird.']],
    },
    end: [['한글은 세종대왕이 만드셨어요.', 'Hangeul was created by King Sejong.'], ['새 도서관은 다음 달에 문을 열 거예요.', 'The new library will be opened next month.'], ['남동생은 공룡에 관심이 많아요.', 'My brother is interested in dinosaurs.']],
  },
  preposition: {
    after: {
      place: [['학교는 8시 30분에 시작해요.', 'School starts at 8:30.'], ['정문에서 나를 기다려.', 'Wait for me at the gate.'], ['우리 고양이는 바구니 안에서 자고 있어요.', 'My cat is sleeping in the basket.']],
    },
    end: [['내 신발은 침대 밑에 있어요.', 'My shoes are under the bed.'], ['아이들이 교실 안으로 뛰어 들어갔어요.', 'The kids ran into the classroom.'], ['나는 걸어서 학교에 가요.', 'I go to school on foot.']],
  },
  conjunction: {
    after: {
      correlative: [['형과 나는 같은 학교에 다녀요.', 'My brother and I go to the same school.'], ['우유 아니면 주스 마실래?', 'Do you want milk or juice?'], ['미나와 지수 둘 다 우리 반이에요.', 'Both Mina and Jisu are in my class.']],
    },
    end: [['나는 눈사람을 만들 수 있어서 겨울이 좋아요.', 'I like winter because I can make a snowman.'], ['내일 비가 오면 나는 집에 있을 거야.', 'If it rains tomorrow, I will stay home.', 'I will stay home if it rains tomorrow.'], ['나는 네가 옳다고 생각해.', 'I think that you are right.', 'I think you are right.']],
  },
  interjection: {
    end: [['와! 무지개 좀 봐!', 'Wow! Look at the rainbow!'], ['음, 잘 모르겠어.', "Well, I'm not sure."], ['정말 아름다운 날이구나!', 'What a beautiful day!']],
  },
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

const build = list => list.map(([ko, answer, ...rest]) => {
  const opts = rest.find(r => typeof r === 'object') || {};
  const alt = rest.filter(r => typeof r === 'string');
  return { ko, answer, alt, keepComma: !!opts.keepComma, words: words(answer, opts.keepComma) };
});

GRAMMAR.forEach(t => {
  const q = Q[t.id];
  if (!q) return;
  if (q.end) t.unscrambleEnd = build(q.end);
  t.sections.forEach(s => {
    if (!s.group && q.after && q.after[s.id]) s.unscramble = build(q.after[s.id]);
  });
});
})();
