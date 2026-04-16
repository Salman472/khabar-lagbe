"use client";

import { Lock, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const Unauthorized = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center bg-white shadow-xl rounded-2xl p-8">
        
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 p-4 rounded-full">
            <Lock className="w-10 h-10 text-red-500" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Unauthorized Access
        </h1>

        {/* Description */}
        <p className="text-gray-500 mb-6">
          You don’t have permission to view this page. Please login or go back.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition cursor-pointer" 
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>

          <button
            onClick={() => router.push("/login")}
            className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition cursor-pointer"
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;