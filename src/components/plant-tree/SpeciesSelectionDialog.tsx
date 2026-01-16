import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Species } from "./types";
import ToolTipIcon from "../icons/ToolTipIcon";

interface SpeciesSelectionDialogProps {
  speciesData: Species[];
  selectedSpeciesId: number;
  onSpeciesSelect: (id: number) => void;
  isGeoTagged: boolean;
  onGeoTaggedChange: (value: boolean) => void;
  trigger: React.ReactNode;
  availabilityMessage?: string;
}

const SpeciesSelectionDialog: React.FC<SpeciesSelectionDialogProps> = ({
  speciesData,
  selectedSpeciesId,
  onSpeciesSelect,
  isGeoTagged,
  onGeoTaggedChange,
  trigger,
}) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className="p-0 gap-2 md:gap-3 pb-4 md:w-[533px]">
        <DialogTitle className="py-4 px-4 md:px-6 uppercase font-bold md:text-2xl text-[#232D26]">
          Select Species
        </DialogTitle>
        <div className="px-2 space-y-4 md:space-y-6">
          <div className="space-y-4 px-2 md:px-4">
            <h1 className="flex items-baseline gap-1">
              <span className="font-bold text-2xl sm:text-[28px] leading-[36px] text-[#090C0F]">
                ₹ 175 /
              </span>
              <span className="font-semibold text-[16px] leading-[36px] text-[#003399]">
                Tree
              </span>
            </h1>
            {/* Geo-tagged Toggle */}
            <div className="flex items-center justify-between mb-4 mt-1">
              <div className="flex items-center gap-2">
                <span className="text-gray-800 text-sm font-medium md:text-base">
                  I want my trees to be geo-tagged.
                </span>
                <Tooltip>
                  <TooltipTrigger>
                    <ToolTipIcon />
                  </TooltipTrigger>
                  <TooltipContent
                    align="start"
                    alignOffset={-75}
                    className="bg-[#E7F8F0] px-4 py-3"
                  >
                    <p className="text-[#0D824B] text-xs md:font-semibold max-sm:max-w-36 text-center">
                      We will geotag your trees and provide quarterly{" "}
                      <br className="max-sm:hidden" /> growth updates for the
                      next three years.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Switch
                checked={isGeoTagged}
                onCheckedChange={onGeoTaggedChange}
                className={isGeoTagged ? "bg-[#003399]" : ""}
              />
            </div>
          </div>
          <div className="mt-2 space-y-4 max-h-[418px] sm:max-h-[420px] overflow-y-auto flex-1 px-2 md:pl-4">
            {speciesData.length === 0 ? (
              <p className="text-sm text-red-500 font-medium">
                No species available for this selection.
              </p>
            ) : (
              speciesData.map((tree) => (
                <div
                  key={tree.id}
                  onClick={() => onSpeciesSelect(tree.id)}
                  className={`flex items-center gap-3 p-3 rounded-[8px] cursor-pointer border max-sm:h-[70.8px] h-[93px] ${
                    selectedSpeciesId === tree.id
                      ? "border-[#2B56AB]"
                      : "border-gray-200"
                  }`}
                >
                  <Image
                    src={tree.img}
                    alt={tree.name}
                    width={60}
                    height={60}
                    className="rounded-[3.55px] object-cover max-sm:w-[46px]"
                  />
                  <div>
                    <h4 className="font-semibold text-lg md:text-2xl">
                      {tree.name}
                    </h4>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Image
                        src="/images/Frame.png"
                        alt="tree"
                        width={20}
                        height={20}
                        className="max-sm:w-4"
                      />{" "}
                      <span className="md:text-base text-sm md:font-semibold">
                        {tree.botanical}{" "}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {/* Next Button */}
          <div className="px-2 md:px-4">
            <Button
              onClick={handleClose}
              className="w-full h-12 border-1 border-[#95AAD5] text-white bg-[#003399] rounded-[8px] text-base font-bold hover:bg-[#013eb9] transition-colors disabled:cursor-not-allowed disabled:opacity-100"
            >
              Next
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SpeciesSelectionDialog;
