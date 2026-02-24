import { Suspense } from "react";
import ValidCertificatePageClient from "@/components/valid-certificate/ValidCertificatePageClient";

export default function ValidCertificatePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ValidCertificatePageClient />
    </Suspense>
  );
}
