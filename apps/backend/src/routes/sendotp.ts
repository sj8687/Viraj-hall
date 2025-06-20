import { Router } from "express";
import { generateOTP, transporter } from "../utils/otpConfig";
import { prisma } from "@repo/db";
import * as dotenv from "dotenv";
import { forgotPasswordSchema } from "@repo/zod";
import bcrypt from "bcryptjs";
dotenv.config();

export const OTP = Router();

OTP.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ success: false, message: "Email is required" });
    return;
  }
  const generatedOtp = generateOTP();
  try {
    const hashedOtp = await bcrypt.hash(generatedOtp, 10);
    const userExist = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        email: true,
        googleId: true,
      },
    });

    if (userExist && userExist.googleId == null) {
      const emailSendData = await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: "Your OTP Code for Password Reset",
        text: `Hi,

                You requested to reset your password. Please use the OTP below:

                OTP: ${generatedOtp}

                This OTP is valid for 5 min. If you did not request a password reset, you can ignore this email.

                — Virajmultipurposehall
                `,

        html: `<!DOCTYPE html>
                        <html>
                        <head>
                        <meta charset="UTF-8" />
                        <title>OTP Email</title>
                        </head>
                                <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
                                <table cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                    <td style="padding: 20px;">
                                        <table cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: auto; background-color: #ffffff; border: 1px solid #dddddd; border-radius: 8px;">
                                        <tr>
                                            <td style="padding: 30px;">
                                            <h2 style="color: #333333; text-align: center;">Reset Your Password</h2>
                                            <p style="font-size: 16px; color: #555555;">Hi there,</p>
                                            <p style="font-size: 16px; color: #555555;">
                                                You requested to reset your password. Please use the OTP below to proceed:
                                            </p>

                                            <div style="text-align: center; margin: 30px 0;">
                                                <span style="display: inline-block; background-color: #e0f7fa; color: #00796b; font-size: 24px; padding: 12px 24px; border-radius: 6px; font-weight: bold; letter-spacing: 4px;">
                                                ${generatedOtp}
                                                </span>
                                            </div>

                                            <p style="font-size: 14px; color: #999999;">
                                                This OTP is valid for <strong>1 hour</strong>. If you did not request a password reset, please ignore this message.
                                            </p>

                                            <hr style="border: none; border-top: 1px solid #eeeeee; margin: 30px 0;" />

                                            <p style="text-align: center; font-size: 12px; color: #aaaaaa;">
                                                &copy; ${new Date().getFullYear()} Viraj multipurpose hall. All rights reserved.
                                            </p>
                                            </td>
                                        </tr>
                                        </table>
                                    </td>
                                    </tr>
                                </table>
                                </body>
                                </html>`,
      });

      if (emailSendData.accepted.length !== 0) {
        await prisma.otpStore.upsert({
          where: { email },
          update: {
            otp: hashedOtp,
            createdAt: new Date(),
            expiresAt: new Date(Date.now() + 5 * 60 * 1000),
          },
          create: {
            email,
            otp: hashedOtp,
            createdAt: new Date(),
            expiresAt: new Date(Date.now() + 5 * 60 * 1000),
          },
        });

        res.json({ success: true, message: "OTP sent to email" });
        return;
      }
    } else {
      res.status(404).json({ message: "user not exist or invalid email" });
      return;
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});





OTP.post("/verify-otp", async (req, res) => {
  const { email, otp, password, confirmPassword } = req.body;
  try {
    if (!email || !otp) {
      res.json({ error: "provide email and otp" });
      return;
    }
    const validInput = forgotPasswordSchema.safeParse({
      email,
      otp,
      password,
      confirmPassword,
    });
    if (!validInput.success) {
      res.status(500).json({ success: false, message: "not vaild input" });
      return;
    }
    // access otp and verify is correct
    const userExist = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        email: true,
        googleId: true,
      },
    });
    if (userExist) {
      const dbOTP = await prisma.otpStore.findFirst({
        where: {
          email,
        },
      });
      const now = new Date();
      const expireAt = new Date(dbOTP?.expiresAt!);
      if (expireAt < now) {
        res.status(400).json({ success: false, message: "OTP expired" });
        return;
      }
      if (dbOTP) {
        const parseOTP = await bcrypt.compare(otp,dbOTP.otp);
        if (parseOTP) {
          // delete the otp after successfull verification
          const deleteotp = await prisma.otpStore.delete({
            where: {
              email,
            },
          });
          if (deleteotp) {
            if (password === confirmPassword) {
              const hashPassword = await bcrypt.hash(
                validInput?.data?.confirmPassword!,
                10
              );
              const resetPassword = await prisma.user.update({
                where: {
                  email,
                },
                data: {
                  password: hashPassword,
                },
              });
              if (resetPassword) {
                res.status(200).json({
                  success: true,
                  message: "password reset success",
                });
                return;
              } else {
                res.status(401).json({
                  success: false,
                  message: "password reset failed",
                });
                return;
              }
            } else {
              res.status(500).json({
                success: false,
                message: "both passwords not match",
              });
              return;
            }
          }
        } else {
          res.status(400).json({ success: false, message: "Invalid OTP" });
          return;
        }
      } else {
        res.status(404).json({
          success: false,
          message: "Otp not found or correct try new otp",
        });
        return;
      }
    } else {
      res.status(404).json({ success: false, message: "user not found" });
      return;
    }
  } catch (error) {
    console.log(error);
  }
});