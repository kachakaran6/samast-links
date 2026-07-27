// import { Loader } from "@/components/shared";
import { Button } from "@/components/ui";
import { Copy, CopyCheckIcon, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";

const Preview = ({
  link,
  originalLink,
  blocks,
  linkData,
  previewOpen,
}: any) => {
  const [copied, setCopied] = useState(false);

  const sendDataToIframe = () => {
    let t = setInterval(() => {
      const iframe: any = document.getElementById("previewIframeTag");
      if (iframe) {
        clearInterval(t);
        const data = { blocks, linkData };
        iframe.contentWindow.postMessage(data, "*");
      }
    }, 1000);
  };

  useEffect(() => {
    if (blocks && linkData && previewOpen) {
      sendDataToIframe();
    }
  }, [blocks, linkData, link, previewOpen]);

  return (
    <>
      <div className="h-full w-full flex items-center justify-start flex-col bg-slate-900">
        <div className="mt-1 gap-3 flex-center">
          <Link to={originalLink} target="_blank">
            <Button
              className="btn-shadow transition-all !h-8 border-2 hover:border-slate-600 border-slate-700 flex !gap-3 items-center shad-button_ghost  !text-xs text-gray-300 !px-3"
              variant={"ghost"}>
              Visit Page <ExternalLink className="h-4 w-4 text-gray-500" />
            </Button>
          </Link>
          <CopyToClipboard
            text={originalLink}
            onCopy={() => {
              setCopied(true);
              setTimeout(() => {
                setCopied(false);
              }, 3000);
            }}>
            <Button
              className="!h-8 btn-shadow transition-all border-2 hover:border-slate-600 border-slate-700 flex !gap-3 items-center shad-button_ghost  !text-xs text-gray-300 !px-3"
              variant={"ghost"}>
              {copied ? `Copied` : `Copy Link`}
              {copied ? (
                <CopyCheckIcon className="h-4 w-4 text-gray-500" />
              ) : (
                <Copy className="h-4 w-4 text-gray-500" />
              )}
            </Button>
          </CopyToClipboard>
        </div>
        <div className="h-[calc(100vh-50px)] max-sm:min-w-[22rem] min-w-[20rem] border border-slate-950 rounded-[20px] p-1 scale-[0.85] -mt-8">
          <div className="relative w-full h-full rounded-[16px] overflow-hidden ">
            <iframe
              src={link}
              title="Page preview"
              height="100%"
              id="previewIframeTag"
              width="100%"
              className="border-none opacity-1 transition-all"></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default Preview;
