/**
 * Payment Service
 * Handles HFN Donation Service API calls and Razorpay integration
 */

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
        client_id: string; // Razorpay key (comes from API response!)
    };
}

/**
 * Call HFN Donation Service to initiate payment
 */
export async function initiateDonation(
    request: DonationRequest
): Promise<DonationResponse | null> {
    try {
        console.log("🚀 Calling HFN Donation Service...", request);

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
            console.error("❌ HFN Donation Service error:", response.statusText);
            return null;
        }

        const data = await response.json();
        console.log("✅ HFN Donation Service response:", data);
        return data;
    } catch (error) {
        console.error("❌ Error calling HFN Donation Service:", error);
        return null;
    }
}

/**
 * Load Razorpay script dynamically
 */
export function loadRazorpayScript(): Promise<boolean> {
    return new Promise((resolve) => {
        // Check if already loaded
        if ((window as any).Razorpay) {
            resolve(true);
            return;
        }

        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => {
            console.log("✅ Razorpay script loaded");
            resolve(true);
        };
        script.onerror = () => {
            console.error("❌ Failed to load Razorpay script");
            resolve(false);
        };
        document.body.appendChild(script);
    });
}

/**
 * Open Razorpay checkout with payment details from API response
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
    console.log("💳 Opening Razorpay checkout...", {
        key: razorpayKeyId,
        order_id: razorpayOrderId,
        amount,
        currency,
        reference: donationReferenceNumber,
    });

    const options = {
        key: razorpayKeyId, // Use client_id from API response
        amount: amount, // amount_due from API response (in paise)
        currency: currency,
        name: "Forests by Heartfulness",
        description: "Tree Plantation Donation",
        order_id: razorpayOrderId, // order id from API response
        prefill: {
            name: userName,
            email: userEmail,
            contact: userPhone,
        },
        theme: {
            color: "#003399",
        },
        handler: function (response: any) {
            console.log("✅ Payment successful!", response);
            // Redirect to success page with reference number
            window.location.href = `${successUrl}?ref=${donationReferenceNumber}`;
        },
        modal: {
            ondismiss: function () {
                console.log("❌ Payment cancelled by user");
                // Redirect to failure page
                window.location.href = `${failureUrl}?ref=${donationReferenceNumber}`;
            },
        },
    };

    const razorpay = new (window as any).Razorpay(options);
    razorpay.open();
}
