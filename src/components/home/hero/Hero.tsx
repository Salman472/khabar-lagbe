import { Leaf, Smartphone, Truck } from 'lucide-react';
import React from 'react';

const Hero = () => {
    const slides=[
        {
            id:1,
            icon:<Leaf className='h-20 w-20 sm:w-28 sm:h-28 text-yellow-400 drop-shadow-lg'/>,
            title:"Fresh Organic Groceries",
            subTitle:"Farm-fresh fruits, vegetables, and daily essentials delivered to you.",
            btnText:"Shop Now",
            bg:""
        },
        {
            id:2,
            icon:<Truck className='h-20 w-20 sm:w-28 sm:h-28 text-yellow-400 drop-shadow-lg'/>,
            title:"Fast & Reliable Delivery",
            subTitle:"We ensure your groceries reach your doorstep in no time.",
            btnText:"Order Now",
            bg:""
        },
        {
            id:3,
            icon:<Smartphone className='h-20 w-20 sm:w-28 sm:h-28 text-yellow-400 drop-shadow-lg'/>,
            title:"Shop Anytime, Anywhere",
            subTitle:"Easy and seamless online grocery shopping experience.",
            btnText:"Get Started",
            bg:""
        },

    ]
    return (
        <div>
            
        </div>
    );
};

export default Hero;