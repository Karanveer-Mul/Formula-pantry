import { CircleArrowLeft, CircleArrowRight, MoveRight, MoveUpRight } from "lucide-react";
import Image from "next/image";
import RegulationsCarousel from "./RegulationsCarousel";
import Link from "next/link";

export default function Regulations() {
  return (
    <div className="scroll-mt-36 lg:scroll-m-0 text-white bg-dark-main-gradient">
        <div className="relative w-full h-screen box-border overflow-hidden">
          <div className="flex w-full h-full justify-center">
            <div className="w-4/5 items-start justify-center flex flex-col">
              <div className="z-10 flex flex-col items-start w-full lg:w-fit mt-24">
                <div className="flex flex-col items-center">
                  <div className="flex items-center w-36 h-5">
                    <div className="w-64 h-px border-4 border-white"></div>
                    <div className="w-px h-px border-4 border-black"></div>
                  </div>
                  <div className="flex items-center w-36 h-5">
                    <div className="w-64 h-px border-4 border-white"></div>
                    <div className="w-px h-px border-4 border-white"></div>
                  </div>
                </div>
                <span className="font-harmony text-[3rem] lg:text-[4rem] font-bold leading-18">TECHNICAL REGULATIONS <br />2026 FIA FORMULA ONE WORLD CHAMPIONSHIP</span>
              </div>
              <div className="z-10 flex flex-col w-full lg:w-7xl font-harmony font-bold text-3xl mt-8">
                Formula 1's 2026 regulations mark one of the most comprehensive resets in the sport's history, redefining aerodynamics, power units, car dimensions, and racecraft.
                <Link href="/regulationss" className="gap-1 mt-10 w-fit border-offset-1 border-b-2 border-white">
                  Read More <MoveUpRight className="inline" size={8}></MoveUpRight>
                </Link>    
              </div>                
              <div className="z-10 flex flex-col w-full h-2/3 lg:h-1/3 mt-20 justify-around lg:flex-row gap-y-1">
                <div className="flex flex-row lg:flex-col items-center justify-center lg:w-lg">
                  <Image className="" src='/regulations/floor.webp' alt="simplified rear wing" width={160} height={90} />
                  <div className="flex flex-col items-start h-full lg:h-auto lg:items-center w-full ml-8 lg:ml-0 lg:mt-4">
                    <span className="text-4xl font-harmony font-bold">FLOOR</span>
                    <p className="font-harmony font-normal text-3xl mt-2 lg:text-center">Cleaner floors reduce turbulent airflow to improve following cars.</p>  
                  </div>
                </div>
                <div className="flex flex-row lg:flex-col items-center justify-center lg:w-lg">
                  <Image className="" src='/regulations/boost.webp' alt="simplified rear wing" width={160} height={90} />
                  <div className="flex flex-col items-start h-full lg:h-auto lg:items-center w-full ml-8 lg:ml-0 lg:mt-4">
                    <span className="text-4xl font-harmony font-bold">DRIVE MODES</span>
                    <p className="font-harmony font-normal text-3xl mt-2 lg:text-center">New power modes replaces DRS for closer racing battles.</p>  
                  </div>
                </div>
                <div className="flex flex-row lg:flex-col items-center justify-center lg:w-lg">
                  <Image className="" src='/regulations/active-aero.webp' alt="simplified rear wing" width={160} height={90} />
                  <div className="flex flex-col items-start h-full lg:h-auto lg:items-center w-full ml-8 lg:ml-0 lg:mt-4">
                    <span className="text-4xl font-harmony font-bold">ACTIVE AERO</span>
                    <p className="font-harmony font-normal text-3xl mt-2 lg:text-center">Wings adapt in real time to balance corner grip and straight-line speed.</p>  
                  </div>
                </div>
                <div className="flex flex-row lg:flex-col items-center justify-center lg:w-lg">
                  <Image className="" src='/regulations/size_weight.webp' alt="simplified rear wing" width={160} height={90} />
                  <div className="flex flex-col items-start h-full lg:h-auto lg:items-center w-full ml-8 lg:ml-0 lg:mt-4">
                    <span className="text-4xl font-harmony font-bold">SIZE & WEIGHT</span>
                    <p className="font-harmony font-normal text-3xl mt-2 lg:text-center">Cars are shorter, narrower, and 30 kg lighter than before.</p>  
                  </div>
                </div>
                <div className="flex flex-row lg:flex-col items-center justify-center lg:w-lg">
                  <Image className="" src='/regulations/power_unit.webp' alt="simplified rear wing" width={160} height={90} />
                  <div className="flex flex-col items-start h-full lg:h-auto lg:items-center w-full ml-8 lg:ml-0 lg:mt-4">
                    <span className="text-4xl font-harmony font-bold">POWER UNIT</span>
                    <p className="font-harmony font-normal text-3xl mt-2 lg:text-center"> 50-50 split between Turbo Hybrid V6 & electric power.</p>  
                  </div>
                </div>                
              </div>                             
            </div>
          </div>
          <div className='z-5 rotate-90 text-[11rem] lg:text-[18rem] lg:rotate-0 absolute top-3/5 lg:top-1/5 left-1/3 lg:left-1/2 font-novecento font-bold -tracking-widest hollow-text-full'>
            //SECTORTALKS
          </div>  
        </div>
    </div>
  );
}