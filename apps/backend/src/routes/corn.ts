

import cron from "node-cron";
import { prisma } from "@repo/db";


cron.schedule('*/15 * * * *', async () => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log(' DB pinged successfully');
  } catch (err) {
    console.error('Error pinging DB:', err);
  }
});

