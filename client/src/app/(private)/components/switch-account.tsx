"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AppContext, AppContextType } from "@/provider/app.provider";
import { useContext } from "react";

export interface SwitchAccountProps {}

export default function SwitchAccount(props: SwitchAccountProps) {
  const { user } = useContext<AppContextType>(AppContext);
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Avatar className="w-12 h-12">
          <AvatarImage src={user?.avatar || "https://github.com/shadcn.png"} />
        </Avatar>
        <article>
          <h3 className="font-bold">{user?.username}</h3>
          <span className="text-zinc-500">{user?.name}</span>
        </article>
      </div>
      <span className="text-blue-500 font-bold text-xs cursor-pointer hover:opacity-70">Switch</span>
    </div>
  );
}
