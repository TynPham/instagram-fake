"use client";

import { User } from "@/types/user.type";
import { clientToken } from "@/utils/http";
import { Dispatch, SetStateAction, createContext, useState } from "react";

export type AppContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

const initAppContext: AppContextType = {
  user: null,
  setUser: () => null,
};

export const AppContext = createContext<AppContextType>(initAppContext);

export interface AppProviderProps {
  children: React.ReactNode;
  initToken: {
    access_token?: string;
    refresh_token?: string;
  };
  user?: User | null;
}

export default function AppProvider({ children, initToken, user: userProp = null }: AppProviderProps) {
  const [user, setUser] = useState<User | null>(userProp);
  useState(() => {
    if (typeof window !== "undefined") {
      clientToken.setAccessToken(initToken?.access_token || "");
      clientToken.setRefreshToken(initToken?.refresh_token || "");
    }
  });
  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
