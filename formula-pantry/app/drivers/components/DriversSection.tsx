import { Driver } from "../api/types";
import DriverCard from "./DriverCard";

export default function DriversSection(props: {drivers: Driver[]}) { 
    const { drivers } = props;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {drivers.map((driver) => (
                    <DriverCard key={driver.id} driver={driver} />
               
            ))}
        </div>
    );
}