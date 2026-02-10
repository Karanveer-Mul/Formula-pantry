package models

import (
	"github.com/google/uuid"
)

// SessionResult represents a driver's result in a race session
type SessionResult struct {
	ID         uuid.UUID `gorm:"type:uuid;primary_key;default:gen_random_uuid()" json:"id"`
	SessionID  uuid.UUID `gorm:"type:uuid;not null" json:"session_id"`
	DriverID   uuid.UUID `gorm:"type:uuid;not null" json:"driver_id"`
	RaceFormat string    `gorm:"type:varchar(50);not null" json:"race_format"` // grand_prix, sprint_qualifying, sprint, qualifying.
	// Result data
	Position      *int8   `json:"position"`      // Final position (1-22, or null if DNF)
	GridPosition  *int8   `json:"grid_position"` // Starting position
	Points        float64 `gorm:"type:numeric(10,2);default:0.0" json:"points"`
	LapsCompleted *int8   `json:"laps_completed"`

	// Timing
	TotalRaceTime  *string `gorm:"type:varchar(20)" json:"total_race_time"`  // "1:32:07.986"
	FastestLapTime *string `gorm:"type:varchar(15)" json:"fastest_lap_time"` // "1:07.123"

	// Status
	Status string `gorm:"type:varchar(50)" json:"status"` // "Finished", "DNF", "DSQ", etc.

	// Performance metrics
	AverageLapTime *float64 `gorm:"type:numeric(10,3)" json:"average_lap_time"` // in seconds
	TopSpeed       *float64 `gorm:"type:numeric(10,2)" json:"top_speed"`        // km/h
	PitStops       int8     `gorm:"default:0" json:"pit_stops"`

	// Relationships
	Session *Session `gorm:"foreignKey:SessionID;references:ID" json:"session,omitempty"`
	//Driver  *Driver  `gorm:"foreignKey:DriverID;references:ID" json:"driver,omitempty"`
}

// TableName specifies the table name
func (SessionResult) TableName() string {
	return "session_results"
}
