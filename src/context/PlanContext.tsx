import { allFeatures } from "@/constants";
import { getAllPlans } from "@/lib/supabase/api";
import { createContext, useContext, useEffect, useState } from "react";

const INITIAL_PLAN = {
  plans: [],
  plansLoading: false,
};

const PlanContext = createContext<any>(INITIAL_PLAN);

export function AllPlanProvider({ children }: any) {
  const [plans, setPlans] = useState([]);
  const [plansLoading, setPlansLoading] = useState(false);

  useEffect(() => {
    if (plans?.length === 0) {
      getPlans();
    } else {
      setPlansLoading(false);
    }
  }, []);

  const getPlans = async () => {
    setPlansLoading(true);
    try {
      const allPlans: any = await getAllPlans();
      if (allPlans && Array.isArray(allPlans) && allPlans.length > 0) {
        let tempPlans: any = [];
        allPlans.forEach((plan: any) => {
          let tempFeature: any = [];

          let activeFeatures = (allFeatures || []).filter((ele: any) => ele.is_available);
          let inActiveFeatures = (allFeatures || []).filter(
            (ele: any) => !ele.is_available
          );

          let filteredFeature = [...activeFeatures, ...inActiveFeatures];

          filteredFeature.forEach((feature: any) => {
            const rawVal = plan && feature?.key && plan[feature.key] !== undefined ? plan[feature.key] : "";
            const featCopy = {
              ...feature,
              value: rawVal,
            };
            if (featCopy.key === "max_websites_allowed") {
              featCopy.title = `Max ${rawVal || 1} pages Allowed`;
            } else if (featCopy.key === "max_links_per_website") {
              featCopy.title = `Unlimited links`;
            }
            tempFeature.push(featCopy);
          });

          let planObj = {
            plan_id: plan?.$id || plan?.id || "free",
            plan_name: plan?.plan_name || plan?.name || "Free",
            plan_desc: plan?.plan_desc || plan?.description || "Basic Plan",
            yearly_price: plan?.yearly_price || "0",
            monthly_price: plan?.monthly_price || "0",
            price: plan?.price || "0",
            plan_type: plan?.plan_type || "free",
            features: tempFeature,
          };

          tempPlans.push(planObj);
        });
        setPlans(tempPlans);
      }
    } catch (e) {
      console.error("getPlans error:", e);
    } finally {
      setPlansLoading(false);
    }
  };

  const contextValue = {
    plans,
    plansLoading,
  };
  return (
    <PlanContext.Provider value={contextValue}>{children}</PlanContext.Provider>
  );
}

export function useAllPlansContext() {
  return useContext(PlanContext);
}
