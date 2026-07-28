import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/lib/react-query/queryKeys";
import {
  createUserAccount,
  signInAccount,
  getCurrentUser,
  signOutAccount,
  getUsers,
  getUserById,
  updateUser,
  createLink,
  updateLink,
  deleteLinkById,
  getUserLinks,
  getLinkBlocksByLinkId,
  validateLink,
  updatePassword,
} from "@/lib/supabase/api";
import { INewUser, IUpdateUser, INewLink, IUpdateLink } from "@/types";

// ============================================================
// AUTH QUERIES
// ============================================================

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
};

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  });
};

export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: signOutAccount,
  });
};

// ============================================================
// USER QUERIES
// ============================================================

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: getCurrentUser,
  });
};

export const useGetUsers = (limit?: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USERS],
    queryFn: () => getUsers(limit),
  });
};

export const useGetUserById = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_BY_ID, userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  });
};

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: (user: IUpdateUser) => updateUser(user),
  });
};

// ============================================================
// LINK QUERIES
// ============================================================

export const useCreateLink = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: INewLink) => createLink(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_LINKS],
      });
    },
  });
};

export const useUpdateLink = () => {
  return useMutation({
    mutationFn: (post: IUpdateLink) => updateLink(post),
  });
};

export const useValidateSlug = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (link: string) => validateLink(link),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.VALIDATE_LINK, data],
      });
    },
  });
};

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: (password: any) => updatePassword(password.new, password.old),
  });
};

export const useDeleteLink = () => {
  return useMutation({
    mutationFn: (link: string) => deleteLinkById(link),
  });
};

export const useGetUserLinks = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => getUserLinks(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_LINKS],
      });
    },
  });
};

export const useGetLinks = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_LINKS, userId],
    queryFn: async () => {
      const data = await getUserLinks(userId);
      return Array.isArray(data) ? { documents: data } : data || { documents: [] };
    },
    enabled: !!userId,
  });
};

export const useGetLinkBlocks = (linkId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_LINK_BLOCKS, linkId],
    queryFn: async () => {
      const data = await getLinkBlocksByLinkId(linkId);
      return Array.isArray(data) ? { documents: data } : data || { documents: [] };
    },
    enabled: !!linkId,
  });
};
