import { CircleArrowLeft, CircleArrowRight, MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Home = () => {
  return (
    <div className="w-full overflow-hidden lg:text-[8px]">
      <div className="scroll-mt-36 lg:scroll-m-0">
        <div className="relative w-full h-screen box-border overflow-hidden">
          <div className="flex w-full h-full justify-center items-center">
            <div className="w-full lg:w-4/5 relative justify-center items-center lg:items-start flex flex-col text-center lg:text-left">
              <div className="z-10 flex items-start w-4/5">
                <Image loading="eager" src="/logo.svg" alt="Sector Talks Logo" width={180} height={90} />                                
              </div>
              <div className="pt-10 pb-30 lg:pt-30 lg:pb-60 z-10">
                <div className="bg-white p-4 text-7xl lg:text-8xl font-harmony font-bold tracking-tight text-balance text-gray-900 ">
                  THEIR LAP. YOUR ANALYSIS.
                </div>
                <span className="my-4 mx-2 text-5xl lg:text-5xl font-gilroy font-light tracking-tight text-gray-100 sm:text-xl/8">
                  ver. 0.0.1
                </span>
              </div>
              <div className="z-10 mb-200 bg-[#FFFA00] px-16 py-8 font-harmony text-4xl lg:text-4xl font-bold text-black shadow-xs hover:bg-[#F6F200] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[white]">
                <Link href="/" className="flex justify-center items-center gap-4">
                  Explore <MoveRight size={16}></MoveRight>
                </Link>
              </div>
              <div className="pt-50 text-center text-white absolute bg-[linear-gradient(180deg,#1E00FF,#1E00FF_40%,rgba(255,250,0,0)_85%)] w-full top-5/12 left-1/2 font-novecento font-bold transform-[translate(-50%,-50%)] text-[25rem] -tracking-widest">
                <span className="opacity-80">MUSTBETHE</span>
              </div>
              <div className='z-5 absolute rotate-180 top-3/5 left-1/2 font-novecento font-bold transform-[translateX(50%)] text-[25rem] -tracking-widest hollow-text h-100'>
                WATER
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-mt-36 lg:scroll-m-0 text-white bg-dark-main-gradient">
        <div className="relative w-full h-screen box-border overflow-hidden">
          <div className="flex w-full h-full justify-center">
            <div className="w-4/5 relative items-center flex flex-col lg:flex-row justify-baseline">
              <div className="flex flex-col items-start w-full lg:w-1/6 lg:h-full mt-24 lg:mt-112">
                <div className="flex flex-col items-center">
                  <div className="flex items-center w-36 h-5">
                    <div className="w-px h-px border-4 border-white"></div>
                    <div className="w-px h-px border-4 border-black"></div>
                    <div className="w-px h-px border-4 border-white"></div>
                    <div className="w-px h-px border-4 border-black"></div>
                    <div className="w-px h-px border-4 border-white"></div>
                    <div className="w-px h-px border-4 border-black"></div>
                    <div className="w-px h-px border-4 border-white"></div>
                    <div className="w-px h-px border-4 border-black"></div>
                  </div>
                  <div className="flex items-center w-36 h-5">
                    <div className="w-px h-px border-4 border-black"></div>
                    <div className="w-px h-px border-4 border-white"></div>
                    <div className="w-px h-px border-4 border-black"></div>
                    <div className="w-px h-px border-4 border-white"></div>
                    <div className="w-px h-px border-4 border-black"></div>
                    <div className="w-px h-px border-4 border-white"></div>
                    <div className="w-px h-px border-4 border-black"></div>
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
      <div className="scroll-mt-36 lg:scroll-m-0 text-black">
        <div className="relative w-full h-screen box-border overflow-hidden">
          <div className="flex w-full h-full justify-center">
            <div className="w-4/5 relative items-start flex flex-col lg:flex-row mt-6">
              <div className="flex flex-col h-3/5  justify-between items- w-full lg:w-1/2">
                <span className="font-sans text-[3rem] font-bold ">News</span>
                <div>
                  <span className="text-[8rem] font-gilroy font-light tracking-tight ">Title 1</span>
                  <p className="font-harmony font-normal text-2xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                  <div className="mt-2">
                    <Link href="/" className="w-fit px-8 py-4 outline-1 flex justify-center items-center gap-4">
                      Read More <MoveRight size={8}></MoveRight>
                    </Link>
                  </div>
                  
                </div>                                
              </div>
              <div className="w-full lg:w-1/2 ">
                Images                                
              </div>
              
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
