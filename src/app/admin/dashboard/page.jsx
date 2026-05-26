"use client";
import React, { useState, useMemo } from 'react';
import styles from './style.module.css';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

// Icons
import { MdTouchApp, MdOutlineTableRestaurant, MdAccessTime, MdOutlineLocalPhone, MdOutlineEmail, MdOutlineLocationOn, MdOutlineSkipNext } from "react-icons/md";
import { FiTrendingUp, FiTrendingDown, FiEye, FiX, FiUsers, FiClock, FiPrinter, FiPhoneCall, FiRefreshCw } from "react-icons/fi";
import { BsCurrencyRupee, BsCart3, BsPeopleFill, BsGraphUpArrow, BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import { IoFastFoodOutline, IoReceiptOutline } from "react-icons/io5";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { RiUserHeartLine } from "react-icons/ri";
import { FaConciergeBell, FaCheck, FaTimes, FaUtensils, FaRegClock, FaFire } from "react-icons/fa";
import { GiCook } from "react-icons/gi";
import { TbChefHat, TbToolsKitchen2 } from "react-icons/tb";
import Image from 'next/image';

// ========== MOCK DATA ==========

const revenueData = [
  { day: 'Mon', revenue: 12400, orders: 48 },
  { day: 'Tue', revenue: 15800, orders: 62 },
  { day: 'Wed', revenue: 11200, orders: 44 },
  { day: 'Thu', revenue: 18600, orders: 73 },
  { day: 'Fri', revenue: 22400, orders: 89 },
  { day: 'Sat', revenue: 28900, orders: 112 },
  { day: 'Sun', revenue: 24600, orders: 96 },
];

const orderStatusData = [
  { name: 'Pending', value: 8, color: '#f59e0b' },
  { name: 'Preparing', value: 12, color: '#3b82f6' },
  { name: 'Ready', value: 5, color: '#10b981' },
  { name: 'Completed', value: 45, color: '#059669' },
  { name: 'Cancelled', value: 3, color: '#ef4444' },
];

const ordersQueue = [
  {
    id: 'ORD-1041', orderId: 'CCPS26305456', orderNumber: 122, token: '025',
    table: 'T-03',
    customer: { name: 'Mr. Subham Choudhury', phone: '+91 89599 78588', email: 'subham787898@gmail.com', address: 'NH5 - Ghatikia Rd, Kalinga Vihar, Bhubaneswar, 752054' },
    items: [
      { name: 'Dragon Chicken', desc: '6pc Per Plate', qty: 1, price: 160, categories: ['INDIA', 'SNACKS'], image: '/images/menu/saheedNagarMenu/menu02.jpg' },
      { name: 'Malgapodi Corn Cheese Sandwich', desc: '3pc Per Plate', qty: 1, price: 159, categories: ['INDIA', 'SNACKS'], image: '/images/menu/saheedNagarMenu/menu03.jpg' },
    ],
    amount: 329, status: 'preparing', time: '12 min ago', type: 'Takeaway',
    date: '26-05-2026', orderTime: '11:06 AM',
    timeline: { placed: '11:05 AM', accepted: '11:05 AM', preparing: '11:08 AM', ready: null, completed: null }
  },
  {
    id: 'ORD-1042', orderId: 'CCPS26305457', orderNumber: 123, token: '026',
    table: 'T-07',
    customer: { name: 'Ms. Priya Mohanty', phone: '+91 98765 43210', email: 'priya.m@gmail.com', address: 'Saheed Nagar, Bhubaneswar, 751007' },
    items: [
      { name: 'Veg Thali', desc: 'Full Plate', qty: 1, price: 280, categories: ['INDIA', 'MEALS'], image: '/images/menu/saheedNagarMenu/menu04.jpg' },
      { name: 'Paneer Tikka', desc: '8pc Per Plate', qty: 1, price: 240, categories: ['INDIA', 'STARTERS'], image: '/images/menu/saheedNagarMenu/menu05.jpg' },
    ],
    amount: 520, status: 'pending', time: '8 min ago', type: 'Dine-in',
    date: '26-05-2026', orderTime: '11:14 AM',
    timeline: { placed: '11:14 AM', accepted: null, preparing: null, ready: null, completed: null }
  },
  {
    id: 'ORD-1043', orderId: 'CCPS26305458', orderNumber: 124, token: '027',
    table: 'T-12',
    customer: { name: 'Mr. Amit Kumar', phone: '+91 77777 88888', email: 'amit.k@outlook.com', address: 'Jaydev Vihar, Bhubaneswar, 751013' },
    items: [
      { name: 'Chicken Biryani', desc: 'Full Plate', qty: 1, price: 320, categories: ['INDIA', 'RICE'], image: '/images/menu/saheedNagarMenu/menu06.jpg' },
      { name: 'Raita', desc: '1 Bowl', qty: 1, price: 60, categories: ['INDIA', 'SIDES'], image: '/images/menu/saheedNagarMenu/menu07.jpg' },
      { name: 'Cola', desc: '300ml', qty: 1, price: 60, categories: ['BEVERAGES'], image: '/images/menu/saheedNagarMenu/menu08.jpg' },
    ],
    amount: 440, status: 'ready', time: '22 min ago', type: 'Dine-in',
    date: '26-05-2026', orderTime: '10:58 AM',
    timeline: { placed: '10:58 AM', accepted: '10:59 AM', preparing: '11:02 AM', ready: '11:18 AM', completed: null }
  },
  {
    id: 'ORD-1044', orderId: 'CCPS26305459', orderNumber: 125, token: '028',
    table: '--',
    customer: { name: 'Ms. Sneha Das', phone: '+91 99001 12233', email: 'sneha.d@gmail.com', address: 'Nayapalli, Bhubaneswar, 751012' },
    items: [
      { name: 'Pasta Alfredo', desc: '1 Plate', qty: 1, price: 280, categories: ['ITALIAN', 'PASTA'], image: '/images/menu/saheedNagarMenu/menu09.jpg' },
      { name: 'Garlic Bread', desc: '4pc', qty: 1, price: 150, categories: ['ITALIAN', 'SIDES'], image: '/images/menu/saheedNagarMenu/menu10.jpg' },
      { name: 'Cappuccino', desc: '1 Cup', qty: 1, price: 130, categories: ['BEVERAGES'], image: '/images/menu/saheedNagarMenu/menu11.jpg' },
    ],
    amount: 560, status: 'preparing', time: '5 min ago', type: 'Takeaway',
    date: '26-05-2026', orderTime: '11:17 AM',
    timeline: { placed: '11:17 AM', accepted: '11:17 AM', preparing: '11:18 AM', ready: null, completed: null }
  },
  {
    id: 'ORD-1045', orderId: 'CCPS26305460', orderNumber: 126, token: '029',
    table: 'T-01',
    customer: { name: 'Mr. Vikram Rath', phone: '+91 88001 55566', email: 'vikram.r@yahoo.com', address: 'Patia, Bhubaneswar, 751024' },
    items: [
      { name: 'Fish & Chips', desc: '1 Plate', qty: 1, price: 280, categories: ['CONTINENTAL', 'SNACKS'], image: '/images/menu/saheedNagarMenu/menu12.jpg' },
      { name: 'Mojito', desc: '1 Glass', qty: 1, price: 100, categories: ['BEVERAGES'], image: '/images/menu/saheedNagarMenu/menu13.jpg' },
    ],
    amount: 380, status: 'pending', time: '3 min ago', type: 'Dine-in',
    date: '26-05-2026', orderTime: '11:19 AM',
    timeline: { placed: '11:19 AM', accepted: null, preparing: null, ready: null, completed: null }
  },
  {
    id: 'ORD-1046', orderId: 'CCPS26305461', orderNumber: 127, token: '030',
    table: 'T-05',
    customer: { name: 'Ms. Neha Panda', phone: '+91 70008 99900', email: 'neha.p@gmail.com', address: 'Chandrasekharpur, Bhubaneswar, 751016' },
    items: [
      { name: 'Caesar Salad', desc: '1 Bowl', qty: 1, price: 220, categories: ['CONTINENTAL', 'SALADS'], image: '/images/menu/saheedNagarMenu/menu14.jpg' },
      { name: 'Iced Tea', desc: '1 Glass', qty: 1, price: 100, categories: ['BEVERAGES'], image: '/images/menu/saheedNagarMenu/menu02.jpg' },
    ],
    amount: 320, status: 'preparing', time: '15 min ago', type: 'Dine-in',
    date: '26-05-2026', orderTime: '11:07 AM',
    timeline: { placed: '11:07 AM', accepted: '11:07 AM', preparing: '11:09 AM', ready: null, completed: null }
  },
  {
    id: 'ORD-1047', orderId: 'CCPS26305462', orderNumber: 128, token: '031',
    table: '--',
    customer: { name: 'Mr. Arjun Lenka', phone: '+91 66009 77700', email: 'arjun.l@gmail.com', address: 'Khandagiri, Bhubaneswar, 751030' },
    items: [
      { name: 'Double Cheeseburger', desc: '1pc', qty: 1, price: 260, categories: ['AMERICAN', 'BURGERS'], image: '/images/menu/saheedNagarMenu/menu03.jpg' },
      { name: 'Fries', desc: 'Regular', qty: 1, price: 130, categories: ['SIDES'], image: '/images/menu/saheedNagarMenu/menu04.jpg' },
      { name: 'Chocolate Shake', desc: '1 Glass', qty: 1, price: 100, categories: ['BEVERAGES'], image: '/images/menu/saheedNagarMenu/menu05.jpg' },
    ],
    amount: 490, status: 'pending', time: '1 min ago', type: 'Delivery',
    date: '26-05-2026', orderTime: '11:21 AM',
    timeline: { placed: '11:21 AM', accepted: null, preparing: null, ready: null, completed: null }
  },
  {
    id: 'ORD-1048', orderId: 'CCPS26305463', orderNumber: 129, token: '032',
    table: 'T-09',
    customer: { name: 'Ms. Meera Jena', phone: '+91 55008 66600', email: 'meera.j@gmail.com', address: 'Acharya Vihar, Bhubaneswar, 751013' },
    items: [
      { name: 'Mushroom Risotto', desc: '1 Plate', qty: 1, price: 350, categories: ['ITALIAN', 'RICE'], image: '/images/menu/saheedNagarMenu/menu06.jpg' },
      { name: 'Tiramisu', desc: '1 Slice', qty: 1, price: 180, categories: ['DESSERTS'], image: '/images/menu/saheedNagarMenu/menu07.jpg' },
    ],
    amount: 530, status: 'ready', time: '28 min ago', type: 'Dine-in',
    date: '26-05-2026', orderTime: '10:52 AM',
    timeline: { placed: '10:52 AM', accepted: '10:53 AM', preparing: '10:55 AM', ready: '11:15 AM', completed: null }
  },
  {
    id: 'ORD-1049', orderId: 'CCPS26305464', orderNumber: 130, token: '033',
    table: 'T-02',
    customer: { name: 'Mr. Suresh Behera', phone: '+91 44007 33300', email: 'suresh.b@outlook.com', address: 'Rasulgarh, Bhubaneswar, 751010' },
    items: [
      { name: 'Tandoori Platter', desc: 'Full Plate', qty: 1, price: 450, categories: ['INDIA', 'STARTERS'], image: '/images/menu/saheedNagarMenu/menu08.jpg' },
      { name: 'Naan', desc: 'Butter', qty: 3, price: 50, categories: ['INDIA', 'BREADS'], image: '/images/menu/saheedNagarMenu/menu09.jpg' },
      { name: 'Dal Makhani', desc: '1 Bowl', qty: 1, price: 200, categories: ['INDIA', 'CURRIES'], image: '/images/menu/saheedNagarMenu/menu10.jpg' },
    ],
    amount: 800, status: 'preparing', time: '10 min ago', type: 'Dine-in',
    date: '26-05-2026', orderTime: '11:12 AM',
    timeline: { placed: '11:12 AM', accepted: '11:12 AM', preparing: '11:14 AM', ready: null, completed: null }
  },
  {
    id: 'ORD-1050', orderId: 'CCPS26305465', orderNumber: 131, token: '034',
    table: '--',
    customer: { name: 'Ms. Divya Chand', phone: '+91 33006 22200', email: 'divya.c@gmail.com', address: 'Vani Vihar, Bhubaneswar, 751004' },
    items: [
      { name: 'Wrap Combo', desc: '1 Set', qty: 1, price: 250, categories: ['CONTINENTAL', 'WRAPS'], image: '/images/menu/saheedNagarMenu/menu11.jpg' },
      { name: 'Berry Smoothie', desc: '1 Glass', qty: 1, price: 100, categories: ['BEVERAGES'], image: '/images/menu/saheedNagarMenu/menu12.jpg' },
    ],
    amount: 350, status: 'pending', time: '2 min ago', type: 'Takeaway',
    date: '26-05-2026', orderTime: '11:20 AM',
    timeline: { placed: '11:20 AM', accepted: null, preparing: null, ready: null, completed: null }
  },
];

const staffPresent = [
  { name: 'Rajesh Kumar', role: 'Head Chef', status: 'active', avatar: 'RK', color: '#0E467D' },
  { name: 'Anita Sharma', role: 'Sous Chef', status: 'active', avatar: 'AS', color: '#7c3aed' },
  { name: 'Deepak Patel', role: 'Line Cook', status: 'active', avatar: 'DP', color: '#059669' },
  { name: 'Priyanka Das', role: 'Cashier', status: 'active', avatar: 'PD', color: '#db2777' },
  { name: 'Manoj Singh', role: 'Waiter', status: 'active', avatar: 'MS', color: '#ea580c' },
  { name: 'Suman Rao', role: 'Waiter', status: 'break', avatar: 'SR', color: '#0891b2' },
  { name: 'Ravi Mishra', role: 'Kitchen Helper', status: 'active', avatar: 'RM', color: '#65a30d' },
  { name: 'Kavita Nayak', role: 'Barista', status: 'active', avatar: 'KN', color: '#c026d3' },
];

// ========== COMPONENT ==========

const AdminDashboard = () => {
  const [touchMode, setTouchMode] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');

  const today = new Date();
  const dateStr = today.toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });

  // KPI data
  const kpiData = [
    {
      label: 'Total Revenue',
      value: '₹1,34,900',
      change: '+12.5%',
      positive: true,
      icon: <BsCurrencyRupee size={22} />,
      gradient: 'linear-gradient(135deg, #0E467D, #4E79A2)',
      type: 'revenue'
    },
    {
      label: 'Total Orders',
      value: '524',
      change: '+8.2%',
      positive: true,
      icon: <BsCart3 size={20} />,
      gradient: 'linear-gradient(135deg, #059669, #34d399)',
      type: 'orders'
    },
    {
      label: 'Avg Order Value',
      value: '₹257',
      change: '-2.1%',
      positive: false,
      icon: <BsGraphUpArrow size={20} />,
      gradient: 'linear-gradient(135deg, #d97706, #fbbf24)',
      type: 'avg_order'
    },
    {
      label: 'Active Customers',
      value: '89',
      change: '+15.3%',
      positive: true,
      icon: <RiUserHeartLine size={22} />,
      gradient: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
      type: 'customers'
    }
  ];

  // Filtered orders
  const filteredOrders = useMemo(() => {
    if (statusFilter === 'all') return ordersQueue;
    return ordersQueue.filter(o => o.status === statusFilter);
  }, [statusFilter]);

  // Pie chart total
  const orderStatusTotal = orderStatusData.reduce((sum, d) => sum + d.value, 0);

  // Active staff count
  const activeStaff = staffPresent.filter(s => s.status === 'active').length;

  // Custom Tooltip for charts
  const RevenueTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white px-3 py-2 rounded-xl shadow-lg border border-gray-100">
          <p className="text-sm font-semibold text-gray-800 mb-1">{label}</p>
          {payload.map((p, i) => (
            <p key={i} className="text-xs" style={{ color: p.color }}>
              {p.name === 'revenue' ? '₹' : ''}{p.value.toLocaleString('en-IN')} {p.name === 'revenue' ? '' : 'orders'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const d = payload[0];
      const pct = ((d.value / orderStatusTotal) * 100).toFixed(1);
      return (
        <div className="bg-white px-3 py-2 rounded-xl shadow-lg border border-gray-100">
          <p className="text-sm font-semibold text-gray-800">{d.name}</p>
          <p className="text-xs text-gray-500">{d.value} orders ({pct}%)</p>
        </div>
      );
    }
    return null;
  };

  // Status color for table badge
  const tableColor = (status) => {
    const map = { pending: '#fef3c7', preparing: '#dbeafe', ready: '#d1fae5', completed: '#f0fdf4', cancelled: '#fee2e2' };
    return map[status] || '#f1f5f9';
  };

  const tableTextColor = (status) => {
    const map = { pending: '#92400e', preparing: '#1e40af', ready: '#065f46', completed: '#166534', cancelled: '#991b1b' };
    return map[status] || '#475569';
  };

  const orderTypeIcon = (type) => {
    if (type === 'Dine-in') return <MdOutlineTableRestaurant size={14} />;
    if (type === 'Takeaway') return <IoFastFoodOutline size={14} />;
    return <FaConciergeBell size={13} />;
  };

  const getRoleIcon = (role) => {
    if (role.includes('Chef')) return <TbChefHat size={14} />;
    if (role.includes('Cook') || role.includes('Kitchen')) return <TbToolsKitchen2 size={14} />;
    if (role.includes('Waiter')) return <FaUtensils size={12} />;
    if (role.includes('Barista')) return <IoFastFoodOutline size={14} />;
    return <FiUsers size={14} />;
  };

  return (
    <div className={`${styles.dashboard_container} ${touchMode ? styles.touch_mode : ''}`}>

      {/* ===== HEADER ROW ===== */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-blue-950">
            Good {today.getHours() < 12 ? 'Morning' : today.getHours() < 17 ? 'Afternoon' : 'Evening'}, Captain! ⚓
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">{dateStr}</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Live Indicator */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full">
            <span className={styles.live_dot}></span>
            <span className="text-xs font-semibold text-emerald-700">LIVE</span>
          </div>

          {/* Touch Mode Toggle */}
          <button
            onClick={() => setTouchMode(!touchMode)}
            className={`${styles.touch_toggle} ${touchMode ? styles.active : ''}`}
          >
            <MdTouchApp size={18} />
            <span className="hidden sm:inline">{touchMode ? 'Touch ON' : 'Touch Mode'}</span>
          </button>
        </div>
      </div>


      {/* ===== KPI CARDS ===== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-5">
        {kpiData.map((kpi, i) => (
          <div key={i} className={`${styles.kpi_card} ${styles[kpi.type]}`}>
            <div className="flex items-start justify-between mb-3">
              <div
                className={styles.kpi_icon}
                style={{ background: kpi.gradient, color: '#fff' }}
              >
                {kpi.icon}
              </div>
              <span className={`${styles.kpi_change} ${kpi.positive ? styles.positive : styles.negative}`}>
                {kpi.positive ? <FiTrendingUp size={12} /> : <FiTrendingDown size={12} />}
                {kpi.change}
              </span>
            </div>
            <div className={styles.kpi_value}>{kpi.value}</div>
            <div className={styles.kpi_label}>{kpi.label}</div>
          </div>
        ))}
      </div>


      {/* ===== CHARTS ROW ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-5">

        {/* Revenue & Orders Chart */}
        <div className={`${styles.chart_card} lg:col-span-3`}>
          <div className="flex items-center justify-between mb-1">
            <div>
              <div className={styles.chart_title}>Revenue & Orders</div>
              <div className={styles.chart_subtitle}>Last 7 days performance</div>
            </div>
            <div className="flex gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ background: '#0E467D' }}></span>
                Revenue
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ background: '#10b981' }}></span>
                Orders
              </span>
            </div>
          </div>
          <div style={{ height: touchMode ? 280 : 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0E467D" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#0E467D" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="ordGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="rev" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
                <YAxis yAxisId="ord" orientation="right" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip content={<RevenueTooltip />} />
                <Area yAxisId="rev" type="monotone" dataKey="revenue" stroke="#0E467D" strokeWidth={2.5} fill="url(#revGrad)" dot={{ r: 3, fill: '#0E467D', strokeWidth: 0 }} activeDot={{ r: 5, stroke: '#0E467D', strokeWidth: 2, fill: '#fff' }} />
                <Area yAxisId="ord" type="monotone" dataKey="orders" stroke="#10b981" strokeWidth={2} fill="url(#ordGrad)" dot={{ r: 3, fill: '#10b981', strokeWidth: 0 }} activeDot={{ r: 5, stroke: '#10b981', strokeWidth: 2, fill: '#fff' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart - Order Status */}
        <div className={`${styles.chart_card} lg:col-span-2`}>
          <div className={styles.chart_title}>Order Status</div>
          <div className={styles.chart_subtitle}>Current distribution</div>
          <div style={{ height: touchMode ? 200 : 180 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip content={<PieTooltip />} />
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={touchMode ? 50 : 42}
                  outerRadius={touchMode ? 80 : 70}
                  paddingAngle={3}
                  dataKey="value"
                  cornerRadius={4}
                  stroke="#fff"
                  strokeWidth={2}
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Center label */}
          <div className="text-center -mt-2 mb-2">
            <div className="text-2xl font-bold text-gray-800">{orderStatusTotal}</div>
            <div className="text-xs text-gray-400">Total Orders</div>
          </div>
          {/* Legend */}
          <div className={styles.pie_legend}>
            {orderStatusData.map((d, i) => (
              <div key={i} className={styles.pie_legend_item}>
                <span className={styles.pie_legend_dot} style={{ background: d.color }}></span>
                <span>{d.name}</span>
                <span className="font-semibold text-gray-700">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* ===== ORDERS QUEUE + STAFF ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">

        {/* Orders Queue */}
        <div className={`${styles.queue_card} lg:col-span-2`}>
          <div className={styles.queue_header}>
            <div className="flex items-center gap-3">
              <h3 className={styles.section_title} style={{ margin: 0 }}>
                <span className="flex items-center gap-2">
                  <IoReceiptOutline size={18} />
                  Orders in Queue
                </span>
              </h3>
              <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                {filteredOrders.length}
              </span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {['all', 'pending', 'preparing', 'ready'].map(f => (
                <button
                  key={f}
                  onClick={() => setStatusFilter(f)}
                  className={`${styles.touch_btn} ${statusFilter === f ? styles.primary : styles.secondary}`}
                  style={touchMode ? {} : { minHeight: 32, minWidth: 32, fontSize: 12, padding: '4px 12px', borderRadius: 8 }}
                >
                  {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.queue_body}>
            {filteredOrders.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <IoReceiptOutline size={32} className="mx-auto mb-2 opacity-40" />
                <p className="text-sm">No orders in this category</p>
              </div>
            )}
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className={styles.queue_row}
                onClick={() => setSelectedOrder(order)}
              >
                {/* Table Badge */}
                <div
                  className={styles.table_badge}
                  style={{
                    background: tableColor(order.status),
                    color: tableTextColor(order.status)
                  }}
                >
                  {order.table !== '--' ? order.table.replace('T-', '') : (
                    <span className="text-xs">{order.type === 'Takeaway' ? 'TW' : 'DL'}</span>
                  )}
                </div>

                {/* Order Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-semibold text-gray-800">{order.id}</span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      {orderTypeIcon(order.type)}
                      {order.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 flex-wrap">
                    {order.items.slice(0, 2).map((item, idx) => (
                      <span key={idx} className={styles.order_item_tag}>{typeof item === 'string' ? item : item.name}</span>
                    ))}
                    {order.items.length > 2 && (
                      <span className={styles.order_item_tag}>+{order.items.length - 2} more</span>
                    )}
                  </div>
                </div>

                {/* Amount */}
                <div className="text-right flex-shrink-0 mr-2">
                  <div className="text-sm font-bold text-gray-800">₹{order.amount}</div>
                  <div className="text-xs text-gray-400 flex items-center gap-1 justify-end">
                    <FiClock size={10} />
                    {order.time}
                  </div>
                </div>

                {/* Status */}
                <div className="flex-shrink-0">
                  <span className={`${styles.status_badge} ${styles[order.status]}`}>
                    {order.status}
                  </span>
                </div>

                {/* Quick View Button */}
                <button
                  className={`${styles.touch_btn} ${styles.secondary}`}
                  style={touchMode ? {} : { minHeight: 32, minWidth: 32, padding: '6px', borderRadius: 8 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedOrder(order);
                  }}
                  title="Quick View"
                >
                  <FiEye size={touchMode ? 18 : 15} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Staff Present */}
        <div className={styles.staff_card}>
          <div className="px-5 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className={styles.section_title} style={{ margin: 0 }}>
                <span className="flex items-center gap-2">
                  <BsPeopleFill size={16} />
                  Staff On Duty
                </span>
              </h3>
              <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-2.5 py-0.5 rounded-full">
                {activeStaff}/{staffPresent.length}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">Currently active crew members</p>
          </div>

          <div className="max-h-[380px] overflow-y-auto">
            {staffPresent.map((staff, i) => (
              <div key={i} className={styles.staff_item}>
                <div
                  className={styles.staff_avatar}
                  style={{ background: staff.color }}
                >
                  {staff.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-800 truncate">{staff.name}</div>
                  <div className="text-xs text-gray-400 flex items-center gap-1">
                    {getRoleIcon(staff.role)}
                    {staff.role}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {staff.status === 'break' && (
                    <span className="text-xs bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full font-medium">Break</span>
                  )}
                  <span className={staff.status === 'active' ? styles.staff_online : styles.staff_offline}></span>
                </div>
              </div>
            ))}
          </div>

          {/* Staff Summary Footer */}
          <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/50">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-lg font-bold text-blue-900">{staffPresent.filter(s => s.role.includes('Chef') || s.role.includes('Cook') || s.role.includes('Kitchen')).length}</div>
                <div className="text-[10px] text-gray-400 uppercase tracking-wide">Kitchen</div>
              </div>
              <div>
                <div className="text-lg font-bold text-blue-900">{staffPresent.filter(s => s.role.includes('Waiter')).length}</div>
                <div className="text-[10px] text-gray-400 uppercase tracking-wide">Service</div>
              </div>
              <div>
                <div className="text-lg font-bold text-blue-900">{staffPresent.filter(s => !s.role.includes('Chef') && !s.role.includes('Cook') && !s.role.includes('Kitchen') && !s.role.includes('Waiter')).length}</div>
                <div className="text-[10px] text-gray-400 uppercase tracking-wide">Other</div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* ===== QUICK VIEW PANEL ===== */}
      {selectedOrder && (
        <>
          <div
            className={styles.quick_view_overlay}
            onClick={() => setSelectedOrder(null)}
          />
          <div className={styles.quick_view_panel}>
            {/* Header */}
            <div className={styles.quick_view_header}>
              <h3 className="text-lg font-bold text-gray-800">Order Details</h3>
              <div className="flex items-center gap-3">
                {/* Order Type Badge */}
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200">
                  <span className="text-emerald-600">{orderTypeIcon(selectedOrder.type)}</span>
                  <span className="text-xs font-semibold text-emerald-700">{selectedOrder.type}</span>
                </div>
                {/* Token Number */}
                <div className={styles.token_badge}>
                  {selectedOrder.token}
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className={`${styles.touch_btn} ${styles.secondary}`}
                  style={touchMode ? {} : { minHeight: 34, minWidth: 34, padding: 6, borderRadius: 10 }}
                >
                  <FiX size={18} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className={styles.quick_view_body}>

              {/* === Customer + Order Meta Row === */}
              <div className="flex flex-col sm:flex-row gap-4 mb-5">
                {/* Customer Info */}
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-100 to-orange-200 text-orange-700 flex items-center justify-center font-bold text-base flex-shrink-0 border-2 border-orange-300">
                      {selectedOrder.customer.name.split(' ').filter(w => w.length > 1).slice(0, 2).map(w => w[0]).join('')}
                    </div>
                    <div className="min-w-0">
                      <div className="text-base font-bold text-gray-800">{selectedOrder.customer.name}</div>
                      <div className="flex items-center gap-3 mt-1 flex-wrap text-xs text-gray-500">
                        <span className="flex items-center gap-1"><MdOutlineLocalPhone size={12} className="text-blue-500" />{selectedOrder.customer.phone}</span>
                        <span className="flex items-center gap-1"><MdOutlineEmail size={12} className="text-blue-500" />{selectedOrder.customer.email}</span>
                      </div>
                      <div className="flex items-start gap-1 mt-1 text-xs text-gray-400">
                        <MdOutlineLocationOn size={13} className="text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{selectedOrder.customer.address}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons Row */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {[
                      { icon: <FiPhoneCall size={12} />, label: 'CALL' },
                      { icon: <FiRefreshCw size={12} />, label: 'RESEND' },
                      { icon: <MdOutlineSkipNext size={14} />, label: 'SKIP' },
                      { icon: <FaTimes size={11} />, label: 'CANCEL' },
                      { icon: <FiPrinter size={12} />, label: 'PRINT' },
                    ].map((btn) => (
                      <button
                        key={btn.label}
                        className={styles.action_outlined_btn}
                      >
                        {btn.icon}
                        <span>{btn.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Order Meta */}
                <div className="flex-shrink-0 bg-blue-50/70 rounded-lg p-2 sm:w-[200px] border border-blue-100">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-green-600">🏷️</span>
                    <span className="text-[13px] font-bold text-green-600">{selectedOrder.orderNumber}th Order</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-orange-500">⏱️</span>
                    <span className="text-[13px] font-bold text-orange-500">{selectedOrder.time}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-gray-600">📅</span>
                    <span className="text-[13px] text-gray-700">{selectedOrder.date} &nbsp;{selectedOrder.orderTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">🆔</span>
                    <span className="text-[13px] font-semibold text-gray-700">{selectedOrder.orderId}</span>
                  </div>
                </div>
              </div>

              {/* === Order Timeline === */}
              <div className="mb-6">
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-4 font-semibold">Order Timeline</div>
                <div className={styles.timeline_container}>
                  {['placed', 'accepted', 'preparing', 'ready', 'completed'].map((step, idx) => {
                    const isDone = !!selectedOrder.timeline[step];
                    const labels = ['Placed', 'Accepted', 'Preparing', 'Ready', 'Completed'];
                    const isLast = idx === 4;
                    // Check if next step is done for the connector line
                    const nextStep = ['placed', 'accepted', 'preparing', 'ready', 'completed'][idx + 1];
                    const nextDone = nextStep ? !!selectedOrder.timeline[nextStep] : false;
                    return (
                      <div key={step} className={styles.timeline_step}>
                        <div className="flex flex-col items-center">
                          <div className={`${styles.timeline_dot} ${isDone ? styles.timeline_done : styles.timeline_pending}`}>
                            {isDone && <FaCheck size={8} />}
                          </div>
                          <div className={`text-[10px] font-semibold mt-1.5 ${isDone ? 'text-green-700' : 'text-gray-400'}`}>{labels[idx]}</div>
                          <div className={`text-[10px] ${isDone ? 'text-gray-600' : 'text-gray-300'}`}>{selectedOrder.timeline[step] || '--'}</div>
                        </div>
                        {!isLast && (
                          <div className={`${styles.timeline_connector} ${nextDone ? styles.connector_done : styles.connector_pending}`}></div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Mark as Ready / Next Action Button */}
                <div className="flex justify-end mt-3">
                  {selectedOrder.status === 'pending' && (
                    <button className={styles.mark_ready_btn} style={{ borderColor: '#0E467D', color: '#0E467D' }}>
                      ACCEPT ORDER
                    </button>
                  )}
                  {selectedOrder.status === 'preparing' && (
                    <button className={styles.mark_ready_btn}>
                      MARK AS READY
                    </button>
                  )}
                  {selectedOrder.status === 'ready' && (
                    <button className={styles.mark_ready_btn} style={{ borderColor: '#0E467D', color: '#0E467D' }}>
                      MARK COMPLETED
                    </button>
                  )}
                </div>
              </div>

              {/* === Order Items Table === */}
              <div className="mb-5">
                <div className="flex items-center text-xs text-gray-400 uppercase tracking-wider font-semibold mb-3 px-1">
                  <span className="w-[70px] flex-shrink-0">Order Items</span>
                  <span className="flex-1 pl-2">items</span>
                  <span className="w-[70px] text-center">quantity</span>
                  <span className="w-[90px] text-right">price</span>
                  <span className="w-[60px]"></span>
                </div>

                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className={styles.order_item_card}>
                    {/* Item Image */}
                    <div className={styles.item_image_wrap}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={80}
                        height={60}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-gray-800">{item.name}</div>
                      <div className="text-xs text-gray-400">({item.desc})</div>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        {item.categories.map((cat, ci) => (
                          <span key={ci} className={styles.category_tag}>{cat}</span>
                        ))}
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="w-[70px] flex items-center justify-center gap-1 flex-shrink-0">
                      <span className="text-gray-400 text-sm">X</span>
                      <span className="text-base font-bold text-gray-800">{item.qty}</span>
                    </div>

                    {/* Price */}
                    <div className="w-[90px] text-right flex-shrink-0">
                      <span className="text-base font-bold text-gray-800">₹ {item.price.toFixed(2)}</span>
                    </div>

                    {/* Accept / Reject */}
                    <div className="w-[40px] flex flex-col items-center gap-1 flex-shrink-0">
                      <BsCheckCircleFill size={22} className="text-green-500 cursor-pointer hover:text-green-600 transition-colors" />
                      <BsXCircleFill size={22} className="text-red-400 cursor-pointer hover:text-red-500 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>

              {/* === Sub Total === */}
              <div className={styles.subtotal_bar}>
                <span className="text-base font-semibold text-gray-700">Sub Total</span>
                <span className="text-xl font-bold text-gray-800">₹ {selectedOrder.amount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
