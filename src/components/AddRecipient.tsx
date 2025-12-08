import React, { useState, useEffect } from "react";
import { Mail, Trash2, Plus, X, SquarePen } from "lucide-react";

interface Recipient {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  trees: number;
  region: string;
}

interface FormData {
  selectedQuantity: number | null;
  manualQuantity: string;
  firstName: string;
  lastName: string;
  email: string;
  region: string;
  phoneNumber: string;
}

const AddRecipient: React.FC = () => {
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [showForm, setShowForm] = useState<boolean>(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );

  const quantities: number[] = [10, 25, 50, 100];

  const [formData, setFormData] = useState<FormData>({
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
    } else {
      localStorage.removeItem("recipients");
    }
  }, [recipients]);

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
    }
  };

  const handleInputChange = (field: keyof FormData, value: string): void => {
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
    const newErrors: Partial<Record<keyof FormData, string>> = {};
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
    // You can add your navigation logic here
    console.log("Proceeding to next step with recipients:", recipients);
    alert(`Proceeding with ${recipients.length} recipient(s) to next step!`);
    // Example: router.push('/next-step');
  };

  return (
    <div className="bg-white space-y-8">
      {/* Recipient Cards */}
      <div className="space-y-4">
        {recipients.map((recipient) => (
          <div
            key={recipient.id}
            className="bg-white border border-gray-200 rounded-md"
          >
            <div className="flex justify-between items-start p-4 border-b">
              <h3 className="text-lg font-bold text-gray-900">
                {recipient.firstName} {recipient.lastName}
              </h3>
              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(recipient)}
                  className="transition-colors text-sm font-medium"
                >
                  <SquarePen className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(recipient.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="space-y-3 text-sm p-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="text-gray-900">{recipient.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phone Number:</span>
                <span className="text-gray-900">{recipient.phoneNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Number Of Trees:</span>
                <span className="text-gray-900 font-semibold">
                  {recipient.trees}
                </span>
              </div>
            </div>
          </div>
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
        <div className="border rounded-xl">
          <div className="flex justify-between items-center border-b border-gray-200 py-4 px-6">
            <h2 className="text-lg font-bold">
              {editingId
                ? "Edit Recipient"
                : recipients.length > 0
                ? "Add Recipient"
                : "Recipient Details"}
            </h2>
            {recipients.length > 0 && (
              <button
                onClick={handleCancelForm}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="p-4">
            <div className="mb-4 space-y-4">
              {/* Tree Quantity Selection */}
              <div className="space-y-4">
                <p className="text-base text-gray-700 font-medium">
                  How many trees would you like to plant?
                </p>
                <div className="flex gap-3 flex-wrap">
                  {quantities.map((qty) => (
                    <button
                      key={qty}
                      onClick={() => handleQuantitySelect(qty)}
                      className={`px-6 py-2.5 rounded-md border transition-colors font-medium ${
                        formData.selectedQuantity === qty
                          ? "text-[#003399] border-[#003399]"
                          : ""
                      }`}
                    >
                      {qty}
                    </button>
                  ))}

                  <input
                    type="number"
                    placeholder="Enter Manually"
                    value={formData.manualQuantity}
                    onChange={handleManualQuantityChange}
                    min="1"
                    className={`text-center px-4 py-2.5 border rounded-md flex-1 min-w-[140px] transition-colors ${
                      formData.manualQuantity
                        ? "border-[#003399] text-[#003399]"
                        : "border-gray-300"
                    } ${
                      errors.selectedQuantity || errors.manualQuantity
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                </div>
                {(errors.selectedQuantity || errors.manualQuantity) && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.selectedQuantity || errors.manualQuantity}
                  </p>
                )}
              </div>

              {/* Name Fields */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-xs text-gray-700 font-semibold">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    className={`w-full px-3.5 py-2.5 border rounded-lg ${
                      errors.firstName ? "border-red-500" : ""
                    }`}
                    placeholder="First Name"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="mb-1.5 block text-xs text-gray-700 font-semibold">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    className={`w-full px-3.5 py-2.5 border rounded-lg ${
                      errors.lastName ? "border-red-500" : ""
                    }`}
                    placeholder="Last Name"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.lastName}
                    </p>
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
                    onChange={(e) => handleInputChange("email", e.target.value)}
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
                    onChange={(e) =>
                      handleInputChange("region", e.target.value)
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 border-none bg-transparent p-0 pr-1 h-auto focus:ring-0 focus:outline-none text-sm font-medium z-10 cursor-pointer"
                  >
                    <option value="in">🇮🇳 +91</option>
                    <option value="us">🇺🇸 +1</option>
                    <option value="uk">🇬🇧 +44</option>
                  </select>

                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      handleInputChange("phoneNumber", e.target.value)
                    }
                    placeholder="98765 43210"
                    className={`pl-24 w-full px-3.5 py-2.5 border rounded-lg ${
                      errors.phoneNumber ? "border-red-500" : ""
                    }`}
                  />
                </div>
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              disabled={!isFormValid()}
              className="w-full h-12 border-1 disabled:border-[#E8E8E9] disabled:bg-white border-[#95AAD5] text-white bg-[#003399] disabled:text-[#94979A] rounded-lg text-base font-bold hover:bg-[#013eb9] transition-colors disabled:cursor-not-allowed disabled:opacity-100"
            >
              {editingId ? "Update Recipient" : "Save"}
            </button>
          </div>
        </div>
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
