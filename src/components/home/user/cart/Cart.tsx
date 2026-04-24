"use client";

import React, { useState } from "react";
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

export default function ShoppingCartPage() {
  const { cardData } = useSelector((state: RootState) => state.card);
  const dispatch = useDispatch<AppDispatch>();
 
const subTotal=cardData.reduce((acc,cart)=>{
  return acc + parseInt(cart.price)*cart.quantity
},0)

const discount=subTotal*0.01

console.log(subTotal,discount);
  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <Link
          href={"/"}
          className="flex items-center text-gray-600 hover:text-green-600 mb-6 transition-colors font-medium"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Home
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <ShoppingCart className="w-8 h-8 text-green-600" />
          <h1 className="text-3xl font-bold text-gray-800">
            Your Shopping Cart {cardData.length}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {cardData.map((item: IGrocery, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center font-bold text-gray-400">
                      <Image
                        src={item.image}
                        alt={item.name}
                        height={160}
                        width={160}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.unit}</p>
                      <p className="font-bold text-green-600 mt-1 text-lg">
                        <span className="text-lg mr-1 font-black">৳</span>
                        {item.price}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                      <button
                        onClick={() => {
                          if (item._id) {
                            dispatch(DecriseQuantity(item._id));
                          }
                        }}
                        className="p-2 hover:bg-gray-200 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => {
                          if (item._id) {
                            dispatch(IncriseQuantity(item._id));
                          }
                        }}
                        className="p-2 hover:bg-gray-200 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        if (item._id) {
                          dispatch(CartDelete(item._id));
                        }
                      }}
                      className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-6"
            >
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">
                    <span className="text-md mr-1 font-black">৳</span>{subTotal}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="border-t pt-4 flex justify-between items-center">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-bold text-green-600">
                    <span className="text-2xl mr-1 font-black">৳</span>{subTotal}
                  </span>
                </div>
              </div>

              <button className="w-full bg-green-600 text-white py-3.5 rounded-xl font-semibold hover:bg-green-700 transition-all transform active:scale-95 shadow-md">
                Proceed to Checkout
              </button>

              <button className="w-full mt-4 text-red-500 font-medium hover:underline">
                Clear Cart
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
