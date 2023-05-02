"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CheckCircleIcon, ArrowDownCircleIcon } from '@heroicons/react/24/outline'
import { LoadingSpinner } from "@/components/loading/LoadingSpinner";

export default function Sync() {
  const [isExtensionInstalled, setIsExtensionInstalled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkInstalled = async () => {
      if (!isExtensionInstalled) {
        chrome.runtime.sendMessage(
            process.env.NEXT_PUBLIC_EXTENSION_ID,
          { type: "PING" },
          function (response) {
            if (response) {
              setIsExtensionInstalled(true);
            } else {
              setIsExtensionInstalled(false);
            }
            setLoading(false);
          }
        );
      }
    };
    const checkInstalledLoop = async () => {
      while (!isExtensionInstalled) {
        checkInstalled();
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    };
    (() => {
      checkInstalledLoop();
    })();
  }, [isExtensionInstalled]);

  if(loading) return (
    <div className="flex items-center justify-center grow bg-blue-100 text-blue-600 space-x-2">

        <LoadingSpinner />

            <h1 className="text-2xl font-medium">   
            Loading
            </h1>
    
    </div>
    )

  if (!isExtensionInstalled) {
    return (
        <div className="flex items-center justify-center grow bg-blue-100">
        <div className="card">
        <ArrowDownCircleIcon className="w-12 h-12 text-blue-600" />
          <h1 className="text-2xl font-medium">
            Install the CreatorCollective Extension
          </h1>
          <p className="text-center">
            Before continuing, please install our extension from the
            chrome web store. This page will automatically refresh once
            installed.
          </p>
          <Link
          href="/download"
          className="bg-blue-600 rounded-full text-white px-4 py-1 flex space-x-2 items-center justify-center"
        >
          <p className="text-xl">Download</p>
        </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center grow bg-blue-100">
      <div className="card">
        <CheckCircleIcon className="w-12 h-12 text-green-600" />
        <h1 className="text-2xl font-medium">Extension Installed</h1>
        <p className="text-center">
          Nice work! It looks like you already have our chrome extension. Click the button below to link your account with the installed extension.
        </p>
        <Link
          href="/extension"
          className="bg-blue-600 rounded-full text-white px-4 py-1 flex space-x-2 items-center justify-center"
        >
          <p className="text-xl">Link account</p>
        </Link>
      </div>
    </div>
  );
}
