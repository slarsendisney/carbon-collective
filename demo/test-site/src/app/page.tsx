/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
// @ts-ignore
import CarbonCollectiveClient from "carbon-collective-js";

const Thanks = () => {
  return (
    <div className="h-full bg-green-200 text-green-800 p-2 rounded flex w-full flex-nowrap items-center justify-center space-x-2">
      <CheckCircleIcon className="h-8 w-8 " />
      <p className="text-sm">Thanks for being a CarbonCollective supporter of this site! We hope you enjoy your add free browsing.</p>
    </div>
  );
};

const Ad = () => {
  return (
    <div className="h-full bg-red-200 text-red-800 p-4 py-6 rounded flex w-full items-center justify-center">
      <ExclamationTriangleIcon className="h-6 w-6" />
    </div>
  );
};

export default function Home() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initialiseCarbonCollective = async () => {
      // @ts-ignore
      const carbonCollective = new CarbonCollectiveClient("CARB-72");
      await carbonCollective.init();
      const isSubscribed = await carbonCollective.isSubscribed();
      setIsSubscribed(isSubscribed);
      setLoading(false);
    };
    initialiseCarbonCollective();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
        <div className="z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex">
          <h1 className="text-2xl animate-pulse">Getting things ready...</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
      <div className="z-10 w-full max-w-3xl items-center justify-between space-y-4 text-lg">
        {isSubscribed && <Thanks />}
        <h1 className="text-2xl ">A Demo Website</h1>
        <h2 className="text-lg">Be warned, this text is all placeholder</h2>
        <div
          className={`grid ${!isSubscribed ? "grid-cols-2" : "grid-cols-1"} `}
        >
          <p>
            {/* lorum ipsum */}
            Is this my espresso machine? Wh-what is-h-how did you get my
            espresso machine? Life finds a way. Must go faster... go, go, go,
            go, go! Yeah, but your scientists were so preoccupied with whether
            or not they could, they didn't stop to think if they should.
          </p>
          {!isSubscribed && <Ad />}
        </div>
        <p>
          So you two dig up, dig up dinosaurs? So you two dig up, dig up
          dinosaurs? Yeah, but John, if The Pirates of the Caribbean breaks
          down, the pirates don’t eat the tourists. Did he just throw my cat out
          of the window? Must go faster... go, go, go, go, go!
        </p>
        {!isSubscribed && <Ad />}
        <p>
          Did he just throw my cat out of the window? Hey, take a look at the
          earthlings. Goodbye! Checkmate... Yes, Yes, without the oops! Jaguar
          shark! So tell me - does it really exist? Hey, you know how I'm, like,
          always trying to save the planet? Here's my chance.
        </p>
        <p>
          Text generated at{" "}
          <a href="https://jeffsum.com" className="text-blue-600">
            https://jeffsum.com
          </a>
        </p>
      </div>
    </main>
  );
}
