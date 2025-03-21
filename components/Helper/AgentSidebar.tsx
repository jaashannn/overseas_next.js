"use client";

import { useSidebar } from "@/app/context/SidebarContext";
import Link from "next/link";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import {
  HiOutlineHome,
  HiOutlineHeart,
  HiOutlineShieldCheck,
  HiOutlineCalculator,
  HiOutlineBookOpen,
} from "react-icons/hi2";
import {
  FaPlane,
  FaShip,
  FaGuilded,
  FaCar,
  FaBus,
  FaTrain,
  FaParking,
  FaMoneyBillWave,
} from "react-icons/fa";

type MenuItem = {
  href: string;
  icon: React.ElementType;
  label: string;
};

export default function Sidebar() {
  const { isCollapsed, toggleSidebar } = useSidebar();

  const menuItems: MenuItem[] = [
    { href: "/agent/flights", icon: FaPlane, label: "Flights" },
    { href: "/agent/hotels", icon: HiOutlineHome, label: "Hotels" },
    { href: "/agent/cruises", icon: FaShip, label: "Cruise" },
    { href: "/agent/tour-packages", icon: FaGuilded, label: "Tour Packages" },
    { href: "/agent/car-rentals", icon: FaCar, label: "Car Rentals" },
    { href: "/agent/bus-tours", icon: FaBus, label: "Bus Tours" },
    { href: "/agent/railway-tickets", icon: FaTrain, label: "Railway Tickets & Tours" },
    { href: "/agent/destination-wedding", icon: HiOutlineHeart, label: "Destination Wedding" },
    { href: "/agent/car-parking", icon: FaParking, label: "Car Parking" },
    { href: "/agent/insurance", icon: HiOutlineShieldCheck, label: "Insurance" },
    { href: "/agent/accounting", icon: HiOutlineCalculator, label: "Accounting" },
    { href: "/agent/study-material", icon: HiOutlineBookOpen, label: "Study Material" },
    { href: "/agent/flexpay", icon: FaMoneyBillWave, label: "Flex Pay" },
  ];

  return (
    <div
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } bg-[#F5F5DC] text-white h-screen fixed left-0 top-0 overflow-y-auto transition-all duration-200 shadow-lg`}
    >
      {/* Sidebar Header */}
      <div className="p-6 flex items-center justify-between">
        {!isCollapsed && (
          <h2 className="text-xl font-bold text-[#1E3A8A]">Agent Dashboard</h2>
        )}
        <button
          onClick={toggleSidebar}
          className="text-white hover:text-gray-300 transition-all duration-200"
          aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? (
            <HiChevronRight className="w-6 h-6 text-[#1E3A8A]" />
          ) : (
            <HiChevronLeft className="w-6 h-6 text-[#1E3A8A]" />
          )}
        </button>
      </div>

      {/* Sidebar Menu */}
      <nav className="mt-6">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`flex items-center px-6 py-3 text-[#1E3A8A] hover:bg-blue-800 hover:text-white transition-all duration-200 ${
              isCollapsed ? "justify-center" : "space-x-4"
            }`}
            title={item.label} // Add title for tooltip
          >
            <item.icon className="w-6 h-6" />
            {!isCollapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
}