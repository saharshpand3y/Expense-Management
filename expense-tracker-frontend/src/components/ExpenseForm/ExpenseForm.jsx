// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";

// eslint-disable-next-line react/prop-types
const ExpenseForm = ({ fetchExpenses }) => {
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    date: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/api/expenses", formData);
      fetchExpenses();
      setFormData({ amount: "", category: "", date: "", description: "" });
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert("Error adding expense");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md dark:shadow-xl rounded-lg p-6 space-y-4 dark:bg-transparent"
    >
      <h2 className="text-2xl font-semibold text-gray-700 mb-4 dark:text-gray-100">
        Add New Expense
      </h2>
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
        required
        className="border border-gray-300 rounded-lg p-2 w-full dark:bg-[#181C14] dark:text-gray-100 dark:border-[#181C14] focus:outline-none"
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        required
        className="border border-gray-300 rounded-lg p-2 w-full dark:bg-[#181C14] dark:text-gray-100 dark:border-[#181C14] focus:outline-none"
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
        className="border border-gray-300 rounded-lg p-2 w-full dark:bg-[#181C14] dark:text-gray-100 dark:border-[#181C14] focus:outline-none"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="border border-gray-300 rounded-lg p-2 w-full dark:bg-[#181C14] dark:text-gray-100 dark:border-[#181C14] focus:outline-none"
      />
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-[#3C3D37] py-2 px-4 rounded-lg hover:bg-[#181C14] text-gray-50 dark:bg-gray-200 dark:hover:bg-gray-400 dark:text-[#181C14]"
        >
          Add Expense
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
