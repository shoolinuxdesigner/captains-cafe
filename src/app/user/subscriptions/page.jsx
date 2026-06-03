import React from 'react'
import { IoCheckmarkSharp } from "react-icons/io5";
import { TbProgress } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const completed = (
  <div className='flex flex-row items-center gap-0.5 text-[12px] py-0.5 pr-3 pl-2 rounded-xl text-green-700 bg-green-100 w-fit font-semibold'>
    <IoCheckmarkSharp size={14} /> Completed
  </div>
);
const pending = (
  <div className='flex flex-row items-center gap-0.5 text-[12px] py-0.5 pr-3 pl-2 rounded-xl text-amber-700 bg-amber-100 w-fit font-semibold'>
    <TbProgress size={14} /> Pending
  </div>
);
const cancelled = (
  <div className='flex flex-row items-center gap-0.5 text-[12px] py-0.5 pr-3 pl-2 rounded-xl text-red-700 bg-red-100 w-fit font-semibold'>
    <RxCross2 size={14} /> Cancelled
  </div>
);

const recentOrders = [
  {
    slno: "1",
    orderId: "3066",
    date: "Apr 6, 2025",
    status: completed,
    details: "Monthly subscription (May)",
  },
  {
    slno: "2",
    orderId: "3065",
    date: "May 6, 2025",
    status: pending,
    details: "Monthly subscription (June)",
  },
  {
    slno: "3",
    orderId: "3064",
    date: "May 6, 2025",
    status: cancelled,
    details: "Monthly subscription (June)",
  }
];

const Subscriptions = () => {
  return (
    <div className='flex flex-col space-y-3'>
      <div className="w-full px-6 py-4 rounded-md bg-white dark:bg-neutral-800 shadow-[inset_-4px_-4px_4px_-1px_rgba(0,0,0,0.15)] border border-gray-100 dark:border-neutral-700">
        <div className="flex justify-between items-center">
          <h3 className='text-lg font-semibold text-blue-900 dark:text-blue-200'>Subscriptions</h3>
        </div>
        <hr className='my-2 border-gray-200 dark:border-neutral-700' />
        <div className="flex flex-wrap justify-between gap-3 opacity-90 text-[15px] my-4">
          <div className="w-full flex flex-col md:flex-row md:gap-3">
            <div className="w-[150px] font-semibold">Current Plan</div>
            <div className='hidden md:inline-block'>:</div>
            <div className='text-blue-900 font-semibold dark:text-blue-200'>Main Menu - 30D - Rs. 1299 - Monthly subscription (May)</div>
          </div>
          <div className="w-full lg:w-[49%] flex flex-col md:flex-row md:gap-3">
            <div className="w-[150px] font-semibold">Preference</div>
            <div className='hidden md:inline-block'>:</div>
            <div className='text-gray-500 dark:text-gray-200'>Non-Veg - Dinner - BBSR2</div>
          </div>
          <div className="w-full lg:w-[49%] flex flex-col md:flex-row md:gap-3">
            <div className="w-[150px] font-semibold">Days left</div>
            <div className='hidden md:inline-block'>:</div>
            <div className='text-red-600 dark:text-red-300 font-semibold'>12 Days</div>
          </div>
          <div className="w-full flex flex-col md:flex-row md:gap-3">
            <div className="w-[150px] font-semibold">Delivery Address</div>
            <div className='hidden md:inline-block'>:</div>
            <div className='w-full md:w-[calc(100%-176px)] text-gray-500 dark:text-gray-200'>Subham Choudhury, NH5 - Ghatikia Rd, Kalinga Vihar, Kalinga Vihar LIG, Kalinganagar, Near Pal Auto Showroom, Bhubaneswar, Khurdha, 752054, +91 89599 78588</div>
          </div>
        </div>
        <hr className='my-2 border-gray-200 dark:border-neutral-700' />
        <Table className="whitespace-nowrap">
          <TableHeader>
            <TableRow className="bg-gray-100 dark:bg-neutral-700">
              <TableHead className="w-[80px]">Sl. No.</TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOrders.map((order) => (
              <TableRow key={order.orderId}>
                <TableCell>{order.slno}</TableCell>
                <TableCell className="font-medium">#{order.orderId}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{order.details}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Subscriptions;