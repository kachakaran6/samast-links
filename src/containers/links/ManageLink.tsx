import LinkForm from "@/components/forms/LinkForm";
import { BlockProvider } from "@/context/BlockContext";
import { Link, useParams } from "react-router-dom";
import UpgradeToPro from "@/components/shared/UpgradeToPro";
import { useLinkContext } from "@/context/LinkContext";
// import { useUserContext } from "@/context/AuthContext";
import { IoLockClosed } from "react-icons/io5";
import { Button } from "@/components/ui";
import { useUserContext } from "@/context/AuthContext";

const MaximumLimitReached = () => {
  return (
    <>
      <div className="max-sm:px-2 p-5 flex-col gap-2 flex-center text-center w-full">
        <div className="">
          <IoLockClosed className="h-8 w-8" />
        </div>
        <div className="text-xl text-gray-400 font-medium">Limit Reached</div>
        <div className="text-lg text-gray-500">
          You've reached your limit of maximum 5 links in <b>Pro</b> plan
        </div>
        <Link
          to={"/link/all"}
          className="mt-5 bg-[linear-gradient(50deg,_#bc48ff_0%,_#1ca9c9_50%)] p-[1px] rounded-[9px]">
          <Button className="!h-12 px-6 whitespace-nowrap w-full text-sm font-semibold rounded-lg bg-transparent">
            View Links
          </Button>
        </Link>
      </div>
    </>
  );
};

const ManageLink = ({ setBtnLoading }: any) => {
  const { link_id } = useParams();
  const { links, linksLoading } = useLinkContext();
  const { currentPlan } = useUserContext();
  if (!link_id && !linksLoading) {
    if (links?.length > 1 && currentPlan == "free") {
      return <UpgradeToPro reason="Link limit reached" />;
    } else if (links?.length > 4 && currentPlan == "pro") {
      return <MaximumLimitReached />;
    }
  }

  return (
    <>
      <BlockProvider>
        <div className="md:p-8 p-4 w-full h-max max-w-5xl mx-auto">
          <div className="w-full border border-gray-700 p-5 rounded-xl h-max">
            <LinkForm
              action={link_id ? "Update" : "Create"}
              link_id={link_id}
              setUpdateLoading={setBtnLoading}
            />
          </div>
        </div>
      </BlockProvider>
    </>
  );
};

export default ManageLink;
