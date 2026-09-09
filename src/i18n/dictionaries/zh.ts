import type { Dictionary } from "./en";

export const zh: Dictionary = {
  meta: {
    title: "Omicron 补习中心 | 西雅加达剑桥与国家课程辅导",
    description:
      "Omicron 补习中心（OTC）为 Checkpoint、IGCSE、AS/A Level、国家课程及 National+ 学生提供数学、物理、化学与英语辅导，位于西雅加达。",
  },
  common: {
    language: "语言",
    theme: "主题",
    lightMode: "浅色模式",
    darkMode: "深色模式",
    openMenu: "打开菜单",
    closeMenu: "关闭菜单",
    backToTop: "返回顶部",
    skipToContent: "跳至主要内容",
  },
  nav: {
    programs: "课程体系",
    subjects: "科目",
    about: "关于我们",
    packages: "班型与价格",
    location: "位置",
    contact: "联系我们",
    cta: "WhatsApp 咨询",
  },
  hero: {
    badge: "剑桥 · 国家课程 · National+",
    titleLead: "为",
    titleAccent: "剑桥与国家课程",
    titleTail: "学生打下扎实基础。",
    description:
      "Omicron 补习中心位于西雅加达，教授数学、物理、化学与英语——从 Checkpoint、IGCSE 到 AS/A Level、印尼国家课程以及 TKA 备考。班级规模始终精简，让每个问题都能得到解答。",
    primaryCta: "WhatsApp 咨询",
    secondaryCta: "查看班型与价格",
    note: "欢迎联系我们，了解适合该年级的课表与名额。",
    stats: [
      { value: "4", label: "核心科目" },
      { value: "3", label: "覆盖课程体系" },
      { value: "2", label: "班型选择" },
      { value: "1-5", label: "每班人数" },
    ],
    floatingCard: {
      title: "从 Checkpoint 到 A Level",
      body: "整个中学阶段，一家中心全程陪伴。",
    },
  },
  programs: {
    eyebrow: "课程体系",
    title: "按照学校实际使用的教学大纲授课",
    description:
      "每套课程体系都对应各自的评估标准，因此课堂内容与学生真正要考的试卷保持一致。",
    levelsLabel: "阶段",
    items: {
      cambridge: {
        name: "剑桥课程",
        tagline: "完整的剑桥路径，逐阶段推进。",
        levels: [
          "Lower & Upper Secondary Checkpoint",
          "IGCSE",
          "AS Level",
          "A Level",
        ],
      },
      national: {
        name: "国家课程",
        tagline: "印尼国家教学大纲，涵盖小学、初中与高中。",
        levels: ["小学（SD）", "初中（SMP）", "高中（SMA）"],
      },
      nationalPlus: {
        name: "National Plus",
        tagline: "双语国家课程学校，双语教学。",
        levels: ["小学", "初中", "高中"],
      },
      tka: {
        name: "TKA 备考",
        tagline: "考前限时训练，重点突破。",
        levels: ["强化备考"],
      },
    },
  },
  subjects: {
    eyebrow: "科目",
    title: "四门科目，由各自领域的专业老师授课",
    description: "我们刻意只保留少量科目，让每位老师都在自己的专业范围内教学。",
    items: {
      mathematics: {
        name: "数学",
        description:
          "从运算熟练度到微积分、统计与力学——一步步讲解，直到方法真正掌握。",
        topics: ["代数", "几何", "微积分", "统计"],
      },
      physics: {
        name: "物理",
        description:
          "力学、波、电学与近代物理，配合考官所要求的图示与公式推导。",
        topics: ["力学", "波", "电学", "近代物理"],
      },
      chemistry: {
        name: "化学",
        description:
          "化学计量、有机反应路径与物理化学，结合实验推理与应试技巧。",
        topics: ["化学计量", "有机化学", "物理化学", "无机化学"],
      },
      english: {
        name: "英语",
        description:
          "阅读理解、结构化写作、语法，以及在全英文课堂上敢于表达的自信。",
        topics: ["阅读", "写作", "语法", "口语"],
      },
    },
  },
  about: {
    eyebrow: "使命与愿景",
    title: "先理解，成绩自然随之而来。",
    description:
      "Omicron 的成立，源于太多学生被训练成复述答案，而不是学会思考。我们选择相反的做法。",
    vision: {
      label: "我们的愿景",
      body: "成为西雅加达最值得信赖的学习伙伴——让来自任何课程体系的学生都能建立真正的理解、自信，以及在考试季结束后依然留存的学习习惯。",
    },
    mission: {
      label: "我们的使命",
      items: [
        {
          title: "从第一性原理讲起",
          body: "在开始刷历年真题之前，每个知识点都会被拆解并重新建立。",
        },
        {
          title: "保持小班教学",
          body: "半私教班与私教班两种班型，让关注度契合每位学生的学习方式。",
        },
        {
          title: "尊重每套课程体系",
          body: "剑桥、国家课程与 National+ 各按其自身标准教学，绝不混为一谈。",
        },
        {
          title: "如实反馈进度",
          body: "向学生与家长提供清晰反馈，不作夸大承诺。",
        },
      ],
    },
    values: ["理解重于背诵", "小班教学", "如实反馈", "应试技巧扎实"],
  },
  packages: {
    eyebrow: "班型与价格",
    title: "两种班型，同一套教学标准。",
    description:
      "所有班型采用相同的大纲对应方式与相同的师资——差别只在于老师有多少注意力属于你。",
    popular: "最多人选择",
    capacityLabel: "班级规模",
    studentsUnit: "人",
    consultPrice: "欢迎咨询",
    consultNote: "根据课程体系、年级与学生需求个案报价，没有固定价目表。",
    consultCta: "WhatsApp 咨询",
    includesLabel: "包含内容",
    footnote:
      "没有固定价目表——所有费用均根据课程体系、年级与科目数量个案报价。请通过 WhatsApp 联系我们获取报价。",
    plans: {
      semiPrivate: {
        name: "半私教班",
        tagline: "多数学生选择的折中方案。",
        features: [
          "每班最多 5 人",
          "每月 8 次课，每次 90 分钟",
          "按小组薄弱知识点调整进度",
          "考前真题专项训练",
          "课后可直接联系老师",
        ],
      },
      private: {
        name: "私教班",
        tagline: "一对一，完全围绕一位学生设计。",
        features: [
          "一位学生，一位老师",
          "上课时间与时长与你共同商定",
          "完全个性化的学习规划",
          "考试季享优先排课",
          "适合追赶进度或超前学习的强化辅导",
        ],
      },
    },
  },
  steps: {
    eyebrow: "如何报名",
    title: "从发出消息到第一堂课，只需三步",
    items: [
      {
        title: "联系我们",
        body: "告知学生的年级、课程体系，以及需要辅导的科目。",
      },
      {
        title: "沟通需求",
        body: "我们一起了解现有水平、目标，以及最合适的班型。",
      },
      {
        title: "开始上课",
        body: "确认课表后，即可与该科目的老师开始学习。",
      },
    ],
  },
  location: {
    eyebrow: "位置",
    title: "在西雅加达找到我们",
    description: "Omicron 补习中心位于西雅加达，采用到中心现场上课的方式。",
    addressLabel: "我们的中心",
    addressNote: "课表确认后，我们会通过 WhatsApp 提供完整地址与路线指引。",
    directionsCta: "在 Google 地图中打开",
    contactCta: "咨询路线",
    mapTitle: "显示 Omicron 补习中心所在西雅加达区域的地图",
    detailsLabel: "温馨提示",
    details: ["在中心现场上课", "半私教班（最多 5 人）与私教班", "欢迎咨询可选时段"],
  },
  contact: {
    eyebrow: "联系我们",
    title: "告诉我们学生的学习需求",
    description:
      "填写后将打开 WhatsApp 并自动带上消息内容——本网站不会保存任何数据。",
    form: {
      nameLabel: "学生或家长姓名",
      namePlaceholder: "例如：Andrew",
      gradeLabel: "年级与课程体系",
      gradePlaceholder: "例如：Year 11 IGCSE",
      subjectLabel: "科目",
      subjectPlaceholder: "请选择科目",
      subjectAll: "多个科目",
      planLabel: "意向班型",
      planPlaceholder: "请选择班型",
      planUndecided: "尚未确定",
      messageLabel: "还有其他需要说明的吗？",
      messagePlaceholder: "希望重点补强的知识点、方便的上课时间、考试日期……",
      submit: "通过 WhatsApp 发送",
      privacy: "将在新标签页打开 WhatsApp。此表单不会向我们的服务器发送任何数据。",
      required: "请先填写姓名。",
      template: {
        intro: "您好 Omicron 补习中心，我想咨询辅导课程。",
        name: "姓名",
        grade: "年级与课程体系",
        subject: "科目",
        plan: "意向班型",
        message: "备注",
      },
    },
    channels: {
      whatsappLabel: "WhatsApp",
      whatsappValue: "联系我们最快的方式",
      instagramLabel: "Instagram",
      instagramValue: "最新动态与课堂剪影",
      phoneLabel: "电话",
      phoneValue: "办公室号码",
    },
  },
  cta: {
    title: "想亲自感受小班教学带来的不同吗？",
    description:
      "给我们发条消息，我们会帮你挑选最适合这位学生的班型与时间安排。",
    primary: "WhatsApp 咨询",
    secondary: "比较班型",
  },
  footer: {
    tagline:
      "西雅加达的剑桥、国家课程与 National+ 辅导中心。数学、物理、化学与英语。",
    exploreLabel: "浏览",
    subjectsLabel: "科目",
    reachLabel: "联系方式",
    rights: "保留所有权利。",
  },
};
