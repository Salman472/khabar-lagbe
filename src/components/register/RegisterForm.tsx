import { ArrowLeft, EyeIcon, EyeOff, Lock, Mail, User } from 'lucide-react';
import React, { useState } from 'react';
import { motion } from "motion/react";
type propType={
    prebStep:(s:number)=>void
}
const RegisterForm = ({prebStep}:propType) => {
    const [name, setName]=useState("")
    const [email, setEmail]=useState("")
    const [password, setPassword]=useState("")
    const [showPassword, setShowPassword]=useState(false)
    return (
        <div className='flex flex-col justify-center items-center min-h-screen px-6 py-10 relative bg-white'>
            <div
            onClick={()=>prebStep(1)}
            className='absolute top-6 left-6 flex items-center gap-1 transition-colors cursor-pointer text-green-700 hover:text-green-800'>
                <ArrowLeft className='h-5 w-5'/>
                <span className='font-medium'>Back</span>
            </div>
            <motion.h1
            initial={{
                opacity:0,
                y:-30
            }}
            animate={{
                opacity:1,
                y:0
            }}
            transition={{
                duration:0.6
            }}
            className='text-4xl font-black text-green-700 mb-2'
            >
                Create Account
            </motion.h1>
            <motion.p
            initial={{
                opacity:0,
                y:10
            }}
            animate={{
                opacity:1,
                y:0
            }}
            transition={{
                duration:0.6,
                delay:0.2
            }}
            className='text-gray-600 mb-7'>

                Join Khabar Lagbe
            </motion.p>
            {/* form input */}

            <motion.form
             initial={{
                opacity:0,
                
            }}
            animate={{
                opacity:1,
        
            }}
            transition={{
                duration:0.6
            }}
            className='flex flex-col gap-5 w-full max-w-sm'
            >
                {/* name input */}
                <div className='relative'>
                    <User className='absolute left-3 top-3.5 h-5 w-5 text-gray-400 cursor-pointer'/>
                    <input type="text" placeholder='Your Name' className='w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:ring-2 focus:ring-green-500 focus: outline-none ' 
                    onChange={(e)=>setName(e.target.value)}
                    value={name}
                    />
                </div>
                {/* email input */}
                <div className='relative'>
                    <Mail className='absolute left-3 top-3.5 h-5 w-5 text-gray-400 cursor-pointer'/>
                    <input type="email" placeholder='Your Mail' className='w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:ring-2 focus:ring-green-500 focus: outline-none' 
                    onChange={(e)=>setEmail(e.target.value)}
                    value={email}
                    />
                </div>
                {/* password input */}
                <div className='relative'>
                    <Lock className='absolute left-3 top-3.5 h-5 w-5 text-gray-400 cursor-pointer'/>
                    <input type={showPassword? "text" : "password"} placeholder='Your Password' className='w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:ring-2 focus:ring-green-500 focus: outline-none' 
                    onChange={(e)=>setPassword(e.target.value)}
                    value={password}
                    />
                    {
                        showPassword? <EyeOff onClick={()=>setShowPassword(false)} className='absolute right-3 top-3.5 h-5 w-5 text-gray-400 cursor-pointer'/> : <EyeIcon onClick={()=>setShowPassword(true)} className='absolute right-3 top-3.5 h-5 w-5 text-gray-400 cursor-pointer'/>
                    }
                </div>
                {/* form validation */}
                {
                    (()=>{
                        const formValidation=name!=="" && email!=="" && password!==""
                        return <button className={`w-full font-semibold py-3 rounded-xl transition-all duration-200 shadow-md inline-flex justify-center items-center gap-2 ${
                                formValidation? "bg-green-600 hover:bg-green-700 text-white":"bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}>
                            Register
                        </button>
                    }) ()
                }

                {/* devider line */}
                <div className='flex items-center text-gray-300 text-sm mt-2 gap-1'>
                    <span className='flex-1 h-px bg-gray-200'></span>
                    OR
                    <span className='flex-1 h-px bg-gray-200'></span>
                </div>
                {/* continue with google */}
                <button>
                    
                    Continue With Google
                </button>
            </motion.form>
        </div>
    );
};

export default RegisterForm;