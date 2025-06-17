'use client';
import { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

type Testimonial = {
  name: string;
  rating: number;
  text: string;
};

const testimonials: Testimonial[] = [
  {
    name: 'Soham B',
    rating: 5,
    text: 'Amazing place, staff is super friendly. Highly recommended!',
  },
  {
    name: 'Anjali R',
    rating: 4,
    text: 'Very clean and affordable. Food was great too.',
  },
  {
    name: 'Ravi K',
    rating: 5,
    text: 'Great for families and events. Will visit again!',
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // start fade-out
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setFade(true); // fade-in after index changes
      }, 300); // fade duration
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const testimonial = testimonials[currentIndex];

  return (
    <section className="bg-white py-16 text-center">
      <h2 className="text-orange-700 tracking-widest uppercase font-medium text-[20px] mb-2">Testimonials</h2>
      <h3 className="sm:text-4xl text-[32px] px-4 font-serif font-bold mt-4 mb-8">What Customers Say?</h3>

      <div
        className={`transition-opacity duration-500 ease-in-out ${
          fade ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <p className="max-w-3xl font-medium mx-auto text-gray-600 text-[16px] sm:text-lg px-4 mb-6">
          {testimonial?.text}
        </p>

        <div className="flex justify-center items-center gap-2 mb-2">
          {[...Array(testimonial?.rating)].map((_, i) => (
            <span key={i} className="text-yellow-400 text-xl">★</span>
          ))}
          <span className="sm:text-xl text-[17px] font-medium ml-2">{testimonial?.name}</span>
        </div>
      </div>

      <div className="flex justify-center items-center mt-8 gap-4">
        <button
          onClick={handlePrev}
          className="bg-orange-300 p-3 rounded-full hover:bg-orange-400 transition"
          aria-label="Previous"
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={handleNext}
          className="bg-orange-300 p-3 rounded-full hover:bg-orange-400 transition"
          aria-label="Next"
        >
          <FaArrowRight />
        </button>
      </div>
    </section>
  );
}
