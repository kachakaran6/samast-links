import { Link } from "react-router-dom";
import { Button } from "../ui";
import { CheckIcon } from "lucide-react";
import { Separator } from "../ui/separator";
import { IoClose } from "react-icons/io5";
import { useAllPlansContext } from "@/context/PlanContext";

const PricingCards = ({
  isFreeShow = true,
  buyNowBtnText = "Get Started Now",
  buyNowLink = "/auth/sign-up",
}: any) => {
  const { plans, plansLoading } = useAllPlansContext();

  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-10">
        {!plansLoading &&
          plans.map((plan: any) => {
            console.log({ plan });
            if (!isFreeShow && plan.price == "0") {
              return;
            }
            return (
              <div key={plan.plan_id} className="w-[95%] max-w-[350px]">
                <div
                  className={`${
                    plan?.price != "0"
                      ? "bg-[linear-gradient(45deg,_#bc48ff_0%,_#1ca9c9_50%)]"
                      : "bg-dark-4"
                  }  p-[1px] rounded-[9px]`}>
                  <div className="bg-dark-2 relative rounded-lg flex flex-col items-center p-10">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 w-full text-lg font-semibold">
                        {plan.plan_name}
                      </div>
                      <div className="font-normal text-sm text-gray-500">
                        {plan.plan_desc}
                      </div>
                      {plan.price != "0" && (
                        <div className="flex text-center flex-col gap-3 mt-4">
                          <div className="text-2xl">
                            ${plan.monthly_price}
                            <span className="text-base">
                              / {plan.monthly_price != "0" && "per Month"}
                            </span>
                          </div>
                          <div className="">Or</div>
                          <div className="text-2xl">
                            ${plan.yearly_price}
                            <span className="text-base">
                              / {plan.yearly_price != "0" && "per Year"}
                            </span>
                          </div>
                        </div>
                      )}

                      <Link
                        to={buyNowLink}
                        className={`mt-5 ${
                          plan.price != "0"
                            ? "bg-[linear-gradient(50deg,_#bc48ff_0%,_#1ca9c9_50%)] hover:bg-transparent"
                            : "bg-dark-4"
                        } p-[1px] rounded-[9px]`}>
                        <Button className="!h-12 px-6 whitespace-nowrap w-full text-sm font-semibold hover:bg-transparent rounded-lg bg-transparent">
                          {buyNowBtnText}
                        </Button>
                      </Link>

                      <Separator className="my-3" />
                      <div className="flex flex-col gap-5">
                        <div className="text-gray-500 font-medium text-xl text-center">
                          Features
                        </div>
                        <div className="flex flex-col gap-2">
                          {plan?.features?.length > 0 &&
                            plan?.features.map((feature: any) => (
                              <div
                                key={feature?.key}
                                className="flex items-center gap-4 text-sm">
                                {feature?.value ? (
                                  <CheckIcon className="h-4 w-4 bg-[linear-gradient(45deg,_#bc48ff_0%,_#1ca9c9_50%)] rounded-full p-0.5 text-white" />
                                ) : (
                                  <IoClose className="h-4 w-4 bg-dark-4 rounded-full p-0.5 text-white" />
                                )}

                                <div>{feature?.title}</div>
                                {!feature?.is_available && (
                                  <span className="text-xs text-gray-500">
                                    (soon)
                                  </span>
                                )}
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default PricingCards;
