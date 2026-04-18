'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from "next/image";
import { useTemplateContext } from '@/context/TemplateContext';

interface Template {
    id: number;
    category_id: number;
    category_name: string;
    image_path: string;
    is_active: boolean;
}

export default function EditTemplatePage() {
    const { setSelectedImage } = useTemplateContext();
    const [templates, setTemplates] = useState<Template[]>([]);
    const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchTemplates() {
            try {
                const response = await axios.get('/api/templatesApi/list');
                const templatesData: Template[] = response.data;
                setTemplates(templatesData);
                setFilteredTemplates(templatesData);

                const uniqueCategories: string[] = ['All', ...Array.from(new Set(templatesData.map((template) => template.category_name)))];
                setCategories(uniqueCategories);
            } catch (err) {
                console.error('Error fetching templates:', err);
                setError('Failed to load templates');
            } finally {
                setLoading(false);
            }
        }
        fetchTemplates();
    }, []);

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        if (category === 'All') {
            setFilteredTemplates(templates);
        } else {
            setFilteredTemplates(templates.filter(template => template.category_name === category));
        }
    };

    if (loading) return <p className="text-center py-4">Loading...</p>;
    if (error) return <p className="text-red-500 text-center py-4">{error}</p>;

    return (
        <div className="w-96 h-screen p-4 bg-white border-r shadow-md flex overflow-y-auto flex-col">
            <div className="mb-4 flex flex-wrap gap-2">
                {categories.map((category, index) => (
                    <button
                        key={index}
                        onClick={() => handleCategoryChange(category)}
                        className={`px-6 py-1 h-10 w-auto text-sm border rounded-3xl whitespace-nowrap ${selectedCategory === category ? 'bg-blue-400 text-white' : 'bg-white text-gray-700 border-2'}`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="flex-1 p-2">
                <div className="grid grid-cols-2 gap-2">
                    {filteredTemplates.map((template) => (
                        <Image
                            key={template.id}
                            src={template.image_path}
                            alt={`Template ${template.id}`}
                            width={160}
                            height={160}
                            className="h-40 w-40 object-cover cursor-pointer border rounded-md hover:shadow-md"
                            onClick={() => setSelectedImage(template.image_path)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}