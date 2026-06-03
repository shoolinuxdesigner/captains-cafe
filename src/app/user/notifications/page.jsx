"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoCheckmarkSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

const initialNotifications = [
  {
    id: 1,
    iconType: 'upi',
    title: 'Payment Confirmed!',
    titleColor: 'text-blue-600 dark:text-blue-400',
    message: 'Your order #CAFE4567 has been successfully processed. ₹1,250 has been deducted from your account. A receipt has been sent to user@example.com. Thank you for dining with us!',
    isRead: false,
    timestamp: 'Just now',
    details: {
      type: 'payment',
      orderId: '#CAFE4567',
      amount: '₹1,250',
      method: 'UPI (GPay / PhonePe)',
      date: 'June 2, 2026, 02:15 PM',
      email: 'user@example.com',
      items: [
        { name: "Signature Captain's Burger", qty: 2, price: 350 },
        { name: "Loaded Cheese Fries", qty: 1, price: 250 },
        { name: "Caramel Macchiato", qty: 2, price: 150 }
      ],
      tax: 150,
      total: 1250,
      timeline: [
        { status: "Order Placed", time: "02:10 PM", done: true },
        { status: "Payment Confirmed via UPI", time: "02:15 PM", done: true },
        { status: "Preparing Food", time: "In Progress", current: true },
        { status: "Out for Delivery", time: "Estimated 02:40 PM" }
      ]
    }
  },
  {
    id: 2,
    iconType: 'delivered',
    title: 'Your Food Has Arrived!',
    titleColor: 'text-green-600 dark:text-green-400',
    message: 'Order #CAFE4567 has been delivered to 123, Gourmet Street. Enjoy your meal! Share your feedback and get 10% off your next order.',
    isRead: false,
    timestamp: '1 hour ago',
    details: {
      type: 'delivery',
      orderId: '#CAFE4567',
      amount: '₹850',
      method: 'Credit Card',
      date: 'June 2, 2026, 01:10 PM',
      address: '123, Gourmet Street, Food Plaza, Sector 4',
      items: [
        { name: "Alfredo Pasta", qty: 1, price: 350 },
        { name: "Garlic Bread with Cheese", qty: 1, price: 200 },
        { name: "Virgin Mojito", qty: 2, price: 150 }
      ],
      tax: 150,
      total: 850,
      timeline: [
        { status: "Order Placed", time: "12:15 PM", done: true },
        { status: "Food Prepared", time: "12:40 PM", done: true },
        { status: "Out for Delivery", time: "12:50 PM", done: true },
        { status: "Delivered to Doorstep", time: "01:10 PM", done: true, highlight: true }
      ]
    }
  },
  {
    id: 3,
    iconType: 'delay',
    title: 'Slight Delay in Delivery',
    titleColor: 'text-amber-600 dark:text-amber-500',
    message: 'Due to high demand, your order #CAFE4567 is taking longer than expected. Expected delivery time is now 8:45 PM. We appreciate your patience!',
    isRead: false,
    timestamp: '2 hours ago',
    details: {
      type: 'delay',
      orderId: '#CAFE4567',
      amount: '₹700',
      method: 'UPI',
      date: 'June 2, 2026, 08:10 PM',
      eta: '08:45 PM (Originally 08:20 PM)',
      reason: 'High volume of weekend delivery requests & heavy rainfall in the vicinity.',
      items: [
        { name: "Double Cheese Pizza", qty: 1, price: 450 },
        { name: "Choco Lava Cake", qty: 1, price: 150 },
        { name: "Coca Cola Extra", qty: 2, price: 50 }
      ],
      tax: 50,
      total: 700,
      timeline: [
        { status: "Order Placed", time: "07:45 PM", done: true },
        { status: "Food Preparation Complete", time: "08:05 PM", done: true },
        { status: "Delivery Delayed (Rain)", time: "08:10 PM", done: true, warning: true },
        { status: "Out for Delivery", time: "Estimated 08:25 PM", current: true }
      ]
    }
  },
  {
    id: 4,
    iconType: 'cancelled',
    title: 'Order Cancelled',
    titleColor: 'text-red-600 dark:text-red-400',
    message: 'Your order #CAFE4567 has been cancelled as per your request. If this was a mistake, please reorder within 30 mins for priority processing.',
    isRead: false,
    timestamp: '4 hours ago',
    details: {
      type: 'cancelled',
      orderId: '#CAFE4567',
      amount: '₹950',
      method: 'Net Banking',
      date: 'June 2, 2026, 11:20 AM',
      reason: 'User requested cancellation prior to kitchen preparation start.',
      items: [
        { name: "Paneer Butter Masala", qty: 1, price: 320 },
        { name: "Butter Naan", qty: 3, price: 60 },
        { name: "Veg Biryani Combo", qty: 2, price: 225 }
      ],
      tax: 0,
      total: 950,
      timeline: [
        { status: "Order Placed", time: "11:10 AM", done: true },
        { status: "Cancellation Request Received", time: "11:18 AM", done: true },
        { status: "Order Cancelled Successfully", time: "11:20 AM", error: true },
        { status: "Refund Process Initiated", time: "Pending", current: true }
      ]
    }
  },
  {
    id: 5,
    iconType: 'refund',
    title: 'Refund Initiated',
    titleColor: 'text-[#0E467D] dark:text-blue-300',
    message: 'A refund of ₹1,250 for order #CAFE4517 has been processed. It may take 3-5 business days to reflect in your account.',
    isRead: false,
    timestamp: 'Yesterday',
    details: {
      type: 'refund',
      orderId: '#CAFE4517',
      amount: '₹1,250',
      method: 'Refund to Original Source (UPI)',
      date: 'June 1, 2026, 10:00 AM',
      transactionId: 'REF-89472390234',
      items: [
        { name: "Signature Captain's Burger", qty: 2, price: 350 },
        { name: "Loaded Cheese Fries", qty: 1, price: 250 },
        { name: "Caramel Macchiato", qty: 2, price: 150 }
      ],
      tax: 150,
      total: 1250,
      timeline: [
        { status: "Refund Requested", time: "June 1, 09:30 AM", done: true },
        { status: "Refund Processed by Captain's Cafe", time: "June 1, 10:00 AM", done: true },
        { status: "Awaiting Bank Settlement", time: "3-5 Business Days", current: true }
      ]
    }
  }
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeTab, setActiveTab] = useState('unread'); // 'all' | 'unread'

  // Mark single notification as read
  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif => notif.id === id ? { ...notif, isRead: true } : notif)
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  // Filtered notifications
  const filteredNotifications = notifications.filter(notif => {
    if (activeTab === 'unread') return !notif.isRead;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Icon renderer matching the reference image exactly
  const renderIcon = (type) => {
    switch (type) {
      case 'upi':
        return (
          <div className="w-12 h-12 rounded-lg bg-blue-600 flex flex-col items-center justify-center flex-shrink-0 text-white font-black text-sm tracking-tight italic select-none shadow-[0_2px_8px_rgba(37,99,235,0.2)]">
            UPI
          </div>
        );
      case 'delivered':
        return (
          <div className="w-12 h-12 rounded-full bg-[#16A34A] flex items-center justify-center flex-shrink-0 text-white shadow-[0_2px_8px_rgba(22,163,74,0.2)]">
            <IoCheckmarkSharp size={24} className="stroke-[3]" />
          </div>
        );
      case 'delay':
        return (
          <div className="w-12 h-12 rounded-full bg-[#D97706] flex items-center justify-center flex-shrink-0 text-white font-extrabold text-2xl shadow-[0_2px_8px_rgba(217,119,6,0.2)] select-none">
            !
          </div>
        );
      case 'cancelled':
        return (
          <div className="w-12 h-12 rounded-full bg-[#DC2626] flex items-center justify-center flex-shrink-0 text-white shadow-[0_2px_8px_rgba(220,38,38,0.2)]">
            <RxCross2 size={22} />
          </div>
        );
      case 'refund':
        return (
          <div className="w-12 h-12 rounded-full bg-[#0E467D] flex items-center justify-center flex-shrink-0 text-white font-bold text-xl shadow-[0_2px_8px_rgba(14,70,125,0.2)] select-none">
            ₹
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className='flex flex-col space-y-4'>
      {/* Notifications Header Card */}
      <div className="w-full px-3 md:px-6 py-5 rounded-xl bg-white dark:bg-neutral-800 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_-2px_rgba(0,0,0,0.3)] border border-gray-100 dark:border-neutral-700">

        {/* Header Action Row */}
        <div className="flex justify-between items-center pb-3">
          <div className="flex items-center gap-3">
            <h3 className='text-2xl font-bold text-[#0E467D] dark:text-blue-200 tracking-tight'>Notifications</h3>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs px-2.5 py-0.5 rounded-full font-bold animate-pulse shadow-md shadow-red-500/20">
                {unreadCount} new
              </span>
            )}
          </div>

          <button
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className={`hidden md:inline-block text-sm font-medium transition-all duration-200 uppercase tracking-wider ${unreadCount === 0
              ? 'text-gray-400 dark:text-neutral-500 cursor-not-allowed'
              : 'text-[#0E467D] dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold active:scale-95'
              }`}
          >
            Mark all as read
          </button>
        </div>

        <hr className='border-gray-100 dark:border-neutral-700' />

        {/* Dynamic Filters Bar */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => setActiveTab('unread')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all relative ${activeTab === 'unread'
              ? 'bg-blue-900 text-white shadow-md shadow-blue-500/25'
              : 'bg-gray-100 dark:bg-neutral-700 text-gray-600 dark:text-neutral-300 hover:bg-gray-200 dark:hover:bg-neutral-600'
              }`}
          >
            Unread ({unreadCount})
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${activeTab === 'all'
              ? 'bg-[#0E467D] text-white shadow-md shadow-[#0E467D]/25'
              : 'bg-gray-100 dark:bg-neutral-700 text-gray-600 dark:text-neutral-300 hover:bg-gray-200 dark:hover:bg-neutral-600'
              }`}
          >
            All ({notifications.length})
          </button>
        </div>

        {/* Notifications List Container */}
        <div className="mt-5 space-y-0 divide-y divide-gray-100 dark:divide-neutral-700">
          <AnimatePresence initial={false}>
            {filteredNotifications.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="py-12 flex flex-col items-center justify-center text-gray-400 dark:text-neutral-500"
              >
                <div className="w-16 h-16 rounded-full bg-gray-50 dark:bg-neutral-700/50 flex items-center justify-center mb-3">
                  <IoCheckmarkSharp size={32} className="text-gray-400 dark:text-neutral-500" />
                </div>
                <p className="text-sm font-medium tracking-wide">You are all caught up!</p>
                <p className="text-xs text-gray-400/80 dark:text-neutral-600 mt-1">No notifications to display.</p>
              </motion.div>
            ) : (
              filteredNotifications.map((notif) => (
                <motion.div
                  key={notif.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.25 }}
                  className={`py-5 flex flex-col md:flex-row items-start gap-2 md:gap-4 transition-all duration-300 ${notif.isRead
                    ? 'opacity-65 hover:opacity-90'
                    : 'bg-blue-50/10 dark:bg-blue-900/5 px-2 -mx-2 rounded-lg'
                    }`}
                >
                  {/* Left Column: Icon */}
                  <div className="hidden md:flex-shrink-0 mt-0.5">
                    {renderIcon(notif.iconType)}
                  </div>

                  {/* Middle Column: Title & Message */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className={`text-base font-bold ${notif.titleColor} tracking-tight`}>
                        {notif.title}
                      </h4>
                      {!notif.isRead && (
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-ping flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-[12px] md:text-[13.5px] leading-relaxed text-gray-600 dark:text-neutral-300 mt-1 font-light">
                      {notif.message}
                    </p>
                    <span className="text-[11px] text-gray-400 dark:text-neutral-500 mt-1.5 block font-medium">
                      {notif.timestamp}
                    </span>
                  </div>

                  {/* Right Column: Actions (Stacked Vertically like the Image) */}
                  <div className="flex-shrink-0 flex flex-row md:flex-col gap-2 items-end justify-center w-full md:w-auto mt-3 md:mt-0 select-none">
                    <AnimatePresence>
                      {!notif.isRead && (
                        <motion.button
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8, width: 0 }}
                          onClick={() => markAsRead(notif.id)}
                          className="border border-[#E58D52]/40 dark:border-[#E58D52]/60 text-[#E58D52] hover:bg-[#E58D52]/10 active:scale-95 text-[10.5px] font-bold tracking-wider py-1.5 px-3 w-full md:w-28 text-center rounded transition-all duration-200"
                        >
                          MARK AS READ
                        </motion.button>
                      )}
                    </AnimatePresence>
                    <button
                      className="border border-[#4E79A2]/40 dark:border-[#4E79A2]/60 text-[#4E79A2] text-[10.5px] font-bold tracking-wider py-1.5 px-3 w-full md:w-28 text-center rounded bg-white/50 dark:bg-neutral-800/50 cursor-default"
                    >
                      VIEW
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Notifications;