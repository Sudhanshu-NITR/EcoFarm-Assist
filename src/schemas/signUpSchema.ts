import {z} from 'zod';

export const nameValidation = z
    .string()
    .min(2, "User Name must be of atleast 2 characters")
    .regex(/^[A-Za-z ]+$/, "Name must not contain any special characters or numbers!!");

export const signUpSchema = z.object({
    name: nameValidation,
    email: z.string().email({message: 'Invalid email address'}),
    password: z
        .string()
        .min(6, {message: "Password must be atleast 6 characters!!"})
        .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, "Password must contain atleast one uppercase latin letter, one digit and one special character")
})