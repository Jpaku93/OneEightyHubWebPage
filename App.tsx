import React, { useState, useRef, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import HubPage from './components/HubPage';
import About from './components/About';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import HomePage from './pages/HomePage';
import { NavItem } from './types';
import { ImageProvider } from './contexts/ImageContext';
import { EventVisibilityProvider } from './contexts/EventVisibilityContext';
import { EventPostersProvider } from './contexts/EventPostersContext';
import { EventButtonsProvider } from './contexts/EventRegistrationContext';
import { EventBannersProvider } from './contexts/EventBannersContext';
import { GalleryProvider } from './contexts/GalleryContext';

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<NavItem>(NavItem.HOME);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastScrollTopRef = useRef(0);

  // Update active tab based on route
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setActiveTab(NavItem.HOME);
    else if (path === '/hub') setActiveTab(NavItem.HUB);
    else if (path === '/about') setActiveTab(NavItem.ABOUT);
    else if (path === '/admin') setActiveTab(NavItem.ADMIN);
  }, [location.pathname]);

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
          }
        });
      },
      {
        root: scrollContainerRef.current,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const timeout = setTimeout(() => {
      const elements = document.querySelectorAll('.tech-reveal');
      elements.forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [location.pathname]);

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavClick = (id: string) => {
    const key = id.toUpperCase();

    if (key === 'HOME') {
      navigate('/');
      scrollToTop();
    } else if (key === 'HUB') {
      navigate('/hub');
      scrollToTop();
    } else if (key === 'ABOUT') {
      navigate('/about');
      scrollToTop();
    } else if (key === 'ADMIN') {
      navigate('/admin');
      scrollToTop();
    } else if (key === 'CALENDAR_LINK') {
      navigate('/hub');
      setTimeout(() => {
        const element = document.getElementById('calendar-section');
        if (element && scrollContainerRef.current) {
          const top = element.getBoundingClientRect().top + scrollContainerRef.current.scrollTop - 100;
          scrollContainerRef.current.scrollTo({ top, behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleNavigateToAbout = () => {
    navigate('/about');
    scrollToTop();
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    navigate('/');
  };

  const isAdminRoute = location.pathname === '/admin';

  return (
    <ImageProvider>
      <EventVisibilityProvider>
        <EventPostersProvider>
          <EventButtonsProvider>
            <EventBannersProvider>
              <GalleryProvider>
                <div className="relative h-screen w-full bg-black overflow-hidden font-sans selection:bg-brand-lime selection:text-black">

                  {!isAdminRoute && (
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
                    <Routes>
                      <Route
                        path="/"
                        element={
                          <HomePage
                            scrollOffset={scrollOffset}
                            onNavigateToHub={() => handleNavClick('HUB')}
                            onNavigateToAbout={handleNavigateToAbout}
                            onViewCalendar={() => handleNavClick('CALENDAR_LINK')}
                            onAdminClick={() => handleNavClick('ADMIN')}
                          />
                        }
                      />
                      <Route
                        path="/hub"
                        element={<HubPage onBack={() => navigate('/')} />}
                      />
                      <Route
                        path="/about"
                        element={<About />}
                      />
                      <Route
                        path="/admin"
                        element={
                          isAdminAuthenticated ? (
                            <AdminDashboard onBack={handleAdminLogout} />
                          ) : (
                            <AdminLogin onLogin={() => setIsAdminAuthenticated(true)} />
                          )
                        }
                      />
                      <Route
                        path="*"
                        element={
                          <HomePage
                            scrollOffset={scrollOffset}
                            onNavigateToHub={() => handleNavClick('HUB')}
                            onNavigateToAbout={handleNavigateToAbout}
                            onViewCalendar={() => handleNavClick('CALENDAR_LINK')}
                            onAdminClick={() => handleNavClick('ADMIN')}
                          />
                        }
                      />
                    </Routes>
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
              </GalleryProvider>
            </EventBannersProvider>
          </EventButtonsProvider>
        </EventPostersProvider>
      </EventVisibilityProvider>
    </ImageProvider>
  );
};

export default App;
