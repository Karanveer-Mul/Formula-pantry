import SectionContainer from "../components/shared/section";
import SectionSubItem from "../components/shared/sectionSubItem";

export default function LoadingSessions() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full overflow-hidden lg:text-[8px]">
      <SectionContainer title="Sessions">
        <SectionSubItem>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold">Sessions {currentYear}</h1>
            <div className="mt-4 w-full space-y-2">
              {[...Array(3)].map((_, idx) => (
                <div
                  key={idx}
                  className="p-4 border border-gray-300 rounded animate-pulse"
                >
                  <div className="h-6 bg-gray-200 rounded w-1/3 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-1" />
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                </div>
              ))}
            </div>
          </div>
        </SectionSubItem>
      </SectionContainer>
    </div>
  );
}