"use client";

import React, { useState } from "react";
import { OrderSummary as OrderSummaryType } from "./types";
import ProceedToPay from "./ProceedToPay";

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
  const [selectedTrees, setSelectedTrees] = useState(
    orderSummary.numberOfTrees
  );

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
                  {selectedTrees > 0
                    ? String(selectedTrees).padStart(2, "0")
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
          numberOfTrees={selectedTrees}
          onTreeCountChange={setSelectedTrees}
        />
      )}
    </div>
  );
};

export default OrderSummary;
