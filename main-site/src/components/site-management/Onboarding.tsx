import { useCallback } from "react";
import { OnboardingStepper } from "./OnboardingStepper";

export const Onboarding = ({ step }: { step: number }) => {
  const renderStep = useCallback(() => {
    switch (step) {
      case 0:
        return <p>Welcome</p>;
      case 1:
        return <a href="/api/square/oauth">Connect Square</a>;
      case 2:
        return <p>Gather Site Details</p>;
      case 3:
        return <p>Developer </p>;

      default:
        break;
    }
  }, [step]);

  return (
    <div className="flex flex-col items-center justify-center grow bg-blue-100 space-y-3">
      <p className="text-xl font-semibold">Site Onboarding</p>
      <div className="max-w-3xl mx-auto w-full h-full rounded bg-white p-5">
        <OnboardingStepper step={step} />
        <p>{renderStep()} </p>
      </div>
    </div>
  );
};
