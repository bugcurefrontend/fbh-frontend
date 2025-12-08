import React from "react";

interface RecipientQuantitySelectorProps {
  quantities: number[];
  selectedQuantity: number | null;
  manualQuantity: string;
  onQuantitySelect: (qty: number) => void;
  onManualQuantityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors?: {
    selectedQuantity?: string;
    manualQuantity?: string;
  };
}

const RecipientQuantitySelector: React.FC<RecipientQuantitySelectorProps> = ({
  quantities,
  selectedQuantity,
  manualQuantity,
  onQuantitySelect,
  onManualQuantityChange,
  errors,
}) => {
  return (
    <div className="space-y-4">
      <p className="text-base text-gray-700 font-medium">
        How many trees would you like to plant?
      </p>
      <div className="flex gap-3 flex-wrap">
        {quantities.map((qty) => (
          <button
            key={qty}
            onClick={() => onQuantitySelect(qty)}
            className={`px-6 py-2.5 rounded-md border transition-colors font-medium ${
              selectedQuantity === qty ? "text-[#003399] border-[#003399]" : ""
            }`}
          >
            {qty}
          </button>
        ))}

        <input
          type="number"
          placeholder="Enter Manually"
          value={manualQuantity}
          onChange={onManualQuantityChange}
          min="1"
          className={`text-center px-4 py-2.5 border rounded-md flex-1 min-w-[140px] transition-colors ${
            manualQuantity
              ? "border-[#003399] text-[#003399]"
              : "border-gray-300"
          } ${
            errors?.selectedQuantity || errors?.manualQuantity
              ? "border-red-500"
              : ""
          }`}
        />
      </div>
      {(errors?.selectedQuantity || errors?.manualQuantity) && (
        <p className="text-red-500 text-xs mt-1">
          {errors.selectedQuantity || errors.manualQuantity}
        </p>
      )}
    </div>
  );
};

export default RecipientQuantitySelector;
