// routes/health.ts
import { Router } from "express";
import { prisma } from "@repo/db"; 

export const healthRoute = Router();

healthRoute.get("/check", async (req, res) => {
  try {
    const result = await prisma.user.findFirst({ select: { id: true } });
    if(result){
        res.status(200).json({ status: "DB awake " });
        
    }else{
        res.status(404).json({ status: "DB sleep " });

    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "DB error" });
  }
});

















// import cron from "node-cron";
// import { prisma } from "@repo/db"; // adjust this path if needed


// cron.schedule('*/15 * * * *', async () => {
//   try {
//     await prisma.$queryRaw`SELECT 1`;
//     console.log(' DB pinged successfully');
//   } catch (err) {
//     console.error('Error pinging DB:', err);
//   }
// });

