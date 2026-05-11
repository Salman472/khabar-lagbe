"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { IOrder } from "@/models/order.model";

import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import ManageOrderSkeleton from "@/components/dashboard/admin/ManageOrderSkeleton";
import ManageOrderCart from "@/components/dashboard/admin/ManageOrderCart";
import { ArrowLeft, PackageCheck } from "lucide-react";
const ManageOrders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);

 
  const router = useRouter();

  useEffect(() => {
    const getOrders = async () => {
      try {
        const result = await axios.get("/api/admin/manage-orders");
        setOrders(result.data);
      } catch (error) {
        console.log("get admin orders error", error);
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, []);



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
          {loading ? (
            <ManageOrderSkeleton />
          ) : orders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className=" p-10 text-center min-h-screen"
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
            orders.map((order, index) => (
              <ManageOrderCart key={index} order={order}/>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageOrders;
