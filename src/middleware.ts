import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextResponse } from "next/server";

export const { auth } = NextAuth(authConfig);

const protectedRoutes = ["/", "/profile", "/preview"];

export default auth(async (req) => {
  const nextUrl = req.nextUrl;
  const isLoggedIn = !!req.auth;
  const isProtected = protectedRoutes.includes(nextUrl.pathname);
  const unAuthorized = !isLoggedIn && isProtected;

  // Redirect user to the home page if user is authenticated and if the current pathname is '/login' or '/register' route.
  if (isLoggedIn && ["/login", "/register"].includes(nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  // Redirect user to the login page if they are not authorized
  if (unAuthorized) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }
});

export const config = {
  matcher: [
    // Exclude files with a "." followed by an extension, which are typically static files.
    // Exclude files in the _next directory, which are Next.js internals.
    "/((?!.+\\.[\\w]+$|_next).*)",
    // Re-include any files in the api or trpc folders that might have an extension
    "/(api|trpc)(.*)",
  ],
};

