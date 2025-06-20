import express, { Router as ExpressRouter } from "express";
import * as dotenv from "dotenv";
dotenv.config()
import { prisma } from "@repo/db"
import { checkAvailabilitySchema, createBookingSchema } from "@repo/zod";
import { userMiddleware } from "../middleware/clientmiddle";
import NodeCache from "node-cache";

export const cache = new NodeCache();


declare global {
  namespace Express {
    interface Request {
      email?: string;
    }
  }
}

export const booking: ExpressRouter = express.Router();


booking.get('/check',userMiddleware, async (req, res) => {
  try {
    const { date, time } = checkAvailabilitySchema.parse(req.query);

    const existing = await prisma.booking.findFirst({
      where: {
        date: new Date(date),
        timeSlot: time,
        hall: "Viraj Multipurpose Hall",
        status: { not: 'CANCELLED' },
      },
    });

    res.json({ available: !existing });
  } catch (err) {
    res.status(400).json({ error: 'Invalid query parameters' });
  }
});



// routes/booking.js


booking.post('/book', userMiddleware, async (req, res) => {
  const email = req.email;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    res.status(401).json({ error: "User not found" });
    return;
  }

  try {
    const {
      date,
      timeSlot,
      customer,
      contact,
      plan,
      guests,
      functionType,
      additionalInfo,
    } = createBookingSchema.parse(req.body);

    const existing = await prisma.booking.findFirst({
      where: {
        date: new Date(date),
        timeSlot: timeSlot,
        hall: "Viraj Multipurpose Hall",
        status: { not: 'CANCELLED' },
      },
    });

    if (existing) {
      res.status(409).json({ error: "Booking already exists for this date and time slot" });
      return;
    }

    const booking = await prisma.booking.create({
      data: {
        customer,
        date: new Date(date),
        timeSlot,
        contact,
        hall: "Viraj Multipurpose Hall",
        plan,
        guests,
        email,
        functionType,
        status: 'PENDING',
        additionalInfo,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
      
    });

    // ✅ Cache invalidate after new booking
    cache.del("adminBookings");

    res.json(booking);
        cache.del("adminBookings");

  } catch (err: any) {
    console.error("Booking Error:", err);
    res.status(400).json({ error: err.message || "Unknown error occurred" });
  }
});
