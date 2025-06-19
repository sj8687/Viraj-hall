"use client"

import { FaHeart, FaUserTie, FaRing } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";


export default function AboutSection() {
  

  return (
    <section
      className="bg-gray-00 py-16  mt-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
      // ref={sectionRef}
    >
      <div className="max-w-4xl mx-auto text-center mb-12 animate">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          About <span className="text-orange-500">Viraj Multipurpose <span className="text-black">Hall</span> </span>
        </h2>
   <div className="">
                <div className="absolute w-[80%] h-[60%] top-40 left-14 bg-orange-200 opacity-50 rounded-full blur-[100px] z-[-1]"></div>
        <p className="text-base sm:text-lg text-gray-600">
          Since 2004, Viraj Hall has hosted over 500 beautiful weddings. Known for elegance, service, and love — we’re honored to make your day magical.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-[50px] max-w-4xl mx-auto text-center mb-16">
        <div className="animate">
          <FaRing className="text-orange-500 text-4xl mx-auto mb-2" />
          <p className="text-3xl font-bold text-orange-500">2004</p>
          <p className="text-gray-600 font-medium">Established</p>
        </div>
        <div className="animate">
          <FaHeart className="text-orange-500 text-4xl mx-auto mb-2" />
          <p className="text-3xl font-bold text-orange-500">500+</p>
          <p className="text-gray-600 font-medium">Weddings Hosted</p>
        </div>
        <div className="animate">
          <FaUserTie className="text-orange-500 text-4xl mx-auto mb-2" />
          <p className="text-3xl font-bold text-orange-500">100%</p>
          <p className="text-gray-600 font-medium">Client Satisfaction</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-10 animate">
          Meet Our Team
        </h3>
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 text-center">
          {[
            {
              name: "Mr. Suresh Patil",
              role: "Founder & Owner",
              img: "/images/owner.jpg",
            },
            {
              name: "Mrs. Kavita Deshmukh",
              role: "Managing Head",
              img: "/images/manager.jpg",
            },
            {
              name: "Rohan Pawar",
              role: "Decoration Lead",
              img: "/images/decor.jpg",
            },
          ].map((member, index) => (
            <div className="animate" key={index}>
              <Image
                src={member.img}
                alt={member.name}
                width={128}
  height={128}
                className="mx-auto rounded-full w-28 h-28 sm:w-32 sm:h-32 object-cover shadow-md mb-4"
              />
              <h4 className="text-lg sm:text-xl font-semibold">{member.name}</h4>
              <p className="text-orange-500 text-sm font-medium sm:text-base">{member.role}</p>
            </div>
          ))}
        </div>
        </div>
      </div>

      <div className="text-center mt-16 animate">
        <p className="text-base sm:text-lg text-gray-700">
          Let our experienced team make your day unforgettable.
        </p>
        <Link
          href={"/nav/contact"}
          className="inline-block mt-4 px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition"
        >
          Get in Touch
        </Link>
      </div>
      
    </section>
  );
}