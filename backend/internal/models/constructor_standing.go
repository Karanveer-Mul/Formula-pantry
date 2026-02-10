package models

import (
	"github.com/google/uuid"
)

// ConstructorStanding represents a constructor's championship standing after a race
type ConstructorStanding struct {
	ID          uuid.UUID `gorm:"type:uuid;primary_key;default:gen_random_uuid()" json:"id"`
	TeamID      uuid.UUID `gorm:"type:uuid;not null" json:"team_id"`
	Season      int8      `gorm:"not null" json:"season"`
	RoundNumber int8      `gorm:"not null" json:"round_number"`

	Position int8    `gorm:"not null" json:"position"`
	Points   float64 `gorm:"type:numeric(10,2);not null" json:"points"`
	Wins     int8    `gorm:"default:0" json:"wins"`

	// Relationships
	Team *Team `gorm:"foreignKey:TeamID;references:ID" json:"team,omitempty"`
}

// TableName specifies the table name
func (ConstructorStanding) TableName() string {
	return "constructor_standings"
}
