"use client"

import Link from "next/link"

export default function LogoNavbar() {
  return (
    <div className="  flex justify-start pl-[22px] p-1 sm:pl-[40px] md:pl-[80px]">
      <Link href="/">
        <img
            src="/logoo.png"
            alt="Viraj Hall"
            className="object-cover w-[110px] sm:w-[130px] h-auto rounded-xl"
          />
      </Link>
    </div>
  );
}
