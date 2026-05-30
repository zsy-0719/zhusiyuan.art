/*
 * ================================================================
 *  网站内容配置文件 —— 改这个文件就能更新整个网站
 * ================================================================
 *
 *  怎么用：
 *  1. 改文字：直接改引号里的内容就行
 *  2. 改图片：把新图片放到 public/images/ 目录，然后改路径
 *     - 例如：image: "/images/我的新图.jpg"
 *  3. 保存后刷新浏览器就能看到变化（开发模式下自动更新）
 *
 *  图片格式支持：jpg / jpeg / png / webp
 *  建议把图片放到 public/images/ 下面，分类管理
 * ================================================================
 */

/* ============================================================
 * 导航栏
 * ============================================================ */
export const navData = {
  brand: "朱思源",
  links: [
    { href: "#about", label: "关于我" },
    { href: "#projects", label: "核心作品" },
    { href: "#workflow", label: "创作流程" },
    { href: "#future-vision", label: "未来演进" },
    { href: "#vibecoding", label: "Vibe Coding" },
  ],
};

/* ============================================================
 * Hero 首屏
 * ============================================================ */
export const heroData = {
  subtitle: "AIGC 编导 · AI 视频导演 · 概念视觉开发",
  name: "朱思源",
  tagline: [
    "AI 时代的内容创作者 —— 理解视听语言如何与 AI 能力结合，",
    "从文本到成片，全链路讲好每一个故事。",
  ],
  personalLines: [
    "ENFJ · 理想主义的行动派",
    "书法 · 笔墨之间见天地",
    "摄影 · 用镜头捕捉生活切片",
    "登山 · 每周至少爬一次山",
    "Vibe Coding · 用 AI 把想法变成产品",
    "咖啡成瘾 · 手冲是早晨的仪式感",
    "帮朋友写脚本 · 从豆瓣评论到论文论据",
  ],
};

/* ============================================================
 * 项目列表
 *
 * 每个项目有：
 *   title       - 项目名称
 *   category    - 分类标签
 *   description - 简短描述（卡片上显示）
 *   tags        - 技术标签
 *   image       - 封面图路径（放 public/images/ 下面）
 *   sections    - 弹窗里的详细内容（分类展示）
 *
 * sections 里每个分类：
 *   title      - 分类标题（如"人物设计"）
 *   intro      - 分类简介（可选，不写就留空字符串 ""）
 *   images     - 图片列表 [{ src: "路径", label: "图片说明" }]
 *   characters - 角色卡片（有角色名和描述时用）
 * ============================================================ */
