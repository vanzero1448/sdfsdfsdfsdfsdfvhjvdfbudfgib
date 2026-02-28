import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { sendMessageToLoreKeeper } from '../services/geminiService';
import { ChatMessage } from '../types';

export const LoreKeeper: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'model',
      text: 'Приветствую, путник. Я Хранитель Льда.',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const replyText = await sendMessageToLoreKeeper(history, userMsg.text);

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: replyText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 p-0 w-16 h-16 bg-cyan-600 border-4 border-white flex items-center justify-center shadow-[4px_4px_0px_#000] hover:bg-cyan-500 active:shadow-none active:translate-x-1 active:translate-y-1 transition-all ${
          isOpen ? 'hidden' : 'block'
        }`}
      >
        <MessageCircle className="text-white h-8 w-8" />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-full max-w-sm h-[500px] bg-[#2d3748] border-4 border-white flex flex-col shadow-[8px_8px_0px_rgba(0,0,0,0.5)] transition-all duration-200 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
        }`}
        style={{ imageRendering: 'pixelated' }}
      >
        {/* Header */}
        <div className="p-3 bg-cyan-700 border-b-4 border-black flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white border-2 border-black flex items-center justify-center">
               <Sparkles className="text-cyan-600 w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-xl tracking-wide" style={{ fontFamily: '"VT323"' }}>ХРАНИТЕЛЬ</h3>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-white hover:bg-red-500 p-1 border-2 border-transparent hover:border-black transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#1a202c]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] p-3 text-xl border-2 ${
                  msg.role === 'user'
                    ? 'bg-cyan-900 border-cyan-400 text-cyan-100'
                    : 'bg-slate-700 border-gray-400 text-gray-200'
                }`}
                style={{ boxShadow: '2px 2px 0px rgba(0,0,0,0.3)' }}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-700 border-2 border-gray-400 p-3 text-white animate-pulse">
                ...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-[#2d3748] border-t-4 border-black">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Вопрос..."
              className="flex-1 bg-black text-green-400 border-2 border-gray-600 px-3 py-2 text-xl focus:outline-none focus:border-cyan-500 font-mono"
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="px-4 bg-cyan-600 hover:bg-cyan-500 text-white border-2 border-black active:translate-y-1"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};