# Among the Space

A modern interactive web application for exploring space history and astronomical events. Users can discover historical space events by date, create personalized space passports, and navigate through an immersive cosmic timeline.

[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-000000?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## Key Features

### Dynamic Theme System
- Four professionally designed themes with instant application across the platform
- Themes include Deep Space (default), Cosmic Blue, Stellar Blue, and Solar Gold
- Seamless theme transitions with carefully crafted gradient backgrounds

### Core Modules
- **Home Dashboard**: Animated hero section displaying current space events
- **Space Passport System**: Gamified user profiles with achievement tracking
- **Interactive Date Explorer**: Solar system interface for historical event discovery
- **Universe Explorer**: Three-tier exploration system covering galaxies, star systems, and planets

### Technical Capabilities
- Real-time Wikipedia API integration for historical space events
- Advanced animations powered by Framer Motion
- Fully responsive design optimized for all devices
- Type-safe development with TypeScript
- Production-ready architecture with modern UI/UX principles

## Installation and Setup

### System Requirements
- Node.js version 18.0 or higher
- npm package manager
- Modern web browser with ES6+ support

### Quick Start

1. **Repository Setup**
   ```bash
   git clone https://github.com/[username]/among-the-space.git
   cd among-the-space
   ```

2. **Dependency Installation**
   ```bash
   npm install
   ```

3. **Development Server**
   ```bash
   npm run dev
   ```

4. **Access Application**
   Open [http://localhost:3000](http://localhost:3000) in your browser

## User Guide

### Space Passport Creation
1. Navigate to the passport creation module from the main interface
2. Complete the registration form with personal details
3. Optionally upload a profile image for personalization
4. Receive a unique Cosmic ID for progress tracking
5. Begin exploration to unlock achievements and level progression

### Event Discovery Workflow
- **Current Events**: Automatically populated daily space events on the dashboard
- **Historical Search**: Utilize the orbital date selector for specific date exploration
- **Curated Collections**: Access pre-configured significant space milestones

### Exploration Interface
Navigate through three distinct cosmic environments:
- **Distant Galaxies**: Andromeda, Milky Way, and Whirlpool galaxy systems
- **Stellar Formations**: Alpha Centauri, Sirius, and Vega star systems  
- **Solar System**: Planetary exploration from Mercury through Saturn
Each section provides detailed astronomical data and educational content

## API Architecture

### Wikipedia Integration
The application leverages the Wikipedia REST API for historical space event retrieval:

```javascript
const fetchSpaceEvents = async (month, day) => {
  // Retrieves and filters space-related historical events
  return await apiClient.getHistoricalEvents(month, day);
};
```

**Integration Features:**
- Intelligent content filtering for space and astronomy topics
- Graceful fallback handling for API availability issues
- Dynamic image loading when available
- Direct source linking to Wikipedia articles for extended reading

## Design System

### Theme Configuration
The application implements a sophisticated theming system with four distinct visual styles:

```css
/* Deep Space Theme (Default) */
background: linear-gradient(135deg, #0b0f1f 0%, #000000 100%);

/* Cosmic Blue Theme */
background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #2563eb 100%);

/* Stellar Blue Theme */  
background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #2d5a87 100%);

/* Solar Gold Theme */
background: linear-gradient(135deg, #ffd700 0%, #ff8c00 50%, #ff6347 100%);
```

### Responsive Architecture
- Mobile-first development approach ensuring optimal performance across devices
- Adaptive navigation with collapsible menu systems for mobile interfaces
- Touch-optimized orbital date selector with gesture support
- Fluid grid layouts that scale seamlessly across viewport dimensions

## Technical Architecture

### Project Structure
```
src/
├── app/                    # Next.js App Router implementation
│   ├── page.tsx           # Main dashboard component
│   ├── passport/          # User registration and profile management
│   ├── date-selector/     # Interactive date exploration interface
│   ├── explore/           # Universe exploration modules
│   ├── api/               # API route handlers
│   ├── contact/           # User communication interface
│   ├── privacy/           # Privacy policy documentation
│   └── terms/             # Terms of service documentation
├── components/            # Reusable UI components
│   ├── Header.tsx         # Navigation with integrated theme management
│   ├── Footer.tsx         # Application footer
│   └── RealTimeISSTracker.tsx # Live ISS position tracking
├── contexts/              # React Context providers
│   ├── ThemeContext.tsx   # Global theme state management
│   └── PassportContext.tsx # User session and progress tracking
├── lib/                   # Utility functions and API clients
│   ├── wikipedia.ts       # Wikipedia API integration
│   ├── iss.ts            # International Space Station data
│   └── iss-tracker.ts    # ISS position calculations
└── public/               # Static assets and resources
    ├── fonts/            # Custom typography (AURA font)
    ├── favicon.svg       # Application icon
    └── apple-touch-icon.svg # iOS device icon
```

### Animation Framework
Sophisticated motion design implemented through Framer Motion:
- **Page Transitions**: Coordinated enter/exit animations with staggered timing
- **Interactive Elements**: Hover states and click feedback for enhanced user experience
- **Orbital Mechanics**: Physics-based animations for the date selector interface
- **Theme Switching**: Smooth color transitions maintaining visual continuity
- **Loading States**: Engaging animations during data retrieval operations

## Development Standards

### Code Quality Practices
- **Type Safety**: Comprehensive TypeScript implementation with strict configuration
- **Component Architecture**: Modular design promoting reusability and maintainability  
- **Documentation**: Inline code documentation and comprehensive commenting
- **Error Handling**: Robust error management for all external API interactions
- **Accessibility**: WCAG 2.1 compliance with semantic HTML and ARIA attributes
- **Performance**: Optimized bundle sizes and lazy loading for enhanced performance

### Build and Deployment

#### Production Build Process
```bash
# Generate optimized production build
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Code linting
npm run lint
```

#### Deployment Configuration
**Vercel Deployment**
```bash
# Deploy to Vercel platform
vercel --prod
```

**Alternative Hosting**
The application is compatible with any Node.js hosting environment supporting Next.js applications.

## Contributing Guidelines

This project serves as a demonstration of modern web development methodologies. Contributions are welcome following these guidelines:

- Follow the established TypeScript and ESLint configurations
- Maintain consistency with the existing design system
- Include comprehensive testing for new features
- Document any new APIs or significant functionality changes

## License and Usage

This project is released under the MIT License, permitting both personal and commercial use with appropriate attribution.

## Technical Specifications

**Framework Stack:**
- **Frontend**: Next.js 15 with App Router architecture
- **Language**: TypeScript with strict type checking
- **Styling**: Tailwind CSS v4 with custom design tokens
- **Animation**: Framer Motion for advanced motion design
- **State Management**: React Context API with custom hooks
- **Data Sources**: Wikipedia REST API, International Space Station APIs

**Development Focus:**
This application demonstrates advanced React patterns, complex state management, external API integration, sophisticated animation systems, responsive design principles, and production-ready development practices.

Ideal for developers studying modern web technologies or space exploration enthusiasts seeking an interactive learning platform.
