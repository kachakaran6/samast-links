import { ID, Query } from "appwrite";

import {
  appwriteConfig,
  account,
  databases,
  storage,
  avatars,
  locale,
} from "./config";
import {
  INewLink,
  INewUser,
  IUpdateLink,
  IUpdateSocials,
  IUpdateUser,
  ResetPasswordTypes,
} from "@/types";
import { handleBlocksData } from "../utils";

// ============================================================
// AUTH
// ============================================================

// ============================== SIGN UP
export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );
    if (!newAccount) throw Error;
    const avatarUrl = avatars.getInitials(user.name);
    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      imageUrl: avatarUrl,
    });
    return newUser;
  } catch (error) {
    return error;
  }
}

// ============================== SAVE USER TO DB
export async function saveUserToDB(user: {
  accountId: string;
  email: string;
  name: string;
  imageUrl?: URL;
}) {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );
    return newUser;
  } catch (error) {
    console.log(error);
  }
}

// ============================== SIGN IN
export async function signInAccount(user: { email: string; password: string }) {
  try {
    const session = await account.createEmailSession(user.email, user.password);
    return session;
  } catch (error) {
    console.log(error);
    return error;
  }
}

// ============================== Update Password
export async function updatePassword(password: string, oldPassword: string) {
  try {
    const session = await account.updatePassword(password, oldPassword);
    return session;
  } catch (error) {
    console.log(error);
  }
}

// ============================== GET ACCOUNT
export async function getAccount() {
  try {
    const currentAccount = await account.get();
    return currentAccount;
  } catch (error: any) {
    if (error.type == "user_blocked") {
      window.location.href = window.location.origin + "/account-blocked";
    }
    return error;
  }
}

// ============================== GET USER
export async function getCurrentUser() {
  try {
    const currentAccount: any = await getAccount();
    if (!currentAccount && currentAccount.code) throw Error;
    if (currentAccount && !currentAccount.code) {
      const currentUser = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.equal("accountId", currentAccount.$id)]
      );
      if (!currentUser) throw Error;
      return { ...currentAccount, ...currentUser.documents[0] };
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function resetPasswordRequest(email: string) {
  try {
    const requestResetPassword = await account.createRecovery(
      email,
      window.location.origin + "/auth/reset-password"
    );

    return requestResetPassword;
  } catch (error) {
    console.log(error);
  }
}

export async function verifyEmail() {
  try {
    const verifyEmail = await account.createVerification(
      window.location.origin + "/verify-account"
    );
    return verifyEmail;
  } catch (error) {
    return error;
  }
}

export async function updateVerification(userId: any, secret: any) {
  try {
    const verifyEmail = await account.updateVerification(userId, secret);
    return verifyEmail;
  } catch (error) {
    return error;
  }
}

export async function resetPassword(data: ResetPasswordTypes) {
  await account.updateRecovery(
    data.userId,
    data.secret,
    data.password,
    data.repeatPassword
  );

  // promise.then(
  //   function (response: any) {
  //     console.log(response); // Success
  //   },
  //   function (error: any) {
  //     console.log(error); // Failure
  //   }
  // );
}

// ============================== SIGN OUT
export async function signOutAccount() {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    console.log(error);
  }
}

// ============================== UPLOAD FILE
export async function uploadFile(file: File) {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );

    return uploadedFile;
  } catch (error) {
    console.log(error);
  }
}

// ============================== GET FILE URL
export function getFilePreview(fileId: string) {
  try {
    const fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
    console.log({ fileUrl });
    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    console.log(error);
  }
}

// ============================== DELETE FILE
export async function deleteFile(fileId: string) {
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId);

    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
}

// ============================================================
// USER
// ============================================================

// ============================== GET USERS
export async function getAllPlans() {
  console.log("getting all plans api");
  try {
    const allPlans = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.plansCollectionId
    );

    if (!allPlans) throw Error;

    return allPlans.documents;
  } catch (error) {
    console.log(error);
  }
}

export async function getUsers(limit?: number) {
  const queries: any[] = [Query.orderDesc("$createdAt")];

  if (limit) {
    queries.push(Query.limit(limit));
  }

  try {
    const users = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      queries
    );

    if (!users) throw Error;

    return users;
  } catch (error) {
    console.log(error);
  }
}

