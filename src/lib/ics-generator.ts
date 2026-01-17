import { EventData } from './types';

function escapeIcsText(text: string): string {
  // Escape special characters per RFC 5545
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

function formatDateForIcs(date: string, time: string): string {
  // Convert YYYY-MM-DD and HH:mm to YYYYMMDDTHHmmss
  const dateClean = date.replace(/-/g, '');
  const timeClean = time.replace(/:/g, '') + '00';
  return `${dateClean}T${timeClean}`;
}

function generateUid(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}@addcal`;
}

function formatTimestamp(): string {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, '0');
  const day = String(now.getUTCDate()).padStart(2, '0');
  const hours = String(now.getUTCHours()).padStart(2, '0');
  const minutes = String(now.getUTCMinutes()).padStart(2, '0');
  const seconds = String(now.getUTCSeconds()).padStart(2, '0');
  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
}

export function generateIcsContent(event: EventData): string {
  const startDateTime = formatDateForIcs(event.startDate, event.startTime);
  const endDateTime = formatDateForIcs(event.endDate, event.endTime);
  const uid = generateUid();
  const dtstamp = formatTimestamp();

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//AddCal Generator//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART;TZID=${event.timezone}:${startDateTime}`,
    `DTEND;TZID=${event.timezone}:${endDateTime}`,
    `SUMMARY:${escapeIcsText(event.title)}`,
    `DESCRIPTION:${escapeIcsText(event.description)}`,
    `LOCATION:${escapeIcsText(event.location)}`,
    `URL:${event.location}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  return lines.join('\r\n');
}

export function generateIcsDataUrl(event: EventData): string {
  const icsContent = generateIcsContent(event);
  const encoded = encodeURIComponent(icsContent);
  return `data:text/calendar;charset=utf-8,${encoded}`;
}
