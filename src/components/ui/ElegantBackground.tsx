'use client';

export default function ElegantBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Deep dark base */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-[#0a1a14] to-gray-950"></div>

      {/* Circuit-board grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="circuitGrid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#4ade80" strokeWidth="0.4"/>
            <circle cx="0"  cy="0"  r="1.5" fill="#4ade80"/>
            <circle cx="60" cy="0"  r="1.5" fill="#4ade80"/>
            <circle cx="0"  cy="60" r="1.5" fill="#4ade80"/>
            <circle cx="60" cy="60" r="1.5" fill="#4ade80"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuitGrid)" />
      </svg>

      {/* Circuit trace lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="traces" width="200" height="200" patternUnits="userSpaceOnUse">
            <path d="M0 100 H80 V40 H120 V100 H200" fill="none" stroke="#4ade80" strokeWidth="1"/>
            <path d="M100 0 V60 H160 V140 H100 V200" fill="none" stroke="#4ade80" strokeWidth="1"/>
            <circle cx="80"  cy="100" r="3" fill="none" stroke="#4ade80" strokeWidth="0.8"/>
            <circle cx="120" cy="40"  r="3" fill="none" stroke="#4ade80" strokeWidth="0.8"/>
            <circle cx="160" cy="60"  r="3" fill="none" stroke="#4ade80" strokeWidth="0.8"/>
            <circle cx="100" cy="140" r="3" fill="none" stroke="#4ade80" strokeWidth="0.8"/>
            <rect x="95"  y="95"  width="10" height="10" rx="2" fill="none" stroke="#4ade80" strokeWidth="0.6"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#traces)" />
      </svg>

      {/* Soft green glow orbs */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px]"></div>
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-green-600/8 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-0 left-1/4 w-[450px] h-[450px] bg-emerald-700/8 rounded-full blur-[100px]"></div>

      {/* Network topology accents (router / switch icons via tiny SVG) */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        {/* Router icon at top-left */}
        <circle cx="15%" cy="20%" r="18" fill="none" stroke="#4ade80" strokeWidth="1.2"/>
        <line x1="15%" y1="20%" x2="25%" y2="35%" stroke="#4ade80" strokeWidth="0.6"/>
        {/* Switch icon at center */}
        <rect x="48%" y="45%" width="36" height="20" rx="4" fill="none" stroke="#4ade80" strokeWidth="1"/>
        <line x1="48%" y1="55%" x2="38%" y2="70%" stroke="#4ade80" strokeWidth="0.6"/>
        <line x1="52%" y1="55%" x2="62%" y2="70%" stroke="#4ade80" strokeWidth="0.6"/>
        {/* Router icon at bottom-right */}
        <circle cx="80%" cy="75%" r="18" fill="none" stroke="#4ade80" strokeWidth="1.2"/>
        <line x1="80%" y1="75%" x2="52%" y2="55%" stroke="#4ade80" strokeWidth="0.6" strokeDasharray="6 4"/>
      </svg>

      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.5)_100%)]"></div>
    </div>
  );
}
