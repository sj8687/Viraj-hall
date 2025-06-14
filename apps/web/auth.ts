
import { loginSchema } from "@repo/zod";
import bcrypt from "bcryptjs";
import NextAuth, { AuthError, type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import axios from "axios";

// 🔐 Admin credentials
const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH!;

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      isAdmin?: boolean;
    };
  }
  interface User {
    isAdmin?: boolean;
  }
}

const config: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        const email = credentials?.email as string;
        const password = credentials?.password as string;

        // 🔒 Special case for admin login
        if (email === ADMIN_EMAIL) {
          const isAdmin = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
          if (!isAdmin) {
            throw new Error("Invalid admin password");
          }
          return {
            id: "0",
            name: "Admin",
            email: ADMIN_EMAIL,
            isAdmin: true,
          };
        }

        // 🧪 Validate input
        const validInput = loginSchema.safeParse({ email, password });
        if (!validInput.success) {
          throw new Error(validInput.error.errors[0]?.message ?? "Invalid input");
        }

        // 🟡 Call backend to validate credentials
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_Backend_URL}/login/validate`,
            { email, password },
          );
          console.log("Backend response:", response.data); // <-- Add this
          return response.data.user;
        } catch (err: any) {
          console.error("Backend error:", err.response?.data || err.message); // <-- Add this
          throw new Error(err.response?.data?.message || "Login failed");
        }
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const { email, id, name, image } = user;
        if (!email) throw new AuthError("Google login error: missing email");

        try {
          await axios.post(`${process.env.NEXT_PUBLIC_Backend_URL}/login/google`, {
            email,
            name,
            image,
            googleId: id?.toString(),
          });
        } catch (err) {
          console.log(err);
          
        }
      }
      return true;
    },

    // ✅ Your admin logic in session callback
    async session({ session }) {
      if (session?.user?.email) {
        session.user.isAdmin = session.user.email === ADMIN_EMAIL;
      }
      return session;
    },
  },
};

const nextAuth = NextAuth(config);

export const handlers = nextAuth.handlers;
export const signIn: typeof nextAuth.signIn = nextAuth.signIn;
export const signOut: typeof nextAuth.signOut = nextAuth.signOut;
export const auth: typeof nextAuth.auth = nextAuth.auth;