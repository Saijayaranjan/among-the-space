export interface ISSPosition {
  latitude: number;
  longitude: number;
  timestamp: number;
  velocity: number;
  altitude: number;
}

export interface ISSInfo {
  position: ISSPosition;
  nextPasses: Array<{
    risetime: number;
    duration: number;
  }>;
}

// Our internal API endpoint that proxies ISS data
const ISS_API_URL = '/api/iss-position';

export async function getCurrentISSPosition(): Promise<ISSPosition> {
  try {
    const response = await fetch(ISS_API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      latitude: parseFloat(data.iss_position.latitude),
      longitude: parseFloat(data.iss_position.longitude),
      timestamp: data.timestamp,
      velocity: 17500, // ISS travels at approximately 17,500 mph
      altitude: 408 // ISS orbits at approximately 408 km altitude
    };
  } catch (error) {
    console.error('Error fetching ISS position:', error);
    // Return a simulated position that moves around Earth if API fails
    const now = Date.now();
    const angle = (now / 5000) % (2 * Math.PI); // Complete orbit every ~31 seconds for demo
    
    return {
      latitude: Math.sin(angle) * 51.6, // ISS orbital inclination
      longitude: ((now / 100) % 360) - 180, // Moving longitude
      timestamp: Math.floor(now / 1000),
      velocity: 17500,
      altitude: 408
    };
  }
}

export async function getISSPassTimes(lat: number, lon: number): Promise<Array<{risetime: number, duration: number}>> {
  // For now, return mock data as pass times require a different API
  // This could be implemented later with a different service
  console.log('ISS pass times requested for:', lat, lon);
  return [];
}

// Convert lat/lng to cartesian coordinates for orbital visualization
export function latLngToCartesian(lat: number, lng: number, radius: number = 100): { x: number, y: number } {
  // Convert to radians
  const latRad = (lat * Math.PI) / 180;
  const lngRad = (lng * Math.PI) / 180;
  
  // Project to 2D circular orbit (simplified)
  const x = Math.cos(latRad) * Math.cos(lngRad) * radius;
  const y = Math.cos(latRad) * Math.sin(lngRad) * radius;
  
  return { x, y };
}

// Calculate ISS orbital position based on real coordinates
export function calculateOrbitalPosition(latitude: number, longitude: number): { x: number, y: number } {
  // ISS orbital inclination is approximately 51.6 degrees
  const inclination = 51.6 * (Math.PI / 180);
  
  // Convert longitude to angle around Earth (simplified 2D projection)
  const angle = (longitude * Math.PI) / 180;
  
  // Apply inclination effect
  const radius = 96; // Orbital radius in pixels for our visualization
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius * Math.cos(inclination) + (latitude / 90) * 20; // Add latitude offset
  
  return { x, y };
}

// Get current time in various formats for display
export function getCurrentTime() {
  const now = new Date();
  return {
    utc: now.toISOString(),
    local: now.toLocaleString(),
    timestamp: Math.floor(now.getTime() / 1000)
  };
}

// Calculate how many minutes until next ISS pass over a location
export function getNextPassInfo(passes: Array<{risetime: number, duration: number}>): string {
  if (passes.length === 0) return 'No upcoming passes';
  
  const now = Date.now() / 1000;
  const nextPass = passes[0];
  const minutesUntil = Math.floor((nextPass.risetime - now) / 60);
  
  if (minutesUntil < 0) return 'Pass in progress';
  if (minutesUntil < 60) return `Next pass in ${minutesUntil} minutes`;
  
  const hours = Math.floor(minutesUntil / 60);
  const mins = minutesUntil % 60;
  return `Next pass in ${hours}h ${mins}m`;
}
