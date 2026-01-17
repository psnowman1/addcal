'use client';

import { useState } from 'react';
import EventForm from '@/components/EventForm';
import StyleCustomizer from '@/components/StyleCustomizer';
import ButtonPreview from '@/components/ButtonPreview';
import CodeOutput from '@/components/CodeOutput';
import { EventData, ButtonStyle, defaultEventData, defaultButtonStyle } from '@/lib/types';

export default function Home() {
  const [eventData, setEventData] = useState<EventData>(defaultEventData);
  const [buttonStyle, setButtonStyle] = useState<ButtonStyle>(defaultButtonStyle);
  const [activeTab, setActiveTab] = useState<'event' | 'style'>('event');

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Add to Calendar Generator</h1>
          <p className="mt-1 text-sm text-gray-600">
            Create customizable calendar buttons for your webinar thank you pages
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Forms */}
          <div className="space-y-6">
            {/* Tab Navigation */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('event')}
                  className={`flex-1 px-4 py-3 text-sm font-medium ${
                    activeTab === 'event'
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Event Details
                </button>
                <button
                  onClick={() => setActiveTab('style')}
                  className={`flex-1 px-4 py-3 text-sm font-medium ${
                    activeTab === 'style'
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Button Styling
                </button>
              </div>

              <div className="p-6">
                {activeTab === 'event' ? (
                  <EventForm eventData={eventData} onChange={setEventData} />
                ) : (
                  <StyleCustomizer buttonStyle={buttonStyle} onChange={setButtonStyle} />
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Preview & Output */}
          <div className="space-y-6">
            {/* Button Preview */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <ButtonPreview eventData={eventData} buttonStyle={buttonStyle} />
            </div>

            {/* Code Output */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <CodeOutput eventData={eventData} buttonStyle={buttonStyle} />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
          Add to Calendar Generator - Create calendar buttons for Google, Apple, and Outlook
        </div>
      </footer>
    </div>
  );
}
