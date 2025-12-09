import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface EventPostersState {
    [eventId: string]: string; // eventId -> posterUrl
}

interface EventPostersContextType {
    eventPosters: EventPostersState;
    setPosterUrl: (eventId: string, url: string) => void;
    getPosterUrl: (eventId: string) => string | undefined;
}

const EventPostersContext = createContext<EventPostersContextType | undefined>(undefined);

export const EventPostersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [eventPosters, setEventPosters] = useState<EventPostersState>({});

    // Load from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem('event_posters');
        if (saved) {
            try {
                setEventPosters(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse saved event posters");
            }
        }
    }, []);

    const setPosterUrl = (eventId: string, url: string) => {
        const newPosters = {
            ...eventPosters,
            [eventId]: url
        };
        setEventPosters(newPosters);
        localStorage.setItem('event_posters', JSON.stringify(newPosters));
    };

    const getPosterUrl = (eventId: string): string | undefined => {
        return eventPosters[eventId];
    };

    return (
        <EventPostersContext.Provider value={{ eventPosters, setPosterUrl, getPosterUrl }}>
            {children}
        </EventPostersContext.Provider>
    );
};

export const useEventPosters = () => {
    const context = useContext(EventPostersContext);
    if (context === undefined) {
        throw new Error('useEventPosters must be used within an EventPostersProvider');
    }
    return context;
};
