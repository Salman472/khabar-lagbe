"use client";

import { ArrowLeft, Loader2, PlusCircle, Upload } from "lucide-react";
import Link from "next/link";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import axios from "axios";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";

const AddGrocery = () => {
  const categories = [
    "Dairy & Eggs",
    "Rice, Atta & Grains",
    "Snacks & Biscuits",
    "Spices & Masalas",
    "Beverages & Drinks",
    "Personal Care",
    "Household Essentials",
    "Instant & Packaged Food",
    "Baby & Pet Care",
  ];

  const units = ["kg", "g", "liter", "ml", "piece", "pack"];

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [unit, setUnit] = useState("");
  const [price, setPrice] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>();
  const [backendImage, setBackendImage] = useState<File | null>();
  const [loading, setLoading] = useState(false);
  const router=useRouter()
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    if (!files || files.length == 0) {
      return;
    }

    const file = files[0];
    setBackendImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit=async(e:FormEvent)=>{
    e.preventDefault()
    try {
      setLoading(true)
      const formData=new FormData()
      formData.append('name', name)
      formData.append('category', category)
      formData.append('unit', unit)
      formData.append('price', price)
      if(backendImage){
        formData.append('image', backendImage)
      }
      const result=await axios.post('/api/admin/add-grocery', formData)
      console.log(result);
      if(result.statusText == 'OK'){
        alert('grocery add successful.')
        setLoading(false)
        router.push('/')
      }
      
    } catch (error) {
      console.log(error);
      setLoading(false)
    }

}
  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-gray-100 flex flex-col items-center px-4 py-6 sm:py-10">
      {/* Back Button */}
      <Link
        href="/"
        className="self-start sm:absolute sm:top-6 sm:left-6 flex items-center gap-2 text-green-600 font-medium bg-white px-3 py-2 sm:px-4 rounded-full shadow hover:shadow-md transition"
      >
        <ArrowLeft size={18} />
        <span className="text-sm sm:text-base">Back</span>
      </Link>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-5 sm:p-8 mt-6 sm:mt-0"
      >
        {/* Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="flex justify-center">
            <div className="bg-green-100 p-3 rounded-full">
              <PlusCircle className="text-green-600" />
            </div>
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Add Grocery Item
          </h2>
          <p className="text-sm text-gray-500">
            Fill the form to add a new item
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Grocery Name *
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              name="name"
              type="text"
              placeholder="e.g. Milk, Rice"
              className="mt-1 w-full  rounded-lg px-3 py-2 outline focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Category + Unit */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Category *
              </label>
              <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                name="category"
                className="mt-1 w-full  rounded-lg px-3 py-2 outline focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Unit *
              </label>
              <select
                onChange={(e) => setUnit(e.target.value)}
                value={unit}
                name="unit"
                className="mt-1 w-full  rounded-lg px-3 py-2 outline focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              >
                <option value="">Select Unit</option>
                {units.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="text-sm font-medium text-gray-700">Price *</label>
            <input
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              name="price"
              type="number"
              placeholder="e.g. 120"
              className="mt-1 w-full  rounded-lg px-3 py-2 outline focus:ring-2 focus:ring-green-500 focus:outline-none "
              required
            />
          </div>

          {/* Upload */}
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center">
            <label
              htmlFor="imageUpload"
              className="w-full sm:w-auto flex items-center justify-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg hover:bg-green-100 transition cursor-pointer"
            >
              <Upload size={16} />
              Upload Image
            </label>

            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
            {previewImage && (
              <Image
                src={previewImage}
                alt="preview image"
                width={100}
                height={100}
                className="rounded-xl shadow-md border border-gray-300 object-cover p-2"
              />
            )}
          </div>

          {/* Submit */}

          <button
            type="submit"
            className="w-full bg-linear-to-r from-green-500 to-green-600 text-white font-semibold py-3 rounded-lg shadow hover:from-green-600 hover:to-green-700 transition disabled:opacity-60 inline-flex justify-center items-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                {" "}
                <Loader2 className="h-5 w-5 animate-spin" />{" "}
                <span>Add Grocery</span>
              </>
            ) : (
              "Add Grocery"
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddGrocery;
