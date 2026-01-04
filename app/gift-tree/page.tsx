import GiftTreePageClient from "@/components/gift-tree/GiftTreePageClient";
import { fetchGlobal } from "@/services/global";

const GiftTreePage = async () => {
  const global = await fetchGlobal();
  const co2PerTree = global?.co2_sequestation ?? undefined;
  const sampleCertificateUrl = global?.sample_certificate?.url ?? undefined;

  return <GiftTreePageClient co2PerTree={co2PerTree} sampleCertificateUrl={sampleCertificateUrl} />;
};

export default GiftTreePage;
