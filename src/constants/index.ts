export const sidebarLinks = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/link",
    label: "Home",
  },
  // {
  //   imgURL: "/assets/icons/stats.svg",
  //   route: "/statistics",
  //   label: "Statistics",
  //   allowed_plans: ["65a2c1eecd8291f5c016"],
  // },
  // {
  //   imgURL: "/assets/icons/link.svg",
  //   route: "/link/all",
  //   label: "Links",
  // },
  {
    imgURL: "/assets/icons/create.svg",
    route: "/link/create",
    label: "Create Link",
  },
  {
    imgURL: "/assets/icons/settings.svg",
    route: "/settings",
    label: "Settings",
  },
];

export const bottombarLinks = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/link",
    label: "Home",
  },
  // {
  //   imgURL: "/assets/icons/stats.svg",
  //   route: "/statistics",
  //   label: "Statistics",
  // },
  // {
  //   imgURL: "/assets/icons/link.svg",
  //   route: "/link/all",
  //   label: "Link",
  // },
  {
    imgURL: "/assets/icons/create.svg",
    route: "/link/create",
    label: "Create Link",
  },
  {
    imgURL: "/assets/icons/settings.svg",
    route: "/settings",
    label: "Settings",
  },
];

export const linkBlocks = [
  {
    name: "Simple Link",
    block_type: "simple_link",
    val: {
      imageUrl: "",
      label: "",
      link: "",
    },
  },

  {
    name: "Divider",
    block_type: "divider",
    icon: "",
    sizes: [
      { label: "Small", value: "sm" },
      { label: "Medium", value: "md" },
    ],
    val: {
      size: "sm",
    },
  },
  // {
  //   name: "Space",
  //   block_type: "space",
  //   sizes: [
  //     { label: "Small", value: "sm" },
  //     { label: "Medium", value: "md" },
  //   ],
  //   val: {
  //     size: "sm",
  //   },
  // },
  {
    name: "Text",
    block_type: "text",
    sizes: [
      { label: "Normal", value: "normal" },
      { label: "Small", value: "sm" },
      { label: "Medium", value: "md" },
      { label: "Heading 1", value: "h1" },
      { label: "Heading 2", value: "h2" },
      { label: "Heading 3", value: "h3" },
      { label: "Heading 4", value: "h4" },
      { label: "Heading 5", value: "h5" },
      { label: "Heading 6", value: "h6" },
    ],
    align: [
      { label: "Left", value: "left" },
      { label: "Right", value: "right" },
      { label: "Center", value: "center" },
    ],
    val: {
      text: "",
      size: "normal",
      align: "left",
    },
  },
  {
    name: "Github Profile Card",
    block_type: "github_card",
    val: {
      username: "",
    },
  },

  // {
  //   name: "Youtube Video",
  //   block_type: "youtube_video",
  //   val: {
  //     link: "",
  //   },
  // },
  {
    name: "Github repository card",
    block_type: "github_repo_card",
    val: {
      name: "",
      link: "",
      desc: "",
      tags: "",
    },
  },
  {
    name: "Github Contributions Chart",
    block_type: "github_contributions",
    val: {
      username: "",
    },
  },
];

export const SocialMediaInputs = [
  {
    label: "Instagram username",
    key: "instagram",
    placeholder: "Enter text here",
  },
  {
    label: "GitHub username",
    key: "github",
    placeholder: "Enter text here",
  },
  {
    label: "Telegram username",
    key: "telegram",
    placeholder: "Enter text here",
  },
  {
    label: "LinkedIn username",
    key: "linked_in",
    placeholder: "Enter text here",
  },
  {
    label: "Twitter username",
    key: "twitter",
    placeholder: "Enter text here",
  },
  // {
  //   label: "Twitch",
  //   key: "twitch",
  // },
];

