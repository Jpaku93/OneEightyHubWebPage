import React from 'react';
import { Testimony } from '../types';
import { useImages } from '../contexts/ImageContext';

const testimonies: Testimony[] = [
  { id: '1', name: 'Rachel', handle: '@rachel', text: "I left anxiety and depression behind", avatar: 'https://picsum.photos/seed/rachel/100/100' },
  { id: '2', name: 'Jordan', handle: '@jordan', text: "I found my second chance.", avatar: 'https://picsum.photos/seed/jordan/100/100' },
  { id: '3', name: 'Lia', handle: '@lia', text: "I no longer run from my problems.", avatar: 'https://picsum.photos/seed/lia/100/100' },
  { id: '4', name: 'Ema', handle: '@ema', text: "Transforming pain into purpose.", avatar: 'https://picsum.photos/seed/ema/100/100' },
  { id: '5', name: 'Julian', handle: '@julian', text: "I Found my real purpose.", avatar: 'https://picsum.photos/seed/julian/100/100' },
  { id: '6', name: 'Duy', handle: '@duy', text: "I'm finally free from addiction & depression.", avatar: 'https://picsum.photos/seed/duy/100/100' },
  { id: '7', name: 'An', handle: '@an', text: "I'm no longer fearful of my future.", avatar: 'https://picsum.photos/seed/an/100/100' },
  { id: '8', name: 'Ricky', handle: '@ricky', text: "I finally found purpose", avatar: 'https://picsum.photos/seed/ricky/100/100' },
  { id: '9', name: 'Kendra', handle: '@kendra', text: "I've been freed from everything holding me back..", avatar: 'https://picsum.photos/seed/kendra/100/100' },
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
