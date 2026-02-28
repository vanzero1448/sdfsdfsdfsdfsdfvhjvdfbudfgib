import React from "react";
import { ExternalLink, Youtube, Send, Mail } from "lucide-react";

const socials = [
  {
    id: "telegram",
    icon: Send,
    name: "TELEGRAM",
    handle: "@icetale",
    desc: "Главный канал сервера. Анонсы, общение с администрацией и новости разработки.",
    color: "#0088cc",
    bg: "rgba(0,136,204,0.07)",
    border: "rgba(0,136,204,0.3)",
    href: "https://t.me/icetale",
    cta: "ПЕРЕЙТИ В КАНАЛ",
    size: "large",
  },
  {
    id: "youtube",
    icon: Youtube,
    name: "YOUTUBE",
    handle: "@IceTale",
    desc: "Гайды по модам, обзоры обновлений и летсплеи от команды.",
    color: "#ff0000",
    bg: "rgba(255,0,0,0.06)",
    border: "rgba(255,0,0,0.25)",
    href: "https://youtube.com",
    cta: "СМОТРЕТЬ",
    size: "small",
  },
];

export const Community: React.FC = () => {
  return (
    <div
      className="min-h-screen pt-24 pb-16 px-6"
      style={{ background: "var(--bg-void)" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="inline-block font-pixel text-sm tracking-widest px-4 py-1 mb-4"
            style={{
              color: "var(--text-muted)",
              border: "1px solid rgba(0,212,255,0.15)",
              background: "rgba(0,212,255,0.03)",
            }}
          >
            / СВЯЗЬ С СООБЩЕСТВОМ /
          </div>
          <div className="page-header mb-3" data-text="СООБЩЕСТВО">
            СООБЩЕСТВО
          </div>
          <p className="font-mono" style={{ color: "var(--text-secondary)" }}>
            Следи за новостями и будь в центре событий IceTale.
          </p>
        </div>

        {/* Main social cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {socials.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.id}
                className="social-card animated-border fade-up p-8 flex flex-col"
                style={{
                  animationDelay: `${i * 0.15}s`,
                  background: `linear-gradient(135deg, ${s.bg} 0%, var(--bg-card) 100%)`,
                  border: `1px solid ${s.border}`,
                  minHeight: 280,
                }}
              >
                {/* Icon */}
                <div
                  className="mb-4 p-3 inline-flex"
                  style={{
                    background: `${s.color}11`,
                    border: `1px solid ${s.color}33`,
                    width: "fit-content",
                  }}
                >
                  <Icon size={28} style={{ color: s.color }} />
                </div>

                {/* Name */}
                <div
                  className="font-orb font-bold text-2xl mb-1 tracking-wider"
                  style={{ color: "white" }}
                >
                  {s.name}
                </div>
                <div
                  className="font-mono text-sm mb-4"
                  style={{ color: s.color }}
                >
                  {s.handle}
                </div>

                <p
                  className="font-mono text-sm flex-1 mb-6"
                  style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}
                >
                  {s.desc}
                </p>

                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-pixel text-lg tracking-widest py-2 px-5 transition-all duration-300"
                  style={{
                    background: `${s.color}22`,
                    border: `2px solid ${s.color}66`,
                    color: s.color,
                    textDecoration: "none",
                    clipPath:
                      "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
                    width: "fit-content",
                  }}
                >
                  {s.cta} <ExternalLink size={14} />
                </a>
              </div>
            );
          })}
        </div>

        {/* Contact card */}
        <div
          className="social-card fade-up delay-3 p-8"
          style={{ background: "var(--bg-card)" }}
        >
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="p-2"
                  style={{
                    background: "rgba(0,212,255,0.08)",
                    border: "1px solid rgba(0,212,255,0.2)",
                  }}
                >
                  <Mail size={20} style={{ color: "var(--cyan-ice)" }} />
                </div>
                <div>
                  <div
                    className="font-pixel text-xl tracking-widest"
                    style={{ color: "var(--cyan-ice)" }}
                  >
                    СВЯЗЬ С НАМИ
                  </div>
                  <div
                    className="font-mono text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Почта поддержки
                  </div>
                </div>
              </div>

              <a
                href="mailto:support@icetale.net"
                className="font-orb font-bold text-2xl hover:underline block mb-2"
                style={{ color: "white", textDecoration: "none" }}
              >
                support@icetale.net
              </a>
              <p
                className="font-mono text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                Вопросы по оплате, жалобы, предложения — мы ответим в течение 24
                часов.
              </p>
            </div>

            <div className="flex flex-col gap-3 w-full md:w-auto">
              <a
                href="https://t.me/icetale_support"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ice text-lg inline-flex items-center gap-2"
                style={{ textDecoration: "none", justifyContent: "center" }}
              >
                <Send size={16} /> НАПИСАТЬ В TG
              </a>
              <a
                href="mailto:support@icetale.net"
                className="btn-outline-ice text-lg inline-flex items-center gap-2"
                style={{ textDecoration: "none", justifyContent: "center" }}
              >
                <Mail size={16} /> НАПИСАТЬ ПИСЬМО
              </a>
            </div>
          </div>
        </div>

        {/* Decorative bottom element */}
        <div className="mt-12 text-center">
          <div
            className="inline-block font-pixel text-4xl"
            style={{
              color: "rgba(0,212,255,0.15)",
              animation: "spin 20s linear infinite",
              display: "inline-block",
            }}
          >
            ❄
          </div>
          <p
            className="font-mono text-xs mt-2"
            style={{ color: "var(--text-muted)" }}
          >
            Вместе мы строим легенду севера
          </p>
        </div>
      </div>
    </div>
  );
};
