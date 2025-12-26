"use client";

import React, { useState } from "react";
import ProceedToPay from "../plant-tree/ProceedToPay";

export interface OrderSummary {
  numberOfTrees: number;
  totalCo2Offset: string;
  totalAmount: string;
}

interface NewOrderSummaryProps {
  orderSummary: OrderSummary;
  currentStep: number;
  isFormValid: boolean;
  handleProceed: () => Promise<void> | void;
}

const NewOrderSummary: React.FC<NewOrderSummaryProps> = ({
  orderSummary,
  isFormValid,
  handleProceed,
}) => {
  const [selectedTrees, setSelectedTrees] = useState(
    orderSummary.numberOfTrees
  );

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="border border-[#E8E8E9] rounded-2xl overflow-hidden">
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

      <ProceedToPay
        isFormValid={isFormValid}
        numberOfTrees={selectedTrees}
        onTreeCountChange={setSelectedTrees}
      />
    </div>
  );
};

export default NewOrderSummary;
