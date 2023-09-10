import { NextRequest, NextResponse } from "next/server";
import { verify } from "./lib/jwt";

async function isAuthenticated(req: NextRequest) {
  try {
    const token = req.cookies.get("token");

    if (!token) {
      return false;
    }
    const jwt = await verify(token.value);
    console.log(jwt);

    if (!jwt || !jwt.payload.userId) {
      return false;
    }
    return true;
  } catch (err) {
    console.log("jwt error", err);
    return false;
  }
}

export async function middleware(req: any) {
  const requestedPathname = req.nextUrl.pathname;

  const isAuth = await isAuthenticated(req);
  console.log(isAuth);

  if (requestedPathname === "/login" && isAuth === true) {
    return NextResponse.redirect(new URL("/feed", req.url));
  } else if (requestedPathname !== "/login" && isAuth === false) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - static (static files)
     * - favicon.ico (favicon file)
     * - _next internal calls
     */
    "/((?!api|static|favicon.ico|_next).*)",
  ],
};
