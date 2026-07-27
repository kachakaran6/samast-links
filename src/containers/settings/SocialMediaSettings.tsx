import { CustomInput, Loader } from "@/components/shared";
import { Form } from "@/components/ui";
import { SocialMediaInputs } from "@/constants";
import { useLinkContext } from "@/context/LinkContext";
import {
  getSocialMediaByLinkId,
  updateSocialMediaLinks,
} from "@/lib/appwrite/api";
import { showToast } from "@/lib/utils";
import { SocialMediaValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const SocialMediaSettings = ({
  selectedLink,
  isBtnClicked,
  setBtnLoading,
}: any) => {
  const { updateLinkById, linksLoading } = useLinkContext();
  const [socialsLoading, setSocialsLoading] = useState(true);

  const form = useForm<z.infer<typeof SocialMediaValidation>>({
    resolver: zodResolver(SocialMediaValidation),
    defaultValues: {
      instagram: selectedLink?.socials?.instagram || "",
      twitter: selectedLink?.socials?.twitter || "",
      linked_in: selectedLink?.socials?.linked_in || "",
      github: selectedLink?.socials?.github || "",
      telegram: selectedLink?.socials?.telegram || "",
      twitch: selectedLink?.socials?.twitch || "",
    },
  });

  useEffect(() => {
    if (isBtnClicked == "social-media") {
      // handleSubmit();
    }
  }, [isBtnClicked]);

  const onSubmit = async (value: z.infer<typeof SocialMediaValidation>) => {
    setBtnLoading(true);
    const updatedSocialMedia = await updateSocialMediaLinks({
      ...value,
      id: selectedLink.socials.$id,
      linkId: selectedLink.$id,
    });
    if (!updatedSocialMedia) {
      showToast({
        msg: `Update Failed. Please try again later`,
        isError: true,
      });
      return;
    } else {
      showToast({
        msg: "Data Updated Successfully.",
      });
    }
    setBtnLoading(false);
    let updatedLink = { ...selectedLink, socials: updatedSocialMedia };
    updateLinkById(selectedLink.$id, updatedLink);
  };

  useEffect(() => {
    if (selectedLink && selectedLink?.$id && !selectedLink?.socials) {
      getSocialMediaLinks();
    } else {
      setSocialsLoading(false);
    }
    updateForm();
  }, [selectedLink]);

  const getSocialMediaLinks = async () => {
    setSocialsLoading(true);
    await getSocialMediaByLinkId(selectedLink.$id).then((socialLink) => {
      let updatedLink = { ...selectedLink, socials: socialLink };
      updateLinkById(selectedLink.$id, updatedLink);
      setSocialsLoading(false);
      updateForm();
    });
  };

  const updateForm = () => {
    if (selectedLink?.socials) {
      Object.keys(form.control._fields).forEach((key: any) => {
        form.setValue(
          key,
          selectedLink?.socials[key] ? selectedLink?.socials[key] : ""
        );
      });
    }
  };

  return (
    <>
      {linksLoading ? (
        <div className="h-[500px] flex-center w-full">
          <Loader />
        </div>
      ) : (
        <Form {...form}>
          <form
            id="hook-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5 w-full z-[100]">
            {socialsLoading ? (
              <Loader />
            ) : (
              <>
                {SocialMediaInputs.map((input) => (
                  <div key={input?.key}>
                    <CustomInput
                      placeholder={input.placeholder}
                      control={form.control}
                      className="max-sm:!max-h-12 !max-h-10 !mt-[2px]"
                      name={input?.key}
                      label={input.label}
                    />
                  </div>
                ))}
              </>
            )}
          </form>
        </Form>
      )}
    </>
  );
};

export default SocialMediaSettings;
