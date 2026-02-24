import { Suspense } from "react";
import GiftTreePageClient from "@/components/gift-tree/GiftTreePageClient";
import { fetchGlobal } from "@/services/global";
import { PageLoader } from "@/components/ui/page-loader";

import { fetchAllPlantRates } from "@/services/plant-rates";

const GiftTreePage = async () => {
  const global = await fetchGlobal();
  const plantRates = await fetchAllPlantRates();
  const co2PerTree = global?.co2_sequestation ?? undefined;
  const sampleCertificateUrl = global?.sample_certificate?.url ?? undefined;

  return (
    <Suspense fallback={<PageLoader message="Loading checkout..." fullScreen={false} />}>
      <GiftTreePageClient
        co2PerTree={co2PerTree}
        sampleCertificateUrl={sampleCertificateUrl}
        plantRates={plantRates}
      />
    </Suspense>
  );
};

export default GiftTreePage;
