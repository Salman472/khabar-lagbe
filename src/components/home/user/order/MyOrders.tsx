'use client';

import { IOrder } from '@/models/order.model';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react';







export default function MyOrders() {
  // const [expandedOrders, setExpandedOrders] = useState<Record<string, boolean>>({});

  // const toggleOrder = (orderId: string) => {
  //   setExpandedOrders(prev => ({
  //     ...prev,
  //     [orderId]: !prev[orderId]
  //   }));
  // };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft/>
          </button>
          <h1 className="text-xl font-semibold text-gray-900">My Orders</h1>
        </div>
      </div>

      <div>

      </div>
    </div>
  );
}