import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
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

// Mock data generator for different time periods
const generateDailyData = () => [
  { day: "SUN", amount: 42000, fill: "#C8DDFF" },
  { day: "MON", amount: 48000, fill: "#C8DDFF" },
  { day: "TUE", amount: 35000, fill: "#C8DDFF" },
  { day: "WED", amount: 52000, fill: "#C8DDFF" },
  { day: "THU", amount: 45000, fill: "#C8DDFF" },
  { day: "FRI", amount: 38000, fill: "#C8DDFF" },
  { day: "SAT", amount: 68000, fill: "#6FA8FF" },
];

const generateWeeklyData = (hasData = false) => [
  { day: "Week 1", amount: 280000, fill: "#C8DDFF" },
  { day: "Week 2", amount: 320000, fill: "#C8DDFF" },
  { day: "Week 3", amount: 290000, fill: "#C8DDFF" },
  { day: "Week 4", amount: 350000, fill: "#6FA8FF" },
  hasData
    ? { day: "Week 5", amount: 120000, fill: "#C8DDFF" }
    : { day: "Week --", amount: 0, fill: "#E4E4E4", isEmpty: true },
];

const generateMonthlyData = () => [
  { month: "JAN", amount: 120000, fill: "#C8DDFF" },
  { month: "FEB", amount: 98000, fill: "#C8DDFF" },
  { month: "MAR", amount: 145000, fill: "#C8DDFF" },
  { month: "APR", amount: 162000, fill: "#C8DDFF" },
  { month: "MAY", amount: 178000, fill: "#C8DDFF" },
  { month: "JUN", amount: 135000, fill: "#C8DDFF" },
  { month: "JUL", amount: 152000, fill: "#C8DDFF" },
  { month: "AUG", amount: 168000, fill: "#C8DDFF" },
  { month: "SEP", amount: 182000, fill: "#C8DDFF" },
  { month: "OCT", amount: 195000, fill: "#C8DDFF" },
  { month: "NOV", amount: 175000, fill: "#C8DDFF" },
  { month: "DEC", amount: 210000, fill: "#6FA8FF" },
];

const generateYearlyData = () => [
  { month: "2019", amount: 1200000, fill: "#C8DDFF" },
  { month: "2020", amount: 1450000, fill: "#C8DDFF" },
  { month: "2021", amount: 1680000, fill: "#C8DDFF" },
  { month: "2022", amount: 1820000, fill: "#C8DDFF" },
  { month: "2023", amount: 1950000, fill: "#C8DDFF" },
  { month: "2024", amount: 2100000, fill: "#6FA8FF" },
];

import { useCurrency } from "@/components/CurrencySelect";

