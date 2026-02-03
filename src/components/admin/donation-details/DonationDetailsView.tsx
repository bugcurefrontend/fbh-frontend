"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { DonationDetailsHeader } from "./DonationDetailsHeader";
import { RecipientTable } from "./RecipientTable";
import PlantedTrees from "@/components/PlantedTrees";

interface DonationDetail {
  id: number;
  hfiRcptNo: string;
  name: string;
  amount: number;
  currency: string;
  geoTagged: string;
  emailAddress?: string;
  phoneNo?: string;
  account?: string;
}

interface RecipientData {
  id: number;
  rcptName: string;
  email: string;
  phoneNo: string;
  treesAllocated: number;
  treesPlanted: number;
  certificateId: string;
  account: string;
  geoTagged: string;
}

interface DonationDetailsViewProps {
  donation: DonationDetail;
  onBack: () => void;
}

// Mock recipients data
const mockRecipients: RecipientData[] = [
  {
    id: 1,
    rcptName: "Akashay",
    email: "xyz@gmail.com",
    phoneNo: "866745135",
    treesAllocated: 860,
    treesPlanted: 700,
    certificateId: "700",
    account: "700",
    geoTagged: "true",
  },
  {
    id: 2,
    rcptName: "Priyanka",
    email: "xyz@gmail.com",
    phoneNo: "866745135",
    treesAllocated: 600,
    treesPlanted: 420,
    certificateId: "420",
    account: "420",
    geoTagged: "true",
  },
  {
    id: 3,
    rcptName: "Peepal",
    email: "xyz@gmail.com",
    phoneNo: "866745135",
    treesAllocated: 500,
    treesPlanted: 250,
    certificateId: "250",
    account: "250",
    geoTagged: "true",
  },
  {
    id: 4,
    rcptName: "Priyanka",
    email: "xyz@gmail.com",
    phoneNo: "866745135",
    treesAllocated: 600,
    treesPlanted: 420,
    certificateId: "420",
    account: "420",
    geoTagged: "true",
  },
];

// Mock donation for tree view
const mockDonationForTree = {
  id: 1,
  reference: "FBHP2T345",
  name: "Kanha Shanti Vanam",
  trees: 117,
  donationFor: "SELF",
  donationForColor: "#0D824B",
  date: "Jan 15, 2024",
  accent: "#0D824B",
  logoSrc: "/images/treelogo.png",
  location: "India",
  status: "ALIVE",
  statusAccent: "#0D824B",
  geoTagged: "true",
  recipientName: "John Doe",
  certificateUrl: "#",
  receiptUrl: "#",
};

export const DonationDetailsView = ({
  donation,
  onBack,
}: DonationDetailsViewProps) => {
  const [selectedRecipient, setSelectedRecipient] = useState<RecipientData | null>(null);

  // If a recipient is selected, show PlantedTrees component
  if (selectedRecipient) {
    return (
      <PlantedTrees
        onBack={() => setSelectedRecipient(null)}
        donation={{
          ...mockDonationForTree,
          geoTagged: donation.geoTagged,
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Button and Header */}
      <div className="flex items-center gap-2">
        <button onClick={onBack} className="flex items-center">
          <ArrowLeft className="w-5 h-5 mx-4" />
        </button>
        <h1 className="text-2xl font-semibold">Donation Details</h1>
      </div>

      {/* Donation Header Info */}
      <DonationDetailsHeader
        hfiRcptNo={donation.hfiRcptNo}
        name={donation.name}
        emailAddress={donation.emailAddress || "xyz@gmail.com"}
        phoneNo={donation.phoneNo || "932225445555"}
        account={donation.account || String(donation.amount)}
        geoTagged={donation.geoTagged}
      />

      {/* Recipients Table */}
      <RecipientTable
        recipients={mockRecipients}
        onViewDetails={(recipient) => setSelectedRecipient(recipient)}
      />
    </div>
  );
};
