import SectionContainer from "../../components/shared/section";
import SectionSubItem from "../../components/shared/sectionSubItem";
import { getSessionsById } from "../api/services";
import type { Session } from "../api/types";
import Image from "next/image";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function SessionPage({ params }: Props) {
  const { id } = await params;
  let session: Session | null = null;
  let error: string | null = null;

  try {
    session = await getSessionsById(id);
  } catch (err) {
    error =
      err instanceof Error
        ? err.message
        : "Failed to fetch sessions for current year";
  }

  if (error || !session) {
    return (
      <div className="w-full overflow-hidden">
      <SectionContainer title="">
        <SectionSubItem>
          <div className="text-4xl font-harmony font-bold">
            Session not found. Please try again later.
          </div>
        </SectionSubItem>
      </SectionContainer>
      </div>
    );
  }

  const sessionOneDate = new Date(
    session.session_one_date_time,
  ).toLocaleDateString("en-US", { day: "numeric", month: "short" });
  const sessionTwoDate = new Date(
    session.session_two_date_time,
  ).toLocaleDateString("en-US", { day: "numeric", month: "short" });
  const sessionThreeDate = new Date(
    session.session_three_date_time,
  ).toLocaleDateString("en-US", { day: "numeric", month: "short" });
  const sessionFourDate = new Date(
    session.session_four_date_time,
  ).toLocaleDateString("en-US", { day: "numeric", month: "short" });
  const sessionFiveDate = new Date(
    session.session_five_date_time,
  ).toLocaleDateString("en-US", { day: "numeric", month: "short" });

  return (
    <div className="w-full overflow-hidden">
      <SectionContainer title={`${session.race_name.toUpperCase()} ${session.season}`}>
        <div className="w-full text-gray-500 text-nowrap font-harmony font-medium text-2xl">
          {session.country}, {session.city}
        </div>
        <SectionSubItem>
          <div className="flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 w-full">
              <Image
                loading="lazy"
                src={`/sessions/${session.city}/track.avif`}
                width={1250}
                height={704}
                alt={`${session.race_name} track`}
              />
              <div className="flex flex-col border-l-0 md:border-l border-gray-300 md:pl-16 pr-16">
                <div className="flex flex-col border-b border-gray-300 py-8">
                  <span className="font-gilroy font-light text-2xl text-gray-500">
                    Circuit Length
                  </span>
                  <span className="mt-2 font-harmony font-bold text-4xl">
                    {session.circuit_length} km
                  </span>
                </div>
                <div className="flex flex-col border-b border-gray-300 py-8">
                  <span className="font-gilroy font-light text-2xl text-gray-500">
                    Number of Laps
                  </span>
                  <span className="mt-2 font-harmony font-bold text-4xl">
                    {session.laps}
                  </span>
                </div>
                <div className="flex flex-col border-b border-gray-300 py-8">
                  <span className="font-gilroy font-light text-2xl text-gray-500">
                    Race Distance
                  </span>
                  <span className="mt-2 font-harmony font-bold text-4xl">
                    {session.total_distance} km
                  </span>
                </div>
                <div className="flex flex-col py-8">
                  <span className="font-gilroy font-light text-2xl text-gray-500">
                    Race Format
                  </span>
                  <span className="mt-2 font-harmony font-bold text-4xl">
                    {session.race_format === "conventional"
                      ? "Conventional"
                      : "Sprint"}
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2  w-full">
              <div className="flex flex-col mt-20 text-2xl font-medium pr-16">
                <span className="font-harmony font-bold text-4xl">
                  Schedule
                </span>
                <div className="flex items-center py-6 border-b border-gray-300">
                  <span className="w-12">{sessionOneDate}</span>
                  <span className="border-l border-gray-300 pl-16">
                    Practice 1
                  </span>
                </div>
                <div className="flex items-center py-6 border-b border-gray-300">
                  <span className="w-12">{sessionTwoDate}</span>
                  <span className="border-l border-gray-300 pl-16">
                    {session.race_format === "conventional"
                      ? "Practice 2"
                      : "Sprint Qualifying"}
                  </span>
                </div>
                <div className="flex items-center py-6 border-b border-gray-300">
                  <span className="w-12">{sessionThreeDate}</span>
                  <span className="border-l border-gray-300 pl-16">
                    {session.race_format === "conventional"
                      ? "Practice 3"
                      : "Sprint"}
                  </span>
                </div>
                <div className="flex items-center py-6 border-b border-gray-300">
                  <span className="w-12">{sessionFourDate}</span>
                  <span className="border-l border-gray-300 pl-16">
                    Qualifying
                  </span>
                </div>
                <div className="flex items-center py-6">
                  <span className="w-12">{sessionFiveDate}</span>
                  <span className="border-l border-gray-300 pl-16">Race</span>
                </div>
              </div>
              <div className="flex flex-col mt-20 text-2xl border-l-0 md:border-l border-gray-300 font-medium md:pl-16 pr-16">
                <span className="font-harmony font-bold text-4xl">
                  Weather
                </span>
                <div className="flex items-center py-6 border-b border-gray-300">
                  <span className="w-12">{sessionOneDate}</span>
                  <span className="border-l border-gray-300 pl-16">
                    Practice 1
                  </span>
                </div>
                <div className="flex items-center py-6 border-b border-gray-300">
                  <span className="w-12">{sessionTwoDate}</span>
                  <span className="border-l border-gray-300 pl-16">
                    {session.race_format === "conventional"
                      ? "Practice 2"
                      : "Sprint Qualifying"}
                  </span>
                </div>
                <div className="flex items-center py-6 border-b border-gray-300">
                  <span className="w-12">{sessionThreeDate}</span>
                  <span className="border-l border-gray-300 pl-16">
                    {session.race_format === "conventional"
                      ? "Practice 3"
                      : "Sprint"}
                  </span>
                </div>
                <div className="flex items-center py-6 border-b border-gray-300">
                  <span className="w-12">{sessionFourDate}</span>
                  <span className="border-l border-gray-300 pl-16">
                    Qualifying
                  </span>
                </div>
                <div className="flex items-center py-6">
                  <span className="w-12">{sessionFiveDate}</span>
                  <span className="border-l border-gray-300 pl-16">Race</span>
                </div>
              </div>
            </div>
            {session.race_format === "sprint_qualifying" &&
                <div className="grid grid-cols-1 md:grid-cols-2  w-full">
                    <div className="flex flex-col border-gray-300 mt-20 text-2xl font-medium w-full pr-16">
                        <span className="font-harmony font-bold text-4xl">Sprint Qualifying</span>
                        <div className="flex items-center py-6 border-b border-gray-300">
                            <span className="w-12">1</span>
                            <span className="border-l border-gray-300 pl-16">Franz Hermann</span>
                        </div>
                        <div className="flex items-center py-6 border-b border-gray-300">
                            <span className="w-12">2</span>
                            <span className="border-l border-gray-300 pl-16">Franz Hermann</span>
                        </div>
                        <div className="flex items-center py-6 border-b border-gray-300">
                            <span className="w-12">3</span>
                            <span className="border-l border-gray-300 pl-16">Franz Hermann</span>
                        </div>
                        <div className="flex items-center py-6 border-b border-gray-300">
                            <span className="w-12">4</span>
                            <span className="border-l border-gray-300 pl-16">Franz Hermann</span>
                        </div>
                        <div className="flex items-center py-6">
                            <span className="w-12">5</span>
                            <span className="border-l border-gray-300 pl-16">Franz Hermann</span>
                        </div>
                    </div>
                    <div className="flex flex-col border-l-0 md:border-l border-gray-300 mt-20 text-2xl font-medium w-full  md:pl-16 pr-16">
                        <span className="font-harmony font-bold text-4xl">Sprint Race</span>
                        <div className="flex items-center py-6 border-b border-gray-300">
                            <span className="w-12">1</span>
                            <span className="border-l border-gray-300 pl-16">Franz Hermann</span>
                        </div>
                        <div className="flex items-center py-6 border-b border-gray-300">
                            <span className="w-12">2</span>
                            <span className="border-l border-gray-300 pl-16">Franz Hermann</span>
                        </div>
                        <div className="flex items-center py-6 border-b border-gray-300">
                            <span className="w-12">3</span>
                            <span className="border-l border-gray-300 pl-16">Franz Hermann</span>
                        </div>
                        <div className="flex items-center py-6 border-b border-gray-300">
                            <span className="w-12">4</span>
                            <span className="border-l border-gray-300 pl-16">Franz Hermann</span>
                        </div>
                        <div className="flex items-center py-6">
                            <span className="w-12">5</span>
                            <span className="border-l border-gray-300 pl-16">Franz Hermann</span>
                        </div>
                    </div>
                </div>}
                <div className="grid grid-cols-1 md:grid-cols-2  w-full">
                    <div className="flex flex-col border-gray-300 mt-20 text-2xl font-medium w-full pr-16">
                        <span className="font-harmony font-bold text-4xl">Qualifying</span>
                        <div className="flex items-center py-6 border-b border-gray-300">
                            <span className="w-12">1</span>
                            <span className="border-l border-gray-300 pl-16">Franz Hermann</span>
                        </div>
                        <div className="flex items-center py-6 border-b border-gray-300">
                            <span className="w-12">2</span>
                            <span className="border-l border-gray-300 pl-16">Franz Hermann</span>
                        </div>
                        <div className="flex items-center py-6 border-b border-gray-300">
                            <span className="w-12">3</span>
                            <span className="border-l border-gray-300 pl-16">Franz Hermann</span>
                        </div>
                        <div className="flex items-center py-6 border-b border-gray-300">
                            <span className="w-12">4</span>
                            <span className="border-l border-gray-300 pl-16">Franz Hermann</span>
                        </div>
                        <div className="flex items-center py-6">
                            <span className="w-12">5</span>
                            <span className="border-l border-gray-300 pl-16">Franz Hermann</span>
                        </div>
                    </div>
                    <div className="flex flex-col border-l-0 md:border-l border-gray-300 mt-20 text-2xl font-medium w-full  md:pl-16 pr-16">
                        <span className="font-harmony font-bold text-4xl">Grand Prix</span>
                        <div className="flex items-center py-6 border-b border-gray-300">
                            <span className="w-12">1</span>
                            <span className="border-l border-gray-300 pl-16">Franz Hermann</span>
                        </div>
                        <div className="flex items-center py-6 border-b border-gray-300">
                            <span className="w-12">2</span>
                            <span className="border-l border-gray-300 pl-16">Franz Hermann</span>
                        </div>
                        <div className="flex items-center py-6 border-b border-gray-300">
                            <span className="w-12">3</span>
                            <span className="border-l border-gray-300 pl-16">Franz Hermann</span>
                        </div>
                        <div className="flex items-center py-6 border-b border-gray-300">
                            <span className="w-12">4</span>
                            <span className="border-l border-gray-300 pl-16">Franz Hermann</span>
                        </div>
                        <div className="flex items-center py-6">
                            <span className="w-12">5</span>
                            <span className="border-l border-gray-300 pl-16">Franz Hermann</span>
                        </div>
                    </div>
                </div>
          </div>
        </SectionSubItem>
      </SectionContainer>
    </div>
  );
}
