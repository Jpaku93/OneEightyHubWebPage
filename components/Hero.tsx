import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useImages } from '../contexts/ImageContext';

interface HeroProps {
  scrollOffset: number;
  onNavigateToAbout?: () => void;
}

const Hero: React.FC<HeroProps> = ({ scrollOffset, onNavigateToAbout }) => {
  const { images } = useImages();

  // Parallax calculations
  const bgY = scrollOffset * 0.5;
  const midY = scrollOffset * 0.2;
  const textY = scrollOffset * -0.1;

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col justify-center pt-28">

      {/* Layer 1: Background City (Slowest) */}
      <div
        className="absolute inset-0 z-0 bg-contain bg-center bg-no-repeat grayscale opacity-60"
        style={{
          backgroundImage: `url('${images.hero.background}')`,
          transform: `translateY(${bgY}px)`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/80 to-transparent" />
      </div>

      {/* Layer 2: Abstract/Mid elements (Medium speed) */}
      <div
        className="absolute top-1/4 right-0 w-1/2 h-full z-10 pointer-events-none opacity-80 mix-blend-screen"
        style={{ transform: `translateY(${midY}px)` }}
      >
        <img
          src={images.hero.abstract}
          alt="Abstract Light"
          className="object-cover w-full h-full rounded-l-[10rem] opacity-60 tech-reveal delay-500"
        />
        <div className="absolute inset-0 bg-brand-purple mix-blend-color opacity-50 rounded-l-[10rem]"></div>
      </div>

      {/* Layer 3: Main Content (Fastest/Static relative to container) */}
      <div className="relative z-10 w-full px-8 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left: Text Content */}
        <div style={{ transform: `translateY(${textY}px)` }}>
          <div className="tech-reveal inline-block px-3 py-1 mb-6 border border-brand-orange text-brand-orange text-xs font-bold tracking-widest uppercase rounded-full">
            Est. 2024 / City Center
          </div>
          <h1 className="tech-reveal delay-100 text-7xl md:text-8xl lg:text-9xl font-display font-bold leading-[0.85] tracking-tighter text-white mb-8">
            IT’S NOT<br />
            A BRAND.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-purple hover:text-brand-lime transition-colors duration-300">
              IT’S A MOVEMENT.
            </span>
          </h1>
          <p className="tech-reveal delay-200 text-gray-400 text-lg max-w-md mb-10 font-light border-l-2 border-brand-purple pl-4">
            We are the generation that refuses to settle. We are redefining faith in the concrete jungle. Join the revolution.
          </p>
          <button className="tech-reveal delay-300 group bg-white text-black px-8 py-4 font-bold uppercase tracking-wider hover:bg-brand-lime transition-all flex items-center gap-3 rounded-sm">
            Next Experience
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Right: Visual Blob & Info */}
        <div className="hidden lg:block relative h-[500px]">
          {/* Floating Info Block */}
          <div
            onClick={onNavigateToAbout}
            className="tech-reveal delay-500 absolute right-0 top-1/3 bg-brand-charcoal/90 backdrop-blur-md border border-brand-gray p-6 max-w-xs z-30 transform translate-x-4 hover:translate-x-0 hover:border-brand-lime hover:shadow-lg hover:shadow-brand-lime/20 transition-all duration-500 cursor-pointer group"
          >
            <h3 className="text-brand-lime font-display text-2xl uppercase mb-2 group-hover:text-white transition-colors">Who We Are</h3>
            <p className="text-sm text-gray-300 group-hover:text-gray-100 transition-colors">
              A collective of creatives, worshippers, and innovators engaging the culture with the gospel.
            </p>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
