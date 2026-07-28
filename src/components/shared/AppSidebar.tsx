import { Link, NavLink, useLocation } from "react-router-dom";
import { useUserContext } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import {
  LayoutDashboard,
  Link2,
  Palette,
  BarChart2,
  Settings,
  Sparkles,
  LogOut,
  Sun,
  Moon,
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
  const { theme, setTheme, accent, setAccent, accentPresets } = useTheme();

  return (
    <aside className="hidden md:flex fixed top-0 bottom-0 left-0 w-[240px] bg-canvas border-r border-border flex-col justify-between p-4 z-40 transition-colors duration-200">
      {/* Brand Header */}
      <div className="flex flex-col gap-6">
        <Link to="/overview" className="flex items-center gap-3 px-2 py-1">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm transition-colors"
            style={{ backgroundColor: accent.color }}>
            L
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-ink text-base tracking-tight leading-none">
              Linkmonks
            </span>
            <span className="text-[11px] text-ink-muted font-medium mt-0.5">
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
                    ? "bg-surface-muted text-ink shadow-sm border border-border"
                    : "text-ink-muted hover:text-ink hover:bg-surface"
                }`}>
                <Icon
                  className={`w-4 h-4`}
                  style={{ color: isActive ? accent.color : undefined }}
                />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer */}
      <div className="flex flex-col gap-3">
        {/* Theme & Accent Control Card */}
        <div className="bg-surface border border-border rounded-xl p-3 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-ink-muted uppercase tracking-wider">
              Studio Theme
            </span>
            <div className="flex items-center bg-surface-muted p-0.5 rounded-lg border border-border">
              <button
                onClick={() => setTheme("dark")}
                title="Dark Mode"
                className={`px-2 py-0.5 rounded-md text-[11px] font-bold flex items-center gap-1 transition-all ${
                  theme === "dark"
                    ? "bg-surface text-ink shadow-xs"
                    : "text-ink-muted hover:text-ink"
                }`}>
                <Moon className="w-3 h-3 text-indigo-400" />
                <span>Dark</span>
              </button>
              <button
                onClick={() => setTheme("light")}
                title="Light Mode"
                className={`px-2 py-0.5 rounded-md text-[11px] font-bold flex items-center gap-1 transition-all ${
                  theme === "light"
                    ? "bg-surface text-ink shadow-xs"
                    : "text-ink-muted hover:text-ink"
                }`}>
                <Sun className="w-3 h-3 text-amber-400" />
                <span>Light</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-1 pt-2 border-t border-border/40">
            <span className="text-[10px] font-semibold text-ink-muted">Accent</span>
            <div className="flex items-center gap-1.5">
              {accentPresets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => setAccent(preset)}
                  title={preset.name}
                  className={`w-4 h-4 rounded-full transition-transform ${
                    accent.id === preset.id
                      ? "scale-125 ring-2 ring-offset-1 ring-white"
                      : "hover:scale-110 opacity-70 hover:opacity-100"
                  }`}
                  style={{ backgroundColor: preset.color }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Plan Entitlement Badge */}
        <div className="bg-surface border border-border rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles
              className={`w-4 h-4 ${
                currentPlan === "pro" ? "text-amber-400" : "text-ink-muted"
              }`}
            />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-ink uppercase tracking-wider">
                {currentPlan === "pro" ? "Pro Plan" : "Free Plan"}
              </span>
              <span className="text-[10px] text-ink-muted">
                {currentPlan === "pro" ? "All features unlocked" : "Basic bio page"}
              </span>
            </div>
          </div>

          {currentPlan !== "pro" && (
            <Link
              to="/subscription"
              className="text-xs text-white px-2.5 py-1 rounded-lg font-bold transition-all shadow-sm"
              style={{ backgroundColor: accent.color }}>
              Upgrade
            </Link>
          )}
        </div>

        {/* User Profile & Logout */}
        <div className="flex items-center justify-between pt-2 border-t border-border px-1">
          <Link
            to="/settings"
            className="flex items-center gap-2.5 overflow-hidden hover:opacity-80 transition-opacity">
            <img
              src={user?.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover border border-border"
            />
            <div className="flex flex-col truncate">
              <span className="text-xs font-bold text-ink truncate">
                {user?.name || "Creator"}
              </span>
              <span className="text-[10px] text-ink-muted truncate">
                @{user?.username || "handle"}
              </span>
            </div>
          </Link>

          <button
            onClick={() => setOpenLogoutModal(!openLogoutModal)}
            title="Sign Out"
            className="p-2 text-ink-muted hover:text-red hover:bg-surface rounded-lg transition-all">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
