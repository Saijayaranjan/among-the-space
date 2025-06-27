# Among the Space

An interactive space history website that lets you explore cosmic events through time. Discover what happened in space on any date, create your cosmic passport, and journey through the universe.

![Among the Space](https://img.shields.io/badge/Built%20with-Next.js-000000?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## Features

### Global Theme System
- **4 stunning themes** that apply instantly across the entire website
- Deep Space (default), Cosmic Blue, Stellar Blue, and Solar Gold
- Smooth theme transitions with gradient backgrounds

### Interactive Pages
1. **Home Page** - Hero section with space animations and today's space events
2. **Space Passport** - Create your cosmic identity with gamified achievements
3. **Orbital Date Selector** - Interactive solar system to explore any date
4. **Explore Universe** - Three realms: Distant Galaxies, Star Systems, and Solar Planets

### Technical Features
- **Wikipedia API Integration** - Real space events from history
- **Framer Motion Animations** - Smooth, professional animations
- **Responsive Design** - Perfect on all screen sizes
- **TypeScript** - Type-safe development
- **Modern UI/UX** - Clean, minimal, professional appearance

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd among
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## How to Use

### Creating Your Space Passport
1. Click "Create Your Space Passport" on the home page
2. Fill in your details and upload a photo (optional)
3. Receive your unique Cosmic ID
4. Start exploring to earn achievements

### Exploring Space Events
1. **Today's Events**: Automatically loaded on the home page
2. **Any Date**: Use the Orbital Date Selector to drag Earth around the sun
3. **Quick Dates**: Click preset buttons for famous space events

### Universe Exploration
1. Choose from three cosmic realms:
   - **Distant Galaxies**: Andromeda, Milky Way, Whirlpool
   - **Star Systems**: Alpha Centauri, Sirius, Vega
   - **Solar Planets**: Mercury through Saturn
2. Click any item for detailed information and facts
3. Earn achievements as you explore

## API Integration

The app uses the Wikipedia API to fetch real space events:

```javascript
// Example API call
const events = await fetchSpaceEvents(month, day);
// Returns filtered space-related historical events
```

**Features:**
- Automatic filtering for space-related content
- Fallback events when API is unavailable
- Image integration when available
- Direct links to Wikipedia articles

## Theme System

Four carefully crafted themes with CSS gradients:

```css
/* Deep Space (Default) */
background: linear-gradient(to right, #0b0f1f, #000000);

/* Cosmic Blue */
background: linear-gradient(to right, #1e3a8a, #1d4ed8, #2563eb);

/* Stellar Blue */  
background: linear-gradient(to right, #0f172a, #1e3a5f, #2d5a87);

/* Solar Gold */
background: linear-gradient(to right, #ffd700, #ff8c00, #ff6347);
```

## Responsive Design

- **Mobile-first approach** with perfect alignment
- **Hamburger menu** for mobile navigation  
- **Touch-friendly** orbital date selector
- **Adaptive layouts** for all screen sizes

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── page.tsx         # Home page
│   ├── passport/        # Space passport creation
│   ├── date-selector/   # Orbital date selector
│   └── explore/         # Universe exploration
├── components/          # Reusable components
│   ├── Header.tsx       # Navigation with theme switcher
│   └── Footer.tsx       # Clean footer
├── contexts/            # React contexts
│   ├── ThemeContext.tsx # Global theme management
│   └── PassportContext.tsx # User passport data
└── lib/                 # Utilities
    └── wikipedia.ts     # API integration
```

## Animations

Smooth animations powered by Framer Motion:
- **Page transitions** with staggered loading
- **Hover effects** on cards and buttons
- **Orbital mechanics** in date selector
- **Theme transitions** for seamless switching
- **Loading animations** for API calls

## Best Practices

- **TypeScript** for type safety
- **Component-based architecture**
- **Clean, readable code** with comments
- **Error handling** for all API calls
- **Accessibility** considerations
- **Performance optimization**

## Deployment

### Build for production
```bash
npm run build
npm start
```

### Deploy to Vercel
```bash
vercel deploy
```

## Contributing

This is a showcase project demonstrating modern web development practices. Feel free to explore the code and use it as inspiration for your own projects.

## License

This project is open source and available under the MIT License.

## About

"Among the Space" showcases modern React/Next.js development with:
- Advanced TypeScript patterns
- Complex state management
- API integration
- Animation systems
- Responsive design
- Professional UI/UX

Perfect for developers learning modern web technologies or anyone fascinated by space exploration!
