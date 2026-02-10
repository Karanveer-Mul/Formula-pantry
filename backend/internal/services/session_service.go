package services

import (
	"errors"
	"formula-pantry-backend/internal/models"
	"formula-pantry-backend/internal/repositories"

	"github.com/google/uuid"
)

// SessionService handles business logic for sessions
type SessionService struct {
	sessionRepo repositories.SessionRepository
}

// NewSessionService creates a new session service
func NewSessionService(sessionRepo repositories.SessionRepository) *SessionService {
	return &SessionService{
		sessionRepo: sessionRepo,
	}
}

// GetAllSessions retrieves all sessions
func (s *SessionService) GetAllSessions() ([]models.Session, error) {
	return s.sessionRepo.GetAll()
}

// GetSessionByID retrieves a session by ID
func (s *SessionService) GetSessionByID(id uuid.UUID) (*models.Session, error) {
	if id == uuid.Nil {
		return nil, errors.New("invalid session ID")
	}
	return s.sessionRepo.GetByID(id)
}

// GetSessionBySeason retrieves all sessions for a season
func (s *SessionService) GetSessionBySeason(season int) ([]models.Session, error) {
	if season < 1950 || season > 2100 {
		return nil, errors.New("invalid season")
	}
	return s.sessionRepo.GetBySeason(season)
}

// GetSessionWithResults retrieves a session with its results
func (s *SessionService) GetSessionWithResults(id uuid.UUID) (*models.Session, error) {
	if id == uuid.Nil {
		return nil, errors.New("invalid session ID")
	}
	return s.sessionRepo.GetWithResults(id)
}

