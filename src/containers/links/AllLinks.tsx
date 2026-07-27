import { useLinkContext } from "@/context/LinkContext";
import { useEffect } from "react";
import { Button, Label } from "@/components/ui";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ArrowDown } from "lucide-react";
import { useUpdateLink } from "@/lib/react-query/queries";
import { showToast } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { IoLockClosed, IoStatsChart } from "react-icons/io5";
import { useUserContext } from "@/context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

const AllLinks = () => {
  const navigate = useNavigate();
  const { currentPlan } = useUserContext();
  const { links, linksLoading, updateLinkById } = useLinkContext();
  const { mutateAsync: updateLink } = useUpdateLink();

  const handleSwitchChange = async (property: any, link: any, event: any) => {
    let newLink = { ...link, [property]: event };
    updateLinkById(link.$id, newLink);
    const updatedLink = await updateLink({
      ...newLink,
      linkId: newLink.$id,
      imageId: newLink.imageId,
      imageUrl: newLink.imageUrl,
      userId: newLink.userId,
      is_show_social_icons: newLink.is_show_social_icons,
      is_show_verified_icon:
        currentPlan == "free" ? false : newLink.is_show_verified_icon,
      is_show_watermark:
        currentPlan == "free" ? true : newLink.is_show_watermark,
    });

    if (updatedLink) {
      showToast({
        msg: "Link updated successfully",
      });
    } else {
      showToast({
        msg: "Failed to update link! Please try again.",
        isError: true,
      });
    }
  };

  const handleAccordionChange = (link: any) => {
    let newLink = { ...link, isCollapsed: link?.isCollapsed ? false : true };
    updateLinkById(link.$id, newLink);
  };

  useEffect(() => {
    if (!linksLoading && links?.length == 0) {
      navigate("/link/create", { replace: true });
    }
  }, [links]);

  return (
    <>
      <div className="max-sm:px-2 p-5 w-full flex flex-col gap-5 md:w-[90%] mx-auto">
        {links?.length > 0 && (
          <div className="flex items-center justify-between">
            <div className="text-2xl">
              Your All <span className="text-primary-500">Links</span>
            </div>
            <Link
              onClick={(event: any) => {
                event.stopPropagation();
              }}
              to={`/link/create`}>
              <Button className="shad-button_primary block-shadow !py-1 h-10 flex gap-2">
                Create Link
              </Button>
            </Link>
          </div>
        )}
        {linksLoading ? (
          <div className="w-full flex-center flex-wrap gap-5">
            <Skeleton className="flex items-center justify-between bg-dark-3 block-shadow p-3 rounded-xl px-3 w-full  relative border border-transparent hover:border-dark-4" />
          </div>
        ) : (
          <div className="w-full flex-center flex-wrap gap-5">
            {links?.length > 0 &&
              links.map((link: any) => (
                <div
                  key={link.$id}
                  className="flex items-center justify-between bg-dark-3 block-shadow p-3 rounded-xl px-3 w-full  relative border border-transparent hover:border-dark-4">
                  <div className={`flex flex-col w-full`}>
                    <div
                      onClick={() => {
                        handleAccordionChange(link);
                      }}
                      className="flex items-center justify-start gap-5 cursor-pointer">
                      <div className="min-h-[2.5rem] min-w-[2.5rem] h-10 w-10 overflow-hidden rounded-full flex-center object-contain">
                        <img src={link?.imageUrl} className="h-full w-full" />
                      </div>
                      <div className="w-full max-sm:w-[250px]">
                        <div className="text-lg w-max">{link?.title}</div>
                        <div className="w-[50%] max-sm:w-[95%] max-w-max">
                          <Link
                            onClick={(e: any) => {
                              e.stopPropagation();
                            }}
                            to={window.location.origin + "/" + link?.slug}
                            target="_blank">
                            <div
                              className="text-sm font-normal text-gray-500 whitespace-nowrap w-full truncate"
                              data-tooltip-id="tooltip"
                              data-tooltip-content={
                                window.location.origin + "/" + link?.slug
                              }>
                              {window.location.origin + "/" + link?.slug}
                            </div>
                          </Link>
                        </div>
                      </div>
                      <div
                        className={`items-center justify-end w-full gap-3 hidden ${
                          link.isCollapsed ? "sm:flex" : ""
                        }`}>
                        <Link
                          onClick={(event: any) => {
                            event.stopPropagation();
                          }}
                          to={`/link/${link.$id}`}>
                          <Button className="shad-button_primary block-shadow !py-1 h-8 flex gap-2">
                            Edit Blocks
                          </Button>
                        </Link>
                        <Link
                          onClick={(event: any) => {
                            event.stopPropagation();
                          }}
                          to={`/statistics/${link.$id}`}>
                          <Button className="bg-transparent border border-gray-500  block-shadow !py-1 h-8 flex gap-2">
                            <IoStatsChart /> Stats
                          </Button>
                        </Link>
                      </div>
                    </div>
                    <div
                      className={`transition-all overflow-hidden ${
                        link?.isCollapsed
                          ? "h-0 min-h-0 max-h-0"
                          : "mt-2 h-[288px] min-h-[288px] max-h-[288px]"
                      }`}>
                      <Separator className="mt-2 mb-3" />
                      <div
                        className={`flex p-3 py-2 flex-row items-center justify-between w-full`}>
                        <Label
                          htmlFor="social-media"
                          className="text-[14px] sm:text-base text-gray-400">
                          Show social media link icons
                        </Label>
                        <Switch
                          id="social-media"
                          checked={link?.is_show_social_icons}
                          value={
                            link?.is_show_social_icons
                              ? link?.is_show_social_icons
                              : false
                          }
                          onCheckedChange={(event) => {
                            handleSwitchChange(
                              "is_show_social_icons",
                              link,
                              event
                            );
                          }}
                        />
                      </div>
                      <Separator className="my-3" />
                      <div
                        onClick={() => {
                          if (currentPlan == "free") {
                            navigate("/subscription");
                          }
                        }}
                        className={`flex p-3 py-2 flex-row items-center justify-between w-full  ${
                          currentPlan == "free" ? "cursor-pointer" : ""
                        }`}
                        data-tooltip-id="tooltip"
                        data-tooltip-content={
                          currentPlan == "free" ? "Upgrade to Pro" : ""
                        }>
                        <Label
                          htmlFor="verfied-icon"
                          className="text-[14px] sm:text-base text-gray-400">
                          Show Verified Badge
                        </Label>
                        {currentPlan == "free" ? (
                          <>
                            <div className="flex gap-1 items-center bg-dark-4 p-1 rounded px-4">
                              <IoLockClosed className="h-4 w-4 text-primary" />
                              <div className="text-gradient">Pro</div>
                            </div>
                          </>
                        ) : (
                          <Switch
                            id="verfied-icon"
                            checked={link?.is_show_verified_icon}
                            value={
                              link?.is_show_verified_icon
                                ? link?.is_show_verified_icon
                                : false
                            }
                            onCheckedChange={(event) => {
                              handleSwitchChange(
                                "is_show_verified_icon",
                                link,
                                event
                              );
                            }}
                          />
                        )}
                      </div>
                      <Separator className="my-3" />
                      <div
                        onClick={() => {
                          if (currentPlan == "free") {
                            navigate("/subscription");
                          }
                        }}
                        className={`flex p-3 py-2 flex-row items-center justify-between w-full  ${
                          currentPlan == "free" ? "cursor-pointer" : ""
                        }`}
                        data-tooltip-id="tooltip"
                        data-tooltip-content={
                          currentPlan == "free" ? "Upgrade to Pro" : ""
                        }>
                        <Label
                          htmlFor="verfied-icon"
                          className="text-[14px] sm:text-base text-gray-400">
                          Linkmonks Branding
                        </Label>

                        {currentPlan == "free" ? (
                          <>
                            <div className="flex gap-1 items-center bg-dark-4 p-1 rounded px-4">
                              <IoLockClosed className="h-4 w-4 text-primary" />
                              <div className="text-gradient">Pro</div>
                            </div>
                          </>
                        ) : (
                          <Switch
                            id="verfied-icon"
                            checked={link?.is_show_watermark}
                            value={
                              link?.is_show_watermark
                                ? link?.is_show_watermark
                                : false
                            }
                            onCheckedChange={(event) => {
                              handleSwitchChange(
                                "is_show_watermark",
                                link,
                                event
                              );
                            }}
                          />
                        )}
                      </div>
                      <Separator className="my-3" />
                      <div className="w-full flex items-center justify-between p-3 py-2">
                        <div className="text-gray-400 sm:block hidden">
                          Actions
                        </div>
                        <div className="flex w-max max-sm:w-full gap-2 items-center flex-wrap max-sm:justify-between">
                          <Link
                            onClick={(event: any) => {
                              event.stopPropagation();
                            }}
                            to={`/link/${link.$id}`}>
                            <Button className="shad-button_primary block-shadow !py-1 flex gap-2 h-10">
                              Edit Blocks
                            </Button>
                          </Link>
                          <Button
                            onClick={() => {
                              // setOpenDeleteModal(true);
                              // setSelectedIdToDelete(link?.$id);
                            }}
                            className="bg-red hover:bg-transparent border border-transparent hover:border-red  hover:text-red text-white  block-shadow !py-1 h-10 flex gap-2 transition-all">
                            {/* {isDeleting && selectedIdToDelete == link?.$id ? (
                              <>
                                <Loader /> Deleting...
                              </>
                            ) : (
                              <>
                                Delete
                                <AiOutlineDelete className="h-6 flex-center w-6 cursor-pointer leading-5 opacity-75 group-hover:opacity-100" />
                              </>
                            )} */}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -bottom-3 left-0 right-0 flex-center">
                    <ArrowDown
                      onClick={() => {
                        handleAccordionChange(link);
                      }}
                      className={`${
                        link?.isCollapsed ? "" : "rotate-180"
                      } bg-dark-2 h-6 w-6 rounded-full p-1 transition-all cursor-pointer`}
                    />
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AllLinks;
