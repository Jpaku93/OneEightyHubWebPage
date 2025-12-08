import React from 'react';
import { Testimony } from '../types';
import { useImages } from '../contexts/ImageContext';

const testimonies: Testimony[] = [
  { id: '1', name: 'Marcus J.', handle: '@marcus_j', text: "Found my family here. The worship nights changed my perspective entirely.", avatar: 'https://picsum.photos/seed/t1/100/100' },
  { id: '2', name: 'Sarah L.', handle: '@sarah.creates', text: "Not just a church, it's a creative powerhouse. I love serving on the media team.", avatar: 'https://picsum.photos/seed/t2/100/100' },
  { id: '3', name: 'David K.', handle: '@dave_k', text: "Real people, real talk. No judgment, just growth.", avatar: 'https://picsum.photos/seed/t3/100/100' },
  { id: '4', name: 'Jasmine R.', handle: '@jas_min', text: "The community outreach programs are straight fire. Love giving back.", avatar: 'https://picsum.photos/seed/t4/100/100' },
];

interface CommunityProps {
  scrollOffset?: number;
}

const Community: React.FC<CommunityProps> = ({ scrollOffset }) => {
  const { images } = useImages();

  return (
    <section className="py-20 px-8 bg-gradient-to-b from-brand-charcoal to-brand-black overflow-hidden relative">
      
      {/* Background Accents */}
      <div className="absolute left-1/2 top-1/3 -translate-x-1/2 w-[80vw] h-[400px] bg-brand-lime/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 mb-12 tech-reveal">
        <h2 className="text-4xl font-display font-bold text-white mb-2 cursor-default w-fit">COMMUNITY</h2>
        <p className="text-brand-lime font-mono text-sm tracking-widest">PEOPLE OVER PROGRAMS</p>
      </div>

      {/* B&W Photo Grid with Hover Color */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-16 h-96 relative z-10">
        <div className="tech-reveal delay-100 col-span-2 row-span-2 relative group overflow-hidden">
          <img src={images.community.grid1} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt="Community 1" />
          <div className="absolute inset-0 bg-brand-purple/40 opacity-0 group-hover:opacity-100 transition-opacity mix-blend-overlay" />
        </div>
        <div className="tech-reveal delay-200 col-span-1 row-span-1 relative group overflow-hidden">
           <img src={images.community.grid2} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt="Community 2" />
           <div className="absolute inset-0 bg-brand-lime/40 opacity-0 group-hover:opacity-100 transition-opacity mix-blend-overlay" />
        </div>
        <div className="tech-reveal delay-300 col-span-1 row-span-2 relative group overflow-hidden">
           <img src={images.community.grid3} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt="Community 3" />
           <div className="absolute inset-0 bg-brand-orange/40 opacity-0 group-hover:opacity-100 transition-opacity mix-blend-overlay" />
        </div>
        <div className="tech-reveal delay-400 col-span-1 row-span-1 relative group overflow-hidden">
           <img src={images.community.grid4} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt="Community 4" />
           <div className="absolute inset-0 bg-brand-purple/40 opacity-0 group-hover:opacity-100 transition-opacity mix-blend-overlay" />
        </div>
      </div>

      {/* Testimony Strip */}
      <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide tech-reveal delay-500 snap-x snap-mandatory px-4">
        {testimonies.map((t, index) => (
          <div 
            key={t.id} 
            className="snap-center min-w-[300px] bg-brand-charcoal/50 backdrop-blur-md p-6 rounded-lg border-t-4 border-white/10 hover:border-brand-orange hover:bg-brand-charcoal transition-all shadow-lg transform hover:-translate-y-1"
            style={{ borderColor: index % 2 === 0 ? '#8B00FF' : '#FF5E00' }} // Alternating top border colors
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-[2px] rounded-full bg-gradient-to-br from-brand-orange to-brand-purple">
                 <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border-2 border-black grayscale hover:grayscale-0 transition-all" />
              </div>
              <div>
                <div className="font-bold text-white">{t.name}</div>
                <div className="text-xs text-brand-lime">{t.handle}</div>
              </div>
            </div>
            <p className="text-sm text-gray-300 italic leading-relaxed">"{t.text}"</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Community;
