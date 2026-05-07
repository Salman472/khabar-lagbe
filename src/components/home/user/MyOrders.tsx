'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface OrderItem {
  id: string;
  name: string;
  quantity: string;
  price: number;
  
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  time: string;
  status: {
    unpaid: boolean;
    pending: boolean;
  };
  paymentMethod: string;
  address: string;
  items: OrderItem[];
  deliveryStatus: string;
  total: number;
}

const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: '#a06518',
    date: '05/12/2025',
    time: '12:21:08',
    status: { unpaid: true, pending: true },
    paymentMethod: 'Online Payment',
    address: 'Railway Colony, Jhansi, Uttar Pradesh, 284003, India',
    items: [
      {
        id: 'item1',
        name: 'Aashirwad Aata 10kg',
        quantity: '2 x pack',
        price: 800
      },
    ],
    deliveryStatus: 'pending',
    total: 800,
  },
  {
    id: '2',
    orderNumber: '#a06535',
    date: '05/12/2025',
    time: '12:23:41',
    status: { unpaid: true, pending: true },
    paymentMethod: 'Online Payment',
    address: 'Railway Colony, Jhansi, Uttar Pradesh, 284003, India',
    items: [
      {
        id: 'item2',
        name: 'Some Product Name',
        quantity: '1 x pack',
        price: 400,
        
      },
    ],
    deliveryStatus: 'pending',
    total: 400,
  },
];

export default function MyOrders() {
  const [expandedOrders, setExpandedOrders] = useState<Record<string, boolean>>({});

  const toggleOrder = (orderId: string) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            ←
          </button>
          <h1 className="text-xl font-semibold text-gray-900">My Orders</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-6 space-y-6">
        {mockOrders.map((order) => {
          const isExpanded = expandedOrders[order.id] ?? true; // default expanded like first order in screenshot

          return (
            <div
              key={order.id}
              className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100"
            >
              {/* Order Header */}
              <div className="p-4 border-b">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-lg text-emerald-700">
                      order {order.orderNumber}
                    </p>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {order.date}, {order.time}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {order.status.unpaid && (
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-pink-100 text-pink-700">
                        Unpaid
                      </span>
                    )}
                    {order.status.pending && (
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700">
                        pending
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-4">
                {/* Payment Method */}
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="text-xl">💳</span>
                  <span className="font-medium">{order.paymentMethod}</span>
                </div>

                {/* Address */}
                <div className="flex items-start gap-2 text-gray-700">
                  <span className="text-xl mt-0.5">📍</span>
                  <p className="text-sm leading-tight">{order.address}</p>
                </div>

                {/* Items Section */}
                <div className="pt-2">
                  <button
                    onClick={() => toggleOrder(order.id)}
                    className="flex items-center justify-between w-full text-left hover:bg-gray-50 -mx-4 px-4 py-2 rounded-xl group"
                  >
                    <div className="flex items-center gap-2 font-medium text-emerald-700">
                      <span className="text-xl">📦</span>
                      {isExpanded ? 'Hide Order Items' : `View ${order.items.length} Item${order.items.length > 1 ? 's' : ''}`}
                    </div>
                    <span className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </button>

                  {/* Items List */}
                  {isExpanded && (
                    <div className="mt-3 space-y-3">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex gap-3 bg-gray-50 p-3 rounded-xl">
                          <div className="relative w-14 h-14 bg-white rounded-lg overflow-hidden border shrink-0">
                            
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 leading-tight">{item.name}</p>
                            <p className="text-sm text-gray-500 mt-1">{item.quantity}</p>
                          </div>
                          <div className="text-right font-semibold text-gray-900">
                            ₹{item.price}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Delivery Status & Total */}
                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="flex items-center gap-2 text-emerald-600">
                    <span className="text-xl">🚚</span>
                    <span className="font-medium">Delivery: {order.deliveryStatus}</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 text-right">Total</p>
                    <p className="text-xl font-semibold text-gray-900">₹{order.total}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}