"use client";

import { navLinks } from "@/constant/constant";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { FaUserCircle, FaUserTie } from "react-icons/fa"; // Import icons for agent and admin

type Props = {
  showNav: boolean;
  closeNav: () => void;
};

const MobileNav = ({ closeNav, showNav }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [userRole, setUserRole] = useState(""); // Track user role

  // Check login status and role on component mount
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const role = localStorage.getItem("role") || "";
    setIsLoggedIn(loggedIn);
    setUserRole(role);
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setUserRole("");
    window.location.href = "/login"; // Redirect to login page
  };

  // Handle agent icon click
  const handleAgentIconClick = () => {
    if (userRole === "agent" || userRole === "admin") {
      window.location.href = "/agent"; // Redirect to agent dashboard
    }
  };

  // Handle admin icon click
  const handleAdminIconClick = () => {
    if (userRole === "admin") {
      window.location.href = "/admin"; // Redirect to admin dashboard
    }
  };

  const navOpen = showNav ? "translate-x-0" : "translate-x-[-100%]";

  return (
    <div>
      {/* Overlay */}
      <div
        className={`fixed ${navOpen} inset-0 transform transition-all duration-500 z-[1002] bg-black opacity-70 w-full h-screen`}
      ></div>
      {/* Navlinks */}
      <div
        className={`text-white ${navOpen} fixed justify-center flex flex-col h-full transform transition-all duration-500 delay-300 w-[80%] sm:w-[60%] bg-rose-900 space-y-6 z-[1050]`}
      >
        {/* Nav Links */}
        {navLinks.map((link) => {
          // Conditionally render links based on user role
          if (userRole === "admin" && (link.label === "Become an Agent" || link.label === "Book Now")) {
            return null;
          }
          if (userRole === "agent" && link.label === "Book Now") {
            return null;
          }
          return (
            <Link key={link.id} href={link.url}>
              <p className="text-white w-fit text-[20px] ml-12 border-b-[1.5px] pb-1 border-white sm:text-[30px] hover:text-yellow-300 transition-all duration-200">
                {link.label}
              </p>
            </Link>
          );
        })}

        {/* Book Now Button (Hidden for Agents and Admins) */}
        {userRole !== "agent" && userRole !== "admin" && (
          <Link
            href="/booknow"
            className="text-white w-fit text-[20px] ml-12 border-b-[1.5px] pb-1 border-white sm:text-[30px] hover:text-yellow-300 transition-all duration-200"
          >
            Book Now
          </Link>
        )}

        {/* Conditionally render Login or Logout */}
        {!isLoggedIn ? (
          <Link
            href="/login"
            className="text-white w-fit text-[20px] ml-12 border-b-[1.5px] pb-1 border-white sm:text-[30px] hover:text-yellow-300 transition-all duration-200"
          >
            Login
          </Link>
        ) : (
          <>
            {/* Show Agent Icon if the user is an agent */}
            {userRole === "agent" && (
              <div
                onClick={handleAgentIconClick}
                className="text-white w-fit text-[20px] ml-12 border-b-[1.5px] pb-1 border-white sm:text-[30px] cursor-pointer hover:text-yellow-300 transition-all duration-200"
              >
                <FaUserCircle className="inline-block mr-2" /> Agent Dashboard
              </div>
            )}
            {/* Show Admin Icon if the user is an admin */}
            {userRole === "admin" && (
              <div
                onClick={handleAdminIconClick}
                className="text-white w-fit text-[20px] ml-12 border-b-[1.5px] pb-1 border-white sm:text-[30px] cursor-pointer hover:text-yellow-300 transition-all duration-200"
              >
                <FaUserTie className="inline-block mr-2" /> Admin Dashboard
              </div>
            )}
            <button
              onClick={handleLogout}
              className="text-white w-fit text-[20px] ml-12 border-b-[1.5px] pb-1 border-white sm:text-[30px] hover:text-yellow-300 transition-all duration-200"
            >
              Logout
            </button>
          </>
        )}

        {/* Close Button */}
        <CgClose
          onClick={closeNav}
          className="absolute top-[0.7rem] right-[1.4rem] sm:w-8 sm:h-8 w-6 h-6 cursor-pointer hover:text-yellow-300 transition-all duration-200"
        />
      </div>
    </div>
  );
};

export default MobileNav;