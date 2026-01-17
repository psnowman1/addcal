'use client';

import { EventData, ButtonStyle } from '@/lib/types';
import { generateGoogleCalendarUrl, generateOutlookCalendarUrl, generateAppleCalendarUrl } from '@/lib/calendar-urls';

interface ButtonPreviewProps {
  eventData: EventData;
  buttonStyle: ButtonStyle;
}

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 4H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H5V9h14v9zM7 11h5v5H7v-5z"/>
  </svg>
);

const AppleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

const OutlookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7.88 12.04q0 .45-.11.87-.1.41-.33.74-.22.33-.58.52-.37.2-.87.2t-.85-.2q-.35-.21-.57-.55-.22-.33-.33-.75-.1-.42-.1-.86t.1-.87q.1-.43.34-.76.22-.34.59-.54.36-.2.87-.2t.86.2q.35.21.57.55.22.34.31.77.1.43.1.88zM24 12v9.38q0 .46-.33.8-.33.32-.8.32H7.13q-.46 0-.8-.33-.32-.33-.32-.8V18H1q-.41 0-.7-.3-.3-.29-.3-.7V7q0-.41.3-.7Q.58 6 1 6h6.5V2.55q0-.44.3-.75.3-.3.75-.3h12.9q.44 0 .75.3.3.3.3.75V12zm-6-8.25v3h3v-3zm0 4.5v3h3v-3zm0 4.5v1.83l3.05-1.83zm-5.25-9v3h3.75v-3zm0 4.5v3h3.75v-3zm0 4.5v2.03l2.41 1.5 1.34-.8v-2.73zM9 3.75V6h2l.13.01.12.04v-2.3zM5.98 15.98q.9 0 1.6-.3.7-.32 1.19-.86.48-.55.73-1.28.25-.74.25-1.61 0-.83-.25-1.55-.24-.71-.71-1.24t-1.15-.83q-.68-.3-1.55-.3-.92 0-1.64.3-.71.3-1.2.85-.5.54-.75 1.3-.25.74-.25 1.63 0 .85.26 1.56.26.72.74 1.23.48.52 1.17.81.69.3 1.56.3zM7.5 21h12.39L12 16.08V17q0 .41-.3.7-.29.3-.7.3H7.5zm15-.13v-7.24l-5.9 3.54Z"/>
  </svg>
);

export default function ButtonPreview({ eventData, buttonStyle }: ButtonPreviewProps) {
  const isValid = eventData.title && eventData.startDate && eventData.startTime && eventData.endDate && eventData.endTime;

  const baseButtonStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontFamily: buttonStyle.fontFamily,
    fontSize: `${buttonStyle.fontSize}px`,
    fontWeight: 500,
    borderRadius: `${buttonStyle.borderRadius}px`,
    padding: `${buttonStyle.paddingY}px ${buttonStyle.paddingX}px`,
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
  };

  const googleButtonStyle: React.CSSProperties = {
    ...baseButtonStyle,
    backgroundColor: buttonStyle.googleBgColor,
    color: buttonStyle.googleTextColor,
  };

  const appleButtonStyle: React.CSSProperties = {
    ...baseButtonStyle,
    backgroundColor: buttonStyle.appleBgColor,
    color: buttonStyle.appleTextColor,
  };

  const outlookButtonStyle: React.CSSProperties = {
    ...baseButtonStyle,
    backgroundColor: buttonStyle.outlookBgColor,
    color: buttonStyle.outlookTextColor,
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: buttonStyle.layout === 'vertical' ? 'column' : 'row',
    gap: '12px',
    flexWrap: 'wrap',
  };

  if (!isValid) {
    return (
      <div className="p-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 text-center">
        <p className="text-gray-500">
          Fill in the event details to see the button preview
        </p>
      </div>
    );
  }

  const googleUrl = generateGoogleCalendarUrl(eventData);
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
  const appleUrl = generateAppleCalendarUrl(eventData, baseUrl);
  const outlookUrl = generateOutlookCalendarUrl(eventData);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Live Preview</h2>
      <p className="text-sm text-gray-500">These buttons are functional - try them!</p>

      <div className="p-8 bg-white rounded-lg border border-gray-200 flex items-center justify-center">
        <div style={containerStyle}>
          <a
            href={googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={googleButtonStyle}
            onMouseOver={(e) => (e.currentTarget.style.opacity = '0.9')}
            onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
          >
            {buttonStyle.showIcons && <GoogleIcon />}
            {buttonStyle.googleLabel}
          </a>

          <a
            href={appleUrl}
            style={appleButtonStyle}
            onMouseOver={(e) => (e.currentTarget.style.opacity = '0.9')}
            onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
          >
            {buttonStyle.showIcons && <AppleIcon />}
            {buttonStyle.appleLabel}
          </a>

          <a
            href={outlookUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={outlookButtonStyle}
            onMouseOver={(e) => (e.currentTarget.style.opacity = '0.9')}
            onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
          >
            {buttonStyle.showIcons && <OutlookIcon />}
            {buttonStyle.outlookLabel}
          </a>
        </div>
      </div>
    </div>
  );
}
