"use client";

import ProgressSteps from "@/components/plant-tree/ProgressSteps";
import PlantInfoCard from "@/components/plant-tree/PlantInfoCard";
import PlantDetailsSection from "@/components/plant-tree/PlantDetailsSection";
import PersonalDetailsSection from "@/components/plant-tree/PersonalDetailsSection";
import TaxDetailsSection from "@/components/plant-tree/TaxDetailsSection";
import OrderSummary from "@/components/plant-tree/OrderSummary";
import LoginDialog from "@/components/LoginDialog";
import { useTreeCheckout } from "@/components/plant-tree/useTreeCheckout";
import { QUANTITIES } from "@/components/plant-tree/constants";
import CertificatePreview from "@/components/gift-tree/CertificatePreview";
import { Button } from "@/components/ui/button";
import { PlantRate } from "@/types/plant-rate";

interface Props {
  co2PerTree?: number | null;
  sampleCertificateUrl?: string | null;
  plantRates?: PlantRate[];
}

const TreeCheckoutClient = ({ co2PerTree, sampleCertificateUrl, plantRates = [] }: Props) => {
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
    handleCreateReservation,
    setStep,
    reservationData, // NEW: Get reservation data
  } = useTreeCheckout(co2PerTree ?? undefined, plantRates);

  return (
    <div className="max-w-7xl mx-auto min-h-screen bg-white sm:px-16 xl:px-28 px-4 md:pt-8 pt-4 space-y-8">
      <div className="md:space-y-6 space-y-4">
        <h1 className="text-2xl font-[Playfair_Display] font-semibold md:text-[32px] md:leading-[48px]">
          Checkout
        </h1>

        <ProgressSteps currentStep={step} onStepClick={(s) => setStep(s)} />
      </div>

      <div className="lg:flex max-lg:space-y-8 md:gap-12 xl:gap-15">
        {/* Left Section */}
        <div className="lg:w-[63%]">
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
                geotaggedRate={orderSummary.geotaggedRate}
                nonGeotaggedRate={orderSummary.nonGeotaggedRate}
                currencySymbol={orderSummary.currencySymbol}
              />

              <CertificatePreview imageUrl={sampleCertificateUrl ?? undefined} blurImageUrl={sampleCertificateUrl ?? undefined} />

              <PlantDetailsSection
                quantities={QUANTITIES}
                selectedQuantity={selectedQuantity}
                manualQuantity={manualQuantity}
                onQuantitySelect={handleQuantitySelect}
                onManualQuantityChange={handleManualQuantityChange}
                onManualInputFocus={handleManualInputFocus}
              />

              <Button
                onClick={handleSaveAndNext}
                disabled={!selectedQuantity && !manualQuantity}
                className="mt-8 w-full h-12 border-1 disabled:border-[#E8E8E9] disabled:bg-white border-[#95AAD5] text-white bg-[#003399] disabled:text-[#94979A] rounded-[8px] text-base font-bold hover:bg-[#013eb9] transition-colors disabled:cursor-not-allowed disabled:opacity-100"
              >
                Next
              </Button>
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
          userName={`${personalDetails.firstName} ${personalDetails.lastName}`.trim()}
          userEmail={personalDetails.email}
          onProceedToPayment={handleCreateReservation}
          reservationToken={reservationData?.token}
          currencyCode={personalDetails.currency}
        />
      </div>

      <LoginDialog
        isOpen={isLoginDialogOpen}
        onClose={handleDialogClose}
        onContinueAsGuest={handleContinueAsGuest}
        onSignIn={handleSignIn}
      />
    </div>
  );
};

export default TreeCheckoutClient;
