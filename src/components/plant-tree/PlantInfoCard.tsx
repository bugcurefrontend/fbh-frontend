import React from "react";
import { SquarePen, Trees } from "lucide-react";
import SpeciesSelectionDialog from "./SpeciesSelectionDialog";
import { Species } from "./types";

interface PlantInfoCardProps {
  selectedQuantity: number | null;
  manualQuantity: string;
  selectedSpeciesId: number;
  speciesData: Species[];
  onSpeciesSelect: (id: number) => void;
  isGeoTagged: boolean;
  onGeoTaggedChange: (value: boolean) => void;
}

const PlantInfoCard: React.FC<PlantInfoCardProps> = ({
  selectedQuantity,
  manualQuantity,
  selectedSpeciesId,
  speciesData,
  onSpeciesSelect,
  isGeoTagged,
  onGeoTaggedChange,
}) => {
  const hasQuantity = selectedQuantity || manualQuantity;

  return (
    <div className="flex md:gap-6 gap-4 mb-8 bg-white border border-[#E4E4E4] rounded-2xl p-4">
      <img
        src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=120&h=120&fit=crop"
        alt="Neem tree"
        className="max-h-22 md:max-w-25 md:max-h-25 rounded object-cover"
      />
      <div className="flex flex-col justify-between w-full">
        <div className="flex items-center justify-between">
          {!hasQuantity && (
            <div className="font-semibold max-md:text-xs bg-[#E7F8F0] text-[#12B569] px-3 py-1 rounded-md">
              Plants are geo-tagged
            </div>
          )}
          {hasQuantity && (
            <div className="font-semibold max-md:text-xs bg-[#FEF4E6] text-[#F78F08] px-3 py-1 rounded-md">
              Plants are geo-tagged
            </div>
          )}
          <SpeciesSelectionDialog
            speciesData={speciesData}
            selectedSpeciesId={selectedSpeciesId}
            onSpeciesSelect={onSpeciesSelect}
            isGeoTagged={isGeoTagged}
            onGeoTaggedChange={onGeoTaggedChange}
            trigger={<SquarePen color="#003399" className="cursor-pointer" />}
          />
        </div>
        <div className="space-y-1">
          <h1 className="text-2xl text-[#090C0F] leading-9 font-semibold">
            Neem
          </h1>
          <div className="flex items-center gap-1 text-gray-600">
            <Trees className="w-5.5 h-5.5" />
            <span className="md:text-base text-sm md:font-semibold">
              Azadirachta{" "}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantInfoCard;
