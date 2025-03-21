'use client'; // Mark this as a Client Component

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

type FormData = {
  title: string;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  country: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  certificateType: string;
  certificateNumber: string;
  message: string;
  referredBy: string;
  role: string;
  numberOfAgents: string;
  agencyType: string;
  ticoOrIataCertified: string; // Added
  planPurchased: string[]; // Added
};

type ApiError = {
  response?: {
    data?: {
      message: string;
    };
  };
  message: string;
};

export default function BecomeAnAgentPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    country: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    certificateType: '',
    certificateNumber: '',
    message: '',
    referredBy: '',
    role: 'agent',
    numberOfAgents: '',
    agencyType: '',
    ticoOrIataCertified: '', // Added
    planPurchased: [], // Added
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle next step
  const handleNext = () => {
    setStep(step + 1);
  };

  // Handle previous step
  const handlePrevious = () => {
    setStep(step - 1);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Send POST request to the backend API
      const response = await axios.post('/api/auth/becomeanagent', formData);

      // If successful, show success notification and redirect to login page
      if (response.status === 201) {
        toast.success('Agent registration successful! Redirecting to login...');
        setTimeout(() => {
          router.push('/login');
        }, 2000); // Redirect after 2 seconds
      }
    } catch (err: unknown) {
      // Handle errors and show error notification
      if (isApiError(err)) {
        toast.error(err.response?.data?.message || 'An error occurred. Please try again.');
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Type guard to check if the error is of type ApiError
  function isApiError(error: unknown): error is ApiError {
    return (error as ApiError).response !== undefined;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-blue-950 pt-36">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-8">
        {/* Left Section: Form */}
        <div className="w-full lg:w-1/2 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Become an Agent</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Stage 1: Basic Info */}
            {step === 1 && (
              <>
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <select
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    disabled={isLoading}
                  >
                    <option value="">Select Title</option>
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
                    <option value="Ms">Ms</option>
                    <option value="Dr">Dr</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    disabled={isLoading}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={isLoading}
                  className="block w-full text-center rounded px-14 md:px-28 -mt-4 py-2.5 overflow-hidden group bg-rose-600 relative hover:bg-gradient-to-r hover:from-red-500 hover:to-red-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-red-400 transition-all ease-out duration-300"
                >
                  Next
                </button>
              </>
            )}

            {/* Stage 2: Address Info */}
            {step === 2 && (
              <>
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                    Country
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    disabled={isLoading}
                  >
                    <option value="">Select Country</option>
                    <option value="USA">USA</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label htmlFor="province" className="block text-sm font-medium text-gray-700">
                    Province
                  </label>
                  <input
                    type="text"
                    id="province"
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    disabled={isLoading}
                    className="block w-1/2 mr-2 text-center rounded px-14 md:px-28 -mt-4 py-2.5 overflow-hidden group bg-gray-600 relative hover:bg-gradient-to-r hover:from-gray-500 hover:to-gray-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-gray-400 transition-all ease-out duration-300"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={isLoading}
                    className="block w-1/2 ml-2 text-center rounded px-14 md:px-28 -mt-4 py-2.5 overflow-hidden group bg-rose-600 relative hover:bg-gradient-to-r hover:from-red-500 hover:to-red-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-red-400 transition-all ease-out duration-300"
                  >
                    Next
                  </button>
                </div>
              </>
            )}

            {/* Stage 3: Certification Info */}
            {step === 3 && (
              <>
                <div>
                  <label htmlFor="certificateType" className="block text-sm font-medium text-gray-700">
                    Certificate Type
                  </label>
                  <select
                    id="certificateType"
                    name="certificateType"
                    value={formData.certificateType}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    disabled={isLoading}
                  >
                    <option value="">Select Certificate Type</option>
                    <option value="TICO">TICO</option>
                    <option value="IATA">IATA</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="certificateNumber" className="block text-sm font-medium text-gray-700">
                    Certificate Number
                  </label>
                  <input
                    type="text"
                    id="certificateNumber"
                    name="certificateNumber"
                    value={formData.certificateNumber}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label htmlFor="ticoOrIataCertified" className="block text-sm font-medium text-gray-700">
                    TICO/IATA Certified
                  </label>
                  <input
                    type="text"
                    id="ticoOrIataCertified"
                    name="ticoOrIataCertified"
                    value={formData.ticoOrIataCertified}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label htmlFor="numberOfAgents" className="block text-sm font-medium text-gray-700">
                    Number of Agents
                  </label>
                  <input
                    type="number"
                    id="numberOfAgents"
                    name="numberOfAgents"
                    value={formData.numberOfAgents}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label htmlFor="agencyType" className="block text-sm font-medium text-gray-700">
                    Agency Type
                  </label>
                  <input
                    type="text"
                    id="agencyType"
                    name="agencyType"
                    value={formData.agencyType}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isLoading}
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    disabled={isLoading}
                    className="block w-1/2 mr-2 text-center rounded px-14 md:px-28 -mt-4 py-2.5 overflow-hidden group bg-gray-600 relative hover:bg-gradient-to-r hover:from-gray-500 hover:to-gray-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-gray-400 transition-all ease-out duration-300"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={isLoading}
                    className="block w-1/2 ml-2 text-center rounded px-14 md:px-28 -mt-4 py-2.5 overflow-hidden group bg-rose-600 relative hover:bg-gradient-to-r hover:from-red-500 hover:to-red-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-red-400 transition-all ease-out duration-300"
                  >
                    Next
                  </button>
                </div>
              </>
            )}

            {/* Stage 4: Additional Info */}
            {step === 4 && (
              <>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label htmlFor="referredBy" className="block text-sm font-medium text-gray-700">
                    Referred By
                  </label>
                  <input
                    type="text"
                    id="referredBy"
                    name="referredBy"
                    value={formData.referredBy}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isLoading}
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    disabled={isLoading}
                    className="block w-1/2 mr-2 text-center rounded px-14 md:px-28 -mt-4 py-2.5 overflow-hidden group bg-gray-600 relative hover:bg-gradient-to-r hover:from-gray-500 hover:to-gray-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-gray-400 transition-all ease-out duration-300"
                  >
                    Previous
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="block w-1/2 ml-2 text-center rounded px-14 md:px-28 -mt-4 py-2.5 overflow-hidden group bg-rose-600 relative hover:bg-gradient-to-r hover:from-red-500 hover:to-red-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-red-400 transition-all ease-out duration-300"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <span className="animate-spin mr-2">🌀</span>
                        Submitting...
                      </span>
                    ) : (
                      'Submit'
                    )}
                  </button>
                </div>
              </>
            )}
          </form>
        </div>

        {/* Right Section: Content */}
        <div className="w-full lg:w-1/2 space-y-8">
          {/* Banner */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Become a Travel Agent</h3>
            <p className="mb-4">
              Start your journey to success – Become a travel agent with expert
              support, industry-leading tools, and exclusive travel opportunities.
            </p>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="bg-rose-600 text-white px-6 py-2 rounded-md hover:bg-rose-700"
            >
              Join As Agent
            </button>
          </div>

          {/* How It Works */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">How It Works</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 flex items-center justify-center bg-blue-500 text-white rounded-full">
                  1
                </div>
                <div>
                  <h4 className="font-bold">Sign Up</h4>
                  <p>Start by seeing what we offer and sign up for one of our incredible plans.</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 flex items-center justify-center bg-blue-500 text-white rounded-full">
                  2
                </div>
                <div>
                  <h4 className="font-bold">Setup & Training</h4>
                  <p>We set you up and train you on a one-on-one basis (no group training).</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 flex items-center justify-center bg-blue-500 text-white rounded-full">
                  3
                </div>
                <div>
                  <h4 className="font-bold">Start Selling</h4>
                  <p>You start selling travel and growing your home-based travel business.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Plans & Pricing</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Silver Plan */}
              <div className="p-4 border rounded-lg">
                <h4 className="font-bold">Silver</h4>
                <p className="text-sm text-gray-600">Beginner Plan</p>
                <ul className="mt-4 space-y-2">
                  <li>60% Commission</li>
                  <li>$550 Setup Fee</li>
                  <li>$50 Monthly Fee</li>
                </ul>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="mt-4 bg-rose-600 text-white px-6 py-2 rounded-md hover:bg-rose-700"
                >
                  Choose Plan
                </button>
              </div>
              {/* Gold Plan */}
              <div className="p-4 border rounded-lg">
                <h4 className="font-bold">Gold</h4>
                <p className="text-sm text-gray-600">Starter Plan</p>
                <ul className="mt-4 space-y-2">
                  <li>75% Commission</li>
                  <li>$750 Setup Fee</li>
                  <li>$60 Monthly Fee</li>
                </ul>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="mt-4 bg-rose-600 text-white px-6 py-2 rounded-md hover:bg-rose-700"
                >
                  Choose Plan
                </button>
              </div>
              {/* Platinum Plan */}
              <div className="p-4 border rounded-lg">
                <h4 className="font-bold">Platinum</h4>
                <p className="text-sm text-gray-600">Most Popular Plan</p>
                <ul className="mt-4 space-y-2">
                  <li>100% Commission</li>
                  <li>$950 Setup Fee</li>
                  <li>$90 Monthly Fee</li>
                </ul>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="mt-4 bg-rose-600 text-white px-6 py-2 rounded-md hover:bg-rose-700"
                >
                  Choose Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}