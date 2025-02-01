// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";

// eslint-disable-next-line react/prop-types
const ExpenseList = ({ refresh, triggerRefresh }) => {
  const [expenses, setExpenses] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    startDate: "",
    endDate: "",
  });
  const [error, setError] = useState("");

  const fetchExpenses = async () => {
    try {
      const { data } = await axiosInstance.get("/api/expenses", {
        params: filters,
      });
      setExpenses(data.expenses || []);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError("Error fetching expenses");
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [filters, refresh]);

  const handleDelete = async (id) => {
    try {
      console.log(`Deleting expense with ID: ${id}`);
      await axiosInstance.delete(`/api/expenses/${id}`);
      fetchExpenses();
      triggerRefresh();
    } catch (error) {
      console.error(
        "Error deleting expense:",
        error.response?.data || error.message
      );
      alert("Error deleting expense");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-100 mb-4">
        Expenses
      </h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Category"
          className="border border-gray-300 rounded-lg p-2 w-full dark:bg-[#181C14] dark:text-gray-100 dark:border-[#181C14] focus:outline-none"
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        />
        <input
          type="date"
          className="border border-gray-300 rounded-lg p-2 w-full dark:bg-[#181C14] dark:text-gray-100 dark:border-[#181C14] focus:outline-none"
          onChange={(e) =>
            setFilters({ ...filters, startDate: e.target.value })
          }
        />
        <input
          type="date"
          className="border border-gray-300 rounded-lg p-2 w-full dark:bg-[#181C14] dark:text-gray-100 dark:border-[#181C14] focus:outline-none"
          onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
        />
      </div>
      <ul className="space-y-4">
        {expenses.map((expense) => (
          <li
            key={expense._id}
            className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm"
          >
            <div>
              <p className="text-gray-700 font-medium">{expense.category}</p>
              <p className="text-gray-500">
                ₹{expense.amount} -{" "}
                {new Date(expense.date).toLocaleDateString()}
                {expense.description && ` - ${expense.description}`}
              </p>
            </div>
            <button
              onClick={() => handleDelete(expense._id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
