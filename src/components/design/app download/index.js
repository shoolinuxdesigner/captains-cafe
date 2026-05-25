import React from 'react'
import Image from 'next/image'
import mobileApp from "@/assets/images/TCC App.png"
import mobileAppBG from "@/assets/images/app download bg.png"

import ios from "@/assets/images/apple-store.png"
import android from "@/assets/images/app-store.png"

// Counter JS
import CountUp from '@/components/ui/CountUp/page'

const AppDownload = () => {
    return (
        <div className="bg-[linear-gradient(288deg,#0B2741_11.92%,#133F6B_48.46%,#1D64A7_87.27%)] w-full rounded-2xl sm:rounded-3xl group overflow-hidden relative px-5 py-8 sm:px-8 md:px-10 lg:px-14 xl:px-20 xl:py-10">
            <div className='flex flex-col-reverse gap-8 md:flex-row md:items-center md:gap-10 relative z-10'>
                <div className='w-full md:w-5/12 lg:w-1/3 flex justify-center md:justify-start group-hover:scale-105 transition-transform duration-500 ease-in-out'>
                    <Image src={mobileApp} alt="TCC Mobile App" className='w-44 sm:w-56 md:w-64 lg:w-72 xl:w-80 md:translate-y-8 lg:translate-y-10 h-auto' />
                </div>
                <div className='w-full md:w-7/12 lg:w-2/3 flex flex-col my-auto text-white text-center md:text-left'>
                    <p className='uppercase text-xs sm:text-sm lg:text-lg mb-3 sm:mb-5 lg:mb-8 font-light tracking-wider'>Try on mobile</p>
                    <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-semibold mb-6 lg:mb-10 xl:mb-12 leading-tight lg:leading-20">
                        Download <span className='block xl:inline text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl opacity-80 font-normal'>our app for free</span>
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 opacity-80 gap-5 sm:gap-8 lg:gap-12 xl:gap-20 mb-7 lg:mb-8">
                        <div className="flex flex-col gap-2">
                            <h6 className="text-white text-3xl sm:text-4xl lg:text-5xl font-normal">
                                <CountUp
                                    from={190000}
                                    to={200000}
                                    separator=","
                                    direction="up"
                                    duration={2}
                                />+
                            </h6>
                            <p className="text-white font-extralight text-base sm:text-lg lg:text-2xl">Total Downloads</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h6 className="text-white text-3xl sm:text-4xl lg:text-5xl font-normal">
                                <CountUp
                                    from={8600}
                                    to={9000}
                                    separator=","
                                    direction="up"
                                    duration={3}
                                />+
                            </h6>
                            <p className="text-white font-extralight text-base sm:text-lg lg:text-2xl">Active Users</p>
                        </div>
                    </div>
                    <div className="flex flex-col min-[380px]:flex-row items-center justify-center md:justify-start gap-3 group-hover:scale-105 md:group-hover:translate-x-6 transition-transform duration-500 ease-in-out">
                        <a href="https://play.google.com/store/apps/details?id=com.captainscafeedinburgh&pcampaignid=web_share" target="_blank" rel="noopener noreferrer">
                            <Image src={ios} alt="iOS Download" className="w-40 sm:w-44 lg:w-50 cursor-pointer h-auto" />
                        </a>
                        <a href="https://play.google.com/store/apps/details?id=com.captainscafeedinburgh&pcampaignid=web_share" target="_blank" rel="noopener noreferrer">
                            <Image src={android} alt="Android Download" className="w-40 sm:w-44 lg:w-50 cursor-pointer h-auto" />
                        </a>
                    </div>
                </div>
            </div>
            <Image src={mobileAppBG} alt="App Download Background" className="scale-110 group-hover:scale-100 ease-in-out transition-transform duration-500 absolute top-0 left-0 w-full h-full object-cover opacity-60" />
        </div>
    )
}
export default AppDownload
