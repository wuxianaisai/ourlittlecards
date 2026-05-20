"use client";
import { useState, useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Preloader from "./components/ui/Preloader";
import "./globals.css";
import "../styles/nav-menu.css"
import "../styles/hero.css"
import "../styles/about-princess.css"
import "../styles/about-bread.css"
import "../styles/footer.css"
import "../styles/timeline.css"
import "../styles/catalog.css"
import "../styles/cart.css"
import "../styles/preloader.css"
import NavMenu from "./components/ui/NavMenu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [showContent, setShowContent] = useState(false);

  const handleComplete = () => {
    setShowContent(true);
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Preloader onComplete={handleComplete} />
        {showContent && children}
        <NavMenu />
      </body>
    </html>
  );
}