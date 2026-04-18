"use client";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Image from "next/image";
import authService from "@/services/AuthService";

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams ? searchParams.get("token") : null;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();
  const validateForm = () => {
    let valid = true;
    const newErrors = { email: "", password: "", confirmPassword: "" };

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
      valid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
      valid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setShowSuccess(true);
    const resetData = {
      token: token,
      newPassword: formData.confirmPassword,
    };
    const response = await authService.ResetPassword(resetData);
    if (response) {
      setTimeout(() => {
        setIsSubmitting(false);
        setShowSuccess(false);
        router.push("/login");
      }, 2000);
    }
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center bg-gradient-to-tr from-[#00a8e8] to-[#007ea7] overflow-hidden">
      <div className="absolute w-full h-full">
        <div className="absolute bg-white/10 rounded-[10%] w-[200px] h-[200px] top-[60px] left-[20%] transform rotate-[55deg]"></div>
        <div className="absolute bg-white/10 rounded-[4%] w-[150px] h-[80px] bottom-[150px] left-[5%] transform rotate-[5deg]"></div>
        <div className="absolute bg-white/10 rounded-full w-[150px] h-[150px] bottom-[10px] right-[23%]"></div>
        <div className="absolute bg-white/10 rounded-[50%_50%_10%] w-[120px] h-[120px] top-[60px] right-[10%] transform rotate-[45deg]"></div>
        <div className="absolute bg-white/10 rounded-[10%] w-[100px] h-[100px] top-[360px] right-[15%] transform rotate-[35deg]"></div>
        <div className="absolute bg-white/10 rounded-full w-[70px] h-[70px] top-[60px] left-[-1%]"></div>
      </div>

      {showSuccess ? (
        <div className="relative z-10 flex flex-col items-center justify-center p-10 bg-white rounded-lg shadow-lg w-full max-w-md">
          <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p className="text-lg font-bold text-green-500 mt-4">
            Password has been successfully reset!
          </p>
        </div>
      ) : (
        <div className="relative m-4 bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
          <Image
            src="/logo/logo.png"
            alt="logo"
            width={180}
            height={100}
            className="mx-auto mb-4 cursor-pointer"
            onClick={() => router.push("/intro")}
          />
          <h1 className="text-center text-2xl font-sans text-[#303133] mt-1 mb-6">
            Enter Your New Password
          </h1>

          <form className="p-4" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="font-bold text-lg text-[#303133]"
              >
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full h-14 px-4 py-2 mt-2 border-2 text-black font-sans rounded-md shadow-sm focus:border-[#007ea7] focus:ring-[#007ea7]"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="font-bold text-lg text-[#303133]"
              >
                New Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="Enter new password"
                value={formData.password}
                onChange={handleChange}
                className="w-full h-14 px-4 py-2 mt-2 border-2 text-black font-sans rounded-md shadow-sm focus:border-[#007ea7] focus:ring-[#007ea7]"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="font-bold text-lg text-[#303133]"
              >
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full h-14 px-4 py-2 mt-2 border-2 text-black font-sans rounded-md shadow-sm focus:border-[#007ea7] focus:ring-[#007ea7]"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              className={`w-full py-2 mt-6 h-14 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

const ResetPasswordPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ResetPasswordForm />
  </Suspense>
);

export default ResetPasswordPage;
