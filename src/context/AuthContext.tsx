import { createContext, useContext, useEffect, useState } from "react";

import { IUser } from "@/types";
import { getCurrentUser } from "@/lib/supabase/api";

export const INITIAL_USER: IUser = {
  id: "",
  name: "",
  email: "",
  status: false,
  emailVerification: false,
  imageUrl: "",
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: true,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
  currentPlan: "free",
};

type IContextType = {
  user: IUser;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
  currentPlan: string;
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [currentPlan, setCurrentPlan] = useState("free");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthUser = async (): Promise<boolean> => {
    setIsLoading(true);
    try {
      const currentAccount: any = await getCurrentUser();
      if (currentAccount && (currentAccount.$id || currentAccount.id || currentAccount.email)) {
        const tempUser: IUser = {
          id: currentAccount.$id || currentAccount.id,
          name: currentAccount.name || "Creator",
          username: currentAccount.username || currentAccount.name || "creator",
          email: currentAccount.email || "",
          status: true,
          emailVerification: true,
          imageUrl: currentAccount.imageUrl || "/assets/icons/profile-placeholder.svg",
          is_pro: Boolean(currentAccount.is_pro),
          subscription_license_key: currentAccount.subscription_license_key || "",
        };
        setUser(tempUser);
        setIsAuthenticated(true);
        localStorage.setItem("currentUser", JSON.stringify(tempUser));
        return true;
      }

      // Check fallback currentUser in localStorage
      const stored = localStorage.getItem("currentUser");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed && (parsed.id || parsed.email)) {
            const tempUser: IUser = {
              id: parsed.id || `user_${Date.now()}`,
              name: parsed.name || "Creator",
              username: parsed.username || parsed.name || "creator",
              email: parsed.email || "",
              status: true,
              emailVerification: true,
              imageUrl: parsed.imageUrl || "/assets/icons/profile-placeholder.svg",
              is_pro: Boolean(parsed.is_pro),
              subscription_license_key: parsed.subscription_license_key || "",
            };
            setUser(tempUser);
            setIsAuthenticated(true);
            return true;
          }
        } catch (e) {
          // ignore
        }
      }

      setIsAuthenticated(false);
      setUser(INITIAL_USER);
      return false;
    } catch (error) {
      console.error("checkAuthUser error:", error);
      setIsAuthenticated(false);
      setUser(INITIAL_USER);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuthUser();
  }, []);

  useEffect(() => {
    if (user?.email) {
      if (user.is_pro) {
        setCurrentPlan("pro");
      } else {
        setCurrentPlan("free");
      }
    }
  }, [user]);

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
    currentPlan,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useUserContext = () => useContext(AuthContext);
