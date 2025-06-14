
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {registerSchema} from "@repo/zod"
import { prisma } from "@repo/db"
import bcrypt from "bcryptjs"
import { redirect } from "next/navigation"
import { FcGoogle } from "react-icons/fc"
import { auth, signIn } from "@/auth"
import { toast } from "react-toastify"


export default async function Page() {
    
            let session = await auth();
            if(session?.user) return redirect("/");

    async function signup(formData:FormData){
        
            "use server"

            toast.loading("Creating your account...");
        
            const name = formData.get("name") as string | undefined
            const email = formData.get("email") as string | undefined
            const password = formData.get("password") as string | undefined
            if(!name || !email || !password){
                throw new Error("please provide all values")
            }
            const validInput = registerSchema.safeParse({email,name,password})
            if(!validInput.success){
                throw new Error("invalid input")
            }
            const hashPassword = await bcrypt.hash(validInput.data.password,10);
            const user = await prisma.user.create({
                data:{
                    name:validInput.data?.name,
                    email:validInput.data?.email,
                    password:hashPassword
                }
            });
           
            toast.dismiss();
            toast.success("Account created successfully");
            redirect("/login")
        
    }

    return (
        <div className="flex justify-center items-center w-full h-[80vh]">
            <Card className="w-[90%] md:w-[50%] lg:w-[28%]">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">SignUp</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="flex flex-col gap-4" action={signup} >
                    <Input placeholder="Name" name="name"/>
                    <Input placeholder="Email" name="email"/>
                    <Input placeholder="password" name="password" type="password"/>
                    <Button type="submit">SignUp</Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col">
                    <form className="flex flex-col gap-4"  action={async()=>{
                                            "use server"
                                            await signIn("google");
                                        }} >
                        <p className="text-center">OR</p>
                       <Button type="submit" variant={"outline"}><FcGoogle/>Login With Google</Button>
                    </form>
                    <Link className="text-sm flex gap-2 mt-2 hover:text-green-600" href={"/login"}><p className="text-black">Already have an account?</p>Signin</Link>
                </CardFooter>
            </Card>

        </div>
    )
}