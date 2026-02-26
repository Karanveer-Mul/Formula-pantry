import { LongCheckeredFlag } from "./LongCheckeredFlag";

export default function SectionContainer (props: { title: React.ReactNode, scrollable?: boolean, bg?: string, color?: string, children: React.ReactNode }) {
    const { title, scrollable = true, bg, color, children } = props;
    return (
        <div className={`scroll-mt-36 lg:scroll-m-0 ${color === undefined ? "text-black" : color } ${bg === undefined ? "bg-white" : bg }`}>
        <div className={`relative w-full h-screen box-border ${scrollable && "overflow-y-scroll"}`}>
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
