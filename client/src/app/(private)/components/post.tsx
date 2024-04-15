import TextMore from "@/components/TextMore";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Post as PostType } from "@/types/post.type";
import { formatDistance } from "date-fns";
import Image from "next/image";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { FiBookmark, FiSend } from "react-icons/fi";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Like from "./like";
import Bookmark from "./bookmark";

export interface PostProps {
  post: PostType;
}

export default function Post({ post }: PostProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="w-10 h-10">
            <AvatarImage src={post.user.avatar || "https://github.com/shadcn.png"} />
          </Avatar>
          <article className="flex items-center gap-2 text-zinc-500 text-sm">
            <h3 className="font-bold text-black">{post.user.username}</h3>
            <span>{formatDistance(new Date(post.created_at), new Date(), { addSuffix: true }).replace("about ", "")}</span>
          </article>
        </div>
        <HiOutlineDotsHorizontal className="w-6 h-6" />
      </div>
      <div>
        <Image src={post.medias[0].url} width={500} height={500} className="object-cover rounded-md w-full h-full" alt="post-image" />
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-4">
          <Like liked={post.likes} post_id={post._id} />
          <FaRegComment className="w-7 h-7" />
          <FiSend className="w-7 h-7 " />
        </div>
        <Bookmark post_id={post._id} bookmarked={post.bookmarks.length > 0} />
      </div>
      <article className="flex flex-col gap-2 text-sm">
        {post.likes.length > 0 && <h3 className="font-bold">{post.likes.length} likes</h3>}
        <TextMore containerClass="inline-block whitespace-pre-wrap" content={post.captions}>
          <span className="font-bold mr-1">{post.user.username}</span>
        </TextMore>
        <span className="text-zinc-400">View all 3 comments</span>
        <Input placeholder="Add a comment..." className="border-0 border-b rounded-none pl-0 focus-within:!ring-0 focus-within:!ring-offset-0" />
      </article>
    </div>
  );
}
