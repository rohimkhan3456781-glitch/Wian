/**
 * ═══════════════════════════════════════════════════════════════
 * 星穹铁道 · 完整时间线 & 穿越入口点
 * ═══════════════════════════════════════════════════════════════
 *
 * 从宇宙诞生到4.0版本，按时间顺序排列
 * 用户可以选择任意时间点穿越进入
 *
 * ═══════════════════════════════════════════════════════════════
 */

import type { TimelineEntry } from "./types"

export const HSR_TIMELINE: TimelineEntry[] = [
  // ═══════════════════════════════════════
  // 第一纪元：太古时代（远古背景）
  // ═══════════════════════════════════════
  {
    id: "ancient-beast-war",
    title: "黄昏战争 · 古兽与星神的黎明",
    description:
      "星神尚未诞生的太古时代，古兽横行宇宙。克里珀（琥珀王）带领人类对抗古兽，这是宇宙最早的战争。贪饕星神奥博洛斯——最后一只古兽——正在吞噬一切。你将在这场决定宇宙命运的黄昏战争中醒来。",
    chapterId: "ch-ancient-beast",
    gameVersion: "远古背景",
    location: "原始宇宙",
    mainCharacters: ["克里珀"],
    complexity: "史诗",
    estimatedDuration: "3-5小时",
  },
  {
    id: "amber-king-ascension",
    title: "琥珀王登神 · 存护的诞生",
    description:
      "黄昏战争结束，克里珀成为存护星神，开始铸造天彗星墙、亚空晶壁等宇宙级防御工事。琥珀纪元由此开启，星际和平公司的前身'筑城者'开始追随琥珀王。你穿越到了琥珀纪元的开端，见证宇宙秩序的建立。",
    chapterId: "ch-amber-ascension",
    gameVersion: "远古背景",
    location: "天彗星墙",
    mainCharacters: ["克里珀"],
    complexity: "史诗",
    estimatedDuration: "2-3小时",
  },
  {
    id: "akivili-expedition",
    title: "阿基维利的远征 · 星穹列车的初航",
    description:
      "开拓星神阿基维利从孤绝世界裴迦纳出发，在星海中铺下轨道，连接不同的世界。星穹列车第一次驶入银河，无名客们追随祂的脚步探索未知。你将以阿基维利同行者的身份，参与这段传奇的初航。",
    chapterId: "ch-akivili-expedition",
    gameVersion: "远古背景",
    location: "裴迦纳 / 星穹列车",
    mainCharacters: ["阿基维利", "帕姆"],
    complexity: "史诗",
    estimatedDuration: "3-4小时",
  },

  // ═══════════════════════════════════════
  // 第二纪元：仙舟远古史
  // ═══════════════════════════════════════
  {
    id: "xianzhou-quest-for-elixir",
    title: "九舰求药 · 仙舟的起源",
    description:
      "仙舟人的祖先还是寿不逾百的短生种，帝皇倾尽一切打造九艘巨舰，横渡深空，向丰饶星神药师求取长生仙药。你将随求药使团踏上这段改变仙舟命运的旅途。",
    chapterId: "ch-quest-elixir",
    gameVersion: "远古背景",
    location: "古老母星 / 深空",
    mainCharacters: ["药师"],
    complexity: "复杂",
    estimatedDuration: "2-3小时",
  },
  {
    id: "jianmu-blessing",
    title: "建木降世 · 丰饶的祝福与诅咒",
    description:
      "药师回应了仙舟的祈愿，赐下建木。长生的果实让所有人获得了永生——但随之而来的是人口膨胀、资源匮乏、魔阴身的诅咒。天堂变成了地狱。你将亲眼见证'长生不老'如何从祝福变成灾难。",
    chapterId: "ch-jianmu-curse",
    gameVersion: "远古背景",
    location: "仙舟",
    mainCharacters: ["药师"],
    complexity: "复杂",
    estimatedDuration: "2-3小时",
  },
  {
    id: "digong-severs-jianmu",
    title: "帝弓斫断建木 · 巡猎的诞生",
    description:
      "仙舟人在长生的诅咒中挣扎了千年。终于，英雄'帝弓'力挽天弓，一箭射断建木，斩断丰饶之孽。仙舟人誓愿'复归凡身，清除寰宇不死劫'。巡猎星神岚由此诞生，仙舟联盟组建。你将参与这场仙舟历史上最伟大的抉择。",
    chapterId: "ch-digong-severance",
    gameVersion: "远古背景",
    location: "仙舟",
    mainCharacters: ["帝弓/岚"],
    complexity: "史诗",
    estimatedDuration: "3-4小时",
  },

  // ═══════════════════════════════════════
  // 第三纪元：出云国 & 黄泉前传
  // ═══════════════════════════════════════
  {
    id: "izumo-twelve-swords",
    title: "出云国 · 十二诏刀的时代",
    description:
      "出云国与高天原共同围绕黑日公转。八百万神降临引发灾难，出云人斩落大祸都牟刈神，铸成十二把护世诏刀。你穿越成为出云国的一员，与年轻的芽衣（黄泉的前身）并肩作战。",
    chapterId: "ch-izumo-swords",
    gameVersion: "远古背景",
    location: "出云国",
    mainCharacters: ["芽衣/黄泉"],
    complexity: "史诗",
    estimatedDuration: "4-6小时",
  },
  {
    id: "izumo-fall",
    title: "出云覆灭 · 黄泉的诞生",
    description:
      "虚无星神IX的阴影笼罩出云与高天原，人们沦为自灭者。十二诏刀一个接一个倒下，只剩芽衣。她流下血泪，以己身为刃，挥下了了断两个世界的一刀。之后，她独自面对虚无，成为了独一无二的虚无令使——黄泉。你将见证这段最悲壮的往事。",
    chapterId: "ch-izumo-fall",
    gameVersion: "远古背景",
    location: "出云国 / 高天原",
    mainCharacters: ["芽衣/黄泉", "虚无星神IX"],
    complexity: "史诗",
    estimatedDuration: "3-5小时",
  },

  // ═══════════════════════════════════════
  // 第四纪元：云上五骁时代
  // ═══════════════════════════════════════
  {
    id: "five-riders-glory",
    title: "云上五骁 · 赫赫功业",
    description:
      "景元、镜流、丹枫（饮月君）、应星、白珩——五位云骑英雄联手驱走步离人舰队、击溃活体星球计都蜃楼、保卫联盟。这是仙舟最辉煌的时代。你将以第六位同伴的身份加入他们的冒险。",
    chapterId: "ch-five-riders",
    gameVersion: "远古背景",
    location: "仙舟联盟 / 星海",
    mainCharacters: ["景元", "镜流", "丹枫", "应星", "白珩"],
    complexity: "史诗",
    estimatedDuration: "5-8小时",
  },
  {
    id: "shushu-invasion",
    title: "倏忽之乱 · 白珩之死",
    description:
      "丰饶令使倏忽率军入侵罗浮，云骑军十不存一。白珩为救众人自我牺牲。你将经历仙舟历史上最惨烈的战役，以及云上五骁的至暗时刻——一切悲剧的起点。",
    chapterId: "ch-shushu-invasion",
    gameVersion: "远古背景",
    location: "仙舟「罗浮」",
    mainCharacters: ["白珩", "丹枫", "应星", "景元", "镜流", "倏忽"],
    complexity: "史诗",
    estimatedDuration: "3-5小时",
  },
  {
    id: "yinyue-rebellion",
    title: "饮月之乱 · 复活的代价",
    description:
      "丹枫与应星不甘心白珩的死，妄图以化龙妙法复活她，却创造出一头孽龙。镜流斩杀孽龙后堕入魔阴，应星异化为不死之身。丹枫被褪鳞流放，景元独自收拾残局。五骁分崩离析——你在其中，能改变什么？",
    chapterId: "ch-yinyue-rebellion",
    gameVersion: "远古背景",
    location: "仙舟「罗浮」· 鳞渊境",
    mainCharacters: ["丹枫", "应星/刃", "镜流", "景元", "白珩(孽龙)"],
    complexity: "史诗",
    estimatedDuration: "4-6小时",
  },

  // ═══════════════════════════════════════
  // 第五纪元：序章（黑塔空间站）
  // ═══════════════════════════════════════
  {
    id: "herta-station-prologue",
    title: "黑塔空间站 · 星核的觉醒",
    description:
      "卡芙卡和银狼按照艾利欧的剧本潜入黑塔空间站，将星核植入载体（开拓者）。反物质军团的末日兽来袭，你在混乱中苏醒。姬子和星穹列车找到了你——冒险由此开始。你穿越到开拓者刚苏醒的那一刻。",
    chapterId: "ch-herta-prologue",
    gameVersion: "序章",
    location: "黑塔空间站",
    mainCharacters: ["卡芙卡", "银狼", "姬子", "三月七", "丹恒", "瓦尔特"],
    complexity: "简单",
    estimatedDuration: "1-2小时",
  },

  // ═══════════════════════════════════════
  // 第六纪元：1.0-1.2 雅利洛-VI
  // ═══════════════════════════════════════
  {
    id: "belobog-arrival",
    title: "贝洛伯格 · 寒冰之城",
    description:
      "被七百年寒潮覆盖的星球雅利洛-VI，唯一幸存的城邦贝洛伯格。大守护者可可利亚受星核侵蚀，妄图以星核创造'新世界'。布洛妮娅、杰帕德、希露瓦……你将卷入这座冰封之城的命运之中。",
    chapterId: "ch-belobog",
    gameVersion: "1.0-1.2",
    location: "雅利洛-VI · 贝洛伯格",
    mainCharacters: ["布洛妮娅", "杰帕德", "可可利亚", "希露瓦", "希儿", "娜塔莎", "克拉拉"],
    complexity: "中等",
    estimatedDuration: "3-5小时",
  },

  // ═══════════════════════════════════════
  // 第七纪元：1.2-1.6 仙舟罗浮
  // ═══════════════════════════════════════
  {
    id: "luofu-stellaron-crisis",
    title: "仙舟罗浮 · 星核危机",
    description:
      "星核猎手卡芙卡的邀约将列车组带到仙舟罗浮。幻胧假扮停云潜入仙舟，药王秘传蠢蠢欲动，丹恒的前世秘密即将揭开。你穿越到罗浮的长乐天，将亲身参与这场涉及丹恒身世、建木重生、绝灭大君幻胧的史诗危机。",
    chapterId: "ch-luofu-crisis",
    gameVersion: "1.2-1.6",
    location: "仙舟「罗浮」",
    mainCharacters: ["景元", "丹恒", "素裳", "符玄", "白露", "藿藿", "罗刹", "卡芙卡", "刃"],
    complexity: "复杂",
    estimatedDuration: "5-8小时",
  },

  // ═══════════════════════════════════════
  // 第八纪元：2.0-2.3 匹诺康尼
  // ═══════════════════════════════════════
  {
    id: "penacony-dreamworld",
    title: "匹诺康尼 · 不醒的美梦",
    description:
      "梦境之星匹诺康尼，钟表匠的盛宴。知更鸟在你房间中离奇'死去'，花火递来一枚毁灭按钮，流萤（星核猎手萨姆）引导你探索真相。星期日妄图用星核编织永恒美梦——从你踏入白日梦酒店的那一刻起，你就已经身处太一之梦中了。",
    chapterId: "ch-penacony",
    gameVersion: "2.0-2.3",
    location: "匹诺康尼",
    mainCharacters: ["流萤", "知更鸟", "星期日", "花火", "黄泉", "黑天鹅", "砂金", "托帕"],
    complexity: "复杂",
    estimatedDuration: "6-10小时",
  },

  // ═══════════════════════════════════════
  // 第九纪元：2.4-2.5 仙舟回归
  // ═══════════════════════════════════════
  {
    id: "luofu-martial-tournament",
    title: "仙舟罗浮 · 演武仪典",
    description:
      "星核之乱后，景元面临联盟的质疑。他在罗浮举办演武仪典，朱明烛渊将军怀炎的孙女云璃、曜青天击将军飞霄登上罗浮。步离人策划解放战首呼雷妄图大开杀戒，彦卿领悟镜流剑招……你将参与这场仙舟的盛大武斗。",
    chapterId: "ch-luofu-tournament",
    gameVersion: "2.4-2.5",
    location: "仙舟「罗浮」",
    mainCharacters: ["景元", "云璃", "飞霄", "彦卿", "怀炎"],
    complexity: "中等",
    estimatedDuration: "3-4小时",
  },

  // ═══════════════════════════════════════
  // 第十纪元：3.0-3.4 翁法罗斯（安弗洛斯）
  // ═══════════════════════════════════════
  {
    id: "amphoreus-flame-chase",
    title: "翁法罗斯 · 逐火英雄传",
    description:
      "一个由记忆数据构成的沙盒世界，十二泰坦创造了翁法罗斯。黑潮侵蚀，泰坦疯狂，金血继承者们踏上'逐火之旅'夺取核焰，拯救世界。但真相是——这一切都是权杖的实验，目的是孕育新的毁灭之主。斐阳的牺牲、塞壬的永恒之书……你将见证这个'数据世界'中最壮烈的英雄史诗。",
    chapterId: "ch-amphoreus",
    gameVersion: "3.0-3.4",
    location: "翁法罗斯（安弗洛斯）",
    mainCharacters: ["斐阳", "塞壬", "阿格莱亚", "米德", "卡斯托莉丝", "安纳克萨", "大黑塔"],
    complexity: "史诗",
    estimatedDuration: "8-12小时",
  },

  // ═══════════════════════════════════════
  // 第十一纪元：4.0 二相乐园
  // ═══════════════════════════════════════
  {
    id: "planarcadia-phantasmoon",
    title: "二相乐园 · 幻月游戏",
    description:
      "阿哈（欢愉星神）亲自设立的幻月游戏——胜者不仅能面见阿哈，还能获得一分钟的欢愉星神权柄。二相乐园曾是画布中的2D世界，在IPC管理下复活为真实领土。这里是姬子的故乡，也是星穹列车再次启程的起点。花火与她的分身斯帕克西同台登场，一场明亮的对决正在上演。",
    chapterId: "ch-planarcadia",
    gameVersion: "4.0",
    location: "二相乐园（普拉纳卡迪亚）",
    mainCharacters: ["花火", "斯帕克西", "阿哈", "爻光", "珍珠"],
    complexity: "中等",
    estimatedDuration: "3-5小时",
  },
]
