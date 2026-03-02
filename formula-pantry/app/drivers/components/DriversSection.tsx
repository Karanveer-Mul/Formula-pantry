import { Driver } from "../api/types";
import DriverCarousel from "./DriverCarousel";

export default function DriversSection(props: {drivers: Driver[]}) { 

    return (
        <DriverCarousel drivers={props.drivers} />
    );
}