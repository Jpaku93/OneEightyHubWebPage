import React, { useState, useRef, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Hub from './components/Hub';
import Community from './components/Community';
import Footer from './components/Footer';
import HubPage from './components/HubPage';
import Events from './components/Events';
import About from './components/About';
import AdminDashboard from './components/AdminDashboard';
import { NavItem } from './types';
import { ImageProvider } from './contexts/ImageContext';

type View = 'HOME' | 'HUB' | 'ABOUT' | 'ADMIN';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavItem>(NavItem.HOME);
  const [currentView, setCurrentView] = useState<View>('HOME');
  const [scrollOffset, setScrollOffset] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastScrollTopRef = useRef(0);

  // Scroll Handler
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const currentScroll = container.scrollTop;
      setScrollOffset(currentScroll);

      // Scroll direction logic
      if (currentScroll > lastScrollTopRef.current && currentScroll > 100) {
        setIsNavVisible(false);
      } else {
        setIsNavVisible(true);
      }

      setIsAtTop(currentScroll < 50);
      lastScrollTopRef.current = currentScroll;
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation Observer (Tech Reveal)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('tech-reveal-active');
            // Optional: Stop observing once revealed
            // observer.unobserve(entry.target); 
          }
        });
      },
      {
        root: scrollContainerRef.current, // Observe within our scroll container
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Slight delay to ensure DOM is ready after view switch
    const timeout = setTimeout(() => {
      const elements = document.querySelectorAll('.tech-reveal');
      elements.forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [currentView]); // Re-run when view changes

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavClick = (id: string) => {
    const key = id.toUpperCase();

    if (key === 'HOME') {
      setCurrentView('HOME');
      setActiveTab(NavItem.HOME);
      scrollToTop();
    } else if (key === 'HUB') {
      setCurrentView('HUB');
      setActiveTab(NavItem.HUB);
      scrollToTop();
    } else if (key === 'ABOUT') {
      setCurrentView('ABOUT');
      setActiveTab(NavItem.ABOUT);
      scrollToTop();
    } else if (key === 'ADMIN') {
      setCurrentView('ADMIN');
      setActiveTab(NavItem.ADMIN);
      scrollToTop();
    } else if (key === 'CALENDAR_LINK') {
      // Special case for calendar deep link to Hub page
      setCurrentView('HUB');
      setActiveTab(NavItem.HUB);
      setTimeout(() => {
        const element = document.getElementById('calendar-section');
        if (element && scrollContainerRef.current) {
            // Calculate position relative to container
            const top = element.getBoundingClientRect().top + scrollContainerRef.current.scrollTop - 100; // -100 for header offset
            scrollContainerRef.current.scrollTo({ top, behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <ImageProvider>
      <div className="relative h-screen w-full bg-black overflow-hidden font-sans selection:bg-brand-lime selection:text-black">
        
        {currentView !== 'ADMIN' && (
          <Navigation 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            isNavVisible={isNavVisible}
            isAtTop={isAtTop}
            onNavClick={handleNavClick}
          />
        )}

        {/* Main Scroll Container */}
        <div 
          ref={scrollContainerRef}
          className="h-full w-full overflow-y-auto overflow-x-hidden scroll-smooth"
        >
          {currentView === 'HOME' && (
            <>
              <div id="home">
                <Hero scrollOffset={scrollOffset} />
              </div>
              
              {/* Events Feature Section */}
              <div id="events" className="relative z-20">
                 <Events 
                   scrollOffset={scrollOffset} 
                   onViewCalendar={() => handleNavClick('CALENDAR_LINK')}
                 />
              </div>

              <div id="hub">
                <Hub 
                  scrollOffset={scrollOffset} 
                  onNavigate={() => handleNavClick('HUB')} 
                />
              </div>

              <div id="stories">
                <Community scrollOffset={scrollOffset} />
              </div>

              <Footer onAdminClick={() => handleNavClick('ADMIN')} />
            </>
          )}
          
          {currentView === 'HUB' && (
            <HubPage onBack={() => handleNavClick('HOME')} />
          )}

          {currentView === 'ABOUT' && (
            <About />
          )}

          {currentView === 'ADMIN' && (
            <AdminDashboard onBack={() => handleNavClick('HOME')} />
          )}
        </div>

        {/* Mouse Follower / Cursor Glow */}
        <div 
          className="fixed pointer-events-none z-0 w-[500px] h-[500px] bg-gradient-to-r from-brand-orange/5 to-brand-purple/5 rounded-full blur-[100px] opacity-50 mix-blend-screen transition-transform duration-1000 ease-out"
          style={{ 
            top: -250, 
            left: -250,
            transform: `translate(${scrollOffset * 0.2}px, ${scrollOffset * 0.1}px)` 
          }}
        />
      </div>
    </ImageProvider>
  );
};

export default App;
