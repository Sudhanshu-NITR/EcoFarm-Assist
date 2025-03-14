import mongoose, {Schema, Document} from "mongoose"; 

export interface User extends Document{
    name: string;
    email: string;
    password: string;
    location: {
        address: string;
        lat: number;
        lng: number;
    };
    language: string;
    crop_preferences: string[];
    verifyCode: string;
    verifyCodeExpiry: string;
    isVerified: boolean;
    createdAt: Date;
}

const UserSchema = new Schema({
    name: {
        type: String,   
        required: [true, "User name is required!!"],
        trim: true
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
    location: {
        address: { 
            type: String, 
            required: true 
        },
        coordinates: {
            lat: { 
                type: Number, 
                required: true 
            },
            lng: { 
                type: Number, 
                required: true 
            }
        }
    },
    language: {
        type: String,   
        required: [true, "Language is required!!"],
    },
    crop_preferences: {
        type: String,   
        default: null
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
        Default: false,
    }
});

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema);

export default UserModel;