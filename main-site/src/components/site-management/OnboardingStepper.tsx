import { CommandLineIcon, FingerPrintIcon, HandThumbUpIcon, WifiIcon } from "@heroicons/react/24/solid";
import { Logo } from "../logo/SquareLogo";
export const OnboardingStepper = ({ step }: { step: number }) => (
  <ol className="flex items-center justify-center w-full mx-auto max-w-xl">
    {[HandThumbUpIcon, Logo, FingerPrintIcon, WifiIcon, CommandLineIcon].map((Icon, index) => (
      <li
        key={Icon.name}
        className={`${
          step > index
            ? "flex items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800"
            : "flex items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700"
        }
        ${index !== 4 && "w-full"}
        `}
      >
        <span
          className={`${
            step > index
              ? "flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0"
              : "flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-800 shrink-0"
          }`}
        >
          <Icon
            className={`
            mx-auto
            ${
                step > index
                ? "w-5 h-5 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300"
                : "w-5 h-5 text-gray-600 lg:w-6 lg:h-6 dark:text-gray-300"
            }`}
          />
        </span>
      </li>
    ))}
  </ol>
);
