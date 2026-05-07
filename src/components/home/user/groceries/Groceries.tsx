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
  <div className="w-full px-3 sm:px-4 md:px-5 lg:px-6">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 max-w-7xl mx-auto my-8 md:my-10">
    {plainGrocery.map(
      (grocery: IGrocery, index: number) => (
        <GroceryItem
          key={index}
          grocery={grocery}
        />
      )
    )}
  </div>
</div>
  </div>
     
      
    
  );
};

export default Groceries;
