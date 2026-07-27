import { useNavigate } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";

import { IUser } from "@/types";
import { getCurrentUser } from "@/lib/supabase/api";

export const INITIAL_USER = {
  id: "",
  name: "",
  email: "",
  status: false,
  emailVerification: false,
  imageUrl: "",
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
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
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [currentPlan, setCurrentPlan] = useState("free");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const checkAuthUser = async () => {
    setIsLoading(true);
    try {
      const currentAccount = await getCurrentUser();
      if (currentAccount) {
        let tempUser = {
          id: currentAccount.$id,
          name: currentAccount.name,
          email: currentAccount.email,
          status: currentAccount.status,
          emailVerification: currentAccount.emailVerification,
          imageUrl: currentAccount.imageUrl,
          is_pro: currentAccount.is_pro,
          subscription_license_key: currentAccount.subscription_license_key,
        };
        setUser(tempUser);
        localStorage.setItem("currentUser", JSON.stringify(tempUser));
        setIsAuthenticated(true);
        if (currentAccount && !currentAccount.emailVerification) {
          if (!window.location.pathname.includes("verify-account")) {
            navigate("/verify-account");
          }
          return false;
        } else if (currentAccount && currentAccount.emailVerification) {
          if (window.location.pathname.includes("verify-account")) {
            navigate("/link");
          }
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!location.pathname.includes("auth")) {
      const cookieFallback = localStorage.getItem("cookieFallback");
      if (
        cookieFallback === "[]" ||
        cookieFallback === null ||
        cookieFallback === undefined
      ) {
        console.log("navigating from 88");
        navigate("auth/sign-in");
      }
      checkUserAuth();
    }
  }, []);

  const checkUserAuth = async () => {
    const isLoggedIn = await checkAuthUser();
    if (!isLoggedIn && !window.location.pathname.includes("verify-account")) {
      setIsAuthenticated(false);
      setUser(INITIAL_USER);
      localStorage.removeItem("currentUser");
      localStorage.removeItem("cookieFallback");
      console.log("navigating from 101");
      navigate("/");
    }
  };

  useEffect(() => {
    if (user.email !== "") {
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
