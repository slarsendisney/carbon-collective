import { NextResponse } from "next/server";
import kv from "@vercel/kv";
import squareClient from "@/utils/squareClient";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const { code, state, error } = Object.fromEntries(searchParams.entries());
  if(error) {
    return NextResponse.redirect("/oauth/error");
  }
  if (!code || !state) {
    return NextResponse.redirect("/login");
  }

  const client = squareClient();

  const squareTokenRes = await client.oAuthApi.obtainToken({
    clientId: process.env.SQUARE_APP_ID as string,
    clientSecret: process.env.SQUARE_ACCESS_TOKEN,
    grantType: "authorization_code",
    code,
    redirectUri: process.env.NODE_ENV === 'development' ? "http://localhost:3000/api/square/oauth/redirect" : `https://${process.env.VERCEL_URL}/api/square/oauth/redirect`,
  });

  const { accessToken, refreshToken, expiresAt } = squareTokenRes.result;

  await kv.hset(state, {
    authorizationCode: code,
    accessToken,
    refreshToken,
    expiresAt,
    refreshAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
  });

  return NextResponse.redirect(process.env.NODE_ENV === 'development' ? "http://localhost:3000/sites" : `https://${process.env.VERCEL_URL}/sites`);
}
