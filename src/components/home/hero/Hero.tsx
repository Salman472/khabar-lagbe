"use client";
import { Leaf, ShoppingBag, Smartphone, Truck } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";

const Hero = () => {
  const slides = useMemo(
    () => [
      {
        id: 1,
        icon: (
          <Leaf className="h-14 w-14 sm:h-20 sm:w-20 text-green-400 drop-shadow-lg" />
        ),
        title: "Fresh Organic Groceries 🌱",
        subTitle:
          "Farm-fresh fruits, vegetables, and daily essentials delivered to you.",
        btnText: "Shop Now",
        bg: "https://images.unsplash.com/photo-1767364084218-a18f3ea7e93f",
      },
      {
        id: 2,
        icon: (
          <Truck className="h-14 w-14 sm:h-20 sm:w-20 text-green-400 drop-shadow-lg" />
        ),
        title: "Fast & Reliable Delivery 🚚",
        subTitle:
          "We ensure your groceries reach your doorstep in no time.",
        btnText: "Order Now",
        bg: "https://images.unsplash.com/photo-1607130232670-52123ba5be5c",
      },
      {
        id: 3,
        icon: (
          <Smartphone className="h-14 w-14 sm:h-20 sm:w-20 text-green-400 drop-shadow-lg" />
        ),
        title: "Shop Anytime, Anywhere 📱",
        subTitle:
          "Easy and seamless online grocery shopping experience.",
        btnText: "Get Started",
        bg: "https://images.unsplash.com/photo-1674027392887-751d6396b710",
      },
    ],
    []
  );

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides]);

  return (
    <div className="relative w-[95%] mx-auto mt-20 sm:mt-28 h-[70vh] sm:h-[80vh] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
      
      {/* Background Slider */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0.5, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[current].bg}
            alt="hero"
            fill
            priority
            className="object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-black/70 backdrop-blur-[2px]" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center text-white px-4">
        <motion.div
          key={current}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl"
        >
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-full shadow-lg ">
              {slides[current].icon}
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-4xl font-bold mb-3">
            {slides[current].title}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-lg text-gray-200 mb-6">
            {slides[current].subTitle}
          </p>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-green-400 text-black font-semibold px-5 py-3 rounded-full shadow-lg hover:bg-green-300 transition"
          >
            <ShoppingBag size={18} />
            {slides[current].btnText}
          </motion.button>
        </motion.div>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full transition-all ${
              current === index ? "bg-white w-6" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;