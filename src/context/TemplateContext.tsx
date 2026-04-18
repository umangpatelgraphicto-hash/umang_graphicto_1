// src/context/TemplateContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface TemplateContextType {
    selectedImage: string;
    setSelectedImage: (image: string) => void;
}

const TemplateContext = createContext<TemplateContextType | undefined>(undefined);

export function TemplateProvider({ children }: { children: ReactNode }) {
    const [selectedImage, setSelectedImage] = useState<string>("/img/1741868007165_130_t.svg");
    
    return (
        <TemplateContext.Provider value={{ selectedImage, setSelectedImage }}>
            {children}
        </TemplateContext.Provider>
    );
}

export function useTemplateContext() {
    const context = useContext(TemplateContext);
    if (!context) {
        throw new Error('useTemplateContext must be used within a TemplateProvider');
    }
    return context;
}