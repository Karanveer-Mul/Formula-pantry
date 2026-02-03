'use client';

import Link from 'next/link';
import { House, Newspaper, Users, Shield , ChartNoAxesColumn, AlignEndHorizontal, MoreVertical, UserCircle, Calendar, ChevronRight, CircleChevronLeft, Menu, X, Wrench, ChevronLeft} from 'lucide-react';
import { useContext, useState } from 'react';
import Image from 'next/image';


export const PCNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <div className={`hidden sticky shrink-0 top-0 lg:flex h-screen w-30 z-50 text-black bg-white
        before:content-[""] before:absolute before:top-0 before:right-0 before:w-[calc(100%+16rem)] before:h-full before:bg-white before:shadow-md before:transition-[transform] before:duration-300 before:ease-in-out   
         ${isMenuOpen ? "before:transform-[translate3d(15rem,0,0)]" : " "}`}
         onMouseEnter={() => setIsMenuOpen(true)} onMouseLeave={() => setIsMenuOpen(false)}
         
         >                
            <div className={`relative h-full w-30 z-50 text-black bg-white
                
            `}>
                <Image loading="eager" className={`${isMenuOpen ? "transform-[translate3d(calc(-50%+.5rem),0,0)_scale(1.5)]" : "transform-[translate3d(-50%,0,0)]"} 
                w-26 h-auto
                absolute left-[50%] top-6 origin-top-left text-black z-70 transition-[transform] duration-300 ease-in-out`}
                src="/logo.svg" alt="Sector Talks Logo" width={60} height={30} />
                
                <div className={`transform-[translateY(12.625rem)] absolute top-0 left-0 box-border h-20 border-l-black border-l-4 bg-gray-100 opacity-100 pointer-events-none 
                transition-[transform,height,width] duration-300 ease-in-out
                ${isMenuOpen ? "w-[calc(100%+13.5rem)]" : "w-[calc(100%-1rem)]"}
                `}>
                </div>
                <div className={`absolute top-0 left-0 transform-[translateY(12.875rem)]  h-18 cursor-pointer transition-[transform,width] duration-300 ease-in-out text-black
                before:content-[""] before:absolute before:opacity-0 before:top-0 before:left-6 before:w-78 before:h-full before:bg-white before:rounded-sm before:transition-opacity before:duration-200 before:ease-in-out pointer-events-none   
                ${isMenuOpen ? "w-90" : "w-full"}
                `}>
                    <div className='cursor-pointer text-gray-300 w-11 absolute left-15 top-9 h-auto text-2xl whitespace-nowrap transform-[translate3d(-50%,-50%,0)] transition-[colors, transform] duration-300'>
                        <House size={14}/>
                    </div>
                    <div className={`absolute w-53 left-28 top-9 pointer-events-none font-medium text-xl text-black
                         transition-[opacity,transform] duration-300 ease-in-out
                     ${isMenuOpen ? "transform-[translate3d(0,-50%,0)] opacity-100" : "transform-[translate3d(-1rem,-50%,0)] opacity-0"}   
                    `}>
                        Home
                    </div>
                </div>
                <div className={`absolute top-0 left-0 transform-[translateY(17.875rem)]  h-18 cursor-pointer transition-[transform,width] duration-300 ease-in-out text-black
                before:content-[""] before:absolute before:opacity-0 before:top-0 before:left-6 before:w-78 before:h-full before:bg-white before:rounded-sm before:transition-opacity before:duration-200 before:ease-in-out pointer-events-none   
                ${isMenuOpen ? "w-90" : "w-full"}
                `}>
                    <div className='cursor-pointer text-gray-300 w-11 absolute left-15 top-9 h-auto text-2xl whitespace-nowrap transform-[translate3d(-50%,-50%,0)] transition-[colors, transform] duration-300'>
                        <Newspaper size={14}/>
                    </div>
                    <div className={`absolute w-53 left-28 top-9 pointer-events-none font-medium text-xl text-black
                         transition-[opacity,transform] duration-300 ease-in-out
                     ${isMenuOpen ? "transform-[translate3d(0,-50%,0)] opacity-100" : "transform-[translate3d(-1rem,-50%,0)] opacity-0"}   
                    `}>
                        News
                    </div>
                </div>
                <div className={`absolute top-0 left-0 transform-[translateY(22.875rem)]  h-18 cursor-pointer transition-[transform,width] duration-300 ease-in-out text-black
                before:content-[""] before:absolute before:opacity-0 before:top-0 before:left-6 before:w-78 before:h-full before:bg-white before:rounded-sm before:transition-opacity before:duration-200 before:ease-in-out pointer-events-none   
                ${isMenuOpen ? "w-90" : "w-full"}
                `}>
                    <div className='cursor-pointer text-gray-300 w-11 absolute left-15 top-9 h-auto text-2xl whitespace-nowrap transform-[translate3d(-50%,-50%,0)] transition-[colors, transform] duration-300'>
                        <Users size={14}/>
                    </div>
                    <div className={`absolute w-53 left-28 top-9 pointer-events-none font-medium text-xl text-black
                         transition-[opacity,transform] duration-300 ease-in-out
                     ${isMenuOpen ? "transform-[translate3d(0,-50%,0)] opacity-100" : "transform-[translate3d(-1rem,-50%,0)] opacity-0"}   
                    `}>
                        Drivers
                    </div>
                </div>
                <div className={`absolute top-0 left-0 transform-[translateY(27.875rem)]  h-18 cursor-pointer transition-[transform,width] duration-300 ease-in-out text-black
                before:content-[""] before:absolute before:opacity-0 before:top-0 before:left-6 before:w-78 before:h-full before:bg-white before:rounded-sm before:transition-opacity before:duration-200 before:ease-in-out pointer-events-none   
                ${isMenuOpen ? "w-90" : "w-full"}
                `}>
                    <div className='cursor-pointer text-gray-300 w-11 absolute left-15 top-9 h-auto text-2xl whitespace-nowrap transform-[translate3d(-50%,-50%,0)] transition-[colors, transform] duration-300'>
                        <Wrench size={14}/>
                    </div>
                    <div className={`absolute w-53 left-28 top-9 pointer-events-none font-medium text-xl text-black
                         transition-[opacity,transform] duration-300 ease-in-out
                     ${isMenuOpen ? "transform-[translate3d(0,-50%,0)] opacity-100" : "transform-[translate3d(-1rem,-50%,0)] opacity-0"}   
                    `}>
                        Teams
                    </div>
                </div>
                <div className={`absolute top-0 left-0 transform-[translateY(32.875rem)]  h-18 cursor-pointer transition-[transform,width] duration-300 ease-in-out text-black
                before:content-[""] before:absolute before:opacity-0 before:top-0 before:left-6 before:w-78 before:h-full before:bg-white before:rounded-sm before:transition-opacity before:duration-200 before:ease-in-out pointer-events-none   
                ${isMenuOpen ? "w-90" : "w-full"}
                `}>
                    <div className='cursor-pointer text-gray-300 w-11 absolute left-15 top-9 h-auto text-2xl whitespace-nowrap transform-[translate3d(-50%,-50%,0)] transition-[colors, transform] duration-300'>
                        <Calendar size={14}/>
                    </div>
                    <div className={`absolute w-53 left-28 top-9 pointer-events-none font-medium text-xl text-black
                         transition-[opacity,transform] duration-300 ease-in-out
                     ${isMenuOpen ? "transform-[translate3d(0,-50%,0)] opacity-100" : "transform-[translate3d(-1rem,-50%,0)] opacity-0"}   
                    `}>
                        Sessions
                    </div>
                </div>
                <div className={`absolute top-0 left-0 transform-[translateY(37.875rem)]  h-18 cursor-pointer transition-[transform,width] duration-300 ease-in-out text-black
                before:content-[""] before:absolute before:opacity-0 before:top-0 before:left-6 before:w-78 before:h-full before:bg-white before:rounded-sm before:transition-opacity before:duration-200 before:ease-in-out pointer-events-none   
                ${isMenuOpen ? "w-90" : "w-full"}
                `}>
                    <div className='cursor-pointer text-gray-300 w-11 absolute left-15 top-9 h-auto text-2xl whitespace-nowrap transform-[translate3d(-50%,-50%,0)] transition-[colors, transform] duration-300'>
                        <ChartNoAxesColumn size={14}/>
                    </div>
                    <div className={`absolute w-53 left-28 top-9 pointer-events-none font-medium text-xl text-black
                         transition-[opacity,transform] duration-300 ease-in-out
                     ${isMenuOpen ? "transform-[translate3d(0,-50%,0)] opacity-100" : "transform-[translate3d(-1rem,-50%,0)] opacity-0"}   
                    `}>
                        Results
                    </div>
                </div>
                <div className={`absolute top-0 left-0 transform-[translateY(42.875rem)]  h-18 cursor-pointer transition-[transform,width] duration-300 ease-in-out text-black
                before:content-[""] before:absolute before:opacity-0 before:top-0 before:left-6 before:w-78 before:h-full before:bg-white before:rounded-sm before:transition-opacity before:duration-200 before:ease-in-out pointer-events-none   
                ${isMenuOpen ? "w-90" : "w-full"}
                `}>
                    <div className='cursor-pointer text-gray-300 w-11 absolute left-15 top-9 h-auto text-2xl whitespace-nowrap transform-[translate3d(-50%,-50%,0)] transition-[colors, transform] duration-300'>
                        <AlignEndHorizontal size={14}/>
                    </div>
                    <div className={`absolute w-53 left-28 top-9 pointer-events-none font-medium text-xl text-black
                         transition-[opacity,transform] duration-300 ease-in-out
                     ${isMenuOpen ? "transform-[translate3d(0,-50%,0)] opacity-100" : "transform-[translate3d(-1rem,-50%,0)] opacity-0"}   
                    `}>
                        Analyze
                    </div>
                </div>
                <div className={`absolute top-0 left-0 transform-[translateY(47.875rem)] bg-gray-200 h-px transition-[transform,width] duration-300 ease-in-out
                ${isMenuOpen ? "w-72" : "w-full"}
                `}></div>
                <div className={`absolute top-0 left-0 transform-[translateY(48.875rem)]  h-18 cursor-pointer transition-[transform,width] duration-300 ease-in-out text-black
                before:content-[""] before:absolute before:opacity-0 before:top-0 before:left-6 before:w-78 before:h-full before:bg-white before:rounded-sm before:transition-opacity before:duration-200 before:ease-in-out pointer-events-none   
                ${isMenuOpen ? "w-90" : "w-full"}
                `}>
                    <div className='cursor-pointer text-gray-300 w-11 absolute left-15 top-9 h-auto text-2xl whitespace-nowrap transform-[translate3d(-50%,-50%,0)] transition-[colors, transform] duration-300'>
                        <UserCircle size={14}/>
                    </div>
                    <div className={`absolute w-53 left-28 top-9 pointer-events-none font-medium text-xl text-black
                         transition-[opacity,transform] duration-300 ease-in-out
                     ${isMenuOpen ? "transform-[translate3d(0,-50%,0)] opacity-100" : "transform-[translate3d(-1rem,-50%,0)] opacity-0"}   
                    `}>
                        Account
                    </div>
                </div>
                
                <div className='absolute w-200 px-14 bottom-[calc(50%-43.8125rem)] left-[calc(50%-25rem)] flex gap-0 justify-between box-border items-center'>

                </div>
                <div className={`absolute flex justify-center items-center cursor-pointer bottom-8 right-15 w-10 h-auto z-70 text-black duration-300 ease-in-out
                    ${isMenuOpen ? "transform-[translate3d(calc(15rem-50%),0,0)]" : "transform-[translate3d(calc(35%),0,0)]"}
                    `} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? (<ChevronLeft size={15} />) : (<ChevronRight size={15} />)}
                </div>
            </div>
            
        </div>

        
    )
}

export default PCNavbar;