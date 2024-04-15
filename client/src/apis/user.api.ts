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
};

export default userApi;
