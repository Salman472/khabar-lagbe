"use client"
import React from 'react';
import {motion} from 'motion/react'
const GHeader = () => {
    return (
        <div>
             <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-emerald-700 text-center mb-10"
      >
        Popular Grocery Items
      </motion.h2>
        </div>
    );
};

export default GHeader;