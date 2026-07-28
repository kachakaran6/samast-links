import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { SigninValidation } from "@/lib/validation";
import { useSignInAccount } from "@/lib/react-query/queries";
import { useUserContext } from "@/context/AuthContext";
import { CustomInput, Loader } from "@/components/shared";
import { showToast } from "@/lib/utils";
import PasswordField from "@/components/shared/PasswordField";

const SigninForm = () => {
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  // Query
  const { mutateAsync: signInAccount, isLoading } = useSignInAccount();

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignin = async (user: z.infer<typeof SigninValidation>) => {
    const session: any = await signInAccount(user);

    if (session) {
      if (session.code) {
        if (session.type == "user_invalid_credentials") {
          form.control.setError("password", {
            message: "Email or password is invalid",
            type: "manual",
          });
        } else {
          showToast({ msg: "Login failed. Please try again.", isError: true });
        }
        return;
      }
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();
      navigate("/overview");
    } else {
      showToast({ msg: "Login completed, entering workspace...", isError: false });
      navigate("/overview");
    }
    return;
  };

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col h-full w-full max-w-[90%]">
        <div className="text-2xl text-gradient md:text-3xl mb-3 flex-center font-medium flex gap-2 w-full">
          Login
        </div>

        <p className="text-small-regular text-light-2 text-center mt-2">
          Don&apos;t have an account?
          <Link
            to="/auth/sign-up"
            className="text-primary-500 text-small-semibold ml-1">
            Sign up
          </Link>
        </p>
        <form
          onSubmit={form.handleSubmit(handleSignin)}
          className="flex flex-col gap-5 w-full mt-4">
          <CustomInput
            placeholder={"Enter Email"}
            control={form.control}
            className="max-sm:!max-h-12 !max-h-10 !mt-[2px]"
            name={"email"}
            label={"Email"}
          />

          <PasswordField
            placeholder="Enter Password"
            control={form.control}
            className="!max-h-10 !mt-[2px]"
            name="password"
            label="Password"
          />

          <Button
            type="submit"
            className="shad-button_primary"
            disabled={isLoading || isUserLoading}>
            {isLoading || isUserLoading ? (
              <div className="flex-center gap-2 whitespace-nowrap">
                <Loader /> Please wait...
              </div>
            ) : (
              "Log in"
            )}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Forgot your password?
            <Link
              to="/auth/request-reset-password"
              className="text-primary-500 text-small-semibold ml-1">
              Reset Password
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SigninForm;
