"use client"
import React, { useState } from 'react'

import Button from '@/components/common/button';
import CardHeading from '../../elements/CardHeading'
import { TbArrowBackUp } from "react-icons/tb";
import { LuHistory } from "react-icons/lu";
import { TbShoppingBag } from "react-icons/tb";
import { GrCycle } from "react-icons/gr";
import { CgUserList } from "react-icons/cg";
import { BiSolidEdit } from "react-icons/bi";
import { BsEmojiSmile } from "react-icons/bs";
import { IoSendSharp } from "react-icons/io5";
import { FiUpload, FiPlus } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineCall, MdOutlineOpenInNew } from "react-icons/md";
import { IoMdSettings, IoMdClose } from "react-icons/io";
import { IoPauseSharp } from "react-icons/io5";
import { HiOutlineDocumentText } from "react-icons/hi2";

const CustomerDetails = () => {
    const [message, setMessage] = useState('');
    const [expandedSections, setExpandedSections] = useState({ notes: true, complain: true, numbers: true, person: true });
    const [isOnHold, setIsOnHold] = useState(false);

    // Dynamic states for interactive features
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'support',
            sender: 'You (Support Executive)',
            message: 'Hey Archana, How can I help you?',
            time: 'Friday 2:20pm',
            avatar: '/support-avatar.png'
        },
        {
            id: 2,
            type: 'customer',
            sender: 'Archana Sahu',
            message: 'I have a ₹1299 Dinner Meal subscription. I\'d like to subscribe to the Lunch plan as well — how can I opt in for that?',
            time: 'Friday 2:20pm',
            avatar: '/customer-avatar.png'
        },
        {
            id: 3,
            type: 'customer',
            sender: 'Archana Sahu',
            message: null,
            time: 'Friday 2:25pm',
            avatar: '/customer-avatar.png',
            attachment: {
                name: 'order-captainscafe-1258-DFN.pdf',
                size: '200 KB'
            }
        }
    ]);

    const [notes, setNotes] = useState([
        { id: 1, text: "Customer uses Dinner Meal subscription." },
        { id: 2, text: "Wants Lunch plan opt-in link." }
    ]);
    const [noteInput, setNoteInput] = useState('');

    const [complain, setComplain] = useState('');
    const [complainsList, setComplainsList] = useState([]);

    const [numbersList, setNumbersList] = useState([
        "+91 89562 78452",
        "+91 74125 89630"
    ]);
    const [newNumber, setNewNumber] = useState('');

    const toggleSection = (section) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const handleSendMessage = (textToSend = message) => {
        if (!textToSend || !textToSend.trim()) return;

        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const dayStr = now.toLocaleDateString([], { weekday: 'short' });

        setMessages(prev => [
            ...prev,
            {
                id: Date.now(),
                type: 'support',
                sender: 'You (Support Executive)',
                message: textToSend,
                time: `${dayStr} ${timeStr}`,
                avatar: '/support-avatar.png'
            }
        ]);
        
        // Reset input box if sent from text box
        if (textToSend === message) {
            setMessage('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const handleAddNote = () => {
        if (!noteInput.trim()) return;
        setNotes(prev => [...prev, { id: Date.now(), text: noteInput }]);
        setNoteInput('');
    };

    const handleAddComplain = () => {
        if (!complain.trim()) return;
        setComplainsList(prev => [...prev, { id: Date.now(), text: complain }]);
        setComplain('');
    };

    const handleAddNumber = () => {
        if (!newNumber.trim()) return;
        setNumbersList(prev => [...prev, newNumber]);
        setNewNumber('');
    };

    const quickReplies = [
        "How can I help you?",
        "Good Morning",
        "Hello Sir",
        "Good Evening"
    ];

    return (
        <div>
            {/* Header */}
            <div className="flex justify-between items-center">
                <CardHeading title="View" bottomLine="false" />
                <Button
                    text="Back"
                    className=''
                    size='sm'
                    icon={<TbArrowBackUp />}
                    radius='sm'
                    iconPosition="left"
                />
            </div>
            <hr className='my-3' />

            {/* Customer Info */}
            <div>
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-2 xl:gap-4 w-full">
                    <div className="flex flex-col md:flex-row space-y-1">
                        <h2 className='text-gray-600 block font-medium text-md w-full lg:w-[140px]'>Name</h2>
                        <div className="flex flex-col w-full sm:w-[calc(100%-140px)] gap-2">
                            <p className='text-gray-500 before:content-["-"] sm:before:content-[":"] before:pr-3 sm:before:pr-2 before:font-bold text-justify'>Archana Sahoo</p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row space-y-1">
                        <h2 className='text-gray-600 block font-medium text-md w-full lg:w-[140px]'>Customer ID</h2>
                        <div className="flex flex-col w-full sm:w-[calc(100%-140px)] gap-2">
                            <p className='text-gray-500 before:content-["-"] sm:before:content-[":"] before:pr-3 sm:before:pr-2 before:font-bold text-justify'>7845128956</p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row space-y-1">
                        <h2 className='text-gray-600 block font-medium text-md w-full lg:w-[140px]'>Mobile Number</h2>
                        <div className="flex flex-col w-full sm:w-[calc(100%-140px)] gap-2">
                            <p className='text-gray-500 before:content-["-"] sm:before:content-[":"] before:pr-3 sm:before:pr-2 before:font-bold text-justify'>+91 89562 78452</p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row space-y-1">
                        <h2 className='text-gray-600 block font-medium text-md w-full lg:w-[140px]'>Email ID</h2>
                        <div className="flex flex-col w-full sm:w-[calc(100%-140px)] gap-2">
                            <p className='text-gray-500 before:content-["-"] sm:before:content-[":"] before:pr-3 sm:before:pr-2 before:font-bold text-justify'>archana.sahoo@gmail.com</p>
                        </div>
                    </div>
                </div>

                {/* Tab Buttons */}
                <div className="flex flex-wrap gap-2 w-full mt-6">
                    <Button
                        text="Recent Order"
                        className='bg-green-800 w-fit whitespace-nowrap'
                        size='md'
                        icon={<LuHistory />}
                        radius='sm'
                        iconPosition="left"
                        variant='secondary'
                    />
                    <Button
                        text="All Orders"
                        className='bg-green-800 w-fit whitespace-nowrap'
                        size='md'
                        icon={<TbShoppingBag />}
                        radius='sm'
                        iconPosition="left"
                        variant='primary'
                    />
                    <Button
                        text="Subscription"
                        className='bg-purple-900 w-fit whitespace-nowrap'
                        size='md'
                        icon={<GrCycle />}
                        radius='sm'
                        iconPosition="left"
                        variant='secondary'
                    />
                    <Button
                        text="Customer Details"
                        className='!bg-amber-900 w-fit whitespace-nowrap'
                        size='md'
                        icon={<CgUserList />}
                        radius='sm'
                        iconPosition="left"
                        variant='secondary'
                    />
                    <Button
                        text="Modify"
                        className='!bg-cyan-900 w-fit whitespace-nowrap'
                        size='md'
                        icon={<BiSolidEdit />}
                        radius='sm'
                        iconPosition="left"
                        variant='secondary'
                    />
                </div>
            </div>

            {/* ===== CHAT AREA ===== */}
            <div className="flex flex-col lg:flex-row gap-4 mt-6">

                {/* Left: Chat Panel */}
                <div className="flex-grow border border-gray-200 rounded-lg flex flex-col min-h-[480px]">

                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-5">

                        {messages.map((msg) => (
                            <div key={msg.id}>
                                {msg.type === 'support' ? (
                                    /* Support Executive Message - Right aligned */
                                    <div className="flex flex-col items-end animate-fadeIn">
                                        <div className="flex items-start gap-3 max-w-[85%]">
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between gap-4 mb-1.5">
                                                    <span className="text-sm font-semibold text-gray-700">{msg.sender}</span>
                                                    <span className="text-xs text-gray-400 whitespace-nowrap">{msg.time}</span>
                                                </div>
                                                <div className="bg-gray-50 border border-gray-200 rounded-lg rounded-tr-none p-3 shadow-sm">
                                                    <p className="text-gray-700 text-[15px]">{msg.message}</p>
                                                </div>
                                            </div>
                                            <div className="relative flex-shrink-0">
                                                <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center text-white font-bold text-sm overflow-hidden border border-blue-800">
                                                    SE
                                                </div>
                                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    /* Customer Message - Left aligned */
                                    <div className="flex flex-col items-start animate-fadeIn">
                                        <div className="flex items-start gap-3 max-w-[85%]">
                                            <div className="relative flex-shrink-0">
                                                <div className="w-10 h-10 rounded-full bg-amber-700 flex items-center justify-center text-white font-bold text-sm overflow-hidden border border-amber-600">
                                                    AS
                                                </div>
                                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between gap-4 mb-1.5">
                                                    <span className="text-sm font-semibold text-gray-700">{msg.sender}</span>
                                                    <span className="text-xs text-gray-400 whitespace-nowrap">{msg.time}</span>
                                                </div>
                                                {msg.message && (
                                                    <div className="bg-blue-50 border border-blue-100 rounded-lg rounded-tl-none p-3 shadow-sm">
                                                        <p className="text-gray-700 text-[15px]">{msg.message}</p>
                                                    </div>
                                                )}
                                                {msg.attachment && (
                                                    <div className="bg-white border border-gray-200 rounded-lg p-3 mt-2 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors shadow-sm">
                                                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                            <HiOutlineDocumentText className="text-gray-500 text-xl" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-700">{msg.attachment.name}</p>
                                                            <p className="text-xs text-gray-400">{msg.attachment.size}</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Quick Reply Chips */}
                    <div className="px-4 py-2 border-t border-gray-100">
                        <div className="flex flex-wrap gap-2">
                            {quickReplies.map((reply, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSendMessage(reply)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 bg-white border border-gray-200 rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                                >
                                    {reply}
                                    <FiPlus className="text-gray-400 text-xs" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Message Input */}
                    <div className="p-3 border-t border-gray-200">
                        <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2 border border-gray-200">
                            <button className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0">
                                <BsEmojiSmile size={20} />
                            </button>
                            <input
                                type="text"
                                placeholder="Type your message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="flex-1 bg-transparent outline-none text-gray-700 text-sm placeholder:text-gray-400"
                            />
                            <button className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0">
                                <FiUpload size={18} />
                            </button>
                            <button 
                                onClick={() => handleSendMessage()}
                                className="w-8 h-8 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center text-white transition-colors flex-shrink-0"
                            >
                                <IoSendSharp size={14} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right: Note Sheet + Contact Card */}
                <div className="w-full lg:w-[320px] flex flex-col gap-4 flex-shrink-0">

                    {/* Note Sheet */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                            <h3 className="text-blue-900 font-bold text-base">Note Sheet</h3>
                        </div>

                        {/* Notes Section */}
                        <div className="border-b border-gray-100">
                            <button
                                onClick={() => toggleSection('notes')}
                                className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 transition-colors text-left"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-gray-700">Notes</span>
                                    <span className="w-5 h-5 bg-green-600 text-white text-xs rounded-full flex items-center justify-center font-bold">{notes.length}</span>
                                </div>
                                <FiPlus className={`text-green-600 text-lg transition-transform duration-200 ${expandedSections.notes ? 'rotate-45' : ''}`} />
                            </button>
                            {expandedSections.notes && (
                                <div className="px-4 pb-3 space-y-2">
                                    <div className="space-y-1.5 max-h-[120px] overflow-y-auto pr-1">
                                        {notes.map(note => (
                                            <div key={note.id} className="text-xs bg-gray-50 border border-gray-100 rounded p-2 text-gray-600">
                                                {note.text}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex gap-1.5">
                                        <input
                                            type="text"
                                            placeholder="Write a note..."
                                            value={noteInput}
                                            onChange={e => setNoteInput(e.target.value)}
                                            onKeyDown={e => e.key === 'Enter' && handleAddNote()}
                                            className="flex-1 text-xs border border-gray-200 rounded px-2 py-1 outline-none focus:border-green-500"
                                        />
                                        <button 
                                            onClick={handleAddNote}
                                            className="bg-green-600 text-white rounded p-1 hover:bg-green-700 flex items-center justify-center"
                                        >
                                            <FiPlus size={14} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Complain Section */}
                        <div className="border-b border-gray-100">
                            <button
                                onClick={() => toggleSection('complain')}
                                className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 transition-colors text-left"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-gray-700">Complain</span>
                                    {complainsList.length > 0 && (
                                        <span className="w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center font-bold">{complainsList.length}</span>
                                    )}
                                </div>
                                <FiPlus className={`text-green-600 text-lg transition-transform duration-200 ${expandedSections.complain ? 'rotate-45' : ''}`} />
                            </button>
                            {expandedSections.complain && (
                                <div className="px-4 pb-3 space-y-2">
                                    <div className="space-y-1.5 max-h-[120px] overflow-y-auto pr-1">
                                        {complainsList.map(c => (
                                            <div key={c.id} className="text-xs bg-red-50 border border-red-100 rounded p-2 text-gray-600">
                                                {c.text}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex gap-1.5">
                                        <textarea
                                            className="flex-1 min-h-[40px] max-h-[80px] border border-gray-200 rounded-md p-1.5 text-xs text-gray-600 resize-none outline-none focus:border-blue-300"
                                            placeholder="Write complain here..."
                                            value={complain}
                                            onChange={e => setComplain(e.target.value)}
                                        ></textarea>
                                        <button 
                                            onClick={handleAddComplain}
                                            className="bg-red-600 hover:bg-red-700 text-white rounded px-2 flex items-center justify-center text-xs font-semibold"
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Numbers Section */}
                        <div className="border-b border-gray-100">
                            <button
                                onClick={() => toggleSection('numbers')}
                                className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 transition-colors text-left"
                            >
                                <span className="text-sm font-medium text-gray-700">Numbers</span>
                                <FiPlus className={`text-green-600 text-lg transition-transform duration-200 ${expandedSections.numbers ? 'rotate-45' : ''}`} />
                            </button>
                            {expandedSections.numbers && (
                                <div className="px-4 pb-3 space-y-2">
                                    <div className="space-y-1">
                                        {numbersList.map((num, i) => (
                                            <div key={i} className="text-xs flex items-center justify-between bg-gray-50 border border-gray-100 rounded p-1.5 text-gray-600">
                                                <span>{num}</span>
                                                <span className="text-[10px] text-gray-400 font-semibold">{i === 0 ? 'Primary' : 'Alt'}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex gap-1.5">
                                        <input
                                            type="text"
                                            placeholder="Add phone..."
                                            value={newNumber}
                                            onChange={e => setNewNumber(e.target.value)}
                                            onKeyDown={e => e.key === 'Enter' && handleAddNumber()}
                                            className="flex-1 text-xs border border-gray-200 rounded px-2 py-1 outline-none focus:border-blue-500"
                                        />
                                        <button 
                                            onClick={handleAddNumber}
                                            className="bg-blue-600 text-white rounded p-1 hover:bg-blue-700 flex items-center justify-center"
                                        >
                                            <FiPlus size={14} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Person Details Section */}
                        <div>
                            <button
                                onClick={() => toggleSection('person')}
                                className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 transition-colors text-left"
                            >
                                <span className="text-sm font-medium text-gray-700">Person Details</span>
                                <FiPlus className={`text-green-600 text-lg transition-transform duration-200 ${expandedSections.person ? 'rotate-45' : ''}`} />
                            </button>
                            {expandedSections.person && (
                                <div className="px-4 pb-3 pt-1 space-y-2 text-xs text-gray-600 border-t border-gray-50">
                                    <div className="grid grid-cols-2 gap-y-1.5 gap-x-2">
                                        <span className="font-semibold text-gray-500">Gender:</span>
                                        <span>Female</span>
                                        <span className="font-semibold text-gray-500">Language:</span>
                                        <span>English, Hindi, Odia</span>
                                        <span className="font-semibold text-gray-500">City:</span>
                                        <span>Bhubaneswar</span>
                                        <span className="font-semibold text-gray-500">Status:</span>
                                        <span className="text-green-600 font-semibold">VIP Member</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Contact Info Card */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                        {/* Contact Header */}
                        <div className="px-4 py-3">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h4 className="text-blue-900 font-bold text-sm">Archana Sahoo</h4>
                                    <p className="text-xs text-gray-500 mt-0.5">+91 89562 78452</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-gray-500">Duration: <span className="font-bold text-gray-700">12m 42s</span></p>
                                    <p className="text-xs text-gray-500 mt-0.5">archana.sahu@gmail.com</p>
                                </div>
                            </div>

                            {/* Action Icons Row */}
                            <div className="flex items-center justify-between mt-3 gap-2">
                                <div className="flex items-center gap-1">
                                    <button className="w-8 h-8 rounded-full bg-blue-900 hover:bg-blue-800 text-white flex items-center justify-center transition-colors" title="Email">
                                        <HiOutlineMail size={16} />
                                    </button>
                                    <button className="w-8 h-8 rounded-full bg-blue-900 hover:bg-blue-800 text-white flex items-center justify-center transition-colors" title="Call">
                                        <MdOutlineCall size={16} />
                                    </button>
                                    <button className="w-8 h-8 rounded-full bg-blue-900 hover:bg-blue-800 text-white flex items-center justify-center transition-colors" title="Settings">
                                        <IoMdSettings size={16} />
                                    </button>
                                    <button className="w-8 h-8 rounded-full bg-blue-900 hover:bg-blue-800 text-white flex items-center justify-center transition-colors" title="Open">
                                        <MdOutlineOpenInNew size={16} />
                                    </button>
                                    <button className="w-8 h-8 rounded-full bg-white border border-red-400 hover:bg-red-50 text-red-500 flex items-center justify-center transition-colors" title="Close">
                                        <IoMdClose size={16} />
                                    </button>
                                </div>
                                <button
                                    onClick={() => setIsOnHold(!isOnHold)}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${isOnHold
                                        ? 'bg-amber-500 hover:bg-amber-600 text-white shadow'
                                        : 'bg-green-600 hover:bg-green-700 text-white shadow'
                                        }`}
                                >
                                    <IoPauseSharp size={12} />
                                    {isOnHold ? 'HOLDING' : 'HOLD'}
                                </button>
                            </div>
                        </div>

                        {/* End Chat Button */}
                        <button className="w-full bg-red-600 hover:bg-red-700 text-white text-sm font-bold py-2.5 transition-colors uppercase tracking-wide">
                            End Chat
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerDetails