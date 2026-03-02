import Standings from "./components/Standings";

export default function Results() {
    const currentYear = new Date().getFullYear();

    return (
        <div className="w-full overflow-hidden">
            <Standings year={currentYear} constructorLimit={11} driverLimit={22}  scrollable={true}/>
        </div>
    )   
}