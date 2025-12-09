import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface ImageState {
  [key: string]: {
    [key: string]: string;
  };
}

const defaultImages: ImageState = {
  hero: {
    background: '/images/hero-background.jpg',
    abstract: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  events: {
    default: 'https://images.unsplash.com/photo-1506459225024-1428097a7e18?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    ticket_link: ''
  },
  hub: {
    main: '/images/OneEigthHub.jpg'
  },
  community: {
    grid1: '/images/crew.jpg',
    grid2: '/images/crew2.jpg',
    grid3: '/images/crew3.jpg',
    grid4: '/images/crew4.jpg'
  },
  hubPage: {
    heroBg: 'https://images.unsplash.com/photo-1524601500432-1e1a4c71d692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    merch1: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    merch2: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    merch3: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ctaBg: 'https://www.transparenttextures.com/patterns/concrete-wall.png'
  },
  about: {
    heroBg: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    ctaBg: 'https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    min_worship: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    min_band: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    min_digital: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    min_concerts: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    min_outreach: 'https://images.unsplash.com/photo-1472289065668-ce650ac443b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    min_altar: 'https://images.unsplash.com/photo-1629235738879-19969018e6c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    min_bible: 'https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    min_homes: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    min_hub: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
};

interface ImageContextType {
  images: ImageState;
  updateImage: (section: string, key: string, url: string) => void;
  resetImages: () => void;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [images, setImages] = useState<ImageState>(defaultImages);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('site_images');
    if (saved) {
      try {
        setImages({ ...defaultImages, ...JSON.parse(saved) });
      } catch (e) {
        console.error("Failed to parse saved images");
      }
    }
  }, []);

  const updateImage = (section: string, key: string, url: string) => {
    const newImages = {
      ...images,
      [section]: {
        ...images[section],
        [key]: url
      }
    };
    setImages(newImages);
    localStorage.setItem('site_images', JSON.stringify(newImages));
  };

  const resetImages = () => {
    setImages(defaultImages);
    localStorage.removeItem('site_images');
  }

  return (
    <ImageContext.Provider value={{ images, updateImage, resetImages }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImages = () => {
  const context = useContext(ImageContext);
  if (context === undefined) {
    throw new Error('useImages must be used within an ImageProvider');
  }
  return context;
};