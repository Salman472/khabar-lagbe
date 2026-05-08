import mongoose from "mongoose";

interface IDeliveryAssignment{
    _id?:mongoose.Types.ObjectId
    order:mongoose.Types.ObjectId
    brodcastedTo:mongoose.Types.ObjectId[]
    assignedTo:mongoose.Types.ObjectId | null
    status:"brodcasted" | "assigned" | "completed"
    acceptedAt:Date
    createdAt:Date
    updatedAt:Date
}