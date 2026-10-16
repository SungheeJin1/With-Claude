GRAMMAR.push({
  id: 'noun', name: '명사', en: 'Noun', icon: '🍎', color: '#ff7a59',
  intro: '명사는 세상 모든 것의 <b>이름</b>이에요. 사람, 동물, 물건, 장소, 그리고 눈에 보이지 않는 마음까지! 이름이 있는 건 모두 명사랍니다.',
  sections: [
    {
      id: 'what', title: '명사란 무엇일까요?', en: 'What is a noun?',
      unscramble: [
        { ko: "지민이는 부산에 살아요.", words: ["lives", "Busan", "Jimin", "in"], answer: "Jimin lives in Busan." },
        { ko: "우리 개는 뼈다귀를 좋아해요.", words: ["likes", "my", "bones", "dog"], answer: "My dog likes bones." },
        { ko: "사랑은 사람들을 행복하게 해요.", words: ["happy", "makes", "love", "people"], answer: "Love makes people happy." },
      ],
      html: `
        <p>여러분 이름이 있죠? 연필에도, 학교에도, 강아지에게도 이름이 있어요. 이렇게 <span class="mark">무언가를 부르는 이름</span>이 바로 명사예요.</p>
        ${H.table(['종류', '뜻', '예'], [
          ['보통명사', '같은 종류를 두루 부르는 이름', '<span class="en">dog, book, teacher, school</span>'],
          ['고유명사', '세상에 하나뿐인 특별한 이름 → <b>첫 글자는 항상 대문자!</b>', '<span class="en">Minsu, Seoul, Korea, Monday, July</span>'],
          ['집합명사', '여럿이 모인 무리의 이름', '<span class="en">family, class, team</span>'],
          ['물질명사', '모양이 정해지지 않은 재료의 이름', '<span class="en">water, milk, bread, paper, sugar</span>'],
          ['추상명사', '눈에 안 보이는 생각·마음의 이름', '<span class="en">love, peace, happiness, hope</span>'],
        ])}
        ${H.box('tip', '요일(Monday), 달(July), 나라(Korea), 언어(English), 사람 이름(Jimin)은 고유명사라서 문장 중간에 와도 <b>대문자</b>로 시작해요.')}
      `,
      examples: [
        ['My <b>dog</b> likes <b>bones</b>.', '우리 개는 뼈다귀를 좋아해요.'],
        ['<b>Jimin</b> lives in <b>Busan</b>.', '지민이는 부산에 살아요.'],
        ['<b>Love</b> makes people happy.', '사랑은 사람들을 행복하게 해요.'],
      ],
    },
    {
      id: 'count', title: '셀 수 있는 명사 vs 셀 수 없는 명사', en: 'Countable / Uncountable',
      unscramble: [
        { ko: "물 한 잔 마실 수 있을까요?", words: ["a", "water", "I", "of", "can", "glass", "have"], answer: "Can I have a glass of water?" },
        { ko: "엄마가 주스 세 병을 사셨어요.", words: ["juice", "bought", "of", "three", "Mom", "bottles"], answer: "Mom bought three bottles of juice." },
        { ko: "나는 오늘 숙제가 많아요.", words: ["homework", "a", "today", "have", "of", "lot", "I"], answer: "I have a lot of homework today.", alt: ["Today I have a lot of homework."] },
      ],
      html: `
        <p>영어는 명사를 <b>“하나, 둘 셀 수 있느냐?”</b>로 두 팀으로 나눠요. 이게 아주 중요해요. 왜냐하면 팀에 따라 <span class="en">a/an</span>을 붙일 수 있는지, <span class="en">-s</span>를 붙일 수 있는지가 달라지거든요.</p>
        ${H.table(['', '셀 수 있는 명사 🍎', '셀 수 없는 명사 💧'], [
          ['예', '<span class="en">apple, cat, book, chair, friend</span>', '<span class="en">water, milk, juice, bread, rice, money, homework, information, love</span>'],
          ['하나일 때', '<span class="en"><b>a</b>n apple, <b>a</b> cat</span>', '<span class="en">water</span> (a ✕)'],
          ['여러 개일 때', '<span class="en">apple<b>s</b>, cat<b>s</b></span>', '<span class="en">water</span> (-s ✕)'],
          ['많은', '<span class="en">many apples</span>', '<span class="en">much water</span>'],
        ])}
        <p>셀 수 없는 명사는 <b>담는 그릇이나 단위</b>를 빌려서 세요. 그릇은 셀 수 있으니까 그릇에 -s를 붙여요!</p>
        ${H.table(['단위', '예', '뜻'], [
          ['a glass of', '<span class="en">a glass of milk → two glass<b>es</b> of milk</span>', '우유 한 잔 → 두 잔'],
          ['a cup of', '<span class="en">a cup of tea</span>', '차 한 잔'],
          ['a bottle of', '<span class="en">a bottle of water</span>', '물 한 병'],
          ['a piece of', '<span class="en">a piece of cake / paper / advice</span>', '케이크 한 조각 / 종이 한 장 / 충고 한마디'],
          ['a slice of', '<span class="en">a slice of pizza / bread</span>', '피자 한 조각 / 빵 한 조각(얇게 썬 것)'],
          ['a loaf of', '<span class="en">a loaf of bread → two <b>loaves</b> of bread</span>', '빵 한 덩어리 → 두 덩어리 (loaf의 복수는 loaves)'],
          ['a bowl of', '<span class="en">a bowl of rice / soup</span>', '밥 한 공기 / 수프 한 그릇'],
        ])}
        ${H.box('warn', '<span class="en">bread</span>(빵), <span class="en">money</span>(돈), <span class="en">homework</span>(숙제), <span class="en">furniture</span>(가구)는 우리말로는 셀 수 있을 것 같지만 영어에서는 <b>셀 수 없는 명사</b>예요. <span class="strike en">a homework</span>, <span class="strike en">moneys</span> 라고 하면 안 돼요!')}
      `,
      examples: [
        ['I have <b>two cats</b> and <b>a dog</b>.', '나는 고양이 두 마리와 개 한 마리가 있어요.'],
        ['Can I have <b>a glass of water</b>?', '물 한 잔 마실 수 있을까요?'],
        ['Mom bought <b>three bottles of juice</b>.', '엄마가 주스 세 병을 사셨어요.'],
        ['We need <b>two loaves of bread</b> for the picnic.', '소풍에 빵 두 덩어리가 필요해요.'],
        ['I have <b>a lot of homework</b> today.', '나는 오늘 숙제가 많아요.'],
        ['I have <b>a water</b>.', '→ <span class="en">I have water.</span> 또는 <span class="en">I have a bottle of water.</span>', 'x'],
      ],
      toon: {
        title: '물방울은 a를 싫어해!',
        panels: [
          { bg: 'sky', narr: '명사 마을에 <b>a</b>가 놀러 왔어요. a는 “하나”라는 뜻의 모자를 씌워 주는 친구예요.',
            cast: [{ w: 'a', c: 'yellow', m: 'happy', st: 'small', say: '모자 씌워 줄게~ 하나, 둘 셀 수 있는 친구 누구?' }, { w: 'apple', c: 'red', m: 'happy', say: '나! 나는 한 개, 두 개 셀 수 있어!' }],
            line: { t: '<u>an</u> apple', ok: true } },
          { bg: 'sky', narr: '다음은 water 차례.',
            cast: [{ w: 'a', c: 'yellow', m: 'happy', st: 'small', say: 'water야, 너도 모자 써 볼래?' }, { w: 'water', c: 'blue', m: 'angry', say: '싫어! 나는 쏟으면 모양이 없어져서 한 개, 두 개 셀 수가 없다고!' }],
            line: { t: '<s>a water</s>', ok: false } },
          { bg: 'mint', narr: '그때 컵이 등장했어요.', fx: '짠!',
            cast: [{ e: '🥛', tag: 'glass', say: '그럼 나한테 담기면 돼! 컵은 셀 수 있거든.' }, { w: 'water', c: 'blue', m: 'love', say: '오, 좋아!' }] },
          { bg: 'mint', narr: '이제 water도 셀 수 있게 됐어요. 숫자는 <b>컵</b>이 대신 세 준답니다.',
            cast: [{ e: '🥛🥛', tag: 'two glasses' }, { w: 'water', c: 'blue', m: 'cool', say: '-s는 컵이 달고, 나는 그대로!' }],
            line: { t: 'two glass<u>es</u> of water', ok: true } },
        ],
      },
    },
    {
      id: 'a-an', title: 'a와 an, 무엇을 붙일까?', en: 'a / an',
      unscramble: [
        { ko: "나는 매일 아침 달걀 하나를 먹어요.", words: ["every", "an", "I", "morning", "eat", "egg"], answer: "I eat an egg every morning.", alt: ["Every morning I eat an egg."] },
        { ko: "우리는 한 시간 동안 기다렸어요.", words: ["an", "waited", "hour", "we", "for"], answer: "We waited for an hour." },
        { ko: "그녀는 대학생이에요.", words: ["a", "student", "is", "she", "university"], answer: "She is a university student." },
      ],
      html: `
        <p>셀 수 있는 명사가 <b>하나</b>일 때는 앞에 <span class="en">a</span>나 <span class="en">an</span>을 붙여요. 어떤 걸 붙일지는 <span class="mark">철자가 아니라 소리</span>로 정해요.</p>
        ${H.formula('*a', '+', '자음 소리로 시작')}${H.formula('*an', '+', '모음 소리(아, 에, 이, 오, 우)로 시작')}
        ${H.table(['a', 'an'], [
          ['<span class="en">a book, a dog, a pen</span>', '<span class="en">an apple, an egg, an orange</span>'],
          ['<span class="en">a <b>u</b>niform</span> (유니폼 → “유” 소리는 자음 취급)', '<span class="en">an <b>h</b>our</span> (h 소리가 안 나서 “아워”)'],
          ['<span class="en">a <b>u</b>niversity</span> (유니버시티)', '<span class="en">an <b>u</b>mbrella</span> (엄브렐라)'],
        ])}
        ${H.box('tip', '중간에 형용사가 끼면 그 형용사의 소리로 정해요. <span class="en">an apple → <b>a</b> red apple</span>, <span class="en">a cat → <b>an</b> old cat</span>')}
      `,
      examples: [
        ['I eat <b>an egg</b> every morning.', '나는 매일 아침 달걀 하나를 먹어요.'],
        ['We waited for <b>an hour</b>.', '우리는 한 시간 동안 기다렸어요.'],
        ['She is <b>a university</b> student.', '그녀는 대학생이에요.'],
      ],
    },
    {
      id: 'plural', title: '복수형 만들기 (여러 개일 때)', en: 'Plural nouns',
      unscramble: [
        { ko: "탁자 위에 상자가 세 개 있어요.", words: ["boxes", "the", "are", "there", "on", "three", "table"], answer: "There are three boxes on the table." },
        { ko: "아이들이 공원에서 놀고 있어요.", words: ["playing", "the", "in", "children", "are", "the", "park"], answer: "The children are playing in the park." },
        { ko: "나는 매 식사 후에 이를 닦아요.", words: ["teeth", "every", "I", "after", "my", "meal", "brush"], answer: "I brush my teeth after every meal.", alt: ["After every meal I brush my teeth."] },
      ],
      html: `
        <p>셀 수 있는 명사가 <b>두 개 이상</b>이면 모양이 바뀌어요. 대부분은 <span class="en">-s</span>만 붙이면 되지만, 몇 가지 규칙이 있어요.</p>
        ${H.table(['규칙', '만드는 법', '예'], [
          ['대부분', '<b>+s</b>', '<span class="en">book → books, cat → cats, girl → girls</span>'],
          ['-s, -x, -sh, -ch, -o로 끝나면', '<b>+es</b> (발음이 편하도록 “이즈”)', '<span class="en">bus → buses, box → boxes, dish → dishes, watch → watches, potato → potatoes, tomato → tomatoes</span>'],
          ['자음 + y', 'y를 i로 바꾸고 <b>+es</b>', '<span class="en">baby → babies, city → cities, story → stories</span>'],
          ['모음 + y', '그냥 <b>+s</b>', '<span class="en">boy → boys, day → days, toy → toys, key → keys</span>'],
          ['-f, -fe', 'f를 v로 바꾸고 <b>+es</b>', '<span class="en">leaf → leaves, wolf → wolves, loaf → loaves, knife → knives</span>'],
        ])}
        <p>규칙을 따르지 않는 <b>불규칙 복수형</b>도 있어요. 이건 외워야 해요!</p>
        ${H.table(['하나', '여럿', '하나', '여럿'], [
          ['<span class="en">man</span> 남자', '<span class="en">men</span>', '<span class="en">woman</span> 여자', '<span class="en">women</span>'],
          ['<span class="en">child</span> 아이', '<span class="en">children</span>', '<span class="en">person</span> 사람', '<span class="en">people</span>'],
          ['<span class="en">foot</span> 발', '<span class="en">feet</span>', '<span class="en">tooth</span> 이', '<span class="en">teeth</span>'],
          ['<span class="en">mouse</span> 쥐', '<span class="en">mice</span>', '<span class="en">goose</span> 거위', '<span class="en">geese</span>'],
          ['<span class="en">sheep</span> 양', '<span class="en">sheep</span> (같음)', '<span class="en">fish</span> 물고기', '<span class="en">fish</span> (같음)'],
        ])}
        ${H.box('warn', '<span class="en">piano → pianos, photo → photos</span>는 o로 끝나지만 -s만 붙여요. <span class="en">roof → roofs</span>도 예외예요.')}
        ${H.box('memo', '<span class="en">glasses</span>(안경), <span class="en">pants</span>(바지), <span class="en">scissors</span>(가위), <span class="en">shoes</span>(신발)처럼 <b>두 쪽이 한 쌍</b>인 물건은 늘 복수형으로 써요. 하나를 말할 땐 <span class="en">a pair of glasses</span>.')}
      `,
      examples: [
        ['There are three <b>boxes</b> on the table.', '탁자 위에 상자가 세 개 있어요.'],
        ['The <b>children</b> are playing in the park.', '아이들이 공원에서 놀고 있어요.'],
        ['I brush my <b>teeth</b> after every meal.', '나는 매 식사 후에 이를 닦아요.'],
        ['The <b>leaves</b> turn red in fall.', '가을에는 나뭇잎이 빨갛게 변해요.'],
      ],
    },
    {
      id: 'role', title: '명사는 문장에서 어디에 올까?', en: 'Subject · Object · Complement',
      unscramble: [
        { ko: "고양이가 자고 있어요.", words: ["sleeping", "cat", "the", "is"], answer: "The cat is sleeping." },
        { ko: "우리 엄마는 의사예요.", words: ["a", "is", "doctor", "my", "mom"], answer: "My mom is a doctor." },
        { ko: "형은 방과 후에 축구를 해요.", words: ["soccer", "after", "my", "plays", "school", "brother"], answer: "My brother plays soccer after school.", alt: ["After school my brother plays soccer."] },
      ],
      html: `
        <p>명사는 문장에서 세 가지 자리에 앉을 수 있어요.</p>
        ${H.table(['자리', '하는 일', '예 (굵은 글씨가 명사)'], [
          ['주어', '“누가/무엇이” — 문장의 주인공', '<span class="en"><b>Tom</b> runs fast.</span> 톰은 빨리 달린다.'],
          ['목적어', '“누구를/무엇을” — 동작을 받는 대상', '<span class="en">I like <b>pizza</b>.</span> 나는 피자를 좋아한다.'],
          ['보어', '주어가 “누구인지/무엇인지” 설명', '<span class="en">My mom is a <b>doctor</b>.</span> 엄마는 의사다.'],
        ])}
        ${H.box('tip', '전치사 뒤에도 명사가 와요. <span class="en">in the <b>box</b>, with my <b>friend</b></span>')}
      `,
      examples: [
        ['<b>The cat</b> is sleeping.', '고양이가 자고 있어요. (주어)'],
        ['My brother plays <b>soccer</b> after school.', '형은 방과 후에 축구를 해요. (목적어)'],
        ['My dream is <b>a pilot</b>.', '내 꿈은 비행기 조종사예요. (보어)'],
      ],
    },
    {
      id: 'possessive', title: '명사의 소유격 ’s', en: "Possessive 's",
      unscramble: [
        { ko: "이건 민지의 필통이에요.", words: ["pencil", "Minji's", "this", "case", "is"], answer: "This is Minji's pencil case." },
        { ko: "오늘의 점심은 카레야!", words: ["curry", "lunch", "is", "today's"], answer: "Today's lunch is curry!" },
        { ko: "학생들의 그림이 벽에 걸려 있어요.", words: ["on", "students'", "the", "wall", "drawings", "are", "the"], answer: "The students' drawings are on the wall." },
      ],
      html: `
        <p>“톰<b>의</b> 가방”처럼 <b>누구의 것</b>인지 말할 때는 명사 뒤에 <span class="en">'s</span>(어퍼스트로피 에스)를 붙여요.</p>
        ${H.table(['경우', '만드는 법', '예'], [
          ['보통', "+ <b>'s</b>", "<span class=\"en\">Tom's bag, my mom's car</span>"],
          ['-s로 끝나는 복수', "+ <b>'</b> 만", "<span class=\"en\">the girls' room</span> (소녀들의 방)"],
          ['-s로 안 끝나는 복수', "+ <b>'s</b>", "<span class=\"en\">the children's toys</span>"],
        ])}
        ${H.box('warn', "<span class=\"en\">it's</span>는 <span class=\"en\">it is</span>의 줄임말이에요. “그것의”는 <span class=\"en\"><b>its</b></span> (어퍼스트로피 없음)!")}
      `,
      examples: [
        ["This is <b>Minji's</b> pencil case.", '이건 민지의 필통이에요.'],
        ["The <b>students'</b> drawings are on the wall.", '학생들의 그림이 벽에 걸려 있어요.'],
        ["<b>Today's</b> lunch is curry!", '오늘의 점심은 카레야!'],
      ],
    },
    {
      id: 'the', title: '“그” 명사! 정관사 the', en: 'a vs the',
      unscramble: [
        { ko: "나는 피아노를 쳐요.", words: ["the", "play", "piano", "I"], answer: "I play the piano." },
        { ko: "오늘 밤 달이 밝아요.", words: ["bright", "the", "tonight", "moon", "is"], answer: "The moon is bright tonight.", alt: ["Tonight the moon is bright."] },
        { ko: "문 좀 닫아 주세요.", words: ["please", "the", "close", "door"], answer: "Close the door, please.", alt: ["Please close the door."] },
      ],
      html: `
        <p><span class="en">a</span>는 “아무거나 하나”, <span class="en">the</span>는 “<b>우리 둘 다 아는 바로 그것</b>”이에요.</p>
        ${H.table(['the를 쓰는 경우', '예'], [
          ['앞에서 한 번 말한 것을 다시 말할 때', '<span class="en">I saw <b>a</b> dog. <b>The</b> dog was cute.</span>'],
          ['서로 무엇인지 알 때', '<span class="en">Close <b>the</b> door, please.</span> (이 방의 그 문)'],
          ['세상에 하나뿐인 것', '<span class="en"><b>the</b> sun, <b>the</b> moon, <b>the</b> earth, <b>the</b> sky</span>'],
          ['악기를 연주할 때', '<span class="en">play <b>the</b> piano, play <b>the</b> violin</span>'],
          ['서수·최상급 앞', '<span class="en"><b>the</b> first day, <b>the</b> tallest boy</span>'],
        ])}
        ${H.table(['the를 쓰지 않는 경우', '예'], [
          ['운동 경기', '<span class="en">play soccer, play baseball</span>'],
          ['식사', '<span class="en">have breakfast, eat lunch</span>'],
          ['과목·언어', '<span class="en">I like math. I speak English.</span>'],
          ['교통수단 (by + 탈것)', '<span class="en">go by bus, by subway</span>'],
          ['건물 본래 목적으로 갈 때', '<span class="en">go to school</span>(공부하러), <span class="en">go to bed</span>(자러)'],
        ])}
      `,
      examples: [
        ['I bought <b>a</b> hat. <b>The</b> hat is blue.', '나는 모자를 하나 샀다. 그 모자는 파란색이다.'],
        ['<b>The</b> moon is bright tonight.', '오늘 밤 달이 밝아요.'],
        ['She plays <b>the</b> piano, and I play soccer.', '그녀는 피아노를 치고, 나는 축구를 해요.'],
      ],
      toon: {
        title: '처음 만나면 a, 다시 만나면 the',
        panels: [
          { bg: 'sun', narr: '길에서 처음 보는 강아지를 만났어요.',
            cast: [{ w: 'I', c: 'orange', m: 'surprised', say: '어? 저기 강아지 한 마리가 있다!' }, { w: 'a', c: 'yellow', m: 'happy', st: 'small', say: '처음 보는 아무 강아지면 내 차례!' }, { e: '🐶', tag: 'dog' }],
            line: { t: 'I saw <u>a</u> dog.', ok: true } },
          { bg: 'sun', narr: '강아지가 꼬리를 흔들어요.',
            cast: [{ w: 'a', c: 'yellow', m: 'surprised', st: 'small', say: '또 내 차례지?' }, { w: 'the', c: 'purple', m: 'cool', say: '아니! 방금 말한 “바로 그” 강아지잖아. 이제부턴 내 차례야.' }, { e: '🐶', tag: 'dog' }],
            line: { t: '<u>The</u> dog was so cute.', ok: true } },
          { bg: 'night', narr: '밤하늘을 올려다봤어요.',
            cast: [{ e: '🌕', tag: 'moon' }, { w: 'the', c: 'purple', m: 'smug', say: '달은 세상에 딱 하나! 누구나 아니까 처음부터 내가 붙어.' }],
            line: { t: '<u>the</u> moon / <s>a moon</s>', ok: true } },
        ],
      },
    },
  ],
  quiz: [
    ['빈칸에 a 또는 an을 넣으세요: ( ) orange, ( ) hour, ( ) uniform', '<span class="en">an orange, an hour, a uniform</span> — 철자가 아니라 첫 <b>소리</b>로 정해요.'],
    ['복수형으로 바꾸세요: <span class="en">baby, knife, child, box, boy</span>', '<span class="en">babies, knives, children, boxes, boys</span>'],
    ['틀린 곳을 고치세요: <span class="en">I want two breads.</span>', '<span class="en">bread</span>는 셀 수 없어요 → <span class="en">I want two <b>pieces/slices of bread</b>.</span>'],
    ['빈칸에 알맞은 말: <span class="en">Look at ( ) sky!</span>', '<span class="en">the</span> — 하늘은 하나뿐이니까요.'],
  ],
});
