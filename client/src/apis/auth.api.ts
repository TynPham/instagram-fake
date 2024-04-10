import { LoginReqBodyType, LoginResType, RegisterReqBodyType } from "@/schemaValidations/auth.schema";
import http from "@/utils/http";

const authApi = {
  login: (body: LoginReqBodyType) => http.post<LoginResType>("/auth/login", body),
  register: (body: RegisterReqBodyType) => http.post<LoginResType>("/auth/register", body),
  auth: (token: { access_token: string; refresh_token: string }) =>
    http.post(
      "/api/auth",
      { token },
      {
        baseUrl: "",
      }
    ),
};

export default authApi;
