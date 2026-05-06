"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Box } from "lucide-react";

export default function OrderSuccess() {
  const [visible, setVisible] = useState({
    check: false,
    content: false,
    box: false,
    button: false,
  });

  useEffect(() => {
    const timers = [
      setTimeout(() => setVisible((v) => ({ ...v, check: true })), 100),
      setTimeout(() => setVisible((v) => ({ ...v, content: true })), 500),
      setTimeout(() => setVisible((v) => ({ ...v, box: true })), 800),
      setTimeout(() => setVisible((v) => ({ ...v, button: true })), 1000),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#f0faf4]">
      
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-125 h-125 bg-green-200/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-100 h-100 bg-emerald-300/30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center px-6 py-12 max-w-lg w-full">

        {/* Check Icon */}
        <div
          className={`mb-8 transition-all duration-700 ${
            visible.check ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
        >
          <div className="relative w-24 h-24 mx-auto rounded-full border-4 border-green-500 flex items-center justify-center bg-white shadow-lg">
            <svg viewBox="0 0 52 52" className="w-12 h-12">
              <path
                d="M14 27l8 8 16-16"
                stroke="#16a34a"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  strokeDasharray: 40,
                  strokeDashoffset: visible.check ? 0 : 40,
                  transition: "stroke-dashoffset 0.6s ease",
                }}
              />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div
          className={`transition-all duration-500 ${
            visible.content ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h1 className="text-2xl font-bold text-green-700 mb-3">
            Order Placed Successfully
          </h1>
          <p className="text-gray-500 text-sm">
            Your order is confirmed and being processed. Track it from{" "}
            <Link href="/user/my-orders" className="text-green-600 underline font-medium">
              My Orders
            </Link>
          </p>
        </div>

        {/* Box Icon */}
        <div
          className={`my-8 transition-all duration-500 ${
            visible.box ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center justify-center text-green-500 mx-auto animate-bounce ">
            <Box className="h-16 w-16"/>
          </div>
        </div>

        {/* Button */}
        <div
          className={`transition-all duration-500 ${
            visible.button ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <Link
            href="/user/my-orders"
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow-md transition"
          >
            Go to My Orders →
          </Link>
        </div>
      </div>
    </div>
  );
}