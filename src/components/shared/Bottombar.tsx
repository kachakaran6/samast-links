import { NavLink, useLocation } from "react-router-dom";
import { appNavItems } from "./AppSidebar";

const Bottombar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-[64px] bg-[#181A18]/95 border-t border-[#3B403B] backdrop-blur-md flex items-center justify-around px-2 z-50 md:hidden">
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
            className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] px-2 py-1 rounded-xl transition-all ${
              isActive
                ? "text-[#D17A67] font-bold"
                : "text-[#B5BAB2] hover:text-white"
            }`}>
            <Icon className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};

export default Bottombar;
