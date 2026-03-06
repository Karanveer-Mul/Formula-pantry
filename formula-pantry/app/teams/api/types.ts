export interface Team {
	id: string; // UUID
	name: string;
	constructor_id: string;
	power_unit_supplier: string;
	season: number;
	team_color: string;
	created_at: string;
	updated_at: string;
}


export interface ConstructorStandingWithDriver {
	id: string; // UUID
	team_id: string; // UUID
	name: string; 
	constructor_id: string;
	team_color: string;
	season: number;
	round_number: number;
	position: number;
	points: number;
	wins: number;
	driver_id: string; // UUID
	driver_first_name: string;
	driver_last_name: string;
	driver_number: number;
	driver_points: number;
	driver_wins: number;
}
