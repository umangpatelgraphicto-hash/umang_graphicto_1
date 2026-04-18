"use client";
import React, { useState } from "react";
import Sidebar from "@/components/utils/sidebar";
import Image from "next/image";
import { ProfileTab } from "@/components/utils/accountcomponents/ProfileTab";
import { SecurityTab } from "@/components/utils/accountcomponents/SecurityTab";
import { SubscriptionTab } from "@/components/utils/accountcomponents/SubscriptionTab";

const AccountPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarButtonClick = (category: string) => {
    console.log(`Button clicked for category: ${category}`);
  };

  const handleSidebarAllButtonClick = () => {
    console.log("All button clicked");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Profile":
        return <ProfileTab />;
      case "Security":
        return <SecurityTab />;
      case "Subscription":
        return <SubscriptionTab />;
      default:
        return <div>Select a tab to view content.</div>;
    }
  };  

  return (  
    <div className="flex h-screen bg-gray-100 font-sans" suppressHydrationWarning>
      <Sidebar
        handleButtonClick={handleSidebarButtonClick}
        handleAllButtonClick={handleSidebarAllButtonClick}
      />

      <main
        className={`flex-grow bg-gray-100 overflow-y-auto p-1 ${
          isSidebarOpen ? "ml-0" : "ml-0 md:ml-60 lg:ml-80"
        } transition-all duration-300`}
      >
        <div className="block sm:hidden md:hidden bg-white h-12 mb-4 shadow-md fixed w-[90%] pl-6 ml-2 pr-2 z-10">
          <div className="flex justify-between items-center">
            <button
              className="md:hidden lg:hidden mt-3 ml-2 bg-blue-500 text-white rounded"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Image src="/icon/dropdown.png" alt="Open Sidebar" width={24} height={24} />
            </button>
            <Image src="/logo1.png" alt="Logo" width={100} height={50} className="mt-2" />
          </div>
        </div>
        <h1 className="text-black text-2xl mt-14 lg:mt-0 p-4 pl-10">Account Settings</h1>
        <div className="flex justify-start items-center gap-8 p-4 pl-4 md:pl-10 lg:pl-10 border-b">
          {["Profile", "Security", "Subscription"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-lg font-medium ${activeTab === tab ? "text-blue-500" : "text-black"}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="p-4 lg:pl-10">{renderContent()}</div>
      </main>
    </div>
  );
};

export default AccountPage;