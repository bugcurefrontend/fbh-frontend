import TreeCheckoutClient from "@/components/plant-tree/TreeCheckoutClient";
import { fetchGlobal } from "@/services/global";

const PlantTreePage = async () => {
  const global = await fetchGlobal();
  const co2PerTree = global?.co2_sequestation ?? undefined;
  const sampleCertificateUrl = global?.sample_certificate?.url ?? undefined;

  return <TreeCheckoutClient co2PerTree={co2PerTree} sampleCertificateUrl={sampleCertificateUrl} />;
};

export default PlantTreePage;
