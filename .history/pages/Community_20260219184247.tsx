import React from "react";
import { Send, Youtube, Mail, ExternalLink } from "lucide-react";

export const Community: React.FC = () => (
  <div style={{ background: "var(--bg)", minHeight: "100vh", paddingTop: 60 }}>
    <div className="container-sm" style={{ paddingTop: 72, paddingBottom: 80 }}>
      <div style={{ marginBottom: 52 }}>
        <div className="tag" style={{ marginBottom: 14 }}>
          Сообщество
        </div>
        <h1 style={{ fontSize: 42, fontWeight: 800, marginBottom: 14 }}>
          Следи за нами
        </h1>
        <p style={{ color: "var(--t2)", fontSize: 16, lineHeight: 1.65 }}>
          Новости, анонсы и общение с командой — всё здесь.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {/* Telegram */}
        <div className="social-card">
          <div
            className="social-icon-wrap"
            style={{ background: "rgba(0,136,204,0.12)", color: "#0088cc" }}
          >
            <Send size={20} />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 8,
                }}
              >
                <h3 style={{ fontSize: 18, fontWeight: 700 }}>Telegram</h3>
                <span style={{ fontSize: 13, color: "var(--t3)" }}>
                  @icetale
                </span>
              </div>
              <p style={{ color: "var(--t2)", fontSize: 14, lineHeight: 1.6 }}>
                Главный канал сервера: анонсы, новости разработки, общение с
                администрацией.
              </p>
            </div>
            <a
              href="https://t.me/icetale"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-blue btn-sm"
              style={{ textDecoration: "none", flexShrink: 0 }}
            >
              Перейти <ExternalLink size={13} />
            </a>
          </div>
        </div>

        {/* YouTube */}
        <div className="social-card">
          <div
            className="social-icon-wrap"
            style={{ background: "rgba(255,0,0,0.1)", color: "#f00" }}
          >
            <Youtube size={20} />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 8,
                }}
              >
                <h3 style={{ fontSize: 18, fontWeight: 700 }}>YouTube</h3>
                <span style={{ fontSize: 13, color: "var(--t3)" }}>
                  @IceTale
                </span>
              </div>
              <p style={{ color: "var(--t2)", fontSize: 14, lineHeight: 1.6 }}>
                Гайды, летсплеи и обзоры обновлений от команды администрации.
              </p>
            </div>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-sm"
              style={{ textDecoration: "none", flexShrink: 0 }}
            >
              Смотреть <ExternalLink size={13} />
            </a>
          </div>
        </div>

        {/* Email */}
        <div className="social-card">
          <div
            className="social-icon-wrap"
            style={{ background: "var(--blue-dim)", color: "var(--blue)" }}
          >
            <Mail size={20} />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 8,
                }}
              >
                <h3 style={{ fontSize: 18, fontWeight: 700 }}>Поддержка</h3>
                <a
                  href="mailto:support@icetale.net"
                  style={{
                    fontSize: 13,
                    color: "var(--blue)",
                    textDecoration: "none",
                  }}
                >
                  support@icetale.net
                </a>
              </div>
              <p style={{ color: "var(--t2)", fontSize: 14, lineHeight: 1.6 }}>
                Вопросы по оплате, жалобы и предложения — ответим в течение 24
                часов.
              </p>
            </div>
            <div
              style={{
                display: "flex",
                gap: 8,
                flexShrink: 0,
                flexWrap: "wrap",
              }}
            >
              <a
                href="https://t.me/icetale_support"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-blue btn-sm"
                style={{ textDecoration: "none" }}
              >
                <Send size={13} /> Telegram
              </a>
              <a
                href="mailto:support@icetale.net"
                className="btn btn-ghost btn-sm"
                style={{ textDecoration: "none" }}
              >
                <Mail size={13} /> Письмо
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
