"use client"
import { Search, ShoppingCart, User } from "lucide-react";
import mongoose from "mongoose";
import Link from "next/link";
import { motion } from "motion/react";
import React from "react";
import Image from "next/image";
interface IUser {
  _id?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  mobile?: string;
  role: "user" | "deliveryBoy" | "admin";
  image?: string;
}
const Navbar = ({ user }: { user: IUser }) => {
  console.log(user);
  return (
    <motion.div
    initial={{
          opacity: 0,
          y: -30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
    className="w-[95%] fixed top-4 left-1/2 -translate-x-1/2 bg-linear-to-r from-green-500 to-green-700 rounded-2xl shadow-lg shadow-black/30  flex justify-between items-center h-20 px-4 md:px-8 z-50 ">
      {/* nav logo */}
      <Link
        className="text-white text-2xl md:text-3xl font-extrabold tracking-wide hover:scale-105 transition-transform"
        href={"/"}
      >
        Khabar Lagbe
      </Link>
      {/* search box */}
      <form className="hidden md:flex items-center rounded-full bg-white px-4 py-2 w-1/2 max-w-lg shadow-md">
        <Search className="h-5 w-5 mr-2 text-gray-500" />
        <input
          type="text"
          placeholder="Search Groceries..."
          className="w-full outline-none text-gray-700 placeholder-bg-gray-400"
        />
      </form>
      {/* Right */}
      <div className="flex items-center gap-3">
  {/* Cart */}
  <Link
    href={"/cart"}
    className="bg-white text-green-600 p-2 rounded-full flex justify-center items-center hover:scale-105 transition relative shadow-sm hover:shadow-md"
  >
    <ShoppingCart size={16} />
    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full">
      0
    </span>
  </Link>

  {/* User Profile */}
  <div className="w-10 h-10 rounded-full overflow-hidden bg-green-100 flex items-center justify-center cursor-pointer hover:scale-105 transition shadow-sm hover:shadow-md">
    {user.image ? (
      <Image
        width={40}
        height={40}
        src={user.image}
        alt="user image"
        className="w-full h-full object-cover"
      />
    ) : (
      <User className="text-green-600 w-5 h-5" />
    )}
  </div>
</div>
    </motion.div>
  );
};

export default Navbar;
