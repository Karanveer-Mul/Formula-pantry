'use client';

import Link from 'next/link';
import { House, Newspaper, Users, Shield , ChartNoAxesColumn, AlignEndHorizontal, MoreVertical, UserCircle, Calendar, ChevronRight, CircleChevronLeft, Menu, X, Wrench} from 'lucide-react';
import { useContext, useState } from 'react';
import Image from 'next/image';


export const MobileNavbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    return (
        <div className='lg:hidden sticky shrink-0 top-0 flex w-full h-40 z-50 text-black bg-white items-center shadow-sm'>                
            <Image className={`${isMobileMenuOpen ? "transform-[translate3d(calc(50vw-25rem),7.125rem,0)_scale(1)]" : "transform-[translate3d(3.0625rem,2.25rem,0)_scale(.568)]"} 
                w-72 h-auto
                absolute left-0 top-0 origin-top-left text-black z-70 transition-[transform] duration-300 ease-in-out`}
                src="/logo.svg" alt="Sector Talks Logo" width={60} height={30} >
                
            </Image>
            <div className='opacity-100 absolute right-14 w-10 h-auto z-70 text-black' onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? (<X size={15} />) : (<Menu size={15} />)}
            </div>
            
            <div className={`${isMobileMenuOpen ? "transform-[translateZ(0)]" : "transform-[translate3d(-105%,0,0)]"}
                fixed overflow-hidden top-0 left-0 w-screen h-screen bg-white z-60 transition-[transform] duration-300 ease-in-out`}>
                <div className='absolute w-200 top-[calc(50%-34.375rem)] left-[calc(50%-25rem)] flex items-center'>
                    <div className='relative h-16 rounded-sm pr-3 pl-7 bg-gray-100 flex items-center'>
                        <div className='text-black text-3xl pt-1'>Account</div>
                        <div className='relative flex justify-center items-center w-10 h-10 ml-5 text-gray-400 bg-white rounded-full'>
                            <ChevronRight size={12} />
                        </div>
                    </div> 
                </div>
                <div className='absolute w-200 top-[calc(50%-28.5rem)] left-[calc(50%-25rem)] flex flex-col gap-5 box-border items-center'>
                    <div className='relative w-full h-28 pl-36 flex items-center bg-gray-100 rounded-sm overflow-hidden transition-colors duration-300 cursor-pointer'>
                        <div className='absolute left-20 top-[50%] w-12 h-auto transform-[translate3d(-50%,-50%,0)] text-gray-300 transition-colors duration-300'><House size={24}/></div>
                        <div className='relative w-0.5 h-20 bg-gray-200 transition-colors duration-300' />
                        <div className='ml-10 text-4xl pt-[0.14em] leading-none text-black transition-colors duration-300'>Home</div>
                        <div className='absolute w-auto h-5 right-6 text-gray-500 transition-colors duration-300'><ChevronRight size={12} /></div>
                    </div>
                    <div className='relative w-full h-28 pl-36 flex items-center bg-gray-100 rounded-sm overflow-hidden transition-colors duration-300 cursor-pointer'>
                        <div className='absolute left-20 top-[50%] w-12 h-auto transform-[translate3d(-50%,-50%,0)] text-gray-300 transition-colors duration-300'><Newspaper size={24}/></div>
                        <div className='relative w-0.5 h-20 bg-gray-200 transition-colors duration-300' />
                        <div className='ml-10 text-4xl pt-[0.14em] leading-none text-black transition-colors duration-300'>News</div>
                        <div className='absolute w-auto h-5 right-6 text-gray-500 transition-colors duration-300'><ChevronRight size={12} /></div>
                    </div>
                    <div className='relative w-full h-28 pl-36 flex items-center bg-gray-100 rounded-sm overflow-hidden transition-colors duration-300 cursor-pointer'>
                        <div className='absolute left-20 top-[50%] w-12 h-auto transform-[translate3d(-50%,-50%,0)] text-gray-300 transition-colors duration-300'><Users size={24}/></div>
                        <div className='relative w-0.5 h-20 bg-gray-200 transition-colors duration-300' />
                        <div className='ml-10 text-4xl pt-[0.14em] leading-none text-black transition-colors duration-300'>Drivers</div>
                        <div className='absolute w-auto h-5 right-6 text-gray-500 transition-colors duration-300'><ChevronRight size={12} /></div>
                    </div>
                    <div className='relative w-full h-28 pl-36 flex items-center bg-gray-100 rounded-sm overflow-hidden transition-colors duration-300 cursor-pointer'>
                        <div className='absolute left-20 top-[50%] w-12 h-auto transform-[translate3d(-50%,-50%,0)] text-gray-300 transition-colors duration-300'><Wrench size={24}/></div>
                        <div className='relative w-0.5 h-20 bg-gray-200 transition-colors duration-300' />
                        <div className='ml-10 text-4xl pt-[0.14em] leading-none text-black transition-colors duration-300'>Teams</div>
                        <div className='absolute w-auto h-5 right-6 text-gray-500 transition-colors duration-300'><ChevronRight size={12} /></div>
                    </div>
                    <div className='relative w-full h-28 pl-36 flex items-center bg-gray-100 rounded-sm overflow-hidden transition-colors duration-300 cursor-pointer'>
                        <div className='absolute left-20 top-[50%] w-12 h-auto transform-[translate3d(-50%,-50%,0)] text-gray-300 transition-colors duration-300'><Calendar size={24}/></div>
                        <div className='relative w-0.5 h-20 bg-gray-200 transition-colors duration-300' />
                        <div className='ml-10 text-4xl pt-[0.14em] leading-none text-black transition-colors duration-300'>Sessions</div>
                        <div className='absolute w-auto h-5 right-6 text-gray-500 transition-colors duration-300'><ChevronRight size={12} /></div>
                    </div>
                    <div className='relative w-full h-28 pl-36 flex items-center bg-gray-100 rounded-sm overflow-hidden transition-colors duration-300 cursor-pointer'>
                        <div className='absolute left-20 top-[50%] w-12 h-auto transform-[translate3d(-50%,-50%,0)] text-gray-300 transition-colors duration-300'><ChartNoAxesColumn size={24}/></div>
                        <div className='relative w-0.5 h-20 bg-gray-200 transition-colors duration-300' />
                        <div className='ml-10 text-4xl pt-[0.14em] leading-none text-black transition-colors duration-300'>Results</div>
                        <div className='absolute w-auto h-5 right-6 text-gray-500 transition-colors duration-300'><ChevronRight size={12} /></div>
                    </div>
                    <div className='relative w-full h-28 pl-36 flex items-center bg-gray-100 rounded-sm overflow-hidden transition-colors duration-300 cursor-pointer'>
                        <div className='absolute left-20 top-[50%] w-12 h-auto transform-[translate3d(-50%,-50%,0)] text-gray-300 transition-colors duration-300'><AlignEndHorizontal size={24}/></div>
                        <div className='relative w-0.5 h-20 bg-gray-200 transition-colors duration-300' />
                        <div className='ml-10 text-4xl pt-[0.14em] leading-none text-black transition-colors duration-300'>Analyze</div>
                        <div className='absolute w-auto h-5 right-6 text-gray-500 transition-colors duration-300'><ChevronRight size={12} /></div>
                    </div>
                </div>
                <div className='absolute w-200 px-14 bottom-[calc(50%-43.8125rem)] left-[calc(50%-25rem)] flex gap-0 justify-between box-border items-center'>

                </div>
                <div className='absolute -bottom-10 left-[50%] transform-[translateX(-50%)] text-[25rem] -tracking-widest hollow-text'>
                    SECTORTALKS
                </div>
            </div>
            
        </div>

        
    )
}

export default MobileNavbar;