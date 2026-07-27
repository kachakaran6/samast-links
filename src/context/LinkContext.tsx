import { createContext, useContext, useEffect, useState } from "react";

import { ILink } from "@/types";
import { useUserContext } from "./AuthContext";
import { useGetUserLinks } from "@/lib/react-query/queries";

export const INITIAL_LINK: any = [];

const INITIAL_STATE = {
  links: INITIAL_LINK,
  linksLoading: true,
  setLinks: () => {},
  setLinksLoading: () => {},
  updateLinkById: () => {},
  removeLinkById: () => {},
  addNewLink: () => {},
  getLinkById: () => {},
};

type IContextType = {
  links: any[];
  linksLoading: boolean;
  setLinks: React.Dispatch<React.SetStateAction<ILink>>;
  setLinksLoading: React.Dispatch<React.SetStateAction<boolean>>;
  updateLinkById: any;
  removeLinkById: any;
  addNewLink: any;
  getLinkById: any;
};

const LinkContext = createContext<IContextType>(INITIAL_STATE);

export function LinkProvider({ children }: { children: React.ReactNode }) {
  const [links, setLinks] = useState<any>(INITIAL_LINK);
  const [linksLoading, setLinksLoading] = useState(true);

  const { user } = useUserContext();
  const { mutateAsync: getUserLinks } = useGetUserLinks();
  useEffect(() => {
    if (!user.id) return;
    const fetchLinks = getUserLinks(user.id);
    fetchLinks.then((res: any) => {
      setLinks(res);
      setLinksLoading(false);
    });
  }, [user]);

  const updateLinkById = (id: string, newData: any) => {
    const updatedData: any = [...links];
    let index = findIndexById(links, id);
    updatedData[index] = newData;
    setLinks(updatedData);
  };

  const findIndexById = (array: any, idToFind: any) => {
    return array.findIndex((obj: any) => obj.$id === idToFind);
  };

  const addNewLink = (data: any) => {
    const updatedData: any = [...links];
    updatedData.unshift(data);
    setLinks(updatedData);
  };

  const removeLinkById = (id: string) => {
    if (links.length > 0) {
      const updatedData: any = [...links];
      let index = findIndexById(links, id);
      updatedData.splice(index, 1);
      setLinks(updatedData);
    }
  };

  const getLinkById = (link_id: string) => {
    const tempLink: any = links.filter((ele: any) => ele.$id == link_id)[0];
    return tempLink;
  };

  const value = {
    links,
    setLinks,
    linksLoading,
    setLinksLoading,
    updateLinkById,
    removeLinkById,
    addNewLink,
    getLinkById,
  };

  return <LinkContext.Provider value={value}>{children}</LinkContext.Provider>;
}

export const useLinkContext = () => useContext(LinkContext);
