(function () {
const en = s => `<span class="en">${s}</span>`;

GRAMMAR.push({
  id: 'conjunction', name: '접속사', en: 'Conjunction', icon: '🔗', color: '#0e9aa7',
  intro: '접속사는 단어와 단어, 문장과 문장을 <b>이어 주는 연결 고리</b>예요. “그리고, 그러나, 그래서, ~할 때, ~ 때문에” 같은 말이죠. 접속사가 있으면 짧은 문장들을 길고 멋진 문장으로 만들 수 있어요!',
  sections: [
    {
      id: 'coordinating', title: '대등하게 잇기: and, but, or, so', en: 'Coordinating',
      html: `
        <p>양쪽을 <b>똑같은 무게</b>로 이어 줘요. 단어는 단어끼리, 문장은 문장끼리!</p>
        ${H.table(['접속사', '뜻', '예'], [
          [en('and'), '그리고, ~와', en('I like pizza <b>and</b> chicken.')],
          [en('but'), '그러나, 하지만', en('It’s small, <b>but</b> it’s strong.')],
          [en('or'), '또는, 아니면', en('Do you want milk <b>or</b> juice?')],
          [en('so'), '그래서 (결과)', en('I was hungry, <b>so</b> I ate a sandwich.')],
        ])}
        ${H.box('more', `<b>명령문 + and / or</b><br>${en('Hurry up, <b>and</b> you will catch the bus.')} 서둘러, 그러면 버스를 탈 거야.<br>${en('Hurry up, <b>or</b> you will miss the bus.')} 서둘러, 그렇지 않으면 버스를 놓칠 거야.`)}
      `,
      examples: [
        ['My brother <b>and</b> I go to the same school.', '형과 나는 같은 학교에 다녀요.'],
        ['I studied hard, <b>but</b> I made some mistakes.', '열심히 공부했지만 실수를 좀 했어요.'],
        ['It was raining, <b>so</b> we stayed inside.', '비가 와서 우리는 안에 있었어요.'],
      ],
    },
    {
      id: 'correlative', title: '짝꿍 접속사', en: 'both A and B …',
      html: `
        ${H.table(['표현', '뜻', '동사의 수'], [
          [en('both A and B'), 'A와 B 둘 다', '항상 복수'],
          [en('either A or B'), 'A 또는 B 둘 중 하나', '<b>B</b>에 맞춤'],
          [en('neither A nor B'), 'A도 B도 아닌', '<b>B</b>에 맞춤'],
          [en('not A but B'), 'A가 아니라 B', '<b>B</b>에 맞춤'],
          [en('not only A but also B'), 'A뿐만 아니라 B도', '<b>B</b>에 맞춤'],
        ])}
        ${H.box('tip', '동사와 <b>가까운 쪽(B)</b>에 수를 맞춰요. 단, both A and B는 둘이니까 늘 복수!')}
      `,
      examples: [
        ['<b>Both</b> Mina <b>and</b> Jisu <b>are</b> in my class.', '미나와 지수 둘 다 우리 반이에요.'],
        ['<b>Either</b> you <b>or</b> he <b>has</b> to clean the room.', '너나 그 애 둘 중 한 명이 방을 치워야 해.'],
        ['She is <b>not only</b> smart <b>but also</b> kind.', '그녀는 똑똑할 뿐만 아니라 친절해요.'],
      ],
    },
    {
      id: 'subordinating', title: '시간·이유·조건을 붙이는 접속사', en: 'when, because, if …',
      html: `
        <p>이 접속사들은 <b>주인공 문장(주절)</b>에 <b>보조 문장(종속절)</b>을 붙여 줘요. 보조 문장은 앞에 와도 되고 뒤에 와도 돼요. 앞에 오면 쉼표(,)를 찍어요.</p>
        ${H.table(['종류', '접속사', '예'], [
          ['시간', en('when ~할 때, before ~ 전에, after ~ 후에, while ~하는 동안, until ~할 때까지'), en('<b>When</b> I was young, I lived in Ulsan.')],
          ['이유', en('because ~ 때문에, since ~이니까'), en('I’m tired <b>because</b> I ran a lot.')],
          ['조건', en('if 만약 ~라면, unless ~하지 않는다면'), en('<b>If</b> you need help, call me.')],
          ['양보', en('though / although 비록 ~지만'), en('<b>Although</b> it was cold, we swam.')],
        ])}
        ${H.box('warn', `${en('because')} 뒤엔 <b>문장</b>, ${en('because of')} 뒤엔 <b>명사</b>!<br>${en('because <b>it rained</b>')} / ${en('because of <b>the rain</b>')}`)}
        ${H.box('tip', `${en('because')}는 원인, ${en('so')}는 결과 쪽에 붙어요.<br>${en('I was sick, <b>so</b> I stayed home.')} = ${en('I stayed home <b>because</b> I was sick.')}`)}
      `,
      examples: [
        ['Wash your hands <b>before</b> you eat.', '먹기 전에 손을 씻으세요.'],
        ['<b>While</b> I was sleeping, it snowed a lot.', '내가 자는 동안 눈이 많이 왔어요.'],
        ['I like winter <b>because</b> I can make a snowman.', '나는 눈사람을 만들 수 있어서 겨울이 좋아요.'],
        ['<b>Although</b> he is small, he is very fast.', '그는 작지만 아주 빨라요.'],
      ],
    },
    {
      id: 'if-will', title: '시간·조건 부사절에서는 현재가 미래를 대신해요', en: 'If it rains tomorrow, …',
      html: `
        <p>“내일 비가 오면, 나는 집에 있을 거야.” — 내일 일이니까 ${en('will rain')}이라고 쓰고 싶죠? 하지만 <span class="mark">${en('if, when, before, after, until')} 뒤의 “때·조건” 문장에서는 미래 대신 현재형</span>을 써요.</p>
        ${H.formula('If / When', '+', '주어', '+', '*현재형', ',', '주어', '+', '*will', '+', '동사원형')}
        ${H.table(['⭕ 맞는 문장', '❌ 틀린 문장'], [
          [en('If it <b>rains</b> tomorrow, I will stay home.'), `<span class="strike en">If it will rain tomorrow, …</span>`],
          [en('When she <b>comes</b> back, we will have dinner.'), `<span class="strike en">When she will come back, …</span>`],
          [en('I will wait until you <b>finish</b>.'), `<span class="strike en">until you will finish</span>`],
        ])}
        ${H.box('more', `주인공 문장(“~할 거야” 쪽)에는 will을 그대로 써요. will이 못 들어가는 곳은 <b>if/when 쪽 문장</b>뿐이에요.`)}
      `,
      examples: [
        ['<b>If</b> you <b>finish</b> your homework, you can play games.', '숙제를 끝내면 게임을 해도 돼.'],
        ['I will call you <b>when</b> I <b>get</b> home.', '집에 도착하면 전화할게.'],
        ['<b>If</b> it <b>is</b> sunny tomorrow, we will go hiking.', '내일 날씨가 맑으면 우리는 등산을 갈 거예요.'],
      ],
      toon: {
        title: 'if 집에는 will이 못 들어가요',
        panels: [
          { bg: 'sky', narr: '내일 비가 오면 집에 있을 거예요. 미래 담당 will이 신나게 달려왔어요.',
            cast: [{ w: 'will', c: 'purple', m: 'happy', say: '내일 일이지? 그럼 내가 다 맡을게!' }, { w: 'If', c: 'yellow', m: 'normal', st: 'big', hat: '🏠' }] },
          { bg: 'rose', narr: 'If의 집 문 앞에서…', fx: '멈춰!',
            cast: [{ w: 'If', c: 'yellow', m: 'angry', st: 'big', hat: '🏠', say: '여긴 “조건”의 집이야. 미래 will은 출입 금지!' }, { w: 'will', c: 'purple', m: 'surprised', say: '왜?!' }],
            line: { t: 'If it <s>will rain</s> tomorrow, …', ok: false } },
          { bg: 'lav', narr: 'If 집에서는 <b>현재형</b>이 미래 역할까지 해요. 뒤에 tomorrow가 있어서 미래인 걸 다 알거든요.',
            cast: [{ w: 'If', c: 'yellow', m: 'happy', hat: '🏠' }, { w: 'it', c: 'gray', m: 'happy', st: 'small' }, { w: 'rains', c: 'blue', m: 'cool', say: '현재형인 내가 대신할게!' }, { w: 'tomorrow', c: 'orange', m: 'happy', st: 'small' }] },
          { bg: 'mint', narr: 'will은 쉼표 건너편, <b>주인공 문장</b>에서 활약해요!',
            cast: [{ w: 'I', c: 'orange', m: 'happy' }, { w: 'will', c: 'purple', m: 'love', say: '나는 여기서 일하면 되는구나!' }, { w: 'stay', c: 'green', m: 'happy' }, { e: '🏠' }],
            line: { t: 'If it <u>rains</u> tomorrow, I <u>will</u> stay home.', ok: true } },
        ],
      },
    },
    {
      id: 'that', title: '문장을 통째로 담는 that', en: 'I think that …',
      html: `
        <p>${en('that')}은 “<b>~라는 것</b>”이라는 뜻으로 문장 하나를 통째로 담아서 명사처럼 써요. 이때 ${en('that')}은 자주 생략해요.</p>
        ${H.formula('I think / know / hope / believe', '+', '*(that)', '+', '주어 + 동사')}
      `,
      examples: [
        ['I think <b>(that)</b> you are right.', '나는 네가 옳다고 생각해.'],
        ['I hope <b>(that)</b> you feel better soon.', '네가 빨리 나으면 좋겠어.'],
        ['Did you know <b>(that)</b> octopuses have three hearts?', '문어는 심장이 세 개라는 거 알았어?'],
      ],
    },
  ],
  quiz: [
    ['빈칸에 and / but / or / so: <span class="en">I was tired, ( ) I went to bed early.</span>', '<span class="en">so</span> — 결과.'],
    ['알맞은 것: <span class="en">I couldn’t sleep (because / because of) the noise.</span>', '<span class="en">because of</span> — 뒤에 명사(the noise).'],
    ['틀린 곳을 고치세요: <span class="en">If you will come, I will be happy.</span>', '<span class="en">If you <b>come</b>, I will be happy.</span> — 조건절은 현재형.'],
    ['알맞은 것: <span class="en">Neither Tom nor I (am / is) hungry.</span>', '<span class="en">am</span> — 가까운 I에 맞춰요.'],
  ],
});
})();
