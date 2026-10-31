(() => {
  'use strict';

  const STORAGE_KEY = 'baileysIslandV6RevisionProgress';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const staticCopy = {
    zh: {
      prototype: 'PLAYABLE PROTOTYPE · 5–8 MIN', subtitle: '百灵岛·心的自留地',
      premise: '这里不是永远躲避现实的地方，而是一座暂时停靠、整理感受，再准备离开的岛。',
      aboutButton: '作品与游戏说明', morning: '第一章 · CHAPTER I', afternoon: '第二章 · CHAPTER II', night: '第三章 · CHAPTER III', ferry: '第四章 · CHAPTER IV',
      l1Title: '海边相册', l1Desc: '手机留言、海边拍照与情绪拼贴',
      l2Title: '花田长椅', l2Desc: '友情、边界与真实表达',
      l3Title: '心理地形', l3Desc: '压力、情绪与心理地形整理',
      l4Title: '离岛启程', l4Desc: '专注、方向与离开小岛',
      enter: '进入关卡', locked: '完成第一章后解锁', locked2: '完成第二章后解锁', locked3: '完成第三章后解锁',
      homeStatus: '进度会保存在这台设备上', reset: '重新开始',
      disclaimer: '概念原型 · 不替代专业心理支持 · 选择只保存在本机',
      paused: '游戏已暂停', pauseCopy: '离开屏幕一会儿也没关系。你的关卡进度已经保存。', resume: '继续游戏', backHome: '保存并返回主页',
      aboutTitle: '作品与游戏说明',
      aboutLead: "Bailey's Island 是一个围绕青少年发展变化设计的叙事型严肃游戏原型。岛屿是一处“过渡空间”：玩家能暂时与压力拉开距离，把感受变得可见，再带着新的理解回到现实。",
      originTitle: '为什么做这个项目', originBody: '青少年在身体、身份、同伴关系、家庭期待、学业和未来方向同时变化时，常常缺少表达压力的语言。项目借鉴艺术治疗、游戏化介入与情绪调节方法，让“观察、命名、重演、选择”成为可操作的体验。',
      theoryTitle: '岛屿为什么不是逃避', theoryBody: '设计受到 Winnicott“过渡空间”概念启发。岛不会永久替玩家隔绝现实；它提供一个安全脚手架，直到 Bailey 能把暂停、求助、表达和专注当成自己的能力。',
      playTitle: '四个章节怎么玩', playBody: '海边相册：阅读社交媒体压力、探索拍摄并完成情绪拼贴。花田长椅：经历四个同伴互动场景。心理地形：用四步把过载变成可见、可摆放、可回应的地形。离岛启程：用钓鱼式注意力练习整理方向，再乘渡船离开。',
      howTitle: '操作方式', howClick: '探索物件、选择对话、标记情绪', howPause: '任何时刻暂停或保存返回主页', howUnlock: '完成一个年龄阶段后解锁下一阶段'
      ,guideEmpirical: '理论与经验灵感：非暴力的象征空间', guideSerious: '严肃游戏：叙事、觉察与情绪调节', guideChapterOne: '第一章：拍摄、命名与拼贴的完整玩法'
    },
    en: {
      prototype: 'PLAYABLE PROTOTYPE · 5–8 MIN', subtitle: "BAILEY ISLAND · A HEART'S RETREAT",
      premise: 'This is not a place to hide forever. It is an island where you pause, sort through feelings, and prepare to leave again.',
      aboutButton: 'ARTWORK & GAME GUIDE', morning: 'CHAPTER I', afternoon: 'CHAPTER II', night: 'CHAPTER III', ferry: 'CHAPTER IV',
      l1Title: 'What the Tide Left', l1Desc: 'Pressure, peer messages, and naming emotions',
      l2Title: 'Replay in the Meadow', l2Desc: 'Friendship, boundaries, help, and honesty',
      l3Title: 'Emotion Terrain', l3Desc: 'Pressure, emotion, and arranging inner terrain', l4Title: 'Leaving the Island', l4Desc: 'Focus, direction, and leaving the island',
      enter: 'ENTER LEVEL', locked: 'FINISH CHAPTER I TO UNLOCK', locked2: 'FINISH CHAPTER II TO UNLOCK', locked3: 'FINISH CHAPTER III TO UNLOCK',
      homeStatus: 'Progress is saved on this device', reset: 'RESET JOURNEY',
      disclaimer: 'CONCEPT PROTOTYPE · NOT A SUBSTITUTE FOR PROFESSIONAL SUPPORT · CHOICES STAY ON THIS DEVICE',
      paused: 'GAME PAUSED', pauseCopy: 'It is okay to step away. Your level progress has been saved.', resume: 'RESUME', backHome: 'SAVE & RETURN HOME',
      aboutTitle: 'ARTWORK & GAME GUIDE',
      aboutLead: "Bailey's Island is a narrative serious-game prototype about adolescent change. The island is a transitional space: players step back from pressure, make feelings visible, and return with new understanding.",
      originTitle: 'WHY THIS PROJECT', originBody: 'Changes in identity, peers, family expectations, school, and the future can arrive all at once. Drawing on art therapy, game-based intervention, and emotional regulation, the project turns observing, naming, replaying, and choosing into playable actions.',
      theoryTitle: 'WHY THE ISLAND IS NOT ESCAPE', theoryBody: "Inspired by Winnicott's transitional space, the island never shelters Bailey forever. It offers temporary scaffolding until pausing, asking for help, speaking honestly, and focusing become skills Bailey can carry away.",
      playTitle: 'HOW THE FOUR CHAPTERS WORK', playBody: 'Beach Album explores social pressure, photography, and emotion collage. Meadow Bench holds four peer encounters. Emotion Terrain turns overload into a visible landscape in four steps. Leaving the Island uses a fishing attention exercise before Bailey departs.',
      howTitle: 'HOW TO PLAY', howClick: 'Explore objects, choose dialogue, label emotions', howPause: 'Pause or save and return home at any time', howUnlock: 'Complete each age to unlock the next'
      ,guideEmpirical: 'Theoretical and empirical inspiration: a non-violent symbolic space', guideSerious: 'Serious games: narrative, awareness, and emotional regulation', guideChapterOne: 'Chapter I: the complete photograph, name, and collage loop'
    }
  };

  const defaultState = () => ({
    lang: 'en', music: true, unlocked: 0, completed: [false, false, false, false],
    levels: [
      { revision: 'ch1-v2', step: 0, bodyMarks: {}, bodyDone: [], found: [], photoWords: {}, collagePositions: {}, messageColors: {}, brushed: [], selfNote: '' },
      { revision: 'ch2-final', step: 0, memory: 0, seeds: [], tutorialSeen: false, flipped: [] },
      { revision: 'ch3-final', step: 0, noises: [], shoreStep: 0, touch: null, fragments: [], fragmentDraft: {}, bottles: {}, flipped: [], saveMode: 0, note: '', colors: [], placements: [] },
      { revision: 'ch4-final', step: 0, cast: false, anxieties: [], anxietyActions: {}, steady: [], steadyActions: {}, mirrorChoices: [], boarded: false }
    ]
  });

  let state = loadState();
  let currentLevel = null;
  let selectedMessage = 0;
  let selectedFuture = 0;
  let toastTimer;
  let audio = null;
  let confirmMode = 'journey';
  let introCanSkip = false;
  let activePhoto = null;
  let morningPressTimer = null;
  let activeBodyMessage = null;
  let birdTimer = null;

  const story = {
    morning: {
      title: ['海边相册', 'BEACH ALBUM'],
      eyebrow: ['LEVEL 01 · 海边相册', 'LEVEL 01 · BEACH ALBUM'],
      prompts: ['把“说不出的感觉”先变成“看得见的东西”。', 'Turn what cannot yet be said into something that can be seen.'],
      copy: {
        'CH1-OPEN-1': ['潮水刚退。沙滩还湿着，像一张没人写过字的纸。', 'The tide has just gone out. The sand is still wet — a page no one has written on.'],
        'CH1-OPEN-2': ['Bailey 的手机在兜里亮了一下，又暗下去。', "Bailey's phone lights up in a pocket, then goes dark."],
        'CH1-OPEN-3': ['浮木上挂着一台旧相机，钉着一张卡片：', 'An old camera hangs from the driftwood, a card pinned beneath it:'],
        'CH1-OPEN-CARD': ['「手机先留在现实里。在这里，只拍你想看的。」', '"Leave the phone in the real world. Here, you only photograph what you want to see."'],
        'CH1-P1-INTRO': ['有几条消息跟了过来，悬在海风上方。按住它们，选出它落下的每个地方——可以不止一个。', 'A few messages followed you here, hanging in the sea air. Press and hold each one. Pick every place it lands — it can be more than one.'],
        'CH1-P1-MSG1': ['【群聊】一张合影，@ 了所有人。拍照那天，没人叫 Bailey。', '[Group chat] A group photo, everyone tagged. No one asked Bailey that day.'],
        'CH1-P1-MSG2': ['"你今天好安静，没事吧？"', '"You\'re so quiet today. You okay?"'],
        'CH1-P1-MSG3': ['九宫格自拍 · 217 个赞', 'Nine perfect selfies. 217 likes.'],
        'CH1-P1-MSG4': ['"周末我们都去，就你补课，哈哈"', '"We\'re all going this weekend — except you, extra classes, lol"'],
        'CH1-P1-BODY1': ['胸口——闷闷的', 'The chest — a dull weight'], 'CH1-P1-BODY2': ['胃——沉沉地坠着', 'The stomach — sinking'],
        'CH1-P1-BODY3': ['喉咙——像被什么卡住', 'The throat — something stuck'], 'CH1-P1-BODY4': ['眼睛——发酸', 'The eyes — stinging'],
        'CH1-P1-BODY5': ['说不上来——但它确实在', "Nowhere I can name — but it's there"],
        'CH1-P1-DONE': ['消息变成一枚半透明的贝壳，落在沙滩上。不再发光，也不再震动。', 'The message turns into a translucent shell on the sand. It stops glowing. It stops buzzing.'],
        'CH1-P2-INTRO': ['潮水退去的地方，有东西在反光。走近一点，举起相机。', 'Where the tide pulled back, something glints. Come closer. Raise the camera.'],
        'CH1-P2-ITEM1': ['被潮水冲来的灰绿色漂流瓶', 'A gray-green bottle carried in by the tide'], 'CH1-P2-ITEM2': ['被海浪磨圆的蓝色海玻璃', 'Blue sea glass worn smooth by waves'],
        'CH1-P2-ITEM3': ['带着灰色内壁的白色螺旋贝壳', 'A white spiral shell with a gray inner curve'], 'CH1-P2-ITEM4': ['潮线上留下的粉色扇贝壳', 'A pink scallop shell left at the tide line'],
        'CH1-P2-ITEM5': ['漂在浅水里的粉色水母', 'A pink jellyfish drifting in the shallows'], 'CH1-P2-ITEM6': ['举着双钳的红色小螃蟹', 'A little red crab raising both claws'],
        'CH1-P2-ITEM7': ['大礁石下面的绿色水草', 'Green seaweed below the large rocks'], 'CH1-P2-ITEM8': ['沙地上的粉红色小花', 'A little pink flower in the sand'],
        'CH1-P2-ITEM9': ['潮线旁的灰色大礁石', 'Large gray rocks beside the tide line'],
        'CH1-P2-PROMPT': ['给它选个词——不是答案，是它此刻像什么。', "Give it a word. Not the right answer — what it's like right now."],
        'CH1-P2-WORD1': ['安静', 'quiet'], 'CH1-P2-WORD2': ['扎手', 'sharp-edged'], 'CH1-P2-WORD3': ['被磨圆了', 'worn smooth'],
        'CH1-P2-WORD4': ['漂着', 'drifting'], 'CH1-P2-WORD5': ['晒干了', 'dried out'], 'CH1-P2-WORD6': ['颜色很好看', 'a really nice color'],
        'CH1-P2-WORD7': ['＋写自己的词', '+ your own word'],
        'CH1-P3-INTRO': ['照片和贝壳都到了纸上。给每条消息选一种颜色——它给你什么感觉的颜色。然后盖住它。不是删除，是覆盖。', 'Photos and shells, all on the page now. Give each message a color — the color of how it feels. Then cover it. Not erase. Cover.'],
        'CH1-P3-TPL1': ['「我先把它放在这里。」', '"I\'ll leave it here for now."'], 'CH1-P3-TPL2': ['「今天先这样。」', '"That\'s enough for today."'],
        'CH1-P3-TPL3': ['「这些是我的。」', '"These are mine."'],
        'CH1-NARR-1': ['相册不装答案。它只装你今天看到的东西。', 'An album holds no answers. Only what you saw today.'],
        'CH1-END': ['Bailey 把照片夹进本子。雾散开一线，远处露出一片起伏的花田。', 'Bailey slips the photos into a notebook. The fog parts — a meadow rises in the distance.']
      },
      messages: ['CH1-P1-MSG1','CH1-P1-MSG2','CH1-P1-MSG3','CH1-P1-MSG4'],
      bodies: ['CH1-P1-BODY1','CH1-P1-BODY2','CH1-P1-BODY3','CH1-P1-BODY4','CH1-P1-BODY5'],
      items: ['CH1-P2-ITEM1','CH1-P2-ITEM3','CH1-P2-ITEM5','CH1-P2-ITEM6','CH1-P2-ITEM7','CH1-P2-ITEM2','CH1-P2-ITEM4','CH1-P2-ITEM8','CH1-P2-ITEM9'],
      words: ['CH1-P2-WORD1','CH1-P2-WORD2','CH1-P2-WORD3','CH1-P2-WORD4','CH1-P2-WORD5','CH1-P2-WORD6'],
      templates: ['CH1-P3-TPL1','CH1-P3-TPL2','CH1-P3-TPL3']
    },
    afternoon: {
      title: ['花田长椅', 'MEADOW BENCH'], eyebrow: ['LEVEL 02 · 15–16 岁', 'LEVEL 02 · AGE 15–16'],
      prompts: ['友情、边界与真实表达——说出口不一定换来想要的结果，但不说，别人只能猜。', 'Friendship, boundaries, and honest expression — speaking may not bring the result you want, but silence leaves others guessing.'],
      copy: {
        'CH2-OPEN': ['花田。风一阵一阵，把花压成浪的形状。长椅一端坐着 Bailey，膝盖上放着手机。不远处的草地上，George 和 Olivia 头凑着头在笑。', 'A meadow. The wind comes in waves, bending flowers into the shape of water. Bailey sits at one end of an old bench, phone on their lap. Nearby, George and Olivia lean their heads together, laughing.'],
        'CH2-TUTORIAL': ['这一章，时间可以冻结。换个做法，重演一遍。没有标准答案——只有你更愿意要哪一种后果。', "In this chapter, time can freeze. Try another way; replay the moment. No right answer — only consequences you'd rather live with."],
        'CH2-S1-SETUP': ['【三人小群】George 和 Olivia 聊着周末的唱片店，聊着聊着，全是只有他们懂的梗。Bailey 的两条消息悬在中间，没人接。Olivia：“那就这么说定啦！”没有人确认过 Bailey 去不去。输入框里有半句话，光标在闪：', '[Group of three] George and Olivia are planning the record store trip, sliding into jokes only they get. Bailey\'s two messages hang in the middle, unanswered. Olivia: "It\'s settled then!" No one ever checked if Bailey is coming. Half a sentence waits in the input box, cursor blinking:'],
        'CH2-S1-HALF': ['“其实我周末想去”', '"I actually wanted to go this weekend"'],
        'CH2-S1-OPT-A': ['发出去：“等等，我也想去，这周末我可以。”', 'Send it: "Wait — I want to come. I\'m free this weekend."'], 'CH2-S1-OPT-B': ['回一个“哈哈好的”＋表情', 'Reply "haha ok" plus an emoji'], 'CH2-S1-OPT-C': ['关掉群聊，什么都不说', 'Close the chat. Say nothing.'], 'CH2-S1-OPT-D': ['“你们去吧，我正好有事。”', '"You two go. I have plans anyway."'],
        'CH2-S1-CON-A': ['Olivia 秒回：“天啊忘了圈你！一起一起！”', 'Olivia answers instantly: "omg forgot to tag you!! you\'re coming!!"'], 'CH2-S1-CON-B': ['群里继续热闹。Bailey 的手机暗下去。风声，大了一点。', 'The chat stays lively. Bailey\'s screen goes dark. The wind gets a little louder.'], 'CH2-S1-CON-C': ['屏幕暗下去。Bailey 数了七朵被风压弯的花。', 'The screen goes dark. Bailey counts seven flowers bent by the wind.'],
        'CH2-S1-CON-D': ['George："啊？好吧……""对方正在输入"闪了又灭。什么都没发来。', 'George: "oh. ok…" — "typing…" flickers, then disappears. Nothing arrives.'],
        'CH2-REPLAY': ['⏸ 冻结 / 重演——想换个做法吗？', '⏸ Freeze / Replay — want to try another way?'],
        'CH2-S2-SETUP': ['奶茶店。George 和 Olivia 在聊下周露营：“就带那个两人帐篷。”Bailey 的吸管在杯子里转了一圈，又一圈。', 'Bubble tea shop. George and Olivia are planning next week\'s camping trip: "We\'ll just bring the two-person tent." Bailey\'s straw circles the cup. Once. Twice.'],
        'CH2-S2-OPT-A': ['“露营……我能去吗？”', '"Camping… can I come?"'], 'CH2-S2-OPT-B': ['“你们最近，好像总在单独做计划。”', '"Lately, it feels like you two plan things without me."'], 'CH2-S2-OPT-C': ['低头刷手机，假装没听见', 'Look down. Scroll. Pretend not to hear.'], 'CH2-S2-OPT-D': ['“行啊你们，私奔不带我。”', '"Wow, running off without me."'],
        'CH2-S2-CON-AB': ['两个人愣住。“我们以为你对露营没兴趣……你上次说怕虫子。”', 'They both freeze. "We thought you hated camping… you said you were scared of bugs."'], 'CH2-S2-CON-C': ['计划继续。Bailey 的屏幕很亮，一个字也没看进去。', 'The planning goes on. Bailey\'s screen is bright. Not a single word gets in.'], 'CH2-S2-CON-D': ['三个人都笑了。玩笑接住了场面——没接住失落。', 'All three laugh. The joke catches the moment. It doesn\'t catch the ache.'],
        'CH2-S3-SETUP': ['滑冰场，彩灯转着。George 和 Olivia 已经滑进中央。Bailey 扶着栏杆，膝盖在抖。George 喊：“Bailey，快来！”', 'The rink, lights spinning. George and Olivia are already gliding in the middle. Bailey grips the rail, knees shaking. George calls: "Bailey, come on!"'],
        'CH2-S3-OPT-A': ['“我不太会……你们教我？”', '"I can\'t really skate… teach me?"'], 'CH2-S3-OPT-B': ['“你们先滑，我看会儿。”', '"You two go ahead. I\'ll watch a while."'], 'CH2-S3-OPT-C': ['松手，硬上。', 'Let go of the rail. Go anyway.'], 'CH2-S3-OPT-D': ['“我妈让我早点回去，先走了。”', '"My mom wants me home early. Gotta go."'],
        'CH2-S3-CON-A': ['Olivia 滑回来，一人一边架住 Bailey：“摔了我们一起摔。”摔了。三个人笑成一团。', 'Olivia skates back. They hold Bailey up, one on each side. "If you fall, we all fall." They fall. All three laugh till it hurts.'], 'CH2-S3-CON-B': ['Bailey 在场边坐了二十分钟。有点遗憾，但心里是稳的。', 'Bailey watches for twenty minutes. A little wistful — but steady inside.'], 'CH2-S3-CON-C': ['重重一跤，膝盖生疼。朋友们冲过来。后来，这成了三个人的段子。只是 Bailey 心里清楚：刚才那一下，是在赌。', 'A hard fall, a sore knee. Friends rush over. Later it becomes their favorite story. Only Bailey knows: that step was a gamble.'], 'CH2-S3-CON-D': ['“哦……那你路上小心。”回家的路上风很大。妈妈根本没打过电话。', '"Oh… get home safe." The wind is loud on the walk home. Mom never called.'],
        'CH2-S4-SETUP': ['Bailey 的生日。气球，蛋糕，一顶小小的派对帽。Olivia 来不了了。George 坐下没多久就看了眼时间：“生日快乐。不过我等下得早点走，家里有事。”', 'Bailey\'s birthday. Balloons, a cake, a small paper hat. Olivia can\'t make it. George has barely sat down when he checks the time: "Happy birthday. But I have to leave early — family thing."'],
        'CH2-S4-OPT-A': ['“你们根本不在乎我！”（一个气球被拍在地上）', '"You don\'t care about me at all!" (a balloon slapped to the floor)'], 'CH2-S4-OPT-B': ['“我今天，其实特别想你们都在。”', '"Today… I really wanted you both here."'], 'CH2-S4-OPT-C': ['“没事，你去吧。”然后一个人收拾', '"It\'s fine. Go ahead." Then clean up alone.'], 'CH2-S4-OPT-D': ['“能再待十分钟吗？吃完这块蛋糕。”', '"Can you stay ten more minutes? Finish this slice with me."'],
        'CH2-S4-CON-A': ['George 的表情像被烫了一下。他提前走了。话，收不回来。', 'George flinches as if burned. He leaves early. Words don\'t come back.'], 'CH2-S4-CON-B': ['George 重新坐下：“对不起。我再待一会儿。”蛋糕很甜。', 'George sits back down. "Sorry. I\'ll stay a little longer." The cake is sweet.'], 'CH2-S4-CON-C': ['夜里，Bailey 一个人躺在床上。George 永远不会知道。被压住的感受没有消失，只是没人看见。', 'That night, Bailey lies awake alone. George will never know. What gets pushed down doesn\'t disappear — it just goes unseen.'], 'CH2-S4-CON-D': ['George 笑了：“十分钟还是有的。”', 'George grins. "Ten minutes, I can do."'],
        'CH2-FLIP-INTRO': ['有些话，可以翻到背面听。', 'Some words can be turned over.'], 'CH2-FLIP-GEORGE': ['「我提前走，是想去练吉他。想下次弹给你听。还没练好，不好意思说。」', '"I left early to practice guitar. I wanted to play for you next time. It\'s not good yet. I was embarrassed."'], 'CH2-FLIP-OLIVIA': ['「我不敢来。上次考砸了，怕把气氛弄砸。」', '"I didn\'t dare come. I bombed the last exam. I was afraid I\'d ruin the mood."'], 'CH2-NARR-1': ['很多疏离不是不在乎。是各自藏着。', 'Most distance isn\'t indifference. It\'s two people hiding at the same time.'], 'CH2-END': ['你做的每个选择，都变成一粒种子，落进花田。它们会长大。', 'Every choice you made becomes a seed in the meadow. They will grow.']
      },
      scenes: [
        { kind:'chat', setup:'CH2-S1-SETUP', half:'CH2-S1-HALF', opts:['CH2-S1-OPT-A','CH2-S1-OPT-B','CH2-S1-OPT-C','CH2-S1-OPT-D'], cons:['CH2-S1-CON-A','CH2-S1-CON-B','CH2-S1-CON-C','CH2-S1-CON-D'] },
        { kind:'shop', setup:'CH2-S2-SETUP', opts:['CH2-S2-OPT-A','CH2-S2-OPT-B','CH2-S2-OPT-C','CH2-S2-OPT-D'], cons:['CH2-S2-CON-AB','CH2-S2-CON-AB','CH2-S2-CON-C','CH2-S2-CON-D'] },
        { kind:'rink', setup:'CH2-S3-SETUP', opts:['CH2-S3-OPT-A','CH2-S3-OPT-B','CH2-S3-OPT-C','CH2-S3-OPT-D'], cons:['CH2-S3-CON-A','CH2-S3-CON-B','CH2-S3-CON-C','CH2-S3-CON-D'] },
        { kind:'birthday', setup:'CH2-S4-SETUP', opts:['CH2-S4-OPT-A','CH2-S4-OPT-B','CH2-S4-OPT-C','CH2-S4-OPT-D'], cons:['CH2-S4-CON-A','CH2-S4-CON-B','CH2-S4-CON-C','CH2-S4-CON-D'] }
      ]
    },
    terrain: {
      title: ['心理地形', 'EMOTION TERRAIN'], eyebrow: ['LEVEL 03 · 16–17 岁', 'LEVEL 03 · AGE 16–17'],
      prompts: ['从过载的噪音里找到岸边，再把压力变成可以看见、摆放与回应的心理地形。', 'Find the shore inside overload, then make pressure visible, movable, and answerable.'],
      copy: {
        'CH3-OPEN-1':['放学后的图书馆几乎空了。灯光偏白，翻书声和空调声都显得过于清楚。Bailey 坐在靠窗的位置，面前摊着一张模拟卷，红色的批注很刺眼。','The after-school library is nearly empty. The light is too white; pages and air-conditioning sound too clear. Bailey sits by the window, a mock exam spread out, red marks too bright.'],
        'CH3-OPEN-2':['手机不停震动：分数、申请、补课、排名。还有一句——"你不是一直都很稳吗"。','The phone keeps buzzing: grades, applications, extra classes, rankings. And one line — "You\'re always so steady, right?"'],
        'CH3-OPEN-3':['呼吸开始变浅，手微微发抖。起身时，一本旧书掉在地上，书里滑出一个细长的盒子：「当你的脑海变成天气，就从岸边开始。」','Breathing goes shallow; hands tremble slightly. Standing up, Bailey knocks an old book to the floor. A narrow box slides out: "When your mind turns to weather, begin at the shore."'],
        'CH3-P1-INTRO':['点一点：是什么，最难受。','Tap: what hurts the most.'],
        'CH3-P1-FEEL1':['太亮了','Too bright'],'CH3-P1-FEEL2':['太吵了','Too loud'],'CH3-P1-FEEL3':['太近了','Too close'],'CH3-P1-FEEL4':['透不过气','Can\'t breathe'],'CH3-P1-FEEL5':['不想看','Don\'t want to look'],
        'CH3-P2-CARD':['不必立刻解释，先找到今天的岸边。可以停下，可以留白，可以不完整。','No need to explain yet. Find today\'s shoreline first. You may stop. You may leave blank. You may stay unfinished.'],
        'CH3-P2-AUDIO':['先别想怎么变好。先把最吵的那部分，放下来。','Don\'t think about getting better yet. First, put down the loudest part.'],
        'CH3-P2-TOUCH1':['涂抹','Smear'],'CH3-P2-TOUCH2':['按压','Press'],'CH3-P2-TOUCH3':['遮盖','Cover'],'CH3-P2-TOUCH4':['留白','Leave blank'],
        'CH3-NARR-1':['每个人都有自己的岸线。','Everyone has their own shoreline.'],'CH3-P3-COLOR':['给它一种颜色——它在你心里的颜色。','Give it a color — the color it has inside you.'],
        'CH3-P3-FRAG1':['你不是一直都很稳吗','You\'re always so steady, right?'],'CH3-P3-FRAG2':['我真的不能再掉了','I can\'t afford to drop any lower.'],'CH3-P3-FRAG3':['我好像永远差一点','I\'m always just short of enough.'],'CH3-P3-FRAG4':['不能让别人看出来','No one can see this.'],'CH3-P3-FRAG5':['这不是脆弱，这是没用','This isn\'t weakness — it\'s uselessness.'],'CH3-P3-FRAG6':['我不知道还要坚持什么','I don\'t know what I\'m holding on for.'],
        'CH3-P3-PLACE1':['压到纸底','Press it under the page'],'CH3-P3-PLACE2':['放在边缘','Leave it at the edge'],'CH3-P3-PLACE3':['晕开','Let it bleed'],'CH3-P3-PLACE4':['撕成一半','Tear it in half'],'CH3-P3-PLACE5':['漂在海面','Set it afloat'],'CH3-P3-PLACE6':['用描图纸盖住','Veil it with tracing paper'],'CH3-P3-PLACE7':['留白，先不整理','Leave it unfiled'],
        'CH3-P4-INTRO':['潮水带来几只漂流瓶。','The tide brings in a few drifting bottles.'],'CH3-P4-BOT1':['我也不敢看分数','I don\'t dare look at my grades either.'],'CH3-P4-BOT2':['我妈以为我没事','My mom thinks I\'m fine.'],'CH3-P4-BOT3':['我装得很轻松','I\'m only pretending it\'s easy.'],'CH3-P4-BOT4':['我怕一停下来就完了','I\'m scared that if I stop, I\'m done.'],'CH3-P4-BOT5':['我以为只有我这样','I thought I was the only one.'],
        'CH3-P4-ACT1':['靠近听一听','Come closer and listen'],'CH3-P4-ACT2':['放进自己的海域','Keep it in your waters'],'CH3-P4-ACT3':['给一个回应','Give a reply'],
        'CH3-P4-REPLY1':['「我看见了」','"I see you."'],'CH3-P4-REPLY2':['「原来不只是我」','"So it\'s not just me."'],'CH3-P4-REPLY3':['「先放在这里」','"Leave it here for now."'],'CH3-P4-REPLY4':['「不用现在说清楚」','"No need to say it yet."'],
        'CH3-FLIP-1-FRONT':['你不是一直都很稳吗','You\'re always so steady, right?'],'CH3-FLIP-1-BACK':['因为我也想有人告诉我：偶尔不稳，也没关系。','Because I wish someone would tell me: it\'s okay to wobble sometimes.'],'CH3-FLIP-2-FRONT':['别矫情，大家都这样','Don\'t be dramatic. Everyone\'s like this.'],'CH3-FLIP-2-BACK':['我不知道怎么开口，说我也很累。','I don\'t know how to say out loud that I\'m tired too.'],
        'CH3-SAVE-1':['只为自己保存','Keep it just for me'],'CH3-SAVE-2':['匿名放进绘画库','Add it anonymously'],'CH3-SAVE-3':['用昵称上传','Sign it with a nickname'],'CH3-SAVE-4':['稍后再决定','Decide later'],
        'CH3-NOTE-1':['今天太吵了','Today was too loud.'],'CH3-NOTE-2':['我先把它放在这里','I\'ll leave it here.'],'CH3-NOTE-3':['原来真的不只是我','It really isn\'t just me.'],'CH3-NOTE-4':['还没想清楚，但没刚才那么窒息了','Still figuring it out — but I can breathe a little more.'],'CH3-NOTE-5':['给也在潮水里的人','For whoever else is in the tide.'],
        'CH3-END':['Bailey 把画夹进书里。窗外，风吹动树叶。世界还是原来的世界——但 Bailey 和世界之间，重新有了一点空隙。','Bailey slips the page between the book\'s covers. Outside, wind moves through the leaves. The world is the same world — but a little space has opened between it and Bailey.'],
        'CH3-ENDLINE':['有些答案不是一下子想出来的。它们先以水流、岸线和回声的方式回来。','Some answers don\'t arrive all at once. They come back first as currents, shorelines, and echoes.']
      }
    },
    night: {
      title: ['离岛启程', 'LEAVING THE ISLAND'],
      eyebrow: ['LEVEL 04 · 17–18 岁', 'LEVEL 04 · AGE 17–18'],
      prompts: ['把未来的噪音一条条钓起，再点亮三盏能带走的灯。', 'Fish future worries out one at a time, then light three lanterns to carry away.'],
      copy: {
        'CH4-OPEN-1':['接近黄昏。渡口的水很平，远处有零星的云。栈桥尽头坐着 Bailey：一根旧钓竿，一盏没点的灯笼。','Near dusk. The water at the crossing lies flat, with scattered clouds in the distance. At the end of the pier sits Bailey: an old fishing rod and an unlit lantern.'],
        'CH4-NARR-1':['岛，从来不是用来永远住下的。潮水今夜向外流。','An island was never meant to be lived on forever. This evening, the tide runs outward.'],
        'CH4-P1-TUTORIAL':['浮标下沉时收线。太快、太慢都会脱钩——只有刚刚好的那一刻。','Reel when the bobber sinks. Too fast or too slow and the line slips. Only the just-right moment holds.'],
        'CH4-P1-FISH1':['考不上怎么办','What if I don\'t get in?'],'CH4-P1-FISH2':['别人好像都有方向了','Everyone else seems to know their way.'],'CH4-P1-FISH3':['离开这里，我会不会什么都不是','If I leave here, am I nothing?'],'CH4-P1-FISH4':['选错了，还能重来吗','If I choose wrong, can I start over?'],
        'CH4-P1-ACT-BACK':['放回水里——"先不处理"','Put it back — "not yet"'],'CH4-P1-ACT-KEEP':['装进灯笼——"带着走"','Into the lantern — "I\'ll carry it"'],
        'CH4-P2-INTRO':['不知道从第几杆起，水变了。','Somewhere between casts, the water changed.'],'CH4-P2-FISH1':['拍完照片那天，海很蓝','The day I took those photos, the sea was very blue.'],'CH4-P2-FISH2':['我挺会听别人说话的','I\'m good at listening to people.'],'CH4-P2-FISH3':['不知道要什么，但知道不要什么','I don\'t know what I want. I know what I don\'t.'],'CH4-P2-FISH4':['可以害怕，也可以走','I can be afraid, and still go.'],'CH4-P2-ACT-LIGHT':['点亮','Light it'],'CH4-P2-ACT-BACK':['放回','Let it go'],
        'CH4-P3-MIRROR':['你标记过的感受。你说过出口的话。你盖住又留下的颜色。你点亮的句子。','The feelings you marked. The words you said out loud. The colors you covered — and kept. The sentences you lit.'],'CH4-P3-PROMPT':['选一至三句，带上船。','Choose one to three sentences to take aboard.'],'CH4-NARR-2':['你不是答案。你是这些选择的总和——以及它们还没成为的部分。','You are not an answer. You are the sum of these choices — and everything they haven\'t become yet.'],
        'CH4-P4-LOOK':['渡船靠岸。Bailey 回头：岛没有消失，只是变小了。水从岛上穿过，流向远处的云。','The ferry docks. Bailey looks back: the island hasn\'t vanished — it\'s just smaller. Water runs through it, toward the distant clouds.'],'CH4-P4-BOARD':['登船','Board'],'CH4-P4-REALITY':['早晨。一间普通的房间。桌上放着一本笔记、一张画，和一页新写的句子。','Morning. An ordinary room. On the desk: a notebook, a painting, a page of newly written sentences.'],'CH4-ENDLINE':['有些答案不是一下子想出来的。它们先以水流、岸线与回声的方式回来。岛会一直在。需要时，潮线之上见。','Some answers don\'t arrive all at once. They come back first as currents, shorelines, and echoes. The island stays. When you need it — meet it above the tide line.'],'END-TIDELOG':['你不是唯一一座等退潮的岛。','You are not the only island waiting for the tide.'],'END-REPLAY':['回到岛上','Return to the islands']
      }
    }
  };

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      const base = defaultState();
      if (!saved) return base;
      const restored = {
        ...base, ...saved,
        completed: Array.isArray(saved.completed) ? base.completed.map((value, index) => saved.completed[index] ?? value) : base.completed,
        levels: base.levels.map((level, index) => ({ ...level, ...(saved.levels?.[index] || {}) }))
      };
      if (restored.levels[0].revision !== 'ch1-v2') {
        restored.levels[0] = base.levels[0]; restored.completed[0] = false;
      }
      if (restored.levels[1].revision !== 'ch2-final') {
        restored.levels[1] = base.levels[1]; restored.completed[1] = false;
      }
      if (restored.levels[2].revision !== 'ch3-final') {
        restored.levels[2] = base.levels[2]; restored.completed[2] = false;
      }
      if (restored.levels[3].revision !== 'ch4-final') {
        restored.levels[3] = base.levels[3]; restored.completed[3] = false;
      }
      return restored;
    } catch { return defaultState(); }
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    updateHome();
  }

  function t(pair) { return pair[state.lang === 'zh' ? 0 : 1]; }
  function morningCopy(key) { return t(story.morning.copy[key]); }
  function afternoonCopy(key) { return t(story.afternoon.copy[key]); }
  function terrainCopy(key) { return t(story.terrain.copy[key]); }
  function nightCopy(key) { return t(story.night.copy[key]); }

  function setLanguage() {
    document.documentElement.lang = state.lang === 'zh' ? 'zh-CN' : 'en';
    $$('[data-i18n]').forEach(el => {
      const value = staticCopy[state.lang][el.dataset.i18n];
      if (value) el.textContent = value;
    });
    $('#langBtn').textContent = state.lang === 'zh' ? 'EN' : '中';
    if (currentLevel !== null) renderLevel();
    updateHome();
  }

  function levelPercent(index) {
    if (state.completed[index]) return 100;
    const level = state.levels[index];
    if (index === 0) return [6, 18 + (level.bodyDone?.length || 0) * 16, 45 + Object.keys(level.photoWords || {}).length * 4.3, 84 + (level.brushed?.length || 0) * 3, 96][level.step] || 6;
    if (index === 1) return Math.min(94, 8 + level.memory * 22);
    if (index === 2) return Math.min(94, 8 + level.step * 22);
    return level.step === 0 ? 8 : level.step === 1 ? 25 + (level.fish || 0) * 12 : level.step === 2 ? 60 + (level.lanterns?.length || 0) * 11 : 94;
  }

  function updateHome() {
    $$('.level-card').forEach((card, index) => {
      const unlocked = index <= state.unlocked;
      const complete = !!state.completed[index];
      const button = $('.level-button', card);
      card.classList.toggle('locked', !unlocked);
      card.classList.toggle('complete', complete);
      button.disabled = !unlocked;
      const label = $('span', button);
      if (!unlocked) label.textContent = state.lang === 'zh' ? `完成第${['一','二','三'][index - 1]}章后解锁` : `FINISH CHAPTER ${['I','II','III'][index - 1]} TO UNLOCK`;
      else if (complete) label.textContent = state.lang === 'zh' ? '再次进入' : 'REPLAY LEVEL';
      else if (state.levels[index].step > 0) label.textContent = state.lang === 'zh' ? '继续关卡' : 'CONTINUE';
      else label.textContent = state.lang === 'zh' ? '进入关卡' : 'ENTER LEVEL';
    });
    const done = state.completed.filter(Boolean).length;
    $('#homeStatus').textContent = state.lang === 'zh' ? `已完成 ${done}/4 · 进度保存在本机` : `${done}/4 COMPLETE · PROGRESS SAVED LOCALLY`;
  }

  function transition(text, callback, levelIndex = currentLevel) {
    const layer = $('#loadingLayer');
    $('#loadingText').textContent = text;
    layer.classList.add('open');
    window.setTimeout(() => callback?.(), 480);
    window.setTimeout(() => layer.classList.remove('open'), 1320);
  }

  function showToast(message, event) {
    const toast = $('#toast');
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2100);
    const button = event?.target?.closest('button'); if (button) { button.classList.add('clicked-glow'); window.setTimeout(() => button.classList.remove('clicked-glow'), 420); }
  }

  function showHome(useTransition = true) {
    const open = () => {
      currentLevel = null;
      document.body.classList.remove('final-palette', 'cutscene-playing');
      document.body.className = 'theme-home';
      $('#levelView').classList.remove('active'); $('#homeView').classList.add('active');
      $('#levelChip').textContent = state.lang === 'zh' ? '心的自留地 · A HEART\'S RETREAT' : "A HEART'S RETREAT · 心的自留地";
      closePause(true);
      dots(4, 0);
      if (state.music && audio?.context?.state === 'suspended') audio.context.resume();
      updateHome();
    };
    if (useTransition) transition(state.lang === 'zh' ? '把这一刻收进口袋……' : 'Saving this moment for later…', open); else open();
  }

  function startLevel(index) {
    if (index > state.unlocked) return;
    if (state.completed[index]) resetLevel(index);
    initAudio();
    if (state.music && audio?.context?.state === 'suspended') audio.context.resume();
    transition([
      state.lang === 'zh' ? '海风把早晨吹开……' : 'The sea breeze opens the morning…',
      state.lang === 'zh' ? '花影慢慢挪到长椅旁……' : 'Flower shadows move toward the bench…',
      state.lang === 'zh' ? '图书馆的噪音慢慢退到岸外……' : 'The library noise recedes beyond the shore…',
      state.lang === 'zh' ? '灯一盏一盏亮起来……' : 'The harbor lights come on one by one…'
    ][index], () => {
      currentLevel = index;
      document.body.className = `playing theme-${['morning', 'afternoon', 'terrain', 'night'][index]}`;
      $('#homeView').classList.remove('active'); $('#levelView').classList.add('active');
      renderLevel();
    });
  }

  function renderLevel() {
    if (currentLevel === null) return;
    setSeabirds(currentLevel === 0 && state.levels[0].step === 2);
    const section = ['morning', 'afternoon', 'terrain', 'night'][currentLevel];
    const data = story[section];
    $('#levelEyebrow').textContent = t(data.eyebrow);
    $('#levelTitle').textContent = t(data.title);
    $('#levelPrompt').textContent = t(data.prompts);
    $('#levelChip').textContent = `${String(currentLevel + 1).padStart(2, '0')} · ${t(data.title)}`;
    $('#saveNotice').textContent = state.lang === 'zh' ? '自动保存 / AUTO SAVE' : 'AUTO SAVE / 自动保存';
    $('#sceneContent').className = 'scene-content';
    if (currentLevel === 0) renderMorning();
    if (currentLevel === 1) renderAfternoon();
    if (currentLevel === 2) renderTerrain();
    if (currentLevel === 3) renderNight();
  }

  function dots(total, active) {
    $('#sceneDots').innerHTML = Array.from({ length: total }, (_, index) => `<i class="${index < active ? 'done' : ''} ${index === active ? 'active' : ''}"></i>`).join('');
    $('#topProgress').innerHTML = Array.from({ length: total }, (_, index) => `<i class="${index < active ? 'done' : ''} ${index === active ? 'active' : ''}"></i>`).join('');
  }

  function resetLevel(index) {
    const fresh = defaultState().levels[index];
    state.levels[index] = fresh;
    state.completed[index] = false;
    if (index === 0) selectedMessage = 0;
    if (index === 3) selectedFuture = 0;
    saveState();
  }

  function renderMorning() {
    const level = state.levels[0];
    dots(4, Math.min(level.step, 3));
    if (state.completed[0]) { renderCompletion(0, morningCopy('CH1-NARR-1')); return; }
    if (level.step === 0) {
      $('#sceneContent').className = 'scene-content morning-opening';
      $('#sceneContent').innerHTML = `<div class="ch1-opening-art"><img src="assets/ch1-instant-camera.png" alt="${state.lang === 'zh' ? '浮木上的旧拍立得相机' : 'An old instant camera on driftwood'}"></div><div class="ch1-opening-copy"><div class="kicker">CHAPTER I · BEACH ALBUM</div><p>${morningCopy('CH1-OPEN-1')}</p><p>${morningCopy('CH1-OPEN-2')}</p><p>${morningCopy('CH1-OPEN-3')}</p><blockquote>${morningCopy('CH1-OPEN-CARD')}</blockquote><button class="primary-button" id="morningBegin">${state.lang === 'zh' ? '拿起相机' : 'PICK UP THE CAMERA'}</button></div>`;
      $('#morningBegin').onclick = () => { level.step = 1; saveState(); transition(state.lang === 'zh' ? '几条消息跟着海风飘了过来……' : 'A few messages drift in with the sea air…', renderLevel); };
      return;
    }
    if (level.step === 1) {
      const marks = level.bodyMarks || {};
      const bodyDone = new Set(level.bodyDone || []); const done = bodyDone.size;
      $('#sceneContent').className = 'scene-content morning-messages';
      $('#sceneContent').innerHTML = `<div class="ch1-phase-heading"><div class="kicker">PHASE 1 · UNREAD MESSAGES</div></div><div class="ch1-phone-interaction"><div class="ch1-phone-speaker" aria-hidden="true"></div><div class="ch1-phone-screen">${story.morning.messages.map((key,index) => `<button class="ch1-phone-message ${(marks[index] || []).length ? 'has-feeling' : ''} ${bodyDone.has(index) ? 'is-shell' : ''} ${activeBodyMessage === index ? 'selected' : ''}" data-ghost="${index}"><span>${morningCopy(key)}</span>${bodyDone.has(index) ? `<small>${state.lang === 'zh' ? '已落下' : 'LANDED'}</small>` : ''}</button>`).join('')}</div><div class="ch1-phone-home" aria-hidden="true"></div></div>${activeBodyMessage !== null && !bodyDone.has(activeBodyMessage) ? `<div class="ch1-body-picker"><h3>${morningCopy(story.morning.messages[activeBodyMessage])}</h3><div>${story.morning.bodies.map((key,index) => `<button class="body-place ${(marks[activeBodyMessage] || []).includes(index) ? 'selected' : ''}" data-body="${index}">${morningCopy(key)}</button>`).join('')}</div><button class="primary-button" id="saveBody" ${(marks[activeBodyMessage] || []).length ? '' : 'disabled'}>${state.lang === 'zh' ? '让它落下来' : 'LET IT LAND'}</button></div>` : `<aside class="ch1-message-instruction"><strong>${state.lang === 'zh' ? '点击手机上的一条消息' : 'TAP A MESSAGE ON THE PHONE'}</strong><p>${morningCopy('CH1-P1-INTRO')}</p>${done === 4 ? `<button class="primary-button" id="messagesNext">${state.lang === 'zh' ? '走近潮线' : 'WALK TO THE TIDE LINE'}</button>` : ''}</aside>`}<div class="bottom-prompt">${done}/4</div>`;
      const openMessage = index => { if (bodyDone.has(index)) return; activeBodyMessage = index; renderMorning(); };
      $$('.ch1-phone-message').forEach(button => {
        const index = Number(button.dataset.ghost);
        button.onclick = () => openMessage(index);
      });
      $$('.body-place').forEach(button => button.onclick = () => { const index = Number(button.dataset.body); const current = new Set(marks[activeBodyMessage] || []); current.has(index) ? current.delete(index) : current.add(index); marks[activeBodyMessage] = [...current]; level.bodyMarks = marks; saveState(); renderMorning(); });
      $('#saveBody')?.addEventListener('click', () => { if (!level.bodyDone.includes(activeBodyMessage)) level.bodyDone.push(activeBodyMessage); showToast(morningCopy('CH1-P1-DONE')); activeBodyMessage = null; saveState(); renderMorning(); });
      $('#messagesNext')?.addEventListener('click', () => { level.step = 2; saveState(); transition(state.lang === 'zh' ? '潮水退去的地方闪了一下……' : 'Something glints where the tide pulled back…', renderLevel); });
      return;
    }
    if (level.step === 2) {
      const found = new Set(level.found || []); const words = level.photoWords || {};
      $('#sceneContent').className = 'scene-content morning-treasure';
      const chosenCount = Object.keys(words).length; const selectionFull = chosenCount >= 9;
      $('#sceneContent').innerHTML = `<div class="ch1-phase-heading"><div class="kicker">PHASE 2 · BEACH TREASURE</div><p>${morningCopy('CH1-P2-INTRO')}</p></div><div class="ch1-object-field"><img src="assets/ch1-beach-search.png" alt="${state.lang === 'zh' ? '潮线上的九件可拍小物' : 'Nine photographable objects at the tide line'}">${story.morning.items.map((key,index) => `<button class="ch1-photo-hotspot item-${index} ${found.has(index) ? 'found' : ''}" data-photo="${index}" aria-label="${morningCopy(key)}"><i></i><span>${found.has(index) ? morningCopy(key) : ''}</span></button>`).join('')}</div><aside class="ch1-photo-sidebar"><div class="ch1-photo-ledger">${story.morning.items.map((key,index) => `<button data-review-photo="${index}" ${found.has(index) ? '' : 'disabled'}><b>${index + 1}</b><span>${words[index] || '···'}</span></button>`).join('')}</div>${selectionFull ? `<button class="primary-button" id="photosNext">${state.lang === 'zh' ? '把照片带到纸上' : 'BRING THE PHOTOS TO THE PAGE'}</button>` : `<p class="photo-sidebar-hint">${state.lang === 'zh' ? `再拍 ${9 - chosenCount} 件小物` : `${9 - chosenCount} OBJECTS LEFT`}</p>`}</aside><div class="bottom-prompt">${chosenCount}/9</div>${activePhoto ? renderPhotoDeveloping(activePhoto) : ''}`;
      $$('.ch1-photo-hotspot').forEach(button => button.onclick = () => { const index = Number(button.dataset.photo); if (words[index]) return; if (!found.has(index)) { level.found.push(index); saveState(); activePhoto = { index, stage: 'developing' }; renderMorning(); window.setTimeout(() => { if (activePhoto?.index === index) { activePhoto.stage = 'choosing'; renderMorning(); } }, 2000); } else { activePhoto = { index, stage: 'choosing' }; renderMorning(); } });
      $$('[data-review-photo]').forEach(button => button.onclick = () => { const index = Number(button.dataset.reviewPhoto); activePhoto = { index, stage: 'choosing' }; renderMorning(); });
      bindPhotoWordPicker(level);
      $('#photosNext')?.addEventListener('click', () => { activePhoto = null; level.step = 3; saveState(); transition(state.lang === 'zh' ? '照片和贝壳落到水彩纸上……' : 'Photos and shells settle onto watercolor paper…', renderLevel); });
      return;
    }
    if (level.step === 3) {
      selectedMessage = Math.min(selectedMessage, 3); const colors = level.messageColors || {}; const brushed = new Set(level.brushed || []);
      const palette = ['#ff665f','#67a7d8','#ffd365','#58ba72','#b997d6'];
      $('#sceneContent').className = 'scene-content morning-collage';
      const chosenPhotos = Object.keys(level.photoWords).map(Number);
      $('#sceneContent').innerHTML = `<div class="ch1-phase-heading compact"><div class="kicker">PHASE 3 · COLLAGE & COVER</div><p>${morningCopy('CH1-P3-INTRO')}</p></div><div class="ch1-collage-canvas" id="morningCanvas"><img class="collage-underlay" src="assets/ppt-collage.png" alt="">${chosenPhotos.map((index,order) => { const key = story.morning.items[index]; const pos = level.collagePositions[`photo-${index}`] || {x:7 + order * 10,y:12 + (order % 2) * 28}; return `<div class="draggable-photo" data-drag-id="photo-${index}" style="left:${pos.x}%;top:${pos.y}%"><b>${morningCopy(key)}</b><span>${level.photoWords[index]}</span></div>`; }).join('')}${story.morning.messages.map((key,index) => { const pos = level.collagePositions[`shell-${index}`] || {x:56 + (index % 2) * 18,y:16 + Math.floor(index / 2) * 28}; return `<button class="draggable-shell ${selectedMessage === index ? 'selected' : ''} ${brushed.has(index) ? 'brushed' : ''}" data-drag-id="shell-${index}" data-shell-message="${index}" style="left:${pos.x}%;top:${pos.y}%;--cover:${colors[index] || '#ffffff'}"><span>${morningCopy(key)}</span></button>`; }).join('')}</div><aside class="ch1-collage-tools"><h3>${morningCopy(story.morning.messages[selectedMessage])}</h3><p>${state.lang === 'zh' ? '它给你什么感觉的颜色？' : 'What color does it feel like?'}</p><div class="soft-palette">${palette.map(color => `<button data-paint="${color}" style="background:${color}" aria-label="${color}"></button>`).join('')}</div><button class="primary-button soft-brush" id="softBrush" ${colors[selectedMessage] ? '' : 'disabled'}>${state.lang === 'zh' ? '用软刷覆盖' : 'COVER WITH A SOFT BRUSH'}</button><div class="self-note"><p>${morningCopy('CH1-NARR-1')}</p>${story.morning.templates.map(key => `<button class="note-template ${level.selfNote === morningCopy(key) ? 'selected' : ''}" data-note-key="${key}">${morningCopy(key)}</button>`).join('')}<label><span>${state.lang === 'zh' ? '或写给自己' : 'Or write your own'}</span><input id="customSelfNote" value="${story.morning.templates.some(key => morningCopy(key) === level.selfNote) ? '' : (level.selfNote || '')}"></label></div>${brushed.size === 4 && level.selfNote ? `<button class="primary-button" id="finishCollage">${state.lang === 'zh' ? '把照片夹进本子' : 'SLIP THE PHOTOS INTO THE NOTEBOOK'}</button>` : ''}</aside>`;
      bindMorningDrag(level); $$('.draggable-shell').forEach(button => button.onclick = () => { selectedMessage = Number(button.dataset.shellMessage); renderMorning(); });
      $$('[data-paint]').forEach(button => button.onclick = () => { colors[selectedMessage] = button.dataset.paint; level.messageColors = colors; saveState(); renderMorning(); });
      $('#softBrush').onclick = () => { if (!brushed.has(selectedMessage)) level.brushed.push(selectedMessage); saveState(); showToast(state.lang === 'zh' ? '字还隐约看得见，但它不再占满整张纸。' : 'The words remain faintly visible, but no longer fill the page.'); const next = [0,1,2,3].find(index => !level.brushed.includes(index)); if (next !== undefined) selectedMessage = next; renderMorning(); };
      $$('.note-template').forEach(button => button.onclick = () => { level.selfNote = morningCopy(button.dataset.noteKey); saveState(); renderMorning(); });
      $('#customSelfNote').onchange = event => { level.selfNote = event.target.value.trim(); saveState(); renderMorning(); };
      $('#finishCollage')?.addEventListener('click', () => { level.step = 4; saveState(); transition(state.lang === 'zh' ? '雾气向花田那边散开……' : 'The fog opens toward the meadow…', renderLevel); });
      return;
    }
    $('#sceneContent').className = 'scene-content morning-ending';
    $('#sceneContent').innerHTML = `<div class="ch1-ending-card"><div class="kicker">CHAPTER I · COMPLETE</div><p>${morningCopy('CH1-END')}</p><button class="primary-button" id="completeMorning">${state.lang === 'zh' ? '望向花田' : 'LOOK TOWARD THE MEADOW'}</button></div>`;
    $('#completeMorning').onclick = () => completeLevel(0);
  }

  function renderPhotoDeveloping(photo) {
    const key = story.morning.items[photo.index];
    if (photo.stage === 'developing') return `<div class="photo-develop-overlay"><div class="developing-polaroid"><i class="polaroid-object item-${photo.index}"></i><b>${morningCopy(key)}</b><span>2s</span></div></div>`;
    return `<div class="photo-develop-overlay"><div class="photo-word-picker"><i class="word-picker-object item-${photo.index}" aria-hidden="true"></i><div class="kicker">${morningCopy(key)}</div><h3>${morningCopy('CH1-P2-PROMPT')}</h3><div>${story.morning.words.map(key => `<button data-photo-word="${key}">${morningCopy(key)}</button>`).join('')}</div><label><span>${morningCopy('CH1-P2-WORD7')}</span><input id="customPhotoWord"><button class="primary-button" id="saveCustomPhotoWord">${state.lang === 'zh' ? '保存' : 'SAVE'}</button></label></div></div>`;
  }

  function bindPhotoWordPicker(level) {
    $$('[data-photo-word]').forEach(button => button.onclick = () => { level.photoWords[activePhoto.index] = morningCopy(button.dataset.photoWord); activePhoto = null; saveState(); renderMorning(); });
    $('#saveCustomPhotoWord')?.addEventListener('click', () => { const value = $('#customPhotoWord').value.trim(); if (!value) return; level.photoWords[activePhoto.index] = value; activePhoto = null; saveState(); renderMorning(); });
  }

  function bindMorningDrag(level) {
    const canvas = $('#morningCanvas'); if (!canvas) return;
    $$('[data-drag-id]').forEach(item => item.onpointerdown = event => {
      if (event.target.closest('[data-shell-message]') && event.pointerType === 'mouse' && event.button !== 0) return;
      const rect = canvas.getBoundingClientRect(), itemRect = item.getBoundingClientRect(); const offsetX = event.clientX - itemRect.left, offsetY = event.clientY - itemRect.top; item.setPointerCapture?.(event.pointerId); item.classList.add('dragging');
      const move = moveEvent => { const x = Math.max(0, Math.min(rect.width - itemRect.width, moveEvent.clientX - rect.left - offsetX)); const y = Math.max(0, Math.min(rect.height - itemRect.height, moveEvent.clientY - rect.top - offsetY)); item.style.left = `${x / rect.width * 100}%`; item.style.top = `${y / rect.height * 100}%`; };
      const end = endEvent => { move(endEvent); item.classList.remove('dragging'); item.releasePointerCapture?.(event.pointerId); level.collagePositions[item.dataset.dragId] = { x: parseFloat(item.style.left), y: parseFloat(item.style.top) }; saveState(); item.onpointermove = null; item.onpointerup = null; item.onpointercancel = null; };
      item.onpointermove = move; item.onpointerup = end; item.onpointercancel = end;
    });
  }

  function renderAfternoon() {
    const level = state.levels[1];
    dots(4, Math.min(level.memory, 3));
    if (state.completed[1]) {
      renderCompletion(1, afternoonCopy('CH2-END'));
      return;
    }
    if (level.step === 0) {
      $('#sceneContent').className = 'scene-content ch2-opening';
      $('#sceneContent').innerHTML = `<div class="ch2-opening-card"><div class="kicker">CHAPTER II · MEADOW BENCH</div><p>${afternoonCopy('CH2-OPEN')}</p><aside>${afternoonCopy('CH2-TUTORIAL')}</aside><button class="primary-button" id="afternoonBegin">${state.lang === 'zh' ? '冻结第一个瞬间' : 'FREEZE THE FIRST MOMENT'}</button></div>`;
      $('#afternoonBegin').onclick = () => { level.step = 1; level.tutorialSeen = true; saveState(); renderLevel(); };
      return;
    }
    if (level.step === 2 || level.memory >= 4) {
      renderAfternoonFlip(level);
      return;
    }
    const scene = story.afternoon.scenes[level.memory];
    $('#sceneContent').className = `scene-content ch2-scene ch2-${scene.kind} ch2-scene-${level.memory}`;
    const sceneArt = {
      shop: '<img class="ch2-generated-art" src="assets/ch2-bubble-tea.png" alt="">',
      rink: '<img class="ch2-generated-art ch2-skates-art" src="assets/ch2-ice-skates.png" alt="">',
      birthday: '<img class="ch2-generated-art" src="assets/ch2-birthday-cake.png" alt="">'
    };
    const chatVisual = scene.kind === 'chat' ? `<div class="ch2-phone"><div class="ch2-phone-top">George · Olivia · Bailey</div><div class="chat-bubble george">record store this weekend?</div><div class="chat-bubble olivia">that joke again 😂</div><div class="chat-bubble bailey">…</div><div class="chat-bubble olivia">${state.lang === 'zh' ? '那就这么说定啦！' : "It's settled then!"}</div><div class="chat-input">${afternoonCopy(scene.half)}<i></i></div></div>` : `<div class="ch2-scene-art" aria-hidden="true">${sceneArt[scene.kind]}</div>`;
    $('#sceneContent').innerHTML = `<div class="ch2-progress">${[1,2,3,4].map((n,index) => `<i class="${index < level.memory ? 'done' : index === level.memory ? 'active' : ''}">${n}</i>`).join('')}</div>${chatVisual}<section class="ch2-setup"><div class="kicker">SCENE ${level.memory + 1} · SETUP</div><p>${afternoonCopy(scene.setup)}</p><div class="cue-row"><button data-cue="face">${state.lang === 'zh' ? '观察表情' : 'NOTICE FACE'}</button><button data-cue="space">${state.lang === 'zh' ? '观察距离' : 'NOTICE DISTANCE'}</button><button data-cue="gesture">${state.lang === 'zh' ? '观察姿态' : 'NOTICE GESTURE'}</button></div></section><div class="ch2-options">${scene.opts.map((key,index) => `<button class="story-choice" data-choice="${index}">${afternoonCopy(key)}</button>`).join('')}</div>`;
    $$('[data-cue]').forEach(button => button.onclick = () => { button.classList.toggle('noticed'); showToast(state.lang === 'zh' ? `看见线索：${button.textContent.replace('观察','')}` : `CUE NOTICED: ${button.textContent.replace('NOTICE ','')}`); });
    $$('.story-choice').forEach(button => button.onclick = () => showConsequence(Number(button.dataset.choice)));
  }

  function showConsequence(choiceIndex) {
    const level = state.levels[1];
    const scene = story.afternoon.scenes[level.memory];
    const layer = document.createElement('div'); layer.className = 'freeze-layer';
    layer.innerHTML = `<div class="consequence-card"><div class="kicker">${state.lang === 'zh' ? '后果 · 没有分数' : 'CONSEQUENCE · NO SCORE'}</div><h3>${afternoonCopy(scene.opts[choiceIndex])}</h3><p>${afternoonCopy(scene.cons[choiceIndex])}</p><div class="consequence-actions"><button class="text-button" id="replayMemory">${afternoonCopy('CH2-REPLAY')}</button><button class="primary-button" id="nextMemory">${state.lang === 'zh' ? '带着这个后果继续' : 'CONTINUE WITH THIS CONSEQUENCE'}</button></div></div>`;
    $('#sceneContent').appendChild(layer);
    $('#replayMemory').onclick = () => layer.remove();
    $('#nextMemory').onclick = () => {
      level.seeds[level.memory] = choiceIndex; level.memory += 1; if (level.memory >= 4) level.step = 2; saveState();
      if (level.memory >= 4) balloonTransition(renderLevel);
      else transition(state.lang === 'zh' ? '风把这个选择带进花田……' : 'The wind carries this choice into the meadow…', renderLevel);
    };
  }

  function balloonTransition(done) {
    const layer = document.createElement('div');
    layer.className = 'ch2-balloon-transition';
    layer.innerHTML = '<div class="red-balloon"><i></i></div>';
    $('#sceneStage').appendChild(layer);
    window.setTimeout(() => { layer.remove(); done(); }, 1800);
  }

  function renderAfternoonFlip(level) {
    const flipped = new Set(level.flipped || []); const ready = flipped.size === 2;
    $('#sceneContent').className = 'scene-content ch2-flip';
    $('#sceneContent').innerHTML = `<div class="ch2-flip-intro"><div class="kicker">WORDS · TURN THEM OVER</div><h3>${afternoonCopy('CH2-FLIP-INTRO')}</h3></div><div class="flip-cards"><button class="flip-card ${flipped.has('george') ? 'flipped' : ''}" data-flip="george"><span>${state.lang === 'zh' ? 'George 的语音' : "GEORGE'S VOICE NOTE"}</span><strong>${afternoonCopy('CH2-FLIP-GEORGE')}</strong></button><button class="flip-card ${flipped.has('olivia') ? 'flipped' : ''}" data-flip="olivia"><span>${state.lang === 'zh' ? 'Olivia 的消息' : "OLIVIA'S MESSAGE"}</span><strong>${afternoonCopy('CH2-FLIP-OLIVIA')}</strong></button></div><p class="ch2-narr">${afternoonCopy('CH2-NARR-1')}</p>${ready ? `<div class="ch2-end"><p>${afternoonCopy('CH2-END')}</p><div class="seed-row">${level.seeds.map((seed,index) => `<i title="Scene ${index + 1} · ${seed + 1}"></i>`).join('')}</div><button class="primary-button" id="finishAfternoon">${state.lang === 'zh' ? '让种子落进花田' : 'LET THE SEEDS FALL'}</button></div>` : ''}`;
    $$('.flip-card').forEach(button => button.onclick = () => { if (!level.flipped.includes(button.dataset.flip)) level.flipped.push(button.dataset.flip); saveState(); renderAfternoonFlip(level); });
    $('#finishAfternoon')?.addEventListener('click', () => completeLevel(1));
  }

  function renderTerrain() {
    const level = state.levels[2];
    if (level.step === 5 && level.saveMode === null) level.saveMode = 0;
    dots(4, Math.max(0, Math.min(level.step - 1, 3)));
    setTerrainSound(level.step);
    if (state.completed[2]) { renderCompletion(2, terrainCopy('CH3-ENDLINE')); return; }
    $('#sceneContent').className = `scene-content terrain-content terrain-phase-${level.step}`;
    if (level.step === 0) {
      $('#sceneContent').innerHTML = `<div class="ch3-library"><div class="library-noise"><img src="assets/ch3-mock-test-cutout.png" alt="Mock test with red corrections"></div><section><div class="kicker">CHAPTER III · EMOTION TERRAIN</div><p>${terrainCopy('CH3-OPEN-1')}</p><p>${terrainCopy('CH3-OPEN-2')}</p><blockquote>${terrainCopy('CH3-OPEN-3')}</blockquote><button class="primary-button" id="ch3Begin">${state.lang === 'zh' ? '打开盒子' : 'OPEN THE BOX'}</button></section></div>`;
      $('#ch3Begin').onclick = () => { level.step = 1; saveState(); renderTerrain(); }; return;
    }
    if (level.step === 1) {
      const sources = state.lang === 'zh' ? ['手机消息提示','红色批注','空调嗡鸣','头顶灯光','玻璃中的自己'] : ['PHONE ALERTS','RED MARKS','AIR-CON HUM','OVERHEAD LIGHT','YOUR REFLECTION'];
      $('#sceneContent').innerHTML = `<div class="ch3-noise ${level.noises.length===5?'tide-overflow':''}" style="--tide-level:${level.noises.length}"><div class="rising-tide" aria-hidden="true"></div><header><div class="kicker">PHASE 1 · NOISE</div><h3>${terrainCopy('CH3-P1-INTRO')}</h3><b>${level.noises.length}/5</b></header><div class="noise-table">${sources.map((label,index)=>`<button class="noise-source noise-color-${index} ${level.noises.includes(index)?'felt':'shaking'}" data-noise="${index}"><span>${label}</span><strong>${level.noises.includes(index)?terrainCopy(`CH3-P1-FEEL${index+1}`):'+'}</strong></button>`).join('')}</div></div>`;
      $$('[data-noise]').forEach(b=>b.onclick=()=>{const n=Number(b.dataset.noise);if(level.noises.includes(n))return;level.noises.push(n);saveState();renderTerrain();if(level.noises.length===5)window.setTimeout(()=>{level.step=2;level.shoreStep=0;saveState();renderTerrain();},1250);}); return;
    }
    if (level.step === 2) {
      renderShoreSequence(level); return;
    }
    if (level.step === 3) {
      const done=new Set(level.fragments); const active=[0,1,2,3,4,5].find(i=>!done.has(i)); const draft=level.fragmentDraft||{}; const colors=['#ef6c65','#f2c85b','#64a9d8','#7bbd79','#796a9d','#334d58'];
      $('#sceneContent').innerHTML=`<div class="ch3-map"><canvas id="terrainCanvas" width="760" height="500"></canvas><aside><div class="kicker">PHASE 3 · DRAW THE ISLAND · ${done.size}/4</div><p class="ch3-narr">${terrainCopy('CH3-NARR-1')}</p>${active===undefined||done.size>=4?`<button class="primary-button" id="mapNext">${state.lang==='zh'?'听见远处的岛':'HEAR THE OTHER ISLANDS'}</button>`:`<h3>${terrainCopy(`CH3-P3-FRAG${active+1}`)}</h3><p>${terrainCopy('CH3-P3-COLOR')}</p><div class="color-grid">${colors.map(c=>`<button data-color="${c}" style="--c:${c}" class="${draft.color===c?'selected':''}"></button>`).join('')}</div><div class="place-grid">${[1,2,3,4,5,6,7].map((n,i)=>`<button data-place="${i}" class="${draft.place===i?'selected':''}">${terrainCopy(`CH3-P3-PLACE${n}`)}</button>`).join('')}</div><button class="primary-button" id="saveFragment" ${draft.color&&draft.place!==undefined?'':'disabled'}>${state.lang==='zh'?'放到地形里':'PLACE IN TERRAIN'}</button>`}</aside></div>`;
      drawTerrainCanvas(level); $$('[data-color]').forEach(b=>b.onclick=()=>{level.fragmentDraft={...draft,color:b.dataset.color};saveState();renderTerrain();}); $$('[data-place]').forEach(b=>b.onclick=()=>{level.fragmentDraft={...draft,place:Number(b.dataset.place)};saveState();renderTerrain();});
      $('#saveFragment')?.addEventListener('click',()=>{level.fragments.push(active);level.colors.push(level.fragmentDraft.color);level.placements.push(level.fragmentDraft.place);level.fragmentDraft={};saveState();renderTerrain();}); $('#mapNext')?.addEventListener('click',()=>{level.step=4;saveState();renderTerrain();}); return;
    }
    if (level.step === 4) {
      const answered=Object.keys(level.bottles).length;
      const picked=level.activeBottle;
      $('#sceneContent').innerHTML=`<div class="ch3-bottles"><header><div class="kicker">PHASE 4 · OTHER ISLANDS</div><h3>${terrainCopy('CH3-P4-INTRO')}</h3><b>${answered}/5</b></header><div class="bottle-sea">${[1,2,3,4,5].map((n,i)=>`<button class="drift-bottle ${level.bottles[i]!==undefined?'answered':''} ${picked===i?'selected':''}" data-bottle="${i}"><i></i><span>${terrainCopy(`CH3-P4-BOT${n}`)}</span></button>`).join('')}</div><div class="bottle-actions">${[1,2,3].map((n,i)=>`<button data-bottle-act="${i}" ${picked===undefined?'disabled':''}>${terrainCopy(`CH3-P4-ACT${n}`)}</button>`).join('')}</div>${level.replying?`<div class="reply-grid">${[1,2,3,4].map((n,i)=>`<button data-reply3="${i}">${terrainCopy(`CH3-P4-REPLY${n}`)}</button>`).join('')}<input id="customReply3" placeholder="${state.lang==='zh'?'写一个极小回应':'WRITE A SMALL REPLY'}"><button id="saveReply3">${state.lang==='zh'?'保存回应':'SAVE REPLY'}</button></div>`:''}<div class="flip-voices"><button data-flip3="0" class="${level.flipped.includes(0)?'flipped':''}">${terrainCopy(level.flipped.includes(0)?'CH3-FLIP-1-BACK':'CH3-FLIP-1-FRONT')}</button><button data-flip3="1" class="${level.flipped.includes(1)?'flipped':''}">${terrainCopy(level.flipped.includes(1)?'CH3-FLIP-2-BACK':'CH3-FLIP-2-FRONT')}</button></div><button class="primary-button ch3-next" id="bottleNext" ${answered<5?'disabled':''}>${state.lang==='zh'?'把画夹进书里':'PLACE THE PAGE IN THE BOOK'}</button></div>`;
      $$('[data-bottle]').forEach(b=>b.onclick=()=>{level.activeBottle=Number(b.dataset.bottle);level.replying=false;saveState();renderTerrain();}); $$('[data-bottle-act]').forEach(b=>b.onclick=()=>{if(picked===undefined)return;const act=Number(b.dataset.bottleAct);if(act===2){level.replying=true;saveState();renderTerrain();return;}level.bottles[picked]={act};delete level.activeBottle;saveState();renderTerrain();}); $$('[data-reply3]').forEach(b=>b.onclick=()=>{level.bottles[picked]={act:2,reply:terrainCopy(`CH3-P4-REPLY${Number(b.dataset.reply3)+1}`)};delete level.activeBottle;level.replying=false;saveState();renderTerrain();}); $('#saveReply3')?.addEventListener('click',()=>{const reply=$('#customReply3').value.trim();if(!reply)return;level.bottles[picked]={act:2,reply};delete level.activeBottle;level.replying=false;saveState();renderTerrain();}); $$('[data-flip3]').forEach(b=>b.onclick=()=>{const n=Number(b.dataset.flip3);if(!level.flipped.includes(n))level.flipped.push(n);saveState();renderTerrain();}); $('#bottleNext').onclick=()=>{level.step=5;saveState();renderTerrain();}; return;
    }
    $('#sceneContent').innerHTML=`<div class="ch3-save"><div class="kicker">SAVE THE TERRAIN</div><p>${terrainCopy('CH3-END')}</p><div class="save-grid">${[1,2,3,4].map((n,i)=>`<button data-save3="${i}" class="${level.saveMode===i?'selected':''}">${terrainCopy(`CH3-SAVE-${n}`)}</button>`).join('')}</div><div class="note-grid">${[1,2,3,4,5].map(n=>`<button data-note3="${terrainCopy(`CH3-NOTE-${n}`)}" class="${level.note===terrainCopy(`CH3-NOTE-${n}`)?'selected':''}">${terrainCopy(`CH3-NOTE-${n}`)}</button>`).join('')}<input id="ch3CustomNote" placeholder="${state.lang==='zh'?'写下自己的感想':'WRITE YOUR OWN NOTE'}" value="${level.note||''}"></div><blockquote>${terrainCopy('CH3-ENDLINE')}</blockquote><button class="primary-button" id="finishTerrain" ${level.saveMode===null?'disabled':''}>${state.lang==='zh'?'保存并前往渡口':'SAVE & GO TO THE FERRY'}</button></div>`;
    $$('[data-save3]').forEach(b=>b.onclick=()=>{level.saveMode=Number(b.dataset.save3);saveState();renderTerrain();}); $$('[data-note3]').forEach(b=>b.onclick=()=>{level.note=b.dataset.note3;saveState();renderTerrain();}); $('#ch3CustomNote').onchange=e=>{level.note=e.target.value;saveState();}; $('#finishTerrain').onclick=()=>completeLevel(2);
  }

  function renderShoreSequence(level) {
    const stage=level.shoreStep||0;
    const focus=[null,'card',null,'player',null,'paper'][stage];
    if(focus){
      const image={card:'ch3-shore-card-en.png',player:'ch3-player-en-cutout.png',paper:'ch3-watercolor-paper-cutout.png'}[focus];
      const copy=focus==='card'?terrainCopy('CH3-P2-CARD'):focus==='player'?terrainCopy('CH3-P2-AUDIO'):(state.lang==='zh'?'水彩纸有粗糙的边缘，空白还没有要求你成为任何样子。':'The watercolor paper has rough edges. The blank page asks you to become nothing yet.');
      $('#sceneContent').innerHTML=`<div class="shore-focus focus-${focus}"><img src="assets/${image}" alt=""><section><div class="kicker">PHASE 2 · FIND THE SHORE</div><p>${focus==='player'?'▶ ':''}${copy}</p><button class="primary-button" id="confirmShoreObject">${state.lang==='zh'?'确认，看下一件':'CONFIRM · NEXT OBJECT'}</button></section></div>`;
      $('#confirmShoreObject').onclick=()=>{level.shoreStep+=1;saveState();renderTerrain();};return;
    }
    if(stage<6){
      const target=stage===0?'card':stage===2?'player':'paper';
      const label=target==='card'?(state.lang==='zh'?'点击折页卡片':'TAP THE FOLDED CARD'):target==='player'?(state.lang==='zh'?'点击播放器':'TAP THE PLAYER'):(state.lang==='zh'?'点击水彩纸':'TAP THE WATERCOLOR PAPER');
      $('#sceneContent').innerHTML=`<div class="shore-workbench"><img src="assets/ch3-material-box-cutout.png" alt="Open box of art materials"><button class="shore-hotspot hotspot-${target}" id="shoreObject"><i></i><span>${label}</span></button></div>`;
      $('#shoreObject').onclick=()=>{level.shoreStep+=1;saveState();renderTerrain();};return;
    }
    $('#sceneContent').innerHTML=`<div class="shore-touch-full"><div class="kicker">PHASE 2 · FIND THE SHORE</div><blockquote>${terrainCopy('CH3-P2-CARD')}</blockquote><p>▶ ${terrainCopy('CH3-P2-AUDIO')}</p><div class="touch-grid">${[1,2,3,4].map((n,i)=>`<button class="${level.touch===i?'selected':''}" data-touch="${i}">${terrainCopy(`CH3-P2-TOUCH${n}`)}</button>`).join('')}</div><button class="primary-button" id="shoreNext" ${level.touch===null?'disabled':''}>${state.lang==='zh'?'铺开纸面':'OPEN THE PAGE'}</button></div>`;
    $$('[data-touch]').forEach(b=>b.onclick=()=>{level.touch=Number(b.dataset.touch);saveState();renderTerrain();});$('#shoreNext').onclick=()=>{level.step=3;saveState();renderTerrain();};
  }

  function drawTerrainCanvas(level) {
    const canvas=$('#terrainCanvas'); if(!canvas)return; const ctx=canvas.getContext('2d'),w=canvas.width,h=canvas.height;
    if(!canvas.parentElement.classList.contains('terrain-paper')){const wrap=document.createElement('div');wrap.className='terrain-paper';canvas.parentNode.insertBefore(wrap,canvas);wrap.append(canvas);const crayon=document.createElement('i');crayon.className='terrain-crayon';crayon.style.setProperty('--crayon',level.fragmentDraft?.color||(level.colors||[]).at(-1)||'#64a9d8');wrap.append(crayon);}
    ctx.fillStyle='#f7f0dc';ctx.fillRect(0,0,w,h);for(let y=4;y<h;y+=8)for(let x=3;x<w;x+=9){ctx.fillStyle='rgba(112,91,64,.025)';ctx.fillRect(x+Math.sin(y)*2,y,2,1);}
    const shore=x=>300+58*Math.sin(x/92)+24*Math.sin(x/37),rough=(color,width,offset=0)=>{ctx.strokeStyle=color;ctx.lineWidth=width;ctx.lineCap='round';ctx.beginPath();for(let x=0;x<=w;x+=8){const y=shore(x)+offset+Math.sin(x*1.7)*2;x?ctx.lineTo(x,y):ctx.moveTo(x,y)}ctx.stroke();};rough('#6c9cb2',9);rough('rgba(55,103,126,.42)',3,-7);rough('rgba(91,133,151,.5)',2,7);
    (level.colors||[]).forEach((color,i)=>{const p=(level.placements||[])[i]??i,x=105+(i*157)%560,y=shore(x);ctx.save();ctx.strokeStyle=color;ctx.fillStyle=color;ctx.lineWidth=6;ctx.globalAlpha=.72;
      if(p===0){ctx.beginPath();ctx.ellipse(x,y+65,34,18,0,0,7);ctx.stroke();ctx.beginPath();ctx.moveTo(x+30,y+65);ctx.lineTo(x+52,y+48);ctx.lineTo(x+52,y+82);ctx.closePath();ctx.stroke();}
      if(p===1){ctx.beginPath();ctx.arc(i%2?w:0,y,115,-1.4,1.4);ctx.stroke();}
      if(p===2){ctx.globalAlpha=.18;ctx.beginPath();ctx.moveTo(0,h);ctx.lineTo(0,shore(0));for(let q=0;q<=w;q+=12)ctx.lineTo(q,shore(q));ctx.lineTo(w,h);ctx.closePath();ctx.fill();ctx.globalAlpha=.13;ctx.fillStyle='#237fa2';ctx.fillRect(0,h*.72,w,h*.28);}
      if(p===3){ctx.beginPath();ctx.moveTo(x-70,y+18);ctx.lineTo(x-15,y-58);ctx.lineTo(x-4,y+15);ctx.closePath();ctx.fill();ctx.beginPath();ctx.moveTo(x+8,y+12);ctx.lineTo(x+26,y-50);ctx.lineTo(x+72,y+22);ctx.closePath();ctx.fill();}
      if(p===4){ctx.beginPath();ctx.moveTo(x-34,y-12);ctx.lineTo(x+32,y-12);ctx.lineTo(x+18,y+10);ctx.lineTo(x-22,y+10);ctx.closePath();ctx.stroke();ctx.moveTo(x,y-13);ctx.lineTo(x,y-66);ctx.lineTo(x+38,y-25);ctx.closePath();ctx.stroke();}
      if(p===5){ctx.globalAlpha=.09;ctx.fillRect(0,0,w,h);}
      if(p===6){ctx.beginPath();i%2?ctx.arc(x,95,36,0,7):(ctx.arc(x-25,105,25,3.2,6.2),ctx.arc(x+10,92,34,3.4,6.15),ctx.arc(x+45,108,23,3.25,6.15));ctx.stroke();}
      ctx.restore();});canvas.classList.add('terrain-reveal');
  }

  function setTerrainSound(step) {
    if (!audio) return;
    const now = audio.context.currentTime;
    const progress = Math.max(0, Math.min(1, (step - 1) / 3));
    audio.filter?.frequency.cancelScheduledValues(now);
    audio.filter?.frequency.linearRampToValueAtTime(1750 - progress * 1180, now + 1.8);
    audio.seaGain?.gain.cancelScheduledValues(now);
    audio.seaGain?.gain.linearRampToValueAtTime(.82 - progress * .69, now + 1.8);
    audio.natureGain?.gain.cancelScheduledValues(now);
    audio.natureGain?.gain.linearRampToValueAtTime(progress * .78, now + 1.8);
    audio.natureFilter?.frequency.cancelScheduledValues(now);
    audio.natureFilter?.frequency.linearRampToValueAtTime(2400 + progress * 900, now + 1.8);
  }

  function renderNight() {
    const level = state.levels[3];
    document.body.classList.toggle('final-palette', level.step === 4 && Boolean(level.boarded));
    dots(4, Math.max(0, Math.min(level.step - 1, 3)));
    if (state.completed[3]) { renderTideLog(level); return; }
    if (level.step === 0) {
      $('#sceneContent').className='scene-content ch4-opening';
      $('#sceneContent').innerHTML = `<section><div class="kicker">CHAPTER IV · LEAVING THE ISLAND</div><p>${nightCopy('CH4-OPEN-1')}</p><blockquote>${nightCopy('CH4-NARR-1')}</blockquote><p class="ch4-art-hint">${level.approach?(state.lang==='zh'?'再次点击，开始钓鱼。':'CLICK AGAIN TO BEGIN FISHING.'):(state.lang==='zh'?'点击岸边的 Bailey，走近一些。':'CLICK BAILEY ON THE SHORE TO MOVE CLOSER.')}</p></section><button class="ch4-approach-art ${level.approach?'is-close':''}" id="nightBegin"><img src="assets/${level.approach?'ch4-fishing-scene.png':'ch4-shore-approach.png'}" alt="${state.lang==='zh'?'黄昏渡口的 Bailey':'Bailey at the crossing near dusk'}"></button>`;
      $('#nightBegin').onclick = () => { if(!level.approach){level.approach=true;saveState();renderNight();return;} level.step = 1; saveState(); renderLevel(); };
      return;
    }
    if (level.step === 1 || level.step === 2) { renderNightFishing(level); return; }
    if (level.step === 3) { renderWaterMirror(level); return; }
    if (!level.boarded) {
      $('#sceneContent').className='scene-content ch4-boarding ch4-ferry-arrival';
      $('#sceneContent').innerHTML=`<div class="ferry-docking" aria-hidden="true"><img src="assets/ch4-ferry.png" alt=""></div><section><div class="kicker">PHASE 4 · BOARD</div><p class="dock-line">${state.lang==='zh'?'渡船靠岸。':'The ferry docks.'}</p><p class="look-back">${state.lang==='zh'?'岛没有消失，只是变小了。<br>水从岛上穿过……':"The island hasn't vanished — it's just smaller.<br>Water runs through it…"}</p><button class="primary-button" id="boardNight">${nightCopy('CH4-P4-BOARD')}</button></section>`;
      $('#boardNight').addEventListener('click',()=>playBoardingCutscene(level));
      return;
    }
    $('#sceneContent').className='scene-content ch4-final-reality';
    const finalCopy = state.lang==='zh'
      ? [`渡船靠岸。Bailey 回头：岛没有消失，只是变小了。水从岛上穿过，流向远处的灯。`,`早晨。一间普通的房间。桌上放着一本笔记、一张画，和一页新写的句子。`,`有些答案不是一下子想出来的。它们先以水流、岸线与回声的方式回来。岛会一直在。需要时，潮线之上见。`]
      : [`The ferry docks. Bailey looks back: the island hasn't vanished — it's just smaller. Water runs through it, toward distant lights.`,`Morning. An ordinary room. On the desk: a notebook, a painting, a page of newly written sentences.`,`Some answers don't arrive all at once. They come back first as currents, shorelines, and echoes. The island stays. When you need it — meet it above the tide line.`];
    $('#sceneContent').innerHTML=`<div class="final-scene-art"><img src="assets/ch4-final-scene.png" alt="${state.lang==='zh'?'退潮后的岛屿与 Bailey':'Bailey on the island after the tide'}"></div><section><div class="kicker">THE SHORE REMAINS</div>${finalCopy.map((p,i)=>`<p class="${i===2?'final-line':''}">${p}</p>`).join('')}<button class="primary-button" id="finishNight">${state.lang==='zh'?'查看潮汐记录':'VIEW TIDE LOG'}</button></section>`;
    $('#finishNight').addEventListener('click',()=>completeLevel(3));
  }

  function playBoardingCutscene(level) {
    if ($('#boardingCutscene')) return;
    document.body.classList.add('cutscene-playing');
    const overlay=document.createElement('div');
    overlay.id='boardingCutscene'; overlay.className='boarding-cutscene';
    overlay.setAttribute('role','img'); overlay.setAttribute('aria-label',state.lang==='zh'?'Bailey 登船离岛的过场动画':'Bailey boards the ferry');
    overlay.innerHTML=[1,2,3].map((n,i)=>`<img class="boarding-frame ${i===0?'active':''}" src="assets/ch4-board-0${n}.png" alt="">`).join('');
    document.body.append(overlay);
    const frames=[...overlay.querySelectorAll('.boarding-frame')]; let index=0;
    const advance=()=>{
      if(index<frames.length-1){frames[index].classList.remove('active');index+=1;frames[index].classList.add('active');window.setTimeout(advance,2200);return;}
      overlay.classList.add('fade-out');
      window.setTimeout(()=>{overlay.remove();document.body.classList.remove('cutscene-playing');level.boarded=true;saveState();renderNight();},1500);
    };
    window.setTimeout(advance,2200);
  }

  function renderNightFishing(level) {
    const phase=level.step, list=phase===1?level.anxieties:level.steady, total=4, current=list.length, caught=phase===1?level.currentAnxiety:level.currentSteady;
    if(audio?.filter){const now=audio.context.currentTime;audio.filter.frequency.cancelScheduledValues(now);audio.filter.frequency.linearRampToValueAtTime(phase===1?430:760,now+1.4);}
    $('#sceneContent').className=`scene-content ch4-fishing ch4-fishing-${phase}`;
    const intro=phase===1?nightCopy('CH4-P1-TUTORIAL'):nightCopy('CH4-P2-INTRO');
    const fishKey=`CH4-P${phase}-FISH${Math.min(current+1,4)}`;
    const hookedWords = caught !== undefined ? `<div class="hooked-words">${nightCopy(fishKey)}</div>` : '';
    $('#sceneContent').innerHTML=`<div class="ch4-water ${phase===2?'changed':''}"><img class="ch4-rod" src="assets/ch4-fishing-rod.png" alt=""><div class="ch4-line ${level.cast?'cast':''} ${caught!==undefined?'caught':''}"><i class="ch4-lure"></i>${hookedWords}</div><div class="lantern-wrap ${Object.values(level.steadyActions).filter(Boolean).length?'lit':''}"><img class="ch4-lantern" src="assets/ch4-lantern.png" alt=""></div></div><aside><div class="kicker">PHASE ${phase} · ${phase===1?'FISH THE ANXIETY':'THE WATER CHANGED'} · ${current}/4</div><p>${intro}</p>${caught!==undefined?`<div class="caught-card"><h3>${nightCopy(fishKey)}</h3><button data-fish-act="0">${phase===1?nightCopy('CH4-P1-ACT-BACK'):nightCopy('CH4-P2-ACT-BACK')}</button><button data-fish-act="1">${phase===1?nightCopy('CH4-P1-ACT-KEEP'):nightCopy('CH4-P2-ACT-LIGHT')}</button></div>`:level.cast?`<div class="wide-meter"><i></i><b></b></div><button class="primary-button" id="nightReel">${state.lang==='zh'?'收线':'REEL IN'}</button>`:`<button class="primary-button" id="nightCast">${state.lang==='zh'?'抛竿':'CAST'}</button>`}</aside>`;
    $('#nightCast')?.addEventListener('click',()=>{level.cast=true;playCast();saveState();renderNight();}); $('#nightReel')?.addEventListener('click',event=>{const meter=$('.wide-meter'),needle=$('.wide-meter b'),position=parseFloat(getComputedStyle(needle).left)/meter.clientWidth;if(position<.16||position>.88){showToast(state.lang==='zh'?'再等一下，浮标还会回来。':'WAIT A MOMENT. THE BOBBER WILL RETURN.',event);return;}if(phase===1)level.currentAnxiety=current;else level.currentSteady=current;level.cast=false;saveState();renderNight();});
    $$('[data-fish-act]').forEach(b=>b.onclick=()=>{const act=Number(b.dataset.fishAct);if(phase===1){level.anxietyActions[current]=act;level.anxieties.push(current);delete level.currentAnxiety;}else{level.steadyActions[current]=act;level.steady.push(current);delete level.currentSteady;}level.cast=false;if(list.length>=4)level.step+=1;saveState();transition(phase===1&&list.length>=4?nightCopy('CH4-P2-INTRO'):(state.lang==='zh'?'水流慢慢向前……':'The current moves quietly onward…'),renderLevel);});
  }

  function renderWaterMirror(level) {
    const photos=Object.values(state.levels[0].photoWords||{}).slice(0,5),seeds=state.levels[1].seeds||[],colors=state.levels[2].colors||[],chosen=new Set(level.mirrorChoices||[]);
    $('#sceneContent').className='scene-content ch4-mirror';
    $('#sceneContent').innerHTML=`<div class="mirror-water"><div class="mirror-photos">${photos.map(x=>`<span>${x}</span>`).join('')}</div><div class="mirror-flowers">${seeds.map((x,i)=>`<i class="${x===2?'pale':''}"></i>`).join('')}</div><div class="mirror-terrain">${colors.map(c=>`<b style="--c:${c}"></b>`).join('')}</div></div><aside><div class="kicker">PHASE 3 · WHO AM I</div><p>${nightCopy('CH4-P3-MIRROR')}</p><h3>${nightCopy('CH4-P3-PROMPT')}</h3><div class="mirror-lines">${[1,2,3,4].map((n,i)=>`<button data-mirror="${i}" class="${chosen.has(i)?'selected':''} ${level.steadyActions[i]?'lit':''}">${nightCopy(`CH4-P2-FISH${n}`)}</button>`).join('')}</div><blockquote>${nightCopy('CH4-NARR-2')}</blockquote><button class="primary-button" id="mirrorNext" ${chosen.size<1?'disabled':''}>${state.lang==='zh'?'等待渡船':'WAIT FOR THE FERRY'}</button></aside>`;
    $$('[data-mirror]').forEach(b=>b.onclick=()=>{const n=Number(b.dataset.mirror);if(chosen.has(n))chosen.delete(n);else if(chosen.size<3)chosen.add(n);level.mirrorChoices=[...chosen];saveState();renderWaterMirror(level);}); $('#mirrorNext').onclick=()=>{level.step=4;saveState();transition(state.lang==='zh'?'渡船靠岸……':'The ferry docks…',renderLevel);};
  }

  function renderTideLog(level) {
    $('#sceneContent').className='scene-content tide-log';
    $('#sceneContent').innerHTML=`<div class="kicker">END · TIDE LOG</div><h3>${nightCopy('END-TIDELOG')}</h3><div class="tide-stats"><span>${Object.keys(state.levels[0].photoWords||{}).length}<small>PHOTO WORDS</small></span><span>${(state.levels[1].seeds||[]).length}<small>SEEDS</small></span><span>${(state.levels[2].colors||[]).length}<small>COLORS</small></span><span>${(level.mirrorChoices||[]).length}<small>ABOARD</small></span></div><button class="primary-button" id="replayIslands">${nightCopy('END-REPLAY')}</button>`;
    $('#replayIslands').onclick=()=>showHome();
  }

  function renderCompletion(index, message) {
    dots(4, 3);
    const nextLabel = index < 3 ? (state.lang === 'zh' ? '返回主页查看新关卡' : 'RETURN HOME TO SEE THE NEW LEVEL') : (state.lang === 'zh' ? '回到主页' : 'RETURN HOME');
    $('#sceneContent').innerHTML = `<div class="scene-intro completion"><div class="kicker">LEVEL ${String(index + 1).padStart(2, '0')} · COMPLETE</div><h3>${state.lang === 'zh' ? '暂放心间' : 'LET IT REST'}</h3><p>${message}</p><div class="completion-actions"><button class="text-button" id="completionReplay">${state.lang === 'zh' ? '重新体验本关' : 'REPLAY THIS LEVEL'}</button><button class="primary-button" id="completionHome">${nextLabel}</button></div></div>`;
    $('#completionReplay').onclick = () => { resetLevel(index); renderLevel(); };
    $('#completionHome').onclick = () => {
      state.completed[index] = true; state.levels[index].step = Math.max(state.levels[index].step, 3); state.unlocked = Math.max(state.unlocked, Math.min(3, index + 1)); saveState(); showHome();
    };
  }

  function completeLevel(index) {
    state.completed[index] = true; state.levels[index].step = 3; state.unlocked = Math.max(state.unlocked, Math.min(3, index + 1)); saveState();
    transition(state.lang === 'zh' ? '小岛记住了这一步……' : 'The island remembers this step…', renderLevel);
  }

  function openPause() {
    if (currentLevel === null) return;
    saveState(); document.body.classList.add('paused'); $('#pauseOverlay').classList.add('open');
    if (audio?.context?.state === 'running') audio.context.suspend();
  }

  function closePause(force = false) {
    $('#pauseOverlay').classList.remove('open'); document.body.classList.remove('paused');
    if (!force && state.music && audio?.context?.state === 'suspended') audio.context.resume();
  }

  function initAudio(fadeIn = false) {
    if (!state.music) return;
    if (audio) { if (audio.context.state === 'suspended') audio.context.resume(); return; }
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const context = new AudioContext(); const master = context.createGain(); master.gain.value = fadeIn ? 0 : .07; master.connect(context.destination);
    if (fadeIn && state.music) master.gain.linearRampToValueAtTime(.07, context.currentTime + 3.2);
    const filter = context.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = 520;
    const seaGain = context.createGain(); seaGain.gain.value = .72; filter.connect(seaGain).connect(master);
    const buffer = context.createBuffer(1, context.sampleRate * 2, context.sampleRate); const channel = buffer.getChannelData(0);
    for (let i = 0; i < channel.length; i += 1) channel[i] = (Math.random() * 2 - 1) * .18;
    const sea = context.createBufferSource(); sea.buffer = buffer; sea.loop = true; sea.connect(filter); sea.start();
    const natureFilter = context.createBiquadFilter(); natureFilter.type = 'bandpass'; natureFilter.frequency.value = 2400; natureFilter.Q.value = .45;
    const natureGain = context.createGain(); natureGain.gain.value = 0; natureFilter.connect(natureGain).connect(master);
    const nature = context.createBufferSource(); nature.buffer = buffer; nature.loop = true; nature.playbackRate.value = .58; nature.connect(natureFilter); nature.start();
    const notes = [196, 220, 261.63, 293.66, 329.63]; let noteIndex = 0;
    const playNote = () => {
      if (!state.music || context.state !== 'running' || (currentLevel === 0 && state.levels[0].step === 2)) return;
      const osc = context.createOscillator(); const gain = context.createGain();
      osc.type = 'sine'; osc.frequency.value = notes[noteIndex % notes.length] / (noteIndex % 4 === 0 ? 2 : 1); noteIndex += 1;
      gain.gain.setValueAtTime(0, context.currentTime); gain.gain.linearRampToValueAtTime(.035, context.currentTime + .8); gain.gain.exponentialRampToValueAtTime(.001, context.currentTime + 4.8);
      osc.connect(gain); gain.connect(master); osc.start(); osc.stop(context.currentTime + 5);
    };
    playNote(); const timer = window.setInterval(playNote, 3100); audio = { context, master, filter, sea, seaGain, nature, natureGain, natureFilter, timer };
  }

  function toggleMusic() {
    state.music = !state.music; saveState();
    if (state.music) { if (!audio) initAudio(); else audio.context.resume(); }
    else audio?.context?.suspend();
    $('#musicBtn').classList.toggle('muted', !state.music);
    $('#musicBtn').textContent = state.music ? '♪' : '×';
    showToast(state.lang === 'zh' ? `背景音乐已${state.music ? '开启' : '关闭'}` : `BACKGROUND MUSIC ${state.music ? 'ON' : 'OFF'}`);
  }

  function playClick() {
    initAudio(); const context = audio?.context; if (!context || context.state !== 'running') return;
    const oscillator = context.createOscillator(), gain = context.createGain(); oscillator.frequency.value = 520; gain.gain.setValueAtTime(.045, context.currentTime); gain.gain.exponentialRampToValueAtTime(.001, context.currentTime + .09); oscillator.connect(gain).connect(context.destination); oscillator.start(); oscillator.stop(context.currentTime + .1);
  }

  function playBottleChime() {
    initAudio(); const context=audio?.context; if(!context||context.state!=='running')return;
    [880,1320,1760].forEach((frequency,index)=>{const oscillator=context.createOscillator(),gain=context.createGain(),start=context.currentTime+index*.065;oscillator.type='sine';oscillator.frequency.value=frequency;gain.gain.setValueAtTime(.03,start);gain.gain.exponentialRampToValueAtTime(.001,start+.28);oscillator.connect(gain).connect(context.destination);oscillator.start(start);oscillator.stop(start+.3);});
  }

  function playCast() {
    initAudio(); const context = audio?.context; if (!context || context.state !== 'running') return;
    const oscillator = context.createOscillator(), gain = context.createGain(); oscillator.type = 'triangle'; oscillator.frequency.setValueAtTime(180, context.currentTime); oscillator.frequency.exponentialRampToValueAtTime(700, context.currentTime + .35); gain.gain.setValueAtTime(.05, context.currentTime); gain.gain.exponentialRampToValueAtTime(.001, context.currentTime + .4); oscillator.connect(gain).connect(context.destination); oscillator.start(); oscillator.stop(context.currentTime + .42);
  }

  function playSeabird() {
    initAudio(); const context = audio?.context; if (!context || context.state !== 'running') return;
    [0, .16].forEach((delay, index) => { const oscillator = context.createOscillator(), gain = context.createGain(); oscillator.type = 'sine'; oscillator.frequency.setValueAtTime(index ? 1220 : 980, context.currentTime + delay); oscillator.frequency.exponentialRampToValueAtTime(index ? 820 : 1320, context.currentTime + delay + .18); gain.gain.setValueAtTime(.018, context.currentTime + delay); gain.gain.exponentialRampToValueAtTime(.001, context.currentTime + delay + .24); oscillator.connect(gain).connect(context.destination); oscillator.start(context.currentTime + delay); oscillator.stop(context.currentTime + delay + .25); });
  }

  function setSeabirds(active) {
    if (active && !birdTimer) { playSeabird(); birdTimer = window.setInterval(playSeabird, 6200); }
    if (!active && birdTimer) { window.clearInterval(birdTimer); birdTimer = null; }
  }

  function askReset() {
    confirmMode = 'journey';
    $('#confirmTitle').textContent = state.lang === 'zh' ? '重新开始整段旅程？' : 'RESET THE WHOLE JOURNEY?';
    $('#confirmCopy').textContent = state.lang === 'zh' ? '四个章节的解锁与选择记录都会被清除。' : 'All chapter unlocks and saved choices will be cleared.';
    $('#confirmCancel').textContent = state.lang === 'zh' ? '保留进度' : 'KEEP PROGRESS';
    $('#confirmOk').textContent = state.lang === 'zh' ? '确认重新开始' : 'RESET'; $('#confirmOverlay').classList.add('open');
  }

  function askRestartLevel() {
    if (currentLevel === null) return;
    confirmMode = 'level';
    $('#confirmTitle').textContent = state.lang === 'zh' ? '重新开始本关？' : 'RESTART THIS CHAPTER?';
    $('#confirmCopy').textContent = state.lang === 'zh' ? '本关内的进度会被清除，其他章节不受影响。' : 'Progress in this chapter will be cleared. Other chapters stay unchanged.';
    $('#confirmCancel').textContent = state.lang === 'zh' ? '继续当前进度' : 'KEEP PLAYING';
    $('#confirmOk').textContent = state.lang === 'zh' ? '重新开始本关' : 'RESTART CHAPTER';
    $('#confirmOverlay').classList.add('open');
  }

  function finishIntro() {
    const intro = $('#introSequence');
    if (!intro || intro.classList.contains('leaving')) return;
    intro.classList.add('leaving');
    window.setTimeout(() => intro.remove(), 1200);
  }

  $$('.level-button').forEach(button => button.addEventListener('click', () => startLevel(Number(button.dataset.startLevel))));
  $('#homeBtn').onclick = () => showHome(); $('#pauseBtn').onclick = openPause; $('#resumeBtn').onclick = () => closePause();
  $('#pauseHomeBtn').onclick = () => { closePause(true); showHome(); };
  $('#musicBtn').onclick = toggleMusic;
  $('#helpBtn').onclick = () => $('#aboutOverlay').classList.add('open');
  $('#langBtn').onclick = () => { state.lang = state.lang === 'zh' ? 'en' : 'zh'; saveState(); setLanguage(); };
  $('#aboutBtn')?.addEventListener('click', () => $('#aboutOverlay').classList.add('open')); $('#closeAbout').onclick = () => $('#aboutOverlay').classList.remove('open');
  $('#aboutOverlay').addEventListener('click', event => { if (event.target === $('#aboutOverlay')) $('#aboutOverlay').classList.remove('open'); });
  $('#resetBtn').onclick = askReset; $('#restartLevelBtn').onclick = askRestartLevel; $('#confirmCancel').onclick = () => $('#confirmOverlay').classList.remove('open');
  $('#confirmOk').onclick = () => {
    if (confirmMode === 'level' && currentLevel !== null) {
      resetLevel(currentLevel); $('#confirmOverlay').classList.remove('open'); renderLevel(); showToast(state.lang === 'zh' ? '本关已重新开始' : 'CHAPTER RESTARTED'); return;
    }
    const lang = state.lang; const music = state.music; state = defaultState(); state.lang = lang; state.music = music; localStorage.removeItem(STORAGE_KEY); saveState(); $('#confirmOverlay').classList.remove('open'); setLanguage(); showHome(false); showToast(state.lang === 'zh' ? '旅程已经重新开始' : 'THE JOURNEY HAS BEEN RESET');
  };
  window.addEventListener('keydown', event => { if (event.key === 'Escape') { if ($('#aboutOverlay').classList.contains('open')) $('#aboutOverlay').classList.remove('open'); else if ($('#pauseOverlay').classList.contains('open')) closePause(); else if (currentLevel !== null) openPause(); } });
  window.addEventListener('beforeunload', saveState);

  initAudio(true);
  document.addEventListener('pointerdown', () => { if (state.music) initAudio(true); }, { once: true, capture: true });
  window.setTimeout(() => { introCanSkip = true; const skip = $('#skipIntro'); if (skip) { skip.disabled = false; skip.setAttribute('aria-disabled', 'false'); } }, 3000);
  $('#skipIntro')?.addEventListener('click', event => { event.stopPropagation(); if (introCanSkip) finishIntro(); });
  $('#introSequence')?.addEventListener('click', () => { if (introCanSkip) finishIntro(); });
  document.addEventListener('pointerdown', event => { const button = event.target.closest('button'); if (button) { playClick(); if(button.dataset.bottleAct==='0')playBottleChime(); button.classList.add('clicked-glow'); window.setTimeout(() => button.classList.remove('clicked-glow'), 420); } }, true);
  window.setTimeout(finishIntro, 7600);

  $('#musicBtn').classList.toggle('muted', !state.music); $('#musicBtn').textContent = state.music ? '♪' : '×';
  setLanguage(); showHome(false);
})();
