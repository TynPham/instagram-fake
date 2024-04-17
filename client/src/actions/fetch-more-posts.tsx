"use server";

import postsApi from "@/apis/posts.api";
import { Pagination } from "@/types/common.type";
import { cookies } from "next/headers";

export async function fetchMorePosts({ page, limit }: Pagination) {
  try {
    const cookieStore = cookies();
    const access_token = cookieStore.get("access_token")?.value;
    const res = await postsApi.getNewFeeds(access_token as string, { page, limit });
    const newPosts = res.payload.result;
    return newPosts;
  } catch (error: unknown) {
    throw new Error(`Error: ${error}`);
  }
}
