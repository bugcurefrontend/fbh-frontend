"use client";

import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { DonationDetailsHeader } from "./DonationDetailsHeader";
import { RecipientTable } from "./RecipientTable";
import PlantedTrees from "@/components/PlantedTrees";
import { fetchDonationDetail, DonationDetail as AdminDonationDetail } from "@/services/admin";
import { logger } from "@/lib/logger";

interface DonationSummary {
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
  certificate_url?: string; // Certificate download URL from API
  account: string;
  geoTagged: string;
}

interface DonationDetailViewData extends AdminDonationDetail {
  donor: AdminDonationDetail["donor"] & { user_phone?: string };
  recipient_details?: AdminDonationDetail["recipient_details"] & { recipient_phone?: string };
  allocation?: {
    id: number;
    total_trees?: number;
    trees_allocated?: number;
    certificate_url?: string;
    project_id?: number;
  };
}

interface DonationDetailsViewProps {
  donation: DonationSummary;
  onBack: () => void;
}

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
  const [donationDetail, setDonationDetail] = useState<DonationDetailViewData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch full donation details from API
  useEffect(() => {
    const loadDonationDetail = async () => {
      if (donation.id) {
        setIsLoading(true);
        try {
          const data = await fetchDonationDetail(donation.id);
          if (data) {
            setDonationDetail(data as DonationDetailViewData);
          }
        } catch (error) {
          logger.error("Failed to load donation details", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadDonationDetail();
  }, [donation.id]);

  // Transform allocation details to recipient list
  // API returns single allocation/recipient, UI expects array
  const recipients: RecipientData[] = [];

  if (donationDetail && donationDetail.allocation) {
    const allocation = donationDetail.allocation;
    // Check if allocation has recipient details (might be in recipient_details or constructed from allocation)
    // Based on API response analysis:
    recipients.push({
      id: allocation.id,
      // Fallback to donor details if recipient details are missing (common for SELF donations)
      rcptName: donationDetail.recipient_details?.recipient_name || donationDetail.donor?.user_name || "Unknown",
      email: donationDetail.recipient_details?.recipient_email || donationDetail.donor?.user_email || "N/A",
      phoneNo: donationDetail.recipient_details?.recipient_phone || donationDetail.donor?.user_phone || "N/A",
      treesAllocated: allocation.total_trees || 0,
      treesPlanted: allocation.trees_allocated || 0,
      certificateId: allocation.id.toString(), // Using ID as cert ID for now
      certificate_url: allocation.certificate_url, // Certificate download URL
      account: allocation.project_id?.toString() || "N/A", // Using project ID or similar
      geoTagged: donationDetail.is_premium ? "true" : "false",
    });
  } else if (donationDetail && donationDetail.recipient_details) {
    // Fallback if allocation object structure is different but recipient_details exists
    recipients.push({
      id: 1, // specific ID not available in this view
      rcptName: donationDetail.recipient_details.recipient_name || donationDetail.donor?.user_name || "Unknown",
      email: donationDetail.recipient_details.recipient_email || donationDetail.donor?.user_email || "N/A",
      phoneNo: donationDetail.recipient_details.recipient_phone || donationDetail.donor?.user_phone || "N/A",
      treesAllocated: donationDetail.recipient_details.trees_allocated || 0,
      treesPlanted: donationDetail.recipient_details.trees_allocated || 0, // Assuming fully planted if allocated
      certificateId: "N/A",
      certificate_url: undefined, // No certificate URL in this fallback
      account: "N/A",
      geoTagged: donationDetail.is_premium ? "true" : "false",
    });
  }

  // Use API data if available, otherwise fallback to props (which might differ)
  // For header, we prefer API data but use props as initial state
  const headerData = donationDetail ? {
    hfiRcptNo: donationDetail.hfn_receipt_number || donationDetail.external_donation_id,
    name: donationDetail.donor?.user_name || "Unknown",
    emailAddress: donationDetail.donor?.user_email || "N/A",
    phoneNo: donationDetail.donor?.user_phone || "N/A",
    account: String(donationDetail.amount), // Using amount as account/value to match UI typical usage
    geoTagged: donationDetail.is_premium ? "true" : "false"
  } : {
    hfiRcptNo: donation.hfiRcptNo,
    name: donation.name,
    emailAddress: donation.emailAddress || "N/A",
    phoneNo: donation.phoneNo || "N/A",
    account: donation.account || String(donation.amount),
    geoTagged: donation.geoTagged
  };

  // If a recipient is selected, show PlantedTrees component
  if (selectedRecipient) {
    return (
      <PlantedTrees
        onBack={() => setSelectedRecipient(null)}
        donation={{
          ...mockDonationForTree, // Keep mock for tree view specific props not in API yet
          name: headerData.name,
          reference: headerData.hfiRcptNo,
          trees: selectedRecipient.treesAllocated,
          geoTagged: headerData.geoTagged,
          recipientName: selectedRecipient.rcptName
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
        <h1 className="text-2xl font-semibold">
          {isLoading ? "Loading..." : "Donation Details"}
        </h1>
      </div>

      {/* Donation Header Info */}
      <DonationDetailsHeader
        hfiRcptNo={headerData.hfiRcptNo}
        name={headerData.name}
        emailAddress={headerData.emailAddress}
        phoneNo={headerData.phoneNo}
        account={headerData.account}
        geoTagged={headerData.geoTagged}
      />

      {/* Recipients Table - Show 'No recipients' message if empty, or map API data */}
      {recipients.length > 0 ? (
        <RecipientTable
          recipients={recipients}
          onViewDetails={(recipient) => setSelectedRecipient(recipient)}
        />
      ) : (
        <div className="text-center py-8 text-gray-500 bg-white rounded-lg border border-gray-200">
          {isLoading ? "Loading allocation details..." : "No allocation details available for this donation."}
        </div>
      )}

    </div>
  );
};