export const projectsData = [
  {
    title: "《我有一口镇厄炉》",
    category: "AI 漫剧 · 全流程编导",
    description:
      "独立完成从世界观构建、剧本创作到成片输出的全流程 AI 漫剧制作。包含角色设计、分镜拆解、AI 视频生成、后期合成与配乐，形成完整的 AIGC 生产闭环。",
    tags: ["Midjourney", "可灵 / 即梦", "Suno 配乐", "Photoshop", "剪映 / PR"],
    image: "/images/zhenelu-cover.png",
    color:
      "from-amber-500/10 to-red-500/10 dark:from-amber-500/5 dark:to-red-500/5",
    sections: [
      {
        title: "故事简介",
        intro:
          "上一世，凭借一口能够吸收他人厄运增强功力的镇厄炉，陈故各种开挂升级，胡作非为，横行无忌。结果一念之差，居然为了救一个人，裂炉而死。意外重生回到 1995 年，陈故暗暗发誓：这一世，我一定要守住自己坏人的人设！",
        images: [],
      },
      {
        title: "视频链接",
        videos: [
          { cover: "/images/zhenelu-cover.png", label: "预告片", link: "https://pan.baidu.com/s/17tuGx9khtHrN9xJ0rPnnhw?pwd=6666" },
        ],
      },
      {
        title: "人物设计",
        images: [],
        characters: [
          {
            name: "陈故（主角）",
            desc: "神秘「镇厄炉」的拥有者，重生前已将镇厄炉升至八阶，差一步大圆满。前世为救一个身具大因果之人而死。死后重生回到 1995 年，那一年陈故十八岁，大学生。",
            images: [
              "/images/zhenelu/character-01.png",
              "/images/zhenelu/character-02.png",
              "/images/zhenelu/character-03.jpg",
            ],
          },
          {
            name: "周宁",
            desc: "中医传承家庭的长女。家境优越，爷爷更是顶尖中医名家。因抗拒长辈安排的刻板人生，她叛逆离家，躲进小医院当起基层护士。她与陈故偶然相遇，两人的交织让她的逃离之路走向了未知的方向。",
            images: ["/images/zhenelu/character-zhouning.png"],
          },
          {
            name: "林朝",
            desc: "陈故好友，古武家族出身。前世意外死于一场试炼。性格和陈故相比，略显木讷。善良而忠诚。",
            images: [
              "/images/zhenelu/character-linchao-01.png",
              "/images/zhenelu/character-linchao-02.png",
            ],
          },
          {
            name: "沈无忧",
            desc: "异能者大家族沈家的千金，身具大因果，在沈家地位特殊。异能未知。性格表面散漫，实则骨子里坚韧不屈。",
            images: [
              "/images/zhenelu/character-shenwuyou-01.png",
              "/images/zhenelu/character-shenwuyou-02.png",
            ],
          },
        ],
      },
      {
        title: "分镜图",
        images: [
          { src: "/images/zhenelu/sb-01.jpeg", label: "场景 01" },
          { src: "/images/zhenelu/sb-00-1-1.jpeg", label: "场景 00-1-1" },
          { src: "/images/zhenelu/sb-00-11.jpeg", label: "场景 00-11" },
          { src: "/images/zhenelu/sb-00-13.png", label: "场景 00-13" },
          { src: "/images/zhenelu/sb-00-15.png", label: "场景 00-15" },
          { src: "/images/zhenelu/sb-17.jpeg", label: "场景 17" },
          { src: "/images/zhenelu/sb-天台04.png", label: "天台" },
          { src: "/images/zhenelu/sb-打针(4).png", label: "打针" },
          { src: "/images/zhenelu/sb-拿水1-8.jpeg", label: "拿水" },
          {
            src: "/images/zhenelu/sb-masterpiece,_8K,_ultra-realistic,_202604151725.png",
            label: "概念图",
          },
        ],
      },
      {
        title: "封面与文字设计",
        images: [
          { src: "/images/zhenelu/cover-抖音封面.png", label: "抖音封面" },
          { src: "/images/zhenelu/cover-厄渡竖.png", label: "厄渡（竖）" },
          { src: "/images/zhenelu/cover-厄炉（竖.png", label: "厄炉（竖）" },
          { src: "/images/zhenelu/cover-3.jpeg", label: "封面 03" },
        ],
      },
      {
        title: "关键资产",
        images: [
          { src: "/images/zhenelu/asset-厄炉视觉.png", label: "厄炉视觉" },
          {
            src: "/images/zhenelu/asset-大树守卫白底三视图.jpeg",
            label: "大树守卫",
          },
          { src: "/images/zhenelu/asset-岩植怪三视图.jpg", label: "岩植怪" },
          { src: "/images/zhenelu/asset-怪物形象.jpeg", label: "怪物形象" },
          { src: "/images/zhenelu/asset-炼化概念.jpeg", label: "炼化概念" },
          { src: "/images/zhenelu/asset-识海.png", label: "识海" },
        ],
      },
    ],
  },
  {
    title: "《背影》",
    category: "剧情短片 · 概念开发",
    description:
      "一部沿 318 川藏线展开的荒诞又深情的公路片。城中村餐馆老板确诊肝癌晚期，用「卖房娶后妈」的谎言骗回在城市打拼受挫的儿子，一段用谎言唤回、用镜头告别的旅程就此开启。核心冲突：传统父权「为你好」vs 成年儿子「弯路需要自己趟一遍」。",
    tags: ["分镜脚本", "人物设计", "概念视觉", "叙事设计"],
    image: "/images/beiying-storyboard-01.png",
    color:
      "from-sky-500/10 to-blue-500/10 dark:from-sky-500/5 dark:to-blue-500/5",
    sections: [
      {
        title: "项目概述",
        intro:
          "类型：剧情 / 家庭 / 公路片。情感基调：温馨、感人泪下，深度体现东方家庭独有的「拧巴的爱」—— 嘴硬心软，沉默胜于言语。主题句：「他用谎言唤回儿子，用镜头告别自己，用最拧巴的方式说爱你。」",
        images: [],
      },
      {
        title: "视频链接",
        videos: [
          { cover: "/images/beiying-storyboard-01.png", label: "背影预告片", link: "https://pan.baidu.com/s/17tuGx9khtHrN9xJ0rPnnhw?pwd=6666" },
        ],
      },
      {
        title: "人物三视图",
        images: [],
        characters: [
          {
            name: "唐宁",
            desc: "在城市打拼受挫的年轻人，被父亲的谎言骗回家，踏上一段荒诞又无法拒绝的川藏线之旅。",
            images: ["/images/beiying/character-唐宁白底三视图.png"],
          },
          {
            name: "老唐",
            desc: "城中村餐馆老板，确诊肝癌晚期仅剩四个月。用最拧巴的方式 —— 一个谎言 —— 唤回儿子，完成最后的告别。",
            images: ["/images/beiying/character-老唐白底三视图.png"],
          },
        ],
      },
      {
        title: "重要分镜图",
        images: [
          { src: "/images/beiying/sb-01.png", label: "分镜 01" },
          { src: "/images/beiying/sb-02.png", label: "分镜 02" },
          { src: "/images/beiying/sb-03.png", label: "分镜 03" },
          { src: "/images/beiying/sb-04.png", label: "分镜 04" },
          { src: "/images/beiying/sb-05.jpeg", label: "分镜 05" },
          { src: "/images/beiying/sb-06.png", label: "分镜 06" },
          { src: "/images/beiying/sb-07.png", label: "分镜 07" },
        ],
      },
    ],
  },
];

