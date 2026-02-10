package models

import (
	"database/sql/driver"
	"encoding/json"
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// StringArray is a custom type for handling JSON arrays in PostgreSQL
type StringArray []string

// Value implements the driver.Valuer interface
func (a StringArray) Value() (driver.Value, error) {
	if len(a) == 0 {
		return []byte("[]"), nil
	}
	return json.Marshal(a)
}

// Scan implements the sql.Scanner interface
func (a *StringArray) Scan(value interface{}) error {
	if value == nil {
		*a = StringArray{}
		return nil
	}

	var bytes []byte
	switch v := value.(type) {
	case []byte:
		bytes = v
	case string:
		bytes = []byte(v)
	default:
		return nil
	}

	return json.Unmarshal(bytes, a)
}

// News represents a news article
type News struct {
	ID         uuid.UUID   `gorm:"type:uuid;primary_key;default:gen_random_uuid()" json:"id"`
	Title      string      `gorm:"type:varchar(255);not null" json:"title"`
	Hook       string      `gorm:"type:text" json:"hook"`
	Section1   string      `gorm:"type:text" json:"section1"`
	Section2   string      `gorm:"type:text" json:"section2"`
	Section3   string      `gorm:"type:text" json:"section3"`
	Section4   string      `gorm:"type:text" json:"section4"`
	Section5   string      `gorm:"type:text" json:"section5"`
	MediaLinks StringArray `gorm:"type:jsonb" json:"mediaLinks"`
	Author     string      `gorm:"type:varchar(100)" json:"author"`
	CreatedOn  time.Time   `gorm:"not null" json:"created_on"`
	UpdatedOn  time.Time   `gorm:"not null" json:"updated_on"`
}

// BeforeCreate hook to set timestamps
func (n *News) BeforeCreate(tx *gorm.DB) error {
	now := time.Now()
	if n.CreatedOn.IsZero() {
		n.CreatedOn = now
	}
	if n.UpdatedOn.IsZero() {
		n.UpdatedOn = now
	}
	return nil
}

// BeforeUpdate hook to update the UpdatedOn timestamp
func (n *News) BeforeUpdate(tx *gorm.DB) error {
	n.UpdatedOn = time.Now()
	return nil
}

// TableName specifies the table name
func (News) TableName() string {
	return "news"
}
