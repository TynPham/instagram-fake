export async function POST(request: Request) {
  const body = await request.json();
  const { access_token, refresh_token } = body.token;

  if (!access_token || !refresh_token) {
    return Response.json({ message: "Invalid token" });
  }
  return Response.json(body, {
    status: 200,
    headers: {
      "Set-cookie": [
        `access_token=${access_token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=3600`,
        `refresh_token=${refresh_token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=3600`,
      ] as any,
    },
  });
}
