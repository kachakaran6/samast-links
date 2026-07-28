import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "@/context/AuthContext";
import { useGetLinks } from "@/lib/react-query/queries";
import {
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
  Plus,
  ArrowRight,
  BarChart2,
  Globe,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";
import { getDynamicHost, getDynamicPublicUrl } from "@/lib/utils";

const Overview = () => {
  const { user, currentPlan } = useUserContext();
  const { data: linksData, isLoading } = useGetLinks(user?.id || "");
  const [copied, setCopied] = useState(false);

  const links = linksData?.documents || [];
  const primaryLink = links[0];
  const publicHandle = user?.username || "handle";
  const publicUrl = getDynamicPublicUrl(publicHandle);
  const displayHost = getDynamicHost(publicHandle);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    toast.success("Public page link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  // Checklist items
  const hasAvatar = Boolean(user?.imageUrl);
  const hasLinks = links.length > 0;
  const isPublished = Boolean(primaryLink?.is_published ?? true);

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 py-6 md:py-8 flex flex-col gap-8">
      {/* Header Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Welcome back, {user?.name || "Creator"}
          </h2>
          <p className="text-sm text-[#B5BAB2]">
            Here's an overview of your Linkmonks publishing status and page health.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 bg-[#222522] border border-[#3B403B] px-3.5 py-2 rounded-xl">
          <span className="w-2.5 h-2.5 rounded-full bg-[#6EBB91] animate-pulse" />
          <span className="text-xs font-bold text-[#6EBB91]">Page Live & Ready</span>
        </div>
      </div>

      {/* Public Page Card */}
      <div className="bg-[#222522] border border-[#3B403B] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-5">
          <img
            src={user?.imageUrl || "/assets/icons/profile-placeholder.svg"}
            alt="avatar"
            className="w-16 h-16 rounded-full object-cover border-2 border-[#3B403B]"
          />
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-white">{user?.name || "My Page"}</span>
              <span className="text-xs font-mono text-[#D17A67] bg-[#4A2A24] px-2 py-0.5 rounded-md border border-[#D17A67]/30">
                @{publicHandle}
              </span>
            </div>
            <p className="text-xs font-mono text-[#B5BAB2]">{displayHost}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={handleCopyLink}
            className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 bg-[#2C302C] hover:bg-[#3B403B] border border-[#3B403B] text-white text-xs font-bold rounded-xl transition-all">
            {copied ? (
              <Check className="w-4 h-4 text-[#6EBB91]" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            <span>{copied ? "Copied!" : "Copy URL"}</span>
          </button>

          <a
            href={publicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 bg-[#D17A67] hover:bg-[#E39782] text-white text-xs font-bold rounded-xl transition-all shadow-md">
            <span>Visit Page</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Setup Checklist (Only shown if incomplete) */}
      {(!hasAvatar || !hasLinks) && (
        <div className="bg-[#222522] border border-[#3B403B] rounded-2xl p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Setup Checklist</h3>
            <span className="text-xs font-bold text-[#D17A67]">
              {[hasAvatar, hasLinks, isPublished].filter(Boolean).length} / 3 Completed
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              className={`p-4 rounded-xl border flex items-center gap-3 ${
                hasAvatar
                  ? "bg-[#181A18] border-[#3B403B] text-[#B5BAB2]"
                  : "bg-[#2C302C] border-[#D17A67]/40 text-white"
              }`}>
              <CheckCircle2
                className={`w-5 h-5 ${hasAvatar ? "text-[#6EBB91]" : "text-[#B5BAB2]"}`}
              />
              <span className="text-xs font-bold">Upload profile avatar</span>
            </div>

            <div
              className={`p-4 rounded-xl border flex items-center gap-3 ${
                hasLinks
                  ? "bg-[#181A18] border-[#3B403B] text-[#B5BAB2]"
                  : "bg-[#2C302C] border-[#D17A67]/40 text-white"
              }`}>
              <CheckCircle2
                className={`w-5 h-5 ${hasLinks ? "text-[#6EBB91]" : "text-[#B5BAB2]"}`}
              />
              <span className="text-xs font-bold">Add your first link block</span>
            </div>

            <div
              className={`p-4 rounded-xl border flex items-center gap-3 ${
                isPublished
                  ? "bg-[#181A18] border-[#3B403B] text-[#B5BAB2]"
                  : "bg-[#2C302C] border-[#D17A67]/40 text-white"
              }`}>
              <CheckCircle2
                className={`w-5 h-5 ${isPublished ? "text-[#6EBB91]" : "text-[#B5BAB2]"}`}
              />
              <span className="text-xs font-bold">Publish your page</span>
            </div>
          </div>
        </div>
      )}

      {/* Two Column Region: Your Links & Analytics Teaser */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Your Links Mini List */}
        <div className="bg-[#222522] border border-[#3B403B] rounded-2xl p-6 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#D17A67]" />
              <h3 className="text-base font-bold text-white">Active Destinations</h3>
            </div>
            <Link
              to="/links"
              className="text-xs font-bold text-[#D17A67] hover:text-[#E39782] flex items-center gap-1">
              <span>Manage Links</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {isLoading ? (
            <p className="text-xs text-[#B5BAB2]">Loading your links…</p>
          ) : links.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 border border-dashed border-[#3B403B] rounded-xl text-center gap-3">
              <Globe className="w-8 h-8 text-[#B5BAB2]" />
              <p className="text-xs text-[#B5BAB2]">Your page starts with one good link.</p>
              <Link
                to="/links"
                className="px-4 py-2 bg-[#D17A67] hover:bg-[#E39782] text-white text-xs font-bold rounded-xl flex items-center gap-2">
                <Plus className="w-4 h-4" />
                <span>Add your first link</span>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-2.5">
              {links.slice(0, 4).map((link: any) => (
                <div
                  key={link.$id || link.id}
                  className="bg-[#181A18] border border-[#3B403B] rounded-xl p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-3 truncate">
                    <div className="w-2 h-2 rounded-full bg-[#6EBB91]" />
                    <span className="text-xs font-bold text-white truncate">
                      {link.title || link.slug}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#B5BAB2] truncate max-w-[140px]">
                    {link.url || `/${link.slug}`}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Analytics Teaser / Pro Summary */}
        <div className="bg-[#222522] border border-[#3B403B] rounded-2xl p-6 flex flex-col justify-between gap-5">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Performance Overview</h3>
              </div>
              <Link
                to="/analytics"
                className="text-xs font-bold text-amber-400 hover:underline">
                View Full Analytics
              </Link>
            </div>

            <p className="text-xs text-[#B5BAB2]">
              Track visitor engagement, link clicks, and top referrer trends over time.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-[#181A18] border border-[#3B403B] rounded-xl p-4 flex flex-col gap-1">
                <span className="text-xs font-semibold text-[#B5BAB2]">Total Views</span>
                <span className="text-2xl font-bold text-white">
                  {currentPlan === "pro" ? "1,420" : "—"}
                </span>
              </div>

              <div className="bg-[#181A18] border border-[#3B403B] rounded-xl p-4 flex flex-col gap-1">
                <span className="text-xs font-semibold text-[#B5BAB2]">Link Clicks</span>
                <span className="text-2xl font-bold text-white">
                  {currentPlan === "pro" ? "684" : "—"}
                </span>
              </div>
            </div>
          </div>

          {currentPlan !== "pro" && (
            <div className="bg-[#4A2A24]/40 border border-[#D17A67]/30 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span className="text-xs font-bold text-white">
                  Unlock 90-day click trends with Pro
                </span>
              </div>
              <Link
                to="/subscription"
                className="px-3 py-1.5 bg-[#D17A67] text-white text-xs font-bold rounded-lg hover:bg-[#E39782] transition-colors">
                Upgrade
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Overview;
