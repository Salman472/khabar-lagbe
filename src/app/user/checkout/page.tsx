"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  MapPin,
  Phone,
  User,
  CreditCard,
  Truck,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import L, { LatLngExpression } from "leaflet";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

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

  const [position, setPosition] = useState<[number, number] | null>(null);
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
        setAddress({
          city: data.address.city,
          state: data.address.state,
          pinCode: data.address.postcode,
          fullAddress: data.display_name,
        });
      } catch (error) {
        console.log("location reverse error", error);
      }
    };
    fetchAddredd();
  }, [position]);
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
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
              onChange={() =>
                setAddress((prev) => ({
                  ...prev,
                  fullName: address.fullName || "",
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
              onChange={() =>
                setAddress((prev) => ({
                  ...prev,
                  mobile: address.mobile || "",
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
              onChange={() =>
                setAddress((prev) => ({
                  ...prev,
                  fullAddress: address.fullAddress || "",
                }))
              }
              placeholder="Full Address"
              className="flex-1 outline-none text-sm"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <input
              value={address.city}
              onChange={() =>
                setAddress((prev) => ({ ...prev, city: address.city || "" }))
              }
              placeholder="City"
              className="border rounded-lg px-3 py-2 outline-none text-sm"
            />
            <input
              value={address.state}
              onChange={() =>
                setAddress((prev) => ({ ...prev, state: address.state || "" }))
              }
              placeholder="State"
              className="border rounded-lg px-3 py-2 outline-none text-sm"
            />
            <input
              value={address.pinCode}
              onChange={() =>
                setAddress((prev) => ({
                  ...prev,
                  pinCode: address.pinCode || "",
                }))
              }
              placeholder="ZIP"
              className="border rounded-lg px-3 py-2 outline-none text-sm"
            />
          </div>

          <div className="flex gap-2">
            <input
              className="flex-1 border rounded-lg px-3 py-2 outline-none"
              placeholder="Search city or area..."
            />
            <button className="bg-green-600 text-white px-4 rounded-lg cursor-pointer">
              Search
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
          </div>
        </motion.div>
        {/* RIGHT - PAYMENT */}{" "}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow p-5 space-y-4"
        >
          {" "}
          <h2 className="font-semibold text-lg flex items-center gap-2">
            {" "}
            <CreditCard size={18} className="text-green-500" /> Payment
            Method{" "}
          </h2>{" "}
          <PaymentOption
            icon={<CreditCard size={16} className="text-green-500" />}
            label="Pay Online (Stripe)"
          />{" "}
          <PaymentOption
            icon={<Truck size={16} className="text-green-500" />}
            label="Cash on Delivery"
          />{" "}
          <div className="border-t pt-4 text-sm space-y-2">
            {" "}
            <Row label="Subtotal" value="৳ 279" />{" "}
            <Row label="Delivery Fee" value="৳ 0" />{" "}
            <Row label="Total" value="৳ 279" bold />{" "}
          </div>{" "}
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            className="w-full bg-green-600 text-white py-3 rounded-full font-medium cursor-pointer"
          >
            {" "}
            Place Order{" "}
          </motion.button>{" "}
        </motion.div>{" "}
      </div>{" "}
    </div>
  );
}

// Payment Option
function PaymentOption({ active, onClick, icon, label }: any) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      className={`flex items-center gap-2 border rounded-xl px-4 py-3 cursor-pointer transition ${
        active ? "border-green-600 bg-green-50" : ""
      }`}
    >
      {icon}
      <span className="text-sm">{label}</span>
    </motion.div>
  );
}

// Price Row
function Row({ label, value, bold }: any) {
  return (
    <div className="flex justify-between">
      <span className={bold ? "font-semibold" : "text-gray-500"}>{label}</span>
      <span className={bold ? "font-semibold text-green-600" : ""}>
        {value}
      </span>
    </div>
  );
}
