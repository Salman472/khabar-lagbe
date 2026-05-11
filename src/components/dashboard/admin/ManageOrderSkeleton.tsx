
import React from 'react';

const ManageOrderSkeleton = () => {
    return (
         <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="h-8 w-40 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>

        <div className="space-y-6">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse"
            >
              <div className="p-5 flex justify-between">
                <div className="space-y-3">
                  <div className="h-6 w-40 bg-gray-200 rounded"></div>
                  <div className="h-5 w-52 bg-gray-200 rounded"></div>
                </div>
                <div className="h-9 w-28 bg-gray-200 rounded-full"></div>
              </div>

              <div className="p-5 space-y-5">
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex gap-3">
                    <div className="w-5 h-5 bg-gray-200 rounded"></div>
                    <div className="space-y-2 flex-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-5 h-5 bg-gray-200 rounded"></div>
                    <div className="h-12 bg-gray-200 rounded flex-1"></div>
                  </div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-40"></div>
              </div>

              <div className="h-14 border-t bg-gray-50"></div>
              <div className="h-16 border-t bg-gray-50"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
    );
};

export default ManageOrderSkeleton;