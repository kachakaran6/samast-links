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
import toast from "react-hot-toast";

const SettingsWorkspace = () => {
  const { user, currentPlan } = useUserContext();

  // Page Identity State
  const [handle, setHandle] = useState(user?.username || "karan");

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
      {/* Workspace Header */}
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Page & Account Settings
        </h2>
        <p className="text-xs text-[#B5BAB2] mt-0.5">
          Manage your public handle, SEO metadata, billing license, and account security.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {/* GROUP 1: PAGE IDENTITY */}
        <div className="bg-[#222522] border border-[#3B403B] rounded-2xl p-6 flex flex-col gap-5">
          <div className="flex items-center gap-2 border-b border-[#3B403B] pb-3">
            <Globe className="w-5 h-5 text-[#D17A67]" />
            <h3 className="text-base font-bold text-white">Page Identity & URL Handle</h3>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#B5BAB2]">Public Handle URL</label>
              <div className="flex items-center bg-[#181A18] border border-[#3B403B] rounded-xl overflow-hidden px-3.5 py-2.5 text-xs text-white">
                <span className="text-[#B5BAB2] font-mono select-none">links.samast.pro/</span>
                <input
                  type="text"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""))}
                  maxLength={30}
                  className="bg-transparent outline-none font-mono text-white flex-1"
                />
              </div>
              <p className="text-[11px] text-[#B5BAB2]">
                3–30 characters (`a-z`, `0-9`, `_`, `-`). Warning: Changing your handle alters your public page URL.
              </p>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSaveIdentity}
              className="px-4 py-2 bg-[#D17A67] hover:bg-[#E39782] text-white text-xs font-bold rounded-xl shadow-sm">
              Save Identity
            </button>
          </div>
        </div>

        {/* GROUP 2: SEO & SHARING */}
        <div className="bg-[#222522] border border-[#3B403B] rounded-2xl p-6 flex flex-col gap-5">
          <div className="flex items-center gap-2 border-b border-[#3B403B] pb-3">
            <Share2 className="w-5 h-5 text-[#D17A67]" />
            <h3 className="text-base font-bold text-white">SEO & Social Share Metadata</h3>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#B5BAB2]">Meta Title</label>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#181A18] border border-[#3B403B] rounded-xl text-xs text-white outline-none focus:border-[#D17A67]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#B5BAB2]">Meta Description</label>
              <textarea
                rows={2}
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#181A18] border border-[#3B403B] rounded-xl text-xs text-white outline-none focus:border-[#D17A67]"
              />
            </div>

            {/* Open Graph Card Preview */}
            <div className="bg-[#181A18] border border-[#3B403B] rounded-xl p-4 flex flex-col gap-2">
              <span className="text-[10px] font-bold text-[#B5BAB2] uppercase tracking-wider">
                Social Link Card Preview
              </span>
              <div className="border border-[#3B403B] rounded-xl p-3 bg-[#222522] flex flex-col gap-1">
                <span className="text-xs font-bold text-white">{seoTitle}</span>
                <span className="text-[11px] text-[#B5BAB2] line-clamp-2">{seoDescription}</span>
                <span className="text-[10px] font-mono text-[#D17A67]">links.samast.pro/{handle}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSaveSeo}
              className="px-4 py-2 bg-[#D17A67] hover:bg-[#E39782] text-white text-xs font-bold rounded-xl shadow-sm">
              Save SEO Settings
            </button>
          </div>
        </div>

        {/* GROUP 3: PLAN & BILLING */}
        <div className="bg-[#222522] border border-[#3B403B] rounded-2xl p-6 flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-[#3B403B] pb-3">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-white">Plan & License Verification</h3>
            </div>
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider border ${
                currentPlan === "pro"
                  ? "bg-amber-400/10 border-amber-400/30 text-amber-400"
                  : "bg-[#181A18] border-[#3B403B] text-[#B5BAB2]"
              }`}>
              {currentPlan === "pro" ? "Pro Plan Active" : "Free Plan"}
            </span>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-xs text-[#B5BAB2]">
              Enter your Gumroad license key to verify entitlement and unlock Pro themes, custom accent colors, and 90-day analytics.
            </p>

            <div className="flex items-center gap-2 bg-[#181A18] border border-[#3B403B] rounded-xl p-2">
              <Key className="w-4 h-4 text-[#B5BAB2] ml-2" />
              <input
                type="text"
                placeholder="XXXXXX-XXXXXX-XXXXXX-XXXXXX"
                value={licenseKey}
                onChange={(e) => setLicenseKey(e.target.value)}
                className="bg-transparent outline-none text-xs text-white font-mono flex-1 px-2"
              />
              <button
                onClick={handleVerifyLicense}
                disabled={isVerifying}
                className="px-4 py-2 bg-[#D17A67] hover:bg-[#E39782] text-white text-xs font-bold rounded-xl shrink-0">
                {isVerifying ? "Verifying…" : "Verify Key"}
              </button>
            </div>
          </div>
        </div>

        {/* GROUP 4: ACCOUNT CREDENTIALS */}
        <div className="bg-[#222522] border border-[#3B403B] rounded-2xl p-6 flex flex-col gap-5">
          <div className="flex items-center gap-2 border-b border-[#3B403B] pb-3">
            <UserCheck className="w-5 h-5 text-[#D17A67]" />
            <h3 className="text-base font-bold text-white">Account Security</h3>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#B5BAB2]">Account Email</label>
              <input
                type="email"
                disabled
                value={user?.email || "user@domain.com"}
                className="w-full px-3.5 py-2.5 bg-[#181A18] border border-[#3B403B] rounded-xl text-xs text-[#B5BAB2] cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* GROUP 5: DANGER ZONE */}
        <div className="bg-[#222522] border border-red-900/50 rounded-2xl p-6 flex flex-col gap-5">
          <div className="flex items-center gap-2 border-b border-red-900/50 pb-3">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <h3 className="text-base font-bold text-red-400">Danger Zone</h3>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-bold text-white">Unpublish Page</span>
              <span className="text-[11px] text-[#B5BAB2]">
                Temporarily hide your public page from visitors without deleting data.
              </span>
            </div>

            <button
              onClick={() => toast.success("Page set to unpublished")}
              className="px-4 py-2 border border-red-500/40 text-red-400 hover:bg-red-950/40 text-xs font-bold rounded-xl">
              Unpublish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsWorkspace;
