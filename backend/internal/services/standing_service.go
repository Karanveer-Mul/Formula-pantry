package services

import (
	"errors"
	"formula-pantry-backend/internal/models"
	"formula-pantry-backend/internal/repositories"
)

// StandingService handles business logic for standings
type StandingService struct {
	driverStandingRepo      repositories.DriverStandingRepository
	constructorStandingRepo repositories.ConstructorStandingRepository
}

// NewStandingService creates a new standing service
func NewStandingService(
	driverStandingRepo repositories.DriverStandingRepository,
	constructorStandingRepo repositories.ConstructorStandingRepository,
) *StandingService {
	return &StandingService{
		driverStandingRepo:      driverStandingRepo,
		constructorStandingRepo: constructorStandingRepo,
	}
}

// GetDriverStandings retrieves driver standings for a season
func (s *StandingService) GetDriverStandings(season int, roundNumber *int, limit *int) ([]models.PopulatedDriverStanding, error) {
	if season < 1950 || season > 2100 {
		return nil, errors.New("invalid season")
	}

	if limit != nil {
		if *limit < 1 || *limit > 11 {
			*limit = 22
		}
	}

	if roundNumber != nil {
		if *roundNumber < 1 || *roundNumber > 30 {
			return nil, errors.New("invalid round number")
		}
		return s.driverStandingRepo.GetBySeasonAndRound(season, *roundNumber, *limit)
	}

	return s.driverStandingRepo.GetCurrentStandings(season, *limit)
}

// GetConstructorStandings retrieves constructor standings for a season
func (s *StandingService) GetConstructorStandings(season int, roundNumber *int, limit *int) ([]models.PopulatedConstructorStanding, error) {
	if season < 1950 || season > 2100 {
		return nil, errors.New("invalid season")
	}

	if limit != nil {
		if *limit < 1 || *limit > 11 {
			*limit = 11
		}
	}

	if roundNumber != nil {
		if *roundNumber < 1 || *roundNumber > 30 {
			return nil, errors.New("invalid round number")
		}
		return s.constructorStandingRepo.GetBySeasonAndRound(season, *roundNumber, *limit)
	}

	return s.constructorStandingRepo.GetCurrentStandings(season, *limit)
}
