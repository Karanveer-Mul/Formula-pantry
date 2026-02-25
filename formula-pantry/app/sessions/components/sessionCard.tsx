import Image from "next/image";
import type { Session } from "../api/types";
import { Flag, Ruler, Map } from "lucide-react";

interface SessionCardProps {
  session: Session;
}

export default function SessionCard({ session }: SessionCardProps) {
  const sessionOneDate = new Date(session.session_one_date_time).toLocaleDateString("en-US", { month: "short", day: "numeric"});
  const sessionFiveDate = new Date(session.session_five_date_time).toLocaleDateString("en-US", { day: "numeric"});
  let displayUpcoming = false

  const daysDifference = (new Date(session.session_one_date_time).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24);
  if (daysDifference < 14 && daysDifference > 0) {
    displayUpcoming = true;
  }

  return (
    <div className="p-8 border-gray-300 hover:bor der-gray-400 bg-linear-to-t from-black/1 to-transparent border duration-300 ease-in-out shadow-sm transition-shadow hover:shadow-lg hover:cursor-pointer flex flex-col items-start rounded-xl">
      <Image loading="lazy" className="w-full" width={300} height={150} src={`/sessions/${session.country}/${session.country}.avif`} alt={session.race_name} />
      <div className="h-fit w-full mt-4 flex flex-col">
        <div className="font-bold font-novecento text-4xl">{session.race_name}</div>
        <div className="flex text-nowrap justify-between font-harmony font-medium text-2xl">{session.country}, {session.city}</div>
        <div className="mt-4 flex flex-col text-nowrap justify-between font-harmony font-medium text-2xl">
          <div className="flex items-center justify-between">
            <span className="">{sessionOneDate} - {sessionFiveDate}</span>   
            <span className="">Round {session.round_number}</span> 
          </div>
          <div className="flex mt-4 items-center justify-between">
            <span className={`${session.race_format === "conventional" ? "" : "bg-orange-500/10 text-orange-600"} rounded-full border px-4 py-1`}>
              {session.race_format === "conventional" ? "Conventional" : "Sprint"}
            </span> 
            {session.is_completed &&
              <span className="bg-gray-500/10 text-gray-600 rounded-full border px-4 py-1">
                Completed
              </span> 
            }
            {!session.is_completed && displayUpcoming &&
              <span className="bg-blue-500/10 text-blue-600 rounded-full border px-4 py-1">
                Upcoming
              </span> 
            }                 
          </div>
        </div>
        <div className="mt-4 flex flex-col text-nowrap justify-between font-harmony font-medium text-xl">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="">Length</span>
              <span>{session.circuit_length} km</span>
            </div>  
            <div className="flex flex-col">
              <span className="">Laps</span>
              <span>{session.laps}</span>
            </div>
            <div className="flex flex-col">
              <span className="">Distance</span>
              <span>{session.total_distance?.toString().split('.')[0]} km</span>
            </div>
          </div>      
        </div>
      </div>
    </div>
  );
}