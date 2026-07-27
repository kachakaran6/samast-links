import { Link } from "react-router-dom";
import { Button } from "../ui";
import { appConfig } from "@/lib/config/appConfig";

const UpgradeToPro = ({ reason }: any) => {
  return (
    <div className="h-[75vh] w-full max-h-[90vh] bg-dark-2 flex-center flex-col">
      <div className="w-[400px] max-w-[95%]">
        <div className="bg-[linear-gradient(45deg,_#bc48ff_0%,_#1ca9c9_50%)] p-[1px] rounded-[9px]">
          <div className="bg-dark-3 relative rounded-lg flex flex-col items-center p-10">
            <div className="flex flex-col gap-2">
              <div className="text-3xl font-medium text-center w-max mx-auto px-4 mb-4 rounded-lg">
                <div className="text-lg">
                  {reason ? reason : "To use this feature"}
                </div>
                <span className="text-gradient">Upgrade to Pro</span>
              </div>
              <div className="text-center font-normal text-sm text-gray-500">
                Unlock this feature by upgrading your account to pro
              </div>
              <div className="flex text-center flex-col gap-3 mt-4">
                <div className="text-2xl">
                  $4 <span className="text-base">/ per Month</span>
                </div>
                <div className="">Or</div>
                <div className="text-2xl">
                  $19 <span className="text-base">/ per Year</span>
                </div>
              </div>
              <Link
                to={appConfig.subscriptionUrl}
                className="mt-5 bg-[linear-gradient(50deg,_#bc48ff_0%,_#1ca9c9_50%)] p-[1px] rounded-[9px]">
                <Button className="!h-12 px-6 whitespace-nowrap w-full text-sm font-semibold rounded-lg bg-transparent">
                  Upgrade now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* </div></div> */}
    </div>
  );
};

export default UpgradeToPro;
