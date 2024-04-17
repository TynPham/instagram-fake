import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";

export async function POST(request: Request) {
  const body = await request.json();
  const { access_token, refresh_token } = body.token;

  if (!access_token || !refresh_token) {
    return Response.json({ message: "Invalid token" });
  }
  try {
    const decoded = jwt.decode(access_token) as JwtPayload;
    const expires = new Date((decoded.exp as number) * 1000).toUTCString();
    return Response.json(body, {
      status: 200,
      headers: {
        "Set-cookie": [
          `access_token=${access_token}; HttpOnly; Expires=${expires}; Path=/; SameSite=Lax;`,
          `refresh_token=${refresh_token}; HttpOnly; Expires=${expires}; Path=/; SameSite=Lax;`,
        ] as any,
      },
    });
  } catch (error) {
    return Response.json(error, {
      status: error instanceof JsonWebTokenError ? 401 : 500,
    });
  }
}