/* ============================================================
 * 工作流程
 *
 * phases  - 流程步骤（4 步）
 * tools   - 工具标签
 * ============================================================ */
export const workflowData = {
  sectionLabel: "创作流程",
  sectionTitle: "工业化标准，艺术级控制。",
  sectionSubtitle:
    "不仅仅是串联工具，而是建立从文字内核到视觉呈现的绝对秩序。",
  phases: [
    {
      title: "视听前置的世界构建",
      description:
        "拒绝盲目的 AI「抽卡」。将空间规划的严谨性与专业摄影构图底蕴注入早期脚本。在文字阶段，就以导演视角精准框定架空设定的景别、光影与叙事节奏，为后续的视觉生成建立不可动摇的蓝图。",
      images: [] as { src: string; label: string }[],
      techNote:
        "先用 SketchUp 搭建场景白模确定机位和景别，再以分镜脚本的形式输出给 Midjourney / ComfyUI，保证每次生成都在「导演意图」之内而非随机抽卡。",
      audio: undefined as { src: string; label: string }[] | undefined,
    },
    {
      title: "绝对一致性的资产沉淀",
      description:
        "攻克 AIGC 最大的连贯性痛点。通过搭建严密的风格基准与微调模型（LoRA）矩阵，实现角色多角度与面部情绪的稳定输出。构建独立的世界观视觉字典，确保同一项目中核心资产 100% 工业级复用。",
      images: [] as { src: string; label: string }[],
      compare: { before: "", after: "", label: "" } as { before: string; after: string; label: string } | undefined,
      techNote:
        "基于 Kohya SS 训练角色专属 LoRA（32 张多角度训练集 + 正则化图像），配合 ControlNet Lineart 锁定轮廓、ReferenceNet 锁定面部特征，三重视觉锚点确保跨镜头角色一致性。",
      audio: undefined as { src: string; label: string }[] | undefined,
    },
    {
      title: "审美驾驭的像素级生成",
      description:
        "让工具向审美臣服。精准控制最终的视觉输出，彻底摒弃 AI 常见的粗粝随机感或塑料质感。深谙如何通过精准的提示词与深度的局部重绘，确保画面稳定呈现极具质感的复古亚洲都市动画与插画风格，让每一帧都经得起审视。",
      images: [] as { src: string; label: string }[],
      compare: { before: "", after: "", label: "" } as { before: string; after: string; label: string } | undefined,
      techNote:
        "ComfyUI 工作流中嵌入 IP-Adapter + 风格 LoRA，配合 After Effects 的色链进行后期色彩统调。关键帧人工精修（Photoshop 局部重绘），非一键生成。",
      audio: undefined as { src: string; label: string }[] | undefined,
    },
    {
      title: "情绪本位的视听闭环",
      description:
        "消除 AI 素材的碎片感。以传统的严苛影视后期标准，完成色彩科学的统调与动态串联。结合深度定制的情绪配乐与人声设计，将零散的生成片段，重塑为具备极高感染力的完整电影级叙事。",
      images: [] as { src: string; label: string }[],
      audio: [] as { src: string; label: string }[],
      techNote:
        "PR 时间线上精确到帧的节奏控制 + AE 动态合成。Suno 生成多版本配乐后人工筛选，TTS 配音后手动调整语速和停顿，最终混音确保人声、音效、配乐三层平衡。",
    },
  ],
  toolsLabel: "工具栈",
  tools: [
    "Midjourney",
    "ComfyUI",
    "可灵 (Kling)",
    "即梦",
    "Seedance",
    "Photoshop",
    "Premiere",
    "After Effects",
    "剪映",
    "Suno",
    "TTS 配音",
    "SketchUp",
    "Claude Code",
  ],
};

