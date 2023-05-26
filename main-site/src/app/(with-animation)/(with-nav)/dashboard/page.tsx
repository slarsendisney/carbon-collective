"use client";
import { AnalysingIllustration } from "@/components/illustrations/Analysing";
import { LittleSpinner } from "@/components/loading/LittleSpinner";
import {
  ArrowRightIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { useEffect, useState } from "react";

const SIZE = 9;
const CARBON = SIZE * 10;
const TREECOUNT = Math.ceil((CARBON * 10) / 21);
const Dashboard = () => {
  const [topSites, setTopSites] = useState<string[]>([]);
  const [supportedDomains, setSupportedDomains] = useState<string[]>([]);

  useEffect(() => {
    if (!chrome?.runtime) return;
    chrome.runtime.sendMessage(
      process.env.NEXT_PUBLIC_EXTENSION_ID,
      { type: "GET_DOMAINS" },
      function (response) {
        const { site_visit_count, supported_domains } = response;
        // get top 10 sites
        const newTopSites = Object.keys(site_visit_count)
          .sort((a, b) => site_visit_count[b] - site_visit_count[a])
          .slice(0, 8);
        setTopSites(newTopSites);
        setSupportedDomains(supported_domains);
        
      }
    );
  }, []);

  if (topSites.length < 4)
    return (
      <div className="flex flex-col items-center bg-blue-100 py-12 px-2 grow space-y-4">
        <div className="flex items-center space-x-1">
              <LittleSpinner className="text-blue-600"/>
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
            <div className="bg-white p-5 rounded md:col-span-2">
              <p className="text-xl font-medium">Summary</p>
              <p>
                By subscribing to sites within the carbon collective you could
                save {CARBON}g of carbon per day.
              </p>
              <div className="w-64 ml-auto">
                <Link
                  href="/subscribe"
                  className="btn-primary text-sm flex space-x-1 p-1"
                >
                  <p>Subscribe</p>
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </>
        </div>
      </div>

      <div className="flex flex-col items-center bg-white py-12 px-2">
        <div className="max-w-5xl mx-auto w-full rounded bg-blue-100 p-5">
          <p>Subscription Management</p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
