import { LinkBlocks, LinkBlocksInputs } from "@/components";
import LinkBlockCard from "@/components/link/LinkBlockCard";
import { CustomSheet } from "@/components/shared";
import Modal from "@/components/shared/Modal";
import { Button } from "@/components/ui";
import { Plus } from "lucide-react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import { useBlockContext } from "@/context/BlockContext";
import { linkBlocks } from "@/constants";
import { useNavigate } from "react-router-dom";
import { Preview } from "@/containers";

const ManageBlocks = ({ selectedLink, windowInnerWidth }: any) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState<any>({});
  const [openFormModal, setOpenFormModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<any>(null);
  const [previewOpen, setpreviewOpen] = useState(false);
  const navigate = useNavigate();

  const {
    addBlock,
    blocks,
    updateValueAtIndex,
    setBlocks,
    deleteBlock,
    isDeleting,
  } = useBlockContext();

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const newBlocksArr = Array.from(blocks);
    const [removed] = newBlocksArr.splice(result.source.index, 1);
    newBlocksArr.splice(result.destination.index, 0, removed);
    setBlocks(newBlocksArr);
  };

  const handleAddBlock = (block: any) => {
    setSelectedBlock(block);
    setOpenFormModal(true);
    setOpenModal(false);
  };

  const handleBlockCardClick = (ele: any, index: any) => {
    let foundObject: any = linkBlocks.find(
      (item) => item.block_type === ele.block_type
    );
    foundObject = { ...foundObject, val: ele.val };
    setSelectedBlock(foundObject);
    setOpenFormModal(true);
    setSelectedIndex(index);
  };

  const handleBlockInputChange = (name: any, value: any) => {
    setSelectedBlock((prevElement: any) => ({
      ...prevElement,
      val: {
        ...prevElement.val,
        [name]: value,
      },
    }));
  };

  const handeBlockFormSubmit = async (value: any) => {
    let tempBlock = { ...selectedBlock, val: value };
    if (selectedIndex || selectedIndex == 0) {
      updateValueAtIndex(selectedIndex, value);
    } else {
      addBlock(tempBlock);
    }
    setSelectedBlock({});
    setOpenFormModal(false);
  };

  const handleKeyDown = async (event: any) => {
    if (event.ctrlKey && ["s", "b", "m", "/"].includes(event.key)) {
      event.preventDefault();
      if (event.key == "b") {
        window.open(
          window.location.origin + "/" + selectedLink?.slug,
          "_blank"
        );
      } else if (event.key == "m") {
        navigate("/link/edit/" + selectedLink?.$id, { replace: true });
      } else if (event.key == "/") {
        setOpenModal(true);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedLink]);

  useEffect(() => {
    if (!openFormModal) {
      setSelectedIndex(null);
    }
  }, [openFormModal]);

  useEffect(() => {
    window.addEventListener("showPreview", () => {
      setpreviewOpen(true);
    });
  }, []);

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable-1" type="PERSON">
          {(provided: any) => (
            <>
              <div
                className="h-full flex flex-col"
                {...provided.droppableProps}
                ref={provided.innerRef}>
                {blocks &&
                  blocks?.length > 0 &&
                  blocks.map((ele: any, i) => (
                    <Draggable key={i} draggableId={i.toString()} index={i}>
                      {(provided: any) => (
                        <div
                          className="mb-4"
                          ref={provided.innerRef}
                          {...provided.draggableProps}>
                          <LinkBlockCard
                            index={i}
                            isDeleting={isDeleting}
                            provided={provided}
                            element={ele}
                            onClick={handleBlockCardClick}
                            deleteBlock={deleteBlock}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
                {blocks?.length == 0 && (
                  <div className="h-[calc(100vh-320px)] w-full flex flex-col items-center justify-center gap-2">
                    <div className="text-gray-400 font-medium border-b border-b-dark-4">
                      No Blocks
                    </div>
                  </div>
                )}
                <Button
                  className="btn-shadow whitespace-nowrap transition-all !h-12 border-primary border hover:!bg-dark-2 w-full flex !items-center !justify-center !gap-3  shad-button_ghost bg-dark-2 !text-md sticky max-sm:bottom-[60px] bottom-[10px] text-gray-500 !px-3 sm:max-w-[350px] mx-auto"
                  onClick={() => {
                    setOpenModal(true);
                  }}>
                  Add a Block <Plus className="h-3 w-3 text-gray-500" />
                </Button>
              </div>
            </>
          )}
        </Droppable>
      </DragDropContext>

      <Modal
        label="Add Block"
        desc="Click on any block to add."
        open={openModal}
        hideActions
        setOpen={setOpenModal}>
        <LinkBlocks onClick={handleAddBlock} />
      </Modal>
      <Modal
        label={selectedBlock?.name}
        desc={selectedBlock?.name}
        open={openFormModal}
        submitBtnLabel="Add"
        closeBtnLabel="Cancel"
        hideActions
        setOpen={setOpenFormModal}>
        <LinkBlocksInputs
          element={selectedBlock}
          handleBlockInputChange={handleBlockInputChange}
          setOpen={setOpenFormModal}
          handeBlockFormSubmit={handeBlockFormSubmit}
          selectedIndex={selectedIndex}
        />
      </Modal>
      {windowInnerWidth < 768 && (
        <CustomSheet
          title={"Preview"}
          side={"bottom"}
          isOpen={previewOpen && windowInnerWidth < 768}
          headerClass={"!py-2 !bg-slate-950"}
          onToggle={(data: boolean) => {
            setpreviewOpen(data);
          }}
          drawerClass={
            "!bg-dark-1 h-full md:hidden border-none !duration-200 px-0 w-full"
          }>
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
            previewOpen={previewOpen && windowInnerWidth < 768}
          />
        </CustomSheet>
      )}
    </div>
  );
};

export default ManageBlocks;
