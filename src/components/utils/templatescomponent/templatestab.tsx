"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/utils/sidebar";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { isUserAuthenticated } from "@/components/utils/authHelper";

const TemplateTabPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, setSelectedImage] = useState<string | null>(null);
  const [currentCategory, setCurrentCategory] = useState<string>("");
  const [showAllImages, setShowAllImages] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [images, setImages] = useState<{ [key: string]: string[] }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    const categoryParam = searchParams?.get('category');
    if (categoryParam) {
      setCurrentCategory(categoryParam);
      setShowAllImages(false);
    } else {
      setCurrentCategory("all");
      setShowAllImages(true);
    }
  }, [searchParams]);
  
  useEffect(() => {
    setLoading(true);
    fetch("/api/templatesApi/list")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const formattedData = data.reduce((acc, item) => {
            if (!acc[item.category_name]) {
              acc[item.category_name] = [];
            }
            acc[item.category_name].push(item.image_path);
            return acc;
          }, {} as { [key: string]: string[] });

          setImages(formattedData);
          setCategories(Object.keys(formattedData));
        }
      })
      .catch((error) => console.error("Error fetching images:", error))
      .finally(() => setLoading(false)); 
  }, []);

  const allImages = Object.values(images).flat();

  const handleButtonClick = (category: string) => {
    setShowAllImages(false);
    setCurrentCategory(category);
    setSelectedImage(images[category]?.[0] || null);
    router.push(`/templates?category=${encodeURIComponent(category)}`);
  };

  const handleAllButtonClick = () => {
    setShowAllImages(true);
    setCurrentCategory("all");
    router.push("/templates");
  };

  const handleUseTemplate = (image: string) => {
   
    console.log("Using template:", image);
    router.push(`/edit`);
  };

  const handlePreviewTemplate = (image: string) => {
    setPreviewImage(image);
    setShowPreview(true);
  };

  const closePreview = () => {
    setShowPreview(false);
    setPreviewImage(null);
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
    <div className="flex min-h-screen bg-gray-100 overflow-hidden">
    
      <Sidebar 
        handleButtonClick={handleButtonClick} 
        handleAllButtonClick={handleAllButtonClick}
        selectedCategory={currentCategory}
      />
      <main
        className={`flex-grow bg-gray-100 overflow-y-auto p-1 ${isSidebarOpen ? "ml-0" : "ml-0 md:ml-60 lg:ml-80"} transition-all duration-300`}
      >
        <div className="block sm:hidden md:hidden bg-white h-12 mb-4 shadow-md fixed w-full pl-9 pr-2 z-10">
          <div className="flex justify-between items-center">
            <div>
              <button
                className="md:hidden lg:hidden mt-3 ml-2 bg-blue-500 text-white rounded "
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
        <div className="flex-1 p-4 sm:p-6 md:p-8 pt-16 sm:pt-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl text-center md:text-left font-sans mb-6 text-gray-800">
            Templates
          </h1>
          <div className="flex flex-wrap gap-2 sm:gap-4 md:gap-6 mb-6 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-transparent">
            <button
              onClick={handleAllButtonClick}
              className={`${showAllImages ? "text-blue-500 border-blue-500" : "text-gray-700 border-gray-300"} bg-white p-2 px-4 sm:px-6 font-sans rounded-3xl border-2 hover:text-blue-500 hover:border-blue-500 text-sm sm:text-base flex-shrink-0`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleButtonClick(category)}
                className={`${currentCategory === category ? "text-blue-500 border-blue-500" : "text-gray-700 border-gray-300"} bg-white p-2 px-4 font-sans rounded-3xl border-2 hover:text-blue-500 hover:border-blue-500 text-sm sm:text-base flex-shrink-0`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {(showAllImages ? allImages : images[currentCategory] || []).length > 0 ? (
                (showAllImages ? allImages : images[currentCategory] || []).map((image, index) => (
                  image ? (
                    <div key={index} className="relative group">
                      <Image 
                        src={image} 
                        alt={`Template ${index + 1}`} 
                        width={500} 
                        height={300} 
                        className="w-full h-auto rounded-xl shadow-lg object-cover"
                          onError={(e) => {
                      // Replace failed image with an inline data URI placeholder instead of a file path
                      const target = e.target as HTMLImageElement;
                      target.onerror = null; // Prevent infinite error loop
                      // Use a simple data URI for the placeholder - gray background with text
                      target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='500' viewBox='0 0 600 500'%3E%3Crect width='600' height='500' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' text-anchor='middle' fill='%23999999'%3ETemplate Preview Unavailable. It Was Only for reference%3C/text%3E%3C/svg%3E";
                    }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity duration-300 rounded-xl">
                        <div className="space-y-3 flex flex-col">
                          <button 
                            onClick={() => handleUseTemplate(image)}
                            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
                          >
                            Use
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePreviewTemplate(image);
                            }}
                            className="bg-white text-blue-500 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
                          >
                            Preview
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : null
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 text-lg">No templates available for this category</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      
      {showPreview && previewImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl sm:text-2xl text-black font-bold">Template Preview</h2>
              <button 
                onClick={closePreview}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col md:flex-row gap-6 h-[calc(90vh-150px)]">
              <div className="flex-1 overflow-hidden">
                <div className="relative h-full min-h-[200px]">
                  <Image 
                    src={previewImage} 
                    alt="Template Preview" 
                    fill
                    className="object-contain rounded-lg"
                      onError={(e) => {
                      // Replace failed image with an inline data URI placeholder instead of a file path
                      const target = e.target as HTMLImageElement;
                      target.onerror = null; // Prevent infinite error loop
                      // Use a simple data URI for the placeholder - gray background with text
                      target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='500' viewBox='0 0 600 500'%3E%3Crect width='600' height='500' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' text-anchor='middle' fill='%23999999'%3ETemplate Preview Unavailable. It Was Only for reference%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col items-center justify-center md:w-1/3 space-y-6">
                <button 
                  onClick={() => {
                    handleUseTemplate(previewImage);
                    closePreview();
                  }}
                  className="bg-blue-500 text-white px-8 py-3 rounded-md hover:bg-blue-600 transition-colors font-medium text-lg w-full"
                >
                  Use this Template
                </button>
                
                <div className="bg-gray-50 p-4 rounded-lg w-full">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Template Features</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center text-gray-700">
                      <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Supports 1 to 30 items
                    </li>
                    <li className="flex items-center text-gray-700">
                      <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Gradient colors
                    </li>
                    <li className="flex items-center text-gray-700">
                      <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Icons
                    </li>
                  </ul>
                </div>
                
                <div className="text-center text-gray-600">
                  <p className="font-medium">Ready to create your masterpiece?</p>
                  <p className="text-sm mt-1">Start with this professional template and customize it to fit your needs.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateTabPage;