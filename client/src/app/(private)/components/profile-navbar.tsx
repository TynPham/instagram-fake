"use client";

import { Avatar } from "@/components/ui/avatar";
import { AppContext, AppContextType } from "@/provider/app.provider";
import { AvatarImage } from "@radix-ui/react-avatar";
import { useContext } from "react";

export interface ProfileNavBarProps {}

export default function ProfileNavBar(props: ProfileNavBarProps) {
  const { user } = useContext<AppContextType>(AppContext);
  return (
    <li className="flex items-center gap-4 py-3 px-2 hover:bg-zinc-200 rounded-lg transition-all duration-300 cursor-pointer group">
      <Avatar className="w-7 h-7 group-hover:scale-110 transition-all">
        <AvatarImage src={user?.avatar || "https://github.com/shadcn.png"} />
      </Avatar>
      <span className="hidden lg:inline">Profile</span>
    </li>
  );
}
