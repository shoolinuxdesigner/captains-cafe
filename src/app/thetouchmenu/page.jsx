"use client";

import React, { useState } from "react";
import Image from "next/image";
import logoLight from "@/assets/images/logo_light.png";
import { FaFacebookF } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";
import { MdCall } from "react-icons/md";
import { HiLocationMarker } from "react-icons/hi";
import { IoGlobeOutline } from "react-icons/io5";
import { BsFillPinAngleFill, BsPenFill, BsTrash, BsCardList } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { Cinzel, Montserrat } from "next/font/google";

import menu0 from "../../../public/images/menu/new/0.jpg";
import menu1 from "../../../public/images/menu/new/1.jpg";
import menu2 from "../../../public/images/menu/new/2.jpg";
import menu3 from "../../../public/images/menu/new/3.jpg";
import menu4 from "../../../public/images/menu/new/4.jpg";
import menu5 from "../../../public/images/menu/new/5.jpg";
import menu6 from "../../../public/images/menu/new/6.jpg";
import menu7 from "../../../public/images/menu/new/7.jpg";
import menu8 from "../../../public/images/menu/new/8.jpg";
import menu9 from "../../../public/images/menu/new/9.jpg";
import menu10 from "../../../public/images/menu/new/10.jpg";
import menu11 from "../../../public/images/menu/new/11.jpg";
import menu12 from "../../../public/images/menu/new/12.jpg";
import menu13 from "../../../public/images/menu/new/13.jpg";
import menu14 from "../../../public/images/menu/new/14.jpg";
import menu15 from "../../../public/images/menu/new/15.jpg";

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
  const [activeTool, setActiveTool] = useState(null); // 'pin' | 'pen' | null
  const [pins, setPins] = useState([]); // { id, imgIndex, x, y, note: "" }
  const [drawings, setDrawings] = useState({}); // { [imgIndex]: [ { id, points: [{x,y}], color } ] }
  const [activeLine, setActiveLine] = useState(null); // { imgIndex, points: [{x,y}], color }
  const [selectedColor, setSelectedColor] = useState("#d4af37"); // Gold, Red, Blue
  const [activePinForNote, setActivePinForNote] = useState(null); // { id, note }
  const [isSummaryOpen, setIsSummaryOpen] = useState(false); // List of selected items for waiter

  const pointsToPath = (points) => {
    if (!points || points.length === 0) return "";
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      d += ` L ${points[i].x} ${points[i].y}`;
    }
    return d;
  };

  const getRelativeCoords = (e, containerRect) => {
    let clientX, clientY;
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if (e.changedTouches && e.changedTouches.length > 0) {
      clientX = e.changedTouches[0].clientX;
      clientY = e.changedTouches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    const x = ((clientX - containerRect.left) / containerRect.width) * 100;
    const y = ((clientY - containerRect.top) / containerRect.height) * 100;
    return { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) };
  };

  const handleDrawStart = (e, imgIndex) => {
    if (activeTool !== "pen") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const coord = getRelativeCoords(e, rect);
    setActiveLine({
      imgIndex,
      points: [coord],
      color: selectedColor,
    });
  };

  const handleDrawMove = (e, imgIndex) => {
    if (activeTool !== "pen" || !activeLine || activeLine.imgIndex !== imgIndex) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const coord = getRelativeCoords(e, rect);
    setActiveLine((prev) => ({
      ...prev,
      points: [...prev.points, coord],
    }));
  };

  const handleDrawEnd = (imgIndex) => {
    if (activeTool !== "pen" || !activeLine || activeLine.imgIndex !== imgIndex) return;
    const lineId = Date.now();
    setDrawings((prev) => {
      const imgLines = prev[imgIndex] || [];
      return {
        ...prev,
        [imgIndex]: [...imgLines, { id: lineId, points: activeLine.points, color: activeLine.color }],
      };
    });
    setActiveLine(null);
  };

  const handleImageClick = (e, imgIndex) => {
    if (activeTool !== "pin") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const newPin = {
      id: Date.now(),
      imgIndex,
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
      note: "",
    };
    setPins((prev) => [...prev, newPin]);
    setActivePinForNote(newPin);
  };

  const menuImages = [
    menu0,
    menu1,
    menu2,
    menu3,
    menu4,
    menu5,
    menu6,
    menu7,
    menu8,
    menu9,
    menu10,
    menu11,
    menu12,
    menu13,
    menu14,
    menu15,
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
    <div className="h-screen w-full max-w-xl mx-auto relative overflow-hidden bg-[#0d1f33] text-gray-100 flex flex-col font-sans shadow-2xl border-x border-gray-800">

      {/* Scrollable Container */}
      <div className="flex-grow overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden flex flex-col relative">

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
            This Menu Is Available at Both of Our Outlets
          </p>
        </header>

        {/* Middle: Menu Image Scroll Feed */}
        <main className="flex-grow p-1 space-y-1 bg-[#0d1f33]">
          {menuImages.map((src, index) => (
            <div
              key={index}
              onClick={(e) => {
                if (activeTool === "pin") {
                  handleImageClick(e, index);
                }
              }}
              className="overflow-hidden border border-gray-800 bg-[#0a1829] shadow-lg relative w-full select-none"
            >
              {/* The Menu Image */}
              <Image
                src={src}
                alt={`Cafe Menu Page ${index + 1}`}
                className="w-full h-auto object-contain select-none pointer-events-none"
                placeholder="blur"
                priority={index < 2}
                sizes="(max-width: 600px) 100vw, 600px"
                loading={index < 2 ? undefined : "lazy"}
              />

              {/* Drawing SVG Overlay */}
              {((drawings[index] && drawings[index].length > 0) || (activeLine && activeLine.imgIndex === index)) && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {drawings[index]?.map((line) => (
                    <path
                      key={line.id}
                      d={pointsToPath(line.points)}
                      stroke={line.color}
                      strokeWidth="1.2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  ))}
                  {activeLine && activeLine.imgIndex === index && (
                    <path
                      d={pointsToPath(activeLine.points)}
                      stroke={activeLine.color}
                      strokeWidth="1.2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}
                </svg>
              )}

              {/* Drawing Gesture Overlay */}
              {activeTool === "pen" && (
                <div
                  className="absolute inset-0 z-20 touch-none cursor-crosshair"
                  onMouseDown={(e) => handleDrawStart(e, index)}
                  onMouseMove={(e) => handleDrawMove(e, index)}
                  onMouseUp={() => handleDrawEnd(index)}
                  onMouseLeave={() => handleDrawEnd(index)}
                  onTouchStart={(e) => handleDrawStart(e, index)}
                  onTouchMove={(e) => handleDrawMove(e, index)}
                  onTouchEnd={() => handleDrawEnd(index)}
                />
              )}

              {/* Pins Overlay */}
              {pins.filter((pin) => pin.imgIndex === index).map((pin, pIndex) => (
                <button
                  key={pin.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePinForNote(pin);
                  }}
                  style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center group"
                >
                  {/* Glowing Aura */}
                  <span className="absolute inline-flex h-8 w-8 rounded-full bg-[#d4af37] opacity-65 animate-ping"></span>
                  {/* Center Pin Button */}
                  <span className="relative flex items-center justify-center rounded-full h-6 w-6 bg-[#d4af37] text-[#0d1f33] font-bold text-xs border border-white shadow-xl hover:scale-110 transition-transform">
                    {pin.note ? "📝" : pIndex + 1}
                  </span>
                  {/* Quick Note Tooltip on hover */}
                  {pin.note && (
                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-[#0d1f33] text-xs text-white px-2 py-1 rounded shadow-lg border border-gray-800 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      {pin.note}
                    </span>
                  )}
                </button>
              ))}
            </div>
          ))}
        </main>

        {/* Bottom: Mobile-Optimized Footer */}
        <footer className="bg-gradient-to-t from-[#091524] to-[#0d1f33] p-4 border-t border-gray-800 text-center">

          {/* Outlets Directory */}
          <div className="space-y-6 text-left mb-8">
            <h3 className="text-md font-semibold tracking-wider text-[#d4af37] uppercase border-b border-gray-800 pb-2">
              Our Outlets
            </h3>

            {Object.entries(outlets).map(([key, outlet]) => (
              <div key={key} className="space-y-1">
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></span>
                  {outlet.name}
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed pl-3.5">
                  {outlet.address}
                </p>
                <div className="flex gap-4 pt-1 pl-3.5">
                  <a
                    href={outlet.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:underline flex items-center gap-1"
                  >
                    <HiLocationMarker className="text-xs" /> View on Map
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Brand & Website */}
          <div className="pt-3 border-t border-gray-900 space-y-4">
            <div className="flex justify-center gap-2 items-center text-sm text-blue-300">
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

      </div> {/* End Scrollable Container */}

      {/* Floating Instructions Banner */}
      {activeTool && (
        <div className="absolute top-0 left-0 right-0 z-40 bg-[#d4af37] text-[#0d1f33] px-4 py-2.5 text-xs font-bold text-center flex items-center justify-between shadow-md">
          <div className="flex items-center gap-1.5 mx-auto">
            {activeTool === "pin" ? (
              <>
                <span>📌</span>
                <span>Tapping Mode Active: Tap menu items to pin them. Tapped pins can hold notes.</span>
              </>
            ) : (
              <>
                <span>✏️</span>
                <span>Drawing Mode Active: Draw anywhere on the menu pictures.</span>
              </>
            )}
          </div>
          <button
            onClick={() => setActiveTool(null)}
            className="bg-[#0d1f33] text-white px-2 py-0.5 rounded text-[10px] uppercase font-bold"
          >
            Done
          </button>
        </div>
      )}

      {/* Floating Actions Dock */}
      <div className="absolute bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {activeTool && (
          <div className="flex flex-col gap-2.5 items-end animate__animated animate__fadeInUp animate__faster">
            {/* Clear All Button */}
            <button
              onClick={() => {
                if (confirm("Clear all pins and drawings?")) {
                  setPins([]);
                  setDrawings({});
                }
              }}
              className="bg-red-600 hover:bg-red-700 text-white w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95"
              title="Clear all highlights"
            >
              <BsTrash className="text-lg" />
            </button>

            {/* Selection summary button */}
            {pins.length > 0 && (
              <button
                onClick={() => setIsSummaryOpen(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 h-11 rounded-full flex items-center justify-center gap-1.5 shadow-lg transition-transform active:scale-95 text-xs font-bold"
              >
                <BsCardList className="text-base" />
                <span>Selection List ({pins.length})</span>
              </button>
            )}

            {/* Color selectors when in Pen Mode */}
            {activeTool === "pen" && (
              <div className="flex gap-2 bg-[#091524] border border-gray-800 p-2 rounded-full shadow-lg">
                {["#d4af37", "#ef4444", "#06b6d4"].map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    style={{ backgroundColor: color }}
                    className={`w-6 h-6 rounded-full border-2 ${selectedColor === color ? "border-white scale-110" : "border-transparent opacity-80"
                      } transition-all`}
                  />
                ))}
              </div>
            )}

            {/* Tool Selector Toggle */}
            <div className="flex bg-[#0a1829] border border-gray-800 p-1.5 rounded-full shadow-2xl items-center gap-1">
              <button
                onClick={() => setActiveTool("pin")}
                className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 transition-all ${activeTool === "pin" ? "bg-[#d4af37] text-[#0d1f33]" : "text-gray-400 hover:text-white"
                  }`}
              >
                <BsFillPinAngleFill className="text-sm" />
                <span>Pin Spot</span>
              </button>
              <button
                onClick={() => setActiveTool("pen")}
                className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 transition-all ${activeTool === "pen" ? "bg-[#d4af37] text-[#0d1f33]" : "text-gray-400 hover:text-white"
                  }`}
              >
                <BsPenFill className="text-sm" />
                <span>Pen Draw</span>
              </button>
            </div>
          </div>
        )}

        {/* Main Tool Toggle FAB */}
        <button
          onClick={() => setActiveTool((prev) => (prev ? null : "pin"))}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all active:scale-95 ${activeTool
              ? "bg-[#0a1829] border border-gray-800 text-white hover:bg-slate-800"
              : "bg-gradient-to-r from-[#d4af37] to-[#eac75d] text-[#0d1f33] hover:scale-105"
            }`}
        >
          {activeTool ? (
            <IoCloseSharp className="text-2xl" />
          ) : (
            <div className="relative flex flex-col items-center">
              <BsPenFill className="text-lg animate-pulse" />
              <span className="text-[8px] font-bold tracking-tight mt-0.5">MARK</span>
            </div>
          )}
        </button>
      </div>

      {/* Note Editor Overlay Modal */}
      {activePinForNote && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0a1829] border border-gray-800 w-full max-w-xs rounded-2xl p-5 shadow-2xl space-y-4 animate__animated animate__zoomIn animate__faster">
            <div className="flex justify-between items-center border-b border-gray-800 pb-2.5">
              <h3 className="text-sm font-semibold text-[#d4af37] uppercase tracking-wider flex items-center gap-1.5">
                <span>📌</span> Selection Note
              </h3>
              <button
                onClick={() => setActivePinForNote(null)}
                className="text-gray-400 hover:text-white"
              >
                <IoCloseSharp className="text-xl" />
              </button>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] text-gray-400">Specify item / quantity / custom request:</label>
              <input
                type="text"
                placeholder="e.g., 2 Chili Chicken (Dry)"
                value={activePinForNote.note || ""}
                onChange={(e) => {
                  const text = e.target.value;
                  setPins((prev) =>
                    prev.map((p) => (p.id === activePinForNote.id ? { ...p, note: text } : p))
                  );
                  setActivePinForNote((prev) => ({ ...prev, note: text }));
                }}
                className="w-full bg-[#122840] border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37] transition-colors"
                autoFocus
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  setPins((prev) => prev.filter((p) => p.id !== activePinForNote.id));
                  setActivePinForNote(null);
                }}
                className="flex-1 bg-red-600/20 text-red-400 hover:bg-red-600/30 border border-red-500/20 py-2 rounded-xl text-xs font-bold transition-all active:scale-95"
              >
                Remove Pin
              </button>
              <button
                onClick={() => setActivePinForNote(null)}
                className="flex-1 bg-[#d4af37] hover:bg-[#e2c153] text-[#0d1f33] py-2 rounded-xl text-xs font-bold transition-all active:scale-95"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Waiter Selection List Tray Modal */}
      {isSummaryOpen && (
        <div className="absolute inset-0 bg-[#0d1f33] z-50 flex flex-col">
          {/* Header */}
          <div className="bg-[#162e49] border-b border-gray-800 px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">📋</span>
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#d4af37]">Waiter Selection List</h2>
                <p className="text-[10px] text-gray-400 uppercase">Show this screen to the waiter</p>
              </div>
            </div>
            <button
              onClick={() => setIsSummaryOpen(false)}
              className="p-1.5 rounded-full bg-[#122840] text-gray-400 hover:text-white transition-colors"
            >
              <IoCloseSharp className="text-lg" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-grow p-5 overflow-y-auto space-y-4">
            {pins.length === 0 ? (
              <div className="text-center py-10 space-y-2">
                <span className="text-4xl block">📌</span>
                <p className="text-sm text-gray-400">No items pinned.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {pins.map((pin, index) => (
                  <div
                    key={pin.id}
                    className="bg-[#0a1829] border border-gray-800 p-3.5 rounded-xl flex items-start justify-between gap-3 shadow-lg"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="bg-[#d4af37] text-[#0d1f33] text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                          {index + 1}
                        </span>
                        <span className="text-[10px] text-blue-300 font-semibold uppercase tracking-wider">
                          Page {pin.imgIndex + 1} Pin
                        </span>
                      </div>
                      <p className="text-sm text-white font-medium pl-7 leading-relaxed">
                        {pin.note || "Spot marked on menu picture"}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setPins((prev) => prev.filter((p) => p.id !== pin.id));
                        if (pins.length === 1) setIsSummaryOpen(false);
                      }}
                      className="text-gray-500 hover:text-red-400 p-1 rounded transition-colors"
                    >
                      <BsTrash className="text-sm" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-5 bg-[#0a1829] border-t border-gray-900 flex gap-3">
            <button
              onClick={() => {
                if (confirm("Clear all selections?")) {
                  setPins([]);
                  setDrawings({});
                  setIsSummaryOpen(false);
                }
              }}
              className="flex-grow border border-red-500/20 text-red-400 hover:bg-red-600/10 py-3 rounded-xl text-xs font-bold uppercase transition-all active:scale-95"
            >
              Clear All
            </button>
            <button
              onClick={() => setIsSummaryOpen(false)}
              className="flex-grow bg-[#d4af37] hover:bg-[#e2c153] text-[#0d1f33] py-3 rounded-xl text-xs font-bold uppercase transition-all active:scale-95"
            >
              Back to Menu
            </button>
          </div>
        </div>
      )}

    </div>
  );
}