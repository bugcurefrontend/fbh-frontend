import React from "react";
import { Check } from "lucide-react";

interface ProgressStepsProps {
  currentStep: number;
  onStepClick?: (step: number) => void;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ currentStep, onStepClick }) => {
  const handleStepClick = (step: number) => {
    // Only allow clicking on completed (previous) steps
    if (step < currentStep && onStepClick) {
      onStepClick(step);
    }
  };

  return (
    <div className="relative space-y-2">
      <div className="flex items-center justify-between">
        {/* Step 1 */}
        <div 
          className={`flex flex-col items-center relative z-10 ${currentStep > 1 ? "cursor-pointer" : ""}`}
          onClick={() => handleStepClick(1)}
        >
          <div
            className={`sm:w-8 sm:h-8 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
              currentStep > 1
                ? "bg-[#003399] hover:bg-[#002277]"
                : currentStep === 1
                ? "border-2 border-[#003399]"
                : "border-2 border-[#B7B9BB]"
            }`}
          >
            {currentStep > 1 ? (
              <Check strokeWidth={3} className="w-4 h-4 text-white" />
            ) : currentStep === 1 ? (
              <div className="w-2.5 h-2.5 bg-[#003399] rounded-full"></div>
            ) : (
              <div className="w-2.5 h-2.5 bg-[#B7B9BB] rounded-full"></div>
            )}
          </div>
        </div>

        {/* Line 1 */}
        <div
          className={`flex-1 h-0.5 ${
            currentStep >= 2 ? "bg-[#003399]" : "bg-[#B7B9BB]"
          }`}
        ></div>

        {/* Step 2 */}
        <div 
          className={`flex flex-col items-center relative z-10 ${currentStep > 2 ? "cursor-pointer" : ""}`}
          onClick={() => handleStepClick(2)}
        >
          <div
            className={`sm:w-8 sm:h-8 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
              currentStep > 2
                ? "bg-[#003399] hover:bg-[#002277]"
                : currentStep === 2
                ? "border-2 border-[#003399]"
                : "border-2 border-[#B7B9BB]"
            }`}
          >
            {currentStep > 2 ? (
              <Check strokeWidth={3} className="w-4 h-4 text-white" />
            ) : currentStep === 2 ? (
              <div className="w-2.5 h-2.5 bg-[#003399] rounded-full"></div>
            ) : (
              <div className="w-2.5 h-2.5 bg-[#B7B9BB] rounded-full"></div>
            )}
          </div>
        </div>

        {/* Line 2 */}
        <div
          className={`flex-1 h-0.5 ${
            currentStep >= 3 ? "bg-[#003399]" : "bg-[#B7B9BB]"
          }`}
        ></div>

        {/* Step 3 */}
        <div className="flex flex-col items-center relative z-10">
          <div
            className={`sm:w-8 sm:h-8 w-6 h-6 rounded-full flex items-center justify-center ${
              currentStep > 3
                ? "bg-[#003399]"
                : currentStep === 3
                ? "border-2 border-[#003399]"
                : "border-2 border-[#B7B9BB]"
            }`}
          >
            {/* Step 3 indicator can be added here if needed */}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h1
          className={`font-semibold max-sm:text-sm ${
            currentStep > 1 ? "cursor-pointer hover:underline" : ""
          } ${currentStep >= 1 ? "text-[#003399]" : "text-[#454950]"}`}
          onClick={() => handleStepClick(1)}
        >
          Plant Details
        </h1>
        <h1
          className={`font-semibold max-sm:text-sm ${
            currentStep > 2 ? "cursor-pointer hover:underline" : ""
          } ${currentStep >= 2 ? "text-[#003399]" : "text-[#454950]"}`}
          onClick={() => handleStepClick(2)}
        >
          Personal Details
        </h1>
        <h1
          className={`font-semibold max-sm:text-sm ${
            currentStep === 3 ? "text-[#003399]" : "text-[#454950]"
          }`}
        >
          Payment
        </h1>
      </div>
    </div>
  );
};

export default ProgressSteps;

