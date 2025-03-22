// For deployment on google cloud
import dbConnect from "@/lib/dbConnect";
import { ApiResponse } from "@/types/ApiResponse";
import { NextRequest, NextResponse } from "next/server";
import ee from '@google/earthengine';
import { SecretManagerServiceClient } from "@google-cloud/secret-manager";
import fs from "fs";

const getServiceAccountKey = async () => {
	if (process.env.NODE_ENV === "development") {
		return fs.readFileSync("@src/app/api/soil-data/inner-suprstate-454315-h5-7e7968d5e973.json", "utf-8");
	} else {
		const client = new SecretManagerServiceClient();
		const [version] = await client.accessSecretVersion({
			name: `projects/${process.env.GCP_PROJECT_ID}/secrets/GEE_SERVICE_ACCOUNT/versions/latest`,
		});
		return version.payload?.data?.toString();
	}
};

const initializeEE = async () => {
	if (!ee.data._initialized) {
		const serviceAccountKey = await getServiceAccountKey();
		await ee.data.authenticateViaPrivateKey(serviceAccountKey);
		await ee.initialize();
	}
};

export async function GET(req: NextRequest) {
	await dbConnect();
	
	try {
		const url = new URL(req.url);
        const lat = url.searchParams.get("lat");
        const lng = url.searchParams.get("lng");
    
        if(!lat || !lng) {
            return NextResponse.json(
                { success: false, message: "Latitude and Longitude are required." },
                { status: 400 }
            );
        }
		console.log("Hi");

		console.log(`Running in ${process.env.NODE_ENV} Mode...`);
		await initializeEE();

		const soilData = ee.Image("projects/soilgrids/nutrient-availability")
			.sample(ee.Geometry.Point([parseFloat(lng as string), parseFloat(lat as string)]), 30)
			.first()
			.reduceRegion(ee.Reducer.mean());

		if (!soilData) {
			throw new Error("Error fetching soil data from Earth Engine");
		}

		const result = {
			N: await soilData.get("nitrogen").getInfo(),
			P: await soilData.get("phosphorus").getInfo(),
			K: await soilData.get("potassium").getInfo(),
			pH: await soilData.get("phh2o").getInfo(),
		};

		return NextResponse.json(
			new ApiResponse(200, "Successfully fetched soil data!", result),
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error Fetching Soil Data:", error);
		return NextResponse.json(
			new ApiResponse(500, "Error fetching soil data"),
			{ status: 500 }
		);
	}
}


// For deployment on other

// import dbConnect from "@/lib/dbConnect";
// import { ApiResponse } from "@/types/ApiResponse";
// import { NextRequest, NextResponse } from "next/server";
// import ee from '@google/earthengine';

// export async function POST(req: NextRequest, res: NextResponse){
// 	await dbConnect();

// 	const { lat, lng } = req.query;

// 	try {
// 		await ee.data.authenticateViaPrivateKey(process.env.GOOGLE_APPLICATION_CREDENTIALS);
//         await ee.initialize();

// 		const soilData = ee.Image("projects/soilgrids/nutrient-availability")
//             .sample(ee.Geometry.Point([lng, lat]), 30)
//             .first()
//             .reduceRegion(ee.Reducer.mean());

// 		if(!soilData){
// 			throw new Error("Error fetching soil data from Earth Engine");
// 		}

// 		const result = {
// 			N: await soilData.get("nitrogen").getInfo(),
// 			P: await soilData.get("phosphorus").getInfo(),
// 			K: await soilData.get("potassium").getInfo(),
// 			pH: await soilData.get("phh2o").getInfo(),
// 		};

// 		res.status(200).json(
// 			new ApiResponse(200, "Successfully fetched soil data!!", result)
// 		);

// 	} catch (error) {
// 		console.error("Error Fetching Soil Data, ", error);
// 		return Response.json(new ApiResponse(500, "Error fetching soil data"));
// 	}
// }


