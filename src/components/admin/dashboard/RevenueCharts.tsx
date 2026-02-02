import { useState } from "react";
import Image from "next/image";
import {
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Cell } from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AmountIcon from "@/components/icons/AmountIcon";
import CurrencySelect from "@/components/CurrencySelect";

interface RevenueChartsProps {
  weeklyData: any[];
  monthlyData: any[];
}

export const RevenueCharts = ({ weeklyData, monthlyData }: RevenueChartsProps) => {
  const [weeklyView, setWeeklyView] = useState("Weekly");
  const [monthlyView, setMonthlyView] = useState("Monthly");

  return (
    <div className="grid grid-cols-2 gap-8">
      {/* Weekly Chart */}
      <div className="bg-white border border-[#B7B9BB] rounded-[10px] p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/images/flag.png"
              alt="Rupee"
              width={28}
              height={28}
            />
            <p className="text-lg font-bold text-[#454950]">
              Amount Received (INR)
            </p>
          </div>
          <Select value={weeklyView} onValueChange={setWeeklyView}>
            <SelectTrigger className="pl-2 py-2 pr-1 gap-1 rounded-[5px] text-sm border border-[#E6E6E6] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] text-[#333333]">
              <SelectValue placeholder="Weekly" />
            </SelectTrigger>

            <SelectContent className="rounded-[5px]">
              <SelectItem value="Weekly" className="text-[#333333]">
                Weekly
              </SelectItem>
              <SelectItem value="Monthly" className="text-[#333333]">
                Monthly
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-semibold text-[#090C0F]">
            Total Income
          </p>
          <h1 className="text-5xl font-bold">
            345000 <span className="text-2xl text-[#12B569]">INR</span>
          </h1>
        </div>
        <ChartContainer
          config={{
            amount: {
              label: "Amount",
              color: "#93BAFF",
            },
          }}
          className="h-[271px] pt-4 pb-2 w-full border border-[#E4E4E4] rounded-[6px]"
        >
          <BarChart data={weeklyData}>
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#454950", fontSize: 14, fontWeight: "bold" }}
            />
            <YAxis hide />
            <ChartTooltip
              cursor={{ fill: "transparent" }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-[#E7F8F0] p-3 rounded-[8px]">
                      <p className="text-xs text-[#0D824B]">
                        {payload[0].value}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar
              dataKey="amount"
              radius={[8, 8, 8, 8]}
              style={{ outline: "none" }}
            >
              {weeklyData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.fill}
                  style={{ outline: "none" }}
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </div>

      {/* Monthly Chart */}
      <div className="bg-white border border-[#B7B9BB] rounded-[10px] p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AmountIcon />

            <p className="text-lg font-bold text-[#454950]">
              Amount Received
            </p>
          </div>
          <div className="flex items-center gap-2">
            <CurrencySelect
              className="h-9 w-[88.88px] gap-1 rounded-[5px]"
              className2="px-1.5 gap-1"
            />
            <Select value={monthlyView} onValueChange={setMonthlyView}>
              <SelectTrigger className="pl-2 py-2 pr-1 gap-1 rounded-[5px] text-sm border border-[#E6E6E6] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] text-[#333333]">
                <SelectValue placeholder="Monthly" />
              </SelectTrigger>

              <SelectContent className="rounded-[5px]">
                <SelectItem value="Monthly" className="text-[#333333]">
                  Monthly
                </SelectItem>
                <SelectItem value="Yearly" className="text-[#333333]">
                  Yearly
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-semibold text-[#090C0F]">
            Total Income
          </p>
          <h1 className="text-5xl font-bold">
            345000 <span className="text-2xl text-[#12B569]">INR</span>
          </h1>
        </div>
        <ChartContainer
          config={{
            amount: {
              label: "Amount",
              color: "#93BAFF",
            },
          }}
          className="h-[271px] pt-4 pb-2 w-full border border-[#E4E4E4] rounded-[6px]"
        >
          <BarChart data={monthlyData}>
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#454950", fontSize: 14, fontWeight: "bold" }}
            />
            <YAxis hide />
            <ChartTooltip
              cursor={{ fill: "transparent" }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-[#E7F8F0] p-3 rounded-[8px]">
                      <p className="text-xs text-[#0D824B]">
                        {payload[0].value}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar
              dataKey="amount"
              radius={[8, 8, 8, 8]}
              style={{ outline: "none" }}
            >
              {monthlyData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.fill}
                  style={{ outline: "none" }}
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
};
