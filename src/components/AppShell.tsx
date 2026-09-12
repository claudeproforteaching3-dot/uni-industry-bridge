'use client';

import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ChatbotWidget } from './ChatbotWidget';

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-blue-500 selection:text-white">
      <Navbar onOpenChat={() => setIsChatOpen(true)} />
      <main className="flex-1">{children}</main>
      <Footer />
      <ChatbotWidget
        isOpen={isChatOpen}
        onOpen={() => setIsChatOpen(true)}
        onClose={() => setIsChatOpen(false)}
      />
    </div>
  );
};
