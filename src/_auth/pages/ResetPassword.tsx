import * as z from "zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, Button } from "@/components/ui";
import { ResetPasswordValidation } from "@/lib/validation";
import { CustomInput, Loader } from "@/components/shared";
import { resetPassword } from "@/lib/appwrite/api";
import PasswordField from "@/components/shared/PasswordField";

const ResetPassword = () => {
  const queryParams = new URLSearchParams(location.search);

  const userId: any = queryParams.get("userId");
  const secret: any = queryParams.get("secret");
  // const expire = queryParams.get("expire");

  const navigate = useNavigate();
  const passForm = useForm<z.infer<typeof ResetPasswordValidation>>({
    resolver: zodResolver(ResetPasswordValidation),
    defaultValues: {
      new: "",
      confirm: "",
    },
  });

  // Handler

  const handlePasswordSubmit = async (password: any) => {
    if (password.new != password.confirm) {
      passForm.setError("confirm", {
        type: "manual",
        message: "New password and confirm password must be equal",
      });
      return;
    }

    await resetPassword({
      userId,
      secret,
      password: password.new,
      repeatPassword: password.confirm,
    }).then((res: any) => {
      console.log(res);
    });
  };

  return (
    <div className="flex flex-col gap-2 w-[300px] max-w-[95%]">
      <div className="text-gray-300 font-medium text-xl my-3 text-center">
        Update Password
      </div>
      <Form {...passForm}>
        <form
          onSubmit={passForm.handleSubmit(handlePasswordSubmit)}
          className="flex flex-col gap-9 w-full">
          <div className="flex gap-3 flex-col">
            <PasswordField
              placeholder="Enter New Password"
              control={passForm.control}
              className="!max-h-10 !mt-[2px]"
              name="new"
              label="New Password"
            />
            <CustomInput
              placeholder="Repeat new password"
              control={passForm.control}
              className="max-sm:!max-h-12 !max-h-10 !mt-[2px]"
              name="confirm"
              label="Repeat new password"
            />
          </div>
          <div className="flex gap-4 items-center justify-end">
            <Button
              type="button"
              className="shad-button_dark_4"
              onClick={() => navigate("/auth/sign-in")}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="shad-button_primary whitespace-nowrap"
              disabled={!passForm.formState.isDirty}>
              {false ? (
                <>
                  <Loader />
                  Please Wait...
                </>
              ) : (
                "Reset Password"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ResetPassword;
