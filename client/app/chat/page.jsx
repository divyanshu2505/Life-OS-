"use client";
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Bot, Paperclip, Mic, ArrowUp } from 'lucide-react';
import Navbar from '../../components/Navbar';

// 🔥 QUICK SPEED BOOST: Prevent unnecessary re-renders using React.memo
const MessageList = React.memo(({ messages }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6">
          <Bot size={32} className="text-white" />
        </div>
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-8 tracking-tight">What can I help with?</h2>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto space-y-6 p-4 md:p-8 flex flex-col items-center scroll-smooth">
      <div className="w-full max-w-3xl space-y-8 pb-20">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-4 w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full border border-white/20 bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                <Bot size={18} className="text-white"/>
              </div>
            )}
            
            <div className={`
              ${msg.role === 'user' 
                ? 'bg-[#2f2f2f] text-white px-5 py-2.5 rounded-[24px] rounded-br-[8px] max-w-[70%]' 
                : 'text-gray-100 py-1 max-w-[100%] leading-relaxed'
              } text-[16px]`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={bottomRef} className="h-4" />
      </div>
    </div>
  );
});

export default function ChatAssistant() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const debounceRef = useRef(null);

  const textareaRef = useRef(null);

  // 🔥 QUICK SPEED BOOST: Debounce input/API call
  const handleSend = useCallback(() => {
    if (!input.trim() || isTyping) return;
    
    if (debounceRef.current) clearTimeout(debounceRef.current);
    
    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsTyping(true);
    if (textareaRef.current) {
      textareaRef.current.style.height = '44px';
    }

    debounceRef.current = setTimeout(() => {
      let aiResponse = "I'm a local AI assistant. I can help you code, plan your day, or summarize content. What exactly would you like to explore?";
      const lower = userMessage.toLowerCase();
      
      if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
        aiResponse = "Hello there! How can I assist you with your projects today?";
      } else if (lower.includes("code") || lower.includes("react") || lower.includes("nextjs") || lower.includes("bug")) {
        aiResponse = "I'd love to help with your code! Please share the snippet or describe the bug you're encountering, and we can debug it together.";
      } else if (lower.includes("who are you") || lower.includes("what are you")) {
        aiResponse = "I am LifeOS AI, an intelligent assistant created to boost your productivity. I can write code, analyze data, and optimize your workflows.";
      } else if (lower.includes("weather") || lower.includes("time")) {
        aiResponse = "I don't have access to real-time external APIs in this demo mode, but normally I would fetch the live data for you right here!";
      } else if (lower.includes("joke") || lower.includes("funny")) {
        aiResponse = "Why do programmers prefer dark mode? Because light attracts bugs! 🐛";
      } else if (lower.length < 10) {
        aiResponse = "Could you tell me a little more about that?";
      }

      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
      setIsTyping(false);
    }, 1200); // Simulated AI thinking time
  }, [input, isTyping]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e) => {
    setInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#212121] text-white overflow-hidden">
      <Navbar />
      <div className="flex-1 w-full mx-auto pt-24 flex flex-col h-[calc(100vh-4rem)] relative">
        <MessageList messages={messages} />
        
        <div className="w-full max-w-3xl mx-auto px-4 pb-6 absolute bottom-0 left-1/2 -translate-x-1/2 bg-gradient-to-t from-[#212121] via-[#212121] to-transparent pt-10">
          <div className="relative flex items-end bg-[#2f2f2f] rounded-[24px] p-2 transition-all">
            <button className="p-2.5 text-gray-400 hover:text-white transition-colors rounded-full mb-0.5">
              <Paperclip size={20} />
            </button>
            <textarea 
              ref={textareaRef}
              value={input}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="Message LifeOS AI..." 
              className="w-full bg-transparent text-white outline-none resize-none max-h-[200px] py-3 px-2 overflow-y-auto"
              rows={1}
              style={{ minHeight: '44px' }}
              disabled={isTyping}
            />
            <div className="flex items-center gap-2 mb-1 mr-1">
              {input.trim() ? (
                <button 
                  onClick={handleSend} 
                  disabled={isTyping} 
                  className="p-1.5 bg-white text-black rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 flex items-center justify-center h-8 w-8"
                >
                  <ArrowUp size={18} strokeWidth={3} />
                </button>
              ) : (
                <button className="p-2.5 text-gray-400 hover:text-white transition-colors rounded-full">
                  <Mic size={20} />
                </button>
              )}
            </div>
          </div>
          <div className="text-center text-[12px] text-gray-400 mt-3 pb-1">
            LifeOS AI can make mistakes. Consider verifying important information.
          </div>
        </div>
      </div>
    </div>
  );
}
