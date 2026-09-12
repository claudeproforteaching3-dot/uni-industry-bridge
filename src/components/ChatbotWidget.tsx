'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  ExternalLink,
  ChevronRight,
  RotateCcw,
  Minimize2,
  Maximize2,
} from 'lucide-react';
import { generateChatbotReply } from '@/lib/chatbot-engine';
import { ChatMessage } from '@/lib/types';

interface ChatbotWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({ isOpen, onClose, onOpen }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: "👋 Hello! I am **EduTrust Assistant**, your AI guide to the University-Industry Linkage & Outcomes Portal.\n\nAsk me anything about **Program Structure**, **PLOs & CLOs**, **Credit distributions**, **Student Projects by Year**, **Internship/Research profiles**, or **Industry recruitment**!",
      timestamp: 'Just now',
      suggestedActions: [
        { label: 'Show Curriculum & Credits', query: 'Show me the program structure and credits' },
        { label: 'Explain PLO & CLO Mappings', query: 'What are the PLOs and CLOs?' },
        { label: 'Browse 2026 Student Projects', query: 'Show me 2026 student projects' },
        { label: 'Public Trust & Accreditation', query: 'What is the accreditation status and public trust?' },
        { label: 'How to recruit / post a job?', query: 'How can our company recruit students or post an announcement?' },
      ],
    },
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // Simulate realistic AI generation latency
    setTimeout(() => {
      const reply = generateChatbotReply(text);
      const botMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        sender: 'assistant',
        text: reply.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: reply.suggestedActions,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleReset = () => {
    setMessages([
      {
        id: `init-${Date.now()}`,
        sender: 'assistant',
        text: "Conversation reset. How can I assist you with curriculum structures, public trust, student talent, or industry postings today?",
        timestamp: 'Just now',
        suggestedActions: [
          { label: 'Program Structure & Credits', query: 'Show me the program structure and credits' },
          { label: 'Explore PLOs & CLOs', query: 'What are the PLOs and CLOs?' },
          { label: 'Browse 2026 Student Projects', query: 'Show me 2026 student projects' },
        ],
      },
    ]);
  };

  // Basic markdown text renderer
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return (
      <div className="space-y-1.5 text-xs sm:text-sm leading-relaxed">
        {lines.map((line, idx) => {
          if (!line.trim()) return <div key={idx} className="h-1" />;

          // Subheaders
          if (line.startsWith('### ')) {
            return (
              <h5 key={idx} className="font-bold text-slate-900 dark:text-white pt-1 text-xs sm:text-sm">
                {line.replace('### ', '')}
              </h5>
            );
          }

          // Bullet points
          if (line.startsWith('• ') || line.startsWith('* ')) {
            const content = line.replace(/^[•*]\s*/, '');
            return (
              <div key={idx} className="flex items-start gap-1.5 pl-1">
                <span className="text-blue-500 font-bold">•</span>
                <span>{renderInlineStyles(content)}</span>
              </div>
            );
          }

          return <p key={idx}>{renderInlineStyles(line)}</p>;
        })}
      </div>
    );
  };

  const renderInlineStyles = (str: string) => {
    // Matches **bold**, *italic*, and `code`
    const parts = str.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-semibold text-slate-900 dark:text-white">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={i} className="text-slate-600 dark:text-slate-300 italic">{part.slice(1, -1)}</em>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={i} className="bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded text-[11px] font-mono">{part.slice(1, -1)}</code>;
      }
      return part;
    });
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={onOpen}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-white shadow-xl shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all duration-200 group"
          aria-label="Open AI Assistant"
        >
          <div className="relative">
            <Sparkles className="h-5 w-5 animate-pulse text-amber-300" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-xs font-bold leading-tight">Ask EduTrust AI</div>
            <div className="text-[10px] text-blue-100 leading-tight">Curriculum, Projects, Recruit</div>
          </div>
        </button>
      )}

      {/* Chat Drawer / Modal */}
      {isOpen && (
        <div
          className={`fixed bottom-4 right-4 z-50 flex flex-col rounded-2xl border border-slate-200 bg-white shadow-2xl transition-all duration-200 dark:border-slate-800 dark:bg-slate-900 overflow-hidden ${
            isExpanded
              ? 'w-[92vw] sm:w-[680px] h-[85vh]'
              : 'w-[92vw] sm:w-[420px] h-[560px] max-h-[85vh]'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 px-4 py-3 text-white">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 backdrop-blur-xs text-white">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold tracking-tight">EduTrust AI Assistant</h4>
                  <span className="rounded-full bg-emerald-400/20 px-1.5 py-0.2 text-[9px] font-semibold text-emerald-200 border border-emerald-300/30">
                    Live Model
                  </span>
                </div>
                <p className="text-[10px] text-blue-100">Curriculum, Outcomes & Industry Navigator</p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-white/80">
              <button
                onClick={handleReset}
                className="rounded-md p-1.5 hover:bg-white/10 hover:text-white transition-colors"
                title="Reset conversation"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="hidden sm:block rounded-md p-1.5 hover:bg-white/10 hover:text-white transition-colors"
                title={isExpanded ? 'Minimize' : 'Maximize'}
              >
                {isExpanded ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
              </button>
              <button
                onClick={onClose}
                className="rounded-md p-1.5 hover:bg-white/10 hover:text-white transition-colors"
                title="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-slate-950/40">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow-xs mt-0.5">
                    <Bot className="h-4 w-4" />
                  </div>
                )}

                <div className={`max-w-[85%] space-y-2 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`rounded-2xl px-3.5 py-2.5 shadow-xs text-slate-800 dark:text-slate-100 ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 rounded-bl-none'
                    }`}
                  >
                    {msg.sender === 'user' ? (
                      <p className="text-xs sm:text-sm font-medium">{msg.text}</p>
                    ) : (
                      renderFormattedText(msg.text)
                    )}
                  </div>

                  {/* Action Link buttons or Query suggestions attached to message */}
                  {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.suggestedActions.map((act, i) =>
                        act.href ? (
                          <Link
                            key={i}
                            href={act.href}
                            onClick={onClose}
                            className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50/90 px-2.5 py-1 text-[11px] font-semibold text-blue-700 hover:bg-blue-100 dark:border-blue-900/60 dark:bg-blue-950/50 dark:text-blue-300 transition-colors"
                          >
                            <span>{act.label}</span>
                            <ExternalLink className="h-2.5 w-2.5" />
                          </Link>
                        ) : (
                          <button
                            key={i}
                            onClick={() => handleSend(act.query || act.label)}
                            className="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:border-blue-400 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 transition-colors shadow-2xs"
                          >
                            <span>{act.label}</span>
                            <ChevronRight className="h-2.5 w-2.5 text-slate-400" />
                          </button>
                        )
                      )}
                    </div>
                  )}

                  <div
                    className={`text-[9px] text-slate-400 px-1 ${
                      msg.sender === 'user' ? 'text-right text-slate-400' : 'text-left'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>

                {msg.sender === 'user' && (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 shadow-xs mt-0.5">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-slate-500 italic pl-1">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
                  <Bot className="h-3.5 w-3.5" />
                </div>
                <div className="flex gap-1 items-center bg-white dark:bg-slate-800 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 shadow-2xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-bounce"></span>
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="border-t border-slate-200 bg-white p-2.5 dark:border-slate-800 dark:bg-slate-900">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about PLO, CLO, Credits, 2026 Projects..."
                className="flex-1 rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 disabled:hover:bg-blue-600 transition-colors shadow-xs"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            <div className="mt-1.5 flex items-center justify-between px-1 text-[10px] text-slate-400">
              <span>Powered by UniBridge Knowledge Engine</span>
              <span>ABET & AUN-QA Aligned</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
