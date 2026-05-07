import connectDb from "@/lib/db";
import Order from "@/models/order.model";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";


// stripe instance
const stripe=new Stripe(process.env.STRIPE_API_SECRET!)
export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const { userId, items, address, paymentMethod, totalAmount } =
      await req.json();
    // check all the credentials
    if (!items || !address || !paymentMethod || !totalAmount) {
      return NextResponse.json(
        { message: "please send all credentials" },
        { status: 400 },
      );
    }
    // check user
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 400 });
    }
    // online order create
    const newOrder = await Order.create({
      user: userId,
      items,
      address,
      totalAmount,
      paymentMethod,
    });

    // stripe intrigate


  } catch (error) {}
}
