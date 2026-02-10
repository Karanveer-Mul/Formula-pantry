package services

import (
	"errors"
	"formula-pantry-backend/internal/models"
	"formula-pantry-backend/internal/repositories"

	"github.com/google/uuid"
)

// TeamService handles business logic for teams
type TeamService struct {
	teamRepo repositories.TeamRepository
}

// NewTeamService creates a new team service
func NewTeamService(teamRepo repositories.TeamRepository) *TeamService {
	return &TeamService{
		teamRepo: teamRepo,
	}
}

// GetAllTeams retrieves all teams
func (s *TeamService) GetAllTeams() ([]models.Team, error) {
	return s.teamRepo.GetAll()
}

// GetTeamByID retrieves a team by ID
func (s *TeamService) GetTeamByID(id uuid.UUID) (*models.Team, error) {
	if id == uuid.Nil {
		return nil, errors.New("invalid team ID")
	}
	return s.teamRepo.GetByID(id)
}

// GetTeamsBySeason retrieves all teams for a season
func (s *TeamService) GetTeamsBySeason(season int) ([]models.Team, error) {
	if season < 1950 || season > 2100 {
		return nil, errors.New("invalid season")
	}
	return s.teamRepo.GetBySeason(season)
}

// GetTeamWithDrivers retrieves a team with its drivers
func (s *TeamService) GetTeamWithDrivers(id uuid.UUID) (*models.Team, error) {
	if id == uuid.Nil {
		return nil, errors.New("invalid team ID")
	}
	return s.teamRepo.GetWithDrivers(id)
}

