import { Link, NavLink, useLocation } from "react-router-dom";
import { useUserContext } from "@/context/AuthContext";
import {
  LayoutDashboard,
  Link2,
  Palette,
  BarChart2,
  Settings,
  Sparkles,
  LogOut,
} from "lucide-react";

interface AppSidebarProps {
  setOpenLogoutModal: (open: boolean) => void;
  openLogoutModal: boolean;
}

export const appNavItems = [
  { label: "Overview", route: "/overview", icon: LayoutDashboard },
  { label: "Links", route: "/links", icon: Link2 },
  { label: "Appearance", route: "/appearance", icon: Palette },
  { label: "Analytics", route: "/analytics", icon: BarChart2 },
  { label: "Settings", route: "/settings", icon: Settings },
];

const AppSidebar = ({ setOpenLogoutModal, openLogoutModal }: AppSidebarProps) => {
  const { pathname } = useLocation();
  const { user, currentPlan } = useUserContext();

  return (
    <aside className="hidden md:flex fixed top-0 bottom-0 left-0 w-[240px] bg-[#181A18] border-r border-[#3B403B] flex-col justify-between p-4 z-40">
      {/* Brand Header */}
      <div className="flex flex-col gap-6">
        <Link to="/overview" className="flex items-center gap-3 px-2 py-1">
          <div className="w-8 h-8 rounded-xl bg-[#D17A67] flex items-center justify-center text-white font-bold text-lg shadow-sm">
            L
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-white text-base tracking-tight leading-none">
              Linkmonks
            </span>
            <span className="text-[11px] text-[#B5BAB2] font-medium mt-0.5">
              Publishing Studio
            </span>
          </div>
        </Link>

        {/* Primary Navigation */}
        <nav className="flex flex-col gap-1">
          {appNavItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.route ||
              (item.route !== "/overview" && pathname.startsWith(item.route)) ||
              (item.route === "/links" && pathname.startsWith("/link"));

            return (
              <NavLink
                key={item.label}
                to={item.route}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-[#2C302C] text-[#F4F0E8] shadow-sm border border-[#3B403B]"
                    : "text-[#B5BAB2] hover:text-[#F4F0E8] hover:bg-[#222522]"
                }`}>
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? "text-[#D17A67]" : "text-[#B5BAB2]"
                  }`}
                />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer */}
      <div className="flex flex-col gap-3">
        {/* Plan Entitlement Badge */}
        <div className="bg-[#222522] border border-[#3B403B] rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles
              className={`w-4 h-4 ${
                currentPlan === "pro" ? "text-amber-400" : "text-[#B5BAB2]"
              }`}
            />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                {currentPlan === "pro" ? "Pro Plan" : "Free Plan"}
              </span>
              <span className="text-[10px] text-[#B5BAB2]">
                {currentPlan === "pro" ? "All features unlocked" : "Basic bio page"}
              </span>
            </div>
          </div>

          {currentPlan !== "pro" && (
            <Link
              to="/subscription"
              className="text-xs bg-[#D17A67] hover:bg-[#E39782] text-white px-2.5 py-1 rounded-lg font-bold transition-all shadow-sm">
              Upgrade
            </Link>
          )}
        </div>

        {/* User Profile & Logout */}
        <div className="flex items-center justify-between pt-2 border-t border-[#3B403B] px-1">
          <Link
            to="/settings"
            className="flex items-center gap-2.5 overflow-hidden hover:opacity-80 transition-opacity">
            <img
              src={user?.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover border border-[#3B403B]"
            />
            <div className="flex flex-col truncate">
              <span className="text-xs font-bold text-white truncate">
                {user?.name || "Creator"}
              </span>
              <span className="text-[10px] text-[#B5BAB2] truncate">
                @{user?.username || "handle"}
              </span>
            </div>
          </Link>

          <button
            onClick={() => setOpenLogoutModal(!openLogoutModal)}
            title="Sign Out"
            className="p-2 text-[#B5BAB2] hover:text-red-400 hover:bg-[#222522] rounded-lg transition-all">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
