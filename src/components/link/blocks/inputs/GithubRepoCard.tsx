import { CustomInput } from "@/components/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui";
import { z } from "zod";
import BlockFormButtons from "./BlockFormButtons";
import { GithubRepoValidation } from "@/lib/validation";

const GithubRepoCard = ({
  element,
  setOpen,
  handeBlockFormSubmit,
  selectedIndex,
}: any) => {
  const form = useForm<z.infer<typeof GithubRepoValidation>>({
    resolver: zodResolver(GithubRepoValidation),
    defaultValues: {
      link: ((selectedIndex || selectedIndex == 0) && element?.val?.link) || "",
      name: ((selectedIndex || selectedIndex == 0) && element?.val?.name) || "",
      desc: ((selectedIndex || selectedIndex == 0) && element?.val?.desc) || "",
      tags: ((selectedIndex || selectedIndex == 0) && element?.val?.tags) || "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handeBlockFormSubmit)}>
        <div className="flex flex-col items-center justify-center w-full gap-3">
          <CustomInput
            placeholder="Enter GitHub repository link"
            label="GitHub repository link"
            className="!min-h-9 !max-h-9 !rounded-md !mt-[2px]"
            control={form.control}
            name="link"
          />
          <CustomInput
            placeholder="Enter Title"
            label="Title"
            className="!min-h-9 !max-h-9 !rounded-md !mt-[2px]"
            control={form.control}
            name="name"
          />
          <CustomInput
            placeholder="Enter Description"
            label="Description"
            className="!min-h-9 !max-h-9 !rounded-md !mt-[2px]"
            control={form.control}
            name="desc"
          />
          <CustomInput
            placeholder="Enter Tags separated by comma"
            label="Tags"
            className="!min-h-9 !max-h-9 !rounded-md !mt-[2px]"
            control={form.control}
            name="tags"
          />
          <BlockFormButtons
            setOpen={setOpen}
            isUpdate={selectedIndex || selectedIndex == 0}
          />
        </div>
      </form>
    </Form>
  );
};

export default GithubRepoCard;
