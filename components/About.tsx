import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronDown, Mic2, Music, Camera, Megaphone, BookOpen, Coffee, Calendar, Zap, Heart } from 'lucide-react';
import Footer from './Footer';
import MinistryDetail from './MinistryDetail';
import { Ministry } from '../types';
import { useImages } from '../contexts/ImageContext';

const faqs = [
  {
    question: "WHAT IS ONE EIGHTY ?",
    answer: "One Eighty is a movement dedicated to helping individuals break free from destructive behaviours and embark on a journey towards positive transformation."
  },
  {
    question: "IS ONE EIGHTY A THERAPY OR TREATMENT PROGRAM ?",
    answer: "No, One Eighty is not a therapy or treatment program. Instead, we provide support, guidance, and inspiration for individuals seeking to make positive changes in their lives. We encourage seeking professional help when needed."
  },
  {
    question: "HOW DOES ONE EIGHTY HELP INDIVIDUALS ON THEIR JOURNEY TO TRANSFORMATION ?",
    answer: "One Eighty offers support, resources, and inspiration through lived experiences, expert guidance, and community engagement, empowering individuals to create meaningful and positive changes in their lives."
  },
  {
    question: "HOW CAN I GET INVOLVED WITH ONE EIGHTY ?",
    answer: "There are several ways to get involved with One Eighty, including sharing your own story, participating in community events, spreading awareness on social media, and supporting our mission through donations or volunteering. Join us at Stockland Wetherill Park every Thursday at 7 pm."
  }
];

