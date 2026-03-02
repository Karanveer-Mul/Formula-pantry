import { getDrivers } from "../api/services";

export async function getDriverNameByDriverId(driverId: string) {
    try {
        const drivers = await getDrivers();
        const driver = drivers.find((driver) => driver.id === driverId);
        
        if (driver) {
            return `${driver?.firstName} ${driver?.lastName}`;
        } 
        
        return "Driver name unavailable";
        
    } catch (error) {
        console.error(error);
        return "Driver name unavailable";
    }
}