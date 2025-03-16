import dbConnect from "../../../lib/dbConnect";
import UserModel from "../../../model/Users.model";
import { ApiResponse } from "../../../types/ApiResponse";

export async function POST(request: Request){
    dbConnect()

    try {
        const {email, code} = await request.json();

        const decodedEmail = decodeURIComponent(email);
        const user = await UserModel.findOne({email: decodedEmail})

        if(!user){
            return Response.json(
                new ApiResponse(500, "User not found!!"),
                { status: 500 }
            )
        }

        const isCodeValid = user.verifyCode === code;
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

        if(isCodeValid && isCodeNotExpired){
            user.isVerified = true;
            await user.save();

            return Response.json(
                new ApiResponse(200, "Account Verified Successfully!!"),
                { status: 200 }
            )
        }
        else if(!isCodeNotExpired){
            return Response.json(
                new ApiResponse(400, "Verification Code expired, Please Sign-Up again to get a new code"),
                { status: 400 }
            )
        }
        else{
            return Response.json(
                new ApiResponse(400, "Incorrect Verification Code"),
                { status: 400 }
            )
        }

    } catch (error) {
        console.error("Error verifying user!!", error);
        return Response.json(
            new ApiResponse(500, "Error verifying user!!"),
            { status: 500 }
        )
    }
}
