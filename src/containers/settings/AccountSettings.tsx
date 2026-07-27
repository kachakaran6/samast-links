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
import { ProfileValidation } from "@/lib/validation";
import { CustomInput, FileUploader, Loader } from "@/components/shared";
import { useUpdateUser } from "@/lib/react-query/queries";
import { useUserContext } from "@/context/AuthContext";
import { showToast } from "@/lib/utils";

const AccountSettings = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useUserContext();

  const form = useForm<z.infer<typeof ProfileValidation>>({
    resolver: zodResolver(ProfileValidation),
    defaultValues: {
      name: user?.name || "",
      file: [],
      email: user?.email || "",
    },
  });

  // Query
  const { mutateAsync: updateUser, isLoading: isLoadingUpdate }: any =
    useUpdateUser();

  // Handler
  const handleSubmit = async (value: z.infer<typeof ProfileValidation>) => {
    if (value.file.length == 0 && !user?.imageUrl) {
      showToast({
        msg: "Please select image to proceed",
        isError: true,
      });
      return;
    }

    // ACTION = UPDATE

    const updatedUser = await updateUser({
      ...value,
      userId: user.id,
    });
    if (!updatedUser) {
      showToast({
        msg: `Failed to update profile. Please try again after sometime.`,
        isError: true,
      });
      return;
    } else {
      showToast({
        msg: "Profile Updated Successfully.",
      });
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="text-gray-300 font-medium text-xl my-3 text-center">
        Account Settings
      </div>
      {isLoading ? (
        <div className="h-72 flex-center">
          <Loader />
        </div>
      ) : (
        <>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col gap-9 w-full">
              <div className="flex gap-3 flex-col">
                <div className="flex gap-5 md:gap-10 items-center justify-start w-full">
                  <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                      <FormItem className="w-max flex flex-col items-center">
                        <FormLabel className="shad-form_label whitespace-nowrap">
                          Image
                        </FormLabel>
                        <FormControl>
                          <FileUploader
                            variant="avatar"
                            height="10"
                            width="10"
                            fieldChange={field.onChange}
                            mediaUrl={user?.imageUrl}
                          />
                        </FormControl>
                        <FormMessage className="shad-form_message" />
                      </FormItem>
                    )}
                  />
                  <CustomInput
                    placeholder="Enter Name"
                    control={form.control}
                    className="max-sm:!max-h-12 !max-h-10 !mt-[2px]"
                    name="name"
                    label="Name"
                  />
                </div>
                <CustomInput
                  readOnly
                  placeholder="Enter Email"
                  control={form.control}
                  className="max-sm:!max-h-12 !max-h-10 !mt-[2px]"
                  name="email"
                  label="Email"
                />
              </div>
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
                  disabled={isLoadingUpdate || !form.formState.isDirty}>
                  {isLoadingUpdate ? (
                    <>
                      <Loader />
                      Updating...
                    </>
                  ) : (
                    "Update"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </>
      )}
    </div>
  );
};

export default AccountSettings;
