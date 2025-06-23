import cron from "node-cron";
import { prisma } from "@repo/db"; // adjust this path if needed


cron.schedule('*/1 * * * *', async () => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log(' DB pinged successfully');
  } catch (err) {
    console.error('Error pinging DB:', err);
  }
});

