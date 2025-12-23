import React from "react";
import { Mail, Trash2, X } from "lucide-react";
import RecipientQuantitySelector from "./RecipientQuantitySelector";
import { RecipientFormData } from "./types";

interface RecipientFormProps {
  formData: RecipientFormData;
  errors: Partial<Record<keyof RecipientFormData, string>>;
  quantities: number[];
  editingId: number | null;
  recipientsCount: number;
  onInputChange: (field: keyof RecipientFormData, value: string) => void;
  onQuantitySelect: (qty: number) => void;
  onManualQuantityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onCancel: () => void;
  isFormValid: boolean;
}

const RecipientForm: React.FC<RecipientFormProps> = ({
  formData,
  errors,
  quantities,
  editingId,
  recipientsCount,
  onInputChange,
  onQuantitySelect,
  onManualQuantityChange,
  onSave,
  onCancel,
  isFormValid,
}) => {
  return (
    <div className="border rounded-xl">
      <div className="flex justify-between items-center border-b border-gray-200 py-4 px-6">
        <h2 className="text-lg font-bold">
          {editingId
            ? "Edit Recipient"
            : recipientsCount > 0
            ? "Add Recipient"
            : "Recipient Details"}
        </h2>
        {recipientsCount > 0 && (
          <button
            onClick={onCancel}
            className="text-red-500 hover:text-red-700 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="p-4">
        <div className="mb-4 space-y-4">
          <RecipientQuantitySelector
            quantities={quantities}
            selectedQuantity={formData.selectedQuantity}
            manualQuantity={formData.manualQuantity}
            onQuantitySelect={onQuantitySelect}
            onManualQuantityChange={onManualQuantityChange}
            errors={errors}
          />

          {/* Name Fields */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs text-gray-700 font-semibold">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => onInputChange("firstName", e.target.value)}
                className={`w-full px-3.5 py-2.5 border rounded-lg ${
                  errors.firstName ? "border-red-500" : ""
                }`}
                placeholder="First Name"
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label className="mb-1.5 block text-xs text-gray-700 font-semibold">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => onInputChange("lastName", e.target.value)}
                className={`w-full px-3.5 py-2.5 border rounded-lg ${
                  errors.lastName ? "border-red-500" : ""
                }`}
                placeholder="Last Name"
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="mb-1.5 block text-xs text-gray-700 font-semibold">
              Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => onInputChange("email", e.target.value)}
                placeholder="example@email.com"
                className={`w-full pl-10 pr-3.5 py-2.5 border rounded-lg ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone Number Field */}
          <div>
            <label className="mb-1.5 block text-xs text-gray-700 font-semibold">
              Phone number <span className="text-red-500">*</span>
            </label>
            <div className="flex relative">
              <select
                value={formData.region}
                onChange={(e) => onInputChange("region", e.target.value)}
                className="absolute left-3 top-1/2 -translate-y-1/2 border-none bg-transparent p-0 pr-1 h-auto focus:ring-0 focus:outline-none text-sm font-medium z-10 cursor-pointer"
              >
                <option value="in">🇮🇳 +91</option>
                <option value="us">🇺🇸 +1</option>
                <option value="uk">🇬🇧 +44</option>
              </select>

              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => onInputChange("phoneNumber", e.target.value)}
                placeholder="98765 43210"
                className={`pl-24 w-full px-3.5 py-2.5 border rounded-lg ${
                  errors.phoneNumber ? "border-red-500" : ""
                }`}
              />
            </div>
            {errors.phoneNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
            )}
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={onSave}
          disabled={!isFormValid}
          className="w-full h-12 border-1 disabled:border-[#E8E8E9] disabled:bg-white border-[#95AAD5] text-white bg-[#003399] disabled:text-[#94979A] rounded-lg text-base font-bold hover:bg-[#013eb9] transition-colors disabled:cursor-not-allowed disabled:opacity-100"
        >
          {editingId ? "Update Recipient" : "Save"}
        </button>
      </div>
    </div>
  );
};

export default RecipientForm;
