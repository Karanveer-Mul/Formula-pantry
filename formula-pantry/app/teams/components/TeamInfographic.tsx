import SectionContainer from "../../components/shared/section";
import SectionSubItem from "../../components/shared/sectionSubItem";
import { ConstructorStandingWithDriver } from "../api/types";
import { getTeamWithDrivers } from "../api/services";
import { Driver } from "../../drivers/api/types";
import Image from "next/image";
import DriverCard from "../../drivers/components/DriverCard";

export default async function TeamInfographic(props: { teamId: string }) {
  const { teamId } = props;

  let ConstructorStandingWithDrivers: ConstructorStandingWithDriver[] = [];
  let error: string | null = null;

  let team: ConstructorStandingWithDriver | null = null;
  let driver1: Partial<Driver> | null = null;
  let driver2: Partial<Driver> | null = null;

  try {
    ConstructorStandingWithDrivers = await getTeamWithDrivers(teamId);

    if (ConstructorStandingWithDrivers.length === 0) {
      throw new Error("Team not found");
    }
    team = ConstructorStandingWithDrivers[0];
    driver1 = {
      id: ConstructorStandingWithDrivers[0].driver_id, // UUID
      first_name: ConstructorStandingWithDrivers[0].driver_first_name,
      last_name: ConstructorStandingWithDrivers[0].driver_last_name,
      team_id: ConstructorStandingWithDrivers[0].team_id, // UUID
      team_name: ConstructorStandingWithDrivers[0].name,
      team_color: ConstructorStandingWithDrivers[0].team_color, // Hex color code
      constructor_id: ConstructorStandingWithDrivers[0].constructor_id, // UUID
      driver_number: ConstructorStandingWithDrivers[0].driver_number,
      season: ConstructorStandingWithDrivers[0].season,
      season_points: ConstructorStandingWithDrivers[0].driver_points,
      season_grand_prix_wins: ConstructorStandingWithDrivers[0].driver_wins,
    };
    driver2 = ConstructorStandingWithDrivers[1] ? {
      id: ConstructorStandingWithDrivers[1].driver_id,
      first_name: ConstructorStandingWithDrivers[1].driver_first_name,
      last_name: ConstructorStandingWithDrivers[1].driver_last_name,
      team_id: ConstructorStandingWithDrivers[1].team_id,
      team_name: ConstructorStandingWithDrivers[1].name,
      team_color: ConstructorStandingWithDrivers[1].team_color,
      constructor_id: ConstructorStandingWithDrivers[1].constructor_id,
      driver_number: ConstructorStandingWithDrivers[1].driver_number,
      season: ConstructorStandingWithDrivers[1].season,
      season_points: ConstructorStandingWithDrivers[1].driver_points,
      season_grand_prix_wins: ConstructorStandingWithDrivers[1].driver_wins,
    } : null;
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to fetch team";
  }

  return (
    <SectionContainer title={`${team?.name.toUpperCase()}`}>
      <SectionSubItem>
        <div className="flex w-full flex-col items-center">
          <Image
            loading="lazy"
            src={`/teams/${team?.season}/${team?.constructor_id}/car_large.webp`}
            alt={`${team?.constructor_id}car`}
            width={1018}
            height={224}
            className="w-1/2 h-auto object-cover"
          />
          <div className="flex mt-8 w-full items-center justify-between">
            <div className="flex flex-col">
              <span className="font-gilroy font-light text-2xl text-gray-500 ">
                Position
              </span>
              <span className="font-harmony font-bold text-4xl">
                {team?.position}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-gilroy font-light text-2xl text-gray-500 ">
                Points
              </span>
              <span className="font-harmony font-bold text-4xl">
                {team?.points} [ {team?.driver_points} +{" "}
                {ConstructorStandingWithDrivers[1].driver_points} ]
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-gilroy font-light text-2xl text-gray-500 ">
                Wins
              </span>
              <span className="font-harmony font-bold text-4xl">
                {team?.wins} [ {team?.driver_wins} +{" "}
                {ConstructorStandingWithDrivers[1].driver_wins} ]
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 mt-8 gap-4 w-full">
            <DriverCard driver={driver1 as Driver} />
            <DriverCard driver={driver2 as Driver} />
          </div>
        </div>
      </SectionSubItem>
    </SectionContainer>
  );
}
