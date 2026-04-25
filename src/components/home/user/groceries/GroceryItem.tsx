"use client";
import mongoose from "mongoose";
import Image from "next/image";
import { motion } from "motion/react";
import { ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { AddToCard, DecriseQuantity, IncriseQuantity } from "@/redux/cardSlice";

interface IGrocery {
  _id: mongoose.Types.ObjectId;
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
  const dispatch=useDispatch<AppDispatch>()
  const {cardData}=useSelector((state:RootState)=>(state.card))
  const cardItem=cardData.find(i=>i._id == grocery._id)
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.5 }}
    //   whileHover={{ y: -10 }}
      className="group relative rounded-3xl overflow-hidden  backdrop-blur-xl border border-gray-100  hover:shadow-2xl transition-all duration-300 mx-2 "
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
        {
          !cardItem? <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            className="p-2 rounded-full bg-emerald-100 text-emerald-600 hover:bg-emerald-500 hover:text-white transition cursor-pointer"
            onClick={()=>dispatch(AddToCard({...grocery,quantity:1}))}
          >
            <ShoppingCart size={18} />
          </motion.button> 
          : 
            <div className="flex items-center justify-center">

      <motion.div
        initial="rest"
        whileHover="hover"
        animate="rest"
        variants={{
          rest: { width: 32 },   
          hover: { width: 105 }  
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative h-8 flex items-center justify-center bg-white rounded-2xl shadow-md cursor-pointer overflow-hidden"
      >

        {/* Default Count */}
        <motion.span
          variants={{
            rest: { opacity: 1, x: 0 },
            hover: { opacity: 0, x: -20 }
          }}
          transition={{ duration: 0.2 }}
          className="absolute text-lg font-semibold cursor-pointer"
        >
          {cardItem.quantity}
        </motion.span>

        {/* Hover Content */}
        <motion.div
          variants={{
            rest: { opacity: 0, x: 40 },
            hover: { opacity: 1, x: 0 }
          }}
          transition={{ duration: 0.25 }}
          className="absolute right-2 flex items-center gap-2 cursor-pointer"
        >
          
          {/* Minus */}
          <motion.button
          onClick={()=>dispatch(DecriseQuantity(grocery._id))}
            whileTap={{ scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            className="w-6 h-6 flex items-center justify-center rounded-md bg-red-100 text-red-600 text-lg font-bold cursor-pointer"
          >
            -
          </motion.button>

          {/* Count */}
          <span className="text-lg font-semibold w-5 text-center">
            {cardItem.quantity}
          </span>

          {/* Plus */}
          <motion.button
          onClick={()=>dispatch(IncriseQuantity(grocery._id))}
            whileTap={{ scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            className="w-6 h-6 flex items-center justify-center rounded-md bg-green-100 text-green-600 text-lg font-bold cursor-pointer"
          >
            +
          </motion.button>

        </motion.div>

      </motion.div>
    </div>

        }
          
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-300 bg-linear-to-r from-emerald-200/20 via-transparent to-teal-200/20 pointer-events-none" />
    </motion.div>
  );
};

export default GroceryItem;