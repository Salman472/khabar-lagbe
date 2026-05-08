import mongoose from "mongoose";
// order interface
export interface IOrder {
  _id?: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  items: [
    {
      grocery: mongoose.Types.ObjectId;
      name: string;
      price: string;
      image:string
      unit: string;
      quantity: number;
    },
  ];
  totalAmount: number;
  isPaid:boolean
  paymentMethod: "cod" | "online";
  address: {
    fullName: string;
    mobile:string
    city: string;
    state: string;
    pinCode: string;
    fullAddress: string;
    latitude: number;
    longitude: number;
  };
  assignment?:mongoose.Types.ObjectId
  assignedDeliveryBoy?:mongoose.Types.ObjectId
  status: "pending" | "out of delivery" | "delivered";
  createdAt?: Date;
  updatedAt?: Date;
}

// order schema
const orderSchema = new mongoose.Schema<IOrder>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        grocery: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Grocery",
          required: true,
        },

        name: String,
        price: String,
        unit: String,
        image:String,
        quantity: Number,
      },
    ],
    totalAmount: {
      type: Number,
    },
    isPaid:{
      type:Boolean,
      default:false
    },
    paymentMethod: {
      type: String,
      enum: ["cod", "online"],
      default: "online",
    },
    address: {
      fullName: String,
      mobile:String,
      city: String,
      state: String,
      pinCode: String,
      fullAddress: String,
      latitude: Number,
      longitude: Number
    },
    assignment:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"DeliveryAssignment",
      default:null
    },
    assignedDeliveryBoy:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
    status:{
        type:String,
        enum:['pending','out of delivery', 'delivered'],
        default:'pending'
    }
  },
  { timestamps: true },
);

const Order=mongoose.models.Order || mongoose.model('Order',orderSchema)
export default Order
