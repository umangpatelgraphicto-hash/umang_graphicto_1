'use client';

import { useState, useEffect } from 'react';
import { useItems, Item } from '@/context/ItemContext';
import { Search } from "lucide-react";

interface Icon {
  id: number;
  size: string;
  type: string;
  svg: string;
}

const ItemList = () => {
  const { items, setItems, selectedItemId, setSelectedItemId } = useItems();
  const [icons, setIcons] = useState<Icon[]>([]);
  const [iconSearchQuery, setIconSearchQuery] = useState('');
  const [isIconDropdownOpen, setIsIconDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchIcons = async () => {
      try {
        const response = await fetch(`/api/icons/list?search=${iconSearchQuery}`);
        const data = await response.json();
        if (data.success) {
          setIcons(data.icons);
        }
      } catch (error) {
        console.error('Error fetching icons:', error);
      }
    };

    if (iconSearchQuery) {
      const delayDebounce = setTimeout(() => {
        fetchIcons();
      }, 300);

      return () => clearTimeout(delayDebounce);
    } else {
      setIcons([]);
    }
  }, [iconSearchQuery]);

  const addItem = () => {
    if (items.length < 16) {
      const newItem: Item = { id: Date.now(), title: '', description: '', icon: '⭐' };
      setItems([...items, newItem]);
      setSelectedItemId(newItem.id);
    }
  };

  const removeItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
      if (selectedItemId === id) {
        setSelectedItemId(items[0]?.id || null);
      }
    }
  };

  const updateItem = (id: number, field: keyof Item, value: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleIconSelect = (id: number, iconSvg: string) => {
    updateItem(id, 'icon', iconSvg);
    setIsIconDropdownOpen(false);
  };

  return (
    <div className="max-w-xl h-screen overflow-y-auto text-black mx-auto p-2">
      {items.map((item, index) => (
        <div key={item.id} className="mb-4 p-4 bg-white border rounded text-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold cursor-pointer" onClick={() => setSelectedItemId(item.id)}>
              ☰ Item {index + 1}
            </span>
            <button className="text-gray-500" onClick={() => removeItem(item.id)}>✖</button>
          </div>
          {selectedItemId === item.id && (
            <>
              <div className="mt-2">
                <label className="block text-xs font-medium mb-1">Title</label>
                <textarea
                  className="w-full border rounded p-2 text-xs"
                  value={item.title}
                  onChange={(e) => updateItem(item.id, 'title', e.target.value)}
                />
              </div>
              <div className="mt-2">
                <label className="block text-xs font-medium mb-1">Description</label>
                <textarea
                  className="w-full border rounded p-2 text-xs"
                  value={item.description}
                  onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                />
              </div>
              <div className="mt-2 flex relative">
                <label className="block mt-2 text-xs font-medium mb-1">Icon</label>
                <button
                  className="w-2/12 ml-60 h-8 float-right border rounded text-xs bg-gray-100 flex justify-between items-center"
                  onClick={() => setIsIconDropdownOpen(!isIconDropdownOpen)}
                >
                  {item.icon === '⭐' ? '⭐' : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      dangerouslySetInnerHTML={{ __html: item.icon }}
                    />
                  )}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="currentColor"
                  >
                    <path d="M15.3 9.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z" />
                  </svg>
                </button>
                {isIconDropdownOpen && (
                  <div className="absolute top-full left-0 bg-white border shadow-md p-3 w-full z-10 mt-1">
                     <div className="relative w-full mb-4">
                     <Search className="absolute left-3 mt-2 text-gray-500" size={18} />
                     <input
                      type="text"
                      placeholder="Search icons..."
                      className="border p-2 pl-10 w-full rounded"
                      value={iconSearchQuery}
                      onChange={(e) => setIconSearchQuery(e.target.value)}
                    />
                     </div>
                 
                    <div className="flex flex-wrap gap-2">
                      {icons.map((icon) => (
                        <button
                          key={icon.id}
                          className="w-12 h-12 flex items-center justify-center border rounded hover:bg-gray-200"
                          onClick={() => handleIconSelect(item.id, icon.svg)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            dangerouslySetInnerHTML={{ __html: icon.svg }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      ))}
      <button 
        className="mt-4 w-32 h-10 bg-blue-500 text-white p-2 rounded-lg text-xs float-right" 
        onClick={addItem} 
        disabled={items.length >= 16}
      >
        Add Item
      </button>
    </div>
  );
};

export default ItemList;
