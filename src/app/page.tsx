'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchSpaceEvents, SpaceEvent, formatEventDate } from '@/lib/wikipedia';
import { fetchISSPosition, ISSPosition } from '@/lib/iss';
import { usePassport } from '@/contexts/PassportContext';
import RealTimeISSTracker from '@/components/RealTimeISSTracker';

// TODO: Maybe add more facts from different categories? (physics, exploration, etc.)
const spaceFacts = [
  {
    id: 1,
    title: "One Day on Venus",
    fact: "A day on Venus (243 Earth days) is longer than its year (225 Earth days)!",
    icon: "🪐"
  },
  {
    id: 2,
    title: "Neutron Star Density", 
    fact: "A teaspoon of neutron star material would weigh about 6 billion tons on Earth.",
    icon: "⭐"
  },
  {
    id: 3,
    title: "Space Silence",
    fact: "There is no sound in space because there are no molecules to carry sound waves.",
    icon: "🔇"
  },
  {
    id: 4,
    title: "Saturn's Density",    fact: "Saturn is less dense than water - it would float if you could find a bathtub big enough!",
    icon: "🪐"
  },
  {
    id: 5,
    title: "Space Footprints",
    fact: "Footprints on the Moon will last millions of years because there's no wind to erase them.",
    icon: "👨‍🚀"
  },
  {
    id: 6,
    title: "Galaxy Speed",
    fact: "The Milky Way galaxy is traveling through space at 1.3 million miles per hour!",
    icon: "🌌"
  }
];

