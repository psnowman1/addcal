'use client';

import { useState } from 'react';
import { EventData, ButtonStyle } from '@/lib/types';
import { generateGoogleCalendarUrl, generateOutlookCalendarUrl, generateAppleCalendarUrl } from '@/lib/calendar-urls';
import { generateIcsDataUrl } from '@/lib/ics-generator';

interface CodeOutputProps {
  eventData: EventData;
  buttonStyle: ButtonStyle;
}

const googleIconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style="vertical-align:middle;margin-right:8px;"><path d="M19 4H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H5V9h14v9zM7 11h5v5H7v-5z"/></svg>`;

const appleIconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style="vertical-align:middle;margin-right:8px;"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>`;

const outlookIconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style="vertical-align:middle;margin-right:8px;"><path d="M7.88 12.04q0 .45-.11.87-.1.41-.33.74-.22.33-.58.52-.37.2-.87.2t-.85-.2q-.35-.21-.57-.55-.22-.33-.33-.75-.1-.42-.1-.86t.1-.87q.1-.43.34-.76.22-.34.59-.54.36-.2.87-.2t.86.2q.35.21.57.55.22.34.31.77.1.43.1.88zM24 12v9.38q0 .46-.33.8-.33.32-.8.32H7.13q-.46 0-.8-.33-.32-.33-.32-.8V18H1q-.41 0-.7-.3-.3-.29-.3-.7V7q0-.41.3-.7Q.58 6 1 6h6.5V2.55q0-.44.3-.75.3-.3.75-.3h12.9q.44 0 .75.3.3.3.3.75V12zm-6-8.25v3h3v-3zm0 4.5v3h3v-3zm0 4.5v1.83l3.05-1.83zm-5.25-9v3h3.75v-3zm0 4.5v3h3.75v-3zm0 4.5v2.03l2.41 1.5 1.34-.8v-2.73zM9 3.75V6h2l.13.01.12.04v-2.3zM5.98 15.98q.9 0 1.6-.3.7-.32 1.19-.86.48-.55.73-1.28.25-.74.25-1.61 0-.83-.25-1.55-.24-.71-.71-1.24t-1.15-.83q-.68-.3-1.55-.3-.92 0-1.64.3-.71.3-1.2.85-.5.54-.75 1.3-.25.74-.25 1.63 0 .85.26 1.56.26.72.74 1.23.48.52 1.17.81.69.3 1.56.3zM7.5 21h12.39L12 16.08V17q0 .41-.3.7-.29.3-.7.3H7.5zm15-.13v-7.24l-5.9 3.54Z"/></svg>`;

export default function CodeOutput({ eventData, buttonStyle }: CodeOutputProps) {
  const [copied, setCopied] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [outputMode, setOutputMode] = useState<'urls' | 'html'>('urls');
  const [deployedUrl, setDeployedUrl] = useState('');

  const isValid = eventData.title && eventData.startDate && eventData.startTime && eventData.endDate && eventData.endTime;

  const googleUrl = isValid ? generateGoogleCalendarUrl(eventData) : '';
  const outlookUrl = isValid ? generateOutlookCalendarUrl(eventData) : '';

  // Generate Apple URL - use deployed URL if provided, otherwise show localhost for preview
  const baseUrl = deployedUrl.trim() || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');
  const appleUrl = isValid ? generateAppleCalendarUrl(eventData, baseUrl) : '';

  // Keep data URL for local preview/testing
  const icsDataUrl = isValid ? generateIcsDataUrl(eventData) : '';

  const generateHtml = (): string => {
    if (!isValid) return '';

    const baseStyle = `display:inline-flex;align-items:center;justify-content:center;gap:8px;font-family:${buttonStyle.fontFamily};font-size:${buttonStyle.fontSize}px;font-weight:500;border-radius:${buttonStyle.borderRadius}px;padding:${buttonStyle.paddingY}px ${buttonStyle.paddingX}px;text-decoration:none;border:none;cursor:pointer;`;

    const containerDirection = buttonStyle.layout === 'vertical' ? 'flex-direction:column;' : 'flex-direction:row;flex-wrap:wrap;';

    const googleIcon = buttonStyle.showIcons ? googleIconSvg : '';
    const appleIcon = buttonStyle.showIcons ? appleIconSvg : '';
    const outlookIcon = buttonStyle.showIcons ? outlookIconSvg : '';

    // Use the API URL for Apple in HTML output
    const appleHref = deployedUrl.trim() ? appleUrl : icsDataUrl;
    const appleDownload = deployedUrl.trim() ? '' : ' download="event.ics"';

    const html = `<div style="display:flex;${containerDirection}gap:12px;">
  <a href="${googleUrl}" target="_blank" rel="noopener noreferrer" style="${baseStyle}background-color:${buttonStyle.googleBgColor};color:${buttonStyle.googleTextColor};">${googleIcon}${buttonStyle.googleLabel}</a>
  <a href="${appleHref}"${appleDownload} style="${baseStyle}background-color:${buttonStyle.appleBgColor};color:${buttonStyle.appleTextColor};">${appleIcon}${buttonStyle.appleLabel}</a>
  <a href="${outlookUrl}" target="_blank" rel="noopener noreferrer" style="${baseStyle}background-color:${buttonStyle.outlookBgColor};color:${buttonStyle.outlookTextColor};">${outlookIcon}${buttonStyle.outlookLabel}</a>
