"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { OrderSummary as OrderSummaryType } from "./types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import plantAnimation from "../../../public/images/plant.json";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

interface OrderSummaryProps {
  orderSummary: OrderSummaryType;
  currentStep: number;
  isFormValid: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  orderSummary,
  currentStep,
  isFormValid,
}) => {
  return (
    <div className="lg:w-[45%] sticky top-20 self-start space-y-6">
      <div className="space-y-1">
        <div className="border border-[#E8E8E9] rounded-2xl overflow-hidden">
          <h2 className="border-b border-[#E8E8E9] text-lg font-bold py-4 px-6">
            Order Summary
          </h2>

          <div className="space-y-6 p-6 bg-[#F9FCFE]">
            <div className="text-[#4C4748] flex justify-between">
              <div className="space-y-5 text-sm">
                <h2 className="font-bold text-base">Donation for :</h2>
                <h2>Number Of Trees :</h2>
                <h2>Total Co2 offset :</h2>
                <h2>Total Amount :</h2>
              </div>

              <div className="space-y-4 font-bold">
                <h2>Shivgarh, MP</h2>
                <h2>
                  {orderSummary.numberOfTrees > 0
                    ? String(orderSummary.numberOfTrees).padStart(2, "0")
                    : "--"}
                </h2>
                <h2>{orderSummary.totalCo2Offset}</h2>
                <h2>{orderSummary.totalAmount}</h2>
              </div>
            </div>
          </div>
        </div>

        <p className="flex items-start gap-1 text-[#0A0A0A] text-xs font-medium">
          <span className="text-red-500">*</span>
          These are only estimated values as per UN standards.
        </p>
      </div>

      {currentStep === 2 && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              disabled={!isFormValid || orderSummary.numberOfTrees === 0}
              className="w-full h-12 border-1 disabled:border-[#E8E8E9] disabled:bg-white border-[#95AAD5] text-white bg-[#003399] disabled:text-[#94979A] rounded-lg text-base font-bold hover:bg-[#013eb9] transition-colors disabled:cursor-not-allowed disabled:opacity-100"
            >
              Proceed to Pay
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent className="max-w-[533px] border border-[#E4E4E4] rounded-2xl dialog-pop gap-4">
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
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default OrderSummary;
