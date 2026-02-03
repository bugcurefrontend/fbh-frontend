"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PanelsTopLeft } from "lucide-react";
import Transaction from "./icons/Transaction";
import DonateIcon from "./icons/DonateIcon";
import ProjectsIcon from "./icons/ProjectsIcon";
import Species from "./icons/Species";
import TreesIcon from "./icons/TreesIcon";
import UsersIcon from "./icons/UsersIcon";
import { useState, useEffect } from "react";
import {
  analyticsCards,
  weeklyChartData,
  monthlyChartData,
  recentDonations,
} from "./admin/mock-data";
import { TransactionTab } from "./admin/TransactionTab";
import { DonationTab } from "./admin/DonationTab";
import { ProjectsTab } from "./admin/ProjectsTab";
import { SpeciesTab } from "./admin/SpeciesTab";
import { TreesTab } from "./admin/TreesTab";
import { UsersTab } from "./admin/UsersTab";
import { AnalyticsCards } from "./admin/dashboard/AnalyticsCards";
import { RevenueCharts } from "./admin/dashboard/RevenueCharts";
import { RecentDonations } from "./admin/dashboard/RecentDonations";
import Image from "next/image";

const AdminDashboard = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <Image
          src="/images/computer.png"
          alt="Desktop View Required"
          width={155}
          height={133}
        />{" "}
        <p className="text-[#090C0F] text-lg font-medium leading-9">
          Please move to a Desktop.
        </p>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-8">
      <Tabs defaultValue="dashboard" className="mt-8 relative space-y-8">
        <TabsList className="items-center justify-between w-full bg-transparent h-auto p-0 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:border-b-2 after:border-gray-200">
          <TabsTrigger
            value="dashboard"
            className="w-full justify-center max-[400px]:border-b-[2px] max-[400px]:border-gray-200 max-[400px]:data-[state=active]:border-[#003399] min-[400px]:relative flex items-center gap-2 px-4 pb-[18px] pt-4 text-sm font-semibold text-[#6B7280] rounded-none data-[state=active]:text-[#003399] data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 min-[400px]:data-[state=active]:after:border-b-2 data-[state=active]:after:border-[#003399] data-[state=active]:after:z-10"
          >
            <PanelsTopLeft className="w-6 h-6" />
            <span className="font-bold text-base">Dashboard</span>{" "}
          </TabsTrigger>
          <TabsTrigger
            value="transactions"
            className="w-full justify-center max-[400px]:border-b-[2px] max-[400px]:border-gray-200 max-[400px]:data-[state=active]:border-[#003399] min-[400px]:relative flex items-center gap-2 px-4 pb-[18px] pt-4 text-sm font-semibold text-[#6B7280] rounded-none data-[state=active]:text-[#003399] data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 min-[400px]:data-[state=active]:after:border-b-2 data-[state=active]:after:border-[#003399] data-[state=active]:after:z-10"
          >
            <Transaction className="w-6 h-6" />
            <span className="font-bold text-base">Transaction</span>
          </TabsTrigger>
          <TabsTrigger
            value="donations"
            className="w-full justify-center max-[400px]:border-b-[2px] max-[400px]:border-gray-200 max-[400px]:data-[state=active]:border-[#003399] min-[400px]:relative flex items-center gap-2 px-4 pb-[18px] pt-4 text-sm font-semibold text-[#6B7280] rounded-none data-[state=active]:text-[#003399] data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 min-[400px]:data-[state=active]:after:border-b-2 data-[state=active]:after:border-[#003399] data-[state=active]:after:z-10"
          >
            <DonateIcon className="w-6 h-6" />
            <span className="font-bold text-base">Donation</span>
          </TabsTrigger>
          <TabsTrigger
            value="projects"
            className="w-full justify-center max-[400px]:border-b-[2px] max-[400px]:border-gray-200 max-[400px]:data-[state=active]:border-[#003399] min-[400px]:relative flex items-center gap-2 px-4 pb-[18px] pt-4 text-sm font-semibold text-[#6B7280] rounded-none data-[state=active]:text-[#003399] data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 min-[400px]:data-[state=active]:after:border-b-2 data-[state=active]:after:border-[#003399] data-[state=active]:after:z-10"
          >
            <ProjectsIcon className="w-6 h-6" />
            <span className="font-bold text-base">Projects</span>
          </TabsTrigger>
          <TabsTrigger
            value="species"
            className="w-full justify-center max-[400px]:border-b-[2px] max-[400px]:border-gray-200 max-[400px]:data-[state=active]:border-[#003399] min-[400px]:relative flex items-center gap-2 px-4 pb-[18px] pt-4 text-sm font-semibold text-[#6B7280] rounded-none data-[state=active]:text-[#003399] data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 min-[400px]:data-[state=active]:after:border-b-2 data-[state=active]:after:border-[#003399] data-[state=active]:after:z-10"
          >
            <Species className="w-6 h-6" />
            <span className="font-bold text-base">Species</span>
          </TabsTrigger>
          <TabsTrigger
            value="trees"
            className="w-full justify-center max-[400px]:border-b-[2px] max-[400px]:border-gray-200 max-[400px]:data-[state=active]:border-[#003399] min-[400px]:relative flex items-center gap-2 px-4 pb-[18px] pt-4 text-sm font-semibold text-[#6B7280] rounded-none data-[state=active]:text-[#003399] data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 min-[400px]:data-[state=active]:after:border-b-2 data-[state=active]:after:border-[#003399] data-[state=active]:after:z-10"
          >
            <TreesIcon className="w-6 h-6" />
            <span className="font-bold text-base">Trees</span>
          </TabsTrigger>
          <TabsTrigger
            value="users"
            className="w-full justify-center max-[400px]:border-b-[2px] max-[400px]:border-gray-200 max-[400px]:data-[state=active]:border-[#003399] min-[400px]:relative flex items-center gap-2 px-4 pb-[18px] pt-4 text-sm font-semibold text-[#6B7280] rounded-none data-[state=active]:text-[#003399] data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 min-[400px]:data-[state=active]:after:border-b-2 data-[state=active]:after:border-[#003399] data-[state=active]:after:z-10"
          >
            <UsersIcon className="w-6 h-6" />
            <span className="font-bold text-base">Users</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-8">
          {/* Analytics Section */}
          <h1 className="text-[#454950] font-semibold text-2xl leading-9">
            Analytics
          </h1>

          <AnalyticsCards cards={analyticsCards} />

          <RevenueCharts
            weeklyData={weeklyChartData}
            monthlyData={monthlyChartData}
          />

          <RecentDonations data={recentDonations} />
        </TabsContent>

        <TabsContent value="transactions">
          <TransactionTab />
        </TabsContent>
        <TabsContent value="donations">
          <DonationTab />
        </TabsContent>
        <TabsContent value="projects">
          <ProjectsTab />
        </TabsContent>
        <TabsContent value="species">
          <SpeciesTab />
        </TabsContent>
        <TabsContent value="trees">
          <TreesTab />
        </TabsContent>
        <TabsContent value="users">
          <UsersTab />
        </TabsContent>
      </Tabs>
    </main>
  );
};
export default AdminDashboard;
