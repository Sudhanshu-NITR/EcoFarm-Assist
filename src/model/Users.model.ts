import mongoose, {Schema, Document} from "mongoose"; 

export interface User extends Document{
    name: string;
    email: string;
    password: string;
    language: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    latestAdvice?: Object;
}

const UserSchema = new Schema({
    name: {
        type: String,   
        required: [true, "User name is required!!"],
        trim: true
    },
    latestAdvice: {
        type: {
            crop: String,
            details: String
        },
        required: false,
        default: {
            crop: "None",
            details: "No Latest Crop Advice present, to generate, click on the link given below"
        }
    },
    email: {
        type: String,   
        required: [true, "User email is required!!"],
        trim: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please use a valid email address"],
        unique: true
    },
    password: {
        type: String,   
        required: [true, "Password is required!!"],
        unique: true
    },
    language: {
        type: String,   
        required: [true, "Language is required!!"],
    },
    verifyCode:{
        type: String,
        required: [true, "Verify Code is required!!"],
    },
    verifyCodeExpiry:{
        type: Date,
        required: [true, "Verify Code Expiry is required!!"],
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, 
{timestamps: true}
);

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema);

export default UserModel;