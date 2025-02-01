// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

// eslint-disable-next-line react/prop-types
const ExpenseChart = ({ refresh }) => {
  const [categoryData, setCategoryData] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [error, setError] = useState("");

  const fetchChartData = async () => {
    try {
      const { data } = await axiosInstance.get("/api/expenses/insights");
      setCategoryData(data.categories || []);
      setTrendData(data.trend || []);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError("Error fetching chart data");
    }
  };

  useEffect(() => {
    fetchChartData();
  }, [refresh]);

  const getRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

  const getLineColor = () => {
    if (trendData.length < 2) return "#8884d8";
    const lastExpense = trendData[trendData.length - 1].total;
    const secondLastExpense = trendData[trendData.length - 2].total;
    return lastExpense > secondLastExpense ? "red" : "green";
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-100 mb-4">
        Spending Insights
      </h2>
      {error && <p className="text-red-500">{error}</p>}
      {categoryData.length > 0 ? (
        <div className="flex justify-center mb-8">
          <PieChart width={400} height={400}>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              label
            >
              {categoryData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getRandomColor()}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-300">
          No category data available
        </p>
      )}
      {trendData.length > 0 ? (
        <div className="flex justify-center">
          <LineChart width={600} height={300} data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="total"
              stroke={getLineColor()}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-300">
          No trend data available
        </p>
      )}
    </div>
  );
};

export default ExpenseChart;
