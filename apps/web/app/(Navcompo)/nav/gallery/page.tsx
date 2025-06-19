// pages/gallery.tsx
import { InfiniteFloatingImages } from "@/components/Infinite";
import Image from "next/image";
import Link from "next/link";

const images = [
  {
    src: "/hall1.jpg",
    title: "Elegant Wedding Setup",
    description: "Perfect for large and intimate weddings with breathtaking decor.",
  },
  {
    src: "/hall2.jpg",
    title: "Spacious Event Hall",
    description: "Designed to accommodate all types of events effortlessly.",
  },
  {
    src: "/hall3.jpg",
    title: "Reception Area",
    description: "Modern and warm welcome space for guests.",
  },
  {
    src: "/dinnerr1.jpg",
    title: "Grand Stage",
    description: "The perfect centerpiece for any celebration.",
  },
  {
    src: "/man.png",
    title: "Luxurious Seating",
    description: "Comfortable and classy seating for all guests.",
  },
  {
    src: "/hall.jpg",
    title: "Beautiful Lighting",
    description: "Creates a magical atmosphere for your events.",
  },
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen mt-16 px-4 py-12 text-center overflow-hidden text-gray-800">
      <h1 className="text-4xl font-bold mb-2">
        Viraj <span className="text-orange-500">Multipurpose</span> Hall Gallery
      </h1>
      <p className="text-lg text-gray-600 mb-10">
        Explore our gallery of unforgettable events at Viraj Hall.
      </p>

      {/* Highlight Image */}
      <div className="relative mb-14">
        <div className="absolute w-[95%] h-[60%] top-20 left-14 bg-orange-300 opacity-50 rounded-full blur-[100px] z-[-1]"></div>
        <div className="w-full h-[400px] flex justify-center rounded-xl overflow-hidden mt-4 ">
          <Image
            src="/hall.jpg"
            alt="Viraj Hall"
            width={1000}
            height={400}
            className="object-cover rounded-xl"
          />
        </div>
      </div>

      <main className="mt-10">
        <InfiniteFloatingImages images={images} speed="normal" direction="right" />
      </main>

      

      <div className="mt-20">
        <p className="text-lg text-gray-700 font-medium mb-4">Want to see the hall in person?</p>
      <Link href={"/booking/dashboard"}
          className="inline-block bg-orange-500 font-medium hover:bg-orange-600 text-white px-6 py-3 rounded-xl transition duration-300"
       >
          Book a Visit
        </Link>
      </div>
    </div>
  );
}
