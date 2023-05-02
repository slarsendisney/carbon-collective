import { ChromeLogo } from "@/components/asset-logos/ChromeLogo";
import { Hero } from "@/components/illustrations/Hero";
import { QuickStart } from "@/components/landing/QuickStart";
import { Logo as SquareLogo } from "@/components/logo/SquareLogo";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <section className="bg-white dark:bg-gray-900 relative">
        <div className="py-8 px-4 grid grid-cols-2 max-w-7xl mx-auto text-left py-12 md:py-24 lg:py-32 z-10 relative">
          <div className="">
          <a
            href="https://square2023.devpost.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800"
          >
            <span className="text-xs bg-blue-600 rounded-lg text-white px-0.5 py-0.5 mr-3">
              <SquareLogo className="h-5 w-5 m-1" />
            </span>{" "}
            <span className="text-sm font-medium">
              Built for the Square Developer Hackathon 2023
            </span>
            <svg
              aria-hidden="true"
              className="ml-2 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
          <h1 className="mb-4 text-4xl font-extrabold max-w-5xl text-left tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Promote a creator economy & reduce your carbon footprint.
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl  dark:text-gray-200">
            A dynamic subscription that supports small businesses while helping
            you browse sustainably.
          </p>
          <div className="grid grid-cols-2 max-w-lg gap-4">
          <Link href="/download">
              <div className="flex items-center justify-center space-x-2 bg-blue-600 text-white border-blue-600 border-2  hover:bg-blue-700 rounded-full p-2 ">
                <p className="pr-2">Get Started</p>
              </div>
            </Link>
            <Link href="/download">
              <div className="flex items-center justify-center space-x-2 text-blue-700 border-blue-600 border-2  hover:bg-blue-50 rounded-full p-2 ">
                <ChromeLogo className="h-6 w-6" />
                <p className="pr-2">Download Extension </p>
              </div>
            </Link>
          </div>
        </div>
       
        <div className="flex flex-col items-end justify-center">
        <Hero className="w-full mx-auto px-4"/>
        </div>
        </div>
        <div className="bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900 w-full h-full absolute top-0 left-0 z-0"></div>
      </section>
      <section className="bg-blue-100 text-blue-800 py-4 flex flex-col items-center justify-center space-y-4">
        <div className="max-w-7xl mx-auto px-4">
        <QuickStart />
        </div>
       </section>

    </div>
    
 
  );
}
