import { Loader } from "@/components/shared";
import { Button } from "@/components/ui";
const BlockFormButtons = ({ setOpen, onSubmit, isUpdate, isLoading }: any) => {
  return (
    <>
      <div className="w-full flex gap-4 mt-6">
        <Button
          variant="secondary"
          type="button"
          autoFocus={false}
          onClick={() => setOpen(false)}
          className={"!max-h-12 !rounded-md w-full"}>
          Cancel
        </Button>
        <Button
          type="submit"
          onClick={onSubmit}
          className="shad-button_primary whitespace-nowrap !max-h-12 !rounded-md w-full">
          {isLoading ? <Loader /> : isUpdate ? "Update" : "Add"}
        </Button>
      </div>
    </>
  );
};

export default BlockFormButtons;
