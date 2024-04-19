"use client";

import userApi from "@/apis/user.api";
import { useToast } from "@/components/ui/use-toast";
import { handleErrorApi } from "@/lib/utils";
import { useState } from "react";

export interface FollowProps {
  user_id: string;
}

export default function Follow({ user_id }: FollowProps) {
  const [isFollowed, setIsFollowed] = useState<boolean>(false);
  const { toast } = useToast();
  const handleFollow = async () => {
    try {
      if (isFollowed) {
        const res = await userApi.unFollow(user_id);
        toast({
          description: res.payload.message,
        });
        setIsFollowed(false);
      } else {
        const res = await userApi.follow(user_id);
        toast({
          description: res.payload.message,
        });
        setIsFollowed(true);
      }
    } catch (error) {
      handleErrorApi(error);
    }
  };
  return (
    <span onClick={handleFollow} className="text-blue-500 font-bold text-xs cursor-pointer hover:opacity-70">
      {isFollowed ? "unFollow" : "Follow"}
    </span>
  );
}
