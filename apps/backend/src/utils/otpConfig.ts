import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
dotenv.config();

export const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.SMTP_USER,
        pass:process.env.SMTP_PASS,
    }
});

export function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}




