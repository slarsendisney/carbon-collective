import { getAuth } from "@clerk/nextjs/server";
import kv from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";
import squareClient from "@/utils/squareClient";

export async function GET(req: NextRequest, { params: { siteId } }:{
  params: { siteId: string }
}) {
  const { userId } = getAuth(req);

  if (!userId || !siteId) return NextResponse.json({
    message: "no user id or siteId!"
   });

  const site = await kv.hgetall(siteId);


  if (!site) return NextResponse.json({
    message: "no site found!"
   });


   const client = squareClient(site?.accessToken as string);
   

   const response = await client.checkoutApi.createPaymentLink({
    quickPay: {
      name: `Subscription to ${site.siteName}`,
      priceMoney: {
        amount: BigInt(10000),
        currency: 'USD'
      },
      locationId: 'CarbonCollective',
    },
    paymentNote: `${siteId}|${userId}`,
    checkoutOptions:{
        redirectUrl: process.env.NODE_ENV === 'development' ? "http://localhost:3000/complete" : `https://${process.env.VERCEL_URL}/complete`,
    }
  });

  const paymentLink = response.result.paymentLink;

  if(!paymentLink?.url) return NextResponse.json({
    message: "Nope!"
   });


  return NextResponse.redirect(paymentLink.url);
}
