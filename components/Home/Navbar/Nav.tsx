"use client";

import { navLinks } from "@/constant/constant";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { HiBars3BottomRight } from "react-icons/hi2";
import Logo from "../../../public/image.png";
import Image from "next/image";
import { FaUserCircle, FaUserTie  } from "react-icons/fa"; // Import an icon for the agent

type Props = {
  openNav: () => void;
};

const Nav = ({ openNav }: Props) => {
  const [navBg, setNavBg] = useState(false);
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
  const handleAdminIconClick = () => {
    if (userRole === "admin") {
      window.location.href = "/admin"; // Redirect to agent dashboard
    }
  };


  useEffect(() => {
    const handler = () => {
      if (window.scrollY >= 90) setNavBg(true);
      if (window.scrollY < 90) setNavBg(false);
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div
      className={` ${
        navBg ? "bg-blue-950 shadow-md" : "fixed bg-blue-450 shadow-md"
      } transition-all duration-200 h-[12vh] z-[1000] fixed w-full`}
    >
      <div className="flex items-center h-full justify-between w-[90%] xl:w-[80%] mx-auto">
        {/* LOGO */}
        <div className="flex items-center space-x-2">
          <Image src={Logo} alt="logo" width={200} height={200} />
        </div>
        {/* NavLinks  */}
        <div className="hidden lg:flex items-center space-x-10">
          {navLinks.map((link) => {
            // Conditionally render links based on user role
            if (userRole === "admin" && (link.label === "Become an Agent" || link.label === "Book Now")) {
              return null;
            }
            if (userRole === "agent" && link.label === "Book Now") {
              return null;
            }
            return (
              <Link href={link.url} key={link.id}>
                <p className="relative text-white text-base font-medium w-fit block after:block after:content-['']  after:absolute after:h-[3px] after:bg-yellow-300 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition duration-300 after:origin-right">
                  {link.label}
                </p>
              </Link>
            );
          })}
        </div>
        {/* buttons */}
        <div className="flex items-center space-x-4">
          {/* Show Book Now button only if the user is not an agent or admin */}
          {userRole !== "agent" && userRole !== "admin" && (
            <Link
              href="/booknow"
              className="md:px-12 md:py-2.5 px-8 py-2 text-black text-base bg-white hover:bg-gray-200 transition-all duration-200 rounded-lg"
            >
              Book Now
            </Link>
          )}

          {/* Conditionally render Login/Signup or Logout */}
          {!isLoggedIn ? (
            <>
              <Link
                href="/login"
                className="md:px-12 md:py-2.5 px-8 py-2 text-white text-base bg-transparent hover:bg-blue-900 transition-all duration-200 rounded-lg border border-white"
              >
                Login
              </Link>
              {/* <Link
                href="/signup"
                className="md:px-12 md:py-2.5 px-8 py-2 text-white text-base bg-transparent hover:bg-blue-900 transition-all duration-200 rounded-lg border border-white"
              >
                Signup
              </Link> */}
            </>
          ) : (
            <>
              {/* Show Agent Icon if the user is an agent */}
              {userRole === "agent" && (
                <div
                  onClick={handleAgentIconClick}
                  className="cursor-pointer text-white hover:text-yellow-300 transition-all duration-200"
                >
                  <FaUserCircle className="w-8 h-8" /> {/* Agent Icon */}
                </div>
              )}
                {userRole === "admin" && (
                <div
                  onClick={handleAgentIconClick}
                  className="cursor-pointer text-white hover:text-yellow-300 transition-all duration-200"
                >
                  <FaUserTie  className="w-8 h-8" /> {/* Agent Icon */}
                </div>
              )}
              {userRole === "admin" && (
                <div
                  onClick={handleAdminIconClick}
                  className="cursor-pointer text-white hover:text-yellow-300 transition-all duration-200"
                >
                  <FaUserCircle className="w-8 h-8" /> {/* Agent Icon */}
                </div>
              )}
              <button
                onClick={handleLogout}
                className="md:px-12 md:py-2.5 px-8 py-2 text-white text-base bg-transparent hover:bg-blue-900 transition-all duration-200 rounded-lg border border-white"
              >
                Logout
              </button>
            </>
          )}

          {/* Burger Menu */}
          <HiBars3BottomRight
            onClick={openNav}
            className="w-8 h-8 cursor-pointer text-white lg:hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default Nav;