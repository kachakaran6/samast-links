import { useState } from "react";
import { useUserContext } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { PHASE1_THEMES, PRO_BUTTON_SHAPES } from "@/constants/themeConfig";
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
  { id: "email", name: "Email Address", placeholder: "mailto:you@domain.com" },
];

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

  // Theme & button state
  const [selectedTheme, setSelectedTheme] = useState("paper-and-ink");
  const [buttonShape, setButtonShape] = useState("rounded");
  const [buttonStyle, setButtonStyle] = useState("filled");

  // Social links state
  const [socialLinks, setSocialLinks] = useState<
    { platform: string; url: string }[]
  >([
    { platform: "Twitter / X", url: "https://x.com/karan" },
    { platform: "GitHub", url: "https://github.com/kachakaran6" },
  ]);
  const [newPlatform, setNewPlatform] = useState("Twitter / X");
  const [newSocialUrl, setNewSocialUrl] = useState("");

  const handleSaveProfile = () => {
    toast.success("Profile appearance updated!");
  };

  const handleAddSocial = () => {
    if (!newSocialUrl.trim()) return;
    setSocialLinks([
      ...socialLinks,
      { platform: newPlatform, url: newSocialUrl.trim() },
    ]);
    setNewSocialUrl("");
    toast.success("Social link added");
  };

  const handleRemoveSocial = (index: number) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index));
    toast.success("Social link removed");
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 py-6 md:py-8 flex flex-col gap-8">
      {/* Page Title */}
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Appearance & Branding
        </h2>
        <p className="text-xs text-[#B5BAB2] mt-0.5">
          Customize your public bio page layout, profile photo, themes, and social badges.
        </p>
      </div>

      {/* Main Layout: Left Navigation Rail & Right Section Body */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Section Navigation (md:col-span-3) */}
        <div className="md:col-span-3 flex flex-row md:flex-col gap-1 bg-[#222522] border border-[#3B403B] rounded-2xl p-2 overflow-x-auto">
          <button
            onClick={() => setActiveSection("profile")}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left w-full ${
              activeSection === "profile"
                ? "bg-[#D17A67] text-white shadow-sm"
                : "text-[#B5BAB2] hover:text-white hover:bg-[#2C302C]"
            }`}>
            <User className="w-4 h-4" />
            <span>Profile</span>
          </button>

          <button
            onClick={() => setActiveSection("theme")}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left w-full ${
              activeSection === "theme"
                ? "bg-[#D17A67] text-white shadow-sm"
                : "text-[#B5BAB2] hover:text-white hover:bg-[#2C302C]"
            }`}>
            <Palette className="w-4 h-4" />
            <span>Themes</span>
          </button>

          <button
            onClick={() => setActiveSection("buttons")}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left w-full ${
              activeSection === "buttons"
                ? "bg-[#D17A67] text-white shadow-sm"
                : "text-[#B5BAB2] hover:text-white hover:bg-[#2C302C]"
            }`}>
            <Square className="w-4 h-4" />
            <span>Button Style</span>
          </button>

          <button
            onClick={() => setActiveSection("social")}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left w-full ${
              activeSection === "social"
                ? "bg-[#D17A67] text-white shadow-sm"
                : "text-[#B5BAB2] hover:text-white hover:bg-[#2C302C]"
            }`}>
            <Share2 className="w-4 h-4" />
            <span>Social Links</span>
          </button>
        </div>

        {/* Right Section Content (md:col-span-9) */}
        <div className="md:col-span-9 flex flex-col gap-6">
          {/* SECTION 1: PROFILE */}
          {activeSection === "profile" && (
            <div className="bg-[#222522] border border-[#3B403B] rounded-2xl p-6 flex flex-col gap-6">
              <h3 className="text-base font-bold text-white">Profile Details</h3>

              {/* Avatar Uploader (96px) */}
              <div className="flex items-center gap-6">
                <img
                  src={avatarUrl}
                  alt="avatar"
                  className="w-24 h-24 rounded-full object-cover border-2 border-[#3B403B]"
                />
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <label className="cursor-pointer px-4 py-2 bg-[#2C302C] hover:bg-[#3B403B] text-white text-xs font-bold rounded-xl border border-[#3B403B] flex items-center gap-2">
                      <Upload className="w-4 h-4" />
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
                      className="px-3 py-2 text-xs font-bold text-red-400 hover:bg-[#2C302C] rounded-xl">
                      Remove
                    </button>
                  </div>
                  <span className="text-[11px] text-[#B5BAB2]">
                    Recommended: Square PNG, JPG or WebP (Max 2MB).
                  </span>
                </div>
              </div>

              {/* Display Name & Bio */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#B5BAB2]">Display Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#181A18] border border-[#3B403B] rounded-xl text-xs text-white outline-none focus:border-[#D17A67]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#B5BAB2]">Bio Description</label>
                  <textarea
                    rows={3}
                    maxLength={160}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell your visitors who you are and what you publish…"
                    className="w-full px-3.5 py-2.5 bg-[#181A18] border border-[#3B403B] rounded-xl text-xs text-white outline-none focus:border-[#D17A67]"
                  />
                  <span className="text-[10px] text-[#B5BAB2] text-right">
                    {bio.length} / 160 characters
                  </span>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSaveProfile}
                  className="px-5 py-2.5 bg-[#D17A67] hover:bg-[#E39782] text-white text-xs font-bold rounded-xl shadow-sm">
                  Save Profile
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
            <div className="bg-[#222522] border border-[#3B403B] rounded-2xl p-6 flex flex-col gap-6">
              <h3 className="text-base font-bold text-white">Button Customizer</h3>

              {/* Shape Presets */}
              <div className="flex flex-col gap-3">
                <label className="text-xs font-bold text-[#B5BAB2]">Button Shape</label>
                <div className="grid grid-cols-3 gap-3">
                  {PRO_BUTTON_SHAPES.map((shape) => (
                    <button
                      key={shape.id}
                      onClick={() => setButtonShape(shape.id)}
                      className={`p-3 border text-xs font-bold transition-all text-center rounded-xl ${
                        buttonShape === shape.id
                          ? "border-[#D17A67] bg-[#4A2A24] text-white"
                          : "border-[#3B403B] bg-[#181A18] text-[#B5BAB2]"
                      }`}>
                      {shape.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Style Presets */}
              <div className="flex flex-col gap-3">
                <label className="text-xs font-bold text-[#B5BAB2]">Fill Style</label>
                <div className="grid grid-cols-3 gap-3">
                  {["filled", "outline", "minimal"].map((st) => (
                    <button
                      key={st}
                      onClick={() => setButtonStyle(st)}
                      className={`p-3 border text-xs font-bold capitalize rounded-xl transition-all ${
                        buttonStyle === st
                          ? "border-[#D17A67] bg-[#4A2A24] text-white"
                          : "border-[#3B403B] bg-[#181A18] text-[#B5BAB2]"
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
            <div className="bg-[#222522] border border-[#3B403B] rounded-2xl p-6 flex flex-col gap-6">
              <h3 className="text-base font-bold text-white">Social Media Profiles</h3>

              {/* Add Platform Form */}
              <div className="flex flex-col sm:flex-row gap-3 bg-[#181A18] p-4 border border-[#3B403B] rounded-xl">
                <select
                  value={newPlatform}
                  onChange={(e) => setNewPlatform(e.target.value)}
                  className="bg-[#222522] border border-[#3B403B] text-xs text-white rounded-xl px-3 py-2 outline-none">
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
                  className="flex-1 px-3 py-2 bg-[#222522] border border-[#3B403B] rounded-xl text-xs text-white outline-none"
                />

                <button
                  onClick={handleAddSocial}
                  className="px-4 py-2 bg-[#D17A67] hover:bg-[#E39782] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shrink-0">
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>

              {/* Added Platforms List */}
              <div className="flex flex-col gap-2">
                {socialLinks.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-[#181A18] border border-[#3B403B] rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Share2 className="w-4 h-4 text-[#D17A67]" />
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-white">{item.platform}</span>
                        <span className="text-[11px] font-mono text-[#B5BAB2]">{item.url}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveSocial(idx)}
                      className="p-1.5 text-red-400 hover:bg-[#2C302C] rounded-lg">
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
