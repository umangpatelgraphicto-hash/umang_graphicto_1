"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Sidebar from "@/components/utils/sidebar";
import { useRouter } from "next/navigation";
import { isUserAuthenticated } from "@/components/utils/authHelper";

interface Template {
  id: number;
  url: string;
  alt: string;
  categoryId: number;
}

interface CategoryTemplate {
  id: number;
  category_id: number;
  category_name: string;
  image_path: string;
  is_active: number;
}

interface CategoryIndices {
  [key: string]: number;
}

interface CategorizedTemplates {
  [key: string]: Template[];
}

export default function HomeTab() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [, setAllTemplates] = useState<CategoryTemplate[]>([]);
  const [categorizedTemplates, setCategorizedTemplates] =
    useState<CategorizedTemplates>({});
  const [categoryIndices, setCategoryIndices] = useState<CategoryIndices>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch("/api/templatesApi/list");
        if (!response.ok) {
          throw new Error("Failed to fetch templates");
        }
        const data = await response.json();
        setAllTemplates(data);

        const templates: CategorizedTemplates = {};
        const indices: CategoryIndices = {};
        data.forEach((template: CategoryTemplate) => {
          if (!templates[template.category_name]) {
            templates[template.category_name] = [];
            indices[template.category_name] = 0;
          }
          templates[template.category_name].push({
            id: template.id,
            url: template.image_path,
            alt: `${template.category_name} Template ${template.id}`,
            categoryId: template.category_id,
          });
        });

        setCategorizedTemplates(templates);
        setCategoryIndices(indices);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching templates:", err);
        setError(err instanceof Error ? err.message : "Unknown error occurred");
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchTemplates();
    }
  }, [isAuthenticated]);

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

  const handlePrev = (category: string) => {
    setCategoryIndices((prevIndices) => {
      const currentIndex = prevIndices[category];
      const templatesCount = categorizedTemplates[category]?.length || 0;
      return {
        ...prevIndices,
        [category]: currentIndex === 0 ? templatesCount - 1 : currentIndex - 1,
      };
    });
  };

  const handleNext = (category: string) => {
    setCategoryIndices((prevIndices) => {
      const currentIndex = prevIndices[category];
      const templatesCount = categorizedTemplates[category]?.length || 0;
      return {
        ...prevIndices,
        [category]: (currentIndex + 1) % templatesCount,
      };
    });
  };

  const getVisibleTemplates = (category: string): Template[] => {
    if (
      !categorizedTemplates[category] ||
      categorizedTemplates[category].length === 0
    ) {
      return [];
    }

    const templates = categorizedTemplates[category];
    const currentIndex = categoryIndices[category];
    const templatesCount = templates.length;

    return [
      templates[currentIndex],
      templates[(currentIndex + 1) % templatesCount],
      templates[(currentIndex + 2) % templatesCount],
      templates[(currentIndex + 3) % templatesCount],
    ].filter(Boolean);
  };

  const handleSidebarButtonClick = (category: string) => {
    console.log(`Button clicked for category: ${category}`);
  };

  const handleSidebarAllButtonClick = () => {
    console.log("All button clicked");
  };

  const handleUseTemplate = (imageUrl: string) => {
    console.log("Using template:", imageUrl);
    router.push(`/edit`);
  };

  const handlePreviewTemplate = (imageUrl: string) => {
    setPreviewImage(imageUrl);
    setShowPreview(true);
  };

  const closePreview = () => {
    setShowPreview(false);
    setPreviewImage(null);
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-white items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading templates...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center text-red-500">
          <p>Error loading templates: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen font-sans">
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
            <div>
              <button
                className="md:hidden lg:hidden mt-3 ml-2 bg-blue-500 text-white rounded"
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

        <div className="items-center mt-0 p-2 mb-8">
          <Image
            src="/home/home1.png"
            alt="Home"
            width={1200}
            height={300}
            className="m-1 mt-14 md:mt-2 lg:mt-1 2xl:w-full 2xl:h-auto"
          />
        </div>

        {/* Featured Templates Section */}
        {Object.keys(categorizedTemplates).length > 0 && (
          <section className="mb-12 p-2">
            <h2 className="text-lg pl-4 font-semibold text-gray-700 mb-4">
              Featured Templates
            </h2>
            <div className="relative w-full">
              <div className="flex overflow-hidden justify-center">
                {getVisibleTemplates(Object.keys(categorizedTemplates)[0]).map(
                  (template, index) => (
                    <div
                      key={`featured-${template.id}-${index}`}  
                      className="relative group min-w-[150px] h-40 flex items-center justify-center mx-2 sm:min-w-[200px] sm:h-40 md:min-w-[250px] md:h-56 lg:min-w-[300px] lg:h-64"
                    >
                      <Image
                        src={template.url}
                        alt={template.alt || `Featured Template ${index}`}
                        width={500}
                        height={300}
                           onError={(e) => {    
                      // Replace failed image with an inline data URI placeholder instead of a file path
                      const target = e.target as HTMLImageElement;
                      target.onerror = null; // Prevent infinite error loop
                      // Use a simple data URI for the placeholder - gray background with text
                      target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='500' viewBox='0 0 600 500'%3E%3Crect width='600' height='500' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' text-anchor='middle' fill='%23999999'%3ETemplate Unavailable.(reference Only)%3C/text%3E%3C/svg%3E";
                    }}
                        className="rounded-lg shadow-lg object-cover w-full h-full sm:w-[200px] sm:h-[100px] md:w-[250px] md:h-[150px] lg:w-[500px] lg:h-[300px] 2xl:w-[600px]"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity duration-300 rounded-lg">
                        <div className="space-y-3 flex flex-col ml-6">
                          <button
                            onClick={() => handleUseTemplate(template.url)}
                            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
                          >
                            Use
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePreviewTemplate(template.url);
                            }}
                            className="bg-white text-blue-500 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
                          >
                            Preview
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>

              {Object.keys(categorizedTemplates).length > 0 && (
                <>
                  <button
                    onClick={() =>
                      handlePrev(Object.keys(categorizedTemplates)[0])
                    }
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
                  >
                    ‹
                  </button>
                  <button
                    onClick={() =>
                      handleNext(Object.keys(categorizedTemplates)[0])
                    }
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
                  >
                    ›
                  </button>
                </>
              )}
            </div>
          </section>
        )}

        {/* Your Graphics Section */}
        <section className="mb-12 p-2 ml-2 lg:ml-0">
          <h2 className="text-lg pl-4 font-semibold text-gray-700 mb-4">
            Your Graphics
          </h2>
          <div>
            <div className="relative group w-64 h-56 rounded-lg shadow-lg">
              <Image
                src="/home/yg.png"
                alt="Your uploaded graphic"
                width={500}
                height={300}
                className="rounded-lg shadow-lg object-cover w-full h-full sm:w-[200px] sm:h-[100px] md:w-[255px] md:h-[225px] lg:w-[500px] lg:h-56 2xl:w-full 2xl:h-full"
                  onError={(e) => {
                      // Replace failed image with an inline data URI placeholder instead of a file path
                      const target = e.target as HTMLImageElement;
                      target.onerror = null; // Prevent infinite error loop
                      // Use a simple data URI for the placeholder - gray background with text
                      target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='500' viewBox='0 0 600 500'%3E%3Crect width='600' height='500' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' text-anchor='middle' fill='%23999999'%3ETemplate Preview Unavailable.(reference Only)%3C/text%3E%3C/svg%3E";
                    }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity duration-300 rounded-lg">
                <div className="space-y-3 flex flex-col ">
                  <button
                    onClick={() => handleUseTemplate("/home/yg.png")}
                    className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Use
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePreviewTemplate("/home/yg.png");
                    }}
                    className="bg-white text-blue-500 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    Preview
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Category Templates Sections */}
        {Object.keys(categorizedTemplates).map((category) => (
          <section key={`category-section-${category}`} className="mb-12 pt-4 p-2">
            <h2 className="text-lg pl-4 font-semibold text-gray-700 mb-4">
              {category}
            </h2>
            <div className="relative w-full">
              <div className="flex overflow-hidden justify-center">
                {getVisibleTemplates(category).map((template, index) => (
                  <div
                    key={`${category}-${template.id}-${index}`}
                    className="relative group min-w-[150px] h-40 flex items-center justify-center mx-2 sm:min-w-[200px] sm:h-40 md:min-w-[250px] md:h-56 lg:min-w-[300px] lg:h-64"
                  >
                    <Image
                      src={template.url}
                      alt={template.alt || `${category} Template ${index}`}
                      width={500}
                      height={300}
                      className="rounded-lg shadow-lg object-cover w-full h-full sm:w-[200px] sm:h-[100px] md:w-[250px] md:h-[150px] lg:w-[500px] lg:h-[300px] 2xl:w-[600px]"
                        onError={(e) => {
                      // Replace failed image with an inline data URI placeholder instead of a file path
                      const target = e.target as HTMLImageElement;
                      target.onerror = null; // Prevent infinite error loop
                      // Use a simple data URI for the placeholder - gray background with text
                      target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='500' viewBox='0 0 600 500'%3E%3Crect width='600' height='500' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' text-anchor='middle' fill='%23999999'%3ETemplate Preview Unavailable.%3C/text%3E%3C/svg%3E";
                    }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity duration-300 rounded-lg">
                      <div className="space-y-3 flex flex-col ml-6">
                        <button
                          onClick={() => handleUseTemplate(template.url)}
                          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
                        >
                          Use
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePreviewTemplate(template.url);
                          }}
                          className="bg-white text-blue-500 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
                        >
                          Preview
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {categorizedTemplates[category]?.length > 0 && (
                <>
                  <button
                    onClick={() => handlePrev(category)}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
                  >
                    ‹
                  </button>
                  <button
                    onClick={() => handleNext(category)}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
                  >
                    ›
                  </button>
                </>
              )}
            </div>
          </section>
        ))}
      </main>
     
      {/* Template Preview Modal */}
      {showPreview && previewImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl text-black font-bold">
                Template Preview
              </h2>
              <button
                onClick={closePreview}
                className="text-gray-500 hover:text-gray-700"
              >
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-col md:flex-row gap-6 h-[calc(90vh-150px)]">
              <div className="flex-1 overflow-hidden">
                <div className="relative h-full">
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
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Template Features
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center text-gray-700">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Supports 1 to 30 items
                    </li>
                    <li className="flex items-center text-gray-700">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Gradient colors
                    </li>
                    <li className="flex items-center text-gray-700">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Icons
                    </li>
                  </ul>
                </div>

                <div className="text-center text-gray-600">
                  <p className="font-medium">
                    Ready to create your masterpiece?
                  </p>
                  <p className="text-sm mt-1">
                    Start with this professional template and customize it to
                    fit your needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}