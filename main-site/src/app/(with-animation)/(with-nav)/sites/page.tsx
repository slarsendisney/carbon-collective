
import { auth } from "@clerk/nextjs";
import checkSquareStatus from "@/utils/checkSquareStatus";
import { redirect } from 'next/navigation';

const SitesPage = async () => {
  const { userId } = auth();
  const {sites} = await checkSquareStatus(userId as string);

  if (!sites || sites.length === 0) {
    redirect("/sites/create")
  }

  return (
    <>
      {
        sites.map((site, i) => {
          return (
            <div className="bg-white p-5 rounded w-full h-72">
              <div className="space-y-1">
                <p className="text-xl font-medium">Your Sites</p>
                <div className="flex items-center space-x-1">
                  <div
                    className={`h-5 w-5  text-white rounded flex items-center justify-center`}
                  >
                    <p>{i + 1}</p>
                  </div>
                  <p>{site}</p>
                </div>
              </div>
            </div>
          )
        })
      }
      </>
  );
};

export default SitesPage;
