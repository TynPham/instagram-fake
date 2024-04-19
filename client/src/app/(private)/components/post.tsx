import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Post as PostType } from "@/types/post.type";
import { formatDistance } from "date-fns";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import ActionPost from "./action.post";
import Image from "next/image";

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
        <Image src={post.medias[0]?.url} width={500} height={500} className="object-cover rounded-md w-full h-full" alt="post-image" />
      </div>
      <ActionPost post={post} />
    </div>
  );
}
