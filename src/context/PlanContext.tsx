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
    if (plans?.length == 0) {
      getPlans();
    } else {
      setPlansLoading(false);
    }
  }, []);

  const getPlans = async () => {
    setPlansLoading(true);
    const allPlans: any = await getAllPlans();
    if (allPlans?.length > 0) {
      let tempPlans: any = [];
      allPlans.forEach((plan: any) => {
        let tempFeature: any = [];

        let activeFeatures = allFeatures.filter((ele: any) => ele.is_available);
        let inActiveFeatures = allFeatures.filter(
          (ele: any) => !ele.is_available
        );

        let filteredFeature = JSON.parse(
          JSON.stringify([...activeFeatures, ...inActiveFeatures])
        );

        filteredFeature.forEach((feature: any) => {
          feature.value = JSON.parse(JSON.stringify(plan[feature?.key]));
          if (feature?.key == "max_websites_allowed") {
            feature["title"] = `Max ${feature["value"]} websites Allowed`;
          } else if (feature?.key == "max_links_per_website") {
            feature["title"] = `Unlimited links`;
          }
          tempFeature.push(feature);
        });

        let planObj = {
          plan_id: plan?.$id,
          plan_name: plan?.plan_name,
          plan_desc: plan?.plan_desc,
          yearly_price: plan?.yearly_price,
          monthly_price: plan?.monthly_price,
          price: plan?.price,
          plan_type: plan?.plan_type,
          features: JSON.parse(JSON.stringify(tempFeature)),
        };

        tempPlans.push(planObj);
      });
      setPlans(JSON.parse(JSON.stringify(tempPlans)));
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
