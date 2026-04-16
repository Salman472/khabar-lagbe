"use client"

import { ArrowLeft, PlusCircle, Upload } from "lucide-react";
import Link from "next/link";
import React from "react";
import {  motion } from "motion/react";
const AddGroceryForm = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-gray-100 flex items-center justify-center px-4">
      
      {/* Back button */}
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-green-600 font-medium bg-white px-4 py-2 rounded-full shadow hover:shadow-md transition"
      >
        <ArrowLeft size={18} />
        Back to home
      </Link>

      {/* Card */}
      <motion.div
      initial={{opacity:0, y:10}}
      animate={{opacity:1, y:0}}
      transition={{duration:0.5}}
      className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 space-y-5">
        
        {/* Header */}
        <div className="text-center space-y-1">
          <div className="flex justify-center">
            <div className="bg-green-100 p-2 rounded-full">
              <PlusCircle className="text-green-600" />
            </div>
          </div>
          <h2 className="text-lg font-semibold text-gray-800">
            Add Your Grocery
          </h2>
          <p className="text-sm text-gray-500">
            Fill out the details below to add a new grocery item.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4">
          
          {/* Grocery Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Grocery Name *
            </label>
            <input
              type="text"
              placeholder="eg: sweets, Milk..."
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Category + Unit */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Category *
              </label>
              <select className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-500">
                <option>Select Category</option>
                <option>Fruits</option>
                <option>Vegetables</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Unit *
              </label>
              <select className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-500">
                <option>Select Unit</option>
                <option>kg</option>
                <option>pcs</option>
              </select>
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Price *
            </label>
            <input
              type="number"
              placeholder="eg: 120"
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Upload */}
          <div>
            <button
              type="button"
              className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg hover:bg-green-100 transition"
            >
              <Upload size={16} />
              Upload image
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-linear-to-r from-green-500 to-green-600 text-white font-semibold py-2.5 rounded-lg shadow hover:shadow-md hover:from-green-600 hover:to-green-700 transition"
          >
            Add Grocery
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddGroceryForm;