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
  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-5">
        {plainGrocery.map((grocery: IGrocery, index: number) => (
          <GroceryItem key={index} grocery={grocery} />
        ))}
      </div>
  </div>
     
      
    
  );
};

export default Groceries;
