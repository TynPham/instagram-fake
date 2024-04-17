"use client";

import { Post as PostType } from "@/types/post.type";
import { useEffect, useState } from "react";
import Post from "./post";
import { useInView } from "react-intersection-observer";
import { DEFAULT_LIMIT_PAGINATION } from "@/constants/common";
import { fetchMorePosts } from "@/actions/fetch-more-posts";
import { Loader2 } from "lucide-react";

export interface PostListsProps {
  initPosts: PostType[];
}

export default function PostLists({ initPosts }: PostListsProps) {
  const [page, setPage] = useState<number>(1);
  const [posts, setPosts] = useState<PostType[]>(initPosts);
  const [isFetchMores, setIsFetchMores] = useState<boolean>(initPosts.length > 0);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      handleFetchMorePosts();
    }
  }, [inView]);

  const handleFetchMorePosts = async () => {
    const newPosts = await fetchMorePosts({ page: page + 1, limit: DEFAULT_LIMIT_PAGINATION });
    if (newPosts.length === 0) {
      setIsFetchMores(false);
      return;
    }
    setPosts([...posts, ...newPosts]);
    setPage(page + 1);
  };

  return (
    <div className="flex flex-col gap-2 md:w-[80%]">
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
      {isFetchMores && <Loader2 ref={ref} className="mx-auto mt-6 h-8 w-8 animate-spin" />}
      {!isFetchMores && <p className="text-zinc-500 mt-6 text-center">No more posts</p>}
    </div>
  );
}
