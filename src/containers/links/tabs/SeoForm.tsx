import { CustomInput } from "@/components/shared";
import { Form } from "@/components/ui";
import { useUpdateLink } from "@/lib/react-query/queries";
import { showToast } from "@/lib/utils";
import { SeoTagsValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const SeoForm = ({ selectedLink, setBtnLoading }: any) => {
  const { mutateAsync: updateLink } = useUpdateLink();
  const seoForm = useForm<z.infer<typeof SeoTagsValidation>>({
    resolver: zodResolver(SeoTagsValidation),
    defaultValues: {
      title: selectedLink?.seo_title || "",
      description: selectedLink?.seo_description || "",
      keywords: selectedLink?.seo_keywords || "",
    },
  });

  useEffect(() => {
    console.log({ selectedLink });
  }, [selectedLink]);

  const handleSeoSubmit = async (value: any) => {
    setBtnLoading(true);
    console.log({ value, selectedLink });
    const updatedLink = await updateLink({
      ...selectedLink,
      seo_title: value?.title,
      seo_description: value?.description,
      seo_keywords: value?.keywords,
      linkId: selectedLink?.$id,
    });

    if (updatedLink) {
      showToast({
        msg: "Link updated successfully",
      });
    } else {
      showToast({
        msg: "Failed to update link! Plea0e try again.",
        isError: true,
      });
    }

    setBtnLoading(false);
  };

  return (
    <>
      <div className="mt-3 mb-2 text-xl text-gray-400 text-center">
        Seo Settings
      </div>
      <Form {...seoForm}>
        <form
          id="hook-form"
          onSubmit={seoForm.handleSubmit(handleSeoSubmit)}
          className="flex flex-col gap-9 w-full">
          <div className="flex gap-3 flex-col">
            <CustomInput
              placeholder="Enter Seo Title"
              control={seoForm.control}
              className="!max-h-10 !mt-[2px]"
              name="title"
              label="SEO Title"
            />
            <CustomInput
              placeholder="Enter keywords separated by comma"
              control={seoForm.control}
              className="!max-h-10 !mt-[2px]"
              name="keywords"
              label="SEO Keywords"
            />
            <CustomInput
              placeholder="Enter Description"
              control={seoForm.control}
              isTextArea
              className="!max-h-10 !mt-[2px]"
              name="description"
              label="SEO Description"
            />
          </div>
        </form>
      </Form>
    </>
  );
};

export default SeoForm;
