import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useImages } from '../contexts/ImageContext';

interface HubProps {
  scrollOffset?: number;
  onNavigate?: () => void;
}

const Hub: React.FC<HubProps> = ({ scrollOffset, onNavigate }) => {
  const { images } = useImages();

  return (
    <section className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 border-t border-white/10 bg-brand-charcoal group/section relative">
      
      {/* Left: Visual */}
      <div className="relative h-[50vh] lg:h-auto lg:min-h-screen w-full tech-reveal group overflow-hidden cursor-pointer" onClick={onNavigate}>
        <img 
          src={images.hub.main}
          alt="Skater Urban" 
          className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-in-out will-change-transform"
        />
        
        {/* Color Tint Overlay */}
        <div className="absolute inset-0 bg-brand-purple/30 mix-blend-overlay transition-opacity duration-700 group-hover:opacity-0" />
        
        {/* Dark Gradient from bottom for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-transparent opacity-90" />
        
        {/* Scanline Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none opacity-30 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_3px,3px_100%]" />

        {/* Text Content */}
        <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-20 transform transition-transform duration-700 group-hover:-translate-y-2">
           <div className="bg-brand-lime text-black font-bold text-xs inline-block px-3 py-1 mb-4 transform -skew-x-12 shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-transform group-hover:skew-x-0">
              EST. 2024
           </div>
           <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white tracking-tighter leading-[0.85] group-hover:text-brand-lime transition-colors duration-500 drop-shadow-lg">
             CREATIVE<br/>COLLECTIVE
           </h2>
        </div>
      </div>

      {/* Right: Manifesto Content */}
      <div 
        className="flex flex-col justify-center p-8 md:p-12 lg:p-16 xl:p-20 relative overflow-hidden tech-reveal delay-200 bg-gradient-to-br from-brand-charcoal via-[#1a1520] to-[#2a1035] group-hover/section:bg-brand-purple/5 transition-colors duration-1000"
      >
        
        {/* Decorative Background Blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-brand-purple/20 blur-[100px] opacity-30 pointer-events-none group-hover/section:opacity-50 transition-opacity duration-700" />
        <div className="absolute bottom-0 left-0 w-48 h-48 md:w-64 md:h-64 bg-brand-orange/10 blur-[80px] opacity-30 pointer-events-none group-hover/section:opacity-50 transition-opacity duration-700" />
        
        <div className="relative z-10 max-w-xl">
          <h2 
            className="text-6xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.85] mb-8 md:mb-12 text-white cursor-pointer break-words"
            onClick={onNavigate}
          >
            ONE<br />
            EIGHTY<br />
            <span 
              className="bg-clip-text text-transparent bg-gradient-to-r from-brand-orange via-brand-purple to-brand-lime bg-[length:0%_100%] bg-left bg-no-repeat transition-[background-size] duration-700 group-hover/section:bg-[length:100%_100%]"
              style={{ WebkitTextStroke: '1px white' }}
            >
              HUB
            </span>
          </h2>

          <div className="space-y-4 md:space-y-6 text-gray-200 text-base md:text-lg lg:text-xl font-light leading-relaxed border-l-4 border-brand-lime pl-6 md:pl-8 mb-8 md:mb-12 transform transition-all group-hover/section:border-brand-purple duration-500 bg-white/5 p-6 rounded-r-xl backdrop-blur-sm group-hover/section:translate-x-2">
            <p>
              We aren't just a church. We are a creative collective. A safe haven for the misfits, the artists, the skaters, and the dreamers.
            </p>
            <p className="hidden md:block">
              Urban culture is often misunderstood. We're here to flip the script (do a 180) and show that creativity, raw expression, and street culture belong in the Kingdom.
            </p>
            <p>
              From graffiti battles to spoken word nights, we create spaces where you can encounter God without leaving your identity at the door.
            </p>
          </div>

          <button 
            onClick={onNavigate}
            className="group relative bg-transparent border-2 border-white text-white px-6 py-3 md:px-8 md:py-4 font-bold uppercase tracking-widest hover:border-brand-lime hover:text-black transition-all overflow-hidden w-fit hover:shadow-[0_0_20px_rgba(204,255,0,0.4)]"
          >
            <span className="relative z-10 flex items-center gap-3 text-sm md:text-base">
              Enter The Hub
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-brand-lime transform -translate-x-full skew-x-12 group-hover:translate-x-0 transition-transform duration-300 origin-left" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hub;
