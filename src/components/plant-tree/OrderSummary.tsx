"use client";

import React, { useState } from "react";
import { OrderSummary as OrderSummaryType } from "./types";
import ProceedToPay from "./ProceedToPay";

import { Recipient } from "@/components/gift-tree/types";

interface OrderSummaryProps {
  orderSummary: OrderSummaryType;
  currentStep: number;
  isFormValid: boolean;
  userName?: string;
  userEmail?: string;
  recipients?: Recipient[];
  onTreeCountChange?: (count: number) => void;
  onRecipientsUpdate?: (recipients: Recipient[]) => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  orderSummary,
  currentStep,
  isFormValid,
  userName,
  userEmail,
  recipients,
  onTreeCountChange,
  onRecipientsUpdate,
}) => {
  return (
    <div className="lg:w-[45%] sticky top-20 self-start space-y-6">
      <div className="space-y-1">
        <div className="border border-[#E8E8E9] rounded-2xl overflow-hidden">
          <h2 className="border-b border-[#E8E8E9] md:text-lg font-semibold md:font-bold py-4 px-4 md:px-6">
            Order Summary
          </h2>

          <div className="space-y-6 p-4 md:p-6 bg-[#F9FCFE]">
            <div className="text-[#4C4748] flex justify-between">
              <div className="space-y-3 md:space-y-4 text-sm leading-5.5">
                <h2 className="mb-4.5 md:mb-6 font-semibold md:font-bold md:text-base">
                  Donation for :
                </h2>
                <h2>Number Of Trees :</h2>
                <h2>
                  Total Co2 Sequested <span className="text-red-500">*</span> :
                </h2>
                <h2>Total Amount :</h2>
              </div>

              <div className="space-y-3 md:space-y-4 font-semibold text-sm leading-5.5">
                <h2 className="mb-4.5 md:mb-6 md:text-base md:font-bold">
                  Shivgarh, MP
                </h2>
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
        <ProceedToPay
          isFormValid={isFormValid}
          numberOfTrees={orderSummary.numberOfTrees}
          userName={userName}
          userEmail={userEmail}
          recipients={recipients}
          onTreeCountChange={onTreeCountChange}
          onRecipientsUpdate={onRecipientsUpdate}
        />
      )}
    </div>
  );
};

export default OrderSummary;
