package models

import (
	"github.com/google/uuid"
)

// DriverStanding represents a driver's championship standing after a race
type DriverStanding struct {
	ID          uuid.UUID `gorm:"type:uuid;primary_key;default:gen_random_uuid()" json:"id"`
	DriverID    uuid.UUID `gorm:"type:uuid;not null" json:"driver_id"`
	Season      int8      `gorm:"not null" json:"season"`
	RoundNumber int8      `gorm:"not null" json:"round_number"` // After which race

	Position int8    `gorm:"not null" json:"position"`
	Points   float64 `gorm:"type:numeric(10,2);not null" json:"points"`
	Wins     int8    `gorm:"default:0" json:"wins"`

	// Relationships
	Driver Driver `gorm:"foreignKey:DriverID;references:ID;constraint:OnUpdate:CASCADE,OnDelete:RESTRICT;" json:"driver,omitempty"`
}

// TableName specifies the table name
func (DriverStanding) TableName() string {
	return "driver_standings"
}
