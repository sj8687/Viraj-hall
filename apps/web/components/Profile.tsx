
"use client"
import { Poppins } from 'next/font/google';

export const mainheading = Poppins({
    subsets: ['latin'],
    weight: ['400'], // ya jitna weight chahiye
});
import { signOut } from "next-auth/react";
import Image from "next/image"
import { useState } from "react"
import { RiLogoutCircleLine } from "react-icons/ri";


export function Profile({ authData }: any) {
    const [profile, setProfile] = useState(false);
    
    return (
        <div className="">
            <div className="sm:w-10 sm:h-10 w-8 h-8  cursor-pointer rounded-full overflow-hidden relative">
                {
                    authData.image ? <Image
                    onClick={() => setProfile((prev) => !prev)}
                    width={40}
                    height={40}
                    src={authData.image}
                    alt="User Profile"
                    className="w-full h-full object-cover"
                /> 
                            : 
                    <div onClick={() => setProfile((prev) => !prev)}
                    className="bg-gradient-to-r from-blue-200 to-red-500 w-full h-full flex justify-center items-center cursor-pointer">
                        <p className="text-xl">{authData.name.charAt(0)}</p>
                    </div>         
                }
            </div>

            <div className="">
                {
                    profile && 
                    <div className=" absolute w-[332px] shadow-[0_0_10px_rgba(1000,100,100,200)] overflow-hidden md:w-[400px] bg-white dark:bg-yellow-300 top-[70px] rounded-lg right-[0px] pb-[60px]">

                        <div className="bg-gradient-to-r from-violet-300 to-orange-600  h-[100px]"></div>

                        <div className="-mt-[43px] w-20 h-20 mx-auto outline-double outline-8 outline-black rounded-full">
                            {
                                authData.image ? 
                                                <Image
                                                    onClick={() => setProfile((prev) => !prev)}
                                                    width={40}
                                                    height={40}
                                                    src={authData.image}
                                                    alt="User Profile"
                                                    className="w-full h-full rounded-full object-cover"
                                                />

                                                :

                                                <div className="w-full h-full text-3xl rounded-full bg-white dark:bg-black flex justify-center items-center">
                                                    {authData.name.charAt(0)}
                                                </div>
                            }
                        </div>

                        <div className={`mt-3 ${authData.name.length < 6 ? "flex max-w-fit gap-2 mx-auto" : ""}`}>
                            <p className={` max-w-fit px-2 font-bold font-serif text-center mx-auto dark:text-black`}>hi</p>
                            {
                               <p className={`${mainheading.className} mx-auto max-w-fit text-center font-medium dark:text-black`}>{authData.name}</p> 
                            }
                        </div>

                        <div className="flex max-w-fit gap-2 mx-auto">
                            <p className="dark:text-black">Email:</p> 
                            <p className={`${mainheading.className} w-fit mx-auto mb-5 dark:text-black`}>{authData.email}</p>
                        </div>

                        <div className="w-[70%] mx-auto p-2 flex justify-center gap-4 cursor-pointer">
                            <div onClick={()=>{signOut({ callbackUrl: "/" })}} className="outline p-2 w-[40%] text-center  rounded-lg bg-black text-white flex justify-center"><RiLogoutCircleLine className="text-2xl  text-red-500"/> <p className=" pl-1">Logout</p></div>
                        </div>

                    </div>
                }
            </div>
        </div>
    )
}