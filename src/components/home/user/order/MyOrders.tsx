"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  CreditCard,
  MapPin,
  PackageCheck,
} from "lucide-react";
import { IOrder } from "@/models/order.model";



export default function MyOrdersPage() {
  const router = useRouter();

  const [orders, setOrders] = useState<IOrder[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    const getMyOrders = async () => {
      try {
        const result = await axios.get(
          "/api/user/my-orders"
        );

        setOrders(result.data);
      } catch (error) {
        console.log("get orders error:", error);
      }
    };

    getMyOrders();
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto h-18 px-4 flex items-center gap-4">
          <button
            onClick={() => router.push('/')}
            className="text-green-600 hover:bg-green-100 hover:rounded-full p-4"
          >
            <ArrowLeft size={26} />
          </button>

          <h1 className="text-[30px] font-bold text-[#1e1e1e]">
            My Orders
          </h1>
        </div>
      </div>

      {/* Orders */}
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {orders.map((order, index) => {
          const isOpen = openId === String(order._id);

          return (
            <motion.div
              key={String(order._id)}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="bg-white rounded-[26px] overflow-hidden border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.04)]"
            >
              {/* Top */}
              <div className="bg-[#f3fff4] px-6 py-5 flex items-start justify-between">
                <div>
                  <h2 className="text-[20px] font-bold text-[#1d1d1d]">
                    order{" "}
                    <span className="text-[#0ea44b]">
                      #
                      {String(order._id).slice(
                        -6
                      )}
                    </span>
                  </h2>

                  <p className="text-[14px] text-[#6b6b6b] mt-1">
                    {order.createdAt
                      ? new Date(
                          order.createdAt
                        ).toLocaleString()
                      : ""}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {/* Payment */}
                  <div
                    className={`px-4 h-9 rounded-full text-[14px] font-semibold flex items-center justify-center border ${
                      order.isPaid
                        ? "bg-green-100 text-green-700 border-green-200"
                        : "bg-[#ffe8e8] text-[#e53935] border-[#ffd2d2]"
                    }`}
                  >
                    {order.isPaid
                      ? "Paid"
                      : "Unpaid"}
                  </div>

                  {/* Status */}
                  <div className="px-4 h-9 rounded-full text-[14px] font-semibold flex items-center justify-center border bg-[#fff6d8] text-[#a67c00] border-[#f3e2a0] capitalize">
                    {order.status}
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="px-6 py-5">
                {/* Payment Method */}
                <div className="flex items-center gap-3">
                  <CreditCard
                    size={18}
                    className="text-[#0ea44b]"
                  />

                  <p className="text-[17px] text-[#3c3c3c] font-medium">
                    {order.paymentMethod ===
                    "online"
                      ? "Online Payment"
                      : "Cash On Delivery"}
                  </p>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3 mt-5">
                  <MapPin
                    size={18}
                    className="text-[#0ea44b] mt-0.5"
                  />

                  <p className="text-[16px] text-[#5f5f5f] leading-6.5">
                    {order.address.fullAddress},{" "}
                    {order.address.city},{" "}
                    {order.address.state},{" "}
                    {order.address.pinCode}
                  </p>
                </div>

                {/* Divider */}
                <div className="w-full h-1px bg-gray-200 my-5" />

                {/* Toggle */}
                <button
                  onClick={() =>
                    setOpenId(
                      isOpen
                        ? null
                        : String(order._id)
                    )
                  }
                  className="w-full flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <PackageCheck
                      size={18}
                      className="text-[#0ea44b]"
                    />

                    <span className="text-[17px] font-semibold text-[#3d3d3d]">
                      {isOpen
                        ? "Hide Order Items"
                        : `view ${order.items.length} Items`}
                    </span>
                  </div>

                  {isOpen ? (
                    <ChevronUp
                      size={20}
                      className="text-[#0ea44b]"
                    />
                  ) : (
                    <ChevronDown
                      size={20}
                      className="text-[#0ea44b]"
                    />
                  )}
                </button>

                {/* Items */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        height: 0,
                      }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                      }}
                      exit={{
                        opacity: 0,
                        height: 0,
                      }}
                      transition={{
                        duration: 0.35,
                      }}
                      className="overflow-hidden"
                    >
                      <div className="mt-5 space-y-4">
                        {order.items.map(
                          (item, i) => (
                            <motion.div
                              key={i}
                              initial={{
                                opacity: 0,
                                y: 10,
                              }}
                              animate={{
                                opacity: 1,
                                y: 0,
                              }}
                              transition={{
                                delay:
                                  i * 0.08,
                              }}
                              className="bg-[#fafafa] border border-gray-100 rounded-2xl px-4 py-4 flex items-center justify-between"
                            >
                              <div className="flex items-center gap-4">
                                <div className="relative w-17.5 h-17.5 bg-white rounded-xl overflow-hidden border border-gray-100">
                                  <Image
                                    src={item.image}
                                    alt={
                                      item.name
                                    }
                                    fill
                                    className="object-cover"
                                  />
                                </div>

                                <div>
                                  <h3 className="text-[18px] font-semibold text-[#202020]">
                                    {item.name}
                                  </h3>

                                  <p className="text-[15px] text-[#7a7a7a] mt-1">
                                    {
                                      item.quantity
                                    }{" "}
                                    x {item.unit}
                                  </p>
                                </div>
                              </div>

                              <h2 className="text-[24px] font-bold text-[#2b2b2b]">
                                ৳
                                {Number(
                                  item.price
                                ) *
                                  item.quantity}
                              </h2>
                            </motion.div>
                          )
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Bottom */}
                <div className="border-t border-gray-200 mt-5 pt-5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <PackageCheck
                      size={18}
                      className="text-[#0ea44b]"
                    />

                    <p className="text-[18px] font-semibold text-[#4b4b4b]">
                      Delivery:{" "}
                      <span className="text-[#0ea44b] capitalize">
                        {order.status}
                      </span>
                    </p>
                  </div>

                  <h2 className="text-[24px] font-bold text-[#202020]">
                    Total:{" "}
                    <span className="text-[#0ea44b]">
                      ৳{order.totalAmount}
                    </span>
                  </h2>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}