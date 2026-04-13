'use client'

import { useState } from 'react'
import { User, Shield, Bike } from 'lucide-react'
import axios from 'axios'
import { redirect } from 'next/navigation'

export default function EditMobileRole() {
  const [role, setRole] = useState<string | null>(null)
  const [phone, setPhone] = useState('')
  const [loading, setLoading]=useState(false)
// console.log(role,phone);
  const roles = [
    {id:'admin', name: 'Admin', icon: <Shield size={24} /> },
    {id:'user', name: 'User', icon: <User size={24} /> },
    {id:'deliveryBoy', name: 'Delivery Boy', icon: <Bike size={24} /> },
  ]
//   handle button Submit
const handleSubmit=async()=>{
    setLoading(true)
    try {
        const result=await axios.post('/api/user/edit-mobile-role',{
            role:role,
            mobile:phone
        })
        console.log('edit mobile and role',result.data);
         setLoading(false)
        redirect('/')
       
    } catch (error) {
        console.log(error);
        setLoading(false)
    }
}

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-4">
      
      {/* Title */}
      <h1 className="text-3xl font-bold text-green-600 mb-8">
        Select Your Role
      </h1>

      {/* Role Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {roles.map((item) => (
          <div
            key={item.name}
            onClick={() => setRole(item.id)}
            className={`cursor-pointer w-48 h-32 flex flex-col items-center justify-center rounded-xl border transition-all
            ${
              role === item.id
                ? 'border-green-500 bg-green-100'
                : 'border-gray-300 bg-white hover:border-green-400'
            }`}
          >
            <div className="mb-2 text-gray-700">{item.icon}</div>
            <p className="text-sm font-medium">{item.name}</p>
          </div>
        ))}
      </div>

      {/* Phone Input */}
      <div className="w-full max-w-sm mb-6">
        <p className="text-sm text-gray-600 mb-2 text-center">
          Enter Your Mobile No.
        </p>
        <input
          type="tel"
          placeholder="eg. 0000000000"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      {/* Button */}
      <button
      onClick={handleSubmit}
        disabled={!role || phone.length !=11}
    className={`px-6 py-3 rounded-full bg-gray-300 text-gray-600 flex items-center gap-2 disabled:opacity-70 hover:bg-gray-400 transition ${
        role && phone.length == 11 ?"bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }`}
      >
        Go to Home →
      </button>
    </div>
  )
}