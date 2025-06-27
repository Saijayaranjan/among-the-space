'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { fetchSpaceEvents, SpaceEvent, formatEventDate } from '@/lib/wikipedia';
import { usePassport } from '@/contexts/PassportContext';

export default function DateSelectorPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [spaceEvents, setSpaceEvents] = useState<SpaceEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [monthRadius, setMonthRadius] = useState(230);
  const [orbitalRadius, setOrbitalRadius] = useState(120);
  const [isDragging, setIsDragging] = useState(false);
  const [orbitUsageCount, setOrbitUsageCount] = useState(0);
  const { passport, recordDateExploration, addAchievement, addExperiencePoints } = usePassport();

  // Motion values for Earth orbit - start at top of orbit (January 1st)
  const earthX = useMotionValue(0);
  const earthY = useMotionValue(-90); // Will be updated by responsive logic

  useEffect(() => {
    const updateRadius = () => {
      if (window.innerWidth < 640) {
        setMonthRadius(138);
        setOrbitalRadius(90);
        earthY.set(-90); // Update Earth position
      } else if (window.innerWidth < 1024) {
        setMonthRadius(184);
        setOrbitalRadius(105);
        earthY.set(-105);
      } else {
        setMonthRadius(230);
        setOrbitalRadius(120);
        earthY.set(-120);
      }
    };

    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, [earthY]);
  
  // Create orbital trail effect
  const [trailPoints, setTrailPoints] = useState<Array<{x: number, y: number, opacity: number}>>([]);

  const loadEventsForDate = async (date: Date) => {
    setLoading(true);
    try {
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const events = await fetchSpaceEvents(month, day);
      setSpaceEvents(events);
      
      // Record date exploration for achievements
      if (passport) {
        recordDateExploration(date.toDateString());
      }
    } catch (error) {
      console.error('Error loading events:', error);
      setSpaceEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEventsForDate(selectedDate);
  }, [selectedDate]);

  // Set initial Earth position based on current date
  useEffect(() => {
    // Don't update position during dragging to prevent jump-back behavior
    if (isDragging) return;
    
    const updateEarthPosition = (date: Date) => {
      const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
      const angle = ((dayOfYear - 1) / 365) * 2 * Math.PI - Math.PI / 2; // Start from top (January 1st)
      const radius = 200; // Increased radius for more realistic appearance
      
      earthX.set(Math.cos(angle) * radius);
      earthY.set(Math.sin(angle) * radius);
    };

    updateEarthPosition(selectedDate);
  }, [selectedDate, earthX, earthY, isDragging]);

  // Realistic orbital drag with smooth physics - no jump-back behavior
  const handleEarthDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // Get the mouse/touch position in global coordinates
    const rect = (event.target as Element).closest('.relative')?.getBoundingClientRect();
    if (!rect) return;
    
    // Calculate center of the solar system container
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Get mouse position relative to center
    const mouseX = info.point.x - centerX;
    const mouseY = info.point.y - centerY;
    
    // Calculate angle from mouse position
    const angle = Math.atan2(mouseY, mouseX);
    
    // Fixed orbital radius (always stays on perfect circle)
    // Use dynamic orbital radius for Earth constraint
    
    // Calculate position on the circular orbit
    const constrainedX = Math.cos(angle) * orbitalRadius;
    const constrainedY = Math.sin(angle) * orbitalRadius;
    
    // Update Earth position to stay exactly on the orbit
    earthX.set(constrainedX);
    earthY.set(constrainedY);
    
    // Add trail points for orbital visualization
    if (isDragging) {
      setTrailPoints(prev => [
        ...prev.slice(-8), // Keep fewer points for smoother trail
        { x: constrainedX, y: constrainedY, opacity: 1 }
      ]);
    }
  };

  const handleEarthDragEnd = () => {
    // Convert final position to date only when drag ends
    const currentX = earthX.get();
    const currentY = earthY.get();
    
    let angle = Math.atan2(currentY, currentX);
    if (angle < 0) angle += 2 * Math.PI;
    
    // Adjust angle so January 1st is at top (270 degrees or -π/2)
    let adjustedAngle = angle + Math.PI / 2;
    if (adjustedAngle >= 2 * Math.PI) adjustedAngle -= 2 * Math.PI;
    
    // Convert angle to day of year (0-364)
    const dayOfYear = Math.floor((adjustedAngle / (2 * Math.PI)) * 365);
    
    // Create new date
    const newDate = new Date(2024, 0, 1);
    newDate.setDate(dayOfYear + 1);
    
    setSelectedDate(newDate);
    
    // Clear trail
    setTrailPoints([]);
    
    // Track usage for achievements
    const newCount = orbitUsageCount + 1;
    setOrbitUsageCount(newCount);
    
    // Record exploration and check achievements
    if (passport) {
      recordDateExploration(newDate.toDateString());
      addExperiencePoints(5); // Reward for using orbital selector
      
      if (newCount >= 10 && !passport.achievements.includes('orbital-master')) {
        addAchievement('orbital-master');
      }
      if (newCount >= 25 && !passport.achievements.includes('time-navigator')) {
        addAchievement('time-navigator');
      }
    }
  };

  // Fade out trail points - slower to reduce updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTrailPoints(prev => 
        prev.map(point => ({ ...point, opacity: point.opacity * 0.9 }))
            .filter(point => point.opacity > 0.05)
      );
    }, 500); // Increased from 100ms to 500ms for better performance
    
    return () => clearInterval(interval);
  }, []);

  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    setSelectedDate(newDate);
  };

  const formatDateForInput = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const quickDates = [
    { label: 'Apollo 11 Launch', date: new Date(2024, 6, 16) },
    { label: 'Sputnik Launch', date: new Date(2024, 9, 4) },
    { label: 'Hubble Launch', date: new Date(2024, 3, 24) },
    { label: 'Yuri Gagarin', date: new Date(2024, 3, 12) },
    { label: 'Moon Landing', date: new Date(2024, 6, 20) },
    { label: 'First Spacewalk', date: new Date(2024, 2, 18) },
  ];

  return (
    <div className="min-h-screen px-4 py-20">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Orbital{' '}
            <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              Date Selector
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Drag Earth around its orbit to discover space events from any date in history
          </p>

          {/* Date Input Controls */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <input
              type="date"
              value={formatDateForInput(selectedDate)}
              onChange={handleDateInputChange}
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white text-base focus:outline-none focus:border-blue-400 transition-colors duration-200"
            />
            <div className="text-white/60 text-base">
              or drag Earth in the solar system below (desktop only)
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Solar System Visualization - Hidden on mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative justify-center order-2 xl:order-1 hidden sm:flex"
          >
            <div
              className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] bg-black/20 rounded-full border-2 border-white/20 overflow-visible mx-auto"
              style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.2) 100%)' }}
            >
              {/* Background stars for depth */}
              {Array.from({ length: 20 }, (_, i) => (
                <motion.div
                  key={`bg-star-${i}`}
                  className="absolute w-1 h-1 bg-white/40 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    opacity: [0.2, 0.8, 0.2],
                    scale: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: Math.random() * 3 + 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}

              {/* Sun at center with realistic glow */}
              <motion.div
                className="absolute top-1/2 left-1/2 w-16 h-16 -mt-8 -ml-8 bg-gradient-to-r from-yellow-300 to-orange-500 rounded-full shadow-lg z-10"
                animate={{
                  boxShadow: [
                    '0 0 30px rgba(251, 191, 36, 0.6), 0 0 60px rgba(251, 191, 36, 0.3)',
                    '0 0 50px rgba(251, 191, 36, 0.8), 0 0 100px rgba(251, 191, 36, 0.4)',
                    '0 0 30px rgba(251, 191, 36, 0.6), 0 0 60px rgba(251, 191, 36, 0.3)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="w-full h-full bg-gradient-to-br from-yellow-300 via-orange-400 to-red-500 rounded-full flex items-center justify-center text-2xl relative overflow-hidden">
                  ☀️
                  {/* Solar flares animation */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/20 to-transparent"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              </motion.div>

              {/* Multiple orbit tracks for realism - responsive */}
              <div className="absolute top-1/2 left-1/2 w-[180px] h-[180px] sm:w-[240px] sm:h-[240px] lg:w-[300px] lg:h-[300px] -mt-[90px] -ml-[90px] sm:-mt-[120px] sm:-ml-[120px] lg:-mt-[150px] lg:-ml-[150px] border border-white/10 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] lg:w-[400px] lg:h-[400px] -mt-[120px] -ml-[120px] sm:-mt-[160px] sm:-ml-[160px] lg:-mt-[200px] lg:-ml-[200px] border border-white/30 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 w-[264px] h-[264px] sm:w-[352px] sm:h-[352px] lg:w-[440px] lg:h-[440px] -mt-[132px] -ml-[132px] sm:-mt-[176px] sm:-ml-[176px] lg:-mt-[220px] lg:-ml-[220px] border border-white/10 rounded-full"></div>
              
              {/* Month markers with responsive positioning */}
              {Array.from({ length: 12 }, (_, i) => {
                const angle = (i * 30 - 90) * (Math.PI / 180); // Start from top
                const x = Math.cos(angle) * monthRadius;
                const y = Math.sin(angle) * monthRadius;
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                
                return (
                  <div
                    key={i}
                    className="absolute text-white/70 text-xs sm:text-sm font-medium bg-black/20 px-2 py-1 rounded-full backdrop-blur-sm"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    }}
                  >
                    {months[i]}
                  </div>
                );
              })}

              {/* Orbital trail */}
              {trailPoints.map((point, index) => (
                <motion.div
                  key={`trail-${index}`}
                  className="absolute w-2 h-2 bg-blue-400 rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `translate(calc(-50% + ${point.x}px), calc(-50% + ${point.y}px))`,
                    opacity: point.opacity,
                  }}
                  initial={{ scale: 1 }}
                  animate={{ scale: 0 }}
                  transition={{ duration: 1 }}
                />
              ))}

              {/* Earth with enhanced realism - responsive size */}
              <motion.div
                className="absolute top-1/2 left-1/2 w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 -mt-3 -ml-3 sm:-mt-4 sm:-ml-4 lg:-mt-5 lg:-ml-5 cursor-grab active:cursor-grabbing z-20 touch-manipulation"
                style={{
                  x: earthX,
                  y: earthY,
                }}
                drag
                dragConstraints={{
                  left: -orbitalRadius,
                  right: orbitalRadius,
                  top: -orbitalRadius,
                  bottom: orbitalRadius,
                }}
                dragElastic={0}
                dragMomentum={false}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={() => {
                  setIsDragging(false);
                  handleEarthDragEnd();
                }}
                onDrag={handleEarthDrag}
                whileHover={{ scale: 1.2 }}
                whileDrag={{ scale: 1.3 }}
                animate={{
                  rotate: isDragging ? 0 : [0, 360],
                }}
                transition={{
                  rotate: {
                    duration: 24, // 24 hours rotation
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
              >
                <div className="w-full h-full bg-gradient-to-br from-blue-400 via-green-500 to-blue-600 rounded-full shadow-lg flex items-center justify-center border-2 border-blue-200/50 text-lg relative overflow-hidden">
                  🌍
                  {/* Atmospheric glow */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-300/20 via-transparent to-blue-300/20 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  />
                </div>
                
                {/* Enhanced Earth glow effect */}
                <div className="absolute inset-0 bg-blue-400/40 rounded-full blur-md scale-150 -z-10"></div>
                <div className="absolute inset-0 bg-blue-300/20 rounded-full blur-lg scale-200 -z-20"></div>
              </motion.div>

              {/* Instructions moved down as requested */}
              <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 text-white/60 text-sm text-center">
                <p className="font-medium">🌍 Drag Earth around the orbit</p>
                <p className="text-xs mt-1">Each position represents a different date</p>
                <p className="text-xs mt-1 text-blue-300">
                  {passport ? `Level ${passport.level} • ${passport.experiencePoints} XP` : 'Create a passport to track progress!'}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Selected Date and Events */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Current Selection */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-4">Selected Date</h3>
              <p className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent mb-2">
                {formatEventDate(selectedDate.getMonth() + 1, selectedDate.getDate())}
              </p>
              <p className="text-white/60 text-lg">
                {selectedDate.getFullYear()}
              </p>
            </div>

            {/* Quick Date Selection */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6">Quick Dates</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quickDates.map((quickDate, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedDate(quickDate.date)}
                    className="bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/20 text-white px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 text-center"
                  >
                    {quickDate.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Events for Selected Date */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6">
                Space Events on This Date
              </h3>

              {loading ? (
                <div className="flex justify-center py-8">
                  <motion.div
                    className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              ) : spaceEvents.length > 0 ? (
                <div className="space-y-5 max-h-96 overflow-y-auto">
                  {spaceEvents.slice(0, 4).map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="bg-white/5 rounded-lg p-5 border border-white/5 hover:border-white/10 transition-colors duration-200"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-yellow-300 font-semibold text-sm bg-yellow-300/20 px-3 py-1.5 rounded-full">
                          {event.year}
                        </span>
                      </div>
                      <h4 className="text-white font-semibold text-base mb-3 line-clamp-2 leading-relaxed">
                        {event.title}
                      </h4>
                      <p className="text-white/70 text-sm line-clamp-2 leading-relaxed mb-3">
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
                          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-white/60">
                    No space events found for this date.
                  </p>
                  <p className="text-white/40 text-sm mt-2">
                    Try selecting a different date!
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
