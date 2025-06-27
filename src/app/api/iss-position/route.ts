import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    // Use the HTTPS version of the ISS API
    const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544', {
      headers: {
        'User-Agent': 'AmongTheSpace/1.0',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Transform the response to match our expected format
    const transformedData = {
      iss_position: {
        latitude: data.latitude.toString(),
        longitude: data.longitude.toString()
      },
      timestamp: Math.floor(Date.now() / 1000),
      message: "success"
    };
    
    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Error fetching ISS position:', error);
    
    // Return fallback data if the API fails
    return NextResponse.json({
      iss_position: {
        latitude: "0",
        longitude: "0"
      },
      timestamp: Math.floor(Date.now() / 1000),
      message: "error"
    }, { status: 500 });
  }
}
