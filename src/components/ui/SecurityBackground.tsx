'use client';

export default function SecurityBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Animated network lines */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.1" />
          </linearGradient>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="url(#gridGradient)" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Animated connection lines */}
        <g className="animate-pulse">
          <line x1="10%" y1="20%" x2="30%" y2="40%" stroke="#3B82F6" strokeWidth="0.5" opacity="0.3" />
          <line x1="30%" y1="40%" x2="50%" y2="30%" stroke="#3B82F6" strokeWidth="0.5" opacity="0.3" />
          <line x1="50%" y1="30%" x2="70%" y2="50%" stroke="#3B82F6" strokeWidth="0.5" opacity="0.3" />
          <line x1="70%" y1="50%" x2="90%" y2="40%" stroke="#3B82F6" strokeWidth="0.5" opacity="0.3" />
          
          <line x1="15%" y1="60%" x2="35%" y2="80%" stroke="#8B5CF6" strokeWidth="0.5" opacity="0.3" />
          <line x1="35%" y1="80%" x2="55%" y2="70%" stroke="#8B5CF6" strokeWidth="0.5" opacity="0.3" />
          <line x1="55%" y1="70%" x2="75%" y2="85%" stroke="#8B5CF6" strokeWidth="0.5" opacity="0.3" />
          
          <line x1="20%" y1="10%" x2="40%" y2="25%" stroke="#10B981" strokeWidth="0.5" opacity="0.3" />
          <line x1="40%" y1="25%" x2="60%" y2="15%" stroke="#10B981" strokeWidth="0.5" opacity="0.3" />
          <line x1="60%" y1="15%" x2="80%" y2="30%" stroke="#10B981" strokeWidth="0.5" opacity="0.3" />
        </g>
        
        {/* Network nodes */}
        <g className="animate-pulse">
          <circle cx="10%" cy="20%" r="3" fill="#3B82F6" opacity="0.6" />
          <circle cx="30%" cy="40%" r="3" fill="#3B82F6" opacity="0.6" />
          <circle cx="50%" cy="30%" r="3" fill="#3B82F6" opacity="0.6" />
          <circle cx="70%" cy="50%" r="3" fill="#3B82F6" opacity="0.6" />
          <circle cx="90%" cy="40%" r="3" fill="#3B82F6" opacity="0.6" />
          
          <circle cx="15%" cy="60%" r="3" fill="#8B5CF6" opacity="0.6" />
          <circle cx="35%" cy="80%" r="3" fill="#8B5CF6" opacity="0.6" />
          <circle cx="55%" cy="70%" r="3" fill="#8B5CF6" opacity="0.6" />
          <circle cx="75%" cy="85%" r="3" fill="#8B5CF6" opacity="0.6" />
          
          <circle cx="20%" cy="10%" r="3" fill="#10B981" opacity="0.6" />
          <circle cx="40%" cy="25%" r="3" fill="#10B981" opacity="0.6" />
          <circle cx="60%" cy="15%" r="3" fill="#10B981" opacity="0.6" />
          <circle cx="80%" cy="30%" r="3" fill="#10B981" opacity="0.6" />
        </g>
      </svg>
      
      {/* Floating security icons */}
      <div className="absolute top-10 left-10 text-blue-500 opacity-10 animate-pulse">
        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
        </svg>
      </div>
      
      <div className="absolute top-20 right-20 text-purple-500 opacity-10 animate-pulse" style={{animationDelay: '1s'}}>
        <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      </div>
      
      <div className="absolute bottom-20 left-20 text-green-500 opacity-10 animate-pulse" style={{animationDelay: '2s'}}>
        <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
        </svg>
      </div>
      
      <div className="absolute bottom-10 right-10 text-orange-500 opacity-10 animate-pulse" style={{animationDelay: '3s'}}>
        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
        </svg>
      </div>
      
      {/* Binary code overlay */}
      <div className="absolute inset-0 opacity-5 font-mono text-xs text-green-400 select-none">
        <div className="absolute top-5 left-5">01001000 01100101 01101100 01101100 01101111</div>
        <div className="absolute top-15 right-10">01110011 01100101 01100011 01110101 01110010</div>
        <div className="absolute bottom-20 left-10">01110100 01110010 01100001 01100011 01101011</div>
        <div className="absolute bottom-10 right-5">01100101 01110010 00100000 01110000 01110010</div>
      </div>
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-purple-900/5 to-green-900/5"></div>
    </div>
  );
}
