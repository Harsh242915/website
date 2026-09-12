interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showText?: boolean;
}

export function Logo({ size = 'md', className = '', showText = true }: LogoProps) {
  const sizeMap = {
    sm: { icon: 'w-7 h-7', text: 'text-base', subtext: 'text-[8px]' },
    md: { icon: 'w-8 h-8', text: 'text-lg', subtext: 'text-[9px]' },
    lg: { icon: 'w-10 h-10', text: 'text-2xl', subtext: 'text-[10px]' },
  };

  const { icon, text, subtext } = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Dynamic Geometric Vector Mark */}
      <div className={`relative ${icon} shrink-0 group-hover:scale-105 transition-transform duration-300`}>
        {/* Ambient Glow */}
        <div className="absolute inset-0 bg-[#d8ff38]/30 blur-md rounded-xl" />
        
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative w-full h-full drop-shadow-[0_0_12px_rgba(216,255,56,0.4)]"
        >
          {/* Background Rounded Container */}
          <rect
            width="40"
            height="40"
            rx="10"
            fill="#0f0b18"
            stroke="#2f273c"
            strokeWidth="1.5"
          />

          {/* Primary Drift Wing / Rocket Vector (Electric Lime) */}
          <path
            d="M20 7L31 28H23.5L20 18.5L16.5 28H9L20 7Z"
            fill="url(#ld-lime-grad)"
          />

          {/* Inner Accent Core (Cyber Cyan) */}
          <path
            d="M20 13L24.5 24H20L15.5 24L20 13Z"
            fill="#0d0a12"
          />
          <path
            d="M20 15L23 23H20.8L20 20L19.2 23H17L20 15Z"
            fill="url(#ld-cyan-grad)"
          />

          {/* Speed Particle Dots */}
          <circle cx="12" cy="31" r="1.5" fill="#d8ff38" />
          <circle cx="20" cy="32" r="1.8" fill="#38bdf8" />
          <circle cx="28" cy="31" r="1.5" fill="#d8ff38" />

          {/* Linear Gradients */}
          <defs>
            <linearGradient id="ld-lime-grad" x1="9" y1="7" x2="31" y2="28" gradientUnits="userSpaceOnUse">
              <stop stopColor="#d8ff38" />
              <stop offset="1" stopColor="#a3e635" />
            </linearGradient>
            <linearGradient id="ld-cyan-grad" x1="17" y1="15" x2="23" y2="23" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38bdf8" />
              <stop offset="1" stopColor="#818cf8" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span className={`font-display font-black tracking-tight text-white group-hover:text-[#d8ff38] transition-colors ${text}`}>
              LAUNCHDRIFT
            </span>
          </div>
          <span className={`font-mono text-[#9c93a8] tracking-[0.2em] uppercase font-semibold mt-0.5 ${subtext}`}>
            STUDIO // ARCHITECTURE
          </span>
        </div>
      )}
    </div>
  );
}