export const RevenueCharts = ({
  weeklyData,
  monthlyData,
}: RevenueChartsProps) => {
  const [leftChartView, setLeftChartView] = useState("Daily");
  const [rightChartView, setRightChartView] = useState("Monthly");
  const [mounted, setMounted] = useState(false);
  const { currency } = useCurrency(); // Get global currency state

  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate dynamic data based on selection
  const leftChartData = useMemo(() => {
    switch (leftChartView) {
      case "Daily":
        return generateDailyData();
      case "Weekly":
        return generateWeeklyData();
      case "Monthly":
        return generateMonthlyData();
      default:
        return generateDailyData(); // Fallback to daily
    }
  }, [leftChartView]);

  const rightChartData = useMemo(() => {
    switch (rightChartView) {
      case "Daily":
        return generateDailyData();
      case "Weekly":
        return generateWeeklyData();
      case "Monthly":
        return generateMonthlyData();
      case "Yearly":
        return generateYearlyData();
      default:
        return generateMonthlyData();
    }
  }, [rightChartView]);

  // Conversion logic (Mock: 1 USD = 83 INR)
  const CONVERSION_RATE = 83;

  const getConvertedValue = (amount: number) => {
    if (currency === "USD") {
      return Math.round(amount / CONVERSION_RATE);
    }
    return amount;
  };

  // Calculate total income dynamically
  const leftChartTotal = useMemo(() => {
    return leftChartData.reduce((sum, item) => sum + item.amount, 0);
  }, [leftChartData]); // No dependency on currency

  const rightChartTotal = useMemo(() => {
    const sum = rightChartData.reduce((sum, item) => sum + item.amount, 0);
    return getConvertedValue(sum);
  }, [rightChartData, currency]);

  // Dynamic X-axis key
  const getXAxisKey = (view: string) => {
    if (view === "Daily") return "day"; // SUN, MON...
    if (view === "Weekly") return "day"; // Week 1...
    if (view === "Monthly") return "month"; // JAN...
    if (view === "Yearly") return "month"; // 2020...
    return "day";
  };

  const leftXAxisKey = getXAxisKey(leftChartView);
  const rightXAxisKey = getXAxisKey(rightChartView);

  // Helper to format numbers safely (avoids hydration mismatch by using specific locale)
  const formatNumber = (num: number, chartCurrency?: string) => {
    const activeCurrency = chartCurrency || currency;
    const locale = activeCurrency === "USD" ? "en-US" : "en-IN";
    return num.toLocaleString(locale);
  };

  const getCurrencySymbol = () => {
    return currency === "USD" ? "USD" : "INR";
  };

  const getCurrencyFlag = () => {
    return currency === "USD" ? "/images/us.png" : "/images/flag.png";
  };

  if (!mounted) {
    return null; // Or render a skeleton to avoid mismatch, or just return null for now as it's a chart component
  }

  return (
    <div className="grid grid-cols-2 gap-8">
      {/* Left Chart */}
      <div className="bg-white border border-[#B7B9BB] rounded-[10px] p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/images/flag.png" alt="INR" width={28} height={28} />
            <p className="text-lg font-bold text-[#454950]">
              Amount Received (INR)
            </p>
          </div>
          <Select value={leftChartView} onValueChange={setLeftChartView}>
            <SelectTrigger className="pl-2 py-2 pr-1 gap-1 rounded-[5px] text-sm border border-[#E6E6E6] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] text-[#333333]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>

            <SelectContent className="rounded-[5px]">
              <SelectItem value="Daily" className="text-[#333333]">
                Daily
              </SelectItem>
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
          <p className="text-sm font-semibold text-[#090C0F]">Total Income</p>
          <h1 className="text-5xl font-bold">
            {formatNumber(leftChartTotal, "INR")}{" "}
            <span className="text-2xl text-[#12B569]">INR</span>
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
          <BarChart
            data={leftChartData}
            style={{ outline: "none" }}
            className="outline-none"
          >
            <XAxis
              dataKey={leftXAxisKey}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#454950", fontSize: 14, fontWeight: "bold" }}
            />
            <YAxis hide />
            <ChartTooltip
              cursor={{ fill: "transparent" }}
              isAnimationActive={false}
              offset={20}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  if (data.isEmpty) return null;
                  return (
                    <div className="bg-[#E7F8F0] p-3 rounded-[8px]">
                      <p className="text-xs text-[#0D824B]">
                        {formatNumber(payload[0].value as number, "INR")}
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
              minPointSize={2}
              style={{ outline: "none" }}
            >
              {leftChartData.map((entry, index) => (
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

      {/* Right Chart */}
      <div className="bg-white border border-[#B7B9BB] rounded-[10px] p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AmountIcon />

            <p className="text-lg font-bold text-[#454950]">Amount Received</p>
          </div>
          <div className="flex items-center gap-2">
            <CurrencySelect
              className="h-9 w-[88.88px] gap-1 rounded-[5px]"
              className2="px-1.5 gap-1"
            />
            <Select value={rightChartView} onValueChange={setRightChartView}>
              <SelectTrigger className="pl-2 py-2 pr-1 gap-1 rounded-[5px] text-sm border border-[#E6E6E6] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] text-[#333333]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>

              <SelectContent className="rounded-[5px]">
                <SelectItem value="Daily" className="text-[#333333]">
                  Daily
                </SelectItem>
                <SelectItem value="Weekly" className="text-[#333333]">
                  Weekly
                </SelectItem>
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
          <p className="text-sm font-semibold text-[#090C0F]">Total Income</p>
          <h1 className="text-5xl font-bold">
            {formatNumber(rightChartTotal)}{" "}
            <span className="text-2xl text-[#12B569]">
              {getCurrencySymbol()}
            </span>
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
          <BarChart
            data={rightChartData.map((d) => ({
              ...d,
              amount: getConvertedValue(d.amount),
            }))} // Convert individual bars
            style={{ outline: "none" }}
            className="outline-none"
          >
            <XAxis
              dataKey={rightXAxisKey}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#454950", fontSize: 14, fontWeight: "bold" }}
            />
            <YAxis hide />
            <ChartTooltip
              cursor={{ fill: "transparent" }}
              isAnimationActive={false}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  if (data.isEmpty) return null;
                  return (
                    <div className="bg-[#E7F8F0] p-3 rounded-[8px]">
                      <p className="text-xs text-[#0D824B]">
                        {formatNumber(payload[0].value as number)}
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
              minPointSize={2}
              style={{ outline: "none" }}
            >
              {rightChartData.map((entry, index) => (
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
