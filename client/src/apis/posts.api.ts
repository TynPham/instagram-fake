import { Pagination, SuccessResponseWithPagination } from "@/types/common.type";
import { Post } from "@/types/post.type";
import http from "@/utils/http";

const GET_POSTS_URL = "/posts";

const postsApi = {
  getNewFeeds: (access_token: string, pagination: Pagination) =>
    http.get<SuccessResponseWithPagination<Post[]>>(`${GET_POSTS_URL}/new-feeds?page=${pagination.page}&limit=${pagination.limit}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: "no-store",
    }),
};

export default postsApi;
