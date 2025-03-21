"use client";

import { useState } from "react";
import axios from "axios"; // Import Axios
import { toast } from "react-hot-toast";

export default function BookNowPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
  });
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [successMessage, setSuccessMessage] = useState(""); // Success message

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true

    try {
      // Send a POST request to the backend API using Axios
      const response = await axios.post("/api/auth/booknow", {
        fullName: formData.name,
        email: formData.email,
        phoneNumber: formData.phone,
        destination: formData.destination,
      });

      // If the request is successful, show a success message
      if (response.status === 201) {
        setSuccessMessage(`Booking Confirmed!\nName: ${formData.name}\nDestination: ${formData.destination}`);
        toast.success("Booking Confirmed! our team will contact you soon."); 
        // Clear the form
        setFormData({
          name: "",
          email: "",
          phone: "",
          destination: "",
        });
      }
    } catch (error) {
      // Handle errors
      if (axios.isAxiosError(error)) {
        // Show the error message from the backend
        toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
      } else {
        console.error("Error submitting form:", error);
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-gray-400 to-blue-950">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Book Your Trip Now</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="destination"
            placeholder="Destination"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={formData.destination}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={isLoading} // Disable button when loading
            className="flex w-full justify-center items-center rounded px-14 md:px-28 py-2.5 overflow-hidden group bg-rose-600 relative hover:bg-gradient-to-r hover:from-red-500 hover:to-red-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-red-400 transition-all ease-out duration-300"
          >
            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            <span className="relative font-bold">
              {isLoading ? "Booking..." : "Book Now"}
            </span>
          </button>

          {successMessage && (
            <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              {successMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}