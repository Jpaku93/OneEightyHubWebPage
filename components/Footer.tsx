import React from 'react';
import { ArrowRight, Instagram, Youtube, MessageCircle, Church, Lock } from 'lucide-react';

interface FooterProps {
  onAdminClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminClick }) => {
  return (
    <footer className="relative bg-brand-black border-t border-white/10 pt-20 pb-10 px-8 overflow-hidden">

      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-brand-purple/20 to-transparent pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

        <div className="col-span-1 md:col-span-2 tech-reveal">
          <h2 className="text-5xl font-display font-bold text-white mb-6 uppercase leading-tight">
            Ready to<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-lime to-brand-orange">Move?</span>
          </h2>
          <button className="bg-white text-black px-8 py-3 font-bold uppercase tracking-widest hover:bg-brand-lime transition-colors flex items-center gap-2 shadow-[4px_4px_0px_rgba(139,0,255,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
            Plan Your Visit <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="tech-reveal delay-100">
          <h4 className="text-white font-bold uppercase tracking-wider mb-6 border-b-2 border-brand-purple inline-block pb-1">Connect</h4>
          <ul className="space-y-4 text-gray-400 text-sm mb-6">
            <li className="hover:text-brand-lime cursor-pointer transition-colors flex items-center gap-2">
              <a href="https://www.instagram.com/oneeightyhub/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <span className="w-1 h-1 bg-brand-orange rounded-full opacity-0 hover:opacity-100 transition-opacity"></span>
                Instagram
              </a>
            </li>
            <li className="hover:text-brand-lime cursor-pointer transition-colors flex items-center gap-2">
              <a href="https://whatsapp.com/channel/0029VaLWVytKrWQqHcxmBD2P" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <span className="w-1 h-1 bg-brand-orange rounded-full opacity-0 hover:opacity-100 transition-opacity"></span>
                WhatsApp
              </a>
            </li>
            <li className="hover:text-brand-lime cursor-pointer transition-colors flex items-center gap-2">
              <a href="https://www.youtube.com/@ThePottersHouseChurchFairfield" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <span className="w-1 h-1 bg-brand-orange rounded-full opacity-0 hover:opacity-100 transition-opacity"></span>
                YouTube
              </a>
            </li>
            <li className="hover:text-brand-lime cursor-pointer transition-colors flex items-center gap-2">
              <a href="https://www.pottershousefairfield.church/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <span className="w-1 h-1 bg-brand-orange rounded-full opacity-0 hover:opacity-100 transition-opacity"></span>
                Potters House Fairfield
              </a>
            </li>
          </ul>
          <div className="flex gap-4 text-gray-400">
            <a href="https://www.instagram.com/oneeightyhub/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-brand-purple hover:text-white transition-colors cursor-pointer">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://whatsapp.com/channel/0029VaLWVytKrWQqHcxmBD2P" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-brand-purple hover:text-white transition-colors cursor-pointer">
              <MessageCircle className="w-5 h-5" />
            </a>
            <a href="https://www.youtube.com/@ThePottersHouseChurchFairfield" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-brand-purple hover:text-white transition-colors cursor-pointer">
              <Youtube className="w-5 h-5" />
            </a>
            <a href="https://www.pottershousefairfield.church/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-brand-purple hover:text-white transition-colors cursor-pointer">
              <Church className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="tech-reveal delay-200">
          <h4 className="text-white font-bold uppercase tracking-wider mb-6 border-b-2 border-brand-orange inline-block pb-1">Contact</h4>
          <p className="text-gray-300 text-sm mb-2 font-light">78 Hassall St, Wetherill Park NSW 2164</p>
        </div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-mono border-t border-white/5 pt-8 tech-reveal delay-300">
        <div>© 2024 THE MOVEMENT. ALL RIGHTS RESERVED.</div>
        <div className="flex gap-4 mt-4 md:mt-0 items-center">
          <span className="cursor-pointer hover:text-brand-lime transition-colors">PRIVACY</span>
          <span className="cursor-pointer hover:text-brand-lime transition-colors">TERMS</span>
          {onAdminClick && (
            <button
              onClick={onAdminClick}
              className="hover:text-brand-lime transition-colors ml-4 flex items-center gap-1"
              title="Admin Access"
            >
              <Lock className="w-3 h-3" />
              <span>ADMIN</span>
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;