import dbConnect from "../../../lib/dbConnect";
import UserModel from "../../../model/Users.model";
import {z} from "zod";
import {nameValidation} from "@/schemas/signUpSchema";
import { ApiResponse } from "../../../types/ApiResponse";

const NameQuerySchema = z.object({
    name: nameValidation
})

export async function GET(request: Request){
    await dbConnect();

    try {
        const { searchParams } = new URL(request.url);
        const queryParam = {
            name: searchParams.get('name')
        }
        const result = NameQuerySchema.safeParse(queryParam);
        if(!result.success){
            const nameErrors = result.error.format().name?._errors || []
            return Response.json(
                new ApiResponse(400, nameErrors?.length>0? nameErrors.join(',') : "Invalid query parameters"),
                {status: 400}
            )
        }

        return Response.json(
            new ApiResponse(200, "Name is valid!!"),
            {status: 200}
        )
    } catch (error) {
        console.error("Error checking name", error);
        return Response.json(
            new ApiResponse(500, "Error checking name"),
            { status: 500 }
        )
    }
}