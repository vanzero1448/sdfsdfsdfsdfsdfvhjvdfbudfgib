import React from "react";
import { ExternalLink, Youtube, Send, Mail } from "lucide-react";

export const Community: React.FC = () => {
  return (
    <div
      style={{ background: "var(--bg)", minHeight: "100vh", paddingTop: 80 }}
    >
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "4rem 1.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span
            className="section-label"
            style={{ marginBottom: "1rem", display: "inline-flex" }}
          >
            Связь с нами
          </span>
          <h1 className="page-title" style={{ marginTop: "1rem" }}>
            Сообщество
          </h1>
          <p style={{ color: "#4a6880", marginTop: "0.75rem" }}>
            Следи за новостями и будь в центре событий.
          </p>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.25rem",
            marginBottom: "1.25rem",
          }}
        >
          {/* Telegram */}
          <div className="social-card" style={{ padding: "2rem" }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: "#e8f4fd",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.25rem",
                color: "#0088cc",
              }}
            >
              <Send size={22} />
            </div>
            <div
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontWeight: 700,
                fontSize: "1.1rem",
                color: "#1a2c3d",
                marginBottom: ".25rem",
              }}
            >
              Telegram
            </div>
            <div
              style={{
                fontSize: ".85rem",
                color: "#0088cc",
                marginBottom: ".85rem",
              }}
            >
              @icetale
            </div>
            <p
              style={{
                fontSize: ".9rem",
                color: "#4a6880",
                lineHeight: 1.65,
                marginBottom: "1.5rem",
              }}
            >
              Главный канал сервера: анонсы, общение с командой и новости
              разработки.
            </p>
            <a
              href="https://t.me/icetale"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ textDecoration: "none", fontSize: ".88rem" }}
            >
              Перейти <ExternalLink size={14} />
            </a>
          </div>

          {/* YouTube */}
          <div className="social-card" style={{ padding: "2rem" }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: "#fdeaea",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.25rem",
                color: "#ff0000",
              }}
            >
              <Youtube size={22} />
            </div>
            <div
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontWeight: 700,
                fontSize: "1.1rem",
                color: "#1a2c3d",
                marginBottom: ".25rem",
              }}
            >
              YouTube
            </div>
            <div
              style={{
                fontSize: ".85rem",
                color: "#ff0000",
                marginBottom: ".85rem",
              }}
            >
              @IceTale
            </div>
            <p
              style={{
                fontSize: ".9rem",
                color: "#4a6880",
                lineHeight: 1.65,
                marginBottom: "1.5rem",
              }}
            >
              Гайды по модам, обзоры обновлений и летсплеи от команды
              администрации.
            </p>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
              style={{
                textDecoration: "none",
                fontSize: ".88rem",
                border: "1.5px solid #ffd0d0",
                color: "#cc0000",
              }}
            >
              Смотреть <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* Contact */}
        <div
          className="social-card"
          style={{
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: "var(--ice-pale)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--ice)",
                flexShrink: 0,
              }}
            >
              <Mail size={20} />
            </div>
            <div>
              <div
                style={{ fontWeight: 700, color: "#1a2c3d", marginBottom: 2 }}
              >
                Почта поддержки
              </div>
              <a
                href="mailto:support@icetale.net"
                style={{
                  color: "var(--ice)",
                  textDecoration: "none",
                  fontSize: ".95rem",
                  fontWeight: 600,
                }}
              >
                support@icetale.net
              </a>
            </div>
          </div>
          <p style={{ color: "#4a6880", fontSize: ".9rem", lineHeight: 1.65 }}>
            Вопросы по оплате, жалобы, предложения — ответим в течение 24 часов.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a
              href="https://t.me/icetale_support"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ textDecoration: "none", fontSize: ".88rem" }}
            >
              <Send size={14} /> Написать в TG
            </a>
            <a
              href="mailto:support@icetale.net"
              className="btn btn-ghost"
              style={{ textDecoration: "none", fontSize: ".88rem" }}
            >
              <Mail size={14} /> Написать письмо
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
