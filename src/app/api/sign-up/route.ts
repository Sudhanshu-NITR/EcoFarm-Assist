import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/Users.model";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function POST(request: Request){
    await dbConnect();

    try {
        const {name, email, password, location, language, crop_preferences, } = await request.json();
        const existingUserVerifiedByUsername = await UserModel.findOne({
            name, 
            isVerified: true
        })

        if(existingUserVerifiedByUsername){
            return Response.json(
                new ApiResponse(400, "Name is already taken!!")
            )
        }

        const existingUserByEmail = await UserModel.findOne({email});
        const verifyCode = Math.floor(100000 + Math.random()*900000).toString();

        if(existingUserByEmail){
            if(existingUserByEmail.isVerified){
                return Response.json(
                    new ApiResponse(400, "user already exists with this email"),
                    {status: 400}
                )
            }
            else{
                const hashedPassword = await bcrypt.hash(password, 10);
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600);

                await existingUserByEmail.save();
            }
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();  
            expiryDate.setHours(expiryDate.getHours() +1);


            const newUser = new UserModel({
                name,
                email,
                password: hashedPassword,
                location,
                language,
                crop_preferences,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
            })

            await newUser.save();
        }

        const emailResponse = await sendVerificationEmail(
            email,
            name, 
            verifyCode
        )
        console.log(emailResponse);
        
        if(!emailResponse.success){
            return Response.json(
                new ApiResponse(500, emailResponse?.message || "Email sending failed"),
                {status: 500}
            )
        }

        return Response.json(
            new ApiResponse(201, "User Registered successfully. Please verify your email"),
            {status: 201}
        )

    } catch (error) {
        console.error("Error registering user, ", error);
        return Response.json(new ApiResponse(500, "Error registering user"));
    }
}
