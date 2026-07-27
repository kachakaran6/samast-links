import { useUserContext } from "@/context/AuthContext";
import { useAllPlansContext } from "@/context/PlanContext";
import { CheckIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

const ActivePlan = () => {
  const { plans, plansLoading } = useAllPlansContext();
  const { user } = useUserContext();
  const [currentPlan, setCurrentPlan] = useState<any>(null);
  useEffect(() => {
    if (!user && plans?.length == 0) return;
    if (user?.is_pro) {
      let activePlan = plans.find(
        (plan: any) => plan?.plan_name?.toLowerCase() == "pro"
      );
      setCurrentPlan(activePlan);
    } else {
      let activePlan = plans.find(
        (plan: any) => plan?.plan_name?.toLowerCase() != "pro"
      );

      setCurrentPlan(activePlan);
    }
  }, [user, plans]);

  return (
    <div className="flex flex-col gap-2 p-2 px-4 w-full rounded bg-dark-3 border border-dark-4">
      {!plansLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 flex-wrap">
          {currentPlan?.features?.length > 0 &&
            currentPlan?.features.map((feature: any) => {
              if (!feature?.is_available) {
                return;
              }
              return (
                <div
                  className="w-max flex gap-2 items-center justify-center rounded p-[4px_16px]"
                  key={feature?.key}>
                  {feature?.value ? (
                    <CheckIcon className="h-4 w-4 bg-[linear-gradient(45deg,_#bc48ff_0%,_#1ca9c9_50%)] rounded-full p-0.5 text-white" />
                  ) : (
                    <IoClose className="h-4 w-4 bg-dark-4 rounded-full p-0.5 text-white" />
                  )}
                  {feature?.title}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default ActivePlan;
