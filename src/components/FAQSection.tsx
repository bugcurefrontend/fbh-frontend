import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

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

  const defaultFAQs: FAQ[] = [
    {
      id: "faq-1",
      question: "Why is planting trees important for the environment?",
      answer:
        "Trees absorb carbon dioxide, release oxygen, and help combat climate change. They also improve air quality, reduce soil erosion, and provide habitats for wildlife.",
    },
    {
      id: "faq-2",
      question: "Which tree species are best for urban areas?",
      answer:
        "Native and drought-resistant species like Neem, Banyan, Peepal, and Gulmohar are ideal for urban areas as they require less maintenance and adapt well to the local environment.",
    },
    {
      id: "faq-3",
      question: "How can I contribute to tree plantation projects?",
      answer:
        "You can participate by donating, volunteering in plantation drives, or adopting a tree through our platform. Every small contribution makes a big difference.",
    },
    {
      id: "faq-4",
      question: "Do trees really help in reducing global warming?",
      answer:
        "Yes, trees act as carbon sinks by absorbing greenhouse gases. Large-scale tree plantations play a crucial role in mitigating the impacts of global warming and restoring ecological balance.",
    },
  ];

  const faqData = faqs || defaultFAQs;

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
              className="border border-[#E4E4E4] rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full flex items-center justify-between text-left hover:bg-gray-50 transition-colors p-6"
              >
                <span className="text-[#454950] md:text-lg text-sm md:font-bold font-semibold leading-relaxed">
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

              {openItem === faq.id && (
                <p className="text-[#454950] max-md:text-sm px-6 pb-6">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
