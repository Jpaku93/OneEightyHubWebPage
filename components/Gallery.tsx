import React from 'react';
import { useGallery } from '../contexts/GalleryContext';

const Gallery: React.FC = () => {
    const { galleryItems } = useGallery();

    if (galleryItems.length === 0) {
        return null;
    }

    return (
        <section className="py-24 bg-brand-black relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')] opacity-5"></div>
            <div className="max-w-7xl mx-auto px-8 relative z-10">
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 border-b-2 border-brand-lime/30 pb-4">
                    <div>
                        <span className="text-brand-lime font-mono text-sm tracking-widest">MOMENTS</span>
                        <h2 className="text-5xl md:text-7xl font-display font-bold text-white uppercase mt-2">
                            Gallery
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {galleryItems.map((item, index) => (
                        <div
                            key={item.id}
                            className="group cursor-pointer tech-reveal"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="relative h-[400px] bg-brand-charcoal overflow-hidden rounded-sm mb-4">
                                <img
                                    src={item.imageUrl}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://via.placeholder.com/400x400?text=Image+Not+Found';
                                    }}
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />

                                {/* Overlay Content */}
                                <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <div className="bg-brand-charcoal/90 backdrop-blur-md border border-brand-lime/30 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                        <h3 className="text-xl font-display font-bold text-white uppercase mb-2 group-hover:text-brand-lime transition-colors">
                                            {item.title}
                                        </h3>
                                        {item.description && (
                                            <p className="text-sm text-gray-300 line-clamp-3">
                                                {item.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
