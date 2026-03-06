import { getUpcomingSession } from "../../../sessions/api/services";
import { Session } from "../../../sessions/api/types";
import SessionCard from "@/app/sessions/components/sessionCard";

export default async function MiniHeader() {
  let session: Session | null = null;
  let error: string | null = null;

  try {
    session = await getUpcomingSession();
  } catch (err) {
    error =
      err instanceof Error ? err.message : "Failed to fetch upcoming session";
  }

  return (
    session && (
      <div className="z-10 mt-10">
        <SessionCard session={session} />
      </div>
    )
  );
}
