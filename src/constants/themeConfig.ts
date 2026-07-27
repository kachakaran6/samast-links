export interface IThemeConfig {
  id: string;
  name: string;
  isPro: boolean;
  description: string;
  mainBg: string;
  mainColor: string;
  subTextColor: string;
  accentColor: string;
  linkBgColor: string;
  linkTitleColor: string;
  linkImageBackground: string;
  borderColor: string;
  dividerColor: string;
  borderRadius: string;
  borderWidth: string;
}

export const PHASE1_THEMES: IThemeConfig[] = [
  {
    id: "paper-and-ink",
    name: "Paper & Ink",
    isPro: false,
    description: "Warm off-white surface with charcoal text and rust accent. Editorial light default.",
    mainBg: "#F9F8F6",
    mainColor: "#1C1C1E",
    subTextColor: "#52525B",
    accentColor: "#9E2A2B",
    linkBgColor: "#FFFFFF",
    linkTitleColor: "#1C1C1E",
    linkImageBackground: "#F4F4F5",
    borderColor: "#E4E4E7",
    dividerColor: "#E4E4E7",
    borderRadius: "10px",
    borderWidth: "1px",
  },
  {
    id: "studio",
    name: "Studio",
    isPro: false,
    description: "Deep graphite surface with bone text and saffron accent. Editorial dark default.",
    mainBg: "#18181B",
    mainColor: "#F4F4F5",
    subTextColor: "#A1A1AA",
    accentColor: "#D97706",
    linkBgColor: "#27272A",
    linkTitleColor: "#F4F4F5",
    linkImageBackground: "#3F3F46",
    borderColor: "#3F3F46",
    dividerColor: "#3F3F46",
    borderRadius: "10px",
    borderWidth: "1px",
  },
  {
    id: "field-notes",
    name: "Field Notes",
    isPro: false,
    description: "Soft stone surface with charcoal text and forest green accent.",
    mainBg: "#F3F4F6",
    mainColor: "#111827",
    subTextColor: "#4B5563",
    accentColor: "#166534",
    linkBgColor: "#FFFFFF",
    linkTitleColor: "#111827",
    linkImageBackground: "#E5E7EB",
    borderColor: "#D1D5DB",
    dividerColor: "#D1D5DB",
    borderRadius: "8px",
    borderWidth: "1px",
  },
  {
    id: "harbor",
    name: "Harbor",
    isPro: true,
    description: "Slate navy surface with sand text and muted copper accent (Pro).",
    mainBg: "#0F172A",
    mainColor: "#F8FAFC",
    subTextColor: "#94A3B8",
    accentColor: "#EA580C",
    linkBgColor: "#1E293B",
    linkTitleColor: "#F8FAFC",
    linkImageBackground: "#334155",
    borderColor: "#334155",
    dividerColor: "#334155",
    borderRadius: "12px",
    borderWidth: "1px",
  },
];

export const PRO_ACCENT_PALETTE = [
  { name: "Rust / Oxblood", value: "#9E2A2B" },
  { name: "Saffron", value: "#D97706" },
  { name: "Forest Green", value: "#166534" },
  { name: "Copper", value: "#EA580C" },
  { name: "Deep Cobalt", value: "#1D4ED8" },
  { name: "Plum", value: "#7E22CE" },
];

export const PRO_BUTTON_SHAPES = [
  { name: "Soft Rounded", radius: "12px" },
  { name: "Pill", radius: "9999px" },
  { name: "Modest Square", radius: "4px" },
];
