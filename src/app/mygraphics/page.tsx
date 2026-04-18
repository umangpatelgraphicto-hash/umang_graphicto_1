"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Sidebar from "@/components/utils/sidebar";
import { isUserAuthenticated } from "@/components/utils/authHelper";

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleSidebarButtonClick = (category: string) => {
    console.log(`Button clicked for category: ${category}`);
  };

  const handleSidebarAllButtonClick = () => {
    console.log("All button clicked");
  };

  useEffect(() => {
    if (!isUserAuthenticated()) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-screen font-sans">
      <Sidebar
        handleButtonClick={handleSidebarButtonClick}
        handleAllButtonClick={handleSidebarAllButtonClick}
      />
      <main
        className={`flex-grow bg-gray-100 overflow-y-auto p-1 ${isSidebarOpen ? "ml-0" : "ml-0 md:ml-60 lg:ml-80"} transition-all duration-300`}
      >
        <div className="block sm:hidden md:hidden bg-white h-12 mb-4 shadow-md fixed w-[90%] pl-6 ml-2 pr-2 z-10">
          <div className="flex justify-between items-center ">
            <div>
              <button
                className=" md:hidden lg:hidden mt-3 ml-2  bg-blue-500 text-white rounded"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Image
                  src="/icon/dropdown.png"
                  alt="Open Sidebar"
                  width={24}
                  height={24}
                />
              </button>
            </div>
            <Image
              src="/logo/logo.png"
              alt="Logo"
              width={100}
              height={50}
              className="mt-2"
            />
          </div>
        </div>
        <h1 className="text-2xl mt-20 ml-5 lg:mt-6 lg:ml-10 text-gray-700 font-bold mb-6">
          My Graphics
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ml-5 mr-5  lg:ml-10">
          <div className="relative group">
            <div className="w-full md:w-80 lg:96 h-56 bg-white shadow-md rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.5L10.5 8.5M12 4.5L13.5 8.5M12 4.5L7 14M12 4.5L17 14M10.5 8.5H13.5M7 14H17"
                    />
                  </svg>
                </div>
                <h3 className="text-sm font-bold mt-4">Graphic Title</h3>
              </div>

              <div className="absolute inset-0 bg-[#6fc7e4] bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="text-center">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg m-1"
                    onClick={() => router.push("/edit")}
                  >
                    Edit
                  </button>
                  <button className="bg-gray-500 text-white px-4 py-2 rounded-lg m-1">
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
