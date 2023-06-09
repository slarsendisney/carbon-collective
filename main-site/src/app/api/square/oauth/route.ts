import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { userId } = getAuth(req);
  const client_id = process.env.SQUARE_APP_ID;
  const scopes = [
    "CUSTOMERS_READ",
    "PAYMENTS_WRITE",
    "SUBSCRIPTIONS_WRITE",
    "ITEMS_READ",
    "ORDERS_READ",
    "ORDERS_WRITE",
    "INVOICES_WRITE",
    "SUBSCRIPTIONS_READ",
    "MERCHANT_PROFILE_WRITE",
    "MERCHANT_PROFILE_READ",
    "ITEMS_WRITE",
  ].join("+");
  const redirect_uri =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/api/square/oauth/redirect"
      : `https://www.carboncollective.club/api/square/oauth/redirect`;
  const state = userId;
  const response_type = "code";
  const url = `https://connect.squareupsandbox.com/oauth2/authorize?client_id=${client_id}&scope=${scopes}&session=false&state=${state}&response_type=${response_type}&redirect_uri=${redirect_uri}`;
  return NextResponse.redirect(url);
}
