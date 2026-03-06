import SectionSubItem from "@/app/components/shared/sectionSubItem";
import SectionContainer from "@/app/components/shared/section";
import { getTeams } from "./api/services";
import { Team } from "./api/types";
import TeamsSection from "./components/TeamsSection";

export default async function Teams() {
  let teams: Team[] = [];
  let error: string | null = null;

  try {
    teams = await getTeams();
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to fetch teams";
  }

  return (
    <div className="w-full overflow-hidden">
      <SectionContainer title="TEAMS" scrollable={true}>
        <SectionSubItem>
          <TeamsSection teams={teams} />
        </SectionSubItem>
      </SectionContainer>
    </div>
  );
}
