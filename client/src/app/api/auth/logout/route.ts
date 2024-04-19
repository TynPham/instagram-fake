import authApi from "@/apis/auth.api";
import { HttpError } from "@/utils/http";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const cookiesStore = cookies();
  const access_token = cookiesStore.get("access_token")?.value;
  const refresh_token = cookiesStore.get("refresh_token")?.value;

  if (!access_token || !refresh_token) {
    return Response.json({ message: "Invalid refresh token" }, { status: 401 });
  }

  try {
    const result = await authApi.logoutFromNextServer(access_token, refresh_token);

    return Response.json(result, {
      status: 200,
      headers: {
        "Set-cookie": [`access_token=; HttpOnly; Path=/; Max-Age=0`, `refresh_token=; HttpOnly; Path=/; Max-Age=0`] as any,
      },
    });
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, { status: error.status });
    }
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
