import * as z from "zod";

const noSpacesOrSpecialChars = (value: any) => {
  // Regular expression to check for spaces or special characters
  // const regex = /^[a-zA-Z0-9]+$/;
  const regex = /^[a-zA-Z0-9-]+$/;
  return regex.test(value);
};

// ============================================================
// USER
// ============================================================
export const SignupValidation = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

export const SigninValidation = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

export const LicenseKeyValidation = z.object({
  key: z.string().min(1, { message: "This field is required" }),
});

export const googleAnalyticsValidation = z.object({
  ga_tag: z.string().min(1, { message: "This field is required" }),
});

export const UpdatePasswordValidation = z.object({
  new: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
  confirm: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
  old: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

export const ResetPasswordValidation = z.object({
  new: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
  confirm: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

export const ResetPasswordRequestValidation = z.object({
  email: z.string().email(),
});

export const ProfileValidation = z.object({
  file: z.custom<File[]>(),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email(),
});

// ============================================================
// POST
// ============================================================

export const LinkValidation = z.object({
  title: z
    .string()
    .min(1, { message: "This field is required." })
    .max(70, { message: "Maximum 70 characters" }),
  description: z.string().max(150, { message: "Maximum 150 characters" }),
  file: z.custom<File[]>(),
  slug: z
    .string()
    .min(1, { message: "This field is required." })
    .refine(noSpacesOrSpecialChars, {
      message: "Special Characters are not allowed. Only '-' are allowed",
    }),
});

export const SeoTagsValidation = z.object({
  title: z.string().max(70, { message: "Maximum 70 characters" }),
  description: z.string().max(150, { message: "Maximum 150 characters" }),
  keywords: z.string().max(300, { message: "Maximum 150 characters" }),
});

export const SimpleLinkBlockValidation = z.object({
  label: z.string().max(25, { message: "Maximum 25 characters" }),
  imageUrl: z.string(),
  link: z
    .string()
    .min(1, { message: "This field is required" })
    .refine(
      (value: string) => {
        const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

        return urlRegex.test(value);
      },
      { message: "Invalid URL format" }
    ),
});

export const TextValidation = z.object({
  text: z
    .string()
    .min(1, { message: "This field is required" })
    .max(50, { message: "Maximum 50 characters" }),
});

export const GitHubUsernameValidation = z.object({
  username: z
    .string()
    .min(1, { message: "This field is required" })
    .refine(
      (username: string) => {
        const githubUsernameRegex =
          /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/;
        return githubUsernameRegex.test(username);
      },
      {
        message: "Invalid GitHub Username",
      }
    ),
});

export const YoutubeVideoUrlValidation = z.object({
  username: z
    .string()
    .min(1, { message: "This field is required" })
    .refine(
      (username: string) => {
        const urlRegex =
          /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})$/;
        return urlRegex.test(username);
      },
      {
        message: "Invalid Youtube Video Link",
      }
    ),
});

export const GithubRepoValidation = z.object({
  link: z
    .string()
    .min(1, { message: "This field is required" })
    .refine(
      (url: string) => {
        const urlRegex =
          /^https:\/\/github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+\/?$/;
        return urlRegex.test(url);
      },
      {
        message: "Invalid GitHub repository URL",
      }
    ),
  name: z.string().min(1, { message: "This field is required" }),
  desc: z.string(),
  tags: z.string(),
});

export const SocialMediaValidation = z.object({
  instagram: z.string(),
  twitter: z.string(),
  linked_in: z.string(),
  github: z.string(),
  telegram: z.string(),
  twitch: z.string(),
});
