import React from "react";

import connectDb from "@/lib/db";
import Grocery from "@/models/grocery.model";
import mongoose from "mongoose";
import GHeader from "./GHeader";
import GroceryItem from "./GroceryItem";



interface IGrocery {
  _id?: mongoose.Types.ObjectId;
  name: string;
  category: string;
  unit: string;
  price: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}
const Groceries = async () => {
  await connectDb();
  const groceries = await Grocery.find();
  const plainGrocery = JSON.parse(JSON.stringify(groceries));
  return (
  <div>
  <GHeader/>
  <div className="grid grid-cols-1 gap-1 sm:grid-cols-1 sm:gap-2 md:grid-cols-2 md:gap-3 lg:grid-cols-4 lg:gap-5 my-10 max-w-7xl mx-auto">
        {plainGrocery.map((grocery: IGrocery, index: number) => (
          <GroceryItem key={index} grocery={grocery} />
        ))}
      </div>
  </div>
     
      
    
  );
};

export default Groceries;
