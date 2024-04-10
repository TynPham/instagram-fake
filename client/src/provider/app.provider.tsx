"use client";

import { clientToken } from "@/utils/http";
import { useState } from "react";

export interface AppProviderProps {
  children: React.ReactNode;
  initToken: {
    access_token?: string;
    refresh_token?: string;
  };
}

export default function AppProvider({ children, initToken }: AppProviderProps) {
  useState(() => {
    if (typeof window !== "undefined") {
      clientToken.setAccessToken(initToken?.access_token || "");
      clientToken.setRefreshToken(initToken?.refresh_token || "");
    }
  });
  return <div>{children}</div>;
}
