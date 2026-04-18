"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getUserData, logout } from "../../utils/authHelper";

interface EditHeaderProps {
  onDownload: (format: string) => void;
}

export default function EditHeader({ onDownload }: EditHeaderProps) {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isDownloadPopupOpen, setDownloadPopupOpen] = useState(false);
    const [downloadFormat, setDownloadFormat] = useState("png");
    const [userData] = useState(getUserData()); 
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    
    const handleMouseEnter = () => {
        setDropdownOpen(true);
    };

  
    const handleMouseLeave = () => {
        setDropdownOpen(false);
    };

    const handleLogout = () => {
        logout(router);
    };

    const handleDownloadClick = () => {
        setDownloadPopupOpen(true);
    };

    const handleCloseDownloadPopup = () => {
        setDownloadPopupOpen(false);
    };

   

    const handleDownloadConfirm = () => {
        onDownload(downloadFormat);
        setDownloadPopupOpen(false);
    };

    return (
        <header className="flex items-center h-14 justify-between p-4 bg-[#00a8e8] shadow-md">
        
            <div className="flex items-center gap-4">
                <Image
                    src="/logo1.png"
                    alt="Logo"
                    width={40}
                    height={40}
                    className="rounded-full"
                />
                <input
                    type="text"
                    className="bg-transparent text-white placeholder-white hover:border-2 p-2 hover:border-white focus:outline-none"
                    placeholder="Untitled"
                />
            </div>

            
            <div className="flex items-center mr-4 gap-6">
                <button className="text-white flex items-center gap-2">
                    <Image src="/save.png" alt="Save" width={24} height={28} />
                    Saved
                </button>
                <button 
                    className="text-white flex items-center gap-2"
                    onClick={handleDownloadClick}
                >
                    <Image src="/download.png" alt="Download" width={24} height={24} />
                    Download
                </button>
                <button className="text-white flex items-center gap-2">
                    <Image src="/share.png" alt="Share" width={24} height={20} />
                    Share
                </button>

             
                <div className="relative" ref={dropdownRef}>
              
                    <div 
                        className="flex items-center gap-4 p-3 bg-[#00a8e8] rounded-3xl cursor-pointer"
                        onMouseEnter={handleMouseEnter}
                    >
                        <div className="w-7 h-7 p-1 bg-white text-[#00a8e8] rounded-full flex items-center justify-center text-sm">
                            {userData?.userName
                                ?.split(" ")
                                .map((word: string) => word[0]?.toUpperCase())
                                .slice(0, 2)
                                .join("") || "U"}
                        </div>
                        <svg
                            className={`w-4 h-4 ml-2 text-gray-500 transform transition-transform ${
                                isDropdownOpen ? "rotate-180" : "rotate-0"
                            }`}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </div>

                    {isDropdownOpen && (
                        <div 
                            className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="flex items-center gap-2 p-4">
                                <div className="w-8 h-8 flex items-center justify-center bg-white text-[#00a8e8] rounded-full text-sm font-bold">
                                    {userData?.userName
                                        ?.split(" ")
                                        .map((word: string) => word[0]?.toUpperCase())
                                        .slice(0, 2)
                                        .join("") || "U"}
                                </div>
                                <p className="text-gray-700 capitalize">{userData?.userName || "User"}</p>
                            </div>
                            <hr />
                            <ul className="py-2">
                                <li
                                    className="px-4 py-2 text-[#303133] hover:bg-blue-100 hover:text-blue-500 cursor-pointer"
                                    onClick={() => router.push("/account")}
                                >
                                    Account Settings
                                </li>
                                <li className="px-4 py-2 text-[#303133] hover:bg-blue-100 hover:text-blue-500 cursor-pointer">
                                    Upgrade to Premium
                                </li>
                                <li
                                    className="px-4 py-2 text-[#303133] hover:bg-blue-100 hover:text-blue-500 cursor-pointer"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

        
            {isDownloadPopupOpen && (
    <div className="fixed inset-0 bg-black  bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 shadow-xl w-[600px]">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-800">Download</h2>
                <button 
                    onClick={handleCloseDownloadPopup}
                    className="text-gray-500 hover:text-gray-700"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            
            <div className="flex space-x-6 p-10 justify-center mb-6">
                <button
                    onClick={() => setDownloadFormat("jpg")}
                    className={` w-28 h-16 rounded-3xl ${downloadFormat === "jpg" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"}`}
                >
                    JPG
                </button>
                <button
                    onClick={() => setDownloadFormat("png")}
                    className={` w-28 h-16 rounded-3xl ${downloadFormat === "png" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"}`}
                >
                    PNG
                    <div className="text-xs">Opaque</div>
                </button>
                <button
                    onClick={() => setDownloadFormat("png-transparent")}
                    className={` w-28 h-16 rounded-3xl ${downloadFormat === "png-transparent" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"}`}
                >
                    PNG
                    <div className="text-xs">Transparent</div>
                </button>
                <button
                    onClick={() => setDownloadFormat("svg")}
                    className={` w-28 h-16 rounded-3xl ${downloadFormat === "svg" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"}`}
                >
                    SVG
                </button>
            </div>
            
            <div className="flex justify-end">
                <button
                    onClick={handleDownloadConfirm}
                    className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Download
                </button>
            </div>
        </div>  
    </div>
)}
        </header>
    );
}