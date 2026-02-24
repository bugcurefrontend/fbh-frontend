import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { FALLBACK_FAQS } from "@/constants";

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs?: FAQ[];
}

const FAQSection: React.FC<FAQSectionProps> = ({ faqs }) => {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const faqData = faqs || FALLBACK_FAQS;

  const toggleItem = (itemId: string) => {
    setOpenItem(openItem === itemId ? null : itemId);
  };

  return (
    <div>
      <div className="md:space-y-8 space-y-6">
        <h2 className="text-2xl sm:text-[32px] font-[Playfair_Display] font-semibold text-center text-black md:text-[32px] md:font-semibold md:leading-[48px] md:align-middle md:text-[#090C0F]">
          FAQs
        </h2>

        <div className="space-y-6">
          {faqData.map((faq) => (
            <div
              key={faq.id}
              className="hover:shadow-[0_1px_8px_rgba(0,0,0,0.1)]  border border-[#E4E4E4] md:rounded-[8px] rounded-[8px] overflow-hidden"
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full flex items-center justify-between text-left transition-colors p-6"
              >
                <span className="text-[#454950] md:text-lg text-sm md:font-bold font-semibold md:leading-relaxed leading-4.5">
                  {faq.question}
                </span>
                <div className="flex-shrink-0">
                  {openItem === faq.id ? (
                    <Minus strokeWidth={2} className="w-6 h-6 text-[#63676C]" />
                  ) : (
                    <Plus strokeWidth={2} className="w-6 h-6 text-[#63676C]" />
                  )}
                </div>
              </button>

              {/* Animated answer container with slide effect */}
              <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{
                  maxHeight: openItem === faq.id ? "500px" : "0px",
                  opacity: openItem === faq.id ? 1 : 0,
                }}
              >
                <p className="text-[#454950] max-md:text-sm px-6 pb-6">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
