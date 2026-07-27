import { ScrollArea } from "@/components/ui/scroll-area";
import { linkBlocks } from "@/constants";
import { useBlockContext } from "@/context/BlockContext";
import CustomIcon from "../shared/CustomIcon";

const LinkBlocks = ({ onClick }: any) => {
  const { blocks } = useBlockContext();

  return (
    <>
      <ScrollArea
        type="always"
        className={`${linkBlocks?.length > 5 ? "h-max" : "h-max"} w-full`}>
        <div className="flex flex-col gap-2 w-full pr-3">
          {linkBlocks.map((link) => {
            let hideBlock = false;
            if (
              blocks &&
              blocks?.length > 0 &&
              blocks.some((ele: any) => ele.block_type == "github_card") &&
              link.block_type == "github_card"
            ) {
              hideBlock = true;
            }
            return (
              <div
                className={`flex gap-3 items-center w-full bg-dark-4/50 font-normal p-2 px-4 rounded-xl border border-dark-4 hover:border-primary/50 cursor-pointer  ${
                  hideBlock && "hidden"
                }`}
                key={link.block_type}
                onClick={() => {
                  onClick(link);
                }}>
                <CustomIcon
                  icon={link?.block_type}
                  className={"text-primary-500 rounded"}
                />
                <div className="text-sm">{link?.name}</div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </>
  );
};

export default LinkBlocks;
