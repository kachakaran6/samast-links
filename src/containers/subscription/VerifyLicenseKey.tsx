import { CustomInput, Loader } from "@/components/shared";
import { Button, Form } from "@/components/ui";
import { useUserContext } from "@/context/AuthContext";
import { upgradeToPro } from "@/lib/supabase/api";
import { showToast } from "@/lib/utils";
import { LicenseKeyValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

const VerifyLicenseKey = () => {
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const { user } = useUserContext();

  const form = useForm<z.infer<typeof LicenseKeyValidation>>({
    resolver: zodResolver(LicenseKeyValidation),
    defaultValues: {
      key: user?.subscription_license_key || "",
    },
  });
  const handleSubmit = async (value: z.infer<typeof LicenseKeyValidation>) => {
    setIsBtnLoading(true);
    const url = import.meta.env.VITE_GUMROAD_VERIFY_URL;
    const productId = import.meta.env.VITE_GUMROAD_PRODUCT_ID;

    const data = {
      product_id: productId,
      license_key: value?.key,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to verify license");
      }

      const result = await response.json();
      console.log(result);
      if (result?.uses > 1) {
        showToast({
          msg: "License is expired",
          isError: true,
        });
      } else {
        const isUpdatedUser = await upgradeToPro(user, value?.key);
        if (isUpdatedUser) {
          showToast({
            msg: "License verified successfully",
          });
          window.location.href = window.location.origin + "/link";
        } else {
          showToast({
            msg: "Something went wrong please contact with admin",
            isError: true,
          });
        }
      }
    } catch (error: any) {
      showToast({
        msg: error?.message,
        isError: true,
      });
      console.log(error?.message);
    }

    setIsBtnLoading(false);
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center max-w-2xl w-full mx-auto">
      <div className="my-5 text-lg font-medium">
        {user?.subscription_license_key
          ? "License Key already added"
          : "Verify License Key"}
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-9 w-full">
          <CustomInput
            readOnly={user?.subscription_license_key}
            disabled={user?.subscription_license_key}
            placeholder="Enter License Key"
            control={form.control}
            className="max-sm:!max-h-12 !max-h-10 !mt-[2px]"
            name="key"
          />
          <div className="flex gap-4 items-center justify-center">
            <Link to={"/link"}>
              <Button type="button" className="shad-button_dark_4">
                Cancel
              </Button>
            </Link>
            {!user?.subscription_license_key && (
              <Button
                type="submit"
                className="shad-button_primary whitespace-nowrap"
                disabled={isBtnLoading || !form.formState.isDirty}>
                {isBtnLoading ? (
                  <>
                    <Loader />
                    Verifying...
                  </>
                ) : (
                  "Verify"
                )}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default VerifyLicenseKey;
