"use client";
import { useCallback, useState } from "react";
import { OnboardingStepper } from "./OnboardingStepper";
import { Logo } from "../logo/SquareLogo";

export const Onboarding = ({ step }: { step: number }) => {
  const [currentStep, setCurrentStep] = useState(step);
  const [siteName, setSiteName] = useState("");
  const [siteId, setSiteId] = useState("");

  const submitSiteName = useCallback(() => {
    const siteId =
      siteName
        .replace(/[^a-zA-Z0-9]/g, "")
        .slice(0, 4)
        .toUpperCase() +
      "-" +
      Math.floor(Math.random() * 1000);
    setCurrentStep(3);
    setSiteId(siteId);
  }, [siteName, setSiteId]);

  const renderStep = useCallback(() => {
    switch (currentStep) {
      case 0:
        return (
          <div className="text-left p-6 max-w-xl mx-auto space-y-2 flex flex-col items-center">
            <p>
              This onboarding will guide you through the process of adding your
              first site to the carbon collective. Before we get started, there
              are a few things you should know:
            </p>
            <ul className="list-disc list-inside text-left">
              <li>
                You will need to have a Square account to use this service.
              </li>
              <li>
                We only support react based sites(we are working on adding
                support for other frameworks).
              </li>
            </ul>
            <button
              className="btn-primary"
              onClick={() => {
                setCurrentStep(1);
              }}
            >
              Start Onboarding
            </button>
          </div>
        );
      case 1:
        return (
          <div className="text-left p-6 max-w-xl mx-auto space-y-3 flex flex-col items-center">
            <p>
              First, lets link your Square account to your Carbon Collective
              account.
            </p>
            <div className="bg-orange-100 text-orange-800 rounded p-4 flex space-x-3">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mt-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
              </div>
              <div className="flex flex-col space-y-2">
                <p className="text-gray-700 pb-3">
                  Please review the permissions we are requesting thoroughly, we
                  don't want any surprises.
                </p>
              </div>
            </div>
            <a href="/api/square/oauth" className="btn-primary">
              <Logo className="w-5" />
              <p>Connect Square</p>
            </a>
          </div>
        );
      case 2:
        return (
          <div className="text-left p-6 max-w-xl mx-auto space-y-3 flex flex-col items-center">
            <div className=" w-full">
              <p className="text-gray-700 pb-3">
                Tell us the name of the site you want to add to the carbon
                collective. This will be publically visible.
              </p>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Site's domain
              </label>
              <input
                id="website"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="myawesomesite.com"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
              />
            </div>

            <button onClick={() => submitSiteName()} className="btn-primary">
              Submit
            </button>
          </div>
        );
      case 3:
        return (
          <div className="text-left p-6 max-w-xl mx-auto space-y-3 flex flex-col items-center">
            <p>
              Your site's unique code is <code>{siteId}</code>. Please make a
              note of this.
            </p>

            <button
              onClick={() => setCurrentStep(4)}
              className="btn-primary"
            >
              <p>All Done</p>
            </button>
          </div>
        );
      case 4:
        return (
          <div className="text-left p-6 max-w-xl mx-auto space-y-3 flex flex-col items-center">
            <p>
              Great! Your site has been added to the carbon collective. Final
              step is to add the following tags to the <code>{`<head>`}</code>{" "}
              of your site:
            </p>
            <div className="flex flex-col md:flex-row w-full space-x-1">
              <pre className="bg-gray-700 text-white px-2 w-full py-2 rounded text-xs overflow-x-scroll">
                {`<meta name="carbon-collective" content="cc-UNIQUE_ID"> \n`}
                {`<script src="https://carbon-collective.vercel.app/api/carbon-collective.js"></m>`}
              </pre>
              <button className="flex items-center justify-center space-x-2 text-blue-700 border-blue-600 border-2  hover:bg-blue-50 rounded p-1 h-full">
                Copy
              </button>
            </div>

            <p>You can find these tags on your dashboard at any time.</p>

            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              <p>All Done</p>
            </button>
          </div>
        );

      default:
        break;
    }
  }, [currentStep, siteName]);

  return (
    <div className="flex flex-col items-center justify-center grow bg-blue-100 space-y-3">
      <p className="text-xl font-semibold">Site Onboarding</p>
      <div className="max-w-3xl mx-auto w-full h-full rounded bg-white p-5">
        <OnboardingStepper step={currentStep} />
        <p>{renderStep()} </p>
      </div>
    </div>
  );
};
