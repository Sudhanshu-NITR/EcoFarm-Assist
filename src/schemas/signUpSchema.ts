import {z} from 'zod';

export const nameValidation = z
    .string()
    .min(2, "User Name must be of atleast 2 characters")
    .regex(/^[A-Za-z ]+$/, "Name must not contain any special characters or numbers!!");
    
export const passwordValidation = z
    .string()
    .min(6, {message: "Password must be atleast 6 characters!!"})
    .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, "Password must contain atleast one uppercase latin letter, one digit and one special character")

export const signUpSchema = z.object({
    name: nameValidation,
    email: z.string().email({message: 'Invalid email address'}),
    language: z.string(),
    password: z
        .string()
        .min(6, {message: "Password must be atleast 6 characters!!"})
        .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{6,}$/, {
            message: "Password must contain at least one uppercase Latin letter, one digit, and one special character",
        })          
})