function SpaceFactsCarousel() {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex((prev) => (prev + 1) % spaceFacts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentFactIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-sm rounded-xl p-8 border border-white/10 text-center"
        >
          <motion.div
            className="text-5xl mb-4"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {spaceFacts[currentFactIndex].icon}
          </motion.div>
          <h3 className="text-2xl font-bold text-white mb-4">
            {spaceFacts[currentFactIndex].title}
          </h3>
          <p className="text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">
            {spaceFacts[currentFactIndex].fact}
          </p>
        </motion.div>
      </AnimatePresence>
      
      <div className="flex justify-center mt-6 gap-2">
        {spaceFacts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentFactIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentFactIndex 
                ? 'bg-white scale-125' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [spaceEvents, setSpaceEvents] = useState<SpaceEvent[]>([]);
  const [issPosition, setIssPosition] = useState<ISSPosition | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { hasPassport } = usePassport();

  useEffect(() => {
    const loadTodaysEvents = async () => {
      try {
        setLoading(true);
        const today = new Date();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        
        const events = await fetchSpaceEvents(month, day);
        setSpaceEvents(events);
      } catch (err) {
        setError('Failed to load space events');
        console.error('Error loading events:', err);
      } finally {
        setLoading(false);
      }
    };

    const updateISSPosition = async () => {
      try {
        const iss = await fetchISSPosition();
        if (iss) setIssPosition(iss);
      } catch (err) {
        console.error('Error fetching ISS position:', err);
      }
    };

    loadTodaysEvents();
    updateISSPosition();

    // Update ISS position every 5 seconds
    const issInterval = setInterval(updateISSPosition, 5000);

    return () => {
      clearInterval(issInterval);
    };
  }, []);

  const today = new Date();
  const todayFormatted = formatEventDate(today.getMonth() + 1, today.getDate());

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-screen px-4">
        <div className="container mx-auto text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-6xl md:text-8xl font-aura font-bold text-white mb-6">
              Among the{' '}
              <motion.span
                className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Space
              </motion.span>
            </h1>
            
            <motion.p
              className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Journey through the cosmos and discover what happened in space history on any date.
              Create your cosmic passport and explore the universe like never before.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {!hasPassport ? (
                <Link
                  href="/passport"
                  className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Create Your Space Passport 🚀
                </Link>
              ) : (
                <Link
                  href="/explore"
                  className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Continue Your Journey 🌟
                </Link>
              )}
              
              <Link
                href="/date-selector"
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              >
                Explore Any Date 🌍
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Live ISS Tracker Preview */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-aura font-bold text-white mb-4">
              International Space Station
            </h2>
            <p className="text-xl text-white/70">
              Humanity's home in space, orbiting Earth right now
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/10"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  Live ISS Position
                </h3>
                <div className="space-y-4">
                  {issPosition ? (
                    <>
                      <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                        <div className="text-cyan-400 font-medium mb-2 flex items-center gap-2">
                          🛰️ ISS Real-Time Data
                        </div>
                        <div className="text-white text-sm space-y-1">
                          <div>Latitude: {issPosition.latitude.toFixed(2)}°</div>
                          <div>Longitude: {issPosition.longitude.toFixed(2)}°</div>
                          <div>Speed: 27,600 km/h</div>
                          <div>Altitude: 408 km</div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center gap-4">
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      <span className="text-white/70">Loading ISS position...</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">🌍</span>
                    <div>
                      <div className="text-white font-semibold">Orbiting Earth</div>
                      <div className="text-white/70 text-sm">Every 90 minutes</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">👨‍🚀</span>
                    <div>
                      <div className="text-white font-semibold">Crew Members</div>
                      <div className="text-white/70 text-sm">Usually 6-7 astronauts</div>
                    </div>
                  </div>
                </div>
                <Link
                  href="/explore"
                  className="inline-flex items-center mt-6 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Learn More About ISS
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
              
              {/* Real-time ISS Tracker */}
              <RealTimeISSTracker />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Space Facts Carousel */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Did You Know?
            </h2>
            <p className="text-xl text-white/70">
              Fascinating facts from the cosmos
            </p>
          </motion.div>

          <SpaceFactsCarousel />
        </div>
      </section>

      {/* What Happened Today in Space Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              What Happened Today in Space?
            </h2>
            <p className="text-xl text-white/70">
              Discover space events that occurred on {todayFormatted}
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <motion.div
                className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-400 text-lg">{error}</p>
            </div>
          ) : spaceEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {spaceEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  {event.image && (
                    <div className="mb-4 overflow-hidden rounded-lg">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  )}
                  
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-yellow-300 font-semibold text-sm bg-yellow-300/20 px-3 py-1 rounded-full">
                      {event.year}
                    </span>
                  </div>
                  
                  <h3 className="text-white font-bold text-lg mb-3 line-clamp-2">
                    {event.title}
                  </h3>
                  
                  <p className="text-white/70 text-sm line-clamp-3 mb-4">
                    {event.description}
                  </p>
                  
                  {event.url !== '#' && (
                    <a
                      href={event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-300 hover:text-blue-200 text-sm font-medium transition-colors duration-200"
                    >
                      Learn More
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-white/70 text-lg mb-4">
                No space events found for today, but every day is a good day to explore the cosmos!
              </p>
              <Link
                href="/date-selector"
                className="inline-flex items-center text-blue-300 hover:text-blue-200 font-medium transition-colors duration-200"
              >
                Try a different date
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready for Your Space Adventure?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Join thousands of space enthusiasts exploring the universe through history. 
              Create your cosmic passport and start your journey among the stars today.
            </p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {!hasPassport ? (
                <>
                  <Link
                    href="/passport"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl"
                  >
                    🚀 Create Space Passport
                  </Link>
                  <Link
                    href="/explore"
                    className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                  >
                    🌌 Explore Universe
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/explore"
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl"
                  >
                    🌟 Continue Journey
                  </Link>
                  <Link
                    href="/date-selector"
                    className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                  >
                    🌍 Time Travel
                  </Link>
                </>
              )}
            </motion.div>

            <motion.div
              className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="text-center">
                <div className="text-3xl mb-2">🏆</div>
                <div className="text-white font-semibold">Achievements</div>
                <div className="text-white/60 text-sm">Unlock cosmic badges</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">📅</div>
                <div className="text-white font-semibold">Time Travel</div>
                <div className="text-white/60 text-sm">Explore any date in history</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🎓</div>
                <div className="text-white font-semibold">Learn & Level Up</div>
                <div className="text-white/60 text-sm">Gain XP and cosmic knowledge</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
