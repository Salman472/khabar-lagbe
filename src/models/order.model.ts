import mongoose from "mongoose";
// order interface
interface IOrder {
  _id?: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  items: [
    {
      grocery: mongoose.Types.ObjectId;
      name: string;
      price: string;
      unit: string;
      quantity: number;
    },
  ];
  totalAmount: string;
  paymentMethod: "cod" | "online";
  address: {
    fullName: string;
    city: string;
    state: string;
    pinCode: string;
    fullAddress: string;
    latitude: number;
    longitude: number;
  };
  status: "pending" | "out of delivery" | "delevered";
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
        quantity: Number,
      },
    ],
    totalAmount: {
      type: String,
    },
    paymentMethod: {
      type: String,
      enum: ["cod", "online"],
      default: "online",
    },
    address: {
      fullName: String,
      city: String,
      state: String,
      pinCode: String,
      fullAddress: String,
      latitude: Number,
      longitude: Number
    },
    status:{
        type:String,
        enum:['pending','out of delivery', 'delivered'],
        default:'pending'
    }
  },
  { timestamps: true },
);
