import { ToastPosition } from "react-hot-toast";

export type INavLink = {
  imgURL: string;
  route: string;
  label: string;
  allowed_plans?: Array<any>;
};

export type IUpdateUser = {
  userId: string;
  name: string;
  imageUrl?: URL | string;
  imageId?: string;
  file: File[];
};

export type INewLink = {
  userId: string;
  title: string;
  file: File[];
  slug: string;
  description?: string;
};

export type IUpdateLink = {
  linkId: string;
  userId: string;
  title: string;
  file: File[];
  slug: string;
  description?: string;
  imageUrl: any;
  imageId: string;
  ga_tag?: string;
  is_show_social_icons?: boolean;
  is_show_verified_icon?: boolean;
  is_show_watermark?: boolean;
  seo_description?: boolean;
  seo_title?: boolean;
  seo_keywords?: boolean;
};

export type IUpdateSocials = {
  id: string;
  linkId: string;
  telegram?: string;
  linked_in?: string;
  instagram?: string;
  twitter?: string;
  github?: string;
  twitch?: string;
  skype?: string;
  tiktok?: string;
};

export type IUser = {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  status: boolean;
  emailVerification: boolean;
  is_pro?: any;
  subscription_license_key?: any;
};

export type ILink = {
  userId: string;
  title: string;
  file: File[];
  slug: string;
  tagline?: string;
};

export type INewUser = {
  name: string;
  email: string;
  password: string;
};

export type IToastTypes = {
  msg: string;
  position?: ToastPosition;
  isError?: boolean;
  className?: string;
};

export type ResetPasswordTypes = {
  userId: string;
  secret: string;
  password: string;
  repeatPassword: string;
};
