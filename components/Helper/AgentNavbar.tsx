"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiUserCircle, HiLogout } from "react-icons/hi";
import { useSidebar } from "@/app/context/SidebarContext";
import Logo from "@/public/image.png";
import { useRouter } from "next/navigation"; // Import useRouter for redirection
import toast, { Toaster } from "react-hot-toast";

export default function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  const { isCollapsed } = useSidebar();
  const router = useRouter(); // Initialize useRouter

  // Handle logout functionality
  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      // Simulate logout API call (if needed)
      // await axios.post("/api/auth/logout");

      // Clear authentication state
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("token");
      localStorage.removeItem("role");

      // Show success notification
      toast.success("Logged out successfully!");

      // Redirect to the login page after a short delay
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (error) {
      // Handle errors
      toast.error("An error occurred during logout. Please try again.");
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div
        className={`fixed top-0 ${
          isCollapsed ? "left-20" : "left-64"
        } right-0 h-16 bg-white shadow-md flex items-center justify-between px-4 md:px-6 z-50 transition-all duration-200`}
      >
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <Image
              src={Logo}
              alt="logo"
              width={150}
              height={50}
              className="w-24 md:w-32" // Responsive logo size
            />
          </Link>
        </div>

        {/* Profile and Logout */}
        <div className="flex items-center space-x-4 md:space-x-6 relative">
          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-all duration-200"
              disabled={isLoggingOut}
            >
              <HiUserCircle className="w-6 h-6" />
              <span className="hidden md:inline">Profile</span> {/* Hide text on mobile */}
            </button>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                <Link
                  href="/agent/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  View Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </button>
              </div>
            )}
          </div>

          {/* Logout Button (Optional) */}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-all duration-200"
            disabled={isLoggingOut}
          >
            <HiLogout className="w-6 h-6" />
            <span className="hidden md:inline">
              {isLoggingOut ? "Logging out..." : "Logout"}
            </span> {/* Hide text on mobile */}
          </button>
        </div>
      </div>
    </>
  );
}