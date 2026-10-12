GRAMMAR.push({
  id: 'pronoun', name: '대명사', en: 'Pronoun', icon: '🙋', color: '#f2558f',
  intro: '대명사는 명사를 <b>대신</b>하는 말이에요. “민수는… 민수가… 민수를…” 하고 계속 이름을 부르면 지루하죠? 그럴 때 <span class="en">he, him, his</span> 같은 대명사가 대신 나와 줘요.',
  sections: [
    {
      id: 'what', title: '대명사는 왜 필요할까?', en: 'Why pronouns?',
      html: `
        <p>아래 두 문장을 비교해 보세요.</p>
        <p class="en">😵 Minsu has a dog. Minsu loves Minsu's dog. Minsu walks Minsu's dog every day.</p>
        <p class="en">😊 Minsu has a dog. <b>He</b> loves <b>his</b> dog. <b>He</b> walks <b>it</b> every day.</p>
        <p>두 번째가 훨씬 자연스럽죠? 앞에 나온 명사를 다시 부를 때 대명사를 쓰면 문장이 깔끔해져요.</p>
        ${H.table(['대명사 종류', '하는 일', '예'], [
          ['인칭대명사', '사람·사물을 대신', '<span class="en">I, you, he, she, it, we, they</span>'],
          ['지시대명사', '“이것/저것”처럼 가리킴', '<span class="en">this, that, these, those</span>'],
          ['재귀대명사', '“자기 자신”', '<span class="en">myself, yourself, himself …</span>'],
          ['부정대명사', '정해지지 않은 사람·것', '<span class="en">one, some, any, another, other</span>'],
          ['의문대명사', '물어볼 때', '<span class="en">who, what, which, whose</span>'],
        ])}
      `,
    },
    {
      id: 'personal', title: '인칭대명사 변신표 (격 변화)', en: 'Personal pronouns',
      html: `
        <p>인칭대명사는 <b>문장 속 자리</b>에 따라 옷을 갈아입어요. 이 표는 영어의 구구단이에요. 소리 내어 여러 번 읽어 보세요!</p>
        ${H.table(['', '주격<br>~은/는/이/가', '소유격<br>~의', '목적격<br>~을/를/에게', '소유대명사<br>~의 것', '재귀대명사<br>~자신'], [
          ['나', '<b class="en">I</b>', '<span class="en">my</span>', '<span class="en">me</span>', '<span class="en">mine</span>', '<span class="en">myself</span>'],
          ['너', '<b class="en">you</b>', '<span class="en">your</span>', '<span class="en">you</span>', '<span class="en">yours</span>', '<span class="en">yourself</span>'],
          ['그', '<b class="en">he</b>', '<span class="en">his</span>', '<span class="en">him</span>', '<span class="en">his</span>', '<span class="en">himself</span>'],
          ['그녀', '<b class="en">she</b>', '<span class="en">her</span>', '<span class="en">her</span>', '<span class="en">hers</span>', '<span class="en">herself</span>'],
          ['그것', '<b class="en">it</b>', '<span class="en">its</span>', '<span class="en">it</span>', '-', '<span class="en">itself</span>'],
          ['우리', '<b class="en">we</b>', '<span class="en">our</span>', '<span class="en">us</span>', '<span class="en">ours</span>', '<span class="en">ourselves</span>'],
          ['너희', '<b class="en">you</b>', '<span class="en">your</span>', '<span class="en">you</span>', '<span class="en">yours</span>', '<span class="en">yourselves</span>'],
          ['그들/그것들', '<b class="en">they</b>', '<span class="en">their</span>', '<span class="en">them</span>', '<span class="en">theirs</span>', '<span class="en">themselves</span>'],
        ])}
        ${H.table(['인칭', '뜻', '해당하는 말'], [
          ['1인칭', '말하는 나(우리)', '<span class="en">I, we</span>'],
          ['2인칭', '듣는 너(너희)', '<span class="en">you</span>'],
          ['3인칭', '나와 너를 뺀 <b>나머지 전부</b>', '<span class="en">he, she, it, they, Tom, my dog, the book …</span>'],
        ])}
        ${H.box('tip', '<b>주격</b>은 동사 앞(주인공 자리), <b>목적격</b>은 동사나 전치사 뒤, <b>소유격</b>은 명사 앞에 와요.<br><span class="en"><b>She</b> likes <b>me</b>. I like <b>her</b> smile.</span>')}
      `,
      examples: [
        ['<b>I</b> love <b>my</b> family.', '나는 우리 가족을 사랑해요.'],
        ['Mom hugged <b>me</b>.', '엄마가 나를 안아 주셨어요.'],
        ['<b>We</b> visited <b>our</b> grandma. <b>She</b> was happy to see <b>us</b>.', '우리는 할머니 댁에 갔어요. 할머니는 우리를 보고 기뻐하셨어요.'],
        ['Look at the cat. <b>Its</b> eyes are green.', '저 고양이 봐. 그것의 눈은 초록색이야.'],
        ['Come with <b>I</b>.', '→ <span class="en">Come with <b>me</b>.</span> 전치사 뒤는 목적격!', 'x'],
      ],
      toon: {
        title: 'I는 동사 뒤로 가면 me로 갈아입어요',
        panels: [
          { bg: 'rose', narr: '<b>I</b>는 늘 문장 맨 앞, 주인공 자리에 서 있어요.',
            cast: [{ w: 'I', c: 'pink', m: 'cool', hat: '👑', say: '나는 주인공! 동사 앞이 내 자리야.' }, { w: 'love', c: 'red', m: 'happy' }, { w: 'Mom', c: 'yellow', m: 'happy' }],
            line: { t: '<u>I</u> love Mom.', ok: true } },
          { bg: 'rose', narr: '이번엔 엄마가 주인공이 되었어요. I가 동사 뒤로 밀려났는데…',
            cast: [{ w: 'Mom', c: 'yellow', m: 'happy', hat: '👑' }, { w: 'loves', c: 'red', m: 'surprised', say: '어? 너 왜 주인공 옷을 입고 내 뒤에 있어?' }, { w: 'I', c: 'pink', m: 'sad', hat: '👑', say: '어… 어색해…' }],
            line: { t: 'Mom loves <s>I</s>.', ok: false } },
          { bg: 'lav', narr: '동사 뒤(목적어 자리)에서는 <b>목적격 옷</b>으로 갈아입어야 해요.', fx: '변신!',
            cast: [{ w: 'I', c: 'pink', m: 'surprised', st: 'ghost' }, { arrow: '➜' }, { w: 'me', c: 'pink', m: 'love', say: '목적격 옷 입었다! 이제 딱 맞아.' }] },
          { bg: 'mint', narr: '전치사 뒤도 마찬가지! 동사·전치사 뒤는 모두 목적격이에요.',
            cast: [{ w: 'Mom', c: 'yellow', m: 'happy' }, { w: 'loves', c: 'red', m: 'happy' }, { w: 'me', c: 'pink', m: 'love' }],
            line: { t: 'Mom loves <u>me</u>. / Play with <u>me</u>!', ok: true } },
        ],
      },
    },
    {
      id: 'mine', title: '소유격 vs 소유대명사 (my vs mine)', en: 'my book = mine',
      html: `
        <p><span class="en">my</span>는 혼자 못 서고 <b>꼭 뒤에 명사</b>를 데리고 다녀요. <span class="en">mine</span>은 “<b>my + 명사</b>”를 한 단어로 줄인 거라서 혼자 설 수 있어요.</p>
        ${H.formula('my book', '=', '*mine')}${H.formula('her bag', '=', '*hers')}
        ${H.box('warn', '<span class="strike en">This is mine book.</span> → <span class="en">This is <b>my</b> book.</span> 또는 <span class="en">This book is <b>mine</b>.</span>')}
      `,
      examples: [
        ['Is this <b>your</b> umbrella? — Yes, it’s <b>mine</b>.', '이거 네 우산이야? — 응, 내 거야.'],
        ['My shoes are white, and <b>hers</b> are pink.', '내 신발은 하얀색이고, 그녀의 것은 분홍색이야.'],
        ['That house is not <b>theirs</b>. It’s <b>ours</b>!', '저 집은 그들의 것이 아니야. 우리 거야!'],
      ],
    },
    {
      id: 'self', title: '재귀대명사 (나 자신)', en: 'myself, yourself …',
      html: `
        <p>주어와 목적어가 <span class="mark">같은 사람</span>일 때는 목적격 대신 <span class="en">-self / -selves</span>를 써요. 동작이 자기에게 다시 “돌아오는(재귀)” 거예요.</p>
        <p class="en">I love <b>me</b>. ✕ → I love <b>myself</b>. ⭕</p>
        <p>또 “직접, 스스로”라고 강조할 때도 써요. <span class="en">I made it <b>myself</b>.</span> (내가 직접 만들었어.)</p>
        ${H.table(['표현', '뜻'], [
          ['<span class="en">by myself</span>', '나 혼자서'],
          ['<span class="en">enjoy yourself</span>', '즐거운 시간을 보내다'],
          ['<span class="en">help yourself</span>', '마음껏 드세요'],
          ['<span class="en">hurt myself</span>', '(나) 다치다'],
        ])}
      `,
      examples: [
        ['She looked at <b>herself</b> in the mirror.', '그녀는 거울 속 자신을 바라보았어요.'],
        ['Did you make this cake <b>yourself</b>?', '이 케이크 네가 직접 만들었어?'],
        ['There are cookies on the table. <b>Help yourself</b>!', '탁자에 쿠키가 있어. 마음껏 먹어!'],
        ['I went to the library <b>by myself</b>.', '나는 혼자서 도서관에 갔어요.'],
      ],
    },
    {
      id: 'this', title: '지시대명사 this / that / these / those', en: 'Demonstratives',
      html: `
        ${H.table(['', '가까이 👇', '멀리 👉'], [
          ['하나', '<span class="en"><b>this</b></span> 이것', '<span class="en"><b>that</b></span> 저것'],
          ['여럿', '<span class="en"><b>these</b></span> 이것들', '<span class="en"><b>those</b></span> 저것들'],
        ])}
        ${H.box('tip', '여럿을 가리키면 동사도 복수! <span class="en">This <b>is</b> my pen. These <b>are</b> my pens.</span>')}
        ${H.box('more', '전화할 때 “저는 ~예요”는 <span class="en">This is Mina.</span>, “누구세요?”는 <span class="en">Who is this?</span> 라고 해요. <span class="en">I am Mina.</span>라고 하지 않아요!')}
      `,
      examples: [
        ['<b>This</b> is my best friend, Yuna.', '이 아이는 내 단짝 유나야.'],
        ['<b>Those</b> are my grandpa’s glasses.', '저것들은 우리 할아버지의 안경이에요.'],
        ['Are <b>these</b> your socks?', '이거 네 양말이야?'],
      ],
    },
    {
      id: 'it', title: '아무 뜻 없는 it (비인칭 주어)', en: 'It is sunny.',
      html: `
        <p>영어 문장에는 <b>주어가 꼭 있어야</b> 해요. 그런데 날씨, 시간, 날짜, 거리, 밝기를 말할 땐 마땅한 주인공이 없죠. 그럴 때 <span class="en"><b>it</b></span>이 대신 주어 자리를 채워 줘요. 이 <span class="en">it</span>은 “그것”이라고 <span class="mark">해석하지 않아요</span>.</p>
        ${H.table(['쓰임', '예', '뜻'], [
          ['날씨', '<span class="en">It is raining.</span>', '비가 와요.'],
          ['시간', '<span class="en">It is 3 o’clock.</span>', '3시예요.'],
          ['요일·날짜', '<span class="en">It is Friday. It is May 5th.</span>', '금요일이에요. 5월 5일이에요.'],
          ['계절', '<span class="en">It is spring.</span>', '봄이에요.'],
          ['거리', '<span class="en">It is 2 km to the park.</span>', '공원까지 2km예요.'],
          ['명암', '<span class="en">It is dark outside.</span>', '밖이 어두워요.'],
        ])}
      `,
      examples: [
        ['<b>It</b> is cold and windy today.', '오늘은 춥고 바람이 불어요.'],
        ['What time is <b>it</b>? — <b>It</b>’s half past seven.', '몇 시야? — 7시 반이야.'],
        ['How far is <b>it</b> to your school?', '너희 학교까지 얼마나 멀어?'],
      ],
      toon: {
        title: '대타 주어 it',
        panels: [
          { bg: 'sky', narr: '오늘은 비가 와요. 문장을 만들어야 하는데…',
            cast: [{ w: 'is', c: 'teal', m: 'surprised', say: '“비가 온다”의 주어가 누구야? 하늘? 구름?' }, { w: 'raining', c: 'blue', m: 'sad', say: '주인공 자리가 비어 있으면 문장이 안 돼!' }],
            line: { t: '<s>___ is raining.</s>', ok: false } },
          { bg: 'sun', narr: '그때 등장한 해결사!', fx: '출동!',
            cast: [{ w: 'it', c: 'gray', m: 'cool', st: 'jump', say: '걱정 마! 내가 대신 서 줄게. 나는 뜻은 없지만 자리는 채울 수 있지!' }] },
          { bg: 'mint', narr: 'it 덕분에 문장 완성! 해석은 “그것은”이 아니라 그냥 “비가 와요”.',
            cast: [{ w: 'It', c: 'gray', m: 'smug', hat: '🧢' }, { w: 'is', c: 'teal', m: 'happy' }, { w: 'raining', c: 'blue', m: 'happy' }],
            line: { t: '<u>It</u> is raining.', ok: true } },
          { bg: 'night', narr: 'it은 시간, 요일, 거리 담당도 하느라 바빠요.',
            cast: [{ w: 'It', c: 'gray', m: 'dizzy', say: 'It is 9 p.m. It is Monday. It is dark… 아이고 바쁘다!' }, { e: '🕘' }] },
        ],
      },
    },
    {
      id: 'one', title: 'one, another, the other', en: 'Indefinite pronouns',
      html: `
        <p><span class="en">one</span>은 앞에 나온 명사와 <b>같은 종류의 아무거나 하나</b>를 말해요. <span class="en">it</span>은 <b>바로 그 물건</b>이에요.</p>
        <p class="en">I lost my pencil. I need to buy a new <b>one</b>. (같은 종류의 새 연필)<br>I lost my pencil. I can’t find <b>it</b>. (잃어버린 바로 그 연필)</p>
        ${H.table(['개수', '표현'], [
          ['2개 중', '<span class="en"><b>One</b> is red, and <b>the other</b> is blue.</span> 하나는 빨강, 나머지 하나는 파랑.'],
          ['3개 중', '<span class="en"><b>One</b> is ~, <b>another</b> is ~, and <b>the other</b> is ~.</span>'],
          ['여럿 중', '<span class="en"><b>Some</b> like dogs, and <b>others</b> like cats.</span> 어떤 사람들은 개를, 다른 사람들은 고양이를 좋아해.'],
        ])}
        ${H.box('tip', '<span class="en">some</span>은 주로 긍정문, <span class="en">any</span>는 부정문·의문문에 써요. <span class="en">I have some candy. Do you have any candy? I don’t have any.</span>')}
      `,
      examples: [
        ['I have two brothers. <b>One</b> is ten, and <b>the other</b> is seven.', '나는 남동생이 둘 있어. 한 명은 열 살, 다른 한 명은 일곱 살이야.'],
        ['This cup is dirty. Can I have <b>another</b>?', '이 컵 더러워요. 다른 거 하나 주실래요?'],
        ['Do you have <b>any</b> questions?', '질문 있나요?'],
      ],
    },
    {
      id: 'wh', title: '의문대명사 who / what / which / whose', en: 'Question pronouns',
      html: H.table(['의문사', '묻는 것', '예'], [
        ['<span class="en">who</span>', '누구', '<span class="en">Who is that boy?</span> 저 남자아이는 누구야?'],
        ['<span class="en">what</span>', '무엇', '<span class="en">What is your name?</span> 이름이 뭐야?'],
        ['<span class="en">which</span>', '(정해진 것 중) 어느 것', '<span class="en">Which do you want, milk or juice?</span>'],
        ['<span class="en">whose</span>', '누구의 (것)', '<span class="en">Whose bag is this?</span> 이거 누구 가방이야?'],
      ]),
    },
  ],
  quiz: [
    ['알맞은 것을 고르세요: <span class="en">This is (my / mine) bike. The bike is (my / mine).</span>', '<span class="en">my</span> / <span class="en">mine</span> — 명사 앞엔 소유격, 혼자 쓸 땐 소유대명사.'],
    ['틀린 곳을 고치세요: <span class="en">My dad loves I.</span>', '동사 뒤는 목적격 → <span class="en">My dad loves <b>me</b>.</span>'],
    ['빈칸: <span class="en">( ) is snowing outside.</span>', '<span class="en">It</span> — 날씨를 말하는 비인칭 주어예요.'],
    ['빈칸: <span class="en">He cut ( ) with a knife.</span> (그는 칼에 베였다)', '<span class="en">himself</span> — 주어와 목적어가 같은 사람이에요.'],
  ],
});
