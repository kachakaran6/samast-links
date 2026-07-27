import { createContext, useContext, useState } from "react";

// Create a context
interface SettingsContextProps {
  settings: {};
  updateSettings: (block: any) => void;
}

export const INITIAL_SETTINGS = {
  settings: {
    current_plan: {
      type: "free",
      purchased_date: "",
      purchased_amount: 0,
      billing_type: "",
    },
    is_show_socials: false,
    user_name: "",
    total_referrers: 0,
    today_total_visitors: 0,
  },
  updateSettings: () => {},
};

const SettingsContext = createContext<SettingsContextProps>(INITIAL_SETTINGS);

// Create a provider component
export function SettingsProvider({ children }: any) {
  const [settings, setSettings] = useState<Object>({});
  const updateSettings = () => {
    setSettings({});
  };

  const contextValue = {
    settings,
    updateSettings,
  };

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
}

// Create a custom hook to use the context
export function useSettings() {
  return useContext(SettingsContext);
}
