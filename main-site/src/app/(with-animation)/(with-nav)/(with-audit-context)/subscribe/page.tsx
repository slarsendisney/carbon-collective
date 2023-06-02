"use client";
import { AnalysingIllustration } from "@/components/illustrations/Analysing";
import { LittleSpinner } from "@/components/loading/LittleSpinner";
import { useAudit } from "@/context/audit-context";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import {
  ArrowRightIcon,
  ExclamationTriangleIcon,
  GlobeAmericasIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

const Subscribe = () => {
  const { supportedDomains, detailsRes } = useAudit();

  return (
    <div className="flex flex-col items-center bg-blue-100 py-12 px-2">
      <div className="max-w-5xl mx-auto w-full h-full grid md:grid-cols-3 gap-4">
        <p className="text-xl font-medium">Your Customized Subscription Plan</p>
        <p>
          We've crunched the numbers and these are the sites we recommend
          subscribing to. By subscribing to these sites, you'll recieve ad-free
          viewing and help reduce the carbon impact of your visits.
        </p>
        <p>
            The subscription plan amount is guided by your usage of these sites, but you can customize it using the sliders.
        </p>
        <div className="flex flex-col space-y-1">
          {supportedDomains.slice(3).map((site) => (
            <button className="w-full flex items-center justify-between hover:bg-blue-100">
              <p>{site}</p>
              <div className="flex items-center space-x-1">
                <div className="flex items-center space-x-1 text-green-800 bg-green-400 p-2 rounded-full">
                  <GlobeAmericasIcon className="w-6 h-6 " />
                  6.5g CO2
                </div>
                <ShoppingCartIcon className="w-6 h-6" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
