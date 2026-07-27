import { CustomInput } from "@/components/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui";
import { z } from "zod";
import BlockFormButtons from "./BlockFormButtons";
import { GitHubUsernameValidation } from "@/lib/validation";
import { useState } from "react";

const GithubCard = ({
  element,
  setOpen,
  handeBlockFormSubmit,
  selectedIndex,
}: any) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof GitHubUsernameValidation>>({
    resolver: zodResolver(GitHubUsernameValidation),
    defaultValues: {
      username:
        ((selectedIndex || selectedIndex == 0) && element?.val?.username) || "",
    },
  });

  const validateUsername = async (username: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (response.status === 200) {
        form.clearErrors("username");
        return true;
      }
    } catch (error) {
      console.log("validateUsername error", error);
    }
    setIsLoading(false);
    return false;
  };

  const handleSubmit = async (data: any) => {
    try {
      let isValid = await validateUsername(data.username);
      console.log({ isValid });
      if (isValid) {
        handeBlockFormSubmit(data);
      } else {
        form.setError("username", {
          type: "manual",
          message: "GitHub user not found. Please check and try again.",
        });
      }
    } catch (error) {
      console.error("handleSubmit error", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex flex-col items-center justify-center w-full">
          <div className="flex items-end gap-2 w-full">
            <CustomInput
              placeholder="Enter Github username"
              label="Github Username"
              className="!min-h-9 !max-h-9 !rounded-md"
              control={form.control}
              name="username"
            />
          </div>
          <BlockFormButtons
            setOpen={setOpen}
            isUpdate={selectedIndex || selectedIndex == 0}
            isLoading={isLoading}
          />
        </div>
      </form>
    </Form>
  );
};

export default GithubCard;
