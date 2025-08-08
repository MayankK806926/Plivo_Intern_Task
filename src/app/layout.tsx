
import * as React from 'react';

import SessionWrapper from '../components/SessionWrapper';
import '../globals.css';
import Header from '../components/Header';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen">
        <SessionWrapper>
          <Header />
          <main className="max-w-2xl mx-auto p-4 mt-8 bg-white rounded-lg shadow-md">
            {children}
          </main>
        </SessionWrapper>
      </body>
    </html>
  );
}
