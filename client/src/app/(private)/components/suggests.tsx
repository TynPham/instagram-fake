import userApi from "@/apis/user.api";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cookies } from "next/headers";
import * as React from "react";
import Follow from "./follow";

export interface SuggestsProps {}

export default async function Suggests(props: SuggestsProps) {
  const cookieStore = cookies();
  const access_token = cookieStore.get("access_token")?.value;
  const suggestsUser = await userApi.getSuggests(access_token as string);
  return (
    <ul className="flex flex-col gap-4">
      {suggestsUser.payload.result.map((user) => (
        <li key={user._id} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="w-12 h-12">
              <AvatarImage src={user.avatar || "https://github.com/shadcn.png"} />
            </Avatar>
            <article>
              <h3 className="font-bold">{user.username}</h3>
              <span className="text-zinc-500">Suggested for you</span>
            </article>
          </div>
          <Follow user_id={user._id} />
        </li>
      ))}
    </ul>
  );
}
