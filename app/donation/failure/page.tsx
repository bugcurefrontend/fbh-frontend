import { Suspense } from "react";
import PaymentStatusPageClient from "@/components/payment-status/PaymentStatusPageClient";

export default function DonationFailurePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PaymentStatusPageClient status="failed" />
        </Suspense>
    );
}
