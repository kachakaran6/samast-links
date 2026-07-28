import { CustomSheet } from "@/components/shared";
import { Button } from "@/components/ui";
import { appConfig } from "@/lib/config/appConfig";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useUserContext } from "@/context/AuthContext";

const LandingMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated } = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (sectionId: string) => {
    setMenuOpen(false);
    if (location.pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(`/#${sectionId}`);
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  return (
    <div className="flex-center w-full fixed md:top-5 top-0 left-0 right-0 z-[90]">
      <div className="flex items-center justify-between max-md:w-full md:gap-20 bg-dark-4/70 backdrop-blur-md p-2 px-4 md:rounded-xl md:border border-dark-4 max-md:py-5">
        <Link
          to="/"
          className="text-lg font-semibold text-primary-500 flex-center gap-1">
          {appConfig?.appName}
          <span className="text-xs text-gray-400">(Beta)</span>
        </Link>
        <div
          className="cursor-pointer text-lg md:hidden"
          onClick={() => {
            setMenuOpen(true);
          }}>
          <MenuIcon />
        </div>

        {/* Desktop Navbar Links */}
        <div className="hidden md:flex gap-6 items-center text-sm font-medium">
          <a
            href="https://links.samast.pro/demo"
            target="_blank"
            rel="noreferrer"
            className="cursor-pointer hover:text-white text-gray-300 transition-colors">
            Demo
          </a>
          <button
            type="button"
            onClick={() => handleNavClick("features")}
            className="cursor-pointer hover:text-white text-gray-300 transition-colors">
            Features
          </button>
          <button
            type="button"
            onClick={() => handleNavClick("pricing")}
            className="cursor-pointer hover:text-white text-gray-300 transition-colors">
            Pricing
          </button>
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center justify-center gap-5">
          {!isAuthenticated ? (
            <>
              <Link to="/auth/sign-in">
                <div className="text-sm font-semibold text-gray-200 hover:text-white transition-colors">
                  Sign In
                </div>
              </Link>
              <Link to="/auth/sign-up">
                <Button className="!h-8 px-4 text-xs font-bold bg-[#D17A67] text-white hover:bg-[#E39782] rounded-xl shadow-sm">
                  Get Started
                </Button>
              </Link>
            </>
          ) : (
            <Link to="/overview">
              <Button className="!h-8 px-4 text-xs font-bold bg-[#D17A67] text-white hover:bg-[#E39782] rounded-xl shadow-sm">
                Dashboard
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      <CustomSheet
        side={"right"}
        title={appConfig?.appName}
        isOpen={menuOpen}
        headerClass={"!py-2 !bg-dark-2"}
        onToggle={(data: boolean) => {
          setMenuOpen(data);
        }}
        drawerClass={"!bg-dark-1 h-full border-none !duration-200 px-0"}>
        <div className="mt-4 flex flex-col gap-4 items-center text-sm font-medium">
          <a
            onClick={() => setMenuOpen(false)}
            className="w-[90%]"
            target="_blank"
            rel="noreferrer"
            href="https://links.samast.pro/demo">
            <div className="cursor-pointer hover:text-white text-gray-200 p-3 px-4 rounded-lg hover:bg-dark-3">
              Demo
            </div>
          </a>
          <button
            type="button"
            className="w-[90%] text-left"
            onClick={() => handleNavClick("features")}>
            <div className="cursor-pointer hover:text-white text-gray-200 p-3 px-4 rounded-lg hover:bg-dark-3">
              Features
            </div>
          </button>
          <button
            type="button"
            className="w-[90%] text-left"
            onClick={() => handleNavClick("pricing")}>
            <div className="cursor-pointer hover:text-white text-gray-200 p-3 px-4 rounded-lg hover:bg-dark-3">
              Pricing
            </div>
          </button>
          <div className="flex bottom-10 items-center justify-center gap-5 w-[90%] absolute">
            {!isAuthenticated ? (
              <div className="flex flex-col gap-3 flex-center w-full">
                <Link to="/auth/sign-in" className="w-full" onClick={() => setMenuOpen(false)}>
                  <Button className="!h-10 border !w-full text-xs font-bold bg-transparent border-[#3B403B] text-white rounded-xl">
                    Log In
                  </Button>
                </Link>
                <Link to="/auth/sign-up" className="w-full" onClick={() => setMenuOpen(false)}>
                  <Button className="!h-10 !w-full text-xs font-bold bg-[#D17A67] text-white hover:bg-[#E39782] rounded-xl">
                    Create Account
                  </Button>
                </Link>
              </div>
            ) : (
              <Link to="/overview" className="w-full" onClick={() => setMenuOpen(false)}>
                <Button className="!h-10 w-full text-xs font-bold bg-[#D17A67] text-white hover:bg-[#E39782] rounded-xl">
                  Open Dashboard
                </Button>
              </Link>
            )}
          </div>
        </div>
      </CustomSheet>
    </div>
  );
};

export default LandingMenu;
