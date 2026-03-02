import { getTeams } from "../api/services";

export async function getTeamColorByTeamId(teamId: string) {
    try {
        const teams = await getTeams();
        const team = teams.find((team) => team.id === teamId);
        if (team) {
            return team?.team_color;
        }
        return "team-color-default";
    } catch (error) {
        console.error(error);
        return "team-color-default";
    }
}

export async function getTeamNameByTeamId(teamId: string) {
    try {
        const teams = await getTeams();
        const team = teams.find((team) => team.id === teamId);
        if (team) {
            return team?.name;
        }
        return "Team name unavailable";
    } catch (error) {
        console.error(error);
        return "Team name unavailable";
    }
}