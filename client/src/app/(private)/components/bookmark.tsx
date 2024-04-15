"use client";

import postsApi from "@/apis/posts.api";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

export interface BookmarkProps {
  bookmarked: boolean;
  post_id: string;
}

export default function Bookmark({ bookmarked, post_id }: BookmarkProps) {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(bookmarked);
  const router = useRouter();

  const handleBookmark = async () => {
    setIsBookmarked(!isBookmarked);
    console.log(isBookmarked);
    if (isBookmarked) {
      await postsApi.unBookmarkPost(post_id);
    } else {
      await postsApi.bookmarkPost(post_id);
    }
    router.refresh();
  };

  return (
    <Button size="icon" variant="outline" className="border-none" onClick={handleBookmark}>
      {!isBookmarked && <FaRegBookmark className="w-6 h-6 " />}
      {isBookmarked && <FaBookmark className="w-6 h-6 text-black animate-like" />}
    </Button>
  );
}
