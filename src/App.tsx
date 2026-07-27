import "./globals.css";
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { BlockProvider } from "./context/BlockContext";
import { LinkProvider } from "./context/LinkContext";
import { Loader } from "./components/shared";
import { StatsProvider } from "./context/StatsContext";
import { AllPlanProvider } from "./context/PlanContext";
const AuthLayout = lazy(() => import("./_auth/AuthLayout"));
const RootLayout = lazy(() => import("./_root/RootLayout"));
const SignupForm = lazy(() => import("@/_auth/pages/SignupForm"));
const SigninForm = lazy(() => import("@/_auth/pages/SigninForm"));
const ManageLink = lazy(() => import("./containers/links/ManageLink"));
const Settings = lazy(() => import("./containers/settings/Settings"));
const Account = lazy(() => import("./containers/account/Account"));
const SingleLink = lazy(() => import("./containers/links/SingleLink"));
const LandingPage = lazy(() => import("./containers/landingPage/LandingPage"));
import DisplayLink from "./containers/DisplayLink/DisplayLink";
import VerifyLicenseKey from "./containers/subscription/VerifyLicenseKey";
import { appConfig } from "./lib/config/appConfig";
const VerifyEmail = lazy(() => import("./_auth/pages/VerifyAccount"));
const AccountBlocked = lazy(() => import("./_auth/pages/AccountBlocked"));
const ResetPassword = lazy(() => import("./_auth/pages/ResetPassword"));
const Subscription = lazy(
  () => import("./containers/subscription/Subscription")
);
const RequestResetPassword = lazy(
  () => import("./_auth/pages/RequestResetPassword")
);
const Privacy = lazy(() => import("./containers/legal/Privacy"));
const Terms = lazy(() => import("./containers/legal/Terms"));
const Refunds = lazy(() => import("./containers/legal/Refunds"));

const App = () => {
  if (!appConfig.isLocal) {
    console.log = () => {};
    console.table = () => {};
    console.group = () => {};
  }

  return (
    <main className="flex h-full min-h-screen">
      <Suspense
        fallback={
          <div className="flex-center w-full h-full min-h-screen">
            <Loader />
          </div>
        }>
        <Routes>
          {/* Auth routes */}
          <Route
            path="/auth"
            element={
              <AuthProvider>
                <BlockProvider>
                  <LinkProvider>
                    <AuthLayout />
                  </LinkProvider>
                </BlockProvider>
              </AuthProvider>
            }>
            <Route path="/auth/sign-in" element={<SigninForm />} />
            <Route path="/auth/sign-up" element={<SignupForm />} />
            <Route path="/auth/reset-password" element={<ResetPassword />} />
            <Route
              path="/auth/request-reset-password"
              element={<RequestResetPassword />}
            />
          </Route>

          {/* Public routes */}
          <Route
            path="/"
            element={
              <AllPlanProvider>
                <LandingPage />
              </AllPlanProvider>
            }
          />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/refunds" element={<Refunds />} />
          <Route path="/:slug" element={<DisplayLink />} />
          <Route
            path="/verify-account"
            element={
              <AuthProvider>
                <VerifyEmail />
              </AuthProvider>
            }
          />
          <Route
            path="/account-blocked"
            element={
              <AuthProvider>
                <AccountBlocked />
              </AuthProvider>
            }
          />

          {/* private routes */}
          <Route
            element={
              <AllPlanProvider>
                <AuthProvider>
                  <BlockProvider>
                    <LinkProvider>
                      <StatsProvider>
                        <RootLayout />
                      </StatsProvider>
                    </LinkProvider>
                  </BlockProvider>
                </AuthProvider>
              </AllPlanProvider>
            }>
            <Route path="/link/:link_id?" element={<SingleLink />} />
            <Route path="/link/create" element={<ManageLink />} />
            <Route path="/settings/:section?" element={<Settings />} />
            <Route path="/profile/:profile_id" element={<Account />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/subscription/verify" element={<VerifyLicenseKey />} />
            {/* <Route path="/**" element={Navigate({ to: "/link" })} /> */}
            {/* <Route path="/dashboard/:link_id?" element={<SingleLink />} /> */}
            {/* <Route path="/statistics/:link_id?" element={<Stats />} /> */}
            {/* <Route path="/link/all" element={<AllLinks />} /> */}
            {/* <Route path="/link/edit/:link_id" element={<ManageLink />} /> */}
            {/* <Route path="/link/customize/:link_id" element={<Customize />} /> */}
            {/* <Route path="/check-out" element={<Checkout />} /> */}
          </Route>
        </Routes>
        <Toaster />
        <Tooltip id="tooltip" opacity={1} />
      </Suspense>
    </main>
  );
};

export default App;
