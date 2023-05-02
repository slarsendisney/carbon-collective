"use client";

import Link from "next/link";
import { useEffect } from "react";
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { useUser } from "@clerk/nextjs";

export default function Link() {
  const {user} = useUser()
  useEffect(() => {
    if(!user) return;
    const accountId = user.publicMetadata.accountId;
    const name = user.publicMetadata.name;
    chrome.runtime.sendMessage(
      process.env.NEXT_PUBLIC_EXTENSION_ID,
      { accountId, name, type: "OAUTH" },
      function (response) {
        console.log(response);
      }
    );
  }, [user]);


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
