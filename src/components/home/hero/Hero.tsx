import { Leaf, Smartphone, Truck } from 'lucide-react';
import React from 'react';

const Hero = () => {
    const slides=[
        {
            id:1,
            icon:<Leaf className='h-20 w-20 sm:w-28 sm:h-28 text-yellow-400 drop-shadow-lg'/>,
            title:"Fresh Organic Groceries 🌱",
            subTitle:"Farm-fresh fruits, vegetables, and daily essentials delivered to you.",
            btnText:"Shop Now",
            bg:"https://images.unsplash.com/photo-1767364084218-a18f3ea7e93f?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id:2,
            icon:<Truck className='h-20 w-20 sm:w-28 sm:h-28 text-yellow-400 drop-shadow-lg'/>,
            title:"Fast & Reliable Delivery 🚚",
            subTitle:"We ensure your groceries reach your doorstep in no time.",
            btnText:"Order Now",
            bg:"https://images.unsplash.com/photo-1607130232670-52123ba5be5c?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id:3,
            icon:<Smartphone className='h-20 w-20 sm:w-28 sm:h-28 text-yellow-400 drop-shadow-lg'/>,
            title:"Shop Anytime, Anywhere 📱",
            subTitle:"Easy and seamless online grocery shopping experience.",
            btnText:"Get Started",
            bg:"https://images.unsplash.com/photo-1674027392887-751d6396b710?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },

    ]
    return (
        <div>
            
        </div>
    );
};

export default Hero;