"use server"

import { prisma } from "@repo/db";
import bcrypt from "bcryptjs"

export async function forgotPassword(email:string,password:string,confirmpassword:string){
    console.log(confirmpassword);
    
    const hashPassword = await bcrypt.hash(confirmpassword,10);
    try {
        const result = await prisma.user.update({
            where:{
                email
            },
            data:{
                password:hashPassword
            }
        })

        if (result) {
            return {
                success:true,
                message:"password"
            }
        }
    } catch (error) {
        return {
            success:false,
            message:"internal server error"
        }
    }
}