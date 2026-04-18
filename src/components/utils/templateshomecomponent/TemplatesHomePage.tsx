"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Footer from "@/components/utils/footer";
import apiService from "@/services/ApiService";
import Header from "@/components/utils/header";

interface Category {
  id: number;
  name: string;
}

interface Template {
  id: number;
  image_path: string;
  category_name: string;
}

const TemplateHomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [visibleTemplates, setVisibleTemplates] = useState<Template[]>([]);
  const [imageIndex, setImageIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [allTemplates, setAllTemplates] = useState<Template[]>([]);

  const itemsPerPage = 6;

  useEffect(() => {
    const fetchCategoriesAndTemplates = async () => {
      try {
        // Fetch categories
        const categoryResponse = await apiService.getData("/api/categories/list?visible=1");
        if (categoryResponse.success) {
          const categoryNames = (categoryResponse.categories as Category[]).map(
            (cat) => cat.name
          );
          setCategories(categoryNames);
        } else {
          setError("Failed to fetch categories");
        }

        // Fetch templates
        const templateResponse = await fetch("/api/templatesApi/list");
        const templateData = await templateResponse.json();
        if (Array.isArray(templateData)) {
          // Filter out templates with invalid image paths
          const validTemplates = templateData.filter(
            (template) => template.image_path && template.image_path.trim() !== ""
          );
          setAllTemplates(validTemplates);
          setVisibleTemplates(validTemplates);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesAndTemplates();
  }, []);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category.toLowerCase());
    const filteredTemplates = 
      category.toLowerCase() === "all" 
        ? allTemplates 
        : allTemplates.filter(
            (template) => template.category_name.toLowerCase() === category.toLowerCase()
          );
    setVisibleTemplates(filteredTemplates);
    setCurrentPage(1);
    setImageIndex(0);
  };

  const handleAllClick = () => {
    setSelectedCategory("all");
    setVisibleTemplates(allTemplates);
    setCurrentPage(1);
    setImageIndex(0);
  };

  const handleNextClick = () => {
    const nextIndex = imageIndex + itemsPerPage;
    if (nextIndex >= visibleTemplates.length) return;
    setImageIndex(nextIndex);
    setCurrentPage(currentPage + 1);
  };

  const handlePrevClick = () => {
    const prevIndex = imageIndex - itemsPerPage;
    if (prevIndex < 0) return;
    setImageIndex(prevIndex);
    setCurrentPage(currentPage - 1);
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(visibleTemplates.length / itemsPerPage);
    if (totalPages <= 1) return null;

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex justify-between items-center mr-10 space-x-2 md:space-x-3 mt-20 mb-20">
        <button
          onClick={handlePrevClick}
          disabled={currentPage === 1}
          className="px-2 py-2 bg-white text-blue-500 border-blue-500 border-2 rounded-3xl hover:text-white hover:bg-blue-500 hover:disabled:bg-white hover:disabled:text-blue-500 disabled:opacity-50"
        >
          Previous
        </button>
        <div className="flex space-x-2">
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => {
                setCurrentPage(pageNumber);
                setImageIndex((pageNumber - 1) * itemsPerPage);
              }}
              className={`px-4 py-2 ${
                currentPage === pageNumber
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:text-white hover:bg-blue-500"
              } rounded-3xl`}
            >
              {pageNumber}
            </button>
          ))}
        </div>
        <button
          onClick={handleNextClick}
          disabled={currentPage === totalPages}
          className="px-2 py-2 bg-white text-blue-500 border-blue-500 border-2 rounded-3xl hover:text-white hover:bg-blue-500 hover:disabled:bg-white hover:disabled:text-blue-500 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    );
  };

  const renderTemplates = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentTemplates = visibleTemplates.slice(startIndex, endIndex);

    return (
      <div className="grid grid-cols-1 mt-4 sm:grid-cols-1 md:grid-cols-3 gap-4">
        {currentTemplates.length > 0 ? (
          currentTemplates.map((template, index) => (
            <div key={template.id} className="cursor-pointer">
              {template.image_path && template.image_path.trim() !== "" ? (
                <div className="relative">
                  <Image
                    src={template.image_path}
                    alt={`Template preview ${index + 1}`}
                    width={600}
                    height={500}
                    className="w-full h-auto rounded-xl shadow-lg object-cover"
                    onError={(e) => {
                      // Replace failed image with an inline data URI placeholder instead of a file path
                      const target = e.target as HTMLImageElement;
                      target.onerror = null; // Prevent infinite error loop
                      // Use a simple data URI for the placeholder - gray background with text
                      target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='500' viewBox='0 0 600 500'%3E%3Crect width='600' height='500' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' text-anchor='middle' fill='%23999999'%3ETemplate Preview Unavailable. It Was Only for reference%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>
              ) : (
                // Fallback for empty image path
                <div className="w-full h-64 rounded-xl shadow-lg bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500">Template Preview Unavailable</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-3">No templates available for this category</p>
        )}
      </div>
    );
  };

  const Loader = () => (
    <div className="flex justify-center items-center h-64">
      <div className="border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="bg-white">
      <div className="bg-gray-100 pb-8">
        <Header />
        <div className="text-center">
          <h1 className="text-3xl mt-10 font-sans text-gray-700">Templates</h1>
          <h2 className="text-xl font-sans text-gray-500 mt-2 mb-20">
            Hundreds of professionally designed infographic templates
          </h2>
        </div>
      </div>

      <main className="container mx-auto px-4 md:px-28 py-24 mt-10 mb-32">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/4">
            <h1 className="text-3xl mb-4 text-gray-700 font-sans ml-2">Categories</h1>
            <div className="flex flex-col">
              {/* "All" button should be shown first */}
              <button
                onClick={handleAllClick}
                className={`px-4 font-sans text-xl py-2 m-2 mr-5 text-left rounded-sm hover:bg-blue-500 hover:text-white ${
                  selectedCategory === "all"
                    ? "bg-blue-200 font-semibold text-blue-500"
                    : "text-gray-600"
                }`}
              >
                All
              </button>
             
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`px-4 font-sans text-xl py-2 m-2 mr-5 text-left rounded-sm hover:bg-blue-500 hover:text-white ${
                    selectedCategory === category.toLowerCase()
                      ? "bg-blue-200 font-semibold text-blue-500"
                      : "text-gray-600"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full md:w-3/4">
            {loading ? (
              <Loader />
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              renderTemplates()
            )}

            <div className="mt-6 flex space-x-3 justify-center">{renderPagination()}</div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TemplateHomePage;