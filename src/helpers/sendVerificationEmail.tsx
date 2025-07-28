import nodemailer from "nodemailer";
import { ApiResponse } from "@/types/ApiResponse";
import { render } from '@react-email/render';
import VerificationEmail from "@/emails/VerificationEmails";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.BREVO_EMAIL,  // Brevo login email
    pass: process.env.BREVO_SMTP_KEY,  // Brevo SMTP Key
  },
});

export async function sendVerificationEmail(
  email: string,
  name: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    console.log("Sending email to:", email);

    await transporter.sendMail({
      from: 'EcoFarm Assist <sudhanshu.kadam.99@gmail.com>',
      to: email,
      subject: "EcoFarm Assist | Verification Code",
      html: await render(<VerificationEmail name={name} otp={verifyCode} />),
    });

    return { statusCode: 200, success: true, message: "Verification email sent successfully" };
  } catch (error) {
    console.log("Error sending verification email:", error);
    return { statusCode: 500, success: false, message: "Failed to send verification email" };
  }
}
