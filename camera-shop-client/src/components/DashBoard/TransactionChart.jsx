import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import orderApi from "../../api/orderApi";

export default function TransactionChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;

      const startMonth = currentMonth - 12;
      const startYear = startMonth <= 0 ? currentYear - 1 : currentYear;
      const formattedStartMonth =
        startYear === currentYear
          ? `${startYear}-${startMonth.toString().padStart(2, "0")}`
          : `${startYear}-12`;

      const endMonth = `${currentYear}-${currentMonth
        .toString()
        .padStart(2, "0")}`;

      try {
        const response = await orderApi.getMonthlySalesReports(
          formattedStartMonth,
          endMonth
        );

		console.log(response);

        const chartData = response.map((item, index) => ({
          name: `Month ${index}`,
          Income: item.totalSales.toFixed(2),
          Expense: item.totalExpenses.toFixed(2),
        }));
        setData(chartData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchChartData();
  }, []);

  return (
    <div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
      <strong className="text-gray-700 font-medium">Transactions</strong>
      <div className="mt-3 w-full flex-1 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 10,
              left: -10,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Income" fill="#0ea5e9" />
            <Bar dataKey="Expense" fill="#ea580c" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
