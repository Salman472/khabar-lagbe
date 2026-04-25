"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { MapPin, Phone, User, CreditCard, Truck, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const [payment, setPayment] = useState<"online" | "cod">("cod");

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <Link
                    href="/user/cart"
                    className="flex items-center text-gray-600 hover:text-green-600 transition font-medium"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Cart
                  </Link>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl md:text-3xl font-bold text-center text-green-600 mb-6"
      >
        Checkout
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {/* LEFT - ADDRESS */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow p-5 space-y-4"
        >
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <MapPin size={18} /> Delivery Address
          </h2>

          <Input icon={<User size={16} />} placeholder="Your Name" />
          <Input icon={<Phone size={16} />} placeholder="Phone Number" />
          <Input icon={<MapPin size={16} />} placeholder="Full Address" />

          <div className="grid grid-cols-3 gap-2">
            <Input placeholder="City" />
            <Input placeholder="State" />
            <Input placeholder="ZIP" />
          </div>

          <div className="flex gap-2">
            <input
              className="flex-1 border rounded-lg px-3 py-2 outline-none"
              placeholder="Search city or area..."
            />
            <button className="bg-green-600 text-white px-4 rounded-lg">
              Search
            </button>
          </div>
        </motion.div>

        {/* RIGHT - PAYMENT */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow p-5 space-y-4"
        >
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <CreditCard size={18} /> Payment Method
          </h2>

          <PaymentOption
            active={payment === "online"}
            onClick={() => setPayment("online")}
            icon={<CreditCard size={16} />}
            label="Pay Online (Stripe)"
          />

          <PaymentOption
            active={payment === "cod"}
            onClick={() => setPayment("cod")}
            icon={<Truck size={16} />}
            label="Cash on Delivery"
          />

          <div className="border-t pt-4 text-sm space-y-2">
            <Row label="Subtotal" value="৳ 279" />
            <Row label="Delivery Fee" value="৳ 0" />
            <Row label="Total" value="৳ 279" bold />
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            className="w-full bg-green-600 text-white py-3 rounded-full font-medium"
          >
            Place Order
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

// Reusable Input
function Input({ icon, placeholder }: any) {
  return (
    <div className="flex items-center border rounded-lg px-3 py-2 gap-2">
      {icon}
      <input
        placeholder={placeholder}
        className="flex-1 outline-none text-sm"
      />
    </div>
  );
}

// Payment Option
function PaymentOption({ active, onClick, icon, label }: any) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      className={`flex items-center gap-2 border rounded-xl px-4 py-3 cursor-pointer transition ${
        active ? "border-green-600 bg-green-50" : ""
      }`}
    >
      {icon}
      <span className="text-sm">{label}</span>
    </motion.div>
  );
}

// Price Row
function Row({ label, value, bold }: any) {
  return (
    <div className="flex justify-between">
      <span className={bold ? "font-semibold" : "text-gray-500"}>
        {label}
      </span>
      <span className={bold ? "font-semibold text-green-600" : ""}>
        {value}
      </span>
    </div>
  );
}
