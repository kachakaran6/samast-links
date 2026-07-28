import "./globals.css";
import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { BlockProvider } from "./context/BlockContext";
import { LinkProvider } from "./context/LinkContext";
import { Loader } from "./components/shared";
import { StatsProvider } from "./context/StatsContext";
import { AllPlanProvider } from "./context/PlanContext";
import DisplayLink from "./containers/DisplayLink/DisplayLink";
import VerifyLicenseKey from "./containers/subscription/VerifyLicenseKey";
import { appConfig } from "./lib/config/appConfig";

const AuthLayout = lazy(() => import("./_auth/AuthLayout"));
const RootLayout = lazy(() => import("./_root/RootLayout"));
const SignupForm = lazy(() => import("@/_auth/pages/SignupForm"));
const SigninForm = lazy(() => import("@/_auth/pages/SigninForm"));
const LandingPage = lazy(() => import("./containers/landingPage/LandingPage"));
const VerifyEmail = lazy(() => import("./_auth/pages/VerifyAccount"));
const AccountBlocked = lazy(() => import("./_auth/pages/AccountBlocked"));
const ResetPassword = lazy(() => import("./_auth/pages/ResetPassword"));
const Subscription = lazy(() => import("./containers/subscription/Subscription"));
const RequestResetPassword = lazy(() => import("./_auth/pages/RequestResetPassword"));
const Privacy = lazy(() => import("./containers/legal/Privacy"));
const Terms = lazy(() => import("./containers/legal/Terms"));
const Refunds = lazy(() => import("./containers/legal/Refunds"));

// Master Overhaul 5 Workspaces
const Overview = lazy(() => import("./containers/overview/Overview"));
const LinksWorkspace = lazy(() => import("./containers/links/LinksWorkspace"));
const AppearanceWorkspace = lazy(() => import("./containers/appearance/AppearanceWorkspace"));
const AnalyticsWorkspace = lazy(() => import("./containers/analytics/AnalyticsWorkspace"));
const SettingsWorkspace = lazy(() => import("./containers/settings/SettingsWorkspace"));

const App = () => {
  if (!appConfig.isLocal) {
    console.log = () => {};
    console.table = () => {};
    console.group = () => {};
  }

  return (
    <main className="flex h-full min-h-screen bg-[#181A18]">
      <AllPlanProvider>
        <AuthProvider>
          <BlockProvider>
            <LinkProvider>
              <StatsProvider>
                <Suspense
                  fallback={
                    <div className="flex-center w-full h-full min-h-screen">
                      <Loader />
                    </div>
                  }>
                  <Routes>
                    {/* Auth routes */}
                    <Route path="/auth" element={<AuthLayout />}>
                      <Route path="/auth/sign-in" element={<SigninForm />} />
                      <Route path="/auth/sign-up" element={<SignupForm />} />
                      <Route path="/auth/reset-password" element={<ResetPassword />} />
                      <Route
                        path="/auth/request-reset-password"
                        element={<RequestResetPassword />}
                      />
                    </Route>

                    {/* Public marketing & legal routes */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/refunds" element={<Refunds />} />
                    <Route path="/verify-account" element={<VerifyEmail />} />
                    <Route path="/account-blocked" element={<AccountBlocked />} />

                    {/* Authenticated Workspace Shell */}
                    <Route element={<RootLayout />}>
                      <Route path="/overview" element={<Overview />} />
                      <Route path="/app" element={<Navigate to="/overview" replace />} />

                      <Route path="/links" element={<LinksWorkspace />} />
                      <Route path="/link" element={<LinksWorkspace />} />
                      <Route path="/link/:link_id?" element={<LinksWorkspace />} />

                      <Route path="/appearance" element={<AppearanceWorkspace />} />

                      <Route path="/analytics" element={<AnalyticsWorkspace />} />

                      <Route path="/settings" element={<SettingsWorkspace />} />
                      <Route path="/settings/:section?" element={<SettingsWorkspace />} />

                      <Route path="/subscription" element={<Subscription />} />
                      <Route path="/subscription/verify" element={<VerifyLicenseKey />} />
                    </Route>

                    {/* Public Profile Page Router (Catch-all slug) */}
                    <Route path="/:slug" element={<DisplayLink />} />
                  </Routes>
                  <Toaster />
                  <Tooltip id="tooltip" opacity={1} />
                </Suspense>
              </StatsProvider>
            </LinkProvider>
          </BlockProvider>
        </AuthProvider>
      </AllPlanProvider>
    </main>
  );
};

export default App;
