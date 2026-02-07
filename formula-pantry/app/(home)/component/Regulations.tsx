import { CircleArrowLeft, CircleArrowRight } from "lucide-react";
import Image from "next/image";

export default function Regulations() {
  return (
    <div className="scroll-mt-36 lg:scroll-m-0 text-white bg-dark-main-gradient">
        <div className="relative w-full h-screen box-border overflow-hidden">
          <div className="flex w-full h-full justify-center">
            <div className="w-4/5 relative items-center flex flex-col lg:flex-row justify-baseline">
              <div className="flex flex-col items-start w-full lg:w-1/6 lg:h-full mt-24 lg:mt-112">
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
                <span className="font-sans text-[3rem] lg:text-[4rem] font-bold">REGULATIONS</span>
              </div>              
              <div className="flex flex-col mt-48 lg:mt-256 lg:flex-row items-start justify-center lg:h-full">
                <div className="w-full lg:w-1/2 justify-center flex items-center">
                  <Image loading="lazy" src="https://picsum.photos/300" alt="Sector Talks Logo" width={300} height={300} />                                 
                </div>
                <div className="w-full lg:w-1/2 flex flex-col justify-center items-start mt-12">
                  <span className="font-gilroy font-medium text-3xl">2026 FORMULA ONE WORLD CHAMPIONSHIP</span>
                  <span className="text-[8rem] font-gilroy font-light tracking-tighter leading-36">FRONT WING</span>
                  <p className="font-harmony font-normal text-4xl">The front wing becomes narrower, reducing its overall aerodynamic influence on the airflow directed toward following cars. However, the outer sections remain open for development, ensuring teams can still extract performance gains. Despite its reduced size, the front wing continues to play a decisive role in overall car balance.</p>  
                  <div className="flex w-full justify-between items-center mt-36">
                    <div className="flex w-2/3 flex-col items-end">
                      <span className="font-gilroy font-light text-3xl text-[#FFFB00]">3/6</span>
                      <div className="flex w-full justify-center items-center gap-x-4">
                        <span className="border-white border-b-4 w-1/6 h-2"></span>
                        <span className="border-white border-b-4 w-1/6 h-2"></span>
                        <span className="border-[#FFFB00] border-b-4 w-1/6 h-2"></span>
                        <span className="border-white border-b-4 w-1/6 h-2"></span>
                        <span className="border-white border-b-4 w-1/6 h-2"></span>
                        <span className="border-white border-b-4 w-1/6 h-2"></span>
                      </div>
                    </div>
                    <div className="flex justify-center items-center gap-x-8">
                      <CircleArrowLeft size={32} /> <CircleArrowRight size={32} />
                    </div>
                  </div>
                </div> 
              </div>                               
            </div>
          </div>
        </div>
    </div>
  );
}