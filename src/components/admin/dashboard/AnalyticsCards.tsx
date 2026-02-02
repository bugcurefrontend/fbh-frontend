import InfoIcon from "@/components/icons/InfoIcon";

interface AnalyticsCard {
  id: number;
  icon: any;
  title: string;
  value: number;
  bgColor?: string;
}

interface AnalyticsCardsProps {
  cards: AnalyticsCard[];
}

export const AnalyticsCards = ({ cards }: AnalyticsCardsProps) => {
  return (
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
            <InfoIcon className="cursor-pointer" />
          </div>
          <p className="text-5xl leading-16 font-bold text-black">
            {card.value.toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};
