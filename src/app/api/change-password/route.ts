import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { ApiResponse } from "@/types/ApiResponse";
import bcrypt from "bcryptjs";
import UserModel from "@/model/Users.model";

export async function POST(req: NextRequest){
    await dbConnect();

    try {
        const { currentPassword, newPassword, userId } = await req.json();

        if(!currentPassword || !newPassword || currentPassword.trim()=='' || newPassword.trim()==''){
            return NextResponse.json(
                new ApiResponse(400, "Current Password or new Password not passed!!"),
                { status: 400 }
            );
        }

        const user = await UserModel.findById(userId);
        if(!user){
            return NextResponse.json(
                new ApiResponse(400, "No user found!!"),
                { status: 400 }
            );
        }
        
        const isValidUser = await bcrypt.compare(currentPassword, user.password);

        if(!isValidUser){
            return NextResponse.json(
                new ApiResponse(400, "Invalid Current password!!"),
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        await user.save();

        return NextResponse.json(
            new ApiResponse(200, "Password updated Successfully!!"),
            { status: 200 }
        );
    } catch (error) {
        console.log("Error updating password, ", error);
        return NextResponse.json(
            new ApiResponse(500, "Error updating password!!"),
            { status: 500 }
        );
    }
}