import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface EventButtonConfig {
    registerUrl?: string;
    bookSeatsUrl?: string;
}

interface EventButtonsState {
    [eventId: string]: EventButtonConfig;
}

interface EventButtonsContextType {
    eventButtons: EventButtonsState;
    setRegisterUrl: (eventId: string, url: string) => void;
    setBookSeatsUrl: (eventId: string, url: string) => void;
    getRegisterUrl: (eventId: string) => string | undefined;
    getBookSeatsUrl: (eventId: string) => string | undefined;
}

const EventButtonsContext = createContext<EventButtonsContextType | undefined>(undefined);

export const EventButtonsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [eventButtons, setEventButtons] = useState<EventButtonsState>({});

    // Load from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem('event_buttons');
        if (saved) {
            try {
                setEventButtons(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse saved event buttons");
            }
        }
    }, []);

    const setRegisterUrl = (eventId: string, url: string) => {
        const newButtons = {
            ...eventButtons,
            [eventId]: {
                ...eventButtons[eventId],
                registerUrl: url
            }
        };
        setEventButtons(newButtons);
        localStorage.setItem('event_buttons', JSON.stringify(newButtons));
    };

    const setBookSeatsUrl = (eventId: string, url: string) => {
        const newButtons = {
            ...eventButtons,
            [eventId]: {
                ...eventButtons[eventId],
                bookSeatsUrl: url
            }
        };
        setEventButtons(newButtons);
        localStorage.setItem('event_buttons', JSON.stringify(newButtons));
    };

    const getRegisterUrl = (eventId: string): string | undefined => {
        return eventButtons[eventId]?.registerUrl;
    };

    const getBookSeatsUrl = (eventId: string): string | undefined => {
        return eventButtons[eventId]?.bookSeatsUrl;
    };

    return (
        <EventButtonsContext.Provider value={{ eventButtons, setRegisterUrl, setBookSeatsUrl, getRegisterUrl, getBookSeatsUrl }}>
            {children}
        </EventButtonsContext.Provider>
    );
};

export const useEventButtons = () => {
    const context = useContext(EventButtonsContext);
    if (context === undefined) {
        throw new Error('useEventButtons must be used within an EventButtonsProvider');
    }
    return context;
};
