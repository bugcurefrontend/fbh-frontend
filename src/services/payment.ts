/**
 * Payment Service
 * Handles HFN Donation Service API calls and Razorpay integration.
 */

import { serviceErrorFallback } from "./service-utils";
import { logger } from "@/lib/logger";

interface RazorpayInstance {
    open: () => void;
}

interface RazorpayConstructor {
    new (options: RazorpayOptions): RazorpayInstance;
}

interface RazorpayWindow extends Window {
    Razorpay?: RazorpayConstructor;
}

interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    order_id: string;
    prefill: {
        name: string;
        email: string;
        contact: string;
    };
    theme: {
        color: string;
    };
    handler: (_response: unknown) => void;
    modal: {
        ondismiss: () => void;
    };
}

export interface DonationRequest {
    userProfile: {
        firstName: string;
        lastName?: string;
        emailAddress: string;
        phoneNumber: string;
        addressLine1: string;
        addressLine2?: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        citizenshipCountry: string;
    };
    lineItems: {
        donationItem: { id: string };
        currency: string;
        amount: number;
        extras: {
            donorCount: string;
            donorName: string;
            donorEmailAddress: string;
            donorPhoneNumber: string;
            donationType: string;
            projectId?: string;
            speciesId?: string;
            attributeId?: string;
            donationReceivedFrom: string;
            reservationToken?: string;
            giftReceiverName?: string;
            giftReceiverEmail?: string;
            giftReceiverPhoneNumber?: string;
        };
    }[];
    clientSuccessRedirectUrl: string;
    clientFailureRedirectUrl: string;
    clientId: string;
}

export interface DonationResponse {
    donation: {
        id: string;
        status: string;
        currency: string;
        amount: number;
        payment: {
            donationReferenceNumber: string;
            trackingId: string;
            paymentStatus: string;
        };
    };
    paymentGatewayRequestParamMap: {
        id: string; // Razorpay order_id
        amount_due: number; // Amount in paise
        currency: string;
        client_id: string; // Razorpay key (comes from API response)
    };
}

/**
 * Call HFN Donation Service to initiate payment.
 */
export async function initiateDonation(
    request: DonationRequest
): Promise<DonationResponse | null> {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_HFN_DONATION_SERVICE_URL}/donations/donate`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(request),
            }
        );

        if (!response.ok) {
            logger.error("Donation service request failed", response.status);
            return null;
        }

        return (await response.json()) as DonationResponse;
    } catch (error) {
        return serviceErrorFallback("Error calling donation service:", error, null);
    }
}

/**
 * Load Razorpay script dynamically.
 */
export function loadRazorpayScript(): Promise<boolean> {
    return new Promise((resolve) => {
        // Check if already loaded
        const typedWindow = window as RazorpayWindow;
        if (typedWindow.Razorpay) {
            resolve(true);
            return;
        }

        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            logger.error("Failed to load Razorpay script");
            resolve(false);
        };
        document.body.appendChild(script);
    });
}

/**
 * Open Razorpay checkout with payment details from API response.
 */
export function openRazorpayCheckout(
    razorpayKeyId: string, // client_id from paymentGatewayRequestParamMap
    razorpayOrderId: string, // id from paymentGatewayRequestParamMap
    amount: number, // amount_due from paymentGatewayRequestParamMap
    currency: string,
    donationReferenceNumber: string,
    userEmail: string,
    userPhone: string,
    userName: string,
    successUrl: string,
    failureUrl: string
) {
    const options = {
        key: razorpayKeyId,
        amount: amount,
        currency: currency,
        name: "Forests by Heartfulness",
        description: "Tree Plantation Donation",
        order_id: razorpayOrderId,
        prefill: {
            name: userName,
            email: userEmail,
            contact: userPhone,
        },
        theme: {
            color: "#003399",
        },
        handler: function (_response: unknown) {
            window.location.href = `${successUrl}?ref=${donationReferenceNumber}`;
        },
        modal: {
            ondismiss: function () {
                window.location.href = `${failureUrl}?ref=${donationReferenceNumber}`;
            },
        },
    };

    const typedWindow = window as RazorpayWindow;
    if (!typedWindow.Razorpay) {
        return;
    }
    const razorpay = new typedWindow.Razorpay(options);
    razorpay.open();
}