// ============================== GET USER BY ID
export async function getUserById(userId: string) {
  try {
    const user = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId
    );

    if (!user) throw Error;

    return user;
  } catch (error) {
    console.log(error);
  }
}

// ============================== UPDATE USER
export async function updateUser(user: IUpdateUser) {
  const hasFileToUpdate = user.file.length > 0;
  try {
    let image = {
      imageUrl: user.imageUrl,
      imageId: user.imageId,
    };

    if (hasFileToUpdate) {
      // Upload new file to appwrite storage
      const uploadedFile = await uploadFile(user.file[0]);
      if (!uploadedFile) throw Error;

      // Get new file url
      const fileUrl = getFilePreview(uploadedFile.$id);
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }

      image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
    }

    //  Update user
    const updatedUser = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      user.userId,
      {
        name: user.name,
        imageUrl: image.imageUrl,
      }
    );

    // Failed to update
    if (!updatedUser) {
      // Delete new file that has been recently uploaded
      if (hasFileToUpdate) {
        if (image.imageId) {
          await deleteFile(image.imageId);
        }
      }
      // If no new file uploaded, just throw error
      throw Error;
    }

    // Safely delete old file after successful update
    if (user.imageId && hasFileToUpdate) {
      await deleteFile(user.imageId);
    }

    return updatedUser;
  } catch (error) {
    console.log(error);
  }
}

// ============================== UPDATE To Pro
export async function upgradeToPro(user: any, license_key: string) {
  if (!license_key) return false;
  try {
    //  Update user
    const updatedUser = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      user.id,
      {
        is_pro: true,
        subscription_license_key: license_key,
      }
    );

    // Failed to update
    if (!updatedUser) {
      throw Error;
    }

    return updatedUser;
  } catch (error) {
    console.log(error);
  }
}

export const changeFileName = (file: any) => {
  console.log({ file });
  const selectedFile = file;
  const modifiedFile = new File([selectedFile], "new_file_name.jpg", {
    type: selectedFile.type,
  });
  return modifiedFile;
};

export async function createLink(link: INewLink) {
  try {
    // Upload file to appwrite storage
    // const modifiedFile = new File(
    //   [link.file[0]],
    //   `${link?.slug}${link.file[0]}`,
    //   { type: selectedFile.type }
    // );
    // console.log(modifiedFile);
    const uploadedFile = await uploadFile(link.file[0]);

    if (!uploadedFile) throw Error;

    // Get file url
    const fileUrl = getFilePreview(uploadedFile.$id);
    if (!fileUrl) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }

    // Create link
    const newLink = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.linkCollectionId,
      ID.unique(),
      {
        imageUrl: fileUrl,
        slug: link.slug,
        title: link.title,
        userId: link.userId,
        imageId: uploadedFile.$id,
        description: link.description,
      }
    );

    // Create Social Media
    await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.socialMediaCollectionId,
      ID.unique(),
      {
        link_id: newLink.$id,
      }
    );

    if (!newLink) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }

    return newLink;
  } catch (error) {
    console.log(error);
  }
}

// ============================== UPDATE Link
export async function updateLink(link: IUpdateLink) {
  const hasFileToUpdate = link?.file?.length > 0;

  try {
    let image = {
      imageUrl: link.imageUrl,
      imageId: link.imageId,
    };

    if (hasFileToUpdate) {
      // Upload new file to appwrite storage
      const uploadedFile = await uploadFile(link.file[0]);
      if (!uploadedFile) throw Error;

      // Get new file url
      const fileUrl = getFilePreview(uploadedFile.$id);
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }

      image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
    }

    //  Update post
    const updatedLink = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.linkCollectionId,
      link.linkId,
      {
        imageUrl: image.imageUrl,
        slug: link.slug,
        title: link.title,
        userId: link.userId,
        imageId: image.imageId,
        is_show_social_icons: link.is_show_social_icons,
        is_show_verified_icon: link.is_show_verified_icon,
        is_show_watermark: link.is_show_watermark,
        description: link.description,
        seo_description: link.seo_description || "",
        seo_title: link.seo_title || "",
        seo_keywords: link.seo_keywords || "",
        ga_tag: link?.ga_tag || "",
      }
    );

    // Failed to update
    if (!updatedLink) {
      // Delete new file that has been recently uploaded
      if (hasFileToUpdate) {
        await deleteFile(image.imageId);
      }

      // If no new file uploaded, just throw error
      throw Error;
    }

    // Safely delete old file after successful update
    if (hasFileToUpdate) {
      await deleteFile(link.imageId);
    }

    return updatedLink;
  } catch (error) {
    console.log(error);
  }
}

