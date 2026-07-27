import { Client, Account, Databases, Storage, Avatars, Locale } from "appwrite";

export const appwriteConfig = {
  url: import.meta.env.VITE_APPWRITE_URL,
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
  userCollectionId: import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID,
  linkCollectionId: import.meta.env.VITE_APPWRITE_LINK_COLLECTION_ID,
  statsCollectionId: import.meta.env.VITE_APPWRITE_STATS_COLLECTION_ID,
  plansCollectionId: import.meta.env.VITE_APPWRITE_PLAN_COLLECTION_ID,
  linkBlocksCollectionId: import.meta.env
    .VITE_APPWRITE_LINK_BLOCKS_COLLECTION_ID,
  socialMediaCollectionId: import.meta.env
    .VITE_APPWRITE_SOCIAL_MEDIA_COLLECTION_ID,
};

export const client = new Client();
export const locale = new Locale(client);

client.setEndpoint(appwriteConfig.url);
client.setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
