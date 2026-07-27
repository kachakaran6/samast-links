import CustomDrawer from "@/components/shared/CustomDrawer";
import { Button } from "@/components/ui";
import { Separator } from "@/components/ui/separator";
import { shareListData } from "@/constants";
import { ArrowRight, Copy, CopyCheck } from "lucide-react";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";

const ShareDrawer = ({
  shareDrawerOpened,
  setShareDrawerOpened,
  linkData,
}: any) => {
  const [linkCopied, setLinkCopied] = useState<any>(false);
  return (
    <>
      <CustomDrawer
        open={shareDrawerOpened}
        openChanged={(data: any) => {
          setShareDrawerOpened(data);
        }}
        className="!bg-white text-slate-900 [&_.drawer-handle]:!bg-gray-600 [&_.drawer-handle]:!h-1">
        <div className="max-w-2xl overflow-y-auto md:h-[calc(100vh-50px)] scrollbar-none mx-auto w-full flex flex-col gap-2 mt-3">
          <div className="text-2xl font-medium capitalize text-center">
            Share {linkData?.title}
          </div>
          <div className="flex flex-col gap-2 md:border p-3 rounded-lg">
            {shareListData.map((ele: any) => (
              <Link
                key={ele?.title}
                target={"_blank"}
                to={ele?.link + window.location.origin + "/" + linkData?.slug}>
                <div className="p-3 hover:bg-gray-200 transition-all cursor-pointer rounded-lg flex items-center justify-between group">
                  <div className="flex-center gap-2">
                    <img
                      src={`/assets/icons/${ele?.icon}`}
                      className="h-6 w-6"
                    />
                    <div className="font-medium text-base">{ele?.title}</div>
                  </div>
                  <ArrowRight className="group-hover:mr-1 text-gray-600 group-hover:text-gray-900 transition-all" />
                </div>
              </Link>
            ))}
            <CopyToClipboard
              text={window.location.origin + "/" + linkData?.slug}
              onCopy={() => {
                setLinkCopied(true);
                setTimeout(() => {
                  setLinkCopied(false);
                }, 3000);
              }}>
              <div className="flex cursor-pointer items-center justify-between w-full border rounded-lg mt-4 p-3">
                <div className="flex gap-3 max-sm:gap-2 items-center w-[85%]">
                  <div className="h-6 w-6 max-sm:h-5 max-sm:w-5">
                    <img src="/assets/images/logo.png" />
                  </div>
                  <div className="tex-slate-900 text-sm font-medium w-full truncate">
                    {window.location.origin + "/" + linkData?.slug}
                  </div>
                </div>

                <div className="flex-center flex-col gap-0.5">
                  {linkCopied ? (
                    <>
                      <CopyCheck className="h-4 w-4 text-gray-500" />
                      <div className="text-xs">Copied</div>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 text-gray-400" />
                      <div className="text-xs">Copy</div>
                    </>
                  )}
                </div>
              </div>
            </CopyToClipboard>
          </div>
          <Separator className="divider-bg w-full h-[1px]" />
          <div className="flex p-3 flex-col gap-3">
            <div className="flex flex-col gap-1">
              <div className="font-bold text-sm text-slate-800">
                Create Your Link within minutes in Linkmonks
              </div>
              <div className="font-medium text-xs text-slate-500">
                The only Link in Bio you need to showcase your links.
              </div>
            </div>
            <div className="flex flex-row gap-3 md:gap-1">
              <Link
                target={"_blank"}
                className="w-full"
                to={"https://linkmonks.vercel.app"}>
                <Button className="!h-12 border text-slate-100 w-full rounded-[40px] bg-transparent bg-slate-900">
                  Sign up for Free
                </Button>
              </Link>
              <Link
                className="w-full"
                target={"_blank"}
                to={"https://linkmonks.vercel.app"}>
                <Button className="!h-12 hover:bg-transparent border w-full border-slate-400 rounded-[40px] bg-transparent text-slate-900">
                  Explore More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CustomDrawer>
    </>
  );
};

export default ShareDrawer;
