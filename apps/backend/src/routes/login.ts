import express, { Router } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "@repo/db";
import { loginSchema } from "@repo/zod";

export const login: Router = Router();

// POST /login/validate
login.post("/validate", async (req, res) => {
  try {
    const { email, password } = req.body;

    const valid = loginSchema.safeParse({ email, password });
    if (!valid.success) {
      res.status(400).json({ message: valid.error.errors[0]?.message });
      return;
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password!);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }

    res.json({
      user: {
        id: user.id.toString(),
        name: user.name,
        email: user.email,
        isAdmin: false,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});






// POST /login/google
login.post("/google", async (req, res) => {
  try {
    const { email, name, image, googleId } = req.body;

    if (!email) {
      res.status(400).json({ message: "Missing email" });
      return;
    }

    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({
        data: { email, name, image, googleId: googleId?.toString() },
      });
    }

    res.json({
      user: {
        id: user.id.toString(),
        name: user.name,
        email: user.email,
        isAdmin: false,
      },
    });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
