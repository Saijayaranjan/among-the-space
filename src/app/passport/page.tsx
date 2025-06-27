'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { usePassport } from '@/contexts/PassportContext';
import { useRouter } from 'next/navigation';

export default function PassportPage() {
  const { passport, createPassport, hasPassport } = usePassport();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    photo: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setFormData(prev => ({ ...prev, photo: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else {
      const birthDate = new Date(formData.dateOfBirth);
      const today = new Date();
      if (birthDate > today) {
        newErrors.dateOfBirth = 'Date of birth cannot be in the future';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      createPassport({
        name: formData.name.trim(),
        dateOfBirth: formData.dateOfBirth,
        photo: formData.photo,
      });

      // Redirect to explore page after creation
      setTimeout(() => {
        router.push('/explore');
      }, 2000);
    } catch (error) {
      console.error('Error creating passport:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (hasPassport && passport) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="container mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white/30"
            >
              {passport.photo ? (
                <img
                  src={passport.photo}
                  alt={passport.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-cyan-600 flex items-center justify-center text-4xl text-white">
                  {passport.name.charAt(0).toUpperCase()}
                </div>
              )}
            </motion.div>

            <h1 className="text-3xl font-bold text-white mb-2">Space Passport</h1>
            <div className="space-y-4 text-left max-w-md mx-auto">
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-white/60 text-sm">Name</p>
                <p className="text-white text-lg font-semibold">{passport.name}</p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-white/60 text-sm">Cosmic ID</p>
                <p className="text-white text-lg font-mono">{passport.cosmicId}</p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-white/60 text-sm">Date of Birth</p>
                <p className="text-white text-lg">{new Date(passport.dateOfBirth).toLocaleDateString()}</p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-white/60 text-sm">Explorer Level</p>
                <p className="text-white text-lg">Level {passport.level} 🌟</p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-white text-lg font-semibold mb-4">Achievements</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {passport.achievements.map((achievement, index) => (
                  <span
                    key={index}
                    className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-sm border border-yellow-500/30"
                  >
                    {achievement}
                  </span>
                ))}
              </div>
            </div>

            <motion.button
              onClick={() => router.push('/explore')}
              className="mt-8 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Continue Your Space Journey 🚀
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Create Your{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-600 bg-clip-text text-transparent">
              Space Passport
            </span>
          </h1>
          <p className="text-xl text-white/70 leading-relaxed">
            Join the cosmic community and start your journey through the universe.
            Your passport will track your discoveries and achievements.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Photo Upload */}
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white/30 cursor-pointer hover:border-white/50 transition-colors duration-200">
                {formData.photo ? (
                  <img
                    src={formData.photo}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    onClick={() => fileInputRef.current?.click()}
                  />
                ) : (
                  <div
                    className="w-full h-full bg-gradient-to-br from-blue-400 to-cyan-600 flex items-center justify-center text-white hover:opacity-80 transition-opacity duration-200"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="text-center">
                      <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <p className="text-xs">Add Photo</p>
                    </div>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              <p className="text-white/60 text-sm">Click to upload your cosmic portrait (optional)</p>
            </div>

            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-white font-medium mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-white/10 border ${
                  errors.name ? 'border-red-500' : 'border-white/20'
                } rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors duration-200`}
                placeholder="Enter your full name"
                disabled={isSubmitting}
              />
              {errors.name && (
                <p className="text-red-400 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Date of Birth Input */}
            <div>
              <label htmlFor="dateOfBirth" className="block text-white font-medium mb-2">
                Date of Birth *
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-white/10 border ${
                  errors.dateOfBirth ? 'border-red-500' : 'border-white/20'
                } rounded-lg text-white focus:outline-none focus:border-blue-400 transition-colors duration-200`}
                disabled={isSubmitting}
              />
              {errors.dateOfBirth && (
                <p className="text-red-400 text-sm mt-1">{errors.dateOfBirth}</p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300"
              whileHover={!isSubmitting ? { scale: 1.02 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <motion.div
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-3"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Creating Your Cosmic Identity...
                </div>
              ) : (
                'Launch Into the Cosmos 🚀'
              )}
            </motion.button>
          </form>

          <div className="mt-8 text-center text-white/60 text-sm">
            <p>By creating a passport, you agree to explore the cosmos responsibly.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
