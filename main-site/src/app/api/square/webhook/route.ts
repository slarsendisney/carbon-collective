import { NextRequest, NextResponse } from "next/server";
import kv from "@vercel/kv";

export async function POST(req: NextRequest) {

  const body = await req.json();

  // square webhook handle purchase complete

    switch (body?.data?.type) {
      case "payment.created":
        if(body?.data?.status === "COMPLETED") {
          const [siteId, userId] = body?.data?.payment_note.split("|");
          const user = await kv.hgetall(userId as string) as {
            subscripedSites?: string[];
            [key: string]: any;
          };
        
          if (!user.subscripedSites) {
            user.subscripedSites = [];
          }
          if(!user.subscripedSites.includes(siteId)) {
        
          user.subscripedSites.push(siteId);
        
          }

          await kv.hset(userId as string, user);
          
        }
        break;
    }

  return NextResponse.json({
    status: 200,
  });
}