const About: React.FC = () => {
  const { images } = useImages();
  const [showAllMinistries, setShowAllMinistries] = useState(false);
  const [selectedMinistry, setSelectedMinistry] = useState<Ministry | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    if (selectedMinistry) {
      window.scrollTo(0, 0);
    }
  }, [selectedMinistry]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const ministries: Ministry[] = [
    {
      id: 'worship',
      icon: <Mic2 className="w-6 h-6" />,
      title: "Worship & Singing",
      desc: "Bring your voice. Bring your heart. Our worship team isn’t a performance. It’s a crew of people who love God’s presence.",
      longDesc: `Our worship team isn’t a performance. It’s a crew of people who love God’s presence and want to lead others into it. 
      
      We believe worship is a weapon and a way of life. When we gather, we aren't just singing songs; we are setting the atmosphere for miracles, breakthroughs, and encounters with Jesus.`,
      roles: [
        "Lead worship from the platform and from the heart.",
        "Grow in teamwork, spiritual discipline, and excellence.",
        "Be part of moments where chains break and people meet Jesus.",
        "Attend weekly rehearsals and spiritual pre-service prep."
      ],
      whoFor: "If you love singing, harmonies, or just find yourself worshipping at home, this is a space to develop that gift and use it for something eternal.",
      colorClass: "border-brand-purple",
      textAccent: "text-brand-purple",
      image: images.about.min_worship
    },
    {
      id: 'band',
      icon: <Music className="w-6 h-6" />,
      title: "Band & Musicians",
      desc: "Drums, guitar, bass, keys. Tighten your skills with regular rehearsals, learn to flow, and play as one unit.",
      longDesc: `Drums, guitar, bass, keys, tracks – this is your lane. Our band practices are about more than nailing the set list. It's about prophetic flow, musical excellence, and spiritual sensitivity.
      
      We are building a sound that defines a generation.`,
      roles: [
        "Tighten your skills with regular rehearsals.",
        "Learn how to flow with worship, not just play songs.",
        "Get coaching on timing, dynamics, and playing as one unit.",
        "Serve faithfully on rotation for Hub Nights and events."
      ],
      whoFor: "You don’t have to be perfect to start. If you’re hungry to grow, willing to commit to practice, and want to use your instrument for God, there’s room for you.",
      colorClass: "border-brand-orange",
      textAccent: "text-brand-orange",
      image: images.about.min_band
    },
    {
      id: 'digital-arts',
      icon: <Camera className="w-6 h-6" />,
      title: "Digital Arts",
      desc: "Graphics, Video & Photography. Turn moments into visuals that move people and point them to hope.",
      longDesc: `Turn moments into visuals that move people. If you’re into design, editing, or capturing the moment, the digital art ministry is where your creativity becomes part of the mission.
      
      We tell the story of what God is doing here through every pixel and frame.`,
      roles: [
        "Graphics: Create visuals for screens, socials, events, and series themes.",
        "Video: Capture testimonies, recap nights, and create content that tells real stories.",
        "Photography: Shoot services, outreaches, and behind-the-scenes moments.",
        "Social Media: Help curate the online presence of the movement."
      ],
      whoFor: "You’ll learn how to think in story, colour, and composition – not just for aesthetics, but to point people to hope. Perfect for creatives, tech-heads, and visual storytellers.",
      colorClass: "border-brand-lime",
      textAccent: "text-brand-lime",
      image: images.about.min_digital
    },
    {
      id: 'concerts',
      icon: <Zap className="w-6 h-6" />,
      title: "Concerts & Performances",
      desc: "Dance, drama, spoken word. Events built to pull people from the street into an atmosphere of impact.",
      longDesc: `High energy, high impact, high purpose. Our concerts and special events are built to pull people in from the street into an atmosphere they don’t expect from “church.”
      
      This is about using every art form to glorify God and grab attention.`,
      roles: [
        "Dance, drama, spoken word, live music and creative elements.",
        "Regular rehearsals to sharpen flow, stage presence and unity.",
        "A safe place to stretch your gift and try new creative ideas.",
        "Planning and executing high-level productions."
      ],
      whoFor: "If you love the buzz of big nights, have a talent for performance arts, and want to be part of building experiences that change lives, this is where you plug in.",
      colorClass: "border-brand-orange",
      textAccent: "text-brand-orange",
      image: images.about.min_concerts
    },
    {
      id: 'outreach',
      icon: <Megaphone className="w-6 h-6" />,
      title: "Street Outreach",
      desc: "Taking the Gospel outside the four walls. Street preaching, inviting, and praying with people where they are.",
      longDesc: `From the building to the streets. One of the main heartbeat ministries of One Eighty Hub is taking the Gospel outside the four walls. We refuse to keep the Good News hidden.
      
      We go where the people are—parks, plazas, skate parks, and malls.`,
      roles: [
        "Street preaching, testimonies and one-on-one conversations.",
        "Handing out flyers, inviting people, and praying with them where they are.",
        "Learning how to share your story and the message of Jesus clearly and boldly.",
        "Supporting the team through prayer and presence."
      ],
      whoFor: "You don’t have to be a loud preacher to join. We need people who talk, people who pray, people who support, and people who just show up and learn to love their city.",
      colorClass: "border-brand-purple",
      textAccent: "text-brand-purple",
      image: images.about.min_outreach
    },
    {
      id: 'altar-calls',
      icon: <Heart className="w-6 h-6" />,
      title: "Altar Calls & Support",
      desc: "Pray with new believers, answer questions, and be a calm, faith-filled presence at the front lines of life change.",
      longDesc: `Being there for the moment that matters most. When people respond to God, we don’t want them standing alone at the altar. This team serves at the most critical moment of our gatherings.`,
      roles: [
        "Pray with new believers and those rededicating their lives.",
        "Help answer basic questions and connect them to follow-up.",
        "Be a calm, faith-filled presence at the front lines of life change.",
        "Distribute bibles and resources to new believers."
      ],
      whoFor: "If you carry compassion, are a good listener, and want to help people take their first steps with Jesus, this ministry is for you.",
      colorClass: "border-brand-lime",
      textAccent: "text-brand-lime",
      image: images.about.min_altar
    },
    {
      id: 'bible-studies',
      icon: <BookOpen className="w-6 h-6" />,
      title: "Bible Studies",
      desc: "Deep roots. Strong lives. Learn how to read Scripture and wrestle with truth in a community that sharpens you.",
      longDesc: `Deep roots. Strong lives. Real change. Bible studies are where the hype becomes habits and roots go deep. We move beyond surface-level faith into real understanding of the Word.`,
      roles: [
        "Learn how to read and apply Scripture to real-life situations.",
        "Ask questions, wrestle with truth and grow with others.",
        "Be discipled and eventually learn to disciple others.",
        "Commit to a weekly or bi-weekly small group gathering."
      ],
      whoFor: "You don’t need to “know it all.” You just need a Bible, a notebook, and a willing heart to learn.",
      colorClass: "border-brand-purple",
      textAccent: "text-brand-purple",
      image: images.about.min_bible
    },
    {
      id: 'open-homes',
      icon: <Coffee className="w-6 h-6" />,
      title: "Open Homes",
      desc: "Faith grows better around tables, Real conversations, food, and family without judgement.",
      longDesc: `Faith grows better around tables, not just rows. Open homes are our spaces for real conversations, food, and family. It's where the big crowd becomes a family.`,
      roles: [
        "Hang out, eat, laugh and build genuine friendships.",
        "Talk about life, faith, struggles and wins without judgement.",
        "Create an environment where newcomers feel safe and seen.",
        "Host or co-host gatherings in homes or cafes."
      ],
      whoFor: "If you love hosting, cooking, or just talking with people, this is a beautiful way to serve and build community.",
      colorClass: "border-brand-orange",
      textAccent: "text-brand-orange",
      image: images.about.min_homes
    },
    {
      id: 'hub-events',
      icon: <Calendar className="w-6 h-6" />,
      title: "Hub Events",
      desc: "Theme nights, training, and encounters that serve as a launchpad into purpose. Help plan the big nights.",
      longDesc: `Gathered, focused, and built for impact. These are the big nights and key gatherings that anchor our calendar. Every Hub event is designed to be a launchpad into purpose.`,
      roles: [
        "A place where someone can encounter Jesus for the first time.",
        "A space where believers can be challenged, trained and refreshed.",
        "Serving here means helping plan, promote, set up, host, and execute.",
        "Ensuring every night feels intentional from door to altar."
      ],
      whoFor: "For the organizers, the planners, the energetic hosts, and the hard workers who make the dream work.",
      colorClass: "border-brand-lime",
      textAccent: "text-brand-lime",
      image: images.about.min_hub
    }
  ];

  const displayedMinistries = showAllMinistries ? ministries : ministries.slice(0, 6);

  if (selectedMinistry) {
    return <MinistryDetail ministry={selectedMinistry} onBack={() => setSelectedMinistry(null)} />;
  }

  return (
    <div className="min-h-screen bg-brand-black text-white pt-24 animate-fadeIn">
      
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden py-10">
        <div 
          className="absolute inset-0 bg-cover bg-center grayscale opacity-40"
          style={{ backgroundImage: `url('${images.about.heroBg}')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/50 to-transparent"></div>
        
        <div className="relative z-10 text-center max-w-4xl px-6 tech-reveal">
          <h1 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tighter mb-4">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-purple">180 Hub</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 font-light tracking-wide border-t border-b border-brand-lime py-4 inline-block">
            WHO WE ARE & WHERE WE'RE GOING
          </p>
        </div>
      </section>

      {/* Ministries Grid */}
      <section className="py-20 px-8 bg-brand-charcoal border-t border-white/5">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold uppercase mb-4">Our Teams</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We don't just consume; we contribute. Find your place in one of our core ministries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedMinistries.map((item, idx) => (
              <div 
                key={idx} 
                onClick={() => setSelectedMinistry(item)}
                className={`
                  group relative h-[450px] overflow-hidden bg-brand-black border-t-4 ${item.colorClass}
                  shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer
                `}
              >
                {/* Background Image */}
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700 opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-80 group-hover:scale-110" 
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/70 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500" />
                
                {/* Icon Badge */}
                <div className={`absolute top-6 right-6 p-3 bg-black/50 backdrop-blur-md rounded-full border border-white/10 ${item.textAccent} transition-transform duration-500 group-hover:scale-110`}>
                  {item.icon}
                </div>

                {/* Content Wrapper */}
                <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end">
                  
                  {/* Title */}
                  <h3 className="text-3xl font-display font-bold text-white uppercase mb-2 leading-none drop-shadow-lg transform transition-transform duration-500 group-hover:-translate-y-2">
                    {item.title}
                  </h3>

                  {/* Subtitle / Description (Reveals on Hover) */}
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-out">
                    <div className="overflow-hidden">
                      <p className="text-gray-300 text-sm leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Button */}
                  <button 
                    className={`
                    w-fit text-xs font-bold uppercase tracking-widest flex items-center gap-2 
                    ${item.textAccent} border border-transparent 
                    group-hover:border-${item.colorClass.replace('border-', '')} 
                    group-hover:px-4 group-hover:py-2 group-hover:bg-white/5 group-hover:rounded-sm
                    transition-all duration-300
                  `}>
                    View Details <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="flex justify-center mt-12">
              <button 
                  onClick={() => setShowAllMinistries(!showAllMinistries)}
                  className="group relative px-10 py-4 bg-transparent border border-white/20 text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black hover:border-transparent transition-all duration-300 rounded-sm"
              >
                  <span className="relative z-10 flex items-center gap-2">
                      {showAllMinistries ? 'View Less' : 'View All Teams'} 
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showAllMinistries ? 'rotate-180' : ''}`} />
                  </span>
              </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-8 bg-brand-black border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-display font-bold uppercase mb-12 text-center text-white">
            FAQs
          </h2>
          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/10 last:border-0">
                <button 
                  onClick={() => toggleFaq(index)} 
                  className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
                >
                  <span className="font-display font-bold uppercase text-lg md:text-xl text-white group-hover:text-brand-lime transition-colors pr-8">
                    {faq.question}
                  </span>
                  <div className={`p-2 rounded-full border border-white/20 transition-all duration-300 shrink-0 ${openFaqIndex === index ? 'bg-brand-lime text-black rotate-180' : 'text-white'}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>
                <div className={`grid transition-all duration-300 ease-in-out ${openFaqIndex === index ? 'grid-rows-[1fr] opacity-100 pb-8' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <p className="text-gray-400 leading-relaxed text-base md:text-lg">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="min-h-[40vh] flex items-center justify-center py-20 px-8 text-center bg-[url('https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center grayscale relative">
        <div 
          className="absolute inset-0 bg-cover bg-center grayscale opacity-40"
          style={{ backgroundImage: `url('${images.about.ctaBg}')` }}
        ></div>
        <div className="absolute inset-0 bg-brand-purple/90 mix-blend-multiply"></div>
        <div className="relative z-10 max-w-3xl mx-auto tech-reveal">
          <h2 className="text-4xl md:text-6xl font-display font-bold uppercase text-white mb-6">What's Your Next Step?</h2>
          <p className="text-lg md:text-xl text-white/80 mb-10">Your story doesn't have to stay where it is. If you're ready for a 180°, we'd love to meet you.</p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <button className="bg-white text-black px-8 py-4 md:px-10 font-bold uppercase tracking-widest hover:bg-brand-lime transition-colors">
              Come to a Night
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 md:px-10 font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
              Ask a Question
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
