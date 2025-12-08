import React, { useState, useEffect } from 'react';
import { Calendar, ArrowRight, Sun, Moon, ShoppingBag, Check, MapPin } from 'lucide-react';
import Footer from './Footer';
import { CalendarEvent } from '../types';
import { fetchCalendarEvents } from '../utils/calendar';
import { useImages } from '../contexts/ImageContext';

interface HubPageProps {
  onBack: () => void;
}

const HubPage: React.FC<HubPageProps> = ({ onBack }) => {
  const { images } = useImages();
  const [calendarDark, setCalendarDark] = useState(true);
  const [calendarSynced, setCalendarSynced] = useState(false);

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

  const handleSyncCalendar = () => {
    setCalendarSynced(true);
    window.open('https://calendar.google.com/calendar/render?cid=mmvpsnrd4lb1ibgjrdgg9e00p4@group.calendar.google.com', '_blank');
    setTimeout(() => {
      setCalendarSynced(false);
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
          <div className="flex items-end justify-between mb-8 border-b border-white/10 pb-4">
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              Calendar
            </h2>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCalendarDark(!calendarDark)}
                className="p-2 rounded-full hover:bg-white/10 transition-colors text-brand-lime flex items-center gap-2 text-xs font-mono"
              >
                {calendarDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                {calendarDark ? "LIGHT" : "DARK"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calendar Column */}
            <div className="lg:col-span-2 bg-brand-charcoal p-2 rounded-xl border border-white/10 shadow-[0_0_30px_rgba(139,0,255,0.1)]">
              <div className={`relative w-full h-[600px] ${calendarDark ? 'bg-brand-black' : 'bg-white'} rounded-lg overflow-hidden transition-colors duration-300`}>
                <iframe
                  src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=UTC&src=bW12cHNucmQ0bGIxaWJnanJkZ2c5ZTAwcDRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%238E24AA&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0"
                  style={{
                    borderWidth: 0,
                    filter: calendarDark ? 'invert(1) hue-rotate(180deg)' : 'none',
                    transition: 'filter 0.3s ease'
                  }}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  title="One Eighty Hub Calendar"
                ></iframe>
              </div>
            </div>

            {/* Up Next Column */}
            <div className="lg:col-span-1 h-[618px] flex flex-col">
              <div className="flex items-center gap-2 mb-4 shrink-0">
                <div className="w-2 h-2 bg-brand-orange rounded-full animate-pulse"></div>
                <h3 className="text-xl font-bold uppercase tracking-wider text-white">Up Next</h3>
              </div>

              <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-hide md:scrollbar-default">
                {upcomingEvents.slice(0, 10).map((event, i) => (
                  <div key={i} className="group bg-brand-charcoal p-6 rounded-lg border-l-4 border-brand-orange hover:bg-white/5 transition-all cursor-default flex flex-col shrink-0">
                    <span className="inline-block w-fit bg-brand-orange/20 text-brand-orange text-xs font-bold px-2 py-1 rounded mb-3">
                      {event.date}
                    </span>
                    <h4 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-brand-orange transition-colors">
                      {event.title}
                    </h4>

                    {event.description && (
                      <p className="text-sm text-gray-500 mb-4 whitespace-pre-line leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all">
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
                  </div>
                ))}

                <div className="bg-gradient-to-br from-brand-purple/20 to-brand-black p-6 rounded-lg border border-brand-purple/30 text-center shrink-0">
                  <h4 className="text-brand-purple font-bold uppercase tracking-widest mb-2">Don't Miss Out</h4>
                  <p className="text-xs text-gray-400 mb-4">Subscribe to our calendar to get notified automatically.</p>
                  <button
                    onClick={handleSyncCalendar}
                    disabled={calendarSynced}
                    className={`
                         w-full text-xs font-bold uppercase py-3 rounded transition-all duration-300 relative overflow-hidden group/sync
                         ${calendarSynced
                        ? 'bg-brand-lime text-black cursor-default border border-brand-lime shadow-[0_0_20px_rgba(204,255,0,0.3)]'
                        : 'bg-brand-purple text-white hover:bg-white hover:text-brand-purple shadow-[0_0_15px_rgba(139,0,255,0.4)] hover:shadow-[0_0_25px_rgba(139,0,255,0.6)] animate-pulse'
                      }
                       `}
                  >
                    {calendarSynced ? (
                      <span className="flex items-center justify-center gap-2 animate-fadeIn">
                        <Check className="w-4 h-4" /> Synced!
                      </span>
                    ) : (
                      <>
                        <span className="relative z-10">Sync Calendar</span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/sync:translate-y-0 transition-transform duration-300 ease-out" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Merch Section */}
      <section className="py-24 bg-brand-black relative">
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
      </section>

      {/* CTA: Where Do You Fit? */}
      <div className="py-24 px-8 bg-brand-charcoal relative overflow-hidden border-t border-white/5">

        {/* Decorative Blurs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-purple/10 blur-[100px] rounded-full pointer-events-none" />
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
    </div>
  );
};

export default HubPage;
