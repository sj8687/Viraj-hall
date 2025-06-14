"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

type ImageItem = {
  src: string;
  title: string;
  description: string;
};

type Props = {
  images: ImageItem[];
  speed?: "fast" | "normal" | "slow";
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
};

const speedMap = {
  fast: "20s",
  normal: "40s",
  slow: "80s",
};

export const InfiniteFloatingImages: React.FC<Props> = ({
  images,
  speed = "normal",
  direction = "left",
  pauseOnHover = true,
  className = "",
}) => {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (scrollerRef.current && !ready) {
      const scroller = scrollerRef.current;
      const clone = scroller.cloneNode(true) as HTMLUListElement;
      Array.from(clone.children).forEach((child) => {
        scroller.appendChild(child.cloneNode(true));
      });
      setReady(true);
    }
  }, [ready]);

return (
  <>
    <div className={`overflow-hidden w-full py-16 ${className}`}>
      <ul
        ref={scrollerRef}
        className={`flex w-max gap-6 animate-scroll ${
          pauseOnHover ? "hover:[animation-play-state:paused]" : ""
        }`}
        style={{
          animation: `scroll ${speedMap[speed]} linear infinite`,
          animationDirection: direction === "left" ? "normal" : "reverse",
        }}
      >
        {images.map((image, i) => (
          <li
            key={i}
            className={`relative w-[350px] sm:w-[400px] h-[400px] shrink-0 rounded-xl overflow-hidden shadow-xl bg-black transition-transform duration-300 hover:scale-105 ${
              i % 2 === 0 ? "translate-y-12" : "-translate-y-12"
            } my-1`}
          >
            <Image
              src={image.src}
              alt={`image-${i}`}
              width={600}
              height={600}
              className="object-cover w-full h-full "
            />
            <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
              <h3 className="text-white text-xl font-semibold">{image.title}</h3>
              <p className="text-white text-base opacity-80">{image.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>

    <style jsx>{`
      @keyframes scroll {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-50%);
        }
      }
    `}</style>
  </>
);
};
