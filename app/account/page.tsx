"use client";

import { useState } from "react";
import Image from "next/image";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  CircleQuestionMark,
  Headset,
  PanelsTopLeft,
  TreePine,
  HandHeart,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { AccountPageSkeleton } from "../../src/components/account/AccountPageSkeleton";
import { SignInPrompt } from "../../src/components/account/SignInPrompt";
import { DashboardTab } from "../../src/components/account/DashboardTab";
import { DonationsTab } from "../../src/components/account/DonationsTab";
import { TreesTab } from "../../src/components/account/TreesTab";

const AccountPage = () => {
  const { isAuthenticated, isLoading, userProfile, login } = useAuth();
  const displayName =
    userProfile?.firstName || userProfile?.lastName
      ? `${userProfile?.firstName ?? ""}`.trim()
      : "";

  if (isLoading) {
    return <AccountPageSkeleton />;
  }

  if (!isAuthenticated) {
    return <SignInPrompt login={login} />;
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:pt-8 pt-4">
      <div className="flex items-center gap-3">
        <div className="h-14 w-14 rounded-full overflow-hidden bg-gray-100">
          <Image
            src="/images/profile.png"
            alt="Profile"
            width={56}
            height={56}
            className="h-full w-full object-cover"
          />
        </div>

        <p className="text-lg sm:text-2xl font-semibold text-[#232D26]">
          Hello, {displayName}!
        </p>
      </div>

      <Tabs defaultValue="dashboard" className="mt-6 relative">
        <div className="border-b border-gray-200 overflow-x-auto">
          <TabsList className="items-center justify-start w-full bg-transparent h-auto p-0 sm:gap-10 gap-4 min-w-fit">
            <TabsTrigger
              value="dashboard"
              className="flex items-center gap-2 px-1 pb-[18px] pt-4 text-sm font-semibold text-[#6B7280] border-b-2 border-transparent rounded-none data-[state=active]:text-[#003399] data-[state=active]:border-[#003399]"
            >
              <PanelsTopLeft className="w-6 h-6" />
              <span className="font-bold text-base">Dashboard</span>{" "}
            </TabsTrigger>
            <TabsTrigger
              value="donations"
              className="flex items-center gap-2 px-1 pb-[18px] pt-4 text-sm font-semibold text-[#6B7280] border-b-2 border-transparent rounded-none data-[state=active]:text-[#003399] data-[state=active]:border-[#003399]"
            >
              <HandHeart className="w-6 h-6" />
              <span className="font-bold text-base">Donation History</span>
            </TabsTrigger>
            <TabsTrigger
              value="trees"
              className="flex items-center gap-2 px-1 pb-[18px] pt-4 text-sm font-semibold text-[#6B7280] border-b-2 border-transparent rounded-none data-[state=active]:text-[#003399] data-[state=active]:border-[#003399]"
            >
              <TreePine className="w-6 h-6" />
              <span className="font-bold text-base">My Trees</span>
            </TabsTrigger>
            <Button
              variant="outline"
              className="border-[#0D824B] hover:text-[#097442] text-[#0D824B] max-sm:hidden font-semibold h-9 px-4 py-2 rounded-md ml-auto"
            >
              Need Support
              <CircleQuestionMark size={20} />
            </Button>
            <button className="bg-[#0D824B] sm:hidden rounded-full shadow-xs h-15 w-15 z-50 text-white absolute -right-2 -bottom-2 items-center justify-center flex">
              <Headset size={32} />
            </button>
          </TabsList>
        </div>

        <TabsContent value="dashboard">
          <DashboardTab />
        </TabsContent>

        <TabsContent value="donations">
          <DonationsTab />
        </TabsContent>

        <TabsContent value="trees">
          <TreesTab />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default AccountPage;
