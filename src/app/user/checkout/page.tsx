"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  MapPin,
  Phone,
  User,
  ArrowLeft,
  LocateFixed,
  Loader2,
  CreditCard,
  CreditCardIcon,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import L, { LatLngExpression } from "leaflet";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { useRouter } from "next/navigation";

const markerIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/8587/8587894.png",
  iconSize: [20, 20],
  iconAnchor: [10, 20],
});
export default function CheckoutPage() {
  const { userData } = useSelector((state: RootState) => state.user);
  const [address, setAddress] = useState({
    fullName: "",
    mobile: "",
    city: "",
    state: "",
    pinCode: "",
    fullAddress: "",
  });
  const { subTotal, discount, total, cardData } = useSelector(
    (state: RootState) => state.card,
  );
  const [searchLoading, setSearchLoading] = useState(false);
  const [orderLoading, setOrderLoading]=useState(false)
  const [searchLocation, setSearchLocation] = useState("");
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "online">(
    "online",
  );
  const router=useRouter()
  
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
        },
        (err) => {
          console.log("location error", err);
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 },
      );
    }
  }, []);

  useEffect(() => {
    if (userData) {
      setAddress((prev) => ({ ...prev, fullName: userData.name || "" }));
      setAddress((prev) => ({ ...prev, mobile: userData.mobile || "" }));
    }
  }, [userData]);

  // dragable marker
  const DragebleMarker: React.FC = () => {
    const map = useMap();
    useEffect(() => {
      map.setView(position as LatLngExpression, 15, { animate: true });
    }, [map]);

    return (
      <Marker
        icon={markerIcon}
        eventHandlers={{
          dragend: (e: L.LeafletEvent) => {
            const marker = e.target as L.Marker;
            const { lat, lng } = marker.getLatLng();
            setPosition([lat, lng]);
          },
        }}
        position={position as LatLngExpression}
        draggable={true}
      />
    );
  };

  // reverse data by nominatim
  useEffect(() => {
    const fetchAddredd = async () => {
      if (!position) return;
      try {
        const result = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?lat=${position[0]}&lon=${position[1]}&format=json`,
        );
        const data = result.data;
        console.log(data);
        setAddress((prev) => ({
          ...prev,
          city: data.address.city || data.address.county,
          state: data.address.state,
          pinCode: data.address.postcode,
          fullAddress: data.display_name,
        }));
      } catch (error) {
        console.log("location reverse error", error);
      }
    };
    fetchAddredd();
  }, [position]);

  // handleSearchLocation
  const handleSearchLocation = async () => {
    // setup
    setSearchLoading(true);
    const provider = new OpenStreetMapProvider();

    // search
    const results = await provider.search({ query: searchLocation });
    if (results) {
      setSearchLoading(false);
      setPosition([results[0].y, results[0].x]);
    }
    console.log(results);
  };

  // handle current location
  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
        },
        (err) => {
          console.log("location error", err);
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 },
      );
    }
  };
  // cod = cash on delivery payment
  const handleCod = async () => {
    setOrderLoading(true)
    try {
      if (!position) {
        return null;
      }
      const result = await axios.post("/api/user/order", {
      
        userId: userData?._id,
        items: cardData.map((item) => ({
          grocery: item._id,
          name: item.name,
          price: item.price,
          image: item.image,
          unit: item.unit,
          quantity: item.quantity,
        })),
        totalAmount: total,
        address: {
          fullName: address.fullName,
          mobile: address.mobile,
          city: address.city,
          state: address.state,
          pinCode: address.pinCode,
          fullAddress: address.fullAddress,
          latitude: position[0],
          longitude: position[1],
        },
        paymentMethod
        
      });
      setOrderLoading(false)
      // console.log(result.data);
      router.push('/user/order-success')

    } catch (error) {
      console.log("cod payment error", error);
    }
  };
  // stripe payment function
  const handleStripePayment = async () => {
    setOrderLoading(true)
    try {
      if (!position) {
        return null;
      }
      const result = await axios.post("/api/user/payment", {
      
        userId: userData?._id,
        items: cardData.map((item) => ({
          grocery: item._id,
          name: item.name,
          price: item.price,
          image: item.image,
          unit: item.unit,
          quantity: item.quantity,
        })),
        totalAmount: total,
        address: {
          fullName: address.fullName,
          mobile: address.mobile,
          city: address.city,
          state: address.state,
          pinCode: address.pinCode,
          fullAddress: address.fullAddress,
          latitude: position[0],
          longitude: position[1],
        },
        paymentMethod
        
      });
      setOrderLoading(false)
      
      window.location.href=result.data.url

    } catch (error) {
      console.log("stripe payment error", error);
    }
  };
  return (
    <div className=" bg-gray-50 p-4 md:p-8">
      <Link
        href="/user/cart"
        className="flex items-center text-gray-600 hover:text-green-600 transition font-medium"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Cart
      </Link>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl md:text-3xl font-bold text-center text-green-600 mb-6"
      >
        Checkout
      </motion.h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {/* LEFT - ADDRESS */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow p-5 space-y-4"
        >
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <MapPin size={18} className="text-green-500" /> Delivery Address
          </h2>

          {/* Name */}
          <div className="flex items-center border rounded-lg px-3 py-2 gap-2">
            <User size={16} className="text-green-500" />
            <input
              onChange={(e) =>
                setAddress((prev) => ({
                  ...prev,
                  fullName: e.target.value,
                }))
              }
              value={address.fullName}
              placeholder="enter your full name"
              className="flex-1 outline-none text-sm"
            />
          </div>

          {/* Phone */}
          <div className="flex items-center border rounded-lg px-3 py-2 gap-2">
            <Phone size={16} className="text-green-500" />
            <input
              value={address.mobile}
              onChange={(e) =>
                setAddress((prev) => ({
                  ...prev,
                  mobile: e.target.value,
                }))
              }
              placeholder="enter your phone"
              className="flex-1 outline-none text-sm"
            />
          </div>

          {/* Address */}
          <div className="flex items-center border rounded-lg px-3 py-2 gap-2">
            <MapPin size={16} className="text-green-500" />
            <input
              value={address.fullAddress}
              onChange={(e) =>
                setAddress((prev) => ({
                  ...prev,
                  fullAddress: e.target.value,
                }))
              }
              placeholder="Full Address"
              className="flex-1 outline-none text-sm"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <input
              value={address.city}
              onChange={(e) =>
                setAddress((prev) => ({ ...prev, city: e.target.value }))
              }
              placeholder="City"
              className="border rounded-lg px-3 py-2 outline-none text-sm"
            />
            <input
              value={address.state}
              onChange={(e) =>
                setAddress((prev) => ({ ...prev, state: e.target.value }))
              }
              placeholder="State"
              className="border rounded-lg px-3 py-2 outline-none text-sm"
            />
            <input
              value={address.pinCode}
              onChange={(e) =>
                setAddress((prev) => ({
                  ...prev,
                  pinCode: e.target.value,
                }))
              }
              placeholder="ZIP"
              className="border rounded-lg px-3 py-2 outline-none text-sm"
            />
          </div>
          {/* search option */}
          <div className="flex gap-2">
            <input
              className="flex-1 border rounded-lg px-3 py-2 outline-none"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              placeholder="Search city or area..."
            />
            <button
              onClick={handleSearchLocation}
              className="bg-green-600 text-white px-4 rounded-lg cursor-pointer"
            >
              {searchLoading ? (
                <>
                  <div className="flex items-center">
                    <Loader2 className="h-5 w-5 animate-spin " />
                    <span>Search</span>
                  </div>
                </>
              ) : (
                "Search"
              )}
            </button>
          </div>
          {/* show map */}
          <div className="relative mt-6 h-100 w-full rounded-xl overflow-hidden shadow-inner border border-gray-300 ">
            {position && (
              <MapContainer
                center={position as LatLngExpression}
                zoom={13}
                scrollWheelZoom={true}
                className="w-full h-full"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <DragebleMarker />
              </MapContainer>
            )}
            <motion.button
              onClick={handleCurrentLocation}
              className="absolute bottom-4 right-4 z-9999 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full shadow-md transition-all duration-200"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              <LocateFixed size={20} />
            </motion.button>
          </div>
        </motion.div>
        {/* RIGHT - PAYMENT */}{" "}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow p-5 space-y-5 max-h-110"
        >
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <CreditCard size={18} className="text-green-500" /> Payment Method
          </h2>
          <div className="space-y-4">
            {/* payment online button */}
            <button
              onClick={() => setPaymentMethod("online")}
              className={`flex items-center gap-3 w-full rounded-lg border p-3 transition-all ${paymentMethod === "online" ? "border-green-600 bg-green-50 shadow-sm" : "hover:bg-gray-50"}`}
            >
              <CreditCardIcon /> <span>Pay Online (Stripe)</span>
            </button>

            {/* cash on delivery button */}
            <button
              onClick={() => setPaymentMethod("cod")}
              className={`flex items-center gap-3 w-full rounded-lg border p-3 transition-all ${paymentMethod === "cod" ? "border-green-600 bg-green-50 shadow-sm" : "hover:bg-gray-50"}`}
            >
              <Truck /> <span>Cash on Delivery</span>
            </button>
          </div>

          <div className="space-y-3 text-sm sm:text-base">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-medium text-gray-800">৳{subTotal}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Discount</span>
              <span className="text-green-600 font-medium">-৳{discount}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Delivery</span>
              <span className="text-green-500 font-medium">Free</span>
            </div>

            <div className="border-t border-dashed pt-4 flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-800">Total</span>
              <span className="text-xl font-bold text-green-600">৳{total}</span>
            </div>
          </div>
          <motion.button
            onClick={() => {
              if (paymentMethod == "cod") {
                handleCod();
              }else{
                handleStripePayment()
              }
            }}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            className="w-full bg-green-600 text-white py-3 rounded-full font-medium cursor-pointer"
          >
             {orderLoading ? (
                <>
                  <div className="flex items-center text-center justify-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin " />
                    {paymentMethod == "cod" ? "Place Order" : "Pay & Place Order"}
                  </div>
                </>
              ) : (
                <>
            {paymentMethod == "cod" ? "Place Order" : "Pay & Place Order"}
                </>
              )}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
