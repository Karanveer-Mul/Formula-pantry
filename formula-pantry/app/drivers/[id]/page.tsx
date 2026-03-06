import SectionContainer from "../../components/shared/section";
import SectionSubItem from "../../components/shared/sectionSubItem";
import { getDriverById } from "../api/services";
import type { Driver } from "../api/types";
import Image from "next/image";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function DriverPage({ params }: Props) {
  const { id } = await params;
  let driver: Driver | null = null;
  let error: string | null = null;

  try {
    driver = await getDriverById(id);
  } catch (err) {
    error =
      err instanceof Error
        ? err.message
        : "Failed to fetch driver information";
  }

  if (error || !driver) {
    return (
      <div className="w-full overflow-hidden">
      <SectionContainer title="">
        <SectionSubItem>
          <div className="text-4xl font-harmony font-bold">
            Driver not found. Please try again later.
          </div>
        </SectionSubItem>
      </SectionContainer>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden">
      <SectionContainer title={(driver.first_name + " " + driver.last_name).toUpperCase()}>
        <SectionSubItem>
          <div className="flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 w-full">
              <Image
                        src={`/teams/${driver.season}/${driver.constructor_id}/${driver.first_name}${driver.last_name}_large.webp`}
                        alt={`${driver.first_name} ${driver.last_name}`}
                        width={150}
                        height={150}
                        className="w-full h-auto"
                      />
              
            </div>
            
            
               
          </div>
        </SectionSubItem>
      </SectionContainer>
    </div>
  );
}
