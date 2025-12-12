"use client";

import Image from "next/image";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Leaf,
  Trees,
  ThumbsUp,
  MapPin,
  Download,
  Receipt,
  Navigation,
  CircleQuestionMark,
  LayoutDashboard,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { Skeleton } from "@/components/ui/skeleton";

const stats = [
  {
    label: "CO2 Sequestered",
    value: "40",
    suffix: "kg",
    icon: <Leaf className="w-5 h-5 text-[#0B9D58]" />,
    accent: "#0B9D58",
  },
  {
    label: "Total Trees Planted",
    value: "4,893",
    suffix: "trees",
    icon: <Trees className="w-5 h-5 text-[#0B9D58]" />,
    accent: "#0B9D58",
  },
  {
    label: "Projects Supported",
    value: "12",
    suffix: "projects",
    icon: <ThumbsUp className="w-5 h-5 text-[#F59E0B]" />,
    accent: "#F59E0B",
  },
];

const donations = [
  {
    id: 1,
    name: "Kanha Shanti Vanam",
    reference: "DB3RDP2F",
    trees: 177,
    donationFor: "SELF",
    date: "Jan 6, 2024",
    accent: "#0FA958",
  },
  {
    id: 2,
    name: "Mango Tree",
    reference: "DB3RDP2F",
    trees: 177,
    donationFor: "GIFTING",
    date: "Jan 6, 2024",
    accent: "#F59E0B",
  },
  {
    id: 3,
    name: "Ek Ped Maa ke Naam",
    reference: "DB3RDP2F",
    trees: 177,
    donationFor: "SELF",
    date: "Jan 6, 2024",
    accent: "#0FA958",
  },
  {
    id: 4,
    name: "Kanha Shanti Vanam",
    reference: "DB3RDP2F",
    trees: 177,
    donationFor: "SELF",
    date: "Jan 6, 2024",
    accent: "#0FA958",
  },
  {
    id: 5,
    name: "Mango Tree",
    reference: "DB3RDP2F",
    trees: 177,
    donationFor: "GIFTING",
    date: "Jan 6, 2024",
    accent: "#F59E0B",
  },
  {
    id: 6,
    name: "Kanha Shanti Vanam",
    reference: "DB3RDP2F",
    trees: 177,
    donationFor: "SELF",
    date: "Jan 6, 2024",
    accent: "#0FA958",
  },
];

