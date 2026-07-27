import { z } from "zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, Button } from "@/components/ui";
import { UpdatePasswordValidation } from "@/lib/validation";
import { Loader } from "@/components/shared";
import { useUpdatePassword } from "@/lib/react-query/queries";
import { showToast } from "@/lib/utils";
import PasswordField from "@/components/shared/PasswordField";

const PasswordSettings = () => {
  const navigate = useNavigate();
  const passForm = useForm<z.infer<typeof UpdatePasswordValidation>>({
    resolver: zodResolver(UpdatePasswordValidation),
    defaultValues: {
      old: "",
      new: "",
      confirm: "",
    },
  });

  // Query
  const { mutateAsync: updatePassword, isLoading: isLoadingPassUpdate } =
    useUpdatePassword();

  // Handler

  const handlePasswordSubmit = async (password: any) => {
    if (password.new != password.confirm) {
      passForm.setError("confirm", {
        type: "manual",
        message: "New password and confirm password must be equal",
      });
      return;
    }

    const updatedPassword = await updatePassword(password);
    if (updatedPassword) {
      showToast({
        msg: "Password updated successfully",
      });
      passForm.reset();
    } else {
      showToast({
        msg: "Failed to update password. Please try again",
        isError: true,
      });
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="text-gray-300 font-medium text-xl my-3 text-center">
        Update Password
      </div>
      <Form {...passForm}>
        <form
          onSubmit={passForm.handleSubmit(handlePasswordSubmit)}
          className="flex flex-col gap-9 w-full">
          <div className="flex gap-3 flex-col">
            <PasswordField
              placeholder="Enter old password"
              control={passForm.control}
              className="!max-h-10 !mt-[2px]"
              name="old"
              label="Old password"
            />
            <PasswordField
              placeholder="Enter New Password"
              control={passForm.control}
              className="!max-h-10 !mt-[2px]"
              name="new"
              label="New Password"
            />
            <PasswordField
              placeholder="Re-enter new password"
              control={passForm.control}
              className="!max-h-10 !mt-[2px]"
              name="confirm"
              label="Repeat new password"
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
              disabled={isLoadingPassUpdate || !passForm.formState.isDirty}>
              {isLoadingPassUpdate ? (
                <>
                  <Loader />
                  Updating...
                </>
              ) : (
                "Update Password"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PasswordSettings;
