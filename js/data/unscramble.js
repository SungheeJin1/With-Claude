/* 품사별 챕터 끝 “단어 순서 맞히기” 문제
   [우리말 뜻, 정답 문장, (다른 정답들)]
   단어 카드는 정답 문장을 쪼개서 매번 같은 순서로 섞어 만들어요. (명사 탭은 01-noun.js에 직접 적혀 있어요) */
(function () {
const Q = {
  pronoun: {
    what: [['그는 그의 개를 사랑해요.', 'He loves his dog.'], ['그녀는 매일 그것을 산책시켜요.', 'She walks it every day.', 'Every day she walks it.'], ['우리는 그들을 도와줄 거예요.', 'We will help them.']],
    personal: [['엄마가 나를 안아 주셨어요.', 'Mom hugged me.'], ['그들은 우리의 이웃이에요.', 'They are our neighbors.'], ['나는 그녀에게 편지를 썼어요.', 'I wrote her a letter.']],
    mine: [['이 우산은 내 거야.', 'This umbrella is mine.'], ['저 가방은 그녀의 것이에요.', 'That bag is hers.'], ['이 연필 네 거야?', 'Is this pencil yours?']],
    self: [['그녀는 거울 속 자신을 바라보았어요.', 'She looked at herself in the mirror.'], ['나는 혼자서 도서관에 갔어요.', 'I went to the library by myself.'], ['쿠키 마음껏 드세요.', 'Please help yourself to the cookies.']],
    this: [['이 아이는 내 단짝이야.', 'This is my best friend.'], ['저 자전거 진짜 멋지다!', 'That bike is really cool!'], ['이것들은 네 양말이니?', 'Are these your socks?']],
    it: [['오늘은 춥고 바람이 불어요.', 'It is cold and windy today.', 'Today it is cold and windy.'], ['지금 몇 시예요?', 'What time is it now?'], ['밖에 비가 오고 있어요.', 'It is raining outside.']],
    one: [['나는 새것이 하나 필요해요.', 'I need a new one.'], ['하나는 빨간색이고, 나머지 하나는 파란색이야.', 'One is red, and the other is blue.'], ['하나는 내 거고, 나머지는 전부 네 거야.', 'One is mine, and the others are yours.']],
    wh: [['저 남자아이는 누구야?', 'Who is that boy?'], ['이건 누구의 가방이야?', 'Whose bag is this?'], ['너는 무엇을 원하니?', 'What do you want?']],
    relative: [['나는 제주에 사는 친구가 있어요.', 'I have a friend who lives in Jeju.'], ['이것은 그 소년을 구한 개예요.', 'This is the dog which saved the boy.'], ['나는 아빠가 조종사인 여자아이를 알아요.', 'I know a girl whose dad is a pilot.']],
    'relative-more': [['이게 내가 너를 위해 만든 거야.', 'This is what I made for you.'], ['내가 원하는 것은 강아지야.', 'What I want is a puppy.'], ['옆집에 사는 남자는 요리사예요.', 'The man who lives next door is a chef.']],
    'relative-comma': [['나는 형이 하나 있는데, 그는 의사야. (쉼표도 꼭 넣어요)', 'I have a brother, who is a doctor.', { keepComma: true }], ['그녀가 나에게 책을 줬는데, 그 책은 정말 웃겼어. (쉼표도 꼭 넣어요)', 'She gave me a book, which was very funny.', { keepComma: true }], ['하루 종일 비가 왔는데, 그것 때문에 우리는 슬펐어. (쉼표도 꼭 넣어요)', 'It rained all day, which made us sad.', { keepComma: true }]],
  },
  adjective: {
    what: [['이 수프는 너무 짜요.', 'This soup is too salty.'], ['우리 선생님은 친절하고 재미있으세요.', 'My teacher is kind and funny.'], ['나는 작은 강아지가 있어요.', 'I have a small puppy.']],
    position: [['피자 냄새가 정말 좋아요.', 'The pizza smells great.'], ['나는 차가운 마실 것을 원해요.', 'I want something cold to drink.'], ['너 행복해 보여.', 'You look happy.']],
    order: [['그녀는 길고 검은 머리를 가졌어요.', 'She has long black hair.'], ['나는 멋진 파란 연필 세 자루를 샀어요.', 'I bought three nice blue pencils.'], ['그것은 작은 나무 상자예요.', 'It is a small wooden box.']],
    quantity: [['하늘에 별이 많아요.', 'There are many stars in the sky.'], ['냉장고에 우유가 거의 없어요.', 'There is little milk in the fridge.'], ['나는 이 동네에 친구가 몇 명 있어요.', 'I have a few friends in this town.']],
    demonstrative: [['이 쿠키들은 너를 위한 거야.', 'These cookies are for you.'], ['저 나무는 100살이에요.', 'That tree is 100 years old.'], ['우리 선생님은 정말 웃기셔요.', 'Our teacher is very funny.']],
    compare: [['코끼리는 말보다 더 커요.', 'An elephant is bigger than a horse.'], ['이 책이 저 책보다 더 재미있어요.', 'This book is more interesting than that one.'], ['나일강은 세상에서 가장 긴 강이에요.', 'The Nile is the longest river in the world.']],
    'as-as': [['이 가방은 바위만큼 무거워!', 'This bag is as heavy as a rock!'], ['나는 엄마만큼 키가 커요.', 'I am as tall as my mom.'], ['나는 남동생보다 물을 두 배 많이 마셔요.', 'I drink twice as much water as my brother.']],
    'ing-ed': [['롤러코스터는 정말 신났어요!', 'The roller coaster was so exciting!'], ['우리는 여행 때문에 너무 신났어요.', 'We were so excited about the trip.'], ['그 영화는 지루했어요.', 'The movie was boring.']],
    'adj-clause': [['노래하고 있는 여자아이는 내 여동생이에요.', 'The girl who is singing is my sister.'], ['나는 아빠가 주신 우산을 잃어버렸어요.', 'I lost the umbrella that my dad gave me.'], ['여기가 내가 태어난 곳이야.', 'This is the place where I was born.']],
  },
  adverb: {
    what: [['천천히 말해 주세요.', 'Please speak slowly.'], ['시험은 정말 쉬웠어요.', 'The test was really easy.'], ['지금 이리 와!', 'Come here now!']],
    ly: [['거북이는 천천히 걸었어요.', 'The turtle walked slowly.'], ['그녀는 행복하게 웃었어요.', 'She smiled happily.'], ['그는 공부를 거의 안 해요.', 'He hardly studies.']],
    frequency: [['나는 보통 학교에 걸어가요.', 'I usually walk to school.'], ['우리 아빠는 자주 바쁘세요.', 'My dad is often busy.'], ['그는 항상 일찍 일어나요.', 'He always gets up early.']],
    order: [['이 상자는 나한테 너무 무거워요.', 'This box is too heavy for me.'], ['그는 운전할 수 있을 만큼 나이가 들었어요.', 'He is old enough to drive.'], ['나는 어제 공원에 갔어요.', 'I went to the park yesterday.', 'Yesterday I went to the park.']],
    'relative-adverb': [['부산은 우리 할머니가 사시는 도시예요.', 'Busan is the city where my grandma lives.'], ['여름은 우리가 바닷가에 가는 계절이에요.', 'Summer is the season when we go to the beach.'], ['그게 내가 너를 사랑하는 이유야.', 'That is why I love you.']],
  },
  verb: {
    basic: [['내 여동생은 아홉 살이에요.', 'My sister is nine years old.'], ['우리는 일요일마다 배드민턴을 쳐요.', 'We play badminton every Sunday.', 'Every Sunday we play badminton.'], ['나는 피자를 좋아해요.', 'I like pizza.']],
    'be-number': [['그들은 내 반 친구들이에요.', 'They are my classmates.'], ['우리는 지난 토요일에 동물원에 있었어요.', 'We were at the zoo last Saturday.', 'Last Saturday we were at the zoo.'], ['그녀는 배고프지 않아요.', 'She is not hungry.']],
    'three-s': [['우리 아빠는 버스를 운전하세요.', 'My dad drives a bus.'], ['그녀는 저녁 식사 후에 만화를 봐요.', 'She watches cartoons after dinner.', 'After dinner she watches cartoons.'], ['형은 매일 영어를 공부해요.', 'My brother studies English every day.', 'Every day my brother studies English.']],
    'does-not': [['나는 당근을 좋아하지 않아요.', "I don't like carrots.", 'I do not like carrots.'], ['그녀는 스마트폰이 없어요.', "She doesn't have a smartphone.", 'She does not have a smartphone.'], ['우리 고양이는 생선을 먹지 않아요.', "My cat doesn't eat fish.", 'My cat does not eat fish.']],
    'does-q': [['너희 오빠는 기타를 치니?', 'Does your brother play the guitar?'], ['그들은 이 근처에 사니?', 'Do they live near here?'], ['이 버스 공항에 가나요?', 'Does this bus go to the airport?']],
    'subject-number': [['쿠키 중 하나가 없어졌어!', 'One of the cookies is missing!'], ['모두 여기 있어요.', 'Everyone is here.'], ['민호와 그의 여동생은 수영을 잘해요.', 'Minho and his sister are good at swimming.']],
    'modal-basic': [['우리 할머니는 3개 국어를 하실 수 있어요.', 'My grandma can speak three languages.'], ['네 지우개 써도 될까?', 'May I use your eraser?'], ['나는 수영을 못 해요.', "I can't swim.", 'I cannot swim.']],
    can: [['펭귄은 날 수 없어요.', "Penguins can't fly.", 'Penguins cannot fly.'], ['다시 한번 말씀해 주시겠어요?', 'Could you say that again?'], ['나는 내년에 영어책을 읽을 수 있을 거예요.', 'I will be able to read English books next year.', 'Next year I will be able to read English books.']],
    may: [['연필 좀 빌려도 될까요?', 'May I borrow your pencil?'], ['비가 올지도 몰라.', 'It might rain.'], ['그는 집에 있을지도 몰라.', 'He may be at home.']],
    must: [['복도에서 뛰면 안 돼요.', 'You must not run in the hallway.'], ['너는 점심을 가져올 필요가 없어.', "You don't have to bring lunch.", 'You do not have to bring lunch.'], ['그는 오늘 남동생을 돌봐야 해요.', 'He has to take care of his little brother today.']],
    should: [['너는 좀 쉬는 게 좋겠어.', 'You should take a rest.'], ['우리는 물을 낭비하면 안 돼요.', "We shouldn't waste water.", 'We should not waste water.'], ['너는 서두르는 게 좋겠어.', 'You had better hurry.']],
    would: [['쿠키 좀 드실래요?', 'Would you like some cookies?'], ['나는 물 한 잔을 원해요.', 'I would like a glass of water.'], ['나는 예전에 대구에 살았어요.', 'I used to live in Daegu.']],
    'tense-map': [['나는 지금 축구를 하고 있어요.', 'I am playing soccer now.'], ['나는 어제 축구를 했어요.', 'I played soccer yesterday.', 'Yesterday I played soccer.'], ['나는 내일 축구를 할 거예요.', 'I will play soccer tomorrow.', 'Tomorrow I will play soccer.']],
    present: [['해는 동쪽에서 떠요.', 'The sun rises in the east.'], ['엄마는 매일 아침 커피를 드세요.', 'My mom drinks coffee every morning.', 'Every morning my mom drinks coffee.'], ['거미는 다리가 여덟 개예요.', 'A spider has eight legs.']],
    'present-progressive': [['아기가 자고 있어요.', 'The baby is sleeping.'], ['나는 용을 그리고 있어.', 'I am drawing a dragon.'], ['그들은 지금 TV를 보고 있지 않아요.', 'They are not watching TV now.']],
    past: [['나는 지난 주말에 할머니 댁을 방문했어요.', 'I visited my grandma last weekend.', 'Last weekend I visited my grandma.'], ['우리는 방과 후에 떡볶이를 먹었어요.', 'We ate tteokbokki after school.', 'After school we ate tteokbokki.'], ['숙제 다 했니?', 'Did you finish your homework?']],
    'past-progressive': [['엄마는 저녁을 요리하고 계셨어요.', 'My mom was cooking dinner.'], ['아이들이 크게 웃고 있었어요.', 'The kids were laughing loudly.'], ['너 자고 있었니?', 'Were you sleeping?']],
    future: [['내일은 맑을 거예요.', 'It will be sunny tomorrow.', 'Tomorrow it will be sunny.'], ['우리는 금요일에 파티를 할 거예요.', 'We are going to have a party on Friday.', 'On Friday we are going to have a party.'], ['다시는 늦지 않을게요.', "I won't be late again.", 'I will not be late again.']],
    'present-perfect': [['나는 눈을 한 번도 본 적이 없어요.', 'I have never seen snow.'], ['기차가 이미 떠났어요.', 'The train has already left.'], ['너 김치 먹어 본 적 있어?', 'Have you ever eaten kimchi?']],
    'past-perfect': [['영화는 이미 시작했었어요.', 'The movie had already started.'], ['그녀는 밤새 공부했었기 때문에 피곤했어요.', 'She was tired because she had studied all night.'], ['내가 도착했을 때, 기차는 이미 떠났었어요.', 'When I arrived, the train had already left.', 'The train had already left when I arrived.']],
    'subjunctive-past': [['내가 새라면, 너에게 날아갈 텐데.', 'If I were a bird, I would fly to you.', 'I would fly to you if I were a bird.'], ['내가 부자라면, 큰 집을 살 텐데.', 'If I were rich, I would buy a big house.', 'I would buy a big house if I were rich.'], ['영어를 잘할 수 있으면 좋을 텐데.', 'I wish I could speak English well.']],
    'subjunctive-past-perfect': [['공부를 더 열심히 했더라면, 시험에 붙었을 텐데.', 'If I had studied harder, I would have passed the test.', 'I would have passed the test if I had studied harder.'], ['네가 말해 줬더라면, 내가 도와줄 수 있었을 텐데.', 'If you had told me, I could have helped you.', 'I could have helped you if you had told me.'], ['더 일찍 나왔더라면, 버스를 놓치지 않았을 텐데.', "If we had left earlier, we wouldn't have missed the bus.", "We wouldn't have missed the bus if we had left earlier."]],
    passive: [['이 그림은 우리 할아버지가 그리셨어요.', 'This picture was painted by my grandpa.'], ['한글은 세종대왕이 만드셨어요.', 'Hangeul was created by King Sejong.'], ['창문은 톰이 깼어요.', 'The window was broken by Tom.']],
    'passive-tense': [['새 도서관은 다음 달에 문을 열 거예요.', 'The new library will be opened next month.'], ['이 노래는 아이들이 부르나요?', 'Is this song sung by children?'], ['케이크는 벌써 다 먹혔어요!', 'The cake has been eaten already!', 'The cake has already been eaten!']],
    'passive-prep': [['남동생은 공룡에 관심이 많아요.', 'My brother is interested in dinosaurs.'], ['거리는 낙엽으로 덮여 있었어요.', 'The streets were covered with leaves.'], ['이 책상은 나무로 만들어졌어요.', 'This desk is made of wood.']],
  },
  preposition: {
    what: [['이건 너를 위한 거야.', 'This is for you.'], ['나는 그와 함께 놀았어요.', 'I played with him.'], ['도와줘서 고마워.', 'Thank you for helping me.']],
    time: [['학교는 8시 30분에 시작해요.', 'School starts at 8:30.'], ['우리는 수요일에 미술 수업이 있어요.', 'We have art class on Wednesday.', 'On Wednesday we have art class.'], ['내 생일은 10월에 있어요.', 'My birthday is in October.']],
    place: [['정문에서 나를 기다려.', 'Wait for me at the gate.'], ['벽에 시계가 있어요.', 'There is a clock on the wall.'], ['우리 고양이는 바구니 안에서 자고 있어요.', 'My cat is sleeping in the basket.']],
    position: [['내 신발은 침대 밑에 있어요.', 'My shoes are under the bed.'], ['우체국은 도서관 옆에 있어요.', 'The post office is next to the library.'], ['고양이가 소파 뒤에 숨어 있어요.', 'The cat is hiding behind the sofa.']],
    direction: [['아이들이 교실 안으로 뛰어 들어갔어요.', 'The kids ran into the classroom.'], ['고양이 한 마리가 길을 건너갔어요.', 'A cat walked across the road.'], ['기차가 터널을 통과했어요.', 'The train went through the tunnel.']],
    others: [['선물 고마워.', 'Thank you for the gift.'], ['나는 걸어서 학교에 가요.', 'I go to school on foot.'], ['아빠는 지하철로 출근하세요.', 'My dad goes to work by subway.']],
  },
  conjunction: {
    coordinating: [['형과 나는 같은 학교에 다녀요.', 'My brother and I go to the same school.'], ['비가 와서 우리는 안에 있었어요.', 'It was raining, so we stayed inside.'], ['우유 아니면 주스 마실래?', 'Do you want milk or juice?']],
    correlative: [['미나와 지수 둘 다 우리 반이에요.', 'Both Mina and Jisu are in my class.'], ['그녀는 똑똑할 뿐만 아니라 친절해요.', 'She is not only smart but also kind.'], ['나는 개도 고양이도 없어요.', 'I have neither a dog nor a cat.']],
    subordinating: [['먹기 전에 손을 씻으세요.', 'Wash your hands before you eat.', 'Before you eat, wash your hands.'], ['나는 눈사람을 만들 수 있어서 겨울이 좋아요.', 'I like winter because I can make a snowman.'], ['그는 작지만 아주 빨라요.', 'Although he is small, he is very fast.', 'He is very fast although he is small.']],
    'if-will': [['집에 도착하면 전화할게.', 'I will call you when I get home.', 'When I get home, I will call you.'], ['내일 비가 오면 나는 집에 있을 거야.', 'If it rains tomorrow, I will stay home.', 'I will stay home if it rains tomorrow.'], ['숙제를 끝내면 게임을 해도 돼.', 'If you finish your homework, you can play games.', 'You can play games if you finish your homework.']],
    that: [['나는 네가 옳다고 생각해.', 'I think that you are right.', 'I think you are right.'], ['네가 빨리 나으면 좋겠어.', 'I hope that you feel better soon.', 'I hope you feel better soon.'], ['나는 그녀가 고양이를 좋아한다는 걸 알아요.', 'I know that she likes cats.', 'I know she likes cats.']],
    appositive: [['나는 우리 팀이 이겼다는 소식을 들었어요.', 'I heard the news that our team won.'], ['그가 거짓말을 했다는 사실이 나를 화나게 했어요.', 'The fact that he lied made me angry.'], ['지구가 둥글다는 사실은 모두 알아요.', 'Everyone knows the fact that the earth is round.']],
  },
  interjection: {
    what: [['와! 무지개 좀 봐!', 'Wow! Look at the rainbow!'], ['아야! 벌이 쐈어!', 'Ouch! A bee stung me!'], ['휴! 드디어 시험이 끝났다.', 'Phew! The test is finally over.']],
    daily: [['음, 잘 모르겠어.', "Well, I'm not sure."], ['좋아, 가자!', "Okay, let's go!"], ['안녕! 다음에 봐!', 'Bye! See you later!']],
    exclamatory: [['정말 아름다운 날이구나!', 'What a beautiful day!'], ['너 정말 키가 크구나!', 'How tall you are!'], ['이 케이크 정말 맛있다!', 'How delicious this cake is!']],
  },
};

/* 첫 단어가 이름이거나 I로 시작하는 말이면 대문자를 그대로 둬요 */
const KEEP = /^(I|I'm|I'll|I've|I'd|Busan|Hangeul|Mina|Minho|Jimin|Jeju|Mom)$/;
function words(answer, keepComma) {
  /* 문장 첫 단어(맨 앞, 또는 . ! ? 바로 뒤)는 소문자로 바꿔서 대문자가 순서 힌트가 되지 않게 해요 */
  const raw = answer.split(/\s+/).filter(Boolean);
  const toks = raw.map((w, i) => {
    const starts = i === 0 || /[.!?]$/.test(raw[i - 1]);
    let t = w.replace(keepComma ? /[.!?]+$/ : /[.,!?]+$/, '');
    if (starts && !KEEP.test(t)) t = t.toLowerCase();
    return t;
  });
  /* 정답 문장으로 정해지는 “고정된” 섞기: 새로고침해도 같은 순서 */
  let seed = 0;
  for (const ch of answer) seed = (seed * 31 + ch.charCodeAt(0)) >>> 0;
  const rnd = () => (seed = (seed * 1103515245 + 12345) >>> 0) / 4294967296;
  const out = toks.slice();
  for (let n = 0; n < 6; n++) {
    for (let i = out.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [out[i], out[j]] = [out[j], out[i]]; }
    if (out.join(' ') !== toks.join(' ')) break;
  }
  return out;
}

GRAMMAR.forEach(t => {
  const tab = Q[t.id];
  if (!tab) return;
  t.sections.forEach(s => {
    if (s.group || !tab[s.id]) return;
    s.unscramble = tab[s.id].map(([ko, answer, ...rest]) => {
      const opts = rest.find(r => typeof r === 'object') || {};
      const alt = rest.filter(r => typeof r === 'string');
      return { ko, answer, alt, keepComma: !!opts.keepComma, words: words(answer, opts.keepComma) };
    });
  });
});
})();
