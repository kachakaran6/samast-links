import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useUserContext } from "@/context/AuthContext";
import { ExternalLink, Copy, Check, CheckCircle2, Clock } from "lucide-react";
import toast from "react-hot-toast";

import { getDynamicHost, getDynamicPublicUrl } from "@/lib/utils";

interface AppHeaderProps {
  title?: string;
  hasUnpublishedChanges?: boolean;
  isSaving?: boolean;
  onPublish?: () => void;
}

const AppHeader = ({
  title,
  hasUnpublishedChanges = false,
  isSaving = false,
  onPublish,
}: AppHeaderProps) => {
  const { pathname } = useLocation();
  const { user } = useUserContext();
  const [copied, setCopied] = useState(false);

  // Derive current section title if not explicitly provided
  const getPageTitle = () => {
    if (title) return title;
    if (pathname.includes("/overview") || pathname === "/") return "Overview";
    if (pathname.includes("/links") || pathname.includes("/link")) return "Links Workspace";
    if (pathname.includes("/appearance")) return "Appearance";
    if (pathname.includes("/analytics")) return "Analytics";
    if (pathname.includes("/settings")) return "Settings";
    if (pathname.includes("/subscription")) return "Billing & Plan";
    return "Dashboard";
  };

  // Construct public URL dynamically
  const publicHandle = user?.username || "me";
  const displayHost = getDynamicHost(publicHandle);
  const actualPublicUrl = getDynamicPublicUrl(publicHandle);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(actualPublicUrl);
    setCopied(true);
    toast.success("Public link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="fixed top-0 right-0 left-0 md:left-[240px] h-[72px] bg-[#181A18]/90 border-b border-[#3B403B] backdrop-blur-md px-6 flex items-center justify-between z-30 transition-all">
      {/* Left: Section Title */}
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold text-white tracking-tight">
          {getPageTitle()}
        </h1>
      </div>

      {/* Right: Actions & Status */}
      <div className="flex items-center gap-3">
        {/* Save Status Indicator */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#222522] border border-[#3B403B] text-xs font-semibold">
          {isSaving ? (
            <>
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span className="text-amber-400">Saving…</span>
            </>
          ) : hasUnpublishedChanges ? (
            <>
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-amber-400">Unpublished changes</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-[#6EBB91]" />
              <span className="text-[#6EBB91]">Saved & Published</span>
            </>
          )}
        </div>

        {/* Public URL Pill */}
        <div className="hidden lg:flex items-center gap-1.5 bg-[#222522] border border-[#3B403B] rounded-lg px-3 py-1.5 text-xs text-[#B5BAB2] font-mono">
          <span className="truncate max-w-[180px]">{displayHost}</span>
          <button
            onClick={handleCopyLink}
            title="Copy Public Link"
            className="p-1 hover:text-white transition-colors">
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* View Page Action */}
        <a
          href={actualPublicUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-2 bg-[#222522] hover:bg-[#2C302C] border border-[#3B403B] text-[#F4F0E8] text-xs font-bold rounded-xl transition-all">
          <span>View page</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#B5BAB2]" />
        </a>

        {/* Primary Publish Button (When drafts differ) */}
        {hasUnpublishedChanges && onPublish && (
          <button
            onClick={onPublish}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#D17A67] hover:bg-[#E39782] text-white text-xs font-bold rounded-xl transition-all shadow-md">
            <span>Publish changes</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
