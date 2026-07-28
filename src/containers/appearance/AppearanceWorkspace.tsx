import { useEffect, useState } from "react";
import { useUserContext } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { PHASE1_THEMES, PRO_BUTTON_SHAPES } from "@/constants/themeConfig";
import {
  getUserLinks,
  getSocialMediaByLinkId,
  updateSocialMediaLinks,
  updateUser,
} from "@/lib/supabase/api";
import {
  User,
  Palette,
  Square,
  Share2,
  Upload,
  Check,
  Plus,
  Trash2,
  Sparkles,
  Sun,
  Moon,
} from "lucide-react";
import toast from "react-hot-toast";

const socialPlatforms = [
  { id: "twitter", name: "Twitter / X", placeholder: "https://x.com/username" },
  { id: "github", name: "GitHub", placeholder: "https://github.com/username" },
  { id: "instagram", name: "Instagram", placeholder: "https://instagram.com/username" },
  { id: "youtube", name: "YouTube", placeholder: "https://youtube.com/@channel" },
  { id: "linkedin", name: "LinkedIn", placeholder: "https://linkedin.com/in/username" },
  { id: "telegram", name: "Telegram", placeholder: "https://t.me/username" },
  { id: "email", name: "Email Address", placeholder: "mailto:you@domain.com" },
];

const platformKeyMap: Record<string, string> = {
  "Twitter / X": "twitter",
  "GitHub": "github",
  "Instagram": "instagram",
  "LinkedIn": "linked_in",
  "Telegram": "telegram",
  "Twitch": "twitch",
  "Skype": "skype",
  "TikTok": "tiktok",
};

