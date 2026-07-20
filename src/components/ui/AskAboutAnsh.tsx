'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  sender: 'user' | 'agent';
  text: string;
  isTyping?: boolean;
}

interface AskAboutAnshProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AskAboutAnsh({ isOpen, onClose }: AskAboutAnshProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'agent',
      text: "System initialized. I am ANSH_BOT v1.0, an autonomous agent loaded with Ansh's resume database, project records, and system telemetry.\n\nSelect a data query below to extract credentials."
    }
  ]);
  const [activeTypingIndex, setActiveTypingIndex] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const cannedQueries = [
    {
      q: "Extract RAG pipeline credentials",
      a: "Ansh built a Production-grade Multi-Source RAG Pipeline in 2025 using Python, LangChain, FAISS, OpenAI API, and PostgreSQL. It features tool use, planner, and memory components, ingesting PDFs, web URLs, and databases, reducing hallucinations by 60% with sub-200ms query response times. He also created a RAG chatbot with web intelligence crawling live sites."
    },
    {
      q: "Enumerate core languages & frameworks",
      a: "Ansh specializes in Python (Expert), C++, SQL, Dart, and JavaScript. His primary AI stack includes LangChain, LlamaIndex, OpenAI/Anthropic APIs, FAISS, PyTorch, and TensorFlow, paired with Flask, FastAPI, Supabase, Docker, and AWS."
    },
    {
      q: "Review Hindalco AI internship log",
      a: "During his AI/ML Internship at Hindalco Industries (Aditya Birla Group) in Jun-Jul 2025, Ansh built a production Agentic AI anomaly detection pipeline that autonomously classified and triaged alerts, reducing manual effort by 40%. He also engineered scalable Python pipelines processing 50,000+ data records and resolved AWS deployment bottlenecks."
    },
    {
      q: "Query current employment availability",
      a: "Ansh is graduating in May 2026 with a B.Tech in CSE (AI/ML Specialization) from JUIT. He is actively seeking full-time roles and internships in Agentic AI, Machine Learning, Backend, and Product Engineering. Secure connection via sansh3030@gmail.com."
    }
  ];

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeTypingIndex]);

  // Simulate typing effect
  const handleQueryClick = (q: string, a: string) => {
    if (activeTypingIndex !== null) return; // Wait for current reply to finish typing

    // 1. Append User Message
    const newMessages = [...messages, { sender: 'user', text: q } as Message];
    setMessages(newMessages);

    // 2. Append empty Agent response with typing status
    const agentMsgIndex = newMessages.length;
    setMessages(prev => [...prev, { sender: 'agent', text: '', isTyping: true }]);
    setActiveTypingIndex(agentMsgIndex);

    // 3. Type letters sequentially
    let currentText = '';
    let index = 0;
    const speed = 15; // ms per char

    const typeTimer = setInterval(() => {
      if (index < a.length) {
        currentText += a.charAt(index);
        setMessages(prev => {
          const updated = [...prev];
          updated[agentMsgIndex] = { sender: 'agent', text: currentText, isTyping: true };
          return updated;
        });
        index++;
      } else {
        clearInterval(typeTimer);
        setMessages(prev => {
          const updated = [...prev];
          updated[agentMsgIndex] = { sender: 'agent', text: a, isTyping: false };
          return updated;
        });
        setActiveTypingIndex(null);
      }
    }, speed);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        onClick={onClose}
        className="fixed inset-0 z-40 bg-[#000000]/60 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-screen w-full sm:w-[450px] bg-[#120c0a] border-l border-border-subtle z-50 shadow-2xl flex flex-col justify-between font-mono animate-slide-in">
        
        {/* Header */}
        <div className="p-6 border-b border-border-subtle flex items-center justify-between bg-surface-1/40">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-accent-primary animate-ping" />
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-text-primary tracking-widest uppercase">ANSH_BOT V1.0</span>
              <span className="text-[8px] text-text-secondary tracking-wider">SECURE KNOWLEDGE SYSTEM</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary border border-border-subtle p-2 rounded transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6 scrollbar-none">
          {messages.map((msg, index) => (
            <div 
              key={index}
              className={cn(
                "flex flex-col max-w-[85%] rounded p-4 text-[11px] leading-relaxed transition-all duration-300",
                msg.sender === 'user' 
                  ? "bg-accent-primary/10 border border-accent-primary/30 text-text-primary ml-auto items-end" 
                  : "bg-surface-1/40 border border-border-subtle text-text-secondary mr-auto items-start whitespace-pre-line"
              )}
            >
              <span className="text-[8px] text-text-muted mb-2 tracking-widest uppercase">
                {msg.sender === 'user' ? 'USER // DATA_REQ' : 'AGENT // Telemetry'}
              </span>
              <p className={cn(msg.isTyping ? "after:content-['▋'] after:animate-pulse" : "")}>
                {msg.text}
              </p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Canned Queries Select Area */}
        <div className="p-6 border-t border-border-subtle bg-surface-1/20 flex flex-col gap-4">
          <div className="text-[8px] tracking-[0.25em] text-text-muted uppercase">
            AVAILABLE QUERY TEMPLATES
          </div>
          
          <div className="flex flex-col gap-2">
            {cannedQueries.map((query, i) => {
              const isSelected = messages.some(m => m.sender === 'user' && m.text === query.q);
              return (
                <button
                  key={i}
                  disabled={activeTypingIndex !== null}
                  onClick={() => handleQueryClick(query.q, query.a)}
                  className={cn(
                    "text-left text-[9px] tracking-wider border rounded p-3 transition-all duration-300 uppercase leading-snug",
                    isSelected
                      ? "border-accent-primary/45 bg-accent-primary/5 text-accent-primary"
                      : "border-border-subtle text-text-secondary hover:border-accent-primary/40 hover:text-text-primary hover:bg-surface-1/30"
                  )}
                >
                  {query.q}
                </button>
              );
            })}
          </div>

          {/* Fake TextInput */}
          <div className="mt-2 relative rounded border border-border-subtle bg-surface-1/10 flex items-center px-4 py-3 opacity-60">
            <span className="text-[9px] text-text-muted flex-grow">SYSTEM LOCKED. SELECT TEMPLATE ABOVE.</span>
            <Send size={10} className="text-text-muted" />
          </div>
        </div>
      </div>
    </>
  );
}
