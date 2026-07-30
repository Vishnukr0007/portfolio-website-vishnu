import React from 'react';
import { motion } from 'framer-motion';

const GlowCard = ({ children, className = '', glowColor = 'gold', onClick, ...props }) => {
  const glowStyles = {
    gold: 'hover:border-amber-500/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]',
    emerald: 'hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]',
    cyan: 'hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]',
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={onClick}
      className={`relative rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-[#0a0f1d]/80 p-6 backdrop-blur-xl transition-all duration-300 shadow-md ${
        glowStyles[glowColor] || glowStyles.gold
      } ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlowCard;
