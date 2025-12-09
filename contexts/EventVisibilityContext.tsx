import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { CalendarEvent } from '../types';

interface EventVisibilityState {
    [eventId: string]: boolean; // true = visible, false = hidden
}

interface EventVisibilityContextType {
    eventVisibility: EventVisibilityState;
    toggleEventVisibility: (eventId: string) => void;
    isEventVisible: (eventId: string) => boolean;
}

const EventVisibilityContext = createContext<EventVisibilityContextType | undefined>(undefined);

export const EventVisibilityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [eventVisibility, setEventVisibility] = useState<EventVisibilityState>({});

    // Load from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem('event_visibility');
        if (saved) {
            try {
                setEventVisibility(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse saved event visibility");
            }
        }
    }, []);

    const toggleEventVisibility = (eventId: string) => {
        const newVisibility = {
            ...eventVisibility,
            [eventId]: !eventVisibility[eventId]
        };
        setEventVisibility(newVisibility);
        localStorage.setItem('event_visibility', JSON.stringify(newVisibility));
    };

    const isEventVisible = (eventId: string): boolean => {
        // Default to visible if not set
        return eventVisibility[eventId] !== false;
    };

    return (
        <EventVisibilityContext.Provider value={{ eventVisibility, toggleEventVisibility, isEventVisible }}>
            {children}
        </EventVisibilityContext.Provider>
    );
};

export const useEventVisibility = () => {
    const context = useContext(EventVisibilityContext);
    if (context === undefined) {
        throw new Error('useEventVisibility must be used within an EventVisibilityProvider');
    }
    return context;
};
