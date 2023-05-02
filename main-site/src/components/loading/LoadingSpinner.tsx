import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { m } from "framer-motion";

export const LoadingSpinner = () => {
  return (
    <m.div
      className="h-8 w-8"
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <ArrowPathIcon className="h-8 w-8 text-blue-600" />
    </m.div>
  );
};
