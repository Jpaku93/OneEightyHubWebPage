import React from 'react';
import { ArrowLeft, CheckCircle2, ArrowRight } from 'lucide-react';
import { Ministry } from '../types';

interface MinistryDetailProps {
  ministry: Ministry;
  onBack: () => void;
}

const MinistryDetail: React.FC<MinistryDetailProps> = ({ ministry, onBack }) => {
  return (
    <div className="min-h-screen bg-brand-black text-white animate-fadeIn">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <img 
          src={ministry.image} 
          alt={ministry.title} 
          className="absolute inset-0 w-full h-full object-cover grayscale opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-transparent" />
        <div className="absolute inset-0 bg-brand-purple/20 mix-blend-overlay" />

        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 max-w-7xl mx-auto w-full">
          <button 
            onClick={onBack}
            className="absolute top-8 left-8 md:left-16 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/80 hover:text-white transition-colors bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 hover:border-brand-lime"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Hub
          </button>

          <div className="mb-8">
            <div className={`inline-flex p-3 rounded-full bg-black/50 backdrop-blur-md border border-white/10 ${ministry.textAccent} mb-6`}>
              {ministry.icon}
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold uppercase text-white mb-4 drop-shadow-2xl">
              {ministry.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 font-light max-w-2xl border-l-4 border-brand-orange pl-6">
              {ministry.desc}
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-8 py-20 grid grid-cols-1 lg:grid-cols-3 gap-16">
        
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* Introduction */}
          <section className="tech-reveal">
            <h2 className="text-3xl font-display font-bold uppercase text-white mb-6">The Heart</h2>
            <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-line">
              {ministry.longDesc}
            </p>
          </section>

          {/* What We Do / Roles */}
          <section className="tech-reveal delay-100">
            <h2 className="text-3xl font-display font-bold uppercase text-white mb-8">What You'll Do</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ministry.roles.map((role, idx) => (
                <div key={idx} className="bg-brand-charcoal p-6 rounded-lg border border-white/5 hover:border-brand-purple/50 transition-colors group">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-brand-lime shrink-0 group-hover:scale-110 transition-transform" />
                    <p className="text-gray-300 group-hover:text-white transition-colors">{role}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Who It's For */}
          <section className="tech-reveal delay-200 bg-white/5 p-8 rounded-xl border-l-4 border-brand-lime">
            <h3 className="text-xl font-bold uppercase text-brand-lime mb-4">Who is this for?</h3>
            <p className="text-gray-300 leading-relaxed">
              {ministry.whoFor}
            </p>
          </section>
        </div>

        {/* Sidebar / CTA */}
        <div className="lg:col-span-1 space-y-8">
           <div className="bg-brand-charcoal p-8 rounded-xl border border-white/10 sticky top-32 tech-reveal delay-300 shadow-2xl">
              <h3 className="text-2xl font-display font-bold uppercase text-white mb-2">Join This Team</h3>
              <p className="text-gray-400 text-sm mb-8">Ready to step up? We'll get you connected with a leader.</p>
              
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Full Name</label>
                  <input type="text" className="w-full bg-brand-black border border-white/20 rounded p-3 text-white focus:border-brand-orange outline-none transition-colors" placeholder="Your Name" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Email</label>
                  <input type="email" className="w-full bg-brand-black border border-white/20 rounded p-3 text-white focus:border-brand-orange outline-none transition-colors" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Phone (Optional)</label>
                  <input type="tel" className="w-full bg-brand-black border border-white/20 rounded p-3 text-white focus:border-brand-orange outline-none transition-colors" placeholder="(555) 000-0000" />
                </div>
                
                <button className="w-full bg-brand-purple text-white font-bold uppercase tracking-widest py-4 mt-4 hover:bg-white hover:text-brand-purple transition-colors flex items-center justify-center gap-2 group">
                  Send Request <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
              
              <p className="text-xs text-gray-600 mt-6 text-center">
                Or find a leader at the next Hub Night at the "Connect Corner".
              </p>
           </div>
        </div>

      </div>
    </div>
  );
};

export default MinistryDetail;
