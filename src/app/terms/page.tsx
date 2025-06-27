'use client';

import { motion } from 'framer-motion';

export default function TermsPage() {
  return (
    <div className="min-h-screen px-4 py-20">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
        >
          <h1 className="text-5xl font-aura font-bold text-white mb-8 text-center">Terms of Service</h1>
          
          <div className="text-white/80 mb-6">
            <p className="text-lg">Last updated: December 27, 2024</p>
          </div>
          
          <div className="space-y-8 text-white/80">
            <section>
              <h2 className="text-3xl font-aura font-semibold text-white mb-4">Introduction</h2>
              <p className="leading-relaxed mb-4">
                Welcome to Among the Space. These Terms of Service ("Terms") govern your use of our website 
                and services. By accessing or using our service, you agree to be bound by these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-aura font-semibold text-white mb-4">Acceptance of Terms</h2>
              <p className="leading-relaxed mb-4">
                By accessing and using Among the Space, you accept and agree to be bound by the terms and 
                provision of this agreement. If you do not agree to these terms, you should not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-aura font-semibold text-white mb-4">Description of Service</h2>
              <div className="space-y-4">
                <p>Among the Space provides:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Interactive space history exploration and timeline</li>
                  <li>Real-time International Space Station tracking</li>
                  <li>Space passport creation and management</li>
                  <li>Educational content about space exploration</li>
                  <li>Date-based space event discovery</li>
                  <li>Orbital visualization and astronomical data</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-aura font-semibold text-white mb-4">User Responsibilities</h2>
              <div className="space-y-4">
                <p>When using our service, you agree to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide accurate information when creating your space passport</li>
                  <li>Use the service for educational and personal purposes only</li>
                  <li>Not attempt to interfere with the proper functioning of the service</li>
                  <li>Not use automated systems to access the service excessively</li>
                  <li>Respect intellectual property rights</li>
                  <li>Not transmit harmful or malicious content</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-aura font-semibold text-white mb-4">Intellectual Property</h2>
              <div className="space-y-4">
                <p>
                  The service and its original content, features, and functionality are owned by Among the Space 
                  and are protected by international copyright, trademark, patent, trade secret, and other 
                  intellectual property laws.
                </p>
                <p>
                  Space data and historical information are sourced from public APIs including Wikipedia and 
                  NASA. Real-time ISS tracking data is provided by public space agencies.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-aura font-semibold text-white mb-4">Contact Information</h2>
              <p className="leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at{' '}
                <a href="mailto:support@iwonthelp.com" className="text-blue-300 hover:text-blue-200 underline">
                  support@iwonthelp.com
                </a>
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
