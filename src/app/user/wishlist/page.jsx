'use client'
import React, { useState } from 'react'
import Image from 'next/image';
import { toast } from 'react-hot-toast';

import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { FaCircle } from "react-icons/fa";
import { IoTriangle } from "react-icons/io5";

import food1 from "@/assets/images/items/khopra.png"
import food2 from "@/assets/images/items/fries.png"
import food3 from "@/assets/images/items/samosa.png"

const getTagStyles = (tag) => {
  const normalized = tag.toUpperCase();
  if (normalized === "INDIAN" || normalized === "INDIA") {
    return "text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900/20";
  }
  if (normalized === "SNACKS") {
    return "text-amber-700 bg-amber-100 dark:text-amber-300 dark:bg-amber-900/20";
  }
  if (normalized === "FRENCH") {
    return "text-blue-700 bg-blue-100 dark:text-blue-300 dark:bg-blue-900/20";
  }
  return "text-gray-700 bg-gray-100 dark:text-gray-300 dark:bg-gray-800/40";
};

const Orders = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      image: food1,
      name: "Khopra Pakoda",
      price: "₹ 99",
      tags: ["INDIAN", "SNACKS"],
      isVeg: true,
      isLiked: true,
    },
    {
      image: food2,
      name: "Fries",
      price: "₹ 110",
      tags: ["French", "SNACKS"],
      isVeg: true,
      isLiked: true,
    },
    {
      image: food3,
      name: "Chicken Samosa",
      price: "₹ 145",
      tags: ["INDIAN", "SNACKS"],
      isVeg: false,
      isLiked: true,
    }
  ]);

  const toggleLike = (index) => {
    const item = wishlistItems[index];
    if (!item) return;

    const nextLiked = !item.isLiked;
    if (nextLiked) {
      toast.success(`${item.name} added to wishlist`);
    } else {
      toast.error(`${item.name} removed from wishlist`);
    }

    setWishlistItems(prevItems =>
      prevItems.map((item, i) =>
        i === index ? { ...item, isLiked: nextLiked } : item
      )
    );
  };
  return (
    <div className='flex flex-col space-y-3'>
      <div className="w-full px-6 py-4 rounded-md bg-white dark:bg-neutral-800 shadow-[inset_-4px_-4px_4px_-1px_rgba(0,0,0,0.15)] border border-gray-100 dark:border-neutral-700">
        <div className="flex justify-between items-center">
          <h3 className='text-lg font-semibold text-blue-900 dark:text-blue-200'>Wishlist Items</h3>
        </div>
        <hr className='my-2 border-gray-200 dark:border-neutral-700' />
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-3 h-full'>
          {wishlistItems.map((item, index) => (
            <div key={index} className='border border-blue-800 dark:border-white/60 overflow-hidden rounded-md h-full flex flex-col'>
              <Image
                src={item.image}
                alt={item.name}
                className='w-full h-42 object-cover object-center'
              />
              <div className='p-3 flex flex-col gap-2 bg-white dark:bg-zinc-950 flex-1'>
                <div className="flex flex-row items-start justify-between gap-2">
                  <h3 className='text-xl font-semibold text-blue-900 dark:text-blue-200'>{item.name}</h3>
                  <div className='flex flex-row gap-2 pt-2 items-center'>
                    {item.isLiked ? (
                      <FaHeart
                        className='text-[22px] text-red-600 cursor-pointer dark:text-red-300'
                        onClick={() => toggleLike(index)}
                      />
                    ) : (
                      <FaRegHeart
                        className='text-[22px] text-red-600 cursor-pointer dark:text-red-300'
                        onClick={() => toggleLike(index)}
                      />
                    )}
                    {/* Veg / Non-Veg Button */}
                    {item.isVeg !== undefined && (
                      item.isVeg ? (
                        <div className='w-5 h-5 border-2 border-green-600 flex items-center justify-center text-green-600' title='Veg'>
                          <FaCircle className='text-[10px]' />
                        </div>
                      ) : (
                        <div className='w-5 h-5 border-2 border-red-600 flex items-center justify-center text-red-600' title='Non-Veg'>
                          <IoTriangle className='text-[10px]' />
                        </div>
                      )
                    )}
                  </div>
                </div>
                <div className='flex flex-col gap-2 mt-auto'>
                  <div className='flex flex-row justify-between items-end mt-auto'>
                    <span className='text-sm text-gray-500 dark:text-gray-400'>(3pc Per Plate)</span>
                    <span className='text-3xl font-semibold text-blue-900 dark:text-blue-200'>{item.price}</span>
                  </div>
                  <div className='flex items-center gap-1'>
                    {item.tags.map((tag, index) => (
                      <span key={index} className={`text-[11px] uppercase px-2 py-0.5 rounded-lg font-medium transition-all ${getTagStyles(tag)}`}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;