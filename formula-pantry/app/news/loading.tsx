import SectionContainer from "../components/shared/section";
import SectionSubItem from "../components/shared/sectionSubItem";
import Link from "next/link";

export default function LoadingNews() {

  return (
    <div className="w-full overflow-hidden">
      <SectionContainer title="News">
        <SectionSubItem>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24 w-full">
              {[...Array(12)].map((_, idx) => (
                <Link 
                  href="/news"
                  key={idx}
                  className="bg-linear-to-t from-black/1 to-transparent duration-300 ease-in-out transition-shadow hover:shadow-lg flex flex-col items-start animate-pulse"
                >
                  {/* image skeleton */}
                  <div className="h-80 bg-gray-200 w-full rounded" />

                  <div className="h-fit w-full mt-4 flex flex-col">
                    <div className="h-8 bg-gray-200 rounded w-full mb-2"/>
                    <div className="h-6 bg-gray-200 rounded w-1/3 mb-2" />
                    <div className="h-8 bg-gray-200 rounded w-full mb-2" >
                    </div>
                  </div>                  
                </Link>
              ))}
          </div>
        </SectionSubItem>
      </SectionContainer>
    </div>
  );
}