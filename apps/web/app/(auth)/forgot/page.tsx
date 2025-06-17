"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface sendOtpType {
  success: boolean;
  message: string;
}

export default function Page() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSended, setOtpSended] = useState(false);
  const [hide, setHide] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setHide(false), 30000);

    return () => {
      clearTimeout(timer);
    };
  }, [otpSended]);

  async function sendOTP() {
    if (!email) {
      toast.warn("Please enter your email firstt");
      return;
    }

    const otpSendLoading = toast.loading("Sending OTP to your email...");

    try {
        console.log(email);
        
      const res = await axios.post<sendOtpType>(
             `${process.env.NEXT_PUBLIC_Backend_URL}/auth/send-otp`,  
              { email }
      );

      toast.dismiss(otpSendLoading);

      if (res.data.success) {
        setOtpSended(true);
        setHide(true);
        toast.success(res.data.message);
      } else {
        toast.warning(res.data.message);
      }
    } catch (error: any) {
      toast.dismiss(otpSendLoading);
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong while sending OTP"
      );
    }
  }
  const handleSubmit = async (formData: FormData) => {
    const toastId = toast.loading("wait verifiying you");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
  try {
    const res = await axios.post<{status:number,token:string,success:boolean,message:string}>(`${process.env.NEXT_PUBLIC_Backend_URL}/auth/verify-otp`,
      {email,otp,password,confirmPassword})
      
      if (res.status !== 200) {
        toast.error(res.data.message);
        toast.dismiss(toastId);
        return;
      } else {
        if (res.status === 200) {
          toast.success(res.data.message);
          toast.dismiss(toastId);
          router.push("/login")
        } else {
          toast.dismiss(toastId);
          toast.error(res.data.message);
        }
        
      }
  } catch (error) {
    console.log(error)
    toast.dismiss(toastId);
  }
};
  return (
    <div className="flex justify-center items-center h-full w-full mt-24 ">
      <Card className="w-[90%] md:w-[50%] lg:w-[28%]">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Forgot Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" action={handleSubmit}>
            <Input
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              disabled={otpSended ? false : true}
              placeholder="password"
              name="password"
              type="password"
              required
            />
            <Input
              disabled={otpSended ? false : true}
              placeholder="Confirm Password"
              name="confirmPassword"
              type="password"
              required
            />
            <p className="mx-auto">Enter otp </p>
            <InputOTP
              disabled={otpSended ? false : true}
              value={otp}
              onChange={(value: string) => setOtp(value)}
              maxLength={6}
            >
              <InputOTPGroup className="mx-auto dark:bg-lime-200 rounded-lg dark:text-black font-semibold">
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>

            <Button
              disabled={hide ? true : false}
              onClick={sendOTP}
              type="button"
            >
              Send OTP
            </Button>
            <Button type="submit">Reset Password</Button>
            <Link href={"/"} className="text-sm underline w-full text-center">
              Back to Home
            </Link>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}