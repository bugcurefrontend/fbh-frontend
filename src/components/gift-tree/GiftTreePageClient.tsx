"use client";

import { useEffect, useState, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import ProgressSteps from "@/components/plant-tree/ProgressSteps";
import PlantInfoCard from "@/components/plant-tree/PlantInfoCard";
import PersonalDetailsSection from "@/components/plant-tree/PersonalDetailsSection";
import TaxDetailsSection from "@/components/plant-tree/TaxDetailsSection";
import OrderSummary from "@/components/plant-tree/OrderSummary";
import CertificatePreview from "@/components/gift-tree/CertificatePreview";
import AddRecipient from "@/components/AddRecipient";
import validations from "@/utils/validations";
import {
  OrderSummary as OrderSummaryType,
  PersonalDetails,
  TaxDetails,
  Species,
} from "@/components/plant-tree/types";
import { useAuth } from "@/lib/auth-context";
import LoginDialog from "@/components/LoginDialog";
import { useCurrency } from "@/components/CurrencySelect";
import { fetchAllPlantRates } from "@/services/plant-rates";
import { PlantRate } from "@/types/plant-rate";
import { Recipient } from "@/components/gift-tree/types";

import { useGiftTree } from "@/hooks/useGiftTree";

interface Props {
  co2PerTree?: number | null;
  sampleCertificateUrl?: string | null;
  plantRates?: PlantRate[];
}

const GiftTreePageClient = ({ co2PerTree, sampleCertificateUrl, plantRates = [] }: Props) => {
  const {
    step,
    setStep,
    recipients,
    setRecipients,
    isGeoTagged,
    selectedSpeciesId,
    setSelectedSpeciesId,
    availabilityMessage,
    orderSummary,
    personalDetails,
    taxDetails,
    reservationData,
    reservationError,
    isLoadingReservation,
    isLoginDialogOpen,
    setIsLoginDialogOpen,
    availableSpeciesForTag,
    emailValid,
    idNumberValid,
    isFormValid,
    handlePersonalDetailsChange,
    handleTaxDetailsChange,
    handleNextStep,
    setPreviewQuantity,
    availableCount,
    editingRecipientId,
    setEditingRecipientId,
    handleGeoTaggedChange,
  } = useGiftTree(co2PerTree ?? undefined, plantRates);

  const { login } = useAuth();

  const handleSignIn = () => {
    login();
    setIsLoginDialogOpen(false);
  };

  const handleContinueAsGuest = () => {
    setIsLoginDialogOpen(false);
  };

  const handleDialogClose = (open: boolean) => {
    if (!open) handleContinueAsGuest();
  };

  const onProceedToPayment = async (): Promise<boolean> => {
    const success = await handleNextStep();
    return !!success;
  };

  return (
    <div className="max-w-7xl mx-auto min-h-screen bg-white sm:px-16 xl:px-28 px-4 md:pt-8 pt-4 space-y-8">
      <div className="space-y-6">
        <h1 className="text-2xl font-[Playfair_Display] font-semibold md:text-[32px] md:leading-[48px]">
          Checkout
        </h1>

        <ProgressSteps currentStep={step} onStepClick={(s) => setStep(s)} />
      </div>
      <div className="lg:flex max-lg:space-y-8 md:gap-12 xl:gap-15">
        {/* Left Section */}
        <div className="lg:w-[55%]">
          {step === 1 && (
            <>
              <PlantInfoCard
                selectedQuantity={orderSummary.numberOfTrees > 0 ? orderSummary.numberOfTrees : null}
                manualQuantity={orderSummary.numberOfTrees > 0 ? orderSummary.numberOfTrees.toString() : ""}
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

              <CertificatePreview
                imageUrl={sampleCertificateUrl ?? undefined}
                blurImageUrl={sampleCertificateUrl ?? undefined}
              />

              {/* Recipient Details */}
              <AddRecipient
                onQuantityChange={setPreviewQuantity}
                onNextStep={handleNextStep}
                recipients={recipients}
                onRecipientsChange={setRecipients}
                onEditStateChange={setEditingRecipientId}
              />
            </>
          )}

          {(step === 2 || step === 3) && (
            <>
              <PersonalDetailsSection
                personalDetails={personalDetails}
                onPersonalDetailsChange={handlePersonalDetailsChange}
                emailError={!emailValid && personalDetails.email ? "Enter a valid email address." : ""}
              />

              <TaxDetailsSection
                taxDetails={taxDetails}
                onTaxDetailsChange={handleTaxDetailsChange}
                idNumberError={!idNumberValid && taxDetails.idNumber ? "Enter a valid ID number." : ""}
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
          recipients={recipients}
          onProceedToPayment={onProceedToPayment}
          reservationToken={reservationData?.token}
          currencyCode={personalDetails.currency}
          availableTrees={availableCount}
          personalDetails={personalDetails}
          taxDetails={taxDetails}
        />
      </div>
      <LoginDialog
        isOpen={isLoginDialogOpen}
        onClose={handleDialogClose}
        onSignIn={handleSignIn}
        onContinueAsGuest={handleContinueAsGuest}
      />{" "}
    </div>
  );
};

export default GiftTreePageClient;
