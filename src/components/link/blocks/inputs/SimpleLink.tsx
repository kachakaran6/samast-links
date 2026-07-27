import { CustomInput } from "@/components/shared";
import { SimpleLinkBlockValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui";
import { z } from "zod";
import BlockFormButtons from "./BlockFormButtons";

const SimpleLink = ({
  handeBlockFormSubmit,
  element,
  setOpen,
  selectedIndex,
}: any) => {
  const form = useForm<z.infer<typeof SimpleLinkBlockValidation>>({
    resolver: zodResolver(SimpleLinkBlockValidation),
    defaultValues: {
      label:
        ((selectedIndex || selectedIndex == 0) && element?.val?.label) || "",
      link: ((selectedIndex || selectedIndex == 0) && element?.val?.link) || "",
      imageUrl:
        ((selectedIndex || selectedIndex == 0) && element?.val?.imageUrl) || "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handeBlockFormSubmit)}>
        <div className="flex flex-col gap-4 w-full">
          <CustomInput
            placeholder="Enter Label here"
            className="!min-h-12 !max-h-12 !rounded-md"
            name="label"
            control={form.control}
            label="Label"
          />
          <CustomInput
            placeholder="https://"
            className="!min-h-12 !max-h-12 !rounded-md"
            control={form.control}
            name="link"
            label="Link"
          />
          <CustomInput
            placeholder="Enter Image Url (optional)"
            className="!min-h-12 !max-h-12 !rounded-md"
            name="imageUrl"
            control={form.control}
            label="Image Url"
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

export default SimpleLink;
