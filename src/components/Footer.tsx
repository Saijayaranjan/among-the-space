'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="relative z-10 w-full mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center space-y-6">
          {/* Logo */}
          <motion.div
            className="text-xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            ✨ Among the Space
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            className="flex flex-wrap items-center justify-center space-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-white/70 hover:text-white transition-colors duration-200 text-sm"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>

          {/* Copyright */}
          <motion.div
            className="text-center text-white/60 text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p>© {currentYear} Among the Space. All rights reserved.</p>
            <p className="mt-1">Exploring the cosmos, one date at a time.</p>
          </motion.div>

          {/* Decorative Stars */}
          <motion.div
            className="flex space-x-4 text-white/40"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="text-xs">⭐</span>
            <span className="text-xs">🌟</span>
            <span className="text-xs">✨</span>
            <span className="text-xs">🌟</span>
            <span className="text-xs">⭐</span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
