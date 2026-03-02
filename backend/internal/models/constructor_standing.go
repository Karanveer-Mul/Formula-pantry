package models

import (
	"github.com/google/uuid"
)

// ConstructorStanding represents a constructor's championship standing after a race
type ConstructorStanding struct {
	ID          uuid.UUID `gorm:"type:uuid;primary_key;default:gen_random_uuid()" json:"id"`
	TeamID      uuid.UUID `gorm:"type:uuid;not null" json:"team_id"`
	Season      int16     `gorm:"not null" json:"season"`
	RoundNumber int16     `gorm:"not null" json:"round_number"`

	Position int16   `gorm:"not null" json:"position"`
	Points   float64 `gorm:"type:numeric(10,2);not null" json:"points"`
	Wins     int16   `gorm:"default:0" json:"wins"`

	// Relationships
	Team *Team `gorm:"foreignKey:TeamID;references:ID" json:"team,omitempty"`
}

// TableName specifies the table name
func (ConstructorStanding) TableName() string {
	return "constructor_standings"
}

type PopulatedConstructorStanding struct {
	ID            uuid.UUID `gorm:"type:uuid;primary_key;default:gen_random_uuid()" json:"id"`
	TeamID        uuid.UUID `gorm:"type:uuid;not null" json:"team_id"`
	TeamName      string    `gorm:"type:varchar(100);uniqueIndex;not null" json:"name"`
	ConstructorID string    `gorm:"type:varchar(50);uniqueIndex" json:"constructor_id"`
	TeamColor     string    `gorm:"type:varchar(7);not null" json:"team_color"`
	Season        int16     `gorm:"not null" json:"season"`
	RoundNumber   int16     `gorm:"not null" json:"round_number"`

	Position int16   `gorm:"not null" json:"position"`
	Points   float64 `gorm:"type:numeric(10,2);not null" json:"points"`
	Wins     int16   `gorm:"default:0" json:"wins"`

	// Relationships
	Team *Team `gorm:"foreignKey:TeamID;references:ID" json:"team,omitempty"`
}

func (PopulatedConstructorStanding) TableName() string {
	return "constructor_standings"
}
