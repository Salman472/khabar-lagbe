"use client";
import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Bike, ChefHat } from "lucide-react";
type propType = {
  nextStep: (s: number) => void;
};
const Welcome = ({ nextStep }: propType) => {
  return (
    <div className="flex flex-col justify-center items-center text-center p-4 sm:p-6 md:p-10 min-h-screen">
      {/* LOGO + TITLE */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-2 sm:gap-3"
      >
        <ChefHat
          className="w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 text-green-600"
          strokeWidth={3.25}
        />

        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold md:font-extrabold text-green-700">
          Khabar Lagbe
        </h1>
      </motion.div>

      {/* DESCRIPTION */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-4 sm:mt-6 max-w-xs sm:max-w-md md:max-w-xl text-sm sm:text-base md:text-lg text-gray-600"
      >
        Your favorite food, delivered fast and fresh at your doorstep. Discover
        delicious meals from top restaurants near you with ease.
      </motion.p>

      {/* ICONS */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="flex items-center gap-6 mt-6 sm:mt-8"
      >
        <ChefHat
          className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-green-600"
          strokeWidth={3.25}
        />

        {/* BIKE WITH ANIMATION */}
        <motion.div
          animate={{ x: [0, 50] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <Bike
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-orange-500"
            strokeWidth={3.25}
          />
        </motion.div>
      </motion.div>
      {/* button */}
      <motion.button
        onClick={() => nextStep(2)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        whileHover="hover"
        whileTap={{ scale: 0.95 }}
        className="mt-6 flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-green-700 text-white rounded-full text-sm sm:text-base font-semibold shadow-md hover:bg-green-800 transition"
      >
        next
        {/* arrow */}
        <motion.span
          variants={{
            hover: { x: 8 },
          }}
          transition={{ type: "spring", stiffness: 300 }}
          className="flex items-center"
        >
          <ArrowRight className="w-5 h-5" />
        </motion.span>
      </motion.button>
    </div>
  );
};

export default Welcome;
