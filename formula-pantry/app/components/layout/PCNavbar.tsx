"use client";

import {
  House,
  Newspaper,
  Users,
  ChartNoAxesColumn,
  AlignEndHorizontal,
  UserCircle,
  Calendar,
  ChevronRight,
  Wrench,
  ChevronLeft,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const PCNavbar = () => {
    const pathname = usePathname();

  const navbarItemLabelExpanded = "transform-[translate3d(0,-50%,0)] opacity-100";
  const navbarItemLabelTruncataed = "transform-[translate3d(-1rem,-50%,0)] opacity-0";

  const iconMap: { [key: string]: React.ReactNode } = {
    House: <House size={14} />,
    Newspaper: <Newspaper size={14} />,
    Users: <Users size={14} />,
    Wrench: <Wrench size={14} />,
    Calendar: <Calendar size={14} />,
    ChartNoAxesColumn: <ChartNoAxesColumn size={14} />,
    AlignEndHorizontal: <AlignEndHorizontal size={14} />,
  };

  const navbarItems = [['Home', 'House'], ['News', 'Newspaper'], ['Drivers', 'Users'], ['Teams', 'Wrench'], ['Sessions', 'Calendar'], ['Results', 'ChartNoAxesColumn'], ['Analyze', 'AlignEndHorizontal']]

  const getActiveMenuItemIndex = () => {
    if (!pathname) return 0;

    if (pathname === "/") return 0;
    if (pathname.includes("account")) return 7;

    const routeSegment = pathname.split("/")[1]?.toLowerCase();
    const itemIndex = navbarItems.findIndex(
      (item) => item[0].toLowerCase() === routeSegment
    );

    return itemIndex !== -1 ? itemIndex : 0;
};

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState(getActiveMenuItemIndex());

  return (
    <div
      className={`hidden sticky shrink-0 top-0 lg:flex h-screen w-30 z-50 text-black bg-white
        before:content-[""] before:absolute before:top-0 before:right-0 before:w-[calc(100%+16rem)] before:h-full before:bg-white before:shadow-md before:transition-[transform] before:duration-300 before:ease-in-out   
         ${isMenuOpen ? "before:transform-[translate3d(15rem,0,0)]" : " "}`}
      onMouseEnter={() => setIsMenuOpen(true)}
      onMouseLeave={() => setIsMenuOpen(false)}
    >
      <div
        className={`relative h-full w-30 z-50 text-black bg-white
                
            `}
      >
        <Link href="/">
          <Image
            loading="eager"
            className={`${isMenuOpen ? "transform-[translate3d(calc(-50%+.5rem),0,0)_scale(1.5)]" : "transform-[translate3d(-50%,0,0)]"} 
                    w-26 h-auto
                    absolute left-[50%] top-6 origin-top-left text-black z-70 transition-[transform] duration-300 ease-in-out`}
            src="/logo.svg"
            alt="Sector Talks Logo"
            width={60}
            height={30}
          />
        </Link>

        {/* highlight bar that moves to the active item */}
        <div
          key="navbar-item-selected"
          className={`navbar-item-selected ${isMenuOpen ? "w-[calc(100%+13.5rem)]" : "w-[calc(100%-1rem)]"}`}
          style={{
                transform: `translateY(${12.625 + activeMenuItem * 5 + (activeMenuItem == 7 ? 1 : 0)}rem)`
            }}
        ></div>

        { navbarItems.map((item, index) => (
            <Link
                key={index}
                href={`/${index == 0 ? '' : item[0].toLowerCase()}`}
                onClick={() => setActiveMenuItem(index)}
                className={`navbar-item ${isMenuOpen ? "w-90" : "w-full" } ${activeMenuItem == index ? 'text-black' : 'text-gray-300'}`} 
                style={{
                    transform: `translateY(${12.625 + index * 5 + (index == 7 ? 1 : 0)}rem)`
                }}
            >
                <div className="navbar-item-icon">
                    {iconMap[item[1]]}
                </div>
                <div
                    className={`navbar-item-label ${isMenuOpen ? navbarItemLabelExpanded : navbarItemLabelTruncataed}`}
                >
                    {item[0]}
                </div>
            </Link>
        ))}        
        <div
            className={`absolute top-0 left-0 transform-[translateY(47.875rem)] bg-gray-200 h-px transition-[transform,width] duration-300 ease-in-out
                ${isMenuOpen ? "w-72" : "w-full"}
                `}
        ></div>
        <Link
            href='account'
            onClick={() => setActiveMenuItem(7)}
            className={`navbar-item ${isMenuOpen ? "w-90" : "w-full" } ${activeMenuItem == 7 ? 'text-black' : 'text-gray-300'}`} 
            style={{
                transform: `translateY(${12.625 + 7 * 5 + 1}rem)`
            }}
        >
            <div className="navbar-item-icon">
                <UserCircle size={14} />
            </div>
            <div
                className={`navbar-item-label ${isMenuOpen ? navbarItemLabelExpanded : navbarItemLabelTruncataed}`}
            >
                Account
            </div>
        </Link>

        <div className="absolute w-200 px-14 bottom-[calc(50%-43.8125rem)] left-[calc(50%-25rem)] flex gap-0 justify-between box-border items-center"></div>
        <div
          className={`absolute flex justify-center items-center cursor-pointer bottom-8 right-15 w-10 h-auto z-70 text-black duration-300 ease-in-out
                    ${isMenuOpen ? "transform-[translate3d(calc(15rem-50%),0,0)]" : "transform-[translate3d(calc(35%),0,0)]"}
                    `}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <ChevronLeft size={15} /> : <ChevronRight size={15} />}
        </div>
      </div>
    </div>
  );
};

export default PCNavbar;
