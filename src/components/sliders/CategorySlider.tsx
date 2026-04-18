'use client';

import React from 'react';
import { motion } from 'framer-motion';

const categories = [
  {
    id: 1,
    name: 'Dairy & Eggs',
    icon: '🥛',
    color: 'bg-yellow-100',
  },
  {
    id: 2,
    name: 'Rice, Atta & Grains',
    icon: '🌾',
    color: 'bg-orange-100',
  },
  {
    id: 3,
    name: 'Snacks & Biscuits',
    icon: '🍪',
    color: 'bg-pink-100',
  },
  {
    id: 4,
    name: 'Spices & Masalas',
    icon: '🌶️',
    color: 'bg-red-100',
  },
  {
    id: 5,
    name: 'Beverages & Drinks',
    icon: '☕',
    color: 'bg-blue-100',
  },
  {
    id: 6,
    name: 'Personal Care',
    icon: '❤️',
    color: 'bg-purple-100',
  },
  {
    id: 7,
    name: 'Household Essentials',
    icon: '🏠',
    color: 'bg-green-100',
  },
  {
    id: 8,
    name: 'Instant & Packaged Food',
    icon: '🍜',
    color: 'bg-indigo-100',
  },
  {
    id: 9,
    name: 'Baby & Pet Care',
    icon: '🍼',
    color: 'bg-teal-100',
  },
];

export default function CategorySlider() {
  return (
    <div className="min-h-screen bg-linear-to-b from-white via-gray-50 to-white py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header with Animation */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-12"
        >
          <motion.div 
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            className="text-5xl"
          >
            🛒
          </motion.div>
          <h1 className="text-4xl font-bold text-emerald-700 tracking-tight">
            Shop by Category
          </h1>
        </motion.div>

        {/* Category Cards - Horizontal Scroll with Stagger Animation */}
        <div className="relative">
          <motion.div 
            className="flex gap-4 overflow-x-auto pb-10 snap-x snap-mandatory scrollbar-hide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 60, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08, // Stagger effect
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                whileHover={{
                  y: -12,
                  scale: 1.04,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
                className={`
                  shrink-0 w-44 h-44 rounded-3xl ${category.color}
                  flex flex-col items-center justify-center gap-5
                  shadow-md hover:shadow-2xl transition-shadow duration-300
                  snap-start cursor-pointer group
                `}
              >
                <motion.div 
                  className="text-6xl drop-shadow-sm transition-transform duration-300 group-hover:scale-110"
                  whileHover={{ rotate: [0, 8, -8, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  {category.icon}
                </motion.div>
                
                <p className="text-center text-sm font-medium text-gray-800 px-4 leading-tight">
                  {category.name}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Popular Grocery Items Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-emerald-700 text-center mb-10"
          >
            Popular Grocery Items
          </motion.h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i, index) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition-all border border-gray-100 cursor-pointer"
              >
                <motion.div 
                  className="h-48 bg-linear-to-br from-emerald-100 to-teal-100 flex items-center justify-center text-7xl"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  🛍️
                </motion.div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800">Fresh Product {i}</h3>
                  <p className="text-emerald-600 font-medium mt-1">₹ 89.00</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}