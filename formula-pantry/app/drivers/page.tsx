import SectionSubItem from "@/app/components/shared/sectionSubItem";
import SectionContainer from "@/app/components/shared/section";
import { getDrivers } from "./api/services";
import { Driver } from "./api/types";
import DriversSection from "./components/DriversSection";

export default async function Drivers() {
  let drivers: Driver[] = [];
  let error: string | null = null;

  try {
    drivers = await getDrivers();
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to fetch drivers";
  }

  return (
    <div className="w-full overflow-hidden">
      <SectionContainer title="Drivers" scrollable={false}>
        <SectionSubItem>
          <DriversSection drivers={drivers} />
        </SectionSubItem>
      </SectionContainer>
    </div>
  );
}
