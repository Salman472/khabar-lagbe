"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Dairy & Eggs",
    icon: "🥛",
    color: "bg-yellow-100",
  },
  {
    id: 2,
    name: "Rice, Atta & Grains",
    icon: "🌾",
    color: "bg-orange-100",
  },
  {
    id: 3,
    name: "Snacks & Biscuits",
    icon: "🍪",
    color: "bg-pink-100",
  },
  {
    id: 4,
    name: "Spices & Masalas",
    icon: "🌶️",
    color: "bg-red-100",
  },
  {
    id: 5,
    name: "Beverages & Drinks",
    icon: "☕",
    color: "bg-blue-100",
  },
  {
    id: 6,
    name: "Personal Care",
    icon: "❤️",
    color: "bg-purple-100",
  },
  {
    id: 7,
    name: "Household Essentials",
    icon: "🏠",
    color: "bg-green-100",
  },
  {
    id: 8,
    name: "Instant & Packaged Food",
    icon: "🍜",
    color: "bg-indigo-100",
  },
  {
    id: 9,
    name: "Baby & Pet Care",
    icon: "🍼",
    color: "bg-teal-100",
  },
];




export default function CategorySlider() {
  const [showLeft, setShowLeft]=useState<boolean>()
  const [showRight, setShowRight]=useState<boolean>(false)
    const scrollRef =useRef<HTMLDivElement>(null)
    const scroll =(direction : 'left' | 'right')=>{
        if(!scrollRef.current){
            return
        }
        const scrollAmount=direction == 'left'? -200 : 200
        scrollRef.current.scrollBy({left:scrollAmount, behavior:'smooth'})
        
    }
    // button scroll
    const checkScroll =()=>{
      if(!scrollRef.current) return
      // console.log('scrollWidth', scrollRef.current.scrollWidth);
      // console.log('clientWidth', scrollRef.current.clientWidth);
      // console.log('leftWidth', scrollRef.current.scrollLeft);
      const {scrollWidth, clientWidth, scrollLeft}=scrollRef.current
      setShowLeft(scrollLeft > 0)
      setShowRight((scrollLeft+clientWidth) <= scrollWidth -5)

    }
    useEffect(()=>{
      scrollRef.current?.addEventListener('scroll', checkScroll)
      checkScroll()
      return ()=>removeEventListener('scroll', checkScroll)
    },[])

    // auth scroll
    useEffect(()=>{
      const autoScroll=setInterval(() => {
        if(!scrollRef.current) return
        const {scrollWidth, clientWidth, scrollLeft}=scrollRef.current
        if((scrollLeft+clientWidth) >= scrollWidth){
          scrollRef.current.scrollTo({left:0, behavior:'smooth'})
        }
        else{
          scrollRef.current.scrollBy({left:200, behavior:'smooth'})
        }
        
      }, 3000);
      return ()=>clearInterval(autoScroll)
    },[])
    
  return (
    <div className=" bg-linear-to-b from-white via-gray-50 to-white py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Header with Animation */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
          className="flex items-center justify-center gap-3 mb-12"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            viewport={{ once: false }}
            className="text-5xl"
          >
            🛒
          </motion.div>
          <h1 className="text-4xl font-bold text-emerald-700 tracking-tight">
            Shop by Category
          </h1>
        </motion.div>

        {/* Category Cards - Horizontal Scroll with Stagger Animation */}
        {/* Left Button */}
        {showLeft && <motion.button
        onClick={()=>scroll("left")}
          whileHover={{ scale: 1.1, x: -3 }}
          whileTap={{ scale: 0.9 }}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-50
      flex items-center justify-center
      w-12 h-12 rounded-2xl
      bg-emerald-50 text-emerald-600
      shadow-md hover:shadow-xl
      border border-emerald-100
    "
        >
          <ChevronLeft size={22} />
        </motion.button>}
        

        <div className="relative" >
          <motion.div
          ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-10 snap-x snap-mandatory scrollbar-hide"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
          >
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 60, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08, // Stagger effect
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
                whileHover={{
                  y: -12,
                  scale: 1.04,
                  transition: { duration: 0.2 },
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
                  viewport={{ once: false }}
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
        {/* Right Button */}
        {showRight &&  <motion.button
         onClick={()=>scroll("right")}
          whileHover={{ scale: 1.1, x: -3 }}
          whileTap={{ scale: 0.9 }}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-50
      flex items-center justify-center
      w-12 h-12 rounded-2xl
      bg-emerald-50 text-emerald-600
      shadow-md hover:shadow-xl
      border border-emerald-100
    "
        >
          <ChevronRight size={22} />
        </motion.button>}
       

       
      </div>
    </div>
  );
}
