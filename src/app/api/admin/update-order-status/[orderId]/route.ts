import connectDb from "@/lib/db";
import DeliveryAssignment from "@/models/deliveryAssignment.model";
import Order from "@/models/order.model";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { orderId: string } },
) {
  try {
    await connectDb();
    const { orderId } = await params;
    const { status } = await req.json();
    const order = await Order.findById(orderId).populate("user");
    if (!order) {
      return NextResponse.json({ message: "order not found" }, { status: 400 });
    }
    order.status = status;

    // find available delivery boy

    let availableDeliveryBoy: any = [];
    if (status === "out of delivery" && !order.assignment) {
      const { longitude, latitude } = order.address;
      const nearByDeliveryBoys = await User.find({
        role: "deliveryBoy",
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [Number(longitude), Number(latitude)],
            },
            $maxDistance:10000
          },
        },
      });
      const nearByIds=nearByDeliveryBoys.map((b)=>b._id)
      const busyIds=await DeliveryAssignment.find({
        assignedTo:{$in:nearByIds},
        status:{$nin:["brodcasted", "completed"]}
      }).distinct('assignedId')
      const busyIdSet=new Set(busyIds.map(b=>String(b)))
      const availableDeliveryBoys=nearByDeliveryBoys.filter(b=>!busyIdSet.has(String(b._id)))
    }
  } catch (error) {}
}
