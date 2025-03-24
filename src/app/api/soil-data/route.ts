import { NextRequest, NextResponse } from 'next/server';
import ee from '@google/earthengine';

// Load credentials from environment variable
const credentials = JSON.parse(process.env.GEE_SERVICE_ACCOUNT_KEY || '{}');

if (!credentials.private_key) {
    console.error('GEE_SERVICE_ACCOUNT_KEY is missing or invalid.');
}

// Initialize Google Earth Engine
let isInitialized = false;
const initializeEarthEngine = async () => {
    if (!isInitialized) {
        await new Promise<void>((resolve, reject) => {
            ee.data.authenticateViaPrivateKey(credentials, () => {
                ee.initialize(null, null, () => {
                    isInitialized = true;
                    resolve();
                }, reject);
            });
        });
    }
};

// Function to get soil data from GEE
const getSoilData = async (lat: number, lon: number) => {
    const dataset = {
        nitrogen: 'projects/soilgrids-isric/nitrogen_mean',
        phosphorus: 'projects/soilgrids-isric/phosphorus_mean',
        potassium: 'projects/soilgrids-isric/potassium_mean',
        ph: 'projects/soilgrids-isric/phh2o_mean',
    };

    const point = ee.Geometry.Point([lon, lat]);
    const soilData: Record<string, any> = {};

    for (const [key, asset] of Object.entries(dataset)) {
        try {
            const image = ee.Image(asset);
            const value = image.sample(point, 250).first().getInfo();
            soilData[key] = value ?? 'No data available';
        } catch (error) {
            soilData[key] = `Error: ${(error as Error).message}`;
        }
    }

    return soilData;
};

// API Route Handler
export async function GET(req: NextRequest) {
    
    try {
        // Initialize Earth Engine if not already initialized
        await initializeEarthEngine();
        
        // Extract latitude and longitude from query parameters
        const { searchParams } = new URL(req.url);
        const lat = parseFloat(searchParams.get('lat') || '');
        const lon = parseFloat(searchParams.get('lng') || '');
        
        if (isNaN(lat) || isNaN(lon)) {
            return NextResponse.json(
                { error: 'Valid latitude and longitude are required' },
                { status: 400 }
            );
        }

        // Fetch soil data
        const soilData = await getSoilData(lat, lon);
        console.log(soilData);
        
        return NextResponse.json({ latitude: lat, longitude: lon, soilData });
    } catch (error) {
        console.error('Error fetching soil data:', error);
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 }
        );
    }
}
