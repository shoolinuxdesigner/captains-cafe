"use client"
import React, { useState, useEffect } from 'react'
import { RiEditLine, RiDeleteBin5Line } from "react-icons/ri";
import Button from '@/components/common/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'react-hot-toast'
import Swal from 'sweetalert2'

const AddressPage = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Subham Choudhury",
      mobile: "+91 89599 78588",
      alternate: "+91 78554 98665",
      address: "NH5 - Ghatikia Rd, Kalinga Vihar, Kalinga Vihar LIG, Kalinganagar",
      landmark: "Pal Auto Showroom",
      city: "Bhubaneswar",
      district: "Khurdha",
      pincode: "752054",
      isDefault: true
    },
    {
      id: 2,
      name: "Subham Choudhury",
      mobile: "+91 89599 78588",
      alternate: "+91 99370 12345",
      address: "Plot No. 412, Saheed Nagar Main Rd, Opp. RD Women's University",
      landmark: "IMFA Park",
      city: "Bhubaneswar",
      district: "Khurdha",
      pincode: "751007",
      isDefault: false
    }
  ]);

  const [hasLoaded, setHasLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('user_addresses');
    if (saved) {
      try {
        setAddresses(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse user addresses from localStorage:', e);
      }
    }
    setHasLoaded(true);
  }, []);

  // Save to localStorage when addresses change
  useEffect(() => {
    if (hasLoaded) {
      localStorage.setItem('user_addresses', JSON.stringify(addresses));
    }
  }, [addresses, hasLoaded]);

  const initialFormState = {
    name: "",
    mobile: "",
    alternate: "",
    address: "",
    landmark: "",
    city: "",
    district: "",
    pincode: "",
    isDefault: false
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleOpenAdd = () => {
    setFormData(initialFormState);
    setIsEditing(false);
    setEditId(null);
    setIsSheetOpen(true);
  };

  const handleOpenEdit = (item) => {
    setFormData({
      name: item.name,
      mobile: item.mobile,
      alternate: item.alternate || "",
      address: item.address,
      landmark: item.landmark || "",
      city: item.city,
      district: item.district,
      pincode: item.pincode,
      isDefault: item.isDefault
    });
    setIsEditing(true);
    setEditId(item.id);
    setIsSheetOpen(true);
  };

  const handleDelete = (id) => {
    const target = addresses.find(addr => addr.id === id);
    if (!target) return;

    if (target.isDefault) {
      toast.error("Default address cannot be deleted! Set another address as default first.");
      return;
    }

    if (addresses.length <= 1) {
      toast.error("At least one address must remain. You cannot delete the only address.");
      return;
    }

    Swal.fire({
      html: `
        <div class="text-center p-2">
          <!-- Custom Trash Icon -->
          <div class="flex justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#d91b1b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-24 h-24 text-red-600">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-red-600 mb-1">Are You Sure?</h2>
          <p class="text-gray-500 dark:text-gray-400 font-medium text-md leading-relaxed">Do you really want to delete?</p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
      customClass: {
        popup: 'rounded-2xl p-6 max-w-sm border border-gray-100 dark:border-neutral-800 bg-white dark:bg-neutral-900',
        confirmButton: 'px-8 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold text-md rounded-lg shadow-sm transition-all focus:outline-none flex-1',
        cancelButton: 'px-8 py-2.5 border border-gray-200 bg-white hover:bg-gray-50 text-blue-950 font-semibold text-md rounded-lg shadow-sm transition-all focus:outline-none flex-1',
        actions: 'flex justify-center gap-4 w-full mt-6 px-2'
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        setAddresses(addresses.filter(addr => addr.id !== id));
        toast.success("Address deleted successfully!");
      }
    });
  };

  const handleSetDefault = (id) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
    toast.success("Address set as default successfully!");
  };

  const handleSave = (e) => {
    e.preventDefault();

    // Basic Validation
    if (!formData.name.trim()) { toast.error("Name is required"); return; }
    if (!formData.mobile.trim()) { toast.error("Mobile Number is required"); return; }
    if (!formData.address.trim()) { toast.error("Address is required"); return; }
    if (!formData.city.trim()) { toast.error("City is required"); return; }
    if (!formData.district.trim()) { toast.error("District is required"); return; }
    if (!formData.pincode.trim()) { toast.error("Pincode is required"); return; }

    if (isEditing) {
      // Editing Mode
      setAddresses(addresses.map(addr => {
        if (addr.id === editId) {
          return {
            ...addr,
            name: formData.name.trim(),
            mobile: formData.mobile.trim(),
            alternate: formData.alternate.trim(),
            address: formData.address.trim(),
            landmark: formData.landmark.trim(),
            city: formData.city.trim(),
            district: formData.district.trim(),
            pincode: formData.pincode.trim(),
            isDefault: formData.isDefault
          };
        }
        // Unset other defaults if the edited one is set to default
        if (formData.isDefault) {
          return { ...addr, isDefault: false };
        }
        return addr;
      }));
      toast.success("Address updated successfully!");
    } else {
      // Add Mode
      const newId = Date.now();
      const shouldBeDefault = formData.isDefault || addresses.length === 0;

      const newAddress = {
        id: newId,
        name: formData.name.trim(),
        mobile: formData.mobile.trim(),
        alternate: formData.alternate.trim(),
        address: formData.address.trim(),
        landmark: formData.landmark.trim(),
        city: formData.city.trim(),
        district: formData.district.trim(),
        pincode: formData.pincode.trim(),
        isDefault: shouldBeDefault
      };

      if (shouldBeDefault) {
        setAddresses(addresses.map(addr => ({ ...addr, isDefault: false })).concat(newAddress));
      } else {
        setAddresses([...addresses, newAddress]);
      }
      toast.success("Address added successfully!");
    }

    setIsSheetOpen(false);
  };

  return (
    <div className='flex flex-col space-y-3'>
      <div className="w-full px-6 py-4 rounded-md bg-white dark:bg-neutral-800 shadow-[inset_-4px_-4px_4px_-1px_rgba(0,0,0,0.15)] border border-gray-100 dark:border-neutral-700">
        <div className="flex justify-between items-center">
          <h3 className='text-lg font-semibold text-blue-900 dark:text-blue-200'>Addresses</h3>
          <Button text="ADD" radius="md" size='sm' onClick={handleOpenAdd} />
        </div>
        <hr className='my-2 border-gray-200 dark:border-neutral-700' />
        
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mt-3'>
          {addresses.map((item) => (
            <div 
              key={item.id} 
              className={`flex flex-col gap-1.5 pt-5 px-5 pb-3 rounded-md transition-all duration-200 ${
                item.isDefault 
                  ? 'bg-blue-50/30 dark:bg-neutral-800/40 border-2 border-blue-900 shadow-md' 
                  : 'bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 hover:border-gray-300'
              }`}
            >
              <div className='flex flex-row text-sm gap-2'>
                <span className="text-gray-800 dark:text-gray-100 font-semibold w-[140px] shrink-0">Name</span>
                <span className="text-gray-800 dark:text-gray-100 font-semibold shrink-0">:</span>
                <span className="text-gray-600 dark:text-gray-200">{item.name}</span>
              </div>
              <div className='flex flex-row text-sm gap-2'>
                <span className="text-gray-800 dark:text-gray-100 font-semibold w-[140px] shrink-0">Mobile Number</span>
                <span className="text-gray-800 dark:text-gray-100 font-semibold shrink-0">:</span>
                <span className="text-gray-600 dark:text-gray-200">{item.mobile}</span>
              </div>
              <div className='flex flex-row text-sm gap-2'>
                <span className="text-gray-800 dark:text-gray-100 font-semibold w-[140px] shrink-0">Alternate Number</span>
                <span className="text-gray-800 dark:text-gray-100 font-semibold shrink-0">:</span>
                <span className="text-gray-600 dark:text-gray-200">{item.alternate || "-"}</span>
              </div>
              <hr className='my-2 border-gray-200 dark:border-neutral-700' />
              
              <div className='flex flex-row text-sm gap-2'>
                <span className="text-gray-800 dark:text-gray-100 font-semibold w-[140px] shrink-0">Address</span>
                <span className="text-gray-800 dark:text-gray-100 font-semibold shrink-0">:</span>
                <span className="text-gray-600 dark:text-gray-200 leading-snug">{item.address}</span>
              </div>
              <div className='flex flex-row text-sm gap-2'>
                <span className="text-gray-800 dark:text-gray-100 font-semibold w-[140px] shrink-0">Landmark</span>
                <span className="text-gray-800 dark:text-gray-100 font-semibold shrink-0">:</span>
                <span className="text-gray-600 dark:text-gray-200">{item.landmark || "-"}</span>
              </div>
              <div className='flex flex-row text-sm gap-2'>
                <span className="text-gray-800 dark:text-gray-100 font-semibold w-[140px] shrink-0">City</span>
                <span className="text-gray-800 dark:text-gray-100 font-semibold shrink-0">:</span>
                <span className="text-gray-600 dark:text-gray-200">{item.city}</span>
              </div>
              <div className='flex flex-row text-sm gap-2'>
                <span className="text-gray-800 dark:text-gray-100 font-semibold w-[140px] shrink-0">District</span>
                <span className="text-gray-800 dark:text-gray-100 font-semibold shrink-0">:</span>
                <span className="text-gray-600 dark:text-gray-200">{item.district}</span>
              </div>
              <div className='flex flex-row text-sm gap-2'>
                <span className="text-gray-800 dark:text-gray-100 font-semibold w-[140px] shrink-0">Pin code</span>
                <span className="text-gray-800 dark:text-gray-100 font-semibold shrink-0">:</span>
                <span className="text-gray-600 dark:text-gray-200">{item.pincode}</span>
              </div>
              
              <div className="flex justify-end gap-2 mt-4 items-center">
                {item.isDefault ? (
                  <span className="px-3 py-1 bg-blue-900 border border-blue-900 text-white text-xs font-semibold rounded-sm cursor-default select-none shadow-sm uppercase tracking-wider">
                    Default
                  </span>
                ) : (
                  <button 
                    onClick={() => handleSetDefault(item.id)}
                    className="px-3 py-1 border border-blue-900 text-blue-900 bg-white hover:bg-blue-900 hover:text-white text-xs font-semibold rounded-sm transition-all duration-200"
                  >
                    Set as Default
                  </button>
                )}
                
                <button 
                  onClick={() => handleOpenEdit(item)}
                  className="p-1 border border-amber-600 text-amber-600 bg-white hover:bg-amber-50 rounded-sm transition-all duration-200"
                  title="Edit Address"
                >
                  <RiEditLine size={16} />
                </button>
                
                <button 
                  onClick={() => handleDelete(item.id)}
                  className={`p-1 border rounded-sm transition-all duration-200 ${
                    item.isDefault 
                      ? 'border-gray-300 text-gray-300 bg-gray-50 cursor-not-allowed' 
                      : 'border-red-600 text-red-600 bg-white hover:bg-red-50'
                  }`}
                  title={item.isDefault ? "Default address cannot be deleted" : "Delete Address"}
                  disabled={item.isDefault}
                >
                  <RiDeleteBin5Line size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="p-0 border-0 h-full overflow-y-auto w-full max-w-md sm:max-w-lg">
          <SheetHeader>
            <SheetTitle className="bg-blue-950 py-3 px-4 text-white text-md font-semibold">
              {isEditing ? "Edit Address Details" : "Add Address Details"}
            </SheetTitle>
          </SheetHeader>
          <div className="py-4 px-5">
            <form onSubmit={handleSave} className="space-y-3 pb-8">
              <div>
                <Label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Name</Label>
                <Input 
                  type="text" 
                  placeholder="Enter Full Name" 
                  value={formData.name} 
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                  className="mt-1 text-sm bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700"
                />
              </div>
              <div>
                <Label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Mobile Number</Label>
                <Input 
                  type="text" 
                  placeholder="Enter Mobile Number" 
                  value={formData.mobile} 
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })} 
                  className="mt-1 text-sm bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700"
                />
              </div>
              <div>
                <Label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Alternate Mobile Number (Optional)</Label>
                <Input 
                  type="text" 
                  placeholder="Enter Alternate Mobile Number" 
                  value={formData.alternate} 
                  onChange={(e) => setFormData({ ...formData, alternate: e.target.value })} 
                  className="mt-1 text-sm bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700"
                />
              </div>
              <div>
                <Label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Address</Label>
                <Input 
                  type="text" 
                  placeholder="Enter Address" 
                  value={formData.address} 
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })} 
                  className="mt-1 text-sm bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700"
                />
              </div>
              <div>
                <Label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Landmark (Optional)</Label>
                <Input 
                  type="text" 
                  placeholder="Enter Landmark" 
                  value={formData.landmark} 
                  onChange={(e) => setFormData({ ...formData, landmark: e.target.value })} 
                  className="mt-1 text-sm bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-semibold text-gray-700 dark:text-gray-300">City</Label>
                  <Input 
                    type="text" 
                    placeholder="Enter City" 
                    value={formData.city} 
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })} 
                    className="mt-1 text-sm bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700"
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold text-gray-700 dark:text-gray-300">District</Label>
                  <Input 
                    type="text" 
                    placeholder="Enter District" 
                    value={formData.district} 
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })} 
                    className="mt-1 text-sm bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700"
                  />
                </div>
              </div>
              <div>
                <Label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Pincode</Label>
                <Input 
                  type="text" 
                  placeholder="Enter Pincode" 
                  value={formData.pincode} 
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })} 
                  className="mt-1 text-sm bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700"
                />
              </div>
              <div className="pt-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isDefault"
                  checked={formData.isDefault}
                  disabled={isEditing && formData.isDefault}
                  onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                  className="w-4 h-4 rounded text-blue-900 border-gray-300 focus:ring-blue-500 cursor-pointer"
                />
                <Label htmlFor="isDefault" className="text-xs font-semibold text-gray-700 dark:text-gray-300 cursor-pointer select-none">
                  Set as Default Address
                </Label>
              </div>
              <div className="pt-3 flex flex-row gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsSheetOpen(false)} 
                  className="flex-1 px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-md transition-all duration-200"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-grow w-3/5 px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white text-sm font-medium rounded-md transition-all duration-200"
                >
                  {isEditing ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AddressPage;