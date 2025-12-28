"use client";

import ProgressSteps from "@/components/plant-tree/ProgressSteps";
import PlantInfoCard from "@/components/plant-tree/PlantInfoCard";
import PlantDetailsSection from "@/components/plant-tree/PlantDetailsSection";
import PersonalDetailsSection from "@/components/plant-tree/PersonalDetailsSection";
import TaxDetailsSection from "@/components/plant-tree/TaxDetailsSection";
import OrderSummary from "@/components/plant-tree/OrderSummary";
import LoginDialog from "@/components/LoginDialog";
import { useTreeCheckout } from "../../src/components/plant-tree/useTreeCheckout";
import { QUANTITIES } from "../../src/components/plant-tree/constants";

const TreeCheckout = () => {
  const {
    step,
    selectedQuantity,
    manualQuantity,
    orderSummary,
    personalDetails,
    taxDetails,
    isGeoTagged,
    selectedSpeciesId,
    availabilityMessage,
    isLoginDialogOpen,
    availableSpeciesForTag,
    emailValid,
    phoneValid,
    pincodeValid,
    idNumberValid,
    isFormValid,
    handleQuantitySelect,
    handleManualQuantityChange,
    handleManualInputFocus,
    handleSaveAndNext,
    handlePersonalDetailsChange,
    handleTaxDetailsChange,
    handleGeoTaggedChange,
    setSelectedSpeciesId,
    handleDialogClose,
    handleSignIn,
    handleContinueAsGuest,
  } = useTreeCheckout();

  return (
    <div className="max-w-7xl mx-auto min-h-screen bg-white sm:px-16 xl:px-28 px-4 md:pt-8 pt-4 space-y-8">
      <div className="space-y-6">
        <h1 className="text-2xl font-[Playfair_Display] font-semibold md:text-[32px] md:leading-[48px]">
          Checkout
        </h1>

        <ProgressSteps currentStep={step} />
      </div>

      <div className="lg:flex max-lg:space-y-8 md:gap-12 xl:gap-15">
        {/* Left Section */}
        <div className="lg:w-[55%]">
          {step === 1 && (
            <>
              <PlantInfoCard
                selectedQuantity={selectedQuantity}
                manualQuantity={manualQuantity}
                selectedSpeciesId={selectedSpeciesId}
                speciesData={availableSpeciesForTag}
                onSpeciesSelect={setSelectedSpeciesId}
                isGeoTagged={isGeoTagged}
                onGeoTaggedChange={handleGeoTaggedChange}
                availabilityMessage={availabilityMessage}
              />

              <PlantDetailsSection
                quantities={QUANTITIES}
                selectedQuantity={selectedQuantity}
                manualQuantity={manualQuantity}
                onQuantitySelect={handleQuantitySelect}
                onManualQuantityChange={handleManualQuantityChange}
                onManualInputFocus={handleManualInputFocus}
                onSaveAndNext={handleSaveAndNext}
              />
            </>
          )}

          {step === 2 && (
            <>
              <PersonalDetailsSection
                personalDetails={personalDetails}
                onPersonalDetailsChange={handlePersonalDetailsChange}
                emailError={
                  !emailValid && personalDetails.email
                    ? "Enter a valid email address."
                    : ""
                }
                phoneError={
                  !phoneValid && personalDetails.phoneNumber
                    ? "Enter 6-15 digits only."
                    : ""
                }
                pincodeError={
                  !pincodeValid && personalDetails.pincode
                    ? "Use 4-10 digits only."
                    : ""
                }
              />

              <TaxDetailsSection
                taxDetails={taxDetails}
                onTaxDetailsChange={handleTaxDetailsChange}
                idNumberError={
                  !idNumberValid && taxDetails.idNumber
                    ? "Enter a valid ID number for the selected ID type."
                    : ""
                }
              />
            </>
          )}
        </div>

        {/* Right Section - Order Summary */}
        <OrderSummary
          orderSummary={orderSummary}
          currentStep={step}
          isFormValid={isFormValid}
        />
      </div>

      <LoginDialog
        isOpen={isLoginDialogOpen}
        onClose={handleDialogClose}
        onSignIn={handleSignIn}
        onContinueAsGuest={handleContinueAsGuest}
      />
    </div>
  );
};

export default TreeCheckout;
