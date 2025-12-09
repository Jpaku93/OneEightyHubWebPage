import React, { useState, useEffect } from 'react';
import { ArrowLeft, Eye, EyeOff, Image as ImageIcon, X, Maximize2, UserPlus, Ticket, Plus, Trash2, Edit2, Save } from 'lucide-react';
import { useEventVisibility } from '../contexts/EventVisibilityContext';
import { useEventPosters } from '../contexts/EventPostersContext';
import { useEventBanners } from '../contexts/EventBannersContext';
import { useEventButtons } from '../contexts/EventRegistrationContext';
import { useGallery, GalleryItem } from '../contexts/GalleryContext';
import { CalendarEvent } from '../types';
import { fetchCalendarEvents } from '../utils/calendar';

interface AdminDashboardProps {
    onBack: () => void;
}

type TabType = 'events' | 'gallery';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBack }) => {
    const [activeTab, setActiveTab] = useState<TabType>('events');
    const [events, setEvents] = useState<CalendarEvent[]>([]);

    // Event Management States
    const { toggleEventVisibility, isEventVisible } = useEventVisibility();
    const { setPosterUrl, getPosterUrl } = useEventPosters();
    const { setBannerUrl, getBannerUrl } = useEventBanners();
    const { setRegisterUrl, setBookSeatsUrl, getRegisterUrl, getBookSeatsUrl } = useEventButtons();

    const [editingPosterId, setEditingPosterId] = useState<string | null>(null);
    const [posterInput, setPosterInput] = useState('');
    const [editingBannerId, setEditingBannerId] = useState<string | null>(null);
    const [bannerInput, setBannerInput] = useState('');
    const [editingRegisterId, setEditingRegisterId] = useState<string | null>(null);
    const [registerInput, setRegisterInput] = useState('');
    const [editingBookSeatsId, setEditingBookSeatsId] = useState<string | null>(null);
    const [bookSeatsInput, setBookSeatsInput] = useState('');
    const [selectedPoster, setSelectedPoster] = useState<string | null>(null);

    // Gallery States
    const { galleryItems, addGalleryItem, updateGalleryItem, deleteGalleryItem } = useGallery();
    const [editingGalleryId, setEditingGalleryId] = useState<string | null>(null);
    const [galleryForm, setGalleryForm] = useState({ imageUrl: '', title: '', description: '' });
    const [isAddingGallery, setIsAddingGallery] = useState(false);

    useEffect(() => {
        const loadEvents = async () => {
            const fetchedEvents = await fetchCalendarEvents();
            setEvents(fetchedEvents);
        };
        loadEvents();
    }, []);

    // Generate event ID
    const getEventId = (event: CalendarEvent): string => {
        return `${event.date}-${event.title}`.replace(/\s+/g, '-').toLowerCase();
    };

    // Event Poster handlers
    const handleSavePoster = (eventId: string) => {
        if (posterInput.trim()) {
            setPosterUrl(eventId, posterInput.trim());
        }
        setEditingPosterId(null);
        setPosterInput('');
    };

    const handleEditPoster = (eventId: string) => {
        setEditingPosterId(eventId);
        setPosterInput(getPosterUrl(eventId) || '');
    };

    // Event Banner handlers
    const handleSaveBanner = (eventId: string) => {
        if (bannerInput.trim()) {
            setBannerUrl(eventId, bannerInput.trim());
        }
        setEditingBannerId(null);
        setBannerInput('');
    };

    const handleEditBanner = (eventId: string) => {
        setEditingBannerId(eventId);
        setBannerInput(getBannerUrl(eventId) || '');
    };

    // Register button handlers
    const handleSaveRegister = (eventId: string) => {
        if (registerInput.trim()) {
            setRegisterUrl(eventId, registerInput.trim());
        }
        setEditingRegisterId(null);
        setRegisterInput('');
    };

    const handleEditRegister = (eventId: string) => {
        setEditingRegisterId(eventId);
        setRegisterInput(getRegisterUrl(eventId) || '');
    };

    // Book Seats button handlers
    const handleSaveBookSeats = (eventId: string) => {
        if (bookSeatsInput.trim()) {
            setBookSeatsUrl(eventId, bookSeatsInput.trim());
        }
        setEditingBookSeatsId(null);
        setBookSeatsInput('');
    };

    const handleEditBookSeats = (eventId: string) => {
        setEditingBookSeatsId(eventId);
        setBookSeatsInput(getBookSeatsUrl(eventId) || '');
    };

    // Gallery handlers
    const handleAddGallery = () => {
        if (galleryForm.imageUrl.trim() && galleryForm.title.trim()) {
            addGalleryItem(galleryForm);
            setGalleryForm({ imageUrl: '', title: '', description: '' });
            setIsAddingGallery(false);
        }
    };

    const handleUpdateGallery = (id: string) => {
        if (galleryForm.imageUrl.trim() && galleryForm.title.trim()) {
            updateGalleryItem(id, galleryForm);
            setEditingGalleryId(null);
            setGalleryForm({ imageUrl: '', title: '', description: '' });
        }
    };

    const handleEditGallery = (item: GalleryItem) => {
        setEditingGalleryId(item.id);
        setGalleryForm({
            imageUrl: item.imageUrl,
            title: item.title,
            description: item.description
        });
        setIsAddingGallery(false);
    };

    const handleCancelGalleryEdit = () => {
        setEditingGalleryId(null);
        setIsAddingGallery(false);
        setGalleryForm({ imageUrl: '', title: '', description: '' });
    };

    return (
        <div className="min-h-screen bg-brand-black text-white">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-brand-charcoal border-b border-white/10 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={onBack}
                                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                <span className="font-bold">Back</span>
                            </button>
                            <div className="h-6 w-px bg-white/20" />
                            <h1 className="text-2xl font-display font-bold uppercase">Admin Dashboard</h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="max-w-7xl mx-auto px-6 py-6">
                <div className="flex gap-4 border-b border-white/10 mb-8">
                    <button
                        onClick={() => setActiveTab('events')}
                        className={`px-6 py-3 font-bold uppercase tracking-wider transition-all relative ${activeTab === 'events'
                                ? 'text-brand-lime'
                                : 'text-gray-500 hover:text-gray-300'
                            }`}
                    >
                        Event Management
                        {activeTab === 'events' && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-lime" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('gallery')}
                        className={`px-6 py-3 font-bold uppercase tracking-wider transition-all relative ${activeTab === 'gallery'
                                ? 'text-brand-lime'
                                : 'text-gray-500 hover:text-gray-300'
                            }`}
                    >
                        Gallery
                        {activeTab === 'gallery' && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-lime" />
                        )}
                    </button>
                </div>

                {/* Event Management Tab */}
                {activeTab === 'events' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-brand-orange">Manage Events</h2>
                            <span className="text-sm text-gray-500">{events.length} events loaded</span>
                        </div>

                        {events.length === 0 ? (
                            <div className="text-center py-12 text-gray-500">
                                <p>No events found. Events will appear here when loaded from your calendar.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {events.map((event) => {
                                    const eventId = getEventId(event);
                                    const isVisible = isEventVisible(eventId);
                                    const posterUrl = getPosterUrl(eventId);
                                    const bannerUrl = getBannerUrl(eventId);
                                    const registerUrl = getRegisterUrl(eventId);
                                    const bookSeatsUrl = getBookSeatsUrl(eventId);

                                    return (
                                        <div
                                            key={eventId}
                                            className="bg-brand-charcoal rounded-lg border border-white/10 p-6 hover:border-brand-lime/30 transition-colors"
                                        >
                                            {/* Event Header */}
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <span className="bg-brand-orange/20 text-brand-orange text-xs font-bold px-2 py-1 rounded">
                                                            {event.date}
                                                        </span>
                                                        <h3 className="text-xl font-bold text-white">{event.title}</h3>
                                                    </div>
                                                    <p className="text-sm text-gray-400">{event.time} • {event.location}</p>
                                                </div>
                                                <button
                                                    onClick={() => toggleEventVisibility(eventId)}
                                                    className={`flex items-center gap-2 px-4 py-2 rounded font-bold text-sm transition-colors ${isVisible
                                                            ? 'bg-brand-lime/20 text-brand-lime hover:bg-brand-lime/30'
                                                            : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                                                        }`}
                                                >
                                                    {isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                                    {isVisible ? 'Visible' : 'Hidden'}
                                                </button>
                                            </div>

                                            {/* Poster URL */}
                                            <div className="border-t border-white/5 pt-4 mt-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <ImageIcon className="w-4 h-4 text-brand-purple" />
                                                    <label className="text-xs font-bold uppercase text-gray-500">Event Poster</label>
                                                </div>
                                                {editingPosterId === eventId ? (
                                                    <div className="flex gap-2">
                                                        <input
                                                            type="text"
                                                            value={posterInput}
                                                            onChange={(e) => setPosterInput(e.target.value)}
                                                            placeholder="https://example.com/poster.jpg"
                                                            className="flex-1 bg-black/50 border border-brand-purple/30 rounded p-2 text-sm text-white focus:border-brand-purple outline-none transition-colors font-mono"
                                                            autoFocus
                                                        />
                                                        <button
                                                            onClick={() => handleSavePoster(eventId)}
                                                            className="bg-brand-purple text-white px-4 py-2 rounded text-sm font-bold hover:bg-brand-purple/80 transition-colors"
                                                        >
                                                            Save
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setEditingPosterId(null);
                                                                setPosterInput('');
                                                            }}
                                                            className="bg-gray-700 text-white px-4 py-2 rounded text-sm font-bold hover:bg-gray-600 transition-colors"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2">
                                                        {posterUrl ? (
                                                            <>
                                                                <div className="flex-1 bg-black/30 border border-white/10 rounded p-2 text-sm text-gray-400 font-mono truncate flex items-center gap-2">
                                                                    <span className="flex-1 truncate">{posterUrl}</span>
                                                                    <button
                                                                        onClick={() => setSelectedPoster(posterUrl)}
                                                                        className="text-brand-lime hover:text-brand-lime/80 transition-colors"
                                                                    >
                                                                        <Maximize2 className="w-4 h-4" />
                                                                    </button>
                                                                </div>
                                                                <button
                                                                    onClick={() => handleEditPoster(eventId)}
                                                                    className="bg-white/5 text-white px-4 py-2 rounded text-sm font-bold hover:bg-white/10 transition-colors"
                                                                >
                                                                    Edit
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <button
                                                                onClick={() => handleEditPoster(eventId)}
                                                                className="bg-brand-purple/20 text-brand-purple border border-brand-purple/30 px-4 py-2 rounded text-sm font-bold hover:bg-brand-purple/30 transition-colors"
                                                            >
                                                                + Add Poster
                                                            </button>
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Banner URL */}
                                            <div className="border-t border-white/5 pt-4 mt-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <ImageIcon className="w-4 h-4 text-brand-orange" />
                                                    <label className="text-xs font-bold uppercase text-gray-500">Event Banner</label>
                                                </div>
                                                {editingBannerId === eventId ? (
                                                    <div className="flex gap-2">
                                                        <input
                                                            type="text"
                                                            value={bannerInput}
                                                            onChange={(e) => setBannerInput(e.target.value)}
                                                            placeholder="https://example.com/banner.jpg"
                                                            className="flex-1 bg-black/50 border border-brand-orange/30 rounded p-2 text-sm text-white focus:border-brand-orange outline-none transition-colors font-mono"
                                                            autoFocus
                                                        />
                                                        <button
                                                            onClick={() => handleSaveBanner(eventId)}
                                                            className="bg-brand-orange text-black px-4 py-2 rounded text-sm font-bold hover:bg-brand-orange/80 transition-colors"
                                                        >
                                                            Save
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setEditingBannerId(null);
                                                                setBannerInput('');
                                                            }}
                                                            className="bg-gray-700 text-white px-4 py-2 rounded text-sm font-bold hover:bg-gray-600 transition-colors"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2">
                                                        {bannerUrl ? (
                                                            <>
                                                                <div className="flex-1 bg-black/30 border border-white/10 rounded p-2 text-sm text-gray-400 font-mono truncate">
                                                                    {bannerUrl}
                                                                </div>
                                                                <button
                                                                    onClick={() => handleEditBanner(eventId)}
                                                                    className="bg-white/5 text-white px-4 py-2 rounded text-sm font-bold hover:bg-white/10 transition-colors"
                                                                >
                                                                    Edit
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <button
                                                                onClick={() => handleEditBanner(eventId)}
                                                                className="bg-brand-orange/20 text-brand-orange border border-brand-orange/30 px-4 py-2 rounded text-sm font-bold hover:bg-brand-orange/30 transition-colors"
                                                            >
                                                                + Add Banner
                                                            </button>
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Register Button URL */}
                                            <div className="border-t border-white/5 pt-4 mt-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <UserPlus className="w-4 h-4 text-brand-lime" />
                                                    <label className="text-xs font-bold uppercase text-gray-500">Register Button</label>
                                                </div>
                                                {editingRegisterId === eventId ? (
                                                    <div className="flex gap-2">
                                                        <input
                                                            type="text"
                                                            value={registerInput}
                                                            onChange={(e) => setRegisterInput(e.target.value)}
                                                            placeholder="https://example.com/register"
                                                            className="flex-1 bg-black/50 border border-brand-lime/30 rounded p-2 text-sm text-white focus:border-brand-lime outline-none transition-colors font-mono"
                                                            autoFocus
                                                        />
                                                        <button
                                                            onClick={() => handleSaveRegister(eventId)}
                                                            className="bg-brand-lime text-black px-4 py-2 rounded text-sm font-bold hover:bg-brand-lime/80 transition-colors"
                                                        >
                                                            Save
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setEditingRegisterId(null);
                                                                setRegisterInput('');
                                                            }}
                                                            className="bg-gray-700 text-white px-4 py-2 rounded text-sm font-bold hover:bg-gray-600 transition-colors"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2">
                                                        {registerUrl ? (
                                                            <>
                                                                <div className="flex-1 bg-black/30 border border-white/10 rounded p-2 text-sm text-gray-400 font-mono truncate">
                                                                    {registerUrl}
                                                                </div>
                                                                <button
                                                                    onClick={() => handleEditRegister(eventId)}
                                                                    className="bg-white/5 text-white px-4 py-2 rounded text-sm font-bold hover:bg-white/10 transition-colors"
                                                                >
                                                                    Edit
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <button
                                                                onClick={() => handleEditRegister(eventId)}
                                                                className="bg-brand-lime/20 text-brand-lime border border-brand-lime/30 px-4 py-2 rounded text-sm font-bold hover:bg-brand-lime/30 transition-colors"
                                                            >
                                                                + Add Registration Link
                                                            </button>
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Book Seats Button URL */}
                                            <div className="border-t border-white/5 pt-4 mt-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Ticket className="w-4 h-4 text-brand-purple" />
                                                    <label className="text-xs font-bold uppercase text-gray-500">Book Seats Button</label>
                                                </div>
                                                {editingBookSeatsId === eventId ? (
                                                    <div className="flex gap-2">
                                                        <input
                                                            type="text"
                                                            value={bookSeatsInput}
                                                            onChange={(e) => setBookSeatsInput(e.target.value)}
                                                            placeholder="https://example.com/book-seats"
                                                            className="flex-1 bg-black/50 border border-brand-purple/30 rounded p-2 text-sm text-white focus:border-brand-purple outline-none transition-colors font-mono"
                                                            autoFocus
                                                        />
                                                        <button
                                                            onClick={() => handleSaveBookSeats(eventId)}
                                                            className="bg-brand-purple text-white px-4 py-2 rounded text-sm font-bold hover:bg-brand-purple/80 transition-colors"
                                                        >
                                                            Save
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setEditingBookSeatsId(null);
                                                                setBookSeatsInput('');
                                                            }}
                                                            className="bg-gray-700 text-white px-4 py-2 rounded text-sm font-bold hover:bg-gray-600 transition-colors"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2">
                                                        {bookSeatsUrl ? (
                                                            <>
                                                                <div className="flex-1 bg-black/30 border border-white/10 rounded p-2 text-sm text-gray-400 font-mono truncate">
                                                                    {bookSeatsUrl}
                                                                </div>
                                                                <button
                                                                    onClick={() => handleEditBookSeats(eventId)}
                                                                    className="bg-white/5 text-white px-4 py-2 rounded text-sm font-bold hover:bg-white/10 transition-colors"
                                                                >
                                                                    Edit
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <button
                                                                onClick={() => handleEditBookSeats(eventId)}
                                                                className="bg-brand-purple/20 text-brand-purple border border-brand-purple/30 px-4 py-2 rounded text-sm font-bold hover:bg-brand-purple/30 transition-colors"
                                                            >
                                                                + Add Booking Link
                                                            </button>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}

                {/* Gallery Tab */}
                {activeTab === 'gallery' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-brand-orange">Gallery Management</h2>
                            <button
                                onClick={() => {
                                    setIsAddingGallery(true);
                                    setEditingGalleryId(null);
                                    setGalleryForm({ imageUrl: '', title: '', description: '' });
                                }}
                                className="bg-brand-lime text-black px-6 py-3 rounded font-bold uppercase tracking-wider hover:bg-brand-orange transition-colors flex items-center gap-2"
                            >
                                <Plus className="w-5 h-5" />
                                Add Gallery Item
                            </button>
                        </div>

                        {/* Add/Edit Gallery Form */}
                        {(isAddingGallery || editingGalleryId) && (
                            <div className="bg-brand-charcoal rounded-lg border border-brand-lime/30 p-6 mb-6">
                                <h3 className="text-lg font-bold text-brand-lime mb-4">
                                    {editingGalleryId ? 'Edit Gallery Item' : 'Add New Gallery Item'}
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-400 mb-2">Image URL</label>
                                        <input
                                            type="text"
                                            value={galleryForm.imageUrl}
                                            onChange={(e) => setGalleryForm({ ...galleryForm, imageUrl: e.target.value })}
                                            placeholder="https://example.com/image.jpg"
                                            className="w-full bg-black/50 border border-white/20 rounded p-3 text-white focus:border-brand-lime outline-none transition-colors font-mono"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-400 mb-2">Title</label>
                                        <input
                                            type="text"
                                            value={galleryForm.title}
                                            onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                                            placeholder="Gallery item title"
                                            className="w-full bg-black/50 border border-white/20 rounded p-3 text-white focus:border-brand-lime outline-none transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-400 mb-2">Description</label>
                                        <textarea
                                            value={galleryForm.description}
                                            onChange={(e) => setGalleryForm({ ...galleryForm, description: e.target.value })}
                                            placeholder="Gallery item description"
                                            rows={3}
                                            className="w-full bg-black/50 border border-white/20 rounded p-3 text-white focus:border-brand-lime outline-none transition-colors resize-none"
                                        />
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => editingGalleryId ? handleUpdateGallery(editingGalleryId) : handleAddGallery()}
                                            className="bg-brand-lime text-black px-6 py-3 rounded font-bold uppercase tracking-wider hover:bg-brand-orange transition-colors flex items-center gap-2"
                                        >
                                            <Save className="w-4 h-4" />
                                            {editingGalleryId ? 'Update' : 'Add'}
                                        </button>
                                        <button
                                            onClick={handleCancelGalleryEdit}
                                            className="bg-gray-700 text-white px-6 py-3 rounded font-bold uppercase tracking-wider hover:bg-gray-600 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Gallery Items List */}
                        {galleryItems.length === 0 ? (
                            <div className="text-center py-12 text-gray-500">
                                <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                <p>No gallery items yet. Click "Add Gallery Item" to get started.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {galleryItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="bg-brand-charcoal rounded-lg border border-white/10 overflow-hidden hover:border-brand-lime/30 transition-colors group"
                                    >
                                        <div className="relative h-48 bg-black overflow-hidden">
                                            <img
                                                src={item.imageUrl}
                                                alt={item.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                onError={(e) => {
                                                    e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                                                }}
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                                            <p className="text-sm text-gray-400 mb-4 line-clamp-2">{item.description}</p>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleEditGallery(item)}
                                                    className="flex-1 bg-brand-lime/20 text-brand-lime px-4 py-2 rounded text-sm font-bold hover:bg-brand-lime/30 transition-colors flex items-center justify-center gap-2"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        if (confirm('Are you sure you want to delete this gallery item?')) {
                                                            deleteGalleryItem(item.id);
                                                        }
                                                    }}
                                                    className="bg-red-500/20 text-red-400 px-4 py-2 rounded text-sm font-bold hover:bg-red-500/30 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Poster Preview Modal */}
            {selectedPoster && (
                <div
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedPoster(null)}
                >
                    <button
                        onClick={() => setSelectedPoster(null)}
                        className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors z-10"
                    >
                        <X className="w-6 h-6 text-white" />
                    </button>
                    <div className="max-w-4xl max-h-[90vh] overflow-auto">
                        <img
                            src={selectedPoster}
                            alt="Event Poster Full Size"
                            className="w-full h-auto rounded-lg shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
