"use client";
import {
  ArrowRightCircleIcon,
  GlobeAmericasIcon,
} from "@heroicons/react/24/solid";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { LoadingSpinner } from "@/components/loading/LoadingSpinner";
import { useRouter } from "next/navigation";

const Magic = ({
  params: { siteId },
}: {
  params: {
    siteId: string;
  };
}) => {

    const {
        push
    } = useRouter();

  useEffect(() => {
    chrome.runtime.sendMessage(
        process.env.NEXT_PUBLIC_EXTENSION_ID,
        { type: "SUBSCRIBED", siteId },
      );
      setTimeout(() => {
        push(`/complete/${siteId}`)
      }, 2000)
  }, []);


  return (
    <div className="flex flex-col items-center bg-blue-100 grow py-12 px-2">
      <div className="bg-white p-5 rounded md:col-span-2 space-y-2 max-w-md items-center flex-col flex ">

        <LoadingSpinner/>
        <p className="text-xl font-medium">Performing some magic...</p>
        <p className="text-center">
          Good things are happening in the background.  You'll be redirected in moments...
        </p>
       
      </div>
    </div>
  );
};

export default Magic;
