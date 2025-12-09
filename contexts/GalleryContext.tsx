import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

export interface GalleryItem {
    id: string;
    imageUrl: string;
    title: string;
    description: string;
    createdAt: number;
}

interface GalleryContextType {
    galleryItems: GalleryItem[];
    addGalleryItem: (item: Omit<GalleryItem, 'id' | 'createdAt'>) => void;
    updateGalleryItem: (id: string, item: Partial<Omit<GalleryItem, 'id' | 'createdAt'>>) => void;
    deleteGalleryItem: (id: string) => void;
    getGalleryItem: (id: string) => GalleryItem | undefined;
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

export const GalleryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);

    // Load from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem('gallery_items');
        if (saved) {
            try {
                setGalleryItems(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse saved gallery items");
            }
        }
    }, []);

    const addGalleryItem = (item: Omit<GalleryItem, 'id' | 'createdAt'>) => {
        const newItem: GalleryItem = {
            ...item,
            id: `gallery-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            createdAt: Date.now()
        };
        const newItems = [...galleryItems, newItem];
        setGalleryItems(newItems);
        localStorage.setItem('gallery_items', JSON.stringify(newItems));
    };

    const updateGalleryItem = (id: string, updates: Partial<Omit<GalleryItem, 'id' | 'createdAt'>>) => {
        const newItems = galleryItems.map(item =>
            item.id === id ? { ...item, ...updates } : item
        );
        setGalleryItems(newItems);
        localStorage.setItem('gallery_items', JSON.stringify(newItems));
    };

    const deleteGalleryItem = (id: string) => {
        const newItems = galleryItems.filter(item => item.id !== id);
        setGalleryItems(newItems);
        localStorage.setItem('gallery_items', JSON.stringify(newItems));
    };

    const getGalleryItem = (id: string): GalleryItem | undefined => {
        return galleryItems.find(item => item.id === id);
    };

    return (
        <GalleryContext.Provider value={{ galleryItems, addGalleryItem, updateGalleryItem, deleteGalleryItem, getGalleryItem }}>
            {children}
        </GalleryContext.Provider>
    );
};

export const useGallery = () => {
    const context = useContext(GalleryContext);
    if (context === undefined) {
        throw new Error('useGallery must be used within a GalleryProvider');
    }
    return context;
};
