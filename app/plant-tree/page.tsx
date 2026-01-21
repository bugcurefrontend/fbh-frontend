import { Suspense } from "react";
import TreeCheckoutClient from "@/components/plant-tree/TreeCheckoutClient";
import { fetchGlobal } from "@/services/global";
import { PageLoader } from "@/components/ui/page-loader";

const PlantTreePage = async () => {
  const global = await fetchGlobal();
  const co2PerTree = global?.co2_sequestation ?? undefined;
  const sampleCertificateUrl = global?.sample_certificate?.url ?? undefined;

  return (
    <Suspense fallback={<PageLoader message="Loading checkout..." fullScreen={false} />}>
      <TreeCheckoutClient co2PerTree={co2PerTree} sampleCertificateUrl={sampleCertificateUrl} />
    </Suspense>
  );
};

export default PlantTreePage;
