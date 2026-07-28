import { INITIAL_USER, useUserContext } from "@/context/AuthContext";
import { useSignOutAccount } from "@/lib/react-query/queries";
import { Suspense, lazy, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const AppSidebar = lazy(() => import("@/components/shared/AppSidebar"));
const AppHeader = lazy(() => import("@/components/shared/AppHeader"));
const Bottombar = lazy(() => import("@/components/shared/Bottombar"));
const Loader = lazy(() => import("@/components/shared/Loader"));
const Modal = lazy(() => import("@/components/shared/Modal"));

const RootLayout = () => {
  const {
    isLoading,
    isAuthenticated,
    setUser,
    setIsAuthenticated,
  } = useUserContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/auth/sign-in");
    }
  }, [isLoading, isAuthenticated, location.pathname]);

  const { mutate: signOut } = useSignOutAccount();

  const handleSignOut = async () => {
    setIsAuthenticated(false);
    setUser(INITIAL_USER);
    signOut();
    localStorage.removeItem("currentUser");
    localStorage.removeItem("cookieFallback");
    navigate("/");
  };

  return (
    <div className="min-h-screen w-full bg-canvas text-ink flex transition-colors duration-200">
      {isLoading ? (
        <div className="flex-center w-full min-h-screen">
          <Loader height={40} width={40} />
        </div>
      ) : !isAuthenticated ? (
        <div className="flex-center w-full min-h-screen">
          <Loader height={40} width={40} />
        </div>
      ) : (
        <>
          <AppSidebar
            openLogoutModal={openLogoutModal}
            setOpenLogoutModal={setOpenLogoutModal}
          />
          <AppHeader />

          <main className="flex-1 w-full md:pl-[240px] pt-[72px] pb-[80px] md:pb-6 min-h-screen">
            <Suspense
              fallback={
                <div className="flex-center w-full h-[80vh]">
                  <Loader />
                </div>
              }>
              <Outlet />
            </Suspense>
          </main>

          <Bottombar />

          <Modal
            variant="danger"
            label="Logout"
            desc="Are you sure you want to sign out of Linkmonks?"
            submitBtnLabel="Logout"
            onSubmit={() => {
              handleSignOut();
            }}
            open={openLogoutModal}
            setOpen={setOpenLogoutModal}
          />
        </>
      )}
    </div>
  );
};

export default RootLayout;
