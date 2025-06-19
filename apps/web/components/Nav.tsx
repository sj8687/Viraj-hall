"use client";

import Link from "next/link";
import { HiBars3 } from "react-icons/hi2";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Profile } from "./Profile";
import Image from "next/image";
import { useSession } from "next-auth/react";

export function Navbar() {
  const { data: authData } = useSession();
  const pathname = usePathname();
  const t1 = useRef<gsap.core.Timeline | null>(null);
  const [scrolled, setScrolled] = useState(false); // for scroll/shadow effect

  function handleClick() {
    document.body.classList.add("overflow-hidden");
    t1.current?.play();
  }

  function hidediv() {
    document.body.classList.remove("overflow-hidden");
    t1.current?.reverse();
  }

  useEffect(() => {
    if (!t1.current) {
      t1.current = gsap.timeline({ paused: true });

      t1.current.to("#mobile-menu", {
        right: 0,
        duration: 0.5,
      });

      t1.current.from("#mobile-menu-text", {
        x: "10",
        duration: 0.1,
        opacity: 0,
        stagger: 0.1,
      });
    }

    // GSAP animations
    gsap.from(".logo", {
      y: -100,
      duration: 1,
      opacity: 0,
    });

    gsap.from(".signbarsdiv", {
      y: -100,
      duration: 1,
      opacity: 0,
    });

    gsap.from(".menus", {
      y: -100,
      duration: 1,
      opacity: 0,
    });

    // Shadow always visible on these routes
    const alwaysShadowRoutes = [
      "/nav/gallery",
      "/nav/contact",
      "/nav/services",
      "/nav/about",
      "/booking/dashboard",
      "/booking/payment",
      "/booking/admin",
       "/booking/Show",
    ];

    if (alwaysShadowRoutes.includes(pathname)) {
      setScrolled(true);
    } else {
      const onScroll = () => {
        setScrolled(window.scrollY > 10);
      };
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, [pathname]);

  const isActive = (route: string) => pathname === route;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/nav/gallery", label: "Gallery" },
    { href: "/nav/services", label: "Services" },
    { href: "/nav/contact", label: "Contact" },
    { href: "/nav/about", label: "About Us" },
  ];

  return (
    <section className="">
      <div
        className={`flex justify-between overflow-hidden sm:mx-0 px-2 md:px-14 md:justify-around backdrop-blur-[10px] z-50 fixed top-0 left-0 right-0 mx-auto items-center md:p-0 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-[10px] shadow-lg"
            : "md:bg-transparent shadow-lg md:shadow-none backdrop-blur-[10px]"
        }`}
      >
        <div className="logo">
          <Link href={"/"}>
            <Image
              src="/logoo.png"
              alt="Viraj Hall"
              width={125}
              height={50}
              className="object-cover w-[110px] sm:w-[125px] h-auto rounded-xl"
            />
          </Link>
        </div>

        <div className="text-start px-2 hidden md:flex flex-1 justify-center gap-8 text-[17px] font-medium">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              className={`hover:shadow-lg px-4 py-1 hover:bg-gray-100 hover:rounded-lg menus ${
                isActive(href)
                  ? "underline decoration-2 underline-offset-8"
                  : ""
              }`}
              href={href}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="space-x-2  sm:space-x-3 flex justify-center items-center">
          {authData && !(authData.user as any)?.isAdmin && (
            <Link href="/booking/Show">
              <button className="bg-black signbarsdiv text-[15px] p-2 px-4 border font-medium hover:border-blue-500 text-white rounded-lg">
                Bookings
              </button>
            </Link>
          )}
          {authData && (authData.user as any)?.isAdmin && (
            <Link href="/booking/admin">
              <button className="bg-black signbarsdiv text-[15px] p-2 px-4 border font-medium hover:border-red-500 text-white rounded-lg">
                Admin Panel
              </button>
            </Link>
          )}
          {authData ? (
            <Profile authData={authData.user} />
          ) : (
            <Link href={"/login"}>
              <button className="bg-black signbarsdiv p-2 px-4 border font-medium hover:border-red-500 text-white rounded-lg">
                Log in
              </button>
            </Link>
          )}

          <div
            onClick={handleClick}
            className="w-[30px] text-[26px] font-bold flex items-center justify-center md:hidden cursor-pointer menus"
          >
            <HiBars3 />
          </div>
        </div>
      </div>

      <div
        id="mobile-menu"
        className="fixed mt-0 top-0 border font-medium z-50 right-[-90%] bg-white flex flex-col p-0 h-full w-[260px] pt-32 items-center gap-4 text-[16px] rounded-lg"
      >
        <p
          onClick={() => hidediv()}
          className="absolute top-0 right-0 px-3 rounded-xl p-1 mr-4 mt-4 font-medium text-black bg-orange-300 cursor-pointer"
        >
          X
        </p>

        {navLinks.map(({ href, label }) => (
          <Link
            suppressHydrationWarning
            key={href}
            id="mobile-menu-text"
            href={href}
             onClick={() => hidediv()}
            className={`tracking-widest rounded-lg transition-shadow duration-100 hover:text-white hover:bg-orange-400 px-12 p-2 barsmenus ${
              pathname === href
                ? "underline decoration-2 underline-offset-8 hover:text-white"
                : ""
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
    </section>
  );
}
