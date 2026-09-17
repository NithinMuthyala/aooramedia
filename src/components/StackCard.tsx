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
  color: string;
  accentColor: string;
}

const cards: StackCard[] = [
  {
    id: 1,
    icon: "◈",
    label: "Web Development",
    title: "High-performance websites",
    stat: "50+",
    statLabel: "Projects delivered",
    color: "from-[#38BDF8]/20 to-[#7C3AED]/10",
    accentColor: "#38BDF8",
  },
  {
    id: 2,
    icon: "◆",
    label: "UI/UX Design",
    title: "Experiences that convert",
    stat: "99%",
    statLabel: "Client satisfaction",
    color: "from-[#7C3AED]/20 to-[#38BDF8]/10",
    accentColor: "#7C3AED",
  },
  {
    id: 3,
    icon: "◉",
    label: "AI & Automation",
    title: "Intelligent digital products",
    stat: "5x",
    statLabel: "Faster delivery",
    color: "from-[#38BDF8]/15 to-[#7C3AED]/15",
    accentColor: "#38BDF8",
  },
  {
    id: 4,
    icon: "⬡",
    label: "Mobile Apps",
    title: "Native-grade experiences",
    stat: "20+",
    statLabel: "Happy clients",
    color: "from-[#7C3AED]/15 to-[#38BDF8]/20",
    accentColor: "#7C3AED",
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
    { scale: 1,    y: 0,  opacity: 1,    zIndex: 4, rotateZ: 0 },
    { scale: 0.94, y: 18, opacity: 0.75, zIndex: 3, rotateZ: -1.5 },
    { scale: 0.88, y: 34, opacity: 0.45, zIndex: 2, rotateZ: 1 },
    { scale: 0.82, y: 48, opacity: 0.2,  zIndex: 1, rotateZ: -0.5 },
  ];

  return (
    <div className="relative w-full h-[320px] flex items-start justify-center perspective-1000">
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
                  border border-white/80 bg-white/65 backdrop-blur-2xl
                  shadow-2xl shadow-slate-900/10
                  px-7 py-6
                  ${index === 0 ? "cursor-pointer" : "pointer-events-none"}
                `}
              >
                {/* Background gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-60`}
                />

                {/* Glow blob */}
                <div
                  className="absolute -right-8 -top-8 h-28 w-28 rounded-full blur-[50px]"
                  style={{ background: card.accentColor, opacity: 0.2 }}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Top row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Icon badge */}
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/70 bg-white/80 text-lg shadow-sm backdrop-blur-xl"
                        style={{ color: card.accentColor }}
                      >
                        {card.icon}
                      </div>

                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1F2937]/50">
                        {card.label}
                      </span>
                    </div>

                    {/* Tap hint on top card */}
                    {index === 0 && (
                      <div className="flex items-center gap-1.5 rounded-full border border-[#C0C7D1]/40 bg-white/60 px-3 py-1 text-[10px] text-[#1F2937]/40 backdrop-blur-xl">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8] animate-pulse" />
                        tap
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <p className="mt-4 text-lg font-bold leading-tight tracking-[-0.02em] text-[#1F2937]">
                    {card.title}
                  </p>

                  {/* Divider */}
                  <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-[#C0C7D1]/50 to-transparent" />

                  {/* Stat row */}
                  <div className="mt-4 flex items-end justify-between">
                    <div>
                      <p
                        className="text-3xl font-bold tracking-[-0.04em]"
                        style={{ color: card.accentColor }}
                      >
                        {card.stat}
                      </p>
                      <p className="text-xs text-[#1F2937]/45 mt-0.5">
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
                                : `${card.accentColor}40`,
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