const AccountPage = () => {
  const { isAuthenticated, isLoading, userProfile, login } = useAuth();
  const displayName =
    userProfile?.firstName || userProfile?.lastName
      ? `${userProfile?.firstName ?? ""} ${userProfile?.lastName ?? ""}`.trim()
      : "Anushka";

  if (isLoading) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:pt-8 pt-4">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="bg-[#F9FAFB]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center gap-4 text-center">
          <p className="text-2xl font-semibold text-[#111827]">
            Please sign in to view your account.
          </p>
          <p className="text-sm text-[#4B5563] max-w-xl">
            Your profile, donations, and trees are available once you are logged
            in.
          </p>
          <Button
            onClick={login}
            className="bg-[#003399] text-white px-5 py-3 h-auto rounded-lg"
          >
            Sign in
          </Button>
        </div>
      </main>
    );
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

      <Tabs defaultValue="dashboard" className="mt-6">
        <div className="border-b border-gray-200 overflow-x-auto">
          <TabsList className="items-center justify-start w-full bg-transparent h-auto p-0 gap-6 min-w-fit">
            <TabsTrigger
              value="dashboard"
              className="flex items-center gap-2 px-1 pb-[18px] pt-4 text-sm font-semibold text-[#6B7280] border-b-2 border-transparent rounded-none data-[state=active]:text-[#003399] data-[state=active]:border-[#003399]"
            >
              <LayoutDashboard className="w-6 h-6" />
              <span className="font-bold text-base">Dashboard</span>{" "}
            </TabsTrigger>
            <TabsTrigger
              value="donations"
              className="flex items-center gap-2 px-1 pb-[18px] pt-4 text-sm font-semibold text-[#6B7280] border-b-2 border-transparent rounded-none data-[state=active]:text-[#003399] data-[state=active]:border-[#003399]"
            >
              <Receipt className="w-6 h-6" />
              <span className="font-bold text-base">Donation History</span>
            </TabsTrigger>
            <TabsTrigger
              value="trees"
              className="flex items-center gap-2 px-1 pb-[18px] pt-4 text-sm font-semibold text-[#6B7280] border-b-2 border-transparent rounded-none data-[state=active]:text-[#003399] data-[state=active]:border-[#003399]"
            >
              <Trees className="w-6 h-6" />
              <span className="font-bold text-base">My Trees</span>
            </TabsTrigger>
            <Button
              variant="outline"
              className="border-[#95AAD5] hover:text-blue-800 text-[#003399] font-semibold h-9 px-4 py-2 rounded-md ml-auto"
            >
              Need Support
              <CircleQuestionMark size={20} />
            </Button>
          </TabsList>
        </div>

        <TabsContent value="dashboard" className="pt-6 space-y-8">
          <p className="md:text-xl text-lg font-medium text-[#454950]">
            Track your environmental contribution
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white border border-[#B7B9BB] rounded-2xl px-8 py-6 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-[#454950]">
                    {stat.label}
                  </p>
                  <div>{stat.icon}</div>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span
                    className="text-5xl font-bold leading-16"
                    style={{ color: stat.accent }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-base font-semibold text-gray-700">
                    {stat.suffix}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="donations" className="pt-6 space-y-4">
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
            {donations.map((donation) => (
              <div
                key={donation.id}
                className="bg-white border border-[#E6E6E6] rounded-2xl"
              >
                <div className="flex items-center gap-2.5 sm:px-6 px-3 py-4 border-b border-[#E5E7EB]">
                  <div
                    className="h-8 w-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${donation.accent}1A` }}
                  >
                    <Trees
                      className="w-5 h-5"
                      style={{ color: donation.accent }}
                    />
                  </div>
                  <p className="sm:text-2xl text-xl font-semibold text-[#111827] leading-5.5">
                    {donation.name}
                  </p>
                </div>

                <div className="sm:p-6 p-3 space-y-6">
                  <div className="flex gap-3 justify-between items-center font-semibold text-[#94979A]">
                    <div className="space-y-4 w-fit">
                      <div className="sm:space-y-2">
                        <h1>Reference No.</h1>
                        <p className="text-lg font-bold text-[#19212C]">
                          {donation.reference}
                        </p>
                      </div>
                      <div className="sm:space-y-2">
                        <h1> Donation For</h1>
                        <Badge
                          className="text-[10px] font-semibold border-0 items-center justify-center flex rounded-full w-16 h-8"
                          style={{
                            backgroundColor: `${donation.accent}1A`,
                            color: donation.accent,
                          }}
                        >
                          {donation.donationFor}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-4 w-fit">
                      <div className="sm:space-y-2">
                        <h1>Trees Planted</h1>
                        <p className="text-lg font-bold text-[#19212C]">
                          {donation.trees}
                        </p>
                      </div>

                      <div className="sm:space-y-2">
                        <h1> Date</h1>

                        <p className="text-lg font-bold text-[#19212C]">
                          {donation.date}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <Button className="bg-[#003399] hover:bg-[#062d7b] text-white font-semibold h-11 px-5 py-3 rounded-md w-[50%] gap-1">
                      <Download className="w-4 h-4" />
                      <span className="max-md:hidden">Download</span>Certificate
                    </Button>
                    <Button
                      variant="outline"
                      className="border-[#003399] text-[#003399] font-semibold h-11 px-5 py-3 rounded-md w-[50%] gap-1"
                    >
                      See Receipt
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trees" className="pt-6 space-y-4">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
              <div className="min-h-[360px] h-full w-full relative overflow-hidden rounded-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3528.9814570275257!2d78.21631687473341!3d17.1752898088815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcbc68ae81e7a79%3A0x3e82438832073e9d!2sKanha%20Shanti%20Vanam!5e1!3m2!1sen!2sin!4v1765172898898!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  className="rounded-lg border-0 min-h-[360px] h-full"
                  allowFullScreen
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {donations.slice(0, 2).map((donation) => (
                <div
                  key={donation.id}
                  className="bg-white border border-[#E6E6E6] rounded-2xl"
                >
                  <div className="flex items-center gap-2.5 sm:px-6 px-3 py-4 border-b border-[#E5E7EB]">
                    <div
                      className="h-8 w-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${donation.accent}1A` }}
                    >
                      <Trees
                        className="w-5 h-5"
                        style={{ color: donation.accent }}
                      />
                    </div>
                    <p className="sm:text-2xl text-xl font-semibold text-[#111827] leading-5.5">
                      {donation.name}
                    </p>
                  </div>

                  <div className="sm:p-6 p-3 space-y-6">
                    <div className="flex gap-3 justify-between items-center font-semibold text-[#94979A]">
                      <div className="space-y-4 w-fit">
                        <div className="sm:space-y-2">
                          <h1>Reference No.</h1>
                          <p className="text-lg font-bold text-[#19212C]">
                            {donation.reference}
                          </p>
                        </div>
                        <div className="sm:space-y-2">
                          <h1> Donation For</h1>
                          <Badge
                            className="text-[10px] font-semibold border-0 items-center justify-center flex rounded-full w-16 h-8"
                            style={{
                              backgroundColor: `${donation.accent}1A`,
                              color: donation.accent,
                            }}
                          >
                            {donation.donationFor}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-4 w-fit">
                        <div className="sm:space-y-2">
                          <h1>Trees Planted</h1>
                          <p className="text-lg font-bold text-[#19212C]">
                            {donation.trees}
                          </p>
                        </div>

                        <div className="sm:space-y-2">
                          <h1> Date</h1>

                          <p className="text-lg font-bold text-[#19212C]">
                            {donation.date}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <Button className="bg-[#003399] hover:bg-[#062d7b] text-white font-semibold h-11 px-5 py-3 rounded-md w-[50%] gap-1">
                        <span className="max-md:hidden">Get</span>
                        Direction
                        <Navigation className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        className="border-[#003399] text-[#003399] font-semibold h-11 px-5 py-3 rounded-md w-[50%] gap-1"
                      >
                        <span className="max-md:hidden">View</span>
                        Update
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default AccountPage;
