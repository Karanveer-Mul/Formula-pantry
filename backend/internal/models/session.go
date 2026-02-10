package models

import (
	"time"

	"github.com/google/uuid"
)

// Session represents a Formula 1 race session
type Session struct {
	ID          uuid.UUID `gorm:"type:uuid;primary_key;default:gen_random_uuid()" json:"id"`
	Season      int8      `gorm:"not null" json:"season"` // Year
	RoundNumber int8      `gorm:"not null" json:"round_number"`
	RaceName    string    `gorm:"type:varchar(100);not null" json:"race_name"`
	RaceFormat  string    `gorm:"type:varchar(50);not null" json:"race_format"` // conventional, sprint_qualifying.
	Country     *string   `gorm:"type:varchar(50)" json:"country"`
	City        *string   `gorm:"type:varchar(100)" json:"city"` // City

	// Race timing
	RaceDateTime         time.Time `gorm:"type:timestamp with time zone;not null" json:"race_date_time"`
	SessionOneDateTime   time.Time `gorm:"type:timestamp with time zone;not null" json:"session_one_date_time"`
	SessionTwoDateTime   time.Time `gorm:"type:timestamp with time zone;not null" json:"session_two_date_time"`
	SessionThreeDateTime time.Time `gorm:"type:timestamp with time zone;not null" json:"session_three_date_time"`
	SessionFourDateTime  time.Time `gorm:"type:timestamp with time zone;not null" json:"session_four_date_time"`
	SessionFiveDateTime  time.Time `gorm:"type:timestamp with time zone;not null" json:"session_five_date_time"`

	// Circuit info
	CircuitLength *float64 `gorm:"type:numeric(10,3)" json:"circuit_length"` // in km
	Laps          *int8    `json:"laps"`
	TotalDistance *float64 `gorm:"type:numeric(10,3)" json:"total_distance"` // total race distance = circuit_length * laps

	// Weather and conditions
	WeatherConditions *WeatherCondition `gorm:"type:varchar(10)" json:"weather_conditions"` // dry or wet
	TrackTemperature  *int8             `gorm:"type:smallint" json:"track_temperature"`     // 2-digit integer

	// Status
	IsCompleted bool `gorm:"default:false" json:"is_completed"`
	IsCancelled bool `gorm:"default:false" json:"is_cancelled"`

	// Metadata
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`

	// Relationships
	SessionResults []SessionResult `gorm:"foreignKey:SessionID;references:ID" json:"session_results,omitempty"`
}

// TableName specifies the table name
func (Session) TableName() string {
	return "sessions"
}
