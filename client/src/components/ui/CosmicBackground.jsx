const CosmicBackground = () => (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#070b18]" aria-hidden="true">
        <div className="cosmic-stars absolute inset-0 opacity-70" />
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-emerald-400/10 blur-[120px]" />
        <div className="absolute -right-40 top-1/3 h-[34rem] w-[34rem] rounded-full bg-amber-400/10 blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="cosmic-grid absolute inset-0 opacity-20" />
    </div>
);

export default CosmicBackground;
