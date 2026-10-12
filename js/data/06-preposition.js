(function () {
const en = s => `<span class="en">${s}</span>`;

GRAMMAR.push({
  id: 'preposition', name: '전치사', en: 'Preposition', icon: '📦', color: '#7a4fd6',
  intro: '전치사는 명사 <b>앞(前)</b>에 <b>놓이는(置)</b> 말이에요. “상자 <b>안에</b>, 월요일<b>에</b>, 친구<b>와 함께</b>”처럼 위치·시간·방향·방법을 알려 줘요. 우리말 조사(~에, ~에서, ~와)와 비슷하지만 <b>명사 앞</b>에 온다는 게 달라요!',
  sections: [
    {
      id: 'what', title: '전치사의 기본 규칙', en: 'Preposition + noun',
      html: `
        ${H.formula('*전치사', '+', '명사 / 대명사(목적격) / 동명사(-ing)')}
        ${H.table(['뒤에 오는 것', '예'], [
          ['명사', en('on <b>the desk</b>, with <b>my dog</b>')],
          ['대명사 (꼭 목적격!)', en('for <b>me</b>, with <b>him</b>, between <b>us</b>')],
          ['동명사 (-ing)', en('Thank you for <b>helping</b> me.')],
        ])}
        ${H.box('warn', `전치사 뒤에 주격은 안 돼요. <span class="strike en">This is for I.</span> → ${en('This is for <b>me</b>.')}<br>전치사 뒤에 동사원형도 안 돼요. <span class="strike en">I’m good at swim.</span> → ${en('I’m good at <b>swimming</b>.')}`)}
      `,
    },
    {
      id: 'time', title: '시간의 전치사 at / on / in', en: 'at 7, on Monday, in May',
      html: `
        <p>시간의 크기에 따라 골라요. <span class="mark">작은 점 → at, 하루 → on, 긴 기간 → in</span></p>
        ${H.table(['전치사', '언제?', '예'], [
          [en('<b>at</b>') + ' 🎯', '콕 집은 <b>시각</b>, 짧은 때', en('at 7 o’clock, at noon, at night, at lunchtime')],
          [en('<b>on</b>') + ' 📅', '달력의 <b>하루</b> (요일, 날짜, 특별한 날)', en('on Monday, on May 5th, on my birthday, on Christmas Day')],
          [en('<b>in</b>') + ' 🗓️', '긴 <b>기간</b> (월, 계절, 연도, 오전/오후)', en('in May, in summer, in 2026, in the morning')],
        ])}
        ${H.box('tip', `“밤에”는 ${en('<b>at</b> night')}, “아침에”는 ${en('<b>in</b> the morning')}이에요. 하지만 특정한 날의 아침이면 하루가 되니까 ${en('<b>on</b> Sunday morning')}!`)}
        ${H.box('warn', `${en('this, next, last, every')} 앞에는 전치사를 쓰지 않아요. <span class="strike en">on next Monday</span> → ${en('next Monday')}`)}
      `,
      examples: [
        ['School starts <b>at</b> 8:30.', '학교는 8시 30분에 시작해요.'],
        ['We have P.E. class <b>on</b> Wednesday.', '우리는 수요일에 체육 수업이 있어요.'],
        ['My birthday is <b>in</b> October.', '내 생일은 10월에 있어요.'],
        ['It snows a lot <b>in</b> winter.', '겨울에 눈이 많이 와요.'],
      ],
      toon: {
        title: '시간 삼형제의 집 크기',
        panels: [
          { bg: 'sun', narr: '시간 전치사 삼형제가 살고 있어요. 막내 at은 아주 작은 집에 살아요.',
            cast: [{ w: 'at', c: 'red', m: 'happy', st: 'small', say: '나는 콕 집은 한 점! 7시, 정오, 밤!' }, { e: '⏰', tag: 'at 7:00' }] },
          { bg: 'sky', narr: '둘째 on은 하루짜리 달력 한 칸에 살아요.',
            cast: [{ w: 'on', c: 'blue', m: 'cool', say: '나는 딱 하루! 월요일, 5월 5일, 생일!' }, { e: '📅', tag: 'on Monday' }] },
          { bg: 'mint', narr: '첫째 in은 아주 큰 집에 살아요.',
            cast: [{ w: 'in', c: 'green', m: 'smug', st: 'big', say: '나는 긴 기간! 5월, 여름, 2026년 전부 내 거야.' }, { e: '🗓️', tag: 'in May' }] },
          { bg: 'lav', narr: '헷갈리면 크기를 생각해요: <b>at &lt; on &lt; in</b>',
            cast: [{ w: 'at', c: 'red', m: 'happy', st: 'small', tag: '시각' }, { w: 'on', c: 'blue', m: 'happy', tag: '하루' }, { w: 'in', c: 'green', m: 'happy', st: 'big', tag: '기간' }],
            line: 'I was born <u>at</u> 6 a.m. <u>on</u> May 3rd <u>in</u> 2016.' },
        ],
      },
    },
    {
      id: 'place', title: '장소의 전치사 at / on / in', en: 'at the door, on the wall, in the box',
      html: `
        ${H.table(['전치사', '느낌', '예'], [
          [en('<b>at</b>'), '한 <b>지점</b>, 어떤 장소에서', en('at the bus stop, at the door, at school, at home')],
          [en('<b>on</b>'), '표면에 <b>닿아</b> 붙어 있음', en('on the desk, on the wall, on the floor, on the bus')],
          [en('<b>in</b>'), '무언가의 <b>안</b>, 넓은 곳', en('in the box, in my room, in Seoul, in Korea')],
        ])}
        ${H.box('tip', `벽에 걸린 그림은 벽에 닿아 있으니까 ${en('<b>on</b> the wall')}. 천장에 붙은 파리도 ${en('<b>on</b> the ceiling')}!`)}
      `,
      examples: [
        ['Wait for me <b>at</b> the gate.', '정문에서 나를 기다려.'],
        ['There is a clock <b>on</b> the wall.', '벽에 시계가 있어요.'],
        ['My cat is sleeping <b>in</b> the basket.', '우리 고양이는 바구니 안에서 자고 있어요.'],
      ],
    },
    {
      id: 'position', title: '위치의 전치사', en: 'under, next to, between …',
      html: H.table(['전치사', '뜻', '예'], [
        [en('under'), '~ 아래에', en('The ball is <b>under</b> the chair.')],
        [en('over / above'), '~ 위에 (떨어져서)', en('A bird is flying <b>over</b> the house.')],
        [en('next to / beside'), '~ 옆에', en('Sit <b>next to</b> me.')],
        [en('in front of'), '~ 앞에', en('Let’s meet <b>in front of</b> the bank.')],
        [en('behind'), '~ 뒤에', en('The cat is hiding <b>behind</b> the sofa.')],
        [en('between A and B'), 'A와 B 사이에', en('The bakery is <b>between</b> the bank <b>and</b> the school.')],
        [en('across from'), '~ 맞은편에', en('The park is <b>across from</b> my house.')],
        [en('near'), '~ 가까이에', en('I live <b>near</b> the river.')],
      ]),
      examples: [
        ['My shoes are <b>under</b> the bed.', '내 신발은 침대 밑에 있어요.'],
        ['The post office is <b>next to</b> the library.', '우체국은 도서관 옆에 있어요.'],
      ],
    },
    {
      id: 'direction', title: '방향의 전치사', en: 'to, into, through …',
      html: H.table(['전치사', '뜻', '예'], [
        [en('to'), '~로, ~까지 (도착점)', en('I go <b>to</b> school by bus.')],
        [en('from'), '~로부터 (출발점)', en('from Seoul <b>to</b> Busan')],
        [en('into'), '~ 안으로', en('The frog jumped <b>into</b> the pond.')],
        [en('out of'), '~ 밖으로', en('He ran <b>out of</b> the room.')],
        [en('up / down'), '~ 위로 / 아래로', en('Walk <b>up</b> the stairs.')],
        [en('along'), '~을 따라', en('We walked <b>along</b> the beach.')],
        [en('across'), '~을 가로질러', en('Don’t run <b>across</b> the street.')],
        [en('through'), '~을 통과하여', en('The train went <b>through</b> the tunnel.')],
        [en('around'), '~ 주위를 빙 돌아', en('The earth moves <b>around</b> the sun.')],
      ]),
      examples: [
        ['The kids ran <b>into</b> the classroom.', '아이들이 교실 안으로 뛰어 들어갔어요.'],
        ['A cat walked <b>across</b> the road.', '고양이 한 마리가 길을 건너갔어요.'],
      ],
    },
    {
      id: 'others', title: '그 밖의 중요한 전치사', en: 'with, by, for, about …',
      html: `
        ${H.table(['전치사', '뜻', '예'], [
          [en('with'), '~와 함께, ~을 가지고', en('I play <b>with</b> my sister. / Write <b>with</b> a pencil.')],
          [en('without'), '~ 없이', en('I can’t live <b>without</b> music.')],
          [en('by'), '~을 타고 (교통), ~ 옆에, ~까지(기한)', en('<b>by</b> bus, <b>by</b> the window, <b>by</b> Friday')],
          [en('for'), '~을 위해, ~ 동안', en('This is <b>for</b> you. / <b>for</b> two hours')],
          [en('about'), '~에 대해', en('a book <b>about</b> space')],
          [en('like'), '~처럼, ~ 같은', en('He sings <b>like</b> a bird.')],
          [en('during'), '(특정 기간) 동안', en('<b>during</b> the vacation')],
        ])}
        ${H.box('tip', `${en('for')} vs ${en('during')}: ${en('for')} 뒤엔 <b>숫자 기간</b>(${en('for 3 days')}), ${en('during')} 뒤엔 <b>무슨 기간인지</b>(${en('during summer vacation')})`)}
        ${H.box('warn', `걸어서 갈 땐 ${en('by foot')}이 아니라 ${en('<b>on</b> foot')}!`)}
      `,
      examples: [
        ['I go to school <b>on foot</b>, but my dad goes to work <b>by subway</b>.', '나는 걸어서 학교에 가지만, 아빠는 지하철로 출근하세요.'],
        ['We stayed in Jeju <b>for</b> four days <b>during</b> the holidays.', '우리는 연휴 동안 제주에서 4일 머물렀어요.'],
        ['Thank you <b>for</b> the gift.', '선물 고마워.'],
      ],
    },
  ],
  quiz: [
    ['빈칸에 at / on / in: <span class="en">( ) Friday, ( ) 2025, ( ) 3 p.m., ( ) spring</span>', '<span class="en">on Friday, in 2025, at 3 p.m., in spring</span>'],
    ['틀린 곳을 고치세요: <span class="en">She sat between he and I.</span>', '전치사 뒤는 목적격 → <span class="en">between <b>him</b> and <b>me</b></span>'],
    ['빈칸: <span class="en">There is a picture ( ) the wall.</span>', '<span class="en">on</span> — 벽 표면에 붙어 있어요.'],
    ['알맞은 것: <span class="en">I slept (for / during) 10 hours.</span>', '<span class="en">for</span> — 숫자 기간.'],
  ],
});
})();
