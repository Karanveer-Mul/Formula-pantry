package models

import (
	"time"

	"github.com/google/uuid"
)

// Team represents a Formula 1 constructor/team
type Team struct {
	ID            uuid.UUID `gorm:"type:uuid;primary_key;default:gen_random_uuid()" json:"id"`
	Name          string    `gorm:"type:varchar(100);uniqueIndex;not null" json:"name"`
	ConstructorID string    `gorm:"type:varchar(50);uniqueIndex" json:"constructor_id"` // For F1 API compatibility
	Season        int8      `gorm:"not null" json:"season"`
	TeamColor     string    `gorm:"type:varchar(7);not null" json:"team_color"` // Hex color code
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at"`

	// Relationships
	Drivers   []Driver              `gorm:"foreignKey:TeamID;references:ID" json:"drivers,omitempty"`
	Standings []ConstructorStanding `gorm:"foreignKey:TeamID;references:ID" json:"standings,omitempty"`
}

// TableName specifies the table name
func (Team) TableName() string {
	return "teams"
}
