'use client';

import { motion } from 'framer-motion';

export default function ContactPage() {
  return (
    <div className="min-h-screen px-4 py-20">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-6">
            Contact{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-600 bg-clip-text text-transparent">
              Mission Control
            </span>
          </h1>
          <p className="text-xl text-white/70">
            Have questions about your cosmic journey? We&apos;re here to help!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="text-3xl">🚀</div>
                <div>
                  <h3 className="text-white font-semibold">Mission Control</h3>
                  <p className="text-white/70">support@iwonthelp.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-3xl">🌌</div>
                <div>
                  <h3 className="text-white font-semibold">Technical Support</h3>
                  <p className="text-white/70">Available 24/7 across the galaxy</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-3xl">⭐</div>
                <div>
                  <h3 className="text-white font-semibold">Community</h3>
                  <p className="text-white/70">Join fellow space explorers</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Send a Message</h2>
            
            <form className="space-y-4">
              <div>
                <label className="block text-white/80 mb-2">Your Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors duration-200"
                  placeholder="Space Explorer Name"
                />
              </div>
              
              <div>
                <label className="block text-white/80 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors duration-200"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label className="block text-white/80 mb-2">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors duration-200 resize-none"
                  placeholder="Tell us about your cosmic question or feedback..."
                ></textarea>
              </div>
              
              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message to Space 🚀
              </motion.button>
            </form>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="text-white font-semibold mb-2">How do I create a Space Passport?</h4>
                <p className="text-white/70 text-sm">
                  Click &quot;Create Your Space Passport&quot; on the home page and fill in your details. 
                  You&apos;ll receive a unique Cosmic ID instantly!
                </p>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-2">Are the space events real?</h4>
                <p className="text-white/70 text-sm">
                  Yes! We source historical space events from Wikipedia&apos;s database, 
                  filtering for space-related content.
                </p>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-2">How do themes work?</h4>
                <p className="text-white/70 text-sm">
                  Click the theme switcher in the header to choose from 4 cosmic themes. 
                  Changes apply instantly across the entire website.
                </p>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-2">Is my data safe?</h4>
                <p className="text-white/70 text-sm">
                  Your space passport data is stored locally in your browser. 
                  We don&apos;t collect or store personal information on our servers.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