// ============================== UPDATE Link
export async function updateSocialMediaLinks(socialMedia: IUpdateSocials) {
  try {
    //  Update Social Links
    const updatedSocials = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.socialMediaCollectionId,
      socialMedia.id,
      {
        link_id: socialMedia.linkId,
        twitter: socialMedia.twitter,
        telegram: socialMedia.telegram,
        linked_in: socialMedia.linked_in,
        github: socialMedia.github,
        instagram: socialMedia.instagram,
      }
    );

    // Failed to update
    if (!updatedSocials) {
      // If no new file uploaded, just throw error
      throw Error;
    }

    return updatedSocials;
  } catch (error) {
    console.log(error);
  }
}

// ============================== DELETE Link
export async function deleteLinkById(link: any) {
  if (!link.$id) return;
  try {
    const isLinkDeleted = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.linkCollectionId,
      link.$id
    );

    if (!isLinkDeleted) throw Error;

    await deleteFile(link.imageId);

    const allLinkBlocksToDelete = await getLinkBlocksByLinkId(link.$id);
    if (allLinkBlocksToDelete) {
      await Promise.all(
        allLinkBlocksToDelete.map(async (block: any) => {
          await deleteLinkBlockById(block.$id);
        })
      );
    }

    return { success: true };
  } catch (error) {
    console.log(error);
  }
}

export async function deleteLinkBlockById(blockId: string) {
  try {
    const isBlockDeleted = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.linkBlocksCollectionId,
      blockId
    );
    if (!isBlockDeleted) throw Error;
    return { success: true };
  } catch (error) {
    console.log(error);
  }
}

export async function getUserLinks(userId: string) {
  const queries: any[] = [Query.orderDesc("$createdAt")];
  queries.push(Query.equal("userId", userId));

  try {
    const links = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.linkCollectionId,
      queries
    );

    if (!links) throw Error;

    return links.documents;
  } catch (error) {
    console.log(error);
  }
}

export async function createLinkBlock(block: any, index: any, link_id: any) {
  let blockVal = block;
  console.log({ blockVal });
  let link = block?.val?.link ?? null;
  if (blockVal?.val?.link) {
    delete blockVal?.val?.link;
  }

  try {
    // Create Block
    const newLink = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.linkBlocksCollectionId,
      ID.unique(),
      {
        link_id: link_id,
        block_type: block?.block_type ?? "",
        other_values: JSON.stringify(blockVal?.val),
        link: link,
        block_order: index,
      }
    );

    return newLink;
  } catch (error) {
    console.log(error);
  }
}

export async function manageLinkBlock(blocks: any, link_id: any) {
  let blocksData: any = [];
  await Promise.all(
    blocks.map(async (ele: any, i: any) => {
      if (ele.$id) {
        let updatedBlock = await updateLinkBlockById(ele, i, link_id);
        blocksData.push(updatedBlock);
      } else {
        console.log({ ele });
        let createdBlock = await createLinkBlock(ele, i, link_id);
        blocksData.push(createdBlock);
      }
    })
  );

  // return blocksData;
  return handleBlocksData(blocksData);

  // try {
  //   // Create Block
  //   const updatedBlock = await databases.updateDocument(
  //     appwriteConfig.databaseId,
  //     appwriteConfig.linkBlocksCollectionId,
  //     linkBlock.$id,
  //     {
  //       link_id: linkBlock?.link_id,
  //       blocks: blocksStringArray,
  //     }
  //   );

  //   return updatedBlock;
  // } catch (error) {
  //   console.log(error);
  // }
}

export async function updateLinkBlockById(
  block: any,
  index: any,
  link_id: any
) {
  let blockVal = block;
  let stringifiedValues = JSON.stringify(blockVal?.val);
  let link = block?.val?.link ?? null;
  delete blockVal.val.link;

  try {
    const updatedBlock = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.linkBlocksCollectionId,
      block.$id,
      {
        link_id: link_id,
        block_type: block?.block_type ?? "",
        other_values: stringifiedValues,
        link: link,
        block_order: index,
        is_private: block?.is_private ?? false,
        is_featured: block?.is_featured ?? false,
      }
    );
    return updatedBlock;
  } catch (error) {
    console.log(error);
  }
}

