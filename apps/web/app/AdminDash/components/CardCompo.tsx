import { FaArrowTrendDown } from "react-icons/fa6";
import { FaArrowTrendUp } from "react-icons/fa6";


export default function StatCard({
  title,
  value,
  trend,
  trendText,
  desc,
  positive = true,
}: {
  title: string;
  value: string | number;
  trend: string;
  trendText: string;
  desc: string;
  positive: boolean;
}) {

  
  return (
    <div className="bg-gradient-to-b dark:from-gray-600 dark:bg-zinc-900 from-white to-zinc-50 rounded-xl border border-zinc-200 dark:border-gray-500 p-6 shadow-sm hover:shadow-md transition duration-200">
      <div className="flex justify-between items-start mb-4">
        <div className="text-gray-500 dark:text-zinc-300 text-sm font-medium">{title}</div>
        <div
          className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full border ${
            positive
              ? "bg-green-50 dark:bg-zinc-600 dark:text-gray-200 dark:border-gray-400 text-green-700 border-green-200"
              : "bg-red-50  dark:bg-zinc-600 dark:text-orange-400 dark:border-gray-400 text-red-700 border-red-200"
          }`}
        >
          {positive ? (
            <FaArrowTrendUp className="text-xs" />
          ) : (
            <FaArrowTrendDown className="text-xs" />
          )}
          {trend}
        </div>
      </div>
      <div className="text-3xl font-bold dark:text-gray-100 text-black mb-2">{value}</div>
      <div className="text-sm text-zinc-700 dark:text-gray-200 font-medium flex items-center gap-1">
        {trendText}
        <FaArrowTrendUp className="text-xs mt-[2px]" />
      </div>
      <div className="text-xs dark:text-zinc-400 text-zinc-500">{desc}</div>
    </div>
  );
}
