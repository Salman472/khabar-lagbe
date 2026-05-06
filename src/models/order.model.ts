import mongoose from "mongoose";

interface IOrder{
    _id?:mongoose.Types.ObjectId
    user:mongoose.Types.ObjectId
    items:[
        {
            grocery:mongoose.Types.ObjectId
            name:string
            price:string
            unit:string
            quantity:number
        }
    ]
    totalAmount:string
    paymentMethod:'cod' | 'online'
    address:{
        fullName:string
        city:string
        state:string
        pinCode:string
        fullAddress:string
        latitude:number
        longitude:number
    }
    status:'pending' | 'out of delivery' | 'delevered'
    createdAt?:Date
    updatedAt?:Date
}