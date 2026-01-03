"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  CircleQuestionMark,
  Headset,
  PanelsTopLeft,
  HandHeart,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { AccountPageSkeleton } from "../../src/components/account/AccountPageSkeleton";
import { DashboardTab } from "../../src/components/account/DashboardTab";
import { DonationsTab } from "../../src/components/account/DonationsTab";
import DonateIcon from "@/components/icons/DonateIcon";

const AccountPage = () => {
  const { isAuthenticated, isLoading, userProfile } = useAuth();
  const router = useRouter();
  const displayName =
    userProfile?.firstName || userProfile?.lastName
      ? `${userProfile?.firstName ?? ""}`.trim()
      : "";

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/");
    }
  }, [isLoading, isAuthenticated, router]);

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

      <Tabs defaultValue="dashboard" className="sm:mt-6 mt-4 relative">
        <TabsList className="items-center min-[400px]:justify-start w-full bg-transparent h-auto p-0 min-w-fit relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:border-b-2 after:border-gray-200">
          <TabsTrigger
            value="dashboard"
            className="relative flex items-center gap-2 px-4 pb-[18px] pt-4 text-sm font-semibold text-[#6B7280] rounded-none data-[state=active]:text-[#003399] data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:border-b-2 data-[state=active]:after:border-[#003399] data-[state=active]:after:z-10"
          >
            <PanelsTopLeft className="w-6 h-6" />
            <span className="font-bold text-base">Dashboard</span>{" "}
          </TabsTrigger>
          <TabsTrigger
            value="donations"
            className="relative flex items-center gap-2 px-4 pb-[18px] pt-4 text-sm font-semibold text-[#6B7280] rounded-none data-[state=active]:text-[#003399] data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:border-b-2 data-[state=active]:after:border-[#003399] data-[state=active]:after:z-10"
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

        <button className="bg-[#0D824B] sm:hidden rounded-full shadow-xs h-15 w-15 z-50 text-white absolute -right-2 -bottom-16 items-center justify-center flex">
          <Headset size={32} />
        </button>

        <TabsContent value="dashboard">
          <DashboardTab />
        </TabsContent>

        <TabsContent value="donations">
          <DonationsTab />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default AccountPage;
