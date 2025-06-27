'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { motion } from 'framer-motion';

export type Theme = 'deep-space' | 'cosmic-blue' | 'stellar-green' | 'solar-gold';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  getThemeGradient: (theme: Theme) => string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const themes = {
  'deep-space': 'linear-gradient(to right, #0b0f1f, #000000)',
  'cosmic-blue': 'linear-gradient(to right, #1e3a8a, #1d4ed8, #2563eb)',
  'stellar-green': 'linear-gradient(to right, #0f172a, #1e3a5f, #2d5a87)',
  'solar-gold': 'linear-gradient(to right, #ffd700, #ff8c00, #ff6347)',
};

export const themeNames = {
  'deep-space': 'Deep Space',
  'cosmic-blue': 'Cosmic Blue',
  'stellar-green': 'Stellar Blue',
  'solar-gold': 'Solar Gold',
};

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>('deep-space');
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; size: number; opacity: number; duration: number }>>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set client flag to prevent hydration mismatch
    setIsClient(true);
    
    // Generate random stars only on client side to avoid hydration mismatch
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < 100; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          duration: Math.random() * 20 + 10,
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

  const getThemeGradient = (theme: Theme): string => {
    return themes[theme];
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, getThemeGradient }}>
      <div
        className="min-h-screen transition-all duration-500 relative overflow-hidden"
        style={{ background: getThemeGradient(theme) }}
      >
        {/* Animated Background Stars */}
        <div className="fixed inset-0 pointer-events-none z-0">
          {isClient && stars.map((star) => (
            <motion.div
              key={star.id}
              className="absolute rounded-full bg-white"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [star.opacity, star.opacity * 0.3, star.opacity],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: star.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 5, // Random delay since we're client-side only
              }}
            />
          ))}
          
          {/* Shooting Stars */}
          {isClient && [...Array(3)].map((_, i) => (
            <motion.div
              key={`shooting-${i}`}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 50}%`,
              }}
              animate={{
                x: [0, 200],
                y: [0, 100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 8 + Math.random() * 10,
                ease: "easeOut",
              }}
            />
          ))}
          
          {/* Twinkling Effect */}
          {isClient && [...Array(20)].map((_, i) => (
            <motion.div
              key={`twinkle-${i}`}
              className="absolute w-0.5 h-0.5 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
