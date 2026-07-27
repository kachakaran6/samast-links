import { z } from "zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Button,
} from "@/components/ui";
import { LinkValidation } from "@/lib/validation";
import { CustomInput, FileUploader, Loader } from "@/components/shared";
import { useEffect, useState } from "react";
import {
  useCreateLink,
  useUpdateLink,
  useValidateSlug,
} from "@/lib/react-query/queries";
import { useUserContext } from "@/context/AuthContext";
import { useLinkContext } from "@/context/LinkContext";
import { showToast } from "@/lib/utils";
import { constantSlugs } from "@/constants";

type LinkFormProps = {
  link_id?: string;
  action: "Create" | "Update";
  setUpdateLoading: any;
};

const LinkForm = ({ link_id, action, setUpdateLoading }: LinkFormProps) => {
  const navigate = useNavigate();
  const [link, setLink] = useState<any>(null);
  const [isSlugAvailable, setIsSlugAvailable] = useState<boolean>(true);
  const { links, updateLinkById, addNewLink, getLinkById, linksLoading } =
    useLinkContext();
  const { user } = useUserContext();
  const form = useForm<z.infer<typeof LinkValidation>>({
    resolver: zodResolver(LinkValidation),
    defaultValues: {
      title: "",
      file: [],
      slug: "",
      description: "",
    },
  });

  const setLinkAndUpdateForm = (link: any = null) => {
    if (link) {
      setLink(link);
      form.setValue("title", link ? link?.title : "");
      form.setValue("slug", link ? link?.slug : "");
      form.setValue("description", link ? link?.description : "");
    }
  };

  const slugValue = form.watch("slug");

  useEffect(() => {
    handleChange(slugValue);
  }, [slugValue]);

  useEffect(() => {
    if (link_id) {
      if (links?.length > 0) {
        const tempLink: any = getLinkById(link_id);
        setLinkAndUpdateForm(tempLink);
      }
    }
  }, [link_id, links]);

  // Query
  const { mutateAsync: createLink, isLoading: isLoadingCreate } =
    useCreateLink();
  const { mutateAsync: updateLink, isLoading: isLoadingUpdate } =
    useUpdateLink();
  const { mutateAsync: validateSlug, isLoading: isLoadingSlug } =
    useValidateSlug();

  // Handler
  const handleSubmit = async (value: z.infer<typeof LinkValidation>) => {
    value.slug = createSlug(value.slug);
    if (value.file.length == 0 && !link?.imageUrl) {
      showToast({
        msg: "Please select image to proceed",
        isError: true,
      });
      return;
    }

    if (value?.slug != link?.slug || action == "Create") {
      const isValidSlug: any = await validateSlug(value.slug);
      if (isValidSlug?.length > 0) {
        setIsSlugAvailable(false);
        return;
      } else {
        console.log(constantSlugs.some((ele: any) => ele == value?.slug));
        if (constantSlugs.some((ele: any) => ele == value?.slug)) {
          setIsSlugAvailable(false);
          return;
        }
      }
    }

    // ACTION = UPDATE
    if (link && action === "Update") {
      setUpdateLoading(true);
      const updatedLink = await updateLink({
        ...value,
        linkId: link.$id,
        imageId: link.imageId,
        imageUrl: link.imageUrl,
        userId: user.id,
      });
      if (!updatedLink) {
        showToast({
          msg: `${action} link failed. Please try again.`,
          isError: true,
        });
        return;
      } else {
        showToast({
          msg: "Link Updated Successfully.",
        });
      }
      setUpdateLoading(false);
      updateLinkById(link.$id, updatedLink);
      return;
    }

    // ACTION = CREATE;
    const newLink = await createLink({
      ...value,
      userId: user.id,
    });

    if (!newLink) {
      showToast({
        msg: `${action} link failed. Please try again.`,
        isError: true,
      });
    } else {
      addNewLink(newLink);
      showToast({
        msg: "Link Created Successfully.",
      });
      navigate("/link/all");
    }
  };

  const createSlug = (val: any) => {
    let newVal = val.toLowerCase().split(" ").join("-");
    return newVal;
  };

  const handleChange = (val: any) => {
    const replacedValue = val.replace(/\s/g, "-");
    form.setValue("slug", replacedValue);
  };

  return (
    <>
      {(linksLoading && link_id) || (link_id && !link) ? (
        <div className="h-72 flex-center">
          <Loader />
        </div>
      ) : (
        <Form {...form}>
          <form
            id={action == "Update" ? "hook-form" : ""}
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-9 w-full">
            <div className="flex gap-3 flex-col">
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center">
                    <FormLabel className="shad-form_label whitespace-nowrap">
                      Image
                    </FormLabel>
                    <FormControl>
                      <FileUploader
                        variant="avatar"
                        height={"25"}
                        width={"25"}
                        fieldChange={field.onChange}
                        mediaUrl={link?.imageUrl}
                      />
                    </FormControl>
                    <FormMessage className="shad-form_message" />
                  </FormItem>
                )}
              />
              <div className="relative flex items-center w-full">
                <div className="absolute text-sm top-[46px] left-2 text-gray-300">
                  https://linkmonks.vercel.app/
                </div>
                <CustomInput
                  placeholder="yourname"
                  label="Your Unique Link"
                  className="!w-full pl-[172px]"
                  control={form.control}
                  name="slug"
                  onChange={(val: any) => {
                    handleChange(val);
                  }}
                  // label="Enter Link slug"
                  errorText={
                    !isSlugAvailable ? "This link is already taken" : ""
                  }
                />
              </div>

              <CustomInput
                placeholder="Enter Title Here"
                control={form.control}
                name="title"
                label="Enter Link Title"
              />

              <CustomInput
                placeholder="Enter description here"
                control={form.control}
                name="description"
                isTextArea
                classNam="resize-none"
                label="Description"
              />
            </div>
            {action == "Create" && (
              <div className="flex gap-4 items-center justify-end">
                <Button
                  type="button"
                  className="shad-button_dark_4"
                  onClick={() => navigate(-1)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="shad-button_primary whitespace-nowrap"
                  disabled={
                    isLoadingCreate || isLoadingUpdate || isLoadingSlug
                  }>
                  {(isLoadingCreate || isLoadingUpdate || isLoadingSlug) && (
                    <Loader />
                  )}
                  {isLoadingCreate || isLoadingUpdate || isLoadingSlug
                    ? action == "Create"
                      ? "Creating..."
                      : "Updating..."
                    : action}
                </Button>
              </div>
            )}
          </form>
        </Form>
      )}
    </>
  );
};

export default LinkForm;
