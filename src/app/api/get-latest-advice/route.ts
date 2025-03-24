import dbConnect from "@/lib/dbConnect";
import { ApiResponse } from "@/types/ApiResponse";
import UserModel from "@/model/Users.model";
import { User } from "@/model/Users.model";
import mongoose from "mongoose";

export async function GET(req: Request) {
    await dbConnect();

    try {
        const { searchParams } = new URL(req.url);
        const user_id = searchParams.get("user_id");

        if (!user_id || !mongoose.Types.ObjectId.isValid(user_id)) {
            return Response.json(
                new ApiResponse(400, "Invalid or missing user_id"),
                { status: 400 }
            );
        }

        const userId = new mongoose.Types.ObjectId(user_id);
        
        const user: User | null = await UserModel.findById(userId); 

        if (!user) {
            return Response.json(
                new ApiResponse(404, "User not found"),
                { status: 404 }
            );
        }

        
        return Response.json(
            new ApiResponse(200, "Fetching latest advice successful", { latestAdvice: user.latestAdvice }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching latest advice", error);
        return Response.json(
            new ApiResponse(500, "Error fetching latest advice"),
            { status: 500 }
        );
    }
}
