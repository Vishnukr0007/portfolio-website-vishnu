import React from 'react';

const CosmicBackground = () => (
  <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-slate-50 dark:bg-[#060913] transition-colors duration-500" aria-hidden="true">
    {/* Cosmic Stars Layer */}
    <div className="cosmic-stars absolute inset-0 opacity-40 dark:opacity-75" />
    
    {/* Nebula Gradient Accents */}
    <div className="cosmic-nebula-bg absolute inset-0" />
    
    {/* Glowing Nebula Spots (Emerald + Amber + Deep Cyan) */}
    <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 blur-[130px] animate-pulse-glow" />
    <div className="absolute -right-32 top-1/3 h-[30rem] w-[30rem] rounded-full bg-amber-500/10 dark:bg-amber-500/15 blur-[140px]" />
    <div className="absolute bottom-20 left-1/4 h-80 w-80 rounded-full bg-cyan-500/10 dark:bg-cyan-500/10 blur-[130px]" />

    {/* Subtle Grid Overlay */}
    <div className="cosmic-grid absolute inset-0 opacity-15 dark:opacity-25" />
  </div>
);

export default CosmicBackground;
