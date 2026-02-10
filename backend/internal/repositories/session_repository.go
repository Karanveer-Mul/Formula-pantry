package repositories

import (
	"formula-pantry-backend/internal/database"
	"formula-pantry-backend/internal/models"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// SessionRepository defines the interface for session data operations
type SessionRepository interface {
	GetAll() ([]models.Session, error)
	GetByID(id uuid.UUID) (*models.Session, error)
	GetBySessionID(sessionID string) (*models.Session, error)
	GetBySeason(season int) ([]models.Session, error)
	Create(session *models.Session) error
	Update(session *models.Session) error
	Delete(id uuid.UUID) error
	GetWithResults(id uuid.UUID) (*models.Session, error)
}

type sessionRepository struct {
	db *gorm.DB
}

// NewSessionRepository creates a new session repository
func NewSessionRepository() SessionRepository {
	return &sessionRepository{
		db: database.DB,
	}
}

func (r *sessionRepository) GetAll() ([]models.Session, error) {
	var sessions []models.Session
	err := r.db.Order("season DESC, round_number DESC").Find(&sessions).Error
	return sessions, err
}

func (r *sessionRepository) GetByID(id uuid.UUID) (*models.Session, error) {
	var session models.Session
	err := r.db.First(&session, "id = ?", id).Error
	if err != nil {
		return nil, err
	}
	return &session, nil
}

func (r *sessionRepository) GetBySessionID(sessionID string) (*models.Session, error) {
	var session models.Session
	err := r.db.First(&session, "session_id = ?", sessionID).Error
	if err != nil {
		return nil, err
	}
	return &session, nil
}

func (r *sessionRepository) GetBySeason(season int) ([]models.Session, error) {
	var sessions []models.Session
	err := r.db.Where("season = ?", season).Order("round_number ASC").Find(&sessions).Error
	return sessions, err
}

func (r *sessionRepository) Create(session *models.Session) error {
	return r.db.Create(session).Error
}

func (r *sessionRepository) Update(session *models.Session) error {
	return r.db.Save(session).Error
}

func (r *sessionRepository) Delete(id uuid.UUID) error {
	return r.db.Delete(&models.Session{}, "id = ?", id).Error
}

func (r *sessionRepository) GetWithResults(id uuid.UUID) (*models.Session, error) {
	var session models.Session
	err := r.db.Preload("SessionResults").Preload("SessionResults.Driver").First(&session, "id = ?", id).Error
	if err != nil {
		return nil, err
	}
	return &session, nil
}

