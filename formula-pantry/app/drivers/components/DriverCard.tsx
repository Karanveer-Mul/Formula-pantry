"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Driver } from "../api/types";

export default function DriverCard(props: { driver: Driver }) {
  const { driver } = props;
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState(
    "perspective(600px) rotateX(0deg) rotateY(0deg)",
  );

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const XRel = e.clientX - rect.left;
    const YRel = e.clientY - rect.top;

    const YAngle = -(0.5 - XRel / width) * 40;
    const XAngle = (0.5 - YRel / height) * 40;

    setTransform(
      `perspective(600px) rotateX(${XAngle}deg) rotateY(${YAngle}deg)`,
    );
  }

  function handleMouseLeave() {
    setTransform("perspective(600px) rotateX(0deg) rotateY(0deg)");
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: "transform 300ms linear",
      }}
      className="w-140 h-170 relative rounded-lg shadow-xl overflow-hidden cursor-pointer"
    >
      <div className="foil hover:brightness-110 flex flex-col items-center justify-center w-full h-full">
        <div
          className="foil-inner"
          style={{
            backgroundColor: `#${driver.team_color}`,
          }}
        >
          {/* Name overlay at bottom */}
          <div className="relative text-center h-full w-full bg-linear-to-b from-black/0 to-black/30 z-50">
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 w-fit text-white text-3xl font-harmony font-bold z-10">
              {driver.first_name} {driver.last_name}
            </span>
          </div>
          <div className="absolute top-5 left-5 driver-face-card-md border-none" style={{
             border: 'none',
             boxShadow: 'none' }}>
            <Image className="" loading="lazy" src={`/teams/${driver.season}/${driver.constructor_id}/logo.webp`} width={30} height={30} alt={`${driver.team_name} logo`} />
            
            </div>
          {/* Driver Car */}
          <div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 mt-4 w-full h-auto overflow-hidden brightness-75 blur-in-xs"
            style={{
              transform: `${transform} `,
              transition: "transform 300ms linear",
            }}
          >
            <Image
              src={`/teams/${driver.season}/${driver.constructor_id}/car.webp`}
              alt={`${driver.constructor_id}car`}
              width={150}
              height={150}
              className="w-full h-auto object-cover"
            />
          </div>
          {/* Driver Number */}
          <div
            className="absolute top-1/12 right-1/12 text-white text-9xl font-novecento font-bold"
            style={{
              transform,
              transition: "transform 300ms linear",
            }}
          >
            {driver.driver_number}
          </div>
          {/* Driver Image */}
          <div className="absolute top-0 mt-4 w-full h-auto overflow-hidden">
            <Image
              src={`/teams/${driver.season}/${driver.constructor_id}/${driver.first_name}${driver.last_name}_large.webp`}
              alt={`${driver.first_name} ${driver.last_name}`}
              width={150}
              height={150}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
        <span className="absolute bottom-5 left-5 px-4 py-2 text-6xl font-harmony font-medium rhombus text-white">
            {driver.season_points}
        </span>
        <span className="absolute bottom-5 right-5 px-4 py-2 text-6xl font-harmony font-medium rhombus text-white">
            {driver.season_points}
        </span>
      </div>
    </div>
  );
}
