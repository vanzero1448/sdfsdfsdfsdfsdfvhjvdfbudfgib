import React, { useState, useRef, useEffect } from "react";
import { X, Send, Snowflake } from "lucide-react";
import { sendMessageToLoreKeeper } from "../services/geminiService";
import { ChatMessage } from "../types";

export const LoreKeeper: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      role: "model",
      text: "Приветствую, путник. Я — Хранитель Льда. Задай мне вопрос о мирах IceTale...",
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
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 transition-all duration-300"
          style={{
            background: "linear-gradient(135deg, #00668a, #004466)",
            border: "1px solid rgba(0,212,255,0.5)",
            boxShadow:
              "0 0 25px rgba(0,212,255,0.3), 0 8px 30px rgba(0,0,0,0.5)",
            clipPath:
              "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
            cursor: "pointer",
            color: "white",
          }}
        >
          <Snowflake
            size={18}
            style={{
              color: "var(--cyan-ice)",
              animation: "spin 8s linear infinite",
            }}
          />
          <span
            className="font-pixel text-lg tracking-widest"
            style={{ color: "var(--cyan-ice)" }}
          >
            ХРАНИТЕЛЬ
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-6 right-6 z-40 flex flex-col lk-window"
          style={{
            width: 360,
            height: 520,
            clipPath:
              "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{
              background: "linear-gradient(90deg, #00334d, #001a2e)",
              borderBottom: "1px solid rgba(0,212,255,0.2)",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                style={{
                  width: 32,
                  height: 32,
                  background: "linear-gradient(135deg, #00668a, #003355)",
                  clipPath:
                    "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  border: "1px solid rgba(0,212,255,0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.7rem",
                }}
              >
                ❄
              </div>
              <div>
                <div
                  className="font-pixel text-lg tracking-widest"
                  style={{ color: "var(--cyan-ice)", lineHeight: 1 }}
                >
                  ХРАНИТЕЛЬ ЛЬДА
                </div>
                <div
                  className="font-mono text-xs"
                  style={{ color: "var(--text-muted)" }}
                >
                  AI-ассистент сервера
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--text-muted)",
                lineHeight: 1,
              }}
              className="hover:text-red-400 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto flex flex-col gap-3 p-4"
            style={{ scrollbarWidth: "thin" }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`rounded px-4 py-3 font-mono text-sm ${
                  msg.role === "user" ? "chat-bubble-user" : "chat-bubble-model"
                }`}
                style={{ color: "var(--text-primary)", lineHeight: 1.5 }}
              >
                {msg.role === "model" && (
                  <div
                    className="font-pixel text-xs tracking-wider mb-1"
                    style={{ color: "var(--cyan-dim)" }}
                  >
                    ❄ ХРАНИТЕЛЬ
                  </div>
                )}
                {msg.text}
              </div>
            ))}
            {loading && (
              <div
                className="chat-bubble-model rounded px-4 py-3 font-mono text-sm"
                style={{ color: "var(--text-muted)" }}
              >
                <span style={{ animation: "pulse 1.5s infinite" }}>⠋</span>{" "}
                Размышляю...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            className="flex items-center gap-2 px-3 py-3"
            style={{
              borderTop: "1px solid rgba(0,212,255,0.15)",
              background: "rgba(4,8,15,0.5)",
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Твой вопрос..."
              className="flex-1 font-mono text-sm"
              style={{
                background: "rgba(0,212,255,0.05)",
                border: "1px solid rgba(0,212,255,0.2)",
                color: "var(--text-primary)",
                padding: "0.6rem 0.8rem",
                outline: "none",
                borderRadius: 2,
              }}
            />
            <button
              onClick={handleSend}
              disabled={loading}
              style={{
                background: loading
                  ? "rgba(0,102,136,0.3)"
                  : "linear-gradient(135deg, #00668a, #004466)",
                border: "1px solid rgba(0,212,255,0.4)",
                color: "var(--cyan-ice)",
                padding: "0.6rem 0.8rem",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.2s",
              }}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
