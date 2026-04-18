"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import authService from "@/services/AuthService";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";

const SignupTabPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: "", email: "", password: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
      valid = false;
    }

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
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
      valid = false;
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password =
        "Password must include at least one uppercase letter.";
      valid = false;
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = "Password must include at least one number.";
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

    try {
      const data = {
        user_name: formData.name,
        email: formData.email,
        password: formData.password,
      }
      const response = await authService.UserSignUp(data)
      if (response) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setIsSubmitting(false);
          router.push("/home");
        }, 2000);
      } else {
        toast.error('Invalid data')
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="relative w-screen min-h-screen flex justify-center items-center bg-gradient-to-tr from-[#00a8e8] to-[#007ea7]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute bg-white/10 rounded-[10%] w-[10vw] h-[10vw] top-[5%] left-[20%] transform rotate-[55deg]"></div>
          <div className="absolute bg-white/10 rounded-[4%] w-[8vw] h-[4vw] bottom-[15%] left-[5%] transform rotate-[5deg]"></div>
          <div className="absolute bg-white/10 rounded-full w-[8vw] h-[8vw] bottom-[5%] right-[20%]"></div>
          <div className="absolute bg-white/10 rounded-[50%_50%_10%] w-[7vw] h-[7vw] top-[5%] right-[10%] transform rotate-[45deg]"></div>
        </div>
        {showSuccess ? (
          <div className="relative z-10 flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg w-[90%] max-w-lg">
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
            <p className="text-lg font-bold text-green-500 mt-4 text-center">
              Account created successfully!
            </p>
          </div>
        ) : (
          <div className="relative m-4 bg-white p-4 rounded-lg shadow-lg w-[90%] max-w-lg">
            <Image
      src="/logo/logo.png"
      alt="logo"
      width={180}
      height={100}
      className="mx-auto mb-4 cursor-pointer"
      onClick={() => router.push("/intro")}
    />
            <h1 className="text-xl font-sans text-[#303133] text-center mt-1 mb-4 ">
              Create a Free Account
            </h1>
            <div className="flex flex-col gap-2 ml-3 mb-6 sm:flex-row">
              <button className=" h-12  flex items-center justify-center gap-2 px-3 py-2 font-semibold text-[#606266] border border-gray-300 bg-white hover:bg-blue-100 hover:text-blue-600 rounded-md">
                <Image
                  src="/icon/google.png"
                  alt="Google"
                  width={20}
                  height={20}
                  className="rounded-full"
                />
                Register with Google
              </button>
              <button className=" h-12  flex items-center justify-center gap-2 px-3 py-2 font-semibold text-[#606266] border border-gray-300 bg-white hover:bg-blue-100 hover:text-blue-600 rounded-md">
                <Image
                  src="/icon/facebook.png"
                  alt="Facebook"
                  width={20}
                  height={20}
                  className="rounded-full"
                />
                Register with Facebook
              </button>
            </div>
            <h2 className="text-[#303133] text-center">OR</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label
                  htmlFor="name"
                  className="font-bold text-md text-[#303133]"
                >
                  Name
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full h-12 px-4 py-2 mt-2 border-2 text-black font-sans rounded-md shadow-sm focus:border-[#007ea7] focus:ring-[#007ea7]"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="font-bold text-md text-[#303133]"
                >
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-12 px-4 py-2 mt-2 border-2 text-black font-sans rounded-md shadow-sm focus:border-[#007ea7] focus:ring-[#007ea7]"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="font-bold text-md text-[#303133]"
                >
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="Enter 8 or more characters"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full h-12 px-4 py-2 mt-2 border-2 text-black font-sans rounded-md shadow-sm focus:border-[#007ea7] focus:ring-[#007ea7]"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
              <button
                type="submit"
                className={`w-full py-2 mt-6 lg:mt-0 h-12 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </button>
            </form>
            <p className="text-center text-md font-sans text-gray-500 mt-4 lg:mt-2">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#007ea7] font-sans text-md hover:underline"
              >
                Login here
              </Link>
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default SignupTabPage;
