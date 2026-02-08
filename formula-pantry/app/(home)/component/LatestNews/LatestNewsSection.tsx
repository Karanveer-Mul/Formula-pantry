import { CircleArrowLeft, CircleArrowRight } from "lucide-react";
import LatestNewsCarousel from "./LatestNewsCarousel";

export default function LatestNewsSection() {
  return (
    <div className="scroll-mt-36 lg:scroll-m-0 text-black bg-white">
        <div className="relative w-full h-screen box-border overflow-hidden">
          <div className="flex w-full h-full justify-center">
            <div className="w-4/5 relative items-start flex flex-col justify-center">
              <div className="flex flex-col items-start w-full lg:w-1/6">
                <div className="flex flex-col items-center">
                  <div className="flex items-center w-36 h-5">
                    <div className="w-64 h-px border-4 border-gray-300"></div>
                    <div className="w-px h-px border-4 border-black"></div>
                  </div>
                  <div className="flex items-center w-36 h-5">
                    <div className="w-64 h-px border-4 border-gray-300"></div>
                    <div className="w-px h-px border-4 border-white"></div>
                  </div>
                </div>
                <span className="font-sans text-[3rem] lg:text-[4rem] font-bold">News</span>
              </div>              
              <div className="flex w-full mt-48 items-center justify-start lg:h-4/5">
                <LatestNewsCarousel />
                
              </div>                               
            </div>
          </div>
        </div>
    </div>
  );
}