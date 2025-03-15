import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "../../../../lib/dbConnect";
import UserModel from "../../../../model/Users.model";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Enter your email id" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: any): Promise<any>{
                await dbConnect();

                try {
                    const user = await UserModel.findOne({
                        $or: [
                            {email: credentials.identifier.email},
                            // {phone: credentials.identifier.email}
                        ]
                    })

                    if(!user){
                        throw new Error("No user found with this email!!")
                    }

                    if(!user.isVerified){
                        throw new Error("Please verify your account first!!")
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password); 

                    if(isPasswordCorrect){
                        return user;
                    }
                    else{
                        throw new Error("Incorrect Password!!")
                    }
                } catch (error: any) {
                    throw new Error(error);
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user}) {
            if(user){
                token._id = user._id?.toString();
                token.isVerified = user.isVerified;
                token.location = user.location;
                token.name = user.name;
            }

            return token
        },
        async session({ session, token }) {
            if(token){
                session.user = {
                    ...session.user,
                    _id: token._id as string | undefined,
                    isVerified: token.isVerified as boolean | undefined,
                    location: token.location as { address: string; lat: number; lng: number } | undefined,
                    name: token.name as string | undefined,
                };
            }
            return session
        },
    },
    pages: {
        signIn: '/sign-in'
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
}