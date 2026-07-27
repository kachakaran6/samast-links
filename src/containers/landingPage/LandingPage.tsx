import { LandingMenu } from ".";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui";
import { Separator } from "@/components/ui/separator";
import { linkBlocks } from "@/constants";
import CustomIcon from "@/components/shared/CustomIcon";
import { Link } from "react-router-dom";
import { appConfig } from "@/lib/config/appConfig";
import PricingCards from "@/components/shared/PricingCards";
// import CustomCarousel from "@/components/shared/CustomCarousel";
// import AutoScroll from "embla-carousel-auto-scroll";
// import { CarouselItem } from "@/components/ui/carousel";

const LandingPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const cookieFallback = localStorage.getItem("cookieFallback");
    const currentUser = localStorage.getItem("currentUser");
    if (
      (currentUser && cookieFallback) === "[]" ||
      (currentUser && cookieFallback) === null ||
      (currentUser && cookieFallback) === undefined
    ) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <div className="w-full h-full ">
      <div className="absolute inset-0 opacity-[0.2] z-[-1] max-h-full">
        <img
          src="/assets/images/pattern-checked.svg"
          alt={appConfig?.appName}
          className="object-cover w-full"
        />
      </div>
      <div className="sm:p-5 px-5 flex flex-col w-full h-full overflow-y-auto">
        <LandingMenu isLoggedIn={isLoggedIn} />
      </div>
      <div className="flex flex-col py-20 gap-8 md:gap-14 items-center mt-5 justify-center  max-w-[90%] sm:max-w-[60%] m-auto">
        <div className="text-3xl md:text-5xl lg:text-7xl font-medium text-center w-full">
          Everything
          <span className="text-gradient"> You </span>
          Want To
          <span className="text-gradient"> Share </span>
          In One <span className="text-gradient">Place</span>
        </div>
        <div className="text-center w-full">
          Your own page. All your links and information. Ready in minutes.
        </div>

        <Link
          to={"/auth/sign-up"}
          className="bg-[linear-gradient(50deg,_#bc48ff_0%,_#1ca9c9_50%)] p-[1px] rounded-[9px]">
          <Button className="!h-12 px-6 whitespace-nowrap w-max text-sm font-semibold rounded-lg bg-dark-3">
            Get Started Now
          </Button>
        </Link>
      </div>
      <Separator className="w-3/4 m-auto mb-10 h-0.5" />
      <div
        id="features"
        className="flex flex-col gap-8 md:gap-14 items-center py-20  max-w-[90%] sm:max-w-[60%] m-auto">
        <div className="text-3xl md:text-5xl lg:text-7xl font-medium text-center w-full">
          All The <span className="text-gradient">Blocks</span> You Need
        </div>
        <div className="flex-center max-sm:flex-col flex-wrap gap-5 my-10">
          {linkBlocks.map((ele: any, i: any) => (
            <div
              key={ele + "_" + i}
              className="flex gap-3 items-center max-sm:flex-col max-sm:w-full bg-dark-4/50 font-normal p-2 px-5 rounded-2xl border border-dark-4">
              <CustomIcon
                icon={ele?.block_type}
                className={
                  "text-primary-500 max-sm:h-11 max-sm:p-2 max-sm:w-11 max-sm:bg-dark-4 rounded"
                }
              />
              <div className="text-lg lg:text-xl">{ele?.name}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2 items-center justify-center text-center text-lg md:text-2xl text-gray-200">
          <div>Content comes in different shapes.</div>
          <div>So you should share yours the right way.</div>
        </div>
      </div>
      <div className="h-full py-4  md:py-20 bg-dark-3" id="pricing">
        <div className="flex flex-col gap-8 md:gap-14 items-center py-20  max-w-[90%] sm:max-w-[60%] m-auto">
          <div className="text-3xl md:text-4xl lg:text-5xl font-medium text-center w-full">
            <span className="text-gradient">Pricing</span>
          </div>
          <PricingCards />
        </div>
      </div>
      {/* <Separator className="w-3/4 m-auto mb-10 h-0.5" /> */}
      {/* <div
        id="features"
        className="flex flex-col gap-8 md:gap-14 items-center py-20  max-w-[90%] sm:max-w-[60%] m-auto">
        <div className="text-3xl md:text-5xl lg:text-7xl font-medium text-center w-full">
          Recent <span className="text-gradient">Creators</span>
        </div>
        <div className="flex-center max-sm:flex-col flex-wrap gap-5 my-10 w-full">
          <CustomCarousel
            contentClass={"gap-3"}
            options={{ loop: true, direction: "backward", speed: 10 }}
            plugins={[AutoScroll()]}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((item: any) => (
              <CarouselItem
                key={item}
                className="basis-1/3 lg:basis-1/5 pl-7 lg:pl-8">
                <div className=" !h-28 !w-28  overflow-hidden ">
                  <div className="border border-gray-500 h-20 w-20 rounded-full"></div>
                  <span>{"<Ayush />"}</span>
                </div>
              </CarouselItem>
            ))}
          </CustomCarousel>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center text-center text-lg md:text-2xl text-gray-200">
          <div>Content comes in different shapes.</div>
          <div>So you should share yours the right way.</div>
        </div>
      </div> */}
    </div>
  );
};

export default LandingPage;
