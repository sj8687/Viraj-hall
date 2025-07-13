"use client"

import Link from 'next/link';
import { FaBuilding, FaGem, FaCheck, FaRupeeSign } from 'react-icons/fa';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger)


const PricingSection = () => {

   useEffect(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width:768px)", () => {

            gsap.from(".heading1",{
                y:20,
                opacity:0,
                delay:0.6,
                duration:0.3,
                stagger:0.2,
                scrollTrigger: {
                    trigger: ".heading1",
                    scroller: "body",
                    start: "top 70%",
                    // markers:true
                }

            })

           
        })


        mm.add("(max-width:768px)", () => {
            gsap.from(".heading1", {
                y: 80,
                duration: 0.3,
                delay:0.1,
                stagger:0.4,
                opacity:0,
                scrollTrigger: {
                    trigger: ".heading1",
                    scroller: "body",
                    start: "top 65%",
                    // markers:true
                }
            })


           
          
            
        })
    }, [])


  return (
    <section className="max-w-[1150px] sm:mt-[50px] mx-auto px-4 py-10">
      <h1 className="text-3xl sm:text-4xl font-bold heading1 text-center">Wedding <span className='text-orange-500'>& </span> Marriage Packages</h1>
      <p className="text-base heading1 sm:text-lg text-gray-700 max-w-2xl mx-auto text-center mt-3">
        Explore our tailored wedding packages designed to fit your needs.
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Package */}
        <div className="bg-orange-500 p-6 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105">
          <div className="flex items-center gap-3">
            <FaBuilding className="text-3xl text-white" />
            <h2 className="text-2xl font-bold text-white">Basic Package</h2>
          </div>
          <p className="text-3xl font-bold mt-4 text-white flex items-center gap-1">
            <FaRupeeSign /> 70,000
          </p>
          <p className="mt-2 text-white">
            Ideal for intimate gatherings and budget-conscious couples.
          </p>
          <ul className="mt-4 text-white space-y-2">
            <li className="flex items-center gap-2">
              <FaCheck className="text-white" /> Venue rental for 8 hours
            </li>
            <li className="flex items-center gap-2">
              <FaCheck className="text-white" /> Basic decor setup
            </li>
            <li className="flex items-center gap-2">
              <FaCheck className="text-white" /> Basic Seating for up to 1000 guests
            </li>
          </ul>
        <Link href={"/booking/dashboard"}> <button className="mt-6 bg-white text-orange-500 font-semibold px-4 py-2 rounded-md hover:bg-orange-100">
            Choose Basic
          </button>
          </Link>
        </div>

        {/* Premium Package */}
        <div className="bg-orange-500 p-6 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105">
          <div className="flex items-center gap-3">
            <FaGem className="text-3xl text-white" />
            <h2 className="text-2xl font-bold text-white">Premium Package</h2>
          </div>
          <p className="text-3xl font-bold mt-4 text-white flex items-center gap-1">
            <FaRupeeSign /> 1,50,000
          </p>
          <p className="mt-2 text-white">
            Perfect for larger celebrations with all-inclusive services.
          </p>
          <ul className="mt-4 text-white space-y-2">
            <li className="flex items-center gap-2">
              <FaCheck className="text-white" /> Venue rental for 14 hours
            </li>
            <li className="flex items-center gap-2">
              <FaCheck className="text-white" /> Full decor setup
            </li>
            <li className="flex items-center gap-2">
              <FaCheck className="text-white" /> Catering for up to 1000 guests
            </li>
            <li className="flex items-center gap-2">
              <FaCheck className="text-white" /> Wedding planning service included
            </li>
             <li className="flex items-center gap-2">
              <FaCheck className="text-white" />  Maharaja Seating for up to 1000 guests
            </li>
          </ul>
          <Link href={"/booking/dashboard"}><button className="mt-6 bg-white text-orange-500 font-semibold px-4 py-2 rounded-md hover:bg-orange-100">
            Choose Premium
          </button>
          </Link>  
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
