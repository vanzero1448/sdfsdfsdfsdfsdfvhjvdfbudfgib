import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { sendMessageToLoreKeeper } from "../services/geminiService";
import { ChatMessage } from "../types";

export const LoreKeeper: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      role: "model",
      text: "Приветствую, путник. Я Хранитель Льда. Задавай вопросы о мире IceTale...",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
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
      role: "user",
      text: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const history = messages.map((m) => ({
        role: m.role,
        parts: [{ text: m.text }],
      }));

      const replyText = await sendMessageToLoreKeeper(history, userMsg.text);

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "model",
        text: replyText,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
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
        className={`fixed bottom-6 right-6 z-40 p-0 w-16 h-16 bg-cyan-400 border-4 border-white flex items-center justify-center shadow-[6px_6px_0px_#000] hover:bg-cyan-300 active:shadow-none active:translate-x-1 active:translate-y-1 transition-all duration-200 ${
          isOpen ? "hidden" : "block"
        }`}
      >
        <MessageCircle className="text-slate-950 h-9 w-9" />
      </button>

      {/* Chat Window - ICE THEME */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-full max-w-md h-[560px] bg-slate-900 border-4 border-cyan-400 flex flex-col shadow-[12px_12px_0px_rgba(103,232,249,0.3)] transition-all duration-300 overflow-hidden ${
          isOpen
            ? "scale-100 opacity-100"
            : "scale-95 opacity-0 pointer-events-none"
        }`}
        style={{ imageRendering: "pixelated" }}
      >
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-cyan-500 to-cyan-400 border-b-4 border-black flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white border-4 border-black flex items-center justify-center rounded-full">
              <Sparkles className="text-cyan-500 w-6 h-6" />
            </div>
            <h3
              className="font-bold text-slate-950 text-2xl tracking-widest neon-cyan"
              style={{ fontFamily: '"Press Start 2P"' }}
            >
              ХРАНИТЕЛЬ ЛЬДА
            </h3>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-slate-950 hover:bg-red-500 p-2 border-2 border-transparent hover:border-black rounded transition-all"
          >
            <X size={24} />
          </button>
        </div>

        {/* Messages - Frosted glass look */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-950/90 backdrop-blur-sm">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[82%] px-5 py-4 text-xl border-2 rounded-none shadow-[4px_4px_0px_rgba(0,0,0,0.4)] ${
                  msg.role === "user"
                    ? "bg-cyan-500/90 border-cyan-300 text-slate-950"
                    : "bg-slate-800 border-cyan-400/50 text-cyan-100"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-800 border-2 border-cyan-400 px-5 py-4 text-cyan-300 animate-pulse flex items-center gap-2">
                <span className="text-2xl">❄️</span> Хранитель думает...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-slate-900 border-t-4 border-cyan-400">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Спроси о мире вечной мерзлоты..."
              className="flex-1 bg-slate-950 text-cyan-200 border-2 border-cyan-400 px-5 py-3 text-xl focus:outline-none focus:border-cyan-300 font-mono placeholder:text-slate-500"
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="px-6 bg-cyan-400 hover:bg-cyan-300 text-slate-950 border-4 border-black active:translate-y-1 transition-all disabled:opacity-50"
            >
              <Send size={24} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
