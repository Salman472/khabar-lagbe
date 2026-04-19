"use client";
import mongoose from "mongoose";
import Image from "next/image";
import { motion } from "motion/react";
import { ShoppingCart } from "lucide-react";

interface IGrocery {
  _id?: mongoose.Types.ObjectId;
  name: string;
  category: string;
  unit: string;
  price: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const GroceryItem = ({ grocery }: { grocery: IGrocery }) => {
  const { name, image, category, price, unit } = grocery;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false }}
      transition={{ duration: 0.5 }}
    //   whileHover={{ y: -10 }}
      className="group relative rounded-3xl overflow-hidden  backdrop-blur-xl border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-300"
    >
      {/* Image Section */}
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />

        {/* Category Badge */}
        <span className="absolute top-3 left-3 bg-emerald-500 text-white text-xs px-3 py-1 rounded-full shadow">
          {category}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="text-gray-800 font-semibold text-lg line-clamp-1">
          {name}
        </h3>

        <p className="text-sm text-gray-500">
          {unit}
        </p>

        {/* Price + Button */}
        <div className="flex items-center justify-between mt-3">
          <span className="text-emerald-600 font-bold text-lg">
            ৳ {price}
          </span>

          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            className="p-2 rounded-full bg-emerald-100 text-emerald-600 hover:bg-emerald-500 hover:text-white transition cursor-pointer"
          >
            <ShoppingCart size={18} />
          </motion.button>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-300 bg-linear-to-r from-emerald-200/20 via-transparent to-teal-200/20 pointer-events-none" />
    </motion.div>
  );
};

export default GroceryItem;