import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "@/context/AuthContext";
import {
  BarChart2,
  MousePointerClick,
  Eye,
  TrendingUp,
  Award,
  Sparkles,
  Check,
} from "lucide-react";

const AnalyticsWorkspace = () => {
  const { currentPlan } = useUserContext();
  const [timeRange, setTimeRange] = useState<"7" | "30" | "90">("30");

  const isPro = currentPlan === "pro";

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 py-6 md:py-8 flex flex-col gap-8">
      {/* Time Range Selector */}
      {isPro && (
        <div className="flex justify-end">
          <div className="flex items-center gap-1.5 bg-surface border border-border p-1 rounded-xl">
            {[7, 30, 90].map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r.toString() as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  timeRange === r.toString()
                    ? "bg-accent text-white"
                    : "text-ink-muted hover:text-ink"
                }`}>
                {r} Days
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Free User Context Upgrade Card (Per PRD 6.4) */}
      {!isPro ? (
        <div className="bg-surface border border-border rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="flex flex-col gap-4 max-w-xl">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <BarChart2 className="w-6 h-6" />
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-xl font-bold text-ink">See what resonates with your visitors</h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                Unlock 90-day click trends, referrer breakdown, per-link performance tables, and CTR metrics with Linkmonks Pro.
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <div className="flex items-center gap-2 text-xs text-ink">
                <Check className="w-4 h-4 text-[#6EBB91]" />
                <span>Real-time link click counter and conversion rate</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-ink">
                <Check className="w-4 h-4 text-[#6EBB91]" />
                <span>90-day historical traffic trends & device analytics</span>
              </div>
            </div>
          </div>

          <div className="w-full md:w-auto bg-canvas border border-border rounded-2xl p-6 flex flex-col items-center text-center gap-4 min-w-[260px]">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Pro License</span>
            <div className="text-3xl font-bold text-ink">
              $4 <span className="text-xs font-normal text-ink-muted">/ month</span>
            </div>
            <p className="text-[11px] text-ink-muted">or $19 billed annually</p>

            <Link
              to="/subscription"
              className="w-full py-2.5 bg-accent hover:bg-accent-hover text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-md">
              <Sparkles className="w-4 h-4" />
              <span>Upgrade to Pro</span>
            </Link>
          </div>
        </div>
      ) : (
        /* Pro KPI Grid & Chart */
        <div className="flex flex-col gap-8">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-surface border border-border rounded-2xl p-5 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-ink-muted">Total Views</span>
                <Eye className="w-4 h-4 text-accent" />
              </div>
              <span className="text-3xl font-bold text-ink">2,840</span>
              <span className="text-[11px] text-[#6EBB91] flex items-center gap-1 font-bold">
                <TrendingUp className="w-3 h-3" /> +12.4% vs last period
              </span>
            </div>

            <div className="bg-surface border border-border rounded-2xl p-5 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-ink-muted">Total Clicks</span>
                <MousePointerClick className="w-4 h-4 text-amber-400" />
              </div>
              <span className="text-3xl font-bold text-ink">1,420</span>
              <span className="text-[11px] text-[#6EBB91] flex items-center gap-1 font-bold">
                <TrendingUp className="w-3 h-3" /> +18.2% vs last period
              </span>
            </div>

            <div className="bg-surface border border-border rounded-2xl p-5 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-ink-muted">Click-Through Rate</span>
                <BarChart2 className="w-4 h-4 text-[#6EBB91]" />
              </div>
              <span className="text-3xl font-bold text-ink">50.0%</span>
              <span className="text-[11px] text-ink-muted">High engagement</span>
            </div>

            <div className="bg-surface border border-border rounded-2xl p-5 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-ink-muted">Top Destination</span>
                <Award className="w-4 h-4 text-amber-400" />
              </div>
              <span className="text-base font-bold text-ink truncate">YouTube Channel</span>
              <span className="text-[11px] text-ink-muted">582 clicks (41%)</span>
            </div>
          </div>

          {/* Performance Table */}
          <div className="bg-surface border border-border rounded-2xl p-6 flex flex-col gap-4">
            <h3 className="text-base font-bold text-ink">Link Performance Breakdown</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-border text-ink-muted font-semibold">
                    <th className="pb-3">Rank</th>
                    <th className="pb-3">Link Title</th>
                    <th className="pb-3">Destination</th>
                    <th className="pb-3 text-right">Clicks</th>
                    <th className="pb-3 text-right">Share</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 text-ink">
                  <tr>
                    <td className="py-3 font-bold text-accent">#1</td>
                    <td className="py-3 font-bold">YouTube Channel</td>
                    <td className="py-3 font-mono text-ink-muted">youtube.com/@channel</td>
                    <td className="py-3 text-right font-bold">582</td>
                    <td className="py-3 text-right text-[#6EBB91]">41.0%</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-bold text-accent">#2</td>
                    <td className="py-3 font-bold">GitHub Portfolio</td>
                    <td className="py-3 font-mono text-ink-muted">github.com/kachakaran6</td>
                    <td className="py-3 text-right font-bold">410</td>
                    <td className="py-3 text-right text-[#6EBB91]">28.8%</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-bold text-accent">#3</td>
                    <td className="py-3 font-bold">Twitter Profile</td>
                    <td className="py-3 font-mono text-ink-muted">x.com/karan</td>
                    <td className="py-3 text-right font-bold">280</td>
                    <td className="py-3 text-right text-[#6EBB91]">19.7%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsWorkspace;