/* ============================================================
 * 摄影 / 生活照片集
 *
 * title       - 区块标题
 * description - 区块简介
 * images      - 照片列表 [{ src: "图片路径", label: "说明" }]
 *               路径放 public/images/ 下面，或通过后台直接上传
 * ============================================================ */
export const galleryData = {
  title: "生活与摄影",
  description: "工作之外，用镜头记录爬山、健身和日常灵感。",
  images: [] as { src: string; label: string }[],
};

/* ============================================================
 * 关于我
 *
 * avatarPath     - 个人照片路径（放 public/images/ 下面）
 *                   例如: "/images/avatar.jpg"
 *                   留空 "" 则显示头像占位符
 * highlights     - 关键数据卡片
 * introTitle     - 左侧大标题
 * introParagraphs - 个人简介段落
 * experiences    - 工作经历（每条含时间、职位、公司、详情列表）
 * education      - 教育 & 荣誉（标签 + 内容）
 * contactEmail   - 联系邮箱
 * resumeLink     - 简历链接（"#" 表示暂无链接）
 * ============================================================ */
export const aboutData = {
  avatarPath: "", // 改成 "/images/avatar.jpg" 等
  highlights: [
    { label: "设计经验", value: "5 年" },
    { label: "AIGC 实战", value: "1 年+" },
    { label: "所在地", value: "深圳" },
    { label: "状态", value: "开放远程协作" },
    { label: "Vibe Coding", value: "4 个完整应用" },
  ],
  introTitle: ["从传统视觉设计到 AIGC 编导，", "跨界但不跨行。"],
  introParagraphs: [
    "我是朱思源，一名从传统视觉设计转型的 AIGC 编导实践者。环境设计科班出身，5 年设计经验覆盖城市更新、乡村振兴、文创开发等多个领域。2025 年起深度投入 AIGC 实战，独立完成 AI 漫剧项目全流程创作。",
    "我的核心竞争力在于「跨界整合」—— 多年的美术、摄影、书法功底赋予我扎实的构图、光影和色彩判断力；技术侧的持续学习让我能驾驭 Midjourney、ComfyUI、可灵、即梦等主流 AI 工具链。更重要的是，我理解的不是某个工具怎么用，而是「视听语言如何与 AI 能力结合」，从而做出真正有感染力的内容。",
    "湖北省书法家协会会员的身份，让我对东方审美与水墨视觉有独到理解 —— 这在当下 AI 生成「千篇一律的赛博美学」中，是难得的差异化优势。同时我持续追踪 AI 前沿技术，对 AIGC + 影视的工业化流程保持深度思考与迭代。",
    "在 AI 辅助开发（Vibe Coding）方面，我已从单纯的 AI 使用者进化为能独立交付完整应用的创造者。为书画培训机构开发了集课时签到、消课扣费、学员管理于一体的运营系统；编写了短视频全平台一键分发脚本，打通多账号内容发布链路。此外，我还为外贸场景设计了两套 Claude Code Skill ——「B2B 搜索关键词生成器」输入产品品类或 HS Code 即可自动拆分子品类并生成 Google / B2B 平台搜索关键词矩阵；「个性化开发信引擎」抓取客户网站后完成背调分析、匹配我方工程案例，自动输出一对一定制开发信。从需求拆解、架构设计到部署落地，全流程 AI 协作驱动，把想法快速变成能用的产品。",
  ],
  experienceLabel: "工作经历",
  experiences: [
    {
      period: "2025.05 — 至今",
      role: "创始人 / AIGC 编导",
      company: "瀚思云创（深圳）文化有限公司",
      details: [
        "主导 AI 漫剧全流程生产管线搭建，从剧本到成片闭环输出",
        "攻克 AI 视觉生产核心痛点：多方法实现场景一致性和角色 IP 一致性控制",
        "沉淀可复用 Prompt 模板、风格 Lora 基准与场景资产库，提升团队生产效率",
        "代表作品：《我有一口镇厄炉》前 4 集成片，含完整 AIGC 生成流程",
      ],
    },
    {
      period: "2024.08 — 2025.11",
      role: "书法教师 / 文创设计师",
      company: "自主创业",
      details: [
        "开发系统化书法美育课程，将传统技法转化为可复制教学模式",
        "设计文创产品，探索「手作 + 科技」跨界创作",
        "传统技艺与现代工具的融合实践，建立独特的内容创作视角",
      ],
    },
    {
      period: "2021.04 — 2024.07",
      role: "主创设计师",
      company: "广东卓创乡建旅游发展有限公司",
      details: [
        "主导城市微更新与乡村振兴项目方案设计，从文化挖掘到空间落地全流程把控",
        "负责概念方案、建模渲染到施工落地的完整设计链路",
        "协调多专业团队，确保设计方案在材料、工艺、尺度上的精准呈现",
      ],
    },
  ],
  education: [
    {
      label: "学历",
      content:
        "武汉科技大学 · 艺术与设计学院（环境设计方向）· 本科 · 2014 — 2018",
    },
    {
      label: "书法",
      content: "湖北省书法家协会会员，作品入选第十届书法篆刻展",
    },
    { label: "摄影", content: "深圳市摄影家协会会员，多年摄影实践经验" },
    { label: "政治面貌", content: "中共党员" },
  ],
  contactEmail: "281489594@qq.com",
  phone: "18672487652",
  wechatQr: "", // 微信二维码图片路径，如 "/images/wechat-qr.jpg"
  resumeLink: "#", // 改成你的简历 PDF 链接
  ctaPrimary: "联系我",
  ctaSecondary: "查看完整简历 (PDF)",
};

