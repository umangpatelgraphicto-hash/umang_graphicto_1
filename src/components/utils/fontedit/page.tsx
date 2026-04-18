"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useItems } from "@/context/ItemContext";

interface Font {
  id: number;
  name: string;
  style: string;
  url?: string;
}

// Static font list (15-20 fonts) with Google Fonts URLs for some
const staticFonts: Font[] = [
  { id: 1, name: "Arial", style: "normal" },
  { id: 2, name: "Verdana", style: "normal" },
  { id: 3, name: "Tahoma", style: "normal" },
  { id: 4, name: "Times New Roman", style: "normal" },
  { id: 5, name: "Georgia", style: "normal" },
  { id: 6, name: "Courier New", style: "normal" },
  { id: 7, name: "Lucida Console", style: "normal" },
  { id: 8, name: "Open Sans", style: "normal", url: "https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" },
  { id: 9, name: "Roboto", style: "normal", url: "https://fonts.googleapis.com/css2?family=Roboto&display=swap" },
  { id: 10, name: "Lato", style: "normal", url: "https://fonts.googleapis.com/css2?family=Lato&display=swap" },
  { id: 11, name: "Montserrat", style: "normal", url: "https://fonts.googleapis.com/css2?family=Montserrat&display=swap" },
  { id: 12, name: "Raleway", style: "normal", url: "https://fonts.googleapis.com/css2?family=Raleway&display=swap" },
  { id: 13, name: "Poppins", style: "normal", url: "https://fonts.googleapis.com/css2?family=Poppins&display=swap" },
  { id: 14, name: "Source Sans Pro", style: "normal", url: "https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap" },
  { id: 15, name: "Nunito", style: "normal", url: "https://fonts.googleapis.com/css2?family=Nunito&display=swap" },
  { id: 16, name: "Ubuntu", style: "normal", url: "https://fonts.googleapis.com/css2?family=Ubuntu&display=swap" },
  { id: 17, name: "Merriweather", style: "normal", url: "https://fonts.googleapis.com/css2?family=Merriweather&display=swap" },
];

// Preload fonts with URL once on mount
function usePreloadFonts(fonts: Font[]) {
  useEffect(() => {
    fonts.forEach((font) => {
      if (font.url) {
        const link = document.createElement("link");
        link.href = font.url;
        link.rel = "stylesheet";
        document.head.appendChild(link);
      }
    });
  }, [fonts]);
}

export default function FontPicker() {
  const [fonts] = useState<Font[]>(staticFonts);
  const [selectedFont, setSelectedFont] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { setItems } = useItems();

  usePreloadFonts(staticFonts);

  const filteredFonts = fonts.filter((font) =>
    font.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Apply selected font to ALL items
  const applyFontToAllItems = (fontName: string) => {
    setSelectedFont(fontName);

    setItems((prevItems) =>
      prevItems.map((item) => {
        return { ...item, fontFamily: fontName };
      })
    );
  };

  return (
    <div className="p-3 h-screen text-gray-600 flex flex-col overflow-y-auto">
      {/* Search Input with Icon */}
      <div className="relative w-full mb-4">
        <Search className="absolute left-3 top-3 text-gray-500" size={18} />
        <input
          type="text"
          placeholder='Try "Open Sans" or "Roboto"'
          className="border p-2 pl-10 w-full rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <ul className="bg-white rounded-lg p-4 flex-1 border border-gray-300 shadow-md overflow-auto">
        {filteredFonts.length === 0 && <li>No fonts found.</li>}
        {filteredFonts.map((font) => (
          <li
            key={font.id}
            className={`cursor-pointer p-2 ${
              selectedFont === font.name ? "font-bold" : ""
            }`}
            style={{
              fontFamily: font.name,
              fontStyle: font.style || "normal",
            }}
            onClick={() => applyFontToAllItems(font.name)}
          >
            {selectedFont === font.name ? "✔ " : ""} {font.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
