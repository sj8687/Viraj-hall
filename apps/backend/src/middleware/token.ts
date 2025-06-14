import { type Request, type Response, type NextFunction } from "express";
import { decode } from "@auth/core/jwt"; // Same as next-auth/jwt
import { parse } from "cookie";

export const middleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const cookieHeader = req.headers.cookie;
    // console.log(cookieHeader);
    
    if (!cookieHeader) {
      res.status(401).json({ message: "No cookies found" });
      return;
    }

    const cookies = parse(cookieHeader);
    const token = cookies["authjs.session-token"];
    console.log(token);
    

    if (!token) {
      res.status(401).json({ message: "No auth token found" });
      return;
    }

    const decoded = await decode({
      token:token,
      salt: process.env.AUTH_SECRETT!,
      secret: process.env.AUTH_SECRET!
    });

    console.log(decoded);
    

    if (!decoded || decoded.email !== "shreyashjadhav59807@gmail.com") {
      res.status(403).json({ message: "Unauthorized" });
      return;
    }

    // Optional: attach session to request
    (req as any).session = decoded;

    next(); // continue to next middleware or route handler
  } catch (err) {
    console.error("Session decode error:", err);
    res.status(401).json({ message: "Invalid session token" });
  }
};
