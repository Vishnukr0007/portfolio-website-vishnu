import React from 'react';

const BotanicalDivider = ({ flip = false, className = '' }) => {
  return (
    <div className={`relative w-full flex items-center justify-center py-6 overflow-hidden pointer-events-none select-none ${className}`}>
      <div className={`flex items-center gap-4 text-emerald-500/40 dark:text-emerald-400/30 ${flip ? 'scale-x-[-1]' : ''}`}>
        {/* Glowing starlight/vine SVG */}
        <svg width="180" height="24" viewBox="0 0 180 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-40 sm:w-56 h-auto opacity-70">
          <path d="M0 12H70C80 12 85 4 95 4C105 4 110 12 120 12H180" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3"/>
          <circle cx="95" cy="4" r="3" fill="#f59e0b" className="starlight-glow"/>
          {/* Subtle leaves */}
          <path d="M40 12C43 7 50 6 52 11C47 12 42 15 40 12Z" fill="#10b981" className="opacity-80"/>
          <path d="M140 12C137 7 130 6 128 11C133 12 138 15 140 12Z" fill="#10b981" className="opacity-80"/>
        </svg>
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
        <svg width="180" height="24" viewBox="0 0 180 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-40 sm:w-56 h-auto opacity-70 scale-x-[-1]">
          <path d="M0 12H70C80 12 85 4 95 4C105 4 110 12 120 12H180" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3"/>
          <circle cx="95" cy="4" r="3" fill="#f59e0b" className="starlight-glow"/>
          <path d="M40 12C43 7 50 6 52 11C47 12 42 15 40 12Z" fill="#10b981" className="opacity-80"/>
          <path d="M140 12C137 7 130 6 128 11C133 12 138 15 140 12Z" fill="#10b981" className="opacity-80"/>
        </svg>
      </div>
    </div>
  );
};

export default BotanicalDivider;
