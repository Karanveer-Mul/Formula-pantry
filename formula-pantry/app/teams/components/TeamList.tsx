import { Team } from "../api/types";
import Image from "next/image";
import Link from "next/link";
 
export default function TeamList(props: { teams: Team[] }) {
  const { teams } = props;

  return (
    <div className="flex w-full items-center justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
        {teams.map((team) => (
          <Link href={`/teams/${team.id}`} 
            key={team.id}
            className="px-8 py-8 rounded-lg shadow bg-linear-to-b hover:from-black/50 from-black/30 to-black/10 text-white orange-link cursor-pointer"
            style={{
              backgroundColor: `#${team.team_color}`,
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-4xl font-harmony font-bold ">
                {team.name}
              </span>
              <span className="rounded-full bg-linear-to-b from-black/40 to-black/20 p-2">
                <Image
                  className="w-fit"
                  loading="lazy"
                  src={`/teams/${team.season}/${team.constructor_id}/logo.webp`}
                  width={30}
                  height={30}
                  alt={`${team.name} logo`}
                />
              </span>
            </div>
            <Image
              src={`/teams/${team.season}/${team.constructor_id}/car_large.webp`}
              alt={`${team.constructor_id}car`}
              width={1018}
              height={224}
              className="w-full h-auto object-cover"
            />
            <div className="flex items-center justify-between mt-4">
              
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
