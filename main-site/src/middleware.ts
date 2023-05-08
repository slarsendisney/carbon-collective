import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// Set the paths that don't require the user to be signed in
const publicPaths = ["/", "/sign-in", "/sign-up"];

export default authMiddleware({
  publicRoutes: publicPaths,
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)"],
};
