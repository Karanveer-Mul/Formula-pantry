import { LongCheckeredFlag } from "./LongCheckeredFlag";

export default function SectionContainer (props: { title: string, children: React.ReactNode }) {
    const { title, children } = props;
    return (
        <div className="scroll-mt-36 lg:scroll-m-0 text-black bg-white">
        <div className="relative w-full h-screen box-border overflow-y-scroll">
          <div className="flex w-full h-full justify-center">
            <div className="w-4/5 relative items-start flex flex-col justify-start">
              <div className="flex flex-col items-start w-full mt-8">
                <LongCheckeredFlag />
                <span className="text-6xl mt-2 font-harmony font-bold text-nowrap ">{title}</span>
              </div>     
              {children}         
            </div>
          </div>
        </div>
    </div>
    )
}
