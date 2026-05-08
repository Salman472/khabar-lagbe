"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { IOrder } from "@/models/order.model";
import Image from "next/image";
import { ArrowLeft, PackageCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import {motion} from 'motion/react'
import ManageOrderSkeleton from "@/components/home/admin/ManageOrderSkeleton";
const ManageOrders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const router=useRouter()

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

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }) +
      " " +
      date.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    );
  };

  

  return (
    <div className="min-h-screen bg-gray-50">
        {/* Header */}
       <div className="sticky top-0 z-50 bg-white border-b border-gray-200 w-full">
        <div className="max-w-4xl mx-auto h-18 px-4 flex items-center gap-4">
          <button
            onClick={() => router.push('/')}
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
          ) : (
            loading ? <ManageOrderSkeleton/> : 
            orders.map((order,index) => (
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
                    <div className="flex items-center gap-2">
                      <span className="text-green-600">✅</span>
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
                      <span className="text-sm text-gray-500">
                        {formatDate(order.createdAt!)}
                      </span>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex flex-col items-end gap-2">
                    <div className="px-4 py-1.5 text-sm font-medium bg-yellow-100 text-yellow-700 rounded-full flex items-center gap-1">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
                      {order.status.toUpperCase()}
                    </div>

                    <select
                      defaultValue={order.status}
                      className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 cursor-pointer"
                    >
                      <option value="pending">PENDING</option>
                      <option value="out of delivery">OUT OF DELIVERY</option>
                      <option value="delevered">DELIVERED</option>
                    </select>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="p-5 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-start gap-3">
                      <span className="text-gray-400 mt-0.5">👤</span>
                      <div>
                        <p className="font-medium">
                          {order.address?.fullName || "N/A"}
                        </p>
                        <p className="text-gray-500">
                          {order.address?.mobile || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="text-gray-400 mt-0.5">📍</span>
                      <div className="text-sm text-gray-600">
                        {order.address?.fullAddress || "No address available"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-gray-400">💳</span>
                    <span className="font-medium capitalize">
                      {order.paymentMethod} Payment
                    </span>
                  </div>
                </div>

                {/* Items Section */}
                <div className="border-t">
                  <button
                    onClick={() => toggleExpand(order._id!.toString())}
                    className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2 text-emerald-600 font-medium">
                      <span>🛍️</span>
                      <span>View {order.items.length} Items</span>
                    </div>
                    <span
                      className={`transition-transform duration-200 ${
                        expandedOrder === order._id?.toString() ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>

                  {expandedOrder === order._id?.toString() && (
                    <div className="px-5 pb-5 pt-2 border-t bg-gray-50 space-y-3">
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="bg-white p-4 rounded-xl flex justify-between items-center border border-gray-100"
                        >
                          <div className="flex items-center gap-3">
                            {item.image && (
                              <Image
                              height={20}
                              width={20}
                                src={item.image}
                                alt={item.name}
                                className="w-12 h-12 object-cover rounded-lg"
                              />
                            )}
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-gray-500">
                                {item.quantity} {item.unit}
                              </p>
                            </div>
                          </div>
                          <p className="font-semibold text-lg">
                            ₹{Number(item.price).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="px-5 py-4 border-t bg-gray-50 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-emerald-600">
                    🚚 <span className="font-medium">Delivery: {order.status}</span>
                  </div>
                  <div className="font-semibold text-xl flex items-center gap-1">
                    Total: <span className="text-lg font-black">৳</span>{order.totalAmount}
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