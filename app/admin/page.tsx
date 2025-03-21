"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Agent {
  verified: boolean;
}

interface AgentsResponse {
  agents: Agent[];
}

const AdminDashboard = () => {
  const [agents, setAgents] = useState({
    total: 0,
    verified: 0,
    unverified: 0,
  });

  const [dealForm, setDealForm] = useState({
    from: '',
    to: '',
    departure: '',
    returnDate: '',
    class: '',
    priceFrom: '',
    type: '',
  });

  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin' && role !== 'agent') {
      router.push('/'); 
    }

    const fetchAgentData = async () => {
      try {
        const response = await axios.get<AgentsResponse>('/api/auth/becomeanagent');
        const data = response.data;
        
        setAgents({
          total: data.agents.length,
          verified: data.agents.filter((agent: Agent) => agent.verified).length,
          unverified: data.agents.filter((agent: Agent) => !agent.verified).length,
        });
        
      } catch (error) {
        console.error('Error fetching agent data:', error);
      }
    };

    fetchAgentData();
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDealForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/hotdeals', dealForm);
      if (response.status === 201) {
        alert('Deal created successfully!');
        setDealForm({
          from: '',
          to: '',
          departure: '',
          returnDate: '',
          class: '',
          priceFrom: '',
          type: '',
        });
      }
    } catch (error) {
      console.error('Error creating deal:', error);
      alert('Failed to create deal. Please try again.');
    }
  };

  return (
    <div className="min-h-screen p-20 bg-gradient-to-r from-gray-400 to-blue-950">
      {/* Main Content */}
      <main className="space-y-8">
        {/* Agent Stats */}
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-5">Admin Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">Total Agents</h2>
              <p className="text-2xl font-bold">{agents.total}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">Verified Agents</h2>
              <p className="text-2xl font-bold">{agents.verified}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">Unverified Agents</h2>
              <p className="text-2xl font-bold">{agents.unverified}</p>
            </div>
          </div>
        </div>

        {/* Create Hot Deals Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Create Hot Deal</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">From</label>
                <input
                  type="text"
                  name="from"
                  value={dealForm.from}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">To</label>
                <input
                  type="text"
                  name="to"
                  value={dealForm.to}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Departure</label>
                <input
                  type="date"
                  name="departure"
                  value={dealForm.departure}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Return Date</label>
                <input
                  type="date"
                  name="returnDate"
                  value={dealForm.returnDate}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Class</label>
                <input
                  type="text"
                  name="class"
                  value={dealForm.class}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Price From</label>
                <input
                  type="number"
                  name="priceFrom"
                  value={dealForm.priceFrom}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Type</label>
              <select
                name="type"
                value={dealForm.type}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="" disabled>Select type</option>
                <option value="flight">Flight</option>
                <option value="package">Package</option>
                <option value="cruise">Cruise</option>
              </select>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                Create Deal
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
