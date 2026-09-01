'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Timer, LogOut, GripVertical } from 'lucide-react';

const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

const MaintenanceTimerWidget = ({ timeLeft, onLogout }) => {
    const isWarning = timeLeft <= 120; // 2 minutes or less

    return (
        <motion.div
            drag
            dragMomentum={false}
            dragElastic={0.08}
            whileDrag={{ scale: 1.04, cursor: 'grabbing' }}
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed top-5 right-5 z-[99999] select-none cursor-grab active:cursor-grabbing"
        >
            <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-gray-950/90 backdrop-blur-md border border-yellow-500/40 shadow-2xl shadow-black/50 text-white transition-colors duration-300">
                {/* Drag Grip Handle */}
                <div className="text-gray-400 hover:text-gray-200 transition-colors pointer-events-none" title="Drag to reposition">
                    <GripVertical size={14} />
                </div>

                {/* Live Countdown Timer */}
                <div className="flex items-center gap-1.5 font-mono text-sm tracking-wider font-semibold">
                    <Timer
                        size={15}
                        className={`${
                            isWarning ? 'text-red-400 animate-pulse' : 'text-yellow-400'
                        } shrink-0`}
                    />
                    <span className={isWarning ? 'text-red-400 animate-pulse' : 'text-yellow-300'}>
                        {formatTime(timeLeft)}
                    </span>
                </div>

                {/* Subtle Divider */}
                <div className="w-[1px] h-4 bg-gray-700/80" />

                {/* Logout Icon Button (NO TEXT) */}
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onLogout();
                    }}
                    onPointerDown={(e) => e.stopPropagation()}
                    className="p-1.5 rounded-full text-red-400 hover:text-red-300 hover:bg-red-500/20 active:scale-90 transition-all cursor-pointer"
                    title="Lock & Return to Maintenance"
                    aria-label="Logout and return to maintenance mode"
                >
                    <LogOut size={15} />
                </button>
            </div>
        </motion.div>
    );
};

export default MaintenanceTimerWidget;