export async function handleBlockClick(block: any) {
  return;
  try {
    const currentBlock = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.linkBlocksCollectionId,
      block.$id
    );

    const updatedBlock = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.linkBlocksCollectionId,
      block.$id,
      {
        total_clicks: currentBlock.total_clicks + 1,
      }
    );
    return updatedBlock;
  } catch (error) {
    console.log(error);
  }
}

export async function getLinkBlocksByLinkId(link_id: string, queries?: any) {
  try {
    const pageSize = 30;
    let offset = 0;
    let allBlocks: any = [];
    let blocksData: any;
    let allQuery: any = [];
    if (queries) {
      allQuery = [...queries];
    }
    do {
      blocksData = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.linkBlocksCollectionId,
        [
          Query.equal("link_id", link_id),
          Query.limit(pageSize),
          Query.offset(offset),
          ...allQuery,
        ]
      );

      if (blocksData.documents) {
        allBlocks = allBlocks.concat(blocksData.documents);
        offset += pageSize;
      }
    } while (blocksData.documents?.length === pageSize);

    return handleBlocksData(blocksData.documents);
  } catch (error) {
    console.log(error);
  }
}

export async function validateLink(link: string) {
  const queries: any[] = [Query.equal("slug", link)];

  try {
    const links = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.linkCollectionId,
      queries
    );

    if (!links) throw Error;

    return links.documents;
  } catch (error) {
    console.log(error);
  }
}

// ============================== GET USER BY ID
export async function getLinkBySlug(slug: any) {
  try {
    const link = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.linkCollectionId,
      [Query.equal("slug", slug)]
    );

    if (!link) throw Error;

    return link?.documents[0];
  } catch (error) {
    console.log(error);
  }
}

// ============================== GET USER BY ID
export async function getSocialMediaByLinkId(link_id: string) {
  try {
    const socials = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.socialMediaCollectionId,
      [Query.equal("link_id", link_id)]
    );
    if (socials?.documents.length == 0) {
      // Create Social Media
      const socialMedia = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.socialMediaCollectionId,
        ID.unique(),
        {
          link_id: link_id,
        }
      );
      console.log({ socialMedia });

      if (!socialMedia) throw Error;
      return socialMedia;
    }
    if (!socials) throw Error;

    return socials?.documents[0];
  } catch (error) {
    console.log(error);
  }
}

// ============================== SAVE USER TO DB
export async function saveStatsToDb(data: {
  link_id: string;
  ip_address: string;
  city: string;
  region: string;
  country: string;
  zip: string;
  countryCode: string;
  referrer?: any;
}) {
  try {
    const isAlreadyAvailableIp = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.statsCollectionId,
      [
        Query.equal("ip_address", data?.ip_address),
        Query.equal("link_id", data?.link_id),
      ]
    );

    if (isAlreadyAvailableIp.total > 0) {
      const statsUpdated = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.statsCollectionId,
        isAlreadyAvailableIp.documents[0].$id,
        {
          total_views_by_ip:
            isAlreadyAvailableIp.documents[0].total_views_by_ip + 1,
        }
      );
      return statsUpdated;
    } else {
      const statsSaved = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.statsCollectionId,
        ID.unique(),
        data
      );
      return statsSaved;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getStatsByLinkId(link_id: string) {
  try {
    const pageSize = 30;
    let offset = 0;
    let allStatsData: any = [];
    let statsData: any;
    do {
      statsData = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.statsCollectionId,
        [
          Query.equal("link_id", link_id),
          Query.limit(pageSize),
          Query.offset(offset),
        ]
      );

      if (statsData.documents) {
        allStatsData = allStatsData.concat(statsData.documents);
        offset += pageSize;
      }
    } while (statsData.documents?.length === pageSize);

    return allStatsData;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getUseLocale() {
  try {
    const userLocation = await locale.get();
    console.log({ userLocation });

    // const promise = await avatars.getQR("[TEXT]");
    // console.log({ promise });
  } catch (error) {
    console.log({ error });
  }
}
