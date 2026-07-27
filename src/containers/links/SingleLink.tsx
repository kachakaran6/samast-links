import { Loader } from "@/components/shared";
import { CustomSelect } from "@/components/shared/CustomSelect";
import { Button } from "@/components/ui";
import { useLinkContext } from "@/context/LinkContext";
import { Suspense, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getLinkBlocksByLinkId } from "@/lib/appwrite/api";
import { manageLinkBlock } from "@/lib/appwrite/api";
import { Customize, ManageLink, Preview, Stats } from "..";
import { useBlockContext } from "@/context/BlockContext";
import { showToast } from "@/lib/utils";
import ManageBlocks from "./blocks/ManageBlocks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SocialMediaSettings from "../settings/SocialMediaSettings";
import AdvancedLinkSettings from "./tabs/AdvancedLinkSettings";
import SeoForm from "./tabs/SeoForm";
import { useUserContext } from "@/context/AuthContext";
import UpgradeToPro from "@/components/shared/UpgradeToPro";
import { appConfig } from "@/lib/config/appConfig";

const SingleLink = () => {
  const { links, linksLoading, updateLinkById } = useLinkContext();
  const navigate = useNavigate();
  const { currentPlan } = useUserContext();
  const { link_id } = useParams();
  const [blocksLoading, setBlocksLoading] = useState(true);
  const [selectedLink, setSelectedLink] = useState<any>({});
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [isBtnClicked, setIsBtnClicked] = useState(false);
  const [currentTab, setCurrentTab] = useState("");
  const [windowInnerWidth, setWindowInnerWidth] = useState(window.innerWidth);
  const { blocks, setBlocks } = useBlockContext();

  let updatingData = false;

  const handleBtnClicked = (): any => {
    if (!currentTab || currentTab == "blocks") {
      saveBlocks();
    }
    setIsBtnClicked(true);
  };

  const saveBlocks = async () => {
    if (updatingData) return;
    let tempLink = links.filter(
      (ele: any) => selectedLink?.slug == ele?.slug
    )[0];
    if (tempLink) {
      updatingData = true;
      setIsBtnLoading(true);
      const managedBlocks = await manageLinkBlock(
        JSON.parse(JSON.stringify(blocks)),
        selectedLink?.$id
      );
      setBlocks(JSON.parse(JSON.stringify(managedBlocks)));
      selectedLink.blocksData = [...managedBlocks];

      updateLinkById(selectedLink?.$id, selectedLink);

      if (managedBlocks) {
        showToast({
          msg: "Link updated successfully",
        });
        setIsBtnLoading(false);
        updatingData = false;
      } else {
        showToast({
          msg: "Failed to update link! Please try again.",
          isError: true,
        });
        setIsBtnLoading(false);
        updatingData = false;
      }
    }
  };

  const handleSelect = (data: any) => {
    let tempLink = links.filter((ele: any) => ele?.slug == data)[0];
    setSelectedLink(tempLink);
  };

  useEffect(() => {
    if (linksLoading) return;
    if (links?.length > 0) {
      let findLinkById = links.filter((ele: any) => link_id == ele.$id)[0];
      if (findLinkById) {
        setSelectedLink(findLinkById);
      } else {
        setSelectedLink(links[0]);
      }
      if (!links.some((ele: any) => location.pathname.includes(ele.$id))) {
        navigate("/link/" + links[0]?.$id, { replace: true });
      }
    } else {
      navigate("/link/create", { replace: true });
    }
  }, [links]);

  useEffect(() => {
    handleChangeLink();
  }, [selectedLink]);

  const handleChangeLink = () => {
    setBlocks([]);
    if (selectedLink?.$id) {
      getBlocks();
      if (!location.pathname.includes(selectedLink?.$id)) {
        navigate("/link/" + selectedLink?.$id, { replace: true });
      }
    }
  };

  const getBlocks = async () => {
    setBlocksLoading(true);
    if (!selectedLink?.blocksData) {
      let blocks: any = await getLinkBlocksByLinkId(selectedLink?.$id);
      selectedLink.blocksData = blocks;
      setBlocksLoading(false);
      if (blocks?.length > 0) {
        setBlocks(blocks);
      }
    } else {
      setBlocksLoading(false);
      if (selectedLink?.blocksData?.length > 0) {
        setBlocks(selectedLink?.blocksData);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowInnerWidth(window.innerWidth);
    });
    return () => {
      window.removeEventListener("resize", () => {
        setWindowInnerWidth(window.innerWidth);
      });
    };
  }, []);

  return (
    <>
      <div className="flex max-md:flex-col md:max-w-[calc(100%-320px)]">
        <div className=" w-full max-w-[100vw] h-full">
          <div className="flex bg-dark-1 z-[2] sticky top-[56px] py-2 left-0 right-0 flex-col w-full gap-3 h-max px-1">
            <div className="flex items-center justify-between md:justify-center gap-5 flex-wrap">
              {links?.length > 1 ? (
                <div className="w-[60%]">
                  <CustomSelect
                    onSelect={handleSelect}
                    placeholder={"Select any Link"}
                    items={links}
                    bind_label={"slug"}
                    bind_value={"slug"}
                    value={selectedLink?.slug}></CustomSelect>
                </div>
              ) : (
                <div className="w-[60%] truncate py-2">
                  {window.location.origin + "/" + selectedLink?.slug}
                </div>
              )}
              <Button
                className="whitespace-nowrap transition-all !h-9 flex !gap-3 items-center shad-button_primary  !text-xs text-gray-300 !px-4 min-w-[100px] max-sm:w-[30%] max-sm:min-w-[30%]"
                variant={"ghost"}
                onClick={() => {
                  handleBtnClicked();
                }}
                type="submit"
                form="hook-form"
                disabled={isBtnLoading}>
                {isBtnLoading ? (
                  <Loader height={20} width={20} />
                ) : currentTab == "stats" ? (
                  "Refresh"
                ) : (
                  "Update"
                )}
              </Button>
            </div>
          </div>
          <Tabs
            defaultValue="blocks"
            className="w-full"
            onValueChange={(data: any) => {
              setCurrentTab(data);
            }}>
            <TabsList className="w-full flex items-center sticky top-[112px] z-[10] justify-start h-max bg-dark-2 scrollbar-none overflow-x-auto">
              <TabsTrigger
                value="blocks"
                className="flex-grow py-3 text-gray-400 hover:text-gray-200 hover:border-b-gray-400">
                All Blocks
              </TabsTrigger>
              {appConfig.isLocal ? (
                <>
                  <TabsTrigger
                    value="customize"
                    className="flex-grow py-3 text-gray-400 hover:text-gray-200 hover:border-b-gray-400">
                    Customize
                  </TabsTrigger>
                  <TabsTrigger
                    value="stats"
                    className="flex-grow py-3 text-gray-400 hover:text-gray-200 hover:border-b-gray-400">
                    Stats
                  </TabsTrigger>
                </>
              ) : (
                <></>
              )}
              <TabsTrigger
                value="edit-link"
                className="flex-grow py-3 text-gray-400 hover:text-gray-200 hover:border-b-gray-400">
                Edit Link
              </TabsTrigger>
              <TabsTrigger
                value="social-media"
                className="flex-grow py-3 text-gray-400 hover:text-gray-200 hover:border-b-gray-400">
                Social Media
              </TabsTrigger>
              <TabsTrigger
                value="seo"
                className="flex-grow py-3 text-gray-400 hover:text-gray-200 hover:border-b-gray-400">
                Advanced Seo
              </TabsTrigger>
              <TabsTrigger
                value="advanced"
                className="flex-grow py-3 text-gray-400 hover:text-gray-200 hover:border-b-gray-400">
                Advanced
              </TabsTrigger>
            </TabsList>
            <div className="w-full p-2 flex flex-col gap-2 bg-dark-2 rounded">
              <Suspense
                fallback={
                  <div className="flex-center w-full h-full min-h-screen">
                    <Loader />
                  </div>
                }>
                <TabsContent value="blocks" className="w-full">
                  {blocksLoading ? (
                    <div className="h-[500px] flex-center w-full">
                      <Loader />
                    </div>
                  ) : (
                    <ManageBlocks
                      selectedLink={selectedLink}
                      windowInnerWidth={windowInnerWidth}
                    />
                  )}
                </TabsContent>
                <TabsContent value="edit-link" className="w-full">
                  <ManageLink setBtnLoading={setIsBtnLoading} />
                </TabsContent>
                <TabsContent value="social-media" className="w-full">
                  <SocialMediaSettings
                    selectedLink={selectedLink}
                    setBtnLoading={setIsBtnLoading}
                  />
                </TabsContent>
                <TabsContent value="customize" className="w-full">
                  <Customize />
                </TabsContent>
                <TabsContent value="stats" className="w-full">
                  {currentPlan != "free" ? (
                    <Stats
                      setBtnLoading={setIsBtnLoading}
                      refreshStats={isBtnClicked}
                      setIsBtnClicked={setIsBtnClicked}
                      selectedLink={selectedLink}
                    />
                  ) : (
                    <UpgradeToPro reason="Stats is available in pro plan" />
                  )}
                </TabsContent>
                <TabsContent value="seo" className="w-full">
                  {currentPlan != "free" ? (
                    <SeoForm
                      selectedLink={selectedLink}
                      setBtnLoading={setIsBtnLoading}
                    />
                  ) : (
                    <UpgradeToPro reason="SEO is available in pro plan" />
                  )}
                </TabsContent>
                <TabsContent value="advanced" className="w-full">
                  <AdvancedLinkSettings
                    setBtnLoading={setIsBtnLoading}
                    setIsBtnClicked={setIsBtnClicked}
                    isBtnClicked={isBtnClicked}
                    link={selectedLink}
                  />
                </TabsContent>
              </Suspense>
            </div>
          </Tabs>
        </div>
        <div className="hidden md:block max-w-[320px] fixed right-0 top-[56px] bg-slate-950 bottom-0 p-0">
          <div className="my-1 text-center text-xl">Preview</div>
          {windowInnerWidth > 768 && (
            <Preview
              link={
                window.location.origin +
                "/" +
                selectedLink?.slug +
                "?dHlwZT1wcmV2aWV3&previewPage"
              }
              originalLink={window.location.origin + "/" + selectedLink?.slug}
              blocks={blocks}
              linkData={selectedLink}
              previewOpen={true}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default SingleLink;
