import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/shared";
import { showToast } from "@/lib/utils";
import { useUserContext } from "@/context/AuthContext";
import { useLinkContext } from "@/context/LinkContext";
import { updateLink } from "@/lib/supabase/api";
import {
  PHASE1_THEMES,
  PRO_ACCENT_PALETTE,
  PRO_BUTTON_SHAPES,
  IThemeConfig,
} from "@/constants/themeConfig";
import { Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CustomizeProps {
  selectedLink?: any;
  setBtnLoading?: (loading: boolean) => void;
}

const Customize = ({ selectedLink, setBtnLoading }: CustomizeProps) => {
  const { currentPlan } = useUserContext();
  const { links, updateLinkById } = useLinkContext();
  const navigate = useNavigate();

  const targetLink = selectedLink || (links && links[0]) || null;

  const [activeThemeId, setActiveThemeId] = useState<string>(
    targetLink?.theme_key || "paper-and-ink"
  );
  const [accentColor, setAccentColor] = useState<string>(
    targetLink?.custom_accent || ""
  );
  const [buttonShape, setButtonShape] = useState<string>(
    targetLink?.custom_button_shape || "10px"
  );
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (targetLink?.theme_key) {
      setActiveThemeId(targetLink.theme_key);
    }
    if (targetLink?.custom_accent) {
      setAccentColor(targetLink.custom_accent);
    }
    if (targetLink?.custom_button_shape) {
      setButtonShape(targetLink.custom_button_shape);
    }
  }, [targetLink]);

  const handleSaveTheme = async (themeId: string, customAccent?: string, customShape?: string) => {
    if (!targetLink) return;
    setIsSaving(true);
    if (setBtnLoading) setBtnLoading(true);

    try {
      const selectedTheme = PHASE1_THEMES.find((t) => t.id === themeId);
      if (selectedTheme?.isPro && currentPlan !== "pro") {
        showToast({
          msg: "Harbor theme is a Pro feature. Upgrade to unlock!",
          isError: true,
        });
        setIsSaving(false);
        if (setBtnLoading) setBtnLoading(false);
        return;
      }

      const updatedPayload = {
        ...targetLink,
        linkId: targetLink.$id || targetLink.id,
        theme_key: themeId,
        custom_accent: customAccent ?? accentColor,
        custom_button_shape: customShape ?? buttonShape,
      };

      const res = await updateLink(updatedPayload);
      if (res) {
        updateLinkById(targetLink.$id || targetLink.id, res);
        showToast({ msg: "Appearance updated successfully!" });
      } else {
        showToast({ msg: "Failed to update theme", isError: true });
      }
    } catch (err) {
      console.error("handleSaveTheme error:", err);
      showToast({ msg: "Error saving appearance", isError: true });
    } finally {
      setIsSaving(false);
      if (setBtnLoading) setBtnLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full p-4 md:p-6 text-gray-200">
      <div>
        <h2 className="text-xl md:text-2xl font-semibold mb-1">Page Themes</h2>
        <p className="text-sm text-gray-400">
          Choose a curated, high-contrast theme for your Linkmonks bio page.
        </p>
      </div>

      {/* Theme Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {PHASE1_THEMES.map((theme: IThemeConfig) => {
          const isSelected = activeThemeId === theme.id;
          const isLocked = theme.isPro && currentPlan !== "pro";

          return (
            <div
              key={theme.id}
              onClick={() => {
                if (isLocked) {
                  navigate("/subscription");
                  return;
                }
                setActiveThemeId(theme.id);
                handleSaveTheme(theme.id);
              }}
              className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all flex flex-col justify-between h-44 ${
                isSelected
                  ? "border-primary-500 ring-2 ring-primary-500/30"
                  : "border-gray-800 hover:border-gray-600"
              }`}
              style={{ backgroundColor: theme.mainBg, color: theme.mainColor }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-base">{theme.name}</span>
                  {theme.isPro && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Pro
                    </span>
                  )}
                </div>
                {isSelected && (
                  <span className="text-xs px-2.5 py-1 rounded-md font-medium bg-primary-500 text-white">
                    Active
                  </span>
                )}
              </div>

              {/* Sample link block preview inside card */}
              <div className="my-2 space-y-1.5">
                <div
                  className="w-full py-2 px-3 rounded text-center text-xs font-medium border"
                  style={{
                    backgroundColor: theme.linkBgColor,
                    color: theme.linkTitleColor,
                    borderColor: theme.borderColor,
                    borderRadius: theme.borderRadius,
                  }}>
                  Link Button Preview
                </div>
              </div>

              <div className="flex items-center justify-between text-xs mt-auto">
                <span style={{ color: theme.subTextColor }}>{theme.description}</span>
                <div
                  className="w-4 h-4 rounded-full border border-gray-400/40"
                  style={{ backgroundColor: theme.accentColor }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Pro Customization Options */}
      <div className="border-t border-gray-800 pt-6 mt-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-medium">Custom Accent & Styles</h3>
            <p className="text-xs text-gray-400">Fine-tune button shape and highlight accents (Pro feature).</p>
          </div>
          {currentPlan !== "pro" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/subscription")}
              className="text-xs border-amber-500/40 text-amber-400 hover:bg-amber-500/10">
              <Lock className="w-3 h-3 mr-1" /> Unlock Pro Customizer
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Accent Color Palette */}
          <div className="bg-dark-3/50 p-4 rounded-xl border border-gray-800">
            <label className="text-xs font-semibold text-gray-300 block mb-2">Accent Color</label>
            <div className="flex flex-wrap gap-3">
              {PRO_ACCENT_PALETTE.map((color) => (
                <button
                  key={color.value}
                  disabled={currentPlan !== "pro"}
                  onClick={() => {
                    setAccentColor(color.value);
                    handleSaveTheme(activeThemeId, color.value, buttonShape);
                  }}
                  title={color.name}
                  className={`w-8 h-8 rounded-full border-2 transition-transform ${
                    accentColor === color.value ? "scale-110 border-white ring-2 ring-white/40" : "border-transparent"
                  } ${currentPlan !== "pro" ? "opacity-40 cursor-not-allowed" : "hover:scale-105"}`}
                  style={{ backgroundColor: color.value }}
                />
              ))}
            </div>
          </div>

          {/* Button Shape Selector */}
          <div className="bg-dark-3/50 p-4 rounded-xl border border-gray-800">
            <label className="text-xs font-semibold text-gray-300 block mb-2">Button Shape</label>
            <div className="flex gap-3">
              {PRO_BUTTON_SHAPES.map((shape) => (
                <button
                  key={shape.radius}
                  disabled={currentPlan !== "pro"}
                  onClick={() => {
                    setButtonShape(shape.radius);
                    handleSaveTheme(activeThemeId, accentColor, shape.radius);
                  }}
                  className={`px-3 py-2 text-xs font-medium border transition-all ${
                    buttonShape === shape.radius
                      ? "border-primary-500 bg-primary-500/10 text-white"
                      : "border-gray-700 bg-dark-4 text-gray-400"
                  } ${currentPlan !== "pro" ? "opacity-40 cursor-not-allowed" : "hover:border-gray-500"}`}
                  style={{ borderRadius: shape.radius }}>
                  {shape.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isSaving && (
        <div className="flex items-center gap-2 text-xs text-primary-400">
          <Loader height={16} width={16} /> Saving theme preferences...
        </div>
      )}
    </div>
  );
};

export default Customize;
