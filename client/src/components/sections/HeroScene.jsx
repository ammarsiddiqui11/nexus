import React from 'react';

const HeroScene = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[var(--color-bg-950)] pointer-events-none">
      {/* 1. Subtle Animated Grid (SVG) */}
      <div className="absolute inset-0 opacity-[0.15]" 
           style={{ maskImage: 'linear-gradient(to bottom, transparent, black, transparent)' }}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00d4ff" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" className="animate-grid-scroll" />
        </svg>
      </div>

      {/* 2. Glowing Orb (CSS Blur - much faster than 3D) */}
      <div 
        className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#0066ff] rounded-full mix-blend-screen filter blur-[80px] opacity-20 animate-float"
      />
      
      {/* 3. Secondary accent glow */}
      <div 
        className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-[#00d4ff] rounded-full mix-blend-screen filter blur-[120px] opacity-10 animate-float-delayed"
      />

      {/* 4. Subtle Particle effect (Optional - CSS based) */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-150 contrast-150" />

      <style jsx>{`
        @keyframes grid-scroll {
          from { transform: translateY(0); }
          to { transform: translateY(40px); }
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-20px, 20px) scale(1.1); }
        }
        .animate-grid-scroll {
          animation: grid-scroll 3s linear infinite;
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 12s ease-in-out infinite reverse;
        }
      `}</style>
    </div>
  );
};

export default HeroScene;