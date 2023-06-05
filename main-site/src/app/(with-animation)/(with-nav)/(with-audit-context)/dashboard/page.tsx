import ClientSideDashboard from "@/components/Dashboard/ClientSideDashboard";
import { auth } from "@clerk/nextjs";
import kv from "@vercel/kv";


const Dashboard = async () => {


  const { userId } = auth();

  const user = await kv.hgetall(userId as string) as {
    subscripedSites?: string[];
    [key: string]: any;
  };
  const subscribedSiteIds = user?.subscripedSites || [] as string[]
 
  
  return <ClientSideDashboard subscribedSiteIds={subscribedSiteIds} />;
};

export default Dashboard;
