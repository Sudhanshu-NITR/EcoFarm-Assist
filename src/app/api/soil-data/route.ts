import { NextRequest, NextResponse } from 'next/server';
import ee from '@google/earthengine';

const credentials = JSON.parse(process.env.GEE_SERVICE_ACCOUNT_KEY || '{}');

if (!credentials.private_key) {
    console.error('GEE_SERVICE_ACCOUNT_KEY is missing or invalid.');
}

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
            const sampled = image.sample(point, 250).first().toDictionary().getInfo();

            if (key === 'nitrogen') {
                const nitrogenValues = [
                    sampled?.['nitrogen_0-5cm_mean'],
                    sampled?.['nitrogen_5-15cm_mean'],
                    sampled?.['nitrogen_15-30cm_mean']
                ].filter(v => v !== undefined);

                soilData[key] = nitrogenValues.length
                    ? nitrogenValues.reduce((a, b) => a + b, 0) / nitrogenValues.length
                    : 'No data available';
            } else if (key === 'ph') {
                const phValues = [
                    sampled?.['phh2o_0-5cm_mean'],
                    sampled?.['phh2o_5-15cm_mean'],
                    sampled?.['phh2o_15-30cm_mean']
                ].filter(v => v !== undefined);

                soilData[key] = phValues.length
                    ? phValues.reduce((a, b) => a + b, 0) / phValues.length
                    : 'No data available';
            } else {
                soilData[key] = sampled ?? 'No data available';
            }
        } catch (error) {
            soilData[key] = `Error: ${(error as Error).message}`;
        }
    }
    soilData['ph'] = parseFloat((soilData['ph'] / 10).toFixed(2));
    soilData['nitrogen'] = soilData['nitrogen']/10;
    soilData['phosphorus'] = 42;
    soilData['potassium'] = 43;
    console.log(soilData);
    
    return soilData;
};

export async function GET(req: NextRequest) {
    
    try {
        await initializeEarthEngine();
        
        const { searchParams } = new URL(req.url);
        const lat = parseFloat(searchParams.get('lat') || '');
        const lon = parseFloat(searchParams.get('lng') || '');
        
        if (isNaN(lat) || isNaN(lon)) {
            return NextResponse.json(
                { error: 'Valid latitude and longitude are required' },
                { status: 400 }
            );
        }

        const soilData = await getSoilData(lat, lon);
        return NextResponse.json(
            soilData,
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching soil data:', error);
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 }
        );
    }
}
