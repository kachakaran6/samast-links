import { supabase } from "@/lib/supabase/client";

export const appwriteConfig = {
  url: import.meta.env.VITE_SUPABASE_URL || "",
  projectId: import.meta.env.projectid || "",
  databaseId: "supabase",
  storageId: "media",
  userCollectionId: "users",
  linkCollectionId: "links",
  statsCollectionId: "stats",
  plansCollectionId: "plans",
  linkBlocksCollectionId: "link_blocks",
  socialMediaCollectionId: "social_media",
};

export const client = supabase;
export const account = supabase.auth;
export const databases = supabase;
export const storage = supabase.storage;
export const avatars = {
  getInitials: (name: string) =>
    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`,
};
export const locale = {
  get: async () => ({ country: "IN", countryName: "India" }),
};
