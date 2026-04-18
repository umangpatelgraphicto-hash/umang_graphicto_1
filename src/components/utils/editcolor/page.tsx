'use client';

import { useState } from 'react';
import { useItems } from '@/context/ItemContext';

interface Color {
  id: number;
  static: string;
  fill: string[];
}

// Static color palettes only
const staticPalettes: Color[] = [
  { id: 1, static: 'Palette 1', fill: ['#FF5733', '#FFC300', '#DAF7A6'] },
  { id: 2, static: 'Palette 2', fill: ['#900C3F', '#C70039', '#FF5733'] },
  { id: 3, static: 'Palette 3', fill: ['#581845', '#900C3F', '#C70039'] },
  { id: 4, static: 'Palette 4', fill: ['#1C2833', '#566573', '#ABB2B9'] },
  { id: 5, static: 'Palette 5', fill: ['#2ECC71', '#27AE60', '#145A32'] },
  { id: 6, static: 'Palette 6', fill: ['#3498DB', '#2980B9', '#1F618D'] },
  { id: 7, static: 'Palette 7', fill: ['#E74C3C', '#C0392B', '#922B21'] },
  { id: 8, static: 'Palette 8', fill: ['#F39C12', '#D68910', '#B9770E'] },
  { id: 9, static: 'Palette 9', fill: ['#7D3C98', '#6C3483', '#5B2C6F'] },
  { id: 10, static: 'Palette 10', fill: ['#1ABC9C', '#17A589', '#148F77'] },
  { id: 11, static: 'Palette 11', fill: ['#34495E', '#2C3E50', '#212F3D'] },
  { id: 12, static: 'Palette 12', fill: ['#F1948A', '#EC7063', '#CD6155'] },
];

export default function DisplayColors() {
  const [colors] = useState<Color[]>(staticPalettes);
  const { setSelectedColorPalette, selectedColorPalette } = useItems();

  const handleColorSelect = (color: Color) => {
    setSelectedColorPalette(color);
  };

  return (
    <div className="max-w-xl h-screen overflow-x-auto">
      <h1 className="ml-5 mt-2 text-gray-700 font-sans text-xl">Standard Color Palettes</h1>

      <div className="h-screen space-y-4 p-3">
        {colors.map((color) => (
          <div 
            key={color.id} 
            className={`flex p-1 rounded-lg cursor-pointer ${selectedColorPalette?.id === color.id ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => handleColorSelect(color)}
          >
            <div className="flex w-full overflow-hidden rounded-full h-8">
              {color.fill.map((fillColor, index) => (
                <div
                  key={index}
                  className="flex-1 h-8"
                  style={{ backgroundColor: fillColor }}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
