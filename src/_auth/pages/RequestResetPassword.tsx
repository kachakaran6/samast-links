import { CustomInput, Loader } from "@/components/shared";
import { Button, Form } from "@/components/ui";
import { resetPasswordRequest } from "@/lib/supabase/api";
import { maskEmail, showToast } from "@/lib/utils";
import { ResetPasswordRequestValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const RequestResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const form = useForm<z.infer<typeof ResetPasswordRequestValidation>>({
    resolver: zodResolver(ResetPasswordRequestValidation),
    defaultValues: {
      email: "",
    },
  });

  const sendLink = async (
    value: z.infer<typeof ResetPasswordRequestValidation>
  ) => {
    setLoading(true);
    const isSent = await resetPasswordRequest(value?.email);
    if (isSent) {
      setIsEmailSent(true);
      showToast({
        msg: "Email Sent Successfully",
      });
      setLoading(false);
    } else {
      showToast({
        msg: "Something went wrong. Please try again later.",
        isError: true,
      });
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex-center flex-col gap-8">
      <div className="text-gradient flex-center text-3xl">Reset Password</div>
      {!isEmailSent ? (
        <>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(sendLink)}
              className="flex flex-col gap-8 w-[85%] max-w-[400px]">
              <CustomInput
                name={"email"}
                control={form.control}
                placeholder="Enter Email"
                label="Email"
              />

              <Button
                type="submit"
                className="shad-button_primary"
                disabled={loading}>
                {loading ? (
                  <div className="flex-center gap-2 whitespace-nowrap">
                    <Loader /> Please wait...
                  </div>
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </Form>
          <div className="text-sm text-gray-500 text-center">
            We will send you an email in you inbox with a reset password link.
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-5 flex-center text-center w-[90%] max-w-[400px]">
          <div className="text-sm font-medium">
            We have sent an email to this email address
          </div>
          <div className="text-gradient text-lg font-medium">{`${maskEmail(
            form.control._formValues.email
          )}`}</div>
          <div className="text-sm text-gray-500">
            Open your email inbox and check an email from appwrite to reset your
            password through the link.
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-base text-gray-300">
              Not recieved? must check your spam inbox
            </div>
            <div className="my-2 text-primary">OR</div>
            <Button
              onClick={() => {
                sendLink({ email: form.control._formValues.email });
              }}
              className="shad-button_primary"
              disabled={loading}>
              {loading ? (
                <div className="flex-center gap-2">
                  <Loader /> Sending...
                </div>
              ) : (
                "Resend Link"
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestResetPassword;
