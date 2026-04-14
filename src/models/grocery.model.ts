import mongoose, { Schema } from "mongoose";

interface IGrocery{
    _id?:mongoose.Types.ObjectId,
    name:string,
    category:string,
    unit:string,
    price:string,
    image:string,
    createdAt?:Date,
    updatedAt?:Date
}

const grocerySchema=new Schema<IGrocery>({
   name:{
    type:String,
    required:true
   },
    category:{
        type:String,
        required:true
    },
    unit:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },

})

const Grocery = mongoose.models.Grocery || mongoose.model('grocery', grocerySchema)
export default Grocery