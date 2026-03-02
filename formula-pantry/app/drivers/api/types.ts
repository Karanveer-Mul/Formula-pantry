export interface Driver {
	id: string; // UUID
	first_name: string;
	last_name: string;
	nationality: string;
	code: string; // HAM, VER, LEC, etc.
	team_id: string; // UUID
	team_name: string;
	team_color: string; // Hex color code
	constructor_id: string; // UUID
	driver_number: number;

	// Current Season
	season: number;
	season_position: number;
	season_points: number;
	season_grand_prix_races: number;
	season_grand_prix_points: number;
	season_grand_prix_wins: number;
	season_grand_prix_podiums: number;
	season_grand_prix_poles: number;
	season_sprint_races: number;
	season_sprint_points: number;
	season_sprint_wins: number;
	season_sprint_podiums: number;
	season_sprint_poles: number;
	// Career stats
	grand_prix_entered: number;
	career_points: number;
	career_wins: number;
	career_podiums: number;
	career_pole_positions: number;
	career_world_championships: number;
	career_dnfs: number;
	career_highest_race_finish: string;
	career_highest_grid_position: string;
	career_fastest_laps: number;

	// Metadata
	created_at: string;
	updated_at: string;
}