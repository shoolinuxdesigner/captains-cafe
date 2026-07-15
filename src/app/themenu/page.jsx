"use client";

import React from "react";
import Image from "next/image";
import logoLight from "@/assets/images/logo_light.png";
import { FaFacebookF } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";
import { MdCall } from "react-icons/md";
import { HiLocationMarker } from "react-icons/hi";
import { IoGlobeOutline } from "react-icons/io5";
import { Cinzel, Montserrat } from "next/font/google";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function TheMenu() {
  const menuImages = [
    "/images/menu/new/0.jpg",
    "/images/menu/new/1.jpg",
    "/images/menu/new/2.jpg",
    "/images/menu/new/3.jpg",
    "/images/menu/new/4.jpg",
    "/images/menu/new/5.jpg",
    "/images/menu/new/6.jpg",
    "/images/menu/new/7.jpg",
    "/images/menu/new/8.jpg",
    "/images/menu/new/9.jpg",
    "/images/menu/new/10.jpg",
    "/images/menu/new/11.jpg",
    "/images/menu/new/12.jpg",
    "/images/menu/new/13.jpg",
    "/images/menu/new/14.jpg",
  ];

  const outlets = {
    saheedNagar: {
      name: "Saheed Nagar Outlet",
      address: "Near Hotel Novotel, Maharishi College Rd, Saheed Nagar, Bhubaneswar, Odisha 751007",
      mapsLink: "https://maps.app.goo.gl/f1TYW4mgCycw8yP76",
      phone: "+91 81447 74349",
    },
    crpf: {
      name: "IRC Village Outlet (CRPF)",
      address: "Ekamra Kanan Road, near Chilika Fresh, Rental Colony, IRC Village, Nayapalli, Bhubaneswar, Odisha 751011",
      mapsLink: "https://maps.app.goo.gl/KUtSK3NEc3Qye86KA",
      phone: "+91 81447 74349",
    },
  };

  return (
    <div className="h-screen overflow-y-auto bg-[#0d1f33] text-gray-100 flex flex-col font-sans max-w-xl mx-auto shadow-2xl relative border-x border-gray-800 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">

      {/* Top Header: Brand & Info */}
      <header className="pt-6 pb-5 px-6 text-center bg-gradient-to-b from-[#162e49] to-[#0d1f33] backdrop-blur-md bg-opacity-95 border-b border-gray-800 flex flex-col items-center justify-center">
        <div className="mb-2">
          <Image
            src={logoLight}
            alt="The Captain's Cafe Logo"
            width={60}
            height={60}
            className="object-contain"
            priority
          />
        </div>
        <h1 className={` text-xl font-bold tracking-wider text-white uppercase`}>
          The Captain&apos;s Cafe
        </h1>
        <p className={`${montserrat.className} text-[10px] text-blue-300 tracking-widest uppercase mt-0.5 font-semibold`}>
          Sail Into Flavors
        </p>
        <p className="text-[11px] text-gray-400 mt-3">
          Menu available at both of our outlets
        </p>
      </header>

      {/* Middle: Menu Image Scroll Feed */}
      <main className="flex-grow p-1 space-y-1 bg-[#0d1f33]">
        {menuImages.map((src) => (
          <div
            key={src}
            className="overflow-hidden border border-gray-800 bg-[#0a1829] shadow-lg"
          >
            <div className="relative w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt="Cafe Menu Page"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </main>

      {/* Bottom: Mobile-Optimized Footer */}
      <footer className="bg-gradient-to-t from-[#091524] to-[#0d1f33] pt-8 pb-10 px-6 border-t border-gray-800 text-center">

        {/* Outlets Directory */}
        <div className="space-y-6 text-left mb-8">
          <h3 className="text-sm font-semibold tracking-wider text-[#d4af37] uppercase border-b border-gray-800 pb-2">
            Our Outlets
          </h3>

          {Object.entries(outlets).map(([key, outlet]) => (
            <div key={key} className="space-y-1">
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></span>
                {outlet.name}
              </h4>
              <p className="text-[11px] text-gray-400 leading-relaxed pl-3.5">
                {outlet.address}
              </p>
              <div className="flex gap-4 pt-1 pl-3.5">
                <a
                  href={outlet.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-blue-400 hover:underline flex items-center gap-1"
                >
                  <HiLocationMarker className="text-xs" /> View on Map
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Brand & Website */}
        <div className="pt-6 border-t border-gray-900 space-y-4">
          <div className="flex justify-center gap-2 items-center text-xs text-blue-300">
            <IoGlobeOutline className="text-sm text-[#d4af37]" />
            <a
              href="https://thecaptainscafe.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors tracking-wide"
            >
              thecaptainscafe.com
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-4">
            <a
              href="https://www.instagram.com/thecaptainscafe.india"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-2.5 rounded-full bg-[#122840] hover:bg-[#1c3a5c] text-white transition-colors"
            >
              <IoLogoInstagram className="text-sm" />
            </a>
            <a
              href="https://www.facebook.com/thecaptainscafe.india"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="p-2.5 rounded-full bg-[#122840] hover:bg-[#1c3a5c] text-white transition-colors"
            >
              <FaFacebookF className="text-sm" />
            </a>
          </div>

          <p className="text-[10px] text-gray-600 mt-4">
            &copy; {new Date().getFullYear()} <span className="pl-0.5"></span>The Captain&apos;s Cafe. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}


