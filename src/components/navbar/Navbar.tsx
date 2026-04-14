"use client";
import { LogOut, Package, Search, ShoppingCart, User } from "lucide-react";
import mongoose from "mongoose";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";
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
  //   console.log(user);
  const [open, setOpen] = useState(false);
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
      className="w-[95%] fixed top-4 left-1/2 -translate-x-1/2 bg-linear-to-r from-green-500 to-green-700 rounded-2xl shadow-lg shadow-black/30  flex justify-between items-center h-20 px-4 md:px-8 z-50 "
    >
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
        <div>
          <div
            onClick={() => setOpen((prev) => !prev)}
            className="w-10 h-10 rounded-full overflow-hidden bg-green-100 flex items-center justify-center cursor-pointer hover:scale-105 transition shadow-sm hover:shadow-md"
          >
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
          <AnimatePresence>
  {open && (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      className="absolute right-0 mt-3 w-64 max-w-[90vw] bg-white rounded-2xl shadow-xl border border-gray-200 p-3 z-50"
    >
      {/* User Info */}
      <div className="flex items-center gap-3 p-2 border-b border-gray-100">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-green-100 flex items-center justify-center">
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

        <div className="flex flex-col leading-tight">
          <h1 className="text-sm font-semibold text-gray-800 truncate max-w-[140px]">
            {user?.name || "User"}
          </h1>
          <p className="text-xs text-gray-500 capitalize">
            {user?.role || "No role"}
          </p>
        </div>
      </div>

      {/* Menu Items */}
      <div className="mt-2 flex flex-col gap-1">
        <Link
          href="/myOrder"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition"
        >
          <Package size={18} />
          My Orders
        </Link>

        <button
          onClick={() => {
            setOpen(false);
            signOut({ callbackUrl: "/login" });
          }}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 transition"
        >
          <LogOut size={18} />
          Log Out
        </button>
      </div>
    </motion.div>
  )}
</AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
