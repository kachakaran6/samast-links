import { CustomInput, Loader } from "@/components/shared";
import Modal from "@/components/shared/Modal";
import { Button, Form, Label } from "@/components/ui";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useUserContext } from "@/context/AuthContext";
import { useLinkContext } from "@/context/LinkContext";
import { updateLink } from "@/lib/supabase/api";
import { useDeleteLink } from "@/lib/react-query/queries";
import { showToast } from "@/lib/utils";
import { googleAnalyticsValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineDelete } from "react-icons/ai";
import { IoLockClosed } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const AdvancedLinkSettings = ({
  link,
  setBtnLoading,
  isBtnClicked,
  setIsBtnClicked,
}: any) => {
  const navigate = useNavigate();
  const { updateLinkById, removeLinkById } = useLinkContext();
  const { currentPlan } = useUserContext();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedIdToDelete, setSelectedIdToDelete] = useState("");
  const { mutateAsync: deleteLinkById, isLoading: isDeleting } =
    useDeleteLink();
  const analyticsForm = useForm<z.infer<typeof googleAnalyticsValidation>>({
    resolver: zodResolver(googleAnalyticsValidation),
    defaultValues: {
      ga_tag: link?.ga_tag || "",
    },
  });

  const handleDeleteModal = async () => {
    if (!isDeleting && selectedIdToDelete) {
      const isDeleted = await deleteLinkById(link);
      if (isDeleted) {
        removeLinkById(selectedIdToDelete);
        showToast({ msg: "Link Deleted Successfully" });
      } else {
        showToast({
          msg: "Failed to delete link. Please try again after sometime",
          isError: true,
        });
      }
      setOpenDeleteModal(false);
      setSelectedIdToDelete("");
    }
  };

  useEffect(() => {
    if (!openDeleteModal) {
      setSelectedIdToDelete("");
    }
  }, [openDeleteModal]);

  useEffect(() => {
    if (isBtnClicked) {
      handleUpdateLink();
    }
  }, [isBtnClicked]);

  const handleUpdateLink = async () => {
    setBtnLoading(true);
    const { ga_tag } = analyticsForm.getValues();
    const updatedLink = await updateLink({
      ...link,
      linkId: link.$id,
      is_show_social_icons: link.is_show_social_icons,
      is_show_verified_icon:
        currentPlan == "free" ? false : link.is_show_verified_icon,
      is_show_watermark: currentPlan == "free" ? true : link.is_show_watermark,
      ga_tag: ga_tag || "",
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
    setIsBtnClicked(false);
    setBtnLoading(false);
  };
  const handleSwitchChange = async (property: any, link: any, event: any) => {
    let newLink = { ...link, [property]: event };
    updateLinkById(link.$id, newLink);
  };

  return (
    <div>
      <div className="mt-3 mb-2 text-xl text-gray-400 text-center">
        General Settings
      </div>
      <div className={`flex p-3 flex-row items-center justify-between w-full`}>
        <Label
          htmlFor="social-media"
          className="text-[14px] sm:text-base text-gray-400">
          Show social media icons
        </Label>
        <Switch
          id="social-media"
          checked={link?.is_show_social_icons}
          value={
            link?.is_show_social_icons ? link?.is_show_social_icons : false
          }
          onCheckedChange={(event) => {
            handleSwitchChange("is_show_social_icons", link, event);
          }}
        />
      </div>
      <Separator className="my-0" />
      <div
        onClick={() => {
          if (currentPlan == "free") {
            navigate("/subscription");
          }
        }}
        className={`flex p-3 flex-row items-center justify-between w-full  ${
          currentPlan == "free" ? "cursor-pointer" : ""
        }`}
        data-tooltip-id="tooltip"
        data-tooltip-content={currentPlan == "free" ? "Upgrade to Pro" : ""}>
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
              link?.is_show_verified_icon ? link?.is_show_verified_icon : false
            }
            onCheckedChange={(event) => {
              handleSwitchChange("is_show_verified_icon", link, event);
            }}
          />
        )}
      </div>
      <Separator className="my-0" />
      <div
        onClick={() => {
          if (currentPlan == "free") {
            navigate("/subscription");
          }
        }}
        className={`flex p-3 flex-row items-center justify-between w-full  ${
          currentPlan == "free" ? "cursor-pointer" : ""
        }`}
        data-tooltip-id="tooltip"
        data-tooltip-content={currentPlan == "free" ? "Upgrade to Pro" : ""}>
        <Label
          htmlFor="linkmonks-branding"
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
            id="linkmonks-branding"
            checked={link?.is_show_watermark}
            value={link?.is_show_watermark ? link?.is_show_watermark : false}
            onCheckedChange={(event) => {
              handleSwitchChange("is_show_watermark", link, event);
            }}
          />
        )}
      </div>
      <Separator className="my-3" />
      <div className="mt-3 mb-2 text-xl text-gray-400 text-center">
        Third Party Analytics
      </div>
      {currentPlan == "free" ? (
        <>
          <div
            onClick={() => {
              if (currentPlan == "free") {
                navigate("/subscription");
              }
            }}
            className="flex gap-1 items-center bg-dark-4 p-2 rounded px-4 cursor-pointer">
            <IoLockClosed className="h-4 w-4 text-primary" />
            <div className="text-gradient">Upgrade to Pro</div>
          </div>
        </>
      ) : (
        <Form {...analyticsForm}>
          <form
            id="hook-form"
            onSubmit={(event) => {
              event?.preventDefault();
            }}
            className="flex flex-col gap-9 w-full">
            <div className="flex gap-3 flex-col">
              <CustomInput
                placeholder="Enter GA Tag"
                control={analyticsForm.control}
                className="!max-h-10 !mt-[2px]"
                name="ga_tag"
                label="GA Tag"
              />
            </div>
          </form>
        </Form>
      )}
      <Separator className="my-3" />
      <div className="mt-3 mb-2 text-xl text-gray-400 text-center">
        Danger zone
      </div>
      <div className="w-full flex items-center gap-3 justify-between p-3 py-2 border-red/50 border rounded-lg">
        <div className="flex flex-col gap-1">
          <div className="text-gray-400 text-sm">Delete link</div>
          <div className="text-gray-500 text-xs">
            This link and all its associated data will be permanently deleted.
          </div>
        </div>
        <div className="flex w-max max-sm:w-full gap-2 items-center justify-end">
          <Button
            onClick={() => {
              setOpenDeleteModal(true);
              setSelectedIdToDelete(link?.$id);
            }}
            className="bg-red hover:bg-transparent border border-transparent hover:border-red  hover:text-red text-white  block-shadow !py-1 h-10 flex gap-2 transition-all">
            {isDeleting && selectedIdToDelete == link?.$id ? (
              <>
                <Loader /> Deleting...
              </>
            ) : (
              <>
                Delete
                <AiOutlineDelete className="h-6 flex-center w-6 cursor-pointer leading-5 opacity-75 group-hover:opacity-100" />
              </>
            )}
          </Button>
        </div>
      </div>

      <Modal
        variant="danger"
        label="Delete"
        desc="Are you sure you want to delete this link?"
        submitBtnLabel="Delete"
        isSubmitLoading={isDeleting}
        loadingText={"Deleting..."}
        onSubmit={() => {
          handleDeleteModal();
        }}
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}></Modal>
    </div>
  );
};

export default AdvancedLinkSettings;
