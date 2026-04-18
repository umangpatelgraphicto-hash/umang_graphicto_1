'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface Item {
    id: number;
    title: string;
    description: string;
    icon: string;
    fontFamily?: string;
    [key: string]: string | number | boolean | null | undefined;
  }
  
export interface Color {
  id: number;
  static: string;
  fill: string[];
}

interface ItemContextType {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  selectedItemId: number | null;
  setSelectedItemId: React.Dispatch<React.SetStateAction<number | null>>;
  selectedColorPalette: Color | null;
  setSelectedColorPalette: React.Dispatch<React.SetStateAction<Color | null>>;
}

const ItemContext = createContext<ItemContextType | undefined>(undefined);

// Provider component
export const ItemProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Item[]>([{ id: 1, title: '', description: '', icon: '⭐', fontFamily: 'Arial' }]);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(1);
  const [selectedColorPalette, setSelectedColorPalette] = useState<Color | null>(null);

  return (
    <ItemContext.Provider value={{ 
      items, 
      setItems, 
      selectedItemId, 
      setSelectedItemId,
      selectedColorPalette,
      setSelectedColorPalette
    }}>
      {children}
    </ItemContext.Provider>
  );
};

// Custom hook to use the context
export const useItems = () => {
  const context = useContext(ItemContext);
  if (context === undefined) {
    throw new Error('useItems must be used within an ItemProvider');
  }
  return context;
};