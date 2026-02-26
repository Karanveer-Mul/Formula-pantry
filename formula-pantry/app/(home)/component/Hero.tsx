import { MoveRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import MiniHeader from "./MiniHeader/MiniHeader";
import { LongCheckeredFlag } from "@/app/components/shared/LongCheckeredFlag";

export default function Hero() {
  return (
    <div className="scroll-mt-36 lg:scroll-m-0">
        <div className="relative w-full h-screen box-border overflow-hidden">
          <div className="flex w-full h-full justify-center items-center">
            <div className="w-full lg:w-4/5 relative justify-center items-center lg:items-start flex flex-col text-center lg:text-left">
              <div className="z-10 flex items-start justify-center lg:justify-start w-4/5">
                <Image loading="eager" src="/logo.svg" alt="Sector Talks Logo" width={180} height={90} />                                
              </div>
              <div className="z-10 flex flex-col items-center lg:items-start">
                <LongCheckeredFlag />
                <div className="bg-white mt-4 text-7xl lg:text-8xl font-harmony font-bold tracking-tight text-balance text-gray-900 ">
                  THEIR LAP. YOUR ANALYSIS.
                </div>
                <div className="text-3xl font-gilroy font-light tracking-tight text-gray-400">
                  Version 0.0.1
                </div>
                <Link href="/sessions" className="">
                  <div className="text-nowrap w-fit mt-10 z-10 bg-white rounded-full outline-2 outline-white border border-gray-300 px-16 py-4 font-harmony text-2xl font-bold text-black shadow-sm hover:border-gray-500">
                    View Events
                  </div>
                </Link>
              </div>              
              <div className="z-10 mt-10 w-150 h-auto rounded-2xl font-harmony text-4xl lg:text-4xl font-bold text-black">
                <MiniHeader />
              </div>
              
            </div>
          </div>
        </div>
      </div>
  );
}