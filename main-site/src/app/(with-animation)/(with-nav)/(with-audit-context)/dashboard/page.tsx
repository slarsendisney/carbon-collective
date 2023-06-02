"use client";
import { AnalysingIllustration } from "@/components/illustrations/Analysing";
import { LittleSpinner } from "@/components/loading/LittleSpinner";
import { useAudit } from "@/context/audit-context";
import {
  ArrowRightIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

const SIZE = 9;
const CARBON = SIZE * 10;
const TREECOUNT = Math.ceil((CARBON * 10) / 21);

const Dashboard = () => {
  const { topSites, supportedDomains, loadingDetails, detailsRes } = useAudit();
  console.log(supportedDomains)
  console.log(detailsRes);

  if (topSites.length < 4)
    return (
      <div className="flex flex-col items-center bg-blue-100 py-12 px-2 grow space-y-4">
        <div className="flex items-center space-x-1">
          <LittleSpinner className="text-blue-600" />
          <p className="font-semibold">Analyzing Web Usage</p>
        </div>
        <div className="card">
          <div className="flex items-center w-full pl-5 pr-2 py-2  rounded space-x-2">
            <AnalysingIllustration className="w-32 h-full" />
            <div className="flex flex-col  col-span-2 justify-center">
              <p className="text-xl font-medium">We're Gathering Statistics</p>
              <p>
                By learning how you use the web, we can create a personalized
                subscription plan just for you.
              </p>
            </div>
          </div>
          <div className="flex items-center w-full px-2 mt-4 py-2 bg-yellow-400 bg-opacity-30 rounded space-x-2 divide-x divide-yellow-600 divide-opacity-30">
            <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600 mx-1" />
            <p className="pl-2">
              Try and keep your habits as normal as possible, we get the best
              results that way.
            </p>
          </div>
        </div>
      </div>
    );

  return (
    <>
      <div className="flex flex-col items-center bg-blue-100 py-12 px-2">
        <div className="max-w-5xl mx-auto w-full h-full grid md:grid-cols-3 gap-4">
          <>
            <div className="bg-white p-5 rounded w-full h-72">
              <div className="space-y-1">
                <p className="text-xl font-medium">Your Top Sites</p>

                {topSites.map((site, i) => (
                  <div className="flex items-center space-x-1">
                    <div
                      className={`h-5 w-5 ${
                        supportedDomains.includes(site)
                          ? "bg-green-600"
                          : "bg-yellow-600"
                      } text-white rounded flex items-center justify-center`}
                    >
                      <p>{i + 1}</p>
                    </div>
                    <p>{site.replace("www.", "")}</p>
                  </div>
                ))}
              </div>
            </div>
            {loadingDetails ? (
              <div className="bg-white p-5 rounded md:col-span-2">
                <p className="text-xl font-medium">Doing some math...</p>
                <p>
                  Give us a moment, we're just learning about the sites you've
                  been interacting wtih to create the perfect plan. This can
                  take up to 30 seconds.
                </p>
              </div>
            ) : (
              <div className="bg-white p-5 rounded md:col-span-2">
                <p className="text-xl font-medium">Summary</p>
                <p>
                  We've created a custom subscription plan just for you. By
                  subscribing to the sites you visit that are within the carbon
                  collective you could save{" "}
                  {Math.floor(
                    detailsRes.audits
                      .filter(({ sitename, audit }:{
                        sitename: string;
                        audit: { carbon: number };
                      }) => {
                        return (
                          supportedDomains.includes(sitename) && audit !== null
                        );
                      })
                      .reduce(
                        (acc: number, cur: { audit: { carbon: number } }) => {
                          acc += cur.audit.carbon;
                        },
                        0
                      )
                  )}
                  g of carbon per day.
                </p>
                <div className="w-64 ml-auto">
                  <Link
                    href="/subscribe"
                    className="btn-primary text-sm flex space-x-1 p-1"
                  >
                    <p>See your plan</p>
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}
          </>
        </div>
      </div>

      <div className="flex flex-col items-center bg-white py-12 px-2">
        <div className="max-w-5xl mx-auto w-full rounded bg-blue-100 p-5">
          <p>Unsupported sites</p>
          <p>
            Of the sites that you have been visiting, the site that produces the
            most carbon is TEMP_SITE. Why not reach out to them and ask them to
            join the carbon collective?
          </p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
