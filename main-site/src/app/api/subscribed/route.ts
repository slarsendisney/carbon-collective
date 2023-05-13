import { NextResponse } from "next/server";
import kv from "@vercel/kv";

export async function POST(request: Request) {
 // get userId and siteId from request body
  const { userId, siteId } = await request.json();

  if(!userId) {
    return new Response('Missing UserID', {
      status: 401,
    });
  }

  if(!siteId) {
    return new Response('Missing SiteID', {
      status: 401,
    });
  }

  const subscribed = await kv.get(`subscribed-${userId}-${siteId}`);

  if(!subscribed) {
    return NextResponse.json({ 
      subscribed: false,
     });
  }

  return NextResponse.json({
    subscribed: true,
  });

}
