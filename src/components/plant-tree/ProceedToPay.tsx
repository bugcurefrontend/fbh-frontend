"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";
import plantAnimation from "../../../public/images/plant.json";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Recipient } from "@/components/gift-tree/types";
import { PersonalDetails, TaxDetails } from "@/components/plant-tree/types";
import { logger } from "@/lib/logger";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

interface ProceedToPayProps {
  isFormValid: boolean;
  numberOfTrees: number;
  onTreeCountChange?: (count: number) => void;
  availableTrees?: number;
  className?: string;
  onNavigate?: () => void;
  userName?: string;
  userEmail?: string;
  recipients?: Recipient[];
  onRecipientsUpdate?: (recipients: Recipient[]) => void;
  onProceedToPayment?: () => Promise<boolean>;
  reservationToken?: string; // NEW: Reservation token from useTreeCheckout
  rate?: number; // NEW: Rate per tree
  currencyCode?: string; // NEW: Currency code
  personalDetails?: PersonalDetails;
  taxDetails?: TaxDetails;
}

const ProceedToPay: React.FC<ProceedToPayProps> = ({
  isFormValid,
  numberOfTrees,
  onTreeCountChange,
  availableTrees = 10,
  className,
  onNavigate,
  userName,
  userEmail,
  recipients,
  onRecipientsUpdate,
  onProceedToPayment,
  reservationToken, // NEW
  rate = 100, // Default to 100 if not provided
  currencyCode = "INR", // Default to INR
  personalDetails,
  taxDetails,
}) => {
  const router = useRouter();
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [status, setStatus] = useState<"loading" | "error">("loading");
  const [countdown, setCountdown] = useState(5);

  // Adjust Trees State
  const [isAdjustOpen, setIsAdjustOpen] = useState(false);
  const [adjustInput, setAdjustInput] = useState(String(numberOfTrees));
  const [localRecipients, setLocalRecipients] = useState<Recipient[]>([]);

  // Sync input/recipients when prop changes
  useEffect(() => {
    setAdjustInput(String(numberOfTrees));
    if (recipients) {
      setLocalRecipients(recipients);
    }
  }, [numberOfTrees, recipients]);

  const onProceed = async () => {
    if (numberOfTrees > availableTrees) {
      setAdjustInput(String(numberOfTrees));
      if (recipients) {
        setLocalRecipients(recipients);
      }
      setIsAdjustOpen(true);
    } else {
      // NEW: Call reservation before payment
      if (onProceedToPayment) {
        const success = await onProceedToPayment();
        if (!success) {
          setStatus("error");
          setIsStatusOpen(true);
          return;
        }
      }
      startProcessing();
    }
  };

  const startProcessing = async () => {
    setIsStatusOpen(true);
    setStatus("loading");

    // Import payment service dynamically
    const { initiateDonation, loadRazorpayScript, openRazorpayCheckout } =
      await import("@/services/payment");

    try {
      // Step 1: Load Razorpay SDK
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        setStatus("error");
        return;
      }

      // Step 2: Call HFN Donation Service
      const baseUrl =
        typeof window !== "undefined" ? window.location.origin : "";
      // Validate required fields before proceeding
      const email = personalDetails?.email || userEmail;
      const phone = personalDetails?.phoneNumber;

      if (!email || !phone) {
        setStatus("error");
        return;
      }

      const donationRequest = {
        userProfile: {
          firstName: personalDetails?.firstName || userName || "Guest",
          lastName: personalDetails?.lastName || "",
          emailAddress: email,
          phoneNumber: phone,
          addressLine1: `${personalDetails?.doorNo || ""} ${personalDetails?.region || ""}`.trim() || "Address Line 1",
          city: (typeof personalDetails?.city === "object" ? personalDetails?.city?.name : personalDetails?.city) || "Unknown",
          state: personalDetails?.state || "Unknown",
          postalCode: personalDetails?.pincode || "000000",
          country: (typeof personalDetails?.country === "object" ? personalDetails?.country?.name : personalDetails?.country) || "India",
          citizenshipCountry: (typeof taxDetails?.citizenship === "object" ? taxDetails?.citizenship?.name : taxDetails?.citizenship) || "India",
        },
        lineItems: [
          {
            donationItem: { id: "30" }, // Forest by Heartfulness Fund
            currency: currencyCode,
            amount: numberOfTrees * rate, // Use dynamic rate
            extras: {
              donorCount: (recipients?.length || 1).toString(),
              donorName: userName || "Guest",
              donorEmailAddress: email,
              donorPhoneNumber: phone,
              donationType: recipients && recipients.length > 0 ? "gift" : "donate",
              projectId: process.env.NEXT_PUBLIC_PROJECT_ID || "1",
              donationReceivedFrom: "FBH",
              reservationToken: reservationToken, // Add reservation token
            },
          },
        ],
        clientSuccessRedirectUrl: `${baseUrl}/donation/success/`,
        clientFailureRedirectUrl: `${baseUrl}/donation/failure/`,
        clientId: process.env.NEXT_PUBLIC_CLIENT_ID || "fbh",
      };

      const response = await initiateDonation(donationRequest);

      if (!response || !response.paymentGatewayRequestParamMap) {
        setStatus("error");
        return;
      }

      // Step 3: Extract Razorpay details and trackingId from response
      const {
        client_id,
        id: orderId,
        amount_due,
        currency,
      } = response.paymentGatewayRequestParamMap;
      const { donationReferenceNumber, trackingId } = response.donation.payment;

      // Step 4: Link trackingId to reservation (CRITICAL for Pub/Sub!)
      if (reservationToken && trackingId) {
        const djangoApiUrl = process.env.NEXT_PUBLIC_DJANGO_API_URL;
        if (!djangoApiUrl) {
          logger.error("NEXT_PUBLIC_DJANGO_API_URL is not configured");
        } else {
          try {
            const linkResponse = await fetch(
              `${djangoApiUrl}/api/allocations/reservations/link-payment/`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  reservation_token: reservationToken,
                  transaction_id: trackingId,
                }),
              }
            );

            if (!linkResponse.ok) {
              logger.error("Failed to link trackingId", await linkResponse.text());
            }
          } catch (linkError) {
            logger.error("Error linking trackingId", linkError);
          }
        }
      }

      // Close the loading dialog
      setIsStatusOpen(false);

      // Step 5: Open Razorpay Checkout (this shows QR code/payment scanner)
      openRazorpayCheckout(
        client_id, // From API response
        orderId, // From API response
        amount_due, // From API response
        currency,
        donationReferenceNumber,
        email,
        phone,
        `${personalDetails?.firstName || ""} ${personalDetails?.lastName || ""}`.trim() || userName || "Guest",
        `${baseUrl}/donation/success/`,
        `${baseUrl}/donation/failure/`
      );
    } catch (error) {
      logger.error("Payment error", error);
      setStatus("error");
      setTimeout(() => {
        setCountdown(5);
      }, 2000);
    }
  };

  const handleSaveAdjust = () => {
    if (recipients && recipients.length > 0) {
      // Handle multi-recipient save
      const newTotal = localRecipients.reduce((sum, r) => sum + r.trees, 0);
      if (onTreeCountChange) {
        onTreeCountChange(newTotal);
      }
      if (onRecipientsUpdate) {
        onRecipientsUpdate(localRecipients);
      }
    } else {
      // Handle single user save
      const val = parseInt(adjustInput, 10);
      if (!isNaN(val) && onTreeCountChange) {
        onTreeCountChange(val);
      }
    }
    setIsAdjustOpen(false);
    startProcessing();
  };

  const handleRecipientTreeChange = (id: number, val: string) => {
    const trees = parseInt(val, 10);
    setLocalRecipients((prev) =>
      prev.map((r) => (r.id === id ? { ...r, trees: isNaN(trees) ? 0 : trees } : r))
    );
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isStatusOpen && status === "error") {
      if (countdown > 0) {
        timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      } else {
        setIsStatusOpen(false);
        onNavigate?.();
        router.push("/");
      }
    }
    return () => clearTimeout(timer);
  }, [isStatusOpen, status, countdown, router]);

  // Calculations for validation
  const currentTotalTrees = recipients && recipients.length > 0
    ? localRecipients.reduce((sum, r) => sum + r.trees, 0)
    : parseInt(adjustInput, 10) || 0;

  const isAdjustmentValid =
    currentTotalTrees > 0 && currentTotalTrees <= availableTrees;

  return (
    <>
      <Button
        onClick={onProceed}
        disabled={!isFormValid || numberOfTrees === 0}
        className={`w-full h-12 border-1 disabled:border-[#E8E8E9] disabled:bg-white border-[#95AAD5] text-white bg-[#003399] disabled:text-[#94979A] rounded-[8px] text-base font-bold hover:bg-[#013eb9] transition-colors disabled:cursor-not-allowed disabled:opacity-100 ${className}`}
      >
        Proceed to Payment
      </Button>

      <AlertDialog open={isStatusOpen} onOpenChange={setIsStatusOpen}>
        <AlertDialogContent className="md:max-w-[533px] sm:h-[402px] h-[415px] border border-[#E4E4E4] rounded-[8px] md:rounded-2xl dialog-pop gap-4 px-4 sm:px-8 max-sm:py-20">
          {status === "error" ? (
            <>
              <div className="w-[125.25px] sm:w-[155px] h-[125.25px] sm:h-[155px] mx-auto">
                <Lottie animationData={plantAnimation} loop={true} />
              </div>

              <div className="space-y-4">
                <AlertDialogTitle>
                  <p className="md:text-[32px] text-2xl leading-9 font-semibold md:font-bold text-[#232D26]">
                    Uh-oh!
                  </p>
                </AlertDialogTitle>

                <div className="space-y-3">
                  <p className="md:text-xl font-semibold text-[#19212C]">
                    Looks like all trees have been planted!{" "}
                  </p>
                  <p className="max-sm:text-sm text-[#454950] font-medium">
                    Redirecting you to Homepage in{" "}
                    <span className="text-[#0D824B] font-bold">
                      00:0{countdown}
                    </span>
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="w-[125.25px] sm:w-[155px] h-[125.25px] sm:h-[155px] mx-auto">
                <Lottie animationData={plantAnimation} loop={true} />
              </div>

              <div className="space-y-4">
                <AlertDialogTitle>
                  <p className="md:text-[32px] text-2xl leading-9 font-semibold md:font-bold text-[#090C0F]">
                    Please wait
                  </p>
                </AlertDialogTitle>

                <div className="space-y-3">
                  <p className="md:text-xl font-semibold text-[#19212C]">
                    Holding your trees and taking you to payment.
                  </p>
                  <p className="max-sm:text-sm text-[#454950] font-medium">
                    Please do not refresh this page or click on browser’s back
                    button.{" "}
                  </p>
                </div>
              </div>
            </>
          )}
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={isAdjustOpen} onOpenChange={setIsAdjustOpen}>
        <DialogContent
          showCloseButton={false}
          className="md:max-w-[533px] overflow-hidden px-4 md:px-6 py-4"
        >
          <DialogTitle className="uppercase font-bold md:text-2xl px-6 text-center">
            Adjust Trees
          </DialogTitle>
          <div className="md:space-y-6 space-y-4">
            <div className="flex max-sm:flex-col md:gap-5 gap-2 sm:items-center border-[0.8px] border-[#F78F08] text-[#F78F08] bg-[#FEF4E7] px-4 md:py-3 py-2 rounded-[8px] font-medium">
              <TriangleAlert className="md:min-w-8 min-w-6 h-full" />
              <p className="font-medium max-sm:text-sm">
                You've exceeded the maximum trees quantity. Please reduce the
                quantity for {recipients && recipients.length > 0 ? "recipients" : "recipient"}.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-[#E8E8E9] text-[#19212C] max-sm:flex-col md:text-lg leading-6.5 rounded-[8px] w-full sm:p-3 max-sm:py-2 max-sm:px-3 flex justify-between sm:items-center gap-1 sm:gap-4">
                <span className="font-medium">Trees Available:</span>
                <span className="font-bold ">{availableTrees}</span>
              </div>
              <div
                className={`${isAdjustmentValid
                  ? "bg-[#ECFDF3] text-[#027A48]"
                  : "bg-[#FEECEB] text-[#F04438]"
                  } max-sm:flex-col md:text-lg leading-6.5 rounded-[8px] w-full sm:p-3 max-sm:py-2 max-sm:px-3 flex justify-between sm:items-center gap-1 sm:gap-4 transition-colors`}
              >
                <span className="font-medium">Trees Selected:</span>
                <span className="font-bold ">{currentTotalTrees}</span>
              </div>
            </div>

            <div className="max-h-[300px] overflow-y-auto space-y-3">
              {recipients && recipients.length > 0 ? (
                // Multi-recipient list
                localRecipients.map((recipient) => (
                  <div key={recipient.id} className="flex items-center justify-between border border-[#E8E8E9] px-4 py-2 rounded-[8px]">
                    <div className="space-y-1">
                      <h1 className="text-[#090C0F] font-semibold leading-5 text-sm md:text-base">
                        {recipient.firstName} {recipient.lastName}
                      </h1>
                      <p className="text-[#454950] font-medium leading-6 text-xs md:text-sm truncate max-w-[150px]">
                        {recipient.email}
                      </p>
                    </div>
                    <input
                      type="number"
                      placeholder="Qty"
                      min="1"
                      max="9999"
                      value={recipient.trees || ""}
                      onChange={(e) => handleRecipientTreeChange(recipient.id, e.target.value)}
                      className={`text-center border-[#003399] text-[#003399] px-2 py-2 border rounded-[8px] w-[70px] sm:w-[80px] transition-colors`}
                    />
                  </div>
                ))
              ) : (
                // Single user input (existing)
                <div className="flex items-center justify-between border border-[#E8E8E9] px-4 py-2 rounded-[8px]">
                  <div className="space-y-1">
                    <h1 className="text-[#090C0F] font-semibold leading-5 text-sm md:text-base">
                      {userName || "User"}
                    </h1>
                    <p className="text-[#454950] font-medium leading-6 text-xs md:text-sm">
                      {userEmail || ""}
                    </p>
                  </div>
                  <input
                    type="number"
                    placeholder="Enter Manually"
                    min="1"
                    max="9999"
                    value={adjustInput}
                    onChange={(e) => setAdjustInput(e.target.value)}
                    className={`text-center border-[#003399] text-[#003399] px-4 py-2.5 border rounded-[8px] flex-1 sm:max-w-[128px] max-w-[80px] transition-colors`}
                  />
                </div>
              )}
            </div>

            <Button
              onClick={handleSaveAdjust}
              disabled={!isAdjustmentValid}
              className="w-full h-12 text-white bg-[#003399] rounded-[8px] text-base font-bold hover:bg-[#013eb9] disabled:bg-gray-300"
            >
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProceedToPay;
