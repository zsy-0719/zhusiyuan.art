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
    "从剧本内核到最终呈现 全流程内容创作的AIGC编导超级个体",
    "用镜头和审美，把好故事落地",
  ],
  personalLines: [
    "ENFJ但是没有人觉得我像E人",
    "书法爱好者",
    "瞎拍摄影师",
    "深圳十峰还差莲花山",
    "Vibe Coding贴钱玩家",
    "热美式苦中作乐",
    "干中学",
    "看准方向就行动",
    "周杰伦二十年粉丝",
    "雷达级敏感，泰坦级抗压 🛡️",
    "共情力 MAX 的叙事者",
    "A股资深韭菜",
    "AI漫剧全干工程师 💻",
    "AI深度探索中.....",
    "刘亦菲是我女神",
    "暖男巨蟹座",
    "不喜欢内耗",
    "从不失眠",
    "活到老学到老",
    "喜欢看电影",
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
    image: "/uploads/project-0.jpg",
    color:
      "from-amber-500/10 to-red-500/10 dark:from-amber-500/5 dark:to-red-500/5",
    sections: [
      {
        title: "故事简介",
        intro:
          `上一世，凭借一口能够吸收他人厄运增强功力的镇厄炉，陈故各种开挂升级，胡作非为，横行无忌。
结果一念之差，居然为了救一个人，裂炉而死。
意外重生回到 1995 年，陈故暗暗发誓：这一世，我一定要守住自己坏人的人设！`,
        images: [
          { src: "/uploads/project-0-section-0-img-1.jpg", label: "第二集" },
          { src: "/uploads/project-0-section-0-img-2.jpg", label: "第三集" },
        ],
        videos: [
          { cover: "/uploads/project-0-section-0-img-1.jpg", label: "第二集", link: "https://pan.baidu.com/s/1HNM4f8EkMMOkWZMPz2S1mw?pwd=6666" },
          { cover: "/uploads/project-0-section-0-img-2.jpg", label: "第三集", link: "https://pan.baidu.com/s/1ew7iCcywO6k20tSGhQTNdA?pwd=6666" },
        ],
      },
      {
        title: "人物设计",
        images: [],
        characters: [
          {
            name: "陈故（主角）",
            desc: `神秘「镇厄炉」的拥有者，重生前已将镇厄炉升至八阶，差一步大圆满。
前世为救一个身具大因果之人而死。死后重生回到 1995 年，那一年陈故十八岁，大学生。`,
            images: [
              "/images/zhenelu/character-01.webp",
              "/images/zhenelu/character-02.webp",
              "/images/zhenelu/character-03.webp",
            ],
          },
          {
            name: "周宁",
            desc: `中医传承家庭的长女。家境优越，爷爷更是顶尖中医名家。
因抗拒长辈安排的刻板人生，她叛逆离家，躲进小医院当起基层护士。
她与陈故偶然相遇，两人的交织让她的逃离之路走向了未知的方向。`,
            images: ["/images/zhenelu/character-zhouning.webp"],
          },
          {
            name: "林朝",
            desc: "陈故好友，古武家族出身。前世意外死于一场试炼。性格和陈故相比，略显木讷，善良而忠诚。",
            images: [
              "/images/zhenelu/character-linchao-01.webp",
              "/images/zhenelu/character-linchao-02.webp",
            ],
          },
          {
            name: "沈无忧",
            desc: "异能者大家族沈家的千金，身具大因果，在沈家地位特殊。异能未知。性格表面散漫，实则骨子里坚韧不屈。",
            images: [
              "/images/zhenelu/character-shenwuyou-01.webp",
              "/images/zhenelu/character-shenwuyou-02.webp",
            ],
          },
        ],
      },
      {
        title: "分镜图",
        images: [
          { src: "/images/zhenelu/sb-01.webp", label: "场景 01" },
          { src: "/uploads/project-0-section-2-img-1.jpg", label: "场景 00-1-1" },
          { src: "/images/zhenelu/sb-00-11.webp", label: "场景 00-11" },
          { src: "/images/zhenelu/sb-00-13.webp", label: "场景 00-13" },
          { src: "/uploads/project-0-section-2-img-4.jpg", label: "场景 17" },
          { src: "/images/zhenelu/sb-天台04.webp", label: "天台" },
          { src: "/uploads/project-0-section-2-img-6.jpg", label: "打针" },
          { src: "/uploads/project-0-section-2-img-7.jpg", label: "拿水" },
          {
            src: "/images/zhenelu/sb-masterpiece,_8K,_ultra-realistic,_202604151725.webp",
            label: "概念图",
          },
        ],
      },
      {
        title: "封面与文字设计",
        images: [
          { src: "/images/zhenelu/cover-抖音封面.webp", label: "抖音封面" },
          { src: "/images/zhenelu/cover-厄炉（竖.webp", label: "厄炉（竖）" },
        ],
      },
      {
        title: "关键资产",
        images: [
          { src: "/uploads/project-0-section-4-img-0.webp", label: "厄炉视觉" },
          {
            src: "/images/zhenelu/asset-大树守卫白底三视图.webp",
            label: "大树守卫",
          },
          { src: "/images/zhenelu/asset-岩植怪三视图.webp", label: "岩植怪" },
          { src: "/images/zhenelu/asset-怪物形象.webp", label: "怪物形象" },
          { src: "/images/zhenelu/asset-炼化概念.webp", label: "炼化概念" },
          { src: "/images/zhenelu/asset-识海.webp", label: "识海" },
          { src: "/uploads/project-0-section-4-img-6.jpg", label: "" },
        ],
      },
    ],
  },
  {
    title: "《背影》",
    category: "剧情短片 · 概念开发",
    description:
      "独立完成从故事到剧本创作到成片输出的全流程AI视频制作。包含角色设计、分镜拆解、AI视频生成、后期合成与配乐，形成完整的 AIGC 生产闭环。",
    tags: ["分镜脚本", "人物设计", "概念视觉", "叙事设计"],
    image: "/uploads/project-1.jpg",
    color:
      "from-sky-500/10 to-blue-500/10 dark:from-sky-500/5 dark:to-blue-500/5",
    sections: [
      {
        title: "项目概述",
        intro:
          `一部沿 318 川藏线展开的荒诞又深情的故事。城中村餐馆老板用「卖房娶后妈」的谎言骗回两年没有回家，在城市打拼受挫的儿子，一段用谎言唤回、用镜头告别的旅程就此开启。
类型：剧情 / 家庭 / 公路片。
情感基调：温馨、感人，
核心冲突：传统父权"为你好"vs 成年儿子"弯路也要自己走一遍"。深度体现东方家庭独有的「拧巴的爱」—— 嘴硬心软，沉默胜于言语。
主题句：他用谎言唤回儿子，用镜头告别自己，用最拧巴的方式说爱你。`,
        images: [
          { src: "/uploads/project-1-section-0-img-0.jpg", label: "背影上集" },
        ],
        videos: [
          { cover: "/uploads/project-1-section-0-img-0.jpg", label: "背影上集", link: "https://pan.baidu.com/s/1Hnu8jgJYIH9r7zV6egZy6A?pwd=6666" },
        ],
      },
      {
        title: "人物三视图",
        images: [],
        videos: [],
        characters: [
          {
            name: "唐宁",
            desc: "在城市打拼受挫的年轻人，被父亲的谎言骗回家，踏上一段荒诞又无法拒绝的川藏线之旅。",
            images: ["/images/beiying/character-唐宁白底三视图.webp"],
          },
          {
            name: "老唐",
            desc: "城中村餐馆老板，嘴硬心软，爱难说出口。用最拧巴的方式，用谎言唤回两年不回家的儿子，完成最后的告别。",
            images: ["/images/beiying/character-老唐白底三视图.webp"],
          },
        ],
      },
      {
        title: "重要分镜图",
        images: [
          { src: "/images/beiying/sb-01.webp", label: "分镜 01" },
          { src: "/images/beiying/sb-02.webp", label: "分镜 02" },
          { src: "/images/beiying/sb-04.webp", label: "分镜 04" },
          { src: "/images/beiying/sb-05.webp", label: "分镜 05" },
          { src: "/images/beiying/sb-06.webp", label: "分镜 06" },
          { src: "/images/beiying/sb-07.webp", label: "分镜 07" },
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
  sectionTitle: "AI 时代的全链路生产",
  sectionSubtitle:
    `剧本拆解（总剧本→单集骨架）→场景并发（锁定单场景，多线程批量生成人物动作素材→定向补拍（依剪辑逻辑精准缝合转场）→音画总装（剪辑对齐，嵌入BGM与音效交付成品）。
使用Gemini Omni和GPT批量生成分镜。
成果：打破传统线性制作瓶颈，素材产出效率成倍跃迁`,
  phases: [
    {
      title: "剧本与世界观",
      description:
        `具备从"概念孵化"到"视觉落地"的全链路剧本统筹能力。
熟练掌握"主题锚定 → 规则构建 → 冲突推演 → 结构排布 → 视听具象化"的标准创作过程。
在实际创作中，能够从大纲逐步拆解详细的分集脚本。
既能将空间调度思维与专业摄影的镜头语言前置，撰写出包含精确景别、运镜逻辑、视听节奏及特效标注的影视工业级分镜文本，也可以根据生成画面进行实时调整、修改。
不仅能构建自洽的世界观设定，更能为后续的 AIGC 生成提供相对精确的执行依据。`,
      images: [
        { src: "/images/zhenelu/设定1.png", label: "项目设定" },
        { src: "/uploads/workflow-phase-0-img-0.jpg", label: "第一季剧本大纲内容" },
        { src: "/uploads/workflow-phase-0-img-1.jpg", label: "分集内容" },
        { src: "/uploads/workflow-phase-0-img-2.jpg", label: "详细分镜脚本" },
      ],
      techNote: undefined as string | undefined,
      audio: undefined as { src: string; label: string }[] | undefined,
    },
    {
      title: "资产制作",
      description:
        `精通AIGC视觉资产的标准化与一致性构建，保证透视比例不变形，完成关键场景概念图与核心人物关键帧的锚定，确保风格、人物形象、角色站位不跑偏，动作表情不变形。
多手段（如：角色站位图，场景全景图，人物标记和草模搭建）等方式能够有效克服 AI 视频生成的连贯性痛点，确保全片在特定画风与角色特征上的绝对统一，剧情连贯。`,
      images: [
        { src: "/uploads/workflow-phase-1-img-0.jpg", label: "" },
        { src: "/uploads/workflow-phase-1-img-1.jpg", label: "" },
        { src: "/uploads/workflow-phase-1-img-2.jpg", label: "" },
        { src: "/uploads/workflow-phase-1-img-3.jpg", label: "" },
        { src: "/uploads/workflow-phase-1-img-4.jpg", label: "" },
        { src: "/uploads/workflow-phase-1-img-5.jpg", label: "" },
        { src: "/uploads/workflow-phase-1-img-6.jpg", label: "" },
        { src: "/uploads/workflow-phase-1-img-7.jpg", label: "" },
        { src: "/uploads/workflow-phase-1-img-8.jpg", label: "" },
        { src: "/uploads/workflow-phase-1-img-9.jpg", label: "" },
        { src: "/uploads/workflow-phase-1-img-10.jpg", label: "" },
        { src: "/uploads/workflow-phase-1-img-11.jpg", label: "" },
      ],
      compare: undefined as { before: string; after: string; label: string } | undefined,
      techNote: undefined as string | undefined,
      audio: undefined as { src: string; label: string }[] | undefined,
    },
    {
      title: "AI 视觉生成",
      description:
        "Midjourney / Flow 概念分镜图 → 可灵 / 即梦生成视频。熟练使用 Photoshop 完成 AI 素材的局部精修、光影统一与元素合成。",
      images: [
        { src: "/uploads/workflow-phase-2-img-0.jpg", label: "" },
        { src: "/uploads/workflow-phase-2-img-1.jpg", label: "" },
        { src: "/uploads/workflow-phase-2-img-2.jpg", label: "" },
        { src: "/uploads/workflow-phase-2-img-3.jpg", label: "" },
        { src: "/uploads/workflow-phase-2-img-4.jpg", label: "" },
      ],
      compare: undefined as { before: string; after: string; label: string } | undefined,
      techNote: undefined as string | undefined,
      audio: undefined as { src: string; label: string }[] | undefined,
    },
    {
      title: "后期与成片",
      description:
        `拥有后期视听统合与情绪渲染能力。熟练使用 PR/AE/剪映等后期软件，通过剪辑将碎片化的AI素材进行节奏重塑。
在声音工程方面，深度掌握TTS的参数微调与音频参考技术，尽量消除配音的"AI 机械感"，让情感更加丰富；同时熟练使用 Suno 等音频生成工具，独立完成环境音效与情绪配乐的定制，实现画面与声音的完美融合，让画面更具有情感。`,
      images: [
        { src: "/uploads/workflow-phase-3-img-0.jpg", label: "" },
        { src: "/uploads/workflow-phase-3-img-1.jpg", label: "" },
        { src: "", label: "" },
      ],
      audio: [
        { src: "/uploads/workflow-phase-3-audio-0.mp3", label: "在路边长大的夏天" },
        { src: "/uploads/workflow-phase-3-audio-1.mp3", label: "老唐去世" },
        { src: "/uploads/workflow-phase-3-audio-2.mp3", label: "节奏欢快" },
      ],
      techNote: undefined as string | undefined,
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
  avatarPath: "/uploads/avatar.jpg",
  highlights: [
    { label: "设计经验", value: "5 年" },
    { label: "AIGC 实战", value: "1 年+" },
    { label: "所在地", value: "深圳" },
    { label: "状态", value: "求职中" },
  ],
  introTitle: ["从传统视觉设计到 AIGC 编导，行动起来", ""],
  introParagraphs: [
    `我是朱思源，美术设计科班出身的AIGC影视编导与AI agent实践者。
拥有 5 年跨领域设计经验，2025 年深度投入AIGC，已实现独立跑通 AI 漫剧项目制作流程。作为深圳市摄影家协会会员，精通构图、光影、调色等，能充分利用AI工具，死磕真实商业需求，提高效率，保持不断进化。`,
    `我是 AIGC 编导实践者。
在文本端：海量小说与影视的阅历，懂得如何与有魅力的故事、有弧光的角色共情；
在视觉端：多年的美术、设计、摄影、书法功底，沉淀为我的审美基础；
在技术端：对 Midjourney、ComfyUI、nanobanana、可灵、即梦等主流工具链的高效驾驭。
热爱是我的最大驱动力。它让我始终保持高频迭代，深度思考。`,
  ],
  experienceLabel: "工作经历",
  experiences: [
    {
      period: "2025.05 — 至今",
      role: "AIGC 编导",
      company: "瀚思云创（深圳）文化有限公司",
      details: [
        "主导 AI 漫剧全流程生产，从剧本到成片闭环输出",
        "攻克 AI 视觉生产核心痛点：多方法实现场景一致性和角色 IP 一致性控制",
        "沉淀可复用 Prompt 模板、风格 Lora 基准与场景资产库，提升生产效率",
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
  wechatQr: "/uploads/wechat-qr.jpg",
  resumeLink: "/uploads/朱思源_AIGC视频编导_武汉科技大学.pdf",
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
  sectionLabel: "关于AIGC的发展思考 / On the Development of AIGC",
  sectionTitle: "AIGC影视的未来工业流程化思考",
  sectionIntro:
    "画质与一致性已经沦为普通的入场券，拉开差距的应该是：以经典叙事与契合故事的时事共振稳住情感基础，用AIGC的技术去解放科幻、仙侠、玄幻或是历史正剧等重工业题材的成本极限，打造可长线复利的数字明星与独特世界观IP。",
  insights: [
    {
      number: "01",
      title: "数字明星的商业营收",
      description:
        `真人演员有塌房和老化风险，而数字明星是公司 100% 绝对持有的核心无形资产。
内容端树立人设：利用短剧高频刷脸，只要故事好NPC也有感情，靠锁死的性格弧光凝聚长线粉丝黏性；
商业端多维利用：凭借零边际成本的跨生态迁移，将数字明星同步至游戏 NPC、品牌代言与电商直播、乃至人形机器人。`,
    },
    {
      number: "02",
      title: "以组件形式累积资产重构视听史诗",
      description:
        `通过AIGC重点打造科幻、玄幻、武侠、历史正剧等传统影视的高预算题材。
不执着于AI囤积单一、静态的宏大场景产物，而是在制作过程中拆解出可复利的特定画风、巨型科幻视觉资产、古代阵法符文、玄幻视觉符号等内容，以标准零件组装创意的方式，保住下限，推高上限。`,
    },
    {
      number: "03",
      title: `叙事工程的"有限创新"`,
      description:
        `在信息流与算法时代，盲目的结构创新是高风险的商业自嗨。在叙事底层克制创新，人类几千年来复仇、母爱、逆袭、遗憾等情感未曾颠覆，确保故事的工业下限与情绪共鸣；同时，利用AIGC对元素进行高概念的"迷影式拼贴与重组"。将最成熟、最懂人心的剧本逻辑，套上最前沿、最炸裂的 AI 视觉外壳，去找到当下的时代共情。`,
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
  sectionTitle: "自驱提效，利他落地，淬炼自己的用户思维和实操能力。",
  sectionSubtitle:
    `AI 时代没有"能不能做"，核心在于"敢不敢去尝试，并想办法实现"。
在深刻理解真实需求后，我通过 Vibe Coding 模式跑通了从架构设计、开发迭代、多模态验收到自动化部署的全流程交付。`,
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
