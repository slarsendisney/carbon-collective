
import { auth } from "@clerk/nextjs";
import checkSquareStatus from "@/utils/checkSquareStatus";
import { OnboardingStepper } from "@/components/site-management/OnboardingStepper";
import { Onboarding } from "@/components/site-management/Onboarding";

const SitesPage = async () => {
  const { userId } = auth();
  const {authenticated, token} = await checkSquareStatus(userId as string);

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
