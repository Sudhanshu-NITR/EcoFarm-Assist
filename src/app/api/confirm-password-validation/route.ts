import dbConnect from "@/lib/dbConnect";
import { ApiResponse } from "@/types/ApiResponse";

export async function GET(request: Request){
    await dbConnect();

    try {
        const { searchParams } = new URL(request.url);
        const newPassword = searchParams.get('newPassword');
        const confirmPassword = searchParams.get('confirmPassword');
        
        if(confirmPassword===newPassword){
            return Response.json(
                new ApiResponse(200, "Password Matched"),
                {status: 200}
            )
        }
        else{
            return Response.json(
                new ApiResponse(400, "Enter the same password"),
                {status: 400}
            )
        }

    } catch (error) {
        console.error("Error checking password", error);
        return Response.json(
            new ApiResponse(500, "Error checking password"),
            { status: 500 }
        )
    }
}