export const bgColors = [
  {
    name: "Peppermint",
    code: "#F1F9EC",
  },
  {
    name: "Merino",
    code: "#F2EBDD",
  },
  {
    name: "Half and Half",
    code: "#FFFFE4",
  },
  {
    name: "Island Spice",
    code: "#FFFCEC",
  },
  {
    name: "Island Spice",
    code: "#FFF1E6",
  },
  {
    name: "Soft Peach",
    code: "#F6F1F4",
  },
  {
    name: "Daisy",
    code: "#FAFAFA",
  },
  {
    name: "Decorator’s White",
    code: "#ECEFEC",
  },
  {
    name: "Pomelo White",
    code: "#F9FFE3",
  },
  {
    name: "Beige",
    code: "#F5F5DC",
  },
  {
    name: "Cream",
    code: "#FFFDD0",
  },
  {
    name: "Parchment",
    code: "#F1E9D2",
  },
  {
    name: "Eggshell",
    code: "#F0EAD6",
  },
  {
    name: "Dutch white",
    code: "#EFDFBB",
  },
  {
    name: "Bone",
    code: "#E3DAC9",
  },
  {
    name: "Vanilla",
    code: "#F3E5AB",
  },
  {
    name: "Navajo white",
    code: "#FFDEAD",
  },
  {
    name: "Alabaster",
    code: "#EDEAE0",
  },
  {
    name: "Chiffon",
    code: "#FFFACD",
  },
  {
    name: "Unresolved Problem",
    code: "#F3F2ED",
  },
  {
    name: "Rose White",
    code: "#FFFAFA",
  },
  {
    name: "Vista White",
    code: "#FDFCFA",
  },
  {
    name: "Link White",
    code: "#ECF3F9",
  },
  {
    name: "Spring",
    code: "#F3F0E8",
  },
  {
    name: "Snow Drift",
    code: "#F8FBF8",
  },
];

export const viewsCardData = [
  {
    name: "Total Views",
    key: "total_views",
    data: [],
  },
  {
    name: "Unique Viewers",
    key: "unique_viewers",
    data: [],
  },
  {
    name: "Today",
    key: "today",
    data: [],
  },
  {
    name: "Yesterday",
    key: "yesterday",
    data: [],
  },
  {
    name: "Last 7 Days",
    key: "last_7_days",
    data: [],
  },
  {
    name: "Last 30 Days",
    key: "last_30_days",
    data: [],
  },
  {
    name: "Last 90 Days",
    key: "last_90_days",
    data: [],
  },
];

export const premiumRoutes: any = ["statistics"];

export const linkTogglers: any = [];

export const allFeatures: any = [
  {
    key: "max_websites_allowed",
    value: 2,
    title: `Max Websites allowed`,
    is_available: true,
  },
  {
    title: "Max links/website",
    key: "max_links_per_website",
    value: "Unlimited",
    is_available: true,
  },
  {
    title: "Unlimited Visitors",
    key: "visitor_limits",
    value: "Unlimited",
    is_available: true,
  },
  {
    title: "Social Media Links",
    key: "social_media_links",
    value: true,
    is_available: true,
  },
  {
    title: "Third Party Analytics",
    key: "google_analytics",
    value: true,
    is_available: true,
  },
  {
    title: "Seo Optimization",
    key: "seo_optimization",
    value: true,
    is_available: true,
  },
  {
    title: "Custom Domain",
    key: "custom_domain",
    value: false,
    is_available: false,
  },
  {
    title: "Multiple Tabs",
    key: "multiple_tabs",
    value: false,
    is_available: false,
  },
  {
    title: "Verified Badge",
    key: "verified_badge",
    value: false,
    is_available: true,
  },
  {
    title: "Advanced Statistics",
    key: "advanced_statistics",
    value: false,
    is_available: false,
  },
  {
    title: "Premium Themes",
    key: "premium_themes",
    value: false,
    is_available: false,
  },
  {
    title: "Sub Links",
    key: "sub_links",
    value: false,
    is_available: false,
  },
  {
    title: "Animations",
    key: "animations",
    value: false,
    is_available: false,
  },
  {
    title: "24/7 support",
    key: "support_24_7",
    value: false,
    is_available: true,
  },
  {
    title: "Scheduled Blocks",
    key: "scheduled_blocks",
    value: false,
    is_available: false,
  },
  {
    title: "Email Newsletter",
    key: "email_subscription",
    value: false,
    is_available: false,
  },
];

