// npm install framer-motion

'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaClock, FaKey } from 'react-icons/fa';
import logoLight from "../../../assets/images/logo_light.png"
import Image from 'next/image';
import PasswordModal from './PasswordModal';

const MaintenancePage = ({ onUnlock }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="relative w-full flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0B2545] via-[#08182b] to-black text-white px-4 overflow-hidden">
            {/* Ambient background glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

            <motion.div
                className="relative text-center max-w-xl z-10"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <motion.div
                    className="flex justify-center text-yellow-400 mb-6"
                    initial={{ rotateY: 0 }}
                    animate={{ rotateY: 360 }}
                    transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                >
                    <Image src={logoLight} alt='logo' width={120} />
                </motion.div>

                <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">We&apos;re Under Maintenance</h1>
                <p className="text-lg md:text-xl text-gray-300 mb-6 font-light">
                    Our website is getting a quick tune-up to serve you better. We&apos;ll be back shortly!
                </p>

                <div className="flex justify-center items-center gap-2 text-gray-400 text-sm mb-8">
                    <FaClock className="text-yellow-400" />
                    <span>Expected back soon</span>
                </div>

                {/* Staff Access Button */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 hover:border-yellow-400/50 text-white font-medium text-sm transition-all duration-300 backdrop-blur-md shadow-lg hover:shadow-yellow-400/20 hover:scale-105 active:scale-95 cursor-pointer group"
                    >
                        <FaKey className="text-yellow-400 group-hover:rotate-45 transition-transform duration-300" />
                        <span>Website Access</span>
                    </button>
                </motion.div>
            </motion.div>

            {/* Password Modal */}
            <PasswordModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={() => {
                    setIsModalOpen(false);
                    if (onUnlock) onUnlock();
                }}
            />
        </div>
    );
};

export default MaintenancePage;

