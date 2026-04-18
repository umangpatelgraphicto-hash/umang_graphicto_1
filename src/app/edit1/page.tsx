"use client";
import React, { useState } from "react";
import Image from "next/image";

interface Item {
  icon: string;
  title: string;
  description: string;
  shortText: string;
}

export default function EditPage() {
  const [activePanel, setActivePanel] = useState("ITEMS");

  const sidePanelItems = [
    "ITEMS",
    "HEADING",
    "COLORS",
    "FONTS",
    "TEMPLATES",
    "GENERATE",
  ];

  const [selectedStar] = useState("⭐");
  const [items, setItems] = useState<Item[]>([
    { icon: selectedStar, title: "", description: "", shortText: "" },
  ]);

  const handleInputChange = (index: number, field: string, value: string) => {
    const updatedItems = [...items];
    updatedItems[index][field as keyof Item] = value;
    setItems(updatedItems);
  };

  const handleAddItem = () => {
    const newItem = {
      icon: selectedStar,
      title: items[0].title,
      description: items[0].description,
      shortText: "",
    };
    setItems([...items, newItem]);
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      <div className="bg-[#00a8e8] w-full flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <Image
            src="/logo/logo1.png"
            alt="Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <h1 className="text-white text-lg font-bold">
            <input
              type="text"
              className="bg-transparent text-white border-b border-white focus:outline-none"
              placeholder="Untitled"
            />
          </h1>
        </div>

        <div className="flex items-center gap-6">
          <button className="text-white flex items-center gap-2">
            <Image src="/edit/save.png" alt="Save" width={24} height={24} />
            Saved
          </button>
          <button className="text-white flex items-center gap-2">
            <Image
              src="/edit/download.png"
              alt="Download"
              width={24}
              height={24}
            />
            Download
          </button>
          <button className="text-white flex items-center gap-2">
            <Image src="/edit/share.png" alt="Share" width={24} height={24} />
            Share
          </button>
        </div>
      </div>

      <div className="flex flex-grow">
        <aside className="w-20 p-2 bg-[#003366] text-white flex flex-col items-center">
          {sidePanelItems.map((name) => (
            <button
              key={name}
              className={`flex flex-col items-center mb-4 px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer hover:bg-[#005f99] ${
                activePanel === name ? "bg-[#007ea7]" : ""
              }`}
              onClick={() => setActivePanel(name)}
            >
              <span className="text-xs mt-1">{name}</span>
            </button>
          ))}
        </aside>

        <div className="w-96 bg-white border-l border-gray-300 p-4">
          {activePanel === "ITEMS" && (
            <div className="mt-6">
              {items.map((item, index) => (
                <div key={index} className="mt-3">
                  <label className="text-sm font-semibold text-gray-600">
                    Icon
                  </label>
                  <select
                    className="mt-2 p-2 ml-5 mb-4 border h-10 border-gray-300 rounded-lg"
                    value={item.icon}
                    onChange={(e) =>
                      handleInputChange(index, "icon", e.target.value)
                    }
                  >
                    <option>⭐</option>
                  </select>
                  <br />
                  <label className="text-sm font-semibold text-gray-600">
                    Short Text
                  </label>
                  <input
                    type="text"
                    maxLength={2}
                    className="w-full mt-2 p-2 border mb-3 border-gray-300 rounded-lg"
                    placeholder="Max 2 chars"
                    value={item.shortText}
                    onChange={(e) =>
                      handleInputChange(index, "shortText", e.target.value)
                    }
                  />
                  <br />
                  <label className="text-sm font-semibold text-gray-600">
                    Title
                  </label>
                  <input
                    type="text"
                    className="w-full mt-2 p-2 border mb-3 border-gray-300 rounded-lg"
                    placeholder="Enter title"
                    value={item.title}
                    onChange={(e) =>
                      handleInputChange(index, "title", e.target.value)
                    }
                  />
                  <label className="text-sm font-semibold text-gray-600">
                    Description
                  </label>
                  <textarea
                    className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
                    placeholder="Enter description"
                    value={item.description}
                    onChange={(e) =>
                      handleInputChange(index, "description", e.target.value)
                    }
                  />
                </div>
              ))}
              <button
                onClick={handleAddItem}
                className="mt-4 w-full py-2 bg-blue-500 text-white rounded-lg"
              >
                Add Item
              </button>
            </div>
          )}
        </div>
        <div className="flex-grow bg-gray-100 flex justify-center items-center">
          {items.map((item, index) => (
            <div key={index} className="flex flex-col items-center m-4">
              <div className="relative w-40 h-40 flex items-center justify-center">
                {index % 2 === 0 ? (
                  <div className="relative flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[80px] border-r-[80px] border-t-[80px] border-l-transparent border-r-transparent border-t-red-500"></div>
                    <div className="absolute flex items-center justify-center text-white text-3xl">
                      {item.icon}
                    </div>
                  </div>
                ) : (
                  <div className="relative flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[80px] mt-96 border-r-[80px] border-b-[80px] border-l-transparent border-r-transparent border-b-purple-500"></div>
                    <div className="absolute flex mt-96 items-center justify-center text-white text-3xl">
                      {item.icon}
                    </div>
                  </div>
                )}
              </div>

              <div
                className={`relative w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                  index % 2 === 0 ? "bg-red-500" : "bg-purple-500"
                }`}
              >
                <span className="text-white text-xl">{item.shortText}</span>
              </div>

              <h2
                className={`text-lg font-bold text-gray-700 text-center ${index % 2 === 1 ? "mt-4" : ""}`}
              >
                {item.title}
              </h2>

              <p className={`text-gray-500 text-center `}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
