'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePassport } from '@/contexts/PassportContext';

interface RealmItem {
  id: string;
  name: string;
  description: string;
  details: string;
  icon: string;
  image?: string;
  facts: string[];
}

interface Realm {
  id: string;
  name: string;
  description: string;
  icon: string;
  items: RealmItem[];
}

const realms: Realm[] = [
  {
    id: 'distant-galaxies',
    name: 'Distant Galaxies',
    description: 'Explore the vast cosmic neighborhoods beyond our own',
    icon: '🌌',
    items: [
      {
        id: 'andromeda',
        name: 'Andromeda Galaxy',
        description: 'Our nearest major galactic neighbor',
        details: 'The Andromeda Galaxy is approaching the Milky Way and will collide with it in about 4.5 billion years.',
        icon: '🌀',
        facts: [
          'Contains approximately 1 trillion stars',
          'Located 2.5 million light-years away',
          'Spans about 220,000 light-years in diameter',
          'Also known as M31 or NGC 224'
        ]
      },
      {
        id: 'milky-way',
        name: 'Milky Way Galaxy',
        description: 'Our home galaxy with its spiral arms',
        details: 'The Milky Way is a barred spiral galaxy containing our Solar System, with an estimated 100-400 billion stars.',
        icon: '🌌',
        facts: [
          'Contains 200-400 billion stars',
          'Spans about 100,000 light-years across',
          'Has a supermassive black hole at its center',
          'Takes 225 million years for one galactic rotation'
        ]
      },
      {
        id: 'whirlpool',
        name: 'Whirlpool Galaxy',
        description: 'A stunning face-on spiral galaxy',
        details: 'The Whirlpool Galaxy showcases perfect spiral structure and is interacting with a smaller companion galaxy.',
        icon: '🌪️',
        facts: [
          'Also known as M51',
          'Located 23 million light-years away',
          'Classic example of a grand design spiral galaxy',
          'Being distorted by gravitational interaction'
        ]
      }
    ]
  },
  {
    id: 'star-systems',
    name: 'Star Systems',
    description: 'Discover the stellar formations that light up the cosmos',
    icon: '⭐',
    items: [
      {
        id: 'alpha-centauri',
        name: 'Alpha Centauri System',
        description: 'The closest star system to Earth',
        details: 'A triple star system consisting of Alpha Centauri A, B, and Proxima Centauri, with potentially habitable exoplanets.',
        icon: '🌟',
        facts: [
          'Only 4.37 light-years from Earth',
          'Contains three stars in total',
          'Proxima Centauri hosts potentially habitable planets',
          'Visible as the third brightest star in night sky'
        ]
      },
      {
        id: 'sirius',
        name: 'Sirius Binary System',
        description: 'The brightest star in our night sky',
        details: 'Sirius is a binary star system consisting of a main-sequence star and a white dwarf companion.',
        icon: '💎',
        facts: [
          'Brightest star in the night sky',
          '8.6 light-years from Earth',
          'Also known as the Dog Star',
          'Has a white dwarf companion called Sirius B'
        ]
      },
      {
        id: 'vega',
        name: 'Vega',
        description: 'The former and future pole star',
        details: 'Vega was the pole star around 12,000 BCE and will be again around 13,727 CE due to axial precession.',
        icon: '🎯',
        facts: [
          'Fifth brightest star in night sky',
          '25 light-years from Earth',
          'Was the northern pole star 12,000 years ago',
          'First star photographed and first to have spectrum recorded'
        ]
      }
    ]
  },
  {
    id: 'solar-system',
    name: 'Solar System Planets',
    description: 'Journey through our cosmic neighborhood',
    icon: '🪐',
    items: [
      {
        id: 'mercury',
        name: 'Mercury',
        description: 'The swiftest planet, closest to the Sun',
        details: 'Mercury has extreme temperature variations and no atmosphere to retain heat, making it both scorching and freezing.',
        icon: '☿️',
        facts: [
          'Closest planet to the Sun',
          'Completes orbit in just 88 Earth days',
          'No atmosphere or moons',
          'Temperature ranges from -173°C to 427°C'
        ]
      },
      {
        id: 'venus',
        name: 'Venus',
        description: 'The hottest planet with a toxic atmosphere',
        details: 'Venus has a runaway greenhouse effect with surface temperatures hot enough to melt lead.',
        icon: '♀️',
        facts: [
          'Hottest planet in the solar system',
          'Surface temperature of 462°C',
          'Rotates backwards compared to most planets',
          'Day longer than its year'
        ]
      },
      {
        id: 'earth',
        name: 'Earth',
        description: 'Our blue marble, the only known habitable planet',
        details: 'Earth is the only known planet with life, featuring liquid water, a protective atmosphere, and perfect conditions.',
        icon: '🌍',
        facts: [
          'Only known planet with life',
          '71% of surface covered by water',
          'Has one natural satellite - the Moon',
          'Perfect distance from Sun for liquid water'
        ]
      },
      {
        id: 'mars',
        name: 'Mars',
        description: 'The red planet, target for future exploration',
        details: 'Mars shows evidence of ancient water flow and is the most Earth-like planet in our solar system.',
        icon: '♂️',
        facts: [
          'Known as the Red Planet',
          'Has the largest volcano in the solar system',
          'Day length similar to Earth (24h 37m)',
          'Evidence of ancient river valleys and lakes'
        ]
      },
      {
        id: 'jupiter',
        name: 'Jupiter',
        description: 'The gas giant that protects inner planets',
        details: 'Jupiter acts as a cosmic vacuum cleaner, protecting inner planets from asteroids and comets.',
        icon: '🪐',
        facts: [
          'Largest planet in the solar system',
          'Has over 80 known moons',
          'Great Red Spot is a storm larger than Earth',
          'Acts as a shield for inner planets'
        ]
      },
      {
        id: 'saturn',
        name: 'Saturn',
        description: 'The ringed beauty of our solar system',
        details: 'Saturn is famous for its spectacular ring system made of ice and rock particles.',
        icon: '🪐',
        facts: [
          'Most spectacular ring system',
          'Less dense than water',
          'Has 83 confirmed moons',
          'Largest moon Titan has thick atmosphere'
        ]
      }
    ]
  },
  {
    id: 'space-missions',
    name: 'Historic Space Missions',
    description: 'Journey through humanity\'s greatest space achievements',
    icon: '🚀',
    items: [
      {
        id: 'apollo-11',
        name: 'Apollo 11',
        description: 'First human moon landing mission',
        details: 'Apollo 11 achieved humanity\'s first crewed lunar landing on July 20, 1969, with Neil Armstrong and Buzz Aldrin walking on the Moon.',
        icon: '🌙',
        facts: [
          'First humans to land on the Moon',
          'Neil Armstrong first to step on lunar surface',
          'Collected 47.5 pounds of lunar material',
          'Mission duration: 8 days, 3 hours, 18 minutes'
        ]
      },
      {
        id: 'voyager',
        name: 'Voyager Program',
        description: 'Interstellar explorers of the outer solar system',
        details: 'Twin spacecraft launched in 1977, Voyager 1 and 2 have provided unprecedented views of the outer planets and continue their journey into interstellar space.',
        icon: '🛰️',
        facts: [
          'Launched in 1977, still active today',
          'Voyager 1 is furthest human-made object from Earth',
          'Discovered active volcanoes on Jupiter\'s moon Io',
          'Carry golden records with sounds of Earth'
        ]
      },
      {
        id: 'hubble',
        name: 'Hubble Space Telescope',
        description: 'Eye in the sky revolutionizing astronomy',
        details: 'Launched in 1990, Hubble has provided stunning images of deep space and revolutionized our understanding of the universe.',
        icon: '🔭',
        facts: [
          'Orbiting Earth since 1990',
          'Made over 1.5 million observations',
          'Helped determine age of universe (13.8 billion years)',
          'Travels at 17,000 mph around Earth'
        ]
      },
      {
        id: 'iss',
        name: 'International Space Station',
        description: 'Humanity\'s home in space',
        details: 'The ISS is a marvel of international cooperation, serving as a laboratory for scientific research and technology development in microgravity.',
        icon: '🏗️',
        facts: [
          'Largest human-made object in space',
          'Continuously occupied since November 2000',
          'Orbits Earth every 90 minutes',
          'Joint project of 5 space agencies'
        ]
      },
      {
        id: 'mars-rovers',
        name: 'Mars Exploration Rovers',
        description: 'Robotic explorers of the Red Planet',
        details: 'From Sojourner to Perseverance, Mars rovers have been our eyes and hands on the Red Planet, searching for signs of past life.',
        icon: '🤖',
        facts: [
          'Multiple successful rover missions since 1997',
          'Perseverance searching for signs of ancient life',
          'Ingenuity helicopter achieved first powered flight on Mars',
          'Discovered evidence of ancient water activity'
        ]
      }
    ]
  },
  {
    id: 'cosmic-phenomena',
    name: 'Cosmic Phenomena',
    description: 'Witness the universe\'s most spectacular events',
    icon: '💫',
    items: [
      {
        id: 'black-holes',
        name: 'Black Holes',
        description: 'Regions where gravity warps spacetime itself',
        details: 'Black holes are among the most extreme objects in the universe, where gravity is so strong that nothing, not even light, can escape.',
        icon: '⚫',
        facts: [
          'First image captured in 2019 (M87 black hole)',
          'Sagittarius A* is the black hole at our galaxy\'s center',
          'Time dilates near the event horizon',
          'Can have mass millions of times greater than our Sun'
        ]
      },
      {
        id: 'supernovas',
        name: 'Supernovas',
        description: 'Stellar explosions that forge heavy elements',
        details: 'Supernovas are the explosive deaths of massive stars, creating and distributing heavy elements throughout the universe.',
        icon: '💥',
        facts: [
          'Can briefly outshine entire galaxies',
          'Create and distribute heavy elements like gold and uranium',
          'Leave behind neutron stars or black holes',
          'Visible from billions of light-years away'
        ]
      },
      {
        id: 'pulsars',
        name: 'Pulsars',
        description: 'Cosmic lighthouses spinning in space',
        details: 'Pulsars are rapidly rotating neutron stars that emit beams of electromagnetic radiation from their magnetic poles.',
        icon: '🌟',
        facts: [
          'Ultra-dense neutron stars',
          'Can spin hundreds of times per second',
          'More precise than atomic clocks',
          'Formed from supernova explosions'
        ]
      },
      {
        id: 'gravitational-waves',
        name: 'Gravitational Waves',
        description: 'Ripples in the fabric of spacetime',
        details: 'Gravitational waves are distortions in spacetime caused by accelerating massive objects, first detected by LIGO in 2015.',
        icon: '〰️',
        facts: [
          'Predicted by Einstein in 1915',
          'First detected in 2015 by LIGO',
          'Caused by colliding black holes or neutron stars',
          'Travel at the speed of light'
        ]
      }
    ]
  }
];

