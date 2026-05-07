'use client';

export default function OrderCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 animate-pulse max-w-4xl mx-auto px-4 py-6 mt-4 space-y-6 h-screen ">
      {/* Order Header */}
      <div className="p-4 border-b flex justify-between items-start">
        <div className="space-y-2">
          <div className="h-5 w-32 bg-gray-200 rounded"></div>
          <div className="h-4 w-40 bg-gray-200 rounded"></div>
        </div>
        <div className="flex gap-2">
          <div className="h-6 w-16 bg-pink-100 rounded-full"></div>
          <div className="h-6 w-16 bg-yellow-100 rounded-full"></div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-5">
        {/* Payment Method */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-gray-200 rounded"></div>
          <div className="h-4 w-36 bg-gray-200 rounded"></div>
        </div>

        {/* Address */}
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 bg-gray-200 rounded mt-0.5"></div>
          <div className="space-y-1.5 flex-1">
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-4/5 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Items Section */}
        <div className="pt-2">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-200 rounded"></div>
              <div className="h-5 w-36 bg-gray-200 rounded"></div>
            </div>
            <div className="w-4 h-4 bg-gray-200 rounded"></div>
          </div>

          {/* Skeleton Item */}
          <div className="flex gap-3 bg-gray-50 p-3 rounded-xl">
            <div className="w-14 h-14 bg-gray-200 rounded-lg shrink-0"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div className="h-5 w-12 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Delivery & Total */}
        <div className="flex justify-between items-center pt-4 border-t">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-gray-200 rounded"></div>
            <div className="h-4 w-28 bg-gray-200 rounded"></div>
          </div>
          <div className="text-right">
            <div className="h-3 w-10 bg-gray-200 rounded mx-auto"></div>
            <div className="h-7 w-16 bg-gray-200 rounded mt-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
}