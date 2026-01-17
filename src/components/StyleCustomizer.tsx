'use client';

import { ButtonStyle } from '@/lib/types';

interface StyleCustomizerProps {
  buttonStyle: ButtonStyle;
  onChange: (style: ButtonStyle) => void;
}

const fontOptions = [
  { value: 'system-ui, -apple-system, sans-serif', label: 'System Default' },
  { value: 'Arial, Helvetica, sans-serif', label: 'Arial' },
  { value: 'Georgia, serif', label: 'Georgia' },
  { value: '"Segoe UI", Roboto, sans-serif', label: 'Segoe UI' },
  { value: 'Verdana, sans-serif', label: 'Verdana' },
];

export default function StyleCustomizer({ buttonStyle, onChange }: StyleCustomizerProps) {
  const handleChange = <K extends keyof ButtonStyle>(field: K, value: ButtonStyle[K]) => {
    onChange({ ...buttonStyle, [field]: value });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-900">Button Styling</h2>

      {/* Google Button */}
      <div className="p-4 bg-gray-50 rounded-lg space-y-3">
        <h3 className="font-medium text-gray-800">Google Calendar Button</h3>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Label</label>
          <input
            type="text"
            value={buttonStyle.googleLabel}
            onChange={(e) => handleChange('googleLabel', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Background</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={buttonStyle.googleBgColor}
                onChange={(e) => handleChange('googleBgColor', e.target.value)}
                className="w-10 h-10 rounded cursor-pointer"
              />
              <input
                type="text"
                value={buttonStyle.googleBgColor}
                onChange={(e) => handleChange('googleBgColor', e.target.value)}
                className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Text Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={buttonStyle.googleTextColor}
                onChange={(e) => handleChange('googleTextColor', e.target.value)}
                className="w-10 h-10 rounded cursor-pointer"
              />
              <input
                type="text"
                value={buttonStyle.googleTextColor}
                onChange={(e) => handleChange('googleTextColor', e.target.value)}
                className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Apple Button */}
      <div className="p-4 bg-gray-50 rounded-lg space-y-3">
        <h3 className="font-medium text-gray-800">Apple Calendar Button</h3>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Label</label>
          <input
            type="text"
            value={buttonStyle.appleLabel}
            onChange={(e) => handleChange('appleLabel', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Background</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={buttonStyle.appleBgColor}
                onChange={(e) => handleChange('appleBgColor', e.target.value)}
                className="w-10 h-10 rounded cursor-pointer"
              />
              <input
                type="text"
                value={buttonStyle.appleBgColor}
                onChange={(e) => handleChange('appleBgColor', e.target.value)}
                className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Text Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={buttonStyle.appleTextColor}
                onChange={(e) => handleChange('appleTextColor', e.target.value)}
                className="w-10 h-10 rounded cursor-pointer"
              />
              <input
                type="text"
                value={buttonStyle.appleTextColor}
                onChange={(e) => handleChange('appleTextColor', e.target.value)}
                className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Outlook Button */}
      <div className="p-4 bg-gray-50 rounded-lg space-y-3">
        <h3 className="font-medium text-gray-800">Outlook Button</h3>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Label</label>
          <input
            type="text"
            value={buttonStyle.outlookLabel}
            onChange={(e) => handleChange('outlookLabel', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Background</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={buttonStyle.outlookBgColor}
                onChange={(e) => handleChange('outlookBgColor', e.target.value)}
                className="w-10 h-10 rounded cursor-pointer"
              />
              <input
                type="text"
                value={buttonStyle.outlookBgColor}
                onChange={(e) => handleChange('outlookBgColor', e.target.value)}
                className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Text Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={buttonStyle.outlookTextColor}
                onChange={(e) => handleChange('outlookTextColor', e.target.value)}
                className="w-10 h-10 rounded cursor-pointer"
              />
              <input
                type="text"
                value={buttonStyle.outlookTextColor}
                onChange={(e) => handleChange('outlookTextColor', e.target.value)}
                className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Global Styles */}
      <div className="p-4 bg-blue-50 rounded-lg space-y-4">
        <h3 className="font-medium text-gray-800">Global Styles</h3>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Font Family</label>
          <select
            value={buttonStyle.fontFamily}
            onChange={(e) => handleChange('fontFamily', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            {fontOptions.map((font) => (
              <option key={font.value} value={font.value}>
                {font.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Font Size: {buttonStyle.fontSize}px
          </label>
          <input
            type="range"
            min="10"
            max="24"
            value={buttonStyle.fontSize}
            onChange={(e) => handleChange('fontSize', parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Border Radius: {buttonStyle.borderRadius}px
          </label>
          <input
            type="range"
            min="0"
            max="30"
            value={buttonStyle.borderRadius}
            onChange={(e) => handleChange('borderRadius', parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Padding X: {buttonStyle.paddingX}px
            </label>
            <input
              type="range"
              min="8"
              max="48"
              value={buttonStyle.paddingX}
              onChange={(e) => handleChange('paddingX', parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Padding Y: {buttonStyle.paddingY}px
            </label>
            <input
              type="range"
              min="4"
              max="24"
              value={buttonStyle.paddingY}
              onChange={(e) => handleChange('paddingY', parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={buttonStyle.showIcons}
              onChange={(e) => handleChange('showIcons', e.target.checked)}
              className="rounded"
            />
            Show Icons
          </label>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Layout</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="layout"
                checked={buttonStyle.layout === 'horizontal'}
                onChange={() => handleChange('layout', 'horizontal')}
              />
              Horizontal
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="layout"
                checked={buttonStyle.layout === 'vertical'}
                onChange={() => handleChange('layout', 'vertical')}
              />
              Vertical
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
