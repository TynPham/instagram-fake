"use client";

import postsApi from "@/apis/posts.api";
import { Button } from "@/components/ui/button";
import { AppContext, AppContextType } from "@/provider/app.provider";
import { Like as LikeType } from "@/types/post.type";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

export interface LikeProps {
  liked: LikeType[];
  post_id: string;
}

export default function Like({ liked, post_id }: LikeProps) {
  const { user } = useContext<AppContextType>(AppContext);
  const [isLiked, setIsLiked] = useState<boolean>(liked.some((like) => like.user_id === user?._id));
  const router = useRouter();

  const handleLike = async () => {
    setIsLiked(!isLiked);
    if (isLiked) {
      await postsApi.unLikePost(post_id);
    } else {
      await postsApi.likePost(post_id);
    }
    router.refresh();
  };

  return (
    <Button size="icon" variant="outline" className="border-none" onClick={handleLike}>
      {!isLiked && <AiOutlineHeart className="w-7 h-7 " />}
      {isLiked && <AiFillHeart className="w-7 h-7 text-red-500 animate-like" />}
    </Button>
  );
}
