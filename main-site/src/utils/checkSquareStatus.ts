import kv from "@vercel/kv";
import squareClient from "./squareClient";

export default async function checkSquareStatus(userId: string): Promise<{
  authenticated: boolean;
  token: string | null;
}> {
  const user = await kv.hgetall(userId);
  if (!user || !user.accessToken) return { authenticated: false, token: null };

  const { accessToken, refreshToken, expiresAt, refreshAt } = user as Record<
    string,
    string
  >;

  const client = squareClient(accessToken);

  const currentDate = new Date().getTime();

  const refreshAtDate = new Date(parseInt(refreshAt));

  const timeUntilRefresh = refreshAtDate.getTime() - currentDate;

  let tokenToUse = accessToken;

  try {
    const response = await client.oAuthApi.retrieveTokenStatus(accessToken);
    if (response.statusCode === 401 || timeUntilRefresh < 0) {
      console.log("refreshing token");
      const refreshData = await client.oAuthApi.obtainToken({
        clientId: process.env.SQUARE_APP_ID as string,
        clientSecret: process.env.SQUARE_ACCESS_TOKEN,
        grantType: "refresh_token",
        refreshToken: refreshToken,
      });

      await kv.hset(userId as string, {
        accessToken: refreshData.result.accessToken,
        refreshToken: refreshData.result.refreshToken,
        expiresAt: refreshData.result.expiresAt,
        refreshAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
      });

      tokenToUse = refreshData.result.accessToken as string;
      return {
        authenticated: true,
        token: tokenToUse,
      };
    }
  } catch (error) {
    console.log(error);
  }
  return {
    authenticated: true,
    token: tokenToUse,
  }
}
