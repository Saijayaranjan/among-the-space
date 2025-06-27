'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchISSPosition, fetchMoonPosition, ISSPosition, MoonPosition, convertToCartesian } from '@/lib/iss';

export default function RealTimeISSTracker() {
  const [issPosition, setIssPosition] = useState<ISSPosition | null>(null);
  const [moonPosition, setMoonPosition] = useState<MoonPosition | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const updatePositions = async () => {
      try {
        const [iss, moon] = await Promise.all([
          fetchISSPosition(),
          fetchMoonPosition()
        ]);
        
        if (iss) setIssPosition(iss);
        if (moon) setMoonPosition(moon);
        setError(null);
      } catch (err) {
        setError('Failed to fetch position data');
        console.error('Error updating positions:', err);
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    updatePositions();

    // Update every 20 seconds for ISS, every 30 seconds for moon
    const issInterval = setInterval(async () => {
      const iss = await fetchISSPosition();
      if (iss) setIssPosition(iss);
    }, 20000);

    const moonInterval = setInterval(async () => {
      const moon = await fetchMoonPosition();
      if (moon) setMoonPosition(moon);
    }, 30000);

    return () => {
      clearInterval(issInterval);
      clearInterval(moonInterval);
    };
  }, []);

  if (loading) {
    return (
      <div className="w-full h-80 bg-gradient-to-br from-blue-900/30 to-black/50 rounded-xl border border-white/20 flex items-center justify-center">
        <motion.div
          className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <span className="ml-4 text-white/70">Loading real-time data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-80 bg-gradient-to-br from-red-900/30 to-black/50 rounded-xl border border-red-500/20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-lg mb-2">🚫 Connection Error</div>
          <div className="text-white/70 text-sm">{error}</div>
        </div>
      </div>
    );
  }

  // Convert positions to 3D coordinates for visualization
  const issCartesian = issPosition ? convertToCartesian(issPosition.latitude, issPosition.longitude, 120) : null;
  const moonCartesian = moonPosition ? convertToCartesian(moonPosition.latitude, moonPosition.longitude, 180) : null;

  return (
    <motion.div
      className="w-full h-80 bg-gradient-to-br from-blue-900/30 to-black/50 rounded-xl border border-white/20 flex items-center justify-center relative overflow-hidden"
      animate={{ 
        background: [
          "linear-gradient(135deg, rgba(30, 58, 138, 0.3), rgba(0, 0, 0, 0.5))",
          "linear-gradient(135deg, rgba(0, 0, 0, 0.5), rgba(30, 58, 138, 0.3))"
        ]
      }}
      transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
    >
      {/* Earth - Just the emoji, no blue sphere background */}
      <motion.div
        className="absolute w-16 h-16 flex items-center justify-center text-4xl z-10"
        animate={{
          rotate: 360
        }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      >
        🌍
      </motion.div>

      {/* ISS Orbital Path */}
      <motion.div
        className="absolute w-60 h-60 border border-cyan-400/30 rounded-full"
        animate={{ 
          rotate: 360,
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ 
          rotate: { duration: 93 * 60, repeat: Infinity, ease: "linear" }, // 93 minutes real ISS orbit
          opacity: { duration: 4, repeat: Infinity }
        }}
      />
      
      {/* ISS - Real position */}
      {issCartesian && (
        <motion.div
          className="absolute text-2xl z-20 drop-shadow-lg"
          style={{
            x: issCartesian.x,
            y: issCartesian.z,
            // Calculate rotation to always point towards Earth (center)
            rotate: `${Math.atan2(-issCartesian.z, -issCartesian.x) * (180 / Math.PI) + 90}deg`
          }}
          animate={{
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            scale: { duration: 2, repeat: Infinity }
          }}
        >
          🛰️
        </motion.div>
      )}

      {/* Moon Orbital Path */}
      <motion.div
        className="absolute w-96 h-96 border border-yellow-200/20 rounded-full"
        animate={{ 
          rotate: 360,
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{ 
          rotate: { duration: 27.3 * 24 * 60 * 60, repeat: Infinity, ease: "linear" }, // 27.3 days real lunar orbit
          opacity: { duration: 8, repeat: Infinity }
        }}
      />

      {/* Moon - Real position */}
      {moonCartesian && moonPosition && (
        <motion.div
          className="absolute z-20 flex flex-col items-center"
          style={{
            x: moonCartesian.x,
            y: moonCartesian.z
          }}
          animate={{
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <motion.div 
            className="text-2xl drop-shadow-lg"
            animate={{
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            {moonPosition.phase < 0.1 || moonPosition.phase > 0.9 ? '🌑' :
             moonPosition.phase < 0.3 ? '🌒' :
             moonPosition.phase < 0.4 ? '🌓' :
             moonPosition.phase < 0.6 ? '🌔' :
             moonPosition.phase < 0.7 ? '🌕' :
             moonPosition.phase < 0.8 ? '🌖' : '🌗'}
          </motion.div>
        </motion.div>
      )}

      {/* Background stars */}
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </motion.div>
  );
}