/* ============================================================
 * 未来演进 / Future Vision
 *
 * sectionLabel  - 板块小标
 * sectionTitle  - 主标题
 * sectionIntro  - 引言段落
 * insights      - 核心观点列表（number / title / description）
 * ============================================================ */
export const futureVisionData = {
  sectionLabel: "未来演进 / FUTURE VISION",
  sectionTitle: "下半场的进化：AIGC 影视的工业化定调",
  sectionIntro:
    "当画质与一致性沦为普通的入场券，拉开差距的是：以经典叙事与契合故事的时事共振稳住情感基础，用 AIGC 的技术去解放科幻、仙侠、玄幻或是历史正剧等重工业题材的成本极限，打造可长线复利的数字明星与独特世界观 IP。",
  insights: [
    {
      number: "01",
      title: "数字明星的商业营收",
      description:
        `不再满足于跨镜头的"人脸一致"，而是运用标准化资产管线，在虚拟像素中淬炼出具备独特眼神、动作习惯与绝对产权的"数字演员"，沉淀具有长线复利价值的虚拟明星 IP。`,
    },
    {
      number: "02",
      title: "重工业题材的「场景专权」",
      description:
        "避开 AI 微表情管理与极端情感雕琢的阶段性陷阱。用导演的视听语言代偿，将算力重武器砸向科幻、玄幻、武侠与历史正剧等重工业场景，用国风留白与宏大空间透视完成奇观的降维构建。",
    },
    {
      number: "03",
      title: "叙事工程的「有限创新」",
      description:
        "人类几千年的情感内核无需彻底颠覆。坚守经典三幕式戏剧骨架作为 100% 工业化复制的叙事底盘（底层不乱创新）；同时以敏捷管线紧跟全球时事与当下大众情绪。用最成熟的逻辑，装最前沿的视觉故事。",
    },
    {
      number: "04",
      title: "全链路剧本统筹",
      description:
        `具备从"概念孵化"到"视觉落地"的全链路剧本统筹能力。熟练掌握"主题锚定 → 规则构建 → 冲突推演 → 结构排布 → 视听具象化"的标准创作过程。在实际创作中，能够从大纲逐步拆解详细的分集脚本。既能将空间调度思维与专业摄影的镜头语言前置，撰写出包含精确景别、运镜逻辑、视听节奏及特效标注的影视工业级分镜文本，也可以根据生成画面进行实时调整、修改。不仅能构建自洽的世界观设定，更能为后续的 AIGC 生成提供相对精确的执行依据。`,
    },
  ],
};

