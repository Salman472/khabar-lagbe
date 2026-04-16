"use client";
import {
  Boxes,
  ClipboardCheck,
  LogOut,
  Menu,
  Package,
  PlusCircle,
  Search,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import mongoose from "mongoose";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { createPortal } from "react-dom";
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
  const [openSearch, setOpenSearch] = useState(false);
  const [operMenu, setOpenMenu] = useState(false);

  // const [search, setSearch]=useState("")
  const profileDropDown = useRef<HTMLDivElement>(null);

  // click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        profileDropDown.current &&
        !profileDropDown.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sideBar = operMenu
    ? createPortal(
        <AnimatePresence>
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "keyframes" }}
            exit={{ x: -100, opacity: 0 }}
            className="fixed top-0 left-0  h-full w-[75%] sm:w-[60%] z-9999 bg-linear-to-b from-green-800/90 via-green-700/80 to-green-900/90 backdrop-blur-xl border-r border-green-400/20 shadow-[0_0_50px_-10px_rgba(0, 255, 100, 0.3)] flex flex-col p-6 text-white"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-xl font-bold">Admin Panel</h1>
              <button
                onClick={() => setOpenMenu(false)}
                className="bg-white/20 p-2 rounded-full hover:text-red-500 cursor-pointer"
              >
                <X />
              </button>
            </div>
            {/* Profile */}
            <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl mb-6">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white/20 flex items-center justify-center">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt="user"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                ) : (
                  <span className="text-lg font-bold">
                    {user.name?.charAt(0)}
                  </span>
                )}
              </div>

              <div>
                <h2 className="font-semibold">{user.name}</h2>
                <p className="text-sm opacity-80">{user.role}</p>
              </div>
            </div>

            {/* Menu */}
            <div className="flex flex-col gap-4">
              <Link
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 transition p-3 rounded-xl cursor-pointer"
                href={""}
              >
                <PlusCircle className="h-5 w-5" /> Add Grocery
              </Link>

              <Link
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 transition p-3 rounded-xl cursor-pointer"
                href={""}
              >
                <Boxes className="h-5 w-5" />
                View Grocery
              </Link>

              <Link
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 transition p-3 rounded-xl cursor-pointer"
                href={""}
              >
                <ClipboardCheck className="h-5 w-5" />
                Manage Orders
              </Link>
            </div>
            <div className="flex-1" />
            {/* Divider */}
            <div className="mt-6 border-t border-white/20" />
            {/* Logout */}
            <button
              onClick={async()=> await signOut({callbackUrl:'/login'})}
              className="flex items-center gap-3 bg-white/5 hover:bg-white/20  p-3 rounded-xl cursor-pointer 
              transition text-red-500 font-semibold py-3  shadow-lg"
            >
              <LogOut size={18} />
              Logout
            </button>
          </motion.div>
        </AnimatePresence>,
        document.body,
      )
    : null;
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
      {user.role == "user" && (
        <>
          {/* search box */}
          <form className="hidden md:flex items-center rounded-full bg-white px-4 py-2 w-1/2 max-w-lg shadow-md">
            <Search className="h-5 w-5 mr-2 text-gray-500" />
            <input
              type="text"
              placeholder="Search Groceries..."
              className="w-full outline-none text-gray-700 placeholder-bg-gray-400"
            />
          </form>
        </>
      )}

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* user navbar */}
        {user.role == "user" && (
          <>
            {/* search icon */}
            <div
              onClick={() => setOpenSearch((prev) => !prev)}
              className="bg-white text-green-600 p-2 rounded-full flex justify-center items-center hover:scale-105 transition relative shadow-sm hover:shadow-md md:hidden"
            >
              <Search />
            </div>
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
          </>
        )}

        {/* admin route */}
        {user.role == "admin" && (
          <>
            <div className="hidden md:flex items-center gap-4">
              <Link
                className="flex items-center gap-2 bg-white text-green-700 font-semibold px-4 py-2 rounded-full hover:bg-green-100 transition-all"
                href={""}
              >
                <PlusCircle className="h-5 w-5" /> Add Grocery
              </Link>

              <Link
                className="flex items-center gap-2 bg-white text-green-700 font-semibold px-4 py-2 rounded-full hover:bg-green-100 transition-all"
                href={""}
              >
                <Boxes className="h-5 w-5" />
                View Grocery
              </Link>

              <Link
                className="flex items-center gap-2 bg-white text-green-700 font-semibold px-4 py-2 rounded-full hover:bg-green-100 transition-all"
                href={""}
              >
                <ClipboardCheck className="h-5 w-5" />
                Manage Orders
              </Link>
            </div>
            {/* hamburger menu */}
            <div
              onClick={() => setOpenMenu((prev) => !prev)}
              className="md:hidden  bg-white text-green-700 font-semibold px-2 py-2 rounded-full hover:bg-green-100 transition-all"
            >
              <Menu />
            </div>
          </>
        )}

        {/* User Profile */}

        <div ref={profileDropDown}>
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
          {/* open drop down box */}
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
          {/* open search box */}
          <AnimatePresence>
            {openSearch && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="fixed top-24 left-1/2 -translate-x-1/2  w-[90%] bg-white rounded-full shadow-lg px-4 py-2 flex items-center z-50"
              >
                <Search className="h-5 w-5 mr-2 text-gray-500" />
                <form className="w-full">
                  <input
                    // onChange={(e)=>setSearch(e.target.value)}
                    // value={search}
                    type="text"
                    placeholder="Search Groceries..."
                    className="w-full outline-none text-gray-700 placeholder-bg-gray-400"
                  />
                </form>
                <button onClick={() => setOpenSearch(false)}>
                  <X className="h-5 w-5 ml-2 text-gray-500" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      {sideBar}
    </motion.div>
  );
};

export default Navbar;
