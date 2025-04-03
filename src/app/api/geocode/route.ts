import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  try {
    // Get parameters from the URL
    const searchParams = request.nextUrl.searchParams;
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    console.log(lat,lng);
    
    if (!lat || !lng) {
      return NextResponse.json(
        { error: 'Missing latitude or longitude parameters' },
        { status: 400 }
      );
    }

    // Get the API key from environment variables
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY; // Server-side env variable
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    // Make the request to Google's Geocoding API
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json`,
      {
        params: {
          latlng: `${lat},${lng}`,
          key: apiKey,
        },
      }
    );

    // Return the response data
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error in geocode API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch geocoding data' },
      { status: 500 }
    );
  }
}