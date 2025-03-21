"use client";

import React, { useState } from "react";
import { FaCalendarWeek, FaMap, FaLayerGroup } from "react-icons/fa";

const SearchBox: React.FC = () => {
  const [step, setStep] = useState<number>(1); // Track the current step
  const [travelDetails, setTravelDetails] = useState({
    fromLocation: "",
    toLocation: "",
    startDate: "",
    endDate: "",
    totalPeople: 1,
    children: 0,
  });
  const [personalDetails, setPersonalDetails] = useState({
    name: "",
    email: "",
    contact: "",
  });

  // Handle travel details input change
  const handleTravelDetailsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setTravelDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle personal details input change
  const handlePersonalDetailsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setPersonalDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      ...travelDetails,
      ...personalDetails,
    };

    try {
      const response = await fetch("/api/auth/searchbooking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Booking details saved successfully!");
      } else {
        alert("Failed to save booking details.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 sm:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center justify-center gap-4 sm:gap-8 mt-4 sm:mt-12 w-[95%] sm:w-[80%] mx-auto">
      {step === 1 ? (
        <>
          {/* From Location */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            <FaMap className="w-6 h-6 text-blue-600" />
            <div>
              <p className="text-lg font-medium mb-[0.2rem]">From Location</p>
              <input
                type="text"
                name="fromLocation"
                placeholder="Where are you coming from?"
                value={travelDetails.fromLocation}
                onChange={handleTravelDetailsChange}
                className="outline-none border-none placeholder:text-gray-800 w-full"
                required
              />
            </div>
          </div>

          {/* To Location */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            <FaMap className="w-6 h-6 text-blue-600" />
            <div>
              <p className="text-lg font-medium mb-[0.2rem]">To Location</p>
              <input
                type="text"
                name="toLocation"
                placeholder="Where are you going?"
                value={travelDetails.toLocation}
                onChange={handleTravelDetailsChange}
                className="outline-none border-none placeholder:text-gray-800 w-full"
                required
              />
            </div>
          </div>

          {/* Start Date */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            <FaCalendarWeek className="w-6 h-6 text-blue-600" />
            <div>
              <p className="text-lg font-medium mb-[0.2rem]">Start Date</p>
              <input
                type="date"
                name="startDate"
                value={travelDetails.startDate}
                onChange={handleTravelDetailsChange}
                className="outline-none border-none w-full"
                required
              />
            </div>
          </div>

          {/* End Date */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            <FaCalendarWeek className="w-6 h-6 text-blue-600" />
            <div>
              <p className="text-lg font-medium mb-[0.2rem]">End Date</p>
              <input
                type="date"
                name="endDate"
                value={travelDetails.endDate}
                onChange={handleTravelDetailsChange}
                className="outline-none border-none w-full"
                required
              />
            </div>
          </div>

          {/* Total People */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            <FaLayerGroup className="w-6 h-6 text-blue-600" />
            <div>
              <p className="text-lg font-medium mb-[0.2rem]">Total People</p>
              <input
                type="number"
                name="totalPeople"
                min="1"
                value={travelDetails.totalPeople}
                onChange={handleTravelDetailsChange}
                className="outline-none border-none w-full"
                required
              />
            </div>
          </div>

          {/* Children */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            <FaLayerGroup className="w-6 h-6 text-blue-600" />
            <div>
              <p className="text-lg font-medium mb-[0.2rem]">Children</p>
              <input
                type="number"
                name="children"
                min="0"
                value={travelDetails.children}
                onChange={handleTravelDetailsChange}
                className="outline-none border-none w-full"
                required
              />
            </div>
          </div>

          {/* Next Button */}
          <div className="col-span-full flex justify-center">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="rounded px-14 md:px-28 py-2.5 bg-rose-600 text-white font-bold hover:bg-red-500 transition-all"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Name */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            <FaLayerGroup className="w-6 h-6 text-blue-600" />
            <div>
              <p className="text-lg font-medium mb-[0.2rem]">Name</p>
              <input
                type="text"
                name="name"
                placeholder="Your full name"
                value={personalDetails.name}
                onChange={handlePersonalDetailsChange}
                className="outline-none border-none placeholder:text-gray-800 w-full"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            <FaLayerGroup className="w-6 h-6 text-blue-600" />
            <div>
              <p className="text-lg font-medium mb-[0.2rem]">Email</p>
              <input
                type="email"
                name="email"
                placeholder="Your email address"
                value={personalDetails.email}
                onChange={handlePersonalDetailsChange}
                className="outline-none border-none placeholder:text-gray-800 w-full"
                required
              />
            </div>
          </div>

          {/* Contact */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            <FaLayerGroup className="w-6 h-6 text-blue-600" />
            <div>
              <p className="text-lg font-medium mb-[0.2rem]">Contact</p>
              <input
                type="tel"
                name="contact"
                placeholder="Your contact number"
                value={personalDetails.contact}
                onChange={handlePersonalDetailsChange}
                className="outline-none border-none placeholder:text-gray-800 w-full"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="col-span-full flex justify-center">
            <button
              type="submit"
              onClick={handleSubmit}
              className="rounded px-14 md:px-28 py-2.5 bg-rose-600 text-white font-bold hover:bg-red-500 transition-all"
            >
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchBox;
