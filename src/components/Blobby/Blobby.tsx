import React from 'react';
import { BlobbyExpression, VisualProp } from '../../types/onboarding';

interface BlobbyProps {
  expression?: BlobbyExpression;
  visualProp?: VisualProp;
  isSpeaking?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
  onClick?: () => void;
}

export const Blobby: React.FC<BlobbyProps> = ({
  expression = 'happy',
  visualProp = 'none',
  isSpeaking = false,
  size = 'hero',
  className = '',
  onClick
}) => {
  // Size mapping optimized for single-screen responsive viewport
  const sizeMap = {
    sm: 'w-16 h-16 sm:w-20 sm:h-20',
    md: 'w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28',
    lg: 'w-32 h-32 sm:w-36 sm:h-36',
    hero: 'w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48',
  };

  const isExcited = expression === 'excited' || expression === 'celebrating';
  const isCurious = expression === 'curious' || expression === 'thinking';
  const isWaving = expression === 'waving';

  return (
    <div 
      className={`relative inline-flex flex-col items-center justify-center select-none group cursor-pointer shrink-0 ${className}`}
      onClick={onClick}
    >
      {/* Visual Prop: Floating Career Interest Cards (Step 2) */}
      {visualProp === 'floating-cards' && (
        <div className="absolute inset-0 pointer-events-none -z-0">
          <div className="absolute -top-2 -left-4 bg-white border-2 border-[#7956D8] rounded-lg px-2 py-0.5 text-[10px] font-extrabold shadow-sm text-[#7956D8] animate-bounce">
            AI 🤖
          </div>
          <div className="absolute top-1 -right-4 bg-white border-2 border-[#FF914D] rounded-lg px-2 py-0.5 text-[10px] font-extrabold shadow-sm text-[#FF914D] animate-bounce [animation-delay:200ms]">
            Code 💻
          </div>
          <div className="absolute bottom-6 -left-5 bg-white border-2 border-[#FFD45C] rounded-lg px-2 py-0.5 text-[10px] font-extrabold shadow-sm text-[#302747] animate-bounce [animation-delay:400ms]">
            Design 🎨
          </div>
        </div>
      )}

      {/* Visual Prop: Glowing Golden Trophy (Step 4) */}
      {visualProp === 'trophy' && (
        <div className="absolute -bottom-1 -right-3 sm:-right-4 z-20 pointer-events-none animate-bounce [animation-duration:2.5s]">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#FFE793] to-[#FFD45C] border-2 border-[#302747] shadow-sm flex items-center justify-center text-lg sm:text-xl">
            🏆
          </div>
        </div>
      )}

      {/* Visual Prop: Glowing Future Orb / Star (Step 5) */}
      {visualProp === 'glowing-orb' && (
        <div className="absolute -top-3 right-0 sm:right-2 z-20 pointer-events-none animate-pulse">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-[#FFD45C] via-[#FF914D] to-[#FFF] p-1 shadow-[0_0_15px_rgba(255,212,92,0.7)] flex items-center justify-center text-sm">
            ✨
          </div>
        </div>
      )}

      {/* Floating Sparkles when Celebrating */}
      {isExcited && (
        <>
          <div className="absolute -top-4 left-6 animate-bounce text-xl pointer-events-none">✨</div>
          <div className="absolute top-0 right-6 animate-pulse text-lg pointer-events-none">⭐</div>
          <div className="absolute -bottom-2 left-4 animate-ping text-sm pointer-events-none">🎉</div>
        </>
      )}

      {/* Main Mascot Container */}
      <div className={`relative ${sizeMap[size]} transition-transform duration-300 ${
        isExcited 
          ? 'animate-bounce' 
          : isCurious 
          ? 'animate-blobby-float' 
          : 'animate-blobby-breathe'
      } group-hover:scale-105 active:scale-95`}>
        <svg 
          viewBox="0 0 240 240" 
          className="w-full h-full drop-shadow-xl overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Blobby Main Body Gradient: Primary Purple #7956D8 with highlights and shadow */}
            <radialGradient id="blobbyGrad" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#9675EE" />
              <stop offset="60%" stopColor="#7956D8" />
              <stop offset="100%" stopColor="#5E3DB5" />
            </radialGradient>

            {/* Top Shine */}
            <linearGradient id="blobbyShine" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>

            {/* Subtle Orange Cheek Accents: #FF914D */}
            <radialGradient id="cheekGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FF914D" stopOpacity="0.9" />
              <stop offset="80%" stopColor="#FF914D" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FF914D" stopOpacity="0" />
            </radialGradient>

            {/* Arm Gradient */}
            <linearGradient id="armGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8C6CE5" />
              <stop offset="100%" stopColor="#6443BC" />
            </linearGradient>
          </defs>

          {/* Floor Shadow */}
          <ellipse 
            cx="120" 
            cy="224" 
            rx={isExcited ? "52" : "68"} 
            ry="10" 
            fill="#302747" 
            fillOpacity="0.14" 
            className="transition-all duration-300"
          />

          {/* Tiny Feet */}
          <g>
            <ellipse cx="94" cy="216" rx="16" ry="10" fill="#6443BC" />
            <ellipse cx="94" cy="214" rx="14" ry="7" fill="#7956D8" />
            
            <ellipse cx="146" cy="216" rx="16" ry="10" fill="#6443BC" />
            <ellipse cx="146" cy="214" rx="14" ry="7" fill="#7956D8" />
          </g>

          {/* Left Arm */}
          {isWaving ? (
            // Waving Hand
            <g className="animate-blobby-wave origin-[45px_130px]">
              <path 
                d="M 54 135 C 32 110, 18 85, 28 75 C 36 67, 48 82, 60 115 Z" 
                fill="url(#armGrad)" 
                stroke="#5E3DB5" 
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <circle cx="28" cy="74" r="8" fill="#FFD45C" stroke="#e0b83e" strokeWidth="2" />
            </g>
          ) : isExcited ? (
            // Excited Raised Left Hand
            <path 
              d="M 52 140 C 35 118, 25 90, 36 82 C 45 74, 58 98, 64 125 Z" 
              fill="url(#armGrad)" 
              stroke="#5E3DB5" 
              strokeWidth="2"
            />
          ) : isCurious ? (
            // Hand on chin thoughtfully
            <path 
              d="M 52 145 C 36 150, 32 165, 46 172 C 58 178, 64 165, 62 152 Z" 
              fill="url(#armGrad)" 
            />
          ) : (
            // Cute Resting Left Arm
            <path 
              d="M 52 142 C 34 148, 30 166, 44 174 C 58 180, 66 166, 62 150 Z" 
              fill="url(#armGrad)" 
              stroke="#5E3DB5"
              strokeWidth="2"
            />
          )}

          {/* Right Arm */}
          {isExcited ? (
            // Excited Raised Right Hand
            <path 
              d="M 188 140 C 205 118, 215 90, 204 82 C 195 74, 182 98, 176 125 Z" 
              fill="url(#armGrad)" 
              stroke="#5E3DB5" 
              strokeWidth="2"
            />
          ) : visualProp === 'toolkit' ? (
            // Holding Mini Golden Tool/Spark
            <g>
              <path 
                d="M 188 142 C 206 148, 210 166, 196 174 C 182 180, 174 166, 178 150 Z" 
                fill="url(#armGrad)" 
                stroke="#5E3DB5"
                strokeWidth="2"
              />
              {/* Magic Wrench / Spark */}
              <circle cx="204" cy="156" r="8" fill="#FFD45C" stroke="#302747" strokeWidth="2" />
              <path d="M 200 152 L 208 160" stroke="#302747" strokeWidth="2" strokeLinecap="round" />
            </g>
          ) : isCurious ? (
            // Right Hand touching cheek
            <path 
              d="M 186 142 C 198 126, 192 104, 178 112 C 166 120, 172 138, 176 150 Z" 
              fill="url(#armGrad)" 
              stroke="#5E3DB5" 
              strokeWidth="2"
            />
          ) : (
            // Cute Resting Right Arm
            <path 
              d="M 188 142 C 206 148, 210 166, 196 174 C 182 180, 174 166, 178 150 Z" 
              fill="url(#armGrad)" 
              stroke="#5E3DB5"
              strokeWidth="2"
            />
          )}

          {/* Mascot Body: Soft, Rounded Purple Blob */}
          <path
            d="
              M 120 34
              C 168 34, 204 68, 204 122
              C 204 178, 174 216, 120 216
              C 66 216, 36 178, 36 122
              C 36 68, 72 34, 120 34
              Z
            "
            fill="url(#blobbyGrad)"
            stroke="#5E3DB5"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Top Soft Gloss */}
          <path
            d="
              M 82 52
              C 105 40, 135 40, 158 52
              C 145 62, 95 62, 82 52
              Z
            "
            fill="url(#blobbyShine)"
          />

          {/* VISUAL PROP: Graduation Mortarboard Cap (Step 1 — Education) */}
          {visualProp === 'graduation-cap' ? (
            <g className="animate-pop-in">
              {/* Cap Diamond */}
              <polygon 
                points="120,6 168,22 120,38 72,22" 
                fill="#302747" 
                stroke="#FFD45C" 
                strokeWidth="2.5" 
              />
              {/* Cap Skull Base */}
              <path 
                d="M 94 28 C 94 36, 146 36, 146 28 Z" 
                fill="#201830" 
              />
              {/* Golden Tassel */}
              <line x1="120" y1="22" x2="160" y2="34" stroke="#FFD45C" strokeWidth="2.5" />
              <circle cx="160" cy="36" r="3.5" fill="#FF914D" />
            </g>
          ) : (
            // Default Cute Head Sprout with Golden Star
            <g>
              <path 
                d="M 120 34 Q 124 18 128 10" 
                stroke="#FFD45C" 
                strokeWidth="4" 
                strokeLinecap="round" 
                fill="none" 
              />
              <path 
                d="M 128 8 C 138 4, 142 14, 132 18 C 124 22, 122 12, 128 8 Z" 
                fill="#FFD45C" 
                stroke="#d9af2c" 
                strokeWidth="1.5" 
              />
              <circle cx="127" cy="10" r="2.5" fill="#FFF" />
            </g>
          )}

          {/* Subtle Orange Cheek Accents (#FF914D) */}
          <ellipse cx="68" cy="144" rx="14" ry="9" fill="url(#cheekGlow)" />
          <ellipse cx="172" cy="144" rx="14" ry="9" fill="url(#cheekGlow)" />

          {/* LARGE EXPRESSIVE EYES */}
          {isCurious ? (
            // Curious / Inquiring Eyes looking up and slightly tilted
            <g>
              <ellipse cx="90" cy="115" rx="13" ry="16" fill="#302747" />
              <ellipse cx="94" cy="108" rx="6" ry="6" fill="#FFFFFF" />
              <circle cx="86" cy="122" r="2.5" fill="#FFFFFF" />

              <ellipse cx="154" cy="115" rx="13" ry="16" fill="#302747" />
              <ellipse cx="158" cy="108" rx="6" ry="6" fill="#FFFFFF" />
              <circle cx="150" cy="122" r="2.5" fill="#FFFFFF" />
            </g>
          ) : isExcited ? (
            // Big Joyful Starry Eyes
            <g>
              <ellipse cx="88" cy="114" rx="15" ry="18" fill="#302747" />
              <ellipse cx="83" cy="107" rx="7" ry="8" fill="#FFFFFF" />
              <circle cx="94" cy="121" r="3" fill="#FFFFFF" />
              <circle cx="83" cy="123" r="2" fill="#FFFFFF" />

              <ellipse cx="152" cy="114" rx="15" ry="18" fill="#302747" />
              <ellipse cx="147" cy="107" rx="7" ry="8" fill="#FFFFFF" />
              <circle cx="158" cy="121" r="3" fill="#FFFFFF" />
              <circle cx="147" cy="123" r="2" fill="#FFFFFF" />
            </g>
          ) : (
            // Default Expressive Eyes with Natural Blinking
            <g className="animate-blobby-blink origin-[120px_116px]">
              <ellipse cx="88" cy="116" rx="13" ry="16" fill="#302747" />
              <ellipse cx="84" cy="110" rx="5" ry="6" fill="#FFFFFF" />
              <circle cx="93" cy="122" r="2.5" fill="#FFFFFF" />

              <ellipse cx="152" cy="116" rx="13" ry="16" fill="#302747" />
              <ellipse cx="148" cy="110" rx="5" ry="6" fill="#FFFFFF" />
              <circle cx="157" cy="122" r="2.5" fill="#FFFFFF" />
            </g>
          )}

          {/* SMALL FRIENDLY SMILE */}
          {isSpeaking ? (
            // Animated Speaking Mouth
            <ellipse 
              cx="120" 
              cy="150" 
              rx="9" 
              ry="11" 
              fill="#302747" 
              className="animate-pulse origin-center"
            >
              <ellipse cx="120" cy="154" rx="6" ry="4" fill="#FF914D" />
            </ellipse>
          ) : isExcited ? (
            // Open Joyful Grin
            <g>
              <path 
                d="M 104 144 Q 120 166 136 144 Z" 
                fill="#302747" 
              />
              <path 
                d="M 112 153 Q 120 162 128 153 Z" 
                fill="#FF914D" 
              />
            </g>
          ) : isCurious ? (
            // Small Curious O-Mouth
            <ellipse cx="123" cy="148" rx="5" ry="6" fill="#302747" />
          ) : (
            // Small Friendly Smile
            <path 
              d="M 108 144 Q 120 156 132 144" 
              stroke="#302747" 
              strokeWidth="4" 
              strokeLinecap="round" 
              fill="none" 
            />
          )}
        </svg>
      </div>
    </div>
  );
};
