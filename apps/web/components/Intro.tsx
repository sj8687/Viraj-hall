"use client"

import Image from 'next/image';
import { gsap } from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger"
import { useEffect } from "react";
import InfiniteIconScroll from './scroll';

gsap.registerPlugin(ScrollTrigger)

export default function Intro() {


    useEffect(()=>{
            const mm = gsap.matchMedia();
    
            mm.add("(min-width:768px)", () => {
                gsap.from(".headddd",{
                    x:-700,
                    duration:1,
                    scrollTrigger:{
                        trigger:".headddd",
                        scroller:"body",
                        start:"top 70%",
                        // markers:true
                    }
                })
    
                gsap.from(".img",{
                    x:700,
                    duration:1,
                    scrollTrigger:{
                        trigger:".img",
                        scroller:"body",
                        start:"top 70%",
                        // markers:true
                    }
                })
    
               
            })
    
    
            mm.add("(max-width:768px)",()=>{
                gsap.from(".h1",{
                    y:80,
                    opacity:0,
                    duration:0.3,
                    scrollTrigger:{
                        trigger:".h1",
                        scroller:"body",
                        start:"top 80%",
                        // markers:true
                    }
                })


                gsap.from(".h2",{
                  x:-300,
                  opacity:0,
                  duration:1,
                  scrollTrigger:{
                      trigger:".h2",
                      scroller:"body",
                      start:"top 80%",
                      // markers:true
                  }
              })


              gsap.from(".h3",{
                x:300,
                opacity:0,
                duration:1,
                scrollTrigger:{
                    trigger:".h3",
                    scroller:"body",
                    start:"top 80%",
                    // markers:true
                }
            })
    
            gsap.from(".img",{
              y:80,
              opacity:0,
              duration:0.3,
              scrollTrigger:{
                  trigger:".img",
                  scroller:"body",
                  start:"top 80%",
                  // markers:true
              }
          })
               
            })
        },[])


  return (
    <section className="px-6 overflow-hidden py-16 bg-white md:mt-20">
      <div className="max-w-[1152px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className='headddd'>
          <h2 className="text-5xl h1 md:text-start text-center  font-medium">
            Discover <span className="text-orange-500 font-medium">Viraj </span>
          </h2>
          <p className="mt-7 md:text-start h1  text-center  text-[17px] font-medium text-gray-700">
            At Viraj, we are dedicated to creating unforgettable Marrage & Wedding experiences.
            Established in 2020, our mission is to provide personalized service and exquisite
            decor, ensuring every detail is perfect for your special day.
          </p>

          {/* Stats Section */}
          <div className="grid grid-cols-2  gap-6 mt-10">
            <div className='text-center h2'>
              <h3 className="text-orange-600 text-[22px] md:text-[30px]  font-bold">500 weddings hosted</h3>
              <p className="text-gray-600  font-medium text-[15px] mt-2">
                Since our inception, we have hosted over 500 weddings, each uniquely tailored to the couple’s desires.
              </p>
            </div>
            <div className='text-center h3'>
              <h3 className="text-orange-600 text-[22px]  md:text-[30px]  font-bold">10 years of experience</h3>
              <p className="text-gray-600 font-medium text-[15px] mt-2">
                Our team brings over 10 years of experience, ensuring that your marriage is executed flawlessly.
              </p>
            </div>
            <div className=' text-center h2'>
              <h3 className="text-orange-600 text-[22px]  md:text-[30px]  font-bold">5 core values</h3>
              <p className="text-gray-600 font-medium text-[15px] mt-2">
                We uphold our core values: Commitment to excellence, Personalized service, Attention to detail, and Creating lasting memories.
              </p>
            </div>
            <div className='text-center h3'>
              <h3 className="text-orange-600 text-[22px]  md:text-[30px]  font-bold">10  members</h3>
              <p className="text-gray-600 font-medium text-[15px] mt-2">
                Our dedicated team consists of skilled professionals, decorators, all committed to making your day perfect.
              </p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full img h-full rounded-xl overflow-hidden">
          <Image
            src="/hall.jpg" // Ensure this image is in your public/ directory
            alt="Viraj Hall"
            width={800}
            height={500}
            className="object-cover rounded-xl"
          />
        </div>
        {/* ✅ Bottom infinite scroll absolutely positioned */}
     
      </div>
       <div className="">
        <InfiniteIconScroll />
      </div>
    </section>
  );
}