const AppearanceWorkspace = () => {
  const { user, currentPlan } = useUserContext();
  const { theme, setTheme, accent, setAccent, accentPresets } = useTheme();
  const [activeSection, setActiveSection] = useState<
    "profile" | "theme" | "buttons" | "social"
  >("profile");

  // Profile form state
  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [avatarUrl, setAvatarUrl] = useState(
    user?.imageUrl || "/assets/icons/profile-placeholder.svg"
  );
  const [userLinkId, setUserLinkId] = useState<string>("");
  const [socialRowId, setSocialRowId] = useState<string>("");

  // Theme & button state
  const [selectedTheme, setSelectedTheme] = useState("paper-and-ink");
  const [buttonShape, setButtonShape] = useState("rounded");
  const [buttonStyle, setButtonStyle] = useState("filled");

  // Social links state
  const [socialLinks, setSocialLinks] = useState<
    { platform: string; url: string }[]
  >([]);
  const [newPlatform, setNewPlatform] = useState("Twitter / X");
  const [newSocialUrl, setNewSocialUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Load User Link & Social Media from Supabase on mount
  useEffect(() => {
    async function loadSocials() {
      try {
        const userId = (user as any)?.id || (user as any)?.$id;
        if (!userId) return;
        const links = await getUserLinks(userId);
        const activeLink = Array.isArray(links) ? links[0] : null;
        if (activeLink) {
          const linkId = activeLink.id || activeLink.$id;
          setUserLinkId(linkId);
          const socialsData = await getSocialMediaByLinkId(linkId);
          if (socialsData) {
            setSocialRowId(socialsData.id || socialsData.$id || "");
            const list: { platform: string; url: string }[] = [];
            if (socialsData.twitter) list.push({ platform: "Twitter / X", url: socialsData.twitter });
            if (socialsData.github) list.push({ platform: "GitHub", url: socialsData.github });
            if (socialsData.instagram) list.push({ platform: "Instagram", url: socialsData.instagram });
            if (socialsData.linked_in) list.push({ platform: "LinkedIn", url: socialsData.linked_in });
            if (socialsData.telegram) list.push({ platform: "Telegram", url: socialsData.telegram });
            setSocialLinks(list);
          }
        }
      } catch (err) {
        console.error("loadSocials error:", err);
      }
    }
    loadSocials();
  }, [user]);

  const syncSocialsToDb = async (updatedList: { platform: string; url: string }[]) => {
    if (!userLinkId) return;
    const payload: any = {
      id: socialRowId || `soc_${userLinkId}`,
      linkId: userLinkId,
      twitter: "",
      github: "",
      instagram: "",
      linked_in: "",
      telegram: "",
      twitch: "",
      skype: "",
      tiktok: "",
    };

    updatedList.forEach((item) => {
      const col = platformKeyMap[item.platform];
      if (col) {
        payload[col] = item.url;
      }
    });

    await updateSocialMediaLinks(payload);
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const userId = (user as any)?.id || (user as any)?.$id;
      if (userId) {
        await updateUser({
          userId: userId,
          name: name,
          imageUrl: avatarUrl,
          file: [],
        });
      }
      toast.success("Profile appearance saved to database!");
    } catch (err) {
      toast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddSocial = async () => {
    if (!newSocialUrl.trim()) {
      toast.error("Please enter a valid social URL");
      return;
    }
    const updated = [
      ...socialLinks.filter((item) => item.platform !== newPlatform),
      { platform: newPlatform, url: newSocialUrl.trim() },
    ];
    setSocialLinks(updated);
    setNewSocialUrl("");
    await syncSocialsToDb(updated);
    toast.success(`${newPlatform} added & saved to database!`);
  };

  const handleRemoveSocial = async (index: number) => {
    const target = socialLinks[index];
    const updated = socialLinks.filter((_, i) => i !== index);
    setSocialLinks(updated);
    await syncSocialsToDb(updated);
    toast.success(`${target.platform} removed from database!`);
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 py-6 md:py-8 flex flex-col gap-8">


      {/* Main Layout: Left Navigation Rail & Right Section Body */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Section Navigation (md:col-span-3) */}
        <div className="md:col-span-3 flex flex-row md:flex-col gap-1.5 bg-surface border border-border rounded-2xl p-2.5 overflow-x-auto">
          <button
            onClick={() => setActiveSection("profile")}
            style={activeSection === "profile" ? { backgroundColor: accent.color } : undefined}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left w-full ${
              activeSection === "profile"
                ? "text-white shadow-sm"
                : "text-ink-muted hover:text-ink hover:bg-surface-muted"
            }`}>
            <User className="w-4 h-4" />
            <span>Profile</span>
          </button>

          <button
            onClick={() => setActiveSection("theme")}
            style={activeSection === "theme" ? { backgroundColor: accent.color } : undefined}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left w-full ${
              activeSection === "theme"
                ? "text-white shadow-sm"
                : "text-ink-muted hover:text-ink hover:bg-surface-muted"
            }`}>
            <Palette className="w-4 h-4" />
            <span>Themes</span>
          </button>

          <button
            onClick={() => setActiveSection("buttons")}
            style={activeSection === "buttons" ? { backgroundColor: accent.color } : undefined}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left w-full ${
              activeSection === "buttons"
                ? "text-white shadow-sm"
                : "text-ink-muted hover:text-ink hover:bg-surface-muted"
            }`}>
            <Square className="w-4 h-4" />
            <span>Button Style</span>
          </button>

          <button
            onClick={() => setActiveSection("social")}
            style={activeSection === "social" ? { backgroundColor: accent.color } : undefined}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left w-full ${
              activeSection === "social"
                ? "text-white shadow-sm"
                : "text-ink-muted hover:text-ink hover:bg-surface-muted"
            }`}>
            <Share2 className="w-4 h-4" />
            <span>Social Links</span>
          </button>
        </div>

        {/* Right Section Content (md:col-span-9) */}
        <div className="md:col-span-9 flex flex-col gap-6">
          {/* SECTION 1: PROFILE */}
          {activeSection === "profile" && (
            <div className="bg-surface border border-border rounded-2xl p-6 flex flex-col gap-6">
              <h3 className="text-base font-bold text-ink">Profile Details</h3>

              {/* Avatar Uploader (96px) */}
              <div className="flex items-center gap-6">
                <img
                  src={avatarUrl}
                  alt="avatar"
                  className="w-24 h-24 rounded-full object-cover border-2 border-border bg-canvas"
                />
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <label className="cursor-pointer px-4 py-2 bg-surface-muted hover:bg-border text-ink text-xs font-bold rounded-xl border border-border flex items-center gap-2 transition-all">
                      <Upload className="w-4 h-4 text-ink-muted" />
                      <span>Upload Avatar</span>
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            setAvatarUrl(URL.createObjectURL(e.target.files[0]));
                            toast.success("Avatar updated preview!");
                          }
                        }}
                      />
                    </label>

                    <button
                      onClick={() =>
                        setAvatarUrl("/assets/icons/profile-placeholder.svg")
                      }
                      className="px-3 py-2 text-xs font-bold text-red-400 hover:bg-surface-muted rounded-xl transition-all">
                      Remove
                    </button>
                  </div>
                  <span className="text-[11px] text-ink-muted">
                    Recommended: Square PNG, JPG or WebP (Max 2MB).
                  </span>
                </div>
              </div>

              {/* Display Name & Bio */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-ink-muted">Display Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-canvas border border-border rounded-xl text-xs text-ink outline-none focus:border-accent"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-ink-muted">Bio Description</label>
                  <textarea
                    rows={3}
                    maxLength={160}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell your visitors who you are and what you publish…"
                    className="w-full px-3.5 py-2.5 bg-canvas border border-border rounded-xl text-xs text-ink outline-none focus:border-accent"
                  />
                  <span className="text-[10px] text-ink-muted text-right">
                    {bio.length} / 160 characters
                  </span>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                  style={{ backgroundColor: accent.color }}
                  className="px-5 py-2.5 text-white text-xs font-bold rounded-xl shadow-sm transition-all disabled:opacity-50">
                  {isSaving ? "Saving…" : "Save Profile"}
                </button>
              </div>
            </div>
          )}

          {/* SECTION 2: THEMES */}
          {activeSection === "theme" && (
            <div className="flex flex-col gap-6">
              {/* Studio Theme & Accent System */}
              <div className="bg-surface border border-border rounded-2xl p-6 flex flex-col gap-5">
                <div>
                  <h3 className="text-base font-bold text-ink">Studio Theme Mode & Accent Colors</h3>
                  <p className="text-xs text-ink-muted mt-0.5">
                    Customize your publishing dashboard appearance and primary brand accent color.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Dark/Light Mode */}
                  <div className="flex flex-col gap-2 bg-surface-muted p-4 rounded-xl border border-border">
                    <span className="text-xs font-bold text-ink">Interface Theme</span>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <button
                        onClick={() => setTheme("dark")}
                        className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
                          theme === "dark"
                            ? "bg-accent text-white border-accent shadow-sm"
                            : "bg-surface text-ink-muted border-border hover:text-ink"
                        }`}>
                        <Moon className="w-4 h-4 text-indigo-400" />
                        <span>Dark Mode</span>
                      </button>
                      <button
                        onClick={() => setTheme("light")}
                        className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
                          theme === "light"
                            ? "bg-accent text-white border-accent shadow-sm"
                            : "bg-surface text-ink-muted border-border hover:text-ink"
                        }`}>
                        <Sun className="w-4 h-4 text-amber-400" />
                        <span>Light Mode</span>
                      </button>
                    </div>
                  </div>

                  {/* Accent Color Selection */}
                  <div className="flex flex-col gap-2 bg-surface-muted p-4 rounded-xl border border-border">
                    <span className="text-xs font-bold text-ink">Brand Accent Color</span>
                    <div className="grid grid-cols-3 gap-2 mt-1">
                      {accentPresets.map((preset) => (
                        <button
                          key={preset.id}
                          onClick={() => {
                            setAccent(preset);
                            toast.success(`Accent color set to ${preset.name}`);
                          }}
                          className={`px-2 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1.5 border transition-all ${
                            accent.id === preset.id
                              ? "border-accent bg-surface text-ink shadow-sm"
                              : "border-border bg-surface/50 text-ink-muted hover:text-ink"
                          }`}>
                          <span
                            className="w-3 h-3 rounded-full shrink-0"
                            style={{ backgroundColor: preset.color }}
                          />
                          <span className="truncate">{preset.name.split(" ")[0]}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio Page Editorial Themes */}
              <div className="bg-surface border border-border rounded-2xl p-6 flex flex-col gap-6">
                <div>
                  <h3 className="text-base font-bold text-ink">Bio Page Editorial Themes</h3>
                  <p className="text-xs text-ink-muted mt-0.5">
                    Select a theme preset for your public link page.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {PHASE1_THEMES.map((t) => {
                    const isSelected = selectedTheme === t.id;
                    const isProLocked = t.isPro && currentPlan !== "pro";

                    return (
                      <div
                        key={t.id}
                        onClick={() => {
                          if (isProLocked) {
                            toast.error("Harbor theme requires a Pro License");
                          } else {
                            setSelectedTheme(t.id);
                            toast.success(`Selected theme: ${t.name}`);
                          }
                        }}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col gap-3 relative ${
                          isSelected
                            ? "border-accent bg-accent-soft"
                            : "border-border bg-surface hover:border-accent/50"
                        }`}>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-ink">{t.name}</span>
                          {t.isPro && (
                            <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/30 flex items-center gap-1">
                              <Sparkles className="w-3 h-3" /> PRO
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-ink-muted">{t.description}</p>

                        {/* Mini Theme Swatch */}
                        <div
                          className="w-full h-16 rounded-xl p-3 flex flex-col justify-center gap-1.5 border"
                          style={{
                            backgroundColor: t.mainBg,
                            color: t.mainColor,
                            borderColor: t.accentColor,
                          }}>
                          <div
                            className="w-full h-5 rounded-md text-[10px] font-bold flex items-center justify-center shadow-xs"
                            style={{ backgroundColor: t.accentColor, color: "#fff" }}>
                            Link Button
                          </div>
                        </div>

                        {isSelected && (
                          <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-accent text-white flex items-center justify-center">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* SECTION 3: BUTTON STYLE */}
          {activeSection === "buttons" && (
            <div className="bg-surface border border-border rounded-2xl p-6 flex flex-col gap-6">
              <h3 className="text-base font-bold text-ink">Button Customizer</h3>

              {/* Shape Presets */}
              <div className="flex flex-col gap-3">
                <label className="text-xs font-bold text-ink-muted">Button Shape</label>
                <div className="grid grid-cols-3 gap-3">
                  {PRO_BUTTON_SHAPES.map((shape) => (
                    <button
                      key={shape.id}
                      onClick={() => setButtonShape(shape.id)}
                      style={buttonShape === shape.id ? { backgroundColor: accent.color } : undefined}
                      className={`p-3 border text-xs font-bold transition-all text-center rounded-xl ${
                        buttonShape === shape.id
                          ? "text-white border-transparent shadow-xs"
                          : "border-border bg-canvas text-ink-muted hover:text-ink"
                      }`}>
                      {shape.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Style Presets */}
              <div className="flex flex-col gap-3">
                <label className="text-xs font-bold text-ink-muted">Fill Style</label>
                <div className="grid grid-cols-3 gap-3">
                  {["filled", "outline", "minimal"].map((st) => (
                    <button
                      key={st}
                      onClick={() => setButtonStyle(st)}
                      style={buttonStyle === st ? { backgroundColor: accent.color } : undefined}
                      className={`p-3 border text-xs font-bold capitalize rounded-xl transition-all ${
                        buttonStyle === st
                          ? "text-white border-transparent shadow-xs"
                          : "border-border bg-canvas text-ink-muted hover:text-ink"
                      }`}>
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SECTION 4: SOCIAL LINKS */}
          {activeSection === "social" && (
            <div className="bg-surface border border-border rounded-2xl p-6 flex flex-col gap-6">
              <h3 className="text-base font-bold text-ink">Social Media Profiles</h3>

              {/* Add Platform Form */}
              <div className="flex flex-col sm:flex-row gap-3 bg-canvas p-4 border border-border rounded-xl">
                <select
                  value={newPlatform}
                  onChange={(e) => setNewPlatform(e.target.value)}
                  className="bg-surface border border-border text-xs text-ink rounded-xl px-3 py-2 outline-none">
                  {socialPlatforms.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>

                <input
                  type="url"
                  placeholder="https://x.com/username"
                  value={newSocialUrl}
                  onChange={(e) => setNewSocialUrl(e.target.value)}
                  className="flex-1 px-3 py-2 bg-surface border border-border rounded-xl text-xs text-ink outline-none focus:border-accent"
                />

                <button
                  onClick={handleAddSocial}
                  style={{ backgroundColor: accent.color }}
                  className="px-4 py-2 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shrink-0 shadow-xs">
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>

              {/* Added Platforms List */}
              <div className="flex flex-col gap-2">
                {socialLinks.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-canvas border border-border rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Share2 className="w-4 h-4" style={{ color: accent.color }} />
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-ink">{item.platform}</span>
                        <span className="text-[11px] font-mono text-ink-muted">{item.url}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveSocial(idx)}
                      className="p-1.5 text-red hover:bg-red/10 rounded-lg transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppearanceWorkspace;
