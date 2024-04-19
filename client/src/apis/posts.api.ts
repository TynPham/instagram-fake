import { Pagination, SuccessResponse, SuccessResponseWithPagination } from "@/types/common.type";
import { Bookmark, CreatePostBodyReq, Like, Post } from "@/types/post.type";
import http from "@/utils/http";

const POSTS_URL = "/posts";

const postsApi = {
  getNewFeeds: (access_token: string, pagination: Pagination) =>
    http.get<SuccessResponseWithPagination<Post[]>>(`${POSTS_URL}/new-feeds?page=${pagination.page}&limit=${pagination.limit}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: "no-store",
    }),

  likePost: (post_id: string) =>
    http.post<SuccessResponse<Like>>("/likes", {
      post_id,
    }),
  unLikePost: (post_id: string) => http.delete<SuccessResponse<Like>>(`/likes${POSTS_URL}/${post_id}`),

  bookmarkPost: (post_id: string) =>
    http.post<SuccessResponse<Bookmark>>("/bookmarks", {
      post_id,
    }),
  unBookmarkPost: (post_id: string) => http.delete<SuccessResponse<Like>>(`/bookmarks${POSTS_URL}/${post_id}`),

  createPost: (body: CreatePostBodyReq) => http.post<SuccessResponse<{ [p: string]: string }>>(POSTS_URL, body),
};

export default postsApi;
