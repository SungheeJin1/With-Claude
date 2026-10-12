(function () {
const en = s => `<span class="en">${s}</span>`;

GRAMMAR.push({
  id: 'adverb', name: '부사', en: 'Adverb', icon: '⚡', color: '#e0a100',
  intro: '부사는 <b>명사만 빼고 거의 다</b> 꾸며 주는 만능 꾸밈 친구예요. 동사, 형용사, 다른 부사, 그리고 문장 전체까지! “<b>어떻게, 언제, 어디서, 얼마나, 얼마나 자주</b>”를 알려 줘요.',
  sections: [
    {
      id: 'what', title: '부사란?', en: 'What is an adverb?',
      html: `
        <p>형용사는 <b>명사</b>만 꾸미지만, 부사는 그 밖의 것들을 꾸며요.</p>
        ${H.table(['꾸미는 것', '예', '뜻'], [
          ['동사', en('He runs <b>fast</b>.'), '그는 <b>빨리</b> 달린다.'],
          ['형용사', en('It is <b>very</b> cold.'), '<b>아주</b> 춥다.'],
          ['다른 부사', en('She sings <b>really</b> well.'), '그녀는 <b>정말</b> 노래를 잘한다.'],
          ['문장 전체', en('<b>Luckily</b>, I found my bag.'), '<b>다행히도</b>, 나는 가방을 찾았다.'],
        ])}
        ${H.table(['알려 주는 것', '예'], [
          ['어떻게 (방법)', en('slowly, quickly, carefully, well, hard')],
          ['언제 (시간)', en('now, today, yesterday, soon, early, late')],
          ['어디서 (장소)', en('here, there, home, outside, upstairs')],
          ['얼마나 (정도)', en('very, so, too, really, quite, almost')],
          ['얼마나 자주 (빈도)', en('always, usually, often, sometimes, never')],
        ])}
      `,
      examples: [
        ['Please speak <b>slowly</b>.', '천천히 말해 주세요.'],
        ['The test was <b>really</b> easy.', '시험은 정말 쉬웠어요.'],
        ['Come <b>here</b> <b>now</b>!', '지금 이리 와!'],
      ],
    },
    {
      id: 'ly', title: '부사 만들기: 형용사 + ly', en: 'slow → slowly',
      html: `
        ${H.table(['규칙', '예'], [
          ['대부분 +ly', en('slow → slowly, quick → quickly, sad → sadly, careful → carefully')],
          ['자음 + y → i + ly', en('happy → happily, easy → easily, lucky → luckily')],
          ['-le로 끝나면 e → y', en('gentle → gently, simple → simply')],
          ['불규칙', en('good → <b>well</b>')],
          ['모양이 같은 것', en('fast, hard, high, late, early, long') + ' (형용사도 되고 부사도 돼요)'],
        ])}
        ${H.box('warn', `${en('friendly(친절한), lovely(사랑스러운), lonely(외로운), ugly(못생긴)')}는 -ly로 끝나지만 <b>형용사</b>예요!`)}
        ${H.box('warn', `ly를 붙이면 뜻이 확 달라지는 단어가 있어요.<br>${en('hard')} 열심히 ↔ ${en('<b>hardly</b>')} 거의 ~않다<br>${en('late')} 늦게 ↔ ${en('<b>lately</b>')} 최근에<br>${en('high')} 높이 ↔ ${en('<b>highly</b>')} 매우`)}
      `,
      examples: [
        ['The turtle walked <b>slowly</b>.', '거북이는 천천히 걸었어요.'],
        ['She smiled <b>happily</b>.', '그녀는 행복하게 웃었어요.'],
        ['You did <b>well</b>!', '잘했어!'],
        ['He studies <b>hard</b>.', '그는 열심히 공부해요.'],
        ['He <b>hardly</b> studies.', '그는 공부를 거의 안 해요. (😮 정반대!)'],
      ],
      toon: {
        title: 'hard에 ly를 붙였더니…',
        panels: [
          { bg: 'sun', narr: 'hard는 “열심히”라는 뜻의 성실한 부사예요.',
            cast: [{ w: 'He', c: 'blue', m: 'happy' }, { w: 'studies', c: 'green', m: 'normal' }, { w: 'hard', c: 'red', m: 'cool', say: '열심히! 열심히!' }, { e: '📚' }],
            line: { t: 'He studies hard. (열심히 공부한다)', ok: true } },
          { bg: 'lav', narr: '“부사니까 ly를 붙이면 더 부사다워지겠지?” 하고 ly가 붙었는데…', fx: '펑!',
            cast: [{ w: 'hard', c: 'red', m: 'surprised' }, { w: '+ ly', c: 'yellow', m: 'smug', st: 'small' }, { arrow: '➜' }, { w: 'hardly', c: 'gray', m: 'dizzy', say: '어…? 나 갑자기 게을러졌어…' }] },
          { bg: 'night', narr: 'hardly는 “<b>거의 ~않다</b>”라는 전혀 다른 뜻이 되었어요!',
            cast: [{ w: 'He', c: 'blue', m: 'normal' }, { w: 'hardly', c: 'gray', m: 'dizzy' }, { w: 'studies', c: 'green', m: 'sad' }, { e: '💤' }],
            line: 'He hardly studies. (공부를 거의 안 한다)' },
        ],
      },
    },
    {
      id: 'frequency', title: '빈도부사와 자리', en: 'always, usually, often …',
      html: `
        <p>“얼마나 자주” 하는지를 알려 주는 부사예요.</p>
        ${H.table(['빈도부사', '뜻', '느낌'], [
          [en('always'), '항상', '100% 🟩🟩🟩🟩🟩'],
          [en('usually'), '보통, 대개', '80% 🟩🟩🟩🟩⬜'],
          [en('often'), '자주', '60% 🟩🟩🟩⬜⬜'],
          [en('sometimes'), '가끔', '40% 🟩🟩⬜⬜⬜'],
          [en('rarely / seldom'), '거의 ~않는', '10% 🟩⬜⬜⬜⬜'],
          [en('never'), '절대 ~않는', '0% ⬜⬜⬜⬜⬜'],
        ])}
        <p><b>빈도부사의 자리 규칙</b> — “<span class="mark">be동사·조동사 뒤, 일반동사 앞</span>”</p>
        ${H.table(['문장', '자리', '예'], [
          ['be동사', 'be동사 <b>뒤</b>', en('She <b>is always</b> kind.')],
          ['조동사', '조동사 <b>뒤</b>', en('I <b>will never</b> forget you.')],
          ['일반동사', '일반동사 <b>앞</b>', en('He <b>always gets</b> up early.')],
        ])}
      `,
      examples: [
        ['I <b>usually</b> walk to school.', '나는 보통 학교에 걸어가요.'],
        ['My dad is <b>often</b> busy.', '우리 아빠는 자주 바쁘세요.'],
        ['We <b>sometimes</b> eat out on Fridays.', '우리는 금요일에 가끔 외식해요.'],
        ['You should <b>never</b> lie.', '절대 거짓말하면 안 돼요.'],
      ],
      toon: {
        title: 'always의 자리 찾기',
        panels: [
          { bg: 'sky', narr: 'always가 문장 안에서 앉을 자리를 찾고 있어요.',
            cast: [{ w: 'always', c: 'yellow', m: 'surprised', say: '나 어디 앉아야 해?' }, { w: 'She', c: 'pink', m: 'happy' }, { w: 'is', c: 'teal', m: 'happy' }, { w: 'kind', c: 'green', m: 'happy' }] },
          { bg: 'mint', narr: 'be동사 문장에서는 be동사 <b>뒤</b>!',
            cast: [{ w: 'She', c: 'pink', m: 'happy' }, { w: 'is', c: 'teal', m: 'cool', say: '내 뒤로 와!' }, { w: 'always', c: 'yellow', m: 'happy' }, { w: 'kind', c: 'green', m: 'happy' }],
            line: { t: 'She is <u>always</u> kind.', ok: true } },
          { bg: 'sun', narr: '일반동사 문장에서는 동사 <b>앞</b>!',
            cast: [{ w: 'He', c: 'blue', m: 'happy' }, { w: 'always', c: 'yellow', m: 'happy' }, { w: 'gets up', c: 'orange', m: 'cool', say: '내 앞에서 꾸며 줘!' }, { e: '⏰' }],
            line: { t: 'He <u>always</u> gets up early.', ok: true } },
          { bg: 'lav', narr: '외우는 주문: “<b>비(be)조 뒤, 일 앞!</b>”',
            cast: [{ w: 'be / 조동사', c: 'teal', m: 'cool', say: '우리 뒤!' }, { w: '일반동사', c: 'orange', m: 'cool', say: '내 앞!' }] },
        ],
      },
    },
    {
      id: 'order', title: '부사의 위치와 순서', en: 'Place before time',
      html: `
        <ul>
          <li>“어떻게”를 말하는 부사는 보통 <b>동사(+목적어) 뒤</b>: ${en('She opened the door <b>quietly</b>.')}</li>
          <li>장소와 시간이 함께 오면 <b>장소 → 시간</b> 순서: ${en('I went <b>to the park yesterday</b>.')}</li>
          <li>형용사·부사를 꾸밀 때는 <b>바로 앞</b>: ${en('<b>very</b> big, <b>so</b> fast')}</li>
        </ul>
        ${H.box('warn', `${en('enough')}(충분히)는 형용사·부사 <b>뒤</b>에 와요. ${en('He is old <b>enough</b> to drive.')} / <span class="strike en">enough old</span>`)}
        ${H.table(['비슷한 부사', '쓰임', '예'], [
          [en('very'), '아주 (보통 강조)', en('It is very hot.')],
          [en('too'), '너무 (좋지 않은 느낌)', en('It is too hot to play outside.')],
          [en('too'), '(긍정문) ~도 역시', en('I like it, too.')],
          [en('either'), '(부정문) ~도 역시', en('I don’t like it, either.')],
        ])}
      `,
      examples: [
        ['We will meet <b>at the station at 3</b>.', '우리는 3시에 역에서 만날 거예요.'],
        ['This box is <b>too</b> heavy for me.', '이 상자는 나한테 너무 무거워요.'],
        ['I’m not hungry. — I’m not hungry, <b>either</b>.', '나 배 안 고파. — 나도 안 고파.'],
      ],
    },
  ],
  quiz: [
    ['부사로 바꾸세요: <span class="en">quiet, easy, good, gentle</span>', '<span class="en">quietly, easily, well, gently</span>'],
    ['알맞은 자리에 <span class="en">often</span>을 넣으세요: <span class="en">I ( ) play ( ) games.</span>', '<span class="en">I <b>often</b> play games.</span> — 일반동사 앞.'],
    ['알맞은 것: <span class="en">She is (never / never is) late.</span>', '<span class="en">She is never late.</span> — be동사 뒤.'],
    ['뜻이 다른 이유는? <span class="en">He works hard. / He hardly works.</span>', 'hard = 열심히, hardly = 거의 ~않다. 첫 문장은 “열심히 일한다”, 두 번째는 “거의 일을 안 한다”.'],
  ],
});
})();
