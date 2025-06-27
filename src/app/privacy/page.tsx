'use client';

import { motion } from 'framer-motion';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen px-4 py-20">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
        >
          <h1 className="text-5xl font-aura font-bold text-white mb-8 text-center">Privacy Policy</h1>
          
          <div className="text-white/80 mb-6">
            <p className="text-lg">Last updated: December 27, 2024</p>
          </div>

          <div className="space-y-8 text-white/80">
            <section>
              <h2 className="text-3xl font-aura font-semibold text-white mb-4">Introduction</h2>
              <p className="leading-relaxed mb-4">
                Welcome to Among the Space (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your privacy and 
                handling your personal information responsibly. This Privacy Policy explains how we collect, use, 
                and safeguard your information when you visit our website and use our services.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-aura font-semibold text-white mb-4">Information We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Personal Information</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Contact information (name, email address) when you use our contact form</li>
                    <li>Space passport information you choose to create and save locally</li>
                    <li>Theme preferences and website settings</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Automatically Collected Information</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Usage data and website analytics</li>
                    <li>Device information and browser type</li>
                    <li>IP address and location data (for ISS tracking features)</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-aura font-semibold text-white mb-4">How We Use Your Information</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide and maintain our space exploration services</li>
                <li>Display real-time ISS tracking information</li>
                <li>Respond to your inquiries and support requests</li>
                <li>Improve our website functionality and user experience</li>
                <li>Send you updates about space events (with your consent)</li>
                <li>Analyze website usage patterns and performance</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-aura font-semibold text-white mb-4">Data Storage and Security</h2>
              <div className="space-y-4">
                <p>
                  We implement appropriate security measures to protect your personal information against 
                  unauthorized access, alteration, disclosure, or destruction. Your space passport data is 
                  stored locally on your device and can be deleted at any time.
                </p>
                <p>
                  We use secure servers and encryption protocols to protect data transmitted between your 
                  device and our services. However, no method of transmission over the internet is 100% secure.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-aura font-semibold text-white mb-4">Third-Party Services</h2>
              <div className="space-y-4">
                <p>Our website integrates with several third-party services:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Wikipedia API:</strong> For retrieving space history events</li>
                  <li><strong>ISS Tracking APIs:</strong> For real-time International Space Station data</li>
                  <li><strong>Analytics Services:</strong> To understand how our website is used</li>
                </ul>
                <p>
                  These services have their own privacy policies and data handling practices. We encourage 
                  you to review their privacy policies.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-aura font-semibold text-white mb-4">Your Rights</h2>
              <div className="space-y-4">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access and review your personal information</li>
                  <li>Request correction of inaccurate data</li>
                  <li>Request deletion of your personal information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Delete your space passport data locally</li>
                  <li>Disable cookies through your browser settings</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-aura font-semibold text-white mb-4">Children&apos;s Privacy</h2>
              <p className="leading-relaxed">
                Our service is not directed to children under 13, and we do not knowingly collect personal 
                information from children under 13. If we become aware that we have collected personal 
                information from a child under 13, we will take steps to delete such information.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-aura font-semibold text-white mb-4">Changes to This Policy</h2>
              <p className="leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by 
                posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-aura font-semibold text-white mb-4">Contact Us</h2>
              <p className="leading-relaxed">
                If you have any questions about this Privacy Policy or our data practices, please contact us at{' '}
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
