import express from "express"
import dotenv from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";

import { OTP } from "./routes/sendotp";
import { booking } from "./routes/check";
import { payment } from "./routes/payment";
import { show } from "./routes/show";
import { adminbooking } from "./Admin/allbooking";
import { contact } from "./routes/contact";
import { login } from "./routes/login";
import { healthRoute } from "./routes/corn";
import { bug } from "./routes/bug";
import { graph } from "./Admin/graph";
import { allusers } from "./Admin/allusers";
// import "./routes/corn";

dotenv.config();


const app = express();
const port = process.env.PORT || 8080;
app.use(express.json())
app.use(cookieParser());

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
app.use("/health", healthRoute);
app.use("/bug",bug);
app.use("/allusers",allusers)
app.use("/graph",graph)




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
