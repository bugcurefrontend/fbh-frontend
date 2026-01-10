"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";
import plantAnimation from "../../../public/images/plant.json";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

interface ProceedToPayProps {
  isFormValid: boolean;
  numberOfTrees: number;
  onTreeCountChange?: (count: number) => void;
  availableTrees?: number;
  className?: string;
  onNavigate?: () => void;
}

const ProceedToPay: React.FC<ProceedToPayProps> = ({
  isFormValid,
  numberOfTrees,
  onTreeCountChange,
  availableTrees = 10,
  className,
  onNavigate,
}) => {
  const router = useRouter();
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [status, setStatus] = useState<"loading" | "error">("loading");
  const [countdown, setCountdown] = useState(5);

  // Adjust Trees State
  const [isAdjustOpen, setIsAdjustOpen] = useState(false);
  const [adjustInput, setAdjustInput] = useState(String(numberOfTrees));

  // Sync input when prop changes
  useEffect(() => {
    setAdjustInput(String(numberOfTrees));
  }, [numberOfTrees]);

  const onProceed = () => {
    if (numberOfTrees > availableTrees) {
      setAdjustInput(String(numberOfTrees));
      setIsAdjustOpen(true);
    } else {
      startProcessing();
    }
  };

  const startProcessing = () => {
    setIsStatusOpen(true);
    setStatus("loading");

    // Simulate processing delay then show error
    setTimeout(() => {
      setStatus("error");
      setCountdown(5);
    }, 5000);
  };

  const handleSaveAdjust = () => {
    const val = parseInt(adjustInput, 10);
    if (!isNaN(val) && onTreeCountChange) {
      onTreeCountChange(val);
    }
    setIsAdjustOpen(false);
    startProcessing();
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isStatusOpen && status === "error") {
      if (countdown > 0) {
        timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      } else {
        setIsStatusOpen(false);
        onNavigate?.();
        router.push("/");
      }
    }
    return () => clearTimeout(timer);
  }, [isStatusOpen, status, countdown, router]);

  const currentInputTrees = parseInt(adjustInput, 10) || 0;
  const isAdjustmentValid =
    currentInputTrees > 0 && currentInputTrees <= availableTrees;

  return (
    <>
      <Button
        onClick={onProceed}
        disabled={!isFormValid || numberOfTrees === 0}
        className={`w-full h-12 border-1 disabled:border-[#E8E8E9] disabled:bg-white border-[#95AAD5] text-white bg-[#003399] disabled:text-[#94979A] rounded-[8px] text-base font-bold hover:bg-[#013eb9] transition-colors disabled:cursor-not-allowed disabled:opacity-100 ${className}`}
      >
        Proceed to Payment
      </Button>

      <AlertDialog open={isStatusOpen} onOpenChange={setIsStatusOpen}>
        <AlertDialogContent className="md:max-w-[533px] sm:h-[402px] h-[415px] border border-[#E4E4E4] rounded-[8px] md:rounded-2xl dialog-pop gap-4 px-4 sm:px-8 max-sm:py-20">
          {status === "error" ? (
            <>
              <div className="w-[125.25px] sm:w-[155px] h-[125.25px] sm:h-[155px] mx-auto">
                <Lottie animationData={plantAnimation} loop={true} />
              </div>

              <div className="space-y-4">
                <AlertDialogTitle>
                  <p className="md:text-[32px] text-2xl leading-9 font-semibold md:font-bold text-[#232D26]">
                    Uh-oh!
                  </p>
                </AlertDialogTitle>

                <div className="space-y-3">
                  <p className="md:text-xl font-semibold text-[#19212C]">
                    Looks like all trees have been planted!{" "}
                  </p>
                  <p className="max-sm:text-sm text-[#454950] font-medium">
                    Redirecting you to Homepage in{" "}
                    <span className="text-[#0D824B] font-bold">
                      00:0{countdown}
                    </span>
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="w-[125.25px] sm:w-[155px] h-[125.25px] sm:h-[155px] mx-auto">
                <Lottie animationData={plantAnimation} loop={true} />
              </div>

              <div className="space-y-4">
                <AlertDialogTitle>
                  <p className="md:text-[32px] text-2xl leading-9 font-semibold md:font-bold text-[#090C0F]">
                    Please wait
                  </p>
                </AlertDialogTitle>

                <div className="space-y-3">
                  <p className="md:text-xl font-semibold text-[#19212C]">
                    Holding your trees and taking you to payment.
                  </p>
                  <p className="max-sm:text-sm text-[#454950] font-medium">
                    Please do not refresh this page or click on browser’s back
                    button.{" "}
                  </p>
                </div>
              </div>
            </>
          )}
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={isAdjustOpen} onOpenChange={setIsAdjustOpen}>
        <DialogContent
          showCloseButton={false}
          className="md:max-w-[533px] overflow-hidden px-4 md:px-6 py-4"
        >
          <DialogTitle className="uppercase font-bold md:text-2xl px-6 text-center">
            Adjust Trees
          </DialogTitle>
          <div className="md:space-y-6 space-y-4">
            <div className="flex max-sm:flex-col md:gap-5 gap-2 sm:items-center border-[0.8px] border-[#F78F08] text-[#F78F08] bg-[#FEF4E7] px-4 md:py-3 py-2 rounded-[8px] font-medium">
              <TriangleAlert className="md:min-w-8 min-w-6 h-full" />
              <p className="font-medium max-sm:text-sm">
                You've exceeded the maximum trees quantity. Please reduce the
                quantity for recipient.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-[#E8E8E9] text-[#19212C] max-sm:flex-col md:text-lg leading-6.5 rounded-[8px] w-full sm:p-3 max-sm:py-2 max-sm:px-3 flex justify-between sm:items-center gap-1 sm:gap-4">
                <span className="font-medium">Trees Available:</span>
                <span className="font-bold ">{availableTrees}</span>
              </div>
              <div
                className={`${
                  isAdjustmentValid
                    ? "bg-[#ECFDF3] text-[#027A48]"
                    : "bg-[#FEECEB] text-[#F04438]"
                } max-sm:flex-col md:text-lg leading-6.5 rounded-[8px] w-full sm:p-3 max-sm:py-2 max-sm:px-3 flex justify-between sm:items-center gap-1 sm:gap-4 transition-colors`}
              >
                <span className="font-medium">Trees Selected:</span>
                <span className="font-bold ">{currentInputTrees}</span>
              </div>
            </div>
            <div className="flex items-center justify-between border border-[#E8E8E9] px-4 py-2 rounded-[8px]">
              <div className="space-y-1">
                <h1 className="text-[#090C0F] font-semibold leading-5">
                  Jane Cooper
                </h1>
                <p className="text-[#454950] font-medium leading-6 text-sm">
                  janecooper@gamil.com
                </p>
              </div>
              <input
                type="number"
                placeholder="Enter Manually"
                min="1"
                max="9999"
                value={adjustInput}
                onChange={(e) => setAdjustInput(e.target.value)}
                className={`text-center border-[#003399] text-[#003399] px-4 py-2.5 border rounded-[8px] flex-1 sm:max-w-[128px] max-w-[80px] transition-colors`}
              />
            </div>
            <Button
              onClick={handleSaveAdjust}
              disabled={!isAdjustmentValid}
              className="w-full h-12 text-white bg-[#003399] rounded-[8px] text-base font-bold hover:bg-[#013eb9] disabled:bg-gray-300"
            >
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProceedToPay;
