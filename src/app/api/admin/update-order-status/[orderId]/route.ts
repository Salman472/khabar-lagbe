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
    // Connect to database
    await connectDb();

    // Get order id from dynamic route params
    const { orderId } = await params;

    // Get updated status from request body
    const { status } = await req.json();

    // Find order by id and populate user data
    const order = await Order.findById(orderId).populate("user");

    // Return error if order does not exist
    if (!order) {
      return NextResponse.json({ message: "order not found" }, { status: 400 });
    }

    // Update order status
    order.status = status;

    // Store available delivery boys data for frontend response
    let deliveryBoyPayload: any = [];

    /*
      Run delivery assignment logic only when:
      1. Order status becomes "out of delivery"
      2. No previous assignment exists
    */
    if (status === "out of delivery" && !order.assignment) {
      // Get order location coordinates
      const { longitude, latitude } = order.address;

      /*
        Find nearby delivery boys within 10km radius
        using MongoDB geospatial query
      */
      const nearByDeliveryBoys = await User.find({
        role: "deliveryBoy",

        location: {
          $near: {
            $geometry: {
              type: "Point",

              // MongoDB expects [longitude, latitude]
              coordinates: [Number(longitude), Number(latitude)],
            },

            // Maximum distance in meters
            $maxDistance: 10000,
          },
        },
      });

      // Extract nearby delivery boy ids
      const nearByIds = nearByDeliveryBoys.map((b) => b._id);

      /*
        Find busy delivery boys

        Exclude assignments with:
        - broadcasted
        - completed
      */
      const busyIds = await DeliveryAssignment.find({
        // Match nearby delivery boys only
        assignedTo: { $in: nearByIds },

        // Exclude these statuses
        status: {
          $nin: ["brodcasted", "completed"],
        },
      }).distinct("assignedTo");

      // Convert busy ids into Set for fast lookup
      const busyIdSet = new Set(busyIds.map((b) => String(b)));

      /*
        Filter available delivery boys

        Keep only those who are not busy
      */
      const availableDeliveryBoys = nearByDeliveryBoys.filter(
        (b) => !busyIdSet.has(String(b._id)),
      );

      // Extract available delivery boy ids
      const candidates = availableDeliveryBoys.map((b) => b._id);

      // If no delivery boys are available
      if (candidates.length == 0) {
        // Save updated order status
        await order.save();

        return NextResponse.json(
          {
            message: "there is no available delivery boys.",
          },
          { status: 200 },
        );
      }

      /*
        Create a new delivery assignment

        This assignment is broadcasted
        to all available candidates
      */
      const deliveryAssignment = await DeliveryAssignment.create({
        // Related order id
        order: order._id,

        // Candidate delivery boys
        brodcastedTo: candidates,

        // Assignment status
        status: "brodcasted",
      });

      // Save assignment id into order
      order.assignment = deliveryAssignment._id;

      /*
        Create payload for frontend response
      */
      deliveryBoyPayload = availableDeliveryBoys.map((b) => ({
        id: b._id,

        name: b.name,

        mobile: b.mobile,

        longitude: b.location.coordinates[0],

        latitude: b.location.coordinates[1],
      }));
    }

    // Save updated order
    await order.save();

    // Populate user data again
    await order.populate("user");

    // Send success response
    return NextResponse.json(
      {
        // Assignment id
        assignment: order.assignment?._id,

        // Available delivery boys data
        availableBoys: deliveryBoyPayload,
      },
      { status: 200 },
    );
  } catch (error) {
    // Handle server errors
    return NextResponse.json(
      {
        message: `update status error: ${error}`,
      },
      { status: 500 },
    );
  }
}
