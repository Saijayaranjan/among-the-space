'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  points: number;
}

export interface PassportData {
  name: string;
  dateOfBirth: string;
  cosmicId: string;
  photo?: string;
  createdAt: string;
  level: number;
  experiencePoints: number;
  achievements: string[];
  exploredDates: string[];
  visitedRealms: string[];
}

// Define all available achievements
const ACHIEVEMENTS: Achievement[] = [
  { id: 'space-explorer-initiate', name: 'Space Explorer Initiate', description: 'Created your space passport', icon: '🚀', points: 10 },
  { id: 'time-traveler', name: 'Time Traveler', description: 'Explored 5 different dates', icon: '⏰', points: 20 },
  { id: 'orbital-master', name: 'Orbital Master', description: 'Used the orbital date selector 10 times', icon: '🌍', points: 15 },
  { id: 'cosmic-historian', name: 'Cosmic Historian', description: 'Discovered 20 space events', icon: '📚', points: 30 },
  { id: 'galaxy-explorer', name: 'Galaxy Explorer', description: 'Visited the Distant Galaxies realm', icon: '🌌', points: 25 },
  { id: 'star-gazer', name: 'Star Gazer', description: 'Visited the Star Systems realm', icon: '⭐', points: 25 },
  { id: 'planet-walker', name: 'Planet Walker', description: 'Visited the Solar Planets realm', icon: '🪐', points: 25 },
  { id: 'universe-explorer', name: 'Universe Explorer', description: 'Visited all three realms', icon: '🌠', points: 50 },
  { id: 'space-veteran', name: 'Space Veteran', description: 'Reached level 5', icon: '🎖️', points: 100 },
];

interface PassportContextType {
  passport: PassportData | null;
  createPassport: (data: Omit<PassportData, 'cosmicId' | 'createdAt' | 'level' | 'achievements' | 'experiencePoints' | 'exploredDates' | 'visitedRealms'>) => void;
  updatePassport: (data: Partial<PassportData>) => void;
  addAchievement: (achievementId: string) => void;
  addExperiencePoints: (points: number) => void;
  recordDateExploration: (date: string) => void;
  recordRealmVisit: (realm: string) => void;
  hasPassport: boolean;
  getAchievementById: (id: string) => Achievement | undefined;
  getAllAchievements: () => Achievement[];
  getUnlockedAchievements: () => Achievement[];
}

const PassportContext = createContext<PassportContextType | undefined>(undefined);

