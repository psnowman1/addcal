import { EventData } from './types';

function formatDateForGoogle(date: string, time: string): string {
  // Convert YYYY-MM-DD and HH:mm to YYYYMMDDTHHmmss
  const dateClean = date.replace(/-/g, '');
  const timeClean = time.replace(/:/g, '') + '00';
  return `${dateClean}T${timeClean}`;
}

function formatDateForOutlook(date: string, time: string): string {
  // Convert to ISO 8601: YYYY-MM-DDTHH:mm:ss
  return `${date}T${time}:00`;
}

export function generateGoogleCalendarUrl(event: EventData): string {
  const baseUrl = 'https://calendar.google.com/calendar/render';

  const startDateTime = formatDateForGoogle(event.startDate, event.startTime);
  const endDateTime = formatDateForGoogle(event.endDate, event.endTime);

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${startDateTime}/${endDateTime}`,
    details: event.description,
    location: event.location,
    ctz: event.timezone,
  });

  return `${baseUrl}?${params.toString()}`;
}

export function generateOutlookCalendarUrl(event: EventData): string {
  const baseUrl = 'https://outlook.office.com/calendar/deeplink/compose';

  const startDateTime = formatDateForOutlook(event.startDate, event.startTime);
  const endDateTime = formatDateForOutlook(event.endDate, event.endTime);

  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: event.title,
    startdt: startDateTime,
    enddt: endDateTime,
    body: event.description,
    location: event.location,
  });

  return `${baseUrl}?${params.toString()}`;
}