</div>`;

    return html;
  };

  const handleCopyHtml = async () => {
    const html = generateHtml();
    await navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyUrl = async (url: string, type: string) => {
    await navigator.clipboard.writeText(url);
    setCopiedUrl(type);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  if (!isValid) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Output</h2>
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-500 text-sm">
            Fill in the required event details to generate links
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Output</h2>
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setOutputMode('urls')}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
              outputMode === 'urls'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Direct URLs
          </button>
          <button
            onClick={() => setOutputMode('html')}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
              outputMode === 'html'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            HTML Code
          </button>
        </div>
      </div>

      {outputMode === 'urls' ? (
        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            Copy these URLs and paste them as button links in Perspective or any landing page builder.
          </p>

          {/* Google Calendar URL */}
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Google Calendar</span>
              <button
                onClick={() => handleCopyUrl(googleUrl, 'google')}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                  copiedUrl === 'google'
                    ? 'bg-green-500 text-white'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {copiedUrl === 'google' ? 'Copied!' : 'Copy URL'}
              </button>
            </div>
            <input
              type="text"
              readOnly
              value={googleUrl}
              className="w-full px-2 py-1.5 text-xs bg-white border border-gray-300 rounded font-mono text-gray-700"
            />
          </div>

          {/* Outlook URL */}
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Outlook</span>
              <button
                onClick={() => handleCopyUrl(outlookUrl, 'outlook')}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                  copiedUrl === 'outlook'
                    ? 'bg-green-500 text-white'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {copiedUrl === 'outlook' ? 'Copied!' : 'Copy URL'}
              </button>
            </div>
            <input
              type="text"
              readOnly
              value={outlookUrl}
              className="w-full px-2 py-1.5 text-xs bg-white border border-gray-300 rounded font-mono text-gray-700"
            />
          </div>

          {/* Apple Calendar URL */}
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Apple Calendar</span>
              <button
                onClick={() => handleCopyUrl(appleUrl, 'apple')}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                  copiedUrl === 'apple'
                    ? 'bg-green-500 text-white'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {copiedUrl === 'apple' ? 'Copied!' : 'Copy URL'}
              </button>
            </div>
            <div className="mb-2">
              <label className="block text-xs text-gray-500 mb-1">
                Your deployed URL (e.g., https://addcal.vercel.app)
              </label>
              <input
                type="text"
                value={deployedUrl}
                onChange={(e) => setDeployedUrl(e.target.value)}
                placeholder="https://your-app.vercel.app"
                className="w-full px-2 py-1.5 text-xs bg-white border border-gray-300 rounded font-mono text-gray-700"
              />
            </div>
            <input
              type="text"
              readOnly
              value={appleUrl}
              className="w-full px-2 py-1.5 text-xs bg-white border border-gray-300 rounded font-mono text-gray-700"
            />
            {!deployedUrl.trim() && (
              <p className="text-xs text-amber-600 mt-2">
                Enter your deployed URL above to get a working Apple Calendar link. The URL shown uses localhost which only works locally.
              </p>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-end">
            <button
              onClick={handleCopyHtml}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                copied
                  ? 'bg-green-500 text-white'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {copied ? 'Copied!' : 'Copy HTML'}
            </button>
          </div>

          {!deployedUrl.trim() && (
            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
              <label className="block text-xs text-amber-700 mb-1">
                Enter your deployed URL for Apple Calendar to work:
              </label>
              <input
                type="text"
                value={deployedUrl}
                onChange={(e) => setDeployedUrl(e.target.value)}
                placeholder="https://your-app.vercel.app"
                className="w-full px-2 py-1.5 text-xs bg-white border border-amber-300 rounded font-mono text-gray-700"
              />
            </div>
          )}

          <div className="relative">
            <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm">
              <code>{generateHtml()}</code>
            </pre>
          </div>

          <p className="text-xs text-gray-500">
            This HTML is self-contained with inline styles. Paste it directly into your landing page.
          </p>
        </>
      )}
    </div>
  );
}
