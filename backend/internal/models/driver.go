package models

import (
	"time"

	"github.com/google/uuid"
)

// Driver represents a Formula 1 driver
type Driver struct {
	ID          uuid.UUID `gorm:"type:uuid;primary_key;default:gen_random_uuid()" json:"id"`
	DriverID    string    `gorm:"type:varchar(50);uniqueIndex" json:"driver_id"` // For F1 API compatibility
	FirstName   string    `gorm:"type:varchar(50);not null" json:"first_name"`
	LastName    string    `gorm:"type:varchar(50);not null" json:"last_name"`
	Nationality string    `gorm:"type:varchar(50)" json:"nationality"`
	Code        string    `gorm:"type:varchar(3);uniqueIndex" json:"code"` // HAM, VER, LEC, etc.

	// Current team
	TeamID *uuid.UUID `gorm:"type:uuid" json:"team_id"`

	DriverNumber int8 `gorm:"uniqueIndex" json:"driver_number"`

	// Current Season
	Season                 int8  `gorm:"not null" json:"season"`
	SeasonPosition         *int8 `gorm:"default:NULL" json:"season_position"`
	SeasonPoints           int8  `gorm:"default:0" json:"season_points"`
	SeasonGrandPrixRaces   int8  `gorm:"default:0" json:"season_grand_prix_races"`
	SeasonGrandPrixPoints  int8  `gorm:"default:0" json:"season_grand_prix_points"`
	SeasonGrandPrixWins    int8  `gorm:"default:0" json:"season_grand_prix_wins"`
	SeasonGrandPrixPodiums int8  `gorm:"default:0" json:"season_grand_prix_podiums"`
	SeasonGrandPrixPoles   int8  `gorm:"default:0" json:"season_grand_prix_poles"`

	SeasonSprintRaces   int8 `gorm:"default:0" json:"season_sprint_races"`
	SeasonSprintPoints  int8 `gorm:"default:0" json:"season_sprint_points"`
	SeasonSprintWins    int8 `gorm:"default:0" json:"season_sprint_wins"`
	SeasonSprintPodiums int8 `gorm:"default:0" json:"season_sprint_podiums"`
	SeasonSprintPoles   int8 `gorm:"default:0" json:"season_sprint_poles"`

	// Career stats
	GrandPrixEntered          int8    `gorm:"default:0" json:"grand_prix_entered"`
	CareerPoints              int8    `gorm:"default:0" json:"career_points"`
	CareerWins                int8    `gorm:"default:0" json:"career_wins"`
	CareerPodiums             int8    `gorm:"default:0" json:"career_podiums"`
	CareerPolePositions       int8    `gorm:"default:0" json:"career_pole_positions"`
	CareerWorldChampionships  int8    `gorm:"default:0" json:"career_world_championships"`
	CareerDNFs                int8    `gorm:"default:0" json:"career_dnfs"`
	CareerHighestRaceFinish   *string `gorm:"type:varchar(100)" json:"career_highest_race_finish"`
	CareerHighestGridPosition *string `gorm:"type:varchar(100)" json:"career_highest_grid_position"`
	CareerFastestLaps         int8    `gorm:"default:0" json:"career_fastest_laps"`

	// Metadata
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`

	// Relationships
	Team *Team `gorm:"foreignKey:TeamID;references:ID" json:"team,omitempty"`
	//SessionResults []SessionResult  `gorm:"foreignKey:DriverID;references:ID" json:"session_results,omitempty"`
	Standings []DriverStanding `gorm:"foreignKey:DriverID;references:ID" json:"standings,omitempty"`
}

// TableName specifies the table name
func (Driver) TableName() string {
	return "drivers"
}
