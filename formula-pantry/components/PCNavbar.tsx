'use client';

import Link from 'next/link';
import { House, Newspaper, Users, Shield , ChartNoAxesColumn, AlignEndHorizontal, MoreVertical, UserCircle, Calendar, CircleChevronRight, CircleChevronLeft, Menu} from 'lucide-react';
import { useContext, useState } from 'react';
import { createContext } from 'react';

const sideBarContext = createContext()

export const NavbarStructure = ({children}) => {
    const [isExpanded, setIsExpanded] = useState(false); 
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    return (
        <aside className='hidden sticky top-0 lg:h-screen'>
            <nav className='hidden bg-white h-full lg:flex flex-col border-r border-r-gray-300 shadow-sm' onMouseEnter={() => setIsExpanded(true)} onMouseLeave={() => setIsExpanded(false)} >
                <div className='p-4 pb-2 h-10 mt-2 mb-4 ml-2 flex justify-between items-center relative overflow-visible'> 
                    <p className={`absolute top-0 left-0 text-black pb-4 overflow-hidden transition-all  duration-300 ease-in-out ${ isExpanded ? "font-bold text-lg leading-4" : "font-medium text-xs leading-3"}`}>
                        Sector<br/>Talks
                    </p>
                    <button onClick={() => setIsExpanded(!isExpanded) } className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 p-1.5 cursor-pointer z-100'>
                        { isExpanded ? <CircleChevronLeft size={18} /> : <CircleChevronRight size={18} /> }
                    </button>
                </div>
                
                <sideBarContext.Provider value={{isExpanded}}>
                    <ul className='flex-1 px-3'>
                        {children}
                    </ul>
               </sideBarContext.Provider>
                
                <div className='flex p-3 border-t border-t-gray-300 items-center justify-center'>
                    <div className={`py-2 ${ isExpanded ? "pl-2" : "px-2"}`}><UserCircle size={24} /></div>
                    <div className={`flex justify-between items-center overflow-hidden transition-all  duration-300 ease-in-out
                    ${ isExpanded ? "w-44 ml-2" : "w-0"}`}>
                        <div className='leading-4'>
                            <h4 className='font-normal from-'>John Doe</h4>
                            <span className='text-xs text-gray-600'>johndoe@gmail.com</span>
                        </div>
                    </div>
                    <div className={`${ isExpanded ? "" : "hidden"}`}>
                        <MoreVertical size={20} />
                    </div>
                </div>
            </nav>

        </aside>
    )
}


export const NavbarItem = ({icon, text, active, alert}) => {
    const { isExpanded } = useContext(sideBarContext);
    return (
        <li className={`
            relative flex items-start py-2 px-3 my-1
            font-medium cursor-pointer
            transition-colors
            ${
                active ? 'bg-gradient-to-tr from-gray-200 to-gray-100 text-gray-800'
                : 'hover:bg-gray-50 text-gray-400'
            }
        
        `}>
            {icon}
            <span className={`overflow-hidden transition-all  duration-300 ease-in-out ${isExpanded ? 'w-44 ml-2' : 'w-0'}`}>{text}</span>
            {alert && (<div className={`absolute right-2 w-2 h-2 rounded bg-red-400
                ${ isExpanded ? '' : 'top-2'}
                `} />)}
        </li>
    )
}

const PCNavbar = () => {
        return (
            <NavbarStructure>
                <NavbarItem icon={<House size={24}/>} text="Home" active={true} />
                <NavbarItem icon={<Newspaper size={24}/>} text="News" />
                <NavbarItem icon={<Users size={24} />} text="Drivers" />
                <NavbarItem icon={<Shield size={24} />} text="Teams" />
                <NavbarItem icon={<Calendar size={24} />} text="Sessions" alert={true} />
                <NavbarItem icon={<ChartNoAxesColumn size={24} />} text="Results" />
                <NavbarItem icon={<AlignEndHorizontal size={24} />} text="Analyze" />
            </NavbarStructure>
        )
}

export default PCNavbar;