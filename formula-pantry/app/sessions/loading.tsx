import SectionContainer from "../components/shared/section";
import SectionSubItem from "../components/shared/sectionSubItem";

export default function LoadingSessions() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full overflow-hidden">
      <SectionContainer title={`${currentYear} Session Calendar`}>
        <SectionSubItem>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24 w-full">
              {[...Array(10)].map((_, idx) => (
                <div
                  key={idx}
                  className="p-8 border-gray-300 bg-linear-to-t from-black/1 to-transparent border duration-300 ease-in-out shadow-sm transition-shadow hover:shadow-lg flex flex-col items-start rounded-xl animate-pulse"
                >
                  {/* image skeleton */}
                  <div className="h-69 bg-gray-200 w-full rounded" />

                  <div className="h-fit w-full mt-4 flex flex-col">
                    {/* title */}
                    <div className="h-8 bg-gray-200 rounded w-1/2 mb-2" />
                    {/* location */}
                    <div className="h-6 bg-gray-200 rounded w-1/3 mb-2" />

                    {/* dates & badges */}
                    <div className="mt-4 flex flex-col w-full">
                      <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
                      <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
                      <div className="h-6 bg-gray-200 rounded w-1/4" />
                    </div>

                    {/* stats */}
                    <div className="mt-4 flex flex-col w-full border-t border-gray-300">
                      <div className="flex mt-2 items-center justify-between">
                        <div className="h-10 bg-gray-200 rounded w-1/4" />
                        <div className="h-10 bg-gray-200 rounded w-1/4" />
                        <div className="h-10 bg-gray-200 rounded w-1/4" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </SectionSubItem>
      </SectionContainer>
    </div>
  );
}