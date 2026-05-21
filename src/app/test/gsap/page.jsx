"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

import { GiHamburgerMenu } from "react-icons/gi";
import { Coffee, Compass, MapPin, Clock, Sparkles, ChevronRight, Gift, BookOpen, Utensils } from "lucide-react";

const GsapTesting = () => {
    const boxRef = useRef(null);
    const animatedBox1 = useRef(null);
    const animatedBox2 = useRef(null);
    const animatedBox3 = useRef(null);
    const animatedBox4 = useRef(null);
    const containerRef = useRef(null);
    const topMegaMenu = useRef(null);

    // Click Event
    const handleClick = () => {
        gsap.to(animatedBox1.current, {
            x: 200,
            rotation: 360,
            duration: 0.8,
            ease: 'power2.out'
        })
    }
    // end

    // Hover Event
    const handleMouseEnter = () => {
        gsap.to(animatedBox2.current, {
            scale: 1.3,
            backgroundColor: '#ff6600',
            duration: 0.3,
            ease: 'power1.out'
        })
    }
    const handleMouseLeave = () => {
        gsap.to(animatedBox2.current, {
            scale: 1,
            backgroundColor: '#ff0000',
            duration: 0.3,
            ease: 'power1.out'
        })
    }
    // end

    // Toggle Case
    const [toggled, setToggled] = useState(false)
    const handleToggleClick = () => {
        if (!toggled) {
            gsap.to(animatedBox3.current, { x: 200, duration: 0.5, ease: 'bounce.out' })
        } else {
            gsap.to(animatedBox3.current, { x: 0, duration: 0.5, ease: 'power2.inOut' })
        }
        setToggled(!toggled)
    }
    // end

    // Timeline Click EVent
    const handleTimelineClick = () => {
        const tl = gsap.timeline()

        tl.to(animatedBox4.current, { x: 150, duration: 0.4 })
            .to(animatedBox4.current, { y: 100, duration: 0.3 })
            .to(animatedBox4.current, { rotation: 180, duration: 0.4 })
            .to(animatedBox4.current, { x: 0, y: 0, rotation: 0, duration: 0.6, ease: 'elastic.out' })
    }

    // Menu Setting
    const [triggerOpen, setTriggerOpen] = useState(false)
    const openMenu = () => {
        if (!triggerOpen) {
            gsap.to(topMegaMenu.current, { y: 0, duration: 0.5, ease: 'power2.inOut' })
        } else {
            gsap.to(topMegaMenu.current, { y: '-100%', duration: 0.5, ease: 'power2.inOut' })
        }
        setTriggerOpen(!triggerOpen)
    }
    // end

    useEffect(() => {
        const W = containerRef.current.offsetWidth;

        gsap.set(boxRef.current, { force3D: true }); // 👈 enable GPU from start

        const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

        tl.fromTo(boxRef.current,
            { x: -50 },
            { x: W * 0.33, rotation: "+=360", duration: 3, ease: "power2.inOut" })
            .to(boxRef.current, { duration: 1 })
            .to(boxRef.current, { x: W * 0.65, rotation: "+=360", duration: 3, ease: "power2.inOut" })
            .to(boxRef.current, { duration: 1 })
            .to(boxRef.current, { x: W * 1, rotation: "+=360", duration: 3, ease: "power2.inOut" });

        return () => tl.kill();
    }, []);

    return (
        <div className="container mt-40">
            <div
                className="bg-red-50"
                ref={containerRef}
                style={{ position: "relative", height: 120 }}
            >
                <div
                    ref={boxRef}
                    style={{
                        width: 115,
                        height: 115,
                        position: "absolute",
                        top: 0,
                        willChange: "transform",     // 👈 GPU hint
                        transform: "translateZ(0)",  // 👈 force GPU layer
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="115"
                        height="115"
                        viewBox="0 0 115 115"
                        fill="none"
                    >
                        <circle cx="57.5" cy="57.5" r="53.5" stroke="black" strokeWidth="8" />
                        <rect x="54" width="7" height="115" rx="1" fill="black" />
                        <rect x="95.6838" y="14.3665" width="7" height="115" rx="1" transform="rotate(45 95.6838 14.3665)" fill="black" />
                        <rect x="115" y="55" width="7" height="115" rx="1" transform="rotate(90 115 55)" fill="black" />
                        <rect x="99.9264" y="96.3909" width="7" height="115" rx="1" transform="rotate(135 99.9264 96.3909)" fill="black" />
                    </svg>
                </div>
            </div>
            <div>
                <button onClick={handleClick}>Click Me</button>
                <div ref={animatedBox1} style={{ width: 100, height: 100, background: 'red' }} />
            </div>
            <div
                ref={animatedBox2}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ width: 100, height: 100, background: 'red', cursor: 'pointer' }}
            >
                Hover Me
            </div>

            <div>
                <button onClick={handleToggleClick}>Toggle</button>
                <div ref={animatedBox3} style={{ width: 100, height: 100, background: 'blue' }} />
            </div>

            <div>
                <button onClick={handleTimelineClick}>Run Timeline</button>
                <div ref={animatedBox4} style={{ width: 100, height: 100, background: 'green' }} />
            </div>
            <div>
                <button className="p-2 bg-green-900 rounded-lg mt-12 cursor-pointer" onClick={openMenu}>
                    <GiHamburgerMenu className="text-white text-4xl" />
                </button>
                <div className="w-full fixed top-16 left-0 -translate-y-[100%]" ref={topMegaMenu}>
                    <div className="container mx-auto">
                        <div className="bg-[#160701] backdrop-blur-xl border border-zinc-800/80 text-white rounded-br-3xl rounded-bl-3xl shadow-2xl p-8 md:p-10 !pt-20 grid grid-cols-1 md:grid-cols-4 gap-16">
                            {/* Column 1: Specialty Brews */}
                            <div>
                                <div className="flex items-center gap-2 mb-6">
                                    <Coffee className="w-5 h-5 text-amber-500 animate-pulse" />
                                    <h3 className="font-bold text-lg tracking-wider text-amber-500 uppercase">Specialty Brews</h3>
                                </div>
                                <ul className="space-y-4">
                                    <li className="group cursor-pointer">
                                        <div className="flex justify-between items-start">
                                            <span className="font-semibold text-zinc-100 group-hover:text-amber-400 transition-colors duration-200">Captain's Gold Latte</span>
                                            <span className="text-xs font-bold bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full">New</span>
                                        </div>
                                        <p className="text-xs text-zinc-400 mt-1 leading-relaxed group-hover:text-zinc-300 transition-colors duration-200">
                                            Double espresso with organic raw honey and oat milk.
                                        </p>
                                    </li>
                                    <li className="group cursor-pointer">
                                        <div className="flex justify-between items-start">
                                            <span className="font-semibold text-zinc-100 group-hover:text-amber-400 transition-colors duration-200">Sea Salt Cold Brew</span>
                                            <span className="text-zinc-400 text-xs">$6.50</span>
                                        </div>
                                        <p className="text-xs text-zinc-400 mt-1 leading-relaxed group-hover:text-zinc-300 transition-colors duration-200">
                                            Slow steeped for 24 hours, topped with sweet salted cream.
                                        </p>
                                    </li>
                                    <li className="group cursor-pointer">
                                        <div className="flex justify-between items-start">
                                            <span className="font-semibold text-zinc-100 group-hover:text-amber-400 transition-colors duration-200">Crimson Berry Infusion</span>
                                            <span className="text-zinc-400 text-xs">$5.75</span>
                                        </div>
                                        <p className="text-xs text-zinc-400 mt-1 leading-relaxed group-hover:text-zinc-300 transition-colors duration-200">
                                            Steeped organic hibiscus with fresh lemon, ginger & mint.
                                        </p>
                                    </li>
                                    <li className="group cursor-pointer">
                                        <div className="flex justify-between items-start">
                                            <span className="font-semibold text-zinc-100 group-hover:text-amber-400 transition-colors duration-200">Dark Tempest Mocha</span>
                                            <span className="text-xs font-bold bg-zinc-800 text-amber-400 px-2 py-0.5 rounded-full">Signature</span>
                                        </div>
                                        <p className="text-xs text-zinc-400 mt-1 leading-relaxed group-hover:text-zinc-300 transition-colors duration-200">
                                            70% dark Belgian chocolate with double espresso & a dash of nutmeg.
                                        </p>
                                    </li>
                                </ul>
                            </div>

                            {/* Column 2: Artisanal Bakes */}
                            <div>
                                <div className="flex items-center gap-2 mb-6">
                                    <Utensils className="w-5 h-5 text-amber-500" />
                                    <h3 className="font-bold text-lg tracking-wider text-amber-500 uppercase">Artisanal Bakes</h3>
                                </div>
                                <ul className="space-y-4">
                                    <li className="group cursor-pointer flex justify-between items-center py-1.5 border-b border-zinc-900 hover:border-zinc-800 transition-all duration-300">
                                        <div>
                                            <span className="font-medium text-zinc-200 group-hover:text-amber-400 transition-colors duration-200">Golden Butter Croissant</span>
                                            <p className="text-[10px] text-zinc-500">Baked fresh at 5:00 AM daily</p>
                                        </div>
                                        <span className="text-sm font-semibold text-zinc-300 group-hover:text-white transition-colors duration-200">$4.50</span>
                                    </li>
                                    <li className="group cursor-pointer flex justify-between items-center py-1.5 border-b border-zinc-900 hover:border-zinc-800 transition-all duration-300">
                                        <div>
                                            <span className="font-medium text-zinc-200 group-hover:text-amber-400 transition-colors duration-200">Wild Blueberry Scone</span>
                                            <p className="text-[10px] text-zinc-500">Served warm with clotted cream</p>
                                        </div>
                                        <span className="text-sm font-semibold text-zinc-300 group-hover:text-white transition-colors duration-200">$4.75</span>
                                    </li>
                                    <li className="group cursor-pointer flex justify-between items-center py-1.5 border-b border-zinc-900 hover:border-zinc-800 transition-all duration-300">
                                        <div>
                                            <span className="font-medium text-zinc-200 group-hover:text-amber-400 transition-colors duration-200">Sea-Salt Chocolate Tart</span>
                                            <p className="text-[10px] text-zinc-500">Fleur de sel & single-origin cacao</p>
                                        </div>
                                        <span className="text-sm font-semibold text-zinc-300 group-hover:text-white transition-colors duration-200">$6.00</span>
                                    </li>
                                    <li className="group cursor-pointer flex justify-between items-center py-1.5 border-b border-zinc-900 hover:border-zinc-800 transition-all duration-300">
                                        <div>
                                            <span className="font-medium text-zinc-200 group-hover:text-amber-400 transition-colors duration-200">Pistachio Cardamom Swirl</span>
                                            <p className="text-[10px] text-zinc-500">Crushed roasted nuts & sweet glaze</p>
                                        </div>
                                        <span className="text-sm font-semibold text-zinc-300 group-hover:text-white transition-colors duration-200">$5.50</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Column 3: The Journey */}
                            <div>
                                <div className="flex items-center gap-2 mb-6">
                                    <Compass className="w-5 h-5 text-amber-500" />
                                    <h3 className="font-bold text-lg tracking-wider text-amber-500 uppercase">The Journey</h3>
                                </div>
                                <ul className="space-y-3">
                                    <li className="group flex items-center gap-3 cursor-pointer p-2 rounded-xl hover:bg-zinc-900 transition-all duration-300">
                                        <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-colors duration-300">
                                            <BookOpen className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <span className="text-sm font-semibold text-zinc-200 group-hover:text-amber-400 transition-colors duration-200 block">Book A Table</span>
                                            <span className="text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors duration-200">Reserve ocean-view slots</span>
                                        </div>
                                        <ChevronRight className="w-4 h-4 ml-auto text-zinc-600 group-hover:text-amber-400 group-hover:translate-x-1 transition-all duration-300" />
                                    </li>
                                    <li className="group flex items-center gap-3 cursor-pointer p-2 rounded-xl hover:bg-zinc-900 transition-all duration-300">
                                        <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-colors duration-300">
                                            <MapPin className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <span className="text-sm font-semibold text-zinc-200 group-hover:text-amber-400 transition-colors duration-200 block">Anchor Points</span>
                                            <span className="text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors duration-200">Find the closest cafe</span>
                                        </div>
                                        <ChevronRight className="w-4 h-4 ml-auto text-zinc-600 group-hover:text-amber-400 group-hover:translate-x-1 transition-all duration-300" />
                                    </li>
                                    <li className="group flex items-center gap-3 cursor-pointer p-2 rounded-xl hover:bg-zinc-900 transition-all duration-300">
                                        <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-colors duration-300">
                                            <Clock className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <span className="text-sm font-semibold text-zinc-200 group-hover:text-amber-400 transition-colors duration-200 block">Roasting Hours</span>
                                            <span className="text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors duration-200">Daily: 6:00 AM - 10:00 PM</span>
                                        </div>
                                        <ChevronRight className="w-4 h-4 ml-auto text-zinc-600 group-hover:text-amber-400 group-hover:translate-x-1 transition-all duration-300" />
                                    </li>
                                </ul>
                            </div>

                            {/* Column 4: Promo Banner */}
                            <div className="bg-gradient-to-br from-amber-600/90 to-amber-900/90 rounded-2xl p-6 text-white flex flex-col justify-between border border-amber-700/50 shadow-lg relative overflow-hidden group hover:scale-[1.02] transition-all duration-300">
                                <div>
                                    <div className="flex items-center gap-2 mb-2 bg-black/20 backdrop-blur-sm self-start px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-amber-200 w-fit">
                                        <Sparkles className="w-3.5 h-3.5" />
                                        Weekly Special
                                    </div>
                                    <h4 className="font-extrabold text-2xl tracking-tight leading-tight mt-3">20% Off Your First Shipwreck Roast</h4>
                                    <p className="text-xs text-amber-100/80 mt-2 leading-relaxed">
                                        Order our freshly harvested, deep-sea roasted whole beans directly to your cabin.
                                    </p>
                                </div>
                                <div className="mt-6 space-y-3">
                                    <div className="bg-black/30 border border-white/10 rounded-xl p-2.5 flex justify-between items-center text-xs font-mono">
                                        <span className="text-white/60">PROMO CODE:</span>
                                        <span className="font-bold text-amber-300 tracking-wider">CAPTAIN20</span>
                                    </div>
                                    <button className="w-full bg-white text-amber-950 hover:bg-amber-100 font-bold py-2.5 px-4 rounded-xl text-xs transition-colors duration-300 shadow-md flex items-center justify-center gap-1.5 cursor-pointer">
                                        <Gift className="w-4 h-4" />
                                        Claim Your Beans
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GsapTesting;