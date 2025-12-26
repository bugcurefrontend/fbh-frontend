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
  onTreeCountChange: (count: number) => void;
  availableTrees?: number;
}

const ProceedToPay: React.FC<ProceedToPayProps> = ({
  isFormValid,
  numberOfTrees,
  onTreeCountChange,
  availableTrees = 10,
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
    }, 4000);
  };

  const handleSaveAdjust = () => {
    const val = parseInt(adjustInput, 10);
    if (!isNaN(val)) {
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
        className="w-full h-12 border-1 disabled:border-[#E8E8E9] disabled:bg-white border-[#95AAD5] text-white bg-[#003399] disabled:text-[#94979A] rounded-lg text-base font-bold hover:bg-[#013eb9] transition-colors disabled:cursor-not-allowed disabled:opacity-100"
      >
        Proceed to Payment
      </Button>

      <AlertDialog open={isStatusOpen} onOpenChange={setIsStatusOpen}>
        <AlertDialogContent className="max-w-[533px] border border-[#E4E4E4] rounded-2xl dialog-pop gap-4">
          {status === "error" ? (
            <>
              <div className="w-[155px] h-[155px] mx-auto">
                <Lottie animationData={plantAnimation} loop={true} />
              </div>

              <AlertDialogTitle>
                <p className="text-2xl leading-9 font-semibold md:font-bold text-[#232D26]">
                  Uh-oh!
                </p>
              </AlertDialogTitle>

              <div className="space-y-3">
                <p className="text-xl font-semibold text-[#19212C]">
                  Looks like all trees have been planted!{" "}
                </p>
                <p className="text-[#454950] font-medium">
                  Redirecting you to Homepage in{" "}
                  <span className="text-[#0D824B]">00:0{countdown}</span>
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="w-[155px] h-[155px] mx-auto">
                <Lottie animationData={plantAnimation} loop={true} />
              </div>

              <AlertDialogTitle>
                <p className="text-2xl leading-9 font-semibold md:font-bold text-[#232D26]">
                  Please wait
                </p>
              </AlertDialogTitle>

              <div className="space-y-3">
                <p className="text-xl font-semibold text-[#19212C]">
                  Holding your trees and taking you to payment.
                </p>
                <p className="text-[#454950] font-medium">
                  Please do not refresh this page or click on browser’s back
                  button.{" "}
                </p>
              </div>
            </>
          )}
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={isAdjustOpen} onOpenChange={setIsAdjustOpen}>
        <DialogContent showCloseButton={false} className="max-w-[533px] px-6">
          <DialogTitle className="uppercase font-bold text-2xl px-6 text-center">
            Adjust Trees
          </DialogTitle>
          <div className="space-y-6">
            <div className="flex gap-5 items-center border-[0.8px] border-[#F78F08] text-[#F78F08] bg-[#FEF4E7] px-4 py-3 rounded-lg font-medium">
              <TriangleAlert className="min-w-8 h-full" />
              <p>
                You've exceeded the maximum trees quantity. Please reduce the
                quantity for recipient.
              </p>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="bg-[#E8E8E9] text-[#19212C] text-lg leading-6.5 rounded-lg p-3 flex items-center gap-4">
                <span className="font-medium">Trees Available:</span>
                <span className="font-bold ">{availableTrees}</span>
              </div>
              <div
                className={`${
                  isAdjustmentValid
                    ? "bg-[#ECFDF3] text-[#027A48]"
                    : "bg-[#FEECEB] text-[#F04438]"
                } text-lg leading-6.5 rounded-lg p-3 flex items-center gap-4 transition-colors`}
              >
                <span className="font-medium">Trees Selected:</span>
                <span className="font-bold ">{currentInputTrees}</span>
              </div>
            </div>
            <div className="flex items-center justify-between border border-[#E8E8E9] px-3 py-4 rounded-lg">
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
                value={adjustInput}
                onChange={(e) => setAdjustInput(e.target.value)}
                className={`text-center border-[#003399] text-[#003399] px-4 py-2.5 border rounded-md flex-1 max-w-[128px] transition-colors`}
              />
            </div>
            <Button
              onClick={handleSaveAdjust}
              disabled={!isAdjustmentValid}
              className="w-full h-12 text-white bg-[#003399] rounded-lg text-base font-bold hover:bg-[#013eb9] disabled:bg-gray-300"
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
