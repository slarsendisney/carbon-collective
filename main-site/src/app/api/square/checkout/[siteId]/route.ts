import { getAuth } from "@clerk/nextjs/server";
import kv from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";
import squareClient from "@/utils/squareClient";
import { randomUUID } from "crypto";

export async function GET(
  req: NextRequest,
  {
    params: { siteId },
  }: {
    params: { siteId: string };
  }
) {

  const { searchParams } = new URL(req.url);
  const price = searchParams.get('value');
  const { userId } = getAuth(req);

  if (!userId || !siteId || !price)
    return NextResponse.json({
      message: "no user id or siteId!",
    });

  const site = await kv.hgetall(siteId);

  if (!site)
    return NextResponse.json({
      message: "no site found!",
    });

  const client = squareClient(site?.accessToken as string);

  const subscriptionResponse = await client.catalogApi.upsertCatalogObject({
    idempotencyKey: randomUUID(),
    object: {
      type: "SUBSCRIPTION_PLAN",
      id: `#${siteId}|${userId}`,
      subscriptionPlanData: {
        name: `Subscription to ${site.siteName}`,
        phases: [
          {
            cadence: "MONTHLY",
            recurringPriceMoney: {
              amount: BigInt(parseInt(price)*100),
              currency: "GBP",
            },
          },
        ],
      },
  }});

  const subID = subscriptionResponse.result.catalogObject?.id;

  const locations = await client.locationsApi.listLocations();

  let carbonCollectiveLocationId = locations?.result.locations
    ? locations.result.locations.find(
        (location) => location.name === "CarbonCollective.club"
      )?.id
    : false;

  if (!carbonCollectiveLocationId) {
    const locationResponse = await client.locationsApi.createLocation({
      location: {
        name: "CarbonCollective.club",
        websiteUrl: "https://carboncollective.cc",
      },
    });

    carbonCollectiveLocationId = locationResponse.result.location?.id;
  }

  const response = await client.checkoutApi.createPaymentLink({
    quickPay: {
      name: `Subscription to ${site.siteName}`,
      priceMoney: {
        amount: BigInt(parseInt(price)*100),
        currency: "GBP",
      },
      locationId: carbonCollectiveLocationId as string,
    },
    paymentNote: `${siteId}|${userId}`,
    checkoutOptions: {
      subscriptionPlanId: subID as string,
      redirectUrl:
        process.env.NODE_ENV === "development"
          ? `http://localhost:3000/magic/${siteId}`
          : `https://www.carboncollective.club/magic/${siteId}`,
    },
  });

  const paymentLink = response.result.paymentLink;

  if (!paymentLink?.url)
    return NextResponse.json({
      message: "Nope!",
    });

  return NextResponse.redirect(paymentLink.url);
}
