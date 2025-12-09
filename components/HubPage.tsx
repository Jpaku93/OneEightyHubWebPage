import React, { useState, useEffect } from 'react';
import { Calendar, ArrowRight, ArrowLeft, Sun, Moon, ShoppingBag, Check, MapPin, X, Image as ImageIcon, ExternalLink } from 'lucide-react';
import Footer from './Footer';
import { CalendarEvent } from '../types';
import { fetchCalendarEvents } from '../utils/calendar';
import { useImages } from '../contexts/ImageContext';
import { useEventVisibility } from '../contexts/EventVisibilityContext';
import { useEventPosters } from '../contexts/EventPostersContext';
import { useEventButtons } from '../contexts/EventRegistrationContext';
import Gallery from './Gallery';

interface HubPageProps {
  onBack: () => void;
}

const HubPage: React.FC<HubPageProps> = ({ onBack }) => {
  const { images } = useImages();
  const { isEventVisible } = useEventVisibility();
  const { getPosterUrl } = useEventPosters();
  const { getRegisterUrl, getBookSeatsUrl } = useEventButtons();
  const [calendarDark, setCalendarDark] = useState(true);
  const [calendarSynced, setCalendarSynced] = useState(false);
  const [selectedPoster, setSelectedPoster] = useState<string | null>(null);
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [requestEmail, setRequestEmail] = useState('');

  // Initialize with detailed fallback data
  const [upcomingEvents, setUpcomingEvents] = useState<CalendarEvent[]>([
    {
      date: 'OCT 24',
      title: 'Night of Worship',
      time: '7:00 PM',
      location: 'The Warehouse',
      description: 'A night of extended worship, prayer, and prophetic flow. Come ready to encounter God.',
      rawDate: new Date('2024-10-24T19:00:00')
    },
    {
      date: 'NOV 02',
      title: 'Street Outreach',
      time: '10:00 AM',
      location: 'Downtown Plaza',
      description: 'Join us as we hit the streets to share the Gospel and pray for our city. Meet at the fountain.',
      rawDate: new Date('2024-11-02T10:00:00')
    },
    {
      date: 'NOV 15',
      title: 'Creative Workshop',
      time: '6:30 PM',
      location: 'Studio B',
      description: 'For all photographers, designers, and musicians. Learn how to use your craft for the Kingdom.',
      rawDate: new Date('2024-11-15T18:30:00')
    },
  ]);

  useEffect(() => {
    const loadEvents = async () => {
      const events = await fetchCalendarEvents();
      if (events.length > 0) {
        setUpcomingEvents(events);
      }
    };

    loadEvents();
  }, []);

  // Generate event ID from event data (same as in AdminDashboard)
  const getEventId = (event: CalendarEvent): string => {
    return `${event.date}-${event.title}`.replace(/\s+/g, '-').toLowerCase();
  };

  // Filter events based on visibility
  const visibleEvents = upcomingEvents.filter(event => isEventVisible(getEventId(event)));

  const handleSyncCalendar = () => {
    if (!requestEmail.trim()) {
      alert('Please enter your email address');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(requestEmail)) {
      alert('Please enter a valid email address');
      return;
    }

    const subject = 'Calendar Access Request - 180 Hub';
    const body = `Hi,

I would like to request access to the 180 Hub calendar.

My email address: ${requestEmail}

Thank you!`;

    const mailtoLink = `mailto:jrlpaku@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;

    setCalendarSynced(true);
    setTimeout(() => {
      setCalendarSynced(false);
      setRequestEmail('');
    }, 3000);
  };

  const merchItems = [
    {
      id: 'hoodie',
      name: '180 Hoodie',
      price: '$55.00',
      image: images.hubPage.merch1
    },
    {
      id: 'tshirt',
      name: '180 T-Shirt',
      price: '$30.00',
      image: images.hubPage.merch2
    },
    {
      id: 'crew',
      name: '180 Crew Neck',
      price: '$45.00',
      image: images.hubPage.merch3
    }
  ];

  return (
    <div className="min-h-screen bg-brand-black text-white animate-fadeIn">
      {/* Header / Hero Section */}
      <div className="relative min-h-[60vh] md:min-h-[85vh] py-32 overflow-hidden flex items-center justify-center bg-brand-charcoal">
        <div
          className="absolute inset-0 bg-cover bg-center grayscale opacity-40"
          style={{ backgroundImage: `url('${images.hubPage.heroBg}')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/50 to-transparent"></div>

        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-8 left-8 z-20 flex items-center gap-2 text-white hover:text-brand-lime transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold uppercase tracking-wider text-sm">Back to Home</span>
        </button>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto tech-reveal">
          <h1 className="text-7xl md:text-9xl font-display font-bold uppercase tracking-tighter text-white mb-6 drop-shadow-2xl">
            THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple via-brand-orange to-brand-lime">HUB</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light tracking-widest border-t border-b border-white/20 py-4 inline-block uppercase">
            Where Culture Meets Kingdom
          </p>
        </div>
      </div>

      {/* Google Calendar Integration & Up Next */}
      <section id="calendar-section" className="py-20 px-4 md:px-8 bg-brand-black flex flex-col items-center justify-center border-t border-white/10">
        <div className="max-w-7xl w-full">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 border-b border-white/10 pb-4 gap-4">
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              Upcoming Events
            </h2>

            {/* Compact Stay Updated - Top Right */}
            <div className="flex items-center gap-3">
              <input
                type="email"
                value={requestEmail}
                onChange={(e) => setRequestEmail(e.target.value)}
                placeholder="Your email"
                disabled={calendarSynced}
                className="bg-black/50 border border-brand-purple/30 rounded px-3 py-2 text-white placeholder-gray-500 focus:border-brand-purple focus:outline-none transition-colors text-sm w-48"
              />
              <button
                onClick={handleSyncCalendar}
                disabled={calendarSynced}
                className={`
                  text-xs font-bold uppercase py-2 px-4 rounded transition-all duration-300 whitespace-nowrap
                  ${calendarSynced
                    ? 'bg-brand-lime text-black cursor-default'
                    : 'bg-brand-purple text-white hover:bg-brand-purple/80'
                  }
                `}
              >
                {calendarSynced ? (
                  <span className="flex items-center gap-1">
                    <Check className="w-3 h-3" /> Sent!
                  </span>
                ) : (
                  'Get Calendar'
                )}
              </button>
            </div>
          </div>

          {/* Event Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleEvents.slice(0, showAllEvents ? 9 : 3).map((event, i) => {
              // Get day of week from rawDate
              const dayOfWeek = event.rawDate ? event.rawDate.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase() : '';
              const eventId = getEventId(event);
              const posterUrl = getPosterUrl(eventId);

              return (
                <div key={i} className="group bg-brand-charcoal rounded-lg border-l-4 border-brand-orange hover:bg-white/5 hover:border-brand-lime transition-all cursor-default flex flex-col overflow-hidden">
                  {/* Poster Image (if available) */}
                  {posterUrl && (
                    <div
                      onClick={() => setSelectedPoster(posterUrl)}
                      className="relative w-full h-48 bg-brand-black cursor-pointer group/poster overflow-hidden"
                    >
                      <img
                        src={posterUrl}
                        alt={`${event.title} Poster`}
                        className="w-full h-full object-cover group-hover/poster:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-transparent to-transparent opacity-60"></div>
                      <div className="absolute bottom-2 right-2 bg-brand-lime/90 text-black px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                        <ImageIcon className="w-3 h-3" />
                        VIEW POSTER
                      </div>
                    </div>
                  )}

                  {/* Event Details */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-block bg-brand-orange/20 text-brand-orange text-xs font-bold px-2 py-1 rounded">
                        {event.date}
                      </span>
                      {dayOfWeek && (
                        <span className="text-xs font-mono text-brand-lime border border-brand-lime/30 px-2 py-1 rounded-full bg-brand-black/50">
                          {dayOfWeek}
                        </span>
                      )}
                    </div>
                    <h4 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-brand-orange transition-colors">
                      {event.title}
                    </h4>

                    {event.description && (
                      <p className="text-sm text-gray-400 mb-4 whitespace-pre-line leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all">
                        {event.description}
                      </p>
                    )}

                    <div className="mt-auto flex flex-col text-sm text-gray-300 gap-2 border-t border-white/5 pt-3">
                      <span className="flex items-center gap-2 text-brand-lime">
                        <Calendar className="w-4 h-4" /> {event.time}
                      </span>
                      <span className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-brand-purple" /> {event.location}
                      </span>
                    </div>

                    {/* Registration/Booking Buttons */}
                    {(() => {
                      const registerUrl = getRegisterUrl(eventId);
                      const bookSeatsUrl = getBookSeatsUrl(eventId);

                      if (!registerUrl && !bookSeatsUrl) return null;

                      return (
                        <div className="mt-4 pt-4 border-t border-white/5 flex flex-col gap-2">
                          {registerUrl && (
                            <a
                              href={registerUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="w-full bg-brand-lime text-black px-4 py-2.5 rounded font-bold uppercase tracking-wider hover:bg-brand-orange transition-colors flex items-center justify-center gap-2 shadow-lg text-sm"
                            >
                              <ExternalLink className="w-4 h-4" />
                              Register Now
                            </a>
                          )}
                          {bookSeatsUrl && (
                            <a
                              href={bookSeatsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="w-full bg-brand-purple text-white px-4 py-2.5 rounded font-bold uppercase tracking-wider hover:bg-brand-purple/80 transition-colors flex items-center justify-center gap-2 shadow-lg text-sm"
                            >
                              <ExternalLink className="w-4 h-4" />
                              Book Seats
                            </a>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Show More/Less Button */}
          {visibleEvents.length > 3 && (
            <div className="mt-8 text-center">
              <button
                onClick={() => setShowAllEvents(!showAllEvents)}
                className="bg-brand-orange text-black px-8 py-3 rounded font-bold uppercase tracking-widest hover:bg-brand-lime transition-colors flex items-center gap-2 mx-auto shadow-lg"
              >
                {showAllEvents ? (
                  <>
                    Show Less
                    <ArrowRight className="w-4 h-4 rotate-90" />
                  </>
                ) : (
                  <>
                    Show More Events ({Math.min(visibleEvents.length - 3, 6)} more)
                    <ArrowRight className="w-4 h-4 -rotate-90" />
                  </>
                )}
              </button>
            </div>
          )}

        </div>
      </section >

      <Gallery />

      {/* Merch Section */}
      < section className="py-24 bg-brand-black relative" >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')] opacity-5"></div>
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 border-b-2 border-brand-orange/30 pb-4">
            <div>
              <span className="text-brand-orange font-mono text-sm tracking-widest">OFFICIAL GEAR</span>
              <h2 className="text-5xl md:text-7xl font-display font-bold text-white uppercase mt-2">
                THE MERCH
              </h2>
            </div>
            <button className="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-brand-orange transition-colors">
              View All Collection <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {merchItems.map((item) => (
              <div key={item.id} className="group cursor-pointer">
                <div className="relative h-[400px] bg-brand-charcoal overflow-hidden rounded-sm mb-4">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-center">
                    <button className="bg-white text-black px-6 py-3 font-bold uppercase tracking-widest hover:bg-brand-orange transition-colors flex items-center gap-2 w-full justify-center shadow-lg">
                      <ShoppingBag className="w-4 h-4" /> Add to Cart
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-display font-bold text-white uppercase group-hover:text-brand-orange transition-colors">{item.name}</h3>
                    <p className="text-gray-500 text-sm">Limited Edition</p>
                  </div>
                  <span className="text-xl font-bold text-brand-lime font-mono">{item.price}</span>
                </div>
              </div>
            ))}
          </div>

          <button className="md:hidden w-full mt-8 border border-white/20 py-4 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
            View All Collection
          </button>
        </div>
      </section >

      {/* CTA: Where Do You Fit? */}
      < div className="py-24 px-8 bg-brand-charcoal relative overflow-hidden border-t border-white/5" >

        {/* Decorative Blurs */}
        < div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-purple/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-orange/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-12 text-white">WHERE DO YOU FIT?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-16">
            <div className="bg-white/5 p-6 rounded border-l-2 border-brand-purple">
              <span className="block text-xs font-bold text-gray-500 uppercase mb-1">Love Music?</span>
              <span className="text-xl font-display font-bold text-white">Worship & Band</span>
            </div>
            <div className="bg-white/5 p-6 rounded border-l-2 border-brand-lime">
              <span className="block text-xs font-bold text-gray-500 uppercase mb-1">Love Visuals?</span>
              <span className="text-xl font-display font-bold text-white">Digital Arts</span>
            </div>
            <div className="bg-white/5 p-6 rounded border-l-2 border-brand-orange">
              <span className="block text-xs font-bold text-gray-500 uppercase mb-1">Love People & Bold Faith?</span>
              <span className="text-xl font-display font-bold text-white">Outreach & Altar Calls</span>
            </div>
            <div className="bg-white/5 p-6 rounded border-l-2 border-brand-purple">
              <span className="block text-xs font-bold text-gray-500 uppercase mb-1">Love Depth?</span>
              <span className="text-xl font-display font-bold text-white">Bible Studies & Open Homes</span>
            </div>
          </div>

          <div className="inline-block p-[2px] rounded-full bg-gradient-to-r from-brand-orange via-brand-purple to-brand-lime">
            <button className="bg-brand-black text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-transparent hover:text-white transition-all duration-300">
              Talk to a Leader
            </button>
          </div>
          <p className="mt-6 text-gray-500 text-sm">
            Come early to a Hub Night and tell us "I'm keen to serve."<br />
            We'll help you find your lane.
          </p>
        </div>
      </div>

      <Footer />

      {/* Poster Modal */}
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
    </div >
  );
};

export default HubPage;
