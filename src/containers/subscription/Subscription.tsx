import ActivePlan from "@/components/shared/ActivePlan";
import PricingCards from "@/components/shared/PricingCards";
import { useUserContext } from "@/context/AuthContext";
import { appConfig } from "@/lib/config/appConfig";

const Subscription = () => {
  const { user } = useUserContext();
  return (
    <div className="w-full px-4 sm:px-6 md:px-8 py-6 md:py-8">
      <div className="flex flex-col gap-8 md:gap-14 items-center w-full">
        <div className="w-full flex flex-col gap-2">
          <div className="text-3xl font-medium text-center text-gradient flex gap-2 flex-center border-b w-max mx-auto border-b-gray-500">
            Active Plan :
            <div className="font-normal text-gray-300">
              {user?.is_pro ? "Pro" : "Free"}
            </div>
          </div>
          <ActivePlan />
        </div>
        {!user?.is_pro && (
          <>
            <div className="text-3xl font-medium text-center flex-center">
              Upgrade to Pro
            </div>
            <PricingCards
              isFreeShow={false}
              buyNowBtnText={"Upgrade Now"}
              buyNowLink={appConfig.subscriptionUrl}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Subscription;
