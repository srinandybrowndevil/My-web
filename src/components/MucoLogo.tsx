import React from 'react';

interface MucoLogoProps {
  variant?: 'mark' | 'full' | 'stacked';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'custom';
  customSize?: number;
  className?: string;
  showTagline?: boolean;
  lightText?: boolean;
}

export const MucoLogo: React.FC<MucoLogoProps> = ({
  variant = 'full',
  size = 'md',
  customSize,
  className = '',
  showTagline = true,
  lightText,
}) => {
  // Size mappings
  const markDimensions = {
    sm: 32,
    md: 40,
    lg: 48,
    xl: 64,
    custom: customSize || 40,
  }[size];

  const logoMarkSvg = (
    <svg
      width={markDimensions}
      height={markDimensions}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 group-hover:scale-105"
    >
      {/* Top & Bottom Cyan Vertical Arms & Nodes */}
      <line x1="100" y1="100" x2="100" y2="35" stroke="#38bdf8" strokeWidth="7" strokeLinecap="round" />
      <circle cx="100" cy="32" r="12" fill="#38bdf8" />
      
      <line x1="100" y1="100" x2="100" y2="165" stroke="#38bdf8" strokeWidth="7" strokeLinecap="round" />
      <circle cx="100" cy="168" r="12" fill="#38bdf8" />

      {/* Outer Dark Navy Node Frame (4 Corners) */}
      <line x1="100" y1="100" x2="52" y2="52" stroke="#0284c7" strokeWidth="9" strokeLinecap="round" />
      <line x1="52" y1="52" x2="52" y2="148" stroke="#0284c7" strokeWidth="9" strokeLinecap="round" />
      <line x1="100" y1="100" x2="52" y2="148" stroke="#0284c7" strokeWidth="9" strokeLinecap="round" />
      
      <line x1="100" y1="100" x2="148" y2="52" stroke="#0284c7" strokeWidth="9" strokeLinecap="round" />
      <line x1="148" y1="52" x2="148" y2="148" stroke="#0284c7" strokeWidth="9" strokeLinecap="round" />
      <line x1="100" y1="100" x2="148" y2="148" stroke="#0284c7" strokeWidth="9" strokeLinecap="round" />

      {/* Corner Circles */}
      <circle cx="52" cy="52" r="15" fill="#0369a1" />
      <circle cx="52" cy="148" r="15" fill="#0369a1" />
      <circle cx="148" cy="52" r="15" fill="#0369a1" />
      <circle cx="148" cy="148" r="15" fill="#0369a1" />

      {/* Inner Hexagon / Cube Box */}
      <path d="M100 65 L128 81.5 L128 118.5 L100 135 L72 118.5 L72 81.5 Z" stroke="#0284c7" strokeWidth="7" fill="none" strokeLinejoin="round" />
      <path d="M100 65 L100 100 M128 118.5 L100 100 M72 118.5 L100 100" stroke="#0284c7" strokeWidth="6" strokeLinecap="round" />

      {/* Side Cyan Nodes */}
      <line x1="72" y1="100" x2="52" y2="100" stroke="#38bdf8" strokeWidth="5" />
      <circle cx="52" cy="100" r="7.5" fill="#38bdf8" />
      
      <line x1="128" y1="100" x2="148" y2="100" stroke="#38bdf8" strokeWidth="5" />
      <circle cx="148" cy="100" r="7.5" fill="#38bdf8" />

      {/* Central Hub Circle */}
      <circle cx="100" cy="100" r="9" fill="#0284c7" />
      <circle cx="100" cy="100" r="4" fill="#38bdf8" />

      {/* Circuit Traces & Micro Dots (Top Left) */}
      <path d="M68 38 L80 50 L80 62" stroke="#38bdf8" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="68" cy="38" r="3.5" fill="#38bdf8" />
      
      {/* Circuit Traces & Micro Dots (Top Right) */}
      <path d="M132 38 L120 50 L120 62" stroke="#38bdf8" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="132" cy="38" r="3.5" fill="#38bdf8" />

      {/* Circuit Traces & Micro Dots (Bottom Left) */}
      <path d="M68 162 L80 150 L80 138" stroke="#38bdf8" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="68" cy="162" r="3.5" fill="#38bdf8" />

      {/* Circuit Traces & Micro Dots (Bottom Right) */}
      <path d="M132 162 L120 150 L120 138" stroke="#38bdf8" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="132" cy="162" r="3.5" fill="#38bdf8" />

      {/* Outer Side Micro Traces */}
      <path d="M35 85 L44 85 L48 90" stroke="#0284c7" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="35" cy="85" r="3" fill="#0284c7" />

      <path d="M35 115 L44 115 L48 110" stroke="#0284c7" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="35" cy="115" r="3" fill="#0284c7" />

      <path d="M165 85 L156 85 L152 90" stroke="#0284c7" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="165" cy="85" r="3" fill="#0284c7" />

      <path d="M165 115 L156 115 L152 110" stroke="#0284c7" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="165" cy="115" r="3" fill="#0284c7" />
    </svg>
  );

  if (variant === 'mark') {
    return <div className={`inline-flex items-center justify-center ${className}`}>{logoMarkSvg}</div>;
  }

  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        {logoMarkSvg}
        <div className="mt-2">
          <span className={`font-black text-2xl tracking-wider block ${lightText ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
            MUCO <span className="text-blue-500">LABS</span>
          </span>
          {showTagline && (
            <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500 dark:text-slate-400 block mt-1">
              INNOVATION IN DIGITAL TECHNOLOGY
            </span>
          )}
        </div>
      </div>
    );
  }

  // Full Horizontal Variant
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {logoMarkSvg}
      <div>
        <div className="flex items-center gap-2">
          <span className={`font-black tracking-tight ${
            size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl'
          } ${lightText ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
            MUCO <span className="text-blue-600 dark:text-blue-400">LABS</span>
          </span>
          <span className="text-[9px] font-bold tracking-wider text-blue-600 dark:text-blue-400 uppercase bg-blue-50 dark:bg-blue-950/60 px-1.5 py-0.5 rounded border border-blue-200 dark:border-blue-800/60">
            EST. 2026
          </span>
        </div>
        {showTagline && (
          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold tracking-tight uppercase">
            INNOVATION IN DIGITAL TECHNOLOGY
          </p>
        )}
      </div>
    </div>
  );
};