/* ============================================================
 * Vibe Coding 项目
 *
 * 用 AI 辅助开发的实用工具 / 应用
 * ============================================================ */
export const vibeCodingData = {
  sectionLabel: "Vibe Coding",
  sectionTitle: "用 AI 把想法落地为产品。",
  sectionSubtitle:
    "不只写 Prompt，而是理解真实业务需求后，借助 Claude Code 完成架构设计、开发迭代到部署的全流程。",
  projects: [
    {
      name: "书画培训管理系统",
      tools: ["Claude Code", "本地部署", "全栈开发"],
      description:
        "为书画培训机构量身定制的运营系统。集课时签到、消课扣费、学员信息管理于一体，替代传统纸质记录和 Excel 手工统计。教师端扫码签到自动扣减课时，管理端实时查看消课数据和营收报表。",
      highlights: ["课时签到与自动消课", "学员档案与课时余额", "营收统计与数据看板"],
    },
    {
      name: "短视频多平台分发工具",
      tools: ["批处理脚本", "多平台 API", "Claude Code"],
      description:
        "一键将短视频同时分发到抖音、快手、小红书、微信视频号等多个平台。自动处理各平台不同的格式要求和上传流程，解决逐个平台手动发布的重复劳动，将原本 30 分钟的分发工作压缩到 1 分钟内完成。",
      highlights: ["全平台一键分发", "格式自动适配", "发布状态追踪"],
    },
    {
      name: "豆瓣评论爬取与分析脚本",
      tools: ["Python", "Claude Code", "数据抓取", "情感分析"],
      description:
        "帮朋友论文研究定制的数据采集与分析工具。自动爬取指定豆瓣电影/图书的评论数据，清洗后输出结构化 Excel 表格，并对评论文本进行情感倾向分析与关键词频统计，为论文学术观点提供量化论据支撑。",
      highlights: ["豆瓣评论自动爬取", "Excel 结构化输出", "情感分析与关键词频统计", "论文论据量化支撑"],
    },
    {
      name: "外贸客户开发 Skill 套件",
      tools: ["Claude Code Skill", "HS Code", "B2B 搜索", "开发信"],
      description:
        "为外贸场景设计的两套 Claude Code Skill。「B2B 搜索关键词生成器」输入产品品类或 HS Code，自动拆分子品类并生成 Google / B2B 平台搜索关键词矩阵，直接复制去精准搜索目标客户。「个性化开发信引擎」抓取客户网站完成背调分析，自动匹配我方工程案例，输出一对一定制开发信，替代千篇一律的群发模板。",
      highlights: [
        "HS Code 智能拆分子品类",
        "Google / B2B 关键词矩阵生成",
        "客户网站背调 + 案例匹配",
        "一对一定制开发信输出",
      ],
    },
  ],
};

/* ============================================================
 * 页脚
 * ============================================================ */
export const footerData = {
  copyright: "朱思源 — AI 时代的内容创作者",
  email: "281489594@qq.com",
  phone: "18672487652",
};

/* ============================================================
 * SEO 元数据（浏览器标签栏标题 + 搜索引擎描述）
 * ============================================================ */
export const seoData = {
  title: "朱思源 — AIGC 编导 · AI 视频导演",
  description:
    "朱思源的作品集。AI 时代的内容创作者，从文本到成片的 AIGC 全链路实践者。",
};

/* ============================================================
 * 后台管理密码
 * ============================================================ */
export const adminPassword = "zhusiyuan2026";
