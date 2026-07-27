import { CustomSheet } from "@/components/shared";
import { Button } from "@/components/ui";
import { appConfig } from "@/lib/config/appConfig";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const LandingMenu = ({ isLoggedIn }: any) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="flex-center w-full fixed md:top-5 top-0 left-0 right-0 z-[90]">
      <div className="flex items-center justify-between max-md:w-full md:gap-20 bg-dark-4/70 backdrop-blur-md p-2 px-4 md:rounded-xl md:border border-dark-4 max-md:py-5">
        <a
          href={"/#"}
          className="text-lg font-semibold text-primary-500 flex-center gap-1">
          {appConfig?.appName}
          <span className="text-xs text-gray-400">(Beta)</span>
        </a>
        <div
          className="cursor-pointer text-lg md:hidden"
          onClick={() => {
            setMenuOpen(true);
          }}>
          <MenuIcon />
        </div>
        <div className="hidden md:flex gap-4 items-center text-sm font-medium">
          <a target="_blank" href={appConfig?.demoLink}>
            <div className="cursor-pointer hover:text-white text-gray-200">
              Demo
            </div>
          </a>
          <a className="w-[90%]" href={"/#features"}>
            <div className="cursor-pointer hover:text-white text-gray-200">
              Features
            </div>
          </a>
          <a className="w-[90%]" href={"/#pricing"}>
            <div className="cursor-pointer hover:text-white text-gray-200">
              Pricing
            </div>
          </a>
        </div>
        <div className="hidden md:flex items-center justify-center gap-5">
          {!isLoggedIn && (
            <>
              <Link to={"/auth/sign-in"}>
                <div className="text-sm font-semibold">Sign In</div>
              </Link>
              <Link to={"/auth/sign-up"}>
                <Button className="!h-7 text-sm font-semibold bg-slate-300 text-dark-1 hover:bg-slate-400">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
          {isLoggedIn && (
            <Link to={"/link"}>
              <Button className="!h-7 text-sm font-semibold bg-slate-300 text-dark-1 hover:bg-slate-400">
                Dashboard
              </Button>
            </Link>
          )}
        </div>
      </div>
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
            href={`${appConfig?.demoLink}`}>
            <div className="cursor-pointer hover:text-white text-gray-200 p-3 px-4 rounded-lg hover:bg-dark-3">
              Demo
            </div>
          </a>
          <a
            className="w-[90%]"
            href={"#features"}
            onClick={() => setMenuOpen(false)}>
            <div className="cursor-pointer hover:text-white text-gray-200 p-3 px-4 rounded-lg hover:bg-dark-3">
              Features
            </div>
          </a>
          <a
            onClick={() => setMenuOpen(false)}
            className="w-[90%]"
            href={"#pricing"}>
            <div className="cu`rsor-pointer hover:text-white text-gray-200 p-3 px-4 rounded-lg hover:bg-dark-3">
              Pricing
            </div>
          </a>
          <div className="flex bottom-10 items-center justify-center gap-5 w-[90%] absolute">
            {!isLoggedIn && (
              <div className="flex flex-col gap-5 flex-center w-full">
                <Link to={"/auth/sign-in"} className="w-full">
                  <Button className="!h-10 border-dotted !w-full text-sm font-semibold bg-transparent border-primary-500 border">
                    Log In
                  </Button>
                </Link>
                <Link to={"/auth/sign-up"} className="w-full">
                  <Button className="!h-10 !w-full text-sm font-semibold bg-slate-300 text-dark-1 hover:bg-slate-400">
                    Create Account
                  </Button>
                </Link>
              </div>
            )}
            {isLoggedIn && (
              <Link to={"/link"}>
                <div className="bg-[linear-gradient(50deg,_#bc48ff_0%,_#474bff_95%)] p-[1px] rounded-[9px]">
                  <Button className="!h-10 w-full text-sm font-semibold bg-slate-300 text-dark-1 hover:bg-slate-400">
                    <span className="bg-[linear-gradient(45deg,_#bc48ff_0%,_#474bff_90%)] bg-clip-text text-transparent   ">
                      Open Dashboard
                    </span>
                  </Button>
                </div>
              </Link>
            )}
          </div>
        </div>
      </CustomSheet>
    </div>
  );
};

export default LandingMenu;
