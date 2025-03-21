import { resend } from "@/lib/resend";
import VerificationEmail from "@/../emails/VerificationEmails";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email: string,
    name: string,
    verifyCode: string
): Promise<ApiResponse>{
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'EcoFarm Assist | Verification Code',
            react: VerificationEmail({name, otp: verifyCode})
        });
        return {statusCode: 200, success: true, message: 'Verification email sent successfully'}
    } catch (emailError) {
        console.log("Error sending verification email, " + emailError);
        return {statusCode: 500, success: false, message: 'Failed to send verification email'}
    }
}