import kv from "@vercel/kv";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { auth } from "@clerk/nextjs";

const Complete = async ({
  params: { siteId },
}: {
  params: {
    siteId: string;
  };
}) => {

  const { userId } = auth();
  
  const user = await kv.hgetall(userId as string) as {
    subscripedSites?: string[];
    [key: string]: any;
  };

  if (!user.subscripedSites) {
    user.subscripedSites = [];
  }

  user.subscripedSites.push(siteId);

  await kv.hset(userId as string, user);

  const site = await kv.hgetall(siteId) as {
    siteName?: string;
  };

  return (
    <div className="flex flex-col items-center bg-blue-100 grow py-12 px-2">
      <div className="bg-white p-5 rounded md:col-span-2 space-y-2 max-w-md items-center flex-col flex ">

        <CheckCircleIcon className="w-10 h-10 text-green-500" />
        <p className="text-xl font-medium">Congratulations!</p>
        <p>
          You've successfully subscribed to {site && site.siteName ? site.siteName : "this site"} on the Carbon Collective.  Why not visit this site now and see the difference?
        </p>
        <div className="grid grid-cols-1 gap-1 mt-4">

   
        <a href={`https://${site?.siteName || "google.com"}`}  className="btn-primary text-sm flex space-x-1 p-1">
          <p>Visit {site && site.siteName ? site.siteName : "this site"}</p>
        </a>
        <Link href="/dashboard" className="btn-secondary text-sm flex space-x-1 p-1">
          <p>Return to dashboard</p>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default Complete;
