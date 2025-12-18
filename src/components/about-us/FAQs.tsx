"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const faqData = [
  {
    value: "participation-and-contribution",
    title: "Participation and Contribution",
    faqs: [
      {
        id: "pc-1",
        question: "How can I participate in tree plantation drives?",
        answer:
          "You can participate by registering as a volunteer on our website. We regularly post updates about upcoming plantation drives in different locations. Simply sign up for an event that suits your schedule and location.",
      },
      {
        id: "pc-2",
        question: "What kind of contributions can I make?",
        answer:
          "You can contribute in several ways: by volunteering your time for plantation drives, donating to fund our projects, or by helping us spread the word on social media. Every contribution, big or small, makes a difference.",
      },
    ],
  },
  {
    value: "plantation-and-monitoring",
    title: "Plantation and Monitoring",
    faqs: [
      {
        id: "pm-1",
        question: "What types of trees do you plant?",
        answer:
          "We focus on planting native and indigenous tree species that are well-suited to the local climate and soil conditions. This helps in restoring the natural ecosystem and supporting local biodiversity.",
      },
    ],
  },
  {
    value: "donation-and-impact",
    title: "Donations and Impact",
    faqs: [
      {
        id: "di-1",
        question: "How is my donation used?",
        answer:
          "Your donation is used to procure saplings, tools, and other necessary resources for our plantation drives. A portion of the funds also goes towards monitoring the planted trees to ensure their survival and growth.",
      },
    ],
  },
];

const FAQs = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (itemId: string) => {
    setOpenItem(openItem === itemId ? null : itemId);
  };
  return (
    <main className="px-4 md:px-8 overflow-hidden">
      <h2 className="text-2xl sm:text-[32px] font-[Playfair_Display] font-semibold sm:text-center text-[#232D26] mb-6">
        FAQs
      </h2>
      <Tabs defaultValue={faqData[0].value}>
        <div className="w-fit mx-auto border-b px-4 border-gray-200">
          <TabsList className="flex bg-transparent p-0 h-auto w-full justify-start gap-8">
            {faqData.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-2 pl-2 pr-1 py-4 border-b-2 border-transparent bg-transparent text-[#63676C] hover:text-[#003399] rounded-none relative data-[state=active]:border-[#003399] data-[state=active]:text-[#003399] data-[state=active]:bg-transparent font-bold text-base"
              >
                {tab.title}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {faqData.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="pt-6">
            <div className="space-y-6">
              {tab.faqs.map((faq) => (
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
                        <Minus
                          strokeWidth={2}
                          className="w-6 h-6 text-[#63676C]"
                        />
                      ) : (
                        <Plus
                          strokeWidth={2}
                          className="w-6 h-6 text-[#63676C]"
                        />
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
          </TabsContent>
        ))}
      </Tabs>
    </main>
  );
};
export default FAQs;
