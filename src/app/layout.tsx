import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { PassportProvider } from "@/contexts/PassportContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Among the Space - Interactive Space History",
  description: "Explore space history through an interactive timeline. Discover astronomical events, create your space passport, and journey through the cosmos.",
  keywords: "space, astronomy, history, NASA, space exploration, interactive timeline",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' }
    ],
    apple: '/apple-touch-icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ThemeProvider>
          <PassportProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </PassportProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
