"use client";

import { useState } from "react";
import { ConstructorStanding, DriverStanding } from "../api/types";
import DriverStandingList from "./DriverStandingList";
import ConstructorStandingList from "./ConstructorStandingList";

export default function DriverConstructorTable(props: { driverStandings: DriverStanding[], constructorStandings: ConstructorStanding[], year: number }) {
  const { driverStandings, constructorStandings, year } = props;
  const [driverStandingsVisible, setDriverStandingsVisible] = useState(true);
  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-start mb-8 underline-offset-8">
        <button className={`${driverStandingsVisible ? "underline underline-white text-white" : "text-gray-500 hover:text-gray-300 hover:underline hover:underline-gray-300"} cursor-pointer w-fit px-16 py-4 font-harmony text-4xl font-bold` } onClick={() => setDriverStandingsVisible(true)}>Drivers</button>
        <button className={`${!driverStandingsVisible ? "underline underline-white text-white" : "text-gray-500 hover:text-gray-300 hover:underline hover:underline-gray-300"} cursor-pointer w-fit px-16 py-4 font-harmony text-4xl font-bold` } onClick={() => setDriverStandingsVisible(false)}>Teams</button>
      </div>
      {driverStandingsVisible ? (
        <DriverStandingList driverStandings={driverStandings} year={year} />
      ) : (
        <ConstructorStandingList constructorStandings={constructorStandings} year={year} />
      )}
    </div>
  );
}