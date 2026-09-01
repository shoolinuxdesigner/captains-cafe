"use client"; // Add this at top
import React, { useState, useEffect } from "react";
import "./globals.css";
import 'animate.css/animate.css';
import MainHeader from "../components/common/header";
import Footer from "@/components/common/footer";
import { Inter, Quicksand } from 'next/font/google';
import PostFooter from "@/components/common/post footer";
import { ThemeProvider } from "next-themes";
import ThemeToggle from "@/components/design/theme toggle";
import MaintenancePage from "@/components/design/maintenance";
import MaintenanceTimerWidget from "@/components/design/maintenance/MaintenanceTimerWidget";
import { Toaster } from "react-hot-toast";
import { usePathname } from 'next/navigation';
import Snowfall from "@/components/design/effects/Snowfall";
import FallingHearts from "@/components/design/effects/FallingHearts";
import SummerVibes from "@/components/design/effects/SummerVibes";
import RainyDay from "@/components/design/effects/RainyDay";
// import Chatbot from "@/components/common/Chatbot";
import AiChatBot from "@/components/common/AiChatBot";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-quicksand",
});

const MAINTENANCE_MODE = true;
const MAINTENANCE_BYPASS_PATHS = [
  "/themenu", // Example bypass path
  "/thetouchmenu", // Example bypass path
];
const MAINTENANCE_STORAGE_KEY = 'cc_maintenance_bypass_expiry';
const MAINTENANCE_SESSION_DURATION = 20 * 60; // 20 minutes in seconds

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAdminPath = pathname?.startsWith('/admin');
  const isBypassedPath = MAINTENANCE_BYPASS_PATHS.some(
    (path) => pathname === path || pathname?.startsWith(path + '/')
  );

  const [isUnlocked, setIsUnlocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(MAINTENANCE_SESSION_DURATION);

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const storedExpiry = localStorage.getItem(MAINTENANCE_STORAGE_KEY);
      if (storedExpiry) {
        const expiryTime = Number(storedExpiry);
        const now = Date.now();
        if (expiryTime > now) {
          setIsUnlocked(true);
          setTimeLeft(Math.max(0, Math.floor((expiryTime - now) / 1000)));
        } else {
          localStorage.removeItem(MAINTENANCE_STORAGE_KEY);
          setIsUnlocked(false);
        }
      }
    } catch (err) {
      console.error('Error reading maintenance bypass expiry:', err);
    }
  }, []);

  // 1-second interval countdown for 20-minute timer
  useEffect(() => {
    if (!isUnlocked) return;

    const interval = setInterval(() => {
      try {
        const storedExpiry = localStorage.getItem(MAINTENANCE_STORAGE_KEY);
        if (!storedExpiry) {
          setIsUnlocked(false);
          return;
        }
        const expiryTime = Number(storedExpiry);
        const now = Date.now();
        const remaining = Math.max(0, Math.floor((expiryTime - now) / 1000));

        if (remaining <= 0) {
          localStorage.removeItem(MAINTENANCE_STORAGE_KEY);
          setIsUnlocked(false);
        } else {
          setTimeLeft(remaining);
        }
      } catch (err) {
        console.error('Timer countdown error:', err);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isUnlocked]);

  const handleUnlock = () => {
    const expiryTime = Date.now() + MAINTENANCE_SESSION_DURATION * 1000;
    try {
      localStorage.setItem(MAINTENANCE_STORAGE_KEY, expiryTime.toString());
    } catch (err) {
      console.error('Error saving maintenance bypass expiry:', err);
    }
    setTimeLeft(MAINTENANCE_SESSION_DURATION);
    setIsUnlocked(true);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem(MAINTENANCE_STORAGE_KEY);
    } catch (err) {
      console.error('Error removing maintenance bypass expiry:', err);
    }
    setIsUnlocked(false);
  };

  const showMaintenance = MAINTENANCE_MODE && !isBypassedPath && !isUnlocked;

  return (
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {showMaintenance ? (
            <MaintenancePage onUnlock={handleUnlock} />
          ) : isBypassedPath ? (
            // Completely Blank/Clean Layout for Bypassed/Special Page
            <div className="blank-layout">
              {children}
              <Toaster position="top-right" reverseOrder={false}
                toastOptions={{ duration: 3000 }} />
            </div>
          ) : isAdminPath ? (
            // Admin Layout - Clean
            <div className="admin-layout">
              {children}
              <Toaster position="top-right" reverseOrder={false}
                toastOptions={{ duration: 3000 }} />
            </div>
          ) : (
            // Normal Layout
            <div className="d-flex">
              {/* <Snowfall /> */}
              {/* <FallingHearts /> */}
              {/* <SummerVibes /> */}
              {/* <RainyDay /> */}
              <div id="content" className="flex-grow-1 w-full flex flex-col items-center">
                <div className="container fixed z-49">
                  <MainHeader activeTab="Home" />
                </div>
                {children}
                <Footer />
                <PostFooter />
              </div>
              <div className="fixed z-200 left-3 bottom-4 bg-white dark:bg-gray-900 border-1 border-gray-600 light:bg-gray-900 shadow-xl rounded-full">
                <ThemeToggle />
              </div>
              <Toaster position="top-right" reverseOrder={false}
                toastOptions={{ duration: 3000 }} />
              {/* <Chatbot /> */}
              <AiChatBot />
            </div>
          )}

          {/* Floating Draggable 20-Min Timer & Logout Widget */}
          {isUnlocked && MAINTENANCE_MODE && (
            <MaintenanceTimerWidget timeLeft={timeLeft} onLogout={handleLogout} />
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}