package models

import (
	"github.com/google/uuid"
)

// DriverStanding represents a driver's championship standing after a race
type DriverStanding struct {
	ID          uuid.UUID `gorm:"type:uuid;primary_key;default:gen_random_uuid()" json:"id"`
	DriverID    uuid.UUID `gorm:"type:uuid;not null" json:"driver_id"`
	Season      int16     `gorm:"not null" json:"season"`
	RoundNumber int16     `gorm:"not null" json:"round_number"` // After which race

	Position int16   `gorm:"not null" json:"position"`
	Points   float64 `gorm:"type:numeric(10,2);not null" json:"points"`
	Wins     int16   `gorm:"default:0" json:"wins"`

	// Relationships
	Driver Driver `gorm:"foreignKey:DriverID;references:ID;constraint:OnUpdate:CASCADE,OnDelete:RESTRICT;" json:"driver,omitempty"`
}

// TableName specifies the table name
func (DriverStanding) TableName() string {
	return "driver_standings"
}

// DriverStanding represents a driver's championship standing after a race
type PopulatedDriverStanding struct {
	ID            uuid.UUID  `gorm:"type:uuid;primary_key;default:gen_random_uuid()" json:"id"`
	DriverID      uuid.UUID  `gorm:"type:uuid;not null" json:"driver_id"`
	FirstName     string     `gorm:"type:varchar(50);not null" json:"first_name"`
	LastName      string     `gorm:"type:varchar(50);not null" json:"last_name"`
	TeamID        *uuid.UUID `gorm:"type:uuid" json:"team_id"`
	TeamColor     string     `gorm:"type:varchar(7);not null" json:"team_color"`
	TeamName      string     `gorm:"type:varchar(100);uniqueIndex;not null" json:"team_name"`
	ConstructorID string     `gorm:"type:varchar(50);uniqueIndex" json:"constructor_id"` // For F1 API compatibility
	Season        int16      `gorm:"not null" json:"season"`
	RoundNumber   int16      `gorm:"not null" json:"round_number"` // After which race

	Position int16   `gorm:"not null" json:"position"`
	Points   float64 `gorm:"type:numeric(10,2);not null" json:"points"`
	Wins     int16   `gorm:"default:0" json:"wins"`

	Driver Driver `gorm:"foreignKey:DriverID;references:ID;constraint:OnUpdate:CASCADE,OnDelete:RESTRICT;" json:"driver,omitempty"`
	Team   *Team  `gorm:"foreignKey:TeamID;references:ID" json:"team,omitempty"`
}

func (PopulatedDriverStanding) TableName() string {
	return "driver_standings"
}
