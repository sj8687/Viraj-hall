"use client";

import Link from "next/link";
import { useEffect } from "react";
import gsap from "gsap";
import Chat from "./chat";

export function Hero() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width:768px)", () => {
      gsap.from(".hero-heading", {
        duration: 0.7,
        x: -1200,
        delay: 0.3,
      });

      gsap.from(".descr", {
        duration: 0.7,
        x: 1200,
        delay: 0.2,
      });

      gsap.from(".btn", {
        scale: 1,
        duration: 1,
        yoyo: true,
        repeat: -1,
        opacity: 1,
        y: 10,
      });

       gsap.from(".mobo", {
        duration:1,
        y:30,
      });
    });

    mm.add("(max-width:767px)", () => {
      gsap.from(".hero-heading", {
        duration: 1,
        x: -300,
      });

      gsap.from(".descr", {
        duration: 1,
        x: 300,
      });

      gsap.from(".btn", {
        scale: 0.9,
        duration: 1,
        yoyo: true,
        repeat: -1,
      });

       gsap.from(".mobo", {
        duration:1,
        y:30,
      });
    });
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-orange-600 via-orange-400 to-amber-700 overflow-hidden w-full h-[775px]">
      <div className="max-w-[1152px] mx-auto mt-[120px] md:mt-[160px]">
        <div className="flex justify-center  mb-4">
  <div className="bg-orange-300 border text-black mobo text--600 font-semibold rounded-full sm:px-5 px-3 py-2 shadow-[0_0_10px_rgba(200,400,600,80)] text-sm">
   💕 Celebrating 1000+ Events!
  </div>
</div>
        <div className="text-center hero-heading">
          <h1 className="text-5xl text-center font-[Comfortaa] md:text-7xl leading-[55px] sm:leading-[60px] text-black">
            Elegant venue, unforgettable{" "}
            <span className="text-white">memories</span>..
          </h1>
        </div>

        <div className="text-center mx-auto p-4 mt-1 w-[86%] sm:w-[55%] md:w-[50%]">
          <p className="md:text-[18px] leading-relaxed text-center descr text-wrap overflow-hidden text-[19px] text-black">
            Viraj is where love stories come to life. Celebrate your wedding and
            marriage,anniversary in beautiful &  elegant way ,viraj design to make your special
            day truly unforgettable.
          </p>
        </div>

        <div className="flex justify-center p-5">
          <Link href={"/booking/dashboard"}>
            <button className="p-2 btn bg-white px-10 text-[20px] hover:shadow-[0_0_10px_rgba(200,400,800,80)]  rounded-lg hover:bg-orange-600 hover:text-white" >
              Book Now
              
            </button>
          </Link>
        </div>
        <Chat />

      </div>
      
    </section>
  );
}
