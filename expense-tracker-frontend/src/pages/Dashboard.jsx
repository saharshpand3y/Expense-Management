// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import ExpenseList from "../components/Dashboard/ExpenseList";
import ExpenseChart from "../components/Dashboard/ExpenseChart";
import ExpenseForm from "../components/ExpenseForm/ExpenseForm";
import { ModeToggle } from "@/components/ui/mode-toggle";
import axiosInstance from "@/utils/axiosInstance";

const Dashboard = () => {
  const [refreshExpenses, setRefreshExpenses] = useState(false);
  const [userName, setUserName] = useState("");
  const [loadingUser, setLoadingUser] = useState(true); 
  const [userError, setUserError] = useState(null);

  const triggerRefresh = () => {
    setRefreshExpenses((prev) => !prev);
  };

  const getUserData = async () => {
    try {
      const { data } = await axiosInstance.get("/api/auth/me");
      return data;
    } catch (error) {
      console.error("Error fetching user data:", error.message);
      throw error;
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserData();
        setUserName(
          `${userData?.firstName || ""} ${userData?.lastName || ""}`.trim()
        );
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setUserError("Failed to load user data.");
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#181C14] flex flex-col items-center py-10 relative">
      <div className="fixed top-6 left-[5%] z-50">
        {loadingUser ? (
          <span>Loading...</span>
        ) : userError ? (
          <span className="text-red-500">{userError}</span>
        ) : (
          <span>Welcome, {userName}!</span>
        )}
      </div>
      <div className="fixed top-6 right-[5%] z-50">
        <ModeToggle />
      </div>
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
        Expense Tracker Dashboard
      </h1>
      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl px-4 mt-8">
        <div className="bg-white dark:bg-[#3C3D37] dark:text-gray-100 shadow-md dark:shadow-2xl rounded-lg p-6 w-full lg:w-1/2">
          <ExpenseChart refresh={refreshExpenses} />
        </div>
        <div className="bg-white dark:bg-[#3C3D37] dark:text-gray-100 shadow-md dark:shadow-2xl rounded-lg p-6 w-full lg:w-1/2">
          <ExpenseList
            refresh={refreshExpenses}
            triggerRefresh={triggerRefresh}
          />
        </div>
      </div>
      <div className="mt-8 w-full max-w-2xl">
        <div className="bg-white dark:bg-[#3C3D37] dark:text-gray-100 shadow-md dark:shadow-2xl rounded-lg p-6">
          <ExpenseForm fetchExpenses={triggerRefresh} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
