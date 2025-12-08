import { CalendarEvent } from '../types';

// Helper to parse ICS date string (e.g., 20251124T190000Z)
const parseICSDate = (dtstr: string): Date => {
    if (!dtstr) return new Date();

    const year = parseInt(dtstr.substring(0, 4));
    const month = parseInt(dtstr.substring(4, 6)) - 1;
    const day = parseInt(dtstr.substring(6, 8));

    if (dtstr.length === 8) {
        return new Date(year, month, day);
    }

    const hour = parseInt(dtstr.substring(9, 11));
    const minute = parseInt(dtstr.substring(11, 13));
    const second = parseInt(dtstr.substring(13, 15));

    if (dtstr.endsWith('Z')) {
        return new Date(Date.UTC(year, month, day, hour, minute, second));
    }

    return new Date(year, month, day, hour, minute, second);
};

export const parseICS = (icsData: string): CalendarEvent[] => {
    // 1. Unfold lines (ICS allows splitting long lines with CRLF + space/tab)
    const rawLines = icsData.split(/\r\n|\n|\r/);
    const lines: string[] = [];
    
    for (const line of rawLines) {
        if (line.startsWith(' ') || line.startsWith('\t')) {
            // Append to previous line, removing the leading whitespace
            if (lines.length > 0) {
                lines[lines.length - 1] += line.substring(1);
            }
        } else {
            lines.push(line);
        }
    }

    const events: any[] = [];
    let inEvent = false;
    let currentEvent: any = {};

    for (const line of lines) {
        if (line.startsWith('BEGIN:VEVENT')) {
            inEvent = true;
            currentEvent = {};
        } else if (line.startsWith('END:VEVENT')) {
            inEvent = false;
            if (currentEvent.summary && currentEvent.dtstart) {
                const startDate = parseICSDate(currentEvent.dtstart);
                // Only show future events (or today)
                const now = new Date();
                now.setHours(0, 0, 0, 0);

                if (startDate >= now) {
                    // Clean up description text
                    let cleanDesc = '';
                    if (currentEvent.description) {
                        cleanDesc = currentEvent.description
                            .replace(/\\n/gi, '\n') // Handle both \n and \N
                            .replace(/\\,/g, ',')
                            .replace(/\\;/g, ';')
                            .replace(/\\\\/g, '\\');
                    }

                    events.push({
                        rawDate: startDate,
                        title: currentEvent.summary.replace(/\\,/g, ',').replace(/\\n/g, ' '),
                        location: currentEvent.location ? currentEvent.location.replace(/\\,/g, ',').replace(/\\n/g, ', ') : 'The Hub',
                        description: cleanDesc,
                        date: startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase(),
                        time: currentEvent.isAllDay ? 'All Day' : startDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
                        isAllDay: currentEvent.isAllDay
                    });
                }
            }
        } else if (inEvent) {
            // Split key/value carefully, respecting potential params in key
            const colonIndex = line.indexOf(':');
            if (colonIndex === -1) continue;

            const keyPart = line.substring(0, colonIndex);
            const value = line.substring(colonIndex + 1);

            // Extract pure property name (e.g., DTSTART from DTSTART;VALUE=DATE)
            const propName = keyPart.split(';')[0];

            if (propName === 'SUMMARY') currentEvent.summary = value;
            if (propName === 'LOCATION') currentEvent.location = value;
            if (propName === 'DESCRIPTION') currentEvent.description = value;
            if (propName === 'DTSTART') {
                currentEvent.dtstart = value;
                if (keyPart.includes('VALUE=DATE')) currentEvent.isAllDay = true;
            }
        }
    }

    // Sort by date
    return events.sort((a, b) => a.rawDate.getTime() - b.rawDate.getTime());
};

export const fetchCalendarEvents = async (): Promise<CalendarEvent[]> => {
    const calendarId = 'mmvpsnrd4lb1ibgjrdgg9e00p4@group.calendar.google.com';
    const icalUrl = `https://calendar.google.com/calendar/ical/${encodeURIComponent(calendarId)}/public/basic.ics`;
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(icalUrl)}`;

    try {
        const response = await fetch(proxyUrl);
        if (response.ok) {
            const icsData = await response.text();
            return parseICS(icsData);
        } else {
            console.error("Failed to fetch ICS data:", response.status, response.statusText);
            return [];
        }
    } catch (error) {
        console.warn("Could not fetch Google Calendar events (ICS), using fallback.", error);
        return [];
    }
};