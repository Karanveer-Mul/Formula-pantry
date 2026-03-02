"use client";

import { useState } from "react";
import { ConstructorStanding, DriverStanding } from "../api/types";
import Image from "next/image";
import Link from "next/link";

export default function ConstructorStandingList(props: { constructorStandings: ConstructorStanding[], year: number }) {
  const { constructorStandings, year } = props;
  return (
    <div className="font-harmony text-3xl font-normal flex flex-col justify-between h-full w-full text-nowrap">
      <div className="flex justify-between mb-8">
        <div className="flex items-center justify-start w-1/2">
          <span className="w-1/6">Pos.</span>
          <span>Team</span>
        </div>
        <span className="w-1/4 text-right">Pts.</span>
      </div>
      <div className="flex flex-col justify-between h-full w-full">
        {constructorStandings.map((team, index) => (
          <div key={team.id} className={`${index !== 0 && "border-t"} py-7 border-gray-500 flex justify-between `}>
            <div className="flex items-center justify-start w-1/2">
              <span className="w-1/6">{team.position}</span>
              <Link className="flex items-center hover:text-[#fb542b]" href={`/teams/${team.team_id}`}>
                <span className={`driver-face-card-small`} style={{
                  background: `#${team.team_color}`
                }}>
                  <Image className="" loading="lazy" src={`/teams/${year}/${team.constructor_id}/logo.webp`} width={30} height={30} alt={`${team.name} logo`} />
                </span>
                <span>{team.name}</span>
              </Link>
            </div>
            <span className="w-1/4 text-right">{team.points}</span>
          </div>
        ))}
      </div>
      {constructorStandings.length <= 10 && 
          <Link href="/results" className="hover:border-white hover:text-white px-16 py-4 font-harmony text-2xl font-bold text-gray-200 w-fit mt-10 rounded-full border-2 border-gray-300">
                <span className="text-nowrap   ">
                    View all Constructor standings
                </span>
            </Link>}
    </div>
  );
}