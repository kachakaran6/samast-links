import { GripVertical, MoreVerticalIcon, PencilIcon } from "lucide-react";
import { AiOutlineDelete } from "react-icons/ai";
import Modal from "../shared/Modal";
import { useState } from "react";
import { linkBlocks } from "@/constants";
import { Separator } from "../ui/separator";
import { Switch } from "../ui/switch";
import { Label } from "../ui";
import { updateLinkBlockById } from "@/lib/appwrite/api";
import { useBlockContext } from "@/context/BlockContext";
import { showToast } from "@/lib/utils";
import { IoLockClosed } from "react-icons/io5";
import { useUserContext } from "@/context/AuthContext";
import { appConfig } from "@/lib/config/appConfig";
import { useNavigate } from "react-router-dom";

const LinkCard = ({ label, element }: any) => {
  return (
    <div className="flex flex-col gap-[2px] w-[65%]">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="flex gap-3 w-full truncate">
        {element?.val?.label && (
          <div className="text-md text-gray-300 whitespace-nowrap">
            {element?.val?.label} :
          </div>
        )}
        {element?.val?.text && (
          <>
            <div className="text-md text-gray-300 whitespace-nowrap">
              Text :
            </div>
            <div className="text-sm w-full text-gray-400 truncate">
              {element?.val?.text}
            </div>
          </>
        )}
        {element?.block_type != "github_repo_card" && element?.val?.link && (
          <div className="text-sm w-full text-gray-400 truncate">
            {element?.val?.link}
          </div>
        )}
        {element?.val?.size && !element?.val?.text && (
          <>
            <div className="text-md text-gray-300 whitespace-nowrap">
              Size :
            </div>
            <div className="text-sm w-full text-gray-400 truncate">
              {element?.val?.size == "sm" ? "Small" : "Medium"}
            </div>
          </>
        )}
        {element?.val?.username && (
          <>
            <div className="text-md text-gray-300 whitespace-nowrap">
              Username :
            </div>
            <div className="text-sm w-full text-gray-400 truncate">
              {element?.val?.username}
            </div>
          </>
        )}
        {element?.block_type == "github_repo_card" && element?.val?.link && (
          <>
            <div className="text-md text-gray-300 whitespace-nowrap">
              Repo :
            </div>
            <div className="text-sm w-full text-gray-400 truncate">
              {element?.val?.link}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const LinkBlockCard = ({
  element,
  onClick,
  index,
  deleteBlock,
  provided,
  isDeleting,
}: any) => {
  const { currentPlan } = useUserContext();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const { updateBlockDataById } = useBlockContext();
  const navigate = useNavigate();

  const handleSwitchChange = async (property: any, block: any, event: any) => {
    let tempBlock = JSON.parse(JSON.stringify({ ...block, [property]: event }));
    updateBlockDataById(block.$id, tempBlock);
    return;
    const updatedBlock = await updateLinkBlockById(
      JSON.parse(JSON.stringify(tempBlock)),
      block.block_order,
      tempBlock.link_id
    );

    if (updatedBlock) {
      showToast({
        msg: "Block Updated Successfully",
      });
    } else {
      showToast({
        msg: "Failed to update block. Please try again after sometime",
        isError: true,
      });
      updateBlockDataById(block.$id, block);
    }
  };
  return (
    <>
      <div
        className={`flex items-center flex-col overflow-hidden justify-between gap-2 p-2 px-5 cursor-pointer bg-dark-3 border-dark-4  transition-all hover:border-dashed border-2 w-[400px] max-w-full group mx-auto rounded-lg text-sm ${
          !appConfig.isLocal ||
          !expanded ||
          ["text", "divider"].includes(element?.block_type)
            ? "h-14"
            : "h-[156px]"
        }`}>
        <div
          className="flex items-center gap-3 w-[400px] max-w-full"
          onClick={() => {
            setExpanded(!expanded);
          }}>
          <div {...provided.dragHandleProps} className="h-full flex-center">
            <GripVertical className="h-5 text-gray-500 group-hover:text-gray-300 transition-all " />
          </div>
          {linkBlocks.map(
            (link: any) =>
              link.block_type == element.block_type && (
                <LinkCard
                  key={link?.block_type}
                  label={link?.name}
                  element={element}
                />
              )
          )}
          <div className="ml-auto flex-center gap-2">
            <PencilIcon
              onClick={() => {
                onClick(element, index);
              }}
              className="h-5 text-gray-500 group-hover:text-gray-400 transition-all"
            />
            <AiOutlineDelete
              onClick={() => {
                setOpenDeleteModal(true);
              }}
              className="text-[20px] leading-5 text-red opacity-75 group-hover:opacity-100 transition-all"
            />
            {appConfig.isLocal &&
              !["text", "divider"].includes(element?.block_type) && (
                <MoreVerticalIcon className="text-[20px] leading-5 text-gray-500 opacity-75 group-hover:opacity-100 transition-all" />
              )}
          </div>
        </div>
        <Separator className="my-0" />
        <div
          className={`flex p-1 flex-row items-center justify-between w-full`}>
          <Label
            htmlFor={`is-private-${element?.$id}_${index}`}
            className="text-[14px] text-gray-400">
            Private
          </Label>
          <Switch
            id={`is-private-${element?.$id}_${index}`}
            checked={element?.is_private}
            value={element?.is_private ? element?.is_private : false}
            onCheckedChange={(event) => {
              handleSwitchChange("is_private", element, event);
            }}
          />
        </div>

        <Separator className="my-0" />
        {/* <div
          className={`flex p-1 flex-row items-center justify-between w-full`}>
          <Label
            htmlFor={`is-featured-${element?.$id}_${index}`}
            className="text-[14px] text-gray-400">
            Featured
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
              id={`is-featured-${element?.$id}_${index}`}
              checked={element?.is_featured}
              value={element?.is_featured ? element?.is_featured : false}
              onCheckedChange={(event) => {
                handleSwitchChange("is_featured", element, event);
              }}
            />
          )}
        </div> */}
        <div
          className={`flex p-1 flex-row items-center justify-between w-full`}>
          <Label
            htmlFor={`is-featured-${element?.$id}_${index}`}
            className="text-[14px] text-gray-400">
            Featured
          </Label>
          {currentPlan == "free" ? (
            <>
              <div
                onClick={() => {
                  if (currentPlan == "free") {
                    navigate("/subscription");
                  }
                }}
                className="flex gap-1 items-center bg-dark-4 p-1 rounded px-4">
                <IoLockClosed className="h-4 w-4 text-primary" />
                <div className="text-gradient">Pro</div>
              </div>
            </>
          ) : (
            <Switch
              id={`is-featured-${element?.$id}_${index}`}
              checked={element?.is_featured}
              value={element?.is_featured ? element?.is_featured : false}
              onCheckedChange={(event) => {
                handleSwitchChange("is_featured", element, event);
              }}
            />
          )}
        </div>

        {/* <Separator className="my-0" /> */}
        {/* <div
          className={`flex p-1 flex-row items-center justify-between w-full`}>
          <Label className="text-[14px] text-gray-400">Total Clicks</Label>
          <span>{element?.total_clicks ?? "0"}</span>
        </div> */}
      </div>
      <Modal
        variant="danger"
        label="Delete"
        desc="Are you sure you want to delete this block?"
        submitBtnLabel="Delete"
        isSubmitLoading={isDeleting}
        loadingText="Deleting..."
        onSubmit={() => {
          deleteBlock(index, element.$id).then(() => {
            setOpenDeleteModal(false);
          });
        }}
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}></Modal>
    </>
  );
};

export default LinkBlockCard;
