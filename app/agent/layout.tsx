'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSidebar } from '@/app/context/SidebarContext'; // Import the SidebarContext
import { useAuth } from '@/app/context/AuthContext'; // Import the AuthContext
import AgentSidebar from '@/components/Helper/AgentSidebar';
import AgentNavbar from '@/components/Helper/AgentNavbar';

export default function AgentLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const { isLoggedIn, userRole } = useAuth(); // Use the AuthContext
  const { isCollapsed } = useSidebar(); // Get the collapsed state from SidebarContext

  useEffect(() => {
    // Check if the user is logged in and has the 'agent' or 'admin' role
    if (!isLoggedIn || (userRole !== 'agent' && userRole !== 'admin')) {
      router.push('/login'); // Redirect to login if not authenticated or not an agent/admin
    } else {
      setIsLoading(false); // Stop loading once authentication state is confirmed
    }
  }, [isLoggedIn, userRole, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-lg font-semibold text-gray-700">Loading...</div>
      </div>
    ); // Show a loading spinner or message
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AgentSidebar />

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-200 ${
          isCollapsed ? 'ml-20' : 'ml-64'
        }`}
      >
        {/* Navbar */}
        <AgentNavbar />

        {/* Page Content */}
        <main className="flex-1 p-6 mt-16 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}