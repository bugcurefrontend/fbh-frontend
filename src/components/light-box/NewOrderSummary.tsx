"use client";

import React, { useState } from "react";
import ProceedToPay from "../plant-tree/ProceedToPay";
import Image from "next/image";

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
    <div className="md:space-y-2 space-y-6">
      <div className="space-y-2">
        <div className="space-y-4 border border-[#E5EBF5] bg-[#F7F9FF] rounded-[16px] md:rounded-[8px] overflow-hidden p-4">
          <div className="flex items-center justify-between pb-4 border-b border-[#95AAD5]">
            <div className="max-md:text-sm space-y-6 text-[#0A0A0B] leading-5 font-semibold">
              <h2>Occassion / Cause :</h2>
              <h2>Number Of Trees :</h2>
              <h2>
                Total Co2 Sequested <span className="text-red-500">*</span> :
              </h2>
            </div>

            <div className="max-md:text-sm space-y-6 text-[#4C4748] leading-5.5 font-semibold">
              <div className="flex gap-2">
                <Image
                  src="/images/celebration.png"
                  alt="celebration"
                  height={20}
                  width={20}
                />
                <h2>Birthday</h2>
              </div>
              <h2>
                {selectedTrees > 0
                  ? String(selectedTrees).padStart(2, "0")
                  : "--"}
              </h2>
              <h2>{orderSummary.totalCo2Offset}</h2>
            </div>
          </div>
          <div className="flex justify-between items-center text-[#090C0F] ">
            <h2 className="font-semibold text-sm md:text-lg">Total Amount</h2>
            <h2 className="font-bold text-lg md:text-[28px]">
              {orderSummary.totalAmount}
            </h2>
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
        className="uppercase"
      />
    </div>
  );
};

export default NewOrderSummary;
