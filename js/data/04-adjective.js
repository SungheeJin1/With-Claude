(function () {
const en = s => `<span class="en">${s}</span>`;

GRAMMAR.push({
  id: 'adjective', name: '형용사', en: 'Adjective', icon: '🎨', color: '#1f9d67',
  intro: '형용사는 명사를 <b>꾸며 주는 화장품</b>이에요. “빨간 사과, 큰 강아지, 행복한 아이”처럼 명사의 색깔·크기·모양·기분을 알려 줘요.',
  sections: [
    {
      id: 'what', title: '형용사란?', en: 'What is an adjective?',
      html: `
        <p>그냥 “사과”보다 “<b>빨갛고 달콤한</b> 사과”가 더 생생하죠? 이렇게 명사에 대해 <span class="mark">어떤지</span>를 알려 주는 말이 형용사예요.</p>
        ${H.table(['종류', '예'], [
          ['색깔', en('red, blue, yellow, black, white')],
          ['크기·길이', en('big, small, tall, short, long')],
          ['모양', en('round, square, flat')],
          ['기분·성격', en('happy, sad, angry, kind, brave, shy')],
          ['상태·느낌', en('hot, cold, new, old, clean, dirty, soft')],
          ['맛', en('sweet, salty, sour, spicy, delicious')],
          ['날씨', en('sunny, rainy, cloudy, windy, snowy')],
        ])}
      `,
      examples: [
        ['I have a <b>small</b>, <b>fluffy</b> puppy.', '나는 작고 복슬복슬한 강아지가 있어요.'],
        ['This soup is too <b>salty</b>.', '이 수프는 너무 짜요.'],
        ['My teacher is <b>kind</b> and <b>funny</b>.', '우리 선생님은 친절하고 재미있으세요.'],
      ],
    },
    {
      id: 'position', title: '형용사의 두 자리', en: 'Before a noun / After be',
      html: `
        <p>형용사는 두 군데에 앉을 수 있어요.</p>
        ${H.table(['자리', '역할', '예'], [
          ['① 명사 <b>앞</b>', '명사를 직접 꾸며요 (한정적 용법)', en('a <b>red</b> apple, a <b>tall</b> boy')],
          ['② be동사·감각동사 <b>뒤</b>', '주어가 어떤지 설명해요 (서술적 용법)', en('The apple is <b>red</b>. The boy is <b>tall</b>.')],
        ])}
        ${H.box('tip', `${en('look(~해 보이다), sound(~하게 들리다), smell(~한 냄새가 나다), taste(~한 맛이 나다), feel(~하게 느끼다)')} 같은 <b>감각동사</b> 뒤에는 부사가 아니라 <b>형용사</b>가 와요.<br>${en('You look <b>happy</b>.')} ⭕ / <span class="strike en">You look happily.</span>`)}
        <p><b>특별 규칙!</b> ${en('-thing, -one, -body')}로 끝나는 말(${en('something, anything, nothing, someone')})은 형용사가 <span class="mark">뒤에서</span> 꾸며요.</p>
      `,
      examples: [
        ['It’s a <b>beautiful</b> day!', '아름다운 날이에요!'],
        ['The pizza smells <b>great</b>.', '피자 냄새가 정말 좋아요.'],
        ['I want something <b>cold</b> to drink.', '나는 차가운 마실 것을 원해요.'],
        ['Is there anything <b>interesting</b> on TV?', 'TV에서 뭐 재미있는 거 해?'],
      ],
      toon: {
        title: '-thing은 앞자리를 안 비켜 줘요',
        panels: [
          { bg: 'sun', narr: '형용사 cold는 늘 명사 앞에 서서 꾸며 줘요.',
            cast: [{ w: 'cold', c: 'blue', m: 'happy', say: '내가 앞에서 꾸며 줄게!' }, { w: 'water', c: 'teal', m: 'happy' }],
            line: { t: '<u>cold</u> water', ok: true } },
          { bg: 'rose', narr: '그런데 something 앞에 서려고 하자…',
            cast: [{ w: 'cold', c: 'blue', m: 'surprised' }, { w: 'something', c: 'purple', m: 'angry', st: 'big', say: '내 앞은 안 돼! 나는 -thing 가문이라고. 꾸미려면 뒤로 와!' }],
            line: { t: '<s>cold something</s>', ok: false } },
          { bg: 'mint', narr: 'cold가 뒤로 쪼르르 이동했어요.', fx: '쪼르르',
            cast: [{ w: 'something', c: 'purple', m: 'cool', st: 'big' }, { w: 'cold', c: 'blue', m: 'happy', say: '뒤에서 꾸며도 괜찮네!' }],
            line: { t: 'I want something <u>cold</u>.', ok: true } },
        ],
      },
    },
    {
      id: 'order', title: '형용사가 여러 개일 때 순서', en: 'Order of adjectives',
      html: `
        <p>형용사 여러 개가 한 명사를 꾸밀 땐 대체로 정해진 순서가 있어요. 원어민은 순서가 바뀌면 어색하게 느껴요.</p>
        ${H.formula('수량', '→', '*의견', '→', '크기', '→', '나이·새것', '→', '모양', '→', '*색깔', '→', '재료', '→', '명사')}
        ${H.table(['예', '뜻'], [
          [en('two <b>cute little</b> puppies'), '귀여운 작은 강아지 두 마리 (수량 → 의견 → 크기)'],
          [en('a <b>big old</b> house'), '크고 오래된 집 (크기 → 나이)'],
          [en('a <b>beautiful red</b> dress'), '예쁜 빨간 드레스 (의견 → 색깔)'],
          [en('a <b>small wooden</b> box'), '작은 나무 상자 (크기 → 재료)'],
        ])}
        ${H.box('tip', '외우기 팁: “<b>몇 개? → 내 생각은? → 크기 → 나이 → 모양 → 색 → 뭘로 만들었어?</b>” 순서로 질문해 보세요.')}
      `,
      examples: [
        ['She has <b>long black</b> hair.', '그녀는 길고 검은 머리를 가졌어요.'],
        ['I bought <b>three nice blue</b> pencils.', '나는 멋진 파란 연필 세 자루를 샀어요.'],
      ],
    },
    {
      id: 'quantity', title: '수량 형용사: many, much, a few, a little', en: 'How many? How much?',
      html: `
        ${H.table(['', '셀 수 있는 명사 (복수)', '셀 수 없는 명사', '뜻'], [
          ['많은', en('<b>many</b> books'), en('<b>much</b> water'), '많은'],
          ['둘 다 OK', en('<b>a lot of / lots of</b> books'), en('<b>a lot of / lots of</b> water'), '많은'],
          ['조금 있는', en('<b>a few</b> books'), en('<b>a little</b> water'), '조금 있다 (긍정 😊)'],
          ['거의 없는', en('<b>few</b> books'), en('<b>little</b> water'), '거의 없다 (부정 😢)'],
          ['약간', en('<b>some / any</b> books'), en('<b>some / any</b> water'), '약간의'],
        ])}
        ${H.box('memo', '<b>a</b>가 있으면 “조금 <b>있네</b>!” 😊, <b>a</b>가 없으면 “거의 <b>없네</b>…” 😢')}
      `,
      examples: [
        ['There are <b>many</b> stars in the sky.', '하늘에 별이 많아요.'],
        ['I don’t have <b>much</b> time.', '나는 시간이 많지 않아요.'],
        ['I have <b>a few</b> friends in this town.', '나는 이 동네에 친구가 몇 명 있어요.'],
        ['There is <b>little</b> milk in the fridge.', '냉장고에 우유가 거의 없어요.'],
      ],
      toon: {
        title: 'a 하나 차이로 기분이 달라져요',
        panels: [
          { bg: 'sun', narr: '쿠키 상자를 열어 봤어요. 쿠키가 세 개 남았어요!',
            cast: [{ w: 'a few', c: 'yellow', m: 'love', say: '와! 몇 개 남았다! 아직 있어!' }, { e: '🍪🍪🍪', tag: 'cookies' }],
            line: { t: 'There are <u>a few</u> cookies. (조금 있다 😊)', ok: true } },
          { bg: 'night', narr: '똑같이 세 개인데, a를 떼면…',
            cast: [{ w: 'few', c: 'gray', m: 'cry', say: '겨우 그것밖에 없어…? 거의 없잖아…' }, { e: '🍪🍪🍪', tag: 'cookies' }],
            line: { t: 'There are <u>few</u> cookies. (거의 없다 😢)', ok: true } },
          { bg: 'lav', narr: 'a는 긍정 에너지! 물 같은 셀 수 없는 명사는 a little / little로 똑같이 써요.',
            cast: [{ w: 'a', c: 'yellow', m: 'cool', st: 'small', say: '내가 붙으면 “있다”!' }, { w: 'little', c: 'blue', m: 'happy' }, { e: '🥛' }],
            line: 'a little milk 😊 / little milk 😢' },
        ],
      },
    },
    {
      id: 'compare', title: '비교급과 최상급', en: 'bigger / biggest',
      html: `
        <p>둘을 비교하면 <b>비교급</b>(더 ~한), 셋 이상 중 최고를 뽑으면 <b>최상급</b>(가장 ~한)!</p>
        ${H.formula('A', '+', 'be', '+', '*비교급', '+', 'than', '+', 'B')}
        ${H.formula('A', '+', 'be', '+', '*the 최상급', '+', 'in/of ~')}
        ${H.table(['규칙', '원급', '비교급', '최상급'], [
          ['대부분 +er / +est', en('tall'), en('taller'), en('tallest')],
          ['-e로 끝나면 +r / +st', en('large'), en('larger'), en('largest')],
          ['자음+y → i', en('happy'), en('happier'), en('happiest')],
          ['단모음+단자음 → 자음 하나 더', en('big'), en('bigger'), en('biggest')],
          ['긴 단어(3음절 이상 등)', en('beautiful'), en('<b>more</b> beautiful'), en('<b>most</b> beautiful')],
          ['불규칙', en('good / well'), en('better'), en('best')],
          ['불규칙', en('bad'), en('worse'), en('worst')],
          ['불규칙', en('many / much'), en('more'), en('most')],
          ['불규칙', en('little'), en('less'), en('least')],
        ])}
        ${H.box('tip', `<b>원급 비교</b>: “~만큼 …한”은 ${en('as + 원급 + as')}<br>${en('I am <b>as tall as</b> my mom.')} 나는 엄마만큼 키가 커요.<br>${en('I am <b>not as tall as</b> my dad.')} 나는 아빠만큼 크지 않아요.`)}
        ${H.box('more', `비교급을 강조할 땐 ${en('much, even, far, a lot')}: ${en('much bigger')} (훨씬 더 큰). ${en('very bigger')}는 ✕!`)}
      `,
      examples: [
        ['An elephant is <b>bigger than</b> a horse.', '코끼리는 말보다 더 커요.'],
        ['This book is <b>more interesting than</b> that one.', '이 책이 저 책보다 더 재미있어요.'],
        ['Mt. Everest is <b>the highest</b> mountain <b>in</b> the world.', '에베레스트산은 세상에서 가장 높은 산이에요.'],
        ['She is <b>the best</b> singer <b>of</b> us all.', '그녀는 우리 모두 중에서 노래를 제일 잘해요.'],
        ['My cold is <b>worse</b> today.', '오늘은 감기가 더 심해요.'],
      ],
    },
    {
      id: 'ing-ed', title: '감정 형용사 -ing vs -ed', en: 'boring vs bored',
      html: `
        <p>감정을 나타내는 형용사는 두 가지 모양이 있어요.</p>
        ${H.table(['', '-ing', '-ed'], [
          ['뜻', '감정을 <b>일으키는</b> (원인)', '감정을 <b>느끼는</b> (사람)'],
          ['예', en('The movie is <b>boring</b>.') + '<br>영화가 지루하다.', en('I am <b>bored</b>.') + '<br>나는 지루하다.'],
          ['더 보기', en('exciting, interesting, surprising, tiring'), en('excited, interested, surprised, tired')],
        ])}
        ${H.box('warn', `<span class="strike en">I am boring.</span>이라고 하면 “나는 (남을 지루하게 만드는) 지루한 사람이야”라는 뜻이 돼요! 😅`)}
      `,
      examples: [
        ['The roller coaster was so <b>exciting</b>!', '롤러코스터는 정말 신났어요!'],
        ['We were so <b>excited</b> about the trip.', '우리는 여행 때문에 너무 신났어요.'],
        ['I was <b>surprised</b> at the <b>surprising</b> news.', '나는 놀라운 소식에 놀랐어요.'],
      ],
      toon: {
        title: '지루하게 “만드는” 쪽 vs 지루함을 “느끼는” 쪽',
        panels: [
          { bg: 'night', narr: '아주 재미없는 영화를 보고 있어요.',
            cast: [{ e: '🎬', tag: 'the movie', say: '나는 boring! 남을 지루하게 만드는 쪽이지.' }, { w: 'I', c: 'orange', m: 'dizzy', say: '하암… 나는 bored. 지루함을 느끼는 쪽!' }],
            line: 'The movie is boring. I am bored.' },
          { bg: 'rose', narr: '그런데 I가 실수로 이렇게 말했어요.',
            cast: [{ w: 'I', c: 'orange', m: 'normal', say: 'I am boring.' }, { w: 'friend', c: 'green', m: 'surprised', say: '헉, 너 스스로 지루한 사람이라고?!' }],
            line: { t: '<s>I am boring.</s>', ok: false } },
          { bg: 'mint', narr: '사람이 감정을 느낄 땐 <b>-ed</b>!',
            cast: [{ w: 'I', c: 'orange', m: 'happy' }, { w: 'am', c: 'teal', m: 'normal', st: 'small' }, { w: 'bored', c: 'gray', m: 'smug' }],
            line: { t: 'I am bor<u>ed</u>.', ok: true } },
        ],
      },
    },
  ],
  quiz: [
    ['알맞은 것을 고르세요: <span class="en">This soup tastes (good / well).</span>', '<span class="en">good</span> — 감각동사 뒤는 형용사.'],
    ['어순을 바르게: <span class="en">I want (new something / something new).</span>', '<span class="en">something new</span>'],
    ['비교급을 쓰세요: <span class="en">hot, easy, good, famous</span>', '<span class="en">hotter, easier, better, more famous</span>'],
    ['알맞은 것: <span class="en">There is (a little / a few) juice left.</span>', '<span class="en">a little</span> — juice는 셀 수 없어요.'],
    ['알맞은 것: <span class="en">I’m (interesting / interested) in robots.</span>', '<span class="en">interested</span> — 내가 관심을 느끼는 거예요.'],
  ],
});
})();
