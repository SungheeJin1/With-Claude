/* 품사별 “확인 퀴즈”
   { ox: true|false, q, exp }            → O / X 버튼으로 답해요
   { word: [정답들], q, exp }             → 단어·짧은 말을 타이핑 (대소문자·문장부호 무시, 빈칸 여러 개는 쉼표로)
   { sentence: [정답들], q, exp }         → 문장 전체를 타이핑 (대문자·문장부호까지 채점) */
(function () {
const en = s => `<span class="en">${s}</span>`;

const QUIZ = {
  noun: [
    { word: ['an, an, a'], q: `빈칸에 a 또는 an을 순서대로 쓰세요: ${en('( ) orange, ( ) hour, ( ) uniform')}`, exp: '철자가 아니라 첫 <b>소리</b>로 정해요. hour는 h 소리가 안 나고, uniform은 “유” 소리예요.' },
    { word: ['babies, knives, children, boxes, boys'], q: `복수형으로 바꿔 순서대로 쓰세요: ${en('baby, knife, child, box, boy')}`, exp: '자음+y → ies, f(e) → ves, child → children(불규칙), x → es, 모음+y → s' },
    { sentence: ['I want two pieces of bread.', 'I want two slices of bread.', 'I want two loaves of bread.'], q: `틀린 곳을 고쳐 문장 전체를 쓰세요: ${en('I want two breads.')}`, exp: 'bread는 셀 수 없어서 단위(piece, slice, loaf)를 빌려 세요.' },
    { word: ['the'], q: `빈칸에 알맞은 말: ${en('Look at ( ) sky!')}`, exp: '하늘은 세상에 하나뿐이라 the를 써요.' },
    { ox: false, q: `${en('homework')}는 셀 수 있는 명사라서 ${en('homeworks')}라고 쓸 수 있다.`, exp: 'homework는 셀 수 없는 명사예요. “숙제가 많다”는 a lot of homework.' },
    { ox: true, q: `${en('an hour')}처럼 a와 an은 철자가 아니라 첫 소리로 정한다.`, exp: 'h가 소리 나지 않아서 “아워”로 시작하니까 an이에요.' },
  ],
  pronoun: [
    { word: ['my, mine'], q: `( )에 my 또는 mine을 순서대로 쓰세요: ${en('This is ( ) bike. The bike is ( ).')}`, exp: '명사 앞엔 소유격(소유형용사) my, 혼자 쓸 땐 소유대명사 mine.' },
    { sentence: ['My dad loves me.'], q: `틀린 곳을 고쳐 문장 전체를 쓰세요: ${en('My dad loves I.')}`, exp: '동사 뒤(목적어 자리)는 목적격 me.' },
    { word: ['it'], q: `빈칸: ${en('( ) is snowing outside.')}`, exp: '날씨를 말할 때 쓰는 비인칭 주어 it.' },
    { word: ['himself'], q: `빈칸: ${en('He cut ( ) with a knife.')} (그는 칼에 베였다)`, exp: '주어와 목적어가 같은 사람이라 재귀대명사.' },
    { sentence: ['I have an uncle who lives in Canada.', 'I have an uncle that lives in Canada.'], q: `관계대명사로 이어 한 문장으로 쓰세요: ${en('I have an uncle. He lives in Canada.')}`, exp: '선행사가 사람(an uncle)이고 주격이라 who(또는 that).' },
    { word: ['which', 'that'], q: `빈칸: ${en('This is the bag ( ) my mom bought.')}`, exp: '선행사가 물건이고 목적격이라 which 또는 that. 생략해도 돼요.' },
    { sentence: ['I visited Seoul, which is a big city.'], q: `틀린 곳을 고쳐 문장 전체를 쓰세요: ${en('I visited Seoul, that is a big city.')}`, exp: '쉼표 뒤(계속적 용법)에는 that을 쓸 수 없어요.' },
    { ox: true, q: `${en('She smiled at me, which made me happy.')}에서 which는 앞 문장 전체를 받는다.`, exp: '“그녀가 나에게 웃어 준 일”이 나를 행복하게 했어요.' },
    { word: ['what'], q: `빈칸에 What 또는 That: ${en('( ) I need is sleep.')}`, exp: '앞에 선행사가 없고 “~하는 것”이라는 뜻이라 What.' },
    { ox: false, q: `${en('This cap is mine.')}에서 This는 지시대명사이다.`, exp: '뒤에 명사 cap이 있으니까 지시<b>형용사</b>예요. 혼자 쓰인 This is mine.의 This가 지시대명사.' },
  ],
  adjective: [
    { word: ['good'], q: `good 또는 well: ${en('This soup tastes ( ).')}`, exp: 'taste 같은 감각동사 뒤에는 형용사 good.' },
    { word: ['something new'], q: `알맞은 순서로 쓰세요: ${en('I want ( ).')} (new something / something new)`, exp: '-thing은 형용사가 뒤에서 꾸며요.' },
    { word: ['hotter, easier, better, more famous'], q: `비교급으로 바꿔 순서대로 쓰세요: ${en('hot, easy, good, famous')}`, exp: '자음 하나 더 + er, y → ier, 불규칙 better, 긴 단어는 more.' },
    { sentence: ['This box is three times as heavy as that one.'], q: `우리말에 맞게 문장 전체를 쓰세요: “이 상자는 저 상자보다 세 배 무겁다.” (${en('as ~ as')}를 써서)`, exp: '배수(three times)는 첫 번째 as 앞에 와요.' },
    { word: ['a little'], q: `a little 또는 a few: ${en('There is ( ) juice left.')}`, exp: 'juice는 셀 수 없어서 a little.' },
    { word: ['interested'], q: `interesting 또는 interested: ${en('I’m ( ) in robots.')}`, exp: '내가 관심을 <b>느끼는</b> 거라서 -ed.' },
    { ox: false, q: `${en('I am boring.')}은 “나는 지루함을 느낀다”라는 뜻이다.`, exp: '“나는 (남을 지루하게 만드는) 지루한 사람이다”라는 뜻이 돼요. 지루함을 느낄 땐 I am bored.' },
  ],
  adverb: [
    { word: ['quietly, easily, well, gently'], q: `부사로 바꿔 순서대로 쓰세요: ${en('quiet, easy, good, gentle')}`, exp: 'y → ily, good → well(불규칙), -le → -ly' },
    { word: ['when'], q: `where 또는 when: ${en('I can’t forget the day ( ) I won the race.')}`, exp: '선행사가 시간(the day)이라 when.' },
    { sentence: ['I often play games.'], q: `often을 알맞은 자리에 넣어 문장 전체를 쓰세요: ${en('I play games.')}`, exp: '빈도부사는 일반동사 앞.' },
    { sentence: ['She is never late.'], q: `never를 알맞은 자리에 넣어 문장 전체를 쓰세요: ${en('She is late.')}`, exp: '빈도부사는 be동사 뒤.' },
    { ox: false, q: `${en('He hardly works.')}는 “그는 열심히 일한다”라는 뜻이다.`, exp: 'hardly는 “거의 ~않다”예요. 그는 거의 일을 안 한다.' },
    { ox: true, q: `${en('friendly')}는 -ly로 끝나지만 형용사이다.`, exp: 'friendly(친절한), lovely(사랑스러운)는 형용사예요.' },
  ],
  verb: [
    { word: ["doesn't like", 'does not like'], q: `알맞은 것을 골라 순서대로 쓰세요: ${en('She ( ) ( ) spicy food.')} (don’t / doesn’t, like / likes)`, exp: 'does가 s를 가져가면 뒤 동사는 원형!' },
    { sentence: ['Does he play the piano?'], q: `틀린 곳을 고쳐 문장 전체를 쓰세요: ${en('Does he plays the piano?')}`, exp: 'Does가 s를 가져갔으니 play는 원형.' },
    { word: ["didn't walk", 'did not walk'], q: `우리말에 맞게: “나는 어제 학교에 걸어가지 않았다.” ${en('I ( ) ( ) to school yesterday.')}`, exp: '과거 부정은 did not + 동사원형.' },
    { word: ['have lived'], q: `lived 또는 have lived: ${en('I ( ) in Seoul since 2020.')}`, exp: 'since(~이후로 지금까지)는 현재완료와 짝꿍.' },
    { sentence: ['I met him last Sunday.'], q: `틀린 곳을 고쳐 문장 전체를 쓰세요: ${en('I have met him last Sunday.')}`, exp: 'last Sunday는 끝난 과거라서 현재완료와 함께 못 써요.' },
    { word: ['had eaten'], q: `eat을 알맞게 바꿔 빈칸 두 개를 순서대로 쓰세요: ${en('When I got home, my sister ( ) already ( ) all the pizza.')}`, exp: '내가 집에 온 것보다 더 먼저 일어난 일이라 과거완료 had eaten.' },
    { word: ['were'], q: `be를 알맞게 바꿔 쓰세요: ${en('If I ( ) rich, I would buy a big house.')}`, exp: '지금 사실의 반대는 가정법 과거. be동사는 were.' },
    { sentence: ['Had I known, I would have helped you.'], q: `if를 빼고 다시 쓰세요: ${en('If I had known, I would have helped you.')}`, exp: 'if를 빼면 had가 주어 앞으로 나와요(도치).' },
    { word: ['had woken'], q: `wake를 알맞게 바꿔 쓰세요: ${en('If she ( ) up early, she would have caught the bus.')}`, exp: '과거 사실의 반대는 가정법 과거완료 had + p.p.' },
    { sentence: ['This cake was made by my mom.'], q: `수동태로 바꿔 쓰세요: ${en('My mom made this cake.')}`, exp: '목적어가 주어로, 동사는 was + p.p., 원래 주어는 by 뒤로.' },
    { sentence: ['She can play the piano.'], q: `틀린 곳을 고쳐 문장 전체를 쓰세요: ${en('She cans play the piano.')}`, exp: '조동사에는 s가 붙지 않아요.' },
    { ox: false, q: `${en('You don’t have to go.')}는 “가면 안 된다”라는 뜻이다.`, exp: '“안 가도 된다”(필요 없음)예요. “가면 안 된다”는 You must not go.' },
    { word: ['be able to'], q: `빈칸: “나는 내년에 수영할 수 있을 것이다.” ${en('I will ( ) ( ) ( ) swim next year.')}`, exp: 'will과 can은 같이 못 써서 be able to.' },
    { word: ['swimming'], q: `swim을 알맞게 바꿔 쓰세요: ${en('I enjoy ( ) in the sea.')}`, exp: 'enjoy는 동명사만 데려와요.' },
    { word: ['to buy'], q: `buy를 알맞게 바꿔 쓰세요: “나는 새 신발을 사고 싶어요.” ${en('I want ( ) new shoes.')}`, exp: 'want는 앞으로 할 일이라 to부정사.' },
    { ox: false, q: `${en('He stopped to play games.')}는 “그는 게임을 그만뒀다”라는 뜻이다.`, exp: '“게임을 하려고 멈췄다”예요. 그만둔 건 He stopped playing games.' },
    { sentence: ['I look forward to seeing you.'], q: `틀린 곳을 고쳐 문장 전체를 쓰세요: ${en('I look forward to see you.')}`, exp: 'look forward to의 to는 전치사라서 뒤에 동명사.' },
  ],
  preposition: [
    { word: ['on, in, at, in'], q: `at / on / in을 순서대로 쓰세요: ${en('( ) Friday, ( ) 2025, ( ) 3 p.m., ( ) spring')}`, exp: '요일은 on, 연도·계절은 in, 시각은 at.' },
    { sentence: ['She sat between him and me.'], q: `틀린 곳을 고쳐 문장 전체를 쓰세요: ${en('She sat between he and I.')}`, exp: '전치사 뒤는 목적격(him, me).' },
    { word: ['on'], q: `빈칸: ${en('There is a picture ( ) the wall.')}`, exp: '벽 표면에 붙어 있으니까 on.' },
    { word: ['for'], q: `for 또는 during: ${en('I slept ( ) 10 hours.')}`, exp: '숫자로 된 기간은 for.' },
    { ox: false, q: '“걸어서”는 영어로 by foot이라고 한다.', exp: '걸어서는 on foot이에요. 탈것은 by bus, by subway.' },
  ],
  conjunction: [
    { word: ['so'], q: `and / but / or / so: ${en('I was tired, ( ) I went to bed early.')}`, exp: '피곤해서 일찍 잤다 → 결과를 이어 주는 so.' },
    { word: ['because of'], q: `because 또는 because of: ${en('I couldn’t sleep ( ) the noise.')}`, exp: '뒤에 명사(the noise)가 오니까 because of.' },
    { sentence: ['If you come, I will be happy.'], q: `틀린 곳을 고쳐 문장 전체를 쓰세요: ${en('If you will come, I will be happy.')}`, exp: 'if가 이끄는 조건절에서는 미래 대신 현재형.' },
    { ox: true, q: `${en('I like the idea that we go camping.')}의 that은 동격의 that이다.`, exp: 'that 뒤가 빠진 것 없는 완전한 문장이고 “캠핑 가자는 생각”으로 해석돼요.' },
    { word: ['am'], q: `am 또는 is: ${en('Neither Tom nor I ( ) hungry.')}`, exp: 'neither A nor B는 가까운 B(I)에 맞춰요.' },
    { ox: false, q: `${en('Both Mina and Jisu is in my class.')}는 맞는 문장이다.`, exp: 'both A and B는 둘이니까 늘 복수 → are.' },
  ],
  interjection: [
    { word: ['oops', 'uh-oh'], q: '실수로 컵을 떨어뜨렸을 때 하는 감탄사를 쓰세요.', exp: 'Oops! (Uh-oh!도 돼요)' },
    { word: ['what'], q: `What 또는 How: ${en('( ) a smart dog!')}`, exp: '명사(dog)가 있으니까 What.' },
    { word: ['how'], q: `What 또는 How: ${en('( ) fast you are!')}`, exp: '형용사·부사만 있으니까 How.' },
    { sentence: ['What a big pizza this is!', 'What a big pizza!'], q: `What으로 시작하는 감탄문으로 바꿔 쓰세요: ${en('This is a very big pizza.')}`, exp: 'What + a + 형용사 + 명사 (+ 주어 + 동사)!' },
    { ox: false, q: `${en('How a cute dog!')}는 맞는 감탄문이다.`, exp: '명사(dog)가 있으면 What을 써요 → What a cute dog!' },
  ],
};

GRAMMAR.forEach(t => { if (QUIZ[t.id]) t.quiz = QUIZ[t.id]; });
})();
