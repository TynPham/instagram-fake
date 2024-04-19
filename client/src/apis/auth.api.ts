import { LoginReqBodyType, LoginResType, RegisterReqBodyType } from "@/schemaValidations/auth.schema";
import http from "@/utils/http";

const AUTH_URL = "/auth";

const authApi = {
  login: (body: LoginReqBodyType) => http.post<LoginResType>(`${AUTH_URL}/login`, body),
  register: (body: RegisterReqBodyType) => http.post<LoginResType>(`${AUTH_URL}/register`, body),
  auth: (token: { access_token: string; refresh_token: string }) =>
    http.post(
      "/api/auth",
      { token },
      {
        baseUrl: "",
      }
    ),
  logout: () =>
    http.post<{ payload: { message: string }; status: number }>(
      "/api/auth/logout",
      {},
      {
        baseUrl: "",
      }
    ),
  logoutFromNextServer: (access_token: string, refresh_token: string) =>
    http.post<{ message: string }>(
      `${AUTH_URL}/logout`,
      { refresh_token },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    ),
};

export default authApi;
