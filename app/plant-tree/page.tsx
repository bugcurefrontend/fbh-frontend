import TreeCheckoutClient from "@/components/plant-tree/TreeCheckoutClient";
import { fetchGlobal } from "@/services/global";

const PlantTreePage = async () => {
  const global = await fetchGlobal();
  const co2PerTree = global?.co2_sequestation ?? undefined;

  return <TreeCheckoutClient co2PerTree={co2PerTree} />;
};

export default PlantTreePage;