export const shareListData = [
  {
    link: "snapchat://creativeKitWeb/camera/1?attachmentUrl=",
    icon: "snapchat.svg",
    title: "Share on Snapchat",
  },
  {
    link: "https://www.facebook.com/sharer.php?u=",
    icon: "facebook.svg",
    title: "Share on Facebook",
  },
  {
    link: "https://www.linkedin.com/sharing/share-offsite/?url=",
    icon: "linkedin.svg",
    title: "Share on LinkedIn",
  },
  {
    link: "https://x.com/intent/tweet?text=Check%20out%20this%20Link!%20-%20",
    icon: "x-icon.svg",
    title: "Share on X",
  },
  {
    link: "https://wa.me/?text=*Hey%20check%20out%20this%20link*%0A",
    icon: "whatsapp.svg",
    title: "Share via WhatsApp",
  },
  {
    link: "mailto:?subject=%20Check%20out%20this%Link!%20&body=%20Check%20out%20this%Link!%20-%20",
    icon: "email.svg",
    title: "Share via Email",
  },
];

export const countryData = [
  {
    name: "India",
    total_visitors: 120,
    percentage: "50%",
  },
  {
    name: "USA",
    total_visitors: 50,
    percentage: "24%",
  },
  {
    name: "Australia",
    total_visitors: 57,
    percentage: "26%",
  },
];

export const themeData = [
  {
    name: "deep-dark",
    mainBg: "#001524",
    mainColor: "#D6CC99",
    linkBgColor: "#001524",
    linkTitleColor: "#D6CC99",
    linkImageBackground: "#445D48",
    borderColor: "#445D48",
    dividerColor: "#445D48",
    borderTopWidth: "2px",
    borderRightWidth: "2px",
    borderLeftWidth: "0",
    borderBottomWidth: "0",
    borderTopRightRadius: "12px",
    borderTopLeftRadius: "12px",
    borderBottomLeftRadius: "12px",
    borderBottomRightRadius: "12px",
  },
  {
    name: "fairy-dark",
    mainBg: "#001524",
    mainColor: "#FDE5D4",
    linkBgColor: "#001524",
    linkTitleColor: "#FDE5D4",
    linkImageBackground: "#445D48",
    borderColor: "#445D48",
    dividerColor: "#445D48",
    borderTopWidth: "2px",
    borderRightWidth: "2px",
    borderLeftWidth: "0",
    borderBottomWidth: "0",
    borderTopRightRadius: "12px",
    borderTopLeftRadius: "12px",
    borderBottomLeftRadius: "12px",
    borderBottomRightRadius: "12px",
  },
  {
    name: "darker",
    mainBg: "#3F1D38",
    mainColor: "#FDE5D4",
    linkBgColor: "#3F1D38",
    linkTitleColor: "#FDE5D4",
    linkImageBackground: "#E19898",
    borderColor: "#E19898",
    dividerColor: "#E19898",
    borderTopWidth: "2px",
    borderRightWidth: "2px",
    borderLeftWidth: "0",
    borderBottomWidth: "0",
    borderTopRightRadius: "12px",
    borderTopLeftRadius: "12px",
    borderBottomLeftRadius: "12px",
    borderBottomRightRadius: "12px",
  },
];

export const constantSlugs = [
  "auth",
  "verify-account",
  "account-blocked",
  "link",
  "settings",
  "profile",
  "subscription",
];
