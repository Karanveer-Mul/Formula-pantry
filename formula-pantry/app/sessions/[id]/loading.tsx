import SectionContainer from "../../components/shared/section";
import SectionSubItem from "../../components/shared/sectionSubItem";

export default function LoadingSession() {
  return (
    <div className="w-full overflow-hidden">
      <SectionContainer title={<div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse" />}>
        <div className="w-full text-gray-500 text-nowrap font-harmony font-medium text-2xl">
          <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse" />
        </div>
        <SectionSubItem>
          <div className="flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 w-full">
              <div className="h-128 bg-gray-200 w-half rounded animate-pulse" />
              <div className="flex flex-col border-l-0 md:border-l border-gray-300 md:pl-16 pr-16">
                {[...Array(4)].map((_, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col border-b border-gray-300 py-8"
                  >
                    <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse" />
                    <div className="mt-2 h-8 bg-gray-200 rounded w-1/3 animate-pulse" />
                  </div>
                ))}
                {/* last section without border */}
                <div className="flex flex-col py-8">
                  <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse" />
                  <div className="mt-2 h-8 bg-gray-200 rounded w-1/3 animate-pulse" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2  w-full">
              <div className="flex flex-col mt-20 text-2xl font-medium pr-16">
                <span className="font-harmony font-bold text-4xl">
                  <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse" />
                </span>
                {[...Array(5)].map((_, idx) => (
                  <div
                    key={idx}
                    className={
                      "flex items-center py-6 " +
                      (idx < 4 ? "border-b border-gray-300" : "")
                    }
                  >
                    <span className="w-12">
                      <div className="h-4 bg-gray-200 rounded w-8 animate-pulse" />
                    </span>
                    <span className="border-l border-gray-300 pl-16">
                      <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col mt-20 text-2xl border-l-0 md:border-l border-gray-300 font-medium md:pl-16 pr-16">
                <span className="font-harmony font-bold text-4xl">
                  <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse" />
                </span>
                {[...Array(5)].map((_, idx) => (
                  <div
                    key={idx}
                    className={
                      "flex items-center py-6 " +
                      (idx < 4 ? "border-b border-gray-300" : "")
                    }
                  >
                    <span className="w-12">
                      <div className="h-4 bg-gray-200 rounded w-8 animate-pulse" />
                    </span>
                    <span className="border-l border-gray-300 pl-16">
                      <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionSubItem>
      </SectionContainer>
    </div>
  );
}
