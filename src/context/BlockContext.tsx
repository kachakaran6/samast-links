import { deleteLinkBlockById } from "@/lib/appwrite/api";
import { showToast } from "@/lib/utils";
import { createContext, useContext, useState } from "react";

// Create a context
interface BlockContextProps {
  blocks: any[];
  isDeleting: boolean;
  setBlocks: React.Dispatch<React.SetStateAction<any>>;
  addBlock: (block: any) => void;
  deleteBlock: (index: number, id: any) => void;
  updateValueAtIndex: (index: number, newData: any) => void;
  updateBlockDataById: (id: string, newData: any) => void;
}

export const INITIAL_BLOCK = {
  blocks: [],
  isDeleting: false,
  setBlocks: () => {},
  addBlock: () => {},
  deleteBlock: () => {},
  updateValueAtIndex: () => {},
  updateBlockDataById: () => {},
};

const BlockServiceContext = createContext<BlockContextProps>(INITIAL_BLOCK);
// Create a provider component
export function BlockProvider({ children }: any) {
  const [blocks, setBlocks] = useState<Array<Object>>([]);
  const [isDeleting, setIsDeleting] = useState(false);

  const updateValueAtIndex = (index: any, newData: any) => {
    const updatedData: any = [...blocks];
    let oldData: any = updatedData[index];
    updatedData[index] = { ...oldData, val: newData };
    setBlocks(updatedData);
  };

  const updateBlockDataById = (id: string, newData: any) => {
    let index: any = blocks.findIndex((ele: any) => id == ele?.$id);
    console.log({ index });
    if (index != -1) {
      const oldBlocks: any = [...blocks];
      console.log({ oldBlocks, newData });
      oldBlocks[index] = { ...newData };
      setBlocks(oldBlocks);
    } else {
      return false;
    }
  };

  const addBlock = (block: any) => {
    setBlocks((prevBlocks) => {
      const updatedBlocks = [...prevBlocks];
      updatedBlocks.push(block);
      return updatedBlocks;
    });

    console.log({ block, blocks });
  };

  const deleteBlock = async (index: any, id: any) => {
    const removeBlockFromIndex = (index: any) => {
      setBlocks((prevBlocks) => {
        const updatedBlocks = [...prevBlocks];
        updatedBlocks.splice(index, 1);
        showToast({ msg: "Block Deleted Successfully" });
        setIsDeleting(false);
        return updatedBlocks;
      });
      setIsDeleting(false);
    };

    setIsDeleting(true);
    if (id) {
      const deletedBlock = await deleteLinkBlockById(id);
      if (deletedBlock) {
        removeBlockFromIndex(index);
      } else {
        showToast({ msg: "Failed to delete this block", isError: true });
        setIsDeleting(false);
      }
    } else {
      removeBlockFromIndex(index);
    }
  };

  const contextValue = {
    blocks,
    isDeleting,
    setBlocks,
    addBlock,
    deleteBlock,
    updateValueAtIndex,
    updateBlockDataById,
  };

  return (
    <BlockServiceContext.Provider value={contextValue}>
      {children}
    </BlockServiceContext.Provider>
  );
}

// Create a custom hook to use the context
export function useBlockContext() {
  return useContext(BlockServiceContext);
}
