import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, ChevronDown, ArrowRight, ExternalLink } from 'lucide-react';
import { Event } from '../types';
import { fetchCalendarEvents } from '../utils/calendar';
import { useImages } from '../contexts/ImageContext';
import { useEventButtons } from '../contexts/EventRegistrationContext';
import { useEventVisibility } from '../contexts/EventVisibilityContext';
import { useEventBanners } from '../contexts/EventBannersContext';

const Events: React.FC<{ scrollOffset?: number; onViewCalendar?: () => void }> = ({ scrollOffset, onViewCalendar }) => {
  const { images } = useImages();
  const { getRegisterUrl, getBookSeatsUrl } = useEventButtons();
  const { isEventVisible } = useEventVisibility();
  const { getBannerUrl } = useEventBanners();
  const [isExpanded, setIsExpanded] = useState(false);
  const [event, setEvent] = useState<Event>({
    id: '1',
    title: 'Night of Worship',
    date: 'OCT 24',
    time: '7:00 PM',
    location: 'The Warehouse',
    image: images.events.default,
    description: 'Join us for a night that sets the tone for the entire month. Expect high energy worship, real community, and a word that hits home. Bring the crew.',
  });

  useEffect(() => {
    const loadNextEvent = async () => {
      const fetchedEvents = await fetchCalendarEvents();
      if (fetchedEvents.length > 0) {
        // Filter for visible events only
        const visibleEvents = fetchedEvents.filter(event => {
          const eventId = `${event.date}-${event.title}`.replace(/\s+/g, '-').toLowerCase();
          return isEventVisible(eventId);
        });

        // Show the first visible event
        if (visibleEvents.length > 0) {
          const next = visibleEvents[0];
          const eventId = `${next.date}-${next.title}`.replace(/\s+/g, '-').toLowerCase();
          const bannerUrl = getBannerUrl(eventId);

          setEvent({
            id: 'ics-next',
            title: next.title,
            date: next.date,
            time: next.time,
            location: next.location,
            description: next.description || 'Join us for a powerful time of connection and worship.',
            image: bannerUrl || images.events.default, // Use custom banner if available, otherwise default
          });
        }
      }
    };
    loadNextEvent();
  }, [images.events.default, isEventVisible, getBannerUrl]);

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareData = {
      title: event.title,
      text: `${event.title} - ${event.date} at ${event.time} @ ${event.location}. ${event.description || ''}`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing', err);
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
      alert('Event details copied to clipboard!');
    }
  };

  const ticketLink = images.events.ticket_link;

  return (
    <section className="w-full bg-brand-black relative">
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className={`
          relative w-full overflow-hidden 
          transition-all duration-700 ease-in-out
          cursor-pointer group border-y border-white/10
          ${isExpanded ? 'h-[70vh]' : 'h-[55vh] md:h-[50vh]'}
        `}
      >
        {/* Background Image */}
        <img
          src={event.image}
          alt={event.title}
          className={`
            absolute inset-0 w-full h-full object-cover transition-transform duration-1000
            ${isExpanded ? 'scale-105 grayscale-0 opacity-60' : 'scale-100 grayscale opacity-50 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-70'}
          `}
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black/80 via-transparent to-transparent" />

        {/* View Calendar Button (Top Right) */}
        {onViewCalendar && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewCalendar();
            }}
            className="absolute top-8 right-8 z-30 flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-white hover:bg-brand-lime hover:text-black hover:border-brand-lime transition-all duration-300 group/btn"
          >
            <Calendar className="w-4 h-4" />
            <span className="hidden md:inline">View Calendar</span>
            <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300" />
          </button>
        )}

        {/* Content Container */}
        <div className="absolute inset-0 flex flex-col justify-end p-3 md:p-8 lg:p-12">
          <div className="max-w-4xl relative z-10 tech-reveal">

            {/* Header Badge */}
            <div className="flex items-center gap-1.5 md:gap-4 mb-2 md:mb-6 flex-wrap">
              <span className="bg-brand-orange text-black font-bold text-[10px] md:text-sm px-1.5 md:px-3 py-0.5 md:py-1 transform -skew-x-12 shadow-[2px_2px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                NEXT UP
              </span>
              <span className="text-brand-lime font-mono text-[9px] md:text-xs tracking-widest border border-brand-lime/30 px-1.5 md:px-2 py-0.5 md:py-1 rounded-full bg-brand-black/50 backdrop-blur-md">
                {event.date} • 2024 SEASON
              </span>
            </div>

            {/* Title */}
            <h2 className={`
              text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-white uppercase leading-[0.85] mb-1.5 md:mb-4 
              transition-all duration-500 drop-shadow-2xl
              ${isExpanded ? 'text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400' : 'group-hover:text-brand-orange'}
            `}>
              {event.title}
            </h2>

            {/* Location & Details */}
            <div className={`flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 md:gap-6 text-gray-300 mb-3 md:mb-6 transition-all duration-500 ${isExpanded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-80'}`}>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 md:gap-2 hover:text-brand-lime transition-colors group/map"
              >
                <MapPin className="w-4 h-4 md:w-5 md:h-5 text-brand-purple group-hover/map:scale-110 transition-transform flex-shrink-0" />
                <span className="text-sm md:text-base lg:text-lg font-light tracking-wide underline decoration-brand-purple/50 underline-offset-4 group-hover/map:decoration-brand-lime">{event.location}</span>
              </a>
              <div className="hidden sm:block h-1 w-1 bg-gray-500 rounded-full flex-shrink-0" />
              <div className="flex items-center gap-1.5 md:gap-2">
                <Calendar className="w-4 h-4 md:w-5 md:h-5 text-brand-lime flex-shrink-0" />
                <span className="text-sm md:text-base lg:text-lg font-light tracking-wide">{event.time || '7:00 PM'}</span>
              </div>
            </div>

            {/* Expanded Content */}
            <div className={`
              overflow-hidden transition-all duration-700 ease-in-out border-l-2 border-brand-orange pl-6
              ${isExpanded ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}
            `}>
              <p className="text-xl text-gray-200 font-light leading-relaxed max-w-2xl mb-6 whitespace-pre-line">
                {event.description}
              </p>
              {(() => {
                const eventId = `${event.date}-${event.title}`.replace(/\s+/g, '-').toLowerCase();
                const registerUrl = getRegisterUrl(eventId);
                const bookSeatsUrl = getBookSeatsUrl(eventId);
                if (!registerUrl && !bookSeatsUrl) return null;
                return (
                  <div className="flex flex-wrap gap-4 mb-6">
                    {registerUrl && (
                      <a
                        href={registerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="bg-brand-lime text-black px-8 py-3 font-bold uppercase tracking-widest hover:bg-brand-orange transition-colors flex items-center gap-2"
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
                        className="bg-brand-purple text-white px-8 py-3 font-bold uppercase tracking-widest hover:bg-brand-purple/80 transition-colors flex items-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Book Seats
                      </a>
                    )}
                  </div>
                );
              })()}
              <div className="flex flex-wrap gap-4">
                {ticketLink && (
                  <a
                    href={ticketLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white text-black px-8 py-3 font-bold uppercase tracking-widest hover:bg-brand-lime transition-colors flex items-center gap-2"
                  >
                    Get Tickets <ArrowRight className="w-4 h-4" />
                  </a>
                )}
                <button
                  onClick={handleShare}
                  className="bg-transparent border border-white text-white px-8 py-3 font-bold uppercase tracking-widest hover:bg-white/10 transition-colors"
                >
                  Share
                </button>
              </div>
            </div>

          </div>

          {/* Expand Indicator */}
          <div className={`absolute bottom-8 right-8 md:bottom-16 md:right-16 transition-all duration-500 ${isExpanded ? 'rotate-180' : 'group-hover:translate-y-2'}`}>
            <ChevronDown className={`w-8 h-8 ${isExpanded ? 'text-brand-orange' : 'text-gray-500'}`} />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Events;