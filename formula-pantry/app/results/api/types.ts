export interface ConstructorStanding {
	id: string; // UUID
	team_id: string; // UUID
	name: string; 
	team_color: string;
	constructor_id: string;
	season: number;
	round_number: number;
	position: number;
	points: number;
	wins: number;
}

export interface DriverStanding {
	id: string; // UUID
	driver_id: string; // UUID
	first_name: string;
	last_name: string;
	team_id: string;
	team_name: string;
	team_color: string;
	constructor_id: string;
	nationality: string;
	season: number;
	round_number: number;
	position: number;
	points: number;
	wins: number;
}