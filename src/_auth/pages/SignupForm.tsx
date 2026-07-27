import * as z from "zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  // FormControl,
  // FormField,
  // FormItem,
  // FormLabel,
  // FormMessage,
} from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import {
  useCreateUserAccount,
  useSignInAccount,
} from "@/lib/react-query/queries";
import { SignupValidation } from "@/lib/validation";
import { useUserContext } from "@/context/AuthContext";
import { CustomInput, Loader } from "@/components/shared";
import PasswordField from "@/components/shared/PasswordField";
import { showToast } from "@/lib/utils";

const SignupForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // Queries
  const { mutateAsync: createUserAccount, isLoading: isCreatingAccount } =
    useCreateUserAccount();
  const { mutateAsync: signInAccount, isLoading: isSigningInUser } =
    useSignInAccount();

  // Handler
  const handleSignup = async (user: z.infer<typeof SignupValidation>) => {
    try {
      const newUser: any = await createUserAccount(user);

      if (!newUser) {
        toast({ title: "Sign up failed. Please try again." });
        return;
      }
      if (newUser?.type == "user_already_exists") {
        form.setError("email", {
          type: "manual",
          message:
            "Email Already Exists. Please check your email or try to login",
        });
        return;
      }

      const session = await signInAccount({
        email: user.email,
        password: user.password,
      });

      if (!session) {
        showToast({
          msg: "Something went wrong. Please login your new account",
          isError: true,
        });
        navigate("auth/sign-in");
        return;
      }

      const isLoggedIn = await checkAuthUser();

      if (isLoggedIn) {
        form.reset();
        navigate("/link");
      } else {
        // toast({ title: "Login failed. Please try again." });
        return;
      }
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col h-full w-full max-w-[90%]">
        <div className="text-gradient text-2xl md:text-3xl mb-3 flex-center font-medium flex gap-2 w-full">
          Register
        </div>
        <form
          onSubmit={form.handleSubmit(handleSignup)}
          className="flex flex-col gap-5 w-full mt-4">
          <CustomInput
            placeholder={"Enter name here"}
            control={form.control}
            className="max-sm:!max-h-12 !max-h-10 !mt-[2px]"
            name={"name"}
            label={"Name"}
          />
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

          <Button type="submit" className="shad-button_primary">
            {isCreatingAccount || isSigningInUser || isUserLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Sign Up"
            )}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account?
            <Link
              to="/auth/sign-in"
              className="text-primary-500 text-small-semibold ml-1">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignupForm;
