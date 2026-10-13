/* P3 Abigail: Simple Present, Present Continuous, was/were.
   Past practice stays on was/were, matching the first-term syllabus. */
(function (root) {
  const TAG_TIPS = {
    es: "wash、watch、fix、go 一個人要寫 washes、watches、fixes、goes。",
    ies: "tidy 結尾是子音加 y，一個人寫 tidies。",
    "doesnt-base": "doesn't 和 don't 後面用動詞原形，不能再加 s。",
    "plural-dont": "we、they、friends、boys 這些很多人，否定用 don't。",
    "does-q": "dad、mum、he、she 問習慣用 Does，後面動詞用原形。",
    "do-q": "girls、we、they 問習慣用 Do，後面動詞用原形。",
    "i-base": "I 說習慣時用動詞原形，不加 s。",
    "plural-base": "很多人說習慣時用動詞原形，不加 s。",
    goes: "go 一個人要寫 goes。",
    "be-is": "一個人、習慣，be 用 is。",
    "i-am": "I 的現在式 be 用 am。every day 不是 was。",
    "plural-are-ing": "很多人正在做，用 are + ing，不是 is。",
    "singular-is-ing": "一個人正在做，用 is + ing。",
    "i-am-ing": "I 正在做，用 am + ing。make 要寫 making。",
    "arent-ing": "we、they 正在做的否定是 aren't + ing。",
    "isnt-ing": "he、she 正在做的否定是 isn't + ing。",
    "you-are": "You 要配 are，不是 is。",
    "am-not-ing": "I 正在做的否定是 am not + ing。",
    "i-was": "I 以前用 was。in the summer holiday 是過去。",
    "they-were": "they、boys、children、friends 以前用 were。",
    "she-was": "mum、she 一個人，以前用 was。",
    "we-were": "We 以前用 were。last weekend 是上個週末。",
    "you-were": "You 以前也用 were，不是 was。",
    "she-wasnt": "一個人以前的否定是 wasn't。",
    "they-werent": "很多人以前的否定是 weren't。",
    "i-wasnt": "I 以前的否定是 wasn't。",
    "he-was": "he、dad 以前用 was。yesterday 不是 is。",
    "were-q": "they、we 問以前的事，開頭用 Were。",
    "was-q": "she、he 問以前的事，開頭用 Was。",
    "signal-present": "every day、every Saturday、at the weekend 是習慣。",
    "signal-now": "now 和 Look! 是這一刻正在做。",
    "signal-past": "yesterday、last weekend、in the summer holiday 是以前。",
    "weekend-habit": "at the weekend 是每個週末；last weekend 才是上個週末。",
    "time-link": "時間詞和動詞要同一隊：every 配現在式，now 配正在做，yesterday 配 was / were。"
  };

  const ISLANDS = [
    {
      id: "review",
      kicker: "先玩這個",
      title: "會錯的題",
      english: "The tricky ones",
      blurb: "很多人用 are / don't。doesn't 後面用原形。",
      tone: "rose",
      ribbon: "先看是一個人，還是很多人",
      lessons: [
        { big: "are playing", line: "boys、friends、we、they 是很多人。正在做要用 are，不是 is。" },
        { big: "doesn't tidy", line: "doesn't 和 don't 後面用原形。doesn't tidies 不可以。" },
        { big: "were", line: "yesterday、last weekend 用 was / were。You 和 they 用 were。" }
      ]
    },
    {
      id: "present",
      kicker: "每天",
      title: "現在式",
      english: "Simple Present",
      blurb: "every day 的習慣。一個人加 s / es。",
      tone: "green",
      ribbon: "這座島是每天的習慣",
      lessons: [
        { big: "every day", line: "看到 every day、every Saturday、at the weekend，就是每天都會做。" },
        { big: "washes / wash", line: "mum、he、she 加 s 或 es。boys、we、they、friends 用原形。" },
        { big: "doesn't tidy", line: "否定和問句後面都用原形。Does your dad fix，不是 fixes。" }
      ]
    },
    {
      id: "continuous",
      kicker: "現在這一刻",
      title: "現在進行式",
      english: "Present Continuous",
      blurb: "now、Look! 用 am / is / are + ing。",
      tone: "blue",
      ribbon: "這座島是現在正在做",
      lessons: [
        { big: "now", line: "看到 now、Look!、Listen!，就是這一刻正在做，不是每天的習慣。" },
        { big: "am / is / are", line: "I 用 am，一個人用 is，很多人用 are，後面動詞加 ing。" },
        { big: "aren't watching", line: "否定把 not 放在 am / is / are 後面。We aren't watching。" }
      ]
    },
    {
      id: "past",
      kicker: "以前",
      title: "was / were",
      english: "Simple Past",
      blurb: "yesterday 和 last weekend。這次只練 was、were。",
      tone: "clay",
      ribbon: "這座島是以前，只練 was / were",
      lessons: [
        { big: "yesterday", line: "yesterday、last Sunday、last weekend、in the summer holiday 都是以前。" },
        { big: "was / were", line: "I、he、she、一個人用 was。You、we、they、很多人用 were。" },
        { big: "You were", line: "You 以前也是 were。否定：wasn't、weren't。" }
      ]
    },
    {
      id: "mix",
      kicker: "三種放在一起",
      title: "先找時間",
      english: "Mix them",
      blurb: "先看 every、now 還是 yesterday，再選動詞。",
      tone: "ink",
      ribbon: "先找時間詞",
      lessons: [
        { big: "every / now / yesterday", line: "先找時間詞。every 是習慣，now 是正在做，yesterday 是以前。" },
        { big: "at / last", line: "at the weekend 是每個週末。last weekend 是上個週末，用 were。" },
        { big: "Look!", line: "Look! 和 now 一隊。不要選成每天的 washes 或 plays。" }
      ]
    }
  ];

  function q(item) {
    return item;
  }

  const BANK = [
    q({
      id: "p-washes", tense: "present", type: "choice", trap: true, tag: "es",
      stem: "My mum ____ (wash) the clothes every Saturday.",
      zh: "媽媽每個星期六洗衣服。",
      hint: "every Saturday 是習慣。mum 是一個人。",
      choices: ["washes", "wash", "washing"],
      answer: "washes",
      explain: "every Saturday 是每個星期六的習慣。My mum 是一個人，wash 以 sh 結尾，加 es：washes。"
    }),
    q({
      id: "p-tidies", tense: "present", type: "choice", trap: true, tag: "ies",
      stem: "He ____ (tidy) his bedroom every day.",
      zh: "他每天收拾睡房。",
      hint: "every day 是習慣。He 是一個人。",
      choices: ["tidies", "tidy", "tidys"],
      answer: "tidies",
      explain: "He 是一個人。tidy 結尾是子音加 y，改 y 為 i 再加 es：tidies。"
    }),
    q({
      id: "p-doesnt-tidy", tense: "present", type: "choice", trap: true, tag: "doesnt-base",
      stem: "He ____ (not / tidy) his bedroom every day.",
      zh: "他不是每天都收拾睡房。",
      hint: "否定。He 用 doesn't，後面看原形。",
      choices: ["doesn't tidy", "doesn't tidies", "don't tidy"],
      answer: "doesn't tidy",
      explain: "He 是一個人，否定用 doesn't。後面 tidy 用原形，不加 s。"
    }),
    q({
      id: "p-dont-go", tense: "present", type: "choice", trap: true, tag: "plural-dont",
      stem: "My friends ____ (not / go) to the park when it rains.",
      zh: "下雨的時候，朋友們不去公園。",
      hint: "friends 是很多人。否定用 don't。",
      choices: ["don't go", "doesn't go", "don't goes"],
      answer: "don't go",
      explain: "My friends 是很多人，否定用 don't。後面 go 用原形。"
    }),
    q({
      id: "p-feed", tense: "present", type: "choice", tag: "i-base",
      stem: "I ____ (feed) the dog every morning.",
      zh: "我每天早上餵狗。",
      hint: "I 說習慣，用原形。",
      choices: ["feed", "feeds", "am feeding"],
      answer: "feed",
      explain: "every morning 是習慣。I 後面用動詞原形 feed，不加 s。"
    }),
    q({
      id: "p-practise", tense: "present", type: "choice", tag: "plural-base",
      stem: "The girls ____ (practise) the piano every day.",
      zh: "女孩們每天練鋼琴。",
      hint: "girls 是很多人，這是習慣。",
      choices: ["practise", "practises", "are practising"],
      answer: "practise",
      explain: "every day 是習慣。The girls 是很多人，用原形 practise。"
    }),
    q({
      id: "p-goes", tense: "present", type: "choice", trap: true, tag: "goes",
      stem: "She ____ (go) shopping every Saturday.",
      zh: "她每個星期六去購物。",
      hint: "She 是一個人。go 要特別看。",
      choices: ["goes", "go", "gos"],
      answer: "goes",
      explain: "She 是一個人。go 的第三人稱是 goes，不是 gos。"
    }),
    q({
      id: "p-is", tense: "present", type: "choice", tag: "be-is",
      stem: "My dad ____ (be) at home every Sunday.",
      zh: "爸爸每個星期天在家。",
      hint: "every Sunday 是習慣。dad 是一個人。",
      choices: ["is", "are", "was"],
      answer: "is",
      explain: "every Sunday 是習慣，不是昨天。My dad 一個人，be 用 is。"
    }),
    q({
      id: "p-water", tense: "present", type: "choice", tag: "plural-base",
      stem: "They ____ (water) the plants every morning.",
      zh: "他們每天早上澆花。",
      hint: "They 是很多人，這是習慣。",
      choices: ["water", "waters", "are watering"],
      answer: "water",
      explain: "every morning 是習慣。They 是很多人，用原形 water。"
    }),
    q({
      id: "p-play", tense: "present", type: "choice", tag: "plural-base",
      stem: "The boys ____ (play) football every Friday.",
      zh: "男孩們每個星期五踢足球。",
      hint: "every Friday 是習慣。boys 是很多人。",
      choices: ["play", "plays", "are playing"],
      answer: "play",
      explain: "every Friday 是習慣。The boys 是很多人，用原形 play。"
    }),
    q({
      id: "p-watches", tense: "present", type: "choice", tag: "es",
      stem: "She ____ (watch) TV every night.",
      zh: "她每天晚上看電視。",
      hint: "She 是一個人。watch 以 ch 結尾。",
      choices: ["watches", "watch", "watching"],
      answer: "watches",
      explain: "She 是一個人。watch 以 ch 結尾，加 es：watches。"
    }),
    q({
      id: "p-doesnt-cook", tense: "present", type: "choice", tag: "doesnt-base",
      stem: "He ____ (not / cook) lunch every day.",
      zh: "他不是每天都煮午餐。",
      hint: "He 的否定用 doesn't，後面用原形。",
      choices: ["doesn't cook", "doesn't cooks", "don't cook"],
      answer: "doesn't cook",
      explain: "He 用 doesn't。後面 cook 用原形，不能寫 doesn't cooks。"
    }),
    q({
      id: "p-dont-feed", tense: "present", type: "choice", tag: "plural-dont",
      stem: "They ____ (not / feed) the dog every morning.",
      zh: "他們不是每天早上都餵狗。",
      hint: "They 是很多人。",
      choices: ["don't feed", "doesn't feed", "don't feeds"],
      answer: "don't feed",
      explain: "They 是很多人，否定用 don't。後面 feed 用原形。"
    }),
    q({
      id: "p-am", tense: "present", type: "choice", tag: "i-am",
      stem: "I ____ (be) at school every day.",
      zh: "我每天都在學校。",
      hint: "every day 是習慣。主語是 I。",
      choices: ["am", "is", "was"],
      answer: "am",
      explain: "every day 是習慣，不是昨天。I 的 be 用 am。"
    }),
    q({
      id: "p-fixes", tense: "present", type: "choice", trap: true, tag: "weekend-habit",
      stem: "My dad ____ (fix) his bike at the weekend.",
      zh: "爸爸每個週末修腳踏車。",
      hint: "at the weekend 是每個週末，不是 last weekend。",
      choices: ["fixes", "fix", "is fixing"],
      answer: "fixes",
      explain: "at the weekend 是每個週末的習慣。dad 是一個人，fix 加 es：fixes。"
    }),
    q({
      id: "p-dont-watch", tense: "present", type: "choice", tag: "plural-dont",
      stem: "We ____ (not / watch) TV every night.",
      zh: "我們不是每天晚上都看電視。",
      hint: "every night 是習慣。We 是很多人。",
      choices: ["don't watch", "doesn't watch", "aren't watching"],
      answer: "don't watch",
      explain: "every night 是習慣，不是 now。We 用 don't，後面 watch 用原形。"
    }),
    q({
      id: "p-build-does", tense: "present", type: "build", trap: true, tag: "does-q",
      chunks: [{ gap: 0 }, { text: " your dad " }, { gap: 1 }, { text: " his bike at the weekend?" }],
      zh: "爸爸每個週末會修腳踏車嗎？",
      hint: "問習慣。dad 是一個人，後面動詞用原形。",
      slots: [
        { choices: ["Do", "Does", "Is"], answer: "Does" },
        { choices: ["fix", "fixes", "fixing"], answer: "fix" }
      ],
      explain: "dad 是一個人，問習慣用 Does。Does 後面用原形 fix，不加 s。"
    }),
    q({
      id: "p-build-dont", tense: "present", type: "build", tag: "plural-dont",
      chunks: [{ text: "We " }, { gap: 0 }, { text: " " }, { gap: 1 }, { text: " TV every night." }],
      zh: "我們不是每天晚上都看電視。",
      hint: "We 的否定。後面用原形。",
      slots: [
        { choices: ["don't", "doesn't", "aren't"], answer: "don't" },
        { choices: ["watch", "watches", "watching"], answer: "watch" }
      ],
      explain: "We 是很多人，否定用 don't。後面用原形 watch。"
    }),
    q({
      id: "p-build-do", tense: "present", type: "build", tag: "do-q",
      chunks: [{ gap: 0 }, { text: " the girls " }, { gap: 1 }, { text: " the piano every day?" }],
      zh: "女孩們每天練鋼琴嗎？",
      hint: "問習慣。girls 是很多人。",
      slots: [
        { choices: ["Do", "Does", "Are"], answer: "Do" },
        { choices: ["practise", "practises", "practising"], answer: "practise" }
      ],
      explain: "the girls 是很多人，問習慣用 Do。後面用原形 practise。"
    }),
    q({
      id: "p-time-saturday", tense: "present", type: "time", tag: "time-link",
      stem: "My mum washes the clothes ____.",
      zh: "媽媽每個星期六洗衣服。",
      hint: "washes 是習慣。選配它的時間詞。",
      choices: ["every Saturday", "now", "yesterday"],
      answer: "every Saturday",
      explain: "washes 是現在式。配 every Saturday，不配 now 或 yesterday。"
    }),
    q({
      id: "p-time-everyday", tense: "present", type: "time", tag: "time-link",
      stem: "The girls practise the piano ____.",
      zh: "女孩們每天練鋼琴。",
      hint: "practise 沒有 ing，是習慣。",
      choices: ["every day", "now", "last Sunday"],
      answer: "every day",
      explain: "原形 practise、主語是很多人，這是習慣。時間詞用 every day。"
    }),

    q({
      id: "c-boys", tense: "continuous", type: "choice", trap: true, tag: "plural-are-ing",
      stem: "Look! The boys ____ (play) basketball now.",
      zh: "你看！男孩們正在打籃球。",
      hint: "now 是正在做。boys 是很多人。",
      choices: ["are playing", "is playing", "play"],
      answer: "are playing",
      explain: "Look! 和 now 是正在做。The boys 是很多人，用 are playing。"
    }),
    q({
      id: "c-washing", tense: "continuous", type: "choice", tag: "singular-is-ing",
      stem: "Listen! My mum ____ (wash) the clothes now.",
      zh: "你聽！媽媽正在洗衣服。",
      hint: "now 是正在做。mum 是一個人。",
      choices: ["is washing", "are washing", "washes"],
      answer: "is washing",
      explain: "now 是正在做。My mum 是一個人，用 is washing。"
    }),
    q({
      id: "c-making", tense: "continuous", type: "choice", tag: "i-am-ing",
      stem: "I ____ (make) my bed now.",
      zh: "我正在鋪床。",
      hint: "I 正在做。make 要去 e。",
      choices: ["am making", "is making", "make"],
      answer: "am making",
      explain: "I 用 am。make 去掉 e 再加 ing：making。now 是正在做。"
    }),
    q({
      id: "c-arent", tense: "continuous", type: "choice", trap: true, tag: "arent-ing",
      stem: "We ____ (not / watch) TV now.",
      zh: "我們現在不是在看電視。",
      hint: "now 是正在做。We 是很多人。",
      choices: ["aren't watching", "isn't watching", "don't watch"],
      answer: "aren't watching",
      explain: "now 用現在進行式。We 用 aren't，後面 watching 要有 ing。are not watching 也對。"
    }),
    q({
      id: "c-sweeping", tense: "continuous", type: "choice", tag: "singular-is-ing",
      stem: "Look! She ____ (sweep) the floor now.",
      zh: "你看！她正在掃地。",
      hint: "She 是一個人，而且是 now。",
      choices: ["is sweeping", "are sweeping", "sweeps"],
      answer: "is sweeping",
      explain: "now 是正在做。She 是一個人，用 is sweeping。"
    }),
    q({
      id: "c-you-read", tense: "continuous", type: "choice", trap: true, tag: "you-are",
      stem: "You ____ (read) a book now.",
      zh: "你正在看書。",
      hint: "You 不配 is。",
      choices: ["are reading", "is reading", "read"],
      answer: "are reading",
      explain: "You 要配 are。now 是正在做，所以是 are reading。"
    }),
    q({
      id: "c-isnt-fix", tense: "continuous", type: "choice", trap: true, tag: "isnt-ing",
      stem: "He ____ (not / fix) his bike now.",
      zh: "他現在不是在修腳踏車。",
      hint: "now 不是 every day。He 是一個人。",
      choices: ["isn't fixing", "aren't fixing", "doesn't fix"],
      answer: "isn't fixing",
      explain: "now 用現在進行式。He 用 isn't fixing。is not fixing 也對。"
    }),
    q({
      id: "c-cooking", tense: "continuous", type: "choice", tag: "plural-are-ing",
      stem: "They ____ (cook) lunch now.",
      zh: "他們正在煮午餐。",
      hint: "They 是很多人，而且是 now。",
      choices: ["are cooking", "is cooking", "cook"],
      answer: "are cooking",
      explain: "They 是很多人。now 用 are cooking。"
    }),
    q({
      id: "c-am-not", tense: "continuous", type: "choice", tag: "am-not-ing",
      stem: "I ____ (not / water) the plants now.",
      zh: "我現在不是在澆花。",
      hint: "I 的否定不是 isn't。",
      choices: ["am not watering", "isn't watering", "don't water"],
      answer: "am not watering",
      explain: "I 用 am not。now 所以是 am not watering。"
    }),
    q({
      id: "c-he-read", tense: "continuous", type: "choice", tag: "singular-is-ing",
      stem: "He ____ (read) a book now.",
      zh: "他正在看書。",
      hint: "He 是一個人。now。",
      choices: ["is reading", "are reading", "reads"],
      answer: "is reading",
      explain: "He 是一個人，now 用 is reading。"
    }),
    q({
      id: "c-children", tense: "continuous", type: "choice", tag: "plural-are-ing",
      stem: "The children ____ (play) in the park now.",
      zh: "孩子們正在公園玩。",
      hint: "children 是很多人。",
      choices: ["are playing", "is playing", "play"],
      answer: "are playing",
      explain: "The children 是很多人。now 用 are playing。"
    }),
    q({
      id: "c-isnt-tidy", tense: "continuous", type: "choice", tag: "isnt-ing",
      stem: "She ____ (not / tidy) her bedroom now.",
      zh: "她現在不是在收拾睡房。",
      hint: "now 用 is / are，不是 does。",
      choices: ["isn't tidying", "aren't tidying", "doesn't tidy"],
      answer: "isn't tidying",
      explain: "now 是正在做。She 用 isn't tidying。tidy 的 ing 是 tidying。"
    }),
    q({
      id: "c-girls", tense: "continuous", type: "choice", trap: true, tag: "plural-are-ing",
      stem: "The girls ____ (practise) the piano now.",
      zh: "女孩們正在練鋼琴。",
      hint: "now。girls 是很多人。practise 去 e。",
      choices: ["are practising", "is practising", "practise"],
      answer: "are practising",
      explain: "now 是正在做。The girls 用 are practising。"
    }),
    q({
      id: "c-i-read", tense: "continuous", type: "choice", tag: "i-am-ing",
      stem: "I ____ (read) a book now.",
      zh: "我正在看書。",
      hint: "主語是 I，而且是 now。",
      choices: ["am reading", "is reading", "read"],
      answer: "am reading",
      explain: "I 用 am。now 是 am reading。"
    }),
    q({
      id: "c-build-are", tense: "continuous", type: "build", tag: "plural-are-ing",
      chunks: [{ gap: 0 }, { text: " the girls " }, { gap: 1 }, { text: " the piano now?" }],
      zh: "女孩們正在練鋼琴嗎？",
      hint: "問現在正在做。girls 是很多人。",
      slots: [
        { choices: ["Are", "Is", "Do"], answer: "Are" },
        { choices: ["practising", "practise", "practises"], answer: "practising" }
      ],
      explain: "問現在正在做，girls 用 Are。後面用 practising。"
    }),
    q({
      id: "c-build-is", tense: "continuous", type: "build", tag: "singular-is-ing",
      chunks: [{ gap: 0 }, { text: " he " }, { gap: 1 }, { text: " a book now?" }],
      zh: "他正在看書嗎？",
      hint: "問現在正在做。he 是一個人。",
      slots: [
        { choices: ["Is", "Are", "Does"], answer: "Is" },
        { choices: ["reading", "read", "reads"], answer: "reading" }
      ],
      explain: "he 是一個人，問正在做用 Is。後面用 reading。"
    }),
    q({
      id: "c-build-boys", tense: "continuous", type: "build", trap: true, tag: "plural-are-ing",
      chunks: [{ gap: 0 }, { text: " the boys " }, { gap: 1 }, { text: " basketball now?" }],
      zh: "男孩們正在打籃球嗎？",
      hint: "boys 是很多人。不要選 Is。",
      slots: [
        { choices: ["Are", "Is", "Do"], answer: "Are" },
        { choices: ["playing", "play", "plays"], answer: "playing" }
      ],
      explain: "the boys 是很多人，用 Are playing。"
    }),
    q({
      id: "c-time-now", tense: "continuous", type: "time", tag: "time-link",
      stem: "The boys are playing basketball ____.",
      zh: "男孩們正在打籃球。",
      hint: "are playing 是正在做。",
      choices: ["now", "every day", "yesterday"],
      answer: "now",
      explain: "are playing 是現在進行式，配 now。"
    }),
    q({
      id: "c-time-listen", tense: "continuous", type: "time", tag: "time-link",
      stem: "Listen! Mum is washing the clothes ____.",
      zh: "你聽！媽媽正在洗衣服。",
      hint: "is washing 是正在做。",
      choices: ["now", "every Saturday", "yesterday"],
      answer: "now",
      explain: "is washing 配 now，不配 every Saturday。"
    }),

    q({
      id: "w-i-beach", tense: "past", type: "choice", trap: true, tag: "i-was",
      stem: "I ____ (be) at the beach in the summer holiday.",
      zh: "暑假的時候我在沙灘。",
      hint: "in the summer holiday 是以前。主語是 I。",
      choices: ["was", "were", "am"],
      answer: "was",
      explain: "in the summer holiday 是以前。I 用 was。"
    }),
    q({
      id: "w-they-school", tense: "past", type: "choice", trap: true, tag: "they-were",
      stem: "They ____ (be) at school yesterday.",
      zh: "他們昨天在學校。",
      hint: "yesterday 是以前。They 是很多人。",
      choices: ["were", "was", "are"],
      answer: "were",
      explain: "yesterday 是以前。They 是很多人，用 were。"
    }),
    q({
      id: "w-mum", tense: "past", type: "choice", tag: "she-was",
      stem: "My mum ____ (be) at home last Sunday.",
      zh: "媽媽上星期日在家。",
      hint: "last Sunday 是以前。mum 是一個人。",
      choices: ["was", "were", "is"],
      answer: "was",
      explain: "last Sunday 是以前。My mum 一個人，用 was。"
    }),
    q({
      id: "w-we", tense: "past", type: "choice", trap: true, tag: "we-were",
      stem: "We ____ (be) in the countryside last weekend.",
      zh: "我們上週末在郊外。",
      hint: "last weekend 是上個週末，以前。",
      choices: ["were", "was", "are"],
      answer: "were",
      explain: "last weekend 是以前。We 用 were。不是 at the weekend。"
    }),
    q({
      id: "w-you", tense: "past", type: "choice", trap: true, tag: "you-were",
      stem: "You ____ (be) at the park yesterday.",
      zh: "你昨天在公園。",
      hint: "You 以前不用 was。",
      choices: ["were", "was", "are"],
      answer: "were",
      explain: "yesterday 是以前。You 用 were，不是 was。"
    }),
    q({
      id: "w-boys", tense: "past", type: "choice", tag: "they-were",
      stem: "The boys ____ (be) in the village yesterday.",
      zh: "男孩們昨天在村子裡。",
      hint: "boys 是很多人。yesterday。",
      choices: ["were", "was", "are"],
      answer: "were",
      explain: "The boys 是很多人。yesterday 用 were。"
    }),
    q({
      id: "w-wasnt", tense: "past", type: "choice", trap: true, tag: "she-wasnt",
      stem: "She ____ (not / be) at school yesterday.",
      zh: "她昨天不在學校。",
      hint: "She 是一個人。yesterday 的否定。",
      choices: ["wasn't", "weren't", "isn't"],
      answer: "wasn't",
      explain: "yesterday 是以前。She 一個人，否定用 wasn't。was not 也對。"
    }),
    q({
      id: "w-werent", tense: "past", type: "choice", tag: "they-werent",
      stem: "They ____ (not / be) at the beach last Sunday.",
      zh: "他們上星期日不在沙灘。",
      hint: "They 是很多人。",
      choices: ["weren't", "wasn't", "aren't"],
      answer: "weren't",
      explain: "They 是很多人。以前的否定用 weren't。were not 也對。"
    }),
    q({
      id: "w-were-q", tense: "past", type: "choice", trap: true, tag: "were-q",
      stem: "____ they at school yesterday?",
      zh: "他們昨天在學校嗎？",
      hint: "問以前的事。they 是很多人。",
      choices: ["Were", "Was", "Are"],
      answer: "Were",
      explain: "yesterday 是以前。they 用 Were 開頭。"
    }),
    q({
      id: "w-mountains", tense: "past", type: "choice", tag: "he-was",
      stem: "He ____ (be) in the mountains in the summer holiday.",
      zh: "暑假的時候他在山上。",
      hint: "暑假是以前。He 是一個人。",
      choices: ["was", "were", "is"],
      answer: "was",
      explain: "in the summer holiday 是以前。He 用 was。"
    }),
    q({
      id: "w-children", tense: "past", type: "choice", tag: "they-were",
      stem: "The children ____ (be) at Grandma's home last weekend.",
      zh: "孩子們上週末在婆婆家。",
      hint: "children 是很多人。last weekend。",
      choices: ["were", "was", "are"],
      answer: "were",
      explain: "last weekend 是以前。The children 用 were。"
    }),
    q({
      id: "w-friends", tense: "past", type: "choice", tag: "they-were",
      stem: "My friends ____ (be) at the bus station yesterday.",
      zh: "我的朋友們昨天在巴士站。",
      hint: "friends 是很多人。",
      choices: ["were", "was", "are"],
      answer: "were",
      explain: "My friends 是很多人。yesterday 用 were。"
    }),
    q({
      id: "w-was-q", tense: "past", type: "choice", tag: "was-q",
      stem: "____ she at the waterfall last Sunday?",
      zh: "她上星期日在瀑布那裡嗎？",
      hint: "she 是一個人。問以前。",
      choices: ["Was", "Were", "Is"],
      answer: "Was",
      explain: "last Sunday 是以前。she 用 Was 開頭。"
    }),
    q({
      id: "w-i-wasnt", tense: "past", type: "choice", tag: "i-wasnt",
      stem: "I ____ (not / be) at home yesterday.",
      zh: "我昨天不在家。",
      hint: "I 以前的否定。",
      choices: ["wasn't", "weren't", "am not"],
      answer: "wasn't",
      explain: "yesterday 是以前。I 的否定用 wasn't。"
    }),
    q({
      id: "w-dad", tense: "past", type: "choice", tag: "he-was",
      stem: "My dad ____ (be) at the bus station yesterday.",
      zh: "爸爸昨天在巴士站。",
      hint: "yesterday。dad 是一個人。",
      choices: ["was", "were", "is"],
      answer: "was",
      explain: "yesterday 是以前。My dad 一個人，用 was。"
    }),
    q({
      id: "w-we-not", tense: "past", type: "choice", tag: "they-werent",
      stem: "We ____ (not / be) at the beach last weekend.",
      zh: "我們上週末不在沙灘。",
      hint: "We 是很多人。last weekend。",
      choices: ["weren't", "wasn't", "aren't"],
      answer: "weren't",
      explain: "last weekend 是以前。We 用 weren't。"
    }),
    q({
      id: "w-time-y", tense: "past", type: "time", tag: "time-link",
      stem: "They were at school ____.",
      zh: "他們昨天在學校。",
      hint: "were 是以前。",
      choices: ["yesterday", "now", "every day"],
      answer: "yesterday",
      explain: "were 是過去式，配 yesterday。"
    }),
    q({
      id: "w-time-holiday", tense: "past", type: "time", tag: "time-link",
      stem: "I was at the beach ____.",
      zh: "暑假的時候我在沙灘。",
      hint: "was 是以前。",
      choices: ["in the summer holiday", "now", "every morning"],
      answer: "in the summer holiday",
      explain: "was 配 in the summer holiday，不配 now 或 every morning。"
    }),

    q({
      id: "s-every", tense: "present", type: "signal", tag: "signal-present",
      stem: "She practises the piano every day.",
      zh: "她每天練鋼琴。",
      hint: "找時間詞。",
      choices: ["每天的習慣", "現在正在做", "以前發生的"],
      answer: "每天的習慣",
      explain: "every day 是每天。這句是現在式。"
    }),
    q({
      id: "s-look", tense: "continuous", type: "signal", tag: "signal-now",
      stem: "Look! The boys are playing basketball.",
      zh: "你看！男孩們正在打籃球。",
      hint: "看 Look! 和動詞。",
      choices: ["每天的習慣", "現在正在做", "以前發生的"],
      answer: "現在正在做",
      explain: "Look! 和 are playing 是這一刻正在做。"
    }),
    q({
      id: "s-yesterday", tense: "past", type: "signal", tag: "signal-past",
      stem: "They were at school yesterday.",
      zh: "他們昨天在學校。",
      hint: "找 yesterday。",
      choices: ["每天的習慣", "現在正在做", "以前發生的"],
      answer: "以前發生的",
      explain: "yesterday 和 were 是以前。"
    }),
    q({
      id: "s-weekend", tense: "present", type: "signal", tag: "weekend-habit",
      stem: "My dad fixes his bike at the weekend.",
      zh: "爸爸每個週末修腳踏車。",
      hint: "at the weekend 不是 last weekend。",
      choices: ["每天的習慣", "現在正在做", "以前發生的"],
      answer: "每天的習慣",
      explain: "at the weekend 是每個週末的習慣，用現在式 fixes。"
    }),
    q({
      id: "s-now-not", tense: "continuous", type: "signal", tag: "signal-now",
      stem: "We aren't watching TV now.",
      zh: "我們現在不是在看電視。",
      hint: "找 now。",
      choices: ["每天的習慣", "現在正在做", "以前發生的"],
      answer: "現在正在做",
      explain: "now 和 aren't watching 是現在這一刻。"
    }),
    q({
      id: "s-holiday", tense: "past", type: "signal", tag: "signal-past",
      stem: "I was at the beach in the summer holiday.",
      zh: "暑假的時候我在沙灘。",
      hint: "暑假是以前。",
      choices: ["每天的習慣", "現在正在做", "以前發生的"],
      answer: "以前發生的",
      explain: "in the summer holiday 是以前，用 was。"
    })
  ];

  function norm(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .replace(/[’‘]/g, "'")
      .replace(/[.。!！?？]/g, "")
      .replace(/\s+/g, " ")
      .replace(/\bdoes not\b/g, "doesn't")
      .replace(/\bdo not\b/g, "don't")
      .replace(/\bare not\b/g, "aren't")
      .replace(/\bis not\b/g, "isn't")
      .replace(/\bwas not\b/g, "wasn't")
      .replace(/\bwere not\b/g, "weren't");
  }

  function levenshtein(a, b) {
    const rows = Array.from({ length: a.length + 1 }, function (_, i) {
      return [i];
    });
    for (let j = 0; j <= b.length; j += 1) rows[0][j] = j;
    for (let i = 1; i <= a.length; i += 1) {
      for (let j = 1; j <= b.length; j += 1) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        rows[i][j] = Math.min(rows[i - 1][j] + 1, rows[i][j - 1] + 1, rows[i - 1][j - 1] + cost);
      }
    }
    return rows[a.length][b.length];
  }

  function grade(item, raw) {
    if (item.type === "build") {
      if (!Array.isArray(raw) || raw.some(function (part) { return !part; })) {
        return { ok: false, kind: "empty" };
      }
      const ok = item.slots.every(function (slot, index) {
        return norm(raw[index]) === norm(slot.answer);
      });
      return { ok: ok, kind: ok ? "correct" : "grammar" };
    }
    const typed = norm(raw);
    if (!typed) return { ok: false, kind: "empty" };
    if (typed === norm(item.answer)) return { ok: true, kind: "correct" };
    const choices = (item.choices || []).map(norm);
    if (choices.includes(typed)) return { ok: false, kind: "grammar" };
    if (levenshtein(typed, norm(item.answer)) === 1) {
      return { ok: false, kind: "spelling", expected: item.answer };
    }
    return { ok: false, kind: "grammar" };
  }

  function shuffle(list) {
    const copy = list.slice();
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const hold = copy[i];
      copy[i] = copy[j];
      copy[j] = hold;
    }
    return copy;
  }

  function deal(item) {
    const copy = JSON.parse(JSON.stringify(item));
    if (copy.choices) copy.choices = shuffle(copy.choices);
    if (copy.slots) {
      copy.slots = copy.slots.map(function (slot) {
        return { choices: shuffle(slot.choices), answer: slot.answer };
      });
    }
    return copy;
  }

  function take(list, count, used) {
    const out = [];
    shuffle(list).forEach(function (item) {
      if (out.length >= count || used.has(item.id)) return;
      used.add(item.id);
      out.push(item);
    });
    return out;
  }

  function byKind(tense, type) {
    return BANK.filter(function (item) {
      return item.tense === tense && item.type === type;
    });
  }

  function makeRound(kind, stats) {
    const used = new Set();
    const record = stats || { byTag: {} };
    let picked = [];
    if (kind === "present" || kind === "continuous") {
      picked = picked.concat(take(byKind(kind, "choice"), 5, used));
      picked = picked.concat(take(byKind(kind, "build"), 2, used));
      picked = picked.concat(take(byKind(kind, "time"), 1, used));
    } else if (kind === "past") {
      picked = picked.concat(take(byKind("past", "choice"), 6, used));
      picked = picked.concat(take(byKind("past", "time"), 2, used));
    } else if (kind === "mix") {
      picked = picked.concat(take(BANK.filter(function (item) { return item.type === "signal"; }), 2, used));
      picked = picked.concat(take(byKind("present", "choice"), 2, used));
      picked = picked.concat(take(byKind("continuous", "choice"), 2, used));
      picked = picked.concat(take(byKind("past", "choice"), 2, used));
    } else {
      ["present", "continuous", "past"].forEach(function (tense, index) {
        const count = index === 2 ? 2 : 3;
        const ranked = BANK.filter(function (item) {
          return item.tense === tense && item.type !== "signal" && item.type !== "time";
        }).slice().sort(function (a, b) {
          const missA = (record.byTag[a.tag] && record.byTag[a.tag].miss) || 0;
          const missB = (record.byTag[b.tag] && record.byTag[b.tag].miss) || 0;
          if (missB !== missA) return missB - missA;
          return (b.trap === true) - (a.trap === true);
        });
        picked = picked.concat(take(ranked.slice(0, 8), count, used));
      });
    }
    while (picked.length < 8) {
      const rest = BANK.filter(function (item) { return !used.has(item.id); });
      if (!rest.length) break;
      used.add(rest[0].id);
      picked.push(rest[0]);
    }
    return shuffle(picked).slice(0, 8).map(deal);
  }

  function fullSentence(item) {
    if (item.type === "build") {
      return item.chunks.map(function (chunk) {
        if (chunk.text != null) return chunk.text;
        return item.slots[chunk.gap].answer;
      }).join("");
    }
    if (item.type === "signal") return item.stem;
    return item.stem.replace("____", item.answer).replace(/\s*\([^)]*\)/g, "");
  }

  function titleFor(stars) {
    if (stars >= 60) return "大樹";
    if (stars >= 30) return "小樹";
    if (stars >= 10) return "小花";
    return "小苗";
  }

  function longForm(answer) {
    return String(answer)
      .replace(/\bdoesn't\b/g, "does not")
      .replace(/\bdon't\b/g, "do not")
      .replace(/\baren't\b/g, "are not")
      .replace(/\bisn't\b/g, "is not")
      .replace(/\bwasn't\b/g, "was not")
      .replace(/\bweren't\b/g, "were not");
  }

  function auditBank() {
    const problems = [];
    const ids = new Set();
    BANK.forEach(function (item) {
      if (ids.has(item.id)) problems.push("dup " + item.id);
      ids.add(item.id);
      if (!item.explain || !item.zh || !item.tag || !item.tense || !item.hint) problems.push("meta " + item.id);
      if (!TAG_TIPS[item.tag]) problems.push("tip " + item.id);
      if (item.type === "choice" || item.type === "signal" || item.type === "time") {
        if (!item.stem) problems.push("stem " + item.id);
        if (item.choices.length !== 3) problems.push("choices " + item.id);
        if (item.choices.indexOf(item.answer) < 0) problems.push("missing answer " + item.id);
        item.choices.forEach(function (choice) {
          const result = grade(item, choice);
          if (choice === item.answer && !result.ok) problems.push("grade " + item.id);
          if (choice !== item.answer && result.ok) problems.push("false " + item.id + " " + choice);
        });
        if (item.answer.indexOf("n't") >= 0 && !grade(item, longForm(item.answer)).ok) {
          problems.push("long " + item.id);
        }
      }
      if (item.type === "build") {
        item.slots.forEach(function (slot, index) {
          if (slot.choices.indexOf(slot.answer) < 0) problems.push("slot " + item.id + " " + index);
        });
        if (!grade(item, item.slots.map(function (slot) { return slot.answer; })).ok) {
          problems.push("build " + item.id);
        }
        const wrong = item.slots.map(function (slot) {
          return slot.choices.filter(function (choice) { return choice !== slot.answer; })[0];
        });
        if (grade(item, wrong).ok) problems.push("build false " + item.id);
      }
      const sentence = fullSentence(item);
      if (!sentence || sentence.indexOf("____") >= 0) problems.push("sentence " + item.id);
    });
    for (let round = 0; round < 20; round += 1) {
      ["present", "continuous", "past", "mix", "review"].forEach(function (kind) {
        const made = makeRound(kind, { byTag: { "doesnt-base": { miss: 2 }, "plural-are-ing": { miss: 1 } } });
        if (made.length !== 8) problems.push(kind + " length " + made.length);
        const seen = new Set(made.map(function (item) { return item.id; }));
        if (seen.size !== 8) problems.push(kind + " repeat");
      });
    }
    if (grade(BANK[0], "washs").kind !== "spelling") problems.push("spelling wash");
    return problems;
  }

  const api = {
    BANK: BANK,
    ISLANDS: ISLANDS,
    TAG_TIPS: TAG_TIPS,
    grade: grade,
    makeRound: makeRound,
    fullSentence: fullSentence,
    titleFor: titleFor,
    norm: norm,
    auditBank: auditBank
  };

  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.TenseGame = api;
})(typeof globalThis !== "undefined" ? globalThis : this);