export default function ExplorePage() {
  const [selectedRealm, setSelectedRealm] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<RealmItem | null>(null);
  const { passport, addAchievement, recordRealmVisit } = usePassport();

  const handleRealmSelect = (realmId: string) => {
    setSelectedRealm(selectedRealm === realmId ? null : realmId);
    setSelectedItem(null);
    
    // Record realm visit for achievements
    if (passport) {
      let realmKey = '';
      if (realmId === 'distant-galaxies') realmKey = 'galaxies';
      else if (realmId === 'star-systems') realmKey = 'stars';
      else if (realmId === 'solar-planets') realmKey = 'planets';
      
      if (realmKey) {
        recordRealmVisit(realmKey);
      }
    }
  };

  const handleItemSelect = (item: RealmItem) => {
    setSelectedItem(item);
    if (passport) {
      addAchievement(`Explored ${item.name}`);
    }
  };

  const selectedRealmData = realms.find(r => r.id === selectedRealm);

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
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Explore the{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Universe
            </span>
          </h1>
          <p className="text-xl text-white/70 mb-8">
            Choose your cosmic realm and discover the wonders that await
          </p>
          
          {passport && (
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 inline-block border border-white/20">
              <p className="text-white/80">
                Welcome back, <span className="font-semibold text-white">{passport.name}</span>! 
                <span className="ml-2 text-yellow-300">Level {passport.level} Explorer</span>
              </p>
            </div>
          )}
        </motion.div>

        <AnimatePresence mode="wait">
          {!selectedRealm ? (
            /* Realm Selection */
            <motion.div
              key="realm-selection"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {realms.map((realm, index) => (
                <motion.div
                  key={realm.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-white/30 transition-all duration-300 cursor-pointer text-center"
                  onClick={() => handleRealmSelect(realm.id)}
                >
                  <div className="text-6xl mb-6">{realm.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">{realm.name}</h3>
                  <p className="text-white/70 mb-6">{realm.description}</p>
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-6 py-3 rounded-full font-semibold inline-block hover:from-blue-600 hover:to-cyan-700 transition-all duration-300">
                    Explore Realm
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : !selectedItem ? (
            /* Item Selection within Realm */
            <motion.div
              key="item-selection"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Back Button */}
              <motion.button
                onClick={() => setSelectedRealm(null)}
                className="mb-8 flex items-center text-white/70 hover:text-white transition-colors duration-200"
                whileHover={{ x: -5 }}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Realms
              </motion.button>

              {/* Realm Header */}
              <div className="text-center mb-12">
                <div className="text-6xl mb-4">{selectedRealmData?.icon}</div>
                <h2 className="text-4xl font-bold text-white mb-4">{selectedRealmData?.name}</h2>
                <p className="text-xl text-white/70">{selectedRealmData?.description}</p>
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedRealmData?.items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
                    onClick={() => handleItemSelect(item)}
                  >
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-3">{item.name}</h3>
                    <p className="text-white/70 text-sm line-clamp-3">{item.description}</p>
                    <div className="mt-4 text-blue-300 text-sm font-medium">
                      Click to explore →
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            /* Detailed Item View */
            <motion.div
              key="item-detail"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              {/* Back Button */}
              <motion.button
                onClick={() => setSelectedItem(null)}
                className="mb-8 flex items-center text-white/70 hover:text-white transition-colors duration-200"
                whileHover={{ x: -5 }}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to {selectedRealmData?.name}
              </motion.button>

              {/* Item Detail Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
              >
                <div className="text-center mb-8">
                  <div className="text-8xl mb-6">{selectedItem.icon}</div>
                  <h2 className="text-4xl font-bold text-white mb-4">{selectedItem.name}</h2>
                  <p className="text-xl text-white/70 mb-6">{selectedItem.description}</p>
                  <p className="text-white/80 leading-relaxed">{selectedItem.details}</p>
                </div>

                {/* Facts Section */}
                <div className="mt-8">
                  <h3 className="text-2xl font-bold text-white mb-6 text-center">Fascinating Facts</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedItem.facts.map((fact, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="bg-white/5 rounded-lg p-4 border border-white/5"
                      >
                        <div className="flex items-start">
                          <span className="text-yellow-300 mr-3 mt-1">✦</span>
                          <p className="text-white/80">{fact}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Achievement Notification */}
                {passport && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-8 text-center bg-green-500/20 border border-green-500/30 rounded-lg p-4"
                  >
                    <p className="text-green-300 font-semibold">
                      🎉 Achievement Unlocked: Explored {selectedItem.name}!
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
