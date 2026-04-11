import Image from 'next/image';
import React from 'react';
import GoogleImage from '@/assets/google.png'
const GoogleLogin = () => {
    return (
        <div>
            <button className="flex items-center justify-center gap-3 w-full border border-gray-300 rounded-xl py-3 px-4 hover:bg-gray-100 transition-all duration-200">
      
      <Image 
        src={GoogleImage}
        alt="google"
        width={20}
        height={20}
      />

      <span className="text-sm font-medium text-gray-700">
        Continue with Google
      </span>
    </button>
        </div>
    );
};

export default GoogleLogin;