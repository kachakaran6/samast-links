import { Button } from "@/components/ui";
import { useUserContext } from "@/context/AuthContext";
import { Copy, CopyCheckIcon } from "lucide-react";
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import { appConfig } from "@/lib/config/appConfig";
const Checkout = () => {
  const { user } = useUserContext();
  const [copied, setCopied] = useState(false);

  const copiedToClipboard = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <div className="max-sm:px-2 flex flex-col p-5 max-w-4xl mx-auto w-full gap-3">
      <div className="flex items-center justify-center text-3xl">Check Out</div>
      <div className="text-gray-400">
        To complete your transaction smoothly, please remember to enter your
        unique user ID on the payment page. This ensures proper linkage of
        payments to your account. Copy your user ID provided below carefully to
        avoid any issues accessing premium features.
      </div>
      <div className="flex flex-col w-full mx-auto mt-5 items-center gap-5 bg-dark-2 p-8 rounded-lg">
        <div className="relative flex flex-col w-max">
          <div>User Id</div>
          <CopyToClipboard text={user.id} onCopy={copiedToClipboard}>
            <div>
              <div className="flex gap-5 items-center">
                <div
                  className={`border p-2 px-5 rounded-sm w-max cursor-pointer ${
                    copied ? "border-primary/40" : "border-gray-500"
                  }`}>
                  {user.id}
                </div>
                <div className="border border-gray-400 p-2 rounded-lg cursor-pointer">
                  {copied ? (
                    <CopyCheckIcon className="text-gray-200 h-5 w-5" />
                  ) : (
                    <Copy className="text-gray-400 h-5 w-5" />
                  )}{" "}
                </div>
              </div>
              <div className="text-xs justify-end text-gray-500 absolute -bottom-4 right-14">
                {!copied ? "(Click to copy)" : "(Copied)"}
              </div>
            </div>
          </CopyToClipboard>
        </div>
        <div className="flex flex-col gap-2 mt-5">
          <div className="text-xl">Payment from Below Links</div>
          <Link
            to={appConfig.comofeedPaymentUrl}
            target="_blank"
            className="w-full">
            <Button className="!w-full !h-12 whitespace-nowrap text-sm bg-transparent font-semibold rounded-lg mt-5 p-[1px] px-5 flex items-center gap-2 bg-dark-3 hover:bg-dark-1">
              <img
                src="/assets/images/cosmofeed-logo.jpg"
                alt=""
                className="h-8 w-8 rounded-full"
              />{" "}
              Cosmofeed (UPI Available)
            </Button>
          </Link>
          <Link
            to={appConfig.groadPaymentUrl}
            target="_blank"
            className="w-full">
            <Button className="!w-full !h-12 whitespace-nowrap text-sm bg-transparent font-semibold rounded-lg mt-5 p-[1px] px-5 flex items-center gap-2 bg-dark-3 hover:bg-dark-1">
              <img
                src="/assets/images/gumroad-logo.png"
                alt=""
                className="h-8 w-8 rounded-full object-cover"
              />{" "}
              Gumroad
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
