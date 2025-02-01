// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import Background from "@/assets/expenses.png";
import Victory from "@/assets/victory.svg";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setErrorMessage("");

    if (
      !formData.email ||
      !formData.password ||
      (!isLogin && !formData.firstName)
    ) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const url = `/api/auth/${isLogin ? "login" : "register"}`;
      // eslint-disable-next-line no-unused-vars
      const { data } = await axiosInstance.post(url, formData);

    //   alert(data.message);
      if (isLogin) {
        window.location.href = "/dashboard";
      }
      window.location.href = "#login";
    } catch (error) {
      const backendMessage =
        error.response?.data?.message || "Something went wrong";
      setErrorMessage(backendMessage);
    }
  };

  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center relative dark:bg-[#181C14]">
      <div className="fixed top-6 right-[5%] z-50">
        <ModeToggle />
      </div>
      <div className="h-[80vh] w-[80vw] bg-white border-2 border-white text-opacity-90 shadow-2xl md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2 lg:px-8 dark:bg-[#3C3D37] dark:border-[#3C3D37] dark:shadow-2xl">
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex items-center justify-center flex-col">
            <div className="flex items-center justify-center">
              <h1 className="text-5xl font-bold md:text-6xl dark:text-gray-100">
                Welcome
              </h1>
              <img src={Victory} alt="Victory Emoji" className="h-[100px]" />
            </div>
            <p className="font-medium text-center dark:text-gray-100">
              Fill in the details to get started with tracking your Expenses!
            </p>
          </div>

          <Tabs
            className="w-3/4"
            defaultValue={isLogin ? "login" : "signup"}
            onValueChange={(value) => setIsLogin(value === "login")}
          >
            <TabsList className="bg-transparent rounded-none w-full">
              <TabsTrigger
                id="login"
                value="login"
                className="data-[state=active]:bg-transparent dark:data-[state=active]:text-white text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-yellow-500 p-3 transition-all duration-300"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="data-[state=active]:bg-transparent dark:data-[state=active]:text-white text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-yellow-500 p-3 transition-all duration-300"
              >
                Signup
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="flex flex-col gap-5 mt-10">
              <Input
                placeholder="Email"
                type="email"
                className="rounded-full p-6 dark:bg-[#181C14] dark:text-gray-100 dark:border-[#181C14]"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <Input
                placeholder="Password"
                type="password"
                className="rounded-full p-6 dark:bg-[#181C14] dark:text-gray-100 dark:border-[#181C14]"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              <Button className="rounded-full p-6" onClick={handleSubmit}>
                Login
              </Button>
            </TabsContent>

            <TabsContent value="signup" className="flex flex-col gap-5">
              <Input
                placeholder="First Name"
                type="text"
                className="rounded-full p-6 dark:bg-[#181C14] dark:text-gray-100 dark:border-[#181C14]"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
              <Input
                placeholder="Last Name"
                type="text"
                className="rounded-full p-6 dark:bg-[#181C14] dark:text-gray-100 dark:border-[#181C14]"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
              <Input
                placeholder="Email"
                type="email"
                className="rounded-full p-6 dark:bg-[#181C14] dark:text-gray-100 dark:border-[#181C14]"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <Input
                placeholder="Password"
                type="password"
                className="rounded-full p-6 dark:bg-[#181C14] dark:text-gray-100 dark:border-[#181C14]"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <Input
                placeholder="Confirm Password"
                type="password"
                className="rounded-full p-6 dark:bg-[#181C14] dark:text-gray-100 dark:border-[#181C14]"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              <Button className="rounded-full p-6" onClick={handleSubmit}>
                Signup
              </Button>
            </TabsContent>
          </Tabs>
        </div>

        <div className="hidden xl:flex justify-center items-center">
          <img
            className="xl:h-[400px] lg:h-[300px]"
            src={Background}
            alt="background login"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
