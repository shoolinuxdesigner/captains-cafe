'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, KeyRound, Eye, EyeOff, X, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const PASS_CODE = "itscc@2026";

const PasswordModal = ({ isOpen, onClose, onSuccess }) => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isShaking, setIsShaking] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setPassword('');
            setError('');
            setShowPassword(false);
            const timer = setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!password) {
            setError('Please enter the password');
            triggerShake();
            return;
        }

        if (password === PASS_CODE) {
            setError('');
            // toast.success('Access granted! Maintenance bypassed for 20 minutes.');
            onSuccess();
        } else {
            setError('Incorrect password. Please try again.');
            triggerShake();
        }
    };

    const triggerShake = () => {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <motion.div
                        className="relative w-full max-w-md bg-gradient-to-b from-gray-900 via-gray-900 to-[#08182b] border border-blue-500/30 rounded-2xl shadow-2xl p-6 md:p-8 text-white z-10 overflow-hidden"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            x: isShaking ? [-10, 10, -8, 8, -4, 4, 0] : 0,
                        }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{
                            duration: isShaking ? 0.4 : 0.25,
                            ease: 'easeOut',
                        }}
                    >
                        {/* Glow effect */}
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-yellow-500/15 rounded-full blur-3xl pointer-events-none" />

                        {/* Close button */}
                        <button
                            type="button"
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                            aria-label="Close modal"
                        >
                            <X size={18} />
                        </button>

                        <div className="flex flex-col items-center text-center mb-6">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-amber-500 p-0.5 shadow-lg shadow-blue-500/20 mb-4">
                                <div className="w-full h-full bg-gray-950 rounded-[14px] flex items-center justify-center">
                                    <Lock className="w-6 h-6 text-yellow-400" />
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold tracking-tight text-white">Staff Access</h2>
                            <p className="text-sm text-gray-400 mt-1">
                                Enter password to unlock 20-minute preview session
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                                        <KeyRound size={18} />
                                    </div>
                                    <input
                                        ref={inputRef}
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            if (error) setError('');
                                        }}
                                        placeholder="Enter password..."
                                        className={`w-full pl-10 pr-11 py-3 bg-gray-950/80 border ${error ? 'border-red-500 focus:border-red-500' : 'border-gray-700 focus:border-blue-500'
                                            } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all text-sm`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-white transition-colors cursor-pointer"
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>

                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-center gap-1.5 mt-2 text-xs text-red-400"
                                    >
                                        <AlertCircle size={14} className="shrink-0" />
                                        <span>{error}</span>
                                    </motion.div>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-medium rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all duration-200 active:scale-[0.98] cursor-pointer"
                            >
                                Unlock Website
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default PasswordModal;
