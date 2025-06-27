'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTheme, Theme, themeNames } from '@/contexts/ThemeContext';
import { usePassport } from '@/contexts/PassportContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const { theme, setTheme } = useTheme();
  const { passport, hasPassport } = usePassport();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Passport', href: '/passport' },
    { name: 'Date Selector', href: '/date-selector' },
    { name: 'Explore', href: '/explore' },
  ];

  const themeOptions: Theme[] = ['deep-space', 'cosmic-blue', 'stellar-green', 'solar-gold'];

  return (
    <header className="relative z-50 w-full">
      <div className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {/* Space favicon icon */}
              <div className="w-8 h-8">
                <svg viewBox="0 0 32 32" className="w-full h-full">
                  <defs>
                    <radialGradient id="planetGradient" cx="30%" cy="30%" r="70%">
                      <stop offset="0%" style={{stopColor:"#3b82f6", stopOpacity:1}} />
                      <stop offset="100%" style={{stopColor:"#1e40af", stopOpacity:1}} />
                    </radialGradient>
                  </defs>
                  
                  {/* Stars */}
                  <circle cx="6" cy="8" r="0.5" fill="#ffffff" opacity="0.8"/>
                  <circle cx="24" cy="6" r="0.7" fill="#ffffff" opacity="0.6"/>
                  <circle cx="27" cy="20" r="0.5" fill="#ffffff" opacity="0.9"/>
                  <circle cx="5" cy="22" r="0.5" fill="#ffffff" opacity="0.7"/>
                  <circle cx="20" cy="26" r="0.7" fill="#ffffff" opacity="0.5"/>
                  
                  {/* Planet Earth */}
                  <circle cx="16" cy="16" r="7" fill="url(#planetGradient)"/>
                  
                  {/* Continents */}
                  <path d="M 13 11 Q 18 10 20 14 Q 18.5 17 16 16.5 Q 13 14.5 13 11" fill="#22c55e" opacity="0.8"/>
                  <path d="M 11 19 Q 14 18 16 21 Q 14 23 12 22 Q 11 21 11 19" fill="#22c55e" opacity="0.8"/>
                  
                  {/* ISS Satellite */}
                  <g transform="translate(25,11) rotate(45)">
                    <rect x="-1.2" y="-0.4" width="2.4" height="0.8" fill="#fbbf24" rx="0.4"/>
                    <rect x="-2" y="-0.2" width="0.8" height="0.4" fill="#3b82f6"/>
                    <rect x="1.2" y="-0.2" width="0.8" height="0.4" fill="#3b82f6"/>
                  </g>
                  
                  {/* Orbital path */}
                  <circle cx="16" cy="16" r="10" fill="none" stroke="#06b6d4" strokeWidth="0.3" opacity="0.4" strokeDasharray="1,1"/>
                </svg>
              </div>
              <span className="text-2xl font-aura font-bold text-white">
                Among the Space
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white hover:text-yellow-300 transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
            
            {/* Passport Holder Name */}
            {hasPassport && passport && (
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-yellow-300 text-sm">👨‍🚀</span>
                <span className="text-white text-sm font-medium">
                  {passport.name}
                </span>
                <span className="text-blue-300 text-xs">
                  Lv.{passport.level}
                </span>
              </div>
            )}
          </div>

          {/* Theme Switcher & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Theme Switcher */}
            <div className="relative">
              <motion.button
                onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white hover:bg-white/20 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-sm">🎨</span>
                <span className="hidden sm:inline text-sm">{themeNames[theme]}</span>
              </motion.button>

              <AnimatePresence>
                {isThemeMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-black/80 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10"
                  >
                    {themeOptions.map((themeOption) => (
                      <button
                        key={themeOption}
                        onClick={() => {
                          setTheme(themeOption);
                          setIsThemeMenuOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-left text-white hover:bg-white/10 transition-colors duration-200 ${
                          theme === themeOption ? 'bg-white/20' : ''
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className="w-4 h-4 rounded-full border border-white/30"
                            style={{                              background: themeOption === 'deep-space'
                                ? 'linear-gradient(to right, #0b0f1f, #000000)' 
                                : themeOption === 'cosmic-blue' 
                                ? 'linear-gradient(to right, #1e3a8a, #1d4ed8, #2563eb)' 
                                : themeOption === 'stellar-green' 
                                ? 'linear-gradient(to right, #0f172a, #1e3a5f, #2d5a87)' 
                                : 'linear-gradient(to right, #ffd700, #ff8c00, #ff6347)'
                            }}
                          ></div>
                          <span className="text-sm">{themeNames[themeOption]}</span>
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </motion.button>
          </div>
        </nav>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 bg-black/80 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10"
            >
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-6 py-4 text-white hover:bg-white/10 transition-colors duration-200 border-b border-white/5 last:border-b-0"
                >
                  {item.name}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
