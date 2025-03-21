"use client";

import React, { useState, useEffect } from "react";
import { HotDeal } from "@/app/types/HotDeal"; // Import the HotDeal type

const HotDeals = () => {
  const [hotDeals, setHotDeals] = useState<HotDeal[]>([]); // Define the type of hotDeals
  const [filter, setFilter] = useState("all"); // Filter for deal type
  const [fromCountry, setFromCountry] = useState(""); // Filter for "from" country
  const [toCountry, setToCountry] = useState(""); // Filter for "to" country

  // Fetch hot deals from the backend
  useEffect(() => {
    const fetchHotDeals = async () => {
        try {
          const response = await fetch("/api/auth/hotdeals");
          if (!response.ok) {
            const errorData = await response.text(); // Log the error response
            console.error("Error fetching hot deals:", errorData);
            return;
          }
          const data = await response.json();
          setHotDeals(data.hotDeals);
        } catch (error) {
          console.error("Error fetching hot deals:", error);
        }
      };

    fetchHotDeals();
  }, []);

  // Filter hot deals based on type and country
  const filteredDeals = hotDeals.filter((deal) => {
    const matchesType = filter === "all" || deal.type === filter;
    const matchesFromCountry =
      !fromCountry || deal.from.toLowerCase().includes(fromCountry.toLowerCase());
    const matchesToCountry =
      !toCountry || deal.to.toLowerCase().includes(toCountry.toLowerCase());
    return matchesType && matchesFromCountry && matchesToCountry;
  });

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">Hot Deals</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg"
        >
          <option value="all">All Deals</option>
          <option value="flight">Hot Flights</option>
          <option value="package">Hot Packages</option>
          <option value="cruise">Hot Cruises</option>
        </select>

        <input
          type="text"
          placeholder="From Country"
          value={fromCountry}
          onChange={(e) => setFromCountry(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg"
        />

        <input
          type="text"
          placeholder="To Country"
          value={toCountry}
          onChange={(e) => setToCountry(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                From
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                To
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Departure
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Return
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Class
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Price From
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Contact Us
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredDeals.map((deal, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-700">{deal.from}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{deal.to}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {new Date(deal.departure).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {new Date(deal.return).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{deal.class}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  ${deal.priceFrom}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <a
                    href={`mailto:tickets@overseastravels.net`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Contact Us
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HotDeals;