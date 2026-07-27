import { Link } from "react-router-dom";
import { Button } from "../ui";
import { Lock, Check } from "lucide-react";

interface UpgradeToProProps {
  reason?: string;
}

const UpgradeToPro = ({ reason }: UpgradeToProProps) => {
  return (
    <div className="min-h-[70vh] w-full flex-center flex-col p-4">
      <div className="w-full max-w-md bg-dark-3 border border-gray-800 rounded-2xl p-8 shadow-2xl flex flex-col items-center text-center">
        <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex-center mb-4">
          <Lock className="w-6 h-6 text-amber-400" />
        </div>

        <h3 className="text-xl font-bold text-white mb-1">
          {reason ? reason : "Pro Feature Locked"}
        </h3>
        <p className="text-sm text-gray-400 mb-6">
          Upgrade to Linkmonks Pro to unlock unlimited links, editorial themes, custom accent colors, and 90-day trend analytics.
        </p>

        {/* Pricing Option Pill */}
        <div className="w-full bg-dark-4 border border-gray-800 rounded-xl p-4 mb-6 flex items-center justify-between">
          <div className="text-left">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block">Pro License</span>
            <span className="text-2xl font-bold text-white">$4 <span className="text-xs font-normal text-gray-400">/ month</span></span>
          </div>
          <span className="text-xs text-gray-400 bg-dark-3 px-3 py-1.5 rounded-lg border border-gray-700">or $19/year</span>
        </div>

        {/* Bullet List */}
        <div className="w-full space-y-2 text-xs text-gray-300 text-left mb-6">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Unlimited active link blocks</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Harbor theme & custom accent color palette</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Remove "Made with Linkmonks" branding</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>90-day click trends & per-link breakdown</span>
          </div>
        </div>

        <Link to="/subscription" className="w-full">
          <Button className="w-full h-11 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl text-sm transition-all shadow-md">
            Upgrade to Pro
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default UpgradeToPro;
