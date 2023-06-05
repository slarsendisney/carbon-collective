
import { auth } from "@clerk/nextjs";
import checkSquareStatus from "@/utils/checkSquareStatus";
import { redirect } from 'next/navigation';
import Link from "next/link";

const SitesPage = async () => {
  const { userId } = auth();
  const {sites} = await checkSquareStatus(userId as string);

  if (!sites || sites.length === 0) {
    redirect("/sites/create")
  }

  const removedDuplicates = (sites || []).filter((site, index) => {
    return sites.indexOf(site) === index;
  })


  return (
    <div className="flex flex-col items-center bg-blue-100  py-12 px-2 grow space-y-4">
        <p className="text-xl font-medium">Your Sites</p>
      {
        removedDuplicates.map((site, i) => {
          return (
            <div className="bg-white max-w-md p-5 rounded w-full">
              <div className="space-y-1">
              
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
      <Link 

        href="/sites/create"
        className="btn-primary text-sm flex space-x-1 p-1"
      >
        Create New
        </Link>
      </div>
  );
};

export default SitesPage;
