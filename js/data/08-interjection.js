(function () {
const en = s => `<span class="en">${s}</span>`;

GRAMMAR.push({
  id: 'interjection', name: '감탄사', en: 'Interjection', icon: '😲', color: '#e5484d',
  intro: '감탄사는 기쁘거나, 놀라거나, 아플 때 <b>저절로 튀어나오는 소리</b>예요. “와! 아야! 앗! 휴~” 같은 말이죠. 문장 속 다른 단어와 문법적으로 연결되지 않고 <b>혼자 툭</b> 튀어나와요.',
  sections: [
    {
      id: 'what', title: '감정별 감탄사', en: 'Wow! Oops! Ouch!',
      html: `
        ${H.table(['감탄사', '언제 쓸까?', '예'], [
          [en('Wow!'), '놀랍고 멋질 때 😮', en('Wow! That’s amazing!')],
          [en('Yay! / Hooray!'), '신나고 기쁠 때 🎉', en('Yay! We won!')],
          [en('Oh!'), '알게 되었거나 놀랐을 때', en('Oh, I see.')],
          [en('Oops!'), '실수했을 때 😅', en('Oops! I dropped my spoon.')],
          [en('Ouch!'), '아플 때 🤕', en('Ouch! That hurts!')],
          [en('Phew!'), '휴, 안심될 때 😮‍💨', en('Phew! I made it on time.')],
          [en('Hmm…'), '생각 중일 때 🤔', en('Hmm… let me think.')],
          [en('Yuck! / Ew!'), '더럽거나 맛없을 때 🤢', en('Yuck! This milk is sour.')],
          [en('Yum! / Yummy!'), '맛있을 때 😋', en('Yummy! I love this cake.')],
          [en('Shh!'), '조용히 하라고 할 때 🤫', en('Shh! The baby is sleeping.')],
          [en('Uh-oh!'), '뭔가 잘못됐을 때 😬', en('Uh-oh. I forgot my homework.')],
          [en('Oh no!'), '안 좋은 일이 생겼을 때 😱', en('Oh no! It’s raining!')],
        ])}
        ${H.box('tip', `감탄사 뒤에는 느낌표(!)나 쉼표(,)를 찍어요. 강한 감정이면 ${en('!')}, 약한 감정이면 ${en(',')}<br>${en('Wow! / Oh, really?')}`)}
      `,
      examples: [
        ['<b>Wow!</b> Look at the rainbow!', '와! 무지개 좀 봐!'],
        ['<b>Oops!</b> I’m sorry. I stepped on your foot.', '앗! 미안해. 네 발을 밟았어.'],
        ['<b>Ouch!</b> A bee stung me!', '아야! 벌이 쐈어!'],
        ['<b>Phew!</b> The test is finally over.', '휴! 드디어 시험이 끝났다.'],
      ],
    },
    {
      id: 'daily', title: '인사·대답에 쓰는 감탄사', en: 'Hi! Yes! Okay!',
      html: H.table(['말', '뜻'], [
        [en('Hi! / Hello!'), '안녕! (만날 때)'],
        [en('Bye!'), '잘 가! (헤어질 때)'],
        [en('Yes! / Yeah!'), '응! 그래!'],
        [en('No!'), '아니!'],
        [en('Okay! / OK!'), '좋아! 알았어!'],
        [en('Well, …'), '음, 글쎄… (말을 시작할 때)'],
        [en('Please!'), '제발! 부탁해!'],
      ]),
      examples: [
        ['<b>Well</b>, I’m not sure.', '음, 잘 모르겠어.'],
        ['<b>Okay</b>, let’s go!', '좋아, 가자!'],
      ],
    },
    {
      id: 'exclamatory', title: '감탄문 만들기: What vs How', en: 'What a … ! / How … !',
      html: `
        <p>“정말 ~하구나!” 하고 감탄하는 문장을 <b>감탄문</b>이라고 해요. 두 가지 모양이 있어요.</p>
        ${H.formula('*What', '+', 'a(n)', '+', '형용사', '+', '*명사', '+', '(주어 + 동사)!')}
        ${H.formula('*How', '+', '*형용사 / 부사', '+', '(주어 + 동사)!')}
        ${H.table(['평범한 문장', 'What 감탄문', 'How 감탄문'], [
          [en('It is a very big dog.'), en('<b>What a big dog</b> (it is)!'), en('<b>How big</b> the dog is!')],
          [en('She is a very kind girl.'), en('<b>What a kind girl</b> (she is)!'), en('<b>How kind</b> she is!')],
          [en('They are very cute puppies.'), en('<b>What cute puppies</b> (they are)!'), en('<b>How cute</b> they are!')],
          [en('He runs very fast.'), '— (명사가 없어서 ✕)', en('<b>How fast</b> he runs!')],
        ])}
        ${H.box('memo', '<b>명사가 있으면 What</b>, <b>형용사·부사만 있으면 How</b>! 뒤의 “주어 + 동사”는 자주 생략해요.')}
        ${H.box('warn', `복수 명사나 셀 수 없는 명사 앞에는 a를 쓰지 않아요. ${en('What <b>beautiful flowers</b>!')} / ${en('What <b>nice weather</b>!')}`)}
      `,
      examples: [
        ['<b>What a beautiful</b> day!', '정말 아름다운 날이구나!'],
        ['<b>What an amazing</b> story!', '정말 놀라운 이야기구나!'],
        ['<b>How tall</b> you are!', '너 정말 키가 크구나!'],
        ['<b>How delicious</b> this cake is!', '이 케이크 정말 맛있다!'],
      ],
      toon: {
        title: 'What은 명사를 데리고 다녀요',
        panels: [
          { bg: 'sun', narr: '귀여운 강아지를 보고 감탄하려고 해요. What과 How가 서로 나서요.',
            cast: [{ w: 'What', c: 'red', m: 'happy', say: '내가 할래!' }, { w: 'How', c: 'blue', m: 'happy', say: '아니야, 내가!' }, { e: '🐶', tag: 'a cute dog' }] },
          { bg: 'sky', narr: '“a cute dog”처럼 <b>명사(dog)</b>까지 말하고 싶다면 What 차례!',
            cast: [{ w: 'What', c: 'red', m: 'cool', say: '나는 명사 친구랑 늘 같이 다녀!' }, { w: 'a cute', c: 'pink', m: 'happy', st: 'small' }, { w: 'dog', c: 'brown', m: 'love' }],
            line: { t: '<u>What</u> a cute <u>dog</u>!', ok: true } },
          { bg: 'mint', narr: '명사 없이 “cute(귀엽다)”만 말하고 싶다면 How 차례!',
            cast: [{ w: 'How', c: 'blue', m: 'cool', say: '나는 형용사만 데리고 다녀. 가볍게!' }, { w: 'cute', c: 'pink', m: 'love' }, { e: '🐶' }],
            line: { t: '<u>How cute</u> the dog is!', ok: true } },
          { bg: 'rose', narr: 'How가 명사까지 데려가려고 하면?',
            cast: [{ w: 'How', c: 'blue', m: 'dizzy', st: 'shake', say: '무, 무거워…!' }, { w: 'a cute dog', c: 'brown', m: 'surprised' }],
            line: { t: '<s>How a cute dog!</s>', ok: false } },
        ],
      },
    },
  ],
  quiz: [
    ['상황에 맞는 감탄사: 실수로 컵을 떨어뜨렸을 때', '<span class="en">Oops!</span>'],
    ['빈칸에 What 또는 How: <span class="en">( ) a smart dog!</span>', '<span class="en">What</span> — 명사(dog)가 있어요.'],
    ['빈칸에 What 또는 How: <span class="en">( ) fast you are!</span>', '<span class="en">How</span> — 형용사만 있어요.'],
    ['감탄문으로: <span class="en">This is a very big pizza.</span>', '<span class="en">What a big pizza (this is)!</span> / <span class="en">How big this pizza is!</span>'],
  ],
});
})();
