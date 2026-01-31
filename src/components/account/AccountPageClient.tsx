"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CircleQuestionMark, Headset, PanelsTopLeft } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

import { useState } from "react";
import { fetchDonationHistory, DonationHistoryItem } from "@/services/donations";
import { donations as mockDonations } from "./mock-data";
import DonateIcon from "@/components/icons/DonateIcon";
import { DashboardTab } from "./DashboardTab";
import { DonationsTab } from "./DonationsTab";
import { AccountPageSkeleton } from "./AccountPageSkeleton";

const AccountPageClient = () => {
  const { isAuthenticated, isLoading, userProfile } = useAuth();
  const router = useRouter();

  // Lifted state for donation history
  const [allDonationsData, setAllDonationsData] = useState<any[]>([]);
  const [totalDonationsCount, setTotalDonationsCount] = useState(0);
  const [donationsLoading, setDonationsLoading] = useState(false);
  const [donationsLoaded, setDonationsLoaded] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/");
    }
  }, [isLoading, isAuthenticated, router]);

  // Fetch ALL donation data ONCE on mount
  useEffect(() => {
    const userEmail = userProfile?.email;
    if (donationsLoaded || !isAuthenticated || !userEmail) return;

    const loadAllDonations = async () => {
      setDonationsLoading(true);
      try {
        const normalizedEmail = userEmail.toLowerCase();
        // Fetch a large enough page size to cover most users (100)
        const response = await fetchDonationHistory(normalizedEmail, 1, 100);

        if (response && response.results) {
          const mapped = response.results.map((item: DonationHistoryItem) => ({
            id: item.donation_id,
            geoTagged: item.is_geotagged ? "true" : "false",
            logoSrc: item.dep_type === "PROJECT" ? "/images/treelogo.png" :
              item.dep_type === "SPECIES" ? "/images/specieslogo.png" : "/images/campainlogo.png",
            name: item.project_name || item.species_name || "Campaign",
            reference: item.reference_number,
            trees: item.trees_planted,
            donationFor: item.donation_type.toUpperCase(),
            date: new Date(item.donation_date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            }),
            accent: "#0D824B",
            location: "India",
            status: "ALIVE",
            statusAccent: "#0D824B",
            recipientName: item.donation_type === "Received" ?
              (userProfile?.firstName + " " + userProfile?.lastName) :
              (item.recipient_details?.recipient_name || userProfile?.firstName + " " + userProfile?.lastName),
            certificateUrl: item.certificate_url,
            receiptUrl: item.receipt_url,
            giftedBy: item.gifted_by,
          }));
          setAllDonationsData(mapped);
          setTotalDonationsCount(response.count);
        } else {
          setAllDonationsData(mockDonations);
          setTotalDonationsCount(mockDonations.length);
        }
      } catch (error) {
        console.error("Error loading donations:", error);
        setAllDonationsData(mockDonations);
        setTotalDonationsCount(mockDonations.length);
      } finally {
        setDonationsLoaded(true);
        setDonationsLoading(false);
      }
    };

    loadAllDonations();
  }, [userProfile, isAuthenticated, donationsLoaded]);

  const displayName =
    userProfile?.firstName || userProfile?.lastName
      ? `${userProfile?.firstName ?? ""}`.trim()
      : "";

  if (isLoading || !isAuthenticated) {
    return <AccountPageSkeleton />;
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      <div className="flex items-center gap-3">
        <div className="h-[34.5px] w-[34.5px] sm:h-[54.5px] sm:w-[54.5px] rounded-full overflow-hidden bg-gray-100">
          <Image
            src="/images/profile.png"
            alt="Profile"
            width={54.5}
            height={54.5}
            className="h-full w-full object-cover"
          />
        </div>
        <p className="font-[Playfair_Display] sm:text-2xl font-semibold text-[#232D26]">
          Hello, {displayName}!
        </p>
      </div>

      <Tabs defaultValue="dashboard" className="min-[400px]:mt-6 mt-4 relative">
        <TabsList className="items-center min-[400px]:justify-start w-full bg-transparent h-auto p-0 min-w-fit min-[400px]:relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 min-[400px]:after:border-b-2 after:border-gray-200">
          <TabsTrigger
            value="dashboard"
            className="max-[400px]:border-b-[2px] max-[400px]:border-gray-200 max-[400px]:data-[state=active]:border-[#003399] min-[400px]:relative flex items-center gap-2 px-4 pb-[18px] pt-4 text-sm font-semibold text-[#6B7280] rounded-none data-[state=active]:text-[#003399] data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 min-[400px]:data-[state=active]:after:border-b-2 data-[state=active]:after:border-[#003399] data-[state=active]:after:z-10"
          >
            <PanelsTopLeft className="w-6 h-6" />
            <span className="font-bold text-base">Dashboard</span>{" "}
          </TabsTrigger>
          <TabsTrigger
            value="donations"
            className="max-[400px]:border-b-[2px] max-[400px]:border-gray-200 max-[400px]:data-[state=active]:border-[#003399] min-[400px]:relative flex items-center gap-2 px-4 pb-[18px] pt-4 text-sm font-semibold text-[#6B7280] rounded-none data-[state=active]:text-[#003399] data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 min-[400px]:data-[state=active]:after:border-b-2 data-[state=active]:after:border-[#003399] data-[state=active]:after:z-10"
          >
            <DonateIcon className="w-6 h-6" />
            <span className="font-bold text-base">Donation History</span>
          </TabsTrigger>

          <Button
            variant="outline"
            className="border-[#0D824B] hover:text-[#097442] text-[#0D824B] max-sm:hidden font-semibold h-9 rounded-[8px] ml-auto"
          >
            Need Support
            <CircleQuestionMark size={20} />
          </Button>
        </TabsList>

        <button className="bg-[#0D824B] sm:hidden rounded-full shadow-[0px_1px_5px_0px_rgba(18,18,18,0.5)] h-[59px] w-[59px] z-50 text-white fixed bottom-4 right-4 items-center justify-center flex">
          <Headset size={32} />
        </button>

        <TabsContent value="dashboard">
          <DashboardTab />
        </TabsContent>

        <TabsContent value="donations">
          <DonationsTab
            allDonationsData={allDonationsData}
            totalItems={totalDonationsCount}
            loading={donationsLoading}
          />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default AccountPageClient;
