import Image from "next/image";
import { Driver } from "../api/types";
import Link from "next/link";

export default function DriverCard(props: { driver: Driver }) {
  const { driver } = props;

  return (
    <Link
      href={`/drivers/${driver.id}`}
      className="w-full relative h-84 md:h-108 lg:h-84 flex justify-between rounded-lg shadow bg-linear-to-b hover:from-black/50 from-black/30 to-black/10 text-white orange-link cursor-pointer"
      style={{
        backgroundColor: `#${driver.team_color}`,
      }}
    >
      <div className="flex flex-col items-start justify-between my-8">
        <span className="font-harmony font-bold text-4xl px-8">
          {driver.first_name} {driver.last_name}
          <Image
            className="ml-4"
            loading="lazy"
            src={`/teams/${driver.season}/${driver.constructor_id}/logo.webp`}
            width={30}
            height={30}
            alt={`${driver.team_name} logo`}
          />
        </span>
        <div className="flex flex-col items-start justify-start">
          <div className="flex items-center justify-between w-8 px-8 mt-2 text-2xl text-white">
            <span className="text-gray-100 ">Points</span>
            <span className="ml-2">{driver.season_points}</span>
          </div>
          <div className="flex items-center justify-between w-8 px-8 mt-2 text-2xl text-white">
            <span className="text-gray-100 ">Wins</span>
            <span className="ml-2">{driver.season_grand_prix_wins}</span>
          </div>
        </div>
      </div>

      <div className="w-1/3 h-full overflow-hidden">
        <Image
          src={`/teams/${driver.season}/${driver.constructor_id}/${driver.first_name}${driver.last_name}_large.webp`}
          alt={`${driver.first_name} ${driver.last_name}`}
          width={150}
          height={150}
          className="w-full h-auto"
        />
      </div>
      <span
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[16rem]"
        style={{
          color: `#${driver.team_color}`,
        }}
      >
        {driver.driver_number}
      </span>
    </Link>
  );
}
