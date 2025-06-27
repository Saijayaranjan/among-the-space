export interface ISSPosition {
  latitude: number;
  longitude: number;
  altitude: number;
  velocity: number;
  timestamp: number;
}

export interface MoonPosition {
  latitude: number;
  longitude: number;
  distance: number; // km from Earth
  phase: number; // 0-1, where 0 is new moon, 0.5 is full moon
  illumination: number; // percentage illuminated
  timestamp: number;
}

export async function fetchISSPosition(): Promise<ISSPosition | null> {
  try {
    const response = await fetch('/api/iss-position');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return {
      latitude: parseFloat(data.iss_position.latitude),
      longitude: parseFloat(data.iss_position.longitude),
      altitude: 408, // Average ISS altitude in km
      velocity: 27600, // Average ISS velocity in km/h
      timestamp: data.timestamp * 1000
    };
  } catch (error) {
    console.error('Error fetching ISS position:', error);
    return null;
  }
}

export async function fetchMoonPosition(): Promise<MoonPosition | null> {
  try {
    // Using a simple astronomical calculation for moon position
    // In a real app, you'd use a more accurate astronomy API
    const now = new Date();
    const daysSinceNewMoon = (now.getTime() / (1000 * 60 * 60 * 24)) % 29.53; // Lunar cycle is ~29.53 days
    
    // Simple moon phase calculation
    const phase = daysSinceNewMoon / 29.53;
    const illumination = Math.abs(Math.cos(phase * 2 * Math.PI)) * 100;
    
    // Simplified moon position calculation (this is very approximate)
    const lunarMonth = 27.3; // days
    const daysSincePerigee = (now.getTime() / (1000 * 60 * 60 * 24)) % lunarMonth;
    const angleFromEarth = (daysSincePerigee / lunarMonth) * 2 * Math.PI;
    
    const latitude = Math.sin(angleFromEarth) * 28.5; // Moon's orbital inclination ~5.14°, but varies
    const longitude = (now.getTime() / (1000 * 60 * 60)) % 360 - 180; // Simplified longitude
    
    return {
      latitude,
      longitude,
      distance: 384400, // Average distance to moon in km
      phase,
      illumination,
      timestamp: now.getTime()
    };
  } catch (error) {
    console.error('Error calculating moon position:', error);
    return null;
  }
}

export function convertToCartesian(lat: number, lon: number, radius: number = 1) {
  const latRad = (lat * Math.PI) / 180;
  const lonRad = (lon * Math.PI) / 180;
  
  const x = radius * Math.cos(latRad) * Math.cos(lonRad);
  const y = radius * Math.cos(latRad) * Math.sin(lonRad);
  const z = radius * Math.sin(latRad);
  
  return { x, y, z };
}
