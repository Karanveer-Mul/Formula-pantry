import SectionContainer from "../components/shared/section";
import SectionSubItem from "../components/shared/sectionSubItem";
import SessionCard from "./components/sessionCard";
import { getSessionsBySeason } from "./api/services";
import type { Session } from "./api/types";

export default async function SessionsPage() {
  const currentYear = new Date().getFullYear();
  let sessions: Session[] = [];
  let error: string | null = null;

  try {
    sessions = await getSessionsBySeason(currentYear);
  } catch (err) {
    error =
      err instanceof Error ? err.message : "Failed to fetch sessions for current year";
  }

  return (
    <div className="w-full overflow-hidden">
      <SectionContainer title={`${currentYear} SESSION CALENDAR`}>
        <SectionSubItem>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24 w-full">

            {/* Error state */}
            {error && (
              <div className="mt-4 text-lg text-red-600">
                Error: {error}
              </div>
            )}

            {/* No sessions found */}
            {!error && sessions.length === 0 && (
              <div className="mt-4 text-lg text-gray-500">
                No sessions found for {currentYear}
              </div>
            )}

             {/* Sessions list */}            
            {sessions.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}

          </div>
        </SectionSubItem>
      </SectionContainer>
    </div>
  );
}