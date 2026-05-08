"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { IOrder } from "@/models/order.model";
import Image from "next/image";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  CreditCard,
  MapPin,
  Package,
  PackageCheck,
  Phone,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import ManageOrderSkeleton from "@/components/home/admin/ManageOrderSkeleton";
const ManageOrders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const deliveryStatus = ["pending", "out of delivery"];
  const router = useRouter();

  useEffect(() => {
    const getOrders = async () => {
      try {
        const result = await axios.get("/api/admin/get-orders");
        setOrders(result.data);
      } catch (error) {
        console.log("get admin orders error", error);
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, []);

  const toggleExpand = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 w-full">
        <div className="max-w-4xl mx-auto h-18 px-4 flex items-center gap-4">
          <button
            onClick={() => router.push("/")}
            className="text-green-600 hover:bg-green-100 hover:rounded-full p-4 cursor-pointer"
          >
            <ArrowLeft size={26} />
          </button>

          <h1 className="text-[30px] font-bold text-[#1e1e1e]">
            Manage Orders
          </h1>
        </div>
      </div>
      <div className="max-w-4xl mx-auto">
        {/* Orders List */}
        <div className="space-y-6">
          {orders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className=" p-10 text-center border border-gray-100 shadow-sm min-h-screen"
            >
              {/* Icon */}
              <div className="w-24 h-24 mx-auto rounded-full bg-green-100 flex items-center justify-center">
                <PackageCheck size={45} className="text-[#0ea44b]" />
              </div>

              {/* Title */}
              <h2 className="text-[28px] font-bold text-gray-800 mt-6">
                No Orders Yet
              </h2>
            </motion.div>
          ) : loading ? (
            <ManageOrderSkeleton />
          ) : (
            orders.map((order, index) => (
              <motion.div
                key={String(order._id)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.09 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                {/* Order Header */}
                <div className="p-5 flex flex-col md:flex-row md:items-start md:justify-between gap-4 border-b">
                  <div>
                    <div className="flex items-center gap-1 text-green-600">
                      <Package />

                      <span className="font-semibold text-lg">
                        Order #{order._id?.toString().slice(-6)}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mt-3">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          order.isPaid
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {order.isPaid ? "Paid" : "Unpaid"}
                      </span>
                    </div>
                    {/* date */}
                    <div className="text-sm text-gray-500 mt-2">
                      {new Date(order.createdAt!).toLocaleString()}
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex flex-col items-end gap-2">
                    <div
                      className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${
                        order.status === "delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "pending"
                            ? "bg-yellow-100 text-red-700"
                            : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
                      {order.status}
                    </div>

                    <select
                      defaultValue={order.status}
                      className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 cursor-pointer"
                    >
                      {deliveryStatus.map((ds) => (
                        <option key={ds} value={ds}>
                          {ds.toUpperCase()}
                        </option>
                      ))}

                      <option value="out of delivery">OUT OF DELIVERY</option>
                      <option value="delevered">DELIVERED</option>
                    </select>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="p-5 space-y-4">
                  <div className=" gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <User size={18} className="text-green-600" />

                      <p className="font-semibold text-lg">
                        {order.address?.fullName || "N/A"}
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      <Phone size={18} className="text-green-600" />

                      <p className="text-gray-500 font-semibold text-lg">
                        {order.address?.mobile || "N/A"}
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      <MapPin size={20} className="text-green-600" />
                      <div className="text-sm text-gray-600">
                        {order.address?.fullAddress || "No address available"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-sm">
                    <CreditCard size={19} className="text-green-600" />
                    <span className="font-medium capitalize">
                      {order.paymentMethod == "cod"
                        ? "Cash On Delivery"
                        : "Online Payment"}
                    </span>
                  </div>
                </div>

                {/* Items Section */}
                <div className="border-t">
                  <button
                    onClick={() => toggleExpand(order._id!.toString())}
                    className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <PackageCheck size={18} className="text-[#0ea44b]" />

                      <span className="text-[17px] font-semibold text-[#3d3d3d]">
                        {expandedOrder
                          ? "Hide Order Items"
                          : `view ${order.items.length} Items`}
                      </span>
                    </div>

                    {expandedOrder ? (
                      <ChevronUp size={20} className="text-[#0ea44b]" />
                    ) : (
                      <ChevronDown size={20} className="text-[#0ea44b]" />
                    )}
                  </button>

                  <AnimatePresence>
                        {expandedOrder && (
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
                              {order.items.map((item, i) => (
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
                                    delay: i * 0.08,
                                  }}
                                  className="bg-[#fafafa] border border-gray-100 rounded-2xl px-4 py-4 flex items-center justify-between"
                                >
                                  <div className="flex items-center gap-4">
                                    <div className="relative w-17.5 h-17.5 bg-white rounded-xl overflow-hidden border border-gray-100">
                                      <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                      />
                                    </div>

                                    <div>
                                      <h3 className="text-[18px] font-semibold text-[#202020]">
                                        {item.name}
                                      </h3>

                                      <p className="text-[15px] text-[#7a7a7a] mt-1">
                                        {item.quantity} x {item.unit}
                                      </p>
                                    </div>
                                  </div>

                                  <h2 className="text-[24px] font-bold text-[#2b2b2b]">
                                    ৳{Number(item.price) * item.quantity}
                                  </h2>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                </div>

                {/* Footer */}
                <div className="px-5 py-4 border-t bg-gray-50 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-emerald-600">
                    🚚{" "}
                    <span className="font-medium">
                      Delivery: {order.status}
                    </span>
                  </div>
                  <div className="font-semibold text-xl flex items-center gap-1">
                    Total: <span className="text-lg font-black">৳</span>
                    {order.totalAmount}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageOrders;
