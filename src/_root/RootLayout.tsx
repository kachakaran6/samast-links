import { Button } from "@/components/ui";
import { INITIAL_USER, useUserContext } from "@/context/AuthContext";
import { useSignOutAccount } from "@/lib/react-query/queries";
import { Suspense, lazy, useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

// Lazy imports for components
const Topbar = lazy(() => import("@/components/shared/Topbar"));
const Bottombar = lazy(() => import("@/components/shared/Bottombar"));
const LeftSidebar = lazy(() => import("@/components/shared/LeftSidebar"));
const Loader = lazy(() => import("@/components/shared/Loader"));
const Modal = lazy(() => import("@/components/shared/Modal"));

const RootLayout = () => {
  const {
    isLoading,
    user,
    isAuthenticated,
    currentPlan,
    setUser,
    setIsAuthenticated,
  } = useUserContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const [isShowUpgradeBanner, setIsShowUpgradeBanner] = useState(false);
  const { mutate: signOut } = useSignOutAccount();

  useEffect(() => {
    const cookieFallback = localStorage.getItem("cookieFallback");
    if (
      cookieFallback === "[]" ||
      cookieFallback === null ||
      cookieFallback === undefined
    ) {
      if (!isAuthenticated) {
        navigate("auth/sign-in");
      }
    }
  }, [location.pathname]);

  const handleSignOut = async () => {
    setIsAuthenticated(false);
    setUser(INITIAL_USER);
    signOut();
    localStorage.removeItem("currentUser");
    localStorage.removeItem("cookieFallback");
    navigate("/");
  };

  useEffect(() => {
    if (localStorage.getItem("isShowUpgradeBanner")) {
      let isShowBanner = JSON.parse(
        localStorage.getItem("isShowUpgradeBanner") ?? ""
      );
      if (isShowBanner == false) {
        setIsShowUpgradeBanner(false);
      } else {
        setIsShowUpgradeBanner(true);
      }
    }
  }, []);

  const handleDontShowAgain = () => {
    localStorage.setItem("isShowUpgradeBanner", JSON.stringify(false));
    setIsShowUpgradeBanner(false);
  };

  return (
    <>
      <div
        className={`w-full ${
          !isLoading && user?.email ? "" : "flex h-screen"
        }`}>
        {isLoading || !user?.email ? (
          <Loader height={40} width={40} />
        ) : (
          <>
            <Topbar
              openLogoutModal={openLogoutModal}
              setOpenLogoutModal={setOpenLogoutModal}
            />
            <LeftSidebar
              openLogoutModal={openLogoutModal}
              setOpenLogoutModal={setOpenLogoutModal}
            />
            <section className="w-full flex gap-2  max-w-full pb-[80px] mt-[56px]">
              <Suspense
                fallback={
                  <div className="flex-center w-full h-full min-h-screen">
                    <Loader />
                  </div>
                }>
                <div className="flex flex-col flex-1 h-full md:ml-[55px] w-full">
                  {isShowUpgradeBanner && currentPlan == "free" && (
                    <div className="bg-dark-1 flex max-sm:gap-2 max-sm:flex-col gap-5 sticky top-0 z-[10] border-b border-primary border-dashed flex-center p-3 w-full">
                      <div className="text-gray-300 text-base">
                        🔥 Launch Sale $99/- for lifetime
                        <span className="text-lg text-gradient"></span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={handleDontShowAgain}
                          className="shad-button_ghost block-shadow !py-1 !h-8 flex gap-2">
                          Don't Show again
                        </Button>
                        <Link
                          onClick={(event: any) => {
                            event.stopPropagation();
                          }}
                          to={`/subscription`}>
                          <Button className="shad-button_primary block-shadow !py-1 h-8 flex gap-2">
                            Upgrade Now
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )}
                  <Outlet />
                </div>
              </Suspense>
            </section>

            <Bottombar />
            <Modal
              variant="danger"
              label="Logout"
              desc="Are You sure you want to logout ?"
              submitBtnLabel="Logout"
              onSubmit={() => {
                handleSignOut();
              }}
              open={openLogoutModal}
              setOpen={setOpenLogoutModal}></Modal>
          </>
        )}
      </div>
    </>
  );
};

export default RootLayout;
