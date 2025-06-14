"use client";

import {auth} from '@/app/utils/firebase';
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { FormEvent, startTransition, useEffect, useState } from "react";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Props {
  onVerified: (phone: string) => void;
}

export default function PhoneOtp({ onVerified }: Props) {

  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState<string>("");
  const [resendCountdown, setResendCountdown] = useState(0);

  const [recaptchaVerifier, setRecaptchaVerifier] = useState<RecaptchaVerifier | null>(null);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCountdown > 0) {
      timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  useEffect(() => {
    const verifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "invisible",
    });
    setRecaptchaVerifier(verifier);

    return () => {
      verifier.clear();
    };
  }, []);

  useEffect(() => {
    if (otp.length === 6) {
      VerifyOtp();
    }
  }, [otp]);

  const VerifyOtp = async () => {
    startTransition(async () => {
      if (!confirmationResult) {
        toast.error("Please request OTP first");
        return;
      }

      try {
        await confirmationResult.confirm(otp);
        toast.success("OTP verified successfully");
        // Parent component ko phone number bhej rahe hain
        onVerified(phoneNumber);
      } catch (err: any) {
        console.error(err);
        toast.error("OTP verification failed. Please try again.");
      }
    });
  };

  const requestOtp = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    setResendCountdown(60);
    setIsPending(true);

    if (!recaptchaVerifier) {
      setIsPending(false);
      toast.error("Recaptcha not initialized");
      return;
    }

    try {
      if (phoneNumber.length < 10 || !/^\+?[1-9]\d{1,14}$/.test(phoneNumber)) {
        toast.error("Please enter a valid phone number");
        setIsPending(false);
        return;
        
      }
      const result = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
      setConfirmationResult(result);
      toast.success("OTP sent successfully");
    } catch (err: any) {
      console.error(err);
      setResendCountdown(0);
      if (err.code === "auth/invalid-phone-number") {
        toast.error("Invalid phone number");
      } else if (err.code === "auth/too-many-requests") {
        toast.error("Too many requests. Please try later.");
      } else {
        toast.error("Failed to send OTP. Try again.");
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className='flex gap-1'>

      {!confirmationResult && (
        <form onSubmit={requestOtp}>
          <Input
            className="text-black"
            type="tel"
            placeholder="enter with (+91)"
            value={phoneNumber}
            onChange={(e:any) => setPhoneNumber(e.target.value)}
            required
          />
        </form>
      )}

      {confirmationResult && (
      <InputOTP
  className="sm:p-5 p-2 sm:gap-2 gap-1"
  value={otp}
  onChange={(value) => setOtp(value)}
  maxLength={6}
>
  <InputOTPGroup>
    <InputOTPSlot index={0} className="sm:w-10 sm:h-9 w-8 h-8 sm:text-base text-sm" />
    <InputOTPSlot index={1} className="sm:w-10 sm:h-9 w-8 h-8 sm:text-base text-sm" />
    <InputOTPSlot index={2} className="sm:w-10 sm:h-9 w-8 h-8 sm:text-base text-sm" />
    <InputOTPSlot index={3} className="sm:w-10 sm:h-9 w-8 h-8 sm:text-base text-sm" />
    <InputOTPSlot index={4} className="sm:w-10 sm:h-9 w-8 h-8 sm:text-base text-sm" />
    <InputOTPSlot index={5} className="sm:w-10 sm:h-9 w-8 h-8 sm:text-base text-sm" />
  </InputOTPGroup>
</InputOTP>


      )}

      <Button
        disabled={!phoneNumber || isPending || resendCountdown > 0}
        onClick={() => requestOtp()}
        className="mt-0 sm:p-4 sm:text-[15px] p-3 text-[12px]"
      >
        {resendCountdown > 0
          ? `Resend  ${resendCountdown}`
          : isPending
          ? "Sending OTP..."
          : "Send OTP"}
      </Button>

      <div id="recaptcha-container" />

    </div>
  );
}

