import 'next-auth'
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    interface User {
        _id?: string;
        isVerified?:boolean;
        location?: {
            address: string;
            lat: number;
            lng: number;
        };
        name?: string;
    }

    interface Session {
        user:{
            _id?: string;
            isVerified?:boolean;
            location?: {
                address: string;
                lat: number;
                lng: number;
            };
            name?: string;
        } & DefaultSession['user']
    }

    interface JWT{
        _id?: string;
        isVerified?:boolean;
        location?: {
            address: string;
            lat: number;
            lng: number;
        };
        name?: string;
    }
}