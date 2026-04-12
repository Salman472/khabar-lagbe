import Image from "next/image";
import React, { FormEvent, useState } from "react";
import GoogleImage from "@/assets/google.png";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";
const GoogleLogin = () => {
  const [loading,setLoading]=useState(false)
  const hangleGoogleButton=async(e:FormEvent)=>{
    setLoading(true)
    try {
      await signIn('google',{callbackUrl:'/'})
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }
  return (
    <div>
      <button
      type="button"
        onClick={hangleGoogleButton}
        className="flex items-center justify-center gap-3 w-full border border-gray-300 rounded-xl py-3 px-4 hover:bg-gray-100 transition-all duration-200"
      >
        

        {/* <span className="text-sm font-medium text-gray-700"> */}
          
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
             <Image src={GoogleImage} alt="google" width={20} height={20} />
              <span>Continue with Google</span>
            </>
          ) : (
            <>
             <Image src={GoogleImage} alt="google" width={20} height={20} />
            <span>Continue with Google</span>
            </>
          )}
        {/* </span> */}
      </button>
    </div>
  );
};

export default GoogleLogin;
