"use client"
import {
  ArrowLeft,
  EyeIcon,
  EyeOff,
  Loader2,
  Lock,
  LogIn,
  Mail,
 
} from "lucide-react";
import React, { FormEvent, useState } from "react";
import { motion } from "motion/react";
import GoogleLogin from "@/components/socialLogin/GoogleLogin";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]=useState(false)
  const router=useRouter()
  const session=useSession()
  console.log(session.data?.user);
  const handleLogin=async(e:FormEvent)=>{
    e.preventDefault()
    setLoading(true)
    try {
        const res=await signIn('credentials',{email,password, redirect:false})
        if(res?.ok){

          router.push('/')
          setLoading(false)
        }
        else{
          console.log(res.error);
        }
    } catch (error) {
        console.log(error);
        setLoading(false)
    }
  }
  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-6 py-10 relative bg-white">
      
      <motion.h1
        initial={{
          opacity: 0,
          y: -30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="text-4xl font-black text-green-700 mb-2"
      >
        Welcome Back
      </motion.h1>
      <motion.p
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
          delay: 0.2,
        }}
        className="text-gray-600 mb-7"
      >
        Login To Khabar Lagbe
      </motion.p>
      {/* form input */}

      <motion.form
        onSubmit={handleLogin}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 1,
        }}
        className="flex flex-col gap-5 w-full max-w-sm"
      >
       
        {/* email input */}
        <div className="relative">
          <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 cursor-pointer" />
          <input
            type="email"
            placeholder="Your Mail"
            className="w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:ring-2 focus:ring-green-500 focus: outline-none"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        {/* password input */}
        <div className="relative">
          <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 cursor-pointer" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Your Password"
            className="w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:ring-2 focus:ring-green-500 focus: outline-none"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {showPassword ? (
            <EyeOff
              onClick={() => setShowPassword(false)}
              className="absolute right-3 top-3.5 h-5 w-5 text-gray-400 cursor-pointer"
            />
          ) : (
            <EyeIcon
              onClick={() => setShowPassword(true)}
              className="absolute right-3 top-3.5 h-5 w-5 text-gray-400 cursor-pointer"
            />
          )}
        </div>
        {/* form validation */}
        {(() => {
          const formValidation =email !== "" && password !== "";
          return (
            <button
              disabled={!formValidation || loading}
              className={`w-full font-semibold py-3 rounded-xl transition-all duration-200 shadow-md inline-flex justify-center items-center gap-2 ${
                formValidation
                  ? "bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
                {loading?<><Loader2 className="h-5 w-5 animate-spin"/><span>Login</span></> : "Login"}
              
            </button>
          );
        })()}

        {/* devider line */}
        <div className="flex items-center text-gray-300 text-sm mt-2 gap-1">
          <span className="flex-1 h-px bg-gray-200"></span>
          OR
          <span className="flex-1 h-px bg-gray-200"></span>
        </div>
        {/* continue with google */}
        <GoogleLogin />
        <p className="text-sm text-gray-600 text-center mt-4 flex items-center justify-center gap-2 cursor-pointer">
          <span>went to create an account?</span>

          <span onClick={()=>router.push('/register')} className="flex items-center gap-1 text-blue-600  hover:underline">
            <LogIn size={16} />
            Sign up
          </span>
        </p>
      </motion.form>
    </div>
  );
};

export default LoginForm;
