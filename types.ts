export interface Event {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    image: string;
    description?: string;
    ticketLink?: string;
}

export interface CalendarEvent {
    title: string;
    date: string;
    time: string;
    location: string;
    description?: string;
}

export enum NavItem {
    HOME = 'HOME',
    HUB = 'HUB',
    ABOUT = 'ABOUT',
    ADMIN = 'ADMIN'
}

export interface Ministry {
    id: string;
    title: string;
    description: string;
    image: string;
    link?: string;
}

export interface Story {
    id: string;
    name: string;
    story: string;
    image: string;
    date?: string;
}

export interface Testimony {
    id: string;
    name: string;
    handle: string;
    text: string;
    avatar: string;
}
