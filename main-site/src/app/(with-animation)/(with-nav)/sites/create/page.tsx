
import { auth } from "@clerk/nextjs";
import checkSquareStatus from "@/utils/checkSquareStatus";
import { Onboarding } from "@/components/site-management/Onboarding";

const SitesPage = async () => {
  const { userId } = auth();
  const {authenticated} = await checkSquareStatus(userId as string);

  if (!authenticated) {
    return (
      <>
        <Onboarding step={0}/>
        </>
    );
  }

  return <Onboarding step={2}/>;
};

export default SitesPage;
