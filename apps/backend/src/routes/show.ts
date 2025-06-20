import Router, { Router as RouterType } from "express";
import * as dotenv from "dotenv";
dotenv.config()
import { prisma } from "@repo/db"
import { userMiddleware } from "../middleware/clientmiddle";

export const show: RouterType = Router();

show.get('/show',userMiddleware, async (req, res) => {
  const user = req.email;

  try {
    const bookings = await prisma.booking.findMany({
      where: {
        email:user
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Something went wrong fetching bookings' });
  }
});

