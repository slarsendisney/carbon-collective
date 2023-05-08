"use client";

import { useEffect } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useUser } from "@clerk/nextjs";

export default function LinkPage() {
  const { user } = useUser();
  useEffect(() => {
    if (!user) return;
    const { id, fullName, profileImageUrl } = user;
    chrome.runtime.sendMessage(
      process.env.NEXT_PUBLIC_EXTENSION_ID,
      { id, fullName, profileImageUrl, type: "OAUTH" },
      function (response) {
        // console.log(response);
      }
    );
  }, [user]);

  return (
    <div className="flex items-center justify-center grow bg-blue-100">
      <div className="card">
        <CheckCircleIcon className="w-12 h-12 text-green-600" />
        <h1 className="text-2xl font-medium">
          You're set up and ready to support!
        </h1>
        <p className="text-center">
          We've successfully connected your account to the Carbon Collective
          extension. You can start browsing the web and supporting your favorite
          creators!
        </p>
      </div>
    </div>
  );
}
