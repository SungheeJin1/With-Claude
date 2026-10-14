(function () {
const en = s => `<span class="en">${s}</span>`;

const irregular = [
  ['be (이다, 있다)', 'was / were', 'been'], ['have (가지다)', 'had', 'had'], ['do (하다)', 'did', 'done'],
  ['go (가다)', 'went', 'gone'], ['come (오다)', 'came', 'come'], ['eat (먹다)', 'ate', 'eaten'],
  ['see (보다)', 'saw', 'seen'], ['make (만들다)', 'made', 'made'], ['take (가져가다)', 'took', 'taken'],
  ['give (주다)', 'gave', 'given'], ['get (얻다)', 'got', 'got / gotten'], ['buy (사다)', 'bought', 'bought'],
  ['write (쓰다)', 'wrote', 'written'], ['read (읽다)', 'read [레드]', 'read [레드]'], ['run (달리다)', 'ran', 'run'],
  ['swim (수영하다)', 'swam', 'swum'], ['sing (노래하다)', 'sang', 'sung'], ['drink (마시다)', 'drank', 'drunk'],
  ['sleep (자다)', 'slept', 'slept'], ['meet (만나다)', 'met', 'met'], ['find (찾다)', 'found', 'found'],
  ['lose (잃다)', 'lost', 'lost'], ['break (깨다)', 'broke', 'broken'], ['know (알다)', 'knew', 'known'],
  ['speak (말하다)', 'spoke', 'spoken'], ['leave (떠나다)', 'left', 'left'], ['put (놓다)', 'put', 'put'],
  ['cut (자르다)', 'cut', 'cut'], ['teach (가르치다)', 'taught', 'taught'], ['fly (날다)', 'flew', 'flown'],
];

GRAMMAR.push({
  id: 'verb', name: '동사', en: 'Verb', icon: '🏃', color: '#3f6fe0',
  intro: '동사는 문장의 <b>심장</b>이에요. “달리다, 먹다, 좋아하다, ~이다”처럼 움직임이나 상태를 나타내요. 동사는 <b>① 수</b>(주어가 하나냐 여럿이냐), <b>② 시제</b>(언제 일어났냐), <b>③ 태</b>(하는 쪽이냐 당하는 쪽이냐)에 따라 모양이 바뀌어요. 마지막으로 동사를 도와주는 <b>④ 조동사</b>까지, 이 순서대로 배워 봐요!',
  sections: [
    {
      id: 'basic', title: '동사의 두 가족: be동사와 일반동사', en: 'be verbs & action verbs',
      html: `
        <p>영어 동사는 크게 두 가족이 있어요. 문장 하나에는 <span class="mark">보통 동사가 하나</span>만 와요. 두 가족이 한 문장에 같이 오면 안 돼요!</p>
        ${H.table(['', 'be동사', '일반동사'], [
          ['누구?', `${en('am, is, are, was, were')}`, `${en('go, eat, like, have, play, study …')} be동사를 뺀 나머지 전부`],
          ['뜻', '“~이다”, “~(에) 있다”', '움직임이나 마음 (먹다, 좋아하다 …)'],
          ['예', `${en('I <b>am</b> a student.')} 나는 학생이다.`, `${en('I <b>like</b> apples.')} 나는 사과를 좋아한다.`],
          ['부정문', `be동사 뒤에 not → ${en('I am <b>not</b> …')}`, `do/does/did의 도움 → ${en('I <b>do not</b> like …')}`],
          ['의문문', `be동사가 앞으로 → ${en('<b>Are</b> you …?')}`, `Do/Does/Did가 앞으로 → ${en('<b>Do</b> you like …?')}`],
        ])}
        ${H.box('warn', `<span class="strike en">I am like pizza.</span> → be동사와 일반동사가 함께 있으면 안 돼요. ${en('I <b>like</b> pizza.')}`)}
        ${H.box('more', `${en('can, will, must, may, should')} 같은 <b>조동사</b>는 동사를 도와주는 친구예요. 조동사 뒤에는 항상 <b>동사원형</b>(아무것도 안 붙은 원래 모양)이 와요. ${en('She <b>can swim</b>.')}`)}
      `,
      examples: [
        ['My sister <b>is</b> nine years old.', '내 여동생은 아홉 살이에요. (be동사)'],
        ['The books <b>are</b> on the desk.', '책들이 책상 위에 있어요. (be동사)'],
        ['We <b>play</b> badminton every Sunday.', '우리는 일요일마다 배드민턴을 쳐요. (일반동사)'],
      ],
    },

    /* ================= 1. 수 ================= */
    { group: '수 (Number)', no: '1', desc: '주어가 “나·너·하나·여럿” 중 누구냐에 따라 동사 모양이 바뀌어요.' },
    {
      id: 'be-number', title: 'be동사의 수 일치', en: 'am / is / are',
      html: `
        <p>be동사는 주어에 따라 옷을 바꿔 입어요. 짝꿍을 정확히 외워 두세요!</p>
        ${H.table(['주어', '현재', '과거', '줄임말'], [
          [en('I'), en('<b>am</b>'), en('was'), en("I'm")],
          [en('You / We / They / 복수 명사'), en('<b>are</b>'), en('were'), en("you're, we're, they're")],
          [en('He / She / It / 단수 명사'), en('<b>is</b>'), en('was'), en("he's, she's, it's")],
        ])}
        ${H.table(['', '만드는 법', '예'], [
          ['부정문', 'be동사 + <b>not</b>', `${en("She is <b>not</b> (isn't) hungry.")}`],
          ['의문문', '<b>Be동사</b> + 주어 ~?', `${en('<b>Is</b> she hungry? — Yes, she is. / No, she isn’t.')}`],
        ])}
        ${H.box('tip', `${en('am not')}은 줄여 쓰지 않아요. ${en("I'm not")}이라고 써요.`)}
      `,
      examples: [
        ['<b>I am</b> happy today.', '나는 오늘 행복해요.'],
        ['<b>They are</b> my classmates.', '그들은 내 반 친구들이에요.'],
        ['<b>Was</b> it cold yesterday? — Yes, it <b>was</b>.', '어제 추웠니? — 응, 추웠어.'],
        ['<b>We were</b> at the zoo last Saturday.', '우리는 지난 토요일에 동물원에 있었어요.'],
      ],
    },
    {
      id: 'three-s', title: '3인칭 단수 현재: 동사에 -s 꼬리 달기', en: 'He likes …',
      html: `
        <p>주어가 <b>3인칭(나·너 말고 다른 사람/것)</b>이면서 <b>단수(하나)</b>이고, 시제가 <b>현재</b>이면 일반동사에 <span class="mark">-s 꼬리</span>를 달아요. 이걸 줄여서 “<b>3단현 s</b>”라고 불러요.</p>
        ${H.formula('He / She / It / Tom / my dog', '+', '*동사 + s')}
        ${H.table(['규칙', '만드는 법', '예'], [
          ['대부분', '+s', en('like → likes, play → plays, read → reads')],
          ['-s, -x, -sh, -ch, -o', '+es', en('watch → watches, wash → washes, go → goes, do → does, fix → fixes')],
          ['자음 + y', 'y → i + es', en('study → studies, cry → cries, fly → flies')],
          ['모음 + y', '+s', en('play → plays, buy → buys, say → says')],
          ['특별', '모양이 바뀜', en('have → <b>has</b>')],
        ])}
        ${H.box('warn', `주어가 여럿이면 s가 없어요! ${en('My friends <b>like</b> games.')} ${en('Tom and Jerry <b>play</b> together.')}`)}
      `,
      examples: [
        ['My dad <b>drives</b> a bus.', '우리 아빠는 버스를 운전하세요.'],
        ['She <b>watches</b> cartoons after dinner.', '그녀는 저녁 식사 후에 만화를 봐요.'],
        ['My brother <b>studies</b> English every day.', '형은 매일 영어를 공부해요.'],
        ['The baby <b>has</b> big eyes.', '그 아기는 눈이 커요.'],
      ],
      toon: {
        title: 'He를 만나면 s 꼬리가 생겨요',
        panels: [
          { bg: 'sky', narr: '동사 like는 I, You, We, They와 만날 땐 그냥 like예요.',
            cast: [{ w: 'I', c: 'orange', m: 'happy' }, { w: 'like', c: 'green', m: 'happy', say: '안녕! 난 그대로~' }, { w: 'cats', c: 'yellow', m: 'happy', st: 'small' }],
            line: { t: 'I like cats.', ok: true } },
          { bg: 'sun', narr: '그런데 혼자인(단수) 3인칭 <b>He</b>가 오자…', fx: '뿅!',
            cast: [{ w: 'He', c: 'blue', m: 'smug', hold: 's', say: '나랑 같이 쓰려면 이 s 꼬리를 달아야 해!' }, { w: 'like', c: 'green', m: 'surprised', say: '엥? 꼬리?' }] },
          { bg: 'mint', narr: '이제 like는 likes가 되었어요. s는 “<b>주어가 3인칭 단수예요!</b>” 하는 표시예요.',
            cast: [{ w: 'He', c: 'blue', m: 'happy' }, { w: 'likes', c: 'green', m: 'cool', say: 's 꼬리 장착!' }, { w: 'cats', c: 'yellow', m: 'happy', st: 'small' }],
            line: { t: 'He like<u>s</u> cats.', ok: true } },
        ],
      },
    },
    {
      id: 'does-not', title: '부정문: does not + 동사원형', en: "He doesn't have …",
      html: `
        <p>일반동사는 혼자서 부정문을 못 만들어요. 그래서 도우미 <span class="en"><b>do</b></span>가 와서 <span class="en">not</span>과 함께 동사 앞에 서요.</p>
        ${H.formula('I / You / We / They', '+', '*do not (don’t)', '+', '동사원형')}
        ${H.formula('He / She / It', '+', '*does not (doesn’t)', '+', '동사원형')}
        <p>여기서 제일 중요한 점! 주어가 3인칭 단수면 <span class="en">do</span>가 <span class="en">does</span>로 바뀌는데, 그 <span class="mark">s는 원래 동사에 붙어 있던 s를 가져온 것</span>이에요. 그래서 뒤의 동사는 s를 잃고 <b>원래 모양(원형)</b>으로 돌아가요. 아래 웹툰을 보세요!</p>
      `,
      examples: [
        ['I <b>don’t like</b> carrots.', '나는 당근을 좋아하지 않아요.'],
        ['She <b>doesn’t have</b> a smartphone.', '그녀는 스마트폰이 없어요.'],
        ['My cat <b>doesn’t eat</b> fish.', '우리 고양이는 생선을 먹지 않아요.'],
        ['He <b>doesn’t has</b> a pen.', '→ s가 두 번! <span class="en">He doesn’t <b>have</b> a pen.</span>', 'x'],
      ],
      toon: {
        title: 'do가 has의 s를 뺏어 갔다!',
        panels: [
          { bg: 'sky', narr: '<b>He</b>와 함께 있는 have는 3단현 s를 받아서 <b>has</b>가 되었어요. (have + s = has)',
            cast: [{ w: 'He', c: 'blue', m: 'happy' }, { w: 'has', c: 'orange', m: 'cool', say: '내 s 멋지지?' }, { e: '🖊️', tag: 'a pen' }],
            line: { t: 'He has a pen.', ok: true } },
          { bg: 'lav', narr: '그런데 “펜이 <b>없다</b>”고 말하고 싶어요. not이 왔지만…',
            cast: [{ w: 'not', c: 'gray', m: 'sad', say: '일반동사 앞에선 나 혼자 못 서… do 형님, 도와줘요!' }, { w: 'has', c: 'orange', m: 'surprised' }] },
          { bg: 'sun', narr: '도우미 do가 등장! 주어를 보더니…', fx: '두둥!',
            cast: [{ w: 'He', c: 'blue', m: 'normal' }, { w: 'do', c: 'purple', m: 'smug', say: '주어가 He네? 3인칭 단수 표시 s는 이제 내가 들고 다닐게!' }, { w: 'not', c: 'gray', m: 'happy', st: 'small' }, { w: 'has', c: 'orange', m: 'surprised' }] },
          { bg: 'shock', narr: 'do가 has의 s를 쏙 뺏어 갔어요!', fx: '쏙!',
            cast: [{ w: 'do', c: 'purple', m: 'smug', hold: 's', st: 'tilt' }, { w: 'not', c: 'gray', m: 'surprised', st: 'small' }, { w: 'ha…', c: 'orange', m: 'cry', st: 'shake', say: '내 s 돌려줘~!' }] },
          { bg: 'mint', narr: 's를 가진 do는 <b>does</b>가 되고, s를 잃은 has는 원래 모습 <b>have</b>(동사원형)로 돌아갔어요.',
            cast: [{ w: 'He', c: 'blue', m: 'normal' }, { w: 'does', c: 'purple', m: 'cool', say: 's는 내 거!' }, { w: 'not', c: 'gray', m: 'happy', st: 'small' }, { w: 'have', c: 'orange', m: 'sad', say: '원래 모습으로…' }],
            line: { t: 'He doe<u>s</u> not have a pen.', ok: true } },
          { bg: 'rose', narr: '만약 has가 s를 안 뺏겼다면? <b>s가 두 개</b>나 생겨서 틀린 문장이 돼요.',
            cast: [{ w: 'does', c: 'purple', m: 'angry', say: 's는 한 문장에 하나만!' }, { w: 'not', c: 'gray', m: 'normal', st: 'small' }, { w: 'has', c: 'orange', m: 'dizzy', st: 'x' }],
            line: { t: 'He does not <s>has</s> a pen.', ok: false } },
          { bg: 'mint', narr: '줄여서 말하면 doesn’t! 이제 기억하죠? <b>does가 s를 가져가면 뒤 동사는 원형!</b>',
            cast: [{ w: 'He', c: 'blue', m: 'happy' }, { w: "doesn't", c: 'purple', m: 'happy' }, { w: 'have', c: 'orange', m: 'happy', say: '원형도 괜찮네!' }],
            line: { t: "He doesn't have a pen.", ok: true } },
        ],
      },
    },
    {
      id: 'does-q', title: '의문문: Does + 주어 + 동사원형?', en: 'Does she like …?',
      html: `
        <p>물어볼 때도 도우미 do가 <b>문장 맨 앞</b>으로 나와요. 이때도 3인칭 단수면 <span class="en">Does</span>가 s를 챙겨서 앞으로 가고, 동사는 원형이 돼요.</p>
        ${H.formula('*Do', '+', 'I/you/we/they', '+', '동사원형 ~?')}
        ${H.formula('*Does', '+', 'he/she/it', '+', '동사원형 ~?')}
        ${H.table(['질문', '대답'], [
          [en('<b>Do</b> you like music?'), en('Yes, I <b>do</b>. / No, I <b>don’t</b>.')],
          [en('<b>Does</b> she like music?'), en('Yes, she <b>does</b>. / No, she <b>doesn’t</b>.')],
        ])}
        ${H.box('tip', `대답할 때도 do/does를 써요. ${en('Yes, she likes.')} ✕ → ${en('Yes, she does.')} ⭕`)}
      `,
      examples: [
        ['<b>Does</b> your brother <b>play</b> the guitar?', '너희 오빠는 기타를 치니?'],
        ['<b>Do</b> they <b>live</b> near here?', '그들은 이 근처에 사니?'],
        ['<b>Does</b> this bus <b>go</b> to the airport?', '이 버스 공항에 가나요?'],
      ],
      toon: {
        title: 'Does는 s를 들고 맨 앞으로 달려가요',
        panels: [
          { bg: 'sky', narr: '평범한 문장이에요.',
            cast: [{ w: 'She', c: 'pink', m: 'happy' }, { w: 'likes', c: 'green', m: 'happy' }, { w: 'music', c: 'yellow', m: 'happy', st: 'small' }],
            line: { t: 'She likes music.', ok: true } },
          { bg: 'sun', narr: '이걸 질문으로 바꾸려면?', fx: '휘익!',
            cast: [{ w: 'Do', c: 'purple', m: 'smug', st: 'jump', hold: 's', say: 's는 내가 챙겨서 맨 앞으로 간다! 질문은 내가 시작해!' }, { w: 'She', c: 'pink', m: 'surprised' }, { w: 'like', c: 'green', m: 'sad', say: '또 뺏겼다…' }] },
          { bg: 'mint', narr: '완성! 맨 앞의 Does가 “이건 질문이에요” 하고 알려줘요.',
            cast: [{ w: 'Does', c: 'purple', m: 'cool' }, { w: 'she', c: 'pink', m: 'happy' }, { w: 'like', c: 'green', m: 'happy' }, { w: 'music?', c: 'yellow', m: 'happy', st: 'small' }],
            line: { t: 'Doe<u>s</u> she like music?', ok: true } },
        ],
      },
    },
    {
      id: 'subject-number', title: '헷갈리는 주어의 수', en: 'Tricky subjects',
      html: `
        <p>주어가 하나(단수)인지 여럿(복수)인지 헷갈릴 때가 있어요. 동사는 늘 <b>진짜 주인공</b>에 맞춰요.</p>
        ${H.table(['주어', '단수/복수', '예'], [
          [en('A and B'), '복수', en('Tom and I <b>are</b> friends.')],
          [en('every / each + 명사'), '단수', en('Every student <b>has</b> a locker.')],
          [en('everyone, someone, nobody'), '단수', en('Everyone <b>is</b> here.')],
          [en('one of + 복수명사'), '단수 (주인공은 one)', en('One of my friends <b>lives</b> in Jeju.')],
          [en('명사 + 전치사구'), '앞의 명사에 맞춤', en('The box of apples <b>is</b> heavy.')],
          [en('family, team, class'), '보통 단수', en('My family <b>is</b> big.')],
          [en('선행사 + who/which/that + 동사'), '관계대명사 뒤 동사는 <b>선행사</b>에 맞춤', en('I have a friend who <b>lives</b> in Jeju.') + '<br>' + en('I have friends who <b>live</b> in Jeju.')],
        ])}
        ${H.box('tip', `${en('everyone')}은 “모두”라는 뜻이지만 사람들을 <b>한 명씩</b> 가리키는 말이라서 단수예요.`)}
      `,
      examples: [
        ['<b>Each</b> child <b>gets</b> a present.', '아이들 각자 선물을 하나씩 받아요.'],
        ['<b>One of</b> the cookies <b>is</b> missing!', '쿠키 중 하나가 없어졌어!'],
        ['<b>Minho and his sister</b> <b>are</b> good at swimming.', '민호와 그의 여동생은 수영을 잘해요.'],
      ],
    },

    /* ================= 2. 시제 ================= */
    { group: '시제 (Tense)', no: '2', desc: '“언제” 일어난 일인지에 따라 동사 모양이 바뀌어요. 현재 → 현재진행 → 과거 → 과거진행 → 미래 → 현재완료 → 과거완료 → 가정법과거 → 가정법과거완료 순서로 배워요.' },
    {
      id: 'tense-map', title: '시제 한눈에 보기', en: 'Tense map',
      html: `
        <p>“놀다(play)”라는 동사 하나로 모든 시제를 만들어 볼게요.</p>
        ${H.table(['시제', '모양', '예문', '느낌'], [
          ['현재', '동사(+s)', en('I <b>play</b> soccer.'), '늘, 평소에 해요'],
          ['현재진행', 'am/is/are + -ing', en('I <b>am playing</b> soccer.'), '지금 하는 중!'],
          ['과거', '동사-ed', en('I <b>played</b> soccer.'), '(어제) 했어요'],
          ['과거진행', 'was/were + -ing', en('I <b>was playing</b> soccer.'), '(그때) 하는 중이었어요'],
          ['미래', 'will + 동사원형', en('I <b>will play</b> soccer.'), '할 거예요'],
          ['현재완료', 'have/has + p.p.', en('I <b>have played</b> soccer.'), '(과거부터 지금까지) 해 봤어요/해 왔어요'],
          ['과거완료', 'had + p.p.', en('I <b>had played</b> soccer.'), '(그때보다 더 전에) 했었어요'],
          ['가정법과거', 'If + 과거, would + 원형', en('If I <b>had</b> time, I <b>would play</b> soccer.'), '(지금) ~라면 할 텐데'],
          ['가정법과거완료', 'If + had p.p., would have p.p.', en('If I <b>had had</b> time, I <b>would have played</b>.'), '(그때) ~였다면 했을 텐데'],
        ])}
      `,
    },
    {
      id: 'present', title: '현재 시제', en: 'Simple present',
      html: `
        <p>현재 시제는 “지금 이 순간”이라기보다 <span class="mark">늘 그런 일</span>을 말할 때 써요.</p>
        <ul>
          <li><b>습관·반복</b>: ${en('I <b>get up</b> at 7 every morning.')} 나는 매일 아침 7시에 일어나요.</li>
          <li><b>지금의 상태·사실</b>: ${en('She <b>lives</b> in Daegu.')} 그녀는 대구에 살아요.</li>
          <li><b>변하지 않는 진리</b>: ${en('Water <b>boils</b> at 100°C.')} 물은 100도에서 끓어요.</li>
        </ul>
        ${H.box('memo', `자주 같이 다니는 말: ${en('always, usually, often, sometimes, every day, on Sundays')}`)}
      `,
      examples: [
        ['The sun <b>rises</b> in the east.', '해는 동쪽에서 떠요.'],
        ['My mom <b>drinks</b> coffee every morning.', '엄마는 매일 아침 커피를 드세요.'],
        ['We <b>go</b> to the library on Saturdays.', '우리는 토요일마다 도서관에 가요.'],
        ['A spider <b>has</b> eight legs.', '거미는 다리가 여덟 개예요.'],
      ],
    },
    {
      id: 'present-progressive', title: '현재진행 시제', en: 'Present progressive',
      html: `
        <p>바로 <b>지금 하고 있는 중</b>인 일을 말해요. “~하고 있다, ~하는 중이다”</p>
        ${H.formula('주어', '+', '*am / is / are', '+', '동사-ing')}
        ${H.table(['-ing 만들기', '예'], [
          ['대부분 +ing', en('play → playing, eat → eating, read → reading')],
          ['-e로 끝나면 e 빼고 +ing', en('make → making, come → coming, ride → riding')],
          ['단모음+단자음이면 자음 하나 더', en('run → running, swim → swimming, sit → sitting, stop → stopping')],
          ['-ie로 끝나면 ie → y + ing', en('lie → lying, die → dying')],
        ])}
        ${H.box('warn', `<b>상태</b>를 나타내는 동사는 진행형으로 잘 안 써요: ${en('like, love, know, want, have(가지다)')}<br><span class="strike en">I am knowing him.</span> → ${en('I <b>know</b> him.')}<br>(단, ${en('have')}가 “먹다”란 뜻이면 OK: ${en('I am having lunch.')})`)}
      `,
      examples: [
        ['Shh! The baby <b>is sleeping</b>.', '쉿! 아기가 자고 있어요.'],
        ['What <b>are</b> you <b>doing</b>? — I <b>am drawing</b> a dragon.', '뭐 하고 있어? — 용을 그리고 있어.'],
        ['Look! It <b>is snowing</b>.', '봐! 눈이 오고 있어.'],
        ['They <b>are not watching</b> TV now.', '그들은 지금 TV를 보고 있지 않아요.'],
      ],
      toon: {
        title: '-ing는 혼자 서지 못해요',
        panels: [
          { bg: 'sun', narr: 'I가 “지금 축구하는 중”이라고 말하려고 playing을 불렀어요.',
            cast: [{ w: 'I', c: 'orange', m: 'happy' }, { w: 'playing', c: 'green', m: 'cry', st: 'shake', say: '나… 나 혼자선 다리가 후들거려…!' }],
            line: { t: '<s>I playing soccer.</s>', ok: false } },
          { bg: 'sky', narr: '그때 be동사 삼형제가 달려왔어요.', fx: '출동!',
            cast: [{ w: 'am', c: 'teal', m: 'cool', say: '주어가 I면 나!' }, { w: 'is', c: 'teal', m: 'cool', say: 'He, She, It이면 나!' }, { w: 'are', c: 'teal', m: 'cool', say: 'You, We, They면 나!' }] },
          { bg: 'mint', narr: 'am이 playing을 든든하게 받쳐 줬어요.',
            cast: [{ w: 'I', c: 'orange', m: 'happy' }, { w: 'am', c: 'teal', m: 'happy', say: '내가 잡아 줄게!' }, { w: 'playing', c: 'green', m: 'love', say: '이제 안 넘어져!' }],
            line: { t: 'I <u>am</u> playing soccer.', ok: true } },
          { bg: 'mint', narr: '주어가 바뀌면 받쳐 주는 be동사도 바뀌어요.',
            cast: [{ w: 'She', c: 'pink', m: 'happy' }, { w: 'is', c: 'teal', m: 'happy' }, { w: 'dancing', c: 'purple', m: 'love', st: 'tilt' }],
            line: { t: 'She <u>is</u> dancing. / They <u>are</u> singing.', ok: true } },
        ],
      },
    },
    {
      id: 'past', title: '과거 시제', en: 'Simple past',
      html: `
        <p><b>이미 끝난 일</b>을 말해요. ${en('yesterday, last week, ago, in 2020')} 같은 과거 표현과 자주 함께 써요.</p>
        ${H.table(['규칙 동사 -ed 붙이기', '예'], [
          ['대부분 +ed', en('play → played, watch → watched, help → helped')],
          ['-e로 끝나면 +d', en('like → liked, dance → danced, move → moved')],
          ['자음 + y → i + ed', en('study → studied, cry → cried (단, play → played)')],
          ['단모음+단자음 → 자음 하나 더 + ed', en('stop → stopped, plan → planned')],
        ])}
        <p>모양이 마음대로 바뀌는 <b>불규칙 동사</b>는 외워야 해요. (현재완료·수동태에 쓸 <b>p.p.(과거분사)</b>도 함께 외워요!)</p>
        ${H.table(['동사원형', '과거', '과거분사(p.p.)'], irregular.map(r => [en(r[0]), en(r[1]), en(r[2])]))}
        ${H.formula('부정문:', '주어', '+', '*did not (didn’t)', '+', '동사원형')}
        ${H.formula('의문문:', '*Did', '+', '주어', '+', '동사원형 ~?')}
        ${H.box('tip', '과거에는 주어가 누구든 <b>did</b> 하나만 써요. 3단현 s 걱정 끝!')}
      `,
      examples: [
        ['I <b>visited</b> my grandma last weekend.', '나는 지난 주말에 할머니 댁에 갔어요.'],
        ['We <b>ate</b> tteokbokki after school.', '우리는 방과 후에 떡볶이를 먹었어요.'],
        ['She <b>didn’t go</b> to school yesterday. She was sick.', '그녀는 어제 학교에 가지 않았어요. 아팠거든요.'],
        ['<b>Did</b> you <b>finish</b> your homework?', '숙제 다 했니?'],
        ['I didn’t <b>went</b> there.', '→ <span class="en">I didn’t <b>go</b> there.</span>', 'x'],
      ],
      toon: {
        title: 'did는 과거 파워를 뺏어 가요',
        panels: [
          { bg: 'sepia', narr: '어제 일이에요. played는 과거 표시 -ed를 달고 있어요.',
            cast: [{ w: 'I', c: 'orange', m: 'happy' }, { w: 'played', c: 'green', m: 'cool', say: '나는 과거 -ed 장착!' }, { e: '⚽', tag: 'soccer' }],
            line: { t: 'I played soccer yesterday.', ok: true } },
          { bg: 'sepia', narr: '“안 했다”고 말하려면 do가 필요해요. 그런데 과거니까…', fx: '쏙!',
            cast: [{ w: 'do', c: 'purple', m: 'smug', hold: '-ed', say: '과거 파워는 내가 가져간다! 이제 나는 did!' }, { w: 'not', c: 'gray', m: 'normal', st: 'small' }, { w: 'play', c: 'green', m: 'sad', say: '-ed 뺏겼어…' }] },
          { bg: 'sepia', narr: '과거 파워를 가진 <b>did</b>와, 원형으로 돌아간 <b>play</b>!',
            cast: [{ w: 'I', c: 'orange', m: 'normal' }, { w: 'did', c: 'purple', m: 'cool' }, { w: 'not', c: 'gray', m: 'normal', st: 'small' }, { w: 'play', c: 'green', m: 'normal' }],
            line: { t: 'I <u>did</u> not play soccer.', ok: true } },
          { bg: 'rose', narr: '불규칙 동사 went는 -ed가 없는데 어떡하죠?',
            cast: [{ w: 'went', c: 'red', m: 'smug', say: '난 -ed가 없으니 안 뺏기지롱~' }, { w: 'did', c: 'purple', m: 'angry', say: '네 몸속에 숨은 과거 파워도 다 보여!' }] },
          { bg: 'mint', narr: 'went도 과거 파워를 빼앗기고 원래 모습 <b>go</b>로 돌아갔어요.',
            cast: [{ w: 'I', c: 'orange', m: 'happy' }, { w: "didn't", c: 'purple', m: 'cool' }, { w: 'go', c: 'red', m: 'cry', say: '원래 난 go였지…' }],
            line: { t: "I didn't <u>go</u> there. / <s>I didn't went</s>", ok: true } },
        ],
      },
    },
    {
      id: 'past-progressive', title: '과거진행 시제', en: 'Past progressive',
      html: `
        <p>과거의 <b>어느 한 순간에 하고 있던 일</b>을 말해요. “~하고 있었다, ~하는 중이었다” 과거를 <span class="mark">사진으로 찰칵</span> 찍은 느낌이에요.</p>
        ${H.formula('주어', '+', '*was / were', '+', '동사-ing')}
        ${H.table(['주어', 'be동사 과거'], [
          [en('I / He / She / It / 단수'), en('<b>was</b>')],
          [en('You / We / They / 복수'), en('<b>were</b>')],
        ])}
        ${H.box('tip', `<b>긴 동작</b>(과거진행)을 하는 중에 <b>짧은 동작</b>(과거)이 끼어들 때 자주 써요.<br>${en('I <b>was taking</b> a shower when the phone <b>rang</b>.')} 전화가 울렸을 때 나는 샤워 중이었다.`)}
      `,
      examples: [
        ['At 9 last night, I <b>was reading</b> a comic book.', '어젯밤 9시에 나는 만화책을 읽고 있었어요.'],
        ['When I came home, my mom <b>was cooking</b> dinner.', '내가 집에 왔을 때 엄마는 저녁을 요리하고 계셨어요.'],
        ['The kids <b>were laughing</b> loudly.', '아이들이 크게 웃고 있었어요.'],
        ['<b>Were</b> you <b>sleeping</b>? — No, I <b>wasn’t</b>.', '자고 있었어? — 아니, 안 자고 있었어.'],
      ],
      toon: {
        title: '탐정 고양이의 질문',
        panels: [
          { bg: 'night', narr: '어젯밤 8시, 냉장고의 케이크가 사라졌어요!',
            cast: [{ e: '🕵️‍♂️', tag: '탐정', say: '어젯밤 8시에 다들 뭐 하고 있었죠?' }, { e: '🍰❓' }] },
          { bg: 'sepia', narr: '모두 그 순간에 “하고 있던 일”을 말해요.',
            cast: [{ w: 'I', c: 'orange', m: 'surprised', say: '저는 TV를 보고 있었어요!' }, { w: 'was', c: 'teal', m: 'normal', st: 'small' }, { w: 'watching', c: 'blue', m: 'normal' }],
            line: { t: 'I <u>was watching</u> TV at 8.', ok: true } },
          { bg: 'sepia', narr: '동생들도 대답했어요. 여럿이니까 were!',
            cast: [{ w: 'They', c: 'green', m: 'happy', say: '우린 숙제하고 있었어요!' }, { w: 'were', c: 'teal', m: 'normal', st: 'small' }, { w: 'doing', c: 'yellow', m: 'happy' }],
            line: { t: 'They <u>were doing</u> homework.', ok: true } },
          { bg: 'shock', narr: '그런데 강아지는…', fx: '찰칵!',
            cast: [{ e: '📸', tag: '과거의 한 순간' }, { e: '🐶🍰', tag: 'The dog was eating the cake!' }],
            line: { t: 'The dog <u>was eating</u> the cake!', ok: true } },
        ],
      },
    },
    {
      id: 'future', title: '미래 시제', en: 'will / be going to',
      html: `
        <p>앞으로 일어날 일을 말해요. 두 가지 방법이 있어요.</p>
        ${H.formula('주어', '+', '*will', '+', '동사원형')}
        ${H.formula('주어', '+', '*am/is/are going to', '+', '동사원형')}
        ${H.table(['', 'will', 'be going to'], [
          ['느낌', '지금 막 정한 일, 예측, 약속', '미리 계획한 일, 눈앞의 증거로 예측'],
          ['예', en('I’ll help you!') + ' (지금 결심)', en('I’m going to visit Jeju this summer.') + ' (계획)'],
          ['부정', en('will not = <b>won’t</b>'), en('am not going to')],
          ['의문', en('<b>Will</b> you come?'), en('<b>Are</b> you going to come?')],
        ])}
        ${H.box('warn', `will은 주어가 누구든 모양이 같고, 뒤에는 꼭 <b>원형</b>! <span class="strike en">She will goes.</span> → ${en('She will <b>go</b>.')}`)}
      `,
      examples: [
        ['It <b>will be</b> sunny tomorrow.', '내일은 맑을 거예요.'],
        ['I <b>will</b> always <b>be</b> your friend.', '나는 언제나 네 친구일 거야.'],
        ['We <b>are going to have</b> a party on Friday.', '우리는 금요일에 파티를 할 거예요.'],
        ['Look at those dark clouds! It <b>is going to rain</b>.', '저 먹구름 좀 봐! 비가 오겠어.'],
        ['I <b>won’t</b> be late again.', '다시는 늦지 않을게요.'],
      ],
      toon: {
        title: 'will 뒤에서는 모두 원래 모습으로',
        panels: [
          { bg: 'sky', narr: 'He plays soccer. 내일 일을 말하려고 will이 들어왔어요.',
            cast: [{ w: 'He', c: 'blue', m: 'happy' }, { w: 'will', c: 'purple', m: 'normal' }, { w: 'plays', c: 'green', m: 'cool', say: '난 He 친구니까 s 달고 있어야지~' }],
            line: { t: 'He will <s>plays</s> soccer.', ok: false } },
          { bg: 'sun', narr: 'will은 미래 담당 조동사! 뒤에 오는 동사를 원형으로 만드는 힘이 있어요.', fx: '번쩍!',
            cast: [{ w: 'will', c: 'purple', m: 'angry', hold: 's', say: '내 뒤에서는 꾸미기 금지! s는 압수!' }, { w: 'play', c: 'green', m: 'surprised', say: '앗, 내 s!' }] },
          { bg: 'mint', narr: '이제 깔끔한 미래 문장 완성!',
            cast: [{ w: 'He', c: 'blue', m: 'happy' }, { w: 'will', c: 'purple', m: 'cool' }, { w: 'play', c: 'green', m: 'happy', say: '원형이 편하긴 하네!' }],
            line: { t: 'He will <u>play</u> soccer tomorrow.', ok: true } },
          { bg: 'lav', narr: '<b>can, must, may, should</b> 같은 다른 조동사도 똑같아요!',
            cast: [{ w: 'can', c: 'teal', m: 'cool', st: 'small' }, { w: 'must', c: 'red', m: 'angry', st: 'small' }, { w: 'should', c: 'yellow', m: 'smug', st: 'small' }, { w: 'go', c: 'green', m: 'happy', say: '조동사 뒤는 원형!' }] },
        ],
      },
    },
    {
      id: 'present-perfect', title: '현재완료 시제', en: 'have / has + p.p.',
      html: `
        <p>현재완료는 <span class="mark">과거와 현재를 잇는 다리</span>예요. 과거에 일어난 일이 <b>지금까지 영향을 주고 있을 때</b> 써요. 우리말에는 딱 맞는 시제가 없어서 어렵게 느껴지지만, 네 가지 쓰임만 기억하면 돼요!</p>
        ${H.formula('주어', '+', '*have / has', '+', '과거분사(p.p.)')}
        ${H.table(['쓰임', '뜻', '단짝 단어', '예'], [
          ['경험', '~해 본 적 있다', en('ever, never, before, once, twice'), en('I <b>have been</b> to Japan twice.') + '<br>일본에 두 번 가 봤어.'],
          ['계속', '(과거부터 지금까지) 쭉 ~해 왔다', en('for + 기간, since + 시작점, How long'), en('She <b>has lived</b> here for 5 years.') + '<br>그녀는 5년째 여기 살고 있어.'],
          ['완료', '(막/이미) ~했다', en('just, already, yet'), en('I <b>have</b> just <b>finished</b> lunch.') + '<br>방금 점심을 다 먹었어.'],
          ['결과', '~해 버렸다 (그래서 지금 …)', en('lost, gone, left'), en('He <b>has lost</b> his phone.') + '<br>그는 폰을 잃어버렸어. (지금도 없어)'],
        ])}
        ${H.box('warn', `현재완료는 <b>지금</b>과 연결된 말이라서 ${en('yesterday, last week, ago, when')}처럼 <b>딱 끝난 과거 시점</b>과 함께 쓸 수 없어요.<br><span class="strike en">I have seen the movie yesterday.</span> → ${en('I <b>saw</b> the movie yesterday.')}`)}
        ${H.box('tip', `${en('for')} 뒤엔 <b>기간</b>(${en('for 3 years')}), ${en('since')} 뒤엔 <b>시작한 때</b>(${en('since 2020, since I was 7')})가 와요.<br>${en('have been to')} = ~에 가 본 적 있다 (경험) / ${en('have gone to')} = ~에 가 버렸다 (그래서 지금 여기 없다)`)}
        ${H.formula('부정:', 'have/has', '+', '*not', '+', 'p.p.')}${H.formula('의문:', '*Have/Has', '+', '주어', '+', 'p.p. ~?')}
      `,
      examples: [
        ['<b>Have</b> you ever <b>eaten</b> kimchi? — Yes, I <b>have</b>.', '김치 먹어 본 적 있어? — 응, 있어.'],
        ['I <b>have never seen</b> snow.', '나는 눈을 한 번도 본 적이 없어요.'],
        ['We <b>have known</b> each other <b>since</b> first grade.', '우리는 1학년 때부터 서로 알고 지냈어요.'],
        ['The train <b>has</b> already <b>left</b>.', '기차가 이미 떠났어요.'],
        ['<b>Has</b> she <b>done</b> her homework yet?', '그녀는 숙제를 벌써 다 했니?'],
      ],
      toon: {
        title: '과거와 지금을 잇는 다리, have',
        panels: [
          { bg: 'sepia', narr: '어제 열쇠를 잃어버렸어요. <b>과거형</b>은 어제 그 순간의 사진 한 장일 뿐이에요.',
            cast: [{ w: 'I', c: 'orange', m: 'sad' }, { w: 'lost', c: 'red', m: 'normal', say: '어제 잃어버렸어. 끝!' }, { e: '🔑' }],
            line: 'I lost my key. → 지금은 찾았을 수도 있어요.' },
          { bg: 'sepia', now: true, narr: '그런데 지금도 열쇠가 없어서 집에 못 들어가요! 이럴 땐…', fx: '척!',
            cast: [{ w: 'have', c: 'teal', m: 'cool', say: '과거 일을 지금까지 끌고 오는 건 내 담당이지!' }, { e: '🌉', tag: '과거 ⟷ 지금' }] },
          { bg: 'mint', narr: 'have는 꼭 <b>과거분사(p.p.)</b>와 짝꿍이 돼요. (lose – lost – <b>lost</b>)',
            cast: [{ w: 'I', c: 'orange', m: 'cry' }, { w: 'have', c: 'teal', m: 'happy' }, { w: 'lost', c: 'red', m: 'normal', tag: 'p.p.' }, { e: '🔑❌' }],
            line: { t: 'I <u>have lost</u> my key. (그래서 지금도 없어요!)', ok: true } },
          { bg: 'rose', narr: '그때 yesterday가 끼어들려고 해요.',
            cast: [{ w: 'yesterday', c: 'yellow', m: 'happy', say: '나도 끼워 줘!' }, { w: 'have', c: 'teal', m: 'angry', say: '안 돼! 넌 과거에 딱 멈춰 있잖아. 나는 지금까지 이어지는 다리라고!' }],
            line: { t: '<s>I have lost my key yesterday.</s>', ok: false } },
        ],
      },
    },
    {
      id: 'past-perfect', title: '과거완료 시제', en: 'had + p.p.',
      html: `
        <p>과거의 어느 때를 기준으로, <span class="mark">그보다 더 먼저 일어난 일</span>을 말해요. “과거보다 한 칸 더 과거(대과거)”예요.</p>
        ${H.formula('주어', '+', '*had', '+', '과거분사(p.p.)')}
        <p>현재완료의 <b>기준점이 ‘지금’</b>이라면, 과거완료의 <b>기준점은 ‘과거의 어느 때’</b>예요. 그래서 쓰임도 똑같이 경험·계속·완료·결과가 있어요.</p>
        ${H.table(['시간 순서', '문장'], [
          ['① 먼저: 기차가 떠남 → ② 나중: 내가 도착함', en('When I arrived, the train <b>had</b> already <b>left</b>.')],
          ['① 먼저: 돈을 잃어버림 → ② 나중: 그 사실을 알게 됨', en('I found that I <b>had lost</b> my money.')],
        ])}
        ${H.box('tip', `had는 주어가 누구든 항상 ${en('had')}! (has로 바뀌지 않아요)`)}
      `,
      examples: [
        ['When we got to the theater, the movie <b>had</b> already <b>started</b>.', '우리가 극장에 도착했을 때 영화는 이미 시작했었어요.'],
        ['I <b>had never seen</b> the sea before I visited Busan.', '부산에 가기 전까지 나는 바다를 본 적이 없었어요.'],
        ['She was tired because she <b>had studied</b> all night.', '그녀는 밤새 공부했었기 때문에 피곤했어요.'],
      ],
      toon: {
        title: '기차는 이미 떠났었다',
        panels: [
          { bg: 'sepia', narr: '어제 아침 <b>7시 00분</b>. 기차가 먼저 출발했어요.',
            cast: [{ e: '🚆💨', tag: '7:00 기차 출발' }, { w: 'left', c: 'gray', m: 'normal', say: '출발~!' }] },
          { bg: 'sepia', narr: '어제 아침 <b>7시 10분</b>. 내가 역에 헐레벌떡 도착했어요.',
            cast: [{ w: 'I', c: 'orange', m: 'surprised', say: '헉헉… 기차 어디 갔어?!' }, { w: 'arrived', c: 'green', m: 'sad' }, { e: '🚉', tag: '7:10 도착' }] },
          { bg: 'lav', narr: '둘 다 과거지만 <b>기차가 더 먼저</b>예요. 더 먼저 일어난 쪽에 had를 붙여서 한 칸 더 뒤로 보내요.', fx: '한 칸 더!',
            cast: [{ w: 'had', c: 'purple', m: 'smug', say: '나는 과거보다 한 칸 더 과거!' }, { w: 'left', c: 'gray', m: 'normal', tag: 'p.p.' }, { arrow: '⬅' }, { w: 'arrived', c: 'green', m: 'normal', tag: '과거' }] },
          { bg: 'mint', narr: '완성!',
            cast: [{ w: 'I', c: 'orange', m: 'cry' }, { e: '🚉' }, { e: '🚆💨' }],
            line: { t: 'When I <u>arrived</u>, the train <u>had</u> already <u>left</u>.', ok: true } },
        ],
      },
    },
    {
      id: 'subjunctive-past', title: '가정법 과거', en: 'If I were …, I would …',
      html: `
        <p>“내가 새<b>라면</b> 너에게 날아갈 <b>텐데</b>.” 이건 진짜가 아니라 <span class="mark">지금 사실과 반대되는 상상</span>이에요. 영어에서는 지금 일인데도 동사를 <b>과거형</b>으로 써서 “이건 상상이야!”라고 표시해요.</p>
        ${H.formula('If', '+', '주어', '+', '*동사 과거형 (be → were)', ',', '주어', '+', '*would / could', '+', '동사원형')}
        <p>해석: “(지금) 만약 ~라면, …할 텐데”</p>
        ${H.table(['진짜 현실 (현재)', '상상 (가정법 과거)'], [
          [en('I am not a bird, so I can’t fly.'), en('If I <b>were</b> a bird, I <b>could fly</b>.')],
          [en('I don’t have money, so I won’t buy it.'), en('If I <b>had</b> money, I <b>would buy</b> it.')],
          [en('I am not you.'), en('If I <b>were</b> you, I <b>would</b> say sorry.') + ' (내가 너라면 사과할 텐데 → 충고)'],
        ])}
        ${H.box('memo', `가정법 과거에서 be동사는 주어가 I, he, she여도 보통 <b>were</b>를 써요. (일상 대화에서는 was도 써요.)`)}
        ${H.box('more', `${en('I wish + 과거형')}: “~라면 좋을 텐데” ${en('I wish I <b>had</b> a puppy.')} 강아지가 있으면 좋을 텐데. (지금 없음)`)}
      `,
      examples: [
        ['If I <b>were</b> a bird, I <b>would fly</b> to you.', '내가 새라면 너에게 날아갈 텐데.'],
        ['If I <b>had</b> a magic lamp, I <b>would make</b> three wishes.', '내게 요술 램프가 있다면 소원 세 개를 빌 텐데.'],
        ['If it <b>were</b> Saturday today, I <b>could sleep</b> late.', '오늘이 토요일이라면 늦잠을 잘 수 있을 텐데.'],
        ['I wish I <b>could</b> speak English well.', '영어를 잘할 수 있으면 좋을 텐데.'],
      ],
      toon: {
        title: '상상할 땐 동사가 과거 옷을 입어요',
        panels: [
          { bg: 'sky', narr: '지금 현실: 나는 새가 아니에요. 친구는 멀리 이사 갔어요.',
            cast: [{ w: 'I', c: 'orange', m: 'sad' }, { w: 'am not', c: 'teal', m: 'sad' }, { e: '🐦', tag: 'a bird' }],
            line: 'I am not a bird. I can’t fly. 😢' },
          { bg: 'lav', narr: '상상을 시작해요. 그런데 am이 그대로 오면 진짜인지 상상인지 헷갈려요.',
            cast: [{ w: 'If', c: 'yellow', m: 'happy', say: '상상 모드 ON!' }, { w: 'I', c: 'orange', m: 'happy' }, { w: 'am', c: 'teal', m: 'surprised', say: '나 지금 그대로 가도 돼?' }],
            line: { t: 'If I <s>am</s> a bird, …', ok: false } },
          { bg: 'shock', narr: '지금 일을 <b>과거 옷</b>으로 갈아입히면 “현실이 아니야”라는 표시가 돼요!', fx: '변신!',
            cast: [{ w: 'am', c: 'teal', m: 'surprised', st: 'ghost' }, { arrow: '➜' }, { w: 'were', c: 'purple', m: 'cool', hat: '🎩', say: '과거 옷 = 상상 옷! I여도 were!' }] },
          { bg: 'night', narr: '뒤쪽도 과거 조동사 <b>would / could</b>를 써요.',
            cast: [{ w: 'If I were', c: 'purple', m: 'love' }, { w: 'could', c: 'teal', m: 'happy' }, { w: 'fly', c: 'blue', m: 'love' }, { e: '🕊️' }],
            line: { t: 'If I <u>were</u> a bird, I <u>could</u> fly to you.', ok: true } },
        ],
      },
    },
    {
      id: 'subjunctive-past-perfect', title: '가정법 과거완료', en: 'If I had p.p., I would have p.p.',
      html: `
        <p>“그때 공부를 더 열심히 <b>했더라면</b> 시험에 붙었을 <b>텐데</b>.” <span class="mark">이미 지나간 과거 사실과 반대</span>되는 상상이에요. 후회할 때 많이 써요. 과거보다 <b>한 칸 더 과거</b>로 보내서 “과거에 대한 상상”임을 표시해요.</p>
        ${H.formula('If', '+', '주어', '+', '*had + p.p.', ',', '주어', '+', '*would / could have', '+', 'p.p.')}
        <p>해석: “(그때) 만약 ~했더라면, …했을 텐데”</p>
        ${H.table(['', '가정법 과거', '가정법 과거완료'], [
          ['어느 때 이야기?', '<b>지금</b> 사실의 반대', '<b>과거</b> 사실의 반대'],
          ['If 쪽', '과거형 (were, had)', 'had + p.p.'],
          ['결과 쪽', 'would + 원형', 'would have + p.p.'],
          ['해석', '~라면 …할 텐데', '~했더라면 …했을 텐데'],
        ])}
        ${H.table(['진짜 과거', '상상 (가정법 과거완료)'], [
          [en('I didn’t study, so I failed.'), en('If I <b>had studied</b>, I <b>would have passed</b>.')],
          [en('It rained, so we didn’t go on a picnic.'), en('If it <b>hadn’t rained</b>, we <b>would have gone</b> on a picnic.')],
        ])}
      `,
      examples: [
        ['If I <b>had studied</b> harder, I <b>would have passed</b> the test.', '공부를 더 열심히 했더라면 시험에 붙었을 텐데.'],
        ['If you <b>had told</b> me, I <b>could have helped</b> you.', '네가 말해 줬더라면 내가 도와줄 수 있었을 텐데.'],
        ['If we <b>had left</b> earlier, we <b>wouldn’t have missed</b> the bus.', '더 일찍 나왔더라면 버스를 놓치지 않았을 텐데.'],
      ],
      toon: {
        title: '타임머신이 있었더라면',
        panels: [
          { bg: 'sepia', narr: '지난주, 나는 공부 대신 게임만 했어요.',
            cast: [{ w: 'I', c: 'orange', m: 'happy', say: '시험? 내일 하면 되지~' }, { e: '🎮' }],
            line: 'I didn’t study. (과거)' },
          { bg: 'sepia', narr: '결과는…', fx: '털썩',
            cast: [{ w: 'I', c: 'orange', m: 'cry' }, { e: '📝', tag: '30점' }],
            line: 'So I failed the test. (과거)' },
          { bg: 'lav', now: true, narr: '이미 지나간 일을 바꾸는 상상! 동사를 <b>한 칸 더 과거</b>로 보내요.', fx: '후회 모드',
            cast: [{ w: 'If', c: 'yellow', m: 'sad', say: '그때 ~했더라면…' }, { w: 'had studied', c: 'purple', m: 'normal', tag: 'had + p.p.' }, { e: '🕰️' }] },
          { bg: 'night', narr: '결과 쪽은 <b>would have + p.p.</b>로 “~했을 텐데”!',
            cast: [{ w: 'I', c: 'orange', m: 'cry' }, { w: 'would have', c: 'teal', m: 'sad' }, { w: 'passed', c: 'green', m: 'sad', tag: 'p.p.' }],
            line: { t: 'If I <u>had studied</u>, I <u>would have passed</u>.', ok: true } },
        ],
      },
    },

    /* ================= 3. 태 ================= */
    { group: '태 (Voice)', no: '3', desc: '주인공이 “하는 쪽”이면 능동태, “당하는 쪽”이면 수동태예요.' },
    {
      id: 'passive', title: '능동태와 수동태', en: 'Active / Passive',
      html: `
        <p><b>능동태</b>: 주어가 직접 <b>하는</b> 문장 — “톰이 창문을 깼다.”<br><b>수동태</b>: 주어가 <b>당하는</b> 문장 — “창문이 톰에 의해 깨졌다.”</p>
        ${H.formula('주어', '+', '*be동사 + p.p.', '+', '(by + 행위자)')}
        <p><b>능동태 → 수동태 바꾸는 3단계</b></p>
        <ol>
          <li>능동태의 <b>목적어</b>를 수동태의 <b>주어</b>로 데려온다.</li>
          <li>동사를 <b>be동사 + p.p.</b>로 바꾼다. (be동사는 새 주어와 시제에 맞춰요)</li>
          <li>원래 주어는 <b>by + 목적격</b>으로 문장 뒤에 보낸다.</li>
        </ol>
        ${H.table(['능동태', '수동태'], [
          [en('Tom <b>broke</b> the window.'), en('The window <b>was broken</b> by Tom.')],
          [en('Many people <b>love</b> BTS.'), en('BTS <b>is loved</b> by many people.')],
          [en('She <b>wrote</b> these letters.'), en('These letters <b>were written</b> by her.')],
        ])}
        ${H.box('tip', `누가 했는지 모르거나 중요하지 않으면 <b>by ~를 생략</b>해요.<br>${en('English <b>is spoken</b> in many countries.')} 영어는 많은 나라에서 쓰여요. (by people 생략)`)}
        ${H.box('warn', `목적어가 없는 동사(${en('happen, arrive, sleep')})는 수동태로 못 만들어요. <span class="strike en">The accident was happened.</span>`)}
      `,
      examples: [
        ['This picture <b>was painted</b> by my grandpa.', '이 그림은 우리 할아버지가 그리셨어요.'],
        ['Kimchi <b>is made</b> with cabbage.', '김치는 배추로 만들어요.'],
        ['The cookies <b>were eaten</b> by the dog!', '쿠키를 개가 먹어 버렸어요!'],
        ['Hangeul <b>was created</b> by King Sejong.', '한글은 세종대왕이 만드셨어요.'],
      ],
      toon: {
        title: '목적어가 주인공 자리를 차지했다!',
        panels: [
          { bg: 'sky', narr: '능동태 문장이에요. 주인공(주어)은 Tom!',
            cast: [{ w: 'Tom', c: 'blue', m: 'smug', hat: '👑', say: '내가 깼어!' }, { w: 'broke', c: 'red', m: 'normal' }, { w: 'the window', c: 'gray', m: 'sad' }],
            line: { t: 'Tom broke the window.', ok: true } },
          { bg: 'sun', narr: '그런데 오늘은 “깨진 창문” 이야기를 하고 싶어요.', fx: '쓩!',
            cast: [{ w: 'the window', c: 'gray', m: 'angry', st: 'jump', say: '오늘은 내가 주인공이야! 자리 비켜!' }, { w: 'Tom', c: 'blue', m: 'surprised', hat: '👑' }] },
          { bg: 'lav', narr: '동사는 “당했다”는 뜻의 <b>be + p.p.</b>로 변신! 과거니까 was, break의 p.p.는 broken.',
            cast: [{ w: 'broke', c: 'red', m: 'surprised', st: 'ghost' }, { arrow: '➜' }, { w: 'was broken', c: 'red', m: 'cool', say: '수동태 모드!' }] },
          { bg: 'rose', narr: '원래 주인공 Tom은 <b>by</b>를 잡고 맨 뒤로 밀려났어요.',
            cast: [{ w: 'by', c: 'yellow', m: 'normal', st: 'small' }, { w: 'Tom', c: 'blue', m: 'cry', say: '난 by 뒤로… 그래도 범인은 나라고 적혀 있네.' }] },
          { bg: 'mint', narr: '수동태 완성!',
            cast: [{ w: 'The window', c: 'gray', m: 'cool', hat: '👑' }, { w: 'was broken', c: 'red', m: 'happy' }, { w: 'by Tom', c: 'blue', m: 'sad', st: 'small' }],
            line: { t: 'The window <u>was broken</u> by Tom.', ok: true } },
        ],
      },
    },
    {
      id: 'passive-tense', title: '수동태의 시제·부정문·의문문', en: 'Passive in all tenses',
      html: `
        <p>수동태도 시제를 가져요. <b>be동사 부분</b>만 시제에 맞게 바꾸면 돼요. p.p.는 그대로!</p>
        ${H.table(['시제', '모양', '예'], [
          ['현재', 'am/is/are + p.p.', en('The room <b>is cleaned</b> every day.')],
          ['과거', 'was/were + p.p.', en('The room <b>was cleaned</b> yesterday.')],
          ['미래', 'will be + p.p.', en('The room <b>will be cleaned</b> tomorrow.')],
          ['현재진행', 'am/is/are being + p.p.', en('The room <b>is being cleaned</b> now.')],
          ['현재완료', 'have/has been + p.p.', en('The room <b>has</b> just <b>been cleaned</b>.')],
          ['조동사', 'can/must + be + p.p.', en('The room <b>must be cleaned</b>.')],
        ])}
        ${H.table(['', '만드는 법', '예'], [
          ['부정문', 'be동사 + not + p.p.', en('The letter <b>was not written</b> by him.')],
          ['의문문', 'Be동사 + 주어 + p.p. ~?', en('<b>Was</b> the letter <b>written</b> by him?')],
        ])}
      `,
      examples: [
        ['The new library <b>will be opened</b> next month.', '새 도서관은 다음 달에 문을 열 거예요.'],
        ['<b>Is</b> this song <b>sung</b> by children?', '이 노래는 아이들이 부르나요?'],
        ['The cake <b>has been eaten</b> already!', '케이크는 벌써 다 먹혔어요!'],
      ],
    },
    {
      id: 'passive-prep', title: 'by 대신 다른 전치사를 쓰는 수동태', en: 'be interested in …',
      html: `
        ${H.table(['표현', '뜻', '예'], [
          [en('be interested <b>in</b>'), '~에 관심이 있다', en('I am interested in science.')],
          [en('be covered <b>with</b>'), '~로 덮여 있다', en('The mountain is covered with snow.')],
          [en('be filled <b>with</b>'), '~로 가득 차 있다', en('The box is filled with toys.')],
          [en('be made <b>of</b>'), '~로 만들어지다 (재료가 보임)', en('This desk is made of wood.')],
          [en('be made <b>from</b>'), '~로 만들어지다 (재료가 안 보임)', en('Cheese is made from milk.')],
          [en('be known <b>to</b>'), '~에게 알려져 있다', en('The singer is known to everyone.')],
          [en('be surprised <b>at</b>'), '~에 놀라다', en('We were surprised at the news.')],
        ])}
      `,
      examples: [
        ['My brother <b>is interested in</b> dinosaurs.', '남동생은 공룡에 관심이 많아요.'],
        ['The streets <b>were covered with</b> leaves.', '거리는 낙엽으로 덮여 있었어요.'],
      ],
    },

    /* ================= 4. 조동사 ================= */
    { group: '조동사 (Modal verbs)', no: '4', desc: '동사 앞에서 “~할 수 있다, ~해야 한다, ~일지도 모른다”처럼 능력·의무·추측의 뜻을 더해 주는 도우미예요.' },
    {
      id: 'modal-basic', title: '조동사의 기본 규칙', en: 'Modal + base verb',
      html: `
        <p>조동사(助動詞)는 동사를 <b>도와주는(助)</b> 동사예요. 혼자서는 못 쓰고 꼭 동사와 함께 다녀요.</p>
        ${H.formula('주어', '+', '*조동사', '+', '동사원형')}
        ${H.table(['규칙', '⭕', '❌'], [
          ['① 뒤에는 항상 <b>동사원형</b>', en('She can <b>swim</b>.'), `<span class="strike en">She can swims.</span>`],
          ['② 주어가 3인칭 단수여도 조동사에 <b>s를 붙이지 않음</b>', en('He <b>can</b> dance.'), `<span class="strike en">He cans dance.</span>`],
          ['③ 부정문: 조동사 뒤에 <b>not</b>', en('I <b>cannot(can’t)</b> swim.'), `<span class="strike en">I don’t can swim.</span>`],
          ['④ 의문문: 조동사가 <b>맨 앞</b>으로', en('<b>Can</b> you swim?'), `<span class="strike en">Do you can swim?</span>`],
          ['⑤ 조동사 두 개를 <b>연달아 쓰지 않음</b>', en('I will <b>be able to</b> swim.'), `<span class="strike en">I will can swim.</span>`],
        ])}
        ${H.table(['조동사', '부정형', '줄임말'], [
          [en('can'), en('cannot'), en('can’t')],
          [en('could'), en('could not'), en('couldn’t')],
          [en('will'), en('will not'), en('won’t')],
          [en('would'), en('would not'), en('wouldn’t')],
          [en('should'), en('should not'), en('shouldn’t')],
          [en('must'), en('must not'), en('mustn’t')],
          [en('may'), en('may not'), '(잘 줄이지 않아요)'],
        ])}
        ${H.box('tip', `조동사 대신 쓸 수 있는 짝꿍 표현도 있어요. 다른 조동사와 함께 쓰거나 시제를 바꿀 때 편해요.<br>${en('can = be able to')} / ${en('must = have to')} / ${en('will = be going to')}`)}
      `,
      examples: [
        ['My grandma <b>can speak</b> three languages.', '우리 할머니는 3개 국어를 하실 수 있어요.'],
        ['You <b>shouldn’t eat</b> too much candy.', '사탕을 너무 많이 먹으면 안 돼.'],
        ['<b>May</b> I <b>use</b> your eraser?', '네 지우개 써도 될까?'],
      ],
    },
    {
      id: 'can', title: 'can / could / be able to', en: '능력 · 허락 · 가능성',
      html: `
        ${H.table(['뜻', '예', '해석'], [
          ['능력 (~할 수 있다)', en('I <b>can</b> ride a bike.'), '나는 자전거를 탈 수 있어.'],
          ['허락 (~해도 된다)', en('You <b>can</b> go home now.'), '이제 집에 가도 돼.'],
          ['요청 (~해 줄래?)', en('<b>Can</b> you help me?'), '나 좀 도와줄래?'],
          ['공손한 요청', en('<b>Could</b> you open the door?'), '문 좀 열어 주시겠어요?'],
          ['과거의 능력', en('I <b>could</b> swim when I was five.'), '나는 다섯 살 때 수영할 수 있었어.'],
          ['가능성 (~일 수도 있다)', en('It <b>could</b> rain tonight.'), '오늘 밤 비가 올 수도 있어.'],
        ])}
        ${H.table(['시제', '능력 “~할 수 있다”'], [
          ['현재', en('can / am·is·are able to')],
          ['과거', en('could / was·were able to')],
          ['미래', en('<b>will be able to</b>') + ' (will can ✕)'],
          ['현재완료', en('<b>have been able to</b>')],
        ])}
        ${H.box('tip', `${en('Could you ~?')}는 과거가 아니라 ${en('Can you ~?')}보다 <b>더 공손한</b> 부탁이에요. 선생님이나 어른께 쓰면 좋아요.`)}
      `,
      examples: [
        ['Penguins <b>can’t fly</b>, but they <b>can swim</b> very fast.', '펭귄은 날 수 없지만 아주 빨리 헤엄칠 수 있어요.'],
        ['<b>Could</b> you say that again, please?', '다시 한번 말씀해 주시겠어요?'],
        ['After a lot of practice, she <b>was able to</b> win the race.', '연습을 많이 한 끝에 그녀는 경주에서 이길 수 있었어요.'],
        ['I <b>will be able to</b> read English books next year.', '나는 내년에 영어책을 읽을 수 있을 거예요.'],
      ],
    },
    {
      id: 'may', title: 'may / might', en: '허락 · 추측',
      html: `
        ${H.table(['뜻', '예', '해석'], [
          ['허락 (~해도 된다)', en('You <b>may</b> sit down.'), '앉아도 좋아요.'],
          ['허락 구하기 (공손)', en('<b>May</b> I come in?'), '들어가도 될까요?'],
          ['추측 (~일지도 모른다)', en('He <b>may</b> be at home.'), '그는 집에 있을지도 몰라.'],
          ['약한 추측', en('It <b>might</b> snow tomorrow.'), '내일 눈이 올지도 몰라. (may보다 확신이 덜함)'],
        ])}
        ${H.box('tip', `${en('May I ~?')}는 ${en('Can I ~?')}보다 공손해요. 대답은 ${en('Yes, you may. / Sure. / No, you may not.')}`)}
      `,
      examples: [
        ['<b>May</b> I borrow your pencil?', '연필 좀 빌려도 될까요?'],
        ['Take an umbrella. It <b>might rain</b>.', '우산 가져가. 비가 올지도 몰라.'],
      ],
    },
    {
      id: 'must', title: 'must / have to', en: '의무 · 강한 추측',
      html: `
        ${H.table(['뜻', '예', '해석'], [
          ['의무 (~해야 한다)', en('You <b>must</b> wear a seat belt.'), '안전벨트를 꼭 매야 해요.'],
          ['의무 (~해야 한다)', en('I <b>have to</b> finish my homework.') + '<br>' + en('She <b>has to</b> get up early.'), '숙제를 끝내야 해. / 그녀는 일찍 일어나야 해.'],
          ['과거의 의무', en('I <b>had to</b> wait for an hour.'), '나는 한 시간 동안 기다려야 했어. (must의 과거형은 없어요)'],
          ['미래의 의무', en('You <b>will have to</b> study hard.'), '너는 열심히 공부해야 할 거야.'],
          ['강한 추측 (~임에 틀림없다)', en('She <b>must</b> be tired.'), '그녀는 피곤한 게 틀림없어.'],
          ['강한 부정 추측 (~일 리가 없다)', en('It <b>can’t</b> be true.'), '그게 사실일 리가 없어.'],
        ])}
        <p>여기서 제일 헷갈리는 부분! 긍정일 땐 뜻이 같은데, <span class="mark">부정이 되면 뜻이 완전히 달라져요.</span></p>
        ${H.table(['', '긍정', '부정'], [
          [en('must'), '~해야 한다', en('<b>must not</b>') + ' = <b>~하면 안 된다</b> (금지 🚫)'],
          [en('have to'), '~해야 한다', en('<b>don’t have to</b>') + ' = <b>~할 필요 없다</b> (해도 되고 안 해도 됨 🙆)'],
        ])}
      `,
      examples: [
        ['You <b>must not</b> run in the hallway.', '복도에서 뛰면 안 돼요. (금지)'],
        ['You <b>don’t have to</b> bring lunch. We’ll have pizza!', '점심 안 가져와도 돼. 피자 먹을 거야! (필요 없음)'],
        ['He <b>has to</b> take care of his little brother today.', '그는 오늘 남동생을 돌봐야 해요.'],
        ['You walked 10 km? You <b>must</b> be hungry!', '10km를 걸었다고? 배고프겠다! (강한 추측)'],
      ],
      toon: {
        title: 'must not과 don’t have to는 달라요',
        panels: [
          { bg: 'sky', narr: '긍정일 때 must와 have to는 쌍둥이처럼 뜻이 같아요.',
            cast: [{ w: 'must', c: 'red', m: 'cool', say: '~해야 해!' }, { w: 'have to', c: 'orange', m: 'cool', say: '나도 ~해야 해!' }],
            line: 'You must / have to wear a helmet.' },
          { bg: 'rose', narr: '그런데 must에 not이 붙으면…', fx: '🚫',
            cast: [{ w: 'must not', c: 'red', m: 'angry', st: 'big', say: '절대 하면 안 돼! 금지!' }, { e: '🏃‍♂️❌', tag: '복도에서 뛰기' }],
            line: { t: 'You <u>must not</u> run here. (~하면 안 된다)', ok: true } },
          { bg: 'mint', narr: 'have to에 not이 붙으면 전혀 다른 뜻이 돼요.',
            cast: [{ w: "don't have to", c: 'orange', m: 'happy', say: '안 해도 괜찮아~ 해도 되고!' }, { e: '🍱', tag: '도시락' }],
            line: { t: 'You <u>don’t have to</u> bring lunch. (~할 필요 없다)', ok: true } },
          { bg: 'lav', narr: '외우는 법: <b>must not은 빨간불</b> 🔴, <b>don’t have to는 자유</b> 🟢',
            cast: [{ w: 'must not', c: 'red', m: 'angry', tag: '금지 🔴' }, { w: "don't have to", c: 'green', m: 'love', tag: '필요 없음 🟢' }] },
        ],
      },
    },
    {
      id: 'should', title: 'should / had better / ought to', en: '충고 · 조언',
      html: `
        ${H.table(['표현', '느낌', '예'], [
          [en('should'), '~하는 게 좋겠다 (부드러운 충고)', en('You <b>should</b> go to bed early.')],
          [en('ought to'), 'should와 비슷 (조금 격식)', en('You <b>ought to</b> say sorry.')],
          [en('had better'), '~하는 게 낫다 (안 하면 곤란해져요!)', en('You <b>had better</b> hurry, or you’ll be late.')],
        ])}
        ${H.box('warn', `${en('had better')}의 부정은 ${en('had better <b>not</b>')}이에요. <span class="strike en">had not better</span><br>${en('had better')}는 과거가 아니라 <b>지금·앞으로</b>의 충고예요. 줄여서 ${en('You’d better …')}`)}
      `,
      examples: [
        ['You look tired. You <b>should</b> take a rest.', '피곤해 보여. 좀 쉬는 게 좋겠어.'],
        ['We <b>shouldn’t</b> waste water.', '우리는 물을 낭비하면 안 돼요.'],
        ['You’d <b>better not</b> touch that dog. It bites!', '그 개 안 만지는 게 좋아. 물거든!'],
      ],
    },
    {
      id: 'would', title: 'would / would like to / used to', en: '공손한 부탁 · 바람 · 과거 습관',
      html: `
        ${H.table(['표현', '뜻', '예'], [
          [en('Would you ~?'), '~해 주시겠어요? (공손한 부탁)', en('<b>Would</b> you pass me the salt?')],
          [en('would like + 명사'), '~을 원하다 (want보다 공손)', en('I<b>’d like</b> a glass of water.')],
          [en('would like to + 동사원형'), '~하고 싶다', en('I<b>’d like to</b> visit London.')],
          [en('used to + 동사원형'), '(예전에) ~하곤 했다 / ~였다 (지금은 아님)', en('I <b>used to</b> live in Daegu.')],
          [en('would + 동사원형'), '(예전에) ~하곤 했다 (반복한 행동만)', en('We <b>would</b> play outside every day.')],
        ])}
        ${H.box('warn', `${en('used to')}는 상태와 행동 모두 OK, ${en('would')}는 반복한 <b>행동</b>에만 써요.<br>${en('There <b>used to</b> be a park here.')} ⭕ / <span class="strike en">There would be a park here.</span> (과거 습관의 뜻으로는 ✕)`)}
        ${H.box('more', `${en('be used to + -ing')}는 “~에 익숙하다”라는 전혀 다른 표현이에요.<br>${en('I <b>used to get</b> up early.')} 예전엔 일찍 일어나곤 했다. / ${en('I <b>am used to getting</b> up early.')} 나는 일찍 일어나는 데 익숙하다.`)}
      `,
      examples: [
        ['<b>Would</b> you like some cookies?', '쿠키 좀 드실래요?'],
        ['I <b>used to</b> be afraid of dogs, but now I love them.', '예전엔 개를 무서워했는데, 지금은 정말 좋아해요.'],
        ['When I was little, my dad <b>would</b> read me a story every night.', '어렸을 때 아빠는 매일 밤 이야기책을 읽어 주시곤 했어요.'],
      ],
    },
    {
      id: 'modal-perfect', title: '조동사 + have p.p. (과거에 대한 추측·후회)', en: 'should have p.p. …',
      html: `
        <p>조동사 뒤에 <b>have + p.p.</b>를 붙이면 이미 지나간 <b>과거 일</b>에 대해 추측하거나 후회하는 말이 돼요.</p>
        ${H.formula('주어', '+', '*조동사', '+', '*have', '+', 'p.p.')}
        ${H.table(['표현', '뜻', '예'], [
          [en('should have p.p.'), '~했어야 했는데 (안 해서 후회)', en('I <b>should have studied</b> harder.') + '<br>공부를 더 열심히 했어야 했는데.'],
          [en('shouldn’t have p.p.'), '~하지 말았어야 했는데 (해서 후회)', en('I <b>shouldn’t have eaten</b> so much.') + '<br>그렇게 많이 먹지 말았어야 했는데.'],
          [en('must have p.p.'), '~했음에 틀림없다 (강한 추측)', en('She <b>must have been</b> tired.') + '<br>그녀는 피곤했던 게 틀림없어.'],
          [en('may / might have p.p.'), '~했을지도 모른다 (약한 추측)', en('He <b>may have missed</b> the bus.') + '<br>그는 버스를 놓쳤을지도 몰라.'],
          [en('can’t have p.p.'), '~했을 리가 없다', en('She <b>can’t have said</b> that.') + '<br>그녀가 그런 말을 했을 리가 없어.'],
          [en('could have p.p.'), '~할 수도 있었는데 (안 했음)', en('You <b>could have won</b>!') + '<br>너 이길 수도 있었는데!'],
        ])}
        ${H.box('tip', '가정법 과거완료의 결과 쪽(<span class="en">would have p.p.</span>)도 같은 모양이에요. 시제 묶음의 <b>가정법 과거완료</b>와 함께 보면 좋아요.')}
      `,
      examples: [
        ['I <b>should have brought</b> an umbrella. I’m all wet!', '우산을 가져왔어야 했는데. 다 젖었어!'],
        ['The ground is wet. It <b>must have rained</b> last night.', '땅이 젖었네. 어젯밤에 비가 왔던 게 틀림없어.'],
        ['I can’t find my key. I <b>might have left</b> it at school.', '열쇠를 못 찾겠어. 학교에 두고 왔을지도 몰라.'],
      ],
      toon: {
        title: '후회할 땐 should have p.p.',
        panels: [
          { bg: 'sepia', narr: '어제, 우산을 안 가지고 나갔어요.',
            cast: [{ w: 'I', c: 'orange', m: 'cool', say: '비 안 오겠지~' }, { e: '☀️' }] },
          { bg: 'night', now: true, narr: '오늘 아침, 비에 쫄딱 젖어서…', fx: '주룩주룩',
            cast: [{ w: 'I', c: 'orange', m: 'cry' }, { e: '🌧️' }] },
          { bg: 'lav', narr: '이미 지나간 일을 후회할 땐 <b>should have + p.p.</b>!',
            cast: [{ w: 'should', c: 'yellow', m: 'sad' }, { w: 'have', c: 'teal', m: 'sad' }, { w: 'brought', c: 'blue', m: 'cry', tag: 'p.p.' }, { e: '☂️' }],
            line: { t: 'I <u>should have brought</u> an umbrella. (가져왔어야 했는데…)', ok: true } },
          { bg: 'mint', narr: '친구가 젖은 나를 보고 추측해요. 확신이 들면 <b>must have p.p.</b>',
            cast: [{ w: 'friend', c: 'green', m: 'surprised', say: '비 맞은 게 틀림없어!' }, { w: 'must have', c: 'red', m: 'cool' }, { w: 'been', c: 'gray', m: 'normal', tag: 'p.p.' }],
            line: { t: 'You <u>must have been</u> caught in the rain!', ok: true } },
        ],
      },
    },
  ],
  quiz: [
    ['알맞은 것을 고르세요: <span class="en">She (don’t / doesn’t) (like / likes) spicy food.</span>', '<span class="en">doesn’t like</span> — does가 s를 가져가면 뒤 동사는 원형!'],
    ['틀린 곳을 고치세요: <span class="en">Does he plays the piano?</span>', '<span class="en">Does he <b>play</b> the piano?</span>'],
    ['우리말에 맞게: “나는 어제 학교에 걸어가지 않았다.” <span class="en">I ( ) ( ) to school yesterday.</span>', '<span class="en">didn’t walk</span>'],
    ['시제를 고르세요: <span class="en">I (lived / have lived) in Seoul since 2020.</span>', '<span class="en">have lived</span> — since(~이후로 지금까지)는 현재완료와 짝꿍.'],
    ['틀린 곳을 고치세요: <span class="en">I have met him last Sunday.</span>', '<span class="en">last Sunday</span>는 끝난 과거 → <span class="en">I <b>met</b> him last Sunday.</span>'],
    ['빈칸: <span class="en">When I got home, my sister ( ) already ( ) (eat) all the pizza.</span>', '<span class="en">had eaten</span> — 내가 집에 온 것보다 더 먼저 일어난 일(대과거).'],
    ['빈칸: <span class="en">If I ( ) (be) rich, I would buy a big house.</span>', '<span class="en">were</span> — 지금 사실의 반대는 가정법 과거.'],
    ['빈칸: <span class="en">If she ( ) (wake) up early, she would have caught the bus.</span>', '<span class="en">had woken</span> — 과거 사실의 반대는 가정법 과거완료.'],
    ['수동태로: <span class="en">My mom made this cake.</span>', '<span class="en">This cake <b>was made</b> by my mom.</span>'],
    ['틀린 곳을 고치세요: <span class="en">She cans play the piano.</span>', '조동사에는 s가 붙지 않아요 → <span class="en">She <b>can</b> play the piano.</span>'],
    ['뜻이 어떻게 다를까요? <span class="en">You must not go.</span> / <span class="en">You don’t have to go.</span>', '앞은 “가면 안 된다”(금지), 뒤는 “안 가도 된다”(필요 없음).'],
    ['빈칸: “나는 내년에 수영할 수 있을 것이다.” <span class="en">I will ( ) ( ) ( ) swim next year.</span>', '<span class="en">be able to</span> — will과 can은 같이 못 써요.'],
    ['우리말에 맞게: “일찍 잤어야 했는데.” <span class="en">I ( ) ( ) ( ) to bed early.</span>', '<span class="en">should have gone</span>'],
  ],
});
})();
