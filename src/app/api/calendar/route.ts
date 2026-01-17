import { NextRequest, NextResponse } from 'next/server';

function escapeIcsText(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

function formatDateForIcs(date: string, time: string): string {
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

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const title = searchParams.get('title') || 'Event';
  const description = searchParams.get('desc') || '';
  const startDate = searchParams.get('startDate') || '';
  const startTime = searchParams.get('startTime') || '';
  const endDate = searchParams.get('endDate') || '';
  const endTime = searchParams.get('endTime') || '';
  const timezone = searchParams.get('tz') || 'America/New_York';
  const location = searchParams.get('location') || '';

  if (!startDate || !startTime || !endDate || !endTime) {
    return NextResponse.json(
      { error: 'Missing required parameters: startDate, startTime, endDate, endTime' },
      { status: 400 }
    );
  }

  const startDateTime = formatDateForIcs(startDate, startTime);
  const endDateTime = formatDateForIcs(endDate, endTime);
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
    `DTSTART;TZID=${timezone}:${startDateTime}`,
    `DTEND;TZID=${timezone}:${endDateTime}`,
    `SUMMARY:${escapeIcsText(title)}`,
    `DESCRIPTION:${escapeIcsText(description)}`,
    `LOCATION:${escapeIcsText(location)}`,
    `URL:${location}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  const icsContent = lines.join('\r\n');

  return new NextResponse(icsContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="event.ics"',
    },
  });
}