function generateCosmicId(): string {
  const prefixes = ['NGC', 'M', 'IC', 'UGC', 'PGC'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const number = Math.floor(Math.random() * 9999) + 1;
  return `${prefix}-${number.toString().padStart(4, '0')}`;
}

interface PassportProviderProps {
  children: ReactNode;
}

export function PassportProvider({ children }: PassportProviderProps) {
  const [passport, setPassport] = useState<PassportData | null>(null);

  // Load passport from localStorage on mount
  useEffect(() => {
    const savedPassport = localStorage.getItem('spacePassport');
    if (savedPassport) {
      try {
        setPassport(JSON.parse(savedPassport));
      } catch (error) {
        console.error('Error loading passport:', error);
      }
    }
  }, []);

  // Save passport to localStorage whenever it changes
  useEffect(() => {
    if (passport) {
      localStorage.setItem('spacePassport', JSON.stringify(passport));
    }
  }, [passport]);

  const createPassport = (data: Omit<PassportData, 'cosmicId' | 'createdAt' | 'level' | 'achievements' | 'experiencePoints' | 'exploredDates' | 'visitedRealms'>) => {
    const newPassport: PassportData = {
      ...data,
      cosmicId: generateCosmicId(),
      createdAt: new Date().toISOString(),
      level: 1,
      experiencePoints: 10,
      achievements: ['space-explorer-initiate'],
      exploredDates: [],
      visitedRealms: [],
    };
    setPassport(newPassport);
  };

  const updatePassport = (data: Partial<PassportData>) => {
    if (passport) {
      const updatedPassport = { ...passport, ...data };
      // Auto-level up based on experience points (every 50 XP = 1 level)
      const newLevel = Math.floor(updatedPassport.experiencePoints / 50) + 1;
      if (newLevel > updatedPassport.level) {
        updatedPassport.level = newLevel;
        console.log(`🎉 Level up! Now level ${newLevel}`);
        // Check for level-based achievements
        if (newLevel >= 3 && !updatedPassport.achievements.includes('space-veteran')) {
          updatedPassport.achievements.push('space-veteran');
          updatedPassport.experiencePoints += 25;
        }
        if (newLevel >= 5 && !updatedPassport.achievements.includes('cosmic-explorer')) {
          updatedPassport.achievements.push('cosmic-explorer');
          updatedPassport.experiencePoints += 50;
        }
      }
      setPassport(updatedPassport);
    }
  };

  const addAchievement = (achievementId: string) => {
    if (passport && !passport.achievements.includes(achievementId)) {
      const achievement = ACHIEVEMENTS.find(a => a.id === achievementId);
      if (achievement) {
        const updatedPassport = {
          ...passport,
          achievements: [...passport.achievements, achievementId],
          experiencePoints: passport.experiencePoints + achievement.points,
        };
        updatePassport(updatedPassport);
      }
    }
  };

  const addExperiencePoints = (points: number) => {
    if (passport) {
      updatePassport({
        experiencePoints: passport.experiencePoints + points,
      });
    }
  };

  const recordDateExploration = (date: string) => {
    if (passport) {
      const exploredDates = [...passport.exploredDates];
      if (!exploredDates.includes(date)) {
        exploredDates.push(date);
        updatePassport({ exploredDates });
        
        // Check for achievements
        if (exploredDates.length >= 5 && !passport.achievements.includes('time-traveler')) {
          addAchievement('time-traveler');
        }
        if (exploredDates.length >= 20 && !passport.achievements.includes('cosmic-historian')) {
          addAchievement('cosmic-historian');
        }
      }
    }
  };

  const recordRealmVisit = (realm: string) => {
    if (passport) {
      const visitedRealms = [...passport.visitedRealms];
      if (!visitedRealms.includes(realm)) {
        visitedRealms.push(realm);
        updatePassport({ visitedRealms });
        
        // Check for achievements
        if (realm === 'galaxies' && !passport.achievements.includes('galaxy-explorer')) {
          addAchievement('galaxy-explorer');
        }
        if (realm === 'stars' && !passport.achievements.includes('star-gazer')) {
          addAchievement('star-gazer');
        }
        if (realm === 'planets' && !passport.achievements.includes('planet-walker')) {
          addAchievement('planet-walker');
        }
        if (visitedRealms.length >= 3 && !passport.achievements.includes('universe-explorer')) {
          addAchievement('universe-explorer');
        }
      }
    }
  };

  const getAchievementById = (id: string): Achievement | undefined => {
    return ACHIEVEMENTS.find(a => a.id === id);
  };

  const getAllAchievements = (): Achievement[] => {
    return ACHIEVEMENTS;
  };

  const getUnlockedAchievements = (): Achievement[] => {
    if (!passport) return [];
    return ACHIEVEMENTS.filter(a => passport.achievements.includes(a.id));
  };

  const hasPassport = passport !== null;

  return (
    <PassportContext.Provider
      value={{
        passport,
        createPassport,
        updatePassport,
        addAchievement,
        addExperiencePoints,
        recordDateExploration,
        recordRealmVisit,
        hasPassport,
        getAchievementById,
        getAllAchievements,
        getUnlockedAchievements,
      }}
    >
      {children}
    </PassportContext.Provider>
  );
}

export function usePassport() {
  const context = useContext(PassportContext);
  if (context === undefined) {
    throw new Error('usePassport must be used within a PassportProvider');
  }
  return context;
}
