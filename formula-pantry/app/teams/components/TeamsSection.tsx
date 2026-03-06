import { Team } from "../api/types";
import TeamList from "./TeamList";

export default function TeamsSection(props: {teams: Team[]}) { 

    return (
        <TeamList teams={props.teams} />
    );
}