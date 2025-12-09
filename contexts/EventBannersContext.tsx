import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface EventBannersState {
    [eventId: string]: string; // eventId -> bannerUrl
}

interface EventBannersContextType {
    eventBanners: EventBannersState;
    setBannerUrl: (eventId: string, url: string) => void;
    getBannerUrl: (eventId: string) => string | undefined;
}

const EventBannersContext = createContext<EventBannersContextType | undefined>(undefined);

export const EventBannersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [eventBanners, setEventBanners] = useState<EventBannersState>({});

    // Load from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem('event_banners');
        if (saved) {
            try {
                setEventBanners(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse saved event banners");
            }
        }
    }, []);

    const setBannerUrl = (eventId: string, url: string) => {
        const newBanners = {
            ...eventBanners,
            [eventId]: url
        };
        setEventBanners(newBanners);
        localStorage.setItem('event_banners', JSON.stringify(newBanners));
    };

    const getBannerUrl = (eventId: string): string | undefined => {
        return eventBanners[eventId];
    };

    return (
        <EventBannersContext.Provider value={{ eventBanners, setBannerUrl, getBannerUrl }}>
            {children}
        </EventBannersContext.Provider>
    );
};

export const useEventBanners = () => {
    const context = useContext(EventBannersContext);
    if (context === undefined) {
        throw new Error('useEventBanners must be used within an EventBannersProvider');
    }
    return context;
};
