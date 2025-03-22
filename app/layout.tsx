'use client'; // Mark this as a Client Component

import { usePathname } from "next/navigation";
import { Poppins } from "next/font/google";
import "./globals.css";
import ResponsiveNav from "@/components/Home/Navbar/ResponsiveNav";
import Footer from "@/components/Home/Footer/Footer";
import ScrollToTop from "@/components/Helper/ScrollToTop";
import { SidebarProvider } from "./context/SidebarContext";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import { useEffect, useState } from "react";
import NProgress from "nprogress"; // Import nprogress
import "nprogress/nprogress.css"; // Import nprogress styles

const font = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); // Get the current route
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const isAgentPage = pathname?.startsWith("/agent");

  // Configure nprogress
  NProgress.configure({ showSpinner: false });

  useEffect(() => {
    // Start loading indicator when the route changes
    setIsLoading(true);
    NProgress.start();

    // Simulate a delay for demonstration purposes
    const timeout = setTimeout(() => {
      setIsLoading(false);
      NProgress.done();
    }, 500); // Adjust the delay as needed

    // Cleanup timeout
    return () => clearTimeout(timeout);
  }, [pathname]); // Trigger effect when pathname changes

  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>
        {/* Wrap the entire application with AuthProvider */}
        <AuthProvider>
          {!isAgentPage && <ResponsiveNav />}
          <SidebarProvider>
            {/* Show loading indicator if isLoading is true */}
            {isLoading && (
              <div className="fixed top-0 left-0 w-full h-1 bg-blue-500 z-50 animate-pulse"></div>
            )}
            {children}
          </SidebarProvider>
          {!isAgentPage && <Footer />}
          <Toaster position="top-center" reverseOrder={false} />
          <ScrollToTop />
        </AuthProvider>
      </body>
    </html>
  );
}