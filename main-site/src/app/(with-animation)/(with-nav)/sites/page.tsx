import kv from "@vercel/kv";
import { auth } from "@clerk/nextjs";

const SitesPage = async () => {
  const { userId } = auth();
  // const user = await currentUser();

  const squareID = await kv.hget(userId as string, "squareOAuthID");
  console.log(squareID)
  if (!squareID) {
    return <div>
        <a href="/api/square/oauth">Connect Square</a>
    </div>
  }

  return <div>{JSON.stringify(squareID)}</div>;
};

export default SitesPage;
