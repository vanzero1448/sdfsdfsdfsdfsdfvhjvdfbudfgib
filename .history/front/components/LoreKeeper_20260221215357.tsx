import React, { useState, useRef, useEffect } from "react";
import { X, Send, Cpu } from "lucide-react";
import { sendMessageToLoreKeeper } from "../services/geminiService";
import { ChatMessage } from "../types";

export const LoreKeeper: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<ChatMessage[]>([
    {
      id: "0",
      role: "model",
      text: "Hello! I am the Pixel Assistant. Ask me anything about the server.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, open]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const um: ChatMessage = { id: Date.now().toString(), role: "user", text: input, timestamp: new Date() };
    setMsgs((p) => [...p, um]);
    setInput("");
    setLoading(true);
    try {
      const history = msgs.map((m) => ({ role: m.role, parts: [{ text: m.text }] }));
      const reply = await sendMessageToLoreKeeper(history, um.text);
      setMsgs((p) => [...p, { id: (Date.now() + 1).toString(), role: "model", text: reply, timestamp: new Date() }]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!open && (
        <div className="chat-toggle">
          <button className="btn btn-blue" style={{ boxShadow: "0 8px 24px rgba(59,130,246,.4)" }} onClick={() => setOpen(true)}>
            <Cpu size={15} /> AI Assistant
          </button>
        </div>
      )}

      {open && (
        <div className="chat-window">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: "1px solid var(--line)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: "var(--blue-dim)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--blue)" }}>
                <Cpu size={16} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>Pixel Guide</div>
                <div style={{ fontSize: 12, color: "var(--t3)" }}>AI Assistant</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--t3)", lineHeight: 1 }}>
              <X size={17} />
            </button>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "14px", display: "flex", flexDirection: "column", gap: 10 }}>
            {msgs.map((m) => (
              <div key={m.id} className={m.role === "user" ? "chat-bubble-user" : "chat-bubble-bot"}>
                {m.text}
              </div>
            ))}
            {loading && <div className="chat-bubble-bot" style={{ color: "var(--t3)" }}>Thinking...</div>}
            <div ref={endRef} />
          </div>

          <div style={{ padding: "10px 12px", borderTop: "1px solid var(--line)", display: "flex", gap: 8 }}>
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Ask something..." style={{ flex: 1, background: "var(--bg-2)", border: "1px solid var(--line)", borderRadius: 8, padding: "9px 12px", color: "var(--t1)", fontSize: 14, outline: "none", fontFamily: "Inter, sans-serif" }} />
            <button onClick={send} disabled={loading