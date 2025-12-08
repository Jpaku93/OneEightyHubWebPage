import React from 'react';

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  image: string;
  description?: string;
  time?: string;
  ticketLink?: string;
}

export interface CalendarEvent {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  rawDate: Date;
  image?: string;
  isAllDay?: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface Testimony {
  id: string;
  name: string;
  handle: string;
  text: string;
  avatar: string;
}

export interface Ministry {
  id: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  longDesc: string;
  roles: string[];
  whoFor: string;
  colorClass: string;
  textAccent: string;
  image: string;
}

export enum NavItem {
  HOME = 'HOME',
  HUB = 'HUB',
  ABOUT = 'ABOUT',
  ADMIN = 'ADMIN'
}