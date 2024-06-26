import { SuccessResponse } from "@/types/common.type";
import { User } from "@/types/user.type";
import http from "@/utils/http";

const USERS_URL = "/users";

const userApi = {
  getMe: (access_token: string) =>
    http.get<SuccessResponse<User>>(`${USERS_URL}/me`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }),

  getSuggests: (access_token: string) =>
    http.get<SuccessResponse<User[]>>(`${USERS_URL}/suggests`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }),

  follow: (followed_user_id: string) => http.post<{ message: string }>(`${USERS_URL}/follow`, { followed_user_id }),
  unFollow: (followed_user_id: string) => http.delete<{ message: string }>(`${USERS_URL}/follow/${followed_user_id}`),
};

export default userApi;
