import React, { useMemo } from "react";

const SNOWFLAKES = ["❄", "❅", "❆", "*", "·", "•"];

export const Snow: React.FC = () => {
  const flakes = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        animationDuration: `${8 + Math.random() * 15}s`,
        animationDelay: `${-Math.random() * 20}s`,
        fontSize: `${0.5 + Math.random() * 1.2}em`,
        opacity: 0.2 + Math.random() * 0.5,
        char: SNOWFLAKES[Math.floor(Math.random() * SNOWFLAKES.length)],
      })),
    [],
  );

  return (
    <div className="snow-container">
      {flakes.map((f) => (
        <div
          key={f.id}
          className="snowflake"
          style={{            left: f.left,
            fontSize: f.fontSize,
            opacity: f.opacity,
            animationDuration: f.animationDuration,
            animationDelay: f.animationDelay,
          }}
        >
          {f.char}
        </div>
      ))}
    </div>
  );
};
