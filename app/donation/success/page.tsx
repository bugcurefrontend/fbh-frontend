import { Suspense } from "react";
import PaymentStatusPageClient from "@/components/payment-status/PaymentStatusPageClient";

export default function DonationSuccessPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PaymentStatusPageClient status="success" />
        </Suspense>
    );
}
