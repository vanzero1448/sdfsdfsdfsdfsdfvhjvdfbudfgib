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
      text: "Привет! Я — Хранитель Льда. Задай мне вопрос об IceTale.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      text: input,
      timestamp: new Date(),
    };
    setMessages((p) => [...p, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const history = messages.map((m) => ({
        role: m.role,
        parts: [{ text: m.text }],
      }));
      const reply = await sendMessageToLoreKeeper(history, userMsg.text);
      setMessages((p) => [
        ...p,
        {
          id: (Date.now() + 1).toString(),
          role: "model",
          text: reply,
          timestamp: new Date(),
        },
      ]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Toggle */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="btn btn-primary"
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 40,
            gap: 8,
            boxShadow: "0 8px 28px rgba(42,157,196,.4)",
          }}
        >
          <Snowflake size={16} />
          Хранитель
        </button>
      )}

      {/* Window */}
      {isOpen && (
        <div
          className="lk-window"
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 40,
            width: 350,
            height: 500,
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "1rem 1.25rem",
              borderBottom: "1px solid var(--border)",
              background: "var(--bg-card2)",
              borderRadius: "18px 18px 0 0",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: "var(--ice-pale)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--ice)",
                }}
              >
                <Snowflake size={18} />
              </div>
              <div>
                <div
                  style={{
                    fontWeight: 700,
                    color: "#1a2c3d",
                    fontSize: ".95rem",
                  }}
                >
                  Хранитель льда
                </div>
                <div style={{ fontSize: ".75rem", color: "#8aaabb" }}>
                  AI-ассистент IceTale
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#8aaabb",
                lineHeight: 1,
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={m.role === "user" ? "chat-user" : "chat-model"}
              >
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="chat-model" style={{ color: "#8aaabb" }}>
                Думаю...
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div
            style={{
              display: "flex",
              gap: 8,
              padding: ".75rem 1rem",
              borderTop: "1px solid var(--border)",
              borderRadius: "0 0 18px 18px",
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Твой вопрос..."
              style={{
                flex: 1,
                background: "var(--bg)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                padding: ".6rem .85rem",
                fontSize: ".9rem",
                color: "#1a2c3d",
                outline: "none",
                fontFamily: "Inter, sans-serif",
              }}
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="btn btn-primary"
              style={{ padding: ".6rem .9rem", minWidth: "auto" }}
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
