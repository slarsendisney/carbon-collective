"use client";
import { AnalysingIllustration } from "@/components/illustrations/Analysing";
import { LittleSpinner } from "@/components/loading/LittleSpinner";
import { useAudit } from "@/context/audit-context";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import {
  ArrowRightCircleIcon,
  ArrowRightIcon,
  ExclamationTriangleIcon,
  GlobeAmericasIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

const Subscribe = () => {
  const { supportedDomains, detailsRes, topSites } = useAudit();

  return (
    <div className="flex flex-col items-center bg-blue-100 py-12 px-2">
      <div className="bg-white p-5 rounded md:col-span-2 space-y-2 max-w-2xl">
        <p className="text-xl font-medium">Your Customized Subscription Plan</p>
        <p>
          We've crunched the numbers and these are the sites we recommend
          subscribing to. By subscribing to these sites, you'll recieve ad-free
          viewing and help reduce the carbon impact of your visits.
        </p>
        <p>
          The subscription plan amount is guided by your usage of these sites,
          but you can customize it using the sliders.
        </p>
        <div className="flex flex-col space-y-1">
          {supportedDomains.slice(0, 3).map((site) => {
            const report = detailsRes.audits.find(({ sitename }:{
              sitename: string;
            }) => sitename === site);
            const carbon = (report?.carbon || 3.5).toFixed(1);

            const importance = topSites.findIndex((s) => s === site);

            // suggest a price based on the importance of the site - lower importance = higher price
            const price = `$${Math.ceil(10 - importance * 2)}`;


            return (
            <button className="w-full flex items-center justify-between hover:bg-blue-50 px-2 py-2 rounded">
              <div className="flex items-center space-x-1">
                <div className="flex items-center space-x-1 text-green-800 bg-green-400 px-2 py-1 text-sm rounded-full">
                  <GlobeAmericasIcon className="w-5 h-5 " />
                  {carbon}g CO2
                </div>
                <p className="text-lg">{site}</p>
              </div>
              <div className="flex items-center space-x-2">
             <p className="text-lg font-bold">{price}</p>
              <ArrowRightCircleIcon className="w-5 h-5" />
              </div>
            </button>
          )})}
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
