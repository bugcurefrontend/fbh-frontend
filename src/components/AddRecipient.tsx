import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import RecipientCard from "./gift-tree/RecipientCard";
import RecipientForm from "./gift-tree/RecipientForm";
import { Recipient, RecipientFormData } from "./gift-tree/types";

interface AddRecipientProps {
  onQuantityChange?: (totalTrees: number) => void;
  onNextStep?: () => void;
}

const AddRecipient: React.FC<AddRecipientProps> = ({
  onQuantityChange,
  onNextStep,
}) => {
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [showForm, setShowForm] = useState<boolean>(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [errors, setErrors] = useState<
    Partial<Record<keyof RecipientFormData, string>>
  >({});

  const quantities: number[] = [10, 25, 50, 100];

  const [formData, setFormData] = useState<RecipientFormData>({
    selectedQuantity: null,
    manualQuantity: "",
    firstName: "",
    lastName: "",
    email: "",
    region: "in",
    phoneNumber: "",
  });

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("recipients");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setRecipients(parsed);
        if (parsed.length > 0) {
          setShowForm(false);
          updateOrderSummary(parsed);
        }
      } catch (e) {
        console.error("Failed to parse stored recipients:", e);
      }
    }
  }, []);

  // Save to localStorage whenever recipients change
  useEffect(() => {
    if (recipients.length > 0) {
      localStorage.setItem("recipients", JSON.stringify(recipients));
      updateOrderSummary(recipients);
    } else {
      localStorage.removeItem("recipients");
      if (onQuantityChange) {
        onQuantityChange(0);
      }
    }
  }, [recipients]);

  const updateOrderSummary = (recipientsList: Recipient[]) => {
    const totalTrees = recipientsList.reduce((sum, r) => sum + r.trees, 0);
    if (onQuantityChange) {
      onQuantityChange(totalTrees);
    }
  };

  const resetForm = (): void => {
    setFormData({
      selectedQuantity: null,
      manualQuantity: "",
      firstName: "",
      lastName: "",
      email: "",
      region: "in",
      phoneNumber: "",
    });
    setErrors({});
    setEditingId(null);
  };

  const handleQuantitySelect = (qty: number): void => {
    setFormData({
      ...formData,
      selectedQuantity: qty,
      manualQuantity: "",
    });
    setErrors({
      ...errors,
      selectedQuantity: undefined,
      manualQuantity: undefined,
    });
    // Update order summary immediately when quantity is selected
    if (onQuantityChange) {
      onQuantityChange(qty);
    }
  };

  const handleManualQuantityChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = e.target.value;
    // Only allow positive numbers
    if (value === "" || (Number(value) > 0 && /^\d+$/.test(value))) {
      setFormData({
        ...formData,
        manualQuantity: value,
        selectedQuantity: null,
      });
      setErrors({
        ...errors,
        selectedQuantity: undefined,
        manualQuantity: undefined,
      });
      // Update order summary immediately when manual quantity is entered
      if (onQuantityChange && value) {
        onQuantityChange(parseInt(value));
      } else if (onQuantityChange && !value) {
        onQuantityChange(0);
      }
    }
  };

  const handleInputChange = (
    field: keyof RecipientFormData,
    value: string
  ): void => {
    setFormData({
      ...formData,
      [field]: value,
    });
    // Clear error for this field when user starts typing
    setErrors({ ...errors, [field]: undefined });
  };

  const getTreeCount = (): number => {
    return Number(formData.manualQuantity) || formData.selectedQuantity || 0;
  };

  const getRegionCode = (): string => {
    const codes: Record<string, string> = { in: "+91", us: "+1", uk: "+44" };
    return codes[formData.region] || "+91";
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone: string): boolean => {
    // Remove spaces and check if it's a valid number (at least 6 digits)
    const cleaned = phone.replace(/\s/g, "");
    return /^\d{6,15}$/.test(cleaned);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof RecipientFormData, string>> = {};
    let isValid = true;

    // Validate tree count
    const treeCount = getTreeCount();
    if (treeCount <= 0) {
      newErrors.selectedQuantity = "Please select or enter number of trees";
      isValid = false;
    }

    // Validate first name
    if (formData.firstName.trim() === "") {
      newErrors.firstName = "First name is required";
      isValid = false;
    }

    // Validate last name
    if (formData.lastName.trim() === "") {
      newErrors.lastName = "Last name is required";
      isValid = false;
    }

    // Validate email
    if (formData.email.trim() === "") {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Validate phone number
    if (formData.phoneNumber.trim() === "") {
      newErrors.phoneNumber = "Phone number is required";
      isValid = false;
    } else if (!validatePhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid phone number (6-15 digits)";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const isFormValid = (): boolean => {
    const treeCount = getTreeCount();
    return (
      treeCount > 0 &&
      formData.firstName.trim() !== "" &&
      formData.lastName.trim() !== "" &&
      formData.email.trim() !== "" &&
      validateEmail(formData.email) &&
      formData.phoneNumber.trim() !== "" &&
      validatePhoneNumber(formData.phoneNumber)
    );
  };

  const handleSave = (): void => {
    if (!validateForm()) return;

    const recipientData: Recipient = {
      id: editingId || Date.now(),
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      phoneNumber: `${getRegionCode()} ${formData.phoneNumber.trim()}`,
      trees: getTreeCount(),
      region: formData.region,
    };

    if (editingId) {
      setRecipients(
        recipients.map((r) => (r.id === editingId ? recipientData : r))
      );
    } else {
      setRecipients([...recipients, recipientData]);
    }

    resetForm();
    setShowForm(false);
  };

  const handleDelete = (id: number): void => {
    if (window.confirm("Are you sure you want to delete this recipient?")) {
      setRecipients(recipients.filter((r) => r.id !== id));

      // If we're editing this recipient, close the form
      if (editingId === id) {
        resetForm();
        setShowForm(false);
      }
    }
  };

  const handleEdit = (recipient: Recipient): void => {
    const phoneNumber = recipient.phoneNumber.replace(/^\+\d+\s/, "").trim();
    const treeCount = recipient.trees;

    setFormData({
      selectedQuantity: quantities.includes(treeCount) ? treeCount : null,
      manualQuantity: quantities.includes(treeCount)
        ? ""
        : treeCount.toString(),
      firstName: recipient.firstName,
      lastName: recipient.lastName,
      email: recipient.email,
      region: recipient.region,
      phoneNumber: phoneNumber,
    });
    setEditingId(recipient.id);
    setShowForm(true);
  };

  const handleAddMore = (): void => {
    resetForm();
    setShowForm(true);
  };

  const handleCancelForm = (): void => {
    if (
      editingId ||
      Object.values(formData).some((val) =>
        typeof val === "string" ? val.trim() !== "" : val !== null
      )
    ) {
      if (
        window.confirm(
          "Are you sure you want to cancel? Your changes will be lost."
        )
      ) {
        resetForm();
        setShowForm(false);
      }
    } else {
      resetForm();
      setShowForm(false);
    }
  };

  const handleNextStep = (): void => {
    if (onNextStep) {
      onNextStep();
    } else {
      console.log("Proceeding to next step with recipients:", recipients);
      alert(`Proceeding with ${recipients.length} recipient(s) to next step!`);
    }
  };

  return (
    <div className="bg-white space-y-8">
      {/* Recipient Cards */}
      <div className="space-y-4">
        {recipients.map((recipient) => (
          <RecipientCard
            key={recipient.id}
            recipient={recipient}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
        {recipients.length > 0 && !showForm && (
          <button
            onClick={handleAddMore}
            className="text-[#003399] text-sm font-bold flex items-center gap-2 justify-end w-full pr-2"
          >
            Add more recipient's
            <Plus className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <RecipientForm
          formData={formData}
          errors={errors}
          quantities={quantities}
          editingId={editingId}
          recipientsCount={recipients.length}
          onInputChange={handleInputChange}
          onQuantitySelect={handleQuantitySelect}
          onManualQuantityChange={handleManualQuantityChange}
          onSave={handleSave}
          onCancel={handleCancelForm}
          isFormValid={isFormValid()}
        />
      )}

      {/* Next Button - Only show when there are recipients and form is hidden */}
      {recipients.length > 0 && !showForm && (
        <button
          onClick={handleNextStep}
          className="w-full h-12 bg-[#003399] text-white rounded-lg text-base font-bold hover:bg-[#002266] transition-colors shadow-sm hover:shadow-md"
        >
          Next
        </button>
      )}

      {/* Empty State */}
      {recipients.length === 0 && !showForm && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No recipients added yet</p>
          <button
            onClick={handleAddMore}
            className="px-6 py-3 bg-[#003399] text-white rounded-lg font-semibold hover:bg-[#002266] transition-colors"
          >
            Add First Recipient
          </button>
        </div>
      )}
    </div>
  );
};

export default AddRecipient;
