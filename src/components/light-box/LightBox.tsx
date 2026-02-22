"use client";

import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import { ChevronLeft, X } from "lucide-react";
import TaxDetail from "@/components/light-box/TaxDetail";
import Step1 from "@/components/light-box/Step1";
import Step2 from "@/components/light-box/Step2";
import NewOrderSummary from "@/components/light-box/NewOrderSummary";
import { Attribute } from "@/types/attribute";
import { useLightBoxState } from "./useLightBoxState";

interface LightBoxProps {
  attributes?: Attribute[];
  preSelectedAttribute?: Attribute | null;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  triggerLabel?: string;
  co2Sequestration?: number;
}

const LightBox: React.FC<LightBoxProps> = ({
  attributes = [],
  preSelectedAttribute = null,
  isOpen: controlledIsOpen,
  onOpenChange,
  triggerLabel = "Plant For A Cause",
  co2Sequestration = 16.67,
}) => {
  const [showBox, setShowBox] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : showBox;

  const state = useLightBoxState({
    attributes,
    preSelectedAttribute,
    co2Sequestration,
  });
  const { resetState } = state;

  const handleOpenChange = (open: boolean) => {
    if (controlledIsOpen === undefined) {
      setShowBox(open);
    }
    onOpenChange?.(open);
  };

  useEffect(() => {
    if (!isOpen) {
      resetState();
    }
  }, [isOpen, resetState]);

  return (
    <main>
      <AlertDialog onOpenChange={handleOpenChange} open={isOpen}>
        <AlertDialogTrigger className="w-fit relative rounded-full p-[1px] bg-gradient-to-r to-[#128748] from-[#80CB00] h-[37px]">
          <span className="block rounded-full px-5 py-2 text-white text-xs leading-4.5 font-bold bg-gradient-to-r from-[#0D824B] to-[#80CB00] transition-all duration-300 hover:brightness-110 active:scale-95">
            {triggerLabel}
          </span>
        </AlertDialogTrigger>
        <AlertDialogContent className="lg:max-w-[944px] lg:min-w-[944px] lg:h-[640px] h-fit max-md:max-h-[90%] flex border border-[#BED4FF] shadow-[0_24px_48px_0_rgba(133,133,133,0.2)] md:rounded-4xl dialog-pop gap-6 max-md:pl-2 max-md:pr-[5px] max-md:py-4">
          <AlertDialogTitle className="hidden" />
          <div
            onClick={() => handleOpenChange(false)}
            className="cursor-pointer absolute md:right-0 right-4 top-4 md:-top-10 flex items-center justify-center md:h-8 md:w-8 rounded-full md:bg-[#E4E4E4] md:hover:bg-gray-100 transition"
          >
            <X size={18} className="text-black max-md:stroke-[1.3]" />
          </div>
          <div className="max-lg:hidden max-w-100 w-full h-full">
            <Image
              src={state.selectedAttribute?.image || "/images/gallery/5.png"}
              alt="lightbox"
              height={592}
              width={400}
              className="rounded-2xl max-w-100 min-h-full object-cover"
            />
          </div>

          {state.step > 1 && (
            <button
              type="button"
              onClick={state.handleBack}
              className="bg-white hover:bg-gray-100 flex rounded-[8px] items-center justify-self-center absolute gap-1 md:top-10 top-3 left-3 md:left-10 md:px-4 md:py-2 md:text-lg leading-4.5 md:leading-6.5 font-bold md:font-medium max-md:text-[#003399] z-[60] cursor-pointer"
            >
              <ChevronLeft size={24} className="w-4.5 h4.5 md:w-6 md:h-6 md:text-[#090C0F]" />
              Back
            </button>
          )}

          <div className="w-full space-y-4 max-md:mt-8 max-md:pl-2 max-md:pr-[5px] md:px-2 overflow-hidden max-md:overflow-y-scroll">
            <div className="flex items-center justify-center w-full gap-2">
              <div className="h-3 w-full bg-[#E7F8F0] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#12B569] rounded-full transition-all duration-500"
                  style={{ width: `${((state.step - 1) / 2) * 100}%` }}
                />
              </div>
              <Image
                src="/images/tree-progress.png"
                alt="tree-progress"
                height={32}
                width={32}
                className="max-md:w-6"
              />
            </div>

            {state.step === 1 && (
              <Step1
                occasion={state.occasion}
                setOccasion={state.setOccasion}
                quantities={state.quantities}
                selectedQuantity={state.selectedQuantity}
                handleQuantitySelect={state.handleQuantitySelect}
                manualQuantity={state.manualQuantity}
                handleManualQuantityChange={state.handleManualQuantityChange}
                isGeoTagged={state.isGeoTagged}
                handleGeoTaggedChange={state.handleGeoTaggedChange}
                currencySymbol={state.currencySymbol}
                geotaggedRate={state.geotaggedRate}
                nonGeotaggedRate={state.nonGeotaggedRate}
                handleSaveAndNext={state.handleSaveAndNext}
                attributes={state.localAttributes}
                preSelectedAttribute={preSelectedAttribute}
              />
            )}

            {state.step === 2 && (
              <Step2
                personalDetails={state.personalDetails}
                handlePersonalDetailsChange={state.handlePersonalDetailsChange}
                isStep2Valid={state.isStep2Valid}
                handleSaveAndNext={state.handleSaveAndNext}
                emailValid={state.emailValid}
                phoneValid={state.phoneValid}
                pincodeValid={state.pincodeValid}
              />
            )}

            {state.step === 3 && (
              <div className="w-full space-y-4 md:space-y-2">
                <TaxDetail
                  taxDetails={state.taxDetails}
                  onTaxDetailsChange={state.handleTaxDetailsChange}
                  idNumberError={
                    !state.idNumberValid && state.taxDetails.idNumber ? "Enter a valid ID number." : ""
                  }
                />
                <NewOrderSummary
                  orderSummary={state.orderSummary}
                  currentStep={state.step}
                  isFormValid={state.isStep3Valid}
                  onClose={() => handleOpenChange(false)}
                  userName={`${state.personalDetails.firstName} ${state.personalDetails.lastName}`.trim()}
                  userEmail={state.personalDetails.email}
                  occasion={state.occasion}
                  occasionImage={state.selectedAttribute?.icon || state.selectedAttribute?.image}
                  rate={state.isGeoTagged ? state.geotaggedRate : state.nonGeotaggedRate}
                  currencyCode={state.currency}
                  personalDetails={state.personalDetails}
                  taxDetails={state.taxDetails}
                />
              </div>
            )}
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
};

export default LightBox;
