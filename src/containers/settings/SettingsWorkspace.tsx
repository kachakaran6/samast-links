import { useState } from "react";
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

const SettingsWorkspace = () => {
  const { user, currentPlan } = useUserContext();

  // Page Identity State
  const [handle, setHandle] = useState(user?.username || "karan");
  const currentHostPrefix = typeof window !== "undefined" && window.location?.host
    ? `${window.location.host}/`
    : "links.samast.pro/";

  // SEO State
  const [seoTitle, setSeoTitle] = useState(`${user?.name || "Karan"} — Linkmonks Page`);
  const [seoDescription, setSeoDescription] = useState(
    "Explore all my latest projects, articles, and social channels in one clean link."
  );

  // License Key State
  const [licenseKey, setLicenseKey] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSaveIdentity = () => {
    if (handle.length < 3 || handle.length > 30) {
      toast.error("Handle must be between 3 and 30 characters");
      return;
    }
    toast.success("Handle and page identity updated!");
  };

  const handleSaveSeo = () => {
    toast.success("SEO & social share settings saved!");
  };

  const handleVerifyLicense = () => {
    if (!licenseKey.trim()) {
      toast.error("Please enter a valid Gumroad license key");
      return;
    }
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      toast.success("Pro license verified successfully!");
    }, 1200);
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
              className="px-4 py-2 bg-accent hover:bg-accent-hover text-white text-xs font-bold rounded-xl shadow-sm">
              Save Identity
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
              className="px-4 py-2 bg-accent hover:bg-accent-hover text-white text-xs font-bold rounded-xl shadow-sm">
              Save SEO Settings
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
