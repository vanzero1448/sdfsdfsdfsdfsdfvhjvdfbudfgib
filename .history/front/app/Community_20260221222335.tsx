import React from "react";
import { Send, Youtube, Mail, ExternalLink } from "lucide-react";

export const Community: React.FC = () => (
  <div style={{ background: "var(--bg)", minHeight: "100vh", paddingTop: 60 }}>
    <div className="container-sm" style={{ paddingTop: 72, paddingBottom: 80 }}>
      <div style={{ marginBottom: 52 }}>
        <div className="tag" style={{ marginBottom: 14 }}>
          Community
        </div>
        <h1 style={{ fontSize: 42, fontWeight: 800, marginBottom: 14 }}>
          Follow Us
        </h1>
        <p style={{ color: "var(--t2)", fontSize: 16, lineHeight: 1.65 }}>
          News, announcements, and direct chat with the team — all right here.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
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
                <span style={{ fontSize: 13, color: "var(--t3)" }}>@pixel</span>
              </div>
              <p style={{ color: "var(--t2)", fontSize: 14, lineHeight: 1.6 }}>
                The main server channel: announcements, dev logs, and admin
                interaction.
              </p>
            </div>
            <a
              href="https://t.me/pixel"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-blue btn-sm"
              style={{ textDecoration: "none", flexShrink: 0 }}
            >
              Join <ExternalLink size={13} />
            </a>
          </div>
        </div>

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
                  @PixelServer
                </span>
              </div>
              <p style={{ color: "var(--t2)", fontSize: 14, lineHeight: 1.6 }}>
                Guides, let's plays, and update reviews from our administration
                team.
              </p>
            </div>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-sm"
              style={{ textDecoration: "none", flexShrink: 0 }}
            >
              Watch <ExternalLink size={13} />
            </a>
          </div>
        </div>

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
                <h3 style={{ fontSize: 18, fontWeight: 700 }}>Support</h3>
                <a
                  href="mailto:vanzero1337@proton.m"
                  style={{
                    fontSize: 13,
                    color: "var(--blue)",
                    textDecoration: "none",
                  }}
                >
                  support@pixel.net
                </a>
              </div>
              <p style={{ color: "var(--t2)", fontSize: 14, lineHeight: 1.6 }}>
                Payment issues, reports, and suggestions — we reply within 24
                hours.
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
                href="https://t.me/AssistantForAll"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-blue btn-sm"
                style={{ textDecoration: "none" }}
              >
                <Send size={13} /> Telegram
              </a>
              <a
                href="mailto:support@pixel.net"
                className="btn btn-ghost btn-sm"
                style={{ textDecoration: "none" }}
              >
                <Mail size={13} /> Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
