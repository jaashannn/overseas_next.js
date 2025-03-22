"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { FaCheck, FaTrash } from 'react-icons/fa';
import { useAuth } from '@/app/context/AuthContext'; // Import useAuth

interface Agent {
  _id: string;
  name: string;
  email: string;
  verified: boolean;
}

interface AgentsResponse {
  agents: Agent[];
}

const AdminDashboard = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
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
  const { isLoggedIn, userRole, isLoading } = useAuth(); // Add isLoading

  console.log(isLoggedIn, userRole, "checking isLoggedIn and userRole");

  useEffect(() => {
    // Only proceed if loading is complete
    if (!isLoading) {
      // Redirect if the user is not an admin
      if (!isLoggedIn || userRole !== 'admin') {
        console.log("Redirecting to /wrwe");
        router.push('/login');
      } else {
        // Fetch agents if the user is logged in and is an admin
        fetchAgents();
      }
    }
  }, [isLoggedIn, userRole, isLoading, router]);

  const fetchAgents = async () => {
    try {
      const response = await axios.get<AgentsResponse>('/api/auth/becomeanagent');
      setAgents(response.data.agents);
    } catch (error) {
      console.error('Error fetching agents:', error);
      toast.error('Failed to fetch agents');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDealForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/hotdeals', dealForm);
      if (response.status === 201) {
        toast.success('Deal created successfully!');
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
      toast.error('Failed to create deal. Please try again.');
    }
  };

  const handleDeleteAgent = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this agent?')) {
      try {
        await axios.delete(`/api/auth/becomeanagent?id=${id}`);
        fetchAgents(); // Refresh the list after deletion
        toast.success('Agent deleted successfully!');
      } catch (error) {
        console.error('Error deleting agent:', error);
        toast.error('Failed to delete agent. Please try again.');
      }
    }
  };

  const handleVerifyAgent = async (id: string) => {
    if (window.confirm('Are you sure you want to verify this agent?')) {
      try {
        await axios.put(`/api/auth/becomeanagent?id=${id}`, { verified: true });
        fetchAgents(); // Refresh the list after verification
        toast.success('Agent marked as verified!');
      } catch (error) {
        console.error('Error verifying agent:', error);
        toast.error('Failed to verify agent. Please try again.');
      }
    }
  };

  // Show a loading spinner while checking authentication status
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen p-20 bg-gradient-to-r from-gray-400 to-blue-950">
      <Toaster position="top-right" /> {/* Toast notifications */}
      {/* Main Content */}
      <main className="space-y-8">
        {/* Agent Stats */}
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-5">Admin Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">Total Agents</h2>
              <p className="text-2xl font-bold">{agents.length}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">Verified Agents</h2>
              <p className="text-2xl font-bold">{agents.filter((agent) => agent.verified).length}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">Unverified Agents</h2>
              <p className="text-2xl font-bold">{agents.filter((agent) => !agent.verified).length}</p>
            </div>
          </div>
        </div>

        {/* List of Agents */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Agent List</h2>
          <div className="space-y-4">
            {agents.map((agent) => (
              <div key={agent._id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="text-lg font-semibold">{agent.name}</p>
                  <p className="text-sm text-gray-600">{agent.email}</p>
                  <p className="text-sm text-gray-600">
                    Status: {agent.verified ? 'Verified' : 'Unverified'}
                  </p>
                </div>
                <div className="flex space-x-4">
                  {!agent.verified && (
                    <button
                      onClick={() => handleVerifyAgent(agent._id)}
                      className="text-green-600 hover:text-green-800 transition-colors"
                      title="Verify Agent"
                    >
                      <FaCheck className="w-6 h-6" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteAgent(agent._id)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                    title="Delete Agent"
                  >
                    <FaTrash className="w-6 h-6" />
                  </button>
                </div>
              </div>
            ))}
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