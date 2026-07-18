"use client";

import { motion } from "motion/react";

export default function () {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full   bg-[var(--bg-darkBlue-transparent)]"
          style={{
            boxShadow: "0 0 20px rgba(50, 50, 50, 0.5)",
            width: `${Math.random() * 200 + 50}px`,
            height: `${Math.random() * 200 + 50}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
          }}
          transition={{
            duration: Math.random() * 2 + 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        ></motion.div>
      ))}
    </div>
  );
}
