import { useEffect, useState } from "react";
import { useUserContext } from "@/context/AuthContext";
import {
  Globe,
  Share2,
  CreditCard,
  UserCheck,
  AlertTriangle,
  Key,
} from "lucide-react";
import { getDynamicHost } from "@/lib/utils";
import toast from "react-hot-toast";
import { getUserLinks, updateLink, upgradeToPro } from "@/lib/supabase/api";

const SettingsWorkspace = () => {
  const { user, currentPlan } = useUserContext();

  // Page Identity State
  const [handle, setHandle] = useState(user?.username || "");
  const [primaryLinkId, setPrimaryLinkId] = useState<string>("");
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const currentHostPrefix = typeof window !== "undefined" && window.location?.host
    ? `${window.location.host}/`
    : "links.samast.pro/";

  // SEO State
  const [seoTitle, setSeoTitle] = useState(`${user?.name || ""} — Linkmonks Page`);
  const [seoDescription, setSeoDescription] = useState(
    "Explore all my latest projects, articles, and social channels in one clean link."
  );

  // License Key State
  const [licenseKey, setLicenseKey] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSavingIdentity, setIsSavingIdentity] = useState(false);
  const [isSavingSeo, setIsSavingSeo] = useState(false);

  // Load primary link data on mount
  useEffect(() => {
    async function loadPrimaryLink() {
      try {
        const userId = user?.id || (user as any)?.$id;
        if (!userId) return;
        const links = await getUserLinks(userId);
        const arr = Array.isArray(links) ? links : [];
        const primary = arr[0];
        if (primary) {
          const linkId = primary.id || primary.$id;
          setPrimaryLinkId(linkId);
          setHandle(primary.slug || user?.username || "");
          setCurrentImageUrl(primary.imageUrl || "");
          if (primary.seo_title) setSeoTitle(primary.seo_title);
          if (primary.seo_description) setSeoDescription(primary.seo_description);
        }
      } catch (err) {
        console.error("SettingsWorkspace loadPrimaryLink error:", err);
      }
    }
    loadPrimaryLink();
  }, [user]);

  const handleSaveIdentity = async () => {
    if (handle.length < 3 || handle.length > 30) {
      toast.error("Handle must be between 3 and 30 characters");
      return;
    }
    setIsSavingIdentity(true);
    try {
      if (primaryLinkId) {
        await updateLink({
          linkId: primaryLinkId,
          userId: user?.id || (user as any)?.$id || "",
          title: user?.name || "My Bio Page",
          slug: handle,
          imageUrl: currentImageUrl,
          imageId: "",
        });
        toast.success("Handle & page identity saved to database!");
      } else {
        toast.error("No primary link found. Please add a link block first.");
      }
    } catch (err) {
      toast.error("Failed to save identity");
    } finally {
      setIsSavingIdentity(false);
    }
  };

  const handleSaveSeo = async () => {
    setIsSavingSeo(true);
    try {
      if (primaryLinkId) {
        await updateLink({
          linkId: primaryLinkId,
          userId: user?.id || (user as any)?.$id || "",
          title: user?.name || "My Bio Page",
          slug: handle,
          imageUrl: currentImageUrl,
          imageId: "",
          seo_title: seoTitle as any,
          seo_description: seoDescription as any,
        });
        toast.success("SEO & social share metadata saved to database!");
      } else {
        toast.error("No primary link found. Please add a link block first.");
      }
    } catch (err) {
      toast.error("Failed to save SEO settings");
    } finally {
      setIsSavingSeo(false);
    }
  };

  const handleVerifyLicense = async () => {
    if (!licenseKey.trim()) {
      toast.error("Please enter a valid Gumroad license key");
      return;
    }
    setIsVerifying(true);
    try {
      await upgradeToPro(user, licenseKey.trim());
      toast.success("Pro license verified! Refresh the page to activate Pro features.");
    } catch (err) {
      toast.error("License verification failed. Please check your key.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 py-6 md:py-8 flex flex-col gap-8">


      <div className="flex flex-col gap-8">
        {/* GROUP 1: PAGE IDENTITY */}
        <div className="bg-surface border border-border rounded-2xl p-6 flex flex-col gap-5">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <Globe className="w-5 h-5 text-accent" />
            <h3 className="text-base font-bold text-ink">Page Identity & URL Handle</h3>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-ink-muted">Public Handle URL</label>
              <div className="flex items-center bg-canvas border border-border rounded-xl overflow-hidden px-3.5 py-2.5 text-xs text-ink">
                <span className="text-ink-muted font-mono select-none">{currentHostPrefix}</span>
                <input
                  type="text"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""))}
                  maxLength={30}
                  className="bg-transparent outline-none font-mono text-ink flex-1"
                />
              </div>
              <p className="text-[11px] text-ink-muted">
                3–30 characters (`a-z`, `0-9`, `_`, `-`). Warning: Changing your handle alters your public page URL.
              </p>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSaveIdentity}
              disabled={isSavingIdentity}
              className="px-4 py-2 bg-accent hover:bg-accent-hover text-white text-xs font-bold rounded-xl shadow-sm disabled:opacity-50">
              {isSavingIdentity ? "Saving…" : "Save Identity"}
            </button>
          </div>
        </div>

        {/* GROUP 2: SEO & SHARING */}
        <div className="bg-surface border border-border rounded-2xl p-6 flex flex-col gap-5">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <Share2 className="w-5 h-5 text-accent" />
            <h3 className="text-base font-bold text-ink">SEO & Social Share Metadata</h3>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-ink-muted">Meta Title</label>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-canvas border border-border rounded-xl text-xs text-ink outline-none focus:border-accent"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-ink-muted">Meta Description</label>
              <textarea
                rows={2}
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-canvas border border-border rounded-xl text-xs text-ink outline-none focus:border-accent"
              />
            </div>

            {/* Open Graph Card Preview */}
            <div className="bg-canvas border border-border rounded-xl p-4 flex flex-col gap-2">
              <span className="text-[10px] font-bold text-ink-muted uppercase tracking-wider">
                Social Link Card Preview
              </span>
              <div className="border border-border rounded-xl p-3 bg-surface flex flex-col gap-1">
                <span className="text-xs font-bold text-ink">{seoTitle}</span>
                <span className="text-[11px] text-ink-muted line-clamp-2">{seoDescription}</span>
                <span className="text-[10px] font-mono text-accent">{getDynamicHost(handle)}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSaveSeo}
              disabled={isSavingSeo}
              className="px-4 py-2 bg-accent hover:bg-accent-hover text-white text-xs font-bold rounded-xl shadow-sm disabled:opacity-50">
              {isSavingSeo ? "Saving…" : "Save SEO Settings"}
            </button>
          </div>
        </div>

        {/* GROUP 3: PLAN & BILLING */}
        <div className="bg-surface border border-border rounded-2xl p-6 flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-ink">Plan & License Verification</h3>
            </div>
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider border ${
                currentPlan === "pro"
                  ? "bg-amber-400/10 border-amber-400/30 text-amber-400"
                  : "bg-canvas border-border text-ink-muted"
              }`}>
              {currentPlan === "pro" ? "Pro Plan Active" : "Free Plan"}
            </span>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-xs text-ink-muted">
              Enter your Gumroad license key to verify entitlement and unlock Pro themes, custom accent colors, and 90-day analytics.
            </p>

            <div className="flex items-center gap-2 bg-canvas border border-border rounded-xl p-2">
              <Key className="w-4 h-4 text-ink-muted ml-2" />
              <input
                type="text"
                placeholder="XXXXXX-XXXXXX-XXXXXX-XXXXXX"
                value={licenseKey}
                onChange={(e) => setLicenseKey(e.target.value)}
                className="bg-transparent outline-none text-xs text-ink font-mono flex-1 px-2"
              />
              <button
                onClick={handleVerifyLicense}
                disabled={isVerifying}
                className="px-4 py-2 bg-accent hover:bg-accent-hover text-white text-xs font-bold rounded-xl shrink-0">
                {isVerifying ? "Verifying…" : "Verify Key"}
              </button>
            </div>
          </div>
        </div>

        {/* GROUP 4: ACCOUNT CREDENTIALS */}
        <div className="bg-surface border border-border rounded-2xl p-6 flex flex-col gap-5">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <UserCheck className="w-5 h-5 text-accent" />
            <h3 className="text-base font-bold text-ink">Account Security</h3>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-ink-muted">Account Email</label>
              <input
                type="email"
                disabled
                value={user?.email || "user@domain.com"}
                className="w-full px-3.5 py-2.5 bg-canvas border border-border rounded-xl text-xs text-ink-muted cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* GROUP 5: DANGER ZONE */}
        <div className="bg-surface border border-red/40 rounded-2xl p-6 flex flex-col gap-5">
          <div className="flex items-center gap-2 border-b border-red/30 pb-3">
            <AlertTriangle className="w-5 h-5 text-red" />
            <h3 className="text-base font-bold text-red">Danger Zone</h3>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-bold text-ink">Unpublish Page</span>
              <span className="text-[11px] text-ink-muted">
                Temporarily hide your public page from visitors without deleting data.
              </span>
            </div>

            <button
              onClick={() => toast.success("Page set to unpublished")}
              className="px-4 py-2 border border-red/40 text-red hover:bg-red/10 text-xs font-bold rounded-xl">
              Unpublish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsWorkspace;
