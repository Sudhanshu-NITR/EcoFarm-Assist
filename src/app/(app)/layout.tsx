'use client'
import { Geist, Geist_Mono } from "next/font/google";
import Chatbot from "@/components/chatbot/chatbot";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";
import Dashboard from "@/components/dashboard/dashboard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState<string>(localStorage.getItem("activeTab") || "dashboard");

  useEffect(()=>{
    const storedTab = localStorage.getItem('activetab');
    if(storedTab){
      setActiveTab(storedTab);
    }
  }, [])

  return (
    <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        {/* <main className="flex"> */}
          <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 bg-fixed flex">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="flex-1">
              {activeTab === "dashboard" && <Dashboard/>}
              {children}
            </div>
          </div>
          <Chatbot />
        {/* </main> */}
        <Footer />
      </body>
    </html>
  );
}
