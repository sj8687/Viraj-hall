import express from "express"
import dotenv from "dotenv";
import cors from "cors"

import { OTP } from "./routes/sendotp";
import { booking } from "./routes/check";
import { payment } from "./routes/payment";
import { show } from "./routes/show";
import { adminbooking } from "./Admin/allbooking";
import { contact } from "./routes/contact";
import { login } from "./routes/login";
dotenv.config();


const app = express();
app.use(express.json())
app.use(cors({
    origin:`${process.env.FRONTEND_URL}`,
    credentials: true,
}))

app.use("/auth",OTP)
app.use("/booking",booking)
app.use("/payment",payment)
app.use("/show",show)
app.use("/adminbooking",adminbooking)
app.use("/contact",contact)
app.use("/login",login)


app.listen(8080)