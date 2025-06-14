"use server"

import { signIn } from "@/auth";
import { CredentialsSignin } from "next-auth";

export const loginHandler=async(email: string, password: string)=>{
   
   try {
    const result = await signIn("credentials",{
        email,
        password,
        redirect: true,
        redirectTo: "/"
    });
    if (result) {
        return result; 
      }
      
   } catch (error) {
    const err = error as CredentialsSignin;
    return err.cause
   }
}