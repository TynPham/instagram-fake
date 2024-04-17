"use client";

import { Fragment, useContext, useState } from "react";
import { Post } from "@/types/post.type";
import { Button } from "@/components/ui/button";
import { FaRegComment } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import BookmarkButton from "./bookmark-button";
import TextMore from "@/components/TextMore";
import { Input } from "@/components/ui/input";
import { AppContext, AppContextType } from "@/provider/app.provider";
import postsApi from "@/apis/posts.api";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { handleErrorApi } from "@/lib/utils";

export interface ActionPostProps {
  post: Post;
}

export default function ActionPost({ post }: ActionPostProps) {
  const { user } = useContext<AppContextType>(AppContext);
  const [isLiked, setIsLiked] = useState<boolean>(post.likes.some((like) => like.user_id === user?._id));
  const [likes, setLikes] = useState<number>(post.likes.length);

  const handleLike = async () => {
    if (isLiked) {
      await postsApi
        .unLikePost(post._id)
        .then(() => {
          setLikes(likes - 1);
          setIsLiked(false);
        })
        .catch((error) => handleErrorApi(error));
    } else {
      await postsApi
        .likePost(post._id)
        .then(() => {
          setLikes(likes + 1);
          setIsLiked(true);
        })
        .catch((error) => handleErrorApi(error));
    }
  };

  return (
    <Fragment>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Button size="icon" variant="outline" className="border-none" onClick={handleLike}>
            {!isLiked && <AiOutlineHeart className="w-7 h-7 " />}
            {isLiked && <AiFillHeart className="w-7 h-7 text-red-500 animate-like" />}
          </Button>
          <Button size="icon" variant="outline" className="border-none">
            <FaRegComment className="w-7 h-7" />
          </Button>
          <Button size="icon" variant="outline" className="border-none">
            <FiSend className="w-7 h-7 " />
          </Button>
        </div>
        <BookmarkButton post_id={post._id} bookmarked={post.bookmarks.length > 0} />
      </div>
      <article className="flex flex-col gap-2 text-sm">
        {likes > 0 && <h3 className="font-bold">{likes} likes</h3>}
        <TextMore containerClass="inline-block whitespace-pre-wrap" content={post.captions}>
          <span className="font-bold mr-1">{post.user.username}</span>
        </TextMore>
        <span className="text-zinc-400">View all 3 comments</span>
        <Input placeholder="Add a comment..." className="border-0 border-b rounded-none pl-0 focus-within:!ring-0 focus-within:!ring-offset-0" />
      </article>
    </Fragment>
  );
}
