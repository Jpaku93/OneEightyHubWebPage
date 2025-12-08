import React, { useState } from 'react';
import { useImages } from '../contexts/ImageContext';
import { ArrowLeft, Save, RotateCcw } from 'lucide-react';

interface AdminDashboardProps {
  onBack: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBack }) => {
  const { images, updateImage, resetImages } = useImages();
  const [activeTab, setActiveTab] = useState<string>('hero');

  const tabs = Object.keys(images);

  return (
    <div className="min-h-screen bg-brand-black text-white pt-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-3xl font-display font-bold uppercase">Admin Dashboard</h1>
          </div>
          <button 
            onClick={() => {
              if (window.confirm("Are you sure you want to reset all images to default?")) {
                resetImages();
              }
            }}
            className="text-xs font-bold uppercase text-red-500 hover:text-red-400 flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" /> Reset Defaults
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar Tabs */}
          <div className="col-span-1 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  w-full text-left px-4 py-3 rounded font-bold uppercase tracking-wider text-sm transition-all
                  ${activeTab === tab 
                    ? 'bg-brand-purple text-white shadow-lg' 
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  }
                `}
              >
                {tab.replace(/([A-Z])/g, ' $1').trim()} 
              </button>
            ))}
          </div>

          {/* Editor Area */}
          <div className="col-span-1 md:col-span-3 bg-brand-charcoal p-8 rounded-xl border border-white/5">
            <h2 className="text-2xl font-display font-bold uppercase text-brand-lime mb-6">
              Editing: {activeTab}
            </h2>

            <div className="space-y-6">
              {Object.entries(images[activeTab]).map(([key, value]) => (
                <div key={key} className="group">
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-2">
                    {key.replace(/_/g, ' ')} {key === 'ticket_link' ? 'URL' : 'Image URL'}
                  </label>
                  <div className="flex gap-4 items-start">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => updateImage(activeTab, key, e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded p-3 text-sm text-white focus:border-brand-orange outline-none transition-colors font-mono"
                        placeholder={key === 'ticket_link' ? 'Enter ticket URL (leave empty to hide button)' : 'https://...'}
                      />
                    </div>
                    {/* Preview Thumbnail - Hide for links */}
                    {key !== 'ticket_link' && (
                        <div className="w-24 h-24 bg-black rounded border border-white/10 overflow-hidden shrink-0 relative">
                            <img 
                            src={value} 
                            alt="Preview" 
                            className="w-full h-full object-cover"
                            onError={(e) => (e.currentTarget.style.display = 'none')}
                            />
                            <div className="absolute inset-0 flex items-center justify-center text-[10px] text-gray-600 pointer-events-none">
                                Preview
                            </div>
                        </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/10 flex justify-end">
                <div className="flex items-center gap-2 text-brand-lime text-xs font-bold uppercase animate-pulse">
                    <Save className="w-4 h-4" /> Changes Autosaved
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;