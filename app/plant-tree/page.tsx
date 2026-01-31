import { Suspense } from "react";
import TreeCheckoutClient from "@/components/plant-tree/TreeCheckoutClient";
import { fetchGlobal } from "@/services/global";
import { PageLoader } from "@/components/ui/page-loader";
import { fetchAllPlantRates } from "@/services/plant-rates";

const PlantTreePage = async () => {
  const global = await fetchGlobal();
  const plantRates = await fetchAllPlantRates();
  const co2PerTree = global?.co2_sequestation ?? undefined;
  const sampleCertificateUrl = global?.sample_certificate?.url ?? undefined;

  return (
    <Suspense fallback={<PageLoader message="Loading checkout..." fullScreen={false} />}>
      <TreeCheckoutClient
        co2PerTree={co2PerTree}
        sampleCertificateUrl={sampleCertificateUrl}
        plantRates={plantRates}
      />
    </Suspense>
  );
};

export default PlantTreePage;
