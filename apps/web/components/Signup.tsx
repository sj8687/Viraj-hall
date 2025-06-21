"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";

export function SignupForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name") as string;
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    if (!name || !email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_Backend_URL}/auth/signup`,
        { name, email, password },
        { withCredentials: true }
      );
      toast.success(res.data.message || "Signup successful 🎉");
      router.push("/login");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSignup}>
      <Input placeholder="Name" name="name" />
      <Input placeholder="Email" name="email" />
      <Input placeholder="Password" name="password" type="password" />
      <Button type="submit" disabled={loading}>
        {loading ? "Signing up..." : "SignUp"}
      </Button>
    </form>
  );
}
