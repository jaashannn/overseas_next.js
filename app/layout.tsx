'use client'; // Mark this as a Client Component

import { usePathname } from "next/navigation";
import { Poppins } from "next/font/google";
import "./globals.css";
import ResponsiveNav from "@/components/Home/Navbar/ResponsiveNav";
import Footer from "@/components/Home/Footer/Footer";
import ScrollToTop from "@/components/Helper/ScrollToTop";
import { SidebarProvider } from "./context/SidebarContext";
import { Toaster } from "react-hot-toast";
// import { metadata } from "./metadata"; // Import metadata

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
  const isAgentPage = pathname?.startsWith("/agent");

  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>
        {!isAgentPage && <ResponsiveNav />}
        <SidebarProvider>{children}</SidebarProvider>
        {!isAgentPage && <Footer />}
        <Toaster position="top-center" reverseOrder={false} />
        <ScrollToTop />
      </body>
    </html>
  );
}