"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";

import Image from "next/image";
import {
  CartDelete,
  DecriseQuantity,
  IncriseQuantity,
} from "@/redux/cardSlice";
import mongoose from "mongoose";

interface IGrocery {
  _id?: mongoose.Types.ObjectId;
  name: string;
  category: string;
  unit: string;
  price: string;
  quantity: number;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const rules = [
  { min: 100000, rate: 0.2 },
  { min: 50000, rate: 0.18 },
  { min: 30000, rate: 0.15 },
  { min: 20000, rate: 0.12 },
  { min: 10000, rate: 0.1 },
  { min: 5000, rate: 0.07 },
  { min: 2500, rate: 0.05 },
  { min: 1000, rate: 0.03 },
];

export default function ShoppingCartPage() {
  const { cardData } = useSelector((state: RootState) => state.card);
  const dispatch = useDispatch<AppDispatch>();

  const subTotal = cardData.reduce((acc, cart) => {
    return acc + parseInt(cart.price) * cart.quantity;
  }, 0);

  const rule = rules.find((r) => subTotal > r.min);
  const discount = rule ? Math.floor(subTotal * rule.rate) : 0;
  const total = subTotal - discount;

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 md:px-10 lg:px-16 py-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <Link
            href="/"
            className="flex items-center text-gray-600 hover:text-green-600 transition font-medium"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>

          <div className="flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-green-600" />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
              Cart ({cardData.length})
            </h1>
          </div>
        </div>

        {/* Empty State */}
        {cardData.length === 0 ? (
          <motion.div
          initial={{y:30, opacity:0}}
                animate={{y:0, opacity:1}}
                transition={{duration:0.5}}
          className="flex flex-col items-center justify-center text-center py-20">
            <motion.div
            initial={{y:-40, opacity:0}}
                animate={{y:0, opacity:1}}
                transition={{duration:0.5}}
            >
              <ShoppingCart className="w-14 h-14 text-gray-300 mb-4" />
            </motion.div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-700">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-4 text-sm sm:text-base">
              Add some products to get started
            </p>
            <Link href="/">
              <button className="bg-green-600 text-white px-5 py-2 rounded-xl hover:bg-green-700 transition">
                Shop Now
              </button>
            </Link>
          </motion.div>
        ) : (
          <>
            {/* Discount Bar */}
            <motion.div
            initial={{x:300, opacity:0}}
                animate={{x:0, opacity:1}}
                transition={{duration:0.9}}
            className="mt-4 mb-6 bg-green-50 border border-green-100 rounded-xl p-4 hidden md:block">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                <p className="text-sm text-green-700 font-medium">
                  🎉 Discount:{" "}
                  <span className="font-bold">
                    {rule ? `${rule.rate * 100}%` : "0%"}
                  </span>
                </p>
                <span className="text-sm font-bold text-green-600">
                  {discount > 0 ? `-৳${discount}` : "৳0"}
                </span>
              </div>

              <div className="h-2 bg-green-200 rounded-full mt-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${Math.min((subTotal / 100000) * 100, 100)}%`,
                  }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-green-600"
                />
              </div>

              <p className="text-xs text-gray-500 mt-2">
                Spend more to unlock higher discounts 🚀
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-5 p-4 rounded-xl bg-green-50 border border-green-100 md:hidden"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Discount
                </span>

                <span className="text-sm font-bold text-green-600">
                  {discount > 0 ? `-৳${discount}` : "৳0"}
                </span>
              </div>

              <div className="h-2 bg-green-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: rule
                      ? `${Math.min(rule.rate * 100 * 5, 100)}%`
                      : "0%",
                  }}
                  transition={{ duration: 0.6 }}
                  className="h-full bg-green-500"
                />
              </div>

              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>SubTotal: ৳{subTotal}</span>
                <span>Total Saving</span>
              </div>

              {discount > 0 && (
                <p className="text-xs text-green-600 mt-2 font-medium">
                  🎉 You saved ৳{discount} on this order
                </p>
              )}
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* CART ITEMS */}
              <div className="lg:col-span-2 space-y-4">
                <AnimatePresence>
                  {cardData.map((item: IGrocery, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -300 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{duration:0.9, delay:index*0.2}}
                      exit={{ opacity: 0 }}
                      className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border hover:border-none hover:shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      {/* LEFT */}
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-gray-100">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={100}
                            height={100}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div>
                          <h3 className="font-semibold text-base sm:text-lg">
                            {item.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-500">
                            {item.unit}
                          </p>
                          <p className="text-green-600 font-bold mt-1">
                            ৳{item.price}
                          </p>
                        </div>
                      </div>

                      {/* RIGHT */}
                      <div className="flex items-center justify-between sm:justify-end gap-3">
                        <div className="flex items-center border rounded-lg bg-gray-50">
                          <button
                            onClick={() =>
                              item._id && dispatch(DecriseQuantity(item._id))
                            }
                            className="p-2 hover:bg-gray-200 cursor-pointer rounded-l-lg"
                          >
                            <Minus className="w-4 h-4" />
                          </button>

                          <span className="w-8 text-center">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              item._id && dispatch(IncriseQuantity(item._id))
                            }
                            className="p-2 hover:bg-gray-200 cursor-pointer rounded-r-lg"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <button
                          onClick={() =>
                            item._id && dispatch(CartDelete(item._id))
                          }
                          className="text-red-500 hover:bg-red-50 p-2 rounded-full cursor-pointer"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* SUMMARY */}
              <div className="lg:col-span-1">
                <motion.div 
                initial={{y:30, opacity:0}}
                animate={{y:0, opacity:1}}
                transition={{duration:0.5}}
                className="bg-white p-5 rounded-2xl shadow-sm border hover:border-none hover:shadow-xl lg:sticky lg:top-6">
                  <h2 className="text-lg sm:text-xl font-bold mb-5">
                    Order Summary
                  </h2>

                  <div className="space-y-3 text-sm sm:text-base">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>৳{subTotal}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Discount</span>
                      <span className="text-green-600">-৳{discount}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Delivery</span>
                      <span className="text-green-600">Free</span>
                    </div>

                    <div className="border-t pt-3 flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-green-600">৳{total}</span>
                    </div>
                  </div>

                  <button className="w-full mt-5 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 cursor-pointer transition">
                    Checkout
                  </button>

                  <button className="w-full mt-3 text-red-500 text-sm hover:underline cursor-pointer">
                    Clear Cart
                  </button>
                </motion.div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
