import React from 'react';
import Hero from '../components/Hero';
import Events from '../components/Events';
import Hub from '../components/Hub';
import Community from '../components/Community';
import Footer from '../components/Footer';

interface HomePageProps {
    scrollOffset: number;
    onViewCalendar: () => void;
    onNavigateToHub: () => void;
    onNavigateToAbout: () => void;
    onAdminClick: () => void;
}

const HomePage: React.FC<HomePageProps> = ({
    scrollOffset,
    onViewCalendar,
    onNavigateToHub,
    onNavigateToAbout,
    onAdminClick
}) => {
    return (
        <>
            <div id="home">
                <Hero scrollOffset={scrollOffset} onNavigateToAbout={onNavigateToAbout} />
            </div>

            <div id="events" className="relative z-20">
                <Events
                    scrollOffset={scrollOffset}
                    onViewCalendar={onViewCalendar}
                />
            </div>

            <div id="hub">
                <Hub
                    scrollOffset={scrollOffset}
                    onNavigate={onNavigateToHub}
                />
            </div>

            <div id="stories">
                <Community scrollOffset={scrollOffset} />
            </div>

            <Footer onAdminClick={onAdminClick} />
        </>
    );
};

export default HomePage;
