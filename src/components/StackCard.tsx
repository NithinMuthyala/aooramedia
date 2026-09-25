"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface StackCard {
  id: number;
  icon: string;
  label: string;
  title: string;
  stat: string;
  statLabel: string;
  color: string;        // bg gradient classes
  accentColor: string;  // inline color for icon / stat / bars
}

const cards: StackCard[] = [
  {
    id: 1,
    icon: "◈",
    label: "Web Development",
    title: "High-performance websites",
    stat: "50+",
    statLabel: "Projects delivered",
    color: "from-[#A90016]/18 to-[#72000F]/8",
    accentColor: "#A90016",
  },
  {
    id: 2,
    icon: "◆",
    label: "UI/UX Design",
    title: "Experiences that convert",
    stat: "99%",
    statLabel: "Client satisfaction",
    color: "from-[#F5B800]/18 to-[#A90016]/8",
    accentColor: "#F5B800",
  },
  {
    id: 3,
    icon: "◉",
    label: "AI & Automation",
    title: "Intelligent digital products",
    stat: "5x",
    statLabel: "Faster delivery",
    color: "from-[#A90016]/14 to-[#F5B800]/10",
    accentColor: "#A90016",
  },
  {
    id: 4,
    icon: "⬡",
    label: "Mobile Apps",
    title: "Native-grade experiences",
    stat: "20+",
    statLabel: "Happy clients",
    color: "from-[#D4A000]/15 to-[#A90016]/12",
    accentColor: "#D4A000",
  },
];

export default function StackCard() {
  const [deck, setDeck] = useState(cards);

  /* -------------------------------------------------------
     Auto-cycle: pop top card every 3.2s
  ------------------------------------------------------- */
  useEffect(() => {
    const interval = setInterval(() => {
      setDeck((prev) => {
        const [first, ...rest] = prev;
        return [...rest, first];
      });
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  /* Stack visual offsets — index 0 = top card */
  const stackStyles = [
    { scale: 1,    y: 0,  opacity: 1,   zIndex: 4, rotateZ: 0 },
    { scale: 0.95, y: 12, opacity: 0,   zIndex: 3, rotateZ: -1 },
    { scale: 0.90, y: 22, opacity: 0,   zIndex: 2, rotateZ: 0.7 },
    { scale: 0.85, y: 30, opacity: 0,   zIndex: 1, rotateZ: -0.4 },
  ];

  return (
    <div className="relative w-full h-[300px] flex items-start justify-center perspective-1000 overflow-hidden">
      <AnimatePresence mode="popLayout">
        {deck.slice(0, 4).map((card, index) => {
          const style = stackStyles[index];
          return (
            <motion.div
              key={card.id}
              layout
              initial={
                index === deck.length - 1
                  ? { y: 80, opacity: 0, scale: 0.80, rotateZ: 2 }
                  : false
              }
              animate={{
                scale: style.scale,
                y: style.y,
                opacity: style.opacity,
                rotateZ: style.rotateZ,
                zIndex: style.zIndex,
              }}
              exit={{
                y: -100,
                opacity: 0,
                scale: 0.85,
                rotateZ: -8,
                rotateX: -15,
              }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 28,
                mass: 0.9,
              }}
              style={{ position: "absolute", width: "100%", top: 0 }}
              onClick={() => {
                if (index === 0) {
                  setDeck((prev) => {
                    const [first, ...rest] = prev;
                    return [...rest, first];
                  });
                }
              }}
            >
              <div
                className={`
                  relative overflow-hidden rounded-[1.75rem]
                  border border-[#A90016]/20 bg-white/80 backdrop-blur-2xl
                  shadow-2xl shadow-[#A90016]/10
                  px-7 py-6
                  ${index === 0 ? "cursor-pointer" : "pointer-events-none"}
                `}
              >
                {/* Background gradient — deep red palette */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-70`}
                />

                {/* Glow blob — top-right corner */}
                <div
                  className="absolute -right-8 -top-8 h-28 w-28 rounded-full blur-[50px]"
                  style={{ background: card.accentColor, opacity: 0.18 }}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Top row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Icon badge — deep red bg, gold icon */}
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-2xl text-lg shadow-sm"
                        style={{
                          background: `${card.accentColor}18`,
                          border: `1px solid ${card.accentColor}30`,
                          color: card.accentColor,
                        }}
                      >
                        {card.icon}
                      </div>

                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1D1D1F]/55">
                        {card.label}
                      </span>
                    </div>

                    {/* Tap hint on top card */}
                    {index === 0 && (
                      <div className="flex items-center gap-1.5 rounded-full border border-[#F5B800]/30 bg-[#F5B800]/8 px-3 py-1 text-[10px] text-[#1D1D1F]/45 backdrop-blur-xl">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#A90016] animate-pulse" />
                        tap
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <p className="mt-4 text-lg font-bold leading-tight tracking-[-0.02em] text-[#1D1D1F]">
                    {card.title}
                  </p>

                  {/* Divider — red to gold */}
                  <div className="mt-4 h-px w-full bg-gradient-to-r from-[#A90016]/30 via-[#F5B800]/40 to-transparent" />

                  {/* Stat row */}
                  <div className="mt-4 flex items-end justify-between">
                    <div>
                      <p
                        className="text-3xl font-bold tracking-[-0.04em]"
                        style={{ color: card.accentColor }}
                      >
                        {card.stat}
                      </p>
                      <p className="text-xs text-[#1D1D1F]/45 mt-0.5">
                        {card.statLabel}
                      </p>
                    </div>

                    {/* Mini bar chart decoration */}
                    <div className="flex items-end gap-1 h-8">
                      {[40, 65, 50, 80, 60, 90, 75].map((h, i) => (
                        <div
                          key={i}
                          className="w-1.5 rounded-full"
                          style={{
                            height: `${h}%`,
                            background:
                              i === 6
                                ? card.accentColor
                                : `${card.accentColor}35`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
