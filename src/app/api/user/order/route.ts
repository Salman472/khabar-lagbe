import connectDb from "@/lib/db";
import Order from "@/models/order.model";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function Post(req: NextRequest) {
  try {
    await connectDb();
    const { userId, items, address, totalAmount, paymentMethod } =
      await req.json();
    // check all credentials
    if (!items || !address || !totalAmount || !paymentMethod) {
      return NextResponse.json(
        { message: "please send all credentials" },
        { status: 400 },
      );
    }
    // check user
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 200 });
    }

    // place order create
    const newOrder = await Order.create({
      user: userId,
      items,
      address,
      totalAmount,
      paymentMethod,
    });
    return NextResponse.json(
        newOrder,
        {status:201}
    )
  } catch (error) {
    return NextResponse.json(
      { message: `place order error ${error}` },
      { status: 500 },
    );
  }
}
