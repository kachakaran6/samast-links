import { CustomSelect } from "@/components/shared/CustomSelect";
import { useState } from "react";
import BlockFormButtons from "./BlockFormButtons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TextValidation } from "@/lib/validation";
import { Form } from "@/components/ui";
import { CustomInput } from "@/components/shared";

const Text = ({
  element,
  setOpen,
  handeBlockFormSubmit,
  selectedIndex,
}: any) => {
  const [sizeValue, setSizeValue] = useState(element.val.size);
  const [alignValue, setAlignValue] = useState(element.val.align);

  const form = useForm<z.infer<typeof TextValidation>>({
    resolver: zodResolver(TextValidation),
    defaultValues: {
      text: ((selectedIndex || selectedIndex == 0) && element?.val?.text) || "",
    },
  });

  const handleSelect = (type: any, data: any) => {
    if (type == "size") {
      setSizeValue(data);
      element.val.size = data;
    } else {
      setAlignValue(data);
      element.val.align = data;
    }
  };

  const handleSubmit = (data: any) => {
    element.val = { ...element.val, text: data?.text };
    handeBlockFormSubmit(element?.val);
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="flex flex-col items-start justify-center w-full gap-3">
            <div className="flex items-end gap-2 w-full">
              <CustomInput
                placeholder="Enter Text"
                label="Text"
                className="!min-h-9 !max-h-9 !rounded-md"
                control={form.control}
                name="text"
              />
            </div>
            <CustomSelect
              defaultVal={sizeValue}
              onSelect={(data: any) => {
                handleSelect("size", data);
              }}
              placeholder={"Select text size"}
              items={element?.sizes}
              bind_label={"label"}
              bind_value={"value"}
              label={"Text Size"}
              value={sizeValue}></CustomSelect>
            <CustomSelect
              defaultVal={alignValue}
              onSelect={(data: any) => {
                handleSelect("align", data);
              }}
              placeholder={"Select text position"}
              items={element?.align}
              bind_label={"label"}
              bind_value={"value"}
              label={"Text position"}
              value={alignValue}></CustomSelect>
            <BlockFormButtons
              setOpen={setOpen}
              isUpdate={selectedIndex || selectedIndex == 0}
            />
          </div>
        </form>
      </Form>
    </>
  );
};

export default Text;
