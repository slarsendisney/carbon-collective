import { getAuth } from "@clerk/nextjs/server";
import kv from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req);
  const { siteId, siteName } = await req.json();

  if (!userId || !siteId) return NextResponse.json({
    message: "Nope!"
   });

  const user = await kv.hgetall(userId);


  if (!user) return NextResponse.json({
    message: "Nope!"
   });

  await kv.hset(siteId, {
    ...user,
    siteName,
    siteId,
  });

  await kv.hset(userId, {
    ...user,
    sites: [...(user?.sites as any || [] ), siteId],
    });

    console.log([...(user?.sites as any || [] ), siteId])

  return NextResponse.json({
   message: "success"
  });
}
