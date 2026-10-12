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
          ['부정대명사', '정해지지 않은 사람·것', '<span class="en">one, another, other</span>'],
          ['수량대명사', '수나 양을 나타내며 혼자 쓰임', '<span class="en">some, any, many, much, all, both, each</span>'],
          ['의문대명사', '물어볼 때', '<span class="en">who, what, which, whose</span>'],
          ['관계대명사', '두 문장을 이으면서 앞의 명사를 대신', '<span class="en">who, which, that, whose, what</span>'],
        ])}
      `,
    },
    {
      id: 'personal', title: '인칭대명사 변신표 (격 변화)', en: 'Personal pronouns',
      html: `
        <p>인칭대명사는 <b>문장 속 자리</b>에 따라 옷을 갈아입어요. 이 표는 영어의 구구단이에요. 소리 내어 여러 번 읽어 보세요!</p>
        ${H.table(['', '주격<br>~은/는/이/가', '소유격(소유형용사)<br>~의', '목적격<br>~을/를/에게', '소유대명사<br>~의 것', '재귀대명사<br>~자신'], [
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
        ${H.box('tip', '<b>주격</b>은 동사 앞(주인공 자리), <b>목적격</b>은 동사나 전치사 뒤, <b>소유격</b>은 명사 앞에 와요. 소유격은 명사를 꾸며 주기 때문에 <b>소유형용사</b>라고도 불러요.<br><span class="en"><b>She</b> likes <b>me</b>. I like <b>her</b> smile.</span>')}
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
      id: 'mine', title: '소유격(소유형용사) vs 소유대명사', en: 'my book = mine',
      html: `
        <p><b>소유격(소유형용사)</b> <span class="en">my, your, his, her, its, our, their</span>는 혼자 못 서고 <b>꼭 뒤에 명사</b>를 데리고 다녀요. 명사를 꾸미니까 형용사처럼 일하는 거예요.</p>
        <p><b>소유대명사</b> <span class="en">mine, yours, his, hers, ours, theirs</span>는 “<b>소유격 + 명사</b>”를 한 단어로 줄인 대명사라서 혼자 설 수 있어요.</p>
        ${H.table(['소유격(소유형용사) + 명사', '=', '소유대명사'], [
          ['<span class="en">my book</span>', '=', '<span class="en">mine</span>'],
          ['<span class="en">your book</span>', '=', '<span class="en">yours</span>'],
          ['<span class="en">his book</span>', '=', '<span class="en">his</span> (모양이 같아요)'],
          ['<span class="en">her book</span>', '=', '<span class="en">hers</span>'],
          ['<span class="en">our / their book</span>', '=', '<span class="en">ours / theirs</span>'],
        ])}
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
      id: 'this', title: '지시대명사와 지시형용사', en: 'this / that / these / those',
      html: `
        ${H.table(['', '가까이 👇', '멀리 👉'], [
          ['하나', '<span class="en"><b>this</b></span> 이것', '<span class="en"><b>that</b></span> 저것'],
          ['여럿', '<span class="en"><b>these</b></span> 이것들', '<span class="en"><b>those</b></span> 저것들'],
        ])}
        <p>같은 <span class="en">this, that, these, those</span>라도 쓰임에 따라 이름이 달라요.</p>
        ${H.table(['', '지시대명사', '지시형용사'], [
          ['모양', '<b>혼자</b> 쓰여 명사를 대신', '<b>뒤에 명사</b>가 와서 그 명사를 꾸밈'],
          ['예', '<span class="en"><b>This</b> is my pen.</span><br>이것은 내 펜이다.', '<span class="en"><b>This pen</b> is mine.</span><br>이 펜은 내 것이다.'],
          ['예', '<span class="en">I like <b>those</b>.</span><br>나는 저것들이 좋아.', '<span class="en">I like <b>those shoes</b>.</span><br>나는 저 신발이 좋아.'],
        ])}
        ${H.box('tip', '여럿을 가리키면 동사도 복수! <span class="en">This <b>is</b> my pen. These <b>are</b> my pens.</span><br>지시형용사도 뒤 명사의 수에 맞춰요: <span class="en">this book → <b>these</b> books</span>')}
        ${H.box('more', '전화할 때 “저는 ~예요”는 <span class="en">This is Mina.</span>, “누구세요?”는 <span class="en">Who is this?</span> 라고 해요. <span class="en">I am Mina.</span>라고 하지 않아요!')}
      `,
      examples: [
        ['<b>This</b> is my best friend, Yuna.', '이 아이는 내 단짝 유나야.'],
        ['<b>Those</b> are my grandpa’s glasses.', '저것들은 우리 할아버지의 안경이에요. (지시대명사)'],
        ['<b>That</b> bike is really cool!', '저 자전거 진짜 멋지다! (지시형용사)'],
        ['Are <b>these</b> your socks?', '이거 네 양말이야?'],
      ],
    },
    {
      id: 'it', title: '비인칭 주어 it', en: 'It is sunny.',
      html: `
        <p>영어 문장에는 <b>주어가 꼭 있어야</b> 해요. 그런데 날씨, 시간, 날짜, 거리, 밝기를 말할 땐 마땅한 주인공이 없죠. 그럴 때 <span class="en"><b>it</b></span>이 대신 주어 자리를 채워 줘요. 이런 <span class="en">it</span>을 <b>비인칭 주어</b>라고 해요. 이 <span class="en">it</span>은 “그것”이라고 <span class="mark">해석하지 않아요</span>.</p>
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
        title: '대타 주어 it (비인칭 주어)',
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
      id: 'one', title: '부정대명사와 수량대명사', en: 'one, another, some, many …',
      html: `
        <p><span class="en">one</span>은 앞에 나온 명사와 <b>같은 종류의 아무거나 하나</b>를 말해요. <span class="en">it</span>은 <b>바로 그 물건</b>이에요.</p>
        <p class="en">I lost my pencil. I need to buy a new <b>one</b>. (같은 종류의 새 연필)<br>I lost my pencil. I can’t find <b>it</b>. (잃어버린 바로 그 연필)</p>
        ${H.table(['개수', '표현'], [
          ['2개 중', '<span class="en"><b>One</b> is red, and <b>the other</b> is blue.</span> 하나는 빨강, 나머지 하나는 파랑.'],
          ['3개 중', '<span class="en"><b>One</b> is ~, <b>another</b> is ~, and <b>the other</b> is ~.</span>'],
          ['여럿 중', '<span class="en"><b>Some</b> like dogs, and <b>others</b> like cats.</span> 어떤 사람들은 개를, 다른 사람들은 고양이를 좋아해.'],
        ])}
        <p><b>수량대명사</b>: <span class="en">some, any, many, much, all, both, each</span>가 <b>뒤에 명사 없이 혼자</b> 쓰이면 수량대명사예요. 뒤에 명사가 오면 <b>수량형용사</b>(형용사 탭)예요.</p>
        ${H.table(['', '수량형용사 (+ 명사)', '수량대명사 (혼자)'], [
          ['many', '<span class="en"><b>Many students</b> like K-pop.</span>', '<span class="en"><b>Many</b> of them like K-pop.</span>'],
          ['some', '<span class="en">I want <b>some cookies</b>.</span>', '<span class="en">I want <b>some</b>.</span>'],
          ['both', '<span class="en"><b>Both girls</b> are tall.</span>', '<span class="en"><b>Both</b> are tall.</span>'],
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
    {
      id: 'relative', title: '관계대명사 who / which / that', en: 'Relative pronouns',
      html: `
        <p>“나는 친구가 있어. 그 친구는 제주에 살아.” 이렇게 두 문장으로 말하면 뚝뚝 끊기죠? <b>관계대명사</b>를 쓰면 “나는 <b>제주에 사는</b> 친구가 있어.”처럼 한 문장으로 이을 수 있어요.</p>
        <p>관계대명사는 <span class="mark">1인 2역</span>을 해요. ① 두 문장을 <b>이어 주는 접속사</b> 역할 + ② 앞에 나온 명사를 <b>대신하는 대명사</b> 역할. 이때 관계대명사가 대신하는 앞의 명사를 <b>선행사</b>(앞에 가는 말)라고 불러요.</p>
        ${H.formula('선행사(명사)', '+', '*관계대명사', '+', '나머지 문장')}
        ${H.table(['선행사', '주격 (~은/는/이/가)', '소유격 (~의)', '목적격 (~을/를)'], [
          ['사람 👧', '<span class="en"><b>who</b></span>', '<span class="en"><b>whose</b></span>', '<span class="en"><b>who(m)</b></span>'],
          ['사물·동물 🐶📦', '<span class="en"><b>which</b></span>', '<span class="en"><b>whose</b></span>', '<span class="en"><b>which</b></span>'],
          ['사람·사물 모두', '<span class="en"><b>that</b></span>', '-', '<span class="en"><b>that</b></span>'],
        ])}
        <p><b>두 문장 잇기 3단계</b></p>
        <ol>
          <li>두 문장에서 <b>같은 사람/물건</b>을 찾는다. → <span class="en">a friend</span> = <span class="en">She</span></li>
          <li>뒤 문장의 그 말을 알맞은 관계대명사로 바꾼다. → 사람 + 주격이니까 <span class="en">She → who</span></li>
          <li>관계대명사를 선행사 바로 뒤에 붙인다. → <span class="en">I have a friend <b>who</b> lives in Jeju.</span></li>
        </ol>
        ${H.box('tip', '관계대명사가 이끄는 부분(<span class="en">who lives in Jeju</span>)은 앞의 명사를 <b>뒤에서 꾸며 줘요</b>. 형용사처럼 일하기 때문에 <b>형용사절</b>이라고도 해요.')}
        ${H.box('warn', '관계대명사가 대신한 말은 뒤 문장에서 빠져야 해요. <span class="strike en">the girl who she lives next door</span> → <span class="en">the girl who lives next door</span>')}
      `,
      examples: [
        ['I have a friend <b>who</b> lives in Jeju.', '나는 제주에 사는 친구가 있어요. (주격 who)'],
        ['This is the dog <b>which</b> saved the boy.', '이 개가 그 소년을 구한 개예요. (주격 which)'],
        ['The cake <b>(that)</b> Mom made was yummy.', '엄마가 만든 케이크는 맛있었어요. (목적격 that)'],
        ['I know a girl <b>whose</b> dad is a pilot.', '나는 아빠가 비행기 조종사인 여자아이를 알아요. (소유격 whose)'],
      ],
      toon: {
        title: '두 문장을 잇는 1인 2역, who',
        panels: [
          { bg: 'sky', narr: '두 문장이 따로따로 서 있어요. 둘 다 같은 친구 이야기인데…',
            cast: [{ w: 'a friend', c: 'green', m: 'happy', say: '나는 첫 문장 끝에 있어.' }, { w: 'She', c: 'pink', m: 'sad', say: '나는 둘째 문장 맨 앞. 우리 같은 사람인데 떨어져 있네…' }],
            line: 'I have a friend. / She lives in Jeju.' },
          { bg: 'sun', narr: '그때 관계대명사 who가 나타났어요.', fx: '등장!',
            cast: [{ w: 'who', c: 'purple', m: 'cool', st: 'jump', say: '내가 She 자리를 맡을게! 나는 두 문장을 잇는 접속사 + She를 대신하는 대명사, 1인 2역이야.' }] },
          { bg: 'lav', narr: 'She는 who와 자리를 바꿨어요. 선행사가 <b>사람</b>이고, She가 <b>주어(주격)</b>였으니까 who!',
            cast: [{ w: 'She', c: 'pink', m: 'happy', st: 'ghost', say: '잘 부탁해~' }, { arrow: '➜' }, { w: 'who', c: 'purple', m: 'happy' }] },
          { bg: 'mint', narr: 'who가 선행사 바로 뒤에 붙어서 한 문장 완성! who 뒤 내용이 friend를 꾸며 줘요.',
            cast: [{ w: 'a friend', c: 'green', m: 'love', say: '“제주에 사는” 친구가 됐어!' }, { w: 'who', c: 'purple', m: 'cool' }, { w: 'lives', c: 'orange', m: 'happy' }, { w: 'in Jeju', c: 'teal', m: 'happy', st: 'small' }],
            line: { t: 'I have a friend <u>who</u> lives in Jeju.', ok: true } },
          { bg: 'rose', narr: '선행사가 사람이 아니라 <b>물건</b>이면 which를 불러요. that은 둘 다 OK!',
            cast: [{ w: 'the cake', c: 'yellow', m: 'happy' }, { w: 'which', c: 'blue', m: 'cool', say: '물건·동물 담당은 나!' }, { w: 'that', c: 'gray', m: 'smug', say: '난 사람, 물건 다 돼~' }],
            line: { t: 'the cake <u>which</u> Mom made', ok: true } },
        ],
      },
    },
    {
      id: 'relative-more', title: '관계대명사 더 알아보기', en: 'what, whose, omission …',
      html: `
        ${H.table(['규칙', '설명', '예'], [
          ['목적격은 생략 가능', '목적격 관계대명사(<span class="en">who(m), which, that</span>)는 빼도 돼요.', '<span class="en">This is the book <b>(which)</b> I bought.</span>'],
          ['소유격 whose', '“~의”를 이어 줄 때. 뒤에 명사가 와요.', '<span class="en">I have a cat <b>whose</b> tail is short.</span> 꼬리가 짧은 고양이'],
          ['what = the thing which', '선행사를 품고 있어서 <b>앞에 선행사가 없어요</b>. “~하는 것”', '<span class="en"><b>What</b> I want is a puppy.</span> 내가 원하는 것은 강아지야.'],
          ['that을 주로 쓸 때', '선행사가 <b>사람+동물</b>, <b>-thing</b>, <b>최상급</b>, <b>the only</b>, <b>all</b>일 때', '<span class="en">Tell me everything <b>that</b> you know.</span>'],
          ['전치사 + 관계대명사', '전치사가 관계대명사 앞으로 올 수 있어요. 이때 that은 ✕', '<span class="en">the house <b>in which</b> I live</span> = <span class="en">the house which I live <b>in</b></span>'],
        ])}
        ${H.box('warn', '<span class="en">what</span>은 선행사를 이미 품고 있어서 앞에 명사가 오면 안 돼요. <span class="strike en">the thing what I want</span> → <span class="en">the thing <b>that</b> I want</span> 또는 <span class="en"><b>what</b> I want</span>')}
        ${H.box('tip', '<b>의문대명사</b> who와 <b>관계대명사</b> who 구별하기: 질문하면 의문대명사(<span class="en">Who is he?</span>), 앞의 명사를 꾸며 주면 관계대명사(<span class="en">the boy who is tall</span>)예요.')}
        ${H.box('more', `<b>계속적 용법</b>: 관계대명사 앞에 쉼표(,)를 찍으면 앞 문장에 “그런데 그 사람은…” 하고 설명을 덧붙여요. 이때 that은 쓸 수 없어요.<br><span class="en">I have a brother<b>, who</b> is a doctor.</span> 나는 형이 하나 있는데, 그는 의사야.<br><b>복합관계대명사</b>: <span class="en">whoever</span>(누구든), <span class="en">whatever</span>(무엇이든) <span class="en"><b>Whoever</b> comes first will win.</span>`)}
      `,
      examples: [
        ['The movie <b>(that)</b> we watched was scary.', '우리가 본 영화는 무서웠어요. (목적격 생략)'],
        ['This is <b>what</b> I made for you.', '이게 내가 너를 위해 만든 거야.'],
        ['He is the tallest boy <b>that</b> I know.', '그는 내가 아는 가장 키 큰 남자아이예요.'],
        ['The man <b>who</b> lives next door <b>is</b> a chef.', '옆집에 사는 남자는 요리사예요. (동사는 선행사 the man에 맞춰 is)'],
      ],
    },
  ],
  quiz: [
    ['알맞은 것을 고르세요: <span class="en">This is (my / mine) bike. The bike is (my / mine).</span>', '<span class="en">my</span> / <span class="en">mine</span> — 명사 앞엔 소유격, 혼자 쓸 땐 소유대명사.'],
    ['틀린 곳을 고치세요: <span class="en">My dad loves I.</span>', '동사 뒤는 목적격 → <span class="en">My dad loves <b>me</b>.</span>'],
    ['빈칸: <span class="en">( ) is snowing outside.</span>', '<span class="en">It</span> — 날씨를 말하는 비인칭 주어예요.'],
    ['빈칸: <span class="en">He cut ( ) with a knife.</span> (그는 칼에 베였다)', '<span class="en">himself</span> — 주어와 목적어가 같은 사람이에요.'],
    ['두 문장을 관계대명사로 이으세요: <span class="en">I have an uncle. He lives in Canada.</span>', '<span class="en">I have an uncle <b>who</b> lives in Canada.</span> — 선행사가 사람, 주격.'],
    ['빈칸: <span class="en">This is the bag ( ) my mom bought.</span>', '<span class="en">which</span> 또는 <span class="en">that</span> (목적격이라 생략도 가능)'],
    ['알맞은 것: <span class="en">(What / That) I need is sleep.</span>', '<span class="en">What</span> — 선행사가 없고 “~하는 것”이에요.'],
    ['밑줄 친 말의 이름은? <span class="en"><u>This</u> cap is mine.</span> / <span class="en"><u>This</u> is mine.</span>', '앞은 <b>지시형용사</b>(뒤에 명사 cap), 뒤는 <b>지시대명사</b>(혼자 쓰임).'],
  ],
});
