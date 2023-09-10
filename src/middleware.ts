import { NextRequest, NextResponse } from "next/server";
import { verify } from "./lib/jwt";

const protectedRoutes = [
  "/profile",
  "/feed",
  "/post",
  "/create-post",
  "/api/profile",
  "/api/feed",
  "/api/follow",
];

async function isAuthenticated(req: NextRequest) {
  try {
    const token = req.cookies.get("token");
    if (!token) {
      return false;
    }
    const jwt = await verify(token.value);

    if (!jwt || !jwt.payload.id) {
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

  //   let matchesWithAnyProtectedRoutes = false;
  //   for (let i = 0; i < protectedRoutes.length; i++) {
  //     if (requestedPathname.startsWith(protectedRoutes[i])) {
  //       matchesWithAnyProtectedRoutes = true;
  //       break;
  //     }
  //   }
  //   console.log("matchesWithAnyProtectedRoutes", matchesWithAnyProtectedRoutes);

  //   const isAuth = await isAuthenticated(req);

  //   if (matchesWithAnyProtectedRoutes) {
  //     if (isAuth === false)
  //       return NextResponse.redirect(new URL("/login", req.url));
  //   }
}
