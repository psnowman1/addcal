export interface EventData {
  title: string;
  description: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  timezone: string;
  location: string;
}

export interface ButtonStyle {
  googleBgColor: string;
  googleTextColor: string;
  googleLabel: string;
  appleBgColor: string;
  appleTextColor: string;
  appleLabel: string;
  outlookBgColor: string;
  outlookTextColor: string;
  outlookLabel: string;
  fontSize: number;
  fontFamily: string;
  borderRadius: number;
  paddingX: number;
  paddingY: number;
  showIcons: boolean;
  layout: 'horizontal' | 'vertical';
}

export const defaultEventData: EventData = {
  title: '',
  description: '',
  startDate: '',
  startTime: '',
  endDate: '',
  endTime: '',
  timezone: 'America/New_York',
  location: '',
};

export const defaultButtonStyle: ButtonStyle = {
  googleBgColor: '#4285f4',
  googleTextColor: '#ffffff',
  googleLabel: 'Add to Google Calendar',
  appleBgColor: '#000000',
  appleTextColor: '#ffffff',
  appleLabel: 'Add to Apple Calendar',
  outlookBgColor: '#0078d4',
  outlookTextColor: '#ffffff',
  outlookLabel: 'Add to Outlook',
  fontSize: 14,
  fontFamily: 'system-ui, -apple-system, sans-serif',
  borderRadius: 8,
  paddingX: 24,
  paddingY: 12,
  showIcons: true,
  layout: 'horizontal',
};

export const timezones = [
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'America/Chicago', label: 'Central Time (CT)' },
  { value: 'America/Denver', label: 'Mountain Time (MT)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'America/Anchorage', label: 'Alaska Time (AKT)' },
  { value: 'Pacific/Honolulu', label: 'Hawaii Time (HT)' },
  { value: 'Europe/London', label: 'London (GMT/BST)' },
  { value: 'Europe/Paris', label: 'Central European (CET)' },
  { value: 'Europe/Berlin', label: 'Berlin (CET)' },
  { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
  { value: 'Asia/Shanghai', label: 'China (CST)' },
  { value: 'Asia/Singapore', label: 'Singapore (SGT)' },
  { value: 'Australia/Sydney', label: 'Sydney (AEST)' },
  { value: 'UTC', label: 'UTC' },
];
