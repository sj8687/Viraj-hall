"use client"

import { FaUtensils, FaPalette } from "react-icons/fa";

import Image from "next/image";
import { gsap } from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger"
import { useEffect } from "react";
import { InfiniteFloatingImages } from "./Infinite";

gsap.registerPlugin(ScrollTrigger)

export function Services() {

    useEffect(()=>{
        const mm = gsap.matchMedia();

        mm.add("(min-width:768px)", () => {
            gsap.from(".headd",{
                y:100,
                duration:0.4,
                scrollTrigger:{
                    trigger:".headd",
                    scroller:"body",
                    start:"top 65%",
                    // markers:true
                }
            })

            gsap.to(".heading",{
                scale:1.6,
                duration:0.5,
                scrollTrigger:{
                    trigger:".heading",
                    scroller:"body",
                    start:"top 70%",
                    // markers:true,
                }
            })

            gsap.to(".headingg",{
                
                scale:1.3,
                duration:0.5,
                scrollTrigger:{
                    trigger:".headingg",
                    scroller:"body",
                    start:"top 70%",
                    // markers:true,
                }
            })

            // gsap.from(".gridd",{
            //     x:-600,
            //     stagger:0.2,
            //     duration:0.6,
            //     scrollTrigger:{
            //         trigger:".gridd",
            //         scroller:"body",
            //         start:"top 70%",
            //         // markers:true
            //     }
            // })

            // gsap.from(".griddd",{
            //     x:1200,
            //     stagger:0.2,
            //     duration:0.6,
            //     scrollTrigger:{
            //         trigger:".gridd",
            //         scroller:"body",
            //         start:"top 70%",
            //         // markers:true
            //     }
            // })
        })


        mm.add("(max-width:768px)",()=>{
            gsap.from(".headd",{
                y:80,
                duration:0.3,
                scrollTrigger:{
                    trigger:".headd",
                    scroller:"body",
                    start:"top 65%",
                    // markers:true
                }
            })

            gsap.from(".heading",{
                scale:0.9,
                duration:1,
                scrollTrigger:{
                    trigger:".heading",
                    scroller:"body",
                    start:"top 65%",
                    // markers:true
                }
            })

            gsap.to(".headingg",{
                scale:1,
                duration:0.5,
                scrollTrigger:{
                    trigger:".headingg",
                    scroller:"body",
                    start:"top 70%",
                    // markers:true,
                }
            })

            // gsap.from(".gri",{
            //     x:-200,
            //     stagger:0.2,
            //     duration:0.6,
            //     scrollTrigger:{
            //         trigger:".gridd",
            //         scroller:"body",
            //         start:"top 70%",
            //         // markers:true
            //     }
            // })

            // gsap.from(".grii",{
            //     x:200,
            //     stagger:0.2,
            //     duration:0.6,
            //     scrollTrigger:{
            //         trigger:".gridd",
            //         scroller:"body",
            //         start:"top 70%",
            //         // markers:true
            //     }
            // })
        })
    },[])

    const imageData = [
  {
    src: "/marr1.jpg", // replace with real path or public image
    title: "beatiful marrage",
    description: "elegent venue,",
  },
  {
    src: "/bir.jpg",
    title: "birthday celebration",
    description: "great food",
  },
  {
    src: "/anni.jpg",
    title: "anniversary ",
    description: "great decor",
  },
  {
    src: "/marr.jpg",
    title: "photoshhot ",
    description: "loving , ",
  },
];
   


    return (
        <section className="h-full w-auto mt-[0px] md:mt-[30px] ">
            <div className="grid grid-cols-1 md:grid-cols-[45%_53%]  max-w-[1152px]   mx-auto headd ">
                <div>
                    <h1 className="sm:text-4xl text-3xl text-center px-4 font-bold">Our Exclusive Wedding & Marr<span className="text-orange-300">age</span> <span className="text-orange-400">Services</span></h1>
                </div>
                <div className="sm:ml-[50px] px-7 sm:px-4 md:mt-0 sm:mt-3 mt-[40px] text-center md:text-start">
                    <p className="text-[17px] p-1 font-medium">At Viraj, we offer a range of services to make your wedding day unforgettable. From meticulous planning to exquisite decor, our team is dedicated to bringing your vision to life. Explore our offerings to see how we can create a magical experience for you.</p>
                    <div className="grid md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-7 mt-[45px] ">
                        <div className=" p-[1px] sm:p-0 ">
                            <div className="flex sm:justify-start justify-center gap-3 text-center items-center">
                        <FaUtensils className="text-orange-400 text-2xl"/>
                            <h1 className="text-[26px] text-3xl font-bold">Catering plan</h1>
                            </div>
                            <p className="mt-4 text-wrap text-[15px] font-medium">Our expert planners ensure every detail is perfect, offering guidance and vendor access.</p>
                        </div>
                        <div className="p-1 sm:p-0">
                        <div className="flex gap-3 sm:justify-start justify-center items-center">
                        <FaPalette className="text-orange-400 text-2xl"/>
                            <h1 className="text-[26px] text-3xl  font-bold">Decor Options</h1>
                            </div>
                            <p className="mt-4 text-wrap text-[15px] font-medium">Choose from elegant themes and floral arrangements to personalize your wedding space.</p>
                        </div>
                    </div>
                </div>
            </div>



           
           <section className="w-full  mx-auto px-2 sm:px-0 py-16">
      {/* Heading + Description */}
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
        Wedding ,Marrage <span className="text-orange-500">& </span> Other Moments
        </h2>
        <p className="text-base text-center sm:text-lg text-gray-700 max-w-2xl mx-auto">
          Explore our stunning gallery of unforgettable weddings and birthdays at Viraj Multipurpose Hall.
        </p>
      </div>

      {/* Scrolling Image Cards */}
      <InfiniteFloatingImages
        images={imageData}
        speed="normal"
        direction="left"
        pauseOnHover
      />
    </section>
        </section>
    )
}