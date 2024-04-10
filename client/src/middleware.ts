import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privateUrls = ["/"];
const authUrls = ["/login", "/register"];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const access_token = request.cookies.get("access_token");
  if (authUrls.includes(pathname) && access_token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (privateUrls.includes(pathname) && !access_token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login", "/register", "/"],
};
