import { lazy, Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader } from "@/components/shared";

const AccountSettings = lazy(() => import("./AccountSettings"));
// const SocialMediaSettings = lazy(() => import("./SocialMediaSettings"));
const PasswordSettings = lazy(() => import("./PasswordSettings"));

const Settings = () => {
  return (
    <div className="max-sm:px-2 p-5 w-full max-w-5xl mx-auto">
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="w-full flex items-center justify-start fixed top-[56px] left-0 md:left-[55px] h-max bg-dark-2 scrollbar-none overflow-x-auto">
          {/* <TabsTrigger
            value="social-media"
            className="flex-grow py-3 text-gray-400 hover:text-gray-200 hover:border-b-gray-400">
            Social Media
          </TabsTrigger> */}
          <TabsTrigger
            value="account"
            className="flex-grow py-3 text-gray-400 hover:text-gray-200 hover:border-b-gray-400">
            Account
          </TabsTrigger>
          <TabsTrigger
            value="password"
            className="flex-grow py-3 text-gray-400 hover:text-gray-200 hover:border-b-gray-400">
            Password
          </TabsTrigger>
        </TabsList>
        <div className="w-full md:p-10 p-2 max-sm:mt-10 flex flex-col gap-2 bg-dark-2 rounded">
          <Suspense
            fallback={
              <div className="flex-center w-full h-full min-h-screen">
                <Loader />
              </div>
            }>
            <TabsContent value="account" className="w-full">
              <AccountSettings />
            </TabsContent>
            <TabsContent value="password">
              <PasswordSettings />
            </TabsContent>
            {/* <TabsContent value="social-media">
              <SocialMediaSettings />
            </TabsContent> */}
          </Suspense>
        </div>
      </Tabs>
    </div>
  );
};

export default Settings;
