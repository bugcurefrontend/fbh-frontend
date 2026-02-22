import InfoIcon from "@/components/icons/InfoIcon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AnalyticsCard } from "./types";

interface AnalyticsCardsProps {
  cards: AnalyticsCard[];
}

// Default tooltips for each card type
const defaultTooltips: Record<string, string> = {
  Projects: "Total number of active planting projects across all locations",
  Trees: "Total number of trees planted across all projects",
  Species: "Total number of different tree species in our database",
};

export const AnalyticsCards = ({ cards }: AnalyticsCardsProps) => {
  return (
    <TooltipProvider delayDuration={200}>
      <div className="grid grid-cols-3 gap-8">
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-white border border-[#B7B9BB] rounded-[10px] p-4 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <card.icon className="w-7 h-7 text-[#63676C]" />
                <p className="text-lg leading-6.5 font-bold text-[#454950]">
                  {card.title}
                </p>
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="cursor-pointer">
                    <InfoIcon />
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  align="center"
                  className="max-w-[250px] bg-[#E7F8F0] px-4 py-3 shadow-[0_12_24_-4_rgba(0,0,0,0.12)]"
                >
                  <p className="text-[#0D824B] text-center md:font-semibold max-sm:max-w-36 max-md:text-center md:leading-4.5">
                    {card.tooltip ||
                      defaultTooltips[card.title] ||
                      `Information about ${card.title}`}
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <p className="text-5xl leading-16 font-bold text-black">
              {card.value.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </TooltipProvider>
  );
};
