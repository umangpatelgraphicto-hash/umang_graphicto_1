import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { getUserData, logout } from "../utils/authHelper";
import Image from "next/image";
import apiService from "@/services/ApiService";

interface Category {
  id: number;
  name: string;
  image: string;
}

export default function Sidebar({
  handleButtonClick,
  handleAllButtonClick: handleAllTemplatesButtonClick,
  selectedCategory = "",
}: {
  handleButtonClick: (category: string) => void;
  handleAllButtonClick: () => void;
  selectedCategory?: string;
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isTemplatesDropdownOpen, setIsTemplatesDropdownOpen] = useState(false);
  const [userData] = useState(getUserData());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activePage, setActivePage] = useState("");
  const router = useRouter();

  const sidebarRef = useRef<HTMLDivElement>(null);
  const templatesDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };


  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };


  useEffect(() => {
    
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      if (path.includes("/home")) {
        setActivePage("home");
      } else if (path.includes("/mygraphics")) {
        setActivePage("mygraphics");
      } else if (path.includes("/templates")) {
        setActivePage("templates");
      }
    }
  }, []);

  const handleCategoryClick = (category: string) => {
    handleButtonClick(category);
   
    router.push(`/templates?category=${encodeURIComponent(category)}`);
    setActivePage("templates");
  };

  const handleAllButtonClick = () => {
    handleAllTemplatesButtonClick(); 
    router.push("/templates"); 
    setActivePage("templates");
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiService.getData(
          "/api/categories/list?visible=1"
        );
        if (response.success) {
          const categoryData = (response.categories as Category[]).map(
            (cat) => ({
              id: cat.id,
              name: cat.name,
              image: cat.image,
            })
          );
          setCategories(categoryData);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        window.innerWidth < 1024
      ) {
        setIsSidebarOpen(false);
      }

      if (
        templatesDropdownRef.current &&
        !templatesDropdownRef.current.contains(event.target as Node)
      ) {
        setIsTemplatesDropdownOpen(false);
      }

    
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout(router);
  };

  const handleTemplatesButtonClick = () => {
    setIsTemplatesDropdownOpen((prev) => !prev);
  };

  const handleDropdownClick = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleDropdownMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const goToPage = (page: string) => {
    router.push(`/${page}`);
    setActivePage(page);
  };

  return (
    <>
      <button
        className="md:hidden lg:hidden mt-3 ml-4 fixed top-1 left-7 z-50 text-white rounded p-1"
        onClick={() => setIsSidebarOpen(true)}
        style={{ display: isSidebarOpen ? "none" : "block" }}
      >
        <Image
          src="/icon/dropdown.png"
          alt="Open Sidebar"
          width={24}
          height={24}
          className="lg:hidden md:hidden"
        />
      </button>

      <aside
        ref={sidebarRef}
        className={`bg-white border-r border-gray-200 flex flex-col justify-between p-4 fixed top-0 left-0 h-full z-40 transition-transform duration-300 transform
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          lg:w-80 md:w-60 sm:w-56 w-60`}
      >
        <div className="relative" ref={profileDropdownRef}>
          <div
            className="flex items-center gap-4 p-4 bg-gray-100 rounded-3xl hover:bg-blue-100 transition-all duration-200 cursor-pointer"
            onClick={handleDropdownClick}
            onMouseEnter={handleDropdownMouseEnter}
          >
            <div className="w-7 h-7 p-1 font-sans bg-blue-500 text-white rounded-full flex items-center justify-center text-sm">
              {userData?.userName
                ?.split(" ")
                .map((word: string) => word[0]?.toUpperCase())
                .slice(0, 2)
                .join("")}
            </div>
            <p className="text-gray-700 font-semibold capitalize">
              {userData?.userName}
            </p>
            <svg
              className={`w-4 h-4 ml-6 text-gray-500 transform transition-transform ${
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
              className="absolute  mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex items-center gap-2 p-4">
                <div className="w-8 h-8 flex items-center justify-center bg-white text-[#00a8e8] rounded-full text-sm font-bold">
                  {userData?.userName
                    ?.split(" ")
                    .map((word: string[]) => word[0]?.toUpperCase())
                    .slice(0, 2)
                    .join("") || "U"}
                </div>
                <p className="text-gray-700 capitalize">
                  {userData?.userName || "User"}
                </p>
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

        <button
          className="mt-6 w-full bg-blue-500 text-white py-2 rounded-3xl hover:bg-blue-600"
          onClick={() => goToPage("mygraphics")}
        >
          Create a Graphic
        </button>

        <nav className="mt-10 ml-2 mr-2">
          <button
            className={`w-full text-left flex items-center rounded-md py-2 px-3 mb-1 hover:bg-blue-100 font-semibold cursor-pointer ${
              activePage === "home"
                ? "text-[#007ea7] bg-blue-100"
                : "text-gray-700"
            }`}
            onClick={() => goToPage("home")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill={activePage === "home" ? "#007ea7" : "#4B5563"}
              className={`h-5 w-5 mr-2 ${
                activePage === "home" ? "text-[#007ea7]" : "text-gray-700"
              }`}
            >
              <path d="M8 20H3V10H0L10 0l10 10h-3v10h-5v-6H8v6z"></path>
            </svg>
            Home
          </button>
          <button
            className={`w-full mt-2 text-left flex items-center rounded-md py-2 px-3 mb-1 hover:bg-blue-100 font-semibold cursor-pointer ${
              activePage === "mygraphics"
                ? "text-[#007ea7] bg-blue-100"
                : "text-gray-700"
            }`}
            onClick={() => goToPage("mygraphics")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill={activePage === "mygraphics" ? "#007ea7" : "#4B5563"}
              className={`h-5 w-5 mr-2 ${
                activePage === "mygraphics" ? "text-blue-500" : "text-gray-700"
              }`}
            >
              <path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z"></path>
            </svg>
            My Graphics
          </button>
          <div ref={templatesDropdownRef}>
            <button
              className={`w-full mt-2 text-left flex items-center rounded-md py-2 px-3 mb-1 hover:bg-blue-100 font-semibold cursor-pointer ${
                activePage === "templates"
                  ? "text-[#007ea7] bg-blue-100"
                  : "text-gray-700"
              }`}
              onClick={handleTemplatesButtonClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill={activePage === "templates" ? "#007ea7" : "#4B5563"}
                className={`h-5 w-5 mr-2 ${
                  activePage === "templates" ? "text-blue-500" : "text-gray-700"
                }`}
              >
                <path d="M9 20v-1.7l.01-.24L15.07 12h2.94c1.1 0 1.99.89 1.99 2v4a2 2 0 0 1-2 2H9zm0-3.34V5.34l2.08-2.07a1.99 1.99 0 0 1 2.82 0l2.83 2.83a2 2 0 0 1 0 2.82L9 16.66zM0 1.99C0 .9.89 0 2 0h4a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zM4 17a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path>
              </svg>
              Templates
              <svg
                className={`w-4 h-4 inline-block ml-1 transform transition-transform ${
                  isTemplatesDropdownOpen ? "rotate-180" : "rotate-0"
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
            </button>
            {isTemplatesDropdownOpen && (
              <div className="ml-6 mt-1 mb-1 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-blue-300 scrollbar-track-blue-100">
                <ul className="space-y-1 text-sm">
                  <li
                    className={`rounded-md py-2 px-3 hover:bg-blue-100 cursor-pointer ${
                      selectedCategory === "all"
                        ? "bg-blue-200 font-semibold text-blue-500"
                        : "text-gray-700"
                    }`}
                    onClick={handleAllButtonClick}
                  >
                    All
                  </li>
                  {categories.map((category) => (
                    <li
                      key={category.id}
                      onClick={() => handleCategoryClick(category.name)}
                      className={`rounded-md py-2 px-3 hover:bg-blue-100 cursor-pointer ${
                        selectedCategory === category.name
                          ? "bg-blue-200 font-semibold text-blue-500"
                          : "text-gray-600"
                      }`}
                    >
                      {category.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </nav>
        <button className="mt-auto w-44 ml-6 mb-4 bg-blue-500 text-white py-2 rounded-3xl hover:bg-blue-600">
          Try Premium
        </button>
      </aside>
    </>
  );
}
