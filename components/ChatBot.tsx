import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageSquare, X, Send, Sparkles, User, Bot, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFloatingMenuVisible, setIsFloatingMenuVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hi! I'm Momin's AI assistant. Ask me anything about his projects, skills, or experience in Data Analytics and Business Intelligence!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Reposition floating chat widget if mobile navigation menu is toggled on/off or floating quick menu is visible
  useEffect(() => {
    const handleToggle = (e: Event) => {
      const customEvent = e as CustomEvent<{ open: boolean }>;
      setIsMobileMenuOpen(customEvent.detail.open);
    };

    const handleFloatingToggle = (e: Event) => {
      const customEvent = e as CustomEvent<{ visible: boolean }>;
      setIsFloatingMenuVisible(customEvent.detail.visible);
    };

    window.addEventListener('mobileMenuToggle', handleToggle);
    window.addEventListener('floatingMenuToggle', handleFloatingToggle);
    return () => {
      window.removeEventListener('mobileMenuToggle', handleToggle);
      window.removeEventListener('floatingMenuToggle', handleFloatingToggle);
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
      if (!apiKey) {
        setMessages(prev => [
          ...prev, 
          { 
            role: 'model', 
            text: "Hi! It looks like the Gemini API Key is missing. Please add a `GEMINI_API_KEY` in the AI Studio settings or configure your `.env` file to enable my AI response capabilities!" 
          }
        ]);
        setIsLoading(false);
        return;
      }
      const ai = new GoogleGenAI({ apiKey: apiKey });
      
      const systemInstruction = `You are the AI portfolio assistant for Mohd Momin, a Data Analyst and Business Intelligence Enthusiast.
      Your goal is to answer visitor questions about Momin's skills, projects, and experience professionally and concisely.
      
      Momin is positioned as:
      - Data Analyst
      - Business Intelligence Enthusiast
      - Market Research Enthusiast
      - Data Visualization Enthusiast
      (He is NOT a Backend Developer, NOT a Supabase Developer, NOT an Algo Trader, and NOT a Python Developer)
      
      Key details about Momin:
      - Role/Focus: Data Analyst, Business Intelligence, Market Research, and Data Visualization.
      - Core Skills: SQL, Microsoft Excel, Power BI, Python, Pandas, NumPy, Data Visualization, Market Research, Git & GitHub.
      - Projects: 
          1. Adavnce-Excel-Business-Insights: Interactive Excel Dashboard analyzing store sales, customer behavior, refunds, and channel performance and Top 5 State According to Sales using Pivot Tables and Business Analytics. Built using Excel and SQL.
          2. Stock Market Trend Analysis: Analyzed historical stock price and volume datasets to identify trends and performance patterns. Built visual reports and extracted insights using Python and Power BI.
          3. Customer Churn Analysis & Retention Dashboard: Performed exploratory data analysis and customer segmentation. Built KPI dashboards and generated insights to improve customer retention and business performance.
          4. HR-Analytics-Dashboard-Power-BI: Analyzed employee attrition data using Power BI to generate meaningful HR insights and interactive business reports. Built using Power BI, Power Query, DAX, and Microsoft Excel.
          5. E-Commerce-Sales-DashBoard: An interactive E-Commerce Sales Dashboard built using Power BI. It helps in analyzing online sales data through different visualizations like bar charts, pie charts, maps, and slicers to reveal key business KPIs and revenue trends.
          * Interactive BI Sandbox: A live React playground featuring interactive Recharts-powered dashboards (Revenue vs. Target, Stock Moving Average Trends, and Cohort Retention decaying curves) embedded directly below his Featured Projects on this website! Momin built this to showcase real, interactive data visualization capabilities.
      - Certifications: 
          - Getting Started With Hadoop (Simplilearn, 2024)
      - Achievements:
          - Built a YouTube community of 1,000+ subscribers by creating educational trading and market analysis content.
          - Developed strong analytical thinking through 5+ years of studying market behavior and data-driven decision making.
          - Improved communication and presentation skills by teaching and simplifying complex concepts to audiences.
          - Built multiple end-to-end analytics projects using SQL, Excel, Power BI and Python.
      - Location: Bangalore, India.
      - Contact: khanmomin1166@gmail.com, Phone: +91 87870 74730.
      
      Guidelines:
      - Keep answers short, professional, and data-driven.
      - If asked about hiring, encourage them to use the "Hire Me" button or contact form.
      - Do not make up facts not present in this context.
      - Tone: Enthusiastic, smart, helpful.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          ...messages.map(m => ({ 
             role: m.role, 
             parts: [{ text: m.text }] 
          })),
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: systemInstruction,
        }
      });

      const aiResponse = response.text || "I'm having trouble connecting to the data source right now. Please try again later.";
      
      setMessages(prev => [...prev, { role: 'model', text: aiResponse }]);

    } catch (error) {
      console.error("Gemini API Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error. Please check your connection or try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`fixed right-6 z-[100] flex flex-col items-end transition-all duration-500 ease-out ${
      isMobileMenuOpen 
        ? 'bottom-28 md:bottom-6' 
        : 'bottom-6'
    }`}>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-[350px] sm:w-[380px] h-[500px] bg-brand-dark/90 backdrop-blur-xl border border-brand-border rounded-2xl shadow-2xl flex flex-col overflow-hidden ring-1 ring-white/10"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-brand-accent/20 text-brand-accent">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">Momin's AI Assistant</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-xs text-slate-400">Online • Gemini 2.5</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-brand-border scrollbar-track-transparent">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === 'user' ? 'bg-brand-cyan/20 text-brand-cyan' : 'bg-brand-accent/20 text-brand-accent'
                  }`}>
                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`p-3 rounded-2xl max-w-[80%] text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20 rounded-tr-sm' 
                      : 'bg-white/5 text-slate-300 border border-white/5 rounded-tl-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-accent/20 text-brand-accent flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-white/5 px-4 py-3 rounded-2xl rounded-tl-sm border border-white/5 flex gap-1">
                    <span className="w-1.5 h-1.5 bg-brand-accent/50 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-brand-accent/50 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-brand-accent/50 rounded-full animate-bounce"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 border-t border-white/5 bg-black/20">
              <div className="relative flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Momin's skills..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-brand-accent/50 focus:bg-white/10 transition-all placeholder:text-slate-600"
                  disabled={isLoading}
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 p-2 rounded-lg bg-brand-accent text-brand-dark disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-400 transition-colors"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`group relative w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-300 ${
           isOpen ? 'bg-slate-800 text-white rotate-90' : 'bg-gradient-to-r from-brand-accent to-brand-cyan text-brand-dark'
        }`}
      >
        <span className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-0 group-hover:opacity-75 duration-1000"></span>
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </motion.button>

    </div>
  );
};

export default ChatBot;