import SectionContainer from "@/app/components/shared/section";
import SectionSubItem from "@/app/components/shared/sectionSubItem";
import DriverConstructorTable from "./DriverConstructorTable";
import { ConstructorStanding, DriverStanding } from "../api/types";
import { getConstructorStandings, getDriverStandings } from "../api/services";

export default async function Standings(props: {constructorLimit?: number, driverLimit?: number, year?: number, scrollable?: boolean}) {
  
  let constructorStandings: ConstructorStanding[] = [];
  let driverStandings: DriverStanding[] = [];

  let error: string | null = null;

  const currentYear = new Date().getFullYear();

  const constructorLimit = props.constructorLimit ?? 10;
  const driverLimit = props.driverLimit ?? 10;
  const year = props.year ?? currentYear;
  const scrollable = props.scrollable ?? false;

  try {
    constructorStandings = await getConstructorStandings(year, constructorLimit);
    driverStandings = await getDriverStandings(year, driverLimit);
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to standings";
  }

  return (
      <SectionContainer 
        title="Standings"
        bg="bg-dark-main-gradient"
        color="text-white"
        scrollable={scrollable}
      >
        <SectionSubItem>
          <DriverConstructorTable constructorStandings={constructorStandings} driverStandings={driverStandings} year={year} />
        </SectionSubItem>
      </SectionContainer>
  );
}