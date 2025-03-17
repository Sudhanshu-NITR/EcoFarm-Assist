import dbConnect from "@/lib/dbConnect";
import {z} from "zod";
import { passwordValidation } from "@/schemas/signUpSchema";
import { ApiResponse } from "@/types/ApiResponse";

const passwordQuerySchema = z.object({
    password: passwordValidation
})

export async function GET(request: Request){
    await dbConnect();

    try {
        const { searchParams } = new URL(request.url);
        const queryParam = {
            password: searchParams.get('password')
        }
        console.log(queryParam);
        
        const result = passwordQuerySchema.safeParse(queryParam);
        if(!result.success){
            const passwordErrors = result.error.format().password?._errors || []
            return Response.json(
                new ApiResponse(400, passwordErrors?.length>0? passwordErrors.join(',') : "Invalid query parameters"),
                {status: 400}
            )
        }

        return Response.json(
            new ApiResponse(200, "Valid Password"),
            {status: 200}
        )
    } catch (error) {
        console.error("Error checking password", error);
        return Response.json(
            new ApiResponse(500, "Error checking password"),
            { status: 500 }
        )
    }
}