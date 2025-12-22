"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const faqData = [
  {
    value: "participation-and-contribution",
    title: "Participation and Contribution",
    faqs: [
      {
        id: "pc-1",
        question: "How can individuals contribute or volunteer?",
        answer:
          "You can adopt trees, volunteer at nurseries, join or organize plantation drives, identify land, support fundraising, and help monitor saplings.​",
      },
      {
        id: "pc-2",
        question: "How to start a plantation drive near you?",
        answer:
          "Secure land permissions, gather resources, source saplings (preferably from FBH nurseries), prepare the site, plant, and water regularly. FBH can offer guidance.​",
      },
    ],
  },
  {
    value: "plantation-and-monitoring",
    title: "Plantation and Monitoring",
    faqs: [
      {
        id: "pm-1",
        question: "Where and when are trees planted?",
        answer:
          "Plantations happen during monsoon and late winter on farms, public lands, and homes. Each sapling is geo-tagged for tracking.​",
      },
      {
        id: "pm-2",
        question: "How are saplings monitored after planting?",
        answer:
          "FBH monitors saplings with assigned caregivers and local NGO support, tracking their growth for at least a year. An app is being developed for geo-tagging.​",
      },
    ],
  },
  {
    value: "donation-and-impact",
    title: "Donations and Impact",
    faqs: [
      {
        id: "di-1",
        question: "Can donors select tree species or location?",
        answer:
          "FBH chooses species based on local ecology. Donors can't pick an exact tree or spot but may support specific drives as options develop.​",
      },
      {
        id: "di-2",
        question: "Are donations tax-deductible?",
        answer:
          "Yes, donations are eligible for tax benefits under FBH's charitable status.​",
      },
    ],
  },
];

const FAQs = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(faqData[0].value);

  const toggleItem = (itemId: string) => {
    setOpenItem(openItem === itemId ? null : itemId);
  };
  return (
    <main className="px-4 md:px-8 overflow-hidden">
      <h2 className="text-2xl sm:text-[32px] font-[Playfair_Display] font-semibold text-center text-[#232D26] mb-6">
        FAQs
      </h2>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="md:hidden mb-6 space-y-1.5">
          <h3 className="text-[#19212C] font-medium text-sm leading-5">
            Category
          </h3>
          <Select value={activeTab} onValueChange={setActiveTab}>
            <SelectTrigger className="w-full h-12 hover:rounded-md border-[#95AAD5] rounded-md text-[#003399] font-bold">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="rounded-md hover:rounded-md">
              {faqData.map((tab) => (
                <SelectItem key={tab.value} value={tab.value}>
                  {tab.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="hidden md:block w-fit mx-auto border-b px-4 border-gray-200">
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
          <TabsContent key={tab.value} value={tab.value} className="md:pt-6">
            <div className="space-y-6">
              {tab.faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="border border-[#E4E4E4] rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full flex items-center justify-between text-left hover:bg-gray-50 transition-colors md:p-6 p-3"
                  >
                    <span className="text-[#454950] md:text-lg text-sm md:font-bold font-semibold leading-relaxed">
                      {faq.question}
                    </span>
                    <div className="flex-shrink-0">
                      {openItem === faq.id ? (
                        <Minus
                          strokeWidth={2}
                          className="w-4 md:w-6 h-4 md:h-6 text-[#63676C]"
                        />
                      ) : (
                        <Plus
                          strokeWidth={2}
                          className="w-4 md:w-6 h-4 md:h-6 text-[#63676C]"
                        />
                      )}
                    </div>
                  </button>
                  {openItem === faq.id && (
                    <p className="text-[#454950] max-md:text-sm md:px-6 px-3 md:pb-6 pb-3">
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
