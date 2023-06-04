import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export default authMiddleware({
publicRoutes:  ["/", "/playground", "/sign-in", "/sign-up", "/api/square/webhook", "/api/extension-config", "/api/subscribed", "/api/audit", "/api/square/checkout/:siteId"